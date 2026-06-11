"use client";

import { motion } from "framer-motion";

export type DialogueLine = {
  text: string;
  speaker?: string | null;
  style?: "normal" | "caption" | "thought" | "scream" | "whisper" | "electronic";
  tail?: "bottom-left" | "bottom-right" | "top-left" | "top-right" | "left" | "right" | "none";
  posX?: number;
  posY?: number;
  size?: "small" | "medium" | "large";
  customColor?: string;
  customBg?: string;
};

const SPEAKER_COLORS: Record<string, string> = {
  uandi: "#ef4444",   // Rojo
  sofi: "#06b6d4",    // Celeste
  ian: "#10b981",     // Verde / Esmeralda
  jaz: "#eab308",     // Amarillo
  julian: "#3b82f6",  // Azul
  mati: "#a855f7",    // Púrpura
  volvo: "#f97316",   // Naranja
};

function getSpeakerColor(speaker: string | null | undefined, defaultColor: string) {
  if (!speaker) return defaultColor;
  const key = speaker.toLowerCase().trim();
  return SPEAKER_COLORS[key] || defaultColor;
}


// Helper to parse line text into separate paragraphs with optional inline speakers
// E.g. "Sofi: Hola\nKenji: Qué tal?" -> [{ speaker: "Sofi", text: "Hola" }, { speaker: "Kenji", text: "Qué tal?" }]
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

// Generate CSS properties for bubble tails (triangles) based on target direction
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

