import React from "react";
import { DialogueLine } from "./DialogueBubble";

export interface PanelConfig {
  focusY: number; // 0 to 1
  dialogue?: DialogueLine[];
  zoomRect?: { x: number; y: number; w: number; h: number };
  zoomRects?: { x: number; y: number; w: number; h: number }[];
  duration?: number;
  hideUntilReached?: boolean;
}

export interface DialogueEditorPanelProps {
  mode: "read" | "edit";
  currentPanels: PanelConfig[];
  activePanelIdx: number;
  activeBubbleIdx: number | null;
  pageIdx: number;
  pagesLength: number;
  isSaving: boolean;
  saveStatus: "success" | "error" | "idle" | null;
  showGrid: boolean;
  snapToGrid: boolean;
  gridSize: number;
  
  // Handlers
  handleSaveChanges: () => void;
  resetPage: (idx: number) => void;
  setShowGrid: (val: boolean) => void;
  setSnapToGrid: (val: boolean) => void;
  setGridSize: (val: number) => void;
  handleAddPanel: () => void;
  setActivePanelIdx: (idx: number) => void;
  setActiveBubbleIdx: (idx: number | null) => void;
  handleRemovePanel: (idx: number) => void;
  handleUpdatePanelParams: (pIdx: number, updates: Partial<PanelConfig>) => void;
  handleAddBubble: (pIdx: number) => void;
  handleRemoveBubble: (pIdx: number, bIdx: number) => void;
  handleUpdateBubble: (pIdx: number, bIdx: number, updates: Partial<DialogueLine>) => void;
}

