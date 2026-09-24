import React, { useEffect, useState } from 'react';
import { formatUnits, parseUnits } from 'ethers';
import { getContract } from '../utils/ethers';
import FreelancerToken from '../abi/FreelancerToken.json';
import SimpleAMM from '../abi/SimpleAMM.json';
import FRLYieldFarmArtifact from '../abi/FRLYieldFarm.json';

function YieldFarming({ account }) {
  const [stats, setStats] = useState(null);
  const [approvalAmount, setApprovalAmount] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const display = value => formatUnits(value ?? 0n, 18);
  const amount = value => {
    if (!value || Number(value) <= 0) throw new Error('Enter a positive amount.');
    return parseUnits(value, 18);
  };

  const loadStats = async () => {
    if (!account) { setStats(null); return; }
    try {
      const token = await getContract(FreelancerToken);
      const pool = await getContract(SimpleAMM);
      const farm = await getContract(FRLYieldFarmArtifact);
      const [lpBalance, allowance, staked, earned, rate, liquidity] = await Promise.all([
        pool.balanceOf(account),
        pool.allowance(account, farm.target),
        farm.stakedBalance(account),
        farm.earned(account),
        farm.rewardRate(),
        farm.availableRewardLiquidity(),
        token.balanceOf(account)
      ]);
      setStats({ lpBalance, allowance, staked, earned, rate, liquidity });
    } catch (err) {
      setMessage('Unable to load farming data: ' + (err?.shortMessage || err?.message || err));
    }
  };

  useEffect(() => { loadStats(); }, [account]);

  const runTransaction = async (action, successMessage) => {
    setBusy(true); setMessage('Waiting for wallet confirmation...');
    try { const tx = await action(); await tx.wait(); setMessage(successMessage); await loadStats(); }
    catch (err) { setMessage('Error: ' + (err?.shortMessage || err?.message || err)); }
    finally { setBusy(false); }
  };

  const approve = async event => {
    event.preventDefault();
    try {
      const pool = await getContract(SimpleAMM); const farm = await getContract(FRLYieldFarmArtifact);
      await runTransaction(() => pool.approve(farm.target, amount(approvalAmount)), 'LP allowance updated for farming.');
      setApprovalAmount('');
    } catch (err) { setMessage('Error: ' + (err?.shortMessage || err?.message || err)); }
  };

  const stake = async event => {
    event.preventDefault();
    try {
      const pool = await getContract(SimpleAMM); const farm = await getContract(FRLYieldFarmArtifact); const value = amount(stakeAmount);
      const [balance, allowance] = await Promise.all([pool.balanceOf(account), pool.allowance(account, farm.target)]);
      if (balance < value) throw new Error(`Insufficient LP balance. You have ${display(balance)} fFRL-LP.`);
      if (allowance < value) throw new Error(`Approve at least ${display(value)} fFRL-LP first.`);
      await runTransaction(() => farm.stake(value), 'LP position staked successfully.'); setStakeAmount('');
    } catch (err) { setMessage('Error: ' + (err?.shortMessage || err?.message || err)); }
  };

  const harvest = async () => { const farm = await getContract(FRLYieldFarmArtifact); await runTransaction(() => farm.harvest(), 'FRL rewards harvested.'); };

  const withdraw = async event => {
    event.preventDefault();
    try { const farm = await getContract(FRLYieldFarmArtifact); const value = amount(withdrawAmount); if (stats && stats.staked < value) throw new Error(`You can withdraw up to ${display(stats.staked)} fFRL-LP.`); await runTransaction(() => farm.withdraw(value), 'LP position withdrawn.'); setWithdrawAmount(''); }
    catch (err) { setMessage('Error: ' + (err?.shortMessage || err?.message || err)); }
  };

  if (!account) return <div className="defi-empty">Connect your wallet to use Yield Farming.</div>;

  return (
    <section className="defi-page">
      <div className="defi-header"><div><p className="eyebrow">Liquidity rewards</p><h2>Yield Farming</h2><p>Earn FRL rewards by staking your FRL / ETH liquidity position.</p></div><span className="status-pill">fFRL-LP</span></div>
      {stats && <>
        <div className="defi-stats"><div><span>Your LP balance</span><strong>{display(stats.lpBalance)} fFRL-LP</strong></div><div><span>Currently farmed</span><strong>{display(stats.staked)} fFRL-LP</strong></div><div><span>FRL rewards earned</span><strong>{display(stats.earned)} FRL</strong></div><div><span>Reward rate</span><strong>{display(stats.rate)} FRL / LP / sec</strong></div></div>
        <div className="defi-info"><p><strong>Current LP allowance:</strong> {display(stats.allowance)} fFRL-LP</p><p><strong>Reward liquidity:</strong> {display(stats.liquidity)} FRL</p></div>
        <div className="defi-actions"><form onSubmit={approve}><h3>Approve LP</h3><input type="number" min="0" step="any" placeholder="LP allowance" value={approvalAmount} onChange={e => setApprovalAmount(e.target.value)} required /><button disabled={busy}>Approve LP</button></form><form onSubmit={stake}><h3>Stake LP</h3><input type="number" min="0" step="any" placeholder="fFRL-LP amount" value={stakeAmount} onChange={e => setStakeAmount(e.target.value)} required /><button disabled={busy}>Stake LP</button></form><div className="defi-action"><h3>Harvest rewards</h3><p>Available now: {display(stats.earned)} FRL</p><button disabled={busy || stats.earned === 0n} onClick={harvest}>Harvest</button></div><form onSubmit={withdraw}><h3>Withdraw LP</h3><input type="number" min="0" step="any" placeholder="fFRL-LP amount" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} required /><button disabled={busy}>Withdraw LP</button></form></div>
      </>}
      {stats && stats.lpBalance === 0n && stats.staked === 0n && <div className="defi-empty">No LP position found. Add liquidity to the FRL / ETH Pool to receive fFRL-LP, then return here to start earning FRL rewards.</div>}
      {message && <p className="defi-message">{message}</p>}
    </section>
  );
}

export default YieldFarming;