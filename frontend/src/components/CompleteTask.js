import React, { useState } from 'react';
import { getContract } from '../utils/ethers';
import TaskEscrow from '../abi/TaskEscrow.json';

function CompleteTask({ account }) {
  const [taskId, setTaskId] = useState('');
  const [message, setMessage] = useState('');

  const handleCompleteTask = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const contract = await getContract(TaskEscrow);

      const tx = await contract.completeTask(taskId, {
        gas: 300000
      });

      await tx.wait();

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