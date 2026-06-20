// ─── Types ───────────────────────────────────────────────────────────────────

export type PanelSound = {
  sound: string;
  soundStartTime?: number;
  soundEndTime?: number;
  soundConfig?: {
    volume?: number;
    playbackRate?: number;
    loop?: boolean;
    fadeIn?: number;
    fadeOut?: number;
    delay?: number;
  };
};

export type PanelStop = {
  focusY: number;
  dialogue?: any[]; // DialogueLine[]
  zoomRect?: { x: number; y: number; w: number; h: number };
  zoomRects?: { x: number; y: number; w: number; h: number }[];
  duration?: number;
  hideUntilReached?: boolean;
  sound?: string; // Path to the audio file
  soundStartTime?: number; // in seconds
  soundEndTime?: number; // in seconds
  soundConfig?: {
    volume?: number; // 0 to 1 (default: 1)
    playbackRate?: number; // 0.5 to 2 (default: 1)
    loop?: boolean; // default: false
    fadeIn?: number; // duration in ms (default: 0)
    fadeOut?: number; // duration in ms (default: 0)
    delay?: number; // delay before playing in ms (default: 0)
  };
  sounds?: PanelSound[];
};

export type AudioTrackStopTrigger =
  | { type: "panelStart"; pageKey: string; panelIdx: number }
  | { type: "panelEnd"; pageKey: string; panelIdx: number }
  | { type: "pageStart"; pageKey: string }
  | { type: "pageEnd"; pageKey: string };

export type AudioTrack = {
  id: string;
  layer: "music" | "sfx";
  src: string;
  startPageKey: string;
  startPanelIdx: number;
  stopTrigger?: AudioTrackStopTrigger;
  soundConfig?: {
    volume?: number;       // 0–1, default 1
    playbackRate?: number; // 0.5–2, default 1
    loop?: boolean;        // default false
    fadeIn?: number;       // fade-in duration in ms
    fadeOut?: number;      // fade-out duration in ms
    delay?: number;        // delay before playing in ms
    startTime?: number;    // seek to this offset when starting
    endTime?: number;      // stop at this timestamp (seconds)
  };
};

export type ChapterSettings = {
  clearReadDialogues?: boolean;
  appearanceAnimation?: "spring" | "fade" | "slide" | "zoom";
  fadeOutAnimation?: "fade" | "slide" | "zoom";
  dialogueDepth?: number;
};

export type PageData = {
  panels: PanelStop[];
};

export type Dialogues = {
  settings?: ChapterSettings;
  audioTracks?: AudioTrack[];
  pages?: Record<string, PageData>;
};

// ─── Web Audio API Helpers for Mobile/iOS Compatibility ──────────────────────

let sharedAudioContext: AudioContext | null = null;

export function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedAudioContext) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      sharedAudioContext = new AudioContextClass();
    }
  }
  return sharedAudioContext;
}

// Automatically resume suspended AudioContext on user interaction
if (typeof window !== "undefined") {
  const resumeCtx = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(console.error);
    }
  };
  window.addEventListener("click", resumeCtx, { capture: true, passive: true });
  window.addEventListener("touchstart", resumeCtx, { capture: true, passive: true });
}

export function playAudioWithGain(
  src: string,
  options: {
    volume?: number;
    playbackRate?: number;
    loop?: boolean;
    fadeIn?: number;
    fadeOut?: number;
    startTime?: number;
    endTime?: number;
  },
  onEnded?: () => void
) {
  const ctx = getAudioContext();
  const volume = options.volume ?? 1;
  const targetVolume = volume * volume; // logarithmic scaling
  const playbackRate = options.playbackRate ?? 1;
  const loop = options.loop ?? false;
  const fadeIn = options.fadeIn ?? 0;
  const startTime = options.startTime ?? 0;
  const endTime = options.endTime;

  const audio = new Audio(src);
  audio.crossOrigin = "anonymous";
  audio.playbackRate = playbackRate;
  audio.loop = loop;
  
  // Set native volume to 1.0 (iOS will allow this, and we attenuate via GainNode)
  audio.volume = 1.0;

  if (startTime > 0) {
    if (audio.readyState >= 1) {
      audio.currentTime = startTime;
    } else {
      audio.addEventListener("loadedmetadata", () => {
        audio.currentTime = startTime;
      }, { once: true });
    }
  }

  let gainNode: GainNode | null = null;
  let sourceNode: MediaElementAudioSourceNode | null = null;

  if (ctx) {
    gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(fadeIn > 0 ? 0 : targetVolume, ctx.currentTime);
    gainNode.connect(ctx.destination);

    try {
      sourceNode = ctx.createMediaElementSource(audio);
      sourceNode.connect(gainNode);
    } catch (e) {
      console.error("Error creating MediaElementSource:", e);
      audio.volume = fadeIn > 0 ? 0 : targetVolume;
    }
  } else {
    audio.volume = fadeIn > 0 ? 0 : targetVolume;
  }

  if (onEnded) {
    audio.onended = onEnded;
  }

  let checkInterval: any = null;
  if (endTime !== undefined) {
    checkInterval = setInterval(() => {
      if (audio.currentTime >= endTime) {
        clearInterval(checkInterval);
        audio.pause();
        if (onEnded) onEnded();
      }
    }, 100);
  }

  audio.addEventListener("playing", () => {
    audio.playbackRate = playbackRate;

    if (ctx && gainNode) {
      if (fadeIn > 0) {
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(targetVolume, ctx.currentTime + fadeIn / 1000);
      } else {
        gainNode.gain.setValueAtTime(targetVolume, ctx.currentTime);
      }
    } else {
      if (fadeIn > 0) {
        audio.volume = 0;
        const fadeInSteps = 50;
        const stepDuration = fadeIn / fadeInSteps;
        const volumePerStep = targetVolume / fadeInSteps;
        let currentStep = 0;

        const fadeInInterval = setInterval(() => {
          if (currentStep < fadeInSteps) {
            audio.volume = Math.min(targetVolume, audio.volume + volumePerStep);
            currentStep++;
          } else {
            audio.volume = targetVolume;
            clearInterval(fadeInInterval);
          }
        }, stepDuration);
      } else {
        audio.volume = targetVolume;
      }
    }
  }, { once: true });

  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch((error) => {
      console.error("[playAudioWithGain] Play blocked or failed:", error);
    });
  }

  return {
    audio,
    stop: (fadeOutDuration: number) => {
      if (checkInterval) clearInterval(checkInterval);
      if (ctx && gainNode && fadeOutDuration > 0) {
        const currentGain = gainNode.gain.value;
        gainNode.gain.setValueAtTime(currentGain, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeOutDuration / 1000);
        setTimeout(() => {
          audio.pause();
          audio.currentTime = 0;
          try {
            sourceNode?.disconnect();
            gainNode?.disconnect();
          } catch (e) {}
        }, fadeOutDuration + 50);
      } else {
        audio.pause();
        audio.currentTime = 0;
        try {
          sourceNode?.disconnect();
          gainNode?.disconnect();
        } catch (e) {}
      }
    }
  };
}
