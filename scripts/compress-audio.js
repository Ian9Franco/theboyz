const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// --- CONFIGURACIÓN ---
const targetDir = path.join(__dirname, "..", "public", "sounds");

let ffmpegPath;
try {
  ffmpegPath = require('ffmpeg-static');
} catch (e) {
  console.log("ffmpeg-static no está instalado. Instalándolo en devDependencies...");
  try {
    execSync('npm install -D ffmpeg-static', { stdio: 'inherit' });
    ffmpegPath = require('ffmpeg-static');
  } catch (err) {
    console.error("Error al instalar ffmpeg-static:", err.message);
    process.exit(1);
  }
}

async function compressAudioFiles() {
  if (!fs.existsSync(targetDir)) {
    console.error(`La carpeta de sonidos no existe en: ${targetDir}`);
    return;
  }

  const files = fs.readdirSync(targetDir).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.mp3', '.wav', '.ogg', '.m4a'].includes(ext);
  });

  console.log(`Encontrados ${files.length} archivos de audio para procesar.`);
  let totalSaved = 0;

  for (const file of files) {
    const fullPath = path.join(targetDir, file);
    const stat = fs.statSync(fullPath);
    const originalSize = stat.size;

    // Si el archivo ya es muy pequeño (ej. < 50 KB), no vale la pena comprimirlo más
    if (originalSize < 50 * 1024 && path.extname(file).toLowerCase() === '.mp3') {
      console.log(`[Omitido] ${file} ya es pequeño (${(originalSize / 1024).toFixed(1)} KB)`);
      continue;
    }

    const tempPath = path.join(targetDir, `temp_${file}`);
    console.log(`[Procesando] ${file} (${(originalSize / (1024 * 1024)).toFixed(2)} MB)...`);

    try {
      // Determinamos parámetros según el tamaño del archivo (efectos cortos vs música)
      // Si pesa menos de 1 MB, asumimos que es SFX -> Comprimimos a mono 96kbps
      // Si pesa más, asumimos que es música -> Comprimimos a estéreo 128kbps
      const isSFX = originalSize < 1 * 1024 * 1024;
      const audioChannels = isSFX ? '-ac 1' : '-ac 2';
      const audioBitrate = isSFX ? '-b:a 96k' : '-b:a 128k';

      // Ejecutamos la compresión con ffmpeg a MP3
      // Forzamos salida en formato MP3 para sobreescribir el archivo original con la misma extensión
      execSync(`"${ffmpegPath}" -y -i "${fullPath}" ${audioChannels} ${audioBitrate} -ar 44100 "${tempPath}"`, { stdio: 'ignore' });

      if (fs.existsSync(tempPath)) {
        const tempStat = fs.statSync(tempPath);
        const compressedSize = tempStat.size;

        if (compressedSize < originalSize) {
          // Reemplazar el archivo original
          fs.unlinkSync(fullPath);
          fs.renameSync(tempPath, fullPath);
          const saved = originalSize - compressedSize;
          totalSaved += saved;
          console.log(`[Completado] ${file} -> Ahorrado: ${(saved / (1024 * 1024)).toFixed(2)} MB (Nuevo tamaño: ${(compressedSize / (1024 * 1024)).toFixed(2)} MB)`);
        } else {
          // Si por alguna razón pesa más, mantenemos el original y borramos el temporal
          fs.unlinkSync(tempPath);
          console.log(`[Omitido] ${file} la compresión no redujo el tamaño.`);
        }
      }
    } catch (err) {
      console.error(`[Error] Falló la compresión de ${file}:`, err.message);
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    }
  }

  console.log(`\n--- Resumen ---`);
  console.log(`Espacio total ahorrado en audios: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB`);
}

compressAudioFiles();
