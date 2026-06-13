"use client";

import React, { useState, useEffect, useCallback } from "react";
import type { DialogueLine } from "./DialogueBubble";
import type { Dialogues, PageData, PanelStop as PanelConfig, ChapterSettings } from "./CinematicReader";

interface UseDialogueEditorProps {
  dialogues: Dialogues | null;
  chapterId: string;
  pageIdx: number;
  imgRef: React.RefObject<HTMLImageElement | null>;
}

/**
 * useDialogueEditor Hook
 * Manages local copy of dialogues, editor state variables (active panel, active bubble),
 * undo/redo stack, saving changes to the API, dragging and aligning bubbles on the grid,
 * and chapter-wide settings updates.
 */
export function useDialogueEditor({
  dialogues,
  chapterId,
  pageIdx,
  imgRef,
}: UseDialogueEditorProps) {
  // Dialogues Local Copy for Editing
  const [localDialogues, setLocalDialogues] = useState<Dialogues>({ pages: {} });

  // Editor States
  const [activePanelIdx, setActivePanelIdx] = useState(0);
  const [activeBubbleIdx, setActiveBubbleIdx] = useState<number | null>(null);
  const [undoStack, setUndoStack] = useState<Dialogues[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  // Grid and Snapping States
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [gridSize, setGridSize] = useState(5); // step size in percentage (e.g. 5%)

  // Initialize dialogues copy
  useEffect(() => {
    if (dialogues) {
      setLocalDialogues(dialogues);
    } else {
      setLocalDialogues({ pages: {} });
    }
  }, [dialogues]);

  // History stack handlers
  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) return;
    const previousState = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, -1));
    setLocalDialogues(previousState);
    setActiveBubbleIdx(null);
  }, [undoStack, localDialogues]);

  const pgKey = String(pageIdx + 1);
  const currentPageData = localDialogues.pages?.[pgKey] || { panels: [] };

  const updateDialoguesState = (newPages: Record<string, PageData>) => {
    // Save snapshot before mutating
    setUndoStack((prev) => [...prev.slice(-49), JSON.parse(JSON.stringify(localDialogues))]);
    setLocalDialogues((prev) => ({
      ...prev,
      pages: newPages,
    }));
  };

  const handleAddPanel = () => {
    const updatedPages = { ...localDialogues.pages };
    const pg = { ...currentPageData };
    pg.panels = [...(pg.panels || []), { focusY: 0.5, dialogue: [] }];
    updatedPages[pgKey] = pg;
    updateDialoguesState(updatedPages);
    setActivePanelIdx(pg.panels.length - 1);
    setActiveBubbleIdx(null);
  };

  const handleRemovePanel = (pIdx: number) => {
    const updatedPages = { ...localDialogues.pages };
    const pg = { ...currentPageData };
    pg.panels = (pg.panels || []).filter((_, idx) => idx !== pIdx);
    updatedPages[pgKey] = pg;
    updateDialoguesState(updatedPages);
    setActivePanelIdx(Math.max(0, pIdx - 1));
    setActiveBubbleIdx(null);
  };

  const handleUpdatePanelParams = (pIdx: number, updates: Partial<PanelConfig>) => {
    const updatedPages = { ...localDialogues.pages };
    const pg = { ...currentPageData };
    pg.panels = (pg.panels || []).map((p, idx) => (idx === pIdx ? { ...p, ...updates } : p));
    updatedPages[pgKey] = pg;
    updateDialoguesState(updatedPages);
  };

  const handleAddBubble = (pIdx: number, defaultPosition?: { posX: number; posY: number }) => {
    const updatedPages = { ...localDialogues.pages };
    const pg = { ...currentPageData };
    const panelsCopy = [...(pg.panels || [])];
    const targetPanel = { ...panelsCopy[pIdx] };
    const dialoguesCopy = targetPanel.dialogue ? [...targetPanel.dialogue] : [];

    const posX = defaultPosition ? defaultPosition.posX : 50;
    const posY = defaultPosition ? defaultPosition.posY : Math.round(targetPanel.focusY * 100);

    dialoguesCopy.push({
      text: "Nuevo diálogo",
      speaker: "",
      style: "normal",
      size: "small",
      posX,
      posY,
      tailX: posX,
      tailY: posY + 15,
      tailWidth: 6,
      tailCurvature: -22,
      width: 120,
      fontSize: 9,
      borderRadius: 18,
    });

    targetPanel.dialogue = dialoguesCopy;
    panelsCopy[pIdx] = targetPanel;
    pg.panels = panelsCopy;
    updatedPages[pgKey] = pg;
    updateDialoguesState(updatedPages);

    setActivePanelIdx(pIdx);
    setActiveBubbleIdx(dialoguesCopy.length - 1);
  };

  const handleUpdateBubble = (pIdx: number, bIdx: number, fields: Partial<DialogueLine>) => {
    const updatedPages = { ...localDialogues.pages };
    const pg = { ...currentPageData };
    const panelsCopy = [...(pg.panels || [])];
    const targetPanel = { ...panelsCopy[pIdx] };
    const dialoguesCopy = targetPanel.dialogue ? [...targetPanel.dialogue] : [];

    dialoguesCopy[bIdx] = {
      ...dialoguesCopy[bIdx],
      ...fields,
    };

    targetPanel.dialogue = dialoguesCopy;
    panelsCopy[pIdx] = targetPanel;
    pg.panels = panelsCopy;
    updatedPages[pgKey] = pg;
    updateDialoguesState(updatedPages);
  };

  const handleRemoveBubble = (pIdx: number, bIdx: number) => {
    const updatedPages = { ...localDialogues.pages };
    const pg = { ...currentPageData };
    const panelsCopy = [...(pg.panels || [])];
    const targetPanel = { ...panelsCopy[pIdx] };
    const dialoguesCopy = targetPanel.dialogue ? [...targetPanel.dialogue] : [];

    const filteredDialogues = dialoguesCopy.filter((_, idx) => idx !== bIdx);

    // Adjust linkedTo references
    const adjustedDialogues = filteredDialogues.map((bub) => {
      if (bub.linkedTo === undefined) return bub;
      if (bub.linkedTo === bIdx) {
        return { ...bub, linkedTo: undefined };
      }
      if (bub.linkedTo > bIdx) {
        return { ...bub, linkedTo: bub.linkedTo - 1 };
      }
      return bub;
    });

    targetPanel.dialogue = adjustedDialogues;
    panelsCopy[pIdx] = targetPanel;
    pg.panels = panelsCopy;
    updatedPages[pgKey] = pg;
    updateDialoguesState(updatedPages);

    setActiveBubbleIdx(null);
  };

  const handleUpdateSettings = (updates: Partial<ChapterSettings>) => {
    setUndoStack((prev) => [...prev.slice(-49), JSON.parse(JSON.stringify(localDialogues))]);
    setLocalDialogues((prev) => ({
      ...prev,
      settings: {
        ...(prev.settings || {}),
        ...updates,
      },
    }));
  };

  const handleDragEnd = (info: any, pIdx: number, bIdx: number) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();

    // Convert absolute screen coordinate to image relative percentage
    let relativeX = ((info.point.x - rect.left) / rect.width) * 100;
    let relativeY = ((info.point.y - rect.top) / rect.height) * 100;

    // Apply grid snapping if enabled
    if (snapToGrid) {
      relativeX = Math.round(relativeX / gridSize) * gridSize;
      relativeY = Math.round(relativeY / gridSize) * gridSize;
    }

    handleUpdateBubble(pIdx, bIdx, {
      posX: Math.max(-20, Math.min(120, Math.round(relativeX))),
      posY: Math.max(-20, Math.min(120, Math.round(relativeY))),
    });
  };

  const handleTailTargetDragEnd = (info: any, pIdx: number, bIdx: number) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();

    // Convert absolute screen coordinate to image relative percentage
    let relativeX = ((info.point.x - rect.left) / rect.width) * 100;
    let relativeY = ((info.point.y - rect.top) / rect.height) * 100;

    // Apply grid snapping if enabled
    if (snapToGrid) {
      relativeX = Math.round(relativeX / gridSize) * gridSize;
      relativeY = Math.round(relativeY / gridSize) * gridSize;
    }

    handleUpdateBubble(pIdx, bIdx, {
      tailX: Math.max(-20, Math.min(120, Math.round(relativeX))),
      tailY: Math.max(-20, Math.min(120, Math.round(relativeY))),
    });
  };

  // Save changes to disk using our API endpoint
  const handleSaveChanges = async () => {
    setIsSaving(true);
    setSaveStatus("idle");
    try {
      const savedPass = typeof window !== "undefined" ? sessionStorage.getItem("editor_password") || "" : "";
      const res = await fetch(`/api/chapters/${chapterId}/dialogues`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-editor-password": savedPass,
        },
        body: JSON.stringify({ dialogues: localDialogues }),
      });
      if (res.ok) {
        setSaveStatus("success");
      } else {
        setSaveStatus("error");
      }
    } catch (e) {
      console.error(e);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  return {
    localDialogues,
    setLocalDialogues,
    activePanelIdx,
    setActivePanelIdx,
    activeBubbleIdx,
    setActiveBubbleIdx,
    undoStack,
    isSaving,
    saveStatus,
    showGrid,
    setShowGrid,
    snapToGrid,
    setSnapToGrid,
    gridSize,
    setGridSize,
    handleUndo,
    handleAddPanel,
    handleRemovePanel,
    handleUpdatePanelParams,
    handleAddBubble,
    handleUpdateBubble,
    handleRemoveBubble,
    handleUpdateSettings,
    handleDragEnd,
    handleTailTargetDragEnd,
    handleSaveChanges,
  };
}
