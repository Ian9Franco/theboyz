"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export function Lightbox({ 
  src, alt, onClose, onNext, onPrev, hasNext, hasPrev 
}: { 
  src: string; alt: string; onClose: () => void; 
  onNext?: () => void; onPrev?: () => void; 
  hasNext?: boolean; hasPrev?: boolean; 
}) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const didDrag = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const MIN = 1, MAX = 5;

  // Lock body scroll & keyboard arrows/close
  useEffect(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { 
      if (e.key === "Escape") onClose(); 
      if (e.key === "ArrowRight" && hasNext) onNext?.();
      if (e.key === "ArrowLeft" && hasPrev) onPrev?.();
    };
    window.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handler); };
  }, [src, onClose, hasNext, hasPrev, onNext, onPrev]);

  // Wheel zoom
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale(prev => Math.min(MAX, Math.max(MIN, prev * (1 - e.deltaY * 0.002))));
  };

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    didDrag.current = false;
    setDragging(true);
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const dist = Math.hypot(e.clientX - dragStart.current.mx, e.clientY - dragStart.current.my);
    if (dist > 6) {
      didDrag.current = true;
    }
    let nextX = dragStart.current.px + e.clientX - dragStart.current.mx;
    let nextY = dragStart.current.py + e.clientY - dragStart.current.my;
    
    if (scale <= 1) {
      nextY = 0;
      if (nextX > 0 && !hasPrev) nextX *= 0.3;
      if (nextX < 0 && !hasNext) nextX *= 0.3;
    }
    setPos({ x: nextX, y: nextY });
  };
  
  const onDragEnd = () => {
    if (!dragging) return;
    setDragging(false);
    if (scale <= 1) {
      if (pos.x > 80 && hasPrev) {
        onPrev?.();
      } else if (pos.x < -80 && hasNext) {
        onNext?.();
      } else {
        setPos({ x: 0, y: 0 });
      }
    }
  };
  const onMouseUp = () => onDragEnd();

  // Touch handling
  const lastTouchDist = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      lastTouchDist.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    } else if (e.touches.length === 1) {
      didDrag.current = false;
      setDragging(true);
      dragStart.current = { mx: e.touches[0].clientX, my: e.touches[0].clientY, px: pos.x, py: pos.y };
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const d = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = (d - lastTouchDist.current) / lastTouchDist.current;
      lastTouchDist.current = d;
      setScale(prev => Math.min(MAX, Math.max(MIN, prev * (1 + delta * 0.8))));
    } else if (e.touches.length === 1 && dragging) {
      const dist = Math.hypot(e.touches[0].clientX - dragStart.current.mx, e.touches[0].clientY - dragStart.current.my);
      if (dist > 6) {
        didDrag.current = true;
      }
      let nextX = dragStart.current.px + e.touches[0].clientX - dragStart.current.mx;
      let nextY = dragStart.current.py + e.touches[0].clientY - dragStart.current.my;
      
      if (scale <= 1) {
        nextY = 0;
        if (nextX > 0 && !hasPrev) nextX *= 0.3;
        if (nextX < 0 && !hasNext) nextX *= 0.3;
      }
      setPos({ x: nextX, y: nextY });
    }
  };
  const onTouchEnd = () => onDragEnd();

  const handleZoomIn  = () => setScale(s => Math.min(MAX, +(s + 0.75).toFixed(2)));
  const handleZoomOut = () => setScale(s => { const n = Math.max(MIN, +(s - 0.75).toFixed(2)); if (n <= 1) setPos({ x: 0, y: 0 }); return n; });
  const handleReset   = () => { setScale(1); setPos({ x: 0, y: 0 }); };

  return (
    <AnimatePresence>
      {/* ─ Backdrop ─ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200]"
        style={{ background: "rgba(10,10,15,0.97)", cursor: "zoom-out" }}
        onClick={onClose}
      >
        {/* Controls */}
        <div
          className="absolute top-4 right-4 flex items-center gap-2 z-20"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 flex items-center justify-center font-[var(--font-bangers)] text-xl text-white border border-white/20 hover:border-[#e8185a] hover:text-[#e8185a] transition-colors bg-[#0a0a0f]/40"
          >−</button>
          <button
            onClick={handleReset}
            className="px-3 h-10 font-[var(--font-bangers)] text-sm text-white/60 border border-white/10 hover:border-white/30 hover:text-white transition-colors bg-[#0a0a0f]/40"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 flex items-center justify-center font-[var(--font-bangers)] text-xl text-white border border-white/20 hover:border-[#e8185a] hover:text-[#e8185a] transition-colors bg-[#0a0a0f]/40"
          >+</button>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white border border-white/20 hover:border-white/60 transition-colors ml-2 bg-[#0a0a0f]/40"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Navigation Arrows */}
        {hasPrev && (
          <button 
            onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-white/70 hover:text-white bg-[#0a0a0f]/60 hover:bg-[#e8185a] border border-white/20 rounded-full transition-all z-[250] shadow-lg backdrop-blur-sm"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
        )}
        {hasNext && (
          <button 
            onClick={(e) => { e.stopPropagation(); onNext?.(); }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-white/70 hover:text-white bg-[#0a0a0f]/60 hover:bg-[#e8185a] border border-white/20 rounded-full transition-all z-[250] shadow-lg backdrop-blur-sm"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        )}

        {/* Hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/25 text-sm font-[var(--font-bangers)] tracking-wider select-none pointer-events-none whitespace-nowrap hidden sm:block">
          Scroll para zoom · Arrastrá para mover · Click izq/der para navegar · Click afuera para cerrar
        </div>

        {/* Image Container */}
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          onWheel={onWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={(e) => {
            e.stopPropagation();

            if (scale > 1) return;
            if (didDrag.current) return;

            // If click was on the container backdrop itself (the empty area)
            if (e.target === e.currentTarget) {
              onClose();
              return;
            }

            // Otherwise, they clicked/tapped the image
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            const width = rect.width;
            const height = rect.height;

            // Top/bottom 10% margins close the lightbox
            if (clickY < height * 0.1 || clickY > height * 0.9) {
              onClose();
              return;
            }

            if (clickX < width * 0.4) {
              if (hasPrev) {
                onPrev?.();
              } else {
                onClose();
              }
            } else if (clickX > width * 0.6) {
              if (hasNext) {
                onNext?.();
              } else {
                onClose();
              }
            } else {
              // Clicked in the center 20%
              onClose();
            }
          }}
          style={{ cursor: scale > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in" }}
        >
          <img
            src={src}
            alt={alt}
            draggable={false}
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
              transformOrigin: "center center",
              transition: dragging ? "none" : "transform 0.15s ease",
              maxWidth: "95vw",
              maxHeight: "95vh",
              objectFit: "contain",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Chapter Page ── */
