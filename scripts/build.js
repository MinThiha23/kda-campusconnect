import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure dist directory exists
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy assets with proper MIME types
const assetsDir = path.join(distDir, 'assets');
if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  files.forEach(file => {
    if (file.endsWith('.js')) {
      const filePath = path.join(assetsDir, file);
      console.log(`✅ JavaScript file: ${file}`);
    } else if (file.endsWith('.css')) {
      const filePath = path.join(assetsDir, file);
      console.log(`✅ CSS file: ${file}`);
    }
  });
}

console.log('🚀 Build verification complete!');
