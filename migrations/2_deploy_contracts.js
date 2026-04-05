const FreelancerRegistry = artifacts.require("FreelancerRegistry");
const TaskEscrow = artifacts.require("TaskEscrow");

module.exports = async function (deployer) {
  await deployer.deploy(FreelancerRegistry);
  const registry = await FreelancerRegistry.deployed();

  await deployer.deploy(TaskEscrow, registry.address);
};