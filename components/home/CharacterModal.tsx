"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ImageLightbox } from "./CharacterModal/ImageLightbox";
import { EpicTransitionOverlay } from "./CharacterModal/EpicTransitionOverlay";
import { CharacterInfoPanel } from "./CharacterModal/CharacterInfoPanel";

function getTextColor(hexColor: string) {
  if (!hexColor) return "white";
  const color = hexColor.replace("#", "");
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 140 ? "#0a0a0f" : "white";
}

function getVibrantColor(hexColor: string) {
  if (!hexColor) return "#f5e642";
  const c = hexColor.toLowerCase();
  if (c === "#0d3a2b") return "#10b981"; // Ian: emerald green
  if (c === "#0a1128") return "#3b82f6"; // Julián: vibrant blue
  if (c === "#4c1d95") return "#a855f7"; // Mati: vibrant purple
  if (c === "#b91c1c") return "#ef4444"; // Uandi: vibrant red
  return hexColor;
}

function getDarkBgColor(hexColor: string) {
  if (!hexColor) return "#0f172a";
  const c = hexColor.toLowerCase();
  if (c === "#0d3a2b") return "#061410"; // very dark green
  if (c === "#f5e642") return "#121203"; // very dark yellow
  if (c === "#0a1128") return "#020512"; // very dark blue
  if (c === "#4c1d95") return "#0d041c"; // very dark purple
  if (c === "#b91c1c") return "#170303"; // very dark red
  if (c === "#f95700") return "#170802"; // very dark orange
  if (c === "#06b6d4") return "#021214"; // very dark cyan
  return "#0f172a";
}

function getCleanImageLabel(src: string, defaultLabel: string): string {
  if (!src) return defaultLabel;
  const filename = src.split("/").pop()?.toLowerCase() || "";
  const cleanName = filename.replace(/\.[^/.]+$/, ""); // remove extension

  if (cleanName.includes("ficha")) {
    if (cleanName.includes("cosmic")) return "Ficha Cosmic";
    if (cleanName.includes("alt")) return "Ficha Alt";
    if (cleanName.includes("ficha2")) return "Ficha Alt 1";
    if (cleanName.includes("ficha3")) return "Ficha Alt 2";
    return "Ficha";
  }

  if (cleanName.includes("mark") || cleanName.includes("mk")) {
    if (cleanName.includes("3") || cleanName.includes("iii")) {
      if (cleanName.includes("alt")) return "Mark III Alt";
      return "Mark III";
    }
    if (cleanName.includes("l") || cleanName.includes("lxxxv")) {
      return "Mark L";
    }
    return "Mark Suit";
  }

  if (cleanName.includes("alt")) {
    return "Alt";
  }

  // Fallback to capitalizing words from filename
  const cleanLabel = cleanName
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // If the clean label is a common hero or name, just call it "Portada"
  const commonPortadas = ["vesperwing", "swapfire", "oracle", "wildcard", "aegis", "nullvector", "hush", "vector"];
  if (commonPortadas.includes(cleanLabel.toLowerCase().replace(/\s/g, ""))) {
    return "Portada";
  }

  return cleanLabel;
}

const CHARACTER_SOUNDS: Record<string, { open?: string; details?: string }> = {
  ian: { open: "/sounds/sfx/capa1.mp3", details: "/sounds/sfx/grapplin2.mp3" },
  uandi: { open: "/sounds/sfx/muzaproduction-metal-design-explosion-13491.mp3", details: "/sounds/sfx/The Incredible Hulk Roar.mp3" },
  julian: { open: "/sounds/sfx/repartir cartas 3.mp3", details: "/sounds/sfx/repartir cartas.mp3" },
  volvo: { open: "/sounds/sfx/portal1.mp3", details: "/sounds/sfx/timefreeze.mp3" },
  mati: { open: "/sounds/sfx/laser_1.mp3", details: "/sounds/sfx/laser_3.mp3" },
  jaz: { open: "/sounds/sfx/magia1.mp3", details: "/sounds/sfx/magia4.mp3" },
  sofi: { open: "/sounds/sfx/katana2.mp3", details: "/sounds/sfx/katana.mp3" },
};

