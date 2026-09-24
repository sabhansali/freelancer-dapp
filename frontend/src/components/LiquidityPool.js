import React, { useEffect, useState } from "react";

import {
  formatEther,
  formatUnits,
  parseEther,
  parseUnits
} from "ethers";

import {
  getContract,
  getProvider
} from "../utils/ethers";

import SimpleAMM from "../abi/SimpleAMM.json";
import FreelancerToken from "../abi/FreelancerToken.json";

function LiquidityPool({ account }) {
  const [amm, setAmm] = useState(null);
  const [frlToken, setFrlToken] = useState(null);

  const [frlReserve, setFrlReserve] = useState("0");
  const [ethReserve, setEthReserve] = useState("0");
  const [kValue, setKValue] = useState("0");

  const [frlBalance, setFrlBalance] = useState("0");
  const [lpBalance, setLpBalance] = useState("0");
  const [lpTotalSupply, setLpTotalSupply] = useState("0");

  const [frlLiquidity, setFrlLiquidity] = useState("");
  const [ethLiquidity, setEthLiquidity] = useState("");

  const [swapDirection, setSwapDirection] =
    useState("FRL_TO_ETH");

  const [swapAmount, setSwapAmount] = useState("");
  const [expectedOutput, setExpectedOutput] =
    useState("");

  const [removeAmount, setRemoveAmount] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("swap");

  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const loadData = async () => {
    if (!account) return;

    try {
      const pool =
        await getContract(SimpleAMM);

      const tokenAddress =
        await pool.frlToken();

      const provider =
        getProvider();

      const signer =
        await provider.getSigner();

      const { Contract } =
        await import("ethers");

      const token =
        new Contract(
          tokenAddress,
          FreelancerToken.abi,
          signer
        );

      const reserves =
        await pool.getReserves();

      setAmm(pool);
      setFrlToken(token);

      setFrlReserve(
        formatUnits(reserves[0], 18)
      );

      setEthReserve(
        formatEther(reserves[1])
      );

      setKValue(
        formatUnits(
          await pool.getK(),
          18
        )
      );

      setFrlBalance(
        formatUnits(
          await token.balanceOf(account),
          18
        )
      );

      setLpBalance(
        formatUnits(
          await pool.balanceOf(account),
          18
        )
      );

      setLpTotalSupply(
        formatUnits(
          await pool.totalSupply(),
          18
        )
      );
    } catch (err) {
      setMessage(
        "Error loading pool: " +
          (
            err?.shortMessage ||
            err?.message ||
            err
          )
      );
    }
  };

  useEffect(() => {
    loadData();
  }, [account]);

  const handleAddLiquidity = async (e) => {
    e.preventDefault();

    setMessage("");
    setBusy(true);

    try {
      if (!amm || !frlToken) {
        throw new Error(
          "Liquidity pool is not loaded."
        );
      }

      const frlAmount =
        parseUnits(
          frlLiquidity,
          18
        );

      const ethAmount =
        parseEther(
          ethLiquidity
        );

      if (
        frlAmount <= 0n ||
        ethAmount <= 0n
      ) {
        throw new Error(
          "Enter valid amounts."
        );
      }

      const allowance =
        await frlToken.allowance(
          account,
          amm.target
        );

      if (allowance < frlAmount) {
        setMessage(
          "Waiting for FRL approval..."
        );

        const approvalTx =
          await frlToken.approve(
            amm.target,
            frlAmount
          );

        await approvalTx.wait();
      }

      setMessage(
        "Adding liquidity..."
      );

      const tx =
        await amm.addLiquidity(
          frlAmount,
          {
            value: ethAmount
          }
        );

      await tx.wait();

      setFrlLiquidity("");
      setEthLiquidity("");

      setMessage(
        "Liquidity added successfully."
      );

      await loadData();
    } catch (err) {
      setMessage(
        "Error: " +
          (
            err?.shortMessage ||
            err?.message ||
            err
          )
      );
    } finally {
      setBusy(false);
    }
  };

  const handleSwap = async (e) => {
    e.preventDefault();

    setMessage("");
    setBusy(true);

    try {
      if (!amm || !frlToken) {
        throw new Error(
          "Liquidity pool is not loaded."
        );
      }

      const input =
        swapDirection === "FRL_TO_ETH"
          ? parseUnits(
              swapAmount,
              18
            )
          : parseEther(
              swapAmount
            );

      if (input <= 0n) {
        throw new Error(
          "Enter a valid amount."
        );
      }

      if (
        swapDirection === "FRL_TO_ETH"
      ) {
        const allowance =
          await frlToken.allowance(
            account,
            amm.target
          );

        if (allowance < input) {
          setMessage(
            "Waiting for FRL approval..."
          );

          const approvalTx =
            await frlToken.approve(
              amm.target,
              input
            );

          await approvalTx.wait();
        }

        setMessage(
          "Executing FRL → ETH swap..."
        );

        const tx =
          await amm.swapFRLForETH(
            input
          );

        await tx.wait();

        setMessage(
          "FRL → ETH swap successful."
        );
      } else {
        setMessage(
          "Executing ETH → FRL swap..."
        );

        const tx =
          await amm.swapETHForFRL({
            value: input
          });

        await tx.wait();

        setMessage(
          "ETH → FRL swap successful."
        );
      }

      setSwapAmount("");
      setExpectedOutput("");

      await loadData();
    } catch (err) {
      setMessage(
        "Error: " +
          (
            err?.shortMessage ||
            err?.message ||
            err
          )
      );
    } finally {
      setBusy(false);
    }
  };

  const handleRemoveLiquidity = async (e) => {
    e.preventDefault();

    setMessage("");
    setBusy(true);

    try {
      if (!amm) {
        throw new Error(
          "Liquidity pool is not loaded."
        );
      }

      const lpAmount =
        parseUnits(
          removeAmount,
          18
        );

      if (lpAmount <= 0n) {
        throw new Error(
          "Enter a valid LP amount."
        );
      }

      setMessage(
        "Removing liquidity..."
      );

      const tx =
        await amm.removeLiquidity(
          lpAmount
        );

      await tx.wait();

      setRemoveAmount("");

      setMessage(
        "Liquidity removed successfully."
      );

      await loadData();
    } catch (err) {
      setMessage(
        "Error: " +
          (
            err?.shortMessage ||
            err?.message ||
            err
          )
      );
    } finally {
      setBusy(false);
    }
  };

  const updateExpectedOutput =
    async (value) => {
      setSwapAmount(value);

      if (
        !amm ||
        !value ||
        Number(value) <= 0
      ) {
        setExpectedOutput("");
        return;
      }

      try {
        const input =
          swapDirection === "FRL_TO_ETH"
            ? parseUnits(value, 18)
            : parseEther(value);

        const reserves =
          await amm.getReserves();

        const reserveIn =
          swapDirection === "FRL_TO_ETH"
            ? reserves[0]
            : reserves[1];

        const reserveOut =
          swapDirection === "FRL_TO_ETH"
            ? reserves[1]
            : reserves[0];

        const output =
          await amm.getAmountOut(
            input,
            reserveIn,
            reserveOut
          );

        setExpectedOutput(
          swapDirection === "FRL_TO_ETH"
            ? formatEther(output)
            : formatUnits(
                output,
                18
              )
        );
      } catch (_) {
        setExpectedOutput("");
      }
    };

  const switchSwapDirection = () => {
    setSwapDirection(
      swapDirection === "FRL_TO_ETH"
        ? "ETH_TO_FRL"
        : "FRL_TO_ETH"
    );

    setSwapAmount("");
    setExpectedOutput("");
  };

  const isFrlToEth =
    swapDirection === "FRL_TO_ETH";

  return (
    <div className="amm-page">

      <div className="amm-header">
        <div>
          <h2>FRL / ETH Pool</h2>
          <p>
            Trade FRL and ETH or provide liquidity
            to earn LP shares.
          </p>
        </div>

        <div className="pool-status">
          <span></span>
          Pool Active
        </div>
      </div>

      <div className="amm-stats">

        <div className="amm-stat-card">
          <span>FRL Reserve</span>
          <strong>
            {frlReserve}
          </strong>
          <small>FRL</small>
        </div>

        <div className="amm-stat-card">
          <span>ETH Reserve</span>
          <strong>
            {ethReserve}
          </strong>
          <small>ETH</small>
        </div>

        <div className="amm-stat-card">
          <span>Your FRL</span>
          <strong>
            {frlBalance}
          </strong>
          <small>Available</small>
        </div>

        <div className="amm-stat-card">
          <span>Your LP Shares</span>
          <strong>
            {lpBalance}
          </strong>
          <small>fFRL-LP</small>
        </div>

      </div>

      <div className="amm-pool-info">
        <div>
          <span>Total LP Supply</span>
          <strong>
            {lpTotalSupply}
          </strong>
        </div>

        <div>
          <span>Constant Product</span>
          <strong>
            {kValue}
          </strong>
        </div>
      </div>

      <div className="amm-tabs">

        <button
          className={
            activeTab === "swap"
              ? "amm-tab active"
              : "amm-tab"
          }
          onClick={() => {
            setActiveTab("swap");
            setMessage("");
          }}
        >
          Swap
        </button>

        <button
          className={
            activeTab === "liquidity"
              ? "amm-tab active"
              : "amm-tab"
          }
          onClick={() => {
            setActiveTab("liquidity");
            setMessage("");
          }}
        >
          Add Liquidity
        </button>

        <button
          className={
            activeTab === "remove"
              ? "amm-tab active"
              : "amm-tab"
          }
          onClick={() => {
            setActiveTab("remove");
            setMessage("");
          }}
        >
          Remove Liquidity
        </button>

      </div>

      <div className="amm-action-card">

        {activeTab === "swap" && (
          <div className="amm-action-content">

            <div className="action-title">
              <h3>Swap Tokens</h3>
              <p>
                Exchange FRL and ETH using the
                constant-product AMM.
              </p>
            </div>

            <form onSubmit={handleSwap}>

              <div className="swap-box">

                <div className="swap-box-top">
                  <span>
                    You pay
                  </span>

                  <span>
                    {isFrlToEth
                      ? "FRL"
                      : "ETH"}
                  </span>
                </div>

                <div className="swap-input-row">

                  <input
                    type="number"
                    step="any"
                    placeholder="0.0"
                    value={swapAmount}
                    onChange={(e) =>
                      updateExpectedOutput(
                        e.target.value
                      )
                    }
                    required
                  />

                  <div className="token-badge">
                    <span>
                      {isFrlToEth
                        ? "F"
                        : "Ξ"}
                    </span>

                    {isFrlToEth
                      ? "FRL"
                      : "ETH"}
                  </div>

                </div>

              </div>

              <button
                type="button"
                className="swap-direction"
                onClick={
                  switchSwapDirection
                }
              >
                ↕
              </button>

              <div className="swap-box">

                <div className="swap-box-top">
                  <span>
                    You receive
                  </span>

                  <span>
                    {isFrlToEth
                      ? "ETH"
                      : "FRL"}
                  </span>
                </div>

                <div className="swap-input-row">

                  <input
                    type="text"
                    value={
                      expectedOutput || "0.0"
                    }
                    readOnly
                  />

                  <div className="token-badge">
                    <span>
                      {isFrlToEth
                        ? "Ξ"
                        : "F"}
                    </span>

                    {isFrlToEth
                      ? "ETH"
                      : "FRL"}
                  </div>

                </div>

              </div>

              <button
                type="submit"
                className="amm-primary-button"
                disabled={
                  busy ||
                  !swapAmount
                }
              >
                {busy
                  ? "Processing..."
                  : "Swap"}
              </button>

            </form>

          </div>
        )}

        {activeTab === "liquidity" && (
          <div className="amm-action-content">

            <div className="action-title">
              <h3>Add Liquidity</h3>
              <p>
                Deposit FRL and ETH into the pool
                to receive LP shares.
              </p>
            </div>

            <form
              onSubmit={
                handleAddLiquidity
              }
            >

              <label>
                FRL Amount
              </label>

              <div className="amm-input-wrapper">

                <input
                  type="number"
                  step="any"
                  placeholder="0.0"
                  value={frlLiquidity}
                  onChange={(e) =>
                    setFrlLiquidity(
                      e.target.value
                    )
                  }
                  required
                />

                <span>FRL</span>

              </div>

              <label>
                ETH Amount
              </label>

              <div className="amm-input-wrapper">

                <input
                  type="number"
                  step="any"
                  placeholder="0.0"
                  value={ethLiquidity}
                  onChange={(e) =>
                    setEthLiquidity(
                      e.target.value
                    )
                  }
                  required
                />

                <span>ETH</span>

              </div>

              <button
                type="submit"
                className="amm-primary-button"
                disabled={busy}
              >
                {busy
                  ? "Processing..."
                  : "Add Liquidity"}
              </button>

            </form>

          </div>
        )}

        {activeTab === "remove" && (
          <div className="amm-action-content">

            <div className="action-title">
              <h3>Remove Liquidity</h3>
              <p>
                Burn your LP shares and receive
                your proportional FRL and ETH.
              </p>
            </div>

            <div className="remove-balance">
              <span>
                Your LP balance
              </span>

              <strong>
                {lpBalance} fFRL-LP
              </strong>
            </div>

            <form
              onSubmit={
                handleRemoveLiquidity
              }
            >

              <label>
                LP Shares to Remove
              </label>

              <div className="amm-input-wrapper">

                <input
                  type="number"
                  step="any"
                  placeholder="0.0"
                  value={removeAmount}
                  onChange={(e) =>
                    setRemoveAmount(
                      e.target.value
                    )
                  }
                  required
                />

                <span>LP</span>

              </div>

              <button
                type="submit"
                className="amm-primary-button"
                disabled={busy}
              >
                {busy
                  ? "Processing..."
                  : "Remove Liquidity"}
              </button>

            </form>

          </div>
        )}

      </div>

      {message && (
        <div className="amm-message">
          {message}
        </div>
      )}

    </div>
  );
}

export default LiquidityPool;
