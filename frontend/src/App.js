import React, { useState, useEffect } from "react";
import { requestAccounts } from "./utils/ethers";
import RegisterFreelancer from "./components/RegisterFreelancer";
import CreateTask from "./components/CreateTask";
import CompleteTask from "./components/CompleteTask";
import ViewTasks from "./components/ViewTasks";
import "./App.css";

function App() {
  const [view, setView] = useState("register");
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    try {
      const accounts = await requestAccounts();
      setAccount(accounts[0] || "");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
    const handleAccountsChanged = (accounts) => {
      setAccount(accounts[0] || "");
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );
    };
  }
  }, []);

  return (
    <div className="App">
      <div className="Nav">
        <h1>Freelancer Escrow DApp</h1>

        <p style={{ textAlign: "center", fontSize: "14px", color: "#94a3b8" }}>
          Secure freelance payments using blockchain escrow
        </p>
      </div>

      <div className="account-row">
        <h4>
          <strong>Connected Account:</strong> {account || "Not connected"}
        </h4>

        <button className="connect-wallet" onClick={connectWallet}>
          {account ? "✓ MetaMask Connected" : "Connect MetaMask"}
        </button>
      </div>

      <nav>
        <button onClick={() => setView("register")}>Register Freelancer</button>

        <button onClick={() => setView("createTask")}>Create Task</button>

        <button onClick={() => setView("completeTask")}>Complete Task</button>
      </nav>

      <div style={{ marginTop: 20 }}>
        {view === "register" && <RegisterFreelancer account={account} />}

        {view === "createTask" && <CreateTask account={account} />}

        {view === "completeTask" && <CompleteTask account={account} />}
      </div>

      <ViewTasks account={account} />
    </div>
  );
}

export default App;
