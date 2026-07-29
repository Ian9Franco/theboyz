"use client";

import React from "react";
import type { DialogueLine } from "./DialogueBubble";
import type { PanelStop as PanelConfig } from "./audioPlayer";
import { EditorBubbleVisualsForm } from "./editor/EditorBubbleVisualsForm";
import { EditorBubbleLayoutForm } from "./editor/EditorBubbleLayoutForm";
import { EditorBubbleTailForm } from "./editor/EditorBubbleTailForm";

interface EditorTabDialoguesProps {
  currentPanels: PanelConfig[];
  activePanelIdx: number;
  activeBubbleIdx: number | null;
  setActiveBubbleIdx: (idx: number | null) => void;
  handleAddBubble: (pIdx: number, defaultPosition?: { posX: number; posY: number }, defaultStyle?: "normal" | "caption" | "cinematic") => void;
  handleDuplicateBubble: (pIdx: number, bIdx: number) => void;
  handleRemoveBubble: (pIdx: number, bIdx: number) => void;
  handleUpdateBubble: (pIdx: number, bIdx: number, updates: Partial<DialogueLine>) => void;
  presetMode?: "standard" | "custom";
  handleMoveBubbleToPanel: (fromPanelIdx: number, bubbleIdx: number, toPanelIdx: number) => void;
  handleReorderBubbles: (pIdx: number, startIndex: number, endIndex: number) => void;
}

/**
 * EditorTabDialogues Component
 * Renders the bubble detail editor with modular sub-forms.
 */
