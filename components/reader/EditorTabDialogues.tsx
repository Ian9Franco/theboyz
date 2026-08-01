"use client";

import React, { useEffect, useRef } from "react";
import type { DialogueLine } from "./DialogueBubble";
import type { PanelStop as PanelConfig } from "./audioPlayer";
import { EditorBubbleVisualsForm } from "./editor/EditorBubbleVisualsForm";
import { EditorBubbleLayoutForm } from "./editor/EditorBubbleLayoutForm";
import { EditorBubbleTailForm } from "./editor/EditorBubbleTailForm";

interface EditorTabDialoguesProps {
  currentPanels: PanelConfig[];
  activePanelIdx: number;
  setActivePanelIdx: (idx: number) => void;
  activeBubbleIdx: number | null;
  setActiveBubbleIdx: (idx: number | null) => void;
  handleAddBubble: (
    pIdx: number,
    defaultPosition?: { posX: number; posY: number },
    defaultStyle?: "normal" | "caption" | "cinematic"
  ) => void;
  handleDuplicateBubble: (pIdx: number, bIdx: number) => void;
  handleRemoveBubble: (pIdx: number, bIdx: number) => void;
  handleUpdateBubble: (pIdx: number, bIdx: number, updates: Partial<DialogueLine>) => void;
  presetMode?: "standard" | "custom";
  handleMoveBubbleToPanel: (fromPanelIdx: number, bubbleIdx: number, toPanelIdx: number) => void;
  handleReorderBubbles: (pIdx: number, startIndex: number, endIndex: number) => void;
}

/**
 * EditorTabDialogues Component
 * Optimized, intuitive dialogue editor. Auto-focuses text area on selection,
 * removes clutter, and prioritizes instant text entry and character controls.
 */
