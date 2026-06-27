/**
 * generate-character-images.js
 *
 * Scans public/personajes/PORTADAS and public/personajes/Fichas to build
 * a fresh characterImages.ts mapping. Run this script after adding or
 * reorganising images so that the app reflects the real folder state.
 *
 * Usage:
 *   node scripts/assets/generate-character-images.js
 *
 * The script is also called automatically at the end of organize-personajes.js.
 */

const fs   = require('fs');
const path = require('path');

// ── Paths ──────────────────────────────────────────────────────────────────
const projectRoot  = path.join(__dirname, '..', '..');
const baseDir      = path.join(projectRoot, 'public', 'personajes');
const portadasDir  = path.join(baseDir, 'PORTADAS');
// Fichas folder has mixed-case name in the actual project structure
const fichasDir    = fs.existsSync(path.join(baseDir, 'FICHAS'))
  ? path.join(baseDir, 'FICHAS')
  : path.join(baseDir, 'Fichas');
const charDataDir  = path.join(projectRoot, 'lib', 'characterData');
const outputFile   = path.join(charDataDir, 'characterImages.ts');

const imageExtensions = new Set(['.webp', '.png', '.jpg', '.jpeg', '.gif']);

/**
 * SPOILER EXCLUSIONS
 * Any image whose filename (without extension, lowercased) contains one of
 * these substrings will be excluded from the generated mapping.
 * Add entries here whenever an image exists on disk but must stay hidden.
 *
 * Format: 'characterId:substringToExclude'  →  applies only to that character.
 *         ':substringToExclude'             →  applies to all characters.
 */
const SPOILER_EXCLUSIONS = [
  // Ian – Vesper Archor suit images are plot spoilers
  'ian:vesperarchor',
  'ian:vesper archor',
];

// ── Load all character IDs and names from the TS data files ────────────────
const dataFiles = [
  'pibes.ts',
  'secundarios.ts',
  'antagonistas.ts',
  'deidades.ts',
  'entidades.ts',
  'matis.ts',
  'voughtverse.ts',
];

/**
 * Minimal parser: extracts { id, name } pairs from the TypeScript data files
 * using simple regex. Does not depend on ts-node.
 */
