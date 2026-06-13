"use client";

import React from "react";
import type { DialogueLine } from "./DialogueBubble";
import type { PanelStop as PanelConfig } from "./CinematicReader";
import { EditorBubbleVisualsForm } from "./editor/EditorBubbleVisualsForm";
import { EditorBubbleLayoutForm } from "./editor/EditorBubbleLayoutForm";
import { EditorBubbleTailForm } from "./editor/EditorBubbleTailForm";

interface EditorTabDialoguesProps {
  currentPanels: PanelConfig[];
  activePanelIdx: number;
  activeBubbleIdx: number | null;
  handleAddBubble: (pIdx: number, defaultPosition?: { posX: number; posY: number }) => void;
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
  handleAddBubble,
  handleRemoveBubble,
  handleUpdateBubble,
}: EditorTabDialoguesProps) {
  if (activeBubbleIdx === null || !currentPanels[activePanelIdx]?.dialogue?.[activeBubbleIdx]) {
    return null;
  }

  const bubble = currentPanels[activePanelIdx].dialogue![activeBubbleIdx];

  return (
    <div className="mt-4 p-4 border-2 border-red-500 bg-zinc-50 rounded flex flex-col gap-3 shadow-[3px_3px_0_rgba(239,68,68,0.2)]">
      <div className="flex justify-between items-center border-b pb-2 mb-1">
        <div className="flex items-center gap-2">
          <span className="font-[var(--font-bangers)] text-base text-red-500 tracking-wider">
            Editando Globo
          </span>
          <button
            type="button"
            onClick={() => handleAddBubble(activePanelIdx)}
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

      <span className="text-[10px] text-zinc-400 italic mt-1 text-center">
        💡 ¡También podés arrastrar la burbuja directamente en el cómic!
      </span>
    </div>
  );
}
