import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const soundsDir = join(process.cwd(), 'public', 'sounds');
    
    // Get all files in sounds directory
    const files = readdirSync(soundsDir).filter(file => {
      const stat = statSync(join(soundsDir, file));
      return stat.isFile() && /\.(mp3|wav|ogg|m4a)$/i.test(file);
    });

    const sounds = files.map(file => ({
      name: file,
      path: `/sounds/${file}`,
    }));

    return Response.json(sounds);
  } catch (error) {
    console.error('Error reading sounds directory:', error);
    return Response.json([]);
  }
}
