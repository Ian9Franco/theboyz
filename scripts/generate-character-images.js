const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public', 'personajes');
const portadasDir = path.join(baseDir, 'PORTADAS');
const fichasDir = path.join(baseDir, 'FICHAS');
const fullbodyDir = path.join(baseDir, 'FULLBODY');
const closeupDir = path.join(baseDir, 'CLOSEUP');
const locacionesDir = path.join(baseDir, 'Locaciones');
const charDataDir = path.join(__dirname, '..', 'lib', 'characterData');
const OUTPUT_FILE = path.join(__dirname, '..', 'lib', 'characterData', 'characterImages.ts');

// 1. Load all characters from JS/TS database files (including locaciones)
const targetFiles = [
  'pibes.ts',
  'secundarios.ts',
  'antagonistas.ts',
  'deidades.ts',
  'entidades.ts',
  'matis.ts',
  'voughtverse.ts',
  'locaciones.ts'
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
  voughtverse: 'voughtverse',
  locaciones: 'Locaciones'
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

const IMAGE_EXTENSIONS = ['.webp', '.png', '.jpg', '.jpeg', '.gif'];

function getFilesRecursively(dir, filesList = []) {
  if (!fs.existsSync(dir)) return filesList;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getFilesRecursively(fullPath, filesList);
    } else {
      filesList.push(fullPath);
    }
  }
  return filesList;
}

// Convert absolute file path to a web URL path
function toWebPath(absolutePath) {
  const rel = path.relative(path.join(__dirname, '..', 'public'), absolutePath);
  return '/' + rel.replace(/\\/g, '/');
}

const mapping = {};

