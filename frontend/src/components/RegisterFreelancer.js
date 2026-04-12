import React, { useState } from 'react';
import web3 from '../utils/web3';
import FreelancerRegistry from '../abi/FreelancerRegistry.json';

function RegisterFreelancer({ account }) {
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FreelancerRegistry.networks[networkId];

      const contract = new web3.eth.Contract(
        FreelancerRegistry.abi,
        deployedNetwork && deployedNetwork.address
      );

      await contract.methods.register(name, skill).send({
        from: account,
        gas: 200000
      });

      setMessage('Registration successful!');
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Register as Freelancer</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterFreelancer;