const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', '..', 'public', 'personajes');
const portadasDir = path.join(baseDir, 'PORTADAS');
const fichasDir = path.join(baseDir, 'FICHAS');
const fullbodyDir = path.join(baseDir, 'FULLBODY');
const closeupDir = path.join(baseDir, 'CLOSEUP');
const locacionesDir = path.join(baseDir, 'Locaciones');
const charDataDir = path.join(__dirname, '..', '..', 'lib', 'characterData');
const OUTPUT_FILE = path.join(__dirname, '..', '..', 'lib', 'characterData', 'characterImages.ts');

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

// Hero aliases as they appear in PORTADAS/ filenames — used for sort priority
const pibeAliases = {
  ian: 'VESPERWING',
  uandi: 'AEGIS',
  julian: 'WILDCARD',
  volvo: 'NULL-VECTOR',
  mati: 'SWAPFIRE',
  jaz: 'ORACLE',
  sofi: 'HUSH'
};

// Actual subfolder names inside Fichas/boyz/ — may differ from portada aliases
const fichaFolderAliases = {
  ian: 'VESPERWING',
  uandi: 'AEGIS',
  julian: 'WILDCARD',
  volvo: 'VECTOR',
  mati: 'SWAPFIRE',
  jaz: 'ORACLE',
  sofi: 'HUSH'
};

const IMAGE_EXTENSIONS = ['.webp', '.png', '.jpg', '.jpeg', '.gif'];

const characterExclusions = {
  ian: ['archor', 'spoiler', '_mk', 'vesperwing_mk', 'cosmic'],
  mati: ['sinmati', 'portada_sin', 'mati.webp', 'mati.png', 'mati.jpg']
};

function shouldExcludeFile(id, file) {
  const lowerFile = file.toLowerCase();
  
  // Always exclude archor globally
  if (lowerFile.includes('archor')) return true;

  const excludePatterns = characterExclusions[id.toLowerCase()] || [];
  return excludePatterns.some(pattern => {
    if (pattern.includes('.')) {
      return path.basename(lowerFile) === pattern.toLowerCase();
    }
    return lowerFile.includes(pattern.toLowerCase());
  });
}

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

// Helper to find the actual case-sensitive path on the disk for a list of path segments
function findActualPath(base, segments) {
  let current = base;
  for (const segment of segments) {
    if (!fs.existsSync(current)) return null;
    const items = fs.readdirSync(current);
    const match = items.find(item => item.toLowerCase() === segment.toLowerCase());
    if (!match) return null;
    current = path.join(current, match);
  }
  return current;
}

