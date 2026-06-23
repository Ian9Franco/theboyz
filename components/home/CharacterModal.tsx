"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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

export function CharacterModal({ char, onClose }: { char: any; onClose: () => void }) {
  const isPibe =
    char.category === "pibes" ||
    ["ian", "jaz", "julian", "mati", "uandi", "volvo", "sofi"].includes(char.id);

  // Closeup mapping (only for Pibes with _FACE closeups)
  const closeUpMap: Record<string, string> = {
    ian: "/personajes/LosPibes/CLOSEUP/IAN_FACE.webp",
    jaz: "/personajes/LosPibes/CLOSEUP/JAZ_FACE.webp",
    julian: "/personajes/LosPibes/CLOSEUP/JULIAN_FACE.webp",
    mati: "/personajes/LosPibes/CLOSEUP/MATI_FACE.webp",
    sofi: "/personajes/LosPibes/CLOSEUP/SOFI_FACE.webp",
    uandi: "/personajes/LosPibes/CLOSEUP/UANDI_FACE.webp",
    volvo: "/personajes/LosPibes/CLOSEUP/VOLVO_FACE.webp",
  };

  // 1. Gather available images for Standard Mode (or for non-pibe characters)
  const standardImages: { id: string; label: string; src: string }[] = [];

  if (isPibe) {
    if (char.fullBody || char.image) {
      standardImages.push({ id: "default", label: "Normal", src: char.fullBody || char.image });
    }
    if (char.altImage) {
      const isRegular = char.id === "comandante";
      const label = isRegular ? "Cósmico" : "Alt";
      standardImages.push({ id: "alt", label, src: char.altImage });
    }
    const closeUpPath = char.closeUp || closeUpMap[char.id];
    if (closeUpPath) {
      standardImages.push({ id: "closeup", label: "Closeup", src: closeUpPath });
    }
  } else {
    // Non-Pibes: check if they have a distinct ficha and cover (portada)
    const hasFicha = char.image && char.fullBody && char.image !== char.fullBody;

    if (hasFicha) {
      // Ficha goes first so it is shown by default
      standardImages.push({ id: "ficha", label: "Ficha", src: char.image });
      standardImages.push({ id: "portada", label: "Portada", src: char.fullBody });
    } else {
      const mainSrc = char.fullBody || char.image;
      if (mainSrc) {
        standardImages.push({ id: "default", label: "Normal", src: mainSrc });
      }
    }

    if (char.altImage) {
      const isRegular = char.id === "comandante";
      const label = isRegular ? "Cósmico" : "Alt";
      standardImages.push({ id: "alt", label, src: char.altImage });
    }

    if (char.fichaImage && !standardImages.some((img) => img.src === char.fichaImage)) {
      standardImages.push({ id: "ficha_extra", label: "Ficha Extra", src: char.fichaImage });
    }
    if (char.overloadImage && char.overloadImage !== char.altImage && !standardImages.some((img) => img.src === char.overloadImage)) {
      standardImages.push({ id: "concept", label: "Concept", src: char.overloadImage });
    }
  }

  // 2. Gather available images for Detalles Mode (only for pibes)
  const detallesImages: { id: string; label: string; src: string }[] = [];
  if (isPibe) {
    const suitImgObj = char.powers?.suitImages || {};
    // Prioritize Ficha first!
    if (suitImgObj.ficha) {
      detallesImages.push({ id: "ficha", label: "Ficha", src: suitImgObj.ficha });
    }
    if (suitImgObj.default || char.overloadImage) {
      detallesImages.push({ id: "default", label: "Portada #1", src: suitImgObj.default || char.overloadImage });
    }
    // Add other suit images dynamically (excluding default, ficha, combat, etc.)
    Object.entries(suitImgObj).forEach(([key, val]) => {
      if (key !== "default" && key !== "ficha" && key !== "combat" && val && typeof val === "string") {
        if (key === "archor") return; // Completely hide Vesper Archor from the details modal
        const labelMap: Record<string, string> = {
          ficha2: "Ficha 2",
          fichaAlt: "Ficha Alt",
          alt: char.id === "ian" ? "Traje" : "Alt",
          archor: "Archor",
          mk3: "Mark III",
          mk3_alt: "Mark III Alt",
          mkl: "Mark L",
          ficha3: "Ficha 3",
        };
        const label = labelMap[key] || key.toUpperCase();
        if (!detallesImages.some((img) => img.id === key)) {
          detallesImages.push({ id: key, label, src: val });
        }
      }
    });
    // Fallback if empty
    if (detallesImages.length === 0) {
      detallesImages.push({ id: "default", label: "Normal", src: char.fullBody || char.image });
    }
  }

  const [selectedImageId, setSelectedImageId] = useState<string>(() => {
    return standardImages.length > 0 ? standardImages[0].id : "default";
  });
  const [isPowersMode, setIsPowersMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imgFullscreen, setImgFullscreen] = useState(false);
  const [unlockAll, setUnlockAll] = useState(false);

  // Decide current active images array based on mode
  const currentImagesList = isPibe
    ? isPowersMode
      ? detallesImages
      : standardImages
    : standardImages;

  // Decide which image to show
  const currentImageObj = currentImagesList.find((img) => img.id === selectedImageId) || currentImagesList[0];
  const isArchorLocked = selectedImageId === "archor" && !unlockAll;
  const currentImage = isArchorLocked
    ? "/personajes/LosPibes/FULLBODY SUIT/VESPERWING/vesperwing.webp"
    : currentImageObj?.src;

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
    };
  }, []);

  // Reset modal state when switching characters
  useEffect(() => {
    setSelectedImageId(standardImages.length > 0 ? standardImages[0].id : "default");
    setIsPowersMode(false);
  }, [char.id]);

  const isLocked = char.incognito && !unlockAll;
  const accent = isLocked ? "#6b7280" : char.color;
  const vibrantAccent = getVibrantColor(accent);
  const darkBg = getDarkBgColor(accent);

  // Transition handler when switching Detalles mode
  const handlePowersModeToggle = () => {
    if (!isPowersMode) {
      // Transitioning to Detalles Mode
      const targetImages = detallesImages;
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
        }, remaining);
      };

      img.onerror = () => {
        setIsPowersMode(true);
        setSelectedImageId(targetImages[0]?.id || "default");
        setIsTransitioning(false);
      };
    } else {
      // Transitioning back to Standard Mode
      setIsTransitioning(true);
      setTimeout(() => {
        setIsPowersMode(false);
        setSelectedImageId(standardImages.length > 0 ? standardImages[0].id : "default");
        setIsTransitioning(false);
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
          className="absolute top-3 right-3 z-30 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-[var(--font-bangers)] text-base sm:text-lg text-white bg-[#1b4332] hover:bg-[#2d6a4f] border-2 border-black shadow-[3px_3px_0_#000] transition-all hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5"
        >
          ✕
        </button>

        {/* ══════════ LEFT — image ══════════ */}
        <div
          className="w-full h-[200px] sm:h-auto sm:w-[460px] sm:min-w-[460px] lg:w-[540px] lg:min-w-[540px] flex-shrink-0 relative border-b-4 sm:border-b-0 sm:border-r-4 border-black transition-colors duration-400"
          style={{
            backgroundColor: isPowersMode ? darkBg : "#f1f5f9",
            backgroundImage: isPowersMode
              ? `radial-gradient(circle, ${vibrantAccent}22 1.5px, transparent 1.5px)`
              : "radial-gradient(circle, #cbd5e1 1.5px, transparent 1.5px)",
            backgroundSize: "20px 20px",
          }}
        >
          <style>{`
            @media (min-width: 640px) {
              .modal-img-panel { height: 100% !important; }
            }
          `}</style>
          <div className={`modal-img-panel absolute inset-0 flex justify-center overflow-hidden ${
            selectedImageId !== "default" && selectedImageId !== "alt" && selectedImageId !== "portada" ? "items-center" : "items-end"
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
                className={`w-full h-full object-contain p-1 sm:p-2 lg:p-4 transition-all duration-500 cursor-zoom-in ${
                  selectedImageId !== "default" && selectedImageId !== "alt" && selectedImageId !== "portada" ? "object-center" : "object-center sm:object-bottom"
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

          {/* Image selection buttons for all modes / categories */}
          {!isLocked && currentImagesList.length > 1 && (
            <div className="absolute bottom-2 left-2 z-20 flex flex-wrap gap-1.5 max-w-[90%]">
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
                      tempImg.onload = () => {
                        setSelectedImageId(imgOpt.id);
                        setIsTransitioning(false);
                      };
                      tempImg.onerror = () => {
                        setSelectedImageId(imgOpt.id);
                        setIsTransitioning(false);
                      };
                    }}
                    style={{
                      backgroundColor: isActive ? (isPowersMode ? vibrantAccent : accent) : "#0a0a0f",
                      color: isActive ? getTextColor(isPowersMode ? vibrantAccent : accent) : "#ffffff",
                      borderColor: isActive ? (isPowersMode ? vibrantAccent : accent) : "#0a0a0f",
                      boxShadow: isActive
                        ? `0 0 10px ${isPowersMode ? vibrantAccent : accent}88`
                        : "2px 2px 0 #000",
                      transform: isActive ? "translate(1px, 1px)" : "none",
                    }}
                    className="px-2.5 py-1 border-2 font-[var(--font-bangers)] text-[10px] tracking-wider uppercase transition-all hover:scale-105 active:scale-95"
                  >
                    {imgOpt.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* halftone overlay */}
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10"
            style={{ backgroundImage: "radial-gradient(circle,#fff 1.5px,transparent 1.5px)", backgroundSize: "6px 6px" }} />
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