export function EditorTabDialogues({
  currentPanels,
  activePanelIdx,
  activeBubbleIdx,
  setActiveBubbleIdx,
  handleAddBubble,
  handleDuplicateBubble,
  handleRemoveBubble,
  handleUpdateBubble,
  presetMode = "standard",
  handleMoveBubbleToPanel,
  handleReorderBubbles,
}: EditorTabDialoguesProps) {
  const activePanel = currentPanels[activePanelIdx];
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

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

  const stripInlineFormatting = (text: string) =>
    text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/\[color:[^\]]+\]/g, "")
      .replace(/\[\/color\]/g, "")
      .replace(/<[^>]+>/g, "");  // also strip any raw HTML tags

  if (!activePanel) {
    return (
      <div className="bg-[#161622] border border-white/10 rounded p-6 flex flex-col items-center justify-center text-center">
        <span className="text-sm text-zinc-400 italic">Selecciona una viñeta para comenzar a editar diálogos.</span>
      </div>
    );
  }

  // Fallback / Creation Hub when no bubble is selected
  if (activeBubbleIdx === null || !activePanel.dialogue?.[activeBubbleIdx]) {
    return (
      <div className="bg-[#161622] border border-white/10 rounded p-4 flex flex-col gap-4">
        <div className="font-[var(--font-bangers)] text-lg text-zinc-300 tracking-wider">
          💬 Globos y Narraciones (Viñeta {activePanelIdx + 1})
        </div>
        
        <p className="text-xs text-zinc-400">
          No hay ningún globo seleccionado en esta viñeta. Creá uno nuevo o seleccioná uno existente de la lista:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleAddBubble(activePanelIdx, undefined, "normal")}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-[#0a0a0f] hover:bg-[#13131d] border border-white/10 hover:border-[#e8185a] rounded transition-all cursor-pointer group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">💬</span>
            <span className="text-xs font-bold text-white font-[var(--font-bangers)] tracking-wide">Crear Diálogo</span>
            <span className="text-[9px] text-zinc-500">Globo clásico con colita</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddBubble(activePanelIdx, undefined, "caption")}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-[#0a0a0f] hover:bg-[#13131d] border border-white/10 hover:border-blue-500 rounded transition-all cursor-pointer group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">📜</span>
            <span className="text-xs font-bold text-white font-[var(--font-bangers)] tracking-wide">Crear Narración</span>
            <span className="text-[9px] text-zinc-500">Caja de texto rectangular</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddBubble(activePanelIdx, undefined, "cinematic")}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-[#0a0a0f] hover:bg-[#13131d] border border-white/10 hover:border-cyan-400 rounded transition-all cursor-pointer group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">🎬</span>
            <span className="text-xs font-bold text-white font-[var(--font-bangers)] tracking-wide">Texto Épico</span>
            <span className="text-[9px] text-zinc-500">Overlay grande tipo edit</span>
          </button>
        </div>

        {activePanel.dialogue && activePanel.dialogue.length > 0 && (
          <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-white/5">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Seleccionar globo existente:
            </span>
            <div className="grid grid-cols-2 gap-2 max-h-[140px] overflow-y-auto pr-1">
              {activePanel.dialogue.map((bub, bIdx) => (
                <button
                  key={bIdx}
                  type="button"
                  onClick={() => setActiveBubbleIdx(bIdx)}
                  className="text-left text-[11px] p-2 border border-white/10 bg-[#0a0a0f] hover:bg-[#13131d] rounded text-zinc-300 font-mono truncate transition-all cursor-pointer"
                >
                  <span className="font-bold text-zinc-500 mr-1">#{bIdx + 1}</span>
                  {bub.speaker ? `${bub.speaker}: ` : ""}
                  {bub.text || "(vacío)"}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const bubble = activePanel.dialogue[activeBubbleIdx];
  const bubbleLabel =
    bubble.style === "caption" ? "Narración 📜" :
    bubble.style === "cinematic" ? "Texto Épico 🎬" :
    "Diálogo 💬";
  const isCinematicBubble = bubble.style === "cinematic";

  if (presetMode === "standard") {
    return (
      <div className="bg-[#161622] border border-white/10 rounded p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveBubbleIdx(null)}
              className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              ← Volver
            </button>
            <span className="font-[var(--font-bangers)] text-base text-zinc-300 tracking-wider flex items-center gap-1.5">
              {bubbleLabel} #{activeBubbleIdx + 1}
              <span className="flex items-center gap-1 ml-2">
                {activeBubbleIdx > 0 && (
                  <button
                    type="button"
                    onClick={() => handleReorderBubbles(activePanelIdx, activeBubbleIdx, activeBubbleIdx - 1)}
                    className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 w-5 h-5 rounded flex items-center justify-center border border-white/5 active:scale-95 transition-all cursor-pointer font-bold"
                    title="Mover diálogo antes/arriba"
                  >
                    ▲
                  </button>
                )}
                {activeBubbleIdx < (activePanel.dialogue?.length || 0) - 1 && (
                  <button
                    type="button"
                    onClick={() => handleReorderBubbles(activePanelIdx, activeBubbleIdx, activeBubbleIdx + 1)}
                    className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 w-5 h-5 rounded flex items-center justify-center border border-white/5 active:scale-95 transition-all cursor-pointer font-bold"
                    title="Mover diálogo después/abajo"
                  >
                    ▼
                  </button>
                )}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleDuplicateBubble(activePanelIdx, activeBubbleIdx)}
              className="text-xs bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 border border-indigo-500/30 px-2 py-1 rounded transition-colors cursor-pointer font-bold flex items-center gap-1"
              title="Duplicar esta burbuja manteniendo sus estilos pero sin texto"
            >
              📋 Duplicar
            </button>
            <button
              type="button"
              onClick={() => handleRemoveBubble(activePanelIdx, activeBubbleIdx)}
              className="text-xs text-red-500 hover:text-red-400 hover:underline cursor-pointer font-bold"
            >
              Eliminar
            </button>
          </div>
        </div>

        {!isCinematicBubble && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-300">Hablante / Personaje:</label>
            <input
              type="text"
              value={bubble.speaker || ""}
              onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { speaker: e.target.value })}
              className="border border-white/10 p-2 text-xs font-sans rounded bg-[#0a0a0f] text-white focus:outline-none focus:ring-1 focus:ring-[#e8185a]"
              placeholder="Ej: Ian, Mati, Uandi..."
            />
            <div className="flex flex-wrap gap-1 mt-1">
              {["Ian", "Mati", "Uandi", "Sofi", "Jaz", "Julián", "Volvo", "Valery", "Brooke", "Daichi", "Ren", "Byte", "Oni", "Shinjuro"].map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { speaker: name })}
                  className={`text-[10px] font-bold px-2 py-1 rounded transition-colors cursor-pointer ${
                    bubble.speaker === name
                      ? "bg-[#e8185a] text-white font-bold"
                      : "bg-[#0a0a0f] text-zinc-400 hover:text-white border border-white/5"
                  }`}
                >
                  {name}
                </button>
              ))}
              {bubble.speaker && (
                <button
                  type="button"
                  onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { speaker: "" })}
                  className="text-[10px] font-bold px-2 py-1 rounded bg-[#0a0a0f] text-red-400 hover:text-red-300 border border-white/5 cursor-pointer"
                >
                  Quitar
                </button>
              )}
            </div>
          </div>
        )}

        {/* Text Area for Dialogue content */}
        <div className="flex flex-col gap-1.5 mt-1">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-zinc-300">Texto:</label>
            <div className="flex items-center gap-1.5">
              {isCinematicBubble && (
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
                        text: isCinematicBubble ? stripInlineFormatting(text) : text,
                      });
                    }
                  } catch (err) {
                    console.error("Error al leer el portapapeles:", err);
                  }
                }}
                className="font-[var(--font-bangers)] text-[10px] bg-blue-950/40 hover:bg-blue-900/30 text-blue-300 border border-blue-900/40 px-2 py-0.5 rounded transition-all cursor-pointer"
              >
                ⚡ Pegar
              </button>
            </div>
          </div>
          {!isCinematicBubble && (
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
            value={isCinematicBubble ? stripInlineFormatting(bubble.text) : bubble.text}
            onChange={(e) =>
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                text: isCinematicBubble ? stripInlineFormatting(e.target.value) : e.target.value,
              })
            }
            className={`w-full border border-white/10 p-2 text-xs font-sans bg-[#0a0a0f] text-white resize-none focus:outline-none focus:ring-1 focus:ring-[#e8185a] ${
              isCinematicBubble ? "h-16 rounded" : "h-24 border-t-0 rounded-b"
            }`}
            placeholder={isCinematicBubble ? "Texto grande para la escena..." : "Escribí el diálogo..."}
          />
        </div>

        {isCinematicBubble && (
          <div className="flex flex-col gap-3 p-3 bg-cyan-950/20 border border-cyan-800/40 rounded">
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: "Translúcido", variant: "translucent", color: "#0a0a0f", shadow: "#0a0a0f", size: 76 },
                { label: "Blanco sólido", variant: "solid", color: "#ffffff", shadow: "#0a0a0f", size: 72 },
                { label: "Solo borde", variant: "outline", color: "#ffffff", shadow: "#0a0a0f", size: 78 },
                { label: "Rojo impacto", variant: "solid", color: "#e81818", shadow: "#0a0a0f", size: 82 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() =>
                    handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                      cinematicVariant: preset.variant as DialogueLine["cinematicVariant"],
                      cinematic3d: preset.variant !== "outline",
                      textColor: preset.color,
                      customColor: preset.shadow,
                      customBg: "transparent",
                      fontFamily: "bungee",
                      fontSize: preset.size,
                      width: 900,
                      tail: "none",
                      tailX: undefined,
                      tailY: undefined,
                    })
                  }
                  className="p-1.5 bg-[#0a0a0f] hover:bg-[#161622] border border-white/10 hover:border-cyan-400 text-cyan-100 text-[10px] font-bold rounded transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-zinc-400">Modo visual:</label>
                <select
                  value={bubble.cinematicVariant || "translucent"}
                  onChange={(e) =>
                    handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                      cinematicVariant: e.target.value as DialogueLine["cinematicVariant"],
                    })
                  }
                  className="w-full border border-white/10 p-1.5 text-xs font-mono rounded bg-[#0a0a0f] text-white focus:outline-none focus:ring-1 focus:ring-[#e8185a] cursor-pointer"
                >
                  <option value="translucent">Translúcido</option>
                  <option value="solid">Sólido</option>
                  <option value="outline">Solo borde</option>
                </select>
              </div>
              <label className="flex items-center justify-between gap-2 text-[10px] font-bold text-zinc-300 bg-[#0a0a0f] border border-white/10 rounded px-2 py-1.5 mt-4">
                Profundidad 3D
                <input
                  type="checkbox"
                  checked={bubble.cinematic3d ?? true}
                  onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { cinematic3d: e.target.checked })}
                  className="accent-[#00f0ff] cursor-pointer"
                />
              </label>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-zinc-400">Texto:</label>
                <input
                  type="color"
                  value={bubble.textColor || "#ffffff"}
                  onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { textColor: e.target.value })}
                  className="w-full h-8 p-0 border border-white/10 rounded cursor-pointer bg-transparent"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-zinc-400">Sombra:</label>
                <input
                  type="color"
                  value={bubble.customColor || "#0a0a0f"}
                  onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { customColor: e.target.value })}
                  className="w-full h-8 p-0 border border-white/10 rounded cursor-pointer bg-transparent"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-zinc-400">Fuente:</label>
                <select
                  value={bubble.fontFamily || "bungee"}
                  onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { fontFamily: e.target.value as DialogueLine["fontFamily"] })}
                  className="w-full border border-white/10 p-1.5 text-xs font-mono rounded bg-[#0a0a0f] text-white focus:outline-none focus:ring-1 focus:ring-[#e8185a] cursor-pointer"
                >
                  <option value="bungee">Bungee</option>
                  <option value="bangers">Bangers</option>
                  <option value="luckiest">Luckiest</option>
                  <option value="sans">Sans</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-xs font-bold text-zinc-300">
                <span>Tamaño Letra:</span>
                <span className="font-mono text-zinc-400">{bubble.fontSize ? `${bubble.fontSize}px` : "Defecto"}</span>
              </div>
              <input
                type="range"
                min="24"
                max="160"
                step="1"
                value={bubble.fontSize || 76}
                onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { fontSize: parseInt(e.target.value) })}
                className="w-full accent-[#00f0ff] cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Move Bubble to Another Panel */}
        <div className="flex flex-col gap-1.5 mt-1">
          <label className="text-xs font-bold text-zinc-300">Mover a Viñeta:</label>
          <select
            value={activePanelIdx}
            onChange={(e) => {
              const targetIdx = parseInt(e.target.value);
              if (targetIdx !== activePanelIdx) {
                handleMoveBubbleToPanel(activePanelIdx, activeBubbleIdx, targetIdx);
              }
            }}
            className="w-full border border-white/10 p-2 text-xs font-mono rounded bg-[#0a0a0f] text-white focus:outline-none focus:ring-1 focus:ring-[#e8185a] cursor-pointer"
          >
            {currentPanels.map((_, idx) => (
              <option key={idx} value={idx}>
                Mover a Viñeta {idx + 1} {idx === activePanelIdx ? "(Actual)" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Max Width Slider */}
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-300">
            <span>Ancho Máximo:</span>
            <span className="font-mono text-zinc-400">{bubble.width ? `${bubble.width}px` : "Defecto"}</span>
          </div>
          <input
            type="range"
            min={isCinematicBubble ? "220" : "100"}
            max={isCinematicBubble ? "1200" : "600"}
            step="10"
            value={bubble.width || (isCinematicBubble ? 900 : 250)}
            onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { width: parseInt(e.target.value) })}
            className="w-full accent-[#e8185a] cursor-pointer"
          />
        </div>

        <span className="text-[10px] text-zinc-500 italic text-center border-t border-white/5 pt-2 mt-1">
          💡 ¡También podés arrastrar la burbuja directamente en el lienzo del cómic para posicionarla!
        </span>
      </div>
    );
  }

  return (
    <div className="bg-[#161622] border border-white/10 rounded p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveBubbleIdx(null)}
            className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Volver
          </button>
          <span className="font-[var(--font-bangers)] text-base text-zinc-300 tracking-wider flex items-center gap-1.5">
            Editando Globo #{activeBubbleIdx + 1}
            <span className="flex items-center gap-1 ml-2">
              {activeBubbleIdx > 0 && (
                <button
                  type="button"
                  onClick={() => handleReorderBubbles(activePanelIdx, activeBubbleIdx, activeBubbleIdx - 1)}
                  className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 w-5 h-5 rounded flex items-center justify-center border border-white/5 active:scale-95 transition-all cursor-pointer font-bold"
                  title="Mover diálogo antes/arriba"
                >
                  ▲
                </button>
              )}
              {activeBubbleIdx < (activePanel.dialogue?.length || 0) - 1 && (
                <button
                  type="button"
                  onClick={() => handleReorderBubbles(activePanelIdx, activeBubbleIdx, activeBubbleIdx + 1)}
                  className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 w-5 h-5 rounded flex items-center justify-center border border-white/5 active:scale-95 transition-all cursor-pointer font-bold"
                  title="Mover diálogo después/abajo"
                >
                  ▼
                </button>
              )}
            </span>
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleDuplicateBubble(activePanelIdx, activeBubbleIdx)}
            className="font-[var(--font-bangers)] text-xs bg-indigo-700 hover:bg-indigo-800 text-white border border-white/10 px-2.5 py-1 rounded transition-colors cursor-pointer"
            title="Duplicar burbuja seleccionada"
          >
            📋 Duplicar
          </button>
          <button
            type="button"
            onClick={() => handleAddBubble(activePanelIdx, undefined, "normal")}
            className="font-[var(--font-bangers)] text-xs bg-emerald-600 hover:bg-emerald-700 text-white border border-white/10 px-2.5 py-1 rounded transition-colors cursor-pointer"
          >
            + Nuevo
          </button>
          <button
            type="button"
            onClick={() => handleAddBubble(activePanelIdx, undefined, "cinematic")}
            className="font-[var(--font-bangers)] text-xs bg-cyan-700 hover:bg-cyan-800 text-white border border-white/10 px-2.5 py-1 rounded transition-colors cursor-pointer"
          >
            + Épico
          </button>
          <button
            type="button"
            onClick={() => handleRemoveBubble(activePanelIdx, activeBubbleIdx)}
            className="text-xs text-red-500 hover:text-red-400 hover:underline cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>

      <EditorBubbleVisualsForm
        bubble={bubble}
        activePanelIdx={activePanelIdx}
        activeBubbleIdx={activeBubbleIdx}
        handleUpdateBubble={handleUpdateBubble}
      />

      {!isCinematicBubble && (
        <EditorBubbleTailForm
          bubble={bubble}
          activePanelIdx={activePanelIdx}
          activeBubbleIdx={activeBubbleIdx}
          handleUpdateBubble={handleUpdateBubble}
        />
      )}

      <EditorBubbleLayoutForm
        bubble={bubble}
        activePanelIdx={activePanelIdx}
        activeBubbleIdx={activeBubbleIdx}
        currentPanels={currentPanels}
        handleUpdateBubble={handleUpdateBubble}
        handleMoveBubbleToPanel={handleMoveBubbleToPanel}
      />

      <span className="text-[10px] text-zinc-500 italic text-center">
        💡 ¡También podés arrastrar la burbuja o su cola directamente en el lienzo del cómic!
      </span>
    </div>
  );
}
