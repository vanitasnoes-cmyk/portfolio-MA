import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  removeNSPrefix: true,
  isArray: (name) => ['p', 'r', 't', 'blip', 'imagedata'].includes(name),
});

const docxFiles = [
  { id: 'bt1', name: 'BÀI 1 MA.docx', steps: 12 },
  { id: 'bt2', name: 'BÀI 2 MA.docx', steps: 5 },
  { id: 'bt3', name: 'BÀI 3 MA.docx', steps: 5 },
  { id: 'bt4', name: 'BÀI 4 MA.docx', steps: 5 },
  { id: 'bt5', name: 'BÀI 5 MA.docx', steps: 6 },
  { id: 'bt6', name: 'BÀI 6 MA.docx', steps: 5 },
  { id: 'bt7', name: 'BÀI 7 MA.docx', steps: 4 }
];

const workspaceRoot = '.';

function asArray(v) {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

function findRIds(node, relsKeys, out = []) {
  if (node == null) return out;
  if (typeof node === 'string') {
    if (relsKeys.has(node) && !out.includes(node)) {
      out.push(node);
    }
    return out;
  }
  if (Array.isArray(node)) {
    for (const item of node) findRIds(item, relsKeys, out);
    return out;
  }
  if (typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('@_') && typeof v === 'string') {
        if (relsKeys.has(v) && !out.includes(v)) {
          out.push(v);
        }
      } else {
        findRIds(v, relsKeys, out);
      }
    }
  }
  return out;
}

async function extractDocxImages(fileSpec) {
  const docxPath = path.join(workspaceRoot, fileSpec.name);
  if (!fs.existsSync(docxPath)) {
    console.log(`Skipping ${fileSpec.id} because ${fileSpec.name} not found.`);
    return [];
  }
  
  const buf = fs.readFileSync(docxPath);
  const zip = await JSZip.loadAsync(buf);

  const relsXml = await zip.file('word/_rels/document.xml.rels')?.async('string');
  const rels = new Map();
  if (relsXml) {
    const relsDoc = parser.parse(relsXml);
    for (const rel of asArray(relsDoc?.Relationships?.Relationship)) {
      const id = rel['@_Id'];
      const target = rel['@_Target'];
      if (id && target?.startsWith('media/')) {
        rels.set(id, `word/${target}`);
      }
    }
  }

  const docXml = await zip.file('word/document.xml')?.async('string');
  if (!docXml) {
    console.log(`No document.xml in ${fileSpec.name}`);
    return [];
  }

  const doc = parser.parse(docXml);
  const body = doc?.document?.body ?? doc?.body;

  const outDir = path.join(workspaceRoot, 'public/images/steps', fileSpec.id);
  if (fs.existsSync(outDir)) {
    fs.readdirSync(outDir).forEach(f => {
      try {
        fs.unlinkSync(path.join(outDir, f));
      } catch (err) {
        // ignore
      }
    });
  } else {
    fs.mkdirSync(outDir, { recursive: true });
  }

  let imgCounter = 0;
  const manifestUrls = [];
  const relsKeys = new Set(rels.keys());
  
  console.log(`\nProcessing ${fileSpec.id} - ${fileSpec.name}:`);

  const rIds = findRIds(body, relsKeys);
  const embeds = rIds.map(id => rels.get(id)).filter(Boolean);
    
  if (embeds.length > 0) {
    for (const mediaPath of embeds) {
      imgCounter++;
      // Determine file extension
      let ext = path.extname(mediaPath).toLowerCase();
      if (ext === '.jpeg') ext = '.jpg';
      if (!ext) ext = '.png';
      
      const fileName = `${String(imgCounter).padStart(2, '0')}${ext}`;
      const data = await zip.file(mediaPath)?.async('nodebuffer');
      if (data) {
        fs.writeFileSync(path.join(outDir, fileName), data);
        manifestUrls.push(`/images/steps/${fileSpec.id}/${fileName}`);
        console.log(`    Saved Image #${imgCounter} (from ${mediaPath}) -> ${fileName}`);
      }
    }
  }
  return manifestUrls;
}

async function main() {
  const extractedImages = {};
  for (const fileSpec of docxFiles) {
    extractedImages[fileSpec.id] = await extractDocxImages(fileSpec) || [];
  }
  console.log('Extraction completed successfully!');
}

main().catch(console.error);
