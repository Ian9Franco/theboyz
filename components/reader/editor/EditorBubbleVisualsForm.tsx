"use client";

import React from "react";
import type { DialogueLine } from "../DialogueBubble";

interface EditorBubbleVisualsFormProps {
  bubble: DialogueLine;
  activePanelIdx: number;
  activeBubbleIdx: number;
  handleUpdateBubble: (pIdx: number, bIdx: number, updates: Partial<DialogueLine>) => void;
}

export function EditorBubbleVisualsForm({
  bubble,
  activePanelIdx,
  activeBubbleIdx,
  handleUpdateBubble,
}: EditorBubbleVisualsFormProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Speaker */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-zinc-300">Personaje / Hablante:</label>
        <input
          type="text"
          value={bubble.speaker || ""}
          onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { speaker: e.target.value })}
          className="w-full border border-white/10 p-2 text-xs font-mono rounded bg-[#0a0a0f] text-white focus:outline-none focus:ring-1 focus:ring-[#e8185a]"
          placeholder="Ej: Sofi"
        />
      </div>

      {/* Speaker Presets */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-zinc-400">Hablantes rápidos:</label>
        <div className="flex flex-wrap gap-1">
          {["Uandi", "Sofi", "Jaz", "Ian", "Julián", "Mati", "Volvo"].map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { speaker: name })}
              className="px-2 py-1 bg-[#0a0a0f] hover:bg-[#1c1c28] border border-white/10 hover:border-zinc-500 text-zinc-200 text-[10px] font-bold rounded active:translate-y-0.5 transition-all cursor-pointer"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Style Selection */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-zinc-300">Estilo:</label>
        <select
          value={bubble.style || "normal"}
          onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { style: e.target.value as any })}
          className="w-full border border-white/10 p-2 text-xs font-mono rounded bg-[#0a0a0f] text-white focus:outline-none focus:ring-1 focus:ring-[#e8185a] cursor-pointer"
        >
          <option value="normal">Normal (Bocadillo)</option>
          <option value="caption">Narración (Caja)</option>
          <option value="thought">Pensamiento (Nube)</option>
          <option value="scream">Grito (Llamativo/Bangers)</option>
          <option value="whisper">Susurro (Discontinuo/Itálico)</option>
          <option value="electronic">Electrónico (Futurista/Monospace)</option>
          <option value="sfx">💥 Efecto de Sonido (SFX/Onomatopeya)</option>
        </select>
      </div>

      {/* Sound SFX Presets */}
      {bubble.style === "sfx" && (
        <div className="flex flex-col gap-1.5 p-2.5 bg-amber-950/20 border border-amber-800/40 rounded shadow-[1px_1px_0_rgba(245,230,66,0.1)]">
          <label className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
            💥 Presets Rápidos de Sonido (SFX):
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => {
                handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                  customBg: "#f5e642",
                  customColor: "#e8185a",
                  textColor: "#ffffff",
                  fontFamily: "luckiest",
                  fontSize: 28,
                  tail: "none",
                });
              }}
              className="p-1 bg-[#f5e642] hover:bg-[#ffe554] border border-amber-600 text-[#e8185a] text-[10px] font-bold rounded flex items-center justify-center gap-0.5 transition-colors cursor-pointer"
            >
              💥 BAM! (Amarillo/Rosa)
            </button>
            <button
              type="button"
              onClick={() => {
                handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                  customBg: "#e8185a",
                  customColor: "#f5e642",
                  textColor: "#ffffff",
                  fontFamily: "luckiest",
                  fontSize: 28,
                  tail: "none",
                });
              }}
              className="p-1 bg-[#e8185a] hover:bg-[#ff3b7a] border border-rose-600 text-[#f5e642] text-[10px] font-bold rounded flex items-center justify-center gap-0.5 transition-colors cursor-pointer"
            >
              ⚡ POW! (Rosa/Amarillo)
            </button>
            <button
              type="button"
              onClick={() => {
                handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                  customBg: "transparent",
                  customColor: "#0a0a0f",
                  textColor: "#00b8d4",
                  fontFamily: "bungee",
                  fontSize: 24,
                  tail: "none",
                });
              }}
              className="p-1 bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-800 text-cyan-300 text-[10px] font-bold rounded flex items-center justify-center gap-0.5 transition-colors cursor-pointer"
            >
              💨 SWOOSH! (Cian Flotante)
            </button>
            <button
              type="button"
              onClick={() => {
                handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                  customBg: "#0a0a0f",
                  customColor: "#f5e642",
                  textColor: "#f5e642",
                  fontFamily: "luckiest",
                  fontSize: 32,
                  tail: "none",
                });
              }}
              className="p-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-yellow-300 text-[10px] font-bold rounded flex items-center justify-center gap-0.5 transition-colors cursor-pointer"
            >
              💀 BOOM! (Negro/Amarillo)
            </button>
          </div>
        </div>
      )}

      {/* Bubble Size */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-zinc-300">Tamaño del Globo:</label>
        <select
          value={bubble.size || "medium"}
          onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { size: e.target.value as any })}
          className="w-full border border-white/10 p-2 text-xs font-mono rounded bg-[#0a0a0f] text-white focus:outline-none focus:ring-1 focus:ring-[#e8185a] cursor-pointer"
        >
          <option value="small">Pequeño</option>
          <option value="medium">Mediano</option>
          <option value="large">Grande</option>
        </select>
      </div>

      {/* Typography & Colors */}
      <div className="flex flex-col gap-2 p-3 bg-[#0a0a0f] border border-white/10 rounded">
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
          Tipografía y Diseño
        </span>

        {/* Font Family */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-zinc-300">Tipografía:</label>
          <select
            value={bubble.fontFamily || ""}
            onChange={(e) =>
              handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                fontFamily: (e.target.value || undefined) as any,
              })
            }
            className="w-full border border-white/10 p-1.5 text-xs font-mono rounded bg-[#161622] text-white focus:outline-none focus:ring-1 focus:ring-[#e8185a] cursor-pointer"
          >
            <option value="">Por defecto del estilo</option>
            <option value="marker">Marker (Cómic Permanente)</option>
            <option value="bangers">Bangers (Llamativo/Grito)</option>
            <option value="luckiest">Luckiest (Cómic SFX Blocky)</option>
            <option value="bungee">Bungee (Gruesa/Moderna)</option>
            <option value="mono">Monospace (Tecnológico)</option>
            <option value="sans">Sans-Serif (Limpio/Moderno)</option>
            <option value="serif">Serif (Clásico/Elegante)</option>
          </select>
        </div>

        {/* Day/Night Presets */}
        <div className="flex flex-col gap-1 mb-2">
          <label className="text-xs font-bold text-zinc-300">Preset Día / Noche:</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                  customBg: "#ffffff",
                  customColor: "#1c1c1c",
                  textColor: "#1c1c1c",
                });
              }}
              className="flex-1 py-1.5 px-2 bg-white hover:bg-zinc-100 border border-zinc-300 text-[#0a0a0f] text-[10px] font-bold rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              ☀️ Día
            </button>
            <button
              type="button"
              onClick={() => {
                handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                  customBg: "#f5e642",
                  customColor: "#000000",
                  textColor: "#000000",
                });
              }}
              className="flex-1 py-1.5 px-2 bg-yellow-450 hover:bg-yellow-500 border border-amber-600 text-black text-[10px] font-bold rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              🌙 Noche
            </button>
          </div>
        </div>

        {/* Transparency / Translucency Presets */}
        <div className="flex flex-col gap-1 mb-2">
          <label className="text-xs font-bold text-zinc-300">Transparencia / Opacidad:</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                  customBg: "rgba(255, 255, 255, 0.88)",
                  customColor: "#0a0a0f",
                  textColor: "#0a0a0f",
                });
              }}
              className="flex-1 py-1.5 px-2 bg-white/20 hover:bg-white/30 border border-white/20 hover:border-white/40 text-white text-[9px] font-bold rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              💎 Translúcido
            </button>
            <button
              type="button"
              onClick={() => {
                handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                  customBg: "rgba(255, 255, 255, 0.5)",
                  customColor: "#0a0a0f",
                  textColor: "#0a0a0f",
                });
              }}
              className="flex-1 py-1.5 px-2 bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/30 text-white text-[9px] font-bold rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              🌫️ Semitransp.
            </button>
            <button
              type="button"
              onClick={() => {
                handleUpdateBubble(activePanelIdx, activeBubbleIdx, {
                  customBg: "#ffffff",
                });
              }}
              className="flex-1 py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-[9px] font-bold rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              ⚪ Sólido
            </button>
          </div>
        </div>

        {/* Custom Background Color */}
        <div className="flex flex-col gap-1 mt-1">
          <label className="text-xs font-bold text-zinc-300">Color Fondo:</label>
          <div className="flex gap-1.5">
            <input
              type="text"
              value={bubble.customBg || ""}
              onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { customBg: e.target.value })}
              className="flex-1 border border-white/10 px-2 py-1 text-xs font-mono rounded bg-[#161622] text-white focus:outline-none"
              placeholder="#ffffff"
            />
            <input
              type="color"
              value={bubble.customBg || "#ffffff"}
              onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { customBg: e.target.value })}
              className="w-8 h-7 p-0 border border-white/10 rounded cursor-pointer bg-transparent"
            />
          </div>
        </div>

        {/* Custom Border Color */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-zinc-300">Color Borde:</label>
          <div className="flex gap-1.5">
            <input
              type="text"
              value={bubble.customColor || ""}
              onChange={(e) =>
                handleUpdateBubble(activePanelIdx, activeBubbleIdx, { customColor: e.target.value })
              }
              className="flex-1 border border-white/10 px-2 py-1 text-xs font-mono rounded bg-[#161622] text-white focus:outline-none"
              placeholder="#0a0a0f"
            />
            <input
              type="color"
              value={bubble.customColor || "#0a0a0f"}
              onChange={(e) =>
                handleUpdateBubble(activePanelIdx, activeBubbleIdx, { customColor: e.target.value })
              }
              className="w-8 h-7 p-0 border border-white/10 rounded cursor-pointer bg-transparent"
            />
          </div>
        </div>

        {/* Custom Text Color */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-zinc-300">Color Texto:</label>
          <div className="flex gap-1.5">
            <input
              type="text"
              value={bubble.textColor || ""}
              onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { textColor: e.target.value })}
              className="flex-1 border border-white/10 px-2 py-1 text-xs font-mono rounded bg-[#161622] text-white focus:outline-none"
              placeholder="#0a0a0f"
            />
            <input
              type="color"
              value={bubble.textColor || "#000000"}
              onChange={(e) => handleUpdateBubble(activePanelIdx, activeBubbleIdx, { textColor: e.target.value })}
              className="w-8 h-7 p-0 border border-white/10 rounded cursor-pointer bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
