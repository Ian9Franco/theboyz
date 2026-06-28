"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getComicPageUrl } from "./readerUtils";

interface ReaderPagesSidebarProps {
  pages: string[];
  pageIdx: number;
  resetPage: (idx: number) => void;
  saga: { color: string };
  totalPages: number;
}

/**
 * ReaderPagesSidebar
 *
 * A vertical left sidebar displaying thumbnail previews of every page,
 * inspired by PDF-reader navigation panels.
 * Only rendered in read mode. Clicking a thumbnail jumps directly to that page.
 *
 * Design:
 * - Collapsible drawer (starts closed on mobile, open on desktop)
 * - Absolute overlay on mobile (under 768px) to prevent layout squishing
 * - Dark glassmorphism style
 * - Saga-accent highlight for the active page
 * - Smooth scroll-into-view when the active page changes
 */
export function ReaderPagesSidebar({
  pages,
  pageIdx,
  resetPage,
  saga,
  totalPages,
}: ReaderPagesSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  // Responsive default: start closed on mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOpen(window.innerWidth >= 768);
    }
  }, []);

  // Scroll the active thumbnail into view whenever the current page changes
  useEffect(() => {
    if (activeItemRef.current && listRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [pageIdx]);

  return (
    <AnimatePresence initial={false}>
      {!isOpen ? (
        <motion.div
          key="pages-sidebar-collapsed-btn"
          initial={{ x: -32, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -32, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-[160]"
        >
          <button
            onClick={() => setIsOpen(true)}
            className="w-8 h-12 flex items-center justify-center bg-[#0a0a0f]/80 backdrop-blur-md border-y border-r border-white/20 text-white font-bold text-sm hover:bg-[#0a0a0f] hover:translate-x-0.5 cursor-pointer rounded-r-md transition-all shadow-[2px_0_10px_rgba(0,0,0,0.5)]"
          >
            ▶
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="reader-pages-sidebar"
          initial={{ x: -88, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -88, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute md:relative left-0 top-0 h-full overflow-hidden z-[160] md:z-[10] flex flex-col shrink-0 shadow-2xl md:shadow-none"
          style={{
            width: 88,
            background: "rgba(10, 10, 15, 0.92)",
            borderRight: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {/* Header label & close button */}
          <div
            className="shrink-0 flex items-center justify-between px-2.5 h-9 border-b"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            <span
              className="font-[var(--font-bangers)] text-[10px] tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Páginas
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-white/50 hover:text-white transition-colors cursor-pointer select-none"
              title="Ocultar"
            >
              ◀
            </button>
          </div>

          {/* Scrollable thumbnails list */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto overflow-x-hidden py-2 no-scrollbar"
          >
            {pages.map((pageUrl, i) => {
              const isActive = i === pageIdx;
              const thumbSrc = getComicPageUrl(pageUrl);

              return (
                <button
                  key={i}
                  ref={isActive ? activeItemRef : undefined}
                  onClick={() => resetPage(i)}
                  className="w-full flex flex-col items-center gap-1 px-2 py-1.5 transition-all group select-none"
                  style={{ background: "transparent", border: "none", cursor: "pointer" }}
                  title={`Página ${i + 1}`}
                >
                  {/* Thumbnail frame */}
                  <div
                    className="w-full overflow-hidden transition-all duration-200"
                    style={{
                      borderRadius: 3,
                      border: isActive
                        ? `2px solid ${saga.color}`
                        : "2px solid rgba(255,255,255,0.1)",
                      boxShadow: isActive
                        ? `0 0 10px ${saga.color}55, 0 2px 8px rgba(0,0,0,0.6)`
                        : "0 2px 6px rgba(0,0,0,0.5)",
                      aspectRatio: "2/3",
                      position: "relative",
                      background: "#111118",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumbSrc}
                      alt={`Página ${i + 1}`}
                      draggable={false}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        opacity: isActive ? 1 : 0.7,
                        transition: "opacity 0.2s ease",
                      }}
                    />

                    {/* Active page glow overlay */}
                    {isActive && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `linear-gradient(135deg, ${saga.color}15 0%, transparent 60%)`,
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </div>

                  {/* Page number label */}
                  <span
                    className="font-[var(--font-bangers)] text-[9px] tracking-wider transition-colors"
                    style={{
                      color: isActive ? saga.color : "rgba(255,255,255,0.3)",
                      fontWeight: isActive ? 700 : 400,
                    }}
                  >
                    {i + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Footer: current / total counter */}
          <div
            className="shrink-0 flex items-center justify-center h-8 border-t"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            <span
              className="font-[var(--font-bangers)] text-[10px] tracking-widest"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {pageIdx + 1}/{totalPages}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