charactersList.forEach((char) => {
  const id = char.id;
  const category = char.category.toLowerCase();
  
  const charImages = {
    portada: null,
    portadas: [],
    ficha: null,
    fichas: [],
    bodies: [],
    closeups: []
  };

  if (category === 'locaciones' || char.category === 'locaciones') {
    // Locaciones: they have cover and ficha in the same directory under Locaciones/<CharName>/
    const locCharDir = path.join(locacionesDir, char.name);
    if (fs.existsSync(locCharDir)) {
      const files = getFilesRecursively(locCharDir);
      files.forEach((file) => {
        const ext = path.extname(file).toLowerCase();
        if (!IMAGE_EXTENSIONS.includes(ext)) return;
        
        const webPath = toWebPath(file);
        const lowerName = path.basename(file).toLowerCase();
        
        if (lowerName.includes('ficha')) {
          charImages.fichas.push(webPath);
        } else {
          charImages.portadas.push(webPath);
        }
      });
      // Sort and assign primary
      if (charImages.portadas.length > 0) charImages.portada = charImages.portadas[0];
      if (charImages.fichas.length > 0) charImages.ficha = charImages.fichas[0];
    }
  } else {
    // Standard characters
    const catFolderName = categoryFolders[category] || categoryFolders[category + 's'] || category;
    
    let charFolderName;
    if (category === 'pibes' || char.category === 'pibes') {
      charFolderName = pibeAliases[id.toLowerCase()] || char.name.toUpperCase();
    } else {
      charFolderName = char.name.replace(/[\\/:*?"<>|]/g, '').replace(/\.+$/, '');
    }

    // 1. Portadas
    const charPortadasDir = path.join(portadasDir, char.name.replace(/[\\/:*?"<>|]/g, '').replace(/\.+$/, ''));
    if (fs.existsSync(charPortadasDir)) {
      const files = getFilesRecursively(charPortadasDir);
      files.forEach((file) => {
        if (file.toLowerCase().includes('archor')) return; // Exclude Vesper Archor secret images
        const ext = path.extname(file).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
          charImages.portadas.push(toWebPath(file));
        }
      });
      // Try to prioritize the cleaner filename if there are multiple portadas
      charImages.portadas.sort((a, b) => {
        const nameA = path.basename(a).toLowerCase();
        const nameB = path.basename(b).toLowerCase();
        
        // 1. Check if it matches the main character identifier
        const extA = path.extname(a).toLowerCase();
        const extB = path.extname(b).toLowerCase();
        const cleanNameA = nameA.replace(extA, '');
        const cleanNameB = nameB.replace(extB, '');
        
        const mainAlias = (pibeAliases[id.toLowerCase()] || '').toLowerCase();
        const isMainA = cleanNameA === id.toLowerCase() || 
                        cleanNameA === char.name.toLowerCase() || 
                        cleanNameA === mainAlias;
        const isMainB = cleanNameB === id.toLowerCase() || 
                        cleanNameB === char.name.toLowerCase() || 
                        cleanNameB === mainAlias;
                        
        if (isMainA && !isMainB) return -1;
        if (!isMainA && isMainB) return 1;

        // 2. Depth comparison (fewer segments = closer to root)
        const depthA = a.split('/').length;
        const depthB = b.split('/').length;
        if (depthA !== depthB) {
          return depthA - depthB;
        }

        // 3. Tag check
        const isTagA = nameA.includes('spoiler') || nameA.includes('cosmic') || nameA.includes('alt') || nameA.includes('variant');
        const isTagB = nameB.includes('spoiler') || nameB.includes('cosmic') || nameB.includes('alt') || nameB.includes('variant');
        if (isTagA && !isTagB) return 1;
        if (!isTagA && isTagB) return -1;

        // 4. Alphabetical
        return nameA.localeCompare(nameB);
      });
      if (charImages.portadas.length > 0) charImages.portada = charImages.portadas[0];
    }

    // 2. Fichas
    const charFichasDir = path.join(fichasDir, catFolderName, charFolderName);
    if (fs.existsSync(charFichasDir)) {
      const files = getFilesRecursively(charFichasDir);
      files.forEach((file) => {
        if (file.toLowerCase().includes('archor')) return; // Exclude Vesper Archor secret images
        const ext = path.extname(file).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
          charImages.fichas.push(toWebPath(file));
        }
      });
      // Sort so that the main ficha (contains only "ficha" or cleaner name) comes first
      charImages.fichas.sort((a, b) => {
        const extA = path.extname(a).toLowerCase();
        const extB = path.extname(b).toLowerCase();
        const nameA = path.basename(a).toLowerCase();
        const nameB = path.basename(b).toLowerCase();
        // Ficha before fichaAlt/ficha2/etc.
        const isBareA = nameA === `${id}_ficha${extA}` || nameA === `${char.name.toLowerCase()}_ficha${extA}`;
        const isBareB = nameB === `${id}_ficha${extB}` || nameB === `${char.name.toLowerCase()}_ficha${extB}`;
        if (isBareA && !isBareB) return -1;
        if (!isBareA && isBareB) return 1;
        return nameA.localeCompare(nameB);
      });
      if (charImages.fichas.length > 0) charImages.ficha = charImages.fichas[0];
    }

    // 3. Fullbodies
    const charFullbodiesDir = path.join(fullbodyDir, catFolderName, charFolderName);
    if (fs.existsSync(charFullbodiesDir)) {
      const files = getFilesRecursively(charFullbodiesDir);
      files.forEach((file) => {
        if (file.toLowerCase().includes('archor')) return; // Exclude Vesper Archor secret images
        const ext = path.extname(file).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
          charImages.bodies.push(toWebPath(file));
        }
      });
    }

    // 4. Closeups
    const charCloseupsDir = path.join(closeupDir, catFolderName, charFolderName);
    if (fs.existsSync(charCloseupsDir)) {
      const files = getFilesRecursively(charCloseupsDir);
      files.forEach((file) => {
        if (file.toLowerCase().includes('archor')) return; // Exclude Vesper Archor secret images
        const ext = path.extname(file).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
          charImages.closeups.push(toWebPath(file));
        }
      });
    }
  }

  mapping[id] = charImages;
});

const content = `// This file is auto-generated by scripts/generate-character-images.js. Do not edit manually.

export interface CharacterImages {
  portada: string | null;
  portadas: string[];
  ficha: string | null;
  fichas: string[];
  bodies: string[];
  closeups: string[];
}

export const characterImages: Record<string, CharacterImages> = ${JSON.stringify(mapping, null, 2)};
`;

fs.writeFileSync(OUTPUT_FILE, content, 'utf-8');
console.log(`Generated ${OUTPUT_FILE} successfully!`);
