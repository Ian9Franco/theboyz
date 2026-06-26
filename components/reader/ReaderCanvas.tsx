"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { PanelStop } from "./audioPlayer";
import { ReaderZoomControls } from "./ReaderZoomControls";
import { getComicPageUrl } from "./readerUtils";

interface ReaderCanvasProps {
  mode: "read" | "edit";
  containerRef: React.RefObject<HTMLDivElement | null>;
  imgRef: React.RefObject<HTMLImageElement | null>;
  pages: string[];
  pageIdx: number;
  chapter: any;
  isPanning: boolean;
  zoomScale: number;
  panOffset: { x: number; y: number };
  imgSize: { w: number; h: number } | null;
  imgWidth: number;
  imgHeight: number;
  imgLeft: number;
  imgTop: number;
  showGrid: boolean;
  gridSize: number;
  currentPanels: PanelStop[];
  activePanelIdx: number;
  activeBubbleIdx: number | null;
  panelIdx: number;
  zoomIdx: number;
  zoomedOut: boolean;
  showAllDialogues: boolean;
  isPageChanging: boolean;
  renderedDialogues: React.ReactNode;
  undoStack: any[];
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: (e: React.MouseEvent) => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
  handleWheel: (e: React.WheelEvent) => void;
  handleDoubleClick: (e: React.MouseEvent) => void;
  handleReaderTap: (e: React.MouseEvent) => void;
  handleUndo: () => void;
  handleAddPanel?: () => void;
  handleAddBubble: (pIdx: number, defaultPosition?: { posX: number; posY: number }) => void;
  handleRemoveBubble: (pIdx: number, bIdx: number) => void;
  setActivePanelIdx?: (idx: number) => void;
  handlePanelRectDragEnd?: (info: any, pIdx: number, rIdx: number) => void;
  handleFocusYDragEnd?: (info: any, pIdx: number) => void;
  handlePanelRectResizeStart?: (e: React.PointerEvent, handle: string, pIdx: number, rIdx: number) => void;
  resetPage: (idx: number) => void;
  setZoomScale: React.Dispatch<React.SetStateAction<number>>;
  setPanOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>> | ((val: { x: number; y: number }) => void);
  nextChapter: any;
}

