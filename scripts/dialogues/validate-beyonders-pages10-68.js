const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const livePath = path.join(root, "public/comics/#10 Más allá/#1 Beyonders/dialogues.json");
const backupPath = path.join(root, "public/comics/#10 Más allá/#1 Beyonders/dialogues.backup-before-pages10-68-2026-08-10.json");
const draftPath = path.join(root, "docs/beyonders-dialogue-proposals-pages-10-68.md");
const live = JSON.parse(fs.readFileSync(livePath, "utf8"));
const backup = JSON.parse(fs.readFileSync(backupPath, "utf8"));
const draft = fs.readFileSync(draftPath, "utf8");

const expected = [...draft.matchAll(/^- V\d+(?:[–-]V?\d+)? — .+?: «.+»$/gm)].length;
let actual = 0;
let masks = 0;
const errors = [];

for (let page = 1; page <= 6; page += 1) {
  if (JSON.stringify(live.pages[String(page)]) !== JSON.stringify(backup.pages[String(page)])) {
    errors.push(`La página existente ${page} cambió`);
  }
}

for (let page = 10; page <= 68; page += 1) {
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
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

for (const page of [7, 8, 9]) {
  for (const panel of live.pages[String(page)]?.panels || []) {
    const rect = panel.zoomRects?.[0];
    if (!rect) errors.push(`Página ${page}: falta una máscara`);
    for (const line of panel.dialogue || []) {
      if (rect && (line.posY < rect.y || line.posY > rect.y + rect.h)) {
        errors.push(`Página ${page}: globo fuera de su máscara: ${line.text}`);
      }
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validación correcta: páginas 1–6 intactas; revisión 7–9 válida; páginas 10–68 completas; ${actual} diálogos; ${masks} máscaras.`);
for (const page of [10, 31, 51, 68]) {
  const panels = live.pages[String(page)].panels;
  console.log(`Página ${page}: ${panels.length} máscaras, ${panels.reduce((n, panel) => n + panel.dialogue.length, 0)} diálogos.`);
}
