const fs = require('fs');
const file = 'd:/.CodeProjects/the-boys/components/reader/CinematicReader.tsx';
let content = fs.readFileSync(file, 'utf8');

// Remove buildBridgePath block
content = content.replace(/\/\*\*\s*\n\s*\* Build an organic bridge path[\s\S]*?\]\.join\(' '\);\s*\n\s*\};/g, '');

// Remove renderedTails block
content = content.replace(/\/\/ Rendered Elastic Tails Helper[\s\S]*?\}\)\n\s*\);\s*\n\s*\}\)\(\);/g, '');

// Remove SVG rendering
content = content.replace(/\{\/\* ── Elastic Tails SVG Layer ── \*\/\}[\s\S]*?<svg[\s\S]*?\{renderedTails\}\s*\n\s*<\/svg>/g, '');

fs.writeFileSync(file, content);
console.log('Removed renderedTails');
