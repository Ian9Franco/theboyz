"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface UnlockNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapterId: string;
}

export function UnlockNotificationModal({
  isOpen,
  onClose,
  chapterId,
}: UnlockNotificationModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      try {
        const audio = new Audio("/sounds/sfx/enderman.mp3");
        audio.volume = 0.5;
        audio.play().catch(() => {});
      } catch (e) {}
    }
  }, [isOpen]);

  const getUnlockDetails = (id: string) => {
    const norm = id.toLowerCase().trim();
    if (norm === "un lugar" || norm === "un-lugar") {
      return {
        title: "EXPEDIENTE DESBLOQUEADO",
        item: "KENJI",
        desc: "Se ha descifrado y cargado la ficha táctica confidencial de Kenji en el registro de personajes.",
        color: "#f5e642", // Yellow
      };
    }
    if (norm === "kenji") {
      return {
        title: "EXPEDIENTE DESBLOQUEADO",
        item: "SHINJURO",
        desc: "Se ha descifrado y cargado la ficha táctica confidencial de Shinjuro en el registro de personajes.",
        color: "#ef4444", // Red
      };
    }
    if (norm === "mativerse-chapter-one") {
      return {
        title: "CÚPULA ANTAGONISTA DESBLOQUEADA",
        item: "DON VANGUARD, PHOBOS & GORGON",
        desc: "Se ha autorizado el acceso a los perfiles de la alianza enemiga en la base de datos de personajes.",
        color: "#a855f7", // Purple
      };
    }
    if (norm === "despertar") {
      return {
        title: "INFORMACIÓN CLASIFICADA REVELADA",
        item: "DON VANGUARD & COMANDANTE R.E.G.U.L.A.R.",
        desc: "Se ha autorizado el acceso a los perfiles tácticos y planos iniciales en la base de datos.",
        color: "#a855f7", // Purple
      };
    }
    if (norm === "pecados de brooklyn-la mentira") {
      return {
        title: "INFORMACIÓN CLASIFICADA REVELADA",
        item: "ANTAGONISTAS: PERFILES Y PLANOS TÉCNICOS",
        desc: "Se ha autorizado el acceso a los expedientes de Don Vanguard, Phobos y Gorgon junto a sus planos de ingeniería (Visor de Phobos, Veneno de Gorgon y Bastón de Mando) en la base de datos.",
        color: "#a855f7", // Purple
      };
    }
    if (norm === "la caceria") {
      return {
        title: "EXPEDIENTES Y REGISTROS DESBLOQUEADOS",
        item: "SEVERINE, MAKER, EDIFICIO PARKER & EL NADIR",
        desc: "Se han descifrado los expedientes confidenciales de Severine Alucard y Norman Parker (Maker), y se ha autorizado el acceso a los registros geográficos detallados del Edificio Parker y El Nadir en la base de datos.",
        color: "#dc2626", // Crimson
      };
    }
    if (
      norm.includes("el mecanico") ||
      norm.includes("el-mecanico") ||
      norm === "ch4" ||
      norm === "capitulo-4"
    ) {
      return {
        title: "EQUIPO DE TOKIO DESBLOQUEADO",
        item: "BROOKE, BYTE, DAICHI & REN",
        desc: "Se ha autorizado el acceso a los perfiles tácticos y fichas personales del equipo del taller de Tokio (Brooke, BYTE, Daichi y Ren) en la base de datos.",
        color: "#00ff66", // Turbo Green
      };
    }
    return null;
  };

  const details = getUnlockDetails(chapterId);
  if (!details) return null;

  const vibrantAccent = details.color;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 font-sans"
        >
          {/* Grid Background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle, ${vibrantAccent}20 1.5px, transparent 1.5px)`,
              backgroundSize: "22px 22px",
            }}
          />

          {/* Ambient Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div
              className="w-[500px] h-[500px] rounded-full blur-[140px] opacity-40"
              style={{
                backgroundColor: vibrantAccent,
                animation: "pulseGlow 1.5s ease-in-out infinite",
              }}
            />
          </div>

          {/* Dual Scanlines */}
          <div
            className="absolute inset-x-0 h-[2px] pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent, ${vibrantAccent}, transparent)`,
              boxShadow: `0 0 12px ${vibrantAccent}`,
              animation: "scanLine 2.5s linear infinite",
            }}
          />

          {/* Corner Brackets */}
          {(["tl", "tr", "bl", "br"] as const).map((pos) => (
            <div
              key={pos}
              className="absolute w-8 h-8 pointer-events-none"
              style={{
                top: pos.startsWith("t") ? 24 : undefined,
                bottom: pos.startsWith("b") ? 24 : undefined,
                left: pos.endsWith("l") ? 24 : undefined,
                right: pos.endsWith("r") ? 24 : undefined,
                borderTop: pos.startsWith("t") ? `3px solid ${vibrantAccent}` : undefined,
                borderBottom: pos.startsWith("b") ? `3px solid ${vibrantAccent}` : undefined,
                borderLeft: pos.endsWith("l") ? `3px solid ${vibrantAccent}` : undefined,
                borderRight: pos.endsWith("r") ? `3px solid ${vibrantAccent}` : undefined,
              }}
            />
          ))}

          {/* Main Card */}
          <motion.div
            initial={{ scale: 0.85, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 15, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="relative z-10 w-full max-w-lg bg-[#0c0d14] border-2 p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
            style={{
              borderColor: vibrantAccent,
              boxShadow: `0 0 30px ${vibrantAccent}15, inset 0 0 15px ${vibrantAccent}10`,
            }}
          >
            {/* Hologram lines overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />

            {/* VOPS Warning Badge */}
            <div className="mx-auto mb-5 w-16 h-16 rounded-full flex items-center justify-center bg-black/60 border border-white/10 relative">
              <div
                className="absolute inset-0 rounded-full border opacity-50 animate-ping"
                style={{ borderColor: vibrantAccent }}
              />
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke={vibrantAccent}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>

            {/* VOPS Alert Text */}
            <div
              className="font-[var(--font-marker)] text-[10px] tracking-[0.4em] uppercase mb-2"
              style={{ color: vibrantAccent }}
            >
              ALERTA DE SEGURIDAD V.O.P.S.
            </div>

            {/* Main Alert Title */}
            <h2 className="font-[var(--font-bangers)] text-3xl sm:text-4xl text-white tracking-widest leading-none mb-3">
              {details.title}
            </h2>

            {/* Unlocked Item */}
            <div
              className="inline-block px-4 py-1.5 font-[var(--font-bungee)] text-sm sm:text-base tracking-[0.2em] bg-white/5 border text-white mb-6"
              style={{ borderColor: `${vibrantAccent}40` }}
            >
              <span style={{ color: vibrantAccent }} className="mr-2">🔓</span>
              {details.item}
            </div>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed max-w-md mx-auto mb-8">
              {details.desc}
            </p>

            {/* Action Button */}
            <button
              onClick={() => {
                router.push("/lore");
                onClose();
              }}
              className="w-full py-3.5 border font-[var(--font-bangers)] text-lg tracking-[0.2em] uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{
                backgroundColor: vibrantAccent,
                color: vibrantAccent === "#f5e642" ? "#0a0a0f" : "#ffffff",
                borderColor: "#ffffff",
                boxShadow: `4px 4px 0 #000`,
              }}
            >
              ACCEDER A LA BASE
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
