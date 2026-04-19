import React, { useState } from 'react';
import web3 from '../utils/web3';
import TaskEscrow from '../abi/TaskEscrow.json';


function CreateTask({ account }) {
  const [freelancer, setFreelancer] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [durationUnit, setDurationUnit] = useState('hours');
  const [message, setMessage] = useState('');

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setMessage('');

    let durationSec = 0;
    if (durationUnit === 'minutes') durationSec = parseInt(duration) * 60;
    else if (durationUnit === 'hours') durationSec = parseInt(duration) * 3600;
    else if (durationUnit === 'days') durationSec = parseInt(duration) * 86400;
    if (!durationSec || durationSec <= 0) {
      setMessage('Enter a valid deadline duration.');
      return;
    }

    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TaskEscrow.networks[networkId];

      const contract = new web3.eth.Contract(
        TaskEscrow.abi,
        deployedNetwork && deployedNetwork.address
      );

      await contract.methods.createTask(freelancer, description, durationSec).send({
        from: account,
        value: web3.utils.toWei(amount, 'ether'),
        gas: 300000
      });

      setMessage('Task created and payment locked!');
      setDescription('');
      setFreelancer('');
      setAmount('');
      setDuration('');

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

        <div style={{ margin: '10px 0' }}>
          <input
            type="number"
            min="1"
            placeholder="Deadline Duration"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            style={{ width: 120, marginRight: 5 }}
            required
          />
          <select value={durationUnit} onChange={e => setDurationUnit(e.target.value)}>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </div>

        <button type="submit">Create Task</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateTask;