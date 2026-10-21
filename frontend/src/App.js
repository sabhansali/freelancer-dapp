import React, { useEffect, useState } from "react";

import {
  useAppKitAccount,
  useAppKitProvider
} from "@reown/appkit/react";

import { setAppKitProvider } from "./utils/ethers";

import RegisterFreelancer from "./components/RegisterFreelancer";
import CreateTask from "./components/CreateTask";
import CompleteTask from "./components/CompleteTask";
import ViewTasks from "./components/ViewTasks";
import FreelancerVault from "./components/FreelancerVault";
import LiquidityPool from "./components/LiquidityPool";
import FRLStaking from "./components/FRLStaking";
import YieldFarming from "./components/YieldFarming";
import FreelancerDEX from "./components/FreelancerDEX";

import "./App.css";

function App() {
  const [view, setView] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [account, setAccount] = useState("");

  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");

  useEffect(() => {
    if (walletProvider) {
      setAppKitProvider(walletProvider);
    }
  }, [walletProvider]);

  useEffect(() => {
    if (isConnected && address) {
      setAccount(address);
    } else {
      setAccount("");
    }
  }, [address, isConnected]);

  const navigateTo = (nextView) => {
    setView(nextView);
    setMenuOpen(false);
  };

  const isDeFiView = [
    "vault",
    "amm",
    "staking",
    "farming",
    "dex"
  ].includes(view);

  return (
    <div className="App">
      {menuOpen && (
        <div
          className="drawer-backdrop"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={`side-drawer ${menuOpen ? "open" : ""}`}
      >
        <div className="drawer-header">
          <span>Freelancer DApp</span>

          <button
            className="close-menu"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <button
          className={
            view === "dashboard"
              ? "drawer-link active"
              : "drawer-link"
          }
          onClick={() => navigateTo("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={
            view === "vault"
              ? "drawer-link active"
              : "drawer-link"
          }
          onClick={() => navigateTo("vault")}
        >
          FRL Vault
        </button>

        <button
          className={
            view === "amm"
              ? "drawer-link active"
              : "drawer-link"
          }
          onClick={() => navigateTo("amm")}
        >
          FRL / ETH Pool
        </button>

        <button
          className={
            view === "staking"
              ? "drawer-link active"
              : "drawer-link"
          }
          onClick={() => navigateTo("staking")}
        >
          FRL Staking
        </button>

        <button
          className={
            view === "farming"
              ? "drawer-link active"
              : "drawer-link"
          }
          onClick={() => navigateTo("farming")}
        >
          Yield Farming
        </button>

        <button
          className={
            view === "dex"
              ? "drawer-link active"
              : "drawer-link"
          }
          onClick={() => navigateTo("dex")}
        >
          Freelancer DEX
        </button>
      </aside>

      <div className="Nav">
        <button
          className="menu-button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>

        <h1>Freelancer Escrow DApp</h1>

        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#94a3b8"
          }}
        >
          Secure freelance payments using blockchain escrow
        </p>
      </div>

      <div className="account-row">
        <h4>
          <strong>Connected Account:</strong>{" "}
          {account || "Not connected"}
        </h4>

        <div className="connect-wallet">
          <appkit-button />
        </div>
      </div>

      {!isDeFiView && (
        <nav>
          <button onClick={() => navigateTo("register")}>
            Register Freelancer
          </button>

          <button onClick={() => navigateTo("createTask")}>
            Create Task
          </button>

          <button onClick={() => navigateTo("completeTask")}>
            Complete Task
          </button>
        </nav>
      )}

      {!isDeFiView && (
        <div style={{ marginTop: 20 }}>
          {(view === "dashboard" || view === "register") && (
            <RegisterFreelancer account={account} />
          )}

          {view === "createTask" && (
            <CreateTask account={account} />
          )}

          {view === "completeTask" && (
            <CompleteTask account={account} />
          )}
        </div>
      )}

      {!isDeFiView && (
        <ViewTasks account={account} />
      )}

      {view === "vault" && (
        <FreelancerVault account={account} />
      )}

      {view === "amm" && (
        <LiquidityPool account={account} />
      )}

      {view === "staking" && (
        <FRLStaking account={account} />
      )}

      {view === "farming" && (
        <YieldFarming account={account} />
      )}

      {view === "dex" && (
        <FreelancerDEX />
      )}
    </div>
  );
}

export default App;