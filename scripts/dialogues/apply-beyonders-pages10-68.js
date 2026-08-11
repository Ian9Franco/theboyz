const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const proposalPath = path.join(root, "docs/beyonders-dialogue-proposals-pages-10-68.md");
const dialoguePath = path.join(root, "public/comics/#10 Más allá/#1 Beyonders/dialogues.json");

const rows = {
  7:[0,35,60,100],8:[0,27,49,74,100],9:[0,28,52,74,100],
  10:[0,40,67,100],11:[0,29,57,100],12:[0,28,48,67,83,100],13:[0,28,50,70,84,100],
  14:[0,24,55,76,100],15:[0,25,53,76,100],16:[0,29,57,79,100],17:[0,27,47,64,79,100],
  18:[0,27,41,60,78,100],19:[0,27,45,62,80,100],20:[0,29,52,75,100],21:[0,29,50,75,100],
  22:[0,35,66,100],23:[0,25,43,63,80,100],24:[0,40,66,100],25:[0,20,43,62,79,100],
  26:[0,31,55,77,100],27:[0,28,46,58,78,100],28:[0,25,45,73,100],29:[0,27,48,68,100],
  30:[0,32,55,72,100],31:[0,33,52,75,100],32:[0,25,48,68,84,100],33:[0,28,59,77,100],
  34:[0,28,47,64,78,100],35:[0,25,48,66,82,100],36:[0,30,50,69,84,100],37:[0,26,48,68,84,100],
  38:[0,27,56,77,100],39:[0,23,42,59,77,100],40:[0,27,48,73,87,100],41:[0,33,64,82,100],
  42:[0,27,45,67,84,100],43:[0,29,54,77,100],44:[0,25,45,62,80,100],45:[0,27,48,65,82,100],
  46:[0,28,48,68,84,100],47:[0,30,61,82,100],48:[0,27,52,76,100],49:[0,30,60,80,100],
  50:[0,28,56,76,100],51:[0,100],52:[0,28,52,76,100],53:[0,30,56,78,100],54:[0,35,64,100],
  55:[0,42,72,100],56:[0,32,57,100],57:[0,25,49,68,84,100],58:[0,25,50,75,100],
  59:[0,28,51,72,86,100],60:[0,33,67,100],61:[0,24,50,75,100],62:[0,30,52,75,100],
  63:[0,30,55,78,100],64:[0,29,55,100],65:[0,35,57,78,100],66:[0,30,57,76,100],
  67:[0,25,48,70,100],68:[0,26,58,79,100]
};

const panelToRow = {
  7:{1:0,2:1,3:2},8:{1:0,2:1,3:2,4:3},9:{1:0,2:1,3:2,4:3},
  10:{1:0,2:0,3:1,4:2},11:{1:0,2:1,3:1,4:2,5:2},12:{1:0,2:1,4:3},13:{1:0,2:1},14:{1:0,2:1,3:2},15:{2:1},16:{3:1},
  17:{1:0,3:2,4:3,5:4},18:{1:0,4:3,5:4},19:{1:0},20:{1:0,3:2,4:3},21:{1:0,3:2,4:3},
  22:{2:0,4:1},23:{2:1,3:2,4:3},24:{2:0,3:1,4:2,5:2},25:{2:1,4:3},26:{2:1,3:1,4:2},
  27:{1:0,3:2},28:{1:0,3:2},29:{2:1,4:3,5:3},30:{1:0,2:0,3:1,4:1,5:2,6:3},32:{1:0,2:1,3:2,4:3,5:4},
  33:{1:0,2:0,3:1,4:2,5:3},34:{1:0,2:1,3:2,4:2,5:3,6:4},35:{1:0,2:1,3:1,4:2,5:3},36:{1:0,2:1,3:1,4:2,5:3},37:{1:0,2:1,3:1,4:2,5:3,6:4},
  38:{1:0,2:1,3:1,4:2,5:2,6:3},39:{1:0,2:1,3:2,4:3,5:4},40:{1:0,2:1,3:2,4:3,5:4},41:{1:0,2:1,3:2,4:3},
  42:{1:0,3:1,4:2,7:4},43:{1:0,2:0,3:1,4:1,5:2,6:3},44:{1:0,2:1,3:2,4:3,5:4,6:4},45:{1:0,2:0,3:1,4:1,5:2,6:3,7:4},
  46:{1:0,2:1,3:1,4:2,5:3,6:4},47:{1:0,2:0,3:1,4:1,5:3},48:{1:0,2:0,3:1,4:2,5:2,6:3},49:{1:0,2:0,3:1,4:2,5:3,6:3},
  50:{1:0,2:0,4:1,5:2},51:{1:0},52:{1:0,2:1,3:1,4:2,5:3},53:{1:0,2:1,3:1,4:3,5:3},54:{1:0,2:1,3:1,4:2},
  55:{1:0,2:0,3:1,4:2,5:2},57:{5:4},58:{1:0,2:1,3:2,4:3},59:{1:0,3:2},
  61:{1:0,2:1,3:1,4:2,5:2,6:3,7:3,8:3},62:{1:0,2:0,3:1,4:1,5:2,6:2,7:3},
  63:{1:0,2:1,3:1,4:2,5:3,6:3},64:{1:0,2:0,3:1,4:2},
  65:{1:0,2:1,3:2,4:3,5:3},66:{1:0,2:1,3:2,4:3},
  67:{1:0,2:1,3:2,4:3},68:{1:0,2:1,3:1,4:1,5:2,6:3}
};

