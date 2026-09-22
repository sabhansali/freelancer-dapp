import React, { useEffect, useState } from 'react';
import { formatUnits, parseUnits } from 'ethers';
import { getContract } from '../utils/ethers';
import FreelancerToken from '../abi/FreelancerToken.json';
import FreelancerVaultArtifact from '../abi/FreelancerVault.json';

function FreelancerVault({ account }) {
  const [stats, setStats] = useState(null);
  const [approvalAmount, setApprovalAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [mintShares, setMintShares] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [redeemShares, setRedeemShares] = useState('');
  const [yieldAmount, setYieldAmount] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const display = (value) => formatUnits(value ?? 0n, 18);

  const loadStats = async () => {
    if (!account) {
      setStats(null);
      return;
    }

    try {
      const token = await getContract(FreelancerToken);
      const vault = await getContract(FreelancerVaultArtifact);
      const [asset, frlBalance, allowance, totalAssets, totalShares, shares, userValue, oneFrlShares, oneShareAssets] = await Promise.all([
        vault.asset(),
        token.balanceOf(account),
        token.allowance(account, vault.target),
        vault.totalAssets(),
        vault.totalSupply(),
        vault.balanceOf(account),
        vault.getUserVaultValue(account),
        vault.convertToShares(parseUnits('1', 18)),
        vault.convertToAssets(parseUnits('1', 18))
      ]);

      setStats({
        asset,
        frlBalance,
        allowance,
        totalAssets,
        totalShares,
        shares,
        userValue,
        oneFrlShares,
        oneShareAssets
      });
    } catch (err) {
      setMessage('Unable to load vault data: ' + (err?.shortMessage || err?.message || err));
    }
  };

  useEffect(() => {
    loadStats();
  }, [account]);

  const amount = (value) => {
    if (!value || Number(value) <= 0) throw new Error('Enter a positive amount.');
    return parseUnits(value, 18);
  };

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

  const approve = async (e) => {
    e.preventDefault();
    try {
      const token = await getContract(FreelancerToken);
      const vault = await getContract(FreelancerVaultArtifact);
      const value = amount(approvalAmount);
      await runTransaction(
        () => token.approve(vault.target, value),
        'FRL allowance updated for the vault.'
      );
      setApprovalAmount('');
    } catch (err) {
      setMessage('Error: ' + (err?.shortMessage || err?.message || err));
    }
  };

  const deposit = async (e) => {
    e.preventDefault();
    try {
      const token = await getContract(FreelancerToken);
      const vault = await getContract(FreelancerVaultArtifact);
      const value = amount(depositAmount);
      const [balance, allowance] = await Promise.all([
        token.balanceOf(account),
        token.allowance(account, vault.target)
      ]);

      if (balance < value) {
        throw new Error(`Insufficient FRL balance. You have ${display(balance)} FRL.`);
      }
      if (allowance < value) {
        throw new Error(`Insufficient vault allowance. Approve at least ${display(value)} FRL first.`);
      }

      await runTransaction(
        () => vault.deposit(value, account),
        'FRL deposited and vault shares received.'
      );
      setDepositAmount('');
    } catch (err) {
      setMessage('Error: ' + (err?.shortMessage || err?.message || err));
    }
  };

  const mint = async (e) => {
    e.preventDefault();
    try {
      const vault = await getContract(FreelancerVaultArtifact);
      await runTransaction(
        () => vault.mint(amount(mintShares), account),
        'Requested vault shares minted.'
      );
      setMintShares('');
    } catch (err) {
      setMessage('Error: ' + (err?.shortMessage || err?.message || err));
    }
  };

  const withdraw = async (e) => {
    e.preventDefault();
    try {
      const vault = await getContract(FreelancerVaultArtifact);
      await runTransaction(
        () => vault.withdraw(amount(withdrawAmount), account, account),
        'FRL withdrawn from the vault.'
      );
      setWithdrawAmount('');
    } catch (err) {
      setMessage('Error: ' + (err?.shortMessage || err?.message || err));
    }
  };

  const redeem = async (e) => {
    e.preventDefault();
    try {
      const vault = await getContract(FreelancerVaultArtifact);
      await runTransaction(
        () => vault.redeem(amount(redeemShares), account, account),
        'Vault shares redeemed and FRL returned.'
      );
      setRedeemShares('');
    } catch (err) {
      setMessage('Error: ' + (err?.shortMessage || err?.message || err));
    }
  };

  const addYield = async (e) => {
    e.preventDefault();
    try {
      const token = await getContract(FreelancerToken);
      const vault = await getContract(FreelancerVaultArtifact);
      const value = amount(yieldAmount);
      await runTransaction(
        async () => {
          const approval = await token.approve(vault.target, value);
          await approval.wait();
          return vault.addSimulatedYield(value);
        },
        'Simulated FRL yield added to the vault.'
      );
      setYieldAmount('');
    } catch (err) {
      setMessage('Error: ' + (err?.shortMessage || err?.message || err));
    }
  };

  if (!account) {
    return <div className="vault-empty">Connect your wallet to use the FRL vault.</div>;
  }

  return (
    <section className="vault-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Put your FRL to work and earn vault shares</p>
          <h2>FRL Savings Vault</h2>
          <p>Deposit FRL voluntarily and receive ERC-4626 vault shares.</p>
        </div>
        <span className="status-pill">FRL / fFRL</span>
      </div>

      {stats && (
        <>
          <div className="vault-stats">
            <div><span>Your FRL</span><strong>{display(stats.frlBalance)}</strong></div>
            <div><span>Your shares</span><strong>{display(stats.shares)} fFRL</strong></div>
            <div><span>Current vault value</span><strong>{display(stats.userValue)} FRL</strong></div>
            <div><span>Vault total assets</span><strong>{display(stats.totalAssets)} FRL</strong></div>
            <div><span>1 FRL converts to</span><strong>{display(stats.oneFrlShares)} fFRL</strong></div>
            <div><span>1 fFRL converts to</span><strong>{display(stats.oneShareAssets)} FRL</strong></div>
          </div>

          <div className="vault-addresses">
            <p><strong>Underlying asset:</strong> {stats.asset}</p>
            <p><strong>Current allowance:</strong> {display(stats.allowance)} FRL</p>
            <p><strong>Total shares:</strong> {display(stats.totalShares)} fFRL</p>
          </div>

          <div className="vault-actions">
            <form onSubmit={approve}>
              <h3>1. Approve FRL</h3>
              <input type="number" min="0" step="any" placeholder="FRL allowance" value={approvalAmount} onChange={e => setApprovalAmount(e.target.value)} required />
              <button disabled={busy}>Approve vault</button>
            </form>
            <form onSubmit={deposit}>
              <h3>2. Deposit assets</h3>
              <input type="number" min="0" step="any" placeholder="FRL amount" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} required />
              <button disabled={busy}>Deposit FRL</button>
            </form>
            <form onSubmit={mint}>
              <h3>Mint exact shares</h3>
              <input type="number" min="0" step="any" placeholder="fFRL shares" value={mintShares} onChange={e => setMintShares(e.target.value)} required />
              <button disabled={busy}>Mint shares</button>
            </form>
            <form onSubmit={withdraw}>
              <h3>Withdraw assets</h3>
              <input type="number" min="0" step="any" placeholder="FRL amount" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} required />
              <button disabled={busy}>Withdraw FRL</button>
            </form>
            <form onSubmit={redeem}>
              <h3>Redeem shares</h3>
              <input type="number" min="0" step="any" placeholder="fFRL shares" value={redeemShares} onChange={e => setRedeemShares(e.target.value)} required />
              <button disabled={busy}>Redeem fFRL</button>
            </form>
          </div>

          <form className="yield-form" onSubmit={addYield}>
            <div>
              <h3>Local experiment control</h3>
              <p>Simulated yield only: adds FRL assets without issuing new shares.</p>
            </div>
            <input type="number" min="0" step="any" placeholder="FRL yield" value={yieldAmount} onChange={e => setYieldAmount(e.target.value)} required />
            <button disabled={busy}>Add simulated yield</button>
          </form>
        </>
      )}

      {message && <p className="vault-message">{message}</p>}
    </section>
  );
}

export default FreelancerVault;