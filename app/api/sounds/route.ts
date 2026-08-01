import { readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';

function getFilesRecursively(dir: string, baseDir: string, filesList: Array<{ name: string; path: string }> = []) {
  if (!existsSync(dir)) return filesList;
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      getFilesRecursively(fullPath, baseDir, filesList);
    } else if (stat.isFile() && /\.(mp3|wav|ogg|m4a)$/i.test(item)) {
      const relPath = '/sounds/' + relative(dir === baseDir ? dir : baseDir, fullPath).replace(/\\/g, '/');
      // Normalize to always start with /sounds/
      const cleanPath = relPath.startsWith('/sounds/sounds/') ? relPath.replace('/sounds/sounds/', '/sounds/') : relPath;
      filesList.push({
        name: item,
        path: cleanPath,
      });
    }
  }
  return filesList;
}

export async function GET() {
  try {
    const publicSounds = join(process.cwd(), 'public', 'sounds');
    const comicAssetsSounds = join(process.cwd(), '..', 'the-boyz-comic', 'sounds');
    const altAssetsSounds = 'D:\\.CodeProjects\\the-boyz-comic\\sounds';

    const map = new Map<string, { name: string; path: string }>();

    // 1. Scan public/sounds if it exists
    if (existsSync(publicSounds)) {
      getFilesRecursively(publicSounds, publicSounds).forEach((s) => map.set(s.path, s));
    }

    // 2. Scan external comic assets sounds if it exists
    const externalDir = existsSync(comicAssetsSounds) ? comicAssetsSounds : (existsSync(altAssetsSounds) ? altAssetsSounds : null);
    if (externalDir) {
      getFilesRecursively(externalDir, externalDir).forEach((s) => {
        if (!map.has(s.path)) {
          map.set(s.path, s);
        }
      });
    }

    const sounds = Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
    return Response.json(sounds);
  } catch (error) {
    console.error('Error reading sounds directory:', error);
    return Response.json([]);
  }
}
