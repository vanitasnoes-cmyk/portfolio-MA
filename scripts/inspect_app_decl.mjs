import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');
console.log('Printing lines 115 to 135 of App.tsx:');
for (let i = 114; i < 135 && i < lines.length; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
