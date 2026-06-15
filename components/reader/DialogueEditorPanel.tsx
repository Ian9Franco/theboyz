"use client";

import React, { useState } from "react";
import type { DialogueLine } from "./DialogueBubble";
import type { AudioTrack, Dialogues, PanelSound } from "./CinematicReader";
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
  const [isViñetasOpen, setIsViñetasOpen] = useState(true);
  const [isGlobalSettingsOpen, setIsGlobalSettingsOpen] = useState(false);

  if (mode !== "edit") return null;

  const isLastPage = pageIdx >= pagesLength - 1;

  return (
    <div
      className="w-full md:w-96 shrink-0 bg-white border-t-3 md:border-t-0 border-[#0a0a0f] flex flex-col overflow-y-auto z-40"
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

      {/* Page Navigation */}
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

      {/* Accordion: Global Settings Tab */}
      <EditorTabSettings
        settings={settings}
        handleUpdateSettings={handleUpdateSettings}
        isGlobalSettingsOpen={isGlobalSettingsOpen}
        setIsGlobalSettingsOpen={setIsGlobalSettingsOpen}
      />

      {/* Accordion: Panels Stops Tab */}
      <EditorTabPanels
        currentPanels={currentPanels}
        activePanelIdx={activePanelIdx}
        activeBubbleIdx={activeBubbleIdx}
        isViñetasOpen={isViñetasOpen}
        setIsViñetasOpen={setIsViñetasOpen}
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
