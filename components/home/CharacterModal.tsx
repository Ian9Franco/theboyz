"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Zap, ZapOff } from "lucide-react";

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
  if (c === '#0d3a2b') return '#10b981'; // Ian: emerald green
  if (c === '#0a1128') return '#3b82f6'; // Julián: vibrant blue
  if (c === '#4c1d95') return '#a855f7'; // Mati: vibrant purple
  if (c === '#b91c1c') return '#ef4444'; // Uandi: vibrant red
  return hexColor; // Jaz, Volvo, Sofi are already vibrant/light
}

function getDarkBgColor(hexColor: string) {
  if (!hexColor) return "#0f172a";
  const c = hexColor.toLowerCase();
  if (c === '#0d3a2b') return '#061410'; // very dark green
  if (c === '#f5e642') return '#121203'; // very dark yellow
  if (c === '#0a1128') return '#020512'; // very dark blue
  if (c === '#4c1d95') return '#0d041c'; // very dark purple
  if (c === '#b91c1c') return '#170303'; // very dark red
  if (c === '#f95700') return '#170802'; // very dark orange
  if (c === '#06b6d4') return '#021214'; // very dark cyan
  return "#0f172a";
}

export function CharacterModal({ char, onClose }: { char: any; onClose: () => void }) {
  const [selectedImageId, setSelectedImageId] = useState<string>("default");
  const [isPowersMode, setIsPowersMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imgFullscreen, setImgFullscreen] = useState(false);
  const [unlockAll, setUnlockAll] = useState(false);

  const isPibe = char.category === 'pibes' || ['ian', 'jaz', 'julian', 'mati', 'uandi', 'volvo', 'sofi'].includes(char.id);

  // 1. Gather available images for Standard Mode (or for non-pibe characters)
  const standardImages: { id: string; label: string; src: string }[] = [];
  if (char.fullBody || char.image) {
    standardImages.push({ id: "default", label: "Normal", src: char.fullBody || char.image });
  }
  if (char.altImage) {
    const isRegular = char.id === 'comandante';
    const label = isRegular ? "Cósmico" : "Alt";
    standardImages.push({ id: "alt", label, src: char.altImage });
  }

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
  const closeUpPath = char.closeUp || closeUpMap[char.id];
  if (closeUpPath) {
    standardImages.push({ id: "closeup", label: "Closeup", src: closeUpPath });
  }

  if (!isPibe && char.fichaImage) {
    standardImages.push({ id: "ficha", label: "Ficha", src: char.fichaImage });
  }
  if (!isPibe && char.overloadImage && char.overloadImage !== char.altImage) {
    standardImages.push({ id: "concept", label: "Concept", src: char.overloadImage });
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
      if (key !== 'default' && key !== 'ficha' && key !== 'combat' && val && typeof val === 'string') {
        const labelMap: Record<string, string> = {
          ficha2: 'Ficha 2',
          fichaAlt: 'Ficha Alt',
          alt: char.id === 'ian' ? 'Traje' : 'Alt',
          archor: unlockAll ? 'Archor' : '???',
          mk3: 'Mark III',
          mk3_alt: 'Mark III Alt',
          mkl: 'Mark L',
          ficha3: 'Ficha 3',
        };
        const label = labelMap[key] || key.toUpperCase();
        if (!detallesImages.some(img => img.id === key)) {
          detallesImages.push({ id: key, label, src: val });
        }
      }
    });
    // Fallback if empty
    if (detallesImages.length === 0) {
      detallesImages.push({ id: "default", label: "Normal", src: char.fullBody || char.image });
    }
  }

  // Decide current active images array based on mode
  const currentImagesList = isPibe
    ? (isPowersMode ? detallesImages : standardImages)
    : standardImages;

  // Decide which image to show
  const currentImageObj = currentImagesList.find(img => img.id === selectedImageId) || currentImagesList[0];
  const isArchorLocked = selectedImageId === 'archor' && !unlockAll;
  const currentImage = isArchorLocked ? '/personajes/LosPibes/FULLBODY SUIT/VESPERWING/vesperwing.webp' : currentImageObj?.src;

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
    setSelectedImageId("default");
    setIsPowersMode(false);
  }, [char.id]);

  const isLocked = char.incognito && !unlockAll;
  const accent = isLocked ? "#6b7280" : char.color;
  const vibrantAccent = getVibrantColor(accent);
  const darkBg = getDarkBgColor(accent);
  const stats = isArchorLocked
    ? char.stats
    : (isPowersMode ? char.powers?.stats : char.stats);

  // Resolve variant-specific content (habilidades / significa / crisis)
  // We use the selectedImageId if it corresponds to a variant (e.g. 'alt', 'archor')
  const activeVariantData =
    isPowersMode && selectedImageId !== 'default' && selectedImageId !== 'ficha'
      ? char.powers?.variantData?.[selectedImageId]
      : null;

  const variantContent = {
    habilidades: isArchorLocked
      ? [
          'Contenido Clasificado: Este registro contiene información sobre la fase final clasificada del multiverso.',
          'Clasificado: Acceso restringido por la Iniciativa Vesperwing.',
          '???'
        ]
      : (activeVariantData?.habilidades ?? char.powers?.habilidades),
    significa: isArchorLocked
      ? 'Información encriptada para evitar paradojas temporales. El destino final de Ian permanece oculto.'
      : (activeVariantData?.significa ?? char.powers?.significa),
    crisis: isArchorLocked
      ? 'Alerta de Spoiler: Los datos tácticos han sido bloqueados voluntariamente.'
      : (activeVariantData?.crisis ?? char.powers?.crisis),
    variantLabel: isArchorLocked ? '???' : (activeVariantData?.label ?? null),
  };

  const isLocation = char.category === 'locaciones';
  const statRows = isLocation
    ? [
        { name: "Recursos", val: stats?.fuerza ?? 0 },
        { name: "Tecnología", val: stats?.inteligencia ?? 0 },
        { name: "Confort", val: stats?.carisma ?? 0 },
        { name: "Sigilo", val: stats?.suerte ?? 0 },
        { name: "Defensas", val: stats?.combate ?? 0 },
        { name: "Blindaje", val: stats?.defensa ?? 0 },
        { name: char.especialLabel || "Especial", val: isPowersMode ? (char.powers?.stats?.especialVal ?? 0) : (char.stats?.especialVal ?? 0) },
      ]
    : [
        { name: "Fuerza",   val: stats?.fuerza ?? 0 },
        { name: "Intel.",   val: stats?.inteligencia ?? 0 },
        { name: "Carisma",  val: stats?.carisma ?? 0 },
        { name: "Suerte",   val: stats?.suerte ?? 0 },
        { name: "Combate",  val: stats?.combate ?? 0 },
        { name: "Defensa",  val: stats?.defensa ?? 0 },
        { name: char.especialLabel || "Especial", val: isPowersMode ? (char.powers?.stats?.especialVal ?? 0) : (char.stats?.especialVal ?? 0) },
      ];

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
        setSelectedImageId("default");
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
        {/* CSS for custom scanlines and animations */}
        <style>{`
          @keyframes scanLine {
            0% { top: -10%; }
            100% { top: 110%; }
          }
          @keyframes scanLineRev {
            0% { top: 110%; }
            100% { top: -10%; }
          }
          @keyframes flickerIn {
            0%,18%,22%,25%,53%,57%,100% { opacity: 1; }
            20%,24%,55%          { opacity: 0; }
          }
          @keyframes glitchH {
            0%,100% { transform: translateX(0) skewX(0); }
            10%      { transform: translateX(-4px) skewX(-3deg); }
            20%      { transform: translateX(4px)  skewX(3deg); }
            30%      { transform: translateX(-2px) skewX(-1deg); }
            40%      { transform: translateX(0); }
          }
          @keyframes powerSurge {
            0%   { width: 0%; box-shadow: none; }
            60%  { width: 80%; box-shadow: 0 0 12px var(--surge-color); }
            100% { width: 100%; box-shadow: 0 0 24px var(--surge-color), 0 0 48px var(--surge-color); }
          }
          @keyframes shockwave {
            0%   { transform: scale(0.2); opacity: 0.9; }
            100% { transform: scale(4);   opacity: 0; }
          }
          @keyframes pulseGlow {
            0%,100% { opacity: 0.35; }
            50%     { opacity: 0.75; }
          }
          @keyframes rgbSplit {
            0%   { text-shadow: -3px 0 #ff0000, 3px 0 #00ffff; }
            25%  { text-shadow:  3px 0 #ff0000,-3px 0 #00ffff; }
            50%  { text-shadow:  0  3px #ff0000, 0 -3px #00ffff; }
            75%  { text-shadow: -2px 2px #ff00ff, 2px -2px #00ff00; }
            100% { text-shadow: -3px 0 #ff0000, 3px 0 #00ffff; }
          }
          .speed-lines {
            background-image: 
              linear-gradient(45deg, rgba(255,255,255,0.03) 25%, transparent 25%), 
              linear-gradient(-45deg, rgba(255,255,255,0.03) 25%, transparent 25%);
            background-size: 60px 60px;
          }
          .overload-btn-active {
            animation: flickerIn 0.15s ease-out;
          }
        `}</style>

        {/* ══ Epic Transition Overlay ══ */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
              style={{
                backgroundColor: "#060608",
                backgroundImage: `radial-gradient(circle, ${vibrantAccent}18 1.5px, transparent 1.5px)`,
                backgroundSize: '22px 22px',
              }}
            >
              {/* === Layer 1: ambient energy orb === */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-[600px] h-[600px] rounded-full blur-[160px]"
                  style={{
                    backgroundColor: vibrantAccent,
                    animation: 'pulseGlow 0.8s ease-in-out infinite',
                  }}
                />
              </div>

              {/* === Layer 2: shockwave rings === */}
              {[0, 0.18, 0.36].map((delay, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border-2 pointer-events-none"
                  style={{
                    width: 120,
                    height: 120,
                    borderColor: vibrantAccent,
                    animation: `shockwave 1.1s ease-out ${delay}s infinite`,
                    opacity: 0,
                  }}
                />
              ))}

              {/* === Layer 3: dual scanlines === */}
              <div
                className="absolute inset-x-0 h-[3px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${vibrantAccent}, transparent)`,
                  boxShadow: `0 0 16px ${vibrantAccent}, 0 0 40px ${vibrantAccent}88`,
                  animation: 'scanLine 1.2s linear infinite',
                }}
              />
              <div
                className="absolute inset-x-0 h-[1px] bg-white/30"
                style={{ animation: 'scanLineRev 1.8s linear infinite' }}
              />
              {/* red/cyan chromatic aberration line */}
              <div
                className="absolute inset-x-0 h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, #ff003388, transparent, #00ffff88)',
                  animation: 'scanLine 0.9s linear infinite',
                  animationDelay: '0.3s',
                }}
              />

              {/* === Layer 4: halftone + speed lines === */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25"
                style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '4px 4px' }}
              />
              <div className="absolute inset-0 opacity-10 pointer-events-none speed-lines" />

              {/* === Layer 5: hero alias ghost watermark === */}
              {char.powers?.role && (
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                >
                  <span
                    className="font-[var(--font-bangers)] text-[clamp(5rem,20vw,12rem)] tracking-widest whitespace-nowrap"
                    style={{
                      color: `${vibrantAccent}12`,
                      letterSpacing: '0.2em',
                      animation: 'glitchH 0.7s ease-in-out infinite',
                    }}
                  >
                    {char.powers.role.split(' / ')[0].toUpperCase()}
                  </span>
                </div>
              )}

              {/* === Layer 6: main title with RGB glitch === */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [0.6, 1.08, 0.96, 1.03, 1], opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="font-[var(--font-bangers)] text-4xl sm:text-6xl lg:text-7xl tracking-[0.15em] text-center select-none z-10 px-4 relative"
                style={{
                  color: '#ffffff',
                  animation: 'rgbSplit 0.4s linear infinite',
                }}
              >
                {!isPowersMode ? 'CARGANDO DETALLES' : 'RESTABLECIENDO'}
              </motion.div>

              {/* sub-line */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="mt-3 font-[var(--font-marker)] text-xs sm:text-sm tracking-[0.3em] uppercase z-10 text-center"
                style={{ color: vibrantAccent, animation: 'flickerIn 2s ease-in-out infinite' }}
              >
                {!isPowersMode ? 'Accediendo a la ficha técnica' : 'Volviendo a vista general'}
              </motion.div>

              {/* === Layer 7: power surge bar === */}
              <div className="mt-6 z-10 w-[min(80%,260px)] flex flex-col items-center gap-1.5">
                <div
                  className="w-full h-2.5 border border-white/20 overflow-hidden"
                  style={{ backgroundColor: '#0a0a0f' }}
                >
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                    style={{
                      backgroundColor: vibrantAccent,
                      boxShadow: `0 0 10px ${vibrantAccent}, 0 0 30px ${vibrantAccent}88`,
                    }}
                  />
                </div>
                <div className="flex justify-between w-full">
                  {['SYS', 'PWR', 'TAC', 'ARM', 'NET'].map((label) => (
                    <span
                      key={label}
                      className="font-[var(--font-bangers)] text-[9px] tracking-widest"
                      style={{ color: `${vibrantAccent}99` }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* === Corner brackets (HUD) === */}
              {(['tl','tr','bl','br'] as const).map((pos) => (
                <div
                  key={pos}
                  className="absolute w-6 h-6 pointer-events-none"
                  style={{
                    top:    pos.startsWith('t') ? 16 : undefined,
                    bottom: pos.startsWith('b') ? 16 : undefined,
                    left:   pos.endsWith('l')   ? 16 : undefined,
                    right:  pos.endsWith('r')   ? 16 : undefined,
                    borderTop:    pos.startsWith('t') ? `2px solid ${vibrantAccent}` : undefined,
                    borderBottom: pos.startsWith('b') ? `2px solid ${vibrantAccent}` : undefined,
                    borderLeft:   pos.endsWith('l')   ? `2px solid ${vibrantAccent}` : undefined,
                    borderRight:  pos.endsWith('r')   ? `2px solid ${vibrantAccent}` : undefined,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Close ── */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-[var(--font-bangers)] text-base sm:text-lg text-white bg-[#e8185a] hover:bg-[#c8134d] border-2 border-black shadow-[3px_3px_0_#000] transition-all hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5"
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
            (selectedImageId !== 'default' && selectedImageId !== 'alt') ? "items-center" : "items-end"
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
                  (selectedImageId !== 'default' && selectedImageId !== 'alt') ? "object-center" : "object-center sm:object-bottom"
                } ${isPowersMode ? "brightness-110" : ""}`}
                style={{
                  filter: isPowersMode 
                    ? `drop-shadow(4px 4px 0 rgba(0,0,0,0.2)) drop-shadow(0 0 18px ${vibrantAccent})`
                    : `drop-shadow(4px 4px 0 rgba(0,0,0,0.2))`
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
                      backgroundColor: isActive ? (isPowersMode ? vibrantAccent : accent) : '#0a0a0f',
                      color: isActive ? getTextColor(isPowersMode ? vibrantAccent : accent) : '#ffffff',
                      borderColor: isActive ? (isPowersMode ? vibrantAccent : accent) : '#0a0a0f',
                      boxShadow: isActive
                        ? `0 0 10px ${isPowersMode ? vibrantAccent : accent}88`
                        : '2px 2px 0 #000',
                      transform: isActive ? 'translate(1px, 1px)' : 'none',
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
        <div
          style={{
            backgroundColor: isPowersMode ? darkBg : "#ffffff",
            color: isPowersMode ? "#f8fafc" : "#0a0a0f",
          }}
          className="flex-1 flex flex-col p-5 sm:p-8 gap-4 sm:gap-6 overflow-y-auto transition-colors duration-400"
        >
          {isLocked ? (
            /* ── locked ── */
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 flex-shrink-0">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center border-2 border-black">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="font-[var(--font-bangers)] text-3xl tracking-wider">PERSONAJE BLOQUEADO</h3>
              <p className="font-[var(--font-marker)] text-base text-[#e8185a] uppercase tracking-wider">Próximamente</p>
              <p className="font-sans text-sm text-gray-500 max-w-xs leading-snug">
                {char.hint ?? "Seguí leyendo para desbloquear este personaje."}
              </p>
            </div>
          ) : (
            <>
              {/* ── name + role tag ── */}
              <div className="flex flex-col gap-1 pr-8 flex-shrink-0">
                <span
                  className="tag text-[10px] font-[var(--font-bangers)] tracking-wider px-2 py-0.5 border-2 border-black self-start"
                  style={{ 
                    background: isPowersMode ? vibrantAccent : accent, 
                    color: getTextColor(isPowersMode ? vibrantAccent : accent) 
                  }}
                >
                  {isPibe
                    ? (isPowersMode
                        ? (variantContent.variantLabel
                            ? `${char.powers?.role?.split(' / ')[0]} — ${variantContent.variantLabel}`
                            : char.powers?.role)
                        : char.role)
                    : char.role}
                </span>
                <h2
                  className="font-[var(--font-bangers)] text-4xl sm:text-5xl leading-none tracking-widest flex flex-wrap items-baseline gap-x-2"
                  style={{ textShadow: isPowersMode ? `2px 2px 0 ${darkBg}, 4px 4px 0 ${vibrantAccent}` : `2px 2px 0 ${accent}` }}
                >
                  <span>{char.name.toUpperCase()}</span>
                  {isPibe && isPowersMode && char.powers?.role && (
                    <span 
                      style={{ color: vibrantAccent }}
                      className="text-xl sm:text-2xl font-[var(--font-marker)] tracking-normal normal-case block sm:inline"
                    >
                      {variantContent.variantLabel
                        ? variantContent.variantLabel.toUpperCase()
                        : `AKA: ${char.powers.role.split(' / ')[0].toUpperCase()}`}
                    </span>
                  )}
                </h2>
              </div>

              {/* ── profile / habilidades ── */}
              <div 
                style={{ borderColor: isPowersMode ? `${vibrantAccent}33` : "#0a0a0f" }}
                className="border-t-2 pt-2 flex flex-col gap-1 flex-shrink-0"
              >
                <h4 className="font-[var(--font-bangers)] text-xs tracking-wider">
                  {isPowersMode ? "HABILIDADES:" : "PERFIL:"}
                </h4>
                <ul className="font-sans text-xs leading-relaxed flex flex-col gap-1 pl-3 list-disc list-outside">
                  {(isPowersMode ? variantContent.habilidades : char.perfil)
                    ?.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                </ul>
              </div>

              {/* ── abilities / habilidades (for non-pibes we display their powers' skills directly) ── */}
              {!isPibe && char.powers?.habilidades && (
                <div 
                  className="border-t-2 pt-2 flex flex-col gap-1 flex-shrink-0"
                  style={{ borderColor: "#0a0a0f" }}
                >
                  <h4 className="font-[var(--font-bangers)] text-xs tracking-wider">HABILIDADES ESPECIALES:</h4>
                  <ul className="font-sans text-xs leading-relaxed flex flex-col gap-1 pl-3 list-disc list-outside">
                    {char.powers.habilidades.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ── significa banner (for non-pibes or pibes in detalles mode) ── */}
              {((isPowersMode && variantContent.significa) || (!isPibe && char.powers?.significa)) && (
                <div
                  className="p-3 border-2 relative bg-[#13131e] mt-2 mb-1 flex-shrink-0"
                  style={{
                    borderColor: isPowersMode ? vibrantAccent : accent,
                    boxShadow: isPowersMode ? `3px 3px 0 ${vibrantAccent}` : `3px 3px 0 ${accent}`,
                  }}
                >
                  <span
                    className="font-[var(--font-marker)] text-[10px] uppercase absolute -top-3 left-3 rotate-[-1deg] border border-[#0a0a0f] px-2 py-0.5"
                    style={{
                      backgroundColor: isPowersMode ? vibrantAccent : accent,
                      color: getTextColor(isPowersMode ? vibrantAccent : accent),
                    }}
                  >
                    {isPowersMode && variantContent.variantLabel ? variantContent.variantLabel.toUpperCase() : 'SIGNIFICA:'}
                  </span>
                  <p className="font-sans text-[11px] leading-snug text-white mt-1">
                    {isPowersMode ? variantContent.significa : char.powers?.significa}
                  </p>
                </div>
              )}

              {/* ── crisis ── */}
              <div
                className="border-2 p-3 relative overflow-hidden flex flex-col gap-1.5 flex-shrink-0 transition-all duration-300"
                style={{
                  backgroundColor: isPowersMode ? "#111827" : "#fffbeb",
                  borderColor: isPowersMode ? vibrantAccent : "#0a0a0f",
                  boxShadow: isPowersMode ? `3px 3px 0 ${vibrantAccent}` : "3px 3px 0 #000",
                }}
              >
                <div 
                  className="self-start font-[var(--font-bangers)] text-[11px] tracking-wider px-2 py-0.5 border-2 uppercase"
                  style={{
                    backgroundColor: isPowersMode ? vibrantAccent : "#e8185a",
                    color: isPowersMode ? getTextColor(vibrantAccent) : "white",
                    borderColor: isPowersMode ? vibrantAccent : "#0a0a0f",
                  }}
                >
                  {isPowersMode ? "Ficha Táctica" : "En Crisis"}
                </div>
                <p className="font-sans text-xs sm:text-sm leading-snug">
                  {isPowersMode ? variantContent.crisis : (char.powers?.crisis || char.crisis)}
                </p>
              </div>

              {/* ── stats — 2-col compact grid ── */}
              <div 
                style={{ borderColor: isPowersMode ? `${vibrantAccent}33` : "#f1f5f9" }}
                className="border-t pt-2 flex flex-col gap-1.5 flex-shrink-0"
              >
                <h4 className="font-[var(--font-bangers)] text-xs tracking-wider">
                  {isLocation ? "MÉTRICAS:" : (isPowersMode ? "MÉTRICAS:" : "STATS:")}
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  {statRows.map((s, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-14 text-[9px] font-[var(--font-bangers)] uppercase tracking-wider truncate shrink-0">
                        {s.name}
                      </span>
                      <div className="flex-1 h-2.5 bg-gray-200 border border-black overflow-hidden flex">
                        {Array.from({ length: 10 }).map((_, idx) => (
                          <div
                            key={idx}
                            className="h-full flex-1 border-r border-black last:border-0 transition-all duration-400"
                            style={{ backgroundColor: idx < s.val ? (isPowersMode ? vibrantAccent : accent) : "transparent" }}
                          />
                        ))}
                      </div>
                      <span className="font-[var(--font-bangers)] text-[9px] w-6 text-right shrink-0">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Detalles toggle button (only for Pibes) ── */}
              {isPibe && (
                <div className="pt-2 mt-auto pb-2 sm:pb-0 flex-shrink-0">
                  <button
                    onClick={handlePowersModeToggle}
                    style={{
                      backgroundColor: isPowersMode ? darkBg : accent,
                      color: isPowersMode ? vibrantAccent : getTextColor(accent),
                      borderColor: isPowersMode ? vibrantAccent : "#0a0a0f",
                      boxShadow: isPowersMode ? `3px 3px 0 ${vibrantAccent}` : "3px 3px 0 #000",
                    }}
                    className="w-full py-3 sm:py-2 border-3 font-[var(--font-bangers)] text-sm sm:text-base tracking-wider uppercase active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#000] transition-all flex items-center justify-center gap-2 hover:brightness-105 active:brightness-95"
                  >
                    {isPowersMode ? (
                      <>
                        <ZapOff className="w-5 h-5 shrink-0" />
                        <span>VISTA GENERAL</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 shrink-0 fill-current" />
                        <span>DETALLES</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        
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

/* ── Fullscreen image overlay ────────────────────────────────────────────── */
function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 cursor-zoom-out"
      onClick={onClose}
    >
      <motion.img
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] max-w-[92vw] object-contain select-none"
        style={{ boxShadow: '0 0 60px rgba(0,0,0,0.8)' }}
      />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-[#e8185a] border-2 border-white text-white font-[var(--font-bangers)] text-xl shadow-lg"
      >
        ✕
      </button>
    </motion.div>
  );
}
