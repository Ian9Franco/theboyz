"use client";

import React from "react";
import { motion } from "framer-motion";
import type { DialogueLine } from "../DialogueBubble";

interface StandardBubbleProps {
  line: DialogueLine;
  index: number;
  elasticTailNode?: React.ReactNode;
  instant?: boolean;
  appearanceAnimation?: "spring" | "fade" | "slide" | "zoom";
  fadeOutAnimation?: "fade" | "slide" | "zoom";
  depth?: number;
  textScale?: number;
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
        inner: { ...baseInner, bottom: "-8px", right: "26px", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `12px solid ${bgColor}` }
      };
    case "top-left":
      return {
        outer: { ...baseOuter, top: "-12px", left: "24px", borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderBottom: `14px solid ${borderColor}` },
        inner: { ...baseInner, top: "-8px", left: "26px", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: `12px solid ${bgColor}` }
      };
    case "top-right":
      return {
        outer: { ...baseOuter, top: "-12px", right: "24px", borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderBottom: `14px solid ${borderColor}` },
        inner: { ...baseInner, top: "-8px", right: "26px", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: `12px solid ${bgColor}` }
      };
    case "left":
      return {
        outer: { ...baseOuter, left: "-12px", top: "50%", transform: "translateY(-50%)", borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderRight: `14px solid ${borderColor}` },
        inner: { ...baseInner, left: "-8px", top: "50%", transform: "translateY(-50%)", borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderRight: `12px solid ${bgColor}` }
      };
    case "right":
      return {
        outer: { ...baseOuter, right: "-12px", top: "50%", transform: "translateY(-50%)", borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: `14px solid ${borderColor}` },
        inner: { ...baseInner, right: "-8px", top: "50%", transform: "translateY(-50%)", borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderLeft: `12px solid ${bgColor}` }
      };
    case "bottom-left":
    default:
      return {
        outer: { ...baseOuter, bottom: "-12px", left: "24px", borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: `14px solid ${borderColor}` },
        inner: { ...baseInner, bottom: "-8px", left: "26px", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `12px solid ${bgColor}` }
      };
  }
}

