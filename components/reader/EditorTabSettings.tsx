"use client";

import React from "react";
import type { ChapterSettings } from "./DialogueEditorPanel";

interface EditorTabSettingsProps {
  settings: ChapterSettings;
  handleUpdateSettings: (updates: Partial<ChapterSettings>) => void;
}

/**
 * EditorTabSettings Component
 * Form rendering fields to control dialogue animations, disappearance styling,
 * auto cleanup settings and parallax depth.
 */
export function EditorTabSettings({
  settings,
  handleUpdateSettings,
}: EditorTabSettingsProps) {
  return (
    <div className="p-4 shrink-0 flex flex-col gap-3 border-b border-white/10 bg-[#161622]">
      <div className="font-[var(--font-bangers)] text-lg text-zinc-300 tracking-wider">
        ⚙️ Configuración del Capítulo
      </div>

      <div className="flex flex-col gap-3.5 mt-1 bg-[#0a0a0f] p-3 border border-white/10 rounded">
        {/* Clear Read Dialogues Toggle */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-zinc-300">Limpieza Automática:</span>
            <span className="text-[9px] text-zinc-500">Ocultar globos leídos</span>
          </div>
          <input
            type="checkbox"
            checked={settings.clearReadDialogues ?? true}
            onChange={(e) => handleUpdateSettings({ clearReadDialogues: e.target.checked })}
            className="w-4 h-4 accent-[#e8185a] cursor-pointer"
          />
        </div>

        {/* Appearance Animation Selector */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-zinc-300">Animación Aparición:</span>
          <select
            value={settings.appearanceAnimation ?? "spring"}
            onChange={(e) => handleUpdateSettings({ appearanceAnimation: e.target.value as any })}
            className="border border-white/10 p-1 text-xs rounded bg-[#161622] text-white focus:outline-none focus:ring-1 focus:ring-[#e8185a] cursor-pointer"
          >
            <option value="spring">Spring (Cómic Rebote)</option>
            <option value="fade">Fade (Desvanecer)</option>
            <option value="slide">Slide (Deslizar desde abajo)</option>
            <option value="zoom">Zoom (Escalar desde centro)</option>
          </select>
        </div>

        {/* Fade Out Animation Selector */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-zinc-300">Animación Desaparición:</span>
          <select
            value={settings.fadeOutAnimation ?? "fade"}
            onChange={(e) => handleUpdateSettings({ fadeOutAnimation: e.target.value as any })}
            className="border border-white/10 p-1 text-xs rounded bg-[#161622] text-white focus:outline-none focus:ring-1 focus:ring-[#e8185a] cursor-pointer"
          >
            <option value="fade">Fade (Desvanecer)</option>
            <option value="slide">Slide (Deslizar hacia arriba)</option>
            <option value="zoom">Zoom (Encoger hacia centro)</option>
          </select>
        </div>

        {/* Parallax Depth Selector */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-300">
            <span>Profundidad (Parallax): {settings.dialogueDepth ?? 2}</span>
            <span className="text-[9px] text-zinc-500">Efecto 3D</span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="1"
            value={settings.dialogueDepth ?? 2}
            onChange={(e) => handleUpdateSettings({ dialogueDepth: parseInt(e.target.value) })}
            className="w-full accent-[#e8185a] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