// Convert absolute file path to a web URL path
function toWebPath(absolutePath) {
  const rel = path.relative(path.join(__dirname, '..', '..', 'public'), absolutePath);
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
    const locCharDir = findActualPath(baseDir, ['Locaciones', char.name]);
    if (locCharDir && fs.existsSync(locCharDir)) {
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
      charFolderName = fichaFolderAliases[id.toLowerCase()] || char.name.toUpperCase();
    } else {
      charFolderName = char.name.replace(/[\\/:*?"<>|]/g, '').replace(/\.+$/, '');
    }

    // 1. Portadas
    const charPortadasDir = findActualPath(baseDir, ['PORTADAS', char.name.replace(/[\\/:*?"<>|]/g, '').replace(/\.+$/, '')]);
    if (charPortadasDir && fs.existsSync(charPortadasDir)) {
      const files = getFilesRecursively(charPortadasDir);
      files.forEach((file) => {
        if (shouldExcludeFile(id, file)) return;
        const ext = path.extname(file).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
          charImages.portadas.push(toWebPath(file));
        }
      });
      // Try to prioritize the cleaner filename if there are multiple portadas
      charImages.portadas.sort((a, b) => {
        const nameA = path.basename(a).toLowerCase();
        const nameB = path.basename(b).toLowerCase();
        
        const extA = path.extname(a).toLowerCase();
        const extB = path.extname(b).toLowerCase();
        const cleanNameA = nameA.replace(extA, '');
        const cleanNameB = nameB.replace(extB, '');

        // Suffix modifiers that demote an image from being the primary portada
        const MODIFIERS = ['_alt', '_mk', 'spoiler', 'cosmic', 'variant', 'portada_sin', 'variantes'];
        const hasModifierA = MODIFIERS.some(m => cleanNameA.includes(m));
        const hasModifierB = MODIFIERS.some(m => cleanNameB.includes(m));

        // For pibes: hero alias ranks FIRST (e.g. vesperwing > ian > ian_alt)
        // For others: char name/id ranks first
        const mainAlias = (pibeAliases[id.toLowerCase()] || '').toLowerCase();
        const isPibe = !!mainAlias;

        const isAliasA = cleanNameA === mainAlias;
        const isAliasB = cleanNameB === mainAlias;
        const isNameA  = cleanNameA === id.toLowerCase() || cleanNameA === char.name.toLowerCase();
        const isNameB  = cleanNameB === id.toLowerCase() || cleanNameB === char.name.toLowerCase();

        // Rank 0: exact hero alias match (Vesperwing, Oracle, etc.)
        if (isPibe) {
          if (isAliasA && !isAliasB) return -1;
          if (!isAliasA && isAliasB) return 1;
        }

        // Rank 1: exact name/id match WITHOUT modifier
        const isCleanMainA = (isAliasA || isNameA) && !hasModifierA;
        const isCleanMainB = (isAliasB || isNameB) && !hasModifierB;
        if (isCleanMainA && !isCleanMainB) return -1;
        if (!isCleanMainA && isCleanMainB) return 1;

        // Rank 2: any match (id or name, possibly with modifier)
        const isMainA = isAliasA || isNameA;
        const isMainB = isAliasB || isNameB;
        if (isMainA && !isMainB) return -1;
        if (!isMainA && isMainB) return 1;

        // Rank 3: depth (fewer path segments = closer to root folder)
        const depthA = a.split('/').length;
        const depthB = b.split('/').length;
        if (depthA !== depthB) return depthA - depthB;

        // Rank 4: modifier check (demote tagged images)
        if (hasModifierA && !hasModifierB) return 1;
        if (!hasModifierA && hasModifierB) return -1;

        // Rank 5: alphabetical
        return nameA.localeCompare(nameB);
      });
      if (charImages.portadas.length > 0) charImages.portada = charImages.portadas[0];
    }

    // 2. Fichas
    const charFichasDir = findActualPath(baseDir, ['Fichas', catFolderName, charFolderName]);
    if (charFichasDir && fs.existsSync(charFichasDir)) {
      const files = getFilesRecursively(charFichasDir);
      files.forEach((file) => {
        if (shouldExcludeFile(id, file)) return;
        const ext = path.extname(file).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
          charImages.fichas.push(toWebPath(file));
        }
      });
      // Sort so that the main ficha (contains only "ficha" or cleaner name) comes first
      charImages.fichas.sort((a, b) => {
        const extA = path.extname(a).toLowerCase();
        const extB = path.extname(b).toLowerCase();
        const nameA = path.basename(a, extA).toLowerCase();
        const nameB = path.basename(b, extB).toLowerCase();

        // Ranks: lower is better (comes first)
        const getRank = (name) => {
          const cleanName = (pibeAliases[id.toLowerCase()] || char.name || '').toLowerCase();
          const cleanId = id.toLowerCase();
          
          if (name === `${cleanId}_ficha` || name === `${cleanName}_ficha` || name === 'ficha') {
            return 0;
          }
          
          // Contains ficha but no modifier/tags/numbers
          if (name.includes('ficha') && !name.includes('alt') && !name.includes('spoiler') && !name.includes('concept') && !name.includes('cosmic') && !name.includes('vought') && !name.includes('variant') && !/\d/.test(name)) {
            return 1;
          }
          
          // Other ficha files with modifiers
          if (name.includes('ficha')) {
            return 2;
          }
          
          // Any other image (like MK, etc.)
          return 3;
        };

        const rankA = getRank(nameA);
        const rankB = getRank(nameB);

        if (rankA !== rankB) {
          return rankA - rankB;
        }

        return nameA.localeCompare(nameB);
      });
      if (charImages.fichas.length > 0) charImages.ficha = charImages.fichas[0];
    }

    // 3. Fullbodies
    const charFullbodiesDir = findActualPath(baseDir, ['FULLBODY', catFolderName, charFolderName]);
    if (charFullbodiesDir && fs.existsSync(charFullbodiesDir)) {
      const files = getFilesRecursively(charFullbodiesDir);
      files.forEach((file) => {
        if (shouldExcludeFile(id, file)) return;
        const ext = path.extname(file).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
          charImages.bodies.push(toWebPath(file));
        }
      });
    }

    // 4. Closeups
    const charCloseupsDir = findActualPath(baseDir, ['CLOSEUP', catFolderName, charFolderName]);
    if (charCloseupsDir && fs.existsSync(charCloseupsDir)) {
      const files = getFilesRecursively(charCloseupsDir);
      files.forEach((file) => {
        if (shouldExcludeFile(id, file)) return;
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