export function StandardBubble({
  line,
  index,
  elasticTailNode,
  instant,
  appearanceAnimation,
  fadeOutAnimation,
  depth,
  textScale = 1.0,
}: StandardBubbleProps) {
  const style = line.style ?? "normal";
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
    if (style === "scream") customFontFamily = "var(--font-bangers)";
    else if (style === "electronic") customFontFamily = "ui-monospace, monospace";
    else if (style === "whisper") customFontFamily = "var(--font-marker)";
    else if (style === "sfx") customFontFamily = "var(--font-luckiest)";
    else customFontFamily = "var(--font-marker)";
  }

  // Define visual styling variables based on selected bubble type
  let bgColor = line.customBg || "#ffffff";
  let borderColor = line.customColor || "#0a0a0f";
  let borderStyle = `1.5px solid ${borderColor}`;
  let shadowStyle = "none";
  let speakerColor = getSpeakerColor(line.speaker, "#e8185a");

  // Determine font family class
  let fontClass = "font-[var(--font-marker)]";
  if (line.fontFamily === "bangers") fontClass = "font-[var(--font-bangers)]";
  else if (line.fontFamily === "mono") fontClass = "font-mono";
  else if (line.fontFamily === "sans") fontClass = "font-sans";
  else if (line.fontFamily === "serif") fontClass = "font-serif";
  else if (line.fontFamily === "bungee") fontClass = "font-[var(--font-bungee)]";
  else if (line.fontFamily === "luckiest") fontClass = "font-[var(--font-luckiest)]";

  let bubbleClass = `${fontClass} text-[#0a0a0f]`;

  // Size styling classes
  let sizeClass = "px-3.5 py-2 rounded-2xl text-sm sm:text-base leading-snug";
  if (size === "small") {
    sizeClass = "px-2 py-1 rounded-xl text-xs leading-tight";
  } else if (size === "large") {
    sizeClass = "px-6 py-3.5 rounded-3xl text-base sm:text-lg leading-normal";
  }

  if (style === "scream") {
    bgColor = line.customBg || "#f5e642";
    borderColor = line.customColor || "#0a0a0f";
    borderStyle = `2.5px solid ${borderColor}`;
    shadowStyle = `4px 4px 0 ${line.customColor || "#e8185a"}`;
    bubbleClass = `${line.fontFamily ? fontClass : "font-[var(--font-bangers)]"} text-[#0a0a0f] uppercase tracking-wide leading-tight`;

    if (size === "small") {
      sizeClass = "px-4 py-2.5 rounded text-xs sm:text-sm";
    } else if (size === "large") {
      sizeClass = "px-8 py-5 rounded-lg text-lg sm:text-xl";
    } else {
      sizeClass = "px-6 py-4 rounded-md text-base sm:text-lg";
    }
  } else if (style === "whisper") {
    bgColor = line.customBg || "#ffffff";
    borderColor = line.customColor || "#a1a1aa";
    borderStyle = `1.5px dashed ${borderColor}`;
    shadowStyle = "none";
    bubbleClass = `${line.fontFamily ? fontClass : "font-[var(--font-marker)]"} italic text-zinc-500`;
    speakerColor = getSpeakerColor(line.speaker, "#a1a1aa");

    if (size === "small") {
      sizeClass = "px-3 py-1.5 rounded-xl text-[10px] sm:text-xs leading-tight";
    } else if (size === "large") {
      sizeClass = "px-7 py-3.5 rounded-3xl text-sm sm:text-base leading-normal";
    } else {
      sizeClass = "px-4 py-2 rounded-2xl text-xs sm:text-sm leading-snug";
    }
  } else if (style === "electronic") {
    bgColor = line.customBg || "rgba(10, 10, 15, 0.9)";
    borderColor = line.customColor || "#00f0ff";
    borderStyle = `1.5px solid ${borderColor}`;
    shadowStyle = `0 0 8px ${borderColor}59`;
    bubbleClass = `${line.fontFamily ? fontClass : "font-mono"} text-[#00f0ff]`;
    speakerColor = getSpeakerColor(line.speaker, borderColor);

    if (size === "small") {
      sizeClass = "px-2.5 py-1.5 rounded-none text-[10px] sm:text-xs leading-tight";
    } else if (size === "large") {
      sizeClass = "px-6 py-3.5 rounded-none text-sm sm:text-base leading-normal";
    } else {
      sizeClass = "px-4 py-2.5 rounded-none text-xs sm:text-sm leading-snug";
    }
  } else if (style === "sfx") {
    bgColor = line.customBg || "transparent";
    borderColor = line.customColor || "#000000";
    borderStyle = "none";
    shadowStyle = "none";
    bubbleClass = `${line.fontFamily ? fontClass : "font-[var(--font-luckiest)]"} text-center uppercase tracking-wider leading-none`;
    speakerColor = getSpeakerColor(line.speaker, "#e8185a");

    const isTransparent = bgColor === "transparent";
    if (size === "small") {
      sizeClass = isTransparent ? "p-1 text-base sm:text-lg" : "px-7 py-5 rounded-none text-sm sm:text-base";
    } else if (size === "large") {
      sizeClass = isTransparent ? "p-3 text-4xl sm:text-6xl" : "px-16 py-12 rounded-none text-3xl sm:text-5xl";
    } else {
      sizeClass = isTransparent ? "p-2 text-2xl sm:text-4xl" : "px-11 py-8 rounded-none text-xl sm:text-3xl";
    }
  }

  const hasElasticTail = line.tail !== "none" && line.tailX !== undefined && line.tailY !== undefined;
  const tail = hasElasticTail ? null : (style === "sfx" ? null : getTailStyles(tailDir, bgColor, borderColor, style));

  const wrapperStyles: React.CSSProperties = {
    pointerEvents: "none",
  };
  if (line.width) wrapperStyles.maxWidth = `${line.width}px`;

  const bubbleStyles: React.CSSProperties = {
    backgroundColor: bgColor,
    border: borderStyle,
    boxShadow: shadowStyle,
    borderRadius: line.borderRadius !== undefined ? `${line.borderRadius}px` : undefined,
  };

  // Determine base font size for scaling
  let baseFontSize = line.fontSize;
  if (!baseFontSize) {
    if (style === "sfx") {
      baseFontSize = size === "small" ? 18 : size === "large" ? 48 : 32;
    } else {
      baseFontSize = size === "small" ? 12 : size === "large" ? 18 : 14;
    }
  }
  bubbleStyles.fontSize = `${baseFontSize * textScale}px`;
  if (line.width) bubbleStyles.maxWidth = `${line.width}px`;
  if (line.textColor) bubbleStyles.color = line.textColor;
  if (customFontFamily) bubbleStyles.fontFamily = customFontFamily;

  if (style === "sfx") {
    const sfxOutlineColor = line.customColor || "#000000";
    const sfxTextColor = line.textColor || "#f5e642";
    bubbleStyles.backgroundColor = "transparent";
    bubbleStyles.border = "none";
    bubbleStyles.boxShadow = "none";
    bubbleStyles.color = sfxTextColor;
    bubbleStyles.textShadow = `
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
    `;
    bubbleStyles.transform = "rotate(-6deg) skewX(-8deg)";
    bubbleStyles.display = "inline-block";
  }

  return (
    <motion.div
      key={`bubble-${index}`}
      variants={animVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={animTransition}
      className="relative max-w-sm"
      style={{
        ...wrapperStyles,
        filter: customDropShadow,
        overflow: "visible",
      }}
    >
      {/* Starburst backdrop for SFX when background is not transparent */}
      {style === "sfx" && bgColor !== "transparent" && (
        <div className="absolute inset-0 z-0 pointer-events-none" style={{
          filter: `drop-shadow(3px 3px 0 ${borderColor})`,
        }}>
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
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

      {/* SVG Elastic Tail (only if standard tail isn't used) */}
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
        style={bubbleStyles}
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
