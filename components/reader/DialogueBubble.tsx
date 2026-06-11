"use client";

import { motion } from "framer-motion";

export type DialogueLine = {
  text: string;
  speaker?: string | null;
  style?: "normal" | "caption" | "thought" | "scream" | "whisper" | "electronic";
  tail?: "bottom-left" | "bottom-right" | "top-left" | "top-right" | "left" | "right" | "none";
  posX?: number;
  posY?: number;
};

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

  // 1. NARRATOR CAPTION
  if (style === "caption") {
    return (
      <motion.div
        key={`caption-${index}`}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ delay: index * 0.1, duration: 0.25, ease: "easeOut" }}
        className="caption text-sm sm:text-base leading-snug text-left max-w-sm"
        style={{
          pointerEvents: "none",
          border: "3px solid #0a0a0f",
          background: "#faf8eb",
          boxShadow: "3px 3px 0 #0a0a0f",
          padding: "10px 14px",
        }}
      >
        {line.speaker && (
          <div className="font-[var(--font-bangers)] text-[#e8185a] text-xs tracking-wider mb-1 uppercase">
            {line.speaker}
          </div>
        )}
        <div className="flex flex-col gap-2">
          {paragraphs.map((p, i) => (
            <div key={i} className="text-stone-800 font-[var(--font-marker)]">
              {p.speaker && <strong className="text-[#0a0a0f]">{p.speaker}: </strong>}
              {p.text}
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Define visual styling variables based on selected bubble type
  let bgColor = "#ffffff";
  let borderColor = "#0a0a0f";
  let borderStyle = "3px solid #0a0a0f";
  let bubbleClass = "px-5 py-3 rounded-2xl font-[var(--font-marker)] text-sm sm:text-base leading-snug text-[#0a0a0f]";
  let shadowStyle = "4px 4px 0 #0a0a0f";
  let speakerColor = "#e8185a";

  if (style === "scream") {
    bgColor = "#f5e642"; // bright yellow
    borderColor = "#0a0a0f";
    borderStyle = "3.5px solid #0a0a0f";
    shadowStyle = "5px 5px 0 #e8185a"; // neon pink shadow
    bubbleClass = "px-6 py-4 rounded-md font-[var(--font-bangers)] text-base sm:text-lg tracking-wide leading-tight text-[#0a0a0f] uppercase";
  } else if (style === "whisper") {
    bgColor = "#ffffff";
    borderColor = "#a1a1aa";
    borderStyle = "3px dashed #a1a1aa";
    shadowStyle = "none";
    bubbleClass = "px-5 py-3 rounded-2xl font-[var(--font-marker)] italic text-xs sm:text-sm leading-snug text-zinc-500";
    speakerColor = "#a1a1aa";
  } else if (style === "electronic") {
    bgColor = "rgba(10, 10, 15, 0.9)"; // dark transparent tech card
    borderColor = "#00f0ff"; // glowing cyan
    borderStyle = "2px solid #00f0ff";
    shadowStyle = "0 0 10px rgba(0, 240, 255, 0.35)";
    bubbleClass = "px-5 py-3 rounded-none font-mono text-xs sm:text-sm leading-snug text-[#00f0ff]";
    speakerColor = "#00f0ff";
  }

  // 2. THOUGHT CLOUD BUBBLE
  if (style === "thought") {
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
          <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-[#0a0a0f]" />
          <div className="w-1.5 h-1.5 rounded-full bg-white border-2 border-[#0a0a0f] self-center" />
        </div>
      );
    };

    return (
      <motion.div
        key={`thought-${index}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 250, damping: 18 }}
        className="relative max-w-sm"
        style={{ pointerEvents: "none" }}
      >
        {renderThoughtDots()}
        <div
          className="px-5 py-3 rounded-[35%] font-[var(--font-marker)] text-sm sm:text-base leading-snug text-[#0a0a0f] bg-white"
          style={{ border: "3px solid #0a0a0f", boxShadow: "3px 3px 0 #0a0a0f" }}
        >
          {line.speaker && (
            <span className="font-[var(--font-bangers)] text-[#e8185a] text-xs tracking-wider block mb-1 uppercase">
              {line.speaker}
            </span>
          )}
          <div className="flex flex-col gap-2">
            {paragraphs.map((p, i) => (
              <div key={i}>
                {p.speaker && <strong className="text-[#0a0a0f]">{p.speaker}: </strong>}
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
      transition={{ delay: index * 0.1, type: "spring", stiffness: 280, damping: 20 }}
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
        className={bubbleClass}
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
