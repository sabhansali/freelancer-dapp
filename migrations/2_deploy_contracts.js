const FreelancerRegistry = artifacts.require("FreelancerRegistry");
const TaskEscrow = artifacts.require("TaskEscrow");
const FreelancerToken = artifacts.require("FreelancerToken");
const FreelancerVault = artifacts.require("FreelancerVault");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(FreelancerRegistry);
  const registry = await FreelancerRegistry.deployed();

  await deployer.deploy(TaskEscrow, registry.address);

  await deployer.deploy(FreelancerToken);
  const token = await FreelancerToken.deployed();

  await deployer.deploy(FreelancerVault, token.address);

  // Seed the local Ganache deployer with FRL for the experiment.
  await token.mint(accounts[0], web3.utils.toWei("10000", "ether"));
};