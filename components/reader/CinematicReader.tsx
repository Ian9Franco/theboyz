"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { DialogueBubble, type DialogueLine } from "./DialogueBubble";

// ─── Types ───────────────────────────────────────────────────────────────────

type PanelStop = {
  focusY: number;
  dialogue?: DialogueLine[];
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
  const [zoomedOut, setZoomedOut] = useState(false);
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  // Dialogues Local Copy for Editing
  const [localDialogues, setLocalDialogues] = useState<Dialogues>({ pages: {} });
  
  // Editor States
  const [activePanelIdx, setActivePanelIdx] = useState(0);
  const [activeBubbleIdx, setActiveBubbleIdx] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  // Dialogue Password Auth States
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);

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
    setZoomedOut(false);
    setActivePanelIdx(0);
    setActiveBubbleIdx(null);
  }, []);

  // Get current page dialogues safely
  const pgKey = String(pageIdx + 1);
  const currentPageData = localDialogues.pages?.[pgKey] || { panels: [] };
  
  // Filter empty panels only in read mode so the editor can still see and edit all stops
  const currentPanels = mode === "read"
    ? (currentPageData.panels || []).filter(p => p.dialogue && p.dialogue.length > 0)
    : (currentPageData.panels || []);

  const activePanel = currentPanels[panelIdx] || { focusY: 0.5, dialogue: [] };

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
      // Reader Mode (Normal and ZoomedOut are the same fit-to-screen layout now)
      const scale = Math.min(containerSize.w / imgSize.w, containerSize.h / imgSize.h);
      imgWidth = imgSize.w * scale;
      imgLeft = (containerSize.w - imgWidth) / 2;
      imgTop = (containerSize.h - imgSize.h * scale) / 2;
      imgHeight = imgSize.h * scale;
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

    if (panelIdx < currentPanels.length - 1) {
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
    setLocalDialogues(prev => ({
      ...prev,
      pages: newPages,
    }));
  };

  const handleAddPanel = () => {
    const updatedPages = { ...localDialogues.pages };
    const pg = { ...currentPageData };
    pg.panels = [...pg.panels, { focusY: 0.5, dialogue: [] }];
    updatedPages[pgKey] = pg;
    updateDialoguesState(updatedPages);
    setActivePanelIdx(pg.panels.length - 1);
    setActiveBubbleIdx(null);
  };

  const handleRemovePanel = (pIdx: number) => {
    const updatedPages = { ...localDialogues.pages };
    const pg = { ...currentPageData };
    pg.panels = pg.panels.filter((_, idx) => idx !== pIdx);
    updatedPages[pgKey] = pg;
    updateDialoguesState(updatedPages);
    setActivePanelIdx(Math.max(0, pIdx - 1));
    setActiveBubbleIdx(null);
  };

  const handleUpdateFocusY = (pIdx: number, val: number) => {
    const updatedPages = { ...localDialogues.pages };
    const pg = { ...currentPageData };
    pg.panels = pg.panels.map((p, idx) => (idx === pIdx ? { ...p, focusY: val } : p));
    updatedPages[pgKey] = pg;
    updateDialoguesState(updatedPages);
  };

  const handleAddBubble = (pIdx: number) => {
    const updatedPages = { ...localDialogues.pages };
    const pg = { ...currentPageData };
    const panelsCopy = [...pg.panels];
    const targetPanel = { ...panelsCopy[pIdx] };
    const dialoguesCopy = targetPanel.dialogue ? [...targetPanel.dialogue] : [];

    dialoguesCopy.push({
      text: "Nuevo diálogo",
      speaker: "",
      style: "normal",
      posX: 50,
      posY: Math.round(targetPanel.focusY * 100),
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
    const panelsCopy = [...pg.panels];
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
    const panelsCopy = [...pg.panels];
    const targetPanel = { ...panelsCopy[pIdx] };
    const dialoguesCopy = targetPanel.dialogue ? [...targetPanel.dialogue] : [];

    targetPanel.dialogue = dialoguesCopy.filter((_, idx) => idx !== bIdx);
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
    const relativeX = ((info.point.x - rect.left) / rect.width) * 100;
    const relativeY = ((info.point.y - rect.top) / rect.height) * 100;

    handleUpdateBubble(pIdx, bIdx, {
      posX: Math.max(-20, Math.min(120, Math.round(relativeX))),
      posY: Math.max(-20, Math.min(120, Math.round(relativeY))),
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

  // Rendered Dialogues Helper
  const renderedDialogues = (() => {
    if (mode === "read") {
      return activePanel.dialogue?.map((line, i) => {
        const posX = line.posX ?? 50;
        const posY = line.posY ?? (activePanel.focusY * 100);
        return (
          <div
            key={`read-bub-${i}`}
            className="absolute pointer-events-none z-30"
            style={{
              left: imgLeft + (posX / 100) * imgWidth,
              top: imgTop + (posY / 100) * imgHeight,
              transform: "translate(-50%, -50%)",
              width: "max-content",
            }}
          >
            <DialogueBubble line={line} index={i} />
          </div>
        );
      }) || [];
    }

    // Edit Mode: render all dialogues, with the active one being draggable
    return currentPanels.flatMap((panel, pIdx) => {
      const dialoguesList = panel.dialogue || [];
      return dialoguesList.map((line, bIdx) => {
        const isActive = activePanelIdx === pIdx && activeBubbleIdx === bIdx;
        const posX = line.posX ?? 50;
        const posY = line.posY ?? (panel.focusY * 100);

        return (
          <motion.div
            key={`edit-bub-${pIdx}-${bIdx}`}
            drag={isActive}
            dragMomentum={false}
            dragElastic={0}
            onDragEnd={(_, info) => handleDragEnd(info, pIdx, bIdx)}
            onClick={(e) => {
              e.stopPropagation();
              setActivePanelIdx(pIdx);
              setActiveBubbleIdx(bIdx);
            }}
            className="absolute z-40 pointer-events-auto cursor-move"
            style={{
              left: imgLeft + (posX / 100) * imgWidth,
              top: imgTop + (posY / 100) * imgHeight,
              transform: "translate(-50%, -50%)",
              width: "max-content",
            }}
          >
            <div
              className={`transition-all ${
                isActive
                  ? "outline-dashed outline-3 outline-red-500 outline-offset-4 scale-[1.03] drop-shadow-lg"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {isActive && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-red-500 text-white font-mono text-xs px-2 py-0.5 rounded shadow">
                  X:{posX}% Y:{posY}%
                </div>
              )}
              <DialogueBubble line={line} index={0} />
            </div>
          </motion.div>
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
                transition: mode === "read" && zoomedOut ? `all ${ZOOM_OUT_MS}ms ease-out` : "none",
              }}
            />
          )}

          {/* ── Dialogues Layer ── */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
          >
            {renderedDialogues}
          </div>

          {/* ── FocusY Indicator line in Editor Mode ── */}
          {mode === "edit" && currentPanels[activePanelIdx] && (
            <div
              className="absolute left-0 right-0 h-0.5 border-t-2 border-dashed border-red-400 z-20 pointer-events-none"
              style={{
                top: imgTop + currentPanels[activePanelIdx].focusY * imgHeight,
              }}
            >
              <span className="absolute right-4 -top-6 bg-red-400 text-[#0a0a0f] font-mono text-xs px-2 py-0.5 rounded">
                Parada {activePanelIdx + 1}: focusY {currentPanels[activePanelIdx].focusY}
              </span>
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
        </div>

        {/* Editor Side Panel (Right side) */}
        {mode === "edit" && (
          <div
            className="w-full md:w-80 shrink-0 bg-white border-t-3 md:border-t-0 border-[#0a0a0f] flex flex-col overflow-y-auto z-40"
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

            {/* Page navigation in sidebar */}
            <div className="p-4 border-b-2 border-zinc-200 bg-zinc-50 flex items-center justify-between gap-2">
              <button
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
                onClick={() => pageIdx < pages.length - 1 && resetPage(pageIdx + 1)}
                disabled={isLastPage}
                className="btn btn-dark text-xs py-1 px-3 disabled:opacity-50"
              >
                Pág Sig
              </button>
            </div>

            {/* Panels / Stops List */}
            <div className="p-4 flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-[var(--font-bangers)] text-lg text-zinc-600 tracking-wider">
                  Paradas de Viñetas
                </span>
                <button
                  onClick={handleAddPanel}
                  className="font-[var(--font-bangers)] text-xs bg-emerald-500 text-white border border-[#0a0a0f] px-2 py-1 shadow-[1px_1px_0_#0a0a0f] hover:bg-emerald-600"
                >
                  + Agregar Viñeta
                </button>
              </div>

              {currentPanels.length === 0 ? (
                <div className="text-sm text-zinc-400 italic text-center py-6 border border-dashed border-zinc-300 rounded">
                  No hay viñetas definidas en esta página. Agregá una para empezar.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {currentPanels.map((panel, pIdx) => {
                    const isSelected = activePanelIdx === pIdx;
                    return (
                      <div
                        key={pIdx}
                        onClick={() => {
                          setActivePanelIdx(pIdx);
                          setActiveBubbleIdx(null);
                        }}
                        className={`p-3 border-2 border-[#0a0a0f] transition-all cursor-pointer ${
                          isSelected
                            ? "bg-yellow-50 shadow-[3px_3px_0_#0a0a0f]"
                            : "bg-zinc-50 hover:bg-zinc-100"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-[var(--font-marker)] text-xs text-[#0a0a0f]">
                            Viñeta {pIdx + 1}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemovePanel(pIdx);
                            }}
                            className="text-xs text-red-500 hover:underline"
                          >
                            Eliminar
                          </button>
                        </div>

                        {/* FocusY Slider */}
                        <div className="flex flex-col gap-1 mb-3">
                          <div className="flex justify-between text-xs font-mono text-zinc-500">
                            <span>Posición Foco Y:</span>
                            <span>{panel.focusY}</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={panel.focusY}
                            onChange={(e) => handleUpdateFocusY(pIdx, parseFloat(e.target.value))}
                            className="w-full accent-[#e8185a]"
                          />
                        </div>

                        {/* Dialogue List for this panel */}
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-zinc-500">Globos:</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddBubble(pIdx);
                              }}
                              className="text-xs text-[#e8185a] hover:underline"
                            >
                              + Agregar Globo
                            </button>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            {panel.dialogue?.map((bub, bIdx) => {
                              const isBubActive = isSelected && activeBubbleIdx === bIdx;
                              return (
                                <button
                                  key={bIdx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActivePanelIdx(pIdx);
                                    setActiveBubbleIdx(bIdx);
                                  }}
                                  className={`text-left text-xs p-2 border rounded font-mono truncate transition-all ${
                                    isBubActive
                                      ? "border-red-500 bg-red-50 font-bold"
                                      : "border-zinc-200 hover:bg-zinc-100"
                                  }`}
                                >
                                  {bub.speaker ? `${bub.speaker}: ` : ""}
                                  {bub.text || "(vacío)"}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Selected Bubble Editing Form */}
              {activeBubbleIdx !== null && currentPanels[activePanelIdx]?.dialogue?.[activeBubbleIdx] && (
                <div className="mt-4 p-4 border-2 border-red-500 bg-zinc-50 rounded flex flex-col gap-3 shadow-[3px_3px_0_rgba(239,68,68,0.2)]">
                  <div className="flex justify-between items-center border-b pb-2 mb-1">
                    <span className="font-[var(--font-bangers)] text-base text-red-500 tracking-wider">
                      Editando Globo
                    </span>
                    <button
                      onClick={() => handleRemoveBubble(activePanelIdx, activeBubbleIdx)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Eliminar Globo
                    </button>
                  </div>

                  {/* Speaker */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-zinc-600">Personaje / Hablante:</label>
                    <input
                      type="text"
                      value={currentPanels[activePanelIdx].dialogue![activeBubbleIdx].speaker || ""}
                      onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { speaker: e.target.value })}
                      className="w-full border-2 border-[#0a0a0f] p-2 text-xs font-mono rounded bg-white text-[#0a0a0f]"
                      placeholder="Ej: Sofi"
                    />
                  </div>

                  {/* Speaker Presets */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-zinc-500">Hablantes rápidos:</label>
                    <div className="flex flex-wrap gap-1">
                      {["Uandi", "Sofi", "Jaz", "Ian", "Julián", "Mati", "Volvo"].map((name) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { speaker: name })}
                          className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 border border-[#0a0a0f] text-zinc-800 text-[10px] font-bold rounded active:translate-y-0.5 transition-all"
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Style */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-zinc-600">Estilo:</label>
                    <select
                      value={currentPanels[activePanelIdx].dialogue![activeBubbleIdx].style || "normal"}
                      onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { style: e.target.value as any })}
                      className="w-full border-2 border-[#0a0a0f] p-2 text-xs font-mono rounded bg-white text-[#0a0a0f]"
                    >
                      <option value="normal">Normal (Bocadillo)</option>
                      <option value="caption">Narración (Caja)</option>
                      <option value="thought">Pensamiento (Nube)</option>
                      <option value="scream">Grito (Llamativo/Bangers)</option>
                      <option value="whisper">Susurro (Discontinuo/Itálico)</option>
                      <option value="electronic">Electrónico (Futurista/Monospace)</option>
                    </select>
                  </div>

                  {/* Size Preset */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-zinc-600">Tamaño del Globo:</label>
                    <select
                      value={currentPanels[activePanelIdx].dialogue![activeBubbleIdx].size || "medium"}
                      onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { size: e.target.value as any })}
                      className="w-full border-2 border-[#0a0a0f] p-2 text-xs font-mono rounded bg-white text-[#0a0a0f]"
                    >
                      <option value="small">Pequeño</option>
                      <option value="medium">Mediano</option>
                      <option value="large">Grande</option>
                    </select>
                  </div>

                  {/* Tail Direction */}
                  {currentPanels[activePanelIdx].dialogue![activeBubbleIdx].style !== "caption" && (
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-zinc-600">Dirección de la Cola:</label>
                      <select
                        value={currentPanels[activePanelIdx].dialogue![activeBubbleIdx].tail || "bottom-left"}
                        onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { tail: e.target.value as any })}
                        className="w-full border-2 border-[#0a0a0f] p-2 text-xs font-mono rounded bg-white text-[#0a0a0f]"
                      >
                        <option value="bottom-left">Abajo-Izquierda</option>
                        <option value="bottom-right">Abajo-Derecha</option>
                        <option value="top-left">Arriba-Izquierda</option>
                        <option value="top-right">Arriba-Derecha</option>
                        <option value="left">Izquierda</option>
                        <option value="right">Derecha</option>
                        <option value="none">Sin Cola (Flotante)</option>
                      </select>
                    </div>
                  )}

                  {/* Custom HEX Colors */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-zinc-600">Color Fondo (Hex):</label>
                      <input
                        type="text"
                        value={currentPanels[activePanelIdx].dialogue![activeBubbleIdx].customBg || ""}
                        onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { customBg: e.target.value })}
                        className="w-full border-2 border-[#0a0a0f] p-2 text-xs font-mono rounded bg-white text-[#0a0a0f]"
                        placeholder="Ej: #ffffff"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-zinc-600">Color Borde (Hex):</label>
                      <input
                        type="text"
                        value={currentPanels[activePanelIdx].dialogue![activeBubbleIdx].customColor || ""}
                        onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { customColor: e.target.value })}
                        className="w-full border-2 border-[#0a0a0f] p-2 text-xs font-mono rounded bg-white text-[#0a0a0f]"
                        placeholder="Ej: #0a0a0f"
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-zinc-600">Texto:</label>
                    <textarea
                      value={currentPanels[activePanelIdx].dialogue![activeBubbleIdx].text}
                      onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { text: e.target.value })}
                      className="w-full h-20 border-2 border-[#0a0a0f] p-2 text-xs font-sans rounded bg-white text-[#0a0a0f] resize-none"
                      placeholder="Escribí el diálogo..."
                    />
                  </div>

                  {/* Position Presets */}
                  <div className="flex flex-col gap-1 mt-1">
                    <label className="text-xs font-bold text-zinc-600">Posición Rápida (Márgenes/Viñeta):</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          const targetY = Math.round(currentPanels[activePanelIdx].focusY * 100);
                          handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: -15, posY: targetY });
                        }}
                        className="px-2 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-[#0a0a0f] text-zinc-800 text-[10px] font-bold rounded text-left flex justify-between items-center transition-colors active:translate-y-0.5"
                      >
                        <span>👈 Margen Izq.</span>
                        <span className="text-[8px] text-zinc-500 font-mono">[-15%, Y]</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const targetY = Math.round(currentPanels[activePanelIdx].focusY * 100);
                          handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: 115, posY: targetY });
                        }}
                        className="px-2 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-[#0a0a0f] text-zinc-800 text-[10px] font-bold rounded text-left flex justify-between items-center transition-colors active:translate-y-0.5"
                      >
                        <span>👉 Margen Der.</span>
                        <span className="text-[8px] text-zinc-500 font-mono">[115%, Y]</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: 50, posY: -15 });
                        }}
                        className="px-2 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-[#0a0a0f] text-zinc-800 text-[10px] font-bold rounded text-left flex justify-between items-center transition-colors active:translate-y-0.5"
                      >
                        <span>👆 Margen Sup.</span>
                        <span className="text-[8px] text-zinc-500 font-mono">[50%, -15%]</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: 50, posY: 115 });
                        }}
                        className="px-2 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-[#0a0a0f] text-zinc-800 text-[10px] font-bold rounded text-left flex justify-between items-center transition-colors active:translate-y-0.5"
                      >
                        <span>👇 Margen Inf.</span>
                        <span className="text-[8px] text-zinc-500 font-mono">[50%, 115%]</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const targetY = Math.round(currentPanels[activePanelIdx].focusY * 100);
                          handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: 50, posY: targetY });
                        }}
                        className="col-span-2 px-2 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-[#0a0a0f] text-zinc-800 text-[10px] font-bold rounded text-center transition-colors active:translate-y-0.5"
                      >
                        🎯 Centro de Viñeta <span className="text-zinc-500 font-mono ml-1 text-[8px]">[50%, Y]</span>
                      </button>
                    </div>
                  </div>

                  {/* Coords display & manual entry */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-zinc-500">X (Ancho %):</label>
                      <input
                        type="number"
                        min="-20"
                        max="120"
                        value={currentPanels[activePanelIdx].dialogue![activeBubbleIdx].posX ?? 50}
                        onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: Math.max(-20, Math.min(120, parseInt(e.target.value) || 0)) })}
                        className="border-2 border-[#0a0a0f] p-1.5 text-xs font-mono text-center bg-white text-[#0a0a0f]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-zinc-500">Y (Alto %):</label>
                      <input
                        type="number"
                        min="-20"
                        max="120"
                        value={currentPanels[activePanelIdx].dialogue![activeBubbleIdx].posY ?? 50}
                        onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posY: Math.max(-20, Math.min(120, parseInt(e.target.value) || 0)) })}
                        className="border-2 border-[#0a0a0f] p-1.5 text-xs font-mono text-center bg-white text-[#0a0a0f]"
                      />
                    </div>
                  </div>

                  <span className="text-[10px] text-zinc-400 italic mt-1 text-center">
                    💡 ¡También podés arrastrar la burbuja directamente en el cómic!
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
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
