const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel build...');

try {
  // Run the build
  execSync('npm run build', { stdio: 'inherit' });
  
  // Verify the build output
  const distDir = path.join(__dirname, 'dist');
  if (!fs.existsSync(distDir)) {
    throw new Error('Build directory not found');
  }
  
  // Check for critical files
  const indexHtml = path.join(distDir, 'index.html');
  const assetsDir = path.join(distDir, 'assets');
  
  if (!fs.existsSync(indexHtml)) {
    throw new Error('index.html not found');
  }
  
  if (!fs.existsSync(assetsDir)) {
    throw new Error('assets directory not found');
  }
  
  // List assets
  const assets = fs.readdirSync(assetsDir);
  console.log('📁 Build assets:', assets);
  
  console.log('✅ Vercel build completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
