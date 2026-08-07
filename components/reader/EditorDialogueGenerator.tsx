"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { Dialogues, PanelStop } from "./audioPlayer";
import type { AiDialogueProposal, DialogueDensity, DialogueTone } from "./dialogueAi";
import { getPageKeyFromUrl } from "./readerUtils";
import {
  createEmptyDialogueContext,
  getPageDialogueContext,
  type DialogueContextConfig,
} from "@/lib/dialogueContext";

interface EditorDialogueGeneratorProps {
  chapterId: string;
  sagaTitle: string;
  chapterTitle: string;
  pageIdx: number;
  pages: string[];
  currentPanels: PanelStop[];
  localDialogues: Dialogues;
  onApply: (proposals: AiDialogueProposal[]) => void;
}

const TONE_OPTIONS: Array<{ value: DialogueTone; label: string }> = [
  { value: "neutral", label: "Natural" },
  { value: "dramatic", label: "Dramático" },
  { value: "comedic", label: "Cómico" },
  { value: "dark", label: "Oscuro" },
  { value: "epic", label: "Épico" },
  { value: "intimate", label: "Íntimo" },
];

const DENSITY_OPTIONS: Array<{ value: DialogueDensity; label: string }> = [
  { value: "sparse", label: "Baja" },
  { value: "balanced", label: "Media" },
  { value: "dense", label: "Alta" },
];

