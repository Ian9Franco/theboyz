"use client";

import React from "react";
import type { PanelConfig } from "./DialogueEditorPanel";

interface EditorTabPanelsProps {
  currentPanels: PanelConfig[];
  activePanelIdx: number;
  activeBubbleIdx: number | null;
  isViñetasOpen: boolean;
  setIsViñetasOpen: (val: boolean) => void;
  handleAddPanel: () => void;
  setActivePanelIdx: (idx: number) => void;
  setActiveBubbleIdx: (idx: number | null) => void;
  handleRemovePanel: (idx: number) => void;
  handleUpdatePanelParams: (pIdx: number, updates: Partial<PanelConfig>) => void;
  handleAddBubble: (pIdx: number) => void;
}

/**
 * EditorTabPanels Component
 * Renders the panels accordion section allowing the editor to add, remove,
 * and rearrange panel stops, their individual zoom & spoiler regions, auto-advance timers,
 * and oclusion/spoiler states.
 */
export function EditorTabPanels({
  currentPanels,
  activePanelIdx,
  activeBubbleIdx,
  isViñetasOpen,
  setIsViñetasOpen,
  handleAddPanel,
  setActivePanelIdx,
  setActiveBubbleIdx,
  handleRemovePanel,
  handleUpdatePanelParams,
  handleAddBubble,
}: EditorTabPanelsProps) {
  return (
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
        <div className="flex flex-col gap-3 pr-1">
          {currentPanels.length === 0 ? (
            <div className="text-sm text-zinc-400 italic text-center py-6 border border-dashed border-zinc-300 rounded">
              No hay viñetas definidas en esta página. Agregá una para empezar.
            </div>
          ) : (
            currentPanels.map((panel, pIdx) => {
              const isSelected = activePanelIdx === pIdx;
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
                      <span>{panel.focusY ?? 0.5}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={panel.focusY ?? 0.5}
                      onChange={(e) =>
                        handleUpdatePanelParams(pIdx, { focusY: parseFloat(e.target.value) })
                      }
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
                          <div
                            key={rIdx}
                            className="border border-zinc-200 p-2 rounded bg-white flex flex-col gap-1.5"
                          >
                            <div className="flex justify-between items-center border-b border-zinc-100 pb-1 mb-0.5">
                              <span className="text-[9px] font-bold text-zinc-700">
                                {rIdx === 0
                                  ? "🎯 Área Zoom Principal"
                                  : `🤫 Máscara Spoiler ${rIdx + 1}`}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const newRects = rects.filter((_, idx) => idx !== rIdx);
                                  handleUpdatePanelParams(pIdx, {
                                    zoomRects: newRects.length > 0 ? newRects : undefined,
                                    zoomRect: undefined,
                                  });
                                }}
                                className="text-[9px] text-red-500 hover:underline font-bold"
                              >
                                Eliminar
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-1.5">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[8px] font-mono text-zinc-500">
                                  X: {zoomRect.x}%
                                </span>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  step="1"
                                  value={zoomRect.x}
                                  onChange={(e) => {
                                    const newRects = rects.map((r, idx) =>
                                      idx === rIdx ? { ...r, x: parseInt(e.target.value) } : r
                                    );
                                    handleUpdatePanelParams(pIdx, {
                                      zoomRects: newRects,
                                      zoomRect: undefined,
                                    });
                                  }}
                                  className="w-full accent-emerald-500 cursor-pointer h-1"
                                />
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[8px] font-mono text-zinc-500">
                                  Y: {zoomRect.y}%
                                </span>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  step="1"
                                  value={zoomRect.y}
                                  onChange={(e) => {
                                    const newRects = rects.map((r, idx) =>
                                      idx === rIdx ? { ...r, y: parseInt(e.target.value) } : r
                                    );
                                    handleUpdatePanelParams(pIdx, {
                                      zoomRects: newRects,
                                      zoomRect: undefined,
                                    });
                                  }}
                                  className="w-full accent-emerald-500 cursor-pointer h-1"
                                />
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[8px] font-mono text-zinc-500">
                                  Ancho: {zoomRect.w}%
                                </span>
                                <input
                                  type="range"
                                  min="10"
                                  max="100"
                                  step="1"
                                  value={zoomRect.w}
                                  onChange={(e) => {
                                    const newRects = rects.map((r, idx) =>
                                      idx === rIdx ? { ...r, w: parseInt(e.target.value) } : r
                                    );
                                    handleUpdatePanelParams(pIdx, {
                                      zoomRects: newRects,
                                      zoomRect: undefined,
                                    });
                                  }}
                                  className="w-full accent-emerald-500 cursor-pointer h-1"
                                />
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[8px] font-mono text-zinc-500">
                                  Alto: {zoomRect.h}%
                                </span>
                                <input
                                  type="range"
                                  min="10"
                                  max="100"
                                  step="1"
                                  value={zoomRect.h}
                                  onChange={(e) => {
                                    const newRects = rects.map((r, idx) =>
                                      idx === rIdx ? { ...r, h: parseInt(e.target.value) } : r
                                    );
                                    handleUpdatePanelParams(pIdx, {
                                      zoomRects: newRects,
                                      zoomRect: undefined,
                                    });
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
                          <span>
                            ⏱️ Auto-avance: {panel.duration ? `${panel.duration}s` : "Manual"}
                          </span>
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
                        <span className="text-[10px] font-bold text-zinc-600">
                          🤫 Oclusión Spoiler:
                        </span>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => handleUpdatePanelParams(pIdx, { hideUntilReached: true })}
                            className={`text-[9px] font-bold px-2 py-0.5 rounded border transition-all ${
                              panel.hideUntilReached ?? true
                                ? "bg-purple-600 text-white border-purple-700 font-bold"
                                : "bg-zinc-100 text-zinc-500 border-zinc-300 hover:bg-zinc-200"
                            }`}
                          >
                            Sí (Ocultar)
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdatePanelParams(pIdx, { hideUntilReached: false })
                            }
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
    </div>
  );
}
