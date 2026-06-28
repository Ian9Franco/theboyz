"use client";

import React, { useState } from "react";
import type { DialogueLine } from "./DialogueBubble";
import type { AudioTrack, Dialogues, PanelSound } from "./audioPlayer";
import { EditorTabSettings } from "./EditorTabSettings";
import { EditorTabPanels } from "./EditorTabPanels";
import { EditorTabDialogues } from "./EditorTabDialogues";
import { EditorAudioTracks } from "./EditorAudioTracks";

export interface PanelConfig {
  focusY: number; // 0 to 1
  dialogue?: DialogueLine[];
  zoomRect?: { x: number; y: number; w: number; h: number };
  zoomRects?: { x: number; y: number; w: number; h: number }[];
  duration?: number;
  hideUntilReached?: boolean;
  sound?: string; // Path to audio file
  soundStartTime?: number; // in seconds
  soundEndTime?: number; // in seconds
  soundConfig?: {
    volume?: number; // 0 to 1
    playbackRate?: number; // 0.5 to 2
    loop?: boolean;
    fadeIn?: number; // ms
    fadeOut?: number; // ms
    delay?: number; // ms
  };
  sounds?: PanelSound[];
}

export interface ChapterSettings {
  clearReadDialogues?: boolean;
  appearanceAnimation?: "spring" | "fade" | "slide" | "zoom";
  fadeOutAnimation?: "fade" | "slide" | "zoom";
  dialogueDepth?: number;
}

export interface DialogueEditorPanelProps {
  mode: "read" | "edit";
  currentPanels: PanelConfig[];
  activePanelIdx: number;
  activeBubbleIdx: number | null;
  pageIdx: number;
  pagesLength: number;
  /** Ordered pages array for audio track page selectors */
  pages: string[];
  /** Full localDialogues for audio track panel counts */
  localDialogues: Dialogues;
  isSaving: boolean;
  saveStatus: "success" | "error" | "idle" | null;
  showGrid: boolean;
  snapToGrid: boolean;
  gridSize: number;
  settings: ChapterSettings;
  
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
  handleAddBubble: (pIdx: number, defaultPosition?: { posX: number; posY: number }) => void;
  handleRemoveBubble: (pIdx: number, bIdx: number) => void;
  handleUpdateBubble: (pIdx: number, bIdx: number, updates: Partial<DialogueLine>) => void;
  handleUpdateSettings: (updates: Partial<ChapterSettings>) => void;
  handleUpdateAudioTracks: (tracks: AudioTrack[]) => void;
}

/**
 * DialogueEditorPanel Component
 * Main sidebar controller for editing panels, dialogues, and chapter settings.
 * Relies on EditorTabSettings, EditorTabPanels, and EditorTabDialogues subcomponents.
 */
