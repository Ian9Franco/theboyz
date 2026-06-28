"use client";

import React, { useState, useEffect, useCallback } from "react";
import type { DialogueLine } from "./DialogueBubble";
import type { Dialogues, PageData, PanelStop as PanelConfig, ChapterSettings, AudioTrack } from "./audioPlayer";

interface UseDialogueEditorProps {
  dialogues: Dialogues | null;
  chapterId: string;
  pageKey: string;
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
  pageKey,
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

  const pgKey = pageKey;
  const currentPageData = localDialogues.pages?.[pgKey] || { panels: [] };

  const updateDialoguesState = (newPages: Record<string, PageData>) => {
    // Save snapshot before mutating
    setUndoStack((prev) => [...prev.slice(-49), JSON.parse(JSON.stringify(localDialogues))]);
    setLocalDialogues((prev) => ({
      ...prev,
      pages: newPages,
    }));
  };

  const updateDialoguesStateNoUndo = (newPages: Record<string, PageData>) => {
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

  const handleAddBubble = (pIdx: number, defaultPosition?: { posX: number; posY: number }, defaultStyle: "normal" | "caption" = "normal") => {
    const updatedPages = { ...localDialogues.pages };
    const pg = { ...currentPageData };
    const panelsCopy = [...(pg.panels || [])];
    const targetPanel = { ...panelsCopy[pIdx] };
    const dialoguesCopy = targetPanel.dialogue ? [...targetPanel.dialogue] : [];

    const posX = defaultPosition ? defaultPosition.posX : 50;
    const posY = defaultPosition ? defaultPosition.posY : Math.round(targetPanel.focusY * 100);

    dialoguesCopy.push({
      text: defaultStyle === "caption" ? "Texto de la narración..." : "Nuevo diálogo",
      speaker: "",
      style: defaultStyle,
      size: defaultStyle === "caption" ? "medium" : "small",
      posX,
      posY,
      tailX: posX,
      tailY: posY + 15,
      tailWidth: 6,
      tailCurvature: -22,
      width: defaultStyle === "caption" ? 160 : 120,
      fontSize: 9,
      borderRadius: defaultStyle === "caption" ? 4 : 18,
      tail: defaultStyle === "caption" ? "none" : undefined,
      fontFamily: defaultStyle === "caption" ? "sans" : undefined,
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

  /**
   * Replaces the entire audioTracks array in localDialogues.
   * Supports undo like all other state mutations.
   */
  const handleUpdateAudioTracks = (tracks: AudioTrack[]) => {
    setUndoStack((prev) => [...prev.slice(-49), JSON.parse(JSON.stringify(localDialogues))]);
    setLocalDialogues((prev) => ({
      ...prev,
      audioTracks: tracks,
    }));
  };

  const handleDragEnd = (info: any, pIdx: number, bIdx: number) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

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
    if (rect.width <= 0 || rect.height <= 0) return;

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

  const handlePanelRectDragEnd = (info: any, pIdx: number, rIdx: number) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const deltaXPercent = (info.offset.x / rect.width) * 100;
    const deltaYPercent = (info.offset.y / rect.height) * 100;

    const pg = localDialogues.pages?.[pageKey] || { panels: [] };
    const panelsCopy = [...(pg.panels || [])];
    const targetPanel = { ...panelsCopy[pIdx] };
    const rects = targetPanel.zoomRects ? [...targetPanel.zoomRects] : targetPanel.zoomRect ? [{...targetPanel.zoomRect}] : [];
    
    if (rects[rIdx]) {
      let newX = rects[rIdx].x + deltaXPercent;
      let newY = rects[rIdx].y + deltaYPercent;

      if (snapToGrid) {
        newX = Math.round(newX / gridSize) * gridSize;
        newY = Math.round(newY / gridSize) * gridSize;
      } else {
        newX = Math.round(newX);
        newY = Math.round(newY);
      }

      rects[rIdx] = { ...rects[rIdx], x: newX, y: newY };
      handleUpdatePanelParams(pIdx, { zoomRects: rects, zoomRect: undefined });
    }
  };

  const handleFocusYDragEnd = (info: any, pIdx: number) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    if (rect.height <= 0) return;

    const deltaYPercent = (info.offset.y / rect.height) * 100;

    const pg = localDialogues.pages?.[pageKey] || { panels: [] };
    const panelsCopy = [...(pg.panels || [])];
    const targetPanel = { ...panelsCopy[pIdx] };
    
    let newFocusY = ((targetPanel.focusY ?? 0.5) * 100) + deltaYPercent;

    if (snapToGrid) {
      newFocusY = Math.round(newFocusY / gridSize) * gridSize;
    } else {
      newFocusY = Math.round(newFocusY);
    }

    newFocusY = Math.max(0, Math.min(100, newFocusY)) / 100;

    handleUpdatePanelParams(pIdx, { focusY: newFocusY });
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

  const handlePanelRectResizeStart = (
    e: React.PointerEvent,
    handle: string,
    pIdx: number,
    rIdx: number
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (!imgRef.current) return;
    const imgBound = imgRef.current.getBoundingClientRect();
    if (imgBound.width <= 0 || imgBound.height <= 0) return;
    const startX = e.clientX;
    const startY = e.clientY;
    
    const pg = localDialogues.pages?.[pageKey] || { panels: [] };
    const panelsCopy = [...(pg.panels || [])];
    const targetPanel = { ...panelsCopy[pIdx] };
    const rects = targetPanel.zoomRects ? [...targetPanel.zoomRects] : targetPanel.zoomRect ? [{...targetPanel.zoomRect}] : [];
    const zoom = rects[rIdx];
    if (!zoom) return;

    const startRect = { ...zoom };

    // Push the current state to the undo stack exactly once when starting the drag
    setUndoStack((prev) => [...prev.slice(-49), JSON.parse(JSON.stringify(localDialogues))]);

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      
      const deltaXPercent = (dx / imgBound.width) * 100;
      const deltaYPercent = (dy / imgBound.height) * 100;

      let newX = startRect.x;
      let newY = startRect.y;
      let newW = startRect.w;
      let newH = startRect.h;

      if (handle.includes("r")) {
        newW = startRect.w + deltaXPercent;
      }
      if (handle.includes("l")) {
        newX = startRect.x + deltaXPercent;
        newW = startRect.w - deltaXPercent;
      }
      if (handle.includes("b")) {
        newH = startRect.h + deltaYPercent;
      }
      if (handle.includes("t")) {
        newY = startRect.y + deltaYPercent;
        newH = startRect.h - deltaYPercent;
      }

      // Constrain coordinates and size
      const minSize = 2;
      
      if (snapToGrid) {
        newX = Math.round(newX / gridSize) * gridSize;
        newY = Math.round(newY / gridSize) * gridSize;
        newW = Math.round(newW / gridSize) * gridSize;
        newH = Math.round(newH / gridSize) * gridSize;
      }

      if (newW < minSize) {
        if (handle.includes("l")) {
          newX = startRect.x + startRect.w - minSize;
        }
        newW = minSize;
      }
      if (newH < minSize) {
        if (handle.includes("t")) {
          newY = startRect.y + startRect.h - minSize;
        }
        newH = minSize;
      }

      newX = Math.max(0, Math.min(100 - newW, newX));
      newY = Math.max(0, Math.min(100 - newH, newY));
      newW = Math.max(minSize, Math.min(100 - newX, newW));
      newH = Math.max(minSize, Math.min(100 - newY, newH));

      rects[rIdx] = { x: newX, y: newY, w: newW, h: newH };
      
      const updatedPages = { ...localDialogues.pages };
      const pgUpdate = { ...pg, panels: panelsCopy };
      panelsCopy[pIdx] = { ...targetPanel, zoomRects: rects, zoomRect: undefined };
      updatedPages[pageKey] = pgUpdate;

      updateDialoguesStateNoUndo(updatedPages);
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
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
    handleUpdateAudioTracks,
    handleDragEnd,
    handleTailTargetDragEnd,
    handlePanelRectDragEnd,
    handleFocusYDragEnd,
    handlePanelRectResizeStart,
    handleSaveChanges,
  };
}
