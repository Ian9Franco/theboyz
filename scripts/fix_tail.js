const fs = require('fs');
const file = 'd:/.CodeProjects/the-boys/components/reader/CinematicReader.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `        let elasticTailNode = null;
        if (targetX !== null && targetY !== null) {
          const { bgColor, borderColor, strokeWidth } = getBubbleStyles(line);
          const d = buildTailPath(0, 0, targetX - bubbleLeft, targetY - bubbleTop);
          if (d) {
            elasticTailNode = (
              <svg className="absolute pointer-events-none overflow-visible" style={{ left: '50%', top: '50%', zIndex: 0 }}>
                <path d={d} fill={bgColor} stroke={borderColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
              </svg>
            );
          }`;

const replacementStr = `        let elasticTailNode = null;
        if (targetX !== null && targetY !== null) {
          const { bgColor } = getBubbleStyles(line);
          const d = buildTailPath(0, 0, targetX - bubbleLeft, targetY - bubbleTop, line);
          if (d) {
            elasticTailNode = (
              <svg className="absolute pointer-events-none overflow-visible" style={{ left: '50%', top: '50%', zIndex: 0 }}>
                {/* No stroke here! We rely on the drop-shadow filter in DialogueBubble to outline the combined shape */}
                <path d={d} fill={bgColor} stroke="none" strokeWidth={0} />
              </svg>
            );
          }`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync(file, content);
console.log('Replaced successfully');
