"use client";

import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { getComputedCharacters } from "@/lib/characterData";
import { CharacterModal } from "./CharacterModal";

export function HeroSection() {
  const [readChapters, setReadChapters] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [selectedChar, setSelectedChar] = useState<any | null>(null);

  useEffect(() => {
    setIsClient(true);
    try {
      const raw = localStorage.getItem("read-chapters");
      if (raw) setReadChapters(JSON.parse(raw));
    } catch {}
  }, []);

  const characters = getComputedCharacters(readChapters, isClient);

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
      <div className="relative z-10 flex-1 flex items-center px-6 sm:px-10 md:px-16 lg:px-24 pt-16 pb-10">
        <div className="w-full max-w-2xl">
          {/* kicker */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-5"
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
            className="font-[var(--font-bangers)] leading-[0.88] text-white mb-6 select-none"
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
            className="font-[var(--font-marker)] text-lg sm:text-xl mb-10"
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
            <a href="#sagas" className="btn btn-magenta text-lg sm:text-xl px-7 py-3">
              Empezá a leer →
            </a>
            <a
              href="#sagas"
              className="btn text-lg sm:text-xl px-7 py-3"
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
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-20"
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
  const controls = useAnimationControls();
  const doubled = [...characters, ...characters];

  // Start the marquee once mounted
  useEffect(() => {
    controls.start({
      x: ["-0%", "-50%"],
      transition: { ease: "linear", duration: 28, repeat: Infinity },
    });
  }, [controls]);

  const pause  = () => controls.stop();
  const resume = () =>
    controls.start({
      x: ["-0%", "-50%"],
      transition: { ease: "linear", duration: 28, repeat: Infinity },
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.72, duration: 0.55 }}
      className="relative z-10 w-full overflow-hidden pb-8 pt-4"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 25%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%)",
      }}
    >
      <motion.div
        animate={controls}
        className="flex gap-3 sm:gap-4"
        style={{ width: "max-content" }}
      >
        {doubled.map((char, i) => (
          <CharCard
            key={`${char.id}-${i}`}
            char={char}
            floatDelay={((i % characters.length) * 0.6) % 4}
            onClick={() => onSelect(char)}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Individual card with bob + tilt on hover
───────────────────────────────────────────────────────────── */
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

  return (
    <motion.div
      /* continuous vertical bob */
      animate={{ y: [0, -8, 0] }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 3.8,
        ease: "easeInOut",
        delay: floatDelay,
      }}
      className="flex-shrink-0 relative cursor-pointer overflow-hidden select-none"
      style={{
        width: "clamp(82px, 13vw, 140px)",
        aspectRatio: "3/4",
        border: "3px solid white",
        boxShadow: `4px 4px 0 ${char.displayColor}, 6px 12px 22px rgba(0,0,0,0.6)`,
        background: char.incognito ? "#1a1a25" : "#13131e",
      }}
      whileHover={{
        scale: 1.14,
        rotate: [-1.5, 1.5][Math.floor(Math.random() * 2)],
        y: -16,
        zIndex: 50,
        boxShadow: `6px 6px 0 ${char.displayColor}, 10px 18px 28px rgba(0,0,0,0.75)`,
        transition: { duration: 0.18 },
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
              className="absolute inset-0 w-full h-full object-cover object-[center_15%] opacity-15 grayscale blur-[3px]"
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
        <img
          src={char.image}
          alt={char.displayName}
          className="w-full h-full object-cover object-[center_15%]"
          onError={() => setHasError(true)}
        />
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
          style={{ background: char.displayColor, color: "#fff" }}
        >
          {char.displayName}
        </div>
      )}
    </motion.div>
  );
}
