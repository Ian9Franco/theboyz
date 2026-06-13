"use client";

import React from "react";
import { motion } from "framer-motion";
import type { DialogueLine } from "../DialogueBubble";

interface ThoughtBubbleProps {
  line: DialogueLine;
  index: number;
  elasticTailNode?: React.ReactNode;
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

export function ThoughtBubble({
  line,
  index,
  elasticTailNode,
  instant,
  appearanceAnimation,
  fadeOutAnimation,
  depth,
}: ThoughtBubbleProps) {
  const tailDir = line.tail ?? "bottom-left";
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

  const thoughtBg = line.customBg || "#ffffff";
  const thoughtBorderColor = line.customColor || "#0a0a0f";
  const thoughtSpeakerColor = getSpeakerColor(line.speaker, "#e8185a");

  let fontClass = "font-[var(--font-marker)]";
  if (line.fontFamily === "bangers") fontClass = "font-[var(--font-bangers)]";
  else if (line.fontFamily === "mono") fontClass = "font-mono";
  else if (line.fontFamily === "sans") fontClass = "font-sans";
  else if (line.fontFamily === "serif") fontClass = "font-serif";
  else if (line.fontFamily === "bungee") fontClass = "font-[var(--font-bungee)]";
  else if (line.fontFamily === "luckiest") fontClass = "font-[var(--font-luckiest)]";

  const bubbleClass = `${fontClass} text-[#0a0a0f]`;
  const hasElasticTail = line.tail !== "none" && line.tailX !== undefined && line.tailY !== undefined;

  const renderThoughtDots = () => {
    if (tailDir === "none" || hasElasticTail) return null;
    let positionClass = "-bottom-3 left-6";
    let scaleClass = "flex gap-1";
    if (tailDir === "bottom-right") positionClass = "-bottom-3 right-6";
    if (tailDir === "top-left") positionClass = "-top-3 left-6 flex-row-reverse";
    if (tailDir === "top-right") positionClass = "-top-3 right-6 flex-row-reverse";
    if (tailDir === "left") positionClass = "-left-3 top-1/2 -translate-y-1/2 flex-col";
    if (tailDir === "right") positionClass = "-right-3 top-1/2 -translate-y-1/2 flex-col";

    return (
      <div className={`absolute ${positionClass} ${scaleClass} z-10`}>
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ border: `1.5px solid ${thoughtBorderColor}`, background: thoughtBg }}
        />
        <div
          className="w-1.5 h-1.5 rounded-full self-center"
          style={{ border: `1.5px solid ${thoughtBorderColor}`, background: thoughtBg }}
        />
      </div>
    );
  };

  let thoughtSizeClass = "px-2.5 py-1.5 rounded-[35%] text-sm sm:text-base leading-snug";
  if (size === "small") {
    thoughtSizeClass = "px-1.5 py-0.5 rounded-[30%] text-xs leading-tight";
  } else if (size === "large") {
    thoughtSizeClass = "px-4.5 py-2.5 rounded-[40%] text-base sm:text-lg leading-normal";
  }

  const thoughtStyles: React.CSSProperties = {
    background: "transparent",
    border: "none",
    boxShadow: "none",
  };
  if (line.fontSize) thoughtStyles.fontSize = `${line.fontSize}px`;
  if (line.width) thoughtStyles.maxWidth = `${line.width}px`;
  if (line.textColor) thoughtStyles.color = line.textColor;
  if (customFontFamily) thoughtStyles.fontFamily = customFontFamily;

  const wrapperStyles: React.CSSProperties = {
    pointerEvents: "none",
  };
  if (line.width) wrapperStyles.maxWidth = `${line.width}px`;

  return (
    <motion.div
      key={`thought-${index}`}
      variants={animVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={animTransition}
      className="relative max-w-sm"
      style={{
        ...wrapperStyles,
        pointerEvents: "none",
        filter: customDropShadow,
      }}
    >
      {renderThoughtDots()}
      {/* Cloud background with continuous border outline using drop-shadow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          filter: `drop-shadow(1.5px 0 0 ${thoughtBorderColor}) drop-shadow(-1.5px 0 0 ${thoughtBorderColor}) drop-shadow(0 1.5px 0 ${thoughtBorderColor}) drop-shadow(0 -1.5px 0 ${thoughtBorderColor})`,
        }}
      >
        {/* Main Bubble Background Shape (No Border) */}
        <div
          className="w-full h-full"
          style={{
            backgroundColor: thoughtBg,
            borderRadius: line.borderRadius !== undefined ? `${line.borderRadius}px` : "2rem",
          }}
        />

        {/* Cloud Bumps */}
        <div className="absolute rounded-full -top-3 left-[15%] -translate-x-1/2 w-7 h-7" style={{ backgroundColor: thoughtBg }} />
        <div className="absolute rounded-full -top-4 left-[40%] -translate-x-1/2 w-9 h-9" style={{ backgroundColor: thoughtBg }} />
        <div className="absolute rounded-full -top-4 left-[60%] -translate-x-1/2 w-9 h-9" style={{ backgroundColor: thoughtBg }} />
        <div className="absolute rounded-full -top-3 left-[85%] -translate-x-1/2 w-7 h-7" style={{ backgroundColor: thoughtBg }} />

        <div className="absolute rounded-full -bottom-2.5 left-[20%] -translate-x-1/2 w-6 h-6" style={{ backgroundColor: thoughtBg }} />
        <div className="absolute rounded-full -bottom-3.5 left-[50%] -translate-x-1/2 w-8 h-8" style={{ backgroundColor: thoughtBg }} />
        <div className="absolute rounded-full -bottom-2.5 left-[80%] -translate-x-1/2 w-6 h-6" style={{ backgroundColor: thoughtBg }} />

        <div className="absolute rounded-full -left-2.5 top-[25%] -translate-y-1/2 w-7 h-7" style={{ backgroundColor: thoughtBg }} />
        <div className="absolute rounded-full -left-2 top-[75%] -translate-y-1/2 w-6 h-6" style={{ backgroundColor: thoughtBg }} />
        <div className="absolute rounded-full -right-2.5 top-[25%] -translate-y-1/2 w-7 h-7" style={{ backgroundColor: thoughtBg }} />
        <div className="absolute rounded-full -right-2 top-[75%] -translate-y-1/2 w-6 h-6" style={{ backgroundColor: thoughtBg }} />

        {hasElasticTail && elasticTailNode}
      </div>

      {/* Text Container on top */}
      <div
        className={`${bubbleClass} ${thoughtSizeClass} relative z-10`}
        style={thoughtStyles}
      >
        {line.speaker && (
          <span
            className="font-[var(--font-bangers)] text-xs tracking-wider block mb-1 uppercase"
            style={{ color: thoughtSpeakerColor }}
          >
            {line.speaker}
          </span>
        )}
        <div className="flex flex-col gap-2">
          {paragraphs.map((p, i) => (
            <div key={i}>
              {p.speaker && <strong style={{ color: thoughtBorderColor }}>{p.speaker}: </strong>}
              <span>{p.text}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
