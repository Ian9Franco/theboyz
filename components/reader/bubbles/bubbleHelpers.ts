/**
 * bubbleHelpers.ts
 * Shared constants and utility functions used across all bubble types
 * (StandardBubble, CaptionBubble, ThoughtBubble).
 * Centralizing here avoids duplication and makes speaker/style changes universal.
 */

import type { DialogueLine } from "../DialogueBubble";

// ─── Speaker Color Palette ─────────────────────────────────────────────────────
// Maps a lowercase speaker name to their canonical accent color.

export const SPEAKER_COLORS: Record<string, string> = {
  uandi:  "#ef4444",
  sofi:   "#06b6d4",
  ian:    "#10b981",
  jaz:    "#eab308",
  julian: "#3b82f6",
  mati:   "#a855f7",
  volvo:  "#f97316",
};

/**
 * Returns the speaker's accent color, or a fallback if the speaker is unknown.
 */
export function getSpeakerColor(
  speaker: string | null | undefined,
  defaultColor: string
): string {
  if (!speaker) return defaultColor;
  const key = speaker.toLowerCase().trim();
  return SPEAKER_COLORS[key] || defaultColor;
}

// ─── Text Parsing ──────────────────────────────────────────────────────────────

export type ParsedParagraph = {
  speaker: string | null;
  text: string;
};

/**
 * Splits bubble text into paragraphs. Lines with the format "Speaker: text"
 * are parsed into { speaker, text } pairs for inline speaker coloring.
 */
export function parseParagraphs(text: string): ParsedParagraph[] {
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

// ─── Font Family Resolution ────────────────────────────────────────────────────

/**
 * Resolves a DialogueLine's fontFamily field to the actual CSS font-family value.
 * Falls back to a default based on the bubble style if fontFamily is not set.
 */
export function resolveFontFamily(
  line: DialogueLine,
  style: string
): string {
  if (line.fontFamily) {
    switch (line.fontFamily) {
      case "bangers":  return "var(--font-bangers)";
      case "marker":   return "var(--font-marker)";
      case "mono":     return "ui-monospace, monospace";
      case "sans":     return "var(--font-inter), sans-serif";
      case "serif":    return "ui-serif, Georgia, serif";
      case "bungee":   return "var(--font-bungee)";
      case "luckiest": return "var(--font-luckiest)";
    }
  }
  // Style-based defaults
  switch (style) {
    case "scream":     return "var(--font-bangers)";
    case "electronic": return "ui-monospace, monospace";
    case "whisper":    return "var(--font-marker)";
    case "sfx":        return "var(--font-luckiest)";
    case "caption":    return "var(--font-inter), sans-serif";
    default:           return "var(--font-marker)";
  }
}

/**
 * Resolves a DialogueLine's fontFamily to a Tailwind font class string.
 */
export function resolveFontClass(line: DialogueLine, style?: string): string {
  if (line.fontFamily) {
    switch (line.fontFamily) {
      case "bangers":  return "font-[var(--font-bangers)]";
      case "mono":     return "font-mono";
      case "sans":     return "font-sans font-bold";
      case "serif":    return "font-serif";
      case "bungee":   return "font-[var(--font-bungee)]";
      case "luckiest": return "font-[var(--font-luckiest)]";
      default:         return "font-[var(--font-marker)]";
    }
  }

  const activeStyle = line.style || style || "normal";
  switch (activeStyle) {
    case "caption":    return "font-sans font-bold";
    case "scream":     return "font-[var(--font-bangers)]";
    case "electronic": return "font-mono";
    case "sfx":        return "font-[var(--font-luckiest)]";
    default:           return "font-[var(--font-marker)]";
  }
}

// ─── Animation Variants ────────────────────────────────────────────────────────

export type AppearanceAnimation = "spring" | "fade" | "slide" | "zoom" | "pop";
export type FadeOutAnimation    = "fade"   | "slide" | "zoom";

/**
 * Returns Framer Motion variant objects for bubble entrance/exit animations.
 * The "pop" variant adds a jaunty rotation for a more comic-book feel.
 */
export function buildAnimVariants(
  appearanceAnimation: AppearanceAnimation | undefined
) {
  const initial =
    appearanceAnimation === "fade"  ? { opacity: 0 } :
    appearanceAnimation === "slide" ? { opacity: 0, y: 20 } :
    appearanceAnimation === "zoom"  ? { opacity: 0, scale: 0.4 } :
    appearanceAnimation === "pop"   ? { opacity: 0, scale: 0.3, rotate: -8 } :
    /* spring (default) */            { opacity: 0, scale: 0.75, y: 8 };

  return {
    initial,
    animate: { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 },
  };
}

export function buildExitVariant(fadeOutAnimation: FadeOutAnimation | undefined) {
  return (
    fadeOutAnimation === "slide" ? { opacity: 0, y: -20 } :
    fadeOutAnimation === "zoom"  ? { opacity: 0, scale: 0.5 } :
    /* fade (default) */           { opacity: 0 }
  );
}

/**
 * Returns the Framer Motion transition config for a bubble.
 * "pop" uses a snappier spring for a comic-book impact feel.
 */
export function buildAnimTransition(
  appearanceAnimation: AppearanceAnimation | undefined,
  delay: number,
  instant: boolean
): object {
  if (instant) {
    return { delay: 0, duration: 0.15, ease: "easeOut" };
  }
  if (appearanceAnimation === "spring" || !appearanceAnimation) {
    return { delay, type: "spring", stiffness: 280, damping: 20 };
  }
  if (appearanceAnimation === "pop") {
    return { delay, type: "spring", stiffness: 420, damping: 16 };
  }
  return { delay, duration: 0.35, ease: "easeOut" };
}

// ─── Dialogue Speed Multiplier ─────────────────────────────────────────────────

/**
 * Returns the per-bubble delay in seconds, factoring in:
 * - Text length (longer text → more time to read before next bubble)
 * - Bubble style (scream is fast, whisper is slow)
 * - Global speed multiplier from reader settings
 */
export function computeBubbleDelay(
  index: number,
  line: DialogueLine,
  instant: boolean,
  speedMultiplier: number = 1.0
): number {
  if (instant) return 0;

  const words = (line.text || "").split(" ").length;
  // Base delay + reading time estimate
  const baseMs = 350 + words * 18;

  // Style multipliers for pacing variety
  const styleMultiplier: Record<string, number> = {
    scream:     0.55,
    whisper:    1.35,
    caption:    0.85,
    thought:    1.20,
    electronic: 0.70,
    sfx:        0.28,
    normal:     1.00,
  };
  const styleMul = styleMultiplier[line.style ?? "normal"] ?? 1.0;

  return (index * baseMs * styleMul * speedMultiplier) / 1000;
}
