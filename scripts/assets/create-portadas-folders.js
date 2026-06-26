const fs = require('fs');
const path = require('path');

const charDataDir = path.join(__dirname, '..', '..', 'lib', 'characterData');
const portadasDir = path.join(__dirname, '..', '..', 'public', 'personajes', 'PORTADAS');

// Create PORTADAS dir if it doesn't exist
if (!fs.existsSync(portadasDir)) {
  fs.mkdirSync(portadasDir, { recursive: true });
}

// Files containing character data arrays
const targetFiles = [
  'pibes.ts',
  'secundarios.ts',
  'antagonistas.ts',
  'deidades.ts',
  'entidades.ts',
  'matis.ts',
  'voughtverse.ts'
];

const characters = new Set();

targetFiles.forEach((filename) => {
  const filePath = path.join(charDataDir, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  
  // Regex to match name: '...' or name: "..."
  const regex = /name:\s*['"`]([^'"`]+)['"`]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const name = match[1].trim();
    if (name) {
      characters.add(name);
    }
  }
});

console.log(`Found ${characters.size} characters to create folders for:`);
characters.forEach((char) => {
  // Sanitize name for folder name (remove any characters not allowed in filenames just in case)
  const folderName = char.replace(/[\\/:*?"<>|]/g, '');
  const folderPath = path.join(portadasDir, folderName);
  
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created folder: ${folderName}`);
  } else {
    console.log(`Folder already exists: ${folderName}`);
  }
});

console.log('Finished creating character folders inside PORTADAS.');