export function CharacterModal({ char, onClose }: { char: any; onClose: () => void }) {
  const isPibe =
    char.category === "pibes" ||
    ["ian", "jaz", "julian", "mati", "uandi", "volvo", "sofi"].includes(char.id);

  // 1. Gather available images for Standard Mode
  const standardImages: { id: string; label: string; src: string }[] = [];

  // Main Portada
  if (char.portadaImages && char.portadaImages.length > 0) {
    standardImages.push({ id: "portada", label: getCleanImageLabel(char.portadaImages[0], "Portada"), src: char.portadaImages[0] });
  }

  // Main Ficha
  if (char.fichaImages && char.fichaImages.length > 0) {
    standardImages.push({ id: "ficha", label: getCleanImageLabel(char.fichaImages[0], "Ficha"), src: char.fichaImages[0] });
  }

  // Ficha Alts
  if (char.fichaImages && char.fichaImages.length > 1) {
    for (let i = 1; i < char.fichaImages.length; i++) {
      const src = char.fichaImages[i];
      standardImages.push({ id: `ficha_alt_${i}`, label: getCleanImageLabel(src, `Ficha Alt ${i}`), src });
    }
  }

  const [selectedImageId, setSelectedImageId] = useState<string>(() => {
    return standardImages.length > 0 ? standardImages[0].id : "default";
  });
  const [isPowersMode, setIsPowersMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imgFullscreen, setImgFullscreen] = useState(false);
  const [unlockAll, setUnlockAll] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSFX = (src: string) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      const audio = new Audio(src);
      audio.volume = 0.25; // 25% volume to be comfortable
      audioRef.current = audio;
      audio.play().catch((err) => console.log("Audio play blocked/failed:", err));
    } catch (e) {
      console.error("Audio error:", e);
    }
  };

  // Decide current active images array based on mode
  const currentImagesList = standardImages;

  // Decide which image to show
  const currentImageObj = currentImagesList.find((img) => img.id === selectedImageId) || currentImagesList[0];
  const currentImage = currentImageObj?.src;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const val = localStorage.getItem("unlock-all") === "true";
    setUnlockAll(val);

    const checkUnlock = () => {
      setUnlockAll(localStorage.getItem("unlock-all") === "true");
    };
    window.addEventListener("unlockAllChanged", checkUnlock);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("unlockAllChanged", checkUnlock);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Reset modal state when switching characters and play opening sound
  useEffect(() => {
    setSelectedImageId(standardImages.length > 0 ? standardImages[0].id : "default");
    setIsPowersMode(false);

    const snd = CHARACTER_SOUNDS[char.id]?.open;
    if (snd) {
      const t = setTimeout(() => {
        playSFX(snd);
      }, 100);
      return () => {
        clearTimeout(t);
      };
    }
  }, [char.id]);

  const isLocked = char.incognito && !unlockAll;
  const accent = isLocked ? "#6b7280" : char.color;
  const vibrantAccent = getVibrantColor(accent);
  const darkBg = getDarkBgColor(accent);

  // Transition handler when switching Detalles mode
  const handlePowersModeToggle = () => {
    if (!isPowersMode) {
      // Transitioning to Detalles Mode
      const targetImages = standardImages;
      const targetSrc = targetImages[0]?.src || char.image;
      setIsTransitioning(true);

      const img = new Image();
      img.src = targetSrc;
      const startTime = Date.now();

      img.onload = () => {
        const elapsed = Date.now() - startTime;
        const minDuration = 1200; // minimum duration for epic effect (1.2 seconds)
        const remaining = Math.max(0, minDuration - elapsed);
        setTimeout(() => {
          setIsPowersMode(true);
          setSelectedImageId(targetImages[0]?.id || "default");
          setIsTransitioning(false);
          
          const snd = CHARACTER_SOUNDS[char.id]?.details;
          if (snd) playSFX(snd);
        }, remaining);
      };

      img.onerror = () => {
        setIsPowersMode(true);
        setSelectedImageId(targetImages[0]?.id || "default");
        setIsTransitioning(false);

        const snd = CHARACTER_SOUNDS[char.id]?.details;
        if (snd) playSFX(snd);
      };
    } else {
      // Transitioning back to Standard Mode
      setIsTransitioning(true);
      setTimeout(() => {
        setIsPowersMode(false);
        setSelectedImageId(standardImages.length > 0 ? standardImages[0].id : "default");
        setIsTransitioning(false);

        const snd = CHARACTER_SOUNDS[char.id]?.open;
        if (snd) playSFX(snd);
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0a0a0f]/92 cursor-pointer"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.88, y: 28, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 28, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="relative w-full z-10 flex flex-col sm:flex-row overflow-hidden transition-colors duration-400"
        style={{
          maxWidth: 1100,
          border: "4px solid #0a0a0f",
          boxShadow: `10px 10px 0 ${isPowersMode ? vibrantAccent : accent}`,
          height: "auto",
          minHeight: "65vh",
          maxHeight: "90vh",
          backgroundColor: isPowersMode ? darkBg : "#ffffff",
        }}
      >
        {/* ══ Epic Transition Overlay ══ */}
        <EpicTransitionOverlay
          isTransitioning={isTransitioning}
          vibrantAccent={vibrantAccent}
          char={char}
          isPowersMode={isPowersMode}
        />

        {/* ── Close ── */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-[var(--font-bangers)] text-base sm:text-lg border-2 border-black shadow-[3px_3px_0_#000] transition-all hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5"
          style={{
            background: vibrantAccent,
            color: getTextColor(vibrantAccent),
          }}
        >
          ✕
        </button>

        {/* ══════════ LEFT — image ══════════ */}
        <div
          className="w-full flex flex-col sm:w-[460px] sm:min-w-[460px] lg:w-[540px] lg:min-w-[540px] flex-shrink-0 border-b-4 sm:border-b-0 sm:border-r-4 border-black transition-colors duration-400"
          style={{
            backgroundColor: isPowersMode ? darkBg : "#f1f5f9",
            backgroundImage: isPowersMode
              ? `radial-gradient(circle, ${vibrantAccent}22 1.5px, transparent 1.5px)`
              : "radial-gradient(circle, #cbd5e1 1.5px, transparent 1.5px)",
            backgroundSize: "20px 20px",
          }}
        >
          {/* Image area — flex-1 so it takes all space above the button strip */}
          <div className="relative flex-1 min-h-[260px] sm:min-h-0 overflow-hidden">
            <div className={`absolute inset-0 flex justify-center overflow-hidden ${
              selectedImageId !== "default" && selectedImageId !== "alt" && selectedImageId !== "portada"
                ? "items-center"
                : "items-start sm:items-end"
            }`}>
              {isLocked ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute inset-0 speed-lines opacity-20" />
                  <span className="font-[var(--font-bangers)] text-9xl text-white opacity-20 select-none z-10">?</span>
                  {!!char.image && (
                    <img src={char.fullBody || char.image} alt="Locked"
                      className="absolute inset-0 w-full h-full object-contain p-6 opacity-10 grayscale blur-sm" />
                  )}
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              ) : currentImage ? (
                <img
                  src={currentImage}
                  alt={isLocked ? "PRÓXIMAMENTE" : char.name}
                  title="Click para ver completo"
                  onClick={() => setImgFullscreen(true)}
                  className={`w-full h-full transition-all duration-500 cursor-zoom-in ${
                    (selectedImageId === "portada" || selectedImageId === "default")
                      ? "object-cover object-top sm:object-contain sm:object-bottom sm:p-2 lg:p-4"
                      : "object-contain object-center p-1 sm:p-2 lg:p-4"
                  } ${isPowersMode ? "brightness-110" : ""}`}
                  style={{
                    filter: isPowersMode
                      ? `drop-shadow(4px 4px 0 rgba(0,0,0,0.2)) drop-shadow(0 0 18px ${vibrantAccent})`
                      : `drop-shadow(4px 4px 0 rgba(0,0,0,0.2))`,
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full border-4 border-black flex items-center justify-center"
                    style={{ background: accent }}>
                    <span className="font-[var(--font-bangers)] text-5xl text-white">
                      {char.name?.[0] ?? "?"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* halftone overlay */}
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10"
              style={{ backgroundImage: "radial-gradient(circle,#fff 1.5px,transparent 1.5px)", backgroundSize: "6px 6px" }} />
          </div>

          {/* ── Image selector buttons — dedicated strip BELOW the image ── */}
          {!isLocked && currentImagesList.length > 1 && (
            <div
              className="flex-shrink-0 border-t-2 sm:border-t-4 border-black px-2 py-1.5"
              style={{ backgroundColor: isPowersMode ? `${darkBg}ee` : "#e2e8f0" }}
            >
              <div className="flex gap-1.5 overflow-x-auto sm:overflow-x-visible sm:flex-wrap pb-0.5 sm:pb-0">
                {currentImagesList.map((imgOpt) => {
                  const isActive = selectedImageId === imgOpt.id;
                  return (
                    <button
                      key={imgOpt.id}
                      onClick={() => {
                        if (isActive) return;
                        setIsTransitioning(true);
                        const tempImg = new Image();
                        tempImg.src = imgOpt.src;
                        tempImg.onload = () => { setSelectedImageId(imgOpt.id); setIsTransitioning(false); };
                        tempImg.onerror = () => { setSelectedImageId(imgOpt.id); setIsTransitioning(false); };
                      }}
                      style={{
                        backgroundColor: isActive ? (isPowersMode ? vibrantAccent : accent) : "#0a0a0f",
                        color: isActive ? getTextColor(isPowersMode ? vibrantAccent : accent) : "#ffffff",
                        borderColor: isActive ? (isPowersMode ? vibrantAccent : accent) : "#0a0a0f",
                        boxShadow: isActive ? `0 0 10px ${isPowersMode ? vibrantAccent : accent}88` : "2px 2px 0 #000",
                        transform: isActive ? "translate(1px, 1px)" : "none",
                      }}
                      className="px-2.5 py-1 border-2 font-[var(--font-bangers)] text-[10px] tracking-wider uppercase transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
                    >
                      {imgOpt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ══════════ RIGHT — info ══════════ */}
        <CharacterInfoPanel
          char={char}
          isPowersMode={isPowersMode}
          selectedImageId={selectedImageId}
          unlockAll={unlockAll}
          handlePowersModeToggle={handlePowersModeToggle}
        />

        {/* ── Fullscreen image lightbox ── */}
        <AnimatePresence>
          {imgFullscreen && currentImage && (
            <ImageLightbox src={currentImage} alt={char.displayName} onClose={() => setImgFullscreen(false)} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
