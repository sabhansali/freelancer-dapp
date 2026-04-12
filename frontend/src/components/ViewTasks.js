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

  const renderTasks = (tasks) => {
    if (tasks.length === 0) {
      return <p>No tasks found</p>;
    }

    return tasks.map((task) => (
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
        <p>
          <strong>Status:</strong>
          {task.completed ? ' ✅ Completed' : ' ⏳ Pending'}
        </p>
      </div>
    ));
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