import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';

const docxFiles = [
  'BÀI 1 MA.docx',
  'BÀI 2 MA.docx',
  'BÀI 3 MA.docx',
  'BÀI 4 MA.docx',
  'BÀI 5 MA.docx',
  'BÀI 6 MA.docx',
  'BÀI 7 MA.docx'
];

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  removeNSPrefix: true,
});

function asArray(v) {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

async function analyze() {
  for (const file of docxFiles) {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) {
      console.log(`${file}: Not found`);
      continue;
    }
    
    try {
      const buf = fs.readFileSync(filePath);
      const zip = await JSZip.loadAsync(buf);
      
      const mediaFiles = Object.keys(zip.files).filter(name => name.startsWith('word/media/'));
      console.log(`${file}: found ${mediaFiles.length} media files`);
      mediaFiles.forEach(name => {
        console.log(`  - ${name} (${zip.files[name]._data.uncompressedSize} bytes)`);
      });
    } catch (err) {
      console.error(`Error analyzing ${file}:`, err);
    }
  }
}

analyze();
