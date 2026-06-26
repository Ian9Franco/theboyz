const fs = require('fs');
const path = require('path');

const COMICS_DIR = path.join(__dirname, '..', '..', 'public', 'comics');

if (!fs.existsSync(COMICS_DIR)) {
  console.error(`❌ El directorio 'comics' no existe en: ${COMICS_DIR}`);
  process.exit(1);
}

const SUPPORTED_EXTS = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];

function processDirectory(dir) {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else {
      const ext = path.extname(item).toLowerCase();
      if (SUPPORTED_EXTS.includes(ext)) {
        const baseName = path.basename(item, ext).toLowerCase();
        // Skip dialogues.json or other non-image configs
        if (baseName !== 'dialogues') {
          // Truncate the file to 0 bytes
          fs.writeFileSync(fullPath, '');
          console.log(`⚡ Convertido a 0-bytes: ${path.relative(COMICS_DIR, fullPath)}`);
        }
      }
    }
  }
}

console.log('⏳ Iniciando conversión de imágenes locales a marcadores de posición de 0 bytes...');
processDirectory(COMICS_DIR);
console.log('✅ Marcadores de posición de 0 bytes creados con éxito.');
