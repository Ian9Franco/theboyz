"use client";

import React from "react";
import type { ChapterSettings } from "./DialogueEditorPanel";

interface EditorTabSettingsProps {
  settings: ChapterSettings;
  handleUpdateSettings: (updates: Partial<ChapterSettings>) => void;
  isGlobalSettingsOpen: boolean;
  setIsGlobalSettingsOpen: (val: boolean) => void;
}

/**
 * EditorTabSettings Component
 * Form rendering fields to control dialogue animations, disappearance styling,
 * auto cleanup settings and parallax depth.
 */
export function EditorTabSettings({
  settings,
  handleUpdateSettings,
  isGlobalSettingsOpen,
  setIsGlobalSettingsOpen,
}: EditorTabSettingsProps) {
  return (
    <div className="p-4 shrink-0 flex flex-col gap-3 border-b-2 border-zinc-200 bg-zinc-50/50">
      <button
        type="button"
        onClick={() => setIsGlobalSettingsOpen(!isGlobalSettingsOpen)}
        className="flex items-center gap-1.5 font-[var(--font-bangers)] text-lg text-zinc-600 tracking-wider hover:text-[#e8185a] transition-colors"
      >
        <span>{isGlobalSettingsOpen ? "▼" : "▶"} Configuración del Capítulo</span>
      </button>

      {isGlobalSettingsOpen && (
        <div className="flex flex-col gap-3.5 mt-1 bg-white p-3 border border-zinc-200 rounded">
          {/* Clear Read Dialogues Toggle */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-zinc-700">Limpieza Automática:</span>
              <span className="text-[9px] text-zinc-400">Ocultar globos leídos</span>
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
            <span className="text-xs font-bold text-zinc-700">Animación Aparición:</span>
            <select
              value={settings.appearanceAnimation ?? "spring"}
              onChange={(e) => handleUpdateSettings({ appearanceAnimation: e.target.value as any })}
              className="border border-zinc-300 p-1 text-xs rounded bg-white text-[#0a0a0f]"
            >
              <option value="spring">Spring (Cómic Rebote)</option>
              <option value="fade">Fade (Desvanecer)</option>
              <option value="slide">Slide (Deslizar desde abajo)</option>
              <option value="zoom">Zoom (Escalar desde centro)</option>
            </select>
          </div>

          {/* Fade Out Animation Selector */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-zinc-700">Animación Desaparición:</span>
            <select
              value={settings.fadeOutAnimation ?? "fade"}
              onChange={(e) => handleUpdateSettings({ fadeOutAnimation: e.target.value as any })}
              className="border border-zinc-300 p-1 text-xs rounded bg-white text-[#0a0a0f]"
            >
              <option value="fade">Fade (Desvanecer)</option>
              <option value="slide">Slide (Deslizar hacia arriba)</option>
              <option value="zoom">Zoom (Encoger hacia centro)</option>
            </select>
          </div>

          {/* Parallax Depth Selector */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-xs font-bold text-zinc-700">
              <span>Profundidad (Parallax): {settings.dialogueDepth ?? 2}</span>
              <span className="text-[9px] text-zinc-400">Efecto 3D</span>
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
      )}
    </div>
  );
}
