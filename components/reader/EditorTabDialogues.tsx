"use client";

import React from "react";
import type { DialogueLine } from "./DialogueBubble";
import type { PanelStop as PanelConfig } from "./audioPlayer";
import { EditorBubbleVisualsForm } from "./editor/EditorBubbleVisualsForm";
import { EditorBubbleLayoutForm } from "./editor/EditorBubbleLayoutForm";
import { EditorBubbleTailForm } from "./editor/EditorBubbleTailForm";

interface EditorTabDialoguesProps {
  currentPanels: PanelConfig[];
  activePanelIdx: number;
  activeBubbleIdx: number | null;
  setActiveBubbleIdx: (idx: number | null) => void;
  handleAddBubble: (pIdx: number, defaultPosition?: { posX: number; posY: number }, defaultStyle?: "normal" | "caption") => void;
  handleRemoveBubble: (pIdx: number, bIdx: number) => void;
  handleUpdateBubble: (pIdx: number, bIdx: number, updates: Partial<DialogueLine>) => void;
  presetMode?: "standard" | "custom";
}

/**
 * EditorTabDialogues Component
 * Renders the bubble detail editor with modular sub-forms.
 */
export function EditorTabDialogues({
  currentPanels,
  activePanelIdx,
  activeBubbleIdx,
  setActiveBubbleIdx,
  handleAddBubble,
  handleRemoveBubble,
  handleUpdateBubble,
  presetMode = "standard",
}: EditorTabDialoguesProps) {
  const activePanel = currentPanels[activePanelIdx];

  if (!activePanel) {
    return (
      <div className="bg-[#161622] border border-white/10 rounded p-6 flex flex-col items-center justify-center text-center">
        <span className="text-sm text-zinc-400 italic">Selecciona una viñeta para comenzar a editar diálogos.</span>
      </div>
    );
  }

  // Fallback / Creation Hub when no bubble is selected
  if (activeBubbleIdx === null || !activePanel.dialogue?.[activeBubbleIdx]) {
    return (
      <div className="bg-[#161622] border border-white/10 rounded p-4 flex flex-col gap-4">
        <div className="font-[var(--font-bangers)] text-lg text-zinc-300 tracking-wider">
          💬 Globos y Narraciones (Viñeta {activePanelIdx + 1})
        </div>
        
        <p className="text-xs text-zinc-400">
          No hay ningún globo seleccionado en esta viñeta. Creá uno nuevo o seleccioná uno existente de la lista:
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleAddBubble(activePanelIdx, undefined, "normal")}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-[#0a0a0f] hover:bg-[#13131d] border border-white/10 hover:border-[#e8185a] rounded transition-all cursor-pointer group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">💬</span>
            <span className="text-xs font-bold text-white font-[var(--font-bangers)] tracking-wide">Crear Diálogo</span>
            <span className="text-[9px] text-zinc-500">Globo clásico con colita</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddBubble(activePanelIdx, undefined, "caption")}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-[#0a0a0f] hover:bg-[#13131d] border border-white/10 hover:border-blue-500 rounded transition-all cursor-pointer group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">📜</span>
            <span className="text-xs font-bold text-white font-[var(--font-bangers)] tracking-wide">Crear Narración</span>
            <span className="text-[9px] text-zinc-500">Caja de texto rectangular</span>
          </button>
        </div>

        {activePanel.dialogue && activePanel.dialogue.length > 0 && (
          <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-white/5">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Seleccionar globo existente:
            </span>
            <div className="grid grid-cols-2 gap-2 max-h-[140px] overflow-y-auto pr-1">
              {activePanel.dialogue.map((bub, bIdx) => (
                <button
                  key={bIdx}
                  type="button"
                  onClick={() => setActiveBubbleIdx(bIdx)}
                  className="text-left text-[11px] p-2 border border-white/10 bg-[#0a0a0f] hover:bg-[#13131d] rounded text-zinc-300 font-mono truncate transition-all cursor-pointer"
                >
                  <span className="font-bold text-zinc-500 mr-1">#{bIdx + 1}</span>
                  {bub.speaker ? `${bub.speaker}: ` : ""}
                  {bub.text || "(vacío)"}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const bubble = activePanel.dialogue[activeBubbleIdx];

  if (presetMode === "standard") {
    return (
      <div className="bg-[#161622] border border-white/10 rounded p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveBubbleIdx(null)}
              className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              ← Volver
            </button>
            <span className="font-[var(--font-bangers)] text-base text-zinc-300 tracking-wider">
              {bubble.style === "caption" ? "Narración 📜" : "Diálogo 💬"} #{activeBubbleIdx + 1}
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleRemoveBubble(activePanelIdx, activeBubbleIdx)}
            className="text-xs text-red-500 hover:text-red-400 hover:underline cursor-pointer font-bold"
          >
            Eliminar
          </button>
        </div>

        {/* Speaker Name Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-zinc-300">Hablante / Personaje:</label>
          <input
            type="text"
            value={bubble.speaker || ""}
            onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { speaker: e.target.value })}
            className="border border-white/10 p-2 text-xs font-sans rounded bg-[#0a0a0f] text-white focus:outline-none focus:ring-1 focus:ring-[#e8185a]"
            placeholder="Ej: Ian, Mati, Uandi..."
          />
          {/* Quick Speaker Selector */}
          <div className="flex flex-wrap gap-1 mt-1">
            {["Ian", "Mati", "Uandi", "Sofi", "Jaz", "Julián", "Volvo"].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { speaker: name })}
                className={`text-[10px] font-bold px-2 py-1 rounded transition-colors cursor-pointer ${
                  bubble.speaker === name
                    ? "bg-[#e8185a] text-white font-bold"
                    : "bg-[#0a0a0f] text-zinc-400 hover:text-white border border-white/5"
                }`}
              >
                {name}
              </button>
            ))}
            {bubble.speaker && (
              <button
                type="button"
                onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { speaker: "" })}
                className="text-[10px] font-bold px-2 py-1 rounded bg-[#0a0a0f] text-red-400 hover:text-red-300 border border-white/5 cursor-pointer"
              >
                Quitar
              </button>
            )}
          </div>
        </div>

        {/* Text Area for Dialogue content */}
        <div className="flex flex-col gap-1.5 mt-1">
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
              ⚡ Pegar
            </button>
          </div>
          <textarea
            value={bubble.text}
            onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { text: e.target.value })}
            className="w-full h-24 border border-white/10 p-2 text-xs font-sans rounded bg-[#0a0a0f] text-white resize-none focus:outline-none focus:ring-1 focus:ring-[#e8185a]"
            placeholder="Escribí el diálogo..."
          />
        </div>

        {/* Max Width Slider */}
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-300">
            <span>Ancho Máximo:</span>
            <span className="font-mono text-zinc-400">{bubble.width ? `${bubble.width}px` : "Defecto"}</span>
          </div>
          <input
            type="range"
            min="100"
            max="600"
            step="10"
            value={bubble.width || 250}
            onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { width: parseInt(e.target.value) })}
            className="w-full accent-[#e8185a] cursor-pointer"
          />
        </div>

        <span className="text-[10px] text-zinc-500 italic text-center border-t border-white/5 pt-2 mt-1">
          💡 ¡También podés arrastrar la burbuja directamente en el lienzo del cómic para posicionarla!
        </span>
      </div>
    );
  }

  return (
    <div className="bg-[#161622] border border-white/10 rounded p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveBubbleIdx(null)}
            className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Volver
          </button>
          <span className="font-[var(--font-bangers)] text-base text-zinc-300 tracking-wider">
            Editando Globo #{activeBubbleIdx + 1}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleAddBubble(activePanelIdx, undefined, "normal")}
            className="font-[var(--font-bangers)] text-xs bg-emerald-600 hover:bg-emerald-700 text-white border border-white/10 px-2.5 py-1 rounded transition-colors cursor-pointer"
          >
            + Nuevo
          </button>
          <button
            type="button"
            onClick={() => handleRemoveBubble(activePanelIdx, activeBubbleIdx)}
            className="text-xs text-red-500 hover:text-red-400 hover:underline cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>

      <EditorBubbleVisualsForm
        bubble={bubble}
        activePanelIdx={activePanelIdx}
        activeBubbleIdx={activeBubbleIdx}
        handleUpdateBubble={handleUpdateBubble}
      />

      <EditorBubbleTailForm
        bubble={bubble}
        activePanelIdx={activePanelIdx}
        activeBubbleIdx={activeBubbleIdx}
        handleUpdateBubble={handleUpdateBubble}
      />

      <EditorBubbleLayoutForm
        bubble={bubble}
        activePanelIdx={activePanelIdx}
        activeBubbleIdx={activeBubbleIdx}
        currentPanels={currentPanels}
        handleUpdateBubble={handleUpdateBubble}
      />

      <span className="text-[10px] text-zinc-500 italic text-center">
        💡 ¡También podés arrastrar la burbuja o su cola directamente en el lienzo del cómic!
      </span>
    </div>
  );
}
