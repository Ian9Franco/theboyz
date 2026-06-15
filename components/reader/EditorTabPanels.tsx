"use client";

import React, { useState, useEffect, useRef } from "react";
import type { PanelConfig } from "./DialogueEditorPanel";
import type { PanelSound } from "./CinematicReader";

/**
 * WaveformVisualizer Component
 * Draws an audio waveform on canvas with trim start/end markers
 */
interface WaveformVisualizerProps {
  soundPath: string;
  startTime?: number;
  endTime?: number;
  height?: number;
}

function WaveformVisualizer({ soundPath, startTime = 0, endTime, height = 60 }: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const analyzeAudio = async () => {
      try {
        const response = await fetch(soundPath);
        const arrayBuffer = await response.arrayBuffer();
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        setDuration(audioBuffer.duration);

        // Sample the audio data
        const samples = 200; // Number of bars in waveform
        const blockSize = Math.floor(audioBuffer.length / samples);
        const filteredData: number[] = [];
        const rawData = audioBuffer.getChannelData(0); // Get mono channel

        for (let i = 0; i < samples; i++) {
          let sum = 0;
          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(rawData[i * blockSize + j]);
          }
          filteredData.push(sum / blockSize);
        }

        setWaveformData(filteredData);
      } catch (error) {
        console.error("Error analyzing audio:", error);
      }
    };

    if (soundPath) {
      analyzeAudio();
    }
  }, [soundPath]);

  useEffect(() => {
    if (!canvasRef.current || waveformData.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const h = canvas.height;

    // Clear canvas
    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 0, width, h);

    // Draw waveform
    const barWidth = width / waveformData.length;
    const maxValue = Math.max(...waveformData, 0.01);

    ctx.fillStyle = "#3b82f6";
    waveformData.forEach((value, index) => {
      const barHeight = (value / maxValue) * (h * 0.8);
      const x = index * barWidth;
      const y = (h - barHeight) / 2;
      ctx.fillRect(x, y, barWidth - 1, barHeight);
    });

    // Draw trim markers
    if (endTime !== undefined && duration > 0) {
      const startPixel = (startTime / duration) * width;
      const endPixel = (endTime / duration) * width;

      // Start marker (green)
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(startPixel, 0);
      ctx.lineTo(startPixel, h);
      ctx.stroke();

      // End marker (red)
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(endPixel, 0);
      ctx.lineTo(endPixel, h);
      ctx.stroke();

      // Fill trimmed area
      ctx.fillStyle = "rgba(59, 130, 246, 0.1)";
      ctx.fillRect(startPixel, 0, endPixel - startPixel, h);
    }
  }, [waveformData, startTime, endTime, duration]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={height}
      className="w-full border border-zinc-300 rounded bg-gray-100"
    />
  );
}

interface EditorTabPanelsProps {
  currentPanels: PanelConfig[];
  activePanelIdx: number;
  activeBubbleIdx: number | null;
  isViñetasOpen: boolean;
  setIsViñetasOpen: (val: boolean) => void;
  handleAddPanel: () => void;
  setActivePanelIdx: (idx: number) => void;
  setActiveBubbleIdx: (idx: number | null) => void;
  handleRemovePanel: (idx: number) => void;
  handleUpdatePanelParams: (pIdx: number, updates: Partial<PanelConfig>) => void;
  handleAddBubble: (pIdx: number) => void;
}

/**
 * EditorTabPanels Component
 * Renders the panels accordion section allowing the editor to add, remove,
 * and rearrange panel stops, their individual zoom & spoiler regions, auto-advance timers,
 * and oclusion/spoiler states.
 */
