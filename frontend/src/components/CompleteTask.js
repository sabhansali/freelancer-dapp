import React, { useState } from 'react';
import web3 from '../utils/web3';
import TaskEscrow from '../abi/TaskEscrow.json';

function CompleteTask({ account }) {
  const [taskId, setTaskId] = useState('');
  const [message, setMessage] = useState('');

  const handleCompleteTask = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TaskEscrow.networks[networkId];

      const contract = new web3.eth.Contract(
        TaskEscrow.abi,
        deployedNetwork && deployedNetwork.address
      );

      await contract.methods.completeTask(taskId).send({
        from: account,
        gas: 300000
      });

      setMessage('Task completed and payment released!');
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Complete Task</h2>
      <form onSubmit={handleCompleteTask}>
        <input
          type="number"
          placeholder="Task ID"
          value={taskId}
          onChange={e => setTaskId(e.target.value)}
          required
        />
        <button type="submit">Complete Task</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CompleteTask;