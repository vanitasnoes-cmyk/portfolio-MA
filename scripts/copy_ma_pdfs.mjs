import fs from 'fs';
import path from 'path';

const pdfsToCopy = [
  { src: 'BÀI 1 MA.pdf', dest: 'public/files/Bai_1_DangMaiAnh.pdf' },
  { src: 'BÀI 2 MA.pdf', dest: 'public/files/Bai_2_DangMaiAnh.pdf' },
  { src: 'BÀI 3 MA.pdf', dest: 'public/files/Bai_3_DangMaiAnh.pdf' },
  { src: 'BÀI 4 MA.pdf', dest: 'public/files/Bai_4_DangMaiAnh.pdf' },
  { src: 'BÀI 5 MA.pdf', dest: 'public/files/Bai_5_DangMaiAnh.pdf' },
  { src: 'BÀI 6 MA.pdf', dest: 'public/files/Bai_6_DangMaiAnh.pdf' },
  { src: 'BÀI 7 MA.pdf', dest: 'public/files/Bai_7_DangMaiAnh.pdf' }
];

function runCopy() {
  pdfsToCopy.forEach(mapping => {
    const srcPath = path.resolve(mapping.src);
    const destPath = path.resolve(mapping.dest);
    
    if (fs.existsSync(srcPath)) {
      try {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${mapping.src} -> ${mapping.dest}`);
      } catch (err) {
        console.error(`Error copying ${mapping.src}:`, err);
      }
    } else {
      console.warn(`Source file not found: ${srcPath}`);
    }
  });
}

runCopy();