export function EditorTabPanels({
  currentPanels,
  activePanelIdx,
  activeBubbleIdx,
  isViñetasOpen,
  setIsViñetasOpen,
  handleAddPanel,
  setActivePanelIdx,
  setActiveBubbleIdx,
  handleRemovePanel,
  handleUpdatePanelParams,
  handleAddBubble,
}: EditorTabPanelsProps) {
  const [availableSounds, setAvailableSounds] = useState<Array<{ name: string; path: string }>>([]);
  const [previewingSound, setPreviewingSound] = useState<string | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);
  const previewIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [soundMetadata, setSoundMetadata] = useState<Record<string, number>>({});
  // Track which panels have their audio confirmed (for visual feedback only — data updates in real time)
  const [confirmedPanels, setConfirmedPanels] = useState<Set<number>>(new Set());

  useEffect(() => {
    const loadSounds = async () => {
      try {
        const response = await fetch("/api/sounds");
        const sounds = await response.json();
        setAvailableSounds(sounds);
      } catch (error) {
        console.error("Error loading sounds:", error);
      }
    };
    loadSounds();
  }, []);

  // Load audio durations for any audio files in the active panel configuration
  useEffect(() => {
    const activePanel = currentPanels[activePanelIdx];
    if (!activePanel) return;

    const paths: string[] = [];
    if (activePanel.sounds && Array.isArray(activePanel.sounds)) {
      activePanel.sounds.forEach((s) => {
        if (s.sound) paths.push(s.sound);
      });
    } else if (activePanel.sound) {
      paths.push(activePanel.sound);
    }

    paths.forEach((path) => {
      const audio = new Audio();
      audio.src = path;
      audio.onloadedmetadata = () => {
        setSoundMetadata((prev) => {
          if (prev[path] === audio.duration) return prev;
          return { ...prev, [path]: audio.duration };
        });
      };
    });
  }, [activePanelIdx, currentPanels]);

  const stopPreview = () => {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      previewAudioRef.current.currentTime = 0;
      previewAudioRef.current.volume = 1;
      previewAudioRef.current.playbackRate = 1;
    }
    if (previewIntervalRef.current) {
      clearInterval(previewIntervalRef.current);
      previewIntervalRef.current = null;
    }
    setPreviewingSound(null);
  };

  const playPreview = (
    soundPath: string,
    config?: {
      startTime?: number;
      endTime?: number;
      volume?: number;
      playbackRate?: number;
      fadeIn?: number;
      fadeOut?: number;
      delay?: number;
    }
  ) => {
    stopPreview();

    const {
      startTime = 0,
      endTime,
      volume = 1,
      playbackRate = 1,
      fadeIn = 0,
      fadeOut = 0,
      delay = 0,
    } = config || {};
    const targetVolume = volume * volume;

    const audio = new Audio();
    audio.src = soundPath;
    audio.currentTime = startTime;
    audio.playbackRate = playbackRate;
    audio.volume = fadeIn > 0 ? 0 : targetVolume;
    previewAudioRef.current = audio;
    setPreviewingSound(soundPath);

    const fadeInIntervalsRef: NodeJS.Timeout[] = [];
    const fadeOutIntervalsRef: NodeJS.Timeout[] = [];

    const playWithDelay = () => {
      try {
        audio.play();

        // Fade in
        if (fadeIn > 0) {
          const fadeInSteps = 30;
          const stepDuration = fadeIn / fadeInSteps;
          const volumePerStep = targetVolume / fadeInSteps;
          let currentStep = 0;

          const fadeInInterval = setInterval(() => {
            if (currentStep < fadeInSteps && previewAudioRef.current === audio) {
              audio.volume = Math.min(targetVolume, audio.volume + volumePerStep);
              currentStep++;
            } else {
              if (previewAudioRef.current === audio) {
                audio.volume = targetVolume;
              }
              clearInterval(fadeInInterval);
              fadeInIntervalsRef.splice(fadeInIntervalsRef.indexOf(fadeInInterval), 1);
            }
          }, stepDuration);
          fadeInIntervalsRef.push(fadeInInterval);
        }

        // Check for end time and apply fade out
        if (endTime || fadeOut > 0) {
          const effectiveDuration = endTime ? endTime - startTime : audio.duration;
          const fadeOutStartTime = effectiveDuration - fadeOut / 1000;

          previewIntervalRef.current = setInterval(() => {
            if (previewAudioRef.current !== audio) {
              clearInterval(previewIntervalRef.current!);
              return;
            }

            if (endTime && audio.currentTime >= endTime) {
              stopPreview();
              clearInterval(previewIntervalRef.current!);
              previewIntervalRef.current = null;
            } else if (fadeOut > 0 && audio.currentTime - startTime >= fadeOutStartTime) {
              const timeUntilEnd = endTime ? endTime - audio.currentTime : audio.duration - audio.currentTime;
              const newVolume = Math.max(
                0,
                targetVolume * Math.max(0, timeUntilEnd / (fadeOut / 1000))
              );
              audio.volume = newVolume;

              if (audio.volume <= 0 || (endTime && audio.currentTime >= endTime)) {
                stopPreview();
                clearInterval(previewIntervalRef.current!);
                previewIntervalRef.current = null;
              }
            }
          }, 50);
        }
      } catch (error) {
        console.error("Error playing preview:", error);
        setPreviewingSound(null);
      }
    };

    if (delay > 0) {
      setTimeout(playWithDelay, delay);
    } else {
      playWithDelay();
    }
  };

  return (
    <div className="p-4 shrink-0 flex flex-col gap-3 border-b-2 border-zinc-200">
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => setIsViñetasOpen(!isViñetasOpen)}
          className="flex items-center gap-1.5 font-[var(--font-bangers)] text-lg text-zinc-600 tracking-wider hover:text-[#e8185a] transition-colors"
        >
          <span>{isViñetasOpen ? "▼" : "▶"} Paradas de Viñetas</span>
          <span className="text-xs font-mono bg-zinc-200 text-zinc-700 px-1.5 py-0.5 rounded-full">
            {currentPanels.length}
          </span>
        </button>
        <button
          type="button"
          onClick={handleAddPanel}
          className="font-[var(--font-bangers)] text-xs bg-emerald-500 text-white border border-[#0a0a0f] px-2 py-1 shadow-[1px_1px_0_#0a0a0f] hover:bg-emerald-600 transition-colors"
        >
          + Agregar Viñeta
        </button>
      </div>

      {isViñetasOpen && (
        <div className="flex flex-col gap-3 pr-1">
          {currentPanels.length === 0 ? (
            <div className="text-sm text-zinc-400 italic text-center py-6 border border-dashed border-zinc-300 rounded">
              No hay viñetas definidas en esta página. Agregá una para empezar.
            </div>
          ) : (
            currentPanels.map((panel, pIdx) => {
              const isSelected = activePanelIdx === pIdx;
              const rects = panel.zoomRects || (panel.zoomRect ? [panel.zoomRect] : []);

              return (
                <div
                  key={pIdx}
                  onClick={() => {
                    setActivePanelIdx(pIdx);
                    setActiveBubbleIdx(null);
                  }}
                  className={`p-3 border-2 border-[#0a0a0f] transition-all cursor-pointer ${
                    isSelected
                      ? "bg-yellow-50 shadow-[3px_3px_0_#0a0a0f]"
                      : "bg-zinc-50 hover:bg-zinc-100"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-[var(--font-marker)] text-xs text-[#0a0a0f]">
                      Viñeta {pIdx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePanel(pIdx);
                      }}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>

                  {/* FocusY Slider */}
                  <div className="flex flex-col gap-1 mb-2">
                    <div className="flex justify-between text-xs font-mono text-zinc-500">
                      <span>Posición Foco Y:</span>
                      <span>{panel.focusY ?? 0.5}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={panel.focusY ?? 0.5}
                      onChange={(e) =>
                        handleUpdatePanelParams(pIdx, { focusY: parseFloat(e.target.value) })
                      }
                      className="w-full accent-[#e8185a]"
                    />
                  </div>

                  {/* Cinematic Zoom / Closeup Config */}
                  <div className="border border-zinc-300 p-2 rounded bg-zinc-100/50 mb-3 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1">
                        🔍 Áreas de Zoom y Máscaras
                      </label>
                      <span className="text-[10px] font-mono bg-zinc-200 px-1.5 py-0.5 rounded text-zinc-600">
                        {rects.length} área(s)
                      </span>
                    </div>

                    {rects.length === 0 ? (
                      <div className="text-[10px] text-zinc-400 italic text-center py-2">
                        Sin áreas de zoom/occlusión.
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-0.5">
                        {rects.map((zoomRect, rIdx) => (
                          <div
                            key={rIdx}
                            className="border border-zinc-200 p-2 rounded bg-white flex flex-col gap-1.5"
                          >
                            <div className="flex justify-between items-center border-b border-zinc-100 pb-1 mb-0.5">
                              <span className="text-[9px] font-bold text-zinc-700">
                                {rIdx === 0
                                  ? "🎯 Área Zoom Principal"
                                  : `🤫 Máscara Spoiler ${rIdx + 1}`}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const newRects = rects.filter((_, idx) => idx !== rIdx);
                                  handleUpdatePanelParams(pIdx, {
                                    zoomRects: newRects.length > 0 ? newRects : undefined,
                                    zoomRect: undefined,
                                  });
                                }}
                                className="text-[9px] text-red-500 hover:underline font-bold"
                              >
                                Eliminar
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-1.5">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[8px] font-mono text-zinc-500">
                                  X: {zoomRect.x}%
                                </span>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  step="1"
                                  value={zoomRect.x}
                                  onChange={(e) => {
                                    const newRects = rects.map((r, idx) =>
                                      idx === rIdx ? { ...r, x: parseInt(e.target.value) } : r
                                    );
                                    handleUpdatePanelParams(pIdx, {
                                      zoomRects: newRects,
                                      zoomRect: undefined,
                                    });
                                  }}
                                  className="w-full accent-emerald-500 cursor-pointer h-1"
                                />
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[8px] font-mono text-zinc-500">
                                  Y: {zoomRect.y}%
                                </span>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  step="1"
                                  value={zoomRect.y}
                                  onChange={(e) => {
                                    const newRects = rects.map((r, idx) =>
                                      idx === rIdx ? { ...r, y: parseInt(e.target.value) } : r
                                    );
                                    handleUpdatePanelParams(pIdx, {
                                      zoomRects: newRects,
                                      zoomRect: undefined,
                                    });
                                  }}
                                  className="w-full accent-emerald-500 cursor-pointer h-1"
                                />
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[8px] font-mono text-zinc-500">
                                  Ancho: {zoomRect.w}%
                                </span>
                                <input
                                  type="range"
                                  min="10"
                                  max="100"
                                  step="1"
                                  value={zoomRect.w}
                                  onChange={(e) => {
                                    const newRects = rects.map((r, idx) =>
                                      idx === rIdx ? { ...r, w: parseInt(e.target.value) } : r
                                    );
                                    handleUpdatePanelParams(pIdx, {
                                      zoomRects: newRects,
                                      zoomRect: undefined,
                                    });
                                  }}
                                  className="w-full accent-emerald-500 cursor-pointer h-1"
                                />
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[8px] font-mono text-zinc-500">
                                  Alto: {zoomRect.h}%
                                </span>
                                <input
                                  type="range"
                                  min="10"
                                  max="100"
                                  step="1"
                                  value={zoomRect.h}
                                  onChange={(e) => {
                                    const newRects = rects.map((r, idx) =>
                                      idx === rIdx ? { ...r, h: parseInt(e.target.value) } : r
                                    );
                                    handleUpdatePanelParams(pIdx, {
                                      zoomRects: newRects,
                                      zoomRect: undefined,
                                    });
                                  }}
                                  className="w-full accent-emerald-500 cursor-pointer h-1"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newRects = [...rects, { x: 20, y: 20, w: 60, h: 60 }];
                        handleUpdatePanelParams(pIdx, { zoomRects: newRects, zoomRect: undefined });
                      }}
                      className="font-[var(--font-bangers)] text-[10px] bg-emerald-500 hover:bg-emerald-600 text-white py-1 px-2.5 rounded transition-all mt-1 w-full text-center tracking-wider shadow-[1px_1px_0_#0a0a0f]"
                    >
                      + Agregar Área (Zoom/Máscara)
                    </button>

                    {/* Duration and Anti-Spoiler config */}
                    <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-zinc-200">
                      {/* Auto-advance duration */}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center text-[10px] font-bold text-zinc-600">
                          <span>
                            ⏱️ Auto-avance: {panel.duration ? `${panel.duration}s` : "Manual"}
                          </span>
                          {panel.duration !== undefined && (
                            <button
                              type="button"
                              onClick={() => handleUpdatePanelParams(pIdx, { duration: undefined })}
                              className="text-[9px] text-red-500 hover:underline"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          step="0.5"
                          value={panel.duration ?? 0}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            handleUpdatePanelParams(pIdx, { duration: val > 0 ? val : undefined });
                          }}
                          className="w-full accent-emerald-500 cursor-pointer h-1.5"
                        />
                      </div>

                      {/* Anti-spoiler mask checkbox/button */}
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] font-bold text-zinc-600">
                          🤫 Oclusión Spoiler:
                        </span>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => handleUpdatePanelParams(pIdx, { hideUntilReached: true })}
                            className={`text-[9px] font-bold px-2 py-0.5 rounded border transition-all ${
                              panel.hideUntilReached ?? true
                                ? "bg-purple-600 text-white border-purple-700 font-bold"
                                : "bg-zinc-100 text-zinc-500 border-zinc-300 hover:bg-zinc-200"
                            }`}
                          >
                            Sí (Ocultar)
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdatePanelParams(pIdx, { hideUntilReached: false })
                            }
                            className={`text-[9px] font-bold px-2 py-0.5 rounded border transition-all ${
                              !(panel.hideUntilReached ?? true)
                                ? "bg-zinc-700 text-white border-zinc-800 font-bold"
                                : "bg-zinc-100 text-zinc-500 border-zinc-300 hover:bg-zinc-200"
                            }`}
                          >
                            No (Mostrar)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Audio Config Section */}
                  <div className="border border-zinc-300 p-2 rounded bg-blue-50/50 mb-3 flex flex-col gap-2">
                    {(() => {
                      const soundsList = panel.sounds || (panel.sound ? [{
                        sound: panel.sound,
                        soundStartTime: panel.soundStartTime,
                        soundEndTime: panel.soundEndTime,
                        soundConfig: panel.soundConfig
                      }] : []);

                      const updateSoundItem = (sIdx: number, updates: Partial<PanelSound>) => {
                        const newList = [...soundsList];
                        const existing = newList[sIdx] || { sound: "" };
                        const newConfig = updates.soundConfig 
                          ? { ...(existing.soundConfig || {}), ...updates.soundConfig }
                          : existing.soundConfig;
                        
                        newList[sIdx] = {
                          ...existing,
                          ...updates,
                          soundConfig: newConfig
                        };

                        handleUpdatePanelParams(pIdx, {
                          sound: undefined,
                          soundStartTime: undefined,
                          soundEndTime: undefined,
                          soundConfig: undefined,
                          sounds: newList
                        });
                      };

                      const removeSoundItem = (sIdx: number) => {
                        const newList = soundsList.filter((_, idx) => idx !== sIdx);
                        handleUpdatePanelParams(pIdx, {
                          sound: undefined,
                          soundStartTime: undefined,
                          soundEndTime: undefined,
                          soundConfig: undefined,
                          sounds: newList
                        });
                      };

                      const addSoundItem = () => {
                        const newList = [
                          ...soundsList,
                          {
                            sound: "",
                            soundStartTime: 0,
                            soundConfig: { volume: 1, playbackRate: 1 }
                          }
                        ];
                        handleUpdatePanelParams(pIdx, {
                          sound: undefined,
                          soundStartTime: undefined,
                          soundEndTime: undefined,
                          soundConfig: undefined,
                          sounds: newList
                        });
                      };

                      return (
                        <>
                          <div className="flex items-center justify-between border-b border-blue-200 pb-1">
                            <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1">
                              🔊 Configuración de Audio ({soundsList.length})
                            </label>
                            {soundsList.length > 0 && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUpdatePanelParams(pIdx, {
                                    sound: undefined,
                                    soundStartTime: undefined,
                                    soundEndTime: undefined,
                                    soundConfig: undefined,
                                    sounds: []
                                  });
                                }}
                                className="text-[9px] text-red-500 hover:underline font-bold"
                              >
                                Limpiar todo
                              </button>
                            )}
                          </div>

                          {soundsList.map((soundItem, sIdx) => {
                            const previewKey = `${pIdx}-${sIdx}`;
                            const isPreviewing = previewingSound === previewKey;
                            
                            return (
                              <div key={sIdx} className="border border-zinc-200 rounded p-2 bg-white flex flex-col gap-2 relative shadow-sm">
                                <div className="flex justify-between items-center bg-zinc-50 -m-2 mb-1 p-1.5 border-b border-zinc-200 rounded-t">
                                  <span className="text-[9px] font-bold text-zinc-600 font-mono">
                                    🎵 Audio #{sIdx + 1}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => removeSoundItem(sIdx)}
                                    className="text-[9px] text-red-500 hover:text-red-700 font-bold"
                                  >
                                    ✕ Eliminar
                                  </button>
                                </div>

                                {/* Sound Selector Dropdown */}
                                <div className="flex flex-col gap-1">
                                  <label className="text-[9px] font-mono text-zinc-600">
                                    Seleccionar sonido:
                                  </label>
                                  <select
                                    value={soundItem.sound || ""}
                                    onChange={(e) => {
                                      updateSoundItem(sIdx, { sound: e.target.value || "" });
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-[8px] px-1.5 py-1 border border-zinc-300 rounded font-mono bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                                  >
                                    <option value="">-- Selecciona un sonido --</option>
                                    {availableSounds.map((sound) => (
                                      <option key={sound.path} value={sound.path}>
                                        {sound.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* Duration Display */}
                                {soundItem.sound && soundMetadata[soundItem.sound] && (
                                  <div className="text-[8px] text-zinc-500 px-1.5 py-1 bg-zinc-100 rounded">
                                    📹 Duración: {soundMetadata[soundItem.sound].toFixed(2)}s
                                    {soundItem.soundEndTime && (
                                      <span className="ml-2">
                                        | Reproducción: {(soundItem.soundEndTime - (soundItem.soundStartTime || 0)).toFixed(2)}s
                                      </span>
                                    )}
                                  </div>
                                )}

                                {/* Waveform Visualizer */}
                                {soundItem.sound && (
                                  <div className="rounded border border-zinc-300 bg-white overflow-hidden">
                                    <WaveformVisualizer
                                      soundPath={soundItem.sound}
                                      startTime={soundItem.soundStartTime || 0}
                                      endTime={soundItem.soundEndTime}
                                      height={50}
                                    />
                                    <div className="text-[7px] text-zinc-400 px-1.5 py-0.5 bg-zinc-50 flex justify-between">
                                      <span>🟩 Inicio | 🟥 Fin</span>
                                    </div>
                                  </div>
                                )}

                                {soundItem.sound && (
                                  <div className="flex flex-col gap-2 pt-2 border-t border-blue-200">
                                    {/* Preview Button */}
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (isPreviewing) {
                                          stopPreview();
                                        } else {
                                          playPreview(soundItem.sound, {
                                            startTime: soundItem.soundStartTime || 0,
                                            endTime: soundItem.soundEndTime,
                                            volume: soundItem.soundConfig?.volume ?? 1,
                                            playbackRate: soundItem.soundConfig?.playbackRate ?? 1,
                                            fadeIn: soundItem.soundConfig?.fadeIn ?? 0,
                                            fadeOut: soundItem.soundConfig?.fadeOut ?? 0,
                                            delay: soundItem.soundConfig?.delay ?? 0,
                                          });
                                          // Override previewingSound state to our unique key
                                          setPreviewingSound(previewKey);
                                        }
                                      }}
                                      className={`text-[8px] font-bold px-2 py-1 rounded border transition-all w-full ${
                                        isPreviewing
                                          ? "bg-green-600 text-white border-green-700"
                                          : "bg-green-500 hover:bg-green-600 text-white border-green-700"
                                      }`}
                                    >
                                      {isPreviewing ? "⏸ Detener Preview" : "▶ Preview Sonido"}
                                    </button>
                                  </div>
                                )}

                                {/* Controls Grid */}
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                  {/* Sound Start Time */}
                                  <div className="flex flex-col gap-1">
                                    <label className="text-[9px] font-mono text-zinc-600">
                                      Inicio (seg):
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      step="0.1"
                                      value={soundItem.soundStartTime ?? 0}
                                      onChange={(e) => {
                                        const val = parseFloat(e.target.value) || 0;
                                        updateSoundItem(sIdx, {
                                          soundStartTime: val > 0 ? val : undefined,
                                        });
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                      className="text-[8px] px-1.5 py-1 border border-zinc-300 rounded font-mono bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    />
                                  </div>

                                  {/* Sound End Time */}
                                  <div className="flex flex-col gap-1">
                                    <label className="text-[9px] font-mono text-zinc-600">
                                      Fin (seg):
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      step="0.1"
                                      value={soundItem.soundEndTime ?? ""}
                                      onChange={(e) => {
                                        const val = e.target.value ? parseFloat(e.target.value) : undefined;
                                        updateSoundItem(sIdx, {
                                          soundEndTime: val ? val : undefined,
                                        });
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                      placeholder="Completo si está vacío"
                                      className="text-[8px] px-1.5 py-1 border border-zinc-300 rounded font-mono bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    />
                                  </div>
                                </div>

                                {/* Volume & Speed Sliders */}
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                  {/* Volume */}
                                  <div className="flex flex-col gap-1">
                                    <div className="flex justify-between text-[9px] font-mono text-zinc-600">
                                      <span>Volumen:</span>
                                      <span className="text-blue-600 font-bold">
                                        {((soundItem.soundConfig?.volume ?? 1) * 100).toFixed(0)}%
                                      </span>
                                    </div>
                                    <input
                                      type="range"
                                      min="0"
                                      max="1"
                                      step="0.05"
                                      value={soundItem.soundConfig?.volume ?? 1}
                                      onChange={(e) => {
                                        const val = parseFloat(e.target.value);
                                        updateSoundItem(sIdx, {
                                          soundConfig: { volume: val },
                                        });
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                      className="w-full accent-blue-500 cursor-pointer h-1"
                                    />
                                  </div>

                                  {/* Playback Rate */}
                                  <div className="flex flex-col gap-1">
                                    <div className="flex justify-between text-[9px] font-mono text-zinc-600">
                                      <span>Velocidad:</span>
                                      <span className="text-blue-600 font-bold">
                                        {(soundItem.soundConfig?.playbackRate ?? 1).toFixed(2)}x
                                      </span>
                                    </div>
                                    <input
                                      type="range"
                                      min="0.5"
                                      max="5"
                                      step="0.1"
                                      value={soundItem.soundConfig?.playbackRate ?? 1}
                                      onChange={(e) => {
                                        const val = parseFloat(e.target.value);
                                        updateSoundItem(sIdx, {
                                          soundConfig: { playbackRate: val },
                                        });
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                      className="w-full accent-blue-500 cursor-pointer h-1"
                                    />
                                  </div>
                                </div>

                                {/* Fade In & Fade Out */}
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                  <div className="flex flex-col gap-1">
                                    <label className="text-[9px] font-mono text-zinc-600">
                                      Fade In (ms):
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      max="5000"
                                      step="100"
                                      value={soundItem.soundConfig?.fadeIn ?? 0}
                                      onChange={(e) => {
                                        const val = parseInt(e.target.value) || 0;
                                        updateSoundItem(sIdx, {
                                          soundConfig: { fadeIn: val > 0 ? val : undefined },
                                        });
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                      className="text-[8px] px-1.5 py-1 border border-zinc-300 rounded font-mono bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    />
                                  </div>

                                  <div className="flex flex-col gap-1">
                                    <label className="text-[9px] font-mono text-zinc-600">
                                      Fade Out (ms):
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      max="5000"
                                      step="100"
                                      value={soundItem.soundConfig?.fadeOut ?? 0}
                                      onChange={(e) => {
                                        const val = parseInt(e.target.value) || 0;
                                        updateSoundItem(sIdx, {
                                          soundConfig: { fadeOut: val > 0 ? val : undefined },
                                        });
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                      className="text-[8px] px-1.5 py-1 border border-zinc-300 rounded font-mono bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    />
                                  </div>
                                </div>

                                {/* Delay & Loop */}
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                  <div className="flex flex-col gap-1">
                                    <label className="text-[9px] font-mono text-zinc-600">
                                      Delay (ms):
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      max="10000"
                                      step="100"
                                      value={soundItem.soundConfig?.delay ?? 0}
                                      onChange={(e) => {
                                        const val = parseInt(e.target.value) || 0;
                                        updateSoundItem(sIdx, {
                                          soundConfig: { delay: val > 0 ? val : undefined },
                                        });
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                      className="text-[8px] px-1.5 py-1 border border-zinc-300 rounded font-mono bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    />
                                  </div>

                                  <div className="flex items-center gap-1.5 mt-4">
                                    <input
                                      type="checkbox"
                                      id={`loop-${pIdx}-${sIdx}`}
                                      checked={soundItem.soundConfig?.loop ?? false}
                                      onChange={(e) => {
                                        updateSoundItem(sIdx, {
                                          soundConfig: { loop: e.target.checked },
                                        });
                                      }}
                                      className="w-3.5 h-3.5 accent-blue-500 rounded border-zinc-300 focus:ring-blue-400 cursor-pointer"
                                    />
                                    <label htmlFor={`loop-${pIdx}-${sIdx}`} className="text-[9px] font-mono text-zinc-600 cursor-pointer select-none">
                                      Repetir (Loop)
                                    </label>
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                          <button
                            type="button"
                            onClick={addSoundItem}
                            className="text-[9px] font-bold py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded border border-blue-700 transition-all text-center flex items-center justify-center gap-1 mt-1"
                          >
                            ➕ Agregar otro sonido
                          </button>
                        </>
                      );
                    })()}
                  </div>

                  {/* Dialogue List for this panel */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-zinc-500">Globos:</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddBubble(pIdx);
                        }}
                        className="text-xs text-[#e8185a] hover:underline"
                      >
                        + Agregar Globo
                      </button>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      {panel.dialogue?.map((bub, bIdx) => {
                        const isBubActive = isSelected && activeBubbleIdx === bIdx;
                        return (
                          <button
                            key={bIdx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActivePanelIdx(pIdx);
                              setActiveBubbleIdx(bIdx);
                            }}
                            className={`text-left text-xs p-2 border rounded font-mono truncate transition-all ${
                              isBubActive
                                ? "border-red-500 bg-red-50 font-bold"
                                : "border-zinc-200 hover:bg-zinc-100"
                            }`}
                          >
                            {bub.speaker ? `${bub.speaker}: ` : ""}
                            {bub.text || "(vacío)"}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
