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

import "./App.css";

function App() {
  const [view, setView] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [account, setAccount] = useState("");

  // Reown account information
  const { address, isConnected } = useAppKitAccount();

  // Reown EVM wallet provider
  const { walletProvider } = useAppKitProvider("eip155");

  // Store Reown provider for the rest of the application
  useEffect(() => {
    if (walletProvider) {
      setAppKitProvider(walletProvider);
    }
  }, [walletProvider]);

  // Update account whenever Reown connects/disconnects
  useEffect(() => {
    if (isConnected && address) {
      setAccount(address);
    } else {
      setAccount("");
    }
  }, [address, isConnected]);

  return (
    <div className="App">

      {menuOpen && <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} />}
      <aside className={`side-drawer ${menuOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <span>Freelancer DApp</span>
          <button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button>
        </div>
        <button className={view === "dashboard" ? "drawer-link active" : "drawer-link"} onClick={() => { setView("dashboard"); setMenuOpen(false); }}>Dashboard</button>
        <button className={view === "vault" ? "drawer-link active" : "drawer-link"} onClick={() => { setView("vault"); setMenuOpen(false); }}>FRL Vault</button>
      </aside>

      <div className="Nav">
        <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">☰</button>
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

      {view !== "vault" && <nav>
        <button onClick={() => setView("register")}>
          Register Freelancer
        </button>

        <button onClick={() => setView("createTask")}>
          Create Task
        </button>

        <button onClick={() => setView("completeTask")}>
          Complete Task
        </button>
      </nav>}

      {view !== "vault" && <div style={{ marginTop: 20 }}>

        {(view === "dashboard" || view === "register") && (
          <RegisterFreelancer account={account} />
        )}

        {view === "createTask" && (
          <CreateTask account={account} />
        )}

        {view === "completeTask" && (
          <CompleteTask account={account} />
        )}

      </div>}

      {view !== "vault" && <ViewTasks account={account} />}
      {view === "vault" && <FreelancerVault account={account} />}

    </div>
  );
}

export default App;