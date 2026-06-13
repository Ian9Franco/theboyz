"use client";

import { motion, AnimatePresence, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { getComputedCharacters } from "@/lib/characterData";
import { CharacterModal } from "./CharacterModal";

export function HeroSection() {
  const [readChapters, setReadChapters] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [selectedChar, setSelectedChar] = useState<any | null>(null);
  const [unlockAll, setUnlockAll] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const raw = localStorage.getItem("read-chapters");
      if (raw) setReadChapters(JSON.parse(raw));
    } catch {}

    const checkUnlock = () => {
      setUnlockAll(localStorage.getItem("unlock-all") === "true");
    };
    checkUnlock();
    window.addEventListener("unlockAllChanged", checkUnlock);
    return () => {
      window.removeEventListener("unlockAllChanged", checkUnlock);
    };
  }, []);

  // Filter to show only characters with verified image assets AND belonging to "pibes"
  const characters = getComputedCharacters(readChapters, isClient, unlockAll).filter(
    (c) => c.image && c.image !== "" && (!c.category || c.category === "pibes")
  );

  return (
    <div className="flex flex-col w-full">
      {/* ── Banner Section (Hero) ── */}
      <section
        className="relative flex flex-col overflow-hidden min-h-[60vh] md:min-h-[75vh] justify-center cursor-zoom-in"
        style={{ background: "#0a0a0f" }}
        onClick={() => setShowLightbox(true)}
      >
        {/* ── Full Banner Background Image ── */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <img 
            src="/personajes/LosPibes/group banner/Teamup.webp" 
            alt="The Boys Teamup" 
            className="w-full h-full object-cover opacity-85 grayscale-[0.1] hero-banner-img"
          />
          {/* Soft dark overlay gradients so the background remains highly visible */}
          <div 
            className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, #0a0a0f)"
            }}
          />
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              background: "linear-gradient(to right, rgba(10, 10, 15, 0.5) 30%, rgba(10, 10, 15, 0.1) 70%, rgba(10, 10, 15, 0.4) 100%)"
            }}
          />
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, transparent 30%, rgba(10, 10, 15, 0.6) 90%)"
            }}
          />
        </div>

        {/* ── Background overlays ── */}
        <div className="absolute inset-0 speed-lines opacity-10 pointer-events-none z-10" />
        
        {/* dot-grid accent top-right */}
        <div
          className="absolute right-0 top-0 w-80 h-80 pointer-events-none opacity-[0.04] z-10"
          style={{
            backgroundImage: "radial-gradient(circle, #1b4332 1.5px, transparent 1.5px)",
            backgroundSize: "10px 10px",
          }}
        />
      </section>

      {/* ── Infinite character marquee (Rendered below Hero, completely separate) ── */}
      <div 
        className="relative w-full bg-[#0a0a0f] py-4 sm:py-8 border-t border-b border-gray-900/50"
      >
        <CharacterMarquee
          characters={characters}
          onSelect={setSelectedChar}
        />
        
        {/* ── Fade into paper ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 sm:h-20 pointer-events-none z-20"
          style={{ background: "linear-gradient(to bottom, transparent, #f4f0e6)" }}
        />
      </div>

      {/* ── Modal & Lightbox ── */}
      <AnimatePresence>
        {selectedChar && (
          <CharacterModal char={selectedChar} onClose={() => setSelectedChar(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLightbox && (
          <BannerLightbox 
            src="/personajes/LosPibes/group banner/Teamup.webp" 
            alt="The Boys Teamup" 
            onClose={() => setShowLightbox(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Infinite marquee strip
───────────────────────────────────────────────────────────── */
function CharacterMarquee({
  characters,
  onSelect,
}: {
  characters: any[];
  onSelect: (c: any) => void;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const firstHalfRef = useRef<HTMLDivElement>(null);

  const dragX = useMotionValue(0);
  const isInteracting = useRef(false);
  const isDraggingRef = useRef(false);
  const timeoutRef = useRef<any>(null);
  const [halfWidth, setHalfWidth] = useState(0);

  // Measure the width of half of the doubled marquee (using first half + its padding/gap)
  useEffect(() => {
    if (!firstHalfRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHalfWidth(entry.contentRect.width);
      }
    });
    observer.observe(firstHalfRef.current);
    return () => observer.disconnect();
  }, []);

  // Wrap function to wrap the value in [-max, 0] range
  const wrap = (val: number, max: number) => {
    if (max === 0) return 0;
    const remainder = val % max;
    return remainder > 0 ? remainder - max : remainder;
  };

  // Transform to compute the offset translation to offset the parent dragX movement
  const xOffset = useTransform(dragX, (latest) => wrap(latest, halfWidth) - latest);

  // Frame animation loop
  useAnimationFrame((time, delta) => {
    if (isInteracting.current || halfWidth === 0) return;
    // Speed is 0.04 pixels per millisecond (approx 2.4 pixels per frame at 60fps)
    const speed = 0.04;
    dragX.set(dragX.get() - speed * delta);
  });

  // Wheel horizontal scroll support
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // If we are scrolling diagonally/horizontally, or vertically, we convert to horizontal marquee movement
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;

      e.preventDefault();
      isInteracting.current = true;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      dragX.set(dragX.get() - delta * 0.6); // Adjust wheel scrolling speed

      // Resume auto scroll after 1.5 seconds of no wheel input
      timeoutRef.current = setTimeout(() => {
        isInteracting.current = false;
      }, 1500);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [dragX]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.72, duration: 0.55 }}
      className="relative z-10 w-full overflow-hidden pb-3 pt-6 cursor-grab active:cursor-grabbing"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
      ref={carouselRef}
    >
      <motion.div
        drag="x"
        style={{ x: dragX, width: "max-content" }}
        dragMomentum={true}
        onDragStart={() => {
          isInteracting.current = true;
          isDraggingRef.current = true;
        }}
        onDragEnd={() => {
          isInteracting.current = false;
          // Short delay to prevent misinterpreting drag release as a click
          setTimeout(() => {
            isDraggingRef.current = false;
          }, 80);
        }}
        onHoverStart={() => {
          isInteracting.current = true;
        }}
        onHoverEnd={() => {
          // Only resume if we are not dragging/scrolling
          if (!isDraggingRef.current) {
            isInteracting.current = false;
          }
        }}
        className="flex"
      >
        <motion.div style={{ x: xOffset }} className="flex">
          {/* First Half */}
          <div ref={firstHalfRef} className="flex gap-3 sm:gap-4 pr-3 sm:pr-4">
            {characters.map((char, i) => (
              <CharCard
                key={`${char.id}-0-${i}`}
                char={char}
                floatDelay={((i % characters.length) * 0.6) % 4}
                onClick={() => {
                  if (!isDraggingRef.current) {
                    onSelect(char);
                  }
                }}
              />
            ))}
          </div>
          {/* Second Half */}
          <div className="flex gap-3 sm:gap-4 pr-3 sm:pr-4">
            {characters.map((char, i) => (
              <CharCard
                key={`${char.id}-1-${i}`}
                char={char}
                floatDelay={((i % characters.length) * 0.6) % 4}
                onClick={() => {
                  if (!isDraggingRef.current) {
                    onSelect(char);
                  }
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Individual card with bob + tilt on hover
   With dynamic overlapping and push-out animations
───────────────────────────────────────────────────────────── */
function getTextColor(hexColor: string) {
  if (!hexColor) return "white";
  const color = hexColor.replace("#", "");
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 140 ? "#0a0a0f" : "white";
}

function CharCard({
  char,
  floatDelay,
  onClick,
}: {
  char: any;
  floatDelay: number;
  onClick: () => void;
}) {
  const [hasError, setHasError] = useState(false);
  const isAltVal = Math.floor(floatDelay * 10) % 2 === 0;

  return (
    /* outer: only bobs vertically — no scale, no hover */
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 3.8,
        ease: "easeInOut",
        delay: floatDelay,
      }}
      className="flex-shrink-0 relative select-none"
      style={{
        width: "clamp(80px, 12vw, 150px)",
        aspectRatio: "3/4",
        marginLeft: "-12px",
        marginRight: "-12px",
      }}
    >
    {/* inner: handles ALL hover effects independently from the bob */}
    <motion.div
      className="absolute inset-0 cursor-pointer overflow-hidden"
      style={{
        border: "3px solid white",
        boxShadow: `4px 4px 0 ${char.displayColor}, 6px 12px 22px rgba(0,0,0,0.6)`,
        background: char.incognito ? "#1a1a25" : "#13131e",
      }}
      whileHover={{
        scale: 1.22,
        rotate: isAltVal ? -2.5 : 2.5,
        zIndex: 50,
        boxShadow: `8px 8px 0 ${char.displayColor}, 12px 20px 32px rgba(0,0,0,0.8)`,
        transition: { type: "spring", stiffness: 340, damping: 26 },
      }}
      onClick={onClick}
    >
      {/* image content */}
      {char.incognito ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 speed-lines opacity-20" />
          {!hasError && !!char.image && (
            <img
              src={char.image}
              alt="?"
              className="absolute inset-0 w-full h-full object-cover object-top opacity-15 grayscale blur-[3px]"
              onError={() => setHasError(true)}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <span
            className="font-[var(--font-bangers)] text-5xl text-white opacity-25 z-10 select-none"
            style={{ textShadow: "2px 2px 0 #000" }}
          >
            ?
          </span>
        </div>
      ) : hasError || !char.image ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-[var(--font-bangers)] text-5xl text-white opacity-30"
            style={{ textShadow: `3px 3px 0 ${char.displayColor}` }}
          >
            ?
          </span>
        </div>
      ) : (
        <>
          <img
            src={char.image}
            alt={char.displayName}
            className="w-full h-full object-cover object-top"
            onError={() => setHasError(true)}
          />
        </>
      )}

      {/* halftone overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-15"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* name label */}
      {!char.incognito && (
        <div
          className="absolute bottom-0 left-0 right-0 py-1 text-center font-[var(--font-bangers)] text-[11px] tracking-wider truncate px-1"
          style={{ 
            background: char.displayColor, 
            color: getTextColor(char.displayColor) 
          }}
        >
          {char.displayName.toUpperCase()}
        </div>
      )}
    </motion.div>
    </motion.div>
  );
}

/* ── Interactive Zoomable/Panable Lightbox ──────────────────────────────────────── */
export function BannerLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const [isZoomed, setIsZoomed] = useState(false);

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
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 select-none"
    >
      <div 
        className="absolute inset-0 cursor-zoom-out" 
        onClick={onClose} 
      />

      <div className="relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: isZoomed ? 1.8 : 1.0, 
            opacity: 1,
            cursor: isZoomed ? 'grab' : 'zoom-in' 
          }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          src={src}
          alt={alt}
          drag={isZoomed}
          dragConstraints={{ left: -600, right: 600, top: -400, bottom: 400 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(!isZoomed);
          }}
          className="max-h-[90vh] max-w-[90vw] object-contain pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10"
        />
      </div>

      {/* Floating control badge */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 bg-black/80 border border-white/20 px-4 py-2 rounded-full text-white text-xs sm:text-sm font-[var(--font-bangers)] tracking-wider">
        <span>{isZoomed ? "ARRASTRÁ PARA NAVEGAR" : "CLICK PARA HACER ZOOM"}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(!isZoomed);
          }}
          className="bg-[#1b4332] hover:bg-[#2d6a4f] px-3 py-1 rounded text-white transition-colors"
        >
          {isZoomed ? "LUPA -" : "LUPA +"}
        </button>
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-[#1b4332] border-2 border-white text-white font-[var(--font-bangers)] text-xl shadow-lg z-20 hover:bg-[#2d6a4f] transition-colors"
      >
        ✕
      </button>
    </motion.div>
  );
}
