import { useEffect, useRef, useMemo, useCallback } from "react";
import {
  PanelSound,
  PanelStop,
  AudioTrack,
  Dialogues,
  playAudioWithGain,
} from "./audioPlayer";
import { getPageKeyFromUrl } from "./readerUtils";

interface UseReaderAudioProps {
  mode: "read" | "edit";
  panelIdx: number;
  pageIdx: number;
  pages: string[];
  localDialogues: Dialogues;
  activePanel: PanelStop;
}

export function useReaderAudio({
  mode,
  panelIdx,
  pageIdx,
  pages,
  localDialogues,
  activePanel,
}: UseReaderAudioProps) {
  const activePanelAudiosRef = useRef<Array<{ audio: HTMLAudioElement; stop: (fade: number) => void }>>([]);
  const activeTracksRef = useRef<Map<string, { audio: HTMLAudioElement; stop: (fade: number) => void }>>(new Map());

  // Gather and memoize all sounds config for this panel with stable dependencies
  const soundsToPlay = useMemo((): PanelSound[] => {
    const list: PanelSound[] = [];
    if (!activePanel) return list;
    if (activePanel.sounds && Array.isArray(activePanel.sounds) && activePanel.sounds.length > 0) {
      list.push(...activePanel.sounds);
    } else if (activePanel.sound) {
      list.push({
        sound: activePanel.sound,
        soundStartTime: activePanel.soundStartTime,
        soundEndTime: activePanel.soundEndTime,
        soundConfig: activePanel.soundConfig,
      });
    }
    return list;
  }, [
    activePanel?.sound,
    activePanel?.soundStartTime,
    activePanel?.soundEndTime,
    JSON.stringify(activePanel?.soundConfig),
    JSON.stringify(activePanel?.sounds),
  ]);

  // Play sound effect(s) when panel changes
  useEffect(() => {
    // 1. Stop all currently playing panel audios
    activePanelAudiosRef.current.forEach((soundObj) => {
      soundObj.stop(0);
    });
    activePanelAudiosRef.current = [];

    if (mode !== "read" || soundsToPlay.length === 0) return;

    const activeObjects: Array<{ audio: HTMLAudioElement; stop: (fade: number) => void }> = [];
    const timersToClear: NodeJS.Timeout[] = [];

    // 2. Start each sound
    soundsToPlay.forEach((soundItem) => {
      if (!soundItem.sound) return;

      const config = soundItem.soundConfig || {};
      const {
        volume = 1,
        playbackRate = 1,
        loop = false,
        fadeIn = 0,
        fadeOut = 0,
        delay = 0,
      } = config;
      const soundStartTime = soundItem.soundStartTime || 0;
      const soundEndTime = soundItem.soundEndTime || undefined;

      const playWithDelay = () => {
        try {
          const soundObj = playAudioWithGain(
            soundItem.sound,
            {
              volume,
              playbackRate,
              loop,
              fadeIn,
              fadeOut,
              startTime: soundStartTime,
              endTime: soundEndTime
            }
          );
          activeObjects.push(soundObj);
        } catch (error) {
          console.error("Error playing audio item (sync):", error);
        }
      };

      if (delay > 0) {
        const delayTimeout = setTimeout(playWithDelay, delay);
        timersToClear.push(delayTimeout);
      } else {
        playWithDelay();
      }
    });

    activePanelAudiosRef.current = activeObjects;

    return () => {
      activeObjects.forEach((soundObj) => {
        soundObj.stop(0);
      });
      timersToClear.forEach((t) => clearTimeout(t));
    };
  }, [panelIdx, pageIdx, mode, soundsToPlay]);

  // ─── Multi-span Audio Track Engine ───────────────────────────────────────

  const pageKeyOrder = useMemo(() => {
    const map = new Map<string, number>();
    pages.forEach((p, i) => {
      const key = getPageKeyFromUrl(p);
      if (key) map.set(key, i);
    });
    return map;
  }, [pages]);

  const comparePositions = useCallback(
    (pageKeyA: string, panelIdxA: number, pageKeyB: string, panelIdxB: number): number => {
      const idxA = pageKeyOrder.get(pageKeyA) ?? 0;
      const idxB = pageKeyOrder.get(pageKeyB) ?? 0;
      if (idxA !== idxB) return idxA - idxB;
      return panelIdxA - panelIdxB;
    },
    [pageKeyOrder]
  );

  const isPositionInTrackRange = useCallback(
    (track: AudioTrack, currentPageKey: string, currentPanelIdx: number): boolean => {
      const startCompare = comparePositions(currentPageKey, currentPanelIdx, track.startPageKey, track.startPanelIdx);
      if (startCompare < 0) {
        return false;
      }

      if (!track.stopTrigger) {
        return true;
      }

      const t = track.stopTrigger;
      switch (t.type) {
        case "panelStart":
          return comparePositions(currentPageKey, currentPanelIdx, t.pageKey, t.panelIdx) < 0;
        case "panelEnd":
          return comparePositions(currentPageKey, currentPanelIdx, t.pageKey, t.panelIdx) <= 0;
        case "pageStart":
          return comparePositions(currentPageKey, 0, t.pageKey, 0) < 0;
        case "pageEnd":
          return comparePositions(currentPageKey, 0, t.pageKey, 0) <= 0;
        default:
          return true;
      }
    },
    [comparePositions]
  );

  const tracksListString = JSON.stringify(localDialogues.audioTracks || []);

  useEffect(() => {
    if (mode !== "read") return;
    const tracks = localDialogues.audioTracks || [];
    const activeTracks = activeTracksRef.current;
    const currentPageKey = getPageKeyFromUrl(pages[pageIdx]) || "";

    tracks.forEach((track: AudioTrack) => {
      const inRange = isPositionInTrackRange(track, currentPageKey, panelIdx);
      const isPlaying = activeTracks.has(track.id);

      if (inRange && !isPlaying) {
        const config = track.soundConfig || {};
        const {
          volume = 1,
          playbackRate = 1,
          loop = false,
          fadeIn = 0,
          delay = 0,
          startTime = 0,
          endTime,
        } = config;

        const playTrack = () => {
          try {
            const soundObj = playAudioWithGain(
              track.src,
              {
                volume,
                playbackRate,
                loop,
                fadeIn,
                startTime,
                endTime
              },
              () => {
                activeTracks.delete(track.id);
              }
            );
            activeTracks.set(track.id, soundObj);
          } catch (err) {
            console.error("[AudioTrack] Error playing track:", track.id, err);
          }
        };

        if (delay > 0) {
          setTimeout(playTrack, delay);
        } else {
          playTrack();
        }

      } else if (!inRange && isPlaying) {
        const soundObj = activeTracks.get(track.id)!;
        const fadeOut = track.soundConfig?.fadeOut ?? 0;
        soundObj.stop(fadeOut);
        activeTracks.delete(track.id);
      }
    });

    activeTracks.forEach((soundObj, trackId: string) => {
      const exists = tracks.some((t) => t.id === trackId);
      if (!exists) {
        soundObj.stop(0);
        activeTracks.delete(trackId);
      }
    });
  }, [panelIdx, pageIdx, mode, tracksListString, isPositionInTrackRange, pages]);

  useEffect(() => {
    if (mode === "read") return;
    activeTracksRef.current.forEach((soundObj) => {
      soundObj.stop(0);
    });
    activeTracksRef.current.clear();
  }, [mode]);

  useEffect(() => {
    return () => {
      activeTracksRef.current.forEach((soundObj) => {
        soundObj.stop(0);
      });
      activeTracksRef.current.clear();

      activePanelAudiosRef.current.forEach((soundObj) => {
        soundObj.stop(0);
      });
      activePanelAudiosRef.current = [];
    };
  }, []);
}
