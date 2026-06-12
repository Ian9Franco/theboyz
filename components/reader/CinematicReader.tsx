"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { DialogueBubble, getBubbleStyles, type DialogueLine } from "./DialogueBubble";
import { DialogueEditorPanel } from "./DialogueEditorPanel";

// ─── Types ───────────────────────────────────────────────────────────────────

type PanelStop = {
  focusY: number;
  dialogue?: DialogueLine[];
  zoomRect?: { x: number; y: number; w: number; h: number };
  zoomRects?: { x: number; y: number; w: number; h: number }[];
  duration?: number;
  hideUntilReached?: boolean;
};

type PageData = {
  panels: PanelStop[];
};

type Dialogues = {
  pages?: Record<string, PageData>;
};

// ─── Constants ───────────────────────────────────────────────────────────────

/** Zoom multiplier while reading (1.0 means no zoom, page fits width) */
const READER_ZOOM = 1.0;
const ZOOM_OUT_MS = 300;

export function CinematicReader({
  pages,
  dialogues,
  chapter,
  saga,
  nextChapter,
  prevChapter,
}: {
  pages: string[];
  dialogues: Dialogues | null;
  chapter: any;
  saga: any;
  nextChapter: any;
  prevChapter: any;
}) {
  // Mode selection: "read" or "edit"
  const [mode, setMode] = useState<"read" | "edit">("read");

  // Comic Reader States
  const [pageIdx, setPageIdx] = useState(0);
  const [panelIdx, setPanelIdx] = useState(0);
  const [zoomIdx, setZoomIdx] = useState(0);
  const [zoomedOut, setZoomedOut] = useState(false);
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  // Dialogues Local Copy for Editing
  const [localDialogues, setLocalDialogues] = useState<Dialogues>({ pages: {} });
  
  // Editor States
  const [activePanelIdx, setActivePanelIdx] = useState(0);
  const [activeBubbleIdx, setActiveBubbleIdx] = useState<number | null>(null);
  const [undoStack, setUndoStack] = useState<Dialogues[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  // Dialogue Password Auth States
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);

  // Grid and Snapping States for Editor Mode
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [gridSize, setGridSize] = useState(5); // step size in percentage (e.g. 5%)

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthorized(sessionStorage.getItem("editor_authorized") === "true");
    }
  }, []);

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
    setUndoStack(prev => prev.slice(0, -1));
    setLocalDialogues(previousState);
    setActiveBubbleIdx(null);
  }, [undoStack]);

  // Keyboard shortcut listener for Ctrl+Z
  useEffect(() => {
    if (mode !== "edit") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        handleUndo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, handleUndo]);

  // Lock body scroll
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Measure container
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerSize({
          w: containerRef.current.clientWidth,
          h: containerRef.current.clientHeight,
        });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [mode]); // Re-measure when shifting layouts

  // Load natural image dimensions
  useEffect(() => {
    if (!pages[pageIdx]) return;
    const img = new window.Image();
    img.onload = () => {
      setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
    };
    img.src = pages[pageIdx];
  }, [pageIdx, pages]);

  // Reset page indices
  const resetPage = useCallback((idx: number) => {
    setPageIdx(idx);
    setPanelIdx(0);
    setZoomIdx(0);
    setZoomedOut(false);
    setActivePanelIdx(0);
    setActiveBubbleIdx(null);
  }, []);

  // Reset zoomIdx on panelIdx or mode changes to keep them synchronized
  useEffect(() => {
    setZoomIdx(0);
  }, [panelIdx, mode]);

  // Get current page dialogues safely
  const pgKey = String(pageIdx + 1);
  const currentPageData = localDialogues.pages?.[pgKey] || { panels: [] };
  
  // Filter empty panels only in read mode so the editor can still see and edit all stops.
  // A panel is a valid stop if it has dialogues OR if it has zoomRect/zoomRects (cinematic camera closeup).
  const currentPanels = mode === "read"
    ? (currentPageData.panels || []).filter(p => (p.dialogue && p.dialogue.length > 0) || p.zoomRect || (p.zoomRects && p.zoomRects.length > 0))
    : (currentPageData.panels || []);

  const activePanel = currentPanels[panelIdx] || { focusY: 0.5, dialogue: [] };
  const activePanelRects = activePanel ? (activePanel.zoomRects || (activePanel.zoomRect ? [activePanel.zoomRect] : [])) : [];
  const activeZoomRect = activePanelRects[zoomIdx] || null;

  // Auto-advance logic for panels with duration
  useEffect(() => {
    if (mode !== "read" || zoomedOut) return;
    const activePanelStop = currentPanels[panelIdx];
    if (activePanelStop && activePanelStop.duration && activePanelStop.duration > 0) {
      const rects = activePanelStop.zoomRects || (activePanelStop.zoomRect ? [activePanelStop.zoomRect] : []);
      const timer = setTimeout(() => {
        if (zoomIdx < rects.length - 1) {
          setZoomIdx(prev => prev + 1);
        } else if (panelIdx < currentPanels.length - 1) {
          setPanelIdx(prev => prev + 1);
        } else {
          setZoomedOut(true);
        }
      }, activePanelStop.duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [panelIdx, zoomIdx, currentPanels, mode, zoomedOut]);

  // Calculate layout dimensions
  let imgWidth = 0;
  let imgLeft = 0;
  let imgTop = 0;
  let imgHeight = 0;

  if (imgSize && containerSize.w > 0 && containerSize.h > 0) {
    if (mode === "edit") {
      // In editor mode, fit page to screen height/width so whole page is visible
      const scale = Math.min(
        (containerSize.w * 0.9) / imgSize.w,
        (containerSize.h * 0.85) / imgSize.h
      );
      imgWidth = imgSize.w * scale;
      imgLeft = (containerSize.w - imgWidth) / 2;
      imgTop = (containerSize.h - imgSize.h * scale) / 2;
      imgHeight = imgSize.h * scale;
    } else {
      // Reader Mode
      const zoom = activeZoomRect;
      if (zoom && !zoomedOut) {
        // Close-up Zoom State
        const zX = zoom.x / 100;
        const zY = zoom.y / 100;
        const zW = zoom.w / 100;
        const zH = zoom.h / 100;

        const cropW = zW * imgSize.w;
        const cropH = zH * imgSize.h;

        // Fit crop area to container with 95% margin
        const scale = Math.min(
          (containerSize.w * 0.95) / cropW,
          (containerSize.h * 0.95) / cropH
        );

        imgWidth = imgSize.w * scale;
        imgHeight = imgSize.h * scale;

        // Position the scaled crop center in the middle of the container
        const cropCenterX = (zX + zW / 2) * imgSize.w * scale;
        const cropCenterY = (zY + zH / 2) * imgSize.h * scale;

        imgLeft = containerSize.w / 2 - cropCenterX;
        imgTop = containerSize.h / 2 - cropCenterY;
      } else {
        // Standard View: fit to screen with a beautiful 92% safety margin to prevent bubble clipping on mobile
        const scale = Math.min(
          (containerSize.w * 0.92) / imgSize.w,
          (containerSize.h * 0.92) / imgSize.h
        );
        imgWidth = imgSize.w * scale;
        imgHeight = imgSize.h * scale;
        imgLeft = (containerSize.w - imgWidth) / 2;
        imgTop = (containerSize.h - imgHeight) / 2;
      }
    }
  }

  // Reader interactions: tap to step panels or pages
  const handleReaderTap = (e: React.MouseEvent) => {
    // Avoid tapping on header buttons triggering page step
    if ((e.target as HTMLElement).closest(".btn") || (e.target as HTMLElement).closest(".tag")) {
      return;
    }

    if (zoomedOut) {
      // If zoomed out, tap to go to next page
      if (pageIdx < pages.length - 1) {
        resetPage(pageIdx + 1);
      }
      return;
    }

    if (currentPanels.length === 0) {
      // If no panels defined, zoom out immediately
      setZoomedOut(true);
      return;
    }

    const activePanelStop = currentPanels[panelIdx];
    const rects = activePanelStop?.zoomRects || (activePanelStop?.zoomRect ? [activePanelStop.zoomRect] : []);

    if (zoomIdx < rects.length - 1) {
      // Go to next zoom rectangle in the current panel sequence
      setZoomIdx(prev => prev + 1);
    } else if (panelIdx < currentPanels.length - 1) {
      // Go to next panel
      setPanelIdx(prev => prev + 1);
    } else {
      // Last panel reached, zoom out to show full page
      setZoomedOut(true);
    }
  };

  // ─── EDITOR OPERATIONS ──────────────────────────────────────────────────────

  const handleToggleMode = () => {
    setPanelIdx(0);
    setZoomIdx(0);
    setZoomedOut(false);
    if (mode === "edit") {
      setMode("read");
    } else {
      if (isAuthorized) {
        setMode("edit");
      } else {
        setShowAuthModal(true);
        setPasswordInput("");
        setAuthError(false);
      }
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "hush2026") {
      setIsAuthorized(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("editor_authorized", "true");
        sessionStorage.setItem("editor_password", passwordInput);
      }
      setShowAuthModal(false);
      setPanelIdx(0);
      setZoomedOut(false);
      setMode("edit");
    } else {
      setAuthError(true);
    }
  };

  const updateDialoguesState = (newPages: Record<string, PageData>) => {
    // Save snapshot before mutating
    setUndoStack(prev => [...prev.slice(-49), JSON.parse(JSON.stringify(localDialogues))]);
    setLocalDialogues(prev => ({
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

  const handleUpdatePanelParams = (pIdx: number, updates: Partial<PanelStop>) => {
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
      const res = await fetch(`/api/chapters/${chapter.id}/dialogues`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-editor-password": savedPass
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

  const isLastPage = pageIdx === pages.length - 1;

  /**
   * Compute the point on the edge of the bubble (estimated as an ellipse/rect)
   * in the direction of the anchor target. Returns {x, y} in screen pixels.
   */
  const buildTailPath = (
    bubbleCenterX: number,
    bubbleCenterY: number,
    targetX: number,
    targetY: number,
    line?: DialogueLine
  ) => {
    const dx = targetX - bubbleCenterX;
    const dy = targetY - bubbleCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 8) return null;

    const angle = Math.atan2(dy, dx);
    const perpAngle = angle + Math.PI / 2;
    // Tail base width at center — scales down with distance for an organic look unless specified
    const baseWidth = line?.tailWidth ?? Math.max(8, 28 - distance * 0.03);

    const bLX = bubbleCenterX + Math.cos(perpAngle) * (baseWidth / 2);
    const bLY = bubbleCenterY + Math.sin(perpAngle) * (baseWidth / 2);
    const bRX = bubbleCenterX - Math.cos(perpAngle) * (baseWidth / 2);
    const bRY = bubbleCenterY - Math.sin(perpAngle) * (baseWidth / 2);

    // Quadratic control point halfway, offset by curvature
    const curvature = line?.tailCurvature ?? 0;
    const cx = bubbleCenterX + dx * 0.5 + Math.cos(perpAngle) * curvature;
    const cy = bubbleCenterY + dy * 0.5 + Math.sin(perpAngle) * curvature;

    // Open path to prevent stroke from closing the bubble
    return `M ${bLX} ${bLY} Q ${cx} ${cy} ${targetX} ${targetY} Q ${cx} ${cy} ${bRX} ${bRY}`;
  };

  // Estimate bubble half-dimensions from width/fontSize settings (approximate)
  const estimateBubbleSize = (line: DialogueLine) => {
    const w = line.width ?? 200;
    // Height is roughly proportional to text length and font size
    const fontSize = line.fontSize ?? 14;
    const charPerLine = Math.max(1, w / (fontSize * 0.55));
    const lines = Math.ceil((line.text?.length ?? 20) / charPerLine) + (line.speaker ? 1 : 0);
    const h = lines * (fontSize * 1.5) + 16; // +padding
    return { halfW: w / 2, halfH: h / 2 };
  };


  // Find if a point is inside another dialogue bubble
  const findTargetBubble = (
    tx: number, // Target X in percentage (0-100)
    ty: number, // Target Y in percentage (0-100)
    dialogues: DialogueLine[],
    sourceIdx: number
  ): { index: number; line: DialogueLine } | null => {
    if (!imgWidth || !imgHeight) return null;
    const txPx = imgLeft + (tx / 100) * imgWidth;
    const tyPx = imgTop + (ty / 100) * imgHeight;

    for (let i = 0; i < dialogues.length; i++) {
      if (i === sourceIdx) continue;
      const line = dialogues[i];
      const cx = line.posX ?? 50;
      const cy = line.posY ?? 50;
      const size = estimateBubbleSize(line);

      const cxPx = imgLeft + (cx / 100) * imgWidth;
      const cyPx = imgTop + (cy / 100) * imgHeight;

      const dx = txPx - cxPx;
      const dy = tyPx - cyPx;

      // Ellipse test: (dx / radiusX)^2 + (dy / radiusY)^2 <= 1
      // 10% safety margin for target drop accuracy
      const radiusX = size.halfW * 1.1;
      const radiusY = size.halfH * 1.1;

      if ((dx / radiusX) ** 2 + (dy / radiusY) ** 2 <= 1) {
        return { index: i, line };
      }
    }
    return null;
  };

  // Synchronized delay groups calculation based on anchor collisions
  const getEffectiveIndexes = (dialogue: DialogueLine[]): number[] => {
    const n = dialogue.length;
    if (n === 0) return [];

    const adj: number[][] = Array.from({ length: n }, () => []);
    for (let i = 0; i < n; i++) {
      const line = dialogue[i];
      if (line.tailX !== undefined && line.tailY !== undefined) {
        const target = findTargetBubble(line.tailX, line.tailY, dialogue, i);
        if (target) {
          adj[i].push(target.index);
          adj[target.index].push(i);
        }
      }
    }

    const visited = new Set<number>();
    const components: number[][] = [];

    for (let i = 0; i < n; i++) {
      if (!visited.has(i)) {
        const component: number[] = [];
        const queue = [i];
        visited.add(i);
        while (queue.length > 0) {
          const u = queue.shift()!;
          component.push(u);
          for (const v of adj[u]) {
            if (!visited.has(v)) {
              visited.add(v);
              queue.push(v);
            }
          }
        }
        component.sort((a, b) => a - b);
        components.push(component);
      }
    }

    components.sort((a, b) => a[0] - b[0]);

    const effectiveIdx = new Array(n).fill(0);
    for (let compIdx = 0; compIdx < components.length; compIdx++) {
      for (const u of components[compIdx]) {
        effectiveIdx[u] = compIdx;
      }
    }

    return effectiveIdx;
  };

  // buildTailSVGPaths removed.

  // Rendered Dialogues Helper
  const renderedDialogues = (() => {
    if (mode === "read") {
      const dialogueList = activePanel.dialogue || [];
      const effectiveIndexes = getEffectiveIndexes(dialogueList);

      return dialogueList.map((line, i) => {
        const posX = line.posX ?? 50;
        const posY = line.posY ?? (activePanel.focusY * 100);
        const bubbleLeft = imgLeft + (posX / 100) * imgWidth;
        const bubbleTop = imgTop + (posY / 100) * imgHeight;
        const targetX = line.tailX !== undefined ? imgLeft + (line.tailX / 100) * imgWidth : null;
        const targetY = line.tailY !== undefined ? imgTop + (line.tailY / 100) * imgHeight : null;
        const effIdx = effectiveIndexes[i] ?? i;

        // Check if this bubble is a target of any other bubble's tail in the same panel
        const isTargetOfAny = dialogueList.some((otherLine, otherIdx) => {
          if (otherIdx === i) return false;
          if (otherLine.tailX === undefined || otherLine.tailY === undefined) return false;
          const target = findTargetBubble(otherLine.tailX, otherLine.tailY, dialogueList, otherIdx);
          return target && target.index === i;
        });

        let elasticTailNode = null;
        if (targetX !== null && targetY !== null) {
          const { bgColor } = getBubbleStyles(line);
          const target = findTargetBubble(line.tailX!, line.tailY!, dialogueList, i);
          
          let finalTargetX = targetX - bubbleLeft;
          let finalTargetY = targetY - bubbleTop;
          
          if (target) {
            // It connects to another bubble!
            // Calculate the edge point of target bubble B
            const targetLine = target.line;
            const targetPosX = targetLine.posX ?? 50;
            const targetPosY = targetLine.posY ?? (activePanel.focusY * 100);
            const targetLeft = imgLeft + (targetPosX / 100) * imgWidth;
            const targetTop = imgTop + (targetPosY / 100) * imgHeight;
            
            // Vector from A's center to B's center in local coordinates of A
            const bx = targetLeft - bubbleLeft;
            const by = targetTop - bubbleTop;
            const dist = Math.sqrt(bx * bx + by * by);
            
            if (dist > 0.01) {
              const targetSize = estimateBubbleSize(targetLine);
              const t = 1 / Math.sqrt((bx / targetSize.halfW) ** 2 + (by / targetSize.halfH) ** 2);
              
              // Intersection point on B's ellipse relative to A's center
              const edgeX = bx - bx * t;
              const edgeY = by - by * t;
              
              // Penetrate 10px inside B
              finalTargetX = edgeX + (bx / dist) * 10;
              finalTargetY = edgeY + (by / dist) * 10;
            }
          }

          const d = buildTailPath(0, 0, finalTargetX, finalTargetY, line);
          if (d) {
            elasticTailNode = (
              <svg className="absolute pointer-events-none overflow-visible" style={{ left: "50%", top: "50%", zIndex: 0 }}>
                {/* No stroke here! We rely on the drop-shadow filter in DialogueBubble to outline the combined shape */}
                <path d={d} fill={bgColor} stroke="none" strokeWidth={0} />
              </svg>
            );
          }
        }

        return (
          <div
            key={`read-bub-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: bubbleLeft,
              top: bubbleTop,
              transform: "translate(-50%, -50%)",
              width: "max-content",
              zIndex: isTargetOfAny ? 29 : 30,
            }}
          >
            <DialogueBubble line={line} index={effIdx} elasticTailNode={elasticTailNode} />
          </div>
        );
      });
    }

    return currentPanels.flatMap((panel, pIdx) => {
      const dialogueList = panel.dialogue || [];
      return dialogueList.map((line, bIdx) => {
        const isActive = activePanelIdx === pIdx && activeBubbleIdx === bIdx;
        const posX = line.posX ?? 50;
        const posY = line.posY ?? (panel.focusY * 100);
        const bubbleLeft = imgLeft + (posX / 100) * imgWidth;
        const bubbleTop = imgTop + (posY / 100) * imgHeight;
        const targetX = line.tailX !== undefined ? imgLeft + (line.tailX / 100) * imgWidth : null;
        const targetY = line.tailY !== undefined ? imgTop + (line.tailY / 100) * imgHeight : null;

        // Check if this bubble is a target of any other bubble's tail in the same panel
        const isTargetOfAny = dialogueList.some((otherLine, otherIdx) => {
          if (otherIdx === bIdx) return false;
          if (otherLine.tailX === undefined || otherLine.tailY === undefined) return false;
          const target = findTargetBubble(otherLine.tailX, otherLine.tailY, dialogueList, otherIdx);
          return target && target.index === bIdx;
        });

        let elasticTailNode = null;
        if (targetX !== null && targetY !== null) {
          const { bgColor } = getBubbleStyles(line);
          const target = findTargetBubble(line.tailX!, line.tailY!, dialogueList, bIdx);
          
          let finalTargetX = targetX - bubbleLeft;
          let finalTargetY = targetY - bubbleTop;
          
          if (target) {
            // It connects to another bubble!
            // Calculate the edge point of target bubble B
            const targetLine = target.line;
            const targetPosX = targetLine.posX ?? 50;
            const targetPosY = targetLine.posY ?? (panel.focusY * 100);
            const targetLeft = imgLeft + (targetPosX / 100) * imgWidth;
            const targetTop = imgTop + (targetPosY / 100) * imgHeight;
            
            // Vector from A's center to B's center in local coordinates of A
            const bx = targetLeft - bubbleLeft;
            const by = targetTop - bubbleTop;
            const dist = Math.sqrt(bx * bx + by * by);
            
            if (dist > 0.01) {
              const targetSize = estimateBubbleSize(targetLine);
              const t = 1 / Math.sqrt((bx / targetSize.halfW) ** 2 + (by / targetSize.halfH) ** 2);
              
              // Intersection point on B's ellipse relative to A's center
              const edgeX = bx - bx * t;
              const edgeY = by - by * t;
              
              // Penetrate 10px inside B
              finalTargetX = edgeX + (bx / dist) * 10;
              finalTargetY = edgeY + (by / dist) * 10;
            }
          }

          const d = buildTailPath(0, 0, finalTargetX, finalTargetY, line);
          if (d) {
            elasticTailNode = (
              <svg className="absolute pointer-events-none overflow-visible" style={{ left: "50%", top: "50%", zIndex: 0 }}>
                {/* No stroke here! We rely on the drop-shadow filter in DialogueBubble to outline the combined shape */}
                <path d={d} fill={bgColor} stroke="none" strokeWidth={0} />
              </svg>
            );
          }
        }

        return (
          <React.Fragment key={`edit-bub-container-${pIdx}-${bIdx}`}>
            <motion.div
              key={`edit-bub-${pIdx}-${bIdx}-${posX}-${posY}`}
              drag={isActive}
              dragMomentum={false}
              dragElastic={0}
              onDragEnd={(_, info) => handleDragEnd(info, pIdx, bIdx)}
              onClick={(e) => {
                e.stopPropagation();
                setActivePanelIdx(pIdx);
                setActiveBubbleIdx(bIdx);
              }}
              className="absolute pointer-events-auto cursor-move"
              style={{
                left: bubbleLeft,
                top: bubbleTop,
                x: 0,
                y: 0,
                translateX: "-50%",
                translateY: "-50%",
                width: "max-content",
                zIndex: isActive ? 48 : (isTargetOfAny ? 39 : 40),
              }}
            >
              <div
                className={`transition-all ${
                  isActive
                    ? "outline-dashed outline-2 outline-[#e8185a] outline-offset-3 drop-shadow-lg"
                    : "opacity-95 hover:opacity-100"
                }`}
              >
                {isActive && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#e8185a] text-white font-mono text-[10px] px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                    X:{posX}% Y:{posY}%
                  </div>
                )}
                <DialogueBubble line={line} index={0} elasticTailNode={elasticTailNode} />
              </div>
            </motion.div>

            {/* Draggable anchor target */}
            {isActive && line.tailX !== undefined && line.tailY !== undefined && (() => {
              const targetX2 = imgLeft + (line.tailX / 100) * imgWidth;
              const targetY2 = imgTop + (line.tailY / 100) * imgHeight;
              const isInBubble = !!findTargetBubble(line.tailX, line.tailY, panel.dialogue || [], bIdx);
              return (
                <motion.div
                  key={`edit-anchor-${pIdx}-${bIdx}-${line.tailX}-${line.tailY}`}
                  drag
                  dragMomentum={false}
                  dragElastic={0}
                  onDragEnd={(_, info) => handleTailTargetDragEnd(info, pIdx, bIdx)}
                  className="absolute z-50 pointer-events-auto cursor-crosshair"
                  style={{
                    left: targetX2,
                    top: targetY2,
                    x: 0,
                    y: 0,
                    translateX: "-50%",
                    translateY: "-50%",
                  }}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-[0_0_10px_rgba(96,165,250,0.9)] ${
                      isInBubble ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" : "bg-blue-400"
                    }`} />
                  </div>
                </motion.div>
              );
            })()}
          </React.Fragment>
        );
      });
    });
  })();

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 z-[150] w-screen h-screen flex flex-col overflow-hidden"
      style={{ background: "#0a0a0f", touchAction: "none" }}
    >
      {/* ── Top Bar ── */}
      <div
        className="shrink-0 bg-white z-50 flex items-center justify-between px-4 h-16 border-b-3 border-[#0a0a0f]"
        style={{ boxShadow: "0 3px 0 #0a0a0f" }}
      >
        <div className="flex items-center gap-3">
          <Link href="/" className="btn btn-dark text-sm sm:text-base">
            ← Volver
          </Link>
          <div className="hidden sm:block">
            <span className="tag text-xs" style={{ background: saga.color, color: "white" }}>
              {saga.title}
            </span>
            <span className="font-[var(--font-bangers)] text-lg text-[#0a0a0f] ml-2 tracking-wider">
              {chapter.title}
            </span>
          </div>
        </div>

        {/* Mode Toggle Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleMode}
            className={`font-[var(--font-bangers)] text-sm px-4 py-2 border-2 border-[#0a0a0f] transition-all ${
              mode === "edit"
                ? "bg-[#f5e642] text-[#0a0a0f] shadow-[2px_2px_0_#0a0a0f]"
                : "bg-[#0a0a0f] text-white hover:bg-zinc-800"
            }`}
          >
            {mode === "edit" ? "🛠️ Modo Editor" : "📖 Modo Lectura"}
          </button>
          <div className="font-[var(--font-bangers)] text-[#0a0a0f] text-sm px-3 py-1 border-2 border-[#0a0a0f] bg-zinc-100">
            Pág {pageIdx + 1} / {pages.length}
          </div>
        </div>
      </div>

      {/* ── Main Workspace split ── */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden w-full h-full relative">
        
        {/* Workspace Canvas (Left side) */}
        <div
          ref={containerRef}
          onClick={mode === "read" ? handleReaderTap : undefined}
          className={`relative flex-1 h-full overflow-hidden select-none cursor-pointer ${
            mode === "edit" ? "bg-zinc-900 border-r-3 border-[#0a0a0f]" : "bg-[#0a0a0f]"
          }`}
        >
          {/* Image with dynamic zoom + pan */}
          {imgSize && containerSize.w > 0 && containerSize.h > 0 && (
            <img
              ref={imgRef}
              key={pages[pageIdx]}
              src={pages[pageIdx]}
              alt={`${chapter.title} — Página ${pageIdx + 1}`}
              draggable={false}
              style={{
                position: "absolute",
                width: imgWidth,
                left: imgLeft,
                top: imgTop,
                height: "auto",
                display: "block",
                userSelect: "none",
                WebkitUserSelect: "none",
                maxWidth: "none",
                transition: mode === "read" ? "all 400ms cubic-bezier(0.25, 1, 0.5, 1)" : "none",
                boxShadow: mode === "read" ? "0 15px 40px rgba(0, 0, 0, 0.8), 0 8px 16px rgba(0, 0, 0, 0.6)" : "none",
              }}
            />
          )}

          {/* ── Grid Overlay (Editor Mode only) ── */}
          {mode === "edit" && showGrid && imgSize && imgWidth > 0 && imgHeight > 0 && (
            <div
              style={{
                position: "absolute",
                left: imgLeft - 0.2 * imgWidth,
                top: imgTop - 0.2 * imgHeight,
                width: imgWidth * 1.4,
                height: imgHeight * 1.4,
                pointerEvents: "none",
                zIndex: 10,
                backgroundImage: `
                  linear-gradient(to right, rgba(239, 68, 68, 0.12) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(239, 68, 68, 0.12) 1px, transparent 1px)
                `,
                backgroundSize: `${imgWidth * (gridSize / 100)}px ${imgHeight * (gridSize / 100)}px`,
                backgroundPosition: `${imgWidth * 0.2}px ${imgHeight * 0.2}px`,
              }}
            >
              {/* Dashed outer red boundary representing the 0% to 100% page area */}
              <div
                style={{
                  position: "absolute",
                  left: imgWidth * 0.2,
                  top: imgHeight * 0.2,
                  width: imgWidth,
                  height: imgHeight,
                  border: "2px dashed rgba(239, 68, 68, 0.4)",
                  pointerEvents: "none",
                }}
              >
                {/* Vertical Center Line */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 0,
                    bottom: 0,
                    width: "2px",
                    backgroundColor: "rgba(239, 68, 68, 0.65)",
                    pointerEvents: "none",
                  }}
                />
                {/* Horizontal Center Line */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    right: 0,
                    height: "2px",
                    backgroundColor: "rgba(239, 68, 68, 0.65)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          )}

          {/* Visual Focus/Zoom Crop overlay in Editor Mode */}
          {mode === "edit" && imgSize && imgWidth > 0 && imgHeight > 0 && (() => {
            const activePanelStop = currentPanels[activePanelIdx];
            const rects = activePanelStop 
              ? (activePanelStop.zoomRects || (activePanelStop.zoomRect ? [activePanelStop.zoomRect] : []))
              : [];
            return rects.map((zoom, rIdx) => {
              const maskLeft = imgLeft + (zoom.x / 100) * imgWidth;
              const maskTop = imgTop + (zoom.y / 100) * imgHeight;
              const maskWidth = (zoom.w / 100) * imgWidth;
              const maskHeight = (zoom.h / 100) * imgHeight;
              return (
                <div
                  key={`edit-zoom-overlay-${rIdx}`}
                  style={{
                    position: "absolute",
                    left: maskLeft,
                    top: maskTop,
                    width: maskWidth,
                    height: maskHeight,
                    border: rIdx === 0 ? "3px dashed #10b981" : "2.5px dashed #3b82f6", // Emerald-500 for primary, blue-500 for secondary
                    boxShadow: rIdx === 0 ? "0 0 0 9999px rgba(0, 0, 0, 0.15)" : "none", // Darken outside the main zoom only
                    zIndex: 15 - rIdx,
                    pointerEvents: "none",
                  }}
                >
                  <div className="absolute top-1 left-1 bg-zinc-900/90 text-white font-mono text-[9px] px-1.5 py-0.5 rounded shadow">
                    {rIdx === 0 ? `🎯 Zoom Principal (V${activePanelIdx + 1})` : `🤫 Máscara ${rIdx + 1}`}
                  </div>
                </div>
              );
            });
          })()}

          {/* Spoiler Masks for future panels & sequences */}
          <AnimatePresence>
            {mode === "read" && !zoomedOut && imgSize && imgWidth > 0 && imgHeight > 0 && (
              currentPanels.flatMap((panel, pIdx) => {
                const rects = panel.zoomRects || (panel.zoomRect ? [panel.zoomRect] : []);
                return rects.map((zoom, rIdx) => {
                  let shouldMask = false;
                  if (pIdx > panelIdx) {
                    shouldMask = (panel.hideUntilReached !== false);
                  } else if (pIdx === panelIdx) {
                    shouldMask = (rIdx > zoomIdx) && (panel.hideUntilReached !== false);
                  }

                  if (!shouldMask) return null;

                  const maskLeft = imgLeft + (zoom.x / 100) * imgWidth;
                  const maskTop = imgTop + (zoom.y / 100) * imgHeight;
                  const maskWidth = (zoom.w / 100) * imgWidth;
                  const maskHeight = (zoom.h / 100) * imgHeight;

                  return (
                    <motion.div
                      key={`spoiler-mask-${pIdx}-${rIdx}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute bg-zinc-950/95 border-2 border-zinc-900 flex flex-col items-center justify-center text-zinc-500 select-none overflow-hidden"
                      style={{
                        left: maskLeft,
                        top: maskTop,
                        width: maskWidth,
                        height: maskHeight,
                        zIndex: 20,
                        boxShadow: "inset 0 0 24px rgba(0,0,0,0.95), 0 4px 10px rgba(0,0,0,0.5)",
                      }}
                    >
                      <motion.div
                        animate={{ opacity: [0.5, 0.9, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <span className="font-[var(--font-bangers)] text-[10px] sm:text-xs tracking-wider text-zinc-600">
                          🤫 VIÑETA RESERVADA
                        </span>
                      </motion.div>
                    </motion.div>
                  );
                });
              })
            )}
          </AnimatePresence>

          {/* Tails Overlay is now handled locally inside DialogueBubble */}

          {renderedDialogues}

          {/* ── FocusY Indicator line in Editor Mode ── */}
          {mode === "edit" && currentPanels[activePanelIdx] && (
            <div
              className="absolute left-0 right-0 h-0.5 border-t-2 border-dashed border-red-400 z-20 pointer-events-none"
              style={{
                top: imgTop + currentPanels[activePanelIdx].focusY * imgHeight,
              }}
            >
              <div 
                className="absolute right-4 -top-6 bg-red-400 text-[#0a0a0f] font-mono text-xs px-2 py-0.5 rounded flex items-center gap-2 pointer-events-auto select-none shadow"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <span>Parada {activePanelIdx + 1}: focusY {currentPanels[activePanelIdx].focusY}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddBubble(activePanelIdx);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-700 active:scale-95 transition-all"
                >
                  + Globo
                </button>
              </div>
            </div>
          )}

          {/* Tap instructions / Next Page overlay in Reader Mode */}
          {mode === "read" && zoomedOut && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-end pb-12 gap-4 z-40 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(10,10,15,0.85) 0%, transparent 60%)" }}
            >
              <div className="flex gap-3 flex-wrap justify-center px-4 pointer-events-auto">
                {pageIdx > 0 && (
                  <button onClick={() => resetPage(pageIdx - 1)} className="btn btn-dark text-lg">
                    ← Página anterior
                  </button>
                )}
                {!isLastPage ? (
                  <button onClick={() => resetPage(pageIdx + 1)} className="btn btn-magenta text-xl">
                    Siguiente página →
                  </button>
                ) : nextChapter ? (
                  <Link href={`/chapters/${nextChapter.id}`} className="btn btn-magenta text-xl">
                    {nextChapter.title} →
                  </Link>
                ) : (
                  <Link href="/" className="btn btn-magenta text-xl">
                    ¡Fin del capítulo! → Inicio
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Canvas Floating Editor Controls (Editor Mode only) */}
          {mode === "edit" && (
            <div className="absolute top-4 right-4 z-50 flex flex-col gap-3 pointer-events-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddBubble(activePanelIdx);
                }}
                className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-[var(--font-bangers)] text-3xl flex items-center justify-center border-3 border-[#0a0a0f] shadow-[3px_3px_0_#0a0a0f] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#0a0a0f] transition-all cursor-pointer"
                title="Añadir globo a la viñeta seleccionada"
              >
                +
              </button>
              <button
                type="button"
                disabled={activeBubbleIdx === null}
                onClick={(e) => {
                  e.stopPropagation();
                  if (activeBubbleIdx !== null) {
                    handleRemoveBubble(activePanelIdx, activeBubbleIdx);
                  }
                }}
                className={`w-12 h-12 rounded-full font-[var(--font-bangers)] text-3xl flex items-center justify-center border-3 border-[#0a0a0f] transition-all ${
                  activeBubbleIdx !== null
                    ? "bg-red-500 hover:bg-red-600 text-white shadow-[3px_3px_0_#0a0a0f] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#0a0a0f] cursor-pointer"
                    : "bg-zinc-600 text-zinc-400 border-zinc-700 cursor-not-allowed opacity-50 shadow-none"
                }`}
                title="Eliminar globo seleccionado"
              >
                −
              </button>
              <button
                type="button"
                disabled={undoStack.length === 0}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUndo();
                }}
                className={`w-12 h-12 rounded-full font-[var(--font-bangers)] text-3xl flex items-center justify-center border-3 border-[#0a0a0f] transition-all ${
                  undoStack.length > 0
                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-[3px_3px_0_#0a0a0f] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#0a0a0f] cursor-pointer"
                    : "bg-zinc-600 text-zinc-400 border-zinc-700 cursor-not-allowed opacity-50 shadow-none"
                }`}
                title="Deshacer cambio (Ctrl+Z)"
              >
                ↶
              </button>
            </div>
          )}
        </div>

        {/* Editor Side Panel (Right side) */}
        <DialogueEditorPanel
          mode={mode}
          currentPanels={currentPanels}
          activePanelIdx={activePanelIdx}
          activeBubbleIdx={activeBubbleIdx}
          pageIdx={pageIdx}
          pagesLength={pages.length}
          isSaving={isSaving}
          saveStatus={saveStatus}
          showGrid={showGrid}
          snapToGrid={snapToGrid}
          gridSize={gridSize}
          handleSaveChanges={handleSaveChanges}
          resetPage={resetPage}
          setShowGrid={setShowGrid}
          setSnapToGrid={setSnapToGrid}
          setGridSize={setGridSize}
          handleAddPanel={handleAddPanel}
          setActivePanelIdx={setActivePanelIdx}
          setActiveBubbleIdx={setActiveBubbleIdx}
          handleRemovePanel={handleRemovePanel}
          handleUpdatePanelParams={handleUpdatePanelParams}
          handleAddBubble={handleAddBubble}
          handleRemoveBubble={handleRemoveBubble}
          handleUpdateBubble={handleUpdateBubble}
        />
      </div>


      {/* ── Auth Modal ── */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="absolute inset-0 bg-[#0a0a0f]/90 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white border-4 border-[#0a0a0f] p-6 shadow-[8px_8px_0_#f5e642] z-10"
            >
              <button
                type="button"
                onClick={() => setShowAuthModal(false)}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center font-[var(--font-bangers)] text-sm bg-red-500 text-white border-2 border-[#0a0a0f] hover:bg-red-600 transition-colors shadow-[2px_2px_0_#000]"
              >
                ✕
              </button>
              
              <h3 className="font-[var(--font-bangers)] text-3xl text-[#0a0a0f] mb-2 tracking-wider">
                🔐 MODO EDITOR
              </h3>
              <p className="font-sans text-xs text-zinc-500 mb-4 leading-relaxed">
                Ingresá la contraseña de edición para poder modificar y guardar los diálogos de las viñetas.
              </p>

              <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (authError) setAuthError(false);
                    }}
                    placeholder="Contraseña"
                    className="w-full border-2 border-[#0a0a0f] p-3 text-sm font-mono rounded bg-white text-[#0a0a0f] focus:outline-none"
                    autoFocus
                  />
                  {authError && (
                    <span className="text-red-500 font-mono text-[10px] uppercase font-bold tracking-wider animate-bounce">
                      ⚠️ Contraseña incorrecta
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0a0a0f] hover:bg-zinc-800 text-white font-[var(--font-bangers)] text-base tracking-widest border-2 border-[#0a0a0f] shadow-[3px_3px_0_#f5e642] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#f5e642] transition-all"
                >
                  AUTORIZAR →
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
