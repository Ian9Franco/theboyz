const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public', 'personajes');
const GUIAS_BASE_DIR = path.join(baseDir, 'GUIAS');
const OUTPUT_FILE = path.join(__dirname, '..', 'lib', 'characterData', 'conceptArts.ts');
const charDataDir = path.join(__dirname, '..', 'lib', 'characterData');

// 1. Load all characters from JS/TS database files
const targetFiles = [
  'pibes.ts',
  'secundarios.ts',
  'antagonistas.ts',
  'deidades.ts',
  'entidades.ts',
  'matis.ts',
  'voughtverse.ts'
];

const charactersList = [];

targetFiles.forEach((filename) => {
  const filePath = path.join(charDataDir, filename);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let currentChar = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const idMatch = /^id:\s*['"`]([^'"`]+)['"`]/i.exec(line) || /^\{\s*id:\s*['"`]([^'"`]+)['"`]/i.exec(line);
    if (idMatch) {
      if (currentChar && currentChar.name) {
        if (!currentChar.category) currentChar.category = filename.replace('.ts', '');
        charactersList.push(currentChar);
      }
      currentChar = { id: idMatch[1] };
    } else if (currentChar) {
      const nameMatch = /^name:\s*['"`]([^'"`]+)['"`]/i.exec(line);
      if (nameMatch) currentChar.name = nameMatch[1];
      const categoryMatch = /^category:\s*['"`]([^'"`]+)['"`]/i.exec(line);
      if (categoryMatch) currentChar.category = categoryMatch[1];
    }
  }
  if (currentChar && currentChar.name) {
    if (!currentChar.category) currentChar.category = filename.replace('.ts', '');
    charactersList.push(currentChar);
  }
});

const categoryFolders = {
  pibes: 'boyz',
  secundarios: 'Secundarios',
  independientes: 'Secundarios',
  taberna_resistencia: 'Secundarios',
  antagonistas: 'antagonistas',
  deidades: 'deidades',
  entidades: 'entidades',
  matis: 'matis',
  voughtverse: 'voughtverse'
};

const pibeAliases = {
  ian: 'VESPERWING',
  uandi: 'AEGIS',
  julian: 'WILDCARD',
  volvo: 'VECTOR',
  mati: 'SWAPFIRE',
  jaz: 'ORACLE',
  sofi: 'HUSH'
};

// Map folder names to character IDs
const folderToCharId = {};
charactersList.forEach((char) => {
  const category = char.category.toLowerCase();
  let charFolderName;
  if (category === 'pibes' || char.category === 'pibes') {
    charFolderName = pibeAliases[char.id.toLowerCase()] || char.name.toUpperCase();
  } else {
    charFolderName = char.name.replace(/[\\/:*?"<>|]/g, '');
  }
  folderToCharId[charFolderName.toLowerCase()] = char.id;
});

const IMAGE_EXTENSIONS = new Set(['.webp', '.png', '.jpg', '.jpeg', '.gif']);

function cleanName(fileName, index, isAlt) {
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);
  
  if (base.toLowerCase().includes('chatgpt') || base.toLowerCase().includes('gemini') || /^\d+$/.test(base)) {
    return `${isAlt ? 'Alt Concept' : 'Concept Art'} ${index + 1}`;
  }
  
  return base
    .replace(/[-_]+/g, ' ')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function getImagesInDir(dirPath, urlPrefix, isAlt) {
  if (!fs.existsSync(dirPath)) return [];
  
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const images = [];
  let genericIndex = 0;
  
  for (const entry of entries) {
    if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (IMAGE_EXTENSIONS.has(ext)) {
        const lowerName = entry.name.toLowerCase();
        // Only include files whose filename contains 'sheet' (case-insensitive)
        if (lowerName.includes('sheet')) {
          const name = cleanName(entry.name, genericIndex++, isAlt);
          images.push({
            name,
            path: `${urlPrefix}/${entry.name}`,
            isAlt
          });
        }
      }
    }
  }
  
  return images;
}

function generate() {
  console.log('Generating concept arts mapping...');
  const mapping = {};
  
  if (!fs.existsSync(GUIAS_BASE_DIR)) {
    console.error(`GUIAS directory not found at: ${GUIAS_BASE_DIR}`);
    return;
  }

  // Scan all directories inside GUIAS dynamically
  const categories = fs.readdirSync(GUIAS_BASE_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  for (const category of categories) {
    const categoryDir = path.join(GUIAS_BASE_DIR, category);
    const folders = fs.readdirSync(categoryDir, { withFileTypes: true });
    
    for (const folder of folders) {
      if (folder.isDirectory()) {
        const charKey = folder.name.toLowerCase();
        const charId = folderToCharId[charKey];
        if (!charId) continue;
        
        const charDir = path.join(categoryDir, folder.name);
        const urlPrefix = `/personajes/GUIAS/${category}/${folder.name}`;
        
        const mainImages = getImagesInDir(charDir, urlPrefix, false);
        const altDir = path.join(charDir, 'alt');
        const altImages = getImagesInDir(altDir, `${urlPrefix}/alt`, true);
        
        const allImages = [...mainImages, ...altImages];
        if (allImages.length > 0) {
          mapping[charId] = allImages;
        }
      }
    }
  }
  
  const content = `// This file is auto-generated by scripts/generate-concept-arts.js. Do not edit manually.

export interface ConceptArtItem {
  name: string;
  path: string;
  isAlt: boolean;
}

export const conceptArts: Record<string, ConceptArtItem[]> = ${JSON.stringify(mapping, null, 2)};
`;
  
  fs.writeFileSync(OUTPUT_FILE, content, 'utf-8');
  console.log(`Generated ${OUTPUT_FILE} successfully!`);
}

generate();
