const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const livePath = path.join(
  root,
  "public/comics/#9 La patria de la libertad/#1 La otra cara de la moneda/dialogues.json"
);
const draftPath = path.join(root, "docs/patria-dialogue-proposals-pages1-36.md");
const live = JSON.parse(fs.readFileSync(livePath, "utf8"));
const draft = fs.readFileSync(draftPath, "utf8");

const expected = [...draft.matchAll(/^- V\d+(?:[–-]V?\d+)? — .+?: «.+»$/gm)].length;
let actual = 0;
let masks = 0;
const errors = [];

for (let page = 1; page <= 36; page += 1) {
  const panels = live.pages[String(page)]?.panels;
  if (!Array.isArray(panels) || panels.length === 0) {
    errors.push(`Página ${page}: faltan paneles`);
    continue;
  }
  for (const [index, panel] of panels.entries()) {
    if (!Array.isArray(panel.zoomRects) || panel.zoomRects.length !== 1) {
      errors.push(`Página ${page}, máscara ${index + 1}: se esperaba un zoomRect`);
      continue;
    }
    masks += 1;
    const rect = panel.zoomRects[0];
    if (rect.x < 0 || rect.y < 0 || rect.w <= 0 || rect.h <= 0 || rect.x + rect.w > 100 || rect.y + rect.h > 100) {
      errors.push(`Página ${page}, máscara ${index + 1}: coordenadas inválidas`);
    }
    for (const line of panel.dialogue || []) {
      actual += 1;
      if (!line.speaker || !line.text) errors.push(`Página ${page}: diálogo sin speaker/text`);
      if (line.posY < rect.y || line.posY > rect.y + rect.h) {
        errors.push(`Página ${page}: globo fuera de su máscara: ${line.text}`);
      }
    }
  }
}

if (actual !== expected) errors.push(`Diálogos: esperados ${expected}, encontrados ${actual}`);
if (Object.keys(live.pages).length !== 36) errors.push(`Se esperaban 36 páginas y hay ${Object.keys(live.pages).length}`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const peak = Object.entries(live.pages).reduce((highest, [page, value]) => {
  for (const [index, panel] of value.panels.entries()) {
    if ((panel.dialogue || []).length > highest.count) {
      highest = { page, mask: index + 1, count: panel.dialogue.length };
    }
  }
  return highest;
}, { page: "-", mask: 0, count: 0 });

console.log(`Validación correcta: páginas 1–36 completas; ${actual} diálogos; ${masks} máscaras.`);
console.log(`Mayor densidad actual: página ${peak.page}, máscara ${peak.mask}, ${peak.count} diálogos; dato informativo, no límite.`);
