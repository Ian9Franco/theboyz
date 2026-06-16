"use client";

import React from "react";

interface ReaderZoomControlsProps {
  zoomScale: number;
  setZoomScale: React.Dispatch<React.SetStateAction<number>>;
  panOffset: { x: number; y: number };
  setPanOffset: (val: { x: number; y: number }) => void;
}

/**
 * ReaderZoomControls Component
 * Renders floating action controls for zooming and panning with comic style.
 * Hidden on mobile/tablet (pinch gestures preferred there).
 */
export function ReaderZoomControls({
  zoomScale,
  setZoomScale,
  panOffset,
  setPanOffset,
}: ReaderZoomControlsProps) {
  const handleReset = () => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div
      className="zoom-controls hidden md:flex absolute bottom-6 right-6 z-50 items-center gap-2 bg-white border-3 border-[#0a0a0f] p-1.5 shadow-[4px_4px_0_#0a0a0f]"
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => setZoomScale((prev) => Math.max(1, prev - 0.5))}
        disabled={zoomScale <= 1}
        className={`w-9 h-9 flex items-center justify-center border-2 border-[#0a0a0f] font-[var(--font-bangers)] text-lg transition-all ${
          zoomScale <= 1
            ? "bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed"
            : "bg-[#0a0a0f] hover:bg-zinc-800 text-white cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#000] shadow-[2px_2px_0_#000]"
        }`}
        title="Alejar Zoom (Rueda del mouse / Pellizcar)"
      >
        －
      </button>

      <span className="text-[#0a0a0f] font-[var(--font-bangers)] text-sm px-1 min-w-[36px] text-center select-none">
        {zoomScale.toFixed(1)}x
      </span>

      <button
        type="button"
        onClick={() => setZoomScale((prev) => Math.min(4, prev + 0.5))}
        disabled={zoomScale >= 4}
        className={`w-9 h-9 flex items-center justify-center border-2 border-[#0a0a0f] font-[var(--font-bangers)] text-lg transition-all ${
          zoomScale >= 4
            ? "bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed"
            : "bg-[#0a0a0f] hover:bg-zinc-800 text-white cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#000] shadow-[2px_2px_0_#000]"
        }`}
        title="Acercar Zoom (Rueda del mouse / Pellizcar)"
      >
        ＋
      </button>

      {(zoomScale > 1 || panOffset.x !== 0 || panOffset.y !== 0) && (
        <button
          type="button"
          onClick={handleReset}
          className="w-9 h-9 flex items-center justify-center bg-[#e8185a] hover:bg-[#c21046] text-white border-2 border-[#0a0a0f] font-[var(--font-bangers)] text-xs transition-colors cursor-pointer active:translate-x-0.5 active:translate-y-0.5 shadow-[2px_2px_0_#000]"
          title="Restablecer Vista (Doble click)"
        >
          🔄
        </button>
      )}
    </div>
  );
}
