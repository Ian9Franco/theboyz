const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const proposalPath = path.join(root, "docs/patria-dialogue-proposals-pages1-36.md");
const dialoguePath = path.join(
  root,
  "public/comics/#9 La patria de la libertad/#1 La otra cara de la moneda/dialogues.json"
);

// Máscaras horizontales ajustadas a los cortes reales de cada página.
const rows = {
  1:[0,48,70,100],2:[0,31,77,100],3:[0,100],4:[0,44,64,100],5:[0,51,78,100],6:[0,29,76,100],
  7:[0,27,53,77,100],8:[0,33,76,100],9:[0,27,72,100],10:[0,26,50,75,100],11:[0,28,57,76,100],12:[0,33,72,100],
  13:[0,30,70,100],14:[0,31,58,100],15:[0,31,76,100],16:[0,31,69,100],17:[0,25,72,100],18:[0,34,58,100],
  19:[0,37,70,100],20:[0,35,73,100],21:[0,35,69,100],22:[0,31,68,100],23:[0,34,68,100],24:[0,33,70,100],
  25:[0,28,68,100],26:[0,34,69,100],27:[0,33,69,100],28:[0,35,74,100],29:[0,35,67,100],30:[0,31,72,100],
  31:[0,34,67,100],32:[0,34,69,100],33:[0,33,75,100],34:[0,31,65,100],35:[0,23,48,73,100],36:[0,26,53,77,100]
};

function parseProposals(markdown) {
  const proposals = new Map();
  let page = null;
  for (const line of markdown.split(/\r?\n/)) {
    const heading = line.match(/^### Página (\d+)$/);
    if (heading) {
      page = Number(heading[1]);
      if (page >= 1 && page <= 36) proposals.set(page, []);
      continue;
    }
    if (!page || !proposals.has(page)) continue;
    const entry = line.match(/^- V(\d+)(?:[–-]V?\d+)? — (.+?): «(.+)»$/);
    if (!entry) continue;
    const metadata = entry[2];
    const lower = metadata.toLowerCase();
    proposals.get(page).push({
      visualPanel: Number(entry[1]),
      speaker: metadata.split(",")[0].trim(),
      text: entry[3],
      style: metadata.startsWith("Narración") || metadata.startsWith("Archivo")
        ? "caption"
        : lower.includes("pensamiento")
          ? "thought"
          : lower.includes("mensaje")
            ? "electronic"
            : undefined
    });
  }
  return proposals;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

const markdown = fs.readFileSync(proposalPath, "utf8");
const proposals = parseProposals(markdown);
const data = { pages: {} };

for (let page = 1; page <= 36; page += 1) {
  const bounds = rows[page];
  if (!bounds) throw new Error(`Faltan límites para página ${page}`);
  if (!proposals.has(page)) throw new Error(`Faltan propuestas para página ${page}`);

  const panels = bounds.slice(0, -1).map((start, index) => {
    const end = bounds[index + 1];
    return {
      focusY: Number((((start + end) / 2) / 100).toFixed(3)),
      dialogue: [],
      zoomRects: [{ x: 0, y: start, w: 100, h: end - start }]
    };
  });

  for (const proposal of proposals.get(page)) {
    const rowIndex = Math.min(proposal.visualPanel - 1, panels.length - 1);
    panels[rowIndex].dialogue.push(proposal);
  }

  for (const panel of panels) {
    const { y: start, h } = panel.zoomRects[0];
    const end = start + h;
    const tierCount = Math.ceil(panel.dialogue.length / 2);
    const availableHeight = Math.max(1, h - 8);
    const tierSpacing = tierCount > 1
      ? Math.min(7, availableHeight / (tierCount - 1))
      : 0;
    panel.dialogue = panel.dialogue.map((line, index) => {
      const column = index % 2;
      const tier = Math.floor(index / 2);
      const posX = column === 0 ? 25 : 75;
      const posY = clamp(start + 3 + tier * tierSpacing, start + 1, end - 4);
      const styled = line.style === "thought" || line.style === "caption" || line.style === "electronic";
      return {
        text: line.text,
        speaker: line.speaker,
        ...(line.style ? {
          style: line.style,
          ...(styled ? { tail: "none" } : {}),
          ...(line.style === "electronic" ? { offscreen: true, showSpeakerName: true } : {})
        } : {}),
        size: "small",
        posX,
        posY,
        tailX: column === 0 ? posX + 10 : posX - 10,
        tailY: clamp(posY + 7, start + 2, end - 1),
        tailWidth: 6,
        tailCurvature: column === 0 ? -22 : 22,
        width: clamp(84 + line.text.length * 1.7, 100, 180),
        fontSize: 8,
        borderRadius: 18
      };
    });
  }

  data.pages[String(page)] = { panels };
}

fs.writeFileSync(dialoguePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");

const dialogueCount = [...proposals.values()].reduce((sum, entries) => sum + entries.length, 0);
const maskCount = Object.values(rows).reduce((sum, bounds) => sum + bounds.length - 1, 0);
console.log(`Aplicadas páginas 1–36: ${dialogueCount} diálogos, ${maskCount} máscaras.`);