export function DialogueBubble({
  line,
  index,
}: {
  line: DialogueLine;
  index: number;
}) {
  const style = line.style ?? "normal";
  const tailDir = line.tail ?? "bottom-left";
  const paragraphs = parseParagraphs(line.text);
  const size = line.size ?? "medium";

  // 1. NARRATOR CAPTION
  if (style === "caption") {
    const captionBg = line.customBg || "#faf8eb";
    const captionBorderColor = line.customColor || "#0a0a0f";
    const captionSpeakerColor = getSpeakerColor(line.speaker, "#e8185a");
    
    let captionSizeClass = "text-sm sm:text-base px-3.5 py-2.5";
    if (size === "small") {
      captionSizeClass = "text-xs px-2.5 py-1.5";
    } else if (size === "large") {
      captionSizeClass = "text-base sm:text-lg px-5 py-3.5";
    }

    return (
      <motion.div
        key={`caption-${index}`}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ delay: index * 0.8, duration: 0.25, ease: "easeOut" }}
        className={`caption leading-snug text-left max-w-sm ${captionSizeClass}`}
        style={{
          pointerEvents: "none",
          border: `3px solid ${captionBorderColor}`,
          background: captionBg,
          boxShadow: `3px 3px 0 ${captionBorderColor}`,
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
            <div key={i} className="text-stone-800 font-[var(--font-marker)]">
              {p.speaker && <strong style={{ color: captionBorderColor }}>{p.speaker}: </strong>}
              {p.text}
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Define visual styling variables based on selected bubble type
  let bgColor = line.customBg || "#ffffff";
  let borderColor = line.customColor || "#0a0a0f";
  let borderStyle = `3px solid ${borderColor}`;
  let bubbleClass = "font-[var(--font-marker)] text-[#0a0a0f]";
  let shadowStyle = `4px 4px 0 ${borderColor}`;
  let speakerColor = getSpeakerColor(line.speaker, "#e8185a");

  // Size styling classes for padding/margins
  let sizeClass = "px-5 py-3 rounded-2xl text-sm sm:text-base leading-snug";
  if (size === "small") {
    sizeClass = "px-3.5 py-2 rounded-xl text-xs leading-tight";
  } else if (size === "large") {
    sizeClass = "px-7 py-4 rounded-3xl text-base sm:text-lg leading-normal";
  }

  if (style === "scream") {
    bgColor = line.customBg || "#f5e642"; // bright yellow default
    borderColor = line.customColor || "#0a0a0f";
    borderStyle = `3.5px solid ${borderColor}`;
    shadowStyle = `5px 5px 0 ${line.customColor || "#e8185a"}`;
    bubbleClass = "font-[var(--font-bangers)] text-[#0a0a0f] uppercase tracking-wide leading-tight";
    
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
    borderStyle = `3px dashed ${borderColor}`;
    shadowStyle = "none";
    bubbleClass = "font-[var(--font-marker)] italic text-zinc-500";
    speakerColor = getSpeakerColor(line.speaker, "#a1a1aa");

    if (size === "small") {
      sizeClass = "px-3.5 py-2 rounded-xl text-[10px] sm:text-xs leading-tight";
    } else if (size === "large") {
      sizeClass = "px-7 py-4 rounded-3xl text-sm sm:text-base leading-normal";
    } else {
      sizeClass = "px-5 py-3 rounded-2xl text-xs sm:text-sm leading-snug";
    }
  } else if (style === "electronic") {
    bgColor = line.customBg || "rgba(10, 10, 15, 0.9)";
    borderColor = line.customColor || "#00f0ff";
    borderStyle = `2px solid ${borderColor}`;
    shadowStyle = `0 0 10px ${borderColor}59`; // 59 is hex for ~35% opacity
    bubbleClass = "font-mono text-[#00f0ff]";
    speakerColor = getSpeakerColor(line.speaker, borderColor);

    if (size === "small") {
      sizeClass = "px-3 py-2 rounded-none text-[10px] sm:text-xs leading-tight";
    } else if (size === "large") {
      sizeClass = "px-7 py-4 rounded-none text-sm sm:text-base leading-normal";
    } else {
      sizeClass = "px-5 py-3 rounded-none text-xs sm:text-sm leading-snug";
    }
  }

  // 2. THOUGHT CLOUD BUBBLE
  if (style === "thought") {
    const thoughtBg = line.customBg || "#ffffff";
    const thoughtBorderColor = line.customColor || "#0a0a0f";
    const thoughtSpeakerColor = getSpeakerColor(line.speaker, "#e8185a");

    // Generate thought dots positioning based on tail target
    const renderThoughtDots = () => {
      if (tailDir === "none") return null;
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
            style={{ border: `2px solid ${thoughtBorderColor}`, background: thoughtBg }}
          />
          <div 
            className="w-1.5 h-1.5 rounded-full self-center" 
            style={{ border: `2px solid ${thoughtBorderColor}`, background: thoughtBg }}
          />
        </div>
      );
    };

    let thoughtSizeClass = "px-5 py-3 rounded-[35%] text-sm sm:text-base leading-snug";
    if (size === "small") {
      thoughtSizeClass = "px-3.5 py-2 rounded-[30%] text-xs leading-tight";
    } else if (size === "large") {
      thoughtSizeClass = "px-7 py-4.5 rounded-[40%] text-base sm:text-lg leading-normal";
    }

    return (
      <motion.div
        key={`thought-${index}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: index * 0.8, type: "spring", stiffness: 250, damping: 18 }}
        className="relative max-w-sm"
        style={{ pointerEvents: "none" }}
      >
        {renderThoughtDots()}
        <div
          className={`font-[var(--font-marker)] text-[#0a0a0f] ${thoughtSizeClass}`}
          style={{ 
            background: thoughtBg, 
            border: `3px solid ${thoughtBorderColor}`, 
            boxShadow: `3px 3px 0 ${thoughtBorderColor}` 
          }}
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

  // 3. STANDARD / SCREAM / WHISPER / ELECTRONIC BUBBLES
  const tail = getTailStyles(tailDir, bgColor, borderColor, style);

  return (
    <motion.div
      key={`bubble-${index}`}
      initial={{ opacity: 0, scale: 0.75, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.75, y: 8 }}
      transition={{ delay: index * 0.8, type: "spring", stiffness: 280, damping: 20 }}
      className="relative max-w-sm"
      style={{ pointerEvents: "none" }}
    >
      {/* Dynamic Tail Triangles */}
      {tail && (
        <>
          <div style={tail.outer} />
          <div style={tail.inner} />
        </>
      )}

      {/* Bubble body */}
      <div
        className={`${bubbleClass} ${sizeClass}`}
        style={{
          background: bgColor,
          border: borderStyle,
          boxShadow: shadowStyle,
        }}
      >
        {line.speaker && (
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
              {p.speaker && (
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
