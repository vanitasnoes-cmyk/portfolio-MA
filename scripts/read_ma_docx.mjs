import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';

const docxFiles = [
  'BÀI 1 MA.docx',
  'BÀI 2 MA.docx',
  'BÀI 3 MA.docx',
  'BÀI 4 MA.docx',
  'BÀI 5 MA.docx',
  'BÀI 6 MA.docx',
  'BÀI 7 MA.docx'
];

async function extractText() {
  for (const file of docxFiles) {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) {
      console.log(`File does not exist: ${filePath}`);
      continue;
    }
    
    try {
      const result = await mammoth.extractRawText({ path: filePath });
      const outName = `scratch_${file.replace(/\s+/g, '_').replace('.docx', '.txt')}`;
      const outPath = path.resolve(outName);
      fs.writeFileSync(outPath, result.value);
      console.log(`Successfully extracted text for ${file} -> ${outName}`);
    } catch (err) {
      console.error(`Error extracting ${file}:`, err);
    }
  }

  // Now generate a summary file
  let summary = '';
  const txtFiles = docxFiles.map(file => `scratch_${file.replace(/\s+/g, '_').replace('.docx', '.txt')}`);
  for (const file of txtFiles) {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) {
      summary += `### Missing ${file}\n\n`;
      continue;
    }
    const content = fs.readFileSync(filePath, 'utf8').trim();
    summary += `### File: ${file} (Length: ${content.length} chars)\n\n`;
    if (content.length === 0) {
      summary += `[EMPTY]\n\n`;
      continue;
    }
    
    // Get first 1500 chars
    summary += `**Beginning:**\n\`\`\`text\n${content.slice(0, 1500)}\n\`\`\`\n\n`;
    if (content.length > 1500) {
      // Get middle
      summary += `**Middle:**\n\`\`\`text\n${content.slice(Math.floor(content.length/2) - 500, Math.floor(content.length/2) + 500)}\n\`\`\`\n\n`;
      // Get end
      summary += `**End:**\n\`\`\`text\n${content.slice(content.length - 1000)}\n\`\`\`\n\n`;
    }
    summary += `---\n\n`;
  }
  
  fs.writeFileSync('exercises_summary_ma.md', summary);
  console.log('Saved exercises summary to exercises_summary_ma.md');
}

extractText();
