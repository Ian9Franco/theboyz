"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PublishModal } from "./PublishModal";

const fontLabels: Record<number, string> = {
  0.85: "A- Chico",
  1.0: "A Normal",
  1.2: "A+ Grande",
  1.4: "A++ X-Grande",
};

const speedLabels: Record<number, string> = {
  0.5: "🐢 Lento",
  1.0: "⚡ Normal",
  1.5: "⚡⚡ Rápido",
};

interface ReaderTopBarProps {
  saga: { title: string; color: string };
  chapter: { title: string };
  mode: "edit" | "read";
  handleToggleMode: () => void;
  pageIdx: number;
  totalPages: number;
  textScale: number;
  setTextScale: (scale: number) => void;
  autoplay: boolean;
  setAutoplay: (autoplay: boolean) => void;
  speedMultiplier: number;
  setSpeedMultiplier: (value: number) => void;
  resetPage: (idx: number) => void;
  onOpenHelp: () => void;
  focusDialogue?: boolean;
  setFocusDialogue?: (value: boolean) => void;
  focusPanel?: boolean;
  setFocusPanel?: (value: boolean) => void;
}

/**
 * ReaderTopBar Component
 * Renders the top navigation header for the comic reader and editor.
 * In read mode: dark glassmorphism style with saga accent color.
 * In edit mode: bright white pop-art style for editor clarity.
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
  speedMultiplier,
  setSpeedMultiplier,
  resetPage,
  onOpenHelp,
  focusDialogue = true,
  setFocusDialogue,
  focusPanel = true,
  setFocusPanel,
}: ReaderTopBarProps) {
  const [showPublish, setShowPublish] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // ── Keyboard shortcuts (read mode only) ──────────────────────────────────────
  useEffect(() => {
    if (mode !== "read") return;
    const handler = (e: KeyboardEvent) => {
      // Ignore when typing in an input field
      if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") return;
      if (e.key === "?" || e.key === "h") onOpenHelp();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mode, onOpenHelp]);

  // ── Progress bar width ────────────────────────────────────────────────────────
  const progressPct = totalPages > 1 ? ((pageIdx) / (totalPages - 1)) * 100 : 0;

  // ── Styles based on mode ──────────────────────────────────────────────────────
  const isReadMode = mode === "read";
  const barBg = isReadMode
    ? "rgba(10, 10, 15, 0.88)"
    : "#ffffff";
  const barBorder = isReadMode
    ? `1px solid rgba(255,255,255,0.07)`
    : "none";
  const barShadow = isReadMode
    ? `0 2px 0 rgba(0,0,0,0.5), 0 4px 24px rgba(0,0,0,0.4)`
    : "0 3px 0 #0a0a0f";
  const textColor = isReadMode ? "#ffffff" : "#0a0a0f";

  // Button style helpers
  const btnBase = isReadMode
    ? "font-[var(--font-bangers)] text-xs sm:text-sm px-2.5 py-1.5 sm:px-3.5 sm:py-2 border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-all rounded-sm backdrop-blur-sm select-none"
    : "font-[var(--font-bangers)] text-xs sm:text-sm px-2.5 py-1.5 sm:px-4 sm:py-2 border-2 border-[#0a0a0f] bg-zinc-100 hover:bg-zinc-200 transition-colors flex items-center gap-1 shadow-[2px_2px_0_#0a0a0f] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#0a0a0f] select-none";

  const dropdownBg = isReadMode
    ? "bg-[#111118] border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.7)]"
    : "bg-white border-2 border-[#0a0a0f] shadow-[4px_4px_0_#0a0a0f]";

  return (
    <>
      <div
        className="shrink-0 z-[200] flex flex-col"
        style={{
          background: barBg,
          borderBottom: barBorder,
          boxShadow: barShadow,
          backdropFilter: isReadMode ? "blur(16px)" : "none",
          WebkitBackdropFilter: isReadMode ? "blur(16px)" : "none",
        }}
      >
        {/* Main bar row */}
        <div className="flex items-center justify-between px-2 sm:px-4 h-14">
          {/* Left — Back + saga info */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Link
              href="/"
              className={
                isReadMode
                  ? "font-[var(--font-bangers)] text-xs sm:text-sm px-2.5 py-1.5 border border-white/25 bg-white/10 hover:bg-white/20 text-white transition-all rounded-sm backdrop-blur-sm"
                  : "btn btn-dark text-xs sm:text-base px-2.5 py-1.5 sm:px-4 sm:py-2"
              }
            >
              ← Volver
            </Link>

            <div className="hidden md:flex items-center gap-2">
              <span
                className="tag text-xs"
                style={{ background: saga.color, color: "white", border: "none", boxShadow: "none" }}
              >
                {saga.title}
              </span>
              <span
                className="font-[var(--font-bangers)] text-base tracking-wider"
                style={{ color: textColor }}
              >
                {chapter.title}
              </span>
            </div>
          </div>

          {/* Right — controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">

            {/* Read mode settings */}
            {mode === "read" && (
              <div className="relative">
                <button
                  onClick={() => { setIsSettingsOpen(!isSettingsOpen); setIsDropdownOpen(false); }}
                  className={`${btnBase} flex items-center gap-1`}
                  title="Configuración de Lectura"
                >
                  <span>⚙️</span>
                  <span className="hidden sm:inline">Ajustes</span>
                  <span className="text-[8px] opacity-60">▼</span>
                </button>

                {isSettingsOpen && (
                  <>
                    <div className="fixed inset-0 z-[60]" onClick={() => setIsSettingsOpen(false)} />
                    <div className={`absolute left-0 mt-2 w-60 z-[70] p-3 rounded-md flex flex-col gap-3 ${dropdownBg}`}>

                      {/* Font size */}
                      <div>
                        <span className={`block font-[var(--font-bangers)] text-[10px] uppercase tracking-wider mb-1.5 ${isReadMode ? "text-zinc-400" : "text-zinc-500"}`}>
                          Tamaño de letra:
                        </span>
                        <div className={`flex gap-1 p-0.5 rounded ${isReadMode ? "bg-white/10" : "border border-[#0a0a0f] bg-zinc-50"}`}>
                          {[0.85, 1.0, 1.2, 1.4].map((scale) => {
                            const label = scale === 0.85 ? "A-" : scale === 1.0 ? "A" : scale === 1.2 ? "A+" : "A++";
                            return (
                              <button
                                key={scale}
                                onClick={() => setTextScale(scale)}
                                className={`flex-1 h-6 flex items-center justify-center text-xs font-bold transition-all rounded font-mono ${
                                  textScale === scale
                                    ? (isReadMode ? "bg-white text-[#0a0a0f]" : "bg-[#0a0a0f] text-white")
                                    : (isReadMode ? "text-white/70 hover:bg-white/15" : "hover:bg-zinc-200 text-[#0a0a0f]")
                                }`}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Dialogue speed */}
                      <div>
                        <span className={`block font-[var(--font-bangers)] text-[10px] uppercase tracking-wider mb-1.5 ${isReadMode ? "text-zinc-400" : "text-zinc-500"}`}>
                          Velocidad de diálogos:
                        </span>
                        <div className={`flex gap-1 p-0.5 rounded ${isReadMode ? "bg-white/10" : "border border-[#0a0a0f] bg-zinc-50"}`}>
                          {[0.5, 1.0, 1.5].map((speed) => (
                            <button
                              key={speed}
                              onClick={() => setSpeedMultiplier(speed)}
                              className={`flex-1 h-6 flex items-center justify-center text-[10px] font-bold transition-all rounded ${
                                speedMultiplier === speed
                                  ? (isReadMode ? "bg-white text-[#0a0a0f]" : "bg-[#0a0a0f] text-white")
                                  : (isReadMode ? "text-white/70 hover:bg-white/15" : "hover:bg-zinc-200 text-[#0a0a0f]")
                              }`}
                            >
                              {speed === 0.5 ? "🐢" : speed === 1.0 ? "⚡" : "⚡⚡"}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Autoplay */}
                      <div className={`flex items-center justify-between pt-2 ${isReadMode ? "border-t border-white/10" : "border-t border-zinc-100"}`}>
                        <span className={`font-[var(--font-bangers)] text-[10px] uppercase tracking-wider ${isReadMode ? "text-zinc-400" : "text-zinc-500"}`}>
                          Auto-Avance:
                        </span>
                        <button
                          onClick={() => setAutoplay(!autoplay)}
                          className={`font-[var(--font-bangers)] text-xs px-2.5 py-1 border transition-all rounded-sm ${
                            autoplay
                              ? "bg-emerald-500 border-emerald-400 text-white"
                              : "bg-rose-500 border-rose-400 text-white"
                          }`}
                        >
                          {autoplay ? "✓ Sí" : "✗ No"}
                        </button>
                      </div>

                      {/* Focus Panel */}
                      {setFocusPanel && (
                        <div className={`flex items-center justify-between pt-2 ${isReadMode ? "border-t border-white/10" : "border-t border-zinc-100"}`}>
                          <span className={`font-[var(--font-bangers)] text-[10px] uppercase tracking-wider ${isReadMode ? "text-zinc-400" : "text-zinc-500"}`}>
                            Enfoque Viñeta:
                          </span>
                          <button
                            onClick={() => setFocusPanel(!focusPanel)}
                            className={`font-[var(--font-bangers)] text-xs px-2.5 py-1 border transition-all rounded-sm ${
                              focusPanel
                                ? "bg-emerald-500 border-emerald-400 text-white"
                                : "bg-rose-500 border-rose-400 text-white"
                            }`}
                          >
                            {focusPanel ? "✓ Sí" : "✗ No"}
                          </button>
                        </div>
                      )}

                      {/* Focus Dialogue */}
                      {setFocusDialogue && (
                        <div className={`flex items-center justify-between pt-2 ${isReadMode ? "border-t border-white/10" : "border-t border-zinc-100"}`}>
                          <span className={`font-[var(--font-bangers)] text-[10px] uppercase tracking-wider ${isReadMode ? "text-zinc-400" : "text-zinc-500"}`}>
                            Foco Diálogos:
                          </span>
                          <button
                            onClick={() => setFocusDialogue(!focusDialogue)}
                            className={`font-[var(--font-bangers)] text-xs px-2.5 py-1 border transition-all rounded-sm ${
                              focusDialogue
                                ? "bg-emerald-500 border-emerald-400 text-white"
                                : "bg-rose-500 border-rose-400 text-white"
                            }`}
                          >
                            {focusDialogue ? "✓ Sí" : "✗ No"}
                          </button>
                        </div>
                      )}

                      {/* Keyboard shortcuts hint */}
                      <div className={`pt-2 ${isReadMode ? "border-t border-white/10" : "border-t border-zinc-100"}`}>
                        <p className={`font-mono text-[9px] ${isReadMode ? "text-zinc-500" : "text-zinc-400"} leading-relaxed`}>
                          <strong>Space / →</strong> Avanzar &nbsp;·&nbsp; <strong>←</strong> Retroceder<br />
                          <strong>A</strong> Autoplay &nbsp;·&nbsp; <strong>?</strong> Ayuda
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Editor publish button */}
            {mode === "edit" && (
              <button
                onClick={() => setShowPublish(true)}
                className="font-[var(--font-bangers)] text-xs sm:text-sm px-2.5 py-1.5 sm:px-4 sm:py-2 border-2 border-[#0a0a0f] transition-all bg-emerald-400 text-[#0a0a0f] shadow-[2px_2px_0_#0a0a0f] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#0a0a0f]"
              >
                🚀 Publicar
              </button>
            )}

            {/* Mode toggle */}
            <button
              onClick={handleToggleMode}
              className={`font-[var(--font-bangers)] text-xs sm:text-sm px-2.5 py-1.5 sm:px-4 sm:py-2 transition-all ${
                isReadMode
                  ? "border border-white/20 bg-white/10 hover:bg-white/20 text-white rounded-sm"
                  : mode === "edit"
                  ? "bg-[#f5e642] text-[#0a0a0f] border-2 border-[#0a0a0f] shadow-[2px_2px_0_#0a0a0f]"
                  : "bg-[#0a0a0f] text-white border-2 border-[#0a0a0f] hover:bg-zinc-800"
              }`}
            >
              {mode === "edit" ? "🛠️ Editor" : "📖 Lectura"}
            </button>

            {/* Page selector */}
            <div className="relative">
              <button
                onClick={() => { setIsDropdownOpen(!isDropdownOpen); setIsSettingsOpen(false); }}
                className={`${btnBase} flex items-center gap-1`}
                title="Seleccionar Página"
              >
                Pág {pageIdx + 1}/{totalPages}
                <span className="text-[8px] opacity-60">▼</span>
              </button>

              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-[60]" onClick={() => setIsDropdownOpen(false)} />
                  <div className={`absolute right-0 mt-2 w-32 max-h-64 overflow-y-auto z-[70] py-1 rounded-md no-scrollbar ${dropdownBg}`}>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => { resetPage(i); setIsDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-[var(--font-bangers)] tracking-wide border-b last:border-0 transition-colors ${
                          pageIdx === i
                            ? (isReadMode ? "bg-white/20 text-white border-white/10" : "bg-[#0a0a0f] text-white border-zinc-200")
                            : (isReadMode ? "text-zinc-300 hover:bg-white/10 border-white/5" : "text-[#0a0a0f] hover:bg-zinc-100 border-zinc-100")
                        }`}
                      >
                        Pág {i + 1}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Help button */}
            <button
              onClick={onOpenHelp}
              className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-[var(--font-bangers)] text-xs sm:text-sm transition-all ${
                isReadMode
                  ? "border border-white/20 bg-white/10 hover:bg-white/20 text-white rounded-sm"
                  : "bg-white hover:bg-zinc-100 text-[#0a0a0f] border-2 border-[#0a0a0f] shadow-[2px_2px_0_#0a0a0f] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#0a0a0f]"
              }`}
              title="Ver Guía de Lectura"
            >
              ❓
            </button>
          </div>
        </div>

        {/* Progress bar — 7D: thin saga-colored reading progress bar */}
        {mode === "read" && totalPages > 1 && (
          <div className="h-[3px] w-full relative" style={{ background: "rgba(255,255,255,0.06)" }}>
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ background: saga.color }}
              animate={{ width: `${progressPct}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        )}
      </div>

      <PublishModal isOpen={showPublish} onClose={() => setShowPublish(false)} />
    </>
  );
}
