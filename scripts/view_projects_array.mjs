import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');

let start = -1;
let end = -1;

lines.forEach((line, index) => {
  if (line.includes('const portfolioProjects') || line.includes('const portfolioLessons')) {
    start = index;
  }
  if (start !== -1 && end === -1 && line.includes('];') && index > start) {
    end = index;
  }
});

if (start !== -1 && end !== -1) {
  console.log(`Found projects array from line ${start + 1} to ${end + 1}:`);
  for (let i = start; i <= end; i++) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
} else {
  console.log('Not found, printing lines 100 to 260 of App.tsx...');
  for (let i = 100; i < 260 && i < lines.length; i++) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
}
