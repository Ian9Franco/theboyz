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

interface StandardBubbleProps {
  line: DialogueLine;
  index: number;
  elasticTailNode?: React.ReactNode;
  instant?: boolean;
  appearanceAnimation?: "spring" | "fade" | "slide" | "zoom" | "pop";
  fadeOutAnimation?: "fade" | "slide" | "zoom";
  depth?: number;
  textScale?: number;
  speedMultiplier?: number;
}

// ─── Triangle Tail Helpers ─────────────────────────────────────────────────────

function getTailStyles(
  direction: string,
  bgColor: string,
  borderColor: string,
  styleName: string
) {
  if (direction === "none" || styleName === "caption") return null;

  const baseOuter = {
    position: "absolute" as const,
    width: 0,
    height: 0,
    zIndex: 10,
  };
  const baseInner = {
    position: "absolute" as const,
    width: 0,
    height: 0,
    zIndex: 11,
  };

  switch (direction) {
    case "bottom-right":
      return {
        outer: { ...baseOuter, bottom: "-12px", right: "24px", borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: `14px solid ${borderColor}` },
        inner: { ...baseInner, bottom: "-8px",  right: "26px", borderLeft: "8px solid transparent",  borderRight: "8px solid transparent",  borderTop: `12px solid ${bgColor}` },
      };
    case "top-left":
      return {
        outer: { ...baseOuter, top: "-12px", left: "24px", borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderBottom: `14px solid ${borderColor}` },
        inner: { ...baseInner, top: "-8px",  left: "26px", borderLeft: "8px solid transparent",  borderRight: "8px solid transparent",  borderBottom: `12px solid ${bgColor}` },
      };
    case "top-right":
      return {
        outer: { ...baseOuter, top: "-12px", right: "24px", borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderBottom: `14px solid ${borderColor}` },
        inner: { ...baseInner, top: "-8px",  right: "26px", borderLeft: "8px solid transparent",  borderRight: "8px solid transparent",  borderBottom: `12px solid ${bgColor}` },
      };
    case "left":
      return {
        outer: { ...baseOuter, left: "-12px", top: "50%", transform: "translateY(-50%)", borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderRight: `14px solid ${borderColor}` },
        inner: { ...baseInner, left: "-8px",  top: "50%", transform: "translateY(-50%)", borderTop: "8px solid transparent",  borderBottom: "8px solid transparent",  borderRight: `12px solid ${bgColor}` },
      };
    case "right":
      return {
        outer: { ...baseOuter, right: "-12px", top: "50%", transform: "translateY(-50%)", borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: `14px solid ${borderColor}` },
        inner: { ...baseInner, right: "-8px",  top: "50%", transform: "translateY(-50%)", borderTop: "8px solid transparent",  borderBottom: "8px solid transparent",  borderLeft: `12px solid ${bgColor}` },
      };
    case "bottom-left":
    default:
      return {
        outer: { ...baseOuter, bottom: "-12px", left: "24px", borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: `14px solid ${borderColor}` },
        inner: { ...baseInner, bottom: "-8px",  left: "26px", borderLeft: "8px solid transparent",  borderRight: "8px solid transparent",  borderTop: `12px solid ${bgColor}` },
      };
  }
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function StandardBubble({
  line,
  index,
  elasticTailNode,
  instant,
  appearanceAnimation,
  fadeOutAnimation,
  depth,
  textScale = 1.0,
  speedMultiplier = 1.0,
}: StandardBubbleProps) {
  const style   = line.style ?? "normal";
  const tailDir = line.tail  ?? "bottom-left";
  const paragraphs = parseParagraphs(line.text);
  const size    = line.size  ?? "medium";

  // ── Dynamic shadow based on depth ──
  const depthVal       = depth ?? 2;
  const shadowOffsetY  = 2 + depthVal * 1.5;
  const shadowBlur     = 4 + depthVal * 2.5;
  const shadowAlpha    = 0.12 + depthVal * 0.04;
  const customDropShadow = `drop-shadow(0px ${shadowOffsetY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowAlpha}))`;

  // ── Animation ──
  const delay      = computeBubbleDelay(index, line, instant ?? false, speedMultiplier);
  const animVars   = buildAnimVariants(appearanceAnimation);
  const exitVar    = buildExitVariant(fadeOutAnimation);
  const transition = buildAnimTransition(appearanceAnimation, delay, instant ?? false);

  // ── Font ──
  const customFontFamily = resolveFontFamily(line, style);
  const fontClass        = resolveFontClass(line);

  // ── Visual styling ──
  let bgColor      = line.customBg    || "#ffffff";
  let borderColor  = line.customColor || "#0a0a0f";
  let borderStyle  = `1.5px solid ${borderColor}`;
  let shadowStyle  = "none";
  let speakerColor = getSpeakerColor(line.speaker, "#e8185a");

  let bubbleClass  = `${fontClass} text-[#0a0a0f]`;

  // ── Size classes ──
  let sizeClass = "px-3.5 py-2 rounded-2xl text-sm sm:text-base leading-snug";
  if (size === "small")  sizeClass = "px-2 py-1 rounded-xl text-xs leading-tight";
  if (size === "large")  sizeClass = "px-6 py-3.5 rounded-3xl text-base sm:text-lg leading-normal";

  // ── Style-specific overrides ──
  if (style === "scream") {
    bgColor      = line.customBg    || "#f5e642";
    borderColor  = line.customColor || "#0a0a0f";
    borderStyle  = `2.5px solid ${borderColor}`;
    shadowStyle  = `4px 4px 0 ${line.customColor || "#e8185a"}`;
    bubbleClass  = `${line.fontFamily ? fontClass : "font-[var(--font-bangers)]"} text-[#0a0a0f] uppercase tracking-wide leading-tight`;
    sizeClass    = size === "small" ? "px-4 py-2.5 rounded text-xs sm:text-sm" :
                   size === "large" ? "px-8 py-5 rounded-lg text-lg sm:text-xl" :
                                      "px-6 py-4 rounded-md text-base sm:text-lg";

  } else if (style === "whisper") {
    bgColor      = line.customBg    || "#ffffff";
    borderColor  = line.customColor || "#a1a1aa";
    borderStyle  = `1.5px dashed ${borderColor}`;
    bubbleClass  = `${line.fontFamily ? fontClass : "font-[var(--font-marker)]"} italic text-zinc-500`;
    speakerColor = getSpeakerColor(line.speaker, "#a1a1aa");
    sizeClass    = size === "small" ? "px-3 py-1.5 rounded-xl text-[10px] sm:text-xs leading-tight" :
                   size === "large" ? "px-7 py-3.5 rounded-3xl text-sm sm:text-base leading-normal" :
                                      "px-4 py-2 rounded-2xl text-xs sm:text-sm leading-snug";

  } else if (style === "electronic") {
    // ── Premium glassmorphism for electronic bubbles ──
    bgColor      = line.customBg    || "rgba(0, 240, 255, 0.07)";
    borderColor  = line.customColor || "#00f0ff";
    borderStyle  = `1px solid rgba(0, 240, 255, 0.45)`;
    shadowStyle  = `0 0 18px rgba(0, 240, 255, 0.18), inset 0 0 18px rgba(0, 240, 255, 0.04)`;
    bubbleClass  = `${line.fontFamily ? fontClass : "font-mono"} text-[#00f0ff]`;
    speakerColor = getSpeakerColor(line.speaker, borderColor);
    sizeClass    = size === "small" ? "px-2.5 py-1.5 rounded-none text-[10px] sm:text-xs leading-tight" :
                   size === "large" ? "px-6 py-3.5 rounded-none text-sm sm:text-base leading-normal" :
                                      "px-4 py-2.5 rounded-none text-xs sm:text-sm leading-snug";

  } else if (style === "sfx") {
    bgColor      = line.customBg || "transparent";
    borderColor  = line.customColor || "#000000";
    borderStyle  = "none";
    shadowStyle  = "none";
    bubbleClass  = `${line.fontFamily ? fontClass : "font-[var(--font-luckiest)]"} text-center uppercase tracking-wider leading-none`;
    speakerColor = getSpeakerColor(line.speaker, "#e8185a");
    const isTransparent = bgColor === "transparent";
    sizeClass    = size === "small" ? (isTransparent ? "p-1 text-base sm:text-lg"    : "px-7 py-5 rounded-none text-sm sm:text-base") :
                   size === "large" ? (isTransparent ? "p-3 text-4xl sm:text-6xl"    : "px-16 py-12 rounded-none text-3xl sm:text-5xl") :
                                      (isTransparent ? "p-2 text-2xl sm:text-4xl"    : "px-11 py-8 rounded-none text-xl sm:text-3xl");
  }

  const hasElasticTail = line.tail !== "none" && line.tailX !== undefined && line.tailY !== undefined;
  const tail = hasElasticTail ? null : (style === "sfx" ? null : getTailStyles(tailDir, bgColor, borderColor, style));

  const wrapperStyles: React.CSSProperties = { pointerEvents: "none" };
  if (line.width) wrapperStyles.maxWidth = `${line.width}px`;

  const bubbleStyles: React.CSSProperties = {
    backgroundColor: bgColor,
    border: borderStyle,
    boxShadow: shadowStyle,
    borderRadius: line.borderRadius !== undefined ? `${line.borderRadius}px` : undefined,
  };

  // ── Font size scaling ──
  let baseFontSize = line.fontSize;
  if (!baseFontSize) {
    baseFontSize = style === "sfx"
      ? (size === "small" ? 18 : size === "large" ? 48 : 32)
      : (size === "small" ? 12 : size === "large" ? 18 : 14);
  }
  bubbleStyles.fontSize = `${baseFontSize * textScale}px`;
  if (line.width)     bubbleStyles.maxWidth  = `${line.width}px`;
  if (line.textColor) bubbleStyles.color     = line.textColor;
  if (customFontFamily) bubbleStyles.fontFamily = customFontFamily;

  // ── SFX special styling ──
  if (style === "sfx") {
    const sfxOutlineColor = line.customColor || "#000000";
    const sfxTextColor    = line.textColor   || "#f5e642";
    Object.assign(bubbleStyles, {
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      color: sfxTextColor,
      textShadow: `
        -2.5px -2.5px 0 ${sfxOutlineColor},
         2.5px -2.5px 0 ${sfxOutlineColor},
        -2.5px  2.5px 0 ${sfxOutlineColor},
         2.5px  2.5px 0 ${sfxOutlineColor},
        -2.5px  0px 0 ${sfxOutlineColor},
         2.5px  0px 0 ${sfxOutlineColor},
         0px -2.5px 0 ${sfxOutlineColor},
         0px  2.5px 0 ${sfxOutlineColor},
         4px  4px 0 ${sfxOutlineColor},
         5px  5px 0 rgba(0,0,0,0.15)
      `,
      transform: "rotate(-6deg) skewX(-8deg)",
      display: "inline-block",
    });
  }

  // ── Electronic: apply backdrop blur via wrapper if supported ──
  const electronicWrapExtra: React.CSSProperties =
    style === "electronic"
      ? { backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }
      : {};

  return (
    <motion.div
      key={`bubble-${index}`}
      variants={{ ...animVars, exit: exitVar }}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className="relative max-w-sm"
      style={{
        ...wrapperStyles,
        filter: customDropShadow,
        overflow: "visible",
      }}
    >
      {/* Starburst backdrop for SFX when background is not transparent */}
      {style === "sfx" && bgColor !== "transparent" && (
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ filter: `drop-shadow(3px 3px 0 ${borderColor})` }}>
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M 50,5 L 57,25 L 75,10 L 73,32 L 95,25 L 82,45 L 98,60 L 78,65 L 85,88 L 65,80 L 58,98 L 47,80 L 32,95 L 33,75 L 10,85 L 22,62 L 2,50 L 22,38 L 8,15 L 30,28 L 28,8 L 45,23 Z"
              fill={bgColor}
              stroke={borderColor}
              strokeWidth="2.5"
              strokeLinejoin="miter"
            />
          </svg>
        </div>
      )}

      {/* SVG Elastic Tail */}
      {hasElasticTail && elasticTailNode}

      {/* Traditional Triangle Tail */}
      {tail && (
        <>
          <div style={tail.outer} />
          <div style={tail.inner} />
        </>
      )}

      {/* Inner Bubble Body & Text */}
      <div
        className={`${bubbleClass} ${sizeClass} relative z-10`}
        style={{ ...bubbleStyles, ...electronicWrapExtra }}
      >
        {line.speaker && style !== "sfx" && (
          <span
            className="font-[var(--font-bangers)] text-xs tracking-wider block mb-1 uppercase"
            style={{ color: speakerColor }}
          >
            {line.speaker}:
          </span>
        )}
        <div className="flex flex-col gap-1.5">
          {paragraphs.map((p, i) => (
            <div key={i}>
              {p.speaker && style !== "sfx" && (
                <strong className="font-[var(--font-bangers)] mr-1 tracking-wide" style={{ color: speakerColor }}>
                  {p.speaker}:{" "}
                </strong>
              )}
              <span>{p.text}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
