"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublishModal } from "./PublishModal";

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
  resetPage,
  onOpenHelp,
}: ReaderTopBarProps) {
  const [showPublish, setShowPublish] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
            <div className="flex items-center gap-0.5 border-2 border-[#0a0a0f] bg-zinc-50 p-0.5 shadow-[2px_2px_0_#0a0a0f] rounded mr-1">
              <span className="hidden sm:inline font-[var(--font-bangers)] text-xs text-zinc-500 px-1.5 uppercase tracking-wider">Texto:</span>
              <button
                onClick={() => setTextScale(0.85)}
                className={`w-7 h-6 flex items-center justify-center text-xs font-bold transition-all rounded font-mono ${
                  textScale === 0.85
                    ? "bg-[#0a0a0f] text-white"
                    : "hover:bg-zinc-200 text-[#0a0a0f]"
                }`}
                title="Texto Pequeño"
              >
                A-
              </button>
              <button
                onClick={() => setTextScale(1.0)}
                className={`w-7 h-6 flex items-center justify-center text-xs font-bold transition-all rounded font-mono ${
                  textScale === 1.0
                    ? "bg-[#0a0a0f] text-white"
                    : "hover:bg-zinc-200 text-[#0a0a0f]"
                }`}
                title="Texto Normal"
              >
                A
              </button>
              <button
                onClick={() => setTextScale(1.2)}
                className={`w-7 h-6 flex items-center justify-center text-xs font-bold transition-all rounded font-mono ${
                  textScale === 1.2
                    ? "bg-[#0a0a0f] text-white"
                    : "hover:bg-zinc-200 text-[#0a0a0f]"
                }`}
                title="Texto Grande"
              >
                A+
              </button>
              <button
                onClick={() => setTextScale(1.4)}
                className={`w-7 h-6 flex items-center justify-center text-xs font-bold transition-all rounded font-mono ${
                  textScale === 1.4
                    ? "bg-[#0a0a0f] text-white"
                    : "hover:bg-zinc-200 text-[#0a0a0f]"
                }`}
                title="Texto Extra Grande"
              >
                A++
              </button>
            </div>
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


