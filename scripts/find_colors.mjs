import fs from 'fs';

function findHexInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = content.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
  const rgbMatches = content.match(/rgba?\([^)]+\)/g) || [];
  return {
    hex: Array.from(new Set(matches)),
    rgb: Array.from(new Set(rgbMatches))
  };
}

console.log('Colors in src/index.css:', findHexInFile('src/index.css'));
console.log('Colors in src/App.tsx:', findHexInFile('src/App.tsx'));
