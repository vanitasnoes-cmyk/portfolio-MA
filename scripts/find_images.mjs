import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');
console.log('Searching for image references in App.tsx...');
lines.forEach((line, index) => {
  if (line.includes('.jpg') || line.includes('.png') || line.includes('.svg') || line.includes('logo') || line.includes('avatar') || line.includes('ẢNH')) {
    console.log(`${index + 1}: ${line.trim()}`);
  }
});
