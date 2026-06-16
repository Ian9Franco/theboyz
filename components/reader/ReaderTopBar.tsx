"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublishModal } from "./PublishModal";

const fontLabels: Record<number, string> = {
  0.85: "A- Chico",
  1.0: "A Normal",
  1.2: "A+ Grande",
  1.4: "A++ X-Grande",
};

interface ReaderTopBarProps {
  saga: {
    title: string;
    color: string;
  };
  chapter: {
    title: string;
  };
  mode: "edit" | "read";
  handleToggleMode: () => void;
  pageIdx: number;
  totalPages: number;
  textScale: number;
  setTextScale: (scale: number) => void;
  autoplay: boolean;
  setAutoplay: (autoplay: boolean) => void;
  resetPage: (idx: number) => void;
  onOpenHelp: () => void;
}

/**
 * ReaderTopBar Component
 * Renders the top navigation header for the comic reader and editor,
 * including return buttons, saga/chapter information, page indicators, and mode switches.
 */
export function ReaderTopBar({
  saga,
  chapter,
  mode,
  handleToggleMode,
  pageIdx,
  totalPages,
  textScale,
  setTextScale,
  autoplay,
  setAutoplay,
  resetPage,
  onOpenHelp,
}: ReaderTopBarProps) {
  const [showPublish, setShowPublish] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);

  return (
    <>
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

        {/* Mode Toggle Button and Page Indicator */}
        <div className="flex items-center gap-2">
          {mode === "read" && (
            <>
              {/* Font Size Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
                  className="font-[var(--font-bangers)] text-[#0a0a0f] text-xs sm:text-sm px-2.5 py-1.5 border-2 border-[#0a0a0f] bg-zinc-100 hover:bg-zinc-200 transition-colors flex items-center gap-1.5 shadow-[2px_2px_0_#0a0a0f] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#0a0a0f] select-none"
                  title="Seleccionar Tamaño de Texto"
                >
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider hidden md:inline">Texto:</span>
                  <span>{fontLabels[textScale] || "Normal"}</span>
                  <span className="text-[8px] select-none">▼</span>
                </button>
                {isFontDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-[60]" 
                      onClick={() => setIsFontDropdownOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-32 bg-white border-2 border-[#0a0a0f] shadow-[3px_3px_0_#0a0a0f] z-[70] py-1 rounded">
                      {[0.85, 1.0, 1.2, 1.4].map((scale) => {
                        const label = fontLabels[scale];
                        return (
                          <button
                            key={scale}
                            onClick={() => {
                              setTextScale(scale);
                              setIsFontDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 text-xs font-[var(--font-bangers)] tracking-wide border-b border-zinc-100 last:border-0 transition-colors ${
                              textScale === scale
                                ? "bg-[#0a0a0f] text-white"
                                : "text-[#0a0a0f] hover:bg-zinc-100"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* Autoplay Override Toggle Button */}
              <button
                onClick={() => setAutoplay(!autoplay)}
                className={`font-[var(--font-bangers)] text-xs sm:text-sm px-2.5 py-1.5 border-2 border-[#0a0a0f] shadow-[2px_2px_0_#0a0a0f] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#0a0a0f] transition-all flex items-center gap-1.5 ${
                  autoplay
                    ? "bg-emerald-400 hover:bg-emerald-500 text-[#0a0a0f]"
                    : "bg-rose-500 hover:bg-rose-600 text-white"
                }`}
                title={autoplay ? "Autoplay Activo - Pausar" : "Autoplay Desactivado - Activar"}
              >
                <span>{autoplay ? "⏱️ Auto: Sí" : "⏱️ Auto: No"}</span>
              </button>
            </>
          )}
          {mode === "edit" && (
            <button
              onClick={() => setShowPublish(true)}
              className="font-[var(--font-bangers)] text-sm px-4 py-2 border-2 border-[#0a0a0f] transition-all bg-emerald-400 text-[#0a0a0f] shadow-[2px_2px_0_#0a0a0f] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#0a0a0f]"
            >
              🚀 Publicar
            </button>
          )}
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
          
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="font-[var(--font-bangers)] text-[#0a0a0f] text-sm px-3 py-1.5 border-2 border-[#0a0a0f] bg-zinc-100 hover:bg-zinc-200 transition-colors flex items-center gap-1.5 shadow-[2px_2px_0_#0a0a0f] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#0a0a0f]"
              title="Seleccionar Página"
            >
              Pág {pageIdx + 1} / {totalPages} <span className="text-[10px] select-none">▼</span>
            </button>
            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-[60]" 
                  onClick={() => setIsDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-36 max-h-64 overflow-y-auto bg-white border-2 border-[#0a0a0f] shadow-[4px_4px_0_#0a0a0f] z-[70] py-1 rounded">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        resetPage(i);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-[var(--font-bangers)] tracking-wide border-b border-zinc-100 last:border-0 transition-colors ${
                        pageIdx === i
                          ? "bg-[#0a0a0f] text-white"
                          : "text-[#0a0a0f] hover:bg-zinc-100"
                      }`}
                    >
                      Pág {i + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={onOpenHelp}
            className="w-8 h-8 flex items-center justify-center bg-white hover:bg-zinc-100 text-[#0a0a0f] border-2 border-[#0a0a0f] font-[var(--font-bangers)] text-sm shadow-[2px_2px_0_#0a0a0f] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#0a0a0f] transition-all"
            title="Ver Guía de Lectura"
          >
            ❓
          </button>
        </div>
      </div>
      <PublishModal isOpen={showPublish} onClose={() => setShowPublish(false)} />
    </>
  );
}


