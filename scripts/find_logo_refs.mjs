import fs from 'fs';
import path from 'path';

function searchInDir(dir, pattern) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        searchInDir(fullPath, pattern);
      }
    } else {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (pattern.test(content)) {
        console.log(`Found pattern in ${fullPath}`);
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
          if (pattern.test(line)) {
            console.log(`  Line ${idx+1}: ${line.trim()}`);
          }
        });
      }
    }
  }
}

console.log('Searching for logo files in src/ and index.html...');
searchInDir('src', /logo/i);
searchInDir('.', /logo_ump|logo-ump/i);
