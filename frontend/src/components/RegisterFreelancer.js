import React, { useState } from 'react';
import { getContract } from '../utils/ethers';
import FreelancerRegistry from '../abi/FreelancerRegistry.json';

function RegisterFreelancer({ account }) {
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const contract = await getContract(FreelancerRegistry);

      const tx = await contract.register(name, skill, {
        gasLimit: 200000
      });

      await tx.wait();

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