export function DialogueEditorPanel({
  mode,
  currentPanels,
  activePanelIdx,
  activeBubbleIdx,
  pageIdx,
  pagesLength,
  pages,
  localDialogues,
  isSaving,
  saveStatus,
  showGrid,
  snapToGrid,
  gridSize,
  settings,
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
  handleUpdateSettings,
  handleUpdateAudioTracks,
}: DialogueEditorPanelProps) {
  if (mode !== "edit") return null;

  const isLastPage = pageIdx >= pagesLength - 1;

  return (
    <div
      className="w-full md:w-[680px] shrink-0 bg-[#0e0e14] border-t md:border-t-0 md:border-l border-white/10 flex flex-col overflow-y-auto z-40 text-zinc-200 editor-dark-theme"
      style={{ maxHeight: "calc(100vh - 64px)" }}
    >
      <style>{`
        /* Scoped editor dark theme overrides */
        .editor-dark-theme::-webkit-scrollbar {
          width: 6px;
        }
        .editor-dark-theme::-webkit-scrollbar-track {
          background: #0e0e14;
        }
        .editor-dark-theme::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 3px;
        }
        .editor-dark-theme::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }

        .editor-dark-theme select,
        .editor-dark-theme input:not([type="checkbox"]):not([type="range"]):not([type="color"]),
        .editor-dark-theme textarea {
          background-color: #0a0a0f !important;
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 4px !important;
          font-size: 12px !important;
          padding: 6px 10px !important;
        }

        .editor-dark-theme select option {
          background-color: #0a0a0f !important;
          color: #ffffff !important;
        }

        .editor-dark-theme label,
        .editor-dark-theme .text-zinc-600,
        .editor-dark-theme .text-zinc-700,
        .editor-dark-theme .text-zinc-500 {
          color: #a1a1aa !important;
        }

        .editor-dark-theme .bg-white,
        .editor-dark-theme .bg-zinc-50,
        .editor-dark-theme .bg-zinc-50\\/50,
        .editor-dark-theme .bg-[#f3f4f6],
        .editor-dark-theme .bg-zinc-100,
        .editor-dark-theme .bg-zinc-100\\/50 {
          background-color: #14141e !important;
          color: #f4f4f5 !important;
        }

        .editor-dark-theme .border-zinc-200,
        .editor-dark-theme .border-zinc-300,
        .editor-dark-theme .border-b-2,
        .editor-dark-theme .border-b-3,
        .editor-dark-theme .border-t-3,
        .editor-dark-theme .border-2,
        .editor-dark-theme .border,
        .editor-dark-theme .border-\\[\\#0a0a0f\\] {
          border-color: rgba(255, 255, 255, 0.08) !important;
        }

        .editor-dark-theme input[type="range"] {
          accent-color: #e8185a !important;
        }

        /* Details list marker hide */
        .editor-dark-theme details summary::-webkit-details-marker {
          display: none !important;
        }
        .editor-dark-theme details summary {
          list-style: none !important;
        }
      `}</style>

      {/* Header / Save Block */}
      <div className="p-4 border-b border-white/10 bg-[#161622] flex items-center justify-between">
        <span className="font-[var(--font-bangers)] text-xl tracking-wider text-white">
          Editor de Diálogos
        </span>
        <button
          onClick={handleSaveChanges}
          disabled={isSaving}
          className={`font-[var(--font-bangers)] text-sm px-4 py-2 border border-white/20 shadow-[2px_2px_0_rgba(0,0,0,0.3)] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_rgba(0,0,0,0.3)] rounded cursor-pointer ${
            saveStatus === "success"
              ? "bg-green-600 text-white"
              : saveStatus === "error"
              ? "bg-red-600 text-white"
              : "bg-[#e8185a] text-white hover:bg-rose-700"
          }`}
        >
          {isSaving ? "Guardando..." : saveStatus === "success" ? "Guardado ✓" : "Guardar JSON"}
        </button>
      </div>

      {/* Page Navigation */}
      <div className="p-4 border-b border-white/10 bg-[#14141e] flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => pageIdx > 0 && resetPage(pageIdx - 1)}
          disabled={pageIdx === 0}
          className="bg-zinc-800 border border-white/10 hover:bg-zinc-700 text-white text-xs py-1.5 px-3 rounded disabled:opacity-50 cursor-pointer"
        >
          Pág Ant
        </button>
        <span className="font-[var(--font-marker)] text-sm text-white">
          Página {pageIdx + 1}
        </span>
        <button
          type="button"
          onClick={() => pageIdx < pagesLength - 1 && resetPage(pageIdx + 1)}
          disabled={isLastPage}
          className="bg-zinc-800 border border-white/10 hover:bg-zinc-700 text-white text-xs py-1.5 px-3 rounded disabled:opacity-50 cursor-pointer"
        >
          Pág Sig
        </button>
      </div>

      {/* Grid & Snapping Controls */}
      <div className="p-4 border-b border-white/10 bg-[#161622] flex flex-col gap-2.5">
        <span className="font-[var(--font-bangers)] text-sm text-zinc-300 tracking-wide">
          📏 Cuadrícula y Alineación
        </span>
        <div className="flex items-center justify-between">
          <label className="text-xs text-zinc-400 font-bold">Mostrar Grid:</label>
          <input
            type="checkbox"
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
            className="w-4 h-4 accent-[#e8185a] cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-xs text-zinc-400 font-bold">Ajustar al Grid (Snap):</label>
          <input
            type="checkbox"
            checked={snapToGrid}
            onChange={(e) => setSnapToGrid(e.target.checked)}
            className="w-4 h-4 accent-[#e8185a] cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <label className="text-xs text-zinc-400 font-bold">Paso del Grid (%):</label>
          <select
            value={gridSize}
            onChange={(e) => setGridSize(parseInt(e.target.value))}
            className="border border-white/10 px-2 py-1.5 text-xs font-mono rounded bg-[#0a0a0f] text-white focus:outline-none focus:ring-1 focus:ring-rose-500 cursor-pointer"
          >
            <option value="2">2%</option>
            <option value="5">5% (Estándar)</option>
            <option value="10">10%</option>
          </select>
        </div>
      </div>

      {/* Accordion: Global Settings Tab */}
      <EditorTabSettings
        settings={settings}
        handleUpdateSettings={handleUpdateSettings}
      />

      {/* Accordion: Panels Stops Tab */}
      <EditorTabPanels
        currentPanels={currentPanels}
        activePanelIdx={activePanelIdx}
        activeBubbleIdx={activeBubbleIdx}
        handleAddPanel={handleAddPanel}
        setActivePanelIdx={setActivePanelIdx}
        setActiveBubbleIdx={setActiveBubbleIdx}
        handleRemovePanel={handleRemovePanel}
        handleUpdatePanelParams={handleUpdatePanelParams}
        handleAddBubble={handleAddBubble}
      />

      {/* Accordion: Chapter-level Audio Tracks */}
      <EditorAudioTracks
        audioTracks={localDialogues.audioTracks ?? []}
        pages={pages}
        localDialogues={localDialogues}
        onUpdate={handleUpdateAudioTracks}
      />

      {/* Active Dialogue Bubble Settings Panel */}
      <div className="p-4 flex-1">
        <EditorTabDialogues
          currentPanels={currentPanels}
          activePanelIdx={activePanelIdx}
          activeBubbleIdx={activeBubbleIdx}
          handleAddBubble={handleAddBubble}
          handleRemoveBubble={handleRemoveBubble}
          handleUpdateBubble={handleUpdateBubble}
        />
      </div>
    </div>
  );
}
