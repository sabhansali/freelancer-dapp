import React, { useState } from 'react';
import web3 from '../utils/web3';
import TaskEscrow from '../abi/TaskEscrow.json';

function CreateTask({ account }) {
  const [freelancer, setFreelancer] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState(''); // ✅ NEW
  const [message, setMessage] = useState('');

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TaskEscrow.networks[networkId];

      const contract = new web3.eth.Contract(
        TaskEscrow.abi,
        deployedNetwork && deployedNetwork.address
      );

      await contract.methods.createTask(freelancer, description).send({
        from: account,
        value: web3.utils.toWei(amount, 'ether'),
        gas: 300000
      });

      setMessage('Task created and payment locked!');
      setDescription('');
      setFreelancer('');
      setAmount('');

    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Freelancer Address"
          value={freelancer}
          onChange={e => setFreelancer(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount (ETH)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />

        <button type="submit">Create Task</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateTask;