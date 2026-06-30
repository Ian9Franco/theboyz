"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { DialogueEditorPanel } from "./DialogueEditorPanel";
import { ReaderTopBar } from "./ReaderTopBar";
import { ReaderAuthModal } from "./ReaderAuthModal";
import { ReaderInstructionsModal } from "./ReaderInstructionsModal";
import { useReaderZoom } from "./useReaderZoom";
import { useDialogueEditor } from "./useDialogueEditor";
import { ReaderCanvas } from "./ReaderCanvas";
import { EditorLeftSidebar } from "./EditorLeftSidebar";
import { ReaderPagesSidebar } from "./ReaderPagesSidebar";
import { DialogueLayers } from "./DialogueLayers";
import { useReaderLayout } from "./useReaderLayout";
import { useReaderAudio } from "./useReaderAudio";
import { getComicPageUrl, getPageKeyFromUrl } from "./readerUtils";
import { Dialogues, PanelStop } from "./audioPlayer";

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
  const [mode, setMode] = useState<"read" | "edit">("read");

  const pages = React.useMemo(() => {
    const hasExplicitCover = cover && cover !== rawPages[0];
    return (mode === "read" && hasExplicitCover) ? [cover, ...rawPages] : rawPages;
  }, [mode, cover, rawPages]);

  const [pageIdx, setPageIdx] = useState(0);
  const [panelIdx, setPanelIdx] = useState(0);
  const [zoomIdx, setZoomIdx] = useState(0);
  const [zoomedOut, setZoomedOut] = useState(false);
  const [showAllDialogues, setShowAllDialogues] = useState(false);
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const [isPageChanging, setIsPageChanging] = useState(false);

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
    handleUpdateAudioTracks,
    handleDragEnd,
    handleTailTargetDragEnd,
    handlePanelRectDragEnd,
    handleFocusYDragEnd,
    handlePanelRectResizeStart,
    handleSaveChanges,
  } = useDialogueEditor({ dialogues, chapterId: chapter.id, pageKey: getPageKeyFromUrl(pages[pageIdx]), imgRef });

  const [textScale, setTextScale] = useState<number>(1.0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [autoplay, setAutoplay] = useState<boolean>(true);
  // Dialogue speed: 0.5 = slow, 1.0 = normal, 1.5 = fast
  const [speedMultiplier, setSpeedMultiplierState] = useState<number>(1.0);
  const [focusDialogue, setFocusDialogue] = useState<boolean>(true);
  const [focusPanel, setFocusPanel] = useState<boolean>(true);
  const [bubbleOpacity, setBubbleOpacityState] = useState<number>(0.90);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("reader_text_scale");
      if (saved) {
        setTextScale(parseFloat(saved));
      } else {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          setTextScale(1.2);
        }
      }
      const savedAutoplay = localStorage.getItem("reader_autoplay");
      if (savedAutoplay !== null) {
        setAutoplay(savedAutoplay === "true");
      }
      const savedSpeed = localStorage.getItem("reader_dialogue_speed");
      if (savedSpeed !== null) {
        setSpeedMultiplierState(parseFloat(savedSpeed));
      }
      const savedFocusDialogue = localStorage.getItem("reader_focus_dialogue");
      if (savedFocusDialogue !== null) {
        setFocusDialogue(savedFocusDialogue === "true");
      }
      const savedFocusPanel = localStorage.getItem("reader_focus_panel");
      if (savedFocusPanel !== null) {
        setFocusPanel(savedFocusPanel === "true");
      }
      const savedBubbleOpacity = localStorage.getItem("reader_bubble_opacity");
      if (savedBubbleOpacity !== null) {
        setBubbleOpacityState(parseFloat(savedBubbleOpacity));
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

  const handleSetAutoplay = (value: boolean) => {
    setAutoplay(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("reader_autoplay", String(value));
    }
  };

  const handleSetSpeedMultiplier = (value: number) => {
    setSpeedMultiplierState(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("reader_dialogue_speed", String(value));
    }
  };

  const handleSetFocusDialogue = (value: boolean) => {
    setFocusDialogue(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("reader_focus_dialogue", String(value));
    }
  };

  const handleSetFocusPanel = (value: boolean) => {
    setFocusPanel(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("reader_focus_panel", String(value));
    }
  };

  const handleSetBubbleOpacity = (value: number) => {
    setBubbleOpacityState(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("reader_bubble_opacity", String(value));
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

  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

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

  useEffect(() => {
    if (!pages[pageIdx]) return;

    const url = getComicPageUrl(pages[pageIdx]);
    const img = new window.Image();

    // B6 fix: if already cached, resolve synchronously without showing overlay
    if (img.complete && img.naturalWidth > 0) {
      setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
      setIsPageChanging(false);
      img.src = url;
      return;
    }

    setImgSize(null);
    setIsPageChanging(true);

    let timer: NodeJS.Timeout;
    img.onload = () => {
      setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
      // Reduced from 1000ms to 150ms — overlay fades out fast after load
      timer = setTimeout(() => {
        setIsPageChanging(false);
      }, 150);
    };
    img.src = url;

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [pageIdx, pages]);

  // 5A — Speculative preloading of adjacent pages
  useEffect(() => {
    if (typeof window === "undefined" || !pages.length) return;
    const toPreload = [pageIdx - 1, pageIdx + 1, pageIdx + 2].filter(
      (i) => i >= 0 && i < pages.length
    );
    toPreload.forEach((i) => {
      const preImg = new window.Image();
      preImg.src = getComicPageUrl(pages[i]);
    });
  }, [pageIdx, pages]);

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

  useEffect(() => {
    setZoomIdx(0);
  }, [panelIdx, mode]);

  useEffect(() => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
    setBubbleOffsets({});
  }, [panelIdx, zoomIdx, setZoomScale, setPanOffset, setBubbleOffsets]);

  const pgKey = getPageKeyFromUrl(pages[pageIdx]);
  const currentPageData = pgKey ? (localDialogues.pages?.[pgKey] || { panels: [] }) : { panels: [] };

  const currentPanels = useMemo(() => {
    return mode === "read"
      ? (currentPageData.panels || []).filter(
          (p: PanelStop) =>
            (p.dialogue && p.dialogue.length > 0) ||
            p.zoomRect ||
            (p.zoomRects && p.zoomRects.length > 0) ||
            p.sound ||
            (p.sounds && p.sounds.length > 0)
        )
      : currentPageData.panels || [];
  }, [mode, currentPageData.panels]);

  // ── 6D: Read-mode keyboard shortcuts (placed after currentPanels declaration) ──
  useEffect(() => {
    if (mode !== "read") return;
    const handleReadKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === " " || e.key === "ArrowRight") {
        e.preventDefault();
        const activePanelStop = currentPanels[panelIdx];
        const rects = activePanelStop?.zoomRects || (activePanelStop?.zoomRect ? [activePanelStop.zoomRect] : []);
        if (showAllDialogues) {
          setShowAllDialogues(false);
        } else if (zoomedOut) {
          if (pageIdx < pages.length - 1) resetPage(pageIdx + 1);
        } else if (currentPanels.length === 0) {
          if (pageIdx < pages.length - 1) resetPage(pageIdx + 1);
          else setZoomedOut(true);
        } else if (zoomIdx < rects.length - 1) {
          setZoomIdx((prev) => prev + 1);
        } else if (panelIdx < currentPanels.length - 1) {
          setPanelIdx((prev) => prev + 1);
        } else {
          setZoomedOut(true);
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (panelIdx > 0) {
          setPanelIdx((prev) => prev - 1);
          setZoomIdx(0);
        } else if (pageIdx > 0) {
          resetPage(pageIdx - 1);
        }
      } else if (e.key === "a" || e.key === "A") {
        handleSetAutoplay(!autoplay);
      }
    };
    window.addEventListener("keydown", handleReadKey);
    return () => window.removeEventListener("keydown", handleReadKey);
  }, [mode, currentPanels, panelIdx, zoomIdx, zoomedOut, pageIdx, pages, showAllDialogues, autoplay, resetPage]);

  const activePanel = currentPanels[panelIdx] || { focusY: 0.5, dialogue: [] };
  const activePanelRects = activePanel
    ? activePanel.zoomRects || (activePanel.zoomRect ? [activePanel.zoomRect] : [])
    : [];
  const activeZoomRect = activePanelRects[zoomIdx] || null;

  useEffect(() => {
    if (mode !== "read" || zoomedOut || !autoplay) return;
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
  }, [panelIdx, zoomIdx, currentPanels, mode, zoomedOut, autoplay]);

  // Ref to track pending dialogue-sequence timers so we can cancel them on manual tap.
  const dialogueTimersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (mode !== "read") return;
    setActiveReadingBubbleIdx(0);

    // Clear any leftover timers from the previous panel.
    dialogueTimersRef.current.forEach((t) => clearTimeout(t));
    dialogueTimersRef.current = [];

    // Only schedule auto-advance timers when autoplay is enabled.
    if (!autoplay) return;

    const dialogueCount = activePanel?.dialogue?.length || 0;
    if (dialogueCount <= 1) return;

    const timers: NodeJS.Timeout[] = [];
    for (let i = 1; i < dialogueCount; i++) {
      const timer = setTimeout(() => {
        setActiveReadingBubbleIdx(i);
      }, i * 800);
      timers.push(timer);
    }
    dialogueTimersRef.current = timers;

    return () => {
      timers.forEach((t) => clearTimeout(t));
      dialogueTimersRef.current = [];
    };
  }, [panelIdx, pageIdx, mode, activePanel, autoplay]);

  // Audio Context custom hook
  useReaderAudio({
    mode,
    panelIdx,
    pageIdx,
    pages,
    localDialogues,
    activePanel,
  });

  // Calculate layout dimensions via custom hook
  const { imgWidth, imgLeft, imgTop, imgHeight } = useReaderLayout({
    imgSize,
    containerSize,
    mode,
    activeZoomRect,
    zoomedOut,
    zoomScale,
    activePanel,
    activeReadingBubbleIdx,
    focusPanel,
    focusDialogue,
  });

  const handleReaderTap = (e: React.MouseEvent) => {
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

    // If there are still unseen dialogues in the current panel, step through them
    // on tap instead of jumping to the next panel/zoom rect.
    const dialogueCount = activePanel?.dialogue?.length || 0;
    if (dialogueCount > 1 && activeReadingBubbleIdx < dialogueCount - 1) {
      // Cancel any pending auto-advance timers so we don't double-step.
      dialogueTimersRef.current.forEach((t) => clearTimeout(t));
      dialogueTimersRef.current = [];
      setActiveReadingBubbleIdx((prev) => prev + 1);
      return;
    }

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

  const dialoguesNode = useMemo(() => {
    return (
      <DialogueLayers
        mode={mode}
        localDialogues={localDialogues}
        showAllDialogues={showAllDialogues}
        zoomedOut={zoomedOut}
        containerSize={containerSize}
        imgWidth={imgWidth}
        imgHeight={imgHeight}
        imgLeft={imgLeft}
        imgTop={imgTop}
        currentPanels={currentPanels}
        activePanel={activePanel}
        panelIdx={panelIdx}
        activeReadingBubbleIdx={activeReadingBubbleIdx}
        bubbleOffsets={bubbleOffsets}
        draggedBubbleKey={draggedBubbleKey}
        textScale={textScale}
        speedMultiplier={speedMultiplier}
        isPageChanging={isPageChanging}
        activePanelIdx={activePanelIdx}
        activeBubbleIdx={activeBubbleIdx}
        setActivePanelIdx={setActivePanelIdx}
        setActiveBubbleIdx={setActiveBubbleIdx}
        handleBubblePointerDown={handleBubblePointerDown}
        handleBubblePointerMove={handleBubblePointerMove}
        handleBubblePointerUp={handleBubblePointerUp}
        handleDragEnd={handleDragEnd}
        handleTailTargetDragEnd={handleTailTargetDragEnd}
        focusDialogue={focusDialogue}
        bubbleOpacity={bubbleOpacity}
      />
    );
  }, [
    mode,
    localDialogues,
    showAllDialogues,
    zoomedOut,
    containerSize,
    imgWidth,
    imgHeight,
    imgLeft,
    imgTop,
    currentPanels,
    activePanel,
    panelIdx,
    activeReadingBubbleIdx,
    bubbleOffsets,
    draggedBubbleKey,
    textScale,
    speedMultiplier,
    isPageChanging,
    activePanelIdx,
    activeBubbleIdx,
    setActivePanelIdx,
    setActiveBubbleIdx,
    handleBubblePointerDown,
    handleBubblePointerMove,
    handleBubblePointerUp,
    handleDragEnd,
    handleTailTargetDragEnd,
    focusDialogue,
    bubbleOpacity,
  ]);

  return (
    <div
      className="fixed inset-0 z-[150] w-screen h-screen flex flex-col overflow-hidden"
      style={{ background: "#0a0a0f", touchAction: "none" }}
    >
      <ReaderTopBar
        saga={saga}
        chapter={chapter}
        mode={mode}
        handleToggleMode={handleToggleMode}
        pageIdx={pageIdx}
        totalPages={pages.length}
        textScale={textScale}
        setTextScale={handleSetTextScale}
        autoplay={autoplay}
        setAutoplay={handleSetAutoplay}
        speedMultiplier={speedMultiplier}
        setSpeedMultiplier={handleSetSpeedMultiplier}
        resetPage={resetPage}
        onOpenHelp={() => setShowInstructions(true)}
        focusDialogue={focusDialogue}
        setFocusDialogue={handleSetFocusDialogue}
        focusPanel={focusPanel}
        setFocusPanel={handleSetFocusPanel}
        zoomScale={zoomScale}
        setZoomScale={setZoomScale}
        panOffset={panOffset}
        setPanOffset={setPanOffset}
        bubbleOpacity={bubbleOpacity}
        setBubbleOpacity={handleSetBubbleOpacity}
      />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden w-full h-full relative">
        {/* Read mode: page thumbnail sidebar (PDF-reader style) */}
        <AnimatePresence>
          {mode === "read" && (
            <ReaderPagesSidebar
              pages={pages}
              pageIdx={pageIdx}
              resetPage={resetPage}
              saga={saga}
              totalPages={pages.length}
            />
          )}
        </AnimatePresence>

        {/* Edit mode: full editor left sidebar */}
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
          renderedDialogues={dialoguesNode}
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

        <DialogueEditorPanel
          mode={mode}
          currentPanels={currentPanels}
          activePanelIdx={activePanelIdx}
          activeBubbleIdx={activeBubbleIdx}
          pageIdx={pageIdx}
          pagesLength={pages.length}
          pages={pages}
          localDialogues={localDialogues}
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
          handleUpdateAudioTracks={handleUpdateAudioTracks}
        />
      </div>

      <ReaderAuthModal
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        authError={authError}
        setAuthError={setAuthError}
        handleAuthSubmit={handleAuthSubmit}
      />

      <ReaderInstructionsModal
        isOpen={showInstructions}
        onClose={handleCloseInstructions}
      />
    </div>
  );
}
