"use client";

import React from "react";
import { motion } from "framer-motion";
import type { DialogueLine } from "../DialogueBubble";

interface CaptionBubbleProps {
  line: DialogueLine;
  index: number;
  instant?: boolean;
  appearanceAnimation?: "spring" | "fade" | "slide" | "zoom";
  fadeOutAnimation?: "fade" | "slide" | "zoom";
  depth?: number;
}

const SPEAKER_COLORS: Record<string, string> = {
  uandi: "#ef4444",
  sofi: "#06b6d4",
  ian: "#10b981",
  jaz: "#eab308",
  julian: "#3b82f6",
  mati: "#a855f7",
  volvo: "#f97316",
};

function getSpeakerColor(speaker: string | null | undefined, defaultColor: string) {
  if (!speaker) return defaultColor;
  const key = speaker.toLowerCase().trim();
  return SPEAKER_COLORS[key] || defaultColor;
}

function parseParagraphs(text: string) {
  if (!text) return [];
  return text.split("\n").map((line) => {
    const match = line.match(/^([^:]+):\s*(.*)$/);
    if (match) {
      return {
        speaker: match[1].trim(),
        text: match[2].trim(),
      };
    }
    return {
      speaker: null,
      text: line.trim(),
    };
  });
}

export function CaptionBubble({
  line,
  index,
  instant,
  appearanceAnimation,
  fadeOutAnimation,
  depth,
}: CaptionBubbleProps) {
  const paragraphs = parseParagraphs(line.text);
  const size = line.size ?? "medium";

  // Calculate dynamic shadow based on depth setting
  const depthVal = depth ?? 2;
  const shadowOffsetY = 2 + depthVal * 1.5;
  const shadowBlur = 4 + depthVal * 2.5;
  const shadowAlpha = 0.12 + depthVal * 0.04;
  const customDropShadow = `drop-shadow(0px ${shadowOffsetY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowAlpha}))`;

  // Motion variants
  const animVariants = {
    initial: appearanceAnimation === "fade"
      ? { opacity: 0 }
      : appearanceAnimation === "slide"
      ? { opacity: 0, y: 20 }
      : appearanceAnimation === "zoom"
      ? { opacity: 0, scale: 0.4 }
      : { opacity: 0, scale: 0.75, y: 8 },
    animate: { opacity: 1, scale: 1, x: 0, y: 0 },
    exit: fadeOutAnimation === "slide"
      ? { opacity: 0, y: -20 }
      : fadeOutAnimation === "zoom"
      ? { opacity: 0, scale: 0.5 }
      : { opacity: 0 },
  };

  const delay = instant ? 0 : index * 0.8;
  const animTransition: any = (appearanceAnimation ?? "spring") === "spring" && !instant
    ? { delay, type: "spring", stiffness: 280, damping: 20 }
    : { delay, duration: instant ? 0.15 : 0.35, ease: "easeOut" };

  let customFontFamily = "";
  if (line.fontFamily) {
    if (line.fontFamily === "bangers") customFontFamily = "var(--font-bangers)";
    else if (line.fontFamily === "marker") customFontFamily = "var(--font-marker)";
    else if (line.fontFamily === "mono") customFontFamily = "ui-monospace, monospace";
    else if (line.fontFamily === "sans") customFontFamily = "var(--font-inter), sans-serif";
    else if (line.fontFamily === "serif") customFontFamily = "ui-serif, Georgia, serif";
    else if (line.fontFamily === "bungee") customFontFamily = "var(--font-bungee)";
    else if (line.fontFamily === "luckiest") customFontFamily = "var(--font-luckiest)";
  } else {
    customFontFamily = "var(--font-marker)";
  }

  const captionBg = line.customBg || "#ffffff";
  const captionBorderColor = line.customColor || "#0a0a0f";
  const captionSpeakerColor = getSpeakerColor(line.speaker, "#e8185a");

  let fontClass = "font-[var(--font-marker)]";
  if (line.fontFamily === "bangers") fontClass = "font-[var(--font-bangers)]";
  else if (line.fontFamily === "mono") fontClass = "font-mono";
  else if (line.fontFamily === "sans") fontClass = "font-sans";
  else if (line.fontFamily === "serif") fontClass = "font-serif";
  else if (line.fontFamily === "bungee") fontClass = "font-[var(--font-bungee)]";
  else if (line.fontFamily === "luckiest") fontClass = "font-[var(--font-luckiest)]";

  let captionSizeClass = "text-sm sm:text-base px-3.5 py-2";
  if (size === "small") {
    captionSizeClass = "text-xs px-2.5 py-1.5";
  } else if (size === "large") {
    captionSizeClass = "text-base sm:text-lg px-5 py-3.5";
  }

  const captionStyles: React.CSSProperties = {
    pointerEvents: "none",
    border: `1.5px solid ${captionBorderColor}`,
    background: captionBg,
    boxShadow: "none",
    borderRadius: line.borderRadius !== undefined ? `${line.borderRadius}px` : undefined,
  };
  if (line.fontSize) captionStyles.fontSize = `${line.fontSize}px`;
  if (line.width) captionStyles.maxWidth = `${line.width}px`;
  if (line.textColor) captionStyles.color = line.textColor;

  const wrapperStyles: React.CSSProperties = {
    pointerEvents: "none",
  };
  if (line.width) wrapperStyles.maxWidth = `${line.width}px`;

  return (
    <motion.div
      key={`caption-${index}`}
      variants={animVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={animTransition}
      className={`caption leading-snug text-left max-w-sm ${captionSizeClass}`}
      style={{
        ...captionStyles,
        ...wrapperStyles,
        filter: customDropShadow,
      }}
    >
      {line.speaker && (
        <div
          className="font-[var(--font-bangers)] text-xs tracking-wider mb-1 uppercase"
          style={{ color: captionSpeakerColor }}
        >
          {line.speaker}
        </div>
      )}
      <div className="flex flex-col gap-2">
        {paragraphs.map((p, i) => (
          <div
            key={i}
            className={`text-stone-800 ${fontClass}`}
            style={{
              fontFamily: customFontFamily,
              ...(line.textColor ? { color: line.textColor } : {}),
            }}
          >
            {p.speaker && <strong style={{ color: captionBorderColor }}>{p.speaker}: </strong>}
            {p.text}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
