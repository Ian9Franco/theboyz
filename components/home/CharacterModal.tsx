"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function CharacterModal({ char, onClose }: { char: any; onClose: () => void }) {
  const [showAlt, setShowAlt] = useState(false);
  const [isPowersMode, setIsPowersMode] = useState(false);
  const [imgFullscreen, setImgFullscreen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const currentImage = showAlt && char.altImage ? char.altImage : (char.fullBody || char.image);
  const accent = char.incognito ? "#6b7280" : char.displayColor;
  const stats = isPowersMode ? char.powers?.stats : char.stats;
  const statRows = [
    { name: "Fuerza",   val: stats?.fuerza ?? 0 },
    { name: "Intel.",   val: stats?.inteligencia ?? 0 },
    { name: "Carisma",  val: stats?.carisma ?? 0 },
    { name: "Suerte",   val: stats?.suerte ?? 0 },
    { name: "Combate",  val: stats?.combate ?? 0 },
    { name: "Defensa",  val: stats?.defensa ?? 0 },
    { name: char.especialLabel || "Especial", val: isPowersMode ? (char.powers?.stats?.especialVal ?? 0) : (char.stats?.especialVal ?? 0) },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0a0a0f]/92 cursor-pointer"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.88, y: 28, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 28, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className={`relative w-full z-10 flex flex-col sm:flex-row overflow-hidden transition-colors duration-400 ${
          isPowersMode ? "bg-[#0f172a]" : "bg-white"
        }`}
        style={{
          maxWidth: 1100,
          border: "4px solid #0a0a0f",
          boxShadow: `10px 10px 0 ${isPowersMode ? "#f5e642" : accent}`,
          height: "auto",
          minHeight: "65vh",
          maxHeight: "90vh",
        }}
      >
        {/* ── Close ── */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-30 w-9 h-9 flex items-center justify-center font-[var(--font-bangers)] text-lg text-white bg-[#e8185a] hover:bg-[#c8134d] border-2 border-black shadow-[3px_3px_0_#000] transition-all hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5"
        >
          ✕
        </button>

        {/* ══════════ LEFT — image ══════════ */}
        <div
          className="w-full h-[280px] sm:h-auto sm:w-[460px] sm:min-w-[460px] lg:w-[540px] lg:min-w-[540px] flex-shrink-0 relative border-b-4 sm:border-b-0 sm:border-r-4 border-black transition-colors duration-400"
          style={{
            backgroundColor: isPowersMode ? "#0f172a" : "#f1f5f9",
            backgroundImage: isPowersMode
              ? "radial-gradient(circle, rgba(245,230,66,0.07) 1.5px, transparent 1.5px)"
              : "radial-gradient(circle, #cbd5e1 1.5px, transparent 1.5px)",
            backgroundSize: "20px 20px",
          }}
        >
          {/* make it taller on sm+ screens using a pseudo-fill trick */}
          <style>{`
            @media (min-width: 640px) {
              .modal-img-panel { height: 100% !important; }
            }
          `}</style>
          <div className="modal-img-panel absolute inset-0 flex items-end justify-center overflow-hidden">
            {char.incognito ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 speed-lines opacity-20" />
                <span className="font-[var(--font-bangers)] text-9xl text-white opacity-20 select-none z-10">?</span>
                {!!char.image && (
                  <img src={char.fullBody || char.image} alt="Locked"
                    className="absolute inset-0 w-full h-full object-contain p-6 opacity-10 grayscale blur-sm" />
                )}
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ) : currentImage ? (
              <img
                src={currentImage}
                alt={char.displayName}
                title="Click para ver completo"
                onClick={() => setImgFullscreen(true)}
                className={`w-full h-full object-contain object-center sm:object-bottom p-1 sm:p-2 lg:p-4 drop-shadow-[4px_4px_0_rgba(0,0,0,0.2)] transition-all duration-500 cursor-zoom-in ${
                  isPowersMode ? "brightness-110 drop-shadow-[0_0_18px_rgba(245,230,66,0.5)]" : ""
                }`}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full border-4 border-black flex items-center justify-center"
                  style={{ background: accent }}>
                  <span className="font-[var(--font-bangers)] text-5xl text-white">
                    {char.name?.[0] ?? "?"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* alt toggle */}
          {char.altImage && !char.incognito && (
            <button
              onClick={() => setShowAlt(!showAlt)}
              className="absolute bottom-2 left-2 z-20 px-2 py-1 border-2 border-black bg-yellow-400 hover:bg-yellow-300 font-[var(--font-bangers)] text-[10px] tracking-wider uppercase shadow-[2px_2px_0_#000] transition-all"
            >
              {showAlt ? "Clásico" : "Alt"}
            </button>
          )}
          {/* halftone */}
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10"
            style={{ backgroundImage: "radial-gradient(circle,#fff 1.5px,transparent 1.5px)", backgroundSize: "6px 6px" }} />
        </div>

        {/* ══════════ RIGHT — info ══════════ */}
        <div
          className={`flex-1 flex flex-col p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 lg:gap-8 overflow-y-auto transition-colors duration-400 ${
            isPowersMode ? "bg-[#0f172a] text-slate-100" : "bg-white text-[#0a0a0f]"
          }`}
        >
          {char.incognito ? (
            /* ── locked ── */
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center border-2 border-black">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="font-[var(--font-bangers)] text-3xl tracking-wider">PERSONAJE BLOQUEADO</h3>
              <p className="font-[var(--font-marker)] text-base text-[#e8185a] uppercase tracking-wider">Próximamente</p>
              <p className="font-sans text-sm text-gray-500 max-w-xs leading-snug">
                {char.hint ?? "Seguí leyendo para desbloquear este personaje."}
              </p>
            </div>
          ) : (
            <>
              {/* ── name + role tag ── */}
              <div className="flex flex-col gap-1 pr-8">
                <span
                  className="tag text-[10px] font-[var(--font-bangers)] tracking-wider px-2 py-0.5 border-2 border-black self-start"
                  style={{ background: isPowersMode ? "#e8185a" : accent, color: "white" }}
                >
                  {isPowersMode ? char.powers?.role : char.role}
                </span>
                <h2
                  className="font-[var(--font-bangers)] text-4xl sm:text-5xl leading-none tracking-widest"
                  style={{ textShadow: isPowersMode ? "3px 3px 0 #000" : `2px 2px 0 ${accent}` }}
                >
                  {isPowersMode
                    ? `${char.name.toUpperCase()} (${char.powers?.role?.split(" / ")[0]})`
                    : char.name.toUpperCase()}
                </h2>
              </div>

              {/* ── profile / habilidades ── */}
              <div className={`border-t-2 pt-2 flex flex-col gap-1 ${isPowersMode ? "border-slate-700" : "border-black"}`}>
                <h4 className="font-[var(--font-bangers)] text-xs tracking-wider">
                  {isPowersMode ? "HABILIDADES:" : "PERFIL:"}
                </h4>
                <ul className="font-sans text-xs leading-relaxed flex flex-col gap-1 pl-3 list-disc list-outside">
                  {(isPowersMode ? char.powers?.habilidades : char.perfil)
                    ?.slice(0, 3)
                    .map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                </ul>
              </div>

              {/* ── crisis ── */}
              <div
                className={`border-2 border-black p-3 relative overflow-hidden flex flex-col gap-1.5 ${
                  isPowersMode ? "bg-[#1e293b] border-slate-600 shadow-[3px_3px_0_#e8185a]" : "bg-yellow-50 shadow-[3px_3px_0_#000]"
                }`}
              >
                <div className={`self-start font-[var(--font-bangers)] text-[11px] tracking-wider px-2 py-0.5 border-2 uppercase ${
                  isPowersMode ? "bg-[#e8185a] text-white border-slate-600" : "bg-[#e8185a] text-white border-black"
                }`}>
                  {isPowersMode ? "Sobrecarga" : "En Crisis"}
                </div>
                <p className="font-sans text-xs sm:text-sm leading-snug">
                  {isPowersMode ? char.powers?.crisis : char.crisis}
                </p>
              </div>

              {/* ── stats — 2-col compact grid ── */}
              <div className={`border-t pt-2 flex flex-col gap-1.5 ${isPowersMode ? "border-slate-800" : "border-gray-100"}`}>
                <h4 className="font-[var(--font-bangers)] text-xs tracking-wider">
                  {isPowersMode ? "MÉTRICAS:" : "STATS:"}
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  {statRows.map((s, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-14 text-[9px] font-[var(--font-bangers)] uppercase tracking-wider truncate shrink-0">
                        {s.name}
                      </span>
                      <div className="flex-1 h-2.5 bg-gray-200 border border-black overflow-hidden flex">
                        {Array.from({ length: 10 }).map((_, idx) => (
                          <div
                            key={idx}
                            className="h-full flex-1 border-r border-black last:border-0 transition-all duration-400"
                            style={{ backgroundColor: idx < s.val ? (isPowersMode ? "#f5e642" : accent) : "transparent" }}
                          />
                        ))}
                      </div>
                      <span className="font-[var(--font-bangers)] text-[9px] w-6 text-right shrink-0">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── toggle button ── */}
              <div className="pt-2 mt-auto pb-2 sm:pb-0">
                <button
                  onClick={() => setIsPowersMode(!isPowersMode)}
                  className={`w-full py-3 sm:py-2 border-3 border-black font-[var(--font-bangers)] text-sm sm:text-base tracking-wider uppercase shadow-[3px_3px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#000] transition-all ${
                    isPowersMode
                      ? "bg-yellow-400 text-black hover:bg-yellow-300"
                      : "bg-[#e8185a] text-white hover:bg-[#c8134d]"
                  }`}
                >
                  {isPowersMode ? "⚡ MODO CÓMIC ACTIVO" : "🔓 VER PODERES"}
                </button>
              </div>
            </>
          )}
        </div>
        {/* ── Fullscreen image lightbox ── */}
        <AnimatePresence>
          {imgFullscreen && currentImage && (
            <ImageLightbox src={currentImage} alt={char.displayName} onClose={() => setImgFullscreen(false)} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ── Fullscreen image overlay ────────────────────────────────────────────── */
function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 cursor-zoom-out"
      onClick={onClose}
    >
      <motion.img
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] max-w-[92vw] object-contain select-none"
        style={{ boxShadow: '0 0 60px rgba(0,0,0,0.8)' }}
      />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-[#e8185a] border-2 border-white text-white font-[var(--font-bangers)] text-xl shadow-lg"
      >
        ✕
      </button>
    </motion.div>
  );
}