export function EditorDialogueGenerator({
  chapterId,
  sagaTitle,
  chapterTitle,
  pageIdx,
  pages,
  currentPanels,
  localDialogues,
  onApply,
}: EditorDialogueGeneratorProps) {
  const [instruction, setInstruction] = useState("");
  const [tone, setTone] = useState<DialogueTone>("neutral");
  const [density, setDensity] = useState<DialogueDensity>("balanced");
  const [maxDialogues, setMaxDialogues] = useState(6);
  const [proposals, setProposals] = useState<AiDialogueProposal[]>([]);
  const [appliedIndexes, setAppliedIndexes] = useState<Set<number>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contextConfig, setContextConfig] = useState<DialogueContextConfig>(createEmptyDialogueContext());
  const [pagePrompt, setPagePrompt] = useState("");
  const [charactersInput, setCharactersInput] = useState("");
  const [continuityPages, setContinuityPages] = useState(2);
  const [contextStatus, setContextStatus] = useState<"loading" | "idle" | "saving" | "saved" | "error">("loading");

  const pageKey = getPageKeyFromUrl(pages[pageIdx]);

  const loadContext = useCallback(async () => {
    setContextStatus("loading");
    try {
      const savedPass = sessionStorage.getItem("editor_password") || "";
      const response = await fetch(`/api/chapters/${encodeURIComponent(chapterId)}/dialogues/context`, {
        headers: { "x-editor-password": savedPass },
      });
      if (!response.ok) throw new Error("No se pudo cargar el contexto");
      const data = await response.json();
      const nextConfig = data.context || createEmptyDialogueContext();
      const pageContext = getPageDialogueContext(nextConfig, pageKey);
      setContextConfig(nextConfig);
      setPagePrompt(pageContext.prompt);
      setCharactersInput(pageContext.characters.join(", "));
      setContinuityPages(pageContext.continuityPages);
      setContextStatus("idle");
    } catch (contextError) {
      console.error(contextError);
      setContextStatus("error");
    }
  }, [chapterId, pageKey]);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => void loadContext(), 0);
    const handleContextUpdate = () => loadContext();
    window.addEventListener("dialogue-context-updated", handleContextUpdate);
    return () => {
      window.clearTimeout(initialLoad);
      window.removeEventListener("dialogue-context-updated", handleContextUpdate);
    };
  }, [loadContext]);

  const parsedCharacters = useMemo(
    () => charactersInput.split(",").map((character) => character.trim()).filter(Boolean),
    [charactersInput]
  );

  const previousPageKeys = useMemo(
    () => pages
      .slice(Math.max(0, pageIdx - continuityPages), pageIdx)
      .map((page) => getPageKeyFromUrl(page)),
    [continuityPages, pageIdx, pages]
  );

  const recentContinuity = useMemo(() => {
    return pages
      .map((page, index) => ({ page, index }))
      .filter(({ index }) => index >= Math.max(0, pageIdx - continuityPages) && index < pageIdx)
      .map((index) => {
        const continuityPageKey = getPageKeyFromUrl(index.page);
        const panels = localDialogues.pages?.[continuityPageKey]?.panels || [];
        return {
          pageKey: continuityPageKey,
          panels: panels.map((panel, panelIndex) => ({
            panelIndex,
            dialogues: (panel.dialogue || []).map((line) => ({
              speaker: line.speaker || null,
              text: line.text,
              style: line.style || "normal",
            })),
          })),
        };
      });
  }, [continuityPages, localDialogues.pages, pageIdx, pages]);

  const savePageContext = async () => {
    const savedPass = sessionStorage.getItem("editor_password") || "";
    const nextConfig: DialogueContextConfig = {
      ...contextConfig,
      pages: {
        ...contextConfig.pages,
        [pageKey]: {
          prompt: pagePrompt.trim(),
          characters: parsedCharacters,
          continuityPages,
        },
      },
    };

    setContextStatus("saving");
    const response = await fetch(`/api/chapters/${encodeURIComponent(chapterId)}/dialogues/context`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-editor-password": savedPass },
      body: JSON.stringify(nextConfig),
    });
    if (!response.ok) {
      setContextStatus("error");
      throw new Error("No se pudo guardar el contexto de la página.");
    }
    setContextConfig(nextConfig);
    setContextStatus("saved");
    setTimeout(() => setContextStatus("idle"), 1800);
  };

  const generate = async () => {
    if (instruction.trim().length < 3 || currentPanels.length === 0) return;

    setIsGenerating(true);
    setError(null);
    try {
      await savePageContext();
      const savedPass = sessionStorage.getItem("editor_password") || "";
      const response = await fetch(`/api/chapters/${encodeURIComponent(chapterId)}/dialogues/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-editor-password": savedPass,
        },
        body: JSON.stringify({
          instruction: instruction.trim(),
          tone,
          density,
          maxDialogues,
          pageKey,
          imageUrl: pages[pageIdx] || "",
          recentContinuity,
          panels: currentPanels.map((panel, panelIndex) => ({
            panelIndex,
            focusY: Math.max(0, Math.min(1, panel.focusY ?? 0.5)),
            existingDialogues: (panel.dialogue || []).map((line) => ({
              speaker: line.speaker || null,
              text: line.text,
              style: line.style || "normal",
            })),
            zoomRects: (panel.zoomRects || (panel.zoomRect ? [panel.zoomRect] : [])).map((rect) => ({
              x: Math.max(0, Math.min(1, rect.x / 100)),
              y: Math.max(0, Math.min(1, rect.y / 100)),
              w: Math.max(0, Math.min(1, rect.w / 100)),
              h: Math.max(0, Math.min(1, rect.h / 100)),
            })),
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "No se pudieron generar los diálogos.");
      }

      setProposals(Array.isArray(data.dialogues) ? data.dialogues : []);
      setAppliedIndexes(new Set());
    } catch (generationError) {
      setError(
        generationError instanceof Error
          ? generationError.message
          : "No se pudieron generar los diálogos."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const applyOne = (proposal: AiDialogueProposal, index: number) => {
    if (appliedIndexes.has(index)) return;
    onApply([proposal]);
    setAppliedIndexes((current) => new Set(current).add(index));
  };

  const applyAll = () => {
    const pending = proposals.filter((_, index) => !appliedIndexes.has(index));
    if (pending.length === 0) return;
    onApply(pending);
    setAppliedIndexes(new Set(proposals.map((_, index) => index)));
  };

  const discard = () => {
    setProposals([]);
    setAppliedIndexes(new Set());
    setError(null);
  };

  const pendingCount = proposals.length - appliedIndexes.size;

  return (
    <details open className="group bg-[#10101a] border border-cyan-500/25 rounded-lg shadow-md">
      <summary className="p-3 cursor-pointer select-none flex items-center justify-between gap-3 hover:bg-cyan-500/5">
        <span className="font-[var(--font-bangers)] tracking-wider text-cyan-200">
          ✦ Propuestas con IA
        </span>
        <span className="text-[10px] text-zinc-500 group-open:rotate-180 transition-transform">▼</span>
      </summary>

      <div className="p-3 border-t border-cyan-500/15 flex flex-col gap-3">
        <section className="rounded border border-white/10 bg-[#0a0a0f] p-2.5 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-zinc-200">Contexto utilizado</span>
            <span className={`text-[9px] font-mono ${contextStatus === "error" ? "text-red-400" : "text-zinc-500"}`}>
              {contextStatus === "loading" ? "Cargando…" : contextStatus === "saving" ? "Guardando…" : contextStatus === "saved" ? "Guardado ✓" : contextStatus === "error" ? "Error" : "Persistente por capítulo"}
            </span>
          </div>
          <dl className="grid grid-cols-[72px_1fr] gap-x-2 gap-y-1 text-[10px]">
            <dt className="text-zinc-500">Saga</dt><dd className="text-zinc-300 truncate">{sagaTitle}</dd>
            <dt className="text-zinc-500">Capítulo</dt><dd className="text-zinc-300 truncate">{chapterTitle}</dd>
            <dt className="text-zinc-500">Página</dt><dd className="text-zinc-300 font-mono">{pageKey}</dd>
            <dt className="text-zinc-500">Docs</dt>
            <dd className="text-zinc-300">
              {contextConfig.documents.length === 0
                ? "Ninguno asociado desde Docs"
                : contextConfig.documents.map((document) => `${document.role}: ${document.path}`).join(" · ")}
            </dd>
            <dt className="text-zinc-500">Anteriores</dt>
            <dd className="text-zinc-300">{previousPageKeys.length > 0 ? previousPageKeys.join(", ") : "Ninguna"}</dd>
          </dl>

          <label className="flex flex-col gap-1 text-[10px] font-bold text-zinc-400">
            Personajes de la página (separados por coma)
            <input
              value={charactersInput}
              onChange={(event) => setCharactersInput(event.target.value)}
              placeholder="Nombre del personaje, Otro personaje"
            />
          </label>
          <label className="flex flex-col gap-1 text-[10px] font-bold text-zinc-400">
            Prompt original / descripción de página
            <textarea
              value={pagePrompt}
              onChange={(event) => setPagePrompt(event.target.value)}
              rows={3}
              maxLength={8000}
              placeholder="Pegá o escribí el prompt visual/narrativo original de esta página."
              className="resize-y"
            />
          </label>
          <div className="flex items-end gap-2">
            <label className="flex-1 flex flex-col gap-1 text-[10px] font-bold text-zinc-400">
              Páginas anteriores incluidas
              <input
                type="number"
                min={0}
                max={10}
                value={continuityPages}
                onChange={(event) => setContinuityPages(Math.max(0, Math.min(10, Number(event.target.value) || 0)))}
              />
            </label>
            <button
              type="button"
              onClick={() => savePageContext().catch((saveError) => setError(saveError.message))}
              className="px-2.5 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] font-bold text-white border border-white/10"
            >
              Guardar contexto
            </button>
          </div>
        </section>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-zinc-300">Instrucción para esta generación</label>
          <textarea
            value={instruction}
            onChange={(event) => setInstruction(event.target.value)}
            maxLength={4000}
            rows={4}
            placeholder="Ej.: Un personaje descubre una mentira; la escena empieza contenida y termina con una amenaza."
            className="w-full resize-y"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <label className="flex flex-col gap-1 text-[10px] font-bold text-zinc-400">
            Tono
            <select value={tone} onChange={(event) => setTone(event.target.value as DialogueTone)}>
              {TONE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-[10px] font-bold text-zinc-400">
            Densidad
            <select value={density} onChange={(event) => setDensity(event.target.value as DialogueDensity)}>
              {DENSITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-[10px] font-bold text-zinc-400">
            Máximo
            <input
              type="number"
              min={1}
              max={12}
              value={maxDialogues}
              onChange={(event) => setMaxDialogues(Math.max(1, Math.min(12, Number(event.target.value) || 1)))}
            />
          </label>
        </div>

        {currentPanels.length === 0 && (
          <p className="text-xs text-amber-300 bg-amber-950/30 border border-amber-500/20 rounded p-2">
            Creá al menos una parada antes de generar; la IA asigna cada propuesta a una parada existente.
          </p>
        )}

        {error && (
          <p role="alert" className="text-xs text-red-300 bg-red-950/30 border border-red-500/25 rounded p-2">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={generate}
          disabled={isGenerating || instruction.trim().length < 3 || currentPanels.length === 0}
          className="w-full py-2 rounded bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-[var(--font-bangers)] tracking-wider transition-colors"
        >
          {isGenerating ? "Analizando página…" : proposals.length > 0 ? "Regenerar" : "Generar diálogos"}
        </button>

        {proposals.length > 0 && (
          <div className="flex flex-col gap-2 border-t border-white/10 pt-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">
                Preview · {proposals.length} propuestas
              </span>
              <span className="text-[10px] text-zinc-500">No se guardan hasta aplicar y guardar JSON</span>
            </div>

            <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
              {proposals.map((proposal, index) => {
                const isApplied = appliedIndexes.has(index);
                return (
                  <article
                    key={`${proposal.panelIndex}-${index}-${proposal.text}`}
                    className={`p-2.5 rounded border ${isApplied ? "border-emerald-500/30 bg-emerald-950/15" : "border-white/10 bg-[#0a0a0f]"}`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-mono text-cyan-300">
                        Parada {proposal.panelIndex + 1} · {proposal.style}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-500">
                        {Math.round(proposal.posX * 100)}%, {Math.round(proposal.posY * 100)}%
                      </span>
                    </div>
                    <p className="text-xs text-zinc-200 leading-relaxed">
                      {proposal.speaker && <strong className="text-white">{proposal.speaker}: </strong>}
                      {proposal.text}
                    </p>
                    <button
                      type="button"
                      onClick={() => applyOne(proposal, index)}
                      disabled={isApplied}
                      className="mt-2 text-[10px] px-2 py-1 rounded bg-indigo-700 hover:bg-indigo-600 disabled:bg-emerald-800/50 disabled:text-emerald-200 text-white font-bold"
                    >
                      {isApplied ? "Aplicado ✓" : "Aplicar individualmente"}
                    </button>
                  </article>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={applyAll}
                disabled={pendingCount === 0}
                className="py-1.5 rounded bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 text-white text-xs font-bold"
              >
                Aplicar todos
              </button>
              <button
                type="button"
                onClick={generate}
                disabled={isGenerating}
                className="py-1.5 rounded bg-zinc-700 hover:bg-zinc-600 disabled:opacity-40 text-white text-xs font-bold"
              >
                Regenerar
              </button>
              <button
                type="button"
                onClick={discard}
                className="py-1.5 rounded border border-red-500/30 bg-red-950/30 hover:bg-red-900/40 text-red-200 text-xs font-bold"
              >
                Descartar
              </button>
            </div>
          </div>
        )}
      </div>
    </details>
  );
}
