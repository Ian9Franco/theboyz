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

  const characters = getComputedCharacters(readChapters, isClient, unlockAll);

  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{ background: "#0a0a0f", minHeight: "90vh" }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 speed-lines opacity-20 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 65% 35%, rgba(232,24,90,0.16) 0%, transparent 70%), " +
            "radial-gradient(ellipse 45% 45% at 10% 85%, rgba(0,184,212,0.10) 0%, transparent 65%)",
        }}
      />
      {/* dot-grid accent top-right */}
      <div
        className="absolute right-0 top-0 w-80 h-80 pointer-events-none opacity-[0.055]"
        style={{
          backgroundImage: "radial-gradient(circle, #e8185a 1.5px, transparent 1.5px)",
          backgroundSize: "10px 10px",
        }}
      />

      {/* ── Hero text ── */}
      <div className="relative z-10 flex-1 flex items-center px-6 sm:px-10 md:px-16 lg:px-24 pt-8 sm:pt-16 pb-6 sm:pb-10">
        <div className="w-full max-w-2xl">
          {/* kicker */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-3 sm:mb-5"
          >
            <span
              className="font-[var(--font-bangers)] text-xs sm:text-sm tracking-[0.35em] uppercase"
              style={{
                color: "#e8185a",
                border: "1px solid rgba(232,24,90,0.45)",
                padding: "0.3rem 1rem",
              }}
            >
              Un cómic original
            </span>
          </motion.div>

          {/* title */}
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 14, delay: 0.12 }}
            className="font-[var(--font-bangers)] leading-[0.88] text-white mb-4 sm:mb-6 select-none"
            style={{
              fontSize: "clamp(5rem, 16vw, 11rem)",
              textShadow: "5px 5px 0 #e8185a, 10px 10px 0 rgba(232,24,90,0.12)",
            }}
          >
            THE
            <br />
            BOYZ
          </motion.h1>

          {/* tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
            className="font-[var(--font-marker)] text-base sm:text-xl mb-6 sm:mb-10"
            style={{ color: "rgba(255,255,255,0.58)" }}
          >
            una historia basada en hechos reales
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.54 }}
            className="flex flex-row gap-3 flex-wrap"
          >
            <a href="#sagas" className="btn btn-magenta text-base sm:text-lg px-5 py-2.5 sm:px-7 sm:py-3">
              Empezá a leer →
            </a>
            <a
              href="#sagas"
              className="btn text-base sm:text-lg px-5 py-2.5 sm:px-7 sm:py-3"
              style={{
                background: "transparent",
                color: "white",
                border: "2px solid rgba(255,255,255,0.22)",
                boxShadow: "none",
              }}
            >
              Ver sagas
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Infinite character marquee ── */}
      <CharacterMarquee
        characters={characters}
        onSelect={setSelectedChar}
      />

      {/* ── Fade into paper ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 sm:h-28 pointer-events-none z-20"
        style={{ background: "linear-gradient(to bottom, transparent, #f4f0e6)" }}
      />

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedChar && (
          <CharacterModal char={selectedChar} onClose={() => setSelectedChar(null)} />
        )}
      </AnimatePresence>
    </section>
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
      className="relative z-10 w-full overflow-hidden pb-8 pt-16 cursor-grab active:cursor-grabbing"
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
        width: "clamp(90px, 14vw, 155px)",
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
              className="absolute inset-0 w-full h-full object-cover object-center opacity-15 grayscale blur-[3px]"
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
          <div className="absolute inset-1.5 border-2 border-black pointer-events-none z-20" />
        </div>
      ) : hasError || !char.image ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-[var(--font-bangers)] text-5xl text-white opacity-30"
            style={{ textShadow: `3px 3px 0 ${char.displayColor}` }}
          >
            ?
          </span>
          <div className="absolute inset-1.5 border-2 border-black pointer-events-none z-20" />
        </div>
      ) : (
        <>
          <img
            src={char.image}
            alt={char.displayName}
            className="w-full h-full object-cover object-center"
            onError={() => setHasError(true)}
          />
          <div className="absolute inset-1.5 border-2 border-black pointer-events-none z-20" />
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
