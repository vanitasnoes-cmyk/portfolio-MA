import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');
console.log('Searching for "Lượng" or "25100773"...');
lines.forEach((line, index) => {
  if (line.includes('Lượng') || line.includes('25100773')) {
    console.log(`${index + 1}: ${line.trim()}`);
  }
});