function parseProposals(markdown) {
  const proposals = new Map();
  let page = null;
  for (const line of markdown.split(/\r?\n/)) {
    const heading = line.match(/^### Página (\d+)$/);
    if (heading) {
      page = Number(heading[1]);
      if (page >= 7 && page <= 68) proposals.set(page, []);
      continue;
    }
    if (!page || !proposals.has(page)) continue;
    const entry = line.match(/^- V(\d+)(?:[–-]V?\d+)? — (.+?): «(.+)»$/);
    if (!entry) continue;
    proposals.get(page).push({
      visualPanel: Number(entry[1]),
      speaker: entry[2].split(",")[0].trim(),
      text: entry[3],
      style: entry[2].startsWith("Narración")
        ? "caption"
        : entry[2].toLowerCase().includes("pensamiento")
          ? "thought"
          : /(mensaje|videollamada|comunicador|por teléfono)/i.test(entry[2])
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
const data = JSON.parse(fs.readFileSync(dialoguePath, "utf8"));

for (let page = 7; page <= 68; page += 1) {
  const bounds = rows[page];
  if (!bounds) throw new Error(`Faltan límites para página ${page}`);

  const panels = bounds.slice(0, -1).map((start, index) => {
    const end = bounds[index + 1];
    return {
      focusY: Number((((start + end) / 2) / 100).toFixed(3)),
      dialogue: [],
      zoomRects: [{ x: 0, y: start, w: 100, h: end - start }]
    };
  });

  for (const proposal of proposals.get(page) || []) {
    const mapped = panelToRow[page]?.[proposal.visualPanel];
    const rowIndex = mapped ?? Math.min(proposal.visualPanel - 1, panels.length - 1);
    panels[rowIndex].dialogue.push({ speaker: proposal.speaker, text: proposal.text, style: proposal.style });
  }

  for (const panel of panels) {
    const { y: start, h } = panel.zoomRects[0];
    const end = start + h;
    panel.dialogue = panel.dialogue.map((line, index) => {
      const column = index % 2;
      const tier = Math.floor(index / 2);
      const posX = column === 0 ? 25 : 75;
      const posY = clamp(start + 3 + tier * 7, start + 1, end - 4);
      return {
        text: line.text,
        speaker: line.speaker,
        ...(line.style ? {
          style: line.style,
          tail: "none",
          ...(line.style === "electronic" ? { offscreen: true, showSpeakerName: true } : {})
        } : {}),
        size: "small",
        posX,
        posY,
        tailX: column === 0 ? posX + 10 : posX - 10,
        tailY: clamp(posY + 7, start + 2, end - 1),
        tailWidth: 6,
        tailCurvature: column === 0 ? -22 : 22,
        width: clamp(80 + line.text.length * 2, 90, 160),
        fontSize: 8,
        borderRadius: 18
      };
    });
  }

  data.pages[String(page)] = { panels };
}

fs.writeFileSync(dialoguePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");

const dialogueCount = [...proposals.values()].reduce((sum, entries) => sum + entries.length, 0);
const panelCount = Object.values(rows).reduce((sum, bounds) => sum + bounds.length - 1, 0);
console.log(`Aplicadas páginas 7–68: ${dialogueCount} diálogos, ${panelCount} máscaras.`);
