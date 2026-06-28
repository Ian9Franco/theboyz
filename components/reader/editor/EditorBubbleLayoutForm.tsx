"use client";

import React from "react";
import type { DialogueLine } from "../DialogueBubble";
import type { PanelStop as PanelConfig } from "../audioPlayer";

interface EditorBubbleLayoutFormProps {
  bubble: DialogueLine;
  activePanelIdx: number;
  activeBubbleIdx: number;
  currentPanels: PanelConfig[];
  handleUpdateBubble: (pIdx: number, bIdx: number, updates: Partial<DialogueLine>) => void;
}

export function EditorBubbleLayoutForm({
  bubble,
  activePanelIdx,
  activeBubbleIdx,
  currentPanels,
  handleUpdateBubble,
}: EditorBubbleLayoutFormProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Bubble Dimension Sliders */}
      <div className="flex flex-col gap-3 p-3 bg-[#0a0a0f] border border-white/10 rounded">
        {/* Max Width */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-300">
            <span>Ancho Máx: {bubble.width ? `${bubble.width}px` : "Defecto"}</span>
            {bubble.width !== undefined && (
              <button
                type="button"
                onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { width: undefined })}
                className="text-[10px] text-red-500 hover:text-red-400 hover:underline cursor-pointer"
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

        {/* Font Size */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-300">
            <span>Tamaño Letra: {bubble.fontSize ? `${bubble.fontSize}px` : "Defecto"}</span>
            {bubble.fontSize !== undefined && (
              <button
                type="button"
                onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { fontSize: undefined })}
                className="text-[10px] text-red-500 hover:text-red-400 hover:underline cursor-pointer"
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

        {/* Border Radius */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-300">
            <span>
              Curvatura Borde:{" "}
              {bubble.borderRadius !== undefined ? `${bubble.borderRadius}px` : "Defecto"}
            </span>
            {bubble.borderRadius !== undefined && (
              <button
                type="button"
                onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { borderRadius: undefined })}
                className="text-[10px] text-red-500 hover:text-red-400 hover:underline cursor-pointer"
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
            onChange={(e) =>
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, { borderRadius: parseInt(e.target.value) })
            }
            className="w-full accent-[#e8185a] cursor-pointer"
          />
        </div>
      </div>

      {/* Dialogue Text Area */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-zinc-300">Texto:</label>
          <button
            type="button"
            onClick={async () => {
              try {
                const text = await navigator.clipboard.readText();
                if (text) {
                  handleUpdateBubble(activePanelIdx, activeBubbleIdx, { text });
                }
              } catch (err) {
                console.error("Error al leer el portapapeles:", err);
              }
            }}
            className="font-[var(--font-bangers)] text-[10px] bg-blue-950/40 hover:bg-blue-900/30 text-blue-300 border border-blue-900/40 px-2 py-0.5 rounded transition-all cursor-pointer"
          >
            ⚡ Auto (Pegar)
          </button>
        </div>
        <textarea
          value={bubble.text}
          onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { text: e.target.value })}
          className="w-full h-20 border border-white/10 p-2 text-xs font-sans rounded bg-[#0a0a0f] text-white resize-none focus:outline-none focus:ring-1 focus:ring-[#e8185a]"
          placeholder="Escribí el diálogo..."
        />
      </div>

      {/* Position Margins Presets */}
      <div className="flex flex-col gap-1 mt-1">
        <label className="text-xs font-bold text-zinc-300">Posición Rápida (Márgenes/Viñeta):</label>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => {
              const targetY = Math.round((currentPanels[activePanelIdx]?.focusY ?? 0.5) * 100);
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: -15, posY: targetY });
            }}
            className="px-2 py-1.5 bg-[#161622] hover:bg-[#1f1f2e] border border-white/10 text-zinc-200 text-[10px] font-bold rounded text-left flex justify-between items-center transition-colors active:translate-y-0.5 cursor-pointer"
          >
            <span>👈 Margen Izq.</span>
            <span className="text-[8px] text-zinc-500 font-mono">[-15%, Y]</span>
          </button>
          <button
            type="button"
            onClick={() => {
              const targetY = Math.round((currentPanels[activePanelIdx]?.focusY ?? 0.5) * 100);
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: 115, posY: targetY });
            }}
            className="px-2 py-1.5 bg-[#161622] hover:bg-[#1f1f2e] border border-white/10 text-zinc-200 text-[10px] font-bold rounded text-left flex justify-between items-center transition-colors active:translate-y-0.5 cursor-pointer"
          >
            <span>👉 Margen Der.</span>
            <span className="text-[8px] text-zinc-500 font-mono">[115%, Y]</span>
          </button>
          <button
            type="button"
            onClick={() => {
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: 50, posY: -15 });
            }}
            className="px-2 py-1.5 bg-[#161622] hover:bg-[#1f1f2e] border border-white/10 text-zinc-200 text-[10px] font-bold rounded text-left flex justify-between items-center transition-colors active:translate-y-0.5 cursor-pointer"
          >
            <span>👆 Margen Sup.</span>
            <span className="text-[8px] text-zinc-500 font-mono">[50%, -15%]</span>
          </button>
          <button
            type="button"
            onClick={() => {
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: 50, posY: 115 });
            }}
            className="px-2 py-1.5 bg-[#161622] hover:bg-[#1f1f2e] border border-white/10 text-zinc-200 text-[10px] font-bold rounded text-left flex justify-between items-center transition-colors active:translate-y-0.5 cursor-pointer"
          >
            <span>👇 Margen Inf.</span>
            <span className="text-[8px] text-zinc-500 font-mono">[50%, 115%]</span>
          </button>
          <button
            type="button"
            onClick={() => {
              const targetY = Math.round((currentPanels[activePanelIdx]?.focusY ?? 0.5) * 100);
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: 50, posY: targetY });
            }}
            className="col-span-2 px-2 py-1.5 bg-[#161622] hover:bg-[#1f1f2e] border border-white/10 text-zinc-250 text-[10px] font-bold rounded text-center transition-colors active:translate-y-0.5 cursor-pointer"
          >
            🎯 Centro de Viñeta <span className="text-zinc-500 font-mono ml-1 text-[8px]">[50%, Y]</span>
          </button>
        </div>
      </div>

      {/* Manual coordinates input */}
      <div className="grid grid-cols-2 gap-2 mt-1">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-zinc-400">X (Ancho %):</label>
          <input
            type="number"
            min="-20"
            max="120"
            value={bubble.posX ?? 50}
            onChange={(e) =>
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                posX: Math.max(-20, Math.min(120, parseInt(e.target.value) || 0)),
              })
            }
            className="border border-white/10 p-1.5 text-xs font-mono text-center bg-[#0a0a0f] text-white focus:outline-none focus:ring-1 focus:ring-[#e8185a]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-zinc-400">Y (Alto %):</label>
          <input
            type="number"
            min="-20"
            max="120"
            value={bubble.posY ?? 50}
            onChange={(e) =>
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                posY: Math.max(-20, Math.min(120, parseInt(e.target.value) || 0)),
              })
            }
            className="border border-white/10 p-1.5 text-xs font-mono text-center bg-[#0a0a0f] text-white focus:outline-none focus:ring-1 focus:ring-[#e8185a]"
          />
        </div>
      </div>
    </div>
  );
}
