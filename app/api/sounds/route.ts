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
      const relPath = '/' + relative(baseDir, fullPath).replace(/\\/g, '/');
      filesList.push({
        name: item,
        path: relPath,
      });
    }
  }
  return filesList;
}

export async function GET() {
  try {
    const publicDir = join(process.cwd(), 'public');
    const soundsDir = join(publicDir, 'sounds');
    
    const sounds = getFilesRecursively(soundsDir, publicDir);

    return Response.json(sounds);
  } catch (error) {
    console.error('Error reading sounds directory:', error);
    return Response.json([]);
  }
}
