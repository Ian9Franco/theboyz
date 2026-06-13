"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EpicTransitionOverlayProps {
  isTransitioning: boolean;
  vibrantAccent: string;
  char: any;
  isPowersMode: boolean;
}

export function EpicTransitionOverlay({
  isTransitioning,
  vibrantAccent,
  char,
  isPowersMode,
}: EpicTransitionOverlayProps) {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{
            backgroundColor: "#060608",
            backgroundImage: `radial-gradient(circle, ${vibrantAccent}18 1.5px, transparent 1.5px)`,
            backgroundSize: "22px 22px",
          }}
        >
          {/* === Layer 1: ambient energy orb === */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[600px] h-[600px] rounded-full blur-[160px]"
              style={{
                backgroundColor: vibrantAccent,
                animation: "pulseGlow 0.8s ease-in-out infinite",
              }}
            />
          </div>

          {/* === Layer 2: shockwave rings === */}
          {[0, 0.18, 0.36].map((delay, i) => (
            <div
              key={i}
              className="absolute rounded-full border-2 pointer-events-none"
              style={{
                width: 120,
                height: 120,
                borderColor: vibrantAccent,
                animation: `shockwave 1.1s ease-out ${delay}s infinite`,
                opacity: 0,
              }}
            />
          ))}

          {/* === Layer 3: dual scanlines === */}
          <div
            className="absolute inset-x-0 h-[3px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${vibrantAccent}, transparent)`,
              boxShadow: `0 0 16px ${vibrantAccent}, 0 0 40px ${vibrantAccent}88`,
              animation: "scanLine 1.2s linear infinite",
            }}
          />
          <div
            className="absolute inset-x-0 h-[1px] bg-white/30"
            style={{ animation: "scanLineRev 1.8s linear infinite" }}
          />
          {/* red/cyan chromatic aberration line */}
          <div
            className="absolute inset-x-0 h-[2px]"
            style={{
              background: "linear-gradient(90deg, #ff003388, transparent, #00ffff88)",
              animation: "scanLine 0.9s linear infinite",
              animationDelay: "0.3s",
            }}
          />

          {/* === Layer 4: halftone + speed lines === */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25"
            style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "4px 4px" }}
          />
          <div className="absolute inset-0 opacity-10 pointer-events-none speed-lines" />

          {/* === Layer 5: hero alias ghost watermark === */}
          {char.powers?.role && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            >
              <span
                className="font-[var(--font-bangers)] text-[clamp(5rem,20vw,12rem)] tracking-widest whitespace-nowrap"
                style={{
                  color: `${vibrantAccent}12`,
                  letterSpacing: "0.2em",
                  animation: "glitchH 0.7s ease-in-out infinite",
                }}
              >
                {char.powers.role.split(" / ")[0].toUpperCase()}
              </span>
            </div>
          )}

          {/* === Layer 6: main title with RGB glitch === */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.08, 0.96, 1.03, 1], opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-[var(--font-bangers)] text-4xl sm:text-6xl lg:text-7xl tracking-[0.15em] text-center select-none z-10 px-4 relative"
            style={{
              color: "#ffffff",
              animation: "rgbSplit 0.4s linear infinite",
            }}
          >
            {!isPowersMode ? "CARGANDO DETALLES" : "RESTABLECIENDO"}
          </motion.div>

          {/* sub-line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="mt-3 font-[var(--font-marker)] text-xs sm:text-sm tracking-[0.3em] uppercase z-10 text-center"
            style={{ color: vibrantAccent, animation: "flickerIn 2s ease-in-out infinite" }}
          >
            {!isPowersMode ? "Accediendo a la ficha técnica" : "Volviendo a vista general"}
          </motion.div>

          {/* === Layer 7: power surge bar === */}
          <div className="mt-6 z-10 w-[min(80%,260px)] flex flex-col items-center gap-1.5">
            <div
              className="w-full h-2.5 border border-white/20 overflow-hidden"
              style={{ backgroundColor: "#0a0a0f" }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
                style={{
                  backgroundColor: vibrantAccent,
                  boxShadow: `0 0 10px ${vibrantAccent}, 0 0 30px ${vibrantAccent}88`,
                }}
              />
            </div>
            <div className="flex justify-between w-full">
              {["SYS", "PWR", "TAC", "ARM", netLabel()].map((label) => (
                <span
                  key={label}
                  className="font-[var(--font-bangers)] text-[9px] tracking-widest"
                  style={{ color: `${vibrantAccent}99` }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* === Corner brackets (HUD) === */}
          {(["tl", "tr", "bl", "br"] as const).map((pos) => (
            <div
              key={pos}
              className="absolute w-6 h-6 pointer-events-none"
              style={{
                top: pos.startsWith("t") ? 16 : undefined,
                bottom: pos.startsWith("b") ? 16 : undefined,
                left: pos.endsWith("l") ? 16 : undefined,
                right: pos.endsWith("r") ? 16 : undefined,
                borderTop: pos.startsWith("t") ? `2px solid ${vibrantAccent}` : undefined,
                borderBottom: pos.startsWith("b") ? `2px solid ${vibrantAccent}` : undefined,
                borderLeft: pos.endsWith("l") ? `2px solid ${vibrantAccent}` : undefined,
                borderRight: pos.endsWith("r") ? `2px solid ${vibrantAccent}` : undefined,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function netLabel() {
  return "NET";
}