export function EditorTabDialogues({
  currentPanels,
  activePanelIdx,
  setActivePanelIdx,
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus the text input ONLY if user is not interacting with other input/form controls
  useEffect(() => {
    if (activeBubbleIdx !== null && activePanel?.dialogue?.[activeBubbleIdx]) {
      const activeEl = document.activeElement;
      const isInputFocused =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "SELECT" ||
          activeEl.tagName === "TEXTAREA");

      if (!isInputFocused) {
        const timer = setTimeout(() => {
          if (textareaRef.current && (!document.activeElement || document.activeElement === document.body)) {
            textareaRef.current.focus();
            const length = textareaRef.current.value.length;
            textareaRef.current.setSelectionRange(length, length);
          }
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [activeBubbleIdx, activePanelIdx, activePanel]);

  const insertFormatting = (
    tagStart: string,
    tagEnd: string,
    textValue: string,
    onUpdate: (val: string) => void,
    textareaEl: HTMLTextAreaElement | null
  ) => {
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

  const stripInlineFormatting = (text?: string) =>
    (text || "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/\[color:[^\]]+\]/g, "")
      .replace(/\[\/color\]/g, "")
      .replace(/<[^>]+>/g, "");

  if (!activePanel) {
    return (
      <div className="bg-[#161622] border border-white/10 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-lg">
        <span className="text-sm text-zinc-400 italic">Seleccioná una viñeta para comenzar a editar diálogos.</span>
      </div>
    );
  }

  // Active Parada Selector Component (Reused across views)
  const renderParadaSelector = () => (
    <div className="flex items-center gap-2 bg-[#0a0a0f] p-2.5 border border-white/10 rounded-md overflow-x-auto shadow-md">
      <span className="text-xs font-bold text-zinc-400 shrink-0 flex items-center gap-1">
        📍 Parada:
      </span>
      {currentPanels.map((panel, pIdx) => {
        const isSelected = activePanelIdx === pIdx;
        const bubbleCount = panel.dialogue?.length || 0;
        return (
          <button
            key={pIdx}
            type="button"
            onClick={() => {
              setActivePanelIdx(pIdx);
              setActiveBubbleIdx(null);
            }}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
              isSelected
                ? "bg-[#e8185a] text-white shadow-sm"
                : "bg-[#161622] text-zinc-300 hover:bg-zinc-800 border border-white/5"
            }`}
          >
            <span>Parada {pIdx + 1}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans ${
                isSelected ? "bg-black/40 text-white" : "bg-white/10 text-zinc-400"
              }`}
            >
              {bubbleCount}
            </span>
          </button>
        );
      })}
    </div>
  );

  // Creation Hub when no bubble is selected
  if (activeBubbleIdx === null || !activePanel.dialogue?.[activeBubbleIdx]) {
    return (
      <div className="flex flex-col gap-4">
        {/* Active Parada Selector Bar */}
        {renderParadaSelector()}

        <div className="bg-[#161622] border border-white/10 rounded-lg p-4 flex flex-col gap-4 shadow-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="font-[var(--font-bangers)] text-lg text-zinc-200 tracking-wider flex items-center gap-2">
              <span>💬 Globos en Parada {activePanelIdx + 1}</span>
            </div>
            <span className="text-xs font-mono bg-[#0a0a0f] border border-white/10 px-2 py-0.5 rounded text-zinc-400">
              {activePanel.dialogue?.length || 0} {activePanel.dialogue?.length === 1 ? "globo" : "globos"}
            </span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Elegí un globo de la Parada {activePanelIdx + 1} para editarlo o creá uno nuevo:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => handleAddBubble(activePanelIdx, undefined, "normal")}
              className="flex flex-col items-center justify-center gap-1.5 p-3.5 bg-[#0a0a0f] hover:bg-[#13131d] border border-white/10 hover:border-[#e8185a] rounded-md transition-all cursor-pointer group active:scale-[0.98]"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">💬</span>
              <span className="text-xs font-bold text-white font-[var(--font-bangers)] tracking-wide">Crear Diálogo</span>
              <span className="text-[9px] text-zinc-500">Globo clásico</span>
            </button>

            <button
              type="button"
              onClick={() => handleAddBubble(activePanelIdx, undefined, "caption")}
              className="flex flex-col items-center justify-center gap-1.5 p-3.5 bg-[#0a0a0f] hover:bg-[#13131d] border border-white/10 hover:border-yellow-500 rounded-md transition-all cursor-pointer group active:scale-[0.98]"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">📜</span>
              <span className="text-xs font-bold text-white font-[var(--font-bangers)] tracking-wide">Crear Narración</span>
              <span className="text-[9px] text-zinc-500">Caja de texto</span>
            </button>

            <button
              type="button"
              onClick={() => handleAddBubble(activePanelIdx, undefined, "cinematic")}
              className="flex flex-col items-center justify-center gap-1.5 p-3.5 bg-[#0a0a0f] hover:bg-[#13131d] border border-white/10 hover:border-cyan-400 rounded-md transition-all cursor-pointer group active:scale-[0.98]"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">🎬</span>
              <span className="text-xs font-bold text-white font-[var(--font-bangers)] tracking-wide">Texto Épico</span>
              <span className="text-[9px] text-zinc-500">Overlay grande</span>
            </button>
          </div>

          {activePanel.dialogue && activePanel.dialogue.length > 0 && (
            <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-white/10">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Diálogos en esta viñeta ({activePanel.dialogue.length}):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                {activePanel.dialogue.map((bub, bIdx) => {
                  const isSelected = activeBubbleIdx === bIdx;
                  return (
                    <div
                      key={bIdx}
                      onClick={() => setActiveBubbleIdx(bIdx)}
                      className={`text-left text-xs p-2.5 border rounded-md transition-all cursor-pointer flex flex-col gap-1.5 ${
                        isSelected
                          ? "border-[#e8185a] bg-rose-950/20 shadow-[0_0_10px_rgba(232,24,90,0.15)]"
                          : "border-white/10 bg-[#0a0a0f] hover:bg-[#13131d] hover:border-zinc-500"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1">
                          <span className="font-extrabold font-mono text-[#e8185a] bg-[#e8185a]/15 px-1.5 py-0.5 rounded border border-[#e8185a]/30">
                            V{activePanelIdx + 1} • #{bIdx + 1}
                          </span>
                          {handleReorderBubbles && activePanel.dialogue!.length > 1 && (
                            <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
                              {bIdx > 0 && (
                                <button
                                  type="button"
                                  onClick={() => handleReorderBubbles(activePanelIdx, bIdx, bIdx - 1)}
                                  className="text-[9px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 w-4 h-4 rounded flex items-center justify-center border border-white/5 active:scale-95 transition-all cursor-pointer font-bold"
                                  title="Mover diálogo antes (#1 va primero)"
                                >
                                  ▲
                                </button>
                              )}
                              {bIdx < activePanel.dialogue!.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleReorderBubbles(activePanelIdx, bIdx, bIdx + 1)}
                                  className="text-[9px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 w-4 h-4 rounded flex items-center justify-center border border-white/5 active:scale-95 transition-all cursor-pointer font-bold"
                                  title="Mover diálogo después"
                                >
                                  ▼
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                        <span className="text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.2 rounded text-zinc-400 font-mono">
                          {bub.style === "caption" ? "Narración 📜" : bub.style === "cinematic" ? "Épico 🎬" : "Diálogo 💬"}
                        </span>
                      </div>
                      <div className="truncate text-xs font-sans">
                        {bub.speaker ? <strong className="text-white mr-1">{bub.speaker}:</strong> : null}
                        <span className={bub.text ? "text-zinc-300" : "text-zinc-500 italic"}>
                          {bub.text || "(sin texto)"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const bubble = activePanel.dialogue[activeBubbleIdx];
  const isCinematicBubble = bubble.style === "cinematic";
  const bubbleBadge =
    bubble.style === "caption"
      ? "Narración 📜"
      : bubble.style === "cinematic"
      ? "Texto Épico 🎬"
      : bubble.style === "sfx"
      ? "SFX 💥"
      : "Diálogo 💬";

  return (
    <div className="flex flex-col gap-4">
      {/* Active Parada Selector Bar */}
      {renderParadaSelector()}

      <div className="bg-[#161622] border border-white/10 rounded-lg p-4 flex flex-col gap-4 shadow-lg">
        {/* Header bar with navigation, badge, reordering and actions */}
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveBubbleIdx(null)}
              className="text-xs bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 px-2.5 py-1 rounded transition-colors cursor-pointer border border-white/5 font-medium flex items-center gap-1"
            >
              ← Volver
            </button>
            <div className="flex items-center gap-2">
              <span className="font-[var(--font-bangers)] text-base text-white tracking-wider">
                {bubbleBadge} #{activeBubbleIdx + 1}
              </span>
              <span className="flex items-center gap-1">
                {activeBubbleIdx > 0 && (
                  <button
                    type="button"
                    onClick={() => handleReorderBubbles(activePanelIdx, activeBubbleIdx, activeBubbleIdx - 1)}
                    className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 w-5 h-5 rounded flex items-center justify-center border border-white/10 active:scale-95 transition-all cursor-pointer font-bold"
                    title="Mover diálogo antes/arriba"
                  >
                    ▲
                  </button>
                )}
                {activeBubbleIdx < (activePanel.dialogue?.length || 0) - 1 && (
                  <button
                    type="button"
                    onClick={() => handleReorderBubbles(activePanelIdx, activeBubbleIdx, activeBubbleIdx + 1)}
                    className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 w-5 h-5 rounded flex items-center justify-center border border-white/10 active:scale-95 transition-all cursor-pointer font-bold"
                    title="Mover diálogo después/abajo"
                  >
                    ▼
                  </button>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleDuplicateBubble(activePanelIdx, activeBubbleIdx)}
              className="text-xs bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-200 border border-indigo-500/30 px-2.5 py-1 rounded transition-all cursor-pointer font-bold flex items-center gap-1 active:scale-95"
              title="Duplicar este globo manteniendo estilos"
            >
              📋 Duplicar
            </button>
            <button
              type="button"
              onClick={() => handleRemoveBubble(activePanelIdx, activeBubbleIdx)}
              className="text-xs text-red-400 hover:text-red-300 hover:underline cursor-pointer font-bold px-1"
            >
              Eliminar
            </button>
          </div>
        </div>

        {/* PRIORITY SECTION 1: Text Area (positioned top for immediate writing) */}
        <div className="flex flex-col gap-1.5 bg-[#0a0a0f] p-3 border border-white/10 rounded-md">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
              ✍️ Texto del Diálogo:
            </label>
            <div className="flex items-center gap-1.5">
              {!isCinematicBubble && (
                <button
                  type="button"
                  onClick={() =>
                    insertFormatting(
                      "**",
                      "**",
                      bubble.text || "",
                      (txt) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { text: txt }),
                      textareaRef.current
                    )
                  }
                  className="px-2.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded text-xs active:scale-95 transition-all cursor-pointer border border-white/10"
                  title="Agregar negrita al texto seleccionado"
                >
                  B (Negrita)
                </button>
              )}
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
                className="font-[var(--font-bangers)] text-[10px] bg-blue-950/40 hover:bg-blue-900/40 text-blue-300 border border-blue-800/40 px-2 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1 active:scale-95"
              >
                ⚡ Auto (Pegar)
              </button>
            </div>
          </div>

          <textarea
            ref={textareaRef}
            value={isCinematicBubble ? stripInlineFormatting(bubble.text) : bubble.text || ""}
            onChange={(e) =>
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                text: isCinematicBubble ? stripInlineFormatting(e.target.value) : e.target.value,
              })
            }
            className={`w-full border border-white/15 p-2.5 text-xs font-sans bg-[#13131d] text-white resize-none focus:outline-none focus:ring-2 focus:ring-[#e8185a] transition-all rounded ${
              isCinematicBubble ? "h-20" : "h-24"
            }`}
            placeholder={isCinematicBubble ? "Texto grande para la escena..." : "Escribí el diálogo..."}
          />
        </div>

        {/* PRIORITY SECTION 2: Visual & Form Customization */}
        {presetMode === "custom" ? (
          <>
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
          </>
        ) : (
          /* Standard Mode: Visual Controls & tail settings */
          <div className="flex flex-col gap-3">
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

            {/* Move to another panel & layout quick controls */}
            <div className="flex flex-col gap-3 p-3 bg-[#0a0a0f] border border-white/10 rounded-md">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-300">📦 Mover a Viñeta:</label>
                <select
                  value={activePanelIdx}
                  onChange={(e) => {
                    const targetIdx = parseInt(e.target.value);
                    if (targetIdx !== activePanelIdx) {
                      handleMoveBubbleToPanel(activePanelIdx, activeBubbleIdx, targetIdx);
                    }
                  }}
                  className="w-full border border-white/15 p-2 text-xs font-mono rounded bg-[#13131d] text-white focus:outline-none focus:ring-2 focus:ring-[#e8185a] cursor-pointer"
                >
                  {currentPanels.map((_, idx) => (
                    <option key={idx} value={idx}>
                      Mover a Viñeta {idx + 1} {idx === activePanelIdx ? "(Actual)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
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

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs font-bold text-zinc-300">
                  <span>Curvatura Esquinas (Redondeado):</span>
                  <span className="font-mono text-[#e8185a] font-bold">
                    {bubble.borderRadius !== undefined ? `${bubble.borderRadius}px` : "Defecto"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="1"
                  value={bubble.borderRadius ?? 18}
                  onChange={(e) =>
                    handleUpdateBubble(activePanelIdx, activeBubbleIdx, { borderRadius: parseInt(e.target.value) })
                  }
                  className="w-full accent-[#e8185a] cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        <span className="text-[10px] text-zinc-500 italic text-center border-t border-white/5 pt-2">
          💡 Podés mover o posicionar el globo y su cola arrastrándolos directamente en el lienzo.
        </span>
      </div>
    </div>
  );
}
