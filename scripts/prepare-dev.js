const fs = require('fs');
const path = require('path');

const nextDir = path.join(process.cwd(), '.next');
const turboDir = path.join(process.cwd(), '.turbo');

try {
  fs.rmSync(nextDir, { recursive: true, force: true });
  fs.rmSync(turboDir, { recursive: true, force: true });
  console.log('Cleaned .next/.turbo for a fresh dev start.');
} catch (error) {
  console.warn('Could not clean Next build artifacts before dev start:', error.message);
}
