const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// --- CONFIGURACIÓN ---
const args = process.argv.slice(2);
const deleteOriginals = true; // Por defecto siempre eliminar originales
const dryRun = args.includes('--dry-run');
const quality = 80;

const targetDir = path.join(__dirname, 'public'); // Por defecto toda la carpeta public

const PROTECTED_ASSETS = ['logo.png', 'ian.png', 'jaz.png', 'julian.png', 'mati.png', 'uandi.png', 'volvo.png', 'matapobre.png', 'sofi.png'];

// Contadores globales
let stats = { found: 0, converted: 0, deleted: 0, savedBytes: 0 };

async function convertImage(fullPath, ext) {
  const webpPath = fullPath.substring(0, fullPath.length - ext.length) + '.webp';
  
  try {
    const fileStat = await fs.stat(fullPath);
    const originalSize = fileStat.size;

    if (dryRun) {
      console.log(`[Dry Run] Would convert: ${path.basename(fullPath)}`);
      return;
    }

    const info = await sharp(fullPath).webp({ quality }).toFile(webpPath);
    stats.converted++;
    stats.savedBytes += (originalSize - info.size);

    console.log(`[Converted] ${path.basename(fullPath)} -> ${((originalSize - info.size) / 1024).toFixed(1)} KB saved`);

    if (deleteOriginals) {
      await fs.unlink(fullPath);
      stats.deleted++;
    }
  } catch (err) {
    console.error(`[Error] Failed to process ${fullPath}:`, err.message);
  }
}

async function walkDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await walkDir(fullPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        if (PROTECTED_ASSETS.includes(entry.name.toLowerCase()) && !fullPath.includes('comics') && !fullPath.includes('personajes')) continue;
        
        stats.found++;
        await convertImage(fullPath, ext);
      }
    }
  }
}

// Ejecución principal
(async () => {
  console.log('Iniciando conversión...');
  await walkDir(targetDir);
  console.log('\n--- Resumen ---');
  console.log(`Imágenes encontradas: ${stats.found}`);
  console.log(`Convertidas: ${stats.converted}`);
  console.log(`Espacio ahorrado: ${(stats.savedBytes / (1024 * 1024)).toFixed(2)} MB`);
})();