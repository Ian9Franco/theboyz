"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RedactedProps {
  chapterId: string;
  chapterName: string;
  unlockAll: boolean;
  readChapters: string[];
  children: React.ReactNode;
}

export function Redacted({ chapterId, chapterName, unlockAll, readChapters, children }: RedactedProps) {
  const [hovered, setHovered] = useState(false);
  const isRevealed = unlockAll || readChapters.includes(chapterId);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={`transition-all duration-500 px-1 rounded-sm ${
          isRevealed
            ? "bg-transparent text-white/90"
            : "bg-[#0c0c14] text-transparent select-none cursor-help border-b border-[#e8185a]/40"
        }`}
        style={{ textShadow: isRevealed ? "none" : "0 0 8px rgba(0,0,0,0.9)" }}
      >
        {isRevealed ? children : "█".repeat(String(children).length || 8)}
      </span>
      <AnimatePresence>
        {hovered && !isRevealed && (
          <motion.span
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            className="absolute bottom-full left-1/2 mb-1.5 bg-[#e8185a] border-2 border-white px-2 py-0.5 rounded text-[8px] font-[var(--font-bangers)] text-white tracking-widest whitespace-nowrap shadow-[3px_3px_0_#000] z-30"
          >
            SPOILER: LEÉ &quot;{chapterName.toUpperCase()}&quot; PARA DEVELAR
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
