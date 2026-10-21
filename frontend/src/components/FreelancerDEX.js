import React, { useCallback, useEffect, useState } from "react";
import { Contract, formatUnits, parseUnits } from "ethers";

import { getContract, getConnectedAccount } from "../utils/ethers";

import FreelancerMockToken from "../abi/FreelancerMockToken.json";
import FreelancerLiquidityPair from "../abi/FreelancerLiquidityPair.json";
import FreelancerDEXFactory from "../abi/FreelancerDEXFactory.json";
import FreelancerDEXRouter from "../abi/FreelancerDEXRouter.json";
import FreelancerLPFarm from "../abi/FreelancerLPFarm.json";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const DEADLINE_SECONDS = 20 * 60;
const CONFIGURED_TOKEN_A_ADDRESS = process.env.REACT_APP_DEX_TOKEN_A_ADDRESS?.trim();
const CONFIGURED_TOKEN_B_ADDRESS = process.env.REACT_APP_DEX_TOKEN_B_ADDRESS?.trim();

const formatAmount = (value, decimals = 4) => {
  const number = Number(value);
  return Number.isFinite(number) ? number.toFixed(decimals) : "0.0000";
};

function FreelancerDEX() {
  const [account, setAccount] = useState("");
  const [tokenA, setTokenA] = useState(null);
  const [tokenB, setTokenB] = useState(null);
  const [router, setRouter] = useState(null);
  const [factory, setFactory] = useState(null);
  const [pair, setPair] = useState(null);
  const [farm, setFarm] = useState(null);

  const [tokenAAddress, setTokenAAddress] = useState("");
  const [tokenBAddress, setTokenBAddress] = useState("");
  const [pairAddress, setPairAddress] = useState("");

  const [symbolA, setSymbolA] = useState("Token A");
  const [symbolB, setSymbolB] = useState("Token B");
  const [decimalsA, setDecimalsA] = useState(18);
  const [decimalsB, setDecimalsB] = useState(18);

  const [balanceA, setBalanceA] = useState("0");
  const [balanceB, setBalanceB] = useState("0");
  const [lpBalance, setLpBalance] = useState("0");
  const [stakedBalance, setStakedBalance] = useState("0");
  const [earnedRewards, setEarnedRewards] = useState("0");
  const [reserves, setReserves] = useState({ a: "0", b: "0" });

  const [swapDirection, setSwapDirection] = useState("A_TO_B");
  const [swapAmount, setSwapAmount] = useState("");
  const [minimumOutput, setMinimumOutput] = useState("0");
  const [liquidityA, setLiquidityA] = useState("");
  const [liquidityB, setLiquidityB] = useState("");
  const [removeLPAmount, setRemoveLPAmount] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const initialize = useCallback(async () => {
    setInitializing(true);
    setError("");
    try {
      const connectedAccount = await getConnectedAccount();
      if (!connectedAccount) {
        throw new Error("Connect your wallet before using the DEX.");
      }
      setAccount(connectedAccount);

      if (!CONFIGURED_TOKEN_A_ADDRESS || !CONFIGURED_TOKEN_B_ADDRESS) {
        throw new Error(
          "DEX token addresses are not configured. Set REACT_APP_DEX_TOKEN_A_ADDRESS and REACT_APP_DEX_TOKEN_B_ADDRESS."
        );
      }

      if (CONFIGURED_TOKEN_A_ADDRESS.toLowerCase() === CONFIGURED_TOKEN_B_ADDRESS.toLowerCase()) {
        throw new Error("DEX Token A and Token B must use different addresses.");
      }

      const [
        tokenAContract,
        tokenBContract,
        factoryContract,
        routerContract,
        farmContract
      ] = await Promise.all([
        getContract(FreelancerMockToken, CONFIGURED_TOKEN_A_ADDRESS),
        getContract(FreelancerMockToken, CONFIGURED_TOKEN_B_ADDRESS),
        getContract(FreelancerDEXFactory),
        getContract(FreelancerDEXRouter),
        getContract(FreelancerLPFarm)
      ]);

      const addressA = await tokenAContract.getAddress();
      const addressB = await tokenBContract.getAddress();

      setTokenAAddress(addressA);
      setTokenBAddress(addressB);
      setTokenA(tokenAContract);
      setTokenB(tokenBContract);
      setFactory(factoryContract);
      setRouter(routerContract);
      setFarm(farmContract);

      const [symA, symB, decA, decB] = await Promise.all([
        tokenAContract.symbol(),
        tokenBContract.symbol(),
        tokenAContract.decimals(),
        tokenBContract.decimals()
      ]);

      setSymbolA(symA);
      setSymbolB(symB);
      setDecimalsA(Number(decA));
      setDecimalsB(Number(decB));

      const foundPairAddress = await factoryContract.getPair(addressA, addressB);
      if (foundPairAddress && foundPairAddress.toLowerCase() !== ZERO_ADDRESS) {
        const provider = await tokenAContract.runner.provider;
        const signer = tokenAContract.runner;
        const pairContract = new Contract(
          foundPairAddress,
          FreelancerLiquidityPair.abi,
          signer || provider
        );

        setPair(pairContract);
        setPairAddress(foundPairAddress);
      } else {
        setPair(null);
        setPairAddress("");
      }
    } catch (e) {
      setError(e?.shortMessage || e?.reason || e?.message || "Could not initialize the DEX.");
    } finally {
      setInitializing(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    if (!tokenA || !tokenB || !farm || !account) return;

    try {
      const [a, b, lp, staked, earned] = await Promise.all([
        tokenA.balanceOf(account),
        tokenB.balanceOf(account),
        pair ? pair.balanceOf(account) : Promise.resolve(0n),
        farm.stakedBalance(account),
        farm.earned(account)
      ]);

      setBalanceA(formatAmount(formatUnits(a, decimalsA)));
      setBalanceB(formatAmount(formatUnits(b, decimalsB)));
      setLpBalance(formatAmount(formatUnits(lp, 18)));
      setStakedBalance(formatAmount(formatUnits(staked, 18)));
      setEarnedRewards(formatAmount(formatUnits(earned, decimalsB)));

      if (pair) {
        const [[reserve0, reserve1], token0] = await Promise.all([
          pair.getReserves(),
          pair.token0()
        ]);

        const aIsToken0 = token0.toLowerCase() === tokenAAddress.toLowerCase();
        const reserveA = aIsToken0 ? reserve0 : reserve1;
        const reserveB = aIsToken0 ? reserve1 : reserve0;

        setReserves({
          a: formatAmount(formatUnits(reserveA, decimalsA)),
          b: formatAmount(formatUnits(reserveB, decimalsB))
        });
      } else {
        setReserves({ a: "0", b: "0" });
      }
    } catch (e) {
      setError(e?.shortMessage || e?.reason || e?.message || "Could not refresh balances.");
    }
  }, [tokenA, tokenB, pair, farm, account, decimalsA, decimalsB, tokenAAddress]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const runTransaction = async (label, operation) => {
    setLoading(true);
    setError("");
    setNotice("");
    try {
      const tx = await operation();
      if (tx?.wait) await tx.wait();
      setNotice(`${label} completed successfully.`);
      await initialize();
    } catch (e) {
      setError(e?.shortMessage || e?.reason || e?.message || `${label} failed.`);
    } finally {
      setLoading(false);
    }
  };

  const ensurePair = async () => {
    if (pair) return pair;
    const existing = await factory.getPair(tokenAAddress, tokenBAddress);
    if (existing && existing.toLowerCase() !== ZERO_ADDRESS) {
      const signer = tokenA.runner;
      const newPair = new Contract(existing, FreelancerLiquidityPair.abi, signer);
      setPair(newPair);
      setPairAddress(existing);
      return newPair;
    }
    throw new Error("The pair does not exist yet. Add liquidity to create it.");
  };

  const approveToken = async (token, spender, amount) => {
    const allowance = await token.allowance(account, spender);
    if (allowance < amount) {
      const tx = await token.approve(spender, amount);
      await tx.wait();
    }
  };

  const addLiquidity = async () => {
    if (!liquidityA || !liquidityB || Number(liquidityA) <= 0 || Number(liquidityB) <= 0) {
      setError("Enter positive amounts for both tokens.");
      return;
    }

    await runTransaction("Add liquidity", async () => {
      const amountA = parseUnits(liquidityA, decimalsA);
      const amountB = parseUnits(liquidityB, decimalsB);

      await approveToken(tokenA, await router.getAddress(), amountA);
      await approveToken(tokenB, await router.getAddress(), amountB);

      return router.addLiquidity(
        tokenAAddress,
        tokenBAddress,
        amountA,
        amountB,
        0,
        0,
        account,
        Math.floor(Date.now() / 1000) + DEADLINE_SECONDS
      );
    });
  };

  const swap = async () => {
    if (!swapAmount || Number(swapAmount) <= 0) {
      setError("Enter a positive swap amount.");
      return;
    }

    await runTransaction("Swap", async () => {
      const inputToken = swapDirection === "A_TO_B" ? tokenA : tokenB;
      const inputAddress = swapDirection === "A_TO_B" ? tokenAAddress : tokenBAddress;
      const outputAddress = swapDirection === "A_TO_B" ? tokenBAddress : tokenAAddress;
      const inputDecimals = swapDirection === "A_TO_B" ? decimalsA : decimalsB;
      const amountIn = parseUnits(swapAmount, inputDecimals);
      const amountOutMin = parseUnits(
        minimumOutput || "0",
        swapDirection === "A_TO_B" ? decimalsB : decimalsA
      );

      await approveToken(inputToken, await router.getAddress(), amountIn);

      return router.swapExactTokensForTokens(
        amountIn,
        amountOutMin,
        [inputAddress, outputAddress],
        account,
        Math.floor(Date.now() / 1000) + DEADLINE_SECONDS
      );
    });
  };

  const removeLiquidity = async () => {
    if (!removeLPAmount || Number(removeLPAmount) <= 0) {
      setError("Enter a positive LP-token amount.");
      return;
    }

    await runTransaction("Remove liquidity", async () => {
      const activePair = await ensurePair();
      const amount = parseUnits(removeLPAmount, 18);
      await approveToken(activePair, await router.getAddress(), amount);

      return router.removeLiquidity(
        tokenAAddress,
        tokenBAddress,
        amount,
        0,
        0,
        account,
        Math.floor(Date.now() / 1000) + DEADLINE_SECONDS
      );
    });
  };

  const stakeLP = async () => {
    if (!stakeAmount || Number(stakeAmount) <= 0) {
      setError("Enter a positive LP amount to stake.");
      return;
    }

    await runTransaction("Stake LP tokens", async () => {
      const activePair = await ensurePair();
      const amount = parseUnits(stakeAmount, 18);
      await approveToken(activePair, await farm.getAddress(), amount);
      return farm.stake(amount);
    });
  };

  const withdrawLP = async () => {
    if (!withdrawAmount || Number(withdrawAmount) <= 0) {
      setError("Enter a positive amount to withdraw.");
      return;
    }

    await runTransaction("Withdraw LP tokens", async () => {
      return farm.withdraw(parseUnits(withdrawAmount, 18));
    });
  };

  const claimRewards = async () => {
    await runTransaction("Claim rewards", async () => farm.claimReward());
  };

  if (initializing) {
    return <section className="dex-page"><p>Loading DEX contracts…</p></section>;
  }

  return (
    <section className="dex-page">
      <div className="dex-heading">
        <div>
          <span className="dex-eyebrow">DECENTRALIZED EXCHANGE</span>
          <h2>Freelancer DEX</h2>
          <p>Swap tokens, provide liquidity, and earn LP farming rewards.</p>
        </div>
        <button className="dex-secondary-button" onClick={refresh} disabled={loading}>
          Refresh
        </button>
      </div>

      <div className="dex-stats-grid">
        <div className="dex-stat-card">
          <span>Wallet</span>
          <strong>{account ? `${account.slice(0, 6)}…${account.slice(-4)}` : "Not connected"}</strong>
        </div>
        <div className="dex-stat-card">
          <span>{symbolA} balance</span>
          <strong>{balanceA}</strong>
        </div>
        <div className="dex-stat-card">
          <span>{symbolB} balance</span>
          <strong>{balanceB}</strong>
        </div>
        <div className="dex-stat-card">
          <span>LP tokens</span>
          <strong>{lpBalance}</strong>
        </div>
      </div>

      {error && <div className="dex-alert dex-error">{error}</div>}
      {notice && <div className="dex-alert dex-success">{notice}</div>}

      <div className="dex-contract-strip">
        <span>Pair status: <strong>{pairAddress ? "Created" : "Not created yet"}</strong></span>
        {pairAddress && (
          <span className="dex-address">Pair: {pairAddress.slice(0, 10)}…{pairAddress.slice(-8)}</span>
        )}
      </div>

      <div className="dex-card-grid">
        <article className="dex-card">
          <div className="dex-card-title">
            <div>
              <span className="dex-card-kicker">TRADE</span>
              <h3>Swap tokens</h3>
            </div>
            <span className="dex-icon">⇄</span>
          </div>

          <label>Swap direction</label>
          <select value={swapDirection} onChange={(e) => setSwapDirection(e.target.value)}>
            <option value="A_TO_B">{symbolA} → {symbolB}</option>
            <option value="B_TO_A">{symbolB} → {symbolA}</option>
          </select>

          <label>Amount to swap</label>
          <input type="number" min="0" step="any" placeholder="0.00" value={swapAmount}
            onChange={(e) => setSwapAmount(e.target.value)} />

          <label>Minimum output (slippage protection)</label>
          <input type="number" min="0" step="any" placeholder="0 = no minimum"
            value={minimumOutput} onChange={(e) => setMinimumOutput(e.target.value)} />

          <button className="dex-primary-button" disabled={loading || !router} onClick={swap}>
            {loading ? "Processing…" : "Swap"}
          </button>
          <p className="dex-hint">The transaction uses the router’s on-chain quote and minimum-output check.</p>
        </article>

        <article className="dex-card">
          <div className="dex-card-title">
            <div>
              <span className="dex-card-kicker">LIQUIDITY</span>
              <h3>Add liquidity</h3>
            </div>
            <span className="dex-icon">＋</span>
          </div>

          <label>{symbolA} amount</label>
          <input type="number" min="0" step="any" placeholder="0.00" value={liquidityA}
            onChange={(e) => setLiquidityA(e.target.value)} />

          <label>{symbolB} amount</label>
          <input type="number" min="0" step="any" placeholder="0.00" value={liquidityB}
            onChange={(e) => setLiquidityB(e.target.value)} />

          <div className="dex-reserves">
            <div><span>Pool {symbolA}</span><strong>{reserves.a}</strong></div>
            <div><span>Pool {symbolB}</span><strong>{reserves.b}</strong></div>
          </div>

          <button className="dex-primary-button" disabled={loading || !router} onClick={addLiquidity}>
            {loading ? "Processing…" : "Add liquidity"}
          </button>
          <p className="dex-hint">Approves both tokens, then adds liquidity through the router.</p>
        </article>

        <article className="dex-card">
          <div className="dex-card-title">
            <div>
              <span className="dex-card-kicker">LIQUIDITY</span>
              <h3>Remove liquidity</h3>
            </div>
            <span className="dex-icon">−</span>
          </div>

          <div className="dex-inline-stat">
            <span>Your LP balance</span><strong>{lpBalance}</strong>
          </div>
          <label>LP tokens to remove</label>
          <input type="number" min="0" step="any" placeholder="0.00" value={removeLPAmount}
            onChange={(e) => setRemoveLPAmount(e.target.value)} />

          <button className="dex-primary-button" disabled={loading || !pair} onClick={removeLiquidity}>
            {loading ? "Processing…" : "Remove liquidity"}
          </button>
          <p className="dex-hint">Burns LP tokens and returns the corresponding pool assets.</p>
        </article>

        <article className="dex-card">
          <div className="dex-card-title">
            <div>
              <span className="dex-card-kicker">YIELD</span>
              <h3>LP farming</h3>
            </div>
            <span className="dex-icon">✦</span>
          </div>

          <div className="dex-farm-stats">
            <div><span>Currently staked</span><strong>{stakedBalance} FDLP</strong></div>
            <div><span>Rewards earned</span><strong>{earnedRewards} {symbolB}</strong></div>
          </div>

          <label>LP tokens to stake</label>
          <input type="number" min="0" step="any" placeholder="0.00" value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)} />
          <button className="dex-primary-button" disabled={loading || !farm || !pair} onClick={stakeLP}>
            {loading ? "Processing…" : "Stake LP"}
          </button>

          <label>LP tokens to withdraw</label>
          <input type="number" min="0" step="any" placeholder="0.00" value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)} />
          <button className="dex-secondary-button dex-full-button" disabled={loading || !farm} onClick={withdrawLP}>
            Withdraw stake
          </button>

          <button className="dex-secondary-button dex-full-button" disabled={loading || !farm} onClick={claimRewards}>
            Claim rewards
          </button>
          <p className="dex-hint">The farm must be funded with reward tokens and have an active reward period.</p>
        </article>
      </div>
    </section>
  );
}

export default FreelancerDEX;