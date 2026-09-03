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

import "./App.css";

function App() {
  const [view, setView] = useState("register");
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

      <div className="Nav">
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

      <nav>
        <button onClick={() => setView("register")}>
          Register Freelancer
        </button>

        <button onClick={() => setView("createTask")}>
          Create Task
        </button>

        <button onClick={() => setView("completeTask")}>
          Complete Task
        </button>
      </nav>

      <div style={{ marginTop: 20 }}>

        {view === "register" && (
          <RegisterFreelancer account={account} />
        )}

        {view === "createTask" && (
          <CreateTask account={account} />
        )}

        {view === "completeTask" && (
          <CompleteTask account={account} />
        )}

      </div>

      <ViewTasks account={account} />

    </div>
  );
}

export default App;