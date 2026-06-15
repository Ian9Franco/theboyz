"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { DialogueBubble, getBubbleStyles, type DialogueLine } from "./DialogueBubble";
import { DialogueEditorPanel } from "./DialogueEditorPanel";
import { ReaderTopBar } from "./ReaderTopBar";
import { ReaderAuthModal } from "./ReaderAuthModal";
import { ReaderInstructionsModal } from "./ReaderInstructionsModal";
import { useReaderZoom } from "./useReaderZoom";
import { useDialogueEditor } from "./useDialogueEditor";
import { ReaderCanvas } from "./ReaderCanvas";
import { EditorLeftSidebar } from "./EditorLeftSidebar";
import {
  buildTailPath,
  estimateBubbleSize,
  findTargetBubble,
  getEffectiveIndexes,
  getComicPageUrl,
  getPageKeyFromUrl,
} from "./readerUtils";

// ─── Types ───────────────────────────────────────────────────────────────────

export type PanelStop = {
  focusY: number;
  dialogue?: DialogueLine[];
  zoomRect?: { x: number; y: number; w: number; h: number };
  zoomRects?: { x: number; y: number; w: number; h: number }[];
  duration?: number;
  hideUntilReached?: boolean;
};

export type ChapterSettings = {
  clearReadDialogues?: boolean;
  appearanceAnimation?: "spring" | "fade" | "slide" | "zoom";
  fadeOutAnimation?: "fade" | "slide" | "zoom";
  dialogueDepth?: number;
};

export type PageData = {
  panels: PanelStop[];
};

export type Dialogues = {
  settings?: ChapterSettings;
  pages?: Record<string, PageData>;
};

// ─── Constants ───────────────────────────────────────────────────────────────