export function ReaderCanvas({
  mode,
  containerRef,
  imgRef,
  pages,
  pageIdx,
  chapter,
  isPanning,
  zoomScale,
  panOffset,
  imgSize,
  imgWidth,
  imgHeight,
  imgLeft,
  imgTop,
  showGrid,
  gridSize,
  currentPanels,
  activePanelIdx,
  activeBubbleIdx,
  panelIdx,
  zoomIdx,
  zoomedOut,
  showAllDialogues,
  isPageChanging,
  renderedDialogues,
  undoStack,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleWheel,
  handleDoubleClick,
  handleReaderTap,
  handleUndo,
  handleAddPanel,
  handleAddBubble,
  handleRemoveBubble,
  setActivePanelIdx,
  handlePanelRectDragEnd,
  handleFocusYDragEnd,
  handlePanelRectResizeStart,
  resetPage,
  setZoomScale,
  setPanOffset,
  nextChapter,
}: ReaderCanvasProps) {
  const isLastPage = pageIdx === pages.length - 1;

  return (
    <div
      ref={containerRef}
      onMouseDown={mode === "read" ? handleMouseDown : undefined}
      onMouseMove={mode === "read" ? handleMouseMove : undefined}
      onMouseUp={mode === "read" ? handleMouseUp : undefined}
      onMouseLeave={mode === "read" ? handleMouseUp : undefined}
      onTouchStart={mode === "read" ? handleTouchStart : undefined}
      onTouchMove={mode === "read" ? handleTouchMove : undefined}
      onTouchEnd={mode === "read" ? handleTouchEnd : undefined}
      onWheel={mode === "read" ? handleWheel : undefined}
      onDoubleClick={mode === "read" ? handleDoubleClick : undefined}
      onClick={mode === "read" ? handleReaderTap : undefined}
      className={`relative flex-1 h-full overflow-hidden select-none ${
        mode === "edit" ? "bg-zinc-900 border-r-3 border-[#0a0a0f]" : "bg-[#0a0a0f]"
      } ${
        mode === "read"
          ? isPanning
            ? "cursor-grabbing animate-none"
            : zoomScale > 1
            ? "cursor-grab"
            : "cursor-pointer"
          : ""
      }`}
    >
      {/* Zoom & Pan Wrapper */}
      <div
        style={
          mode === "read"
            ? {
                position: "absolute",
                inset: 0,
                transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0) scale(${zoomScale})`,
                transformOrigin: "center center",
                transition: isPanning ? "none" : "transform 200ms cubic-bezier(0.25, 1, 0.5, 1)",
                willChange: "transform",
              }
            : undefined
        }
      >
        {/* Image with dynamic zoom + pan */}
        {imgSize && (
          <img
            ref={imgRef}
            key={pages[pageIdx]}
            src={getComicPageUrl(pages[pageIdx])}
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
              // 3B: transition specific props only, avoids width jitter on zoom change
              transition:
                mode === "read" && !isPageChanging
                  ? "left 400ms cubic-bezier(0.25, 1, 0.5, 1), top 400ms cubic-bezier(0.25, 1, 0.5, 1), width 400ms cubic-bezier(0.25, 1, 0.5, 1)"
                  : "none",
              boxShadow:
                mode === "read"
                  ? "0 15px 40px rgba(0, 0, 0, 0.8), 0 8px 16px rgba(0, 0, 0, 0.6)"
                  : "none",
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
          return currentPanels.flatMap((panelStop, pIdx) => {
            const rects = panelStop.zoomRects || (panelStop.zoomRect ? [panelStop.zoomRect] : []);
            const isActivePanel = pIdx === activePanelIdx;

            return rects.map((zoom: any, rIdx: number) => {
              const maskLeft = imgLeft + (zoom.x / 100) * imgWidth;
              const maskTop = imgTop + (zoom.y / 100) * imgHeight;
              const maskWidth = (zoom.w / 100) * imgWidth;
              const maskHeight = (zoom.h / 100) * imgHeight;
              
              return (
                <motion.div
                  key={`edit-zoom-overlay-${pIdx}-${rIdx}-${zoom.x}-${zoom.y}`}
                  drag={isActivePanel}
                  dragMomentum={false}
                  dragElastic={0}
                  onDragEnd={(_, info) => handlePanelRectDragEnd?.(info, pIdx, rIdx)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePanelIdx?.(pIdx);
                  }}
                  className={`absolute pointer-events-auto ${isActivePanel ? 'cursor-move' : 'cursor-pointer'}`}
                  style={{
                    left: maskLeft,
                    top: maskTop,
                    width: maskWidth,
                    height: maskHeight,
                    border: rIdx === 0 
                      ? (isActivePanel ? "3px dashed #10b981" : "2px dashed rgba(16, 185, 129, 0.4)")
                      : (isActivePanel ? "2.5px dashed #3b82f6" : "2px dashed rgba(59, 130, 246, 0.4)"),
                    boxShadow: (rIdx === 0 && isActivePanel) ? "0 0 0 9999px rgba(0, 0, 0, 0.15)" : "none",
                    backgroundColor: isActivePanel ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 0.05)",
                    zIndex: isActivePanel ? 40 - rIdx : 15 - rIdx,
                  }}
                  whileHover={!isActivePanel ? { backgroundColor: "rgba(255, 255, 255, 0.15)" } : undefined}
                >
                  <div className={`absolute top-1 left-1 font-mono text-[9px] px-1.5 py-0.5 rounded shadow ${isActivePanel ? 'bg-zinc-900/90 text-white' : 'bg-zinc-900/50 text-zinc-300'} select-none pointer-events-none`}>
                    {rIdx === 0 ? `🎯 V${pIdx + 1}` : `🤫 Máscara ${rIdx + 1}`}
                  </div>

                  {isActivePanel && (
                    <>
                      {/* Edge Resizers */}
                      <div
                        className="absolute top-[-3px] left-[3px] right-[3px] h-[6px] cursor-ns-resize z-50 hover:bg-emerald-400/50 transition-colors"
                        onPointerDown={(e) => handlePanelRectResizeStart?.(e, "t", pIdx, rIdx)}
                      />
                      <div
                        className="absolute bottom-[-3px] left-[3px] right-[3px] h-[6px] cursor-ns-resize z-50 hover:bg-emerald-400/50 transition-colors"
                        onPointerDown={(e) => handlePanelRectResizeStart?.(e, "b", pIdx, rIdx)}
                      />
                      <div
                        className="absolute left-[-3px] top-[3px] bottom-[3px] w-[6px] cursor-ew-resize z-50 hover:bg-emerald-400/50 transition-colors"
                        onPointerDown={(e) => handlePanelRectResizeStart?.(e, "l", pIdx, rIdx)}
                      />
                      <div
                        className="absolute right-[-3px] top-[3px] bottom-[3px] w-[6px] cursor-ew-resize z-50 hover:bg-emerald-400/50 transition-colors"
                        onPointerDown={(e) => handlePanelRectResizeStart?.(e, "r", pIdx, rIdx)}
                      />

                      {/* Corner Resizers */}
                      <div
                        className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-emerald-500 rounded-sm cursor-nwse-resize z-50 shadow-sm"
                        onPointerDown={(e) => handlePanelRectResizeStart?.(e, "tl", pIdx, rIdx)}
                      />
                      <div
                        className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-emerald-500 rounded-sm cursor-nesw-resize z-50 shadow-sm"
                        onPointerDown={(e) => handlePanelRectResizeStart?.(e, "tr", pIdx, rIdx)}
                      />
                      <div
                        className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-emerald-500 rounded-sm cursor-nesw-resize z-50 shadow-sm"
                        onPointerDown={(e) => handlePanelRectResizeStart?.(e, "bl", pIdx, rIdx)}
                      />
                      <div
                        className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-emerald-500 rounded-sm cursor-nwse-resize z-50 shadow-sm"
                        onPointerDown={(e) => handlePanelRectResizeStart?.(e, "br", pIdx, rIdx)}
                      />
                    </>
                  )}
                </motion.div>
              );
            });
          });
        })()}

        {/* Spoiler Masks for future panels & sequences */}
        <AnimatePresence>
          {mode === "read" && !zoomedOut && imgSize && imgWidth > 0 && imgHeight > 0 && (
            currentPanels.flatMap((panel: PanelStop, pIdx: number) => {
              const rects = panel.zoomRects || (panel.zoomRect ? [panel.zoomRect] : []);
              return rects.map((zoom: any, rIdx: number) => {
                let shouldMask = false;
                if (pIdx > panelIdx) {
                  shouldMask = panel.hideUntilReached !== false;
                } else if (pIdx === panelIdx) {
                  shouldMask = rIdx > zoomIdx && panel.hideUntilReached !== false;
                }

                if (!shouldMask) return null;

                const maskLeft = imgLeft + (zoom.x / 100) * imgWidth;
                const maskTop = imgTop + (zoom.y / 100) * imgHeight;
                const maskWidth = (zoom.w / 100) * imgWidth;
                const maskHeight = (zoom.h / 100) * imgHeight;

                return (
                  <motion.div
                    key={`spoiler-mask-${pIdx}-${rIdx}`}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute bg-[#0a0a0f] select-none overflow-hidden"
                    style={{
                      left: maskLeft - 1,
                      top: maskTop - 1,
                      width: maskWidth + 2,
                      height: maskHeight + 2,
                      zIndex: 20,
                      transition:
                        mode === "read" && !isPageChanging
                          ? "left 400ms cubic-bezier(0.25, 1, 0.5, 1), top 400ms cubic-bezier(0.25, 1, 0.5, 1), width 400ms cubic-bezier(0.25, 1, 0.5, 1), height 400ms cubic-bezier(0.25, 1, 0.5, 1)"
                          : "none",
                    }}
                  />
                );
              });
            })
          )}
        </AnimatePresence>

        {renderedDialogues}

        {/* ── FocusY Indicator line in Editor Mode ── */}
        {mode === "edit" && currentPanels.map((panel, pIdx) => {
          const isActivePanel = pIdx === activePanelIdx;
          return (
            <motion.div
              key={`focusy-${pIdx}-${panel.focusY}`}
              drag={isActivePanel ? "y" : false}
              dragMomentum={false}
              dragElastic={0}
              onDragEnd={(_, info) => handleFocusYDragEnd?.(info, pIdx)}
              className={`absolute left-0 right-0 h-0.5 border-t-2 border-dashed z-20 pointer-events-auto ${
                isActivePanel ? "border-red-400 cursor-row-resize" : "border-red-400/40"
              }`}
              style={{
                top: imgTop + (panel.focusY ?? 0.5) * imgHeight,
                y: 0,
              }}
            >
              <div
                className={`absolute right-4 -top-6 text-[#0a0a0f] font-mono text-xs px-2 py-0.5 rounded flex items-center gap-2 pointer-events-auto select-none shadow cursor-pointer transition-colors ${
                  isActivePanel ? "bg-red-400" : "bg-red-400/60 hover:bg-red-400/90"
                }`}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  setActivePanelIdx?.(pIdx);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePanelIdx?.(pIdx);
                }}
              >
                <span>Parada {pIdx + 1}: focusY {panel.focusY ?? 0.5}</span>
                {isActivePanel && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddBubble(pIdx);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-700 active:scale-95 transition-all"
                  >
                    + Globo
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Zoom & Pan Controls in Reader Mode */}
      {mode === "read" && (
        <ReaderZoomControls
          zoomScale={zoomScale}
          setZoomScale={setZoomScale}
          panOffset={panOffset}
          setPanOffset={setPanOffset}
        />
      )}

      {/* Tap instructions / Next Page overlay in Reader Mode */}
      {mode === "read" && zoomedOut && !showAllDialogues && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 24 }}
          className="absolute inset-0 flex flex-col items-center justify-end pb-8 sm:pb-12 gap-3 sm:gap-4 z-40 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(10,10,15,0.85) 0%, transparent 60%)" }}
        >
          {/* Review / Control Row */}
          <div className="flex gap-2 sm:gap-3 px-4 mb-1 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => {
                resetPage(pageIdx);
              }}
              className="px-3 py-1.5 sm:px-4 sm:py-2 border-2 border-white bg-black/60 text-white font-[var(--font-bangers)] tracking-wide hover:bg-white hover:text-black transition-colors rounded text-xs sm:text-sm uppercase shadow-lg"
            >
              🔄 Volver a ver
            </button>
            <button
              onClick={() => resetPage(pageIdx)}
              className="hidden" // Placeholder button kept for state alignment
            />
            <button
              onClick={() => handleReaderTap(null as any)} // advances or handles click
              className="hidden"
            />
          </div>

          {/* Navigation Row */}
          <div className="flex gap-2 sm:gap-3 flex-wrap justify-center px-4 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
            {pageIdx > 0 && (
              <button 
                onClick={() => resetPage(pageIdx - 1)} 
                className="btn btn-dark text-xs sm:text-base md:text-lg px-3 py-2 sm:px-5 sm:py-3 shadow-md"
              >
                ← <span className="hidden sm:inline">Página</span> Anterior
              </button>
            )}
            {!isLastPage ? (
              <button 
                onClick={() => resetPage(pageIdx + 1)} 
                className="btn btn-magenta text-sm sm:text-lg md:text-xl px-4 py-2 sm:px-6 sm:py-3.5 shadow-md"
              >
                Siguiente <span className="hidden sm:inline">Página</span> →
              </button>
            ) : nextChapter ? (
              <Link 
                href={`/chapters/${nextChapter.id}`} 
                className="btn btn-magenta text-sm sm:text-lg md:text-xl px-4 py-2 sm:px-6 sm:py-3.5 shadow-md"
              >
                {nextChapter.title} →
              </Link>
            ) : (
              <Link 
                href="/" 
                className="btn btn-magenta text-sm sm:text-lg md:text-xl px-4 py-2 sm:px-6 sm:py-3.5 shadow-md"
              >
                Fin del capítulo →
              </Link>
            )}
          </div>
        </motion.div>
      )}

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

      {/* Page Preload Overlay Mask — 1A: animated entrance + exit */}
      <AnimatePresence>
        {isPageChanging && (
          <motion.div
            key="page-preload-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#0a0a0f] z-[100] flex flex-col items-center justify-center pointer-events-auto cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-10 h-10 border-4 border-[#e8185a] border-t-transparent rounded-full animate-spin" />
              <span className="font-[var(--font-bangers)] text-[#e8185a] text-lg tracking-widest">
                CARGANDO PÁGINA...
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
