"use client";

import React from "react";
import Link from "next/link";

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
}: ReaderTopBarProps) {
  return (
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
          Pág {pageIdx + 1} / {totalPages}
        </div>
      </div>
    </div>
  );
}