export function CinematicReader({
  pages: rawPages,
  dialogues,
  chapter,
  saga,
  nextChapter,
  prevChapter,
  cover,
}: {
  pages: string[];
  dialogues: Dialogues | null;
  chapter: any;
  saga: any;
  nextChapter: any;
  prevChapter: any;
  cover?: string | null;
}) {
  // Mode selection: "read" or "edit"
  const [mode, setMode] = useState<"read" | "edit">("read");

  // Dynamic pages list: prepends the episode cover in read mode
  const pages = React.useMemo(() => {
    return (mode === "read" && cover) ? [cover, ...rawPages] : rawPages;
  }, [mode, cover, rawPages]);

  // Comic Reader States
  const [pageIdx, setPageIdx] = useState(0);
  const [panelIdx, setPanelIdx] = useState(0);
  const [zoomIdx, setZoomIdx] = useState(0);
  const [zoomedOut, setZoomedOut] = useState(false);
  const [showAllDialogues, setShowAllDialogues] = useState(false);
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const [isPageChanging, setIsPageChanging] = useState(false);

  // Dialogue Password Auth States
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeReadingBubbleIdx, setActiveReadingBubbleIdx] = useState<number>(0);

  const {
    zoomScale,
    setZoomScale,
    panOffset,
    setPanOffset,
    isPanning,
    bubbleOffsets,
    setBubbleOffsets,
    draggedBubbleKey,
    totalDragDistRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleWheel,
    handleDoubleClick,
    handleBubblePointerDown,
    handleBubblePointerMove,
    handleBubblePointerUp,
  } = useReaderZoom({ containerSize, containerRef });
  const imgRef = useRef<HTMLImageElement>(null);

  const {
    localDialogues,
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
    handlePanelRectDragEnd,
    handleFocusYDragEnd,
    handlePanelRectResizeStart,
    handleSaveChanges,
  } = useDialogueEditor({ dialogues, chapterId: chapter.id, pageKey: getPageKeyFromUrl(pages[pageIdx]), imgRef });

  const [textScale, setTextScale] = useState<number>(1.0);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("reader_text_scale");
      if (saved) {
        setTextScale(parseFloat(saved));
      }
      const hasRead = localStorage.getItem("has_read_instructions") === "true";
      if (!hasRead) {
        setShowInstructions(true);
      }
    }
  }, []);

  const handleCloseInstructions = () => {
    setShowInstructions(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("has_read_instructions", "true");
    }
  };

  const handleSetTextScale = (scale: number) => {
    setTextScale(scale);
    if (typeof window !== "undefined") {
      localStorage.setItem("reader_text_scale", String(scale));
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("editor_authorized") === "true";
      setIsAuthorized(auth);
      if (auth && sessionStorage.getItem("editor_mode") === "edit") {
        setMode("edit");
      }
    }
  }, []);

  // Adjust pageIdx when mode toggles between read (cover prepended) and edit (no cover)
  const prevModeRef = useRef(mode);
  useEffect(() => {
    if (prevModeRef.current !== mode) {
      if (cover) {
        if (mode === "edit") {
          setPageIdx((prev) => Math.max(0, prev - 1));
        } else if (mode === "read") {
          setPageIdx((prev) => prev + 1);
        }
      }
      prevModeRef.current = mode;
    }
  }, [mode, cover]);

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
  }, [mode]);

  // Load natural image dimensions and handle page change transitions
  useEffect(() => {
    if (!pages[pageIdx]) return;
    setImgSize(null);
    setIsPageChanging(true);

    let timer: NodeJS.Timeout;
    const img = new window.Image();
    img.onload = () => {
      setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
      timer = setTimeout(() => {
        setIsPageChanging(false);
      }, 1000);
    };
    img.src = getComicPageUrl(pages[pageIdx]);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [pageIdx, pages]);

  // Reset page indices
  const resetPage = useCallback((idx: number) => {
    setPageIdx(idx);
    setPanelIdx(0);
    setZoomIdx(0);
    setZoomedOut(false);
    setShowAllDialogues(false);
    setActivePanelIdx(0);
    setActiveBubbleIdx(null);
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
    setBubbleOffsets({});
  }, [setActivePanelIdx, setActiveBubbleIdx, setZoomScale, setPanOffset, setBubbleOffsets]);

  // Reset zoomIdx on panelIdx or mode changes to keep them synchronized
  useEffect(() => {
    setZoomIdx(0);
  }, [panelIdx, mode]);

  // Reset manual zoom & pan when the cinematic focus advances (panel/zoom step)
  useEffect(() => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
    setBubbleOffsets({});
  }, [panelIdx, zoomIdx, setZoomScale, setPanOffset, setBubbleOffsets]);

  // Get current page dialogues safely
  const pgKey = getPageKeyFromUrl(pages[pageIdx]);
  const currentPageData = pgKey ? (localDialogues.pages?.[pgKey] || { panels: [] }) : { panels: [] };

  // Filter empty panels only in read mode so the editor can still see and edit all stops.
  const currentPanels =
    mode === "read"
      ? (currentPageData.panels || []).filter(
          (p: PanelStop) =>
            (p.dialogue && p.dialogue.length > 0) ||
            p.zoomRect ||
            (p.zoomRects && p.zoomRects.length > 0)
        )
      : currentPageData.panels || [];

  const activePanel = currentPanels[panelIdx] || { focusY: 0.5, dialogue: [] };
  const activePanelRects = activePanel
    ? activePanel.zoomRects || (activePanel.zoomRect ? [activePanel.zoomRect] : [])
    : [];
  const activeZoomRect = activePanelRects[zoomIdx] || null;

  // Auto-advance logic for panels with duration
  useEffect(() => {
    if (mode !== "read" || zoomedOut) return;
    const activePanelStop = currentPanels[panelIdx];
    if (activePanelStop && activePanelStop.duration && activePanelStop.duration > 0) {
      const rects =
        activePanelStop.zoomRects || (activePanelStop.zoomRect ? [activePanelStop.zoomRect] : []);
      const timer = setTimeout(() => {
        if (zoomIdx < rects.length - 1) {
          setZoomIdx((prev) => prev + 1);
        } else if (panelIdx < currentPanels.length - 1) {
          setPanelIdx((prev) => prev + 1);
        } else {
          setZoomedOut(true);
        }
      }, activePanelStop.duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [panelIdx, zoomIdx, currentPanels, mode, zoomedOut]);

  // Track which bubble is currently appearing in reader mode (for sequential camera drift)
  useEffect(() => {
    if (mode !== "read") return;
    setActiveReadingBubbleIdx(0);

    const dialogueCount = activePanel?.dialogue?.length || 0;
    if (dialogueCount <= 1) return;

    const timers: NodeJS.Timeout[] = [];
    for (let i = 1; i < dialogueCount; i++) {
      const timer = setTimeout(() => {
        setActiveReadingBubbleIdx(i);
      }, i * 800);
      timers.push(timer);
    }

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [panelIdx, pageIdx, mode, activePanel]);

  // Calculate layout dimensions
  let imgWidth = 0;
  let imgLeft = 0;
  let imgTop = 0;
  let imgHeight = 0;

  if (imgSize && containerSize.w > 0 && containerSize.h > 0) {
    if (mode === "edit") {
      const scale = Math.min((containerSize.w * 0.9) / imgSize.w, (containerSize.h * 0.85) / imgSize.h);
      imgWidth = imgSize.w * scale;
      imgLeft = (containerSize.w - imgWidth) / 2;
      imgTop = (containerSize.h - imgSize.h * scale) / 2;
      imgHeight = imgSize.h * scale;
    } else {
      const zoom = activeZoomRect;
      let baseImgLeft = 0;
      let baseImgTop = 0;

      if (zoom && !zoomedOut) {
        const zX = zoom.x / 100;
        const zY = zoom.y / 100;
        const zW = zoom.w / 100;
        const zH = zoom.h / 100;

        const cropW = zW * imgSize.w;
        const cropH = zH * imgSize.h;

        const scale = Math.min((containerSize.w * 0.95) / cropW, (containerSize.h * 0.95) / cropH);

        imgWidth = imgSize.w * scale;
        imgHeight = imgSize.h * scale;

        const cropCenterX = (zX + zW / 2) * imgSize.w * scale;
        const cropCenterY = (zY + zH / 2) * imgSize.h * scale;

        baseImgLeft = containerSize.w / 2 - cropCenterX;
        baseImgTop = containerSize.h / 2 - cropCenterY;
      } else {
        const scale = Math.min((containerSize.w * 0.92) / imgSize.w, (containerSize.h * 0.92) / imgSize.h);
        imgWidth = imgSize.w * scale;
        imgHeight = imgSize.h * scale;
        baseImgLeft = (containerSize.w - imgWidth) / 2;
        baseImgTop = (containerSize.h - imgHeight) / 2;
      }

      if (zoomScale === 1 && !zoomedOut && activePanel) {
        const activeBubble = activePanel.dialogue?.[activeReadingBubbleIdx];
        if (activeBubble) {
          const posX = activeBubble.posX ?? 50;
          const posY = activeBubble.posY ?? (activePanel.focusY ?? 0.5) * 100;

          const bImgX = (posX / 100) * imgWidth;
          const bImgY = (posY / 100) * imgHeight;

          const bViewportX = baseImgLeft + bImgX;
          const bViewportY = baseImgTop + bImgY;

          const vCenterX = containerSize.w / 2;
          const vCenterY = containerSize.h / 2;

          const diffX = bViewportX - vCenterX;
          const diffY = bViewportY - vCenterY;

          const shiftFraction = 0.25;
          let autoPanX = -diffX * shiftFraction;
          let autoPanY = -diffY * shiftFraction;

          const maxAutoPanX = containerSize.w * 0.15;
          const maxAutoPanY = containerSize.h * 0.15;
          autoPanX = Math.max(-maxAutoPanX, Math.min(maxAutoPanX, autoPanX));
          autoPanY = Math.max(-maxAutoPanY, Math.min(maxAutoPanY, autoPanY));

          imgLeft = baseImgLeft + autoPanX;
          imgTop = baseImgTop + autoPanY;
        } else {
          imgLeft = baseImgLeft;
          imgTop = baseImgTop;
        }
      } else {
        imgLeft = baseImgLeft;
        imgTop = baseImgTop;
      }
    }
  }

  const handleReaderTap = (e: React.MouseEvent) => {
    // Suppress tap if the user dragged or panned (distance > 6px = not a real click)
    if (isPanning || totalDragDistRef.current > 6) return;

    if (e && e.target) {
      const closestGrab = (e.target as HTMLElement).closest(".cursor-grab");
      const closestGrabbing = (e.target as HTMLElement).closest(".cursor-grabbing");
      if (
        (e.target as HTMLElement).closest(".btn") ||
        (e.target as HTMLElement).closest(".tag") ||
        (e.target as HTMLElement).closest(".zoom-controls") ||
        (closestGrab && closestGrab !== containerRef.current) ||
        (closestGrabbing && closestGrabbing !== containerRef.current)
      ) {
        return;
      }
    }

    if (showAllDialogues) {
      setShowAllDialogues(false);
      return;
    }

    if (zoomedOut) {
      if (pageIdx < pages.length - 1) {
        resetPage(pageIdx + 1);
      }
      return;
    }

    if (currentPanels.length === 0) {
      if (pageIdx < pages.length - 1) {
        resetPage(pageIdx + 1);
      } else {
        setZoomedOut(true);
      }
      return;
    }

    const activePanelStop = currentPanels[panelIdx];
    const rects = activePanelStop?.zoomRects || (activePanelStop?.zoomRect ? [activePanelStop.zoomRect] : []);

    if (zoomIdx < rects.length - 1) {
      setZoomIdx((prev) => prev + 1);
    } else if (panelIdx < currentPanels.length - 1) {
      setPanelIdx((prev) => prev + 1);
    } else {
      setZoomedOut(true);
    }
  };

  const handleToggleMode = () => {
    setPanelIdx(0);
    setZoomIdx(0);
    setZoomedOut(false);
    if (mode === "edit") {
      setMode("read");
      if (typeof window !== "undefined") sessionStorage.setItem("editor_mode", "read");
    } else {
      if (isAuthorized) {
        setMode("edit");
        if (typeof window !== "undefined") sessionStorage.setItem("editor_mode", "edit");
      } else {
        setShowAuthModal(true);
        setPasswordInput("");
        setAuthError(false);
      }
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(false);
    try {
      const res = await fetch("/api/auth/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthorized(true);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("editor_authorized", "true");
          sessionStorage.setItem("editor_password", passwordInput);
          sessionStorage.setItem("editor_mode", "edit");
        }
        setShowAuthModal(false);
        setPanelIdx(0);
        setZoomedOut(false);
        setMode("edit");
      } else {
        setAuthError(true);
      }
    } catch (err) {
      console.error("Error authenticating:", err);
      setAuthError(true);
    }
  };

  // Rendered Dialogues Helper
  const renderedDialogues = (() => {
    const settings = localDialogues.settings || {};
    const clearReadDialogues = settings.clearReadDialogues ?? true;
    const appearanceAnimation = settings.appearanceAnimation ?? "spring";
    const fadeOutAnimation = settings.fadeOutAnimation ?? "fade";
    const dialogueDepth = settings.dialogueDepth ?? 2;

    const centeredLeft = (containerSize.w - imgWidth) / 2;
    const centeredTop = (containerSize.h - imgHeight) / 2;
    const shiftX = imgLeft - centeredLeft;
    const shiftY = imgTop - centeredTop;

    if (mode === "read") {
      const parallaxFactor = dialogueDepth * 0.08;
      const parallaxX = shiftX * parallaxFactor;
      const parallaxY = shiftY * parallaxFactor;

      const panelsToRender =
        showAllDialogues || zoomedOut
          ? currentPanels
          : !clearReadDialogues
          ? currentPanels.slice(0, panelIdx + 1)
          : [activePanel];

      return panelsToRender.flatMap((panel: PanelStop, pIndex: number) => {
        const dialogueList = panel.dialogue || [];
        const effectiveIndexes = getEffectiveIndexes(dialogueList, imgWidth, imgHeight, imgLeft, imgTop);

        return dialogueList.map((line, i) => {
          const posX = line.posX ?? 50;
          const posY = line.posY ?? panel.focusY * 100;

          const bubbleKey = `${pIndex}-${i}`;
          const offset = bubbleOffsets[bubbleKey] || { x: 0, y: 0 };

          const bubbleLeft = imgLeft + (posX / 100) * imgWidth + parallaxX + offset.x;
          const bubbleTop = imgTop + (posY / 100) * imgHeight + parallaxY + offset.y;
          const targetX = line.tailX !== undefined ? imgLeft + (line.tailX / 100) * imgWidth : null;
          const targetY = line.tailY !== undefined ? imgTop + (line.tailY / 100) * imgHeight : null;
          const effIdx = showAllDialogues || zoomedOut ? 0 : effectiveIndexes[i] ?? i;

          const isTargetOfAny = dialogueList.some((otherLine, otherIdx) => {
            if (otherIdx === i) return false;
            if (otherLine.tailX === undefined || otherLine.tailY === undefined) return false;
            const target = findTargetBubble(
              otherLine.tailX,
              otherLine.tailY,
              dialogueList,
              otherIdx,
              imgWidth,
              imgHeight,
              imgLeft,
              imgTop
            );
            return target && target.index === i;
          });

          let elasticTailNode = null;
          if (targetX !== null && targetY !== null && line.tail !== "none") {
            const { bgColor } = getBubbleStyles(line);
            const target = findTargetBubble(
              line.tailX!,
              line.tailY!,
              dialogueList,
              i,
              imgWidth,
              imgHeight,
              imgLeft,
              imgTop
            );

            let finalTargetX = targetX - bubbleLeft;
            let finalTargetY = targetY - bubbleTop;

            if (target) {
              const targetLine = target.line;
              const targetPosX = targetLine.posX ?? 50;
              const targetPosY = targetLine.posY ?? panel.focusY * 100;

              const targetKey = `${pIndex}-${target.index}`;
              const targetOffset = bubbleOffsets[targetKey] || { x: 0, y: 0 };
              const targetLeft = imgLeft + (targetPosX / 100) * imgWidth + parallaxX + targetOffset.x;
              const targetTop = imgTop + (targetPosY / 100) * imgHeight + parallaxY + targetOffset.y;

              const bx = targetLeft - bubbleLeft;
              const by = targetTop - bubbleTop;
              const dist = Math.sqrt(bx * bx + by * by);

              if (dist > 0.01) {
                const targetSize = estimateBubbleSize(targetLine);
                const t = 1 / Math.sqrt((bx / targetSize.halfW) ** 2 + (by / targetSize.halfH) ** 2);

                const edgeX = bx - bx * t;
                const edgeY = by - by * t;

                finalTargetX = edgeX + (bx / dist) * 10;
                finalTargetY = edgeY + (by / dist) * 10;
              }
            }

            const d = buildTailPath(0, 0, finalTargetX, finalTargetY, line);
            if (d) {
              elasticTailNode = (
                <svg
                  className="absolute pointer-events-none overflow-visible"
                  style={{ left: "50%", top: "50%", zIndex: 0 }}
                >
                  <path d={d} fill={bgColor} stroke="none" strokeWidth={0} />
                </svg>
              );
            }
          }

          return (
            <div
              key={`read-bub-${pIndex}-${i}`}
              onPointerDown={(e) => handleBubblePointerDown(e, bubbleKey)}
              onPointerMove={(e) => handleBubblePointerMove(e, bubbleKey)}
              onPointerUp={(e) => handleBubblePointerUp(e, bubbleKey)}
              onPointerCancel={(e) => handleBubblePointerUp(e, bubbleKey)}
              className={`absolute select-none ${
                draggedBubbleKey === bubbleKey
                  ? "cursor-grabbing z-[100] pointer-events-auto"
                  : "cursor-grab pointer-events-auto hover:scale-[1.015]"
              }`}
              style={{
                left: bubbleLeft,
                top: bubbleTop,
                transform: "translate(-50%, -50%)",
                width: "max-content",
                zIndex: draggedBubbleKey === bubbleKey ? 100 : isTargetOfAny ? 29 : 30,
                transition:
                  mode === "read" && !isPageChanging && draggedBubbleKey !== bubbleKey
                    ? "all 400ms cubic-bezier(0.25, 1, 0.5, 1)"
                    : "none",
                touchAction: "none",
              }}
            >
              <DialogueBubble
                line={line}
                index={effIdx}
                elasticTailNode={elasticTailNode}
                instant={showAllDialogues || zoomedOut}
                appearanceAnimation={appearanceAnimation}
                fadeOutAnimation={fadeOutAnimation}
                depth={dialogueDepth}
                textScale={textScale}
              />
            </div>
          );
        });
      });
    }

    return currentPanels.flatMap((panel: PanelStop, pIdx: number) => {
      const dialogueList = panel.dialogue || [];
      return dialogueList.map((line, bIdx) => {
        const isActive = activePanelIdx === pIdx && activeBubbleIdx === bIdx;
        const posX = line.posX ?? 50;
        const posY = line.posY ?? panel.focusY * 100;
        const bubbleLeft = imgLeft + (posX / 100) * imgWidth;
        const bubbleTop = imgTop + (posY / 100) * imgHeight;
        const targetX = line.tailX !== undefined ? imgLeft + (line.tailX / 100) * imgWidth : null;
        const targetY = line.tailY !== undefined ? imgTop + (line.tailY / 100) * imgHeight : null;

        const isTargetOfAny = dialogueList.some((otherLine, otherIdx) => {
          if (otherIdx === bIdx) return false;
          if (otherLine.tailX === undefined || otherLine.tailY === undefined) return false;
          const target = findTargetBubble(
            otherLine.tailX,
            otherLine.tailY,
            dialogueList,
            otherIdx,
            imgWidth,
            imgHeight,
            imgLeft,
            imgTop
          );
          return target && target.index === bIdx;
        });

        let elasticTailNode = null;
        if (targetX !== null && targetY !== null && line.tail !== "none") {
          const { bgColor } = getBubbleStyles(line);
          const target = findTargetBubble(
            line.tailX!,
            line.tailY!,
            dialogueList,
            bIdx,
            imgWidth,
            imgHeight,
            imgLeft,
            imgTop
          );

          let finalTargetX = targetX - bubbleLeft;
          let finalTargetY = targetY - bubbleTop;

          if (target) {
            const targetLine = target.line;
            const targetPosX = targetLine.posX ?? 50;
            const targetPosY = targetLine.posY ?? panel.focusY * 100;
            const targetLeft = imgLeft + (targetPosX / 100) * imgWidth;
            const targetTop = imgTop + (targetPosY / 100) * imgHeight;

            const bx = targetLeft - bubbleLeft;
            const by = targetTop - bubbleTop;
            const dist = Math.sqrt(bx * bx + by * by);

            if (dist > 0.01) {
              const targetSize = estimateBubbleSize(targetLine);
              const t = 1 / Math.sqrt((bx / targetSize.halfW) ** 2 + (by / targetSize.halfH) ** 2);

              const edgeX = bx - bx * t;
              const edgeY = by - by * t;

              finalTargetX = edgeX + (bx / dist) * 10;
              finalTargetY = edgeY + (by / dist) * 10;
            }
          }

          const d = buildTailPath(0, 0, finalTargetX, finalTargetY, line);
          if (d) {
            elasticTailNode = (
              <svg
                className="absolute pointer-events-none overflow-visible"
                style={{ left: "50%", top: "50%", zIndex: 0 }}
              >
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
                zIndex: isActive ? 48 : isTargetOfAny ? 39 : 40,
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
                <DialogueBubble
                  line={line}
                  index={0}
                  elasticTailNode={elasticTailNode}
                  instant={true}
                  appearanceAnimation={appearanceAnimation}
                  fadeOutAnimation={fadeOutAnimation}
                  depth={dialogueDepth}
                  textScale={textScale}
                />
              </div>
            </motion.div>

            {isActive && line.tail !== "none" && line.tailX !== undefined && line.tailY !== undefined && (() => {
              const targetX2 = imgLeft + (line.tailX / 100) * imgWidth;
              const targetY2 = imgTop + (line.tailY / 100) * imgHeight;
              const isInBubble = !!findTargetBubble(
                line.tailX,
                line.tailY,
                panel.dialogue || [],
                bIdx,
                imgWidth,
                imgHeight,
                imgLeft,
                imgTop
              );
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
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-[0_0_10px_rgba(96,165,250,0.9)] ${
                        isInBubble ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" : "bg-blue-400"
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })()}
          </React.Fragment>
        );
      });
    });
  })();

  return (
    <div
      className="fixed inset-0 z-[150] w-screen h-screen flex flex-col overflow-hidden"
      style={{ background: "#0a0a0f", touchAction: "none" }}
    >
      {/* ── Top Bar ── */}
      <ReaderTopBar
        saga={saga}
        chapter={chapter}
        mode={mode}
        handleToggleMode={handleToggleMode}
        pageIdx={pageIdx}
        totalPages={pages.length}
        textScale={textScale}
        setTextScale={handleSetTextScale}
        resetPage={resetPage}
        onOpenHelp={() => setShowInstructions(true)}
      />

      {/* ── Main Workspace split ── */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden w-full h-full relative">
        {mode === "edit" && (
          <EditorLeftSidebar
            pages={pages}
            pageIdx={pageIdx}
            resetPage={resetPage}
            chapter={chapter}
            saga={saga}
            onSave={handleSaveChanges}
          />
        )}
        <ReaderCanvas
          mode={mode}
          containerRef={containerRef}
          imgRef={imgRef}
          pages={pages}
          pageIdx={pageIdx}
          chapter={chapter}
          isPanning={isPanning}
          zoomScale={zoomScale}
          panOffset={panOffset}
          imgSize={imgSize}
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          imgLeft={imgLeft}
          imgTop={imgTop}
          showGrid={showGrid}
          gridSize={gridSize}
          currentPanels={currentPanels}
          activePanelIdx={activePanelIdx}
          activeBubbleIdx={activeBubbleIdx}
          panelIdx={panelIdx}
          zoomIdx={zoomIdx}
          zoomedOut={zoomedOut}
          showAllDialogues={showAllDialogues}
          isPageChanging={isPageChanging}
          renderedDialogues={renderedDialogues}
          undoStack={undoStack}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          handleTouchStart={handleTouchStart}
          handleTouchMove={handleTouchMove}
          handleTouchEnd={handleTouchEnd}
          handleWheel={handleWheel}
          handleDoubleClick={handleDoubleClick}
          handleReaderTap={handleReaderTap}
          handleUndo={handleUndo}
          handleAddPanel={handleAddPanel}
          handleAddBubble={handleAddBubble}
          handleRemoveBubble={handleRemoveBubble}
          setActivePanelIdx={setActivePanelIdx}
          handlePanelRectDragEnd={handlePanelRectDragEnd}
          handleFocusYDragEnd={handleFocusYDragEnd}
          handlePanelRectResizeStart={handlePanelRectResizeStart}
          resetPage={resetPage}
          setZoomScale={setZoomScale}
          setPanOffset={setPanOffset}
          nextChapter={nextChapter}
        />

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
          settings={localDialogues.settings || {}}
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
          handleUpdateSettings={handleUpdateSettings}
        />
      </div>

      {/* ── Auth Modal ── */}
      <ReaderAuthModal
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        authError={authError}
        setAuthError={setAuthError}
        handleAuthSubmit={handleAuthSubmit}
      />

      {/* ── Instructions Modal ── */}
      <ReaderInstructionsModal
        isOpen={showInstructions}
        onClose={handleCloseInstructions}
      />
    </div>
  );
}
