const fs = require('fs');
const file = 'd:/.CodeProjects/the-boys/components/reader/CinematicReader.tsx';
let lines = fs.readFileSync(file, 'utf8').split('\n');

const importIdx = lines.findIndex(l => l.includes('import { DialogueBubble, getBubbleStyles, type DialogueLine } from "./DialogueBubble";'));
lines.splice(importIdx + 1, 0, 'import { DialogueEditorPanel } from "./DialogueEditorPanel";');

const startIdx = lines.findIndex(l => l.includes('{/* Editor Side Panel (Right side) */}'));
const endIdx = lines.findIndex((l, i) => i > startIdx && l.includes('{/* ── Auth Modal ── */}'));

const newComponentCall = `        {/* Editor Side Panel (Right side) */}
        <DialogueEditorPanel
          mode={mode}
          currentPanels={currentPanels}
          activePanelIdx={activePanelIdx}
          activeBubbleIdx={activeBubbleIdx}
          pageIdx={pageIdx}
          pagesLength={pages.length}
          isSaving={isSaving}
          saveStatus={saveStatus}
          showGrid={showGrid}
          snapToGrid={snapToGrid}
          gridSize={gridSize}
          handleSaveChanges={handleSaveChanges}
          resetPage={resetPage}
          setShowGrid={setShowGrid}
          setSnapToGrid={setSnapToGrid}
          setGridSize={setGridSize}
          handleAddPanel={handleAddPanel}
          setActivePanelIdx={setActivePanelIdx}
          setActiveBubbleIdx={setActiveBubbleIdx}
          handleRemovePanel={handleRemovePanel}
          handleUpdateFocusY={handleUpdateFocusY}
          handleAddBubble={handleAddBubble}
          handleRemoveBubble={handleRemoveBubble}
          handleUpdateBubble={handleUpdateBubble}
        />
      </div>

`;

lines.splice(startIdx, endIdx - startIdx, newComponentCall);

fs.writeFileSync(file, lines.join('\n'));
console.log('Replaced successfully');