export function DialogueEditorPanel({
  mode,
  currentPanels,
  activePanelIdx,
  activeBubbleIdx,
  pageIdx,
  pagesLength,
  isSaving,
  saveStatus,
  showGrid,
  snapToGrid,
  gridSize,
  handleSaveChanges,
  resetPage,
  setShowGrid,
  setSnapToGrid,
  setGridSize,
  handleAddPanel,
  setActivePanelIdx,
  setActiveBubbleIdx,
  handleRemovePanel,
  handleUpdatePanelParams,
  handleAddBubble,
  handleRemoveBubble,
  handleUpdateBubble,
}: DialogueEditorPanelProps) {
  const [isViñetasOpen, setIsViñetasOpen] = React.useState(true);

  if (mode !== "edit") return null;

  const isLastPage = pageIdx >= pagesLength - 1;

  return (
    <div
      className="w-full md:w-80 shrink-0 bg-white border-t-3 md:border-t-0 border-[#0a0a0f] flex flex-col overflow-y-auto z-40"
      style={{ maxHeight: "calc(100vh - 64px)" }}
    >
      {/* Header / Save Block */}
      <div className="p-4 border-b-3 border-[#0a0a0f] bg-zinc-50 flex items-center justify-between">
        <span className="font-[var(--font-bangers)] text-xl tracking-wider text-[#0a0a0f]">
          Editor de Diálogos
        </span>
        <button
          onClick={handleSaveChanges}
          disabled={isSaving}
          className={`font-[var(--font-bangers)] text-sm px-4 py-2 border-2 border-[#0a0a0f] shadow-[2px_2px_0_#0a0a0f] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#0a0a0f] ${
            saveStatus === "success"
              ? "bg-green-500 text-white"
              : saveStatus === "error"
              ? "bg-red-500 text-white"
              : "bg-[#e8185a] text-white hover:bg-rose-700"
          }`}
        >
          {isSaving ? "Guardando..." : saveStatus === "success" ? "Guardado ✓" : "Guardar JSON"}
        </button>
      </div>

      {/* Page navigation in sidebar */}
      <div className="p-4 border-b-2 border-zinc-200 bg-zinc-50 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => pageIdx > 0 && resetPage(pageIdx - 1)}
          disabled={pageIdx === 0}
          className="btn btn-dark text-xs py-1 px-3 disabled:opacity-50"
        >
          Pág Ant
        </button>
        <span className="font-[var(--font-marker)] text-sm text-[#0a0a0f]">
          Página {pageIdx + 1}
        </span>
        <button
          type="button"
          onClick={() => pageIdx < pagesLength - 1 && resetPage(pageIdx + 1)}
          disabled={isLastPage}
          className="btn btn-dark text-xs py-1 px-3 disabled:opacity-50"
        >
          Pág Sig
        </button>
      </div>

      {/* Grid & Snapping Controls */}
      <div className="p-4 border-b-2 border-zinc-200 bg-zinc-50 flex flex-col gap-2.5">
        <span className="font-[var(--font-bangers)] text-sm text-[#0a0a0f] tracking-wide">
          📏 Cuadrícula y Alineación
        </span>
        <div className="flex items-center justify-between">
          <label className="text-xs text-zinc-600 font-bold">Mostrar Grid:</label>
          <input
            type="checkbox"
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
            className="w-4 h-4 accent-[#e8185a] cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-xs text-zinc-600 font-bold">Ajustar al Grid (Snap):</label>
          <input
            type="checkbox"
            checked={snapToGrid}
            onChange={(e) => setSnapToGrid(e.target.checked)}
            className="w-4 h-4 accent-[#e8185a] cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <label className="text-xs text-zinc-600 font-bold">Paso del Grid (%):</label>
          <select
            value={gridSize}
            onChange={(e) => setGridSize(parseInt(e.target.value))}
            className="border-2 border-[#0a0a0f] px-2 py-1 text-xs font-mono rounded bg-white text-[#0a0a0f]"
          >
            <option value="2">2%</option>
            <option value="5">5% (Estándar)</option>
            <option value="10">10%</option>
          </select>
        </div>
      </div>

      {/* Panels / Stops List */}
      <div className="p-4 shrink-0 flex flex-col gap-3 border-b-2 border-zinc-200">
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => setIsViñetasOpen(!isViñetasOpen)}
            className="flex items-center gap-1.5 font-[var(--font-bangers)] text-lg text-zinc-600 tracking-wider hover:text-[#e8185a] transition-colors"
          >
            <span>{isViñetasOpen ? "▼" : "▶"} Paradas de Viñetas</span>
            <span className="text-xs font-mono bg-zinc-200 text-zinc-700 px-1.5 py-0.5 rounded-full">
              {currentPanels.length}
            </span>
          </button>
          <button
            type="button"
            onClick={handleAddPanel}
            className="font-[var(--font-bangers)] text-xs bg-emerald-500 text-white border border-[#0a0a0f] px-2 py-1 shadow-[1px_1px_0_#0a0a0f] hover:bg-emerald-600 transition-colors"
          >
            + Agregar Viñeta
          </button>
        </div>

        {isViñetasOpen && (
          <div className="max-h-60 overflow-y-auto flex flex-col gap-3 pr-1">
            {currentPanels.length === 0 ? (
              <div className="text-sm text-zinc-400 italic text-center py-6 border border-dashed border-zinc-300 rounded">
                No hay viñetas definidas en esta página. Agregá una para empezar.
              </div>
            ) : (
              currentPanels.map((panel, pIdx) => {
                const isSelected = activePanelIdx === pIdx;
                const hasZoom = !!panel.zoomRect;
                const zoom = panel.zoomRect || { x: 10, y: 10, w: 80, h: 80 };
                const rects = panel.zoomRects || (panel.zoomRect ? [panel.zoomRect] : []);

                return (
                  <div
                    key={pIdx}
                    onClick={() => {
                      setActivePanelIdx(pIdx);
                      setActiveBubbleIdx(null);
                    }}
                    className={`p-3 border-2 border-[#0a0a0f] transition-all cursor-pointer ${
                      isSelected
                        ? "bg-yellow-50 shadow-[3px_3px_0_#0a0a0f]"
                        : "bg-zinc-50 hover:bg-zinc-100"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-[var(--font-marker)] text-xs text-[#0a0a0f]">
                        Viñeta {pIdx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemovePanel(pIdx);
                        }}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Eliminar
                      </button>
                    </div>

                    {/* FocusY Slider */}
                    <div className="flex flex-col gap-1 mb-2">
                      <div className="flex justify-between text-xs font-mono text-zinc-500">
                        <span>Posición Foco Y:</span>
                        <span>{panel.focusY}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={panel.focusY}
                        onChange={(e) => handleUpdatePanelParams(pIdx, { focusY: parseFloat(e.target.value) })}
                        className="w-full accent-[#e8185a]"
                      />
                    </div>

                    {/* Cinematic Zoom / Closeup Config */}
                    <div className="border border-zinc-300 p-2 rounded bg-zinc-100/50 mb-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1">
                          🔍 Áreas de Zoom y Máscaras
                        </label>
                        <span className="text-[10px] font-mono bg-zinc-200 px-1.5 py-0.5 rounded text-zinc-600">
                          {rects.length} área(s)
                        </span>
                      </div>

                      {rects.length === 0 ? (
                        <div className="text-[10px] text-zinc-400 italic text-center py-2">
                          Sin áreas de zoom/occlusión.
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-0.5">
                          {rects.map((zoomRect, rIdx) => (
                            <div key={rIdx} className="border border-zinc-200 p-2 rounded bg-white flex flex-col gap-1.5">
                              <div className="flex justify-between items-center border-b border-zinc-100 pb-1 mb-0.5">
                                <span className="text-[9px] font-bold text-zinc-700">
                                  {rIdx === 0 ? "🎯 Área Zoom Principal" : `🤫 Máscara Spoiler ${rIdx + 1}`}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const newRects = rects.filter((_, idx) => idx !== rIdx);
                                    handleUpdatePanelParams(pIdx, {
                                      zoomRects: newRects.length > 0 ? newRects : undefined,
                                      zoomRect: undefined
                                    });
                                  }}
                                  className="text-[9px] text-red-500 hover:underline font-bold"
                                >
                                  Eliminar
                                </button>
                              </div>

                              <div className="grid grid-cols-2 gap-1.5">
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-[8px] font-mono text-zinc-500">X: {zoomRect.x}%</span>
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={zoomRect.x}
                                    onChange={(e) => {
                                      const newRects = rects.map((r, idx) => idx === rIdx ? { ...r, x: parseInt(e.target.value) } : r);
                                      handleUpdatePanelParams(pIdx, { zoomRects: newRects, zoomRect: undefined });
                                    }}
                                    className="w-full accent-emerald-500 cursor-pointer h-1"
                                  />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-[8px] font-mono text-zinc-500">Y: {zoomRect.y}%</span>
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={zoomRect.y}
                                    onChange={(e) => {
                                      const newRects = rects.map((r, idx) => idx === rIdx ? { ...r, y: parseInt(e.target.value) } : r);
                                      handleUpdatePanelParams(pIdx, { zoomRects: newRects, zoomRect: undefined });
                                    }}
                                    className="w-full accent-emerald-500 cursor-pointer h-1"
                                  />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-[8px] font-mono text-zinc-500">Ancho: {zoomRect.w}%</span>
                                  <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    step="1"
                                    value={zoomRect.w}
                                    onChange={(e) => {
                                      const newRects = rects.map((r, idx) => idx === rIdx ? { ...r, w: parseInt(e.target.value) } : r);
                                      handleUpdatePanelParams(pIdx, { zoomRects: newRects, zoomRect: undefined });
                                    }}
                                    className="w-full accent-emerald-500 cursor-pointer h-1"
                                  />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-[8px] font-mono text-zinc-500">Alto: {zoomRect.h}%</span>
                                  <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    step="1"
                                    value={zoomRect.h}
                                    onChange={(e) => {
                                      const newRects = rects.map((r, idx) => idx === rIdx ? { ...r, h: parseInt(e.target.value) } : r);
                                      handleUpdatePanelParams(pIdx, { zoomRects: newRects, zoomRect: undefined });
                                    }}
                                    className="w-full accent-emerald-500 cursor-pointer h-1"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const newRects = [...rects, { x: 20, y: 20, w: 60, h: 60 }];
                          handleUpdatePanelParams(pIdx, { zoomRects: newRects, zoomRect: undefined });
                        }}
                        className="font-[var(--font-bangers)] text-[10px] bg-emerald-500 hover:bg-emerald-600 text-white py-1 px-2.5 rounded transition-all mt-1 w-full text-center tracking-wider shadow-[1px_1px_0_#0a0a0f]"
                      >
                        + Agregar Área (Zoom/Máscara)
                      </button>

                      {/* Duration and Anti-Spoiler config */}
                      <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-zinc-200">
                        {/* Auto-advance duration */}
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between items-center text-[10px] font-bold text-zinc-600">
                            <span>⏱️ Auto-avance: {panel.duration ? `${panel.duration}s` : "Manual"}</span>
                            {panel.duration !== undefined && (
                              <button
                                type="button"
                                onClick={() => handleUpdatePanelParams(pIdx, { duration: undefined })}
                                className="text-[9px] text-red-500 hover:underline"
                              >
                                Reset
                              </button>
                            )}
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.5"
                            value={panel.duration ?? 0}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value);
                              handleUpdatePanelParams(pIdx, { duration: val > 0 ? val : undefined });
                            }}
                            className="w-full accent-emerald-500 cursor-pointer h-1.5"
                          />
                        </div>

                        {/* Anti-spoiler mask checkbox/button */}
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] font-bold text-zinc-600">🤫 Oclusión Spoiler:</span>
                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={() => handleUpdatePanelParams(pIdx, { hideUntilReached: true })}
                              className={`text-[9px] font-bold px-2 py-0.5 rounded border transition-all ${
                                (panel.hideUntilReached ?? true)
                                  ? "bg-purple-600 text-white border-purple-700 font-bold"
                                  : "bg-zinc-100 text-zinc-500 border-zinc-300 hover:bg-zinc-200"
                              }`}
                            >
                              Sí (Ocultar)
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdatePanelParams(pIdx, { hideUntilReached: false })}
                              className={`text-[9px] font-bold px-2 py-0.5 rounded border transition-all ${
                                !(panel.hideUntilReached ?? true)
                                  ? "bg-zinc-700 text-white border-zinc-800 font-bold"
                                  : "bg-zinc-100 text-zinc-500 border-zinc-300 hover:bg-zinc-200"
                              }`}
                            >
                              No (Mostrar)
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dialogue List for this panel */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-zinc-500">Globos:</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddBubble(pIdx);
                          }}
                          className="text-xs text-[#e8185a] hover:underline"
                        >
                          + Agregar Globo
                        </button>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        {panel.dialogue?.map((bub, bIdx) => {
                          const isBubActive = isSelected && activeBubbleIdx === bIdx;
                          return (
                            <button
                              key={bIdx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActivePanelIdx(pIdx);
                                setActiveBubbleIdx(bIdx);
                              }}
                              className={`text-left text-xs p-2 border rounded font-mono truncate transition-all ${
                                isBubActive
                                  ? "border-red-500 bg-red-50 font-bold"
                                  : "border-zinc-200 hover:bg-zinc-100"
                              }`}
                            >
                              {bub.speaker ? `${bub.speaker}: ` : ""}
                              {bub.text || "(vacío)"}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Selected Bubble Editing Form */}
        {activeBubbleIdx !== null && currentPanels[activePanelIdx]?.dialogue?.[activeBubbleIdx] && (() => {
          const bubble = currentPanels[activePanelIdx].dialogue![activeBubbleIdx];
          const hasAnchor = bubble.tailX !== undefined;
          const isHidden = bubble.tail === "none" && !hasAnchor;
          // 8-direction tail anchor presets [arrow, ΔX%, ΔY%]
          const tailPresets: [string, number, number][] = [
            ["↖", -12, -12], ["↑", 0, -15], ["↗", 12, -12],
            ["←", -18,   0],                 ["→", 18,   0],
            ["↙", -12,  12], ["↓",  0,  15], ["↘", 12,  12],
          ];

          return (
          <div className="mt-4 p-4 border-2 border-red-500 bg-zinc-50 rounded flex flex-col gap-3 shadow-[3px_3px_0_rgba(239,68,68,0.2)]">
            <div className="flex justify-between items-center border-b pb-2 mb-1">
              <div className="flex items-center gap-2">
                <span className="font-[var(--font-bangers)] text-base text-red-500 tracking-wider">
                  Editando Globo
                </span>
                <button
                  type="button"
                  onClick={() => {
                    handleAddBubble(activePanelIdx);
                    // Automatically activate the newly added bubble
                    setTimeout(() => {
                      const updatedPanel = currentPanels[activePanelIdx];
                      if (updatedPanel?.dialogue) {
                        setActiveBubbleIdx(updatedPanel.dialogue.length);
                      }
                    }, 50);
                  }}
                  className="font-[var(--font-bangers)] text-[10px] bg-red-100 hover:bg-red-200 text-red-600 border border-red-300 px-2 py-0.5 rounded transition-all"
                >
                  + Nuevo
                </button>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveBubble(activePanelIdx, activeBubbleIdx)}
                className="text-xs text-red-600 hover:underline"
              >
                Eliminar Globo
              </button>
            </div>

            {/* Speaker */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-zinc-600">Personaje / Hablante:</label>
              <input
                type="text"
                value={bubble.speaker || ""}
                onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { speaker: e.target.value })}
                className="w-full border-2 border-[#0a0a0f] p-2 text-xs font-mono rounded bg-white text-[#0a0a0f]"
                placeholder="Ej: Sofi"
              />
            </div>

            {/* Speaker Presets */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-zinc-500">Hablantes rápidos:</label>
              <div className="flex flex-wrap gap-1">
                {["Uandi", "Sofi", "Jaz", "Ian", "Julián", "Mati", "Volvo"].map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { speaker: name })}
                    className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 border border-[#0a0a0f] text-zinc-800 text-[10px] font-bold rounded active:translate-y-0.5 transition-all"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-zinc-600">Estilo:</label>
              <select
                value={bubble.style || "normal"}
                onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { style: e.target.value as any })}
                className="w-full border-2 border-[#0a0a0f] p-2 text-xs font-mono rounded bg-white text-[#0a0a0f]"
              >
                <option value="normal">Normal (Bocadillo)</option>
                <option value="caption">Narración (Caja)</option>
                <option value="thought">Pensamiento (Nube)</option>
                <option value="scream">Grito (Llamativo/Bangers)</option>
                <option value="whisper">Susurro (Discontinuo/Itálico)</option>
                <option value="electronic">Electrónico (Futurista/Monospace)</option>
              </select>
            </div>

            {/* Size Preset */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-zinc-600">Tamaño del Globo:</label>
              <select
                value={bubble.size || "medium"}
                onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { size: e.target.value as any })}
                className="w-full border-2 border-[#0a0a0f] p-2 text-xs font-mono rounded bg-white text-[#0a0a0f]"
              >
                <option value="small">Pequeño</option>
                <option value="medium">Mediano</option>
                <option value="large">Grande</option>
              </select>
            </div>

            {/* ── Cola / Tail Controls ── */}
            {bubble.style !== "caption" && (
              <div className="flex flex-col gap-2">
                {/* Visibility + preset grid */}
                <div className="flex flex-col gap-1.5 p-2.5 bg-blue-50/50 border border-blue-200 rounded">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-blue-800">🗨️ Cola del globo</label>
                    <button
                      type="button"
                      onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx,
                        isHidden
                          ? { tail: "bottom-left", tailX: undefined, tailY: undefined }
                          : { tail: "none", tailX: undefined, tailY: undefined }
                      )}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-all ${
                        isHidden
                          ? "bg-zinc-200 text-zinc-500 border-zinc-300"
                          : "bg-green-100 text-green-800 border-green-300 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                      }`}
                    >
                      {isHidden ? "Sin cola" : "✓ Visible — ocultar"}
                    </button>
                  </div>
                  {!isHidden && (
                    <>
                      {/* ── Mode selector: CSS tail vs SVG elastic ── */}
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                            tailX: undefined, tailY: undefined,
                            tail: bubble.tail === "none" ? "bottom-left" : bubble.tail,
                          })}
                          className={`flex-1 py-1 text-[10px] font-bold rounded border transition-all ${
                            !hasAnchor ? "bg-blue-600 text-white border-blue-700" : "bg-white text-zinc-600 border-zinc-300 hover:bg-zinc-50"
                          }`}
                        >
                          🔺 CSS (fija)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                            tailX: Math.max(-20, Math.min(120, (bubble.posX ?? 50))),
                            tailY: Math.max(-20, Math.min(120, (bubble.posY ?? 50) + 15)),
                          })}
                          className={`flex-1 py-1 text-[10px] font-bold rounded border transition-all ${
                            hasAnchor ? "bg-blue-600 text-white border-blue-700" : "bg-white text-zinc-600 border-zinc-300 hover:bg-zinc-50"
                          }`}
                        >
                          🔵 SVG (elástica)
                        </button>
                      </div>

                      {/* CSS direction select (shown when no elastic anchor) */}
                      {!hasAnchor && (
                        <select
                          value={bubble.tail || "bottom-left"}
                          onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { tail: e.target.value as any })}
                          className="w-full border border-zinc-300 p-1.5 text-[11px] font-mono rounded bg-white text-[#0a0a0f]"
                        >
                          <option value="bottom-left">↙ Abajo-Izquierda</option>
                          <option value="bottom-right">↘ Abajo-Derecha</option>
                          <option value="top-left">↖ Arriba-Izquierda</option>
                          <option value="top-right">↗ Arriba-Derecha</option>
                          <option value="left">← Izquierda</option>
                          <option value="right">→ Derecha</option>
                        </select>
                      )}

                      {/* SVG elastic: 8-direction anchor presets + readout */}
                      {hasAnchor && (
                        <>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-zinc-500 font-medium">Posición rápida del ancla:</span>
                            <div className="grid grid-cols-3 gap-1">
                              {tailPresets.map(([label, dx, dy]) => (
                                <button
                                  key={label}
                                  type="button"
                                  onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                                    tailX: Math.max(-20, Math.min(120, (bubble.posX ?? 50) + dx)),
                                    tailY: Math.max(-20, Math.min(120, (bubble.posY ?? 50) + dy)),
                                  })}
                                  className="py-1 text-sm font-bold bg-white hover:bg-blue-100 border border-zinc-300 hover:border-blue-400 rounded transition-all active:scale-95"
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                            <p className="text-[9px] text-zinc-400 leading-tight">
                              Arrastrá el punto azul en el lienzo para ajuste fino.
                            </p>
                          </div>
                          <div className="text-[10px] font-mono text-blue-700 bg-blue-100 rounded px-2 py-1 flex items-center justify-between">
                            <span>Ancla: X {bubble.tailX}% Y {bubble.tailY}%</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { tailX: undefined, tailY: undefined })}
                              className="text-red-500 hover:underline text-[9px] ml-2"
                            >quitar</button>
                          </div>
                          
                          {/* Elastic Tail Styling */}
                          <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-zinc-200">
                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between items-center text-[10px] font-bold text-zinc-600">
                                <span>Grosor Base: {bubble.tailWidth ?? "Auto"}</span>
                                {bubble.tailWidth !== undefined && (
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { tailWidth: undefined })}
                                    className="text-[9px] text-red-500 hover:underline"
                                  >
                                    Reset
                                  </button>
                                )}
                              </div>
                              <input
                                type="range"
                                min="4"
                                max="120"
                                step="2"
                                value={bubble.tailWidth ?? 28}
                                onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { tailWidth: parseInt(e.target.value) })}
                                className="w-full accent-blue-600 cursor-pointer"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between items-center text-[10px] font-bold text-zinc-600">
                                <span>Curvatura: {bubble.tailCurvature ?? 0}</span>
                                {bubble.tailCurvature !== undefined && (
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { tailCurvature: undefined })}
                                    className="text-[9px] text-red-500 hover:underline"
                                  >
                                    Reset
                                  </button>
                                )}
                              </div>
                              <input
                                type="range"
                                min="-100"
                                max="100"
                                step="2"
                                value={bubble.tailCurvature ?? 0}
                                onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { tailCurvature: parseInt(e.target.value) })}
                                className="w-full accent-blue-600 cursor-pointer"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

             {/* Custom Typography & Colors */}
            <div className="flex flex-col gap-2 p-3 bg-zinc-100/50 border border-zinc-200 rounded">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Tipografía y Diseño</span>
              
              {/* Font Family Selection */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-600">Tipografía:</label>
                <select
                  value={bubble.fontFamily || ""}
                  onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { fontFamily: (e.target.value || undefined) as any })}
                  className="w-full border border-zinc-300 p-1.5 text-xs font-mono rounded bg-white text-[#0a0a0f]"
                >
                  <option value="">Por defecto del estilo</option>
                  <option value="marker">Marker (Cómic Permanente)</option>
                  <option value="bangers">Bangers (Llamativo/Grito)</option>
                  <option value="mono">Monospace (Tecnológico)</option>
                  <option value="sans">Sans-Serif (Limpio/Moderno)</option>
                  <option value="serif">Serif (Clásico/Elegante)</option>
                </select>
              </div>

              {/* Colors Pickers */}
              <div className="flex flex-col gap-1 mt-1">
                <label className="text-xs font-bold text-zinc-600">Color Fondo:</label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={bubble.customBg || ""}
                    onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { customBg: e.target.value })}
                    className="flex-1 border border-zinc-300 px-2 py-1 text-xs font-mono rounded bg-white text-[#0a0a0f]"
                    placeholder="#ffffff"
                  />
                  <input
                    type="color"
                    value={bubble.customBg || "#ffffff"}
                    onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { customBg: e.target.value })}
                    className="w-8 h-7 p-0 border border-zinc-300 rounded cursor-pointer bg-transparent"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-600">Color Borde:</label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={bubble.customColor || ""}
                    onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { customColor: e.target.value })}
                    className="flex-1 border border-zinc-300 px-2 py-1 text-xs font-mono rounded bg-white text-[#0a0a0f]"
                    placeholder="#0a0a0f"
                  />
                  <input
                    type="color"
                    value={bubble.customColor || "#0a0a0f"}
                    onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { customColor: e.target.value })}
                    className="w-8 h-7 p-0 border border-zinc-300 rounded cursor-pointer bg-transparent"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-600">Color Texto:</label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={bubble.textColor || ""}
                    onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { textColor: e.target.value })}
                    className="flex-1 border border-zinc-300 px-2 py-1 text-xs font-mono rounded bg-white text-[#0a0a0f]"
                    placeholder="#0a0a0f"
                  />
                  <input
                    type="color"
                    value={bubble.textColor || "#000000"}
                    onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { textColor: e.target.value })}
                    className="w-8 h-7 p-0 border border-zinc-300 rounded cursor-pointer bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Custom Width and Font Size with Sliders */}
            <div className="flex flex-col gap-3 p-3 bg-zinc-100/50 border border-zinc-200 rounded">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs font-bold text-zinc-600">
                  <span>Ancho Máx: {bubble.width ? `${bubble.width}px` : "Defecto"}</span>
                  {bubble.width !== undefined && (
                    <button
                      type="button"
                      onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { width: undefined })}
                      className="text-[10px] text-red-500 hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <input
                  type="range"
                  min="50"
                  max="600"
                  step="5"
                  value={bubble.width || 250}
                  onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { width: parseInt(e.target.value) })}
                  className="w-full accent-[#e8185a] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs font-bold text-zinc-600">
                  <span>Tamaño Letra: {bubble.fontSize ? `${bubble.fontSize}px` : "Defecto"}</span>
                  {bubble.fontSize !== undefined && (
                    <button
                      type="button"
                      onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { fontSize: undefined })}
                      className="text-[10px] text-red-500 hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <input
                  type="range"
                  min="8"
                  max="36"
                  step="1"
                  value={bubble.fontSize || 14}
                  onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { fontSize: parseInt(e.target.value) })}
                  className="w-full accent-[#e8185a] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs font-bold text-zinc-600">
                  <span>Curvatura Borde: {bubble.borderRadius !== undefined ? `${bubble.borderRadius}px` : "Defecto"}</span>
                  {bubble.borderRadius !== undefined && (
                    <button
                      type="button"
                      onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { borderRadius: undefined })}
                      className="text-[10px] text-red-500 hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="1"
                  value={bubble.borderRadius ?? 16}
                  onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { borderRadius: parseInt(e.target.value) })}
                  className="w-full accent-[#e8185a] cursor-pointer"
                />
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-zinc-600">Texto:</label>
              <textarea
                value={bubble.text}
                onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { text: e.target.value })}
                className="w-full h-20 border-2 border-[#0a0a0f] p-2 text-xs font-sans rounded bg-white text-[#0a0a0f] resize-none"
                placeholder="Escribí el diálogo..."
              />
            </div>

            {/* Position Presets */}
            <div className="flex flex-col gap-1 mt-1">
              <label className="text-xs font-bold text-zinc-600">Posición Rápida (Márgenes/Viñeta):</label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    const targetY = Math.round(currentPanels[activePanelIdx].focusY * 100);
                    handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: -15, posY: targetY });
                  }}
                  className="px-2 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-[#0a0a0f] text-zinc-800 text-[10px] font-bold rounded text-left flex justify-between items-center transition-colors active:translate-y-0.5"
                >
                  <span>👈 Margen Izq.</span>
                  <span className="text-[8px] text-zinc-500 font-mono">[-15%, Y]</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const targetY = Math.round(currentPanels[activePanelIdx].focusY * 100);
                    handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: 115, posY: targetY });
                  }}
                  className="px-2 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-[#0a0a0f] text-zinc-800 text-[10px] font-bold rounded text-left flex justify-between items-center transition-colors active:translate-y-0.5"
                >
                  <span>👉 Margen Der.</span>
                  <span className="text-[8px] text-zinc-500 font-mono">[115%, Y]</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: 50, posY: -15 });
                  }}
                  className="px-2 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-[#0a0a0f] text-zinc-800 text-[10px] font-bold rounded text-left flex justify-between items-center transition-colors active:translate-y-0.5"
                >
                  <span>👆 Margen Sup.</span>
                  <span className="text-[8px] text-zinc-500 font-mono">[50%, -15%]</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: 50, posY: 115 });
                  }}
                  className="px-2 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-[#0a0a0f] text-zinc-800 text-[10px] font-bold rounded text-left flex justify-between items-center transition-colors active:translate-y-0.5"
                >
                  <span>👇 Margen Inf.</span>
                  <span className="text-[8px] text-zinc-500 font-mono">[50%, 115%]</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const targetY = Math.round(currentPanels[activePanelIdx].focusY * 100);
                    handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: 50, posY: targetY });
                  }}
                  className="col-span-2 px-2 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-[#0a0a0f] text-zinc-800 text-[10px] font-bold rounded text-center transition-colors active:translate-y-0.5"
                >
                  🎯 Centro de Viñeta <span className="text-zinc-500 font-mono ml-1 text-[8px]">[50%, Y]</span>
                </button>
              </div>
            </div>

            {/* Coords display & manual entry */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-zinc-500">X (Ancho %):</label>
                <input
                  type="number"
                  min="-20"
                  max="120"
                  value={bubble.posX ?? 50}
                  onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: Math.max(-20, Math.min(120, parseInt(e.target.value) || 0)) })}
                  className="border-2 border-[#0a0a0f] p-1.5 text-xs font-mono text-center bg-white text-[#0a0a0f]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-zinc-500">Y (Alto %):</label>
                <input
                  type="number"
                  min="-20"
                  max="120"
                  value={bubble.posY ?? 50}
                  onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posY: Math.max(-20, Math.min(120, parseInt(e.target.value) || 0)) })}
                  className="border-2 border-[#0a0a0f] p-1.5 text-xs font-mono text-center bg-white text-[#0a0a0f]"
                />
              </div>
            </div>

            <span className="text-[10px] text-zinc-400 italic mt-1 text-center">
              💡 ¡También podés arrastrar la burbuja directamente en el cómic!
            </span>
          </div>
          );
        })()}
      </div>
    </div>
  );
}
