import React, { useEffect, useState } from 'react';
import { formatUnits, parseUnits } from 'ethers';
import { getContract } from '../utils/ethers';
import FreelancerToken from '../abi/FreelancerToken.json';
import FRLStakingArtifact from '../abi/FRLStaking.json';

function FRLStaking({ account }) {
  const [stats, setStats] = useState(null);
  const [approvalAmount, setApprovalAmount] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const display = value => formatUnits(value ?? 0n, 18);
  const amount = value => {
    if (!value || Number(value) <= 0) throw new Error('Enter a positive amount.');
    return parseUnits(value, 18);
  };

  const loadStats = async () => {
    if (!account) {
      setStats(null);
      return;
    }
    try {
      const token = await getContract(FreelancerToken);
      const staking = await getContract(FRLStakingArtifact);
      const [balance, allowance, staked, earned, rate, liquidity] = await Promise.all([
        token.balanceOf(account),
        token.allowance(account, staking.target),
        staking.stakedBalance(account),
        staking.earned(account),
        staking.rewardRate(),
        staking.availableRewardLiquidity()
      ]);
      setStats({ balance, allowance, staked, earned, rate, liquidity });
    } catch (err) {
      setMessage('Unable to load staking data: ' + (err?.shortMessage || err?.message || err));
    }
  };

  useEffect(() => { loadStats(); }, [account]);

  useEffect(() => {
    if (!account) return undefined;

    let cancelled = false;

    const refreshEarned = async () => {
      try {
        const staking = await getContract(FRLStakingArtifact);
        const earned = await staking.earned(account);

        if (!cancelled) {
          setStats(current => current ? { ...current, earned } : current);
        }
      } catch (err) {
        if (!cancelled) {
          setMessage('Unable to refresh staking rewards: ' + (err?.shortMessage || err?.message || err));
        }
      }
    };

    refreshEarned();
    const interval = setInterval(refreshEarned, 5000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [account]);

  const runTransaction = async (action, successMessage) => {
    setBusy(true);
    setMessage('Waiting for wallet confirmation...');
    try {
      const tx = await action();
      await tx.wait();
      setMessage(successMessage);
      await loadStats();
    } catch (err) {
      setMessage('Error: ' + (err?.shortMessage || err?.message || err));
    } finally {
      setBusy(false);
    }
  };

  const approve = async event => {
    event.preventDefault();
    try {
      const token = await getContract(FreelancerToken);
      const staking = await getContract(FRLStakingArtifact);
      await runTransaction(
        () => token.approve(staking.target, amount(approvalAmount)),
        'FRL allowance updated for staking.'
      );
      setApprovalAmount('');
    } catch (err) {
      setMessage('Error: ' + (err?.shortMessage || err?.message || err));
    }
  };

  const stake = async event => {
    event.preventDefault();
    try {
      const token = await getContract(FreelancerToken);
      const staking = await getContract(FRLStakingArtifact);
      const value = amount(stakeAmount);
      const [balance, allowance] = await Promise.all([
        token.balanceOf(account),
        token.allowance(account, staking.target)
      ]);
      if (balance < value) throw new Error(`Insufficient FRL balance. You have ${display(balance)} FRL.`);
      if (allowance < value) throw new Error(`Approve at least ${display(value)} FRL first.`);
      await runTransaction(() => staking.stake(value), 'FRL staked successfully.');
      setStakeAmount('');
    } catch (err) {
      setMessage('Error: ' + (err?.shortMessage || err?.message || err));
    }
  };

  const claim = async () => {
    const staking = await getContract(FRLStakingArtifact);
    await runTransaction(() => staking.claimReward(), 'FRL rewards claimed.');
  };

  const unstake = async event => {
    event.preventDefault();
    try {
      const staking = await getContract(FRLStakingArtifact);
      const value = amount(unstakeAmount);
      if (stats && stats.staked < value) throw new Error(`You can unstake up to ${display(stats.staked)} FRL.`);
      await runTransaction(() => staking.unstake(value), 'FRL unstaked successfully.');
      setUnstakeAmount('');
    } catch (err) {
      setMessage('Error: ' + (err?.shortMessage || err?.message || err));
    }
  };

  if (!account) return <div className="defi-empty">Connect your wallet to use FRL Staking.</div>;

  return (
    <section className="defi-page">
      <div className="defi-header">
        <div><p className="eyebrow">FRL rewards</p><h2>FRL Staking</h2><p>Stake FRL and earn rewards over time.</p></div>
        <span className="status-pill">FRL</span>
      </div>
      {stats && <>
        <div className="defi-stats">
          <div><span>Your FRL balance</span><strong>{display(stats.balance)} FRL</strong></div>
          <div><span>Currently staked</span><strong>{display(stats.staked)} FRL</strong></div>
          <div><span>Rewards earned</span><strong>{display(stats.earned)} FRL</strong></div>
          <div><span>Reward rate</span><strong>{display(stats.rate)} FRL / FRL / sec</strong></div>
        </div>
        <div className="defi-info"><p><strong>Current allowance:</strong> {display(stats.allowance)} FRL</p><p><strong>Reward liquidity:</strong> {display(stats.liquidity)} FRL</p></div>
        <div className="defi-actions">
          <form onSubmit={approve}><h3>Approve FRL</h3><input type="number" min="0" step="any" placeholder="FRL allowance" value={approvalAmount} onChange={e => setApprovalAmount(e.target.value)} required /><button disabled={busy}>Approve FRL</button></form>
          <form onSubmit={stake}><h3>Stake FRL</h3><input type="number" min="0" step="any" placeholder="FRL amount" value={stakeAmount} onChange={e => setStakeAmount(e.target.value)} required /><button disabled={busy}>Stake</button></form>
          <div className="defi-action"><h3>Claim rewards</h3><p>Available now: {display(stats.earned)} FRL</p><button disabled={busy || stats.earned === 0n} onClick={claim}>Claim rewards</button></div>
          <form onSubmit={unstake}><h3>Unstake FRL</h3><input type="number" min="0" step="any" placeholder="FRL amount" value={unstakeAmount} onChange={e => setUnstakeAmount(e.target.value)} required /><button disabled={busy}>Unstake</button></form>
        </div>
      </>}
      {message && <p className="defi-message">{message}</p>}
    </section>
  );
}

export default FRLStaking;