const fs = require('fs');
const path = require('path');

const nextDir = path.join(process.cwd(), '.next');

try {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log('Cleaned .next for a fresh dev start.');
} catch (error) {
  console.warn('Could not clean .next before dev start:', error.message);
}
