const fs = require('fs');
const path = require('path');

function stringifyDialogueCompact(obj) {
  const parts = Object.entries(obj).map(([k, v]) => {
    return `${JSON.stringify(k)}: ${JSON.stringify(v)}`;
  });
  return `{ ${parts.join(", ")} }`;
}

function stringifyZoomRectCompact(obj) {
  return `{ "x": ${obj.x}, "y": ${obj.y}, "w": ${obj.w}, "h": ${obj.h} }`;
}

function formatDialoguesJson(val, indent = "") {
  if (val === null) return "null";
  if (typeof val === "undefined") return "undefined";
  if (typeof val === "string") return JSON.stringify(val);
  if (typeof val === "number" || typeof val === "boolean") return String(val);

  const nextIndent = indent + "  ";

  if (Array.isArray(val)) {
    if (val.length === 0) return "[]";
    
    const isDialogueArray = val.every(item => item && typeof item === "object" && "text" in item);
    const isZoomRectArray = val.every(item => item && typeof item === "object" && "x" in item && "w" in item);

    if (isDialogueArray) {
      const items = val.map(item => nextIndent + stringifyDialogueCompact(item));
      return "[\n" + items.join(",\n") + "\n" + indent + "]";
    }
    
    if (isZoomRectArray) {
      const items = val.map(item => nextIndent + stringifyZoomRectCompact(item));
      return "[\n" + items.join(",\n") + "\n" + indent + "]";
    }

    const items = val.map(item => formatDialoguesJson(item, nextIndent));
    return "[\n" + items.map(item => nextIndent + item).join(",\n") + "\n" + indent + "]";
  }

  if (typeof val === "object") {
    const keys = Object.keys(val);
    if (keys.length === 0) return "{}";

    const parts = keys.map(k => {
      const valueStr = formatDialoguesJson(val[k], nextIndent);
      return nextIndent + JSON.stringify(k) + ": " + valueStr;
    });
    return "{\n" + parts.join(",\n") + "\n" + indent + "}";
  }

  return JSON.stringify(val);
}

// Target file
const targetFilePath = process.argv[2];
if (!targetFilePath) {
  console.error("Usage: node scripts/format-dialogues.js <path-to-dialogues.json>");
  process.exit(1);
}

try {
  const absolutePath = path.resolve(targetFilePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`File not found: ${absolutePath}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(absolutePath, 'utf8');
  const jsonData = JSON.parse(rawData);
  const formatted = formatDialoguesJson(jsonData);

  fs.writeFileSync(absolutePath, formatted, 'utf8');
  console.log(`Successfully formatted and saved: ${absolutePath}`);
} catch (error) {
  console.error("Error formatting dialogues.json:", error);
  process.exit(1);
}