function loadCharacters() {
  const chars = [];

  for (const filename of dataFiles) {
    const filePath = path.join(charDataDir, filename);
    if (!fs.existsSync(filePath)) continue;

    const lines = fs.readFileSync(filePath, 'utf8').split('\n');
    let current = null;

    for (const raw of lines) {
      const line = raw.trim();

      const idMatch = /^id:\s*['"`]([^'"`]+)['"`]/i.exec(line)
        || /^\{\s*id:\s*['"`]([^'"`]+)['"`]/i.exec(line);

      if (idMatch) {
        if (current?.name) chars.push(current);
        current = { id: idMatch[1] };
        continue;
      }

      if (current) {
        const nameMatch = /^name:\s*['"`]([^'"`]+)['"`]/i.exec(line);
        if (nameMatch) current.name = nameMatch[1];
      }
    }

    if (current?.name) chars.push(current);
  }

  return chars;
}

// ── Helpers ────────────────────────────────────────────────────────────────

/**
 * Returns true when a filename should be excluded for a given charId.
 * Matches against SPOILER_EXCLUSIONS entries of the form 'charId:substring'
 * or ':substring' (global).
 */
function isSpoiler(charId, filename) {
  const lowerFile = filename.toLowerCase();
  for (const rule of SPOILER_EXCLUSIONS) {
    const colonIdx = rule.indexOf(':');
    const ruleId  = rule.substring(0, colonIdx).toLowerCase();
    const substr  = rule.substring(colonIdx + 1).toLowerCase();
    // Apply rule when it targets this specific character OR is a global rule (empty id)
    if ((ruleId === '' || ruleId === charId.toLowerCase()) && lowerFile.includes(substr)) {
      return true;
    }
  }
  return false;
}

/** Collect all image files directly inside a directory (non-recursive). */
function listImages(dir, charId = '') {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => {
      if (!imageExtensions.has(path.extname(f).toLowerCase())) return false;
      if (charId && isSpoiler(charId, path.basename(f, path.extname(f)))) {
        console.log(`  🙈 Spoiler excluded [${charId}]: ${f}`);
        return false;
      }
      return true;
    })
    .sort(); // stable sort so first element is alphabetically first
}

/**
 * Convert a filesystem path to the public URL used in Next.js.
 * e.g. "D:\…\public\personajes\PORTADAS\Ian\foo.webp"  →  "/personajes/PORTADAS/Ian/foo.webp"
 */
function toPublicUrl(absPath) {
  const publicDir = path.join(projectRoot, 'public');
  return '/' + path.relative(publicDir, absPath).split(path.sep).join('/');
}

// ── Build the mapping ──────────────────────────────────────────────────────

/**
 * Map from character.name (lowercased, no special chars) → character id.
 * We also build aliases from pibeAliases and common hero names.
 */
const pibeAliases = {
  ian: 'VESPERWING',
  uandi: 'AEGIS',
  julian: 'WILDCARD',
  volvo: 'VECTOR',
  mati: 'SWAPFIRE',
  jaz: 'ORACLE',
  sofi: 'HUSH',
};

const reverseAliases = {};
for (const [id, alias] of Object.entries(pibeAliases)) {
  reverseAliases[alias.toLowerCase()] = id;
}

// Additional name→id aliases coming from hero names in folder names
const extraAliases = {
  vesperwing: 'ian',
  aegis: 'uandi',
  wildcard: 'julian',
  nullvector: 'volvo',
  'null-vector': 'volvo',
  vector: 'volvo',
  swapfire: 'mati',
  oracle: 'jaz',
  hush: 'sofi',
  lucy: 'lucifer',
  tusk: 'ymir',
  nightstalker: 'balanar',
  bristleback: 'bristleback',
  crystalmaiden: 'rylai',
  rylai: 'rylai',
  matapobres: 'matapobre',
  supercamionero: 'supertrucker',
  'supercamionero.': 'supertrucker',
};

function normalize(s) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Given a folder name from PORTADAS/, try to resolve it to a character id.
 * Returns null if unresolvable.
 */
function folderToCharId(folderName, characters) {
  const normFolder = normalize(folderName);

  // 1. Check extra aliases first
  if (extraAliases[normFolder]) return extraAliases[normFolder];

  // 2. Check reverse pibeAliases
  if (reverseAliases[normFolder]) return reverseAliases[normFolder];

  // 3. Try direct match against character id
  for (const c of characters) {
    if (normalize(c.id) === normFolder) return c.id;
  }

  // 4. Try direct match against character name
  for (const c of characters) {
    if (normalize(c.name) === normFolder) return c.id;
  }

  // 5. Substring match (e.g. "Mati Gladiador" → id "gladiador")
  for (const c of characters) {
    const normId   = normalize(c.id);
    const normName = normalize(c.name);
    if (normFolder.includes(normId) || normId.includes(normFolder)) return c.id;
    if (normFolder.includes(normName) || normName.includes(normFolder)) return c.id;
  }

  return null;
}

/**
 * Scan PORTADAS/ and return a map: charId → string[] of public URLs (sorted).
 */
function scanPortadas(characters) {
  const result = {};

  if (!fs.existsSync(portadasDir)) {
    console.warn('⚠️  PORTADAS directory not found:', portadasDir);
    return result;
  }

  const folders = fs.readdirSync(portadasDir).filter(f => {
    return fs.statSync(path.join(portadasDir, f)).isDirectory();
  });

  for (const folder of folders) {
    const charId = folderToCharId(folder, characters);
    if (!charId) {
      console.warn(`  ⚠️  Could not map PORTADAS folder to character: "${folder}"`);
      continue;
    }

    const folderPath = path.join(portadasDir, folder);
    const images = listImages(folderPath, charId).map(f => toPublicUrl(path.join(folderPath, f)));

    // Keep the highest-priority (first alphabetically) image as main portada
    if (!result[charId]) {
      result[charId] = images;
    } else {
      // If the same charId maps to multiple folders (shouldn't happen), merge
      result[charId] = [...result[charId], ...images];
    }
  }

  return result;
}

/**
 * Scan Fichas/ (recursively) and return a map: charId → string[] of public URLs.
 * Fichas are nested: Fichas/<category>/<charFolder>/<files>
 */
function scanFichas(characters) {
  const result = {};

  if (!fs.existsSync(fichasDir)) {
    console.warn('⚠️  Fichas directory not found:', fichasDir);
    return result;
  }

  function walkFichas(dir) {
    if (!fs.existsSync(dir)) return;
    for (const item of fs.readdirSync(dir)) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walkFichas(fullPath);
      } else if (imageExtensions.has(path.extname(item).toLowerCase())) {
        // Try to identify character from directory path
        const rel   = path.relative(fichasDir, fullPath);
        const parts = rel.split(path.sep);
        // parts: [category, charFolder, file] or [charFolder, file]
        let charId  = null;

        // Try each directory segment (skip last which is file)
        for (let i = parts.length - 2; i >= 0; i--) {
          const candidate = folderToCharId(parts[i], characters);
          if (candidate) {
            charId = candidate;
            break;
          }
        }

        if (!charId) {
          // Fallback: try the filename without extension
          const basename = path.basename(item, path.extname(item));
          charId = folderToCharId(basename, characters);
        }

        if (charId) {
          const filename = path.basename(item, path.extname(item));
          if (isSpoiler(charId, filename)) {
            console.log(`  🙈 Spoiler excluded Ficha [${charId}]: ${item}`);
            continue;
          }
          const url = toPublicUrl(fullPath);
          if (!result[charId]) result[charId] = [];
          result[charId].push(url);
        } else {
          console.warn(`  ⚠️  Could not map Ficha to character: ${rel}`);
        }
      }
    }
  }

  walkFichas(fichasDir);

  // Sort each character's fichas for stable output
  for (const id of Object.keys(result)) {
    result[id].sort();
  }

  return result;
}

// ── Main ───────────────────────────────────────────────────────────────────

function main() {
  console.log('🔍 Loading characters from data files...');
  const characters = loadCharacters();
  console.log(`   Found ${characters.length} characters.`);

  console.log('\n📁 Scanning PORTADAS...');
  const portadasMap = scanPortadas(characters);
  const portadasCount = Object.values(portadasMap).reduce((a, v) => a + v.length, 0);
  console.log(`   Mapped ${Object.keys(portadasMap).length} characters, ${portadasCount} portadas.`);

  console.log('\n📁 Scanning Fichas...');
  const fichasMap = scanFichas(characters);
  const fichasCount = Object.values(fichasMap).reduce((a, v) => a + v.length, 0);
  console.log(`   Mapped ${Object.keys(fichasMap).length} characters, ${fichasCount} fichas.`);

  // Build the final record: every known character gets an entry (even if empty)
  const allIds = new Set([
    ...characters.map(c => c.id),
    ...Object.keys(portadasMap),
    ...Object.keys(fichasMap),
  ]);

  const entries = {};
  for (const id of allIds) {
    const portadas = portadasMap[id] || [];
    const fichas   = fichasMap[id]   || [];

    // Prioritize vesperwing.webp as the default portada for ian
    if (id === 'ian') {
      portadas.sort((a, b) => {
        const aIsVw = a.toLowerCase().endsWith('/vesperwing.webp');
        const bIsVw = b.toLowerCase().endsWith('/vesperwing.webp');
        if (aIsVw && !bIsVw) return -1;
        if (!aIsVw && bIsVw) return 1;
        return a.localeCompare(b);
      });
    }

    entries[id] = {
      portada:  portadas[0] || null,
      portadas,
      ficha:    fichas[0]   || null,
      fichas,
    };
  }

  // ── Serialise to TypeScript ──────────────────────────────────────────────
  const lines = [
    '// This file is auto-generated by scripts/assets/generate-character-images.js. Do not edit manually.',
    '',
    'export interface CharacterImages {',
    '  portada: string | null;',
    '  portadas: string[];',
    '  ficha: string | null;',
    '  fichas: string[];',
    '}',
    '',
    'export const characterImages: Record<string, CharacterImages> = {',
  ];

  for (const [id, data] of Object.entries(entries).sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`  "${id}": {`);
    lines.push(`    "portada": ${data.portada ? `"${data.portada}"` : 'null'},`);
    lines.push(`    "portadas": [`);
    for (const url of data.portadas) {
      lines.push(`      "${url}",`);
    }
    lines.push(`    ],`);
    lines.push(`    "ficha": ${data.ficha ? `"${data.ficha}"` : 'null'},`);
    lines.push(`    "fichas": [`);
    for (const url of data.fichas) {
      lines.push(`      "${url}",`);
    }
    lines.push(`    ]`);
    lines.push(`  },`);
  }

  lines.push('};');
  lines.push('');

  const output = lines.join('\n');
  fs.writeFileSync(outputFile, output, 'utf8');

  console.log(`\n✅ Generated: lib/characterData/characterImages.ts`);
  console.log(`   ${Object.keys(entries).length} characters total.`);

  const withPortada = Object.values(entries).filter(e => e.portadas.length > 0).length;
  const withoutPortada = Object.values(entries).filter(e => e.portadas.length === 0).length;
  console.log(`   ✔  With portada:    ${withPortada}`);
  console.log(`   ✖  Without portada: ${withoutPortada} (will be hidden in roster)`);
}

main();
