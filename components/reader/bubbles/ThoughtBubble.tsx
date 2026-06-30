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
  resolveBgColor,
} from "./bubbleHelpers";

interface ThoughtBubbleProps {
  line: DialogueLine;
  index: number;
  elasticTailNode?: React.ReactNode;
  instant?: boolean;
  appearanceAnimation?: "spring" | "fade" | "slide" | "zoom" | "pop";
  fadeOutAnimation?: "fade" | "slide" | "zoom";
  depth?: number;
  textScale?: number;
  speedMultiplier?: number;
  bubbleOpacity?: number;
}

export function ThoughtBubble({
  line,
  index,
  elasticTailNode,
  instant,
  appearanceAnimation,
  fadeOutAnimation,
  depth,
  textScale = 1.0,
  speedMultiplier = 1.0,
  bubbleOpacity,
}: ThoughtBubbleProps) {
  const tailDir    = line.tail ?? "bottom-left";
  const paragraphs = parseParagraphs(line.text);
  const size       = line.size ?? "medium";

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
  const customFontFamily   = resolveFontFamily(line, "thought");
  const fontClass          = resolveFontClass(line);

  // ── Colours ──
  const thoughtBg          = resolveBgColor(line.customBg, "#ffffff", bubbleOpacity);
  const thoughtBorderColor = line.customColor || "#0a0a0f";
  const thoughtSpeakerColor = getSpeakerColor(line.speaker, "#e8185a");

  // Determine solid background color and opacity to prevent overlap seams when translucent
  let solidBg = thoughtBg;
  let bgOpacity = 1;
  if (thoughtBg.startsWith("rgba")) {
    const rgbaMatch = thoughtBg.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
    if (rgbaMatch) {
      solidBg = `rgb(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]})`;
      bgOpacity = parseFloat(rgbaMatch[4]);
    }
  }

  const bubbleClass    = `${fontClass} text-[#0a0a0f]`;
  const hasElasticTail = line.tail !== "none" && line.tailX !== undefined && line.tailY !== undefined;

  // ── Thought dots (cloud tail) ──
  const renderThoughtDots = () => {
    if (tailDir === "none" || hasElasticTail) return null;

    let positionClass = "-bottom-3 left-6";
    let scaleClass    = "flex gap-1";
    if (tailDir === "bottom-right") positionClass = "-bottom-3 right-6";
    if (tailDir === "top-left")     positionClass = "-top-3 left-6 flex-row-reverse";
    if (tailDir === "top-right")    positionClass = "-top-3 right-6 flex-row-reverse";
    if (tailDir === "left")         positionClass = "-left-3 top-1/2 -translate-y-1/2 flex-col";
    if (tailDir === "right")        positionClass = "-right-3 top-1/2 -translate-y-1/2 flex-col";

    return (
      <div className={`absolute ${positionClass} ${scaleClass} z-10`} style={{ opacity: bgOpacity }}>
        <div className="w-2.5 h-2.5 rounded-full" style={{ border: `1.5px solid ${thoughtBorderColor}`, background: solidBg }} />
        <div className="w-1.5 h-1.5 rounded-full self-center" style={{ border: `1.5px solid ${thoughtBorderColor}`, background: solidBg }} />
      </div>
    );
  };

  // ── Size classes ──
  let thoughtSizeClass = "px-2.5 py-1.5 rounded-[35%] text-sm sm:text-base leading-snug";
  if (size === "small") thoughtSizeClass = "px-1.5 py-0.5 rounded-[30%] text-xs leading-tight";
  if (size === "large") thoughtSizeClass = "px-4.5 py-2.5 rounded-[40%] text-base sm:text-lg leading-normal";

  const thoughtStyles: React.CSSProperties = {
    background: "transparent",
    border: "none",
    boxShadow: "none",
  };
  let baseFontSize = line.fontSize;
  if (!baseFontSize) {
    baseFontSize = size === "small" ? 12 : size === "large" ? 18 : 14;
  }
  thoughtStyles.fontSize = `${baseFontSize * textScale}px`;
  if (line.width)         thoughtStyles.maxWidth  = `${line.width}px`;
  if (line.textColor)     thoughtStyles.color     = line.textColor;
  if (customFontFamily)   thoughtStyles.fontFamily = customFontFamily;

  const wrapperStyles: React.CSSProperties = { pointerEvents: "none" };
  if (line.width) wrapperStyles.maxWidth = `${line.width}px`;

  return (
    <motion.div
      key={`thought-${index}`}
      variants={{ ...animVars, exit: exitVar }}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className="relative max-w-sm"
      style={{
        ...wrapperStyles,
        pointerEvents: "none",
        filter: customDropShadow,
      }}
    >
      {renderThoughtDots()}

      {/* Backdrop blur layer for glassmorphism */}
      {bgOpacity < 1 && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: line.borderRadius !== undefined ? `${line.borderRadius}px` : "2rem",
          }}
        />
      )}

      {/* Cloud background with continuous border outline using drop-shadow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          filter: `drop-shadow(1.5px 0 0 ${thoughtBorderColor}) drop-shadow(-1.5px 0 0 ${thoughtBorderColor}) drop-shadow(0 1.5px 0 ${thoughtBorderColor}) drop-shadow(0 -1.5px 0 ${thoughtBorderColor})`,
        }}
      >
        {/* Transparent container to hold solid overlapping shapes so they don't intersect opacity */}
        <div className="w-full h-full relative" style={{ opacity: bgOpacity }}>
          {/* Main Bubble Background Shape */}
          <div
            className="w-full h-full"
            style={{
              backgroundColor: solidBg,
              borderRadius: line.borderRadius !== undefined ? `${line.borderRadius}px` : "2rem",
            }}
          />
          {/* Cloud Bumps — top */}
          <div className="absolute rounded-full -top-3 left-[15%] -translate-x-1/2 w-7 h-7" style={{ backgroundColor: solidBg }} />
          <div className="absolute rounded-full -top-4 left-[40%] -translate-x-1/2 w-9 h-9" style={{ backgroundColor: solidBg }} />
          <div className="absolute rounded-full -top-4 left-[60%] -translate-x-1/2 w-9 h-9" style={{ backgroundColor: solidBg }} />
          <div className="absolute rounded-full -top-3 left-[85%] -translate-x-1/2 w-7 h-7" style={{ backgroundColor: solidBg }} />
          {/* Cloud Bumps — bottom */}
          <div className="absolute rounded-full -bottom-2.5 left-[20%] -translate-x-1/2 w-6 h-6" style={{ backgroundColor: solidBg }} />
          <div className="absolute rounded-full -bottom-3.5 left-[50%] -translate-x-1/2 w-8 h-8" style={{ backgroundColor: solidBg }} />
          <div className="absolute rounded-full -bottom-2.5 left-[80%] -translate-x-1/2 w-6 h-6" style={{ backgroundColor: solidBg }} />
          {/* Cloud Bumps — sides */}
          <div className="absolute rounded-full -left-2.5 top-[25%] -translate-y-1/2 w-7 h-7" style={{ backgroundColor: solidBg }} />
          <div className="absolute rounded-full -left-2 top-[75%] -translate-y-1/2 w-6 h-6"   style={{ backgroundColor: solidBg }} />
          <div className="absolute rounded-full -right-2.5 top-[25%] -translate-y-1/2 w-7 h-7" style={{ backgroundColor: solidBg }} />
          <div className="absolute rounded-full -right-2 top-[75%] -translate-y-1/2 w-6 h-6"   style={{ backgroundColor: solidBg }} />
        </div>

        {hasElasticTail && elasticTailNode}
      </div>

      {/* Text Container */}
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
