import React, { useCallback, useEffect, useState } from "react";
import { Contract, formatUnits } from "ethers";

import SafePriceConsumer from "../abi/SafePriceConsumer.json";
import { getProvider } from "../utils/ethers";

const LOCAL_CHAIN_ID = 1337n;
const SEPOLIA_CHAIN_ID = 11155111n;
const CHAINLINK_ETH_USD_SEPOLIA_FEED =
  "0x694AA1769357215DE4FAC081bf1f309aDC325306";
const LOCAL_ADDRESS = process.env.REACT_APP_PRICE_CONSUMER_LOCAL_ADDRESS?.trim();
const SEPOLIA_ADDRESS =
  process.env.REACT_APP_PRICE_CONSUMER_SEPOLIA_ADDRESS?.trim();

const formatAge = (seconds) => {
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return `${Math.floor(seconds / 3600)}h ago`;
};

function PriceOracle() {
  const [state, setState] = useState({
    loading: true,
    error: "",
    price: "",
    description: "",
    updatedAt: 0,
    decimals: 8,
    source: ""
  });

  const loadPrice = useCallback(async () => {
    setState({
      loading: true,
      error: "",
      price: "",
      description: "",
      updatedAt: 0,
      decimals: 8,
      source: ""
    });

    try {
      const provider = getProvider();
      const { chainId } = await provider.getNetwork();
      const numericChainId = BigInt(chainId.toString());
      const isLocal = numericChainId === LOCAL_CHAIN_ID;
      const isSepolia = numericChainId === SEPOLIA_CHAIN_ID;

      if (!isLocal && !isSepolia) {
        throw new Error(
          `Unsupported wallet network (chain ID ${chainId.toString()}). Switch to Ganache Local or Ethereum Sepolia.`
        );
      }

      const address = isLocal ? LOCAL_ADDRESS : SEPOLIA_ADDRESS;
      if (!address) {
        throw new Error(
          `Price consumer is not configured for ${isLocal ? "Ganache Local" : "Ethereum Sepolia"}.`
        );
      }

      // Use the connected wallet's EIP-1193 provider, but keep this read-only.
      const consumer = new Contract(address, SafePriceConsumer.abi, provider);
      const [configuredFeed, priceResult, decimals, description] = await Promise.all([
        consumer.feed(),
        consumer.safePrice(),
        consumer.feedDecimals(),
        consumer.feedDescription()
      ]);

      if (
        isSepolia &&
        configuredFeed.toLowerCase() !== CHAINLINK_ETH_USD_SEPOLIA_FEED.toLowerCase()
      ) {
        throw new Error(
          `Sepolia consumer points to ${configuredFeed}, not the configured Chainlink ETH/USD feed.`
        );
      }

      const updatedAt = Number(priceResult.updatedAt);
      const now = Math.floor(Date.now() / 1000);

      if (updatedAt > now) {
        throw new Error("Price data has an invalid future timestamp.");
      }

      setState({
        loading: false,
        error: "",
        price: formatUnits(priceResult.price, Number(decimals)),
        description,
        updatedAt,
        decimals: Number(decimals),
        source: isLocal
          ? "Simulated local feed"
          : "Chainlink ETH/USD (Sepolia)"
      });
    } catch (error) {
      const message = error?.shortMessage || error?.reason || error?.message;
      setState({
        loading: false,
        price: "",
        description: "",
        updatedAt: 0,
        decimals: 8,
        source: "",
        error: message?.includes("STALE_PRICE")
          ? "Price data is stale. Refresh after the feed updates."
          : message || "Price unavailable. Check your wallet network and deployment."
      });
    }
  }, []);

  useEffect(() => {
    loadPrice();
    const interval = setInterval(loadPrice, 60000);
    return () => clearInterval(interval);
  }, [loadPrice]);

  const age = state.updatedAt
    ? Math.max(0, Math.floor(Date.now() / 1000) - state.updatedAt)
    : 0;

  return (
    <section className="price-page">
      <div className="price-heading">
        <div>
          <span className="eyebrow">MARKET DATA</span>
          <h2>Market Prices</h2>
          <p>Validated on-chain price data from the configured Chainlink feed.</p>
        </div>
        <button className="price-refresh" onClick={loadPrice} disabled={state.loading}>
          {state.loading ? "Reading…" : "Refresh"}
        </button>
      </div>

      {state.error ? (
        <div className="price-alert">
          <strong>Price unavailable</strong>
          <span>{state.error}</span>
        </div>
      ) : (
        <div className="price-card">
          <div className="price-card-top">
            <div>
              <span className="price-label">ASSET PAIR</span>
              <h3>{state.description || "ETH / USD"}</h3>
            </div>
            <span className="price-status">Validated</span>
          </div>
          <strong className="price-value">
            {state.loading ? "Loading…" : `$${Number(state.price).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6
            })}`}
          </strong>
          <div className="price-details">
            <span>Last updated <strong>{state.updatedAt ? new Date(state.updatedAt * 1000).toLocaleString() : "—"}</strong></span>
            <span>Approximate age <strong>{state.updatedAt ? formatAge(age) : "—"}</strong></span>
            <span>Source <strong>{state.source || "—"}</strong></span>
          </div>
        </div>
      )}
    </section>
  );
}

export default PriceOracle;
