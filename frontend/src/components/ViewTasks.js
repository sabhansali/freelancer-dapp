import React, { useEffect, useState } from 'react';
import web3 from '../utils/web3';
import TaskEscrow from '../abi/TaskEscrow.json';

function ViewTasks({ account }) {
  const [details, setDetails] = useState([]);
  const [activeTab, setActiveTab] = useState('client'); // 'client' or 'freelancer'

  useEffect(() => {
    const loadTasks = async () => {
      if (!account) return;

      try {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = TaskEscrow.networks[networkId];

        const contract = new web3.eth.Contract(
          TaskEscrow.abi,
          deployedNetwork && deployedNetwork.address
        );

        const clientIds = await contract.methods.getClientTasks(account).call();
        const freelancerIds = await contract.methods.getFreelancerTasks(account).call();

        let allIds = [...new Set([...clientIds, ...freelancerIds])];

        let taskDetails = [];

        for (let id of allIds) {
          const task = await contract.methods.tasks(id).call();
          taskDetails.push({
            id: Number(id),
            ...task
          });
        }

        // sort once (correct placement)
        taskDetails.sort((a, b) => a.id - b.id);

        setDetails(taskDetails);

      } catch (err) {
        console.error(err);
      }
    };

    loadTasks();
  }, [account]);

  // filters
  const clientTasks = details.filter(
    t => t.client.toLowerCase() === account.toLowerCase()
  );

  const freelancerTasks = details.filter(
    t => t.freelancer.toLowerCase() === account.toLowerCase()
  );


  const [extendTaskId, setExtendTaskId] = useState(null);
  const [extendDuration, setExtendDuration] = useState('');
  const [extendUnit, setExtendUnit] = useState('hours');
  const [actionMsg, setActionMsg] = useState('');

  // Helper to format timestamp
  const formatDate = (ts) => {
    if (!ts || ts === '0') return '-';
    const numTs = typeof ts === 'bigint' ? Number(ts) : parseInt(ts);
    const d = new Date(numTs * 1000);
    return d.toLocaleString();
  };

  // Helper to get countdown
  const getCountdown = (deadline) => {
    const numDeadline = typeof deadline === 'bigint' ? Number(deadline) : parseInt(deadline);
    const now = Math.floor(Date.now() / 1000);
    const diff = numDeadline - now;
    if (diff <= 0) return 'Expired';
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;
    return `${h}h ${m}m ${s}s`;
  };

  // Handle reclaim funds
  const handleReclaim = async (taskId) => {
    setActionMsg('');
    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TaskEscrow.networks[networkId];
      const contract = new web3.eth.Contract(TaskEscrow.abi, deployedNetwork && deployedNetwork.address);
      await contract.methods.reclaimFunds(taskId).send({ from: account, gas: 300000 });
      setActionMsg('Funds reclaimed!');
    } catch (err) {
      setActionMsg('Error: ' + err.message);
    }
  };

  // Handle extend deadline
  const handleExtend = async (taskId) => {
    setActionMsg('');
    let durationSec = 0;
    if (extendUnit === 'minutes') durationSec = parseInt(extendDuration) * 60;
    else if (extendUnit === 'hours') durationSec = parseInt(extendDuration) * 3600;
    else if (extendUnit === 'days') durationSec = parseInt(extendDuration) * 86400;
    if (!durationSec || durationSec <= 0) {
      setActionMsg('Enter a valid extension duration.');
      return;
    }
    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TaskEscrow.networks[networkId];
      const contract = new web3.eth.Contract(TaskEscrow.abi, deployedNetwork && deployedNetwork.address);
      await contract.methods.extendDeadline(taskId, durationSec).send({ from: account, gas: 300000 });
      setActionMsg('Deadline extended!');
      setExtendTaskId(null);
      setExtendDuration('');
    } catch (err) {
      setActionMsg('Error: ' + err.message);
    }
  };

  const renderTasks = (tasks) => {
    if (tasks.length === 0) {
      return <p>No tasks found</p>;
    }

    return tasks.map((task) => {
      const now = Math.floor(Date.now() / 1000);
      const deadlinePassed = now > Number(task.deadline);
      const canReclaimOrExtend = deadlinePassed && !task.completed && !task.fundsReclaimed;
      return (
        <div
          key={task.id}
          className="task-card"
          style={{
            padding: '12px',
            marginBottom: '10px',
            background: '#0f172a',
            borderRadius: '10px'
          }}
        >
          <p><strong>ID:</strong> {task.id}</p>
          <p><strong>Client:</strong> {task.client}</p>
          <p><strong>Freelancer:</strong> {task.freelancer}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Amount:</strong> {web3.utils.fromWei(task.amount, 'ether')} ETH</p>
          <p><strong>Assigned At:</strong> {formatDate(task.assignedAt)}</p>
          <p><strong>Deadline:</strong> {formatDate(task.deadline)}</p>
          <p><strong>Countdown:</strong> {getCountdown(Number(task.deadline))}</p>
          <p>
            <strong>Status:</strong>
            {task.completed ? ' ✅ Completed' : task.fundsReclaimed ? ' 💸 Funds Reclaimed' : canReclaimOrExtend ? ' ⏰ Expired' : ' ⏳ In Progress'}
          </p>
          {/* Action buttons for client */}
          {activeTab === 'client' && canReclaimOrExtend && (
            <div style={{ marginTop: 10 }}>
              <button onClick={() => handleReclaim(task.id)} style={{ marginRight: 10 }}>Reclaim Funds</button>
              <button onClick={() => setExtendTaskId(task.id)}>Extend Deadline</button>
              {extendTaskId === task.id && (
                <div style={{ marginTop: 8 }}>
                  <input
                    type="number"
                    min="1"
                    placeholder="Duration"
                    value={extendDuration}
                    onChange={e => setExtendDuration(e.target.value)}
                    style={{ width: 80, marginRight: 5 }}
                  />
                  <select value={extendUnit} onChange={e => setExtendUnit(e.target.value)}>
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                  <button onClick={() => handleExtend(task.id)} style={{ marginLeft: 8 }}>Confirm</button>
                  <button onClick={() => setExtendTaskId(null)} style={{ marginLeft: 5 }}>Cancel</button>
                </div>
              )}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h2>My Tasks</h2>

      {/* Tabs */}
      <div style={{ display: 'flex', marginBottom: 15 }}>
        <button
          onClick={() => setActiveTab('client')}
          style={{
            flex: 1,
            marginRight: 5,
            background: activeTab === 'client' ? '#38bdf8' : '#334155',
            color: activeTab === 'client' ? 'black' : 'white',
            borderRadius: '8px',
            padding: '8px'
          }}
        >
          Assigned By Me
        </button>

        <button
          onClick={() => setActiveTab('freelancer')}
          style={{
            flex: 1,
            marginLeft: 5,
            background: activeTab === 'freelancer' ? '#38bdf8' : '#334155',
            color: activeTab === 'freelancer' ? 'black' : 'white',
            borderRadius: '8px',
            padding: '8px'
          }}
        >
          Assigned To Me
        </button>
      </div>

      {/* Content */}
      {activeTab === 'client'
        ? renderTasks(clientTasks)
        : renderTasks(freelancerTasks)}
    </div>
  );
}

export default ViewTasks;