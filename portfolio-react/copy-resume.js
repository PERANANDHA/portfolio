import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.resolve(__dirname, '../Certificates/PERANANDHA_K_L_RESUME.pdf');
const destDir = path.resolve(__dirname, 'public/Certificates');
const dest = path.join(destDir, 'PERANANDHA_K_L_RESUME.pdf');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('Successfully copied resume to public/Certificates/ for production build.');
} else {
  console.warn('Warning: Source resume not found at', src);
}
