"use client";

import React from "react";
import { motion } from "framer-motion";
import type { DialogueLine } from "../DialogueBubble";
import {
  getSpeakerColor,
  parseParagraphs,
  resolveFontFamily,
  resolveFontClass,
  buildAnimVariants,
  buildExitVariant,
  buildAnimTransition,
  computeBubbleDelay,
} from "./bubbleHelpers";

interface CaptionBubbleProps {
  line: DialogueLine;
  index: number;
  instant?: boolean;
  appearanceAnimation?: "spring" | "fade" | "slide" | "zoom" | "pop";
  fadeOutAnimation?: "fade" | "slide" | "zoom";
  depth?: number;
  textScale?: number;
  speedMultiplier?: number;
}

export function CaptionBubble({
  line,
  index,
  instant,
  appearanceAnimation,
  fadeOutAnimation,
  depth,
  textScale = 1.0,
  speedMultiplier = 1.0,
}: CaptionBubbleProps) {
  const paragraphs = parseParagraphs(line.text);
  const size = line.size ?? "medium";

  // ── Dynamic shadow based on depth ──
  const depthVal      = depth ?? 2;
  const shadowOffsetY = 2 + depthVal * 1.5;
  const shadowBlur    = 4 + depthVal * 2.5;
  const shadowAlpha   = 0.12 + depthVal * 0.04;
  const customDropShadow = `drop-shadow(0px ${shadowOffsetY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowAlpha}))`;

  // ── Animation ──
  const delay      = computeBubbleDelay(index, line, instant ?? false, speedMultiplier);
  const animVars   = buildAnimVariants(appearanceAnimation);
  const exitVar    = buildExitVariant(fadeOutAnimation);
  const transition = buildAnimTransition(appearanceAnimation, delay, instant ?? false);

  // ── Font ──
  const customFontFamily    = resolveFontFamily(line, "caption");
  const fontClass           = resolveFontClass(line);

  // ── Colours ──
  const captionBg           = line.customBg    || "#ffffff";
  const captionBorderColor  = line.customColor || "#0a0a0f";
  const captionSpeakerColor = getSpeakerColor(line.speaker, "#e8185a");

  // ── Size classes ──
  let captionSizeClass = "text-sm sm:text-base px-3.5 py-2";
  if (size === "small") captionSizeClass = "text-xs px-2.5 py-1.5";
  if (size === "large") captionSizeClass = "text-base sm:text-lg px-5 py-3.5";

  const captionStyles: React.CSSProperties = {
    pointerEvents: "none",
    border: `1.5px solid ${captionBorderColor}`,
    background: captionBg,
    boxShadow: "none",
    borderRadius: line.borderRadius !== undefined ? `${line.borderRadius}px` : undefined,
  };

  let baseFontSize = line.fontSize;
  if (!baseFontSize) {
    baseFontSize = size === "small" ? 12 : size === "large" ? 18 : 14;
  }
  captionStyles.fontSize = `${baseFontSize * textScale}px`;
  if (line.width)     captionStyles.maxWidth = `${line.width}px`;
  if (line.textColor) captionStyles.color    = line.textColor;

  const wrapperStyles: React.CSSProperties = { pointerEvents: "none" };
  if (line.width) wrapperStyles.maxWidth = `${line.width}px`;

  return (
    <motion.div
      key={`caption-${index}`}
      variants={{ ...animVars, exit: exitVar }}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
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
