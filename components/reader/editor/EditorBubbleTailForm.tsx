"use client";

import React from "react";
import type { DialogueLine } from "../DialogueBubble";

interface EditorBubbleTailFormProps {
  bubble: DialogueLine;
  activePanelIdx: number;
  activeBubbleIdx: number;
  handleUpdateBubble: (pIdx: number, bIdx: number, updates: Partial<DialogueLine>) => void;
}

export function EditorBubbleTailForm({
  bubble,
  activePanelIdx,
  activeBubbleIdx,
  handleUpdateBubble,
}: EditorBubbleTailFormProps) {
  const hasAnchor = bubble.tailX !== undefined;
  const isHidden = bubble.tail === "none";

  // 8-direction tail anchor presets [arrow, ΔX%, ΔY%]
  const tailPresets: [string, number, number][] = [
    ["↖", -12, -12], ["↑", 0, -15], ["↗", 12, -12],
    ["←", -18, 0],                  ["→", 18, 0],
    ["↙", -12, 12],  ["↓", 0, 15],  ["↘", 12, 12],
  ];

  if (bubble.style === "caption") return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1.5 p-2.5 bg-[#0a0a0f] border border-white/10 rounded">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold text-zinc-300">🗨️ Cola del globo</label>
          <button
            type="button"
            onClick={() =>
              handleUpdateBubble(
                activePanelIdx,
                activeBubbleIdx,
                isHidden
                  ? { tail: "bottom-left", tailX: undefined, tailY: undefined }
                  : { tail: "none", tailX: undefined, tailY: undefined }
              )
            }
            className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-all cursor-pointer ${
              isHidden
                ? "bg-zinc-800 text-zinc-400 border-white/10 hover:bg-zinc-700"
                : "bg-red-950/40 text-red-400 border-red-900/40 hover:bg-red-900/30 hover:text-red-300"
            }`}
          >
            {isHidden ? "Sin cola" : "✓ Visible — ocultar"}
          </button>
        </div>
        {!isHidden && (
          <>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() =>
                  handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                    tailX: undefined,
                    tailY: undefined,
                    tail: bubble.tail === "none" ? "bottom-left" : bubble.tail,
                  })
                }
                className={`flex-1 py-1 text-[10px] font-bold rounded border transition-all cursor-pointer ${
                  !hasAnchor
                    ? "bg-[#e8185a] text-white border-[#e8185a]"
                    : "bg-[#161622] text-zinc-300 border-white/10 hover:border-zinc-550"
                }`}
              >
                🔺 CSS (fija)
              </button>
              <button
                type="button"
                onClick={() =>
                  handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                    tailX: Math.max(-20, Math.min(120, bubble.posX ?? 50)),
                    tailY: Math.max(-20, Math.min(120, (bubble.posY ?? 50) + 15)),
                  })
                }
                className={`flex-1 py-1 text-[10px] font-bold rounded border transition-all cursor-pointer ${
                  hasAnchor
                    ? "bg-[#e8185a] text-white border-[#e8185a]"
                    : "bg-[#161622] text-zinc-300 border-white/10 hover:border-zinc-550"
                }`}
              >
                🔵 SVG (elástica)
              </button>
            </div>

            {!hasAnchor && (
              <select
                value={bubble.tail || "bottom-left"}
                onChange={(e) =>
                  handleUpdateBubble(activePanelIdx, activeBubbleIdx, { tail: e.target.value as any })
                }
                className="w-full border border-white/10 p-1.5 text-[11px] font-mono rounded bg-[#161622] text-white focus:outline-none focus:ring-1 focus:ring-[#e8185a] cursor-pointer"
              >
                <option value="none">❌ Sin cola</option>
                <option value="bottom-left">↙ Abajo-Izquierda</option>
                <option value="bottom-right">↘ Abajo-Derecha</option>
                <option value="top-left">↖ Arriba-Izquierda</option>
                <option value="top-right">↗ Arriba-Derecha</option>
                <option value="left">← Izquierda</option>
                <option value="right">→ Derecha</option>
              </select>
            )}

            {hasAnchor && (
              <>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-zinc-400 font-medium">Posición rápida del ancla:</span>
                  <div className="grid grid-cols-3 gap-1">
                    {tailPresets.map(([label, dx, dy]) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() =>
                          handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                            tailX: Math.max(-20, Math.min(120, (bubble.posX ?? 50) + dx)),
                            tailY: Math.max(-20, Math.min(120, (bubble.posY ?? 50) + dy)),
                          })
                        }
                        className="py-1 text-sm font-bold bg-[#161622] hover:bg-[#202030] border border-white/10 hover:border-zinc-500 rounded transition-all active:scale-95 cursor-pointer text-white"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[9px] text-zinc-500 leading-tight">
                    Arrastrá el punto azul en el lienzo para ajuste fino.
                  </p>
                </div>
                <div className="text-[10px] font-mono text-zinc-300 bg-[#161622] border border-white/10 rounded px-2 py-1 flex items-center justify-between">
                  <span>Ancla: X {bubble.tailX}% Y {bubble.tailY}%</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                        tailX: undefined,
                        tailY: undefined,
                      })
                    }
                    className="text-red-500 hover:text-red-400 hover:underline text-[9px] ml-2 cursor-pointer"
                  >
                    quitar
                  </button>
                </div>

                {/* Elastic Tail Styling */}
                <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-white/10">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-zinc-350">
                      <span>Grosor Base: {bubble.tailWidth ?? "Auto"}</span>
                      {bubble.tailWidth !== undefined && (
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateBubble(activePanelIdx, activeBubbleIdx, { tailWidth: undefined })
                          }
                          className="text-[9px] text-red-500 hover:text-red-400 hover:underline cursor-pointer"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="120"
                      step="2"
                      value={bubble.tailWidth ?? 28}
                      onChange={(e) =>
                        handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                          tailWidth: parseInt(e.target.value),
                        })
                      }
                      className="w-full accent-[#e8185a] cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-zinc-350">
                      <span>Curvatura: {bubble.tailCurvature ?? 0}</span>
                      {bubble.tailCurvature !== undefined && (
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                              tailCurvature: undefined,
                            })
                          }
                          className="text-[9px] text-red-500 hover:text-red-400 hover:underline cursor-pointer"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      step="2"
                      value={bubble.tailCurvature ?? 0}
                      onChange={(e) =>
                        handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                          tailCurvature: parseInt(e.target.value),
                        })
                      }
                      className="w-full accent-[#e8185a] cursor-pointer"
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
