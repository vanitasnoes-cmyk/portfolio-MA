import fs from 'fs';
import path from 'path';

const filesToCopy = [
  { src: 'ẢNH MA.jpg', dest: 'public/images/avatar_ma.jpg' },
  { src: 'logo-ump.jpg', dest: 'public/images/logo_ump.jpg' },
  { src: 'ẢNH 1.jpg', dest: 'public/images/anh_1.jpg' },
  { src: 'ẢNH 2.jpg', dest: 'public/images/anh_2.jpg' },
  { src: 'ẢNH 3.jpg', dest: 'public/images/anh_3.jpg' },
  { src: 'ẢNH 4.jpg', dest: 'public/images/anh_4.jpg' },
  { src: 'ẢNH 5.jpg', dest: 'public/images/anh_5.jpg' },
  { src: 'ẢNH 6.jpg', dest: 'public/images/anh_6.jpg' },
  { src: 'ẢNH 7.jpg', dest: 'public/images/anh_7.jpg' }
];

function runCopy() {
  filesToCopy.forEach(mapping => {
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
