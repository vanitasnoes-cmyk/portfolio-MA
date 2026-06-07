import fs from 'fs';

const content = fs.readFileSync('src/components/RubricSupplements.tsx', 'utf8');
const lines = content.split('\n');
console.log('Searching for "Lượng" or "25100773" or "Luong" in RubricSupplements.tsx...');
lines.forEach((line, index) => {
  if (line.includes('Lượng') || line.includes('25100773') || line.includes('Luong')) {
    console.log(`${index + 1}: ${line.trim()}`);
  }
});
