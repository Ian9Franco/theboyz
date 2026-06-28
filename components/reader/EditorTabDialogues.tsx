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
