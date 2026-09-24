const fs = require('fs');
const path = require('path');

const buildPath = path.join(__dirname, 'build/contracts');
const frontendPath = path.join(__dirname, 'frontend/src/abi');

const files = [
  'FreelancerRegistry.json',
  'IFreelancerRegistry.json',
  'TaskEscrow.json',
  'FreelancerToken.json',
  'FreelancerVault.json',
  'SimpleAMM.json'
];

files.forEach(file => {
  const src = path.join(buildPath, file);
  const dest = path.join(frontendPath, file);

  fs.copyFileSync(src, dest);
  console.log(`${file} copied`);
});

console.log("All contracts copied to frontend!");