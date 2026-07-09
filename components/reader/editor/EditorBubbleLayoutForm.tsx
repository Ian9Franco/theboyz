"use client";

import React from "react";
import type { DialogueLine } from "../DialogueBubble";
import type { PanelStop as PanelConfig } from "../audioPlayer";

interface EditorBubbleLayoutFormProps {
  bubble: DialogueLine;
  activePanelIdx: number;
  activeBubbleIdx: number;
  currentPanels: PanelConfig[];
  handleUpdateBubble: (pIdx: number, bIdx: number, updates: Partial<DialogueLine>) => void;
  handleMoveBubbleToPanel?: (fromPanelIdx: number, bubbleIdx: number, toPanelIdx: number) => void;
}

export function EditorBubbleLayoutForm({
  bubble,
  activePanelIdx,
  activeBubbleIdx,
  currentPanels,
  handleUpdateBubble,
  handleMoveBubbleToPanel,
}: EditorBubbleLayoutFormProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const isCinematic = bubble.style === "cinematic";
  const widthMin = isCinematic ? 220 : 50;
  const widthMax = isCinematic ? 1200 : 600;
  const widthDefault = isCinematic ? 900 : 250;
  const widthStep = isCinematic ? 10 : 5;
  const fontMin = isCinematic ? 24 : 8;
  const fontMax = isCinematic ? 160 : 36;
  const fontDefault = isCinematic ? 76 : 14;
  const stripInlineFormatting = (text: string) =>
    text
      .replace(/\*\*/g, "")
      .replace(/\[color:[^\]]+\]/g, "")
      .replace(/\[\/color\]/g, "");

  const insertFormatting = (tagStart: string, tagEnd: string, textValue: string, onUpdate: (val: string) => void, textareaEl: HTMLTextAreaElement | null) => {
    if (!textareaEl) {
      onUpdate(textValue + tagStart + tagEnd);
      return;
    }
    const start = textareaEl.selectionStart;
    const end = textareaEl.selectionEnd;
    const selectedText = textValue.substring(start, end);
    const before = textValue.substring(0, start);
    const after = textValue.substring(end);
    const newText = before + tagStart + selectedText + tagEnd + after;
    onUpdate(newText);

    setTimeout(() => {
      textareaEl.focus();
      const newCursorPos = start + tagStart.length + selectedText.length + tagEnd.length;
      textareaEl.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };
  return (
    <div className="flex flex-col gap-3">
      {/* Bubble Dimension Sliders */}
      <div className="flex flex-col gap-3 p-3 bg-[#0a0a0f] border border-white/10 rounded">
        {/* Max Width */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-300">
            <span>Ancho Máx: {bubble.width ? `${bubble.width}px` : "Defecto"}</span>
            {bubble.width !== undefined && (
              <button
                type="button"
                onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { width: undefined })}
                className="text-[10px] text-red-500 hover:text-red-400 hover:underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
          <input
            type="range"
            min={widthMin}
            max={widthMax}
            step={widthStep}
            value={bubble.width || widthDefault}
            onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { width: parseInt(e.target.value) })}
            className="w-full accent-[#e8185a] cursor-pointer"
          />
        </div>

        {/* Font Size */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-300">
            <span>Tamaño Letra: {bubble.fontSize ? `${bubble.fontSize}px` : "Defecto"}</span>
            {bubble.fontSize !== undefined && (
              <button
                type="button"
                onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { fontSize: undefined })}
                className="text-[10px] text-red-500 hover:text-red-400 hover:underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
          <input
            type="range"
            min={fontMin}
            max={fontMax}
            step="1"
            value={bubble.fontSize || fontDefault}
            onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { fontSize: parseInt(e.target.value) })}
            className="w-full accent-[#e8185a] cursor-pointer"
          />
        </div>

        {/* Border Radius */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-300">
            <span>
              Curvatura Borde:{" "}
              {bubble.borderRadius !== undefined ? `${bubble.borderRadius}px` : "Defecto"}
            </span>
            {bubble.borderRadius !== undefined && (
              <button
                type="button"
                onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { borderRadius: undefined })}
                className="text-[10px] text-red-500 hover:text-red-400 hover:underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
          <input
            type="range"
            min="0"
            max="40"
            step="1"
            value={bubble.borderRadius ?? 16}
            onChange={(e) =>
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, { borderRadius: parseInt(e.target.value) })
            }
            className="w-full accent-[#e8185a] cursor-pointer"
          />
        </div>
      </div>

      {/* Dialogue Text Area */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-zinc-300">Texto:</label>
          <div className="flex items-center gap-1.5">
            {isCinematic && (
              <button
                type="button"
                onClick={() =>
                  handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                    text: stripInlineFormatting(bubble.text || ""),
                  })
                }
                className="font-[var(--font-bangers)] text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/10 px-2 py-0.5 rounded transition-all cursor-pointer"
              >
                Limpiar formato
              </button>
            )}
            <button
              type="button"
              onClick={async () => {
                try {
                  const text = await navigator.clipboard.readText();
                  if (text) {
                    handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                      text: isCinematic ? stripInlineFormatting(text) : text,
                    });
                  }
                } catch (err) {
                  console.error("Error al leer el portapapeles:", err);
                }
              }}
              className="font-[var(--font-bangers)] text-[10px] bg-blue-950/40 hover:bg-blue-900/30 text-blue-300 border border-blue-900/40 px-2 py-0.5 rounded transition-all cursor-pointer"
            >
              ⚡ Auto (Pegar)
            </button>
          </div>
        </div>
        {/* Formatting Toolbar */}
        {!isCinematic && (
          <div className="flex items-center gap-1 bg-[#0a0a0f] border border-white/10 rounded-t p-1">
            <button
              type="button"
              onClick={() => insertFormatting("**", "**", bubble.text || "", (txt) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { text: txt }), textareaRef.current)}
              className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded text-xs active:scale-95 transition-all cursor-pointer border border-white/5"
              title="Negrita"
            >
              B
            </button>

            <div className="h-4 w-px bg-white/10 mx-1" />

            <span className="text-[10px] text-zinc-500 font-mono mr-1">Color:</span>
            {[
              { hex: "#e8185a", name: "Rosa" },
              { hex: "#00f0ff", name: "Cian" },
              { hex: "#10b981", name: "Verde" },
              { hex: "#f5e642", name: "Amarillo" },
              { hex: "#8b5cf6", name: "Violeta" },
              { hex: "#f97316", name: "Naranja" },
              { hex: "#ffffff", name: "Blanco" },
              { hex: "#0a0a0f", name: "Negro" },
            ].map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => insertFormatting(`[color:${c.hex}]`, "[/color]", bubble.text || "", (txt) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { text: txt }), textareaRef.current)}
                className="w-3.5 h-3.5 rounded-full border border-white/20 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}
        <textarea
          ref={textareaRef}
          value={isCinematic ? stripInlineFormatting(bubble.text) : bubble.text}
          onChange={(e) =>
            handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
              text: isCinematic ? stripInlineFormatting(e.target.value) : e.target.value,
            })
          }
          className={`w-full h-20 border border-white/10 p-2 text-xs font-sans bg-[#0a0a0f] text-white resize-none focus:outline-none focus:ring-1 focus:ring-[#e8185a] ${
            isCinematic ? "rounded" : "border-t-0 rounded-b"
          }`}
          placeholder={isCinematic ? "Texto grande para la escena..." : "Escribí el diálogo..."}
        />
      </div>

      {/* Position Margins Presets */}
      <div className="flex flex-col gap-1 mt-1">
        <label className="text-xs font-bold text-zinc-300">Posición Rápida (Márgenes/Viñeta):</label>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => {
              const targetY = Math.round((currentPanels[activePanelIdx]?.focusY ?? 0.5) * 100);
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: -15, posY: targetY });
            }}
            className="px-2 py-1.5 bg-[#161622] hover:bg-[#1f1f2e] border border-white/10 text-zinc-200 text-[10px] font-bold rounded text-left flex justify-between items-center transition-colors active:translate-y-0.5 cursor-pointer"
          >
            <span>👈 Margen Izq.</span>
            <span className="text-[8px] text-zinc-500 font-mono">[-15%, Y]</span>
          </button>
          <button
            type="button"
            onClick={() => {
              const targetY = Math.round((currentPanels[activePanelIdx]?.focusY ?? 0.5) * 100);
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: 115, posY: targetY });
            }}
            className="px-2 py-1.5 bg-[#161622] hover:bg-[#1f1f2e] border border-white/10 text-zinc-200 text-[10px] font-bold rounded text-left flex justify-between items-center transition-colors active:translate-y-0.5 cursor-pointer"
          >
            <span>👉 Margen Der.</span>
            <span className="text-[8px] text-zinc-500 font-mono">[115%, Y]</span>
          </button>
          <button
            type="button"
            onClick={() => {
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: 50, posY: -15 });
            }}
            className="px-2 py-1.5 bg-[#161622] hover:bg-[#1f1f2e] border border-white/10 text-zinc-200 text-[10px] font-bold rounded text-left flex justify-between items-center transition-colors active:translate-y-0.5 cursor-pointer"
          >
            <span>👆 Margen Sup.</span>
            <span className="text-[8px] text-zinc-500 font-mono">[50%, -15%]</span>
          </button>
          <button
            type="button"
            onClick={() => {
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: 50, posY: 115 });
            }}
            className="px-2 py-1.5 bg-[#161622] hover:bg-[#1f1f2e] border border-white/10 text-zinc-200 text-[10px] font-bold rounded text-left flex justify-between items-center transition-colors active:translate-y-0.5 cursor-pointer"
          >
            <span>👇 Margen Inf.</span>
            <span className="text-[8px] text-zinc-500 font-mono">[50%, 115%]</span>
          </button>
          <button
            type="button"
            onClick={() => {
              const targetY = Math.round((currentPanels[activePanelIdx]?.focusY ?? 0.5) * 100);
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, { posX: 50, posY: targetY });
            }}
            className="col-span-2 px-2 py-1.5 bg-[#161622] hover:bg-[#1f1f2e] border border-white/10 text-zinc-250 text-[10px] font-bold rounded text-center transition-colors active:translate-y-0.5 cursor-pointer"
          >
            🎯 Centro de Viñeta <span className="text-zinc-500 font-mono ml-1 text-[8px]">[50%, Y]</span>
          </button>
        </div>
      </div>

      {/* Manual coordinates input */}
      <div className="grid grid-cols-2 gap-2 mt-1">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-zinc-400">X (Ancho %):</label>
          <input
            type="number"
            min="-20"
            max="120"
            value={bubble.posX ?? 50}
            onChange={(e) =>
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                posX: Math.max(-20, Math.min(120, parseInt(e.target.value) || 0)),
              })
            }
            className="border border-white/10 p-1.5 text-xs font-mono text-center bg-[#0a0a0f] text-white focus:outline-none focus:ring-1 focus:ring-[#e8185a]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-zinc-400">Y (Alto %):</label>
          <input
            type="number"
            min="-20"
            max="120"
            value={bubble.posY ?? 50}
            onChange={(e) =>
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                posY: Math.max(-20, Math.min(120, parseInt(e.target.value) || 0)),
              })
            }
            className="border border-white/10 p-1.5 text-xs font-mono text-center bg-[#0a0a0f] text-white focus:outline-none focus:ring-1 focus:ring-[#e8185a]"
          />
        </div>
      </div>

      {/* Move Bubble to Another Panel */}
      {handleMoveBubbleToPanel && (
        <div className="flex flex-col gap-1.5 mt-2 bg-[#0a0a0f] border border-white/10 rounded p-3">
          <label className="text-xs font-bold text-zinc-300">Mover a Viñeta:</label>
          <select
            value={activePanelIdx}
            onChange={(e) => {
              const targetIdx = parseInt(e.target.value);
              if (targetIdx !== activePanelIdx) {
                handleMoveBubbleToPanel(activePanelIdx, activeBubbleIdx, targetIdx);
              }
            }}
            className="w-full border border-white/10 p-2 text-xs font-mono rounded bg-[#161622] text-white focus:outline-none focus:ring-1 focus:ring-[#e8185a] cursor-pointer"
          >
            {currentPanels.map((_, idx) => (
              <option key={idx} value={idx}>
                Mover a Viñeta {idx + 1} {idx === activePanelIdx ? "(Actual)" : ""}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
