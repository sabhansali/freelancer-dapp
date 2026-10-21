const fs = require("fs");
const path = require("path");

const buildPath = path.join(__dirname, "build", "contracts");
const frontendPath = path.join(__dirname, "frontend", "src", "abi");

const files = [
  // Existing contracts
  "FreelancerRegistry.json",
  "IFreelancerRegistry.json",
  "TaskEscrow.json",
  "FreelancerToken.json",
  "FreelancerVault.json",
  "SimpleAMM.json",
  "FRLStaking.json",
  "FRLYieldFarm.json",

  // New DEX contracts
  "FreelancerMockToken.json",
  "FreelancerLiquidityPair.json",
  "FreelancerDEXFactory.json",
  "FreelancerDEXRouter.json",
  "FreelancerLPFarm.json"
];

fs.mkdirSync(frontendPath, { recursive: true });

const missing = [];

for (const file of files) {
  const source = path.join(buildPath, file);
  const destination = path.join(frontendPath, file);

  if (!fs.existsSync(source)) {
    missing.push(file);
    console.warn(`SKIPPED — artifact not found: ${source}`);
    continue;
  }

  fs.copyFileSync(source, destination);
  console.log(`Copied ${file}`);
}

if (missing.length > 0) {
  console.warn("\nSome artifacts were not copied. Check contract names and compile first:");
  missing.forEach((file) => console.warn(`- ${file}`));
  process.exitCode = 1;
} else {
  console.log("\nAll configured contract artifacts copied successfully.");
}