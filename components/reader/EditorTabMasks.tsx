"use client";

import React from "react";
import type { PanelConfig } from "./DialogueEditorPanel";
import { snapMaskRect } from "./readerUtils";

interface EditorTabMasksProps {
  currentPanels: PanelConfig[];
  activePanelIdx: number;
  setActivePanelIdx: (idx: number) => void;
  setActiveBubbleIdx: (idx: number | null) => void;
  handleUpdatePanelParams: (pIdx: number, updates: Partial<PanelConfig>) => void;
}

/**
 * EditorTabMasks Component (Capa 2: Máscaras)
 * Dedicated controller for zoom rect masks and spoiler oclusion areas.
 */
export function EditorTabMasks({
  currentPanels,
  activePanelIdx,
  setActivePanelIdx,
  setActiveBubbleIdx,
  handleUpdatePanelParams,
}: EditorTabMasksProps) {
  const activePanel = currentPanels[activePanelIdx];
  const rects = activePanel
    ? activePanel.zoomRects || (activePanel.zoomRect ? [activePanel.zoomRect] : [])
    : [];

  const handleAddMask = () => {
    if (!activePanel) return;
    const lastRect = rects[rects.length - 1];
    const targetY = Math.round((activePanel.focusY ?? 0.5) * 100);
    const rectHeight = 25;
    // Auto-pegado (magnetic snap) directly under previous mask if present
    const defaultY = lastRect ? lastRect.y + lastRect.h : Math.max(0, Math.min(100 - rectHeight, targetY - rectHeight / 2));
    const newY = Math.max(0, Math.min(100 - rectHeight, defaultY));
    
    const candidate = { x: lastRect ? lastRect.x : 0, y: newY, w: lastRect ? lastRect.w : 100, h: rectHeight };
    const snapped = snapMaskRect(candidate, rects, 4);
    const newRects = [...rects, snapped];
    handleUpdatePanelParams(activePanelIdx, { zoomRects: newRects, zoomRect: undefined });
  };

  const handleRemoveMask = (rIdx: number) => {
    const newRects = rects.filter((_, idx) => idx !== rIdx);
    handleUpdatePanelParams(activePanelIdx, {
      zoomRects: newRects.length > 0 ? newRects : undefined,
      zoomRect: undefined,
    });
  };

  const handleUpdateMaskRect = (rIdx: number, updates: Partial<{ x: number; y: number; w: number; h: number }>) => {
    const otherRects = rects.filter((_, idx) => idx !== rIdx);
    const current = rects[rIdx];
    if (!current) return;
    const candidate = { ...current, ...updates };
    const snapped = snapMaskRect(candidate, otherRects, 4);
    
    const newRects = rects.map((r, idx) => (idx === rIdx ? snapped : r));
    handleUpdatePanelParams(activePanelIdx, { zoomRects: newRects, zoomRect: undefined });
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Header & Main Info */}
      <div className="flex justify-between items-center bg-[#161622] p-3 border border-white/10 rounded-md">
        <div className="flex items-center gap-2 font-[var(--font-bangers)] text-lg text-white tracking-wider">
          <span>🎭 Áreas de Zoom y Máscaras (Capa 2)</span>
        </div>
        <button
          type="button"
          onClick={handleAddMask}
          disabled={!activePanel}
          className="font-[var(--font-bangers)] text-xs bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white border border-white/10 px-3 py-1.5 shadow-[2px_2px_0_rgba(0,0,0,0.3)] transition-all active:scale-95 cursor-pointer rounded"
        >
          + Agregar Máscara
        </button>
      </div>

      {currentPanels.length === 0 ? (
        <div className="text-sm text-zinc-500 italic text-center py-10 border border-dashed border-white/10 rounded">
          No hay paradas creadas. Primero crea una parada en la Capa 1 para agregarle máscaras.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Active Stop Selector */}
          <div className="flex items-center gap-2 bg-[#0a0a0f] p-2 border border-white/10 rounded-md overflow-x-auto">
            <span className="text-xs font-bold text-zinc-400 shrink-0">Parada Activa:</span>
            {currentPanels.map((_, pIdx) => {
              const isSelected = activePanelIdx === pIdx;
              return (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => {
                    setActivePanelIdx(pIdx);
                    setActiveBubbleIdx(null);
                  }}
                  className={`px-3 py-1 text-xs font-mono font-bold rounded shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-[#161622] text-zinc-300 hover:bg-zinc-800 border border-white/5"
                  }`}
                >
                  Parada {pIdx + 1}
                </button>
              );
            })}
          </div>

          {activePanel && (
            <div className="bg-[#14141e] border-2 border-emerald-500/50 rounded-lg p-4 flex flex-col gap-4 shadow-lg">
              {/* Oclusión / Anti-spoiler toggle */}
              <div className="flex justify-between items-center bg-[#0a0a0f] p-3 border border-white/10 rounded-md">
                <span className="text-xs font-bold text-white">🤫 Ocultar hasta llegar (Anti-spoiler):</span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleUpdatePanelParams(activePanelIdx, { hideUntilReached: true })}
                    className={`text-xs font-bold px-3 py-1 rounded border transition-all cursor-pointer ${
                      activePanel.hideUntilReached ?? true
                        ? "bg-purple-600 text-white border-purple-700 font-bold shadow"
                        : "bg-zinc-800 text-zinc-400 border-white/5 hover:bg-zinc-700"
                    }`}
                  >
                    Sí (Oculto)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdatePanelParams(activePanelIdx, { hideUntilReached: false })}
                    className={`text-xs font-bold px-3 py-1 rounded border transition-all cursor-pointer ${
                      !(activePanel.hideUntilReached ?? true)
                        ? "bg-zinc-700 text-white border-zinc-800 font-bold"
                        : "bg-zinc-800 text-zinc-400 border-white/5 hover:bg-zinc-700"
                    }`}
                  >
                    No (Visible)
                  </button>
                </div>
              </div>

              {/* Dialogues list preview in active panel stop */}
              <div className="bg-[#0a0a0f] p-3 border border-white/10 rounded-md flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    💬 Diálogos en esta Parada ({activePanel.dialogue?.length || 0})
                  </span>
                </div>

                {!activePanel.dialogue || activePanel.dialogue.length === 0 ? (
                  <span className="text-xs text-zinc-500 italic">No hay diálogos asignados a la Parada {activePanelIdx + 1}.</span>
                ) : (
                  <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {activePanel.dialogue.map((d, dIdx) => (
                      <div
                        key={dIdx}
                        className="text-xs bg-[#161622] p-2 rounded border border-white/5 flex flex-col gap-0.5"
                      >
                        <div className="flex items-center justify-between">
                          {d.speaker ? (
                            <span className="font-bold text-amber-300 text-[10px] uppercase tracking-wider">{d.speaker}</span>
                          ) : (
                            <span className="text-[10px] text-zinc-500 italic">Globo #{dIdx + 1}</span>
                          )}
                          <span className="text-[9px] font-mono text-zinc-400">Y: {d.posY ?? 50}%</span>
                        </div>
                        <span className="text-zinc-200 italic font-sans break-words">"{d.text || "(Texto vacío)"}"</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Masks list for active panel */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Máscaras en Parada {activePanelIdx + 1} ({rects.length})
                </span>

                {rects.length === 0 ? (
                  <div className="text-xs text-zinc-500 italic text-center py-6 border border-dashed border-white/10 rounded">
                    Sin máscaras de zoom asignadas. Hacé clic en "+ Agregar Máscara".
                  </div>
                ) : (
                  rects.map((rect, rIdx) => (
                    <div
                      key={rIdx}
                      className="border border-white/10 p-3 rounded-md bg-[#0a0a0f] flex flex-col gap-2.5 shadow-sm"
                    >
                      <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                        <span className="text-xs font-mono font-extrabold text-emerald-400">
                          {rIdx === 0 ? "🎯 Máscara Principal (Zoom)" : `🤫 Máscara de Oclusión ${rIdx + 1}`}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveMask(rIdx)}
                          className="text-xs text-red-400 hover:text-red-300 font-bold hover:underline cursor-pointer"
                        >
                          Eliminar
                        </button>
                      </div>

                      {/* X, Y, Width, Height Precision Sliders */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-mono text-zinc-300">X (Izquierda): {rect.x}%</span>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={rect.x}
                            onChange={(e) => handleUpdateMaskRect(rIdx, { x: parseInt(e.target.value) })}
                            className="w-full accent-emerald-500 cursor-pointer h-1.5"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-mono text-zinc-300">Y (Superior): {rect.y}%</span>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={rect.y}
                            onChange={(e) => handleUpdateMaskRect(rIdx, { y: parseInt(e.target.value) })}
                            className="w-full accent-emerald-500 cursor-pointer h-1.5"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-mono text-zinc-300">Ancho: {rect.w}%</span>
                          <input
                            type="range"
                            min="5"
                            max="100"
                            step="1"
                            value={rect.w}
                            onChange={(e) => handleUpdateMaskRect(rIdx, { w: parseInt(e.target.value) })}
                            className="w-full accent-emerald-500 cursor-pointer h-1.5"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-mono text-zinc-300">Alto: {rect.h}%</span>
                          <input
                            type="range"
                            min="5"
                            max="100"
                            step="1"
                            value={rect.h}
                            onChange={(e) => handleUpdateMaskRect(rIdx, { h: parseInt(e.target.value) })}
                            className="w-full accent-emerald-500 cursor-pointer h-1.5"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
