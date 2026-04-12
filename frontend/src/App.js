import React, { useState, useEffect } from 'react';
import web3 from './utils/web3';
import RegisterFreelancer from './components/RegisterFreelancer';
import CreateTask from './components/CreateTask';
import CompleteTask from './components/CompleteTask';
import ViewTasks from './components/ViewTasks';
import './App.css';

function App() {
  const [view, setView] = useState('register');
  const [account, setAccount] = useState('');

  useEffect(() => {
    const loadAccount = async () => {
      const accs = await web3.eth.getAccounts();
      if (accs.length > 0) {
        setAccount(accs[0]);
      }
    };

    loadAccount();

    // listen for MetaMask account change
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || '');
      });
    }
  }, []);

  return (
    <div className="App">
      <div className='Nav'>
        <h1>Freelancer Escrow DApp</h1>
        <p style={{ textAlign: 'center', fontSize: '14px', color: '#94a3b8' }}>
          Secure freelance payments using blockchain escrow
        </p>
      </div>
      <h4><strong>Connected Account:</strong> {account}</h4>

      <nav>
        <button onClick={() => setView('register')}>Register Freelancer</button>
        <button onClick={() => setView('createTask')}>Create Task</button>
        <button onClick={() => setView('completeTask')}>Complete Task</button>
      </nav>
      
      <div style={{ marginTop: 20 }}>
        {view === 'register' && <RegisterFreelancer account={account} />}
        {view === 'createTask' && <CreateTask account={account} />}
        {view === 'completeTask' && <CompleteTask account={account} />}
      </div>
      <ViewTasks account={account} />
    </div>
  );
}

export default App;