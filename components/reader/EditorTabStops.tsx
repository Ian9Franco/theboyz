"use client";

import React, { useState, useEffect, useRef } from "react";
import type { PanelConfig } from "./DialogueEditorPanel";
import type { PanelSound } from "./audioPlayer";

interface EditorTabStopsProps {
  currentPanels: PanelConfig[];
  activePanelIdx: number;
  handleAddPanel: () => void;
  setActivePanelIdx: (idx: number) => void;
  setActiveBubbleIdx: (idx: number | null) => void;
  handleRemovePanel: (idx: number) => void;
  handleUpdatePanelParams: (pIdx: number, updates: Partial<PanelConfig>) => void;
  handleReorderPanels: (startIndex: number, endIndex: number) => void;
}

/**
 * EditorTabStops Component (Capa 1: Paradas)
 * Handles panel stop definition, focusY positioning, reordering,
 * auto-advance timers, and panel sound effects.
 */
export function EditorTabStops({
  currentPanels,
  activePanelIdx,
  handleAddPanel,
  setActivePanelIdx,
  setActiveBubbleIdx,
  handleRemovePanel,
  handleUpdatePanelParams,
  handleReorderPanels,
}: EditorTabStopsProps) {
  const [availableSounds, setAvailableSounds] = useState<Array<{ name: string; path: string }>>([]);
  const [previewingSound, setPreviewingSound] = useState<string | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const loadSounds = async () => {
      try {
        const response = await fetch("/api/sounds");
        const sounds = await response.json();
        setAvailableSounds(sounds);
      } catch (error) {
        console.error("Error loading sounds:", error);
      }
    };
    loadSounds();
  }, []);

  const stopPreview = () => {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      previewAudioRef.current.currentTime = 0;
    }
    setPreviewingSound(null);
  };

  const playPreview = (soundPath: string) => {
    stopPreview();
    const audio = new Audio(soundPath);
    previewAudioRef.current = audio;
    setPreviewingSound(soundPath);
    audio.play().catch(() => setPreviewingSound(null));
    audio.onended = () => setPreviewingSound(null);
  };

  const activePanel = currentPanels[activePanelIdx];

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Header & Add Stop Action */}
      <div className="flex justify-between items-center bg-[#161622] p-3 border border-white/10 rounded-md">
        <div className="flex items-center gap-2 font-[var(--font-bangers)] text-lg text-white tracking-wider">
          <span>📍 Paradas de Viñetas (Capa 1)</span>
          <span className="text-xs font-mono bg-[#0a0a0f] border border-white/10 text-rose-400 px-2.5 py-0.5 rounded-full">
            {currentPanels.length} Paradas
          </span>
        </div>
        <button
          type="button"
          onClick={handleAddPanel}
          className="font-[var(--font-bangers)] text-xs bg-emerald-600 hover:bg-emerald-700 text-white border border-white/10 px-3 py-1.5 shadow-[2px_2px_0_rgba(0,0,0,0.3)] transition-all active:scale-95 cursor-pointer rounded"
        >
          + Agregar Parada
        </button>
      </div>

      {currentPanels.length === 0 ? (
        <div className="text-sm text-zinc-500 italic text-center py-10 border border-dashed border-white/10 rounded-[#0e0e14]">
          No hay paradas definidas en esta página. Hacé clic en "+ Agregar Parada" para comenzar.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Active Stop Quick Selector Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-[#0a0a0f] p-2 border border-white/10 rounded-md">
            <span className="text-xs font-bold text-zinc-400 self-center mr-1">Seleccionar:</span>
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
                  className={`px-3 py-1 text-xs font-mono font-bold rounded transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#e8185a] text-white shadow-sm"
                      : "bg-[#161622] text-zinc-300 hover:bg-zinc-800 border border-white/5"
                  }`}
                >
                  Parada {pIdx + 1}
                </button>
              );
            })}
          </div>

          {/* Detailed Config Card for Active Panel Stop */}
          {activePanel && (
            <div className="bg-[#14141e] border-2 border-[#e8185a]/60 rounded-lg p-4 flex flex-col gap-4 shadow-lg">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="font-[var(--font-bangers)] text-base text-white tracking-wide">
                  ⚙️ Configuración: Parada {activePanelIdx + 1}
                </span>
                <div className="flex items-center gap-1.5">
                  {activePanelIdx > 0 && (
                    <button
                      type="button"
                      onClick={() => handleReorderPanels(activePanelIdx, activePanelIdx - 1)}
                      className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-1 rounded border border-white/10 cursor-pointer font-bold"
                      title="Mover parada antes"
                    >
                      ▲ Subir
                    </button>
                  )}
                  {activePanelIdx < currentPanels.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleReorderPanels(activePanelIdx, activePanelIdx + 1)}
                      className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-1 rounded border border-white/10 cursor-pointer font-bold"
                      title="Mover parada después"
                    >
                      ▼ Bajar
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemovePanel(activePanelIdx)}
                    className="text-xs text-red-400 hover:text-red-300 font-bold hover:underline px-1 cursor-pointer"
                  >
                    Eliminar Parada
                  </button>
                </div>
              </div>

              {/* Focus Y Slider */}
              <div className="flex flex-col gap-2 bg-[#0a0a0f] p-3 border border-white/10 rounded-md">
                <div className="flex justify-between text-xs font-mono text-zinc-300">
                  <span className="font-bold text-white">🎯 Altura de Enfoque (focusY):</span>
                  <span className="text-[#e8185a] font-bold">{(activePanel.focusY ?? 0.5).toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={activePanel.focusY ?? 0.5}
                  onChange={(e) =>
                    handleUpdatePanelParams(activePanelIdx, { focusY: parseFloat(e.target.value) })
                  }
                  className="w-full accent-[#e8185a] cursor-pointer"
                />
                <span className="text-[10px] text-zinc-400 italic">
                  💡 Podés arrastrar la línea punteada roja directamente en el lienzo para ajustar la altura de enfoque.
                </span>
              </div>

              {/* Auto-advance duration */}
              <div className="flex flex-col gap-2 bg-[#0a0a0f] p-3 border border-white/10 rounded-md">
                <div className="flex justify-between items-center text-xs font-bold text-zinc-300">
                  <span>⏱️ Auto-avance (Duración):</span>
                  <span className="font-mono text-[#e8185a]">
                    {activePanel.duration ? `${activePanel.duration}s` : "Manual (Sin timer)"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={activePanel.duration ?? 0}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    handleUpdatePanelParams(activePanelIdx, { duration: val > 0 ? val : undefined });
                  }}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Sound Effects Section */}
              <div className="flex flex-col gap-2 bg-[#0a0a0f] p-3 border border-white/10 rounded-md">
                <div className="flex justify-between items-center border-b border-white/5 pb-1">
                  <span className="text-xs font-bold text-white">🔊 Efecto de Sonido:</span>
                  {activePanel.sound && (
                    <button
                      type="button"
                      onClick={() => handleUpdatePanelParams(activePanelIdx, { sound: undefined })}
                      className="text-[10px] text-red-400 hover:underline font-bold"
                    >
                      Quitar Sonido
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={activePanel.sound || ""}
                    onChange={(e) =>
                      handleUpdatePanelParams(activePanelIdx, { sound: e.target.value || undefined })
                    }
                    className="flex-1 border border-white/15 p-2 text-xs font-mono rounded bg-[#13131d] text-white focus:outline-none focus:ring-1 focus:ring-[#e8185a] cursor-pointer"
                  >
                    <option value="">(Sin sonido de viñeta)</option>
                    {availableSounds.map((snd) => (
                      <option key={snd.path} value={snd.path}>
                        {snd.name}
                      </option>
                    ))}
                  </select>

                  {activePanel.sound && (
                    <button
                      type="button"
                      onClick={() =>
                        previewingSound === activePanel.sound
                          ? stopPreview()
                          : playPreview(activePanel.sound!)
                      }
                      className="text-xs bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 border border-indigo-500/30 px-3 py-2 rounded font-bold cursor-pointer transition-all"
                    >
                      {previewingSound === activePanel.sound ? "⏹ Detener" : "▶ Probar"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
