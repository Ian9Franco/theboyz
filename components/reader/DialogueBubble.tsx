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
  textColor?: string;    // Custom text/typography color in hex
  fontFamily?: "marker" | "bangers" | "mono" | "sans" | "serif"; // Custom font
  width?: number;        // Custom max-width in pixels
  fontSize?: number;     // Custom font-size in pixels
  borderRadius?: number; // Custom border-radius in pixels
  tailX?: number;        // Elastic tail anchor X (0-100% of image)
  tailY?: number;        // Elastic tail anchor Y (0-100% of image)
  tailWidth?: number;    // Custom elastic tail base width
  tailCurvature?: number;// Custom elastic tail curvature (-100 to 100)
  linkedTo?: number;     // Index of sibling bubble to connect with an organic bridge
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

export function getBubbleStyles(line: DialogueLine) {
  const style = line.style ?? "normal";
  let bgColor = line.customBg || "#ffffff";
  let borderColor = line.customColor || "#0a0a0f";
  let strokeWidth = 1.5;

  if (style === "scream") {
    bgColor = line.customBg || "#f5e642";
    borderColor = line.customColor || "#0a0a0f";
    strokeWidth = 2.5;
  } else if (style === "whisper") {
    bgColor = line.customBg || "#ffffff";
    borderColor = line.customColor || "#a1a1aa";
    strokeWidth = 1.5;
  } else if (style === "electronic") {
    bgColor = line.customBg || "rgba(10, 10, 15, 0.9)";
    borderColor = line.customColor || "#00f0ff";
    strokeWidth = 1.5;
  } else if (style === "caption") {
    bgColor = line.customBg || "#ffffff";
    borderColor = line.customColor || "#0a0a0f";
    strokeWidth = 1.5;
  } else if (style === "thought") {
    bgColor = line.customBg || "#ffffff";
    borderColor = line.customColor || "#0a0a0f";
    strokeWidth = 1.5;
  }
  return { bgColor, borderColor, strokeWidth };
}

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
  elasticTailNode,
}: {
  line: DialogueLine;
  index: number;
  elasticTailNode?: React.ReactNode;
}) {
  const style = line.style ?? "normal";
  const tailDir = line.tail ?? "bottom-left";
  const paragraphs = parseParagraphs(line.text);
  const size = line.size ?? "medium";

  let customFontFamily = "";
  if (line.fontFamily) {
    if (line.fontFamily === "bangers") customFontFamily = "var(--font-bangers)";
    else if (line.fontFamily === "marker") customFontFamily = "var(--font-marker)";
    else if (line.fontFamily === "mono") customFontFamily = "ui-monospace, monospace";
    else if (line.fontFamily === "sans") customFontFamily = "var(--font-inter), sans-serif";
    else if (line.fontFamily === "serif") customFontFamily = "ui-serif, Georgia, serif";
  } else {
    if (style === "scream") customFontFamily = "var(--font-bangers)";
    else if (style === "electronic") customFontFamily = "ui-monospace, monospace";
    else if (style === "whisper") customFontFamily = "var(--font-marker)";
    else customFontFamily = "var(--font-marker)";
  }

  // 1. NARRATOR CAPTION
  if (style === "caption") {
    const captionBg = line.customBg || "#ffffff"; // White background like modern comics
    const captionBorderColor = line.customColor || "#0a0a0f";
    const captionSpeakerColor = getSpeakerColor(line.speaker, "#e8185a");
    
    let fontClass = "font-[var(--font-marker)]";
    if (line.fontFamily === "bangers") fontClass = "font-[var(--font-bangers)]";
    else if (line.fontFamily === "mono") fontClass = "font-mono";
    else if (line.fontFamily === "sans") fontClass = "font-sans";
    else if (line.fontFamily === "serif") fontClass = "font-serif";
    
    let captionSizeClass = "text-sm sm:text-base px-3.5 py-2";
    if (size === "small") {
      captionSizeClass = "text-xs px-2.5 py-1.5";
    } else if (size === "large") {
      captionSizeClass = "text-base sm:text-lg px-5 py-3.5";
    }

    const captionStyles: React.CSSProperties = {
      pointerEvents: "none",
      border: `1.5px solid ${captionBorderColor}`, // Thinner border
      background: captionBg,
      boxShadow: "none", // Flat look
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
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ delay: index * 0.8, duration: 0.25, ease: "easeOut" }}
        className={`caption leading-snug text-left max-w-sm ${captionSizeClass}`}
        style={{
          ...captionStyles,
          ...wrapperStyles,
          filter: "drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.15))",
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
                ...(line.textColor ? { color: line.textColor } : {})
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

  // Define visual styling variables based on selected bubble type
  let bgColor = line.customBg || "#ffffff";
  let borderColor = line.customColor || "#0a0a0f";
  let borderStyle = `1.5px solid ${borderColor}`; // Thinner border for cleaner look
  let strokeWidth = 1.5;
  let speakerColor = getSpeakerColor(line.speaker, "#e8185a");

  // Determine font family class
  let fontClass = "font-[var(--font-marker)]";
  if (line.fontFamily === "bangers") fontClass = "font-[var(--font-bangers)]";
  else if (line.fontFamily === "mono") fontClass = "font-mono";
  else if (line.fontFamily === "sans") fontClass = "font-sans";
  else if (line.fontFamily === "serif") fontClass = "font-serif";

  let bubbleClass = `${fontClass} text-[#0a0a0f]`;
  let shadowStyle = "none"; // Flat design by default

  // Size styling classes for padding/margins
  let sizeClass = "px-3.5 py-2 rounded-2xl text-sm sm:text-base leading-snug";
  if (size === "small") {
    sizeClass = "px-2 py-1 rounded-xl text-xs leading-tight";
  } else if (size === "large") {
    sizeClass = "px-6 py-3.5 rounded-3xl text-base sm:text-lg leading-normal";
  }

  if (style === "scream") {
    bgColor = line.customBg || "#f5e642"; // bright yellow default
    borderColor = line.customColor || "#0a0a0f";
    borderStyle = `2.5px solid ${borderColor}`; // slightly thinner
    strokeWidth = 2.5;
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
    borderStyle = `1.5px dashed ${borderColor}`; // thinner dashed
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
    borderStyle = `1.5px solid ${borderColor}`; // thinner border
    shadowStyle = `0 0 8px ${borderColor}59`; // subtle glow
    bubbleClass = `${line.fontFamily ? fontClass : "font-mono"} text-[#00f0ff]`;
    speakerColor = getSpeakerColor(line.speaker, borderColor);

    if (size === "small") {
      sizeClass = "px-2.5 py-1.5 rounded-none text-[10px] sm:text-xs leading-tight";
    } else if (size === "large") {
      sizeClass = "px-6 py-3.5 rounded-none text-sm sm:text-base leading-normal";
    } else {
      sizeClass = "px-4 py-2.5 rounded-none text-xs sm:text-sm leading-snug";
    }
  }

  // 2. THOUGHT CLOUD BUBBLE
  const hasElasticTail = line.tailX !== undefined && line.tailY !== undefined;

  if (style === "thought") {
    const thoughtBg = line.customBg || "#ffffff";
    const thoughtBorderColor = line.customColor || "#0a0a0f";
    const thoughtSpeakerColor = getSpeakerColor(line.speaker, "#e8185a");

    // Generate thought dots positioning based on tail target
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

    let thoughtSizeClass = "px-4 py-2 rounded-[35%] text-sm sm:text-base leading-snug";
    if (size === "small") {
      thoughtSizeClass = "px-2.5 py-1 rounded-[30%] text-xs leading-tight";
    } else if (size === "large") {
      thoughtSizeClass = "px-6 py-3.5 rounded-[40%] text-base sm:text-lg leading-normal";
    }

    const thoughtStyles: React.CSSProperties = { 
      background: thoughtBg, 
      border: `1.5px solid ${thoughtBorderColor}`, 
      boxShadow: "none",
      borderRadius: line.borderRadius !== undefined ? `${line.borderRadius}px` : undefined,
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
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: index * 0.8, type: "spring", stiffness: 250, damping: 18 }}
        className="relative max-w-sm"
        style={{
          ...wrapperStyles,
          pointerEvents: "none",
          filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.20))",
        }}
      >
        {renderThoughtDots()}
        <div
          className={`${bubbleClass} ${thoughtSizeClass}`}
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

  // 3. STANDARD / SCREAM / WHISPER / ELECTRONIC BUBBLES
  const tail = hasElasticTail ? null : getTailStyles(tailDir, bgColor, borderColor, style);

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
  if (line.fontSize) bubbleStyles.fontSize = `${line.fontSize}px`;
  if (line.width) bubbleStyles.maxWidth = `${line.width}px`;
  if (line.textColor) bubbleStyles.color = line.textColor;
  if (customFontFamily) bubbleStyles.fontFamily = customFontFamily;

  return (
    <motion.div
      key={`bubble-${index}`}
      initial={{ opacity: 0, scale: 0.75, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.75, y: 8 }}
      transition={{ delay: index * 0.8, type: "spring", stiffness: 280, damping: 20 }}
      className="relative max-w-sm"
      style={{
        ...wrapperStyles,
        filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.20))",
        overflow: "visible",
      }}
    >
      {/* Dynamic CSS Tail Triangles (for non-elastic classic tails) */}
      {!hasElasticTail && tail && (
        <>
          <div style={tail.outer} />
          <div style={tail.inner} />
        </>
      )}

      {/* Bubble Background + Tail combined under a single drop-shadow for seamless border */}
      {hasElasticTail ? (
        <div className="absolute inset-0 z-0 pointer-events-none" style={{
          filter: `drop-shadow(${strokeWidth}px 0 0 ${borderColor}) drop-shadow(-${strokeWidth}px 0 0 ${borderColor}) drop-shadow(0 ${strokeWidth}px 0 ${borderColor}) drop-shadow(0 -${strokeWidth}px 0 ${borderColor})`,
        }}>
          {/* Main Bubble Background Shape (No Border) */}
          <div 
            className={`w-full h-full ${sizeClass}`}
            style={{ 
              backgroundColor: bgColor, 
              borderRadius: bubbleStyles.borderRadius !== undefined ? `${bubbleStyles.borderRadius}px` : '1rem',
            }} 
          />
          {/* SVG Tail (No Stroke, Fill Only) */}
          {elasticTailNode}
        </div>
      ) : null}

      {/* Bubble body (Text Container) */}
      <div
        className={`${bubbleClass} ${sizeClass} relative z-10`}
        style={{
          ...(hasElasticTail 
            ? { ...bubbleStyles, border: 'none', backgroundColor: 'transparent', boxShadow: 'none' } 
            : bubbleStyles
          ),
          color: line.textColor
        }}
      >
        <div className="relative z-10">
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
      </div>
    </motion.div>
  );
}
