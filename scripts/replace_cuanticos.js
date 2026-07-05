const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /cuánticos/g, replacement: 'arcanos' },
  { regex: /cuanticos/g, replacement: 'arcanos' },
  { regex: /cuánticas/g, replacement: 'arcanas' },
  { regex: /cuanticas/g, replacement: 'arcanas' },
  { regex: /cuántico/g, replacement: 'arcano' },
  { regex: /cuantico/g, replacement: 'arcano' },
  { regex: /cuántica/g, replacement: 'arcana' },
  { regex: /cuantica/g, replacement: 'arcana' },
  { regex: /Cuánticos/g, replacement: 'Arcanos' },
  { regex: /Cuanticos/g, replacement: 'Arcanos' },
  { regex: /Cuánticas/g, replacement: 'Arcanas' },
  { regex: /Cuanticas/g, replacement: 'Arcanas' },
  { regex: /Cuántico/g, replacement: 'Arcano' },
  { regex: /Cuantico/g, replacement: 'Arcano' },
  { regex: /Cuántica/g, replacement: 'Arcana' },
  { regex: /Cuantica/g, replacement: 'Arcana' }
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.next') {
        processDir(fullPath);
      }
    } else if (file.endsWith('.md') || file.endsWith('.txt') || file.endsWith('.json') || file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const r of replacements) {
        if (r.regex.test(content)) {
          content = content.replace(r.regex, r.replacement);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Replaced in: ${fullPath}`);
      }
    }
  }
}

// Start from docs and PROMPT FICHA.TXT
if (fs.existsSync('docs')) {
  processDir('docs');
}
if (fs.existsSync('PROMPT FICHA.TXT')) {
  let content = fs.readFileSync('PROMPT FICHA.TXT', 'utf8');
  let changed = false;
  for (const r of replacements) {
    if (r.regex.test(content)) {
      content = content.replace(r.regex, r.replacement);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync('PROMPT FICHA.TXT', content, 'utf8');
    console.log('Replaced in PROMPT FICHA.TXT');
  }
}
