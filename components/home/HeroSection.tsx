"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [showLightbox, setShowLightbox] = useState(false);

  return (
    <div className="flex flex-col w-full">
      {/* ── Banner Section (Hero) ── */}
      <section
        className="relative flex flex-col overflow-hidden min-h-[60vh] md:min-h-[75vh] justify-center cursor-zoom-in"
        style={{ background: "#002a32" }}
        onClick={() => setShowLightbox(true)}
      >
        {/* ── Full Banner Background Image ── */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <img 
            src="/personajes/LosPibes/group banner/Teamup.webp" 
            alt="The Boys Teamup" 
            className="w-full h-full object-cover opacity-85 grayscale-[0.1] hero-banner-img"
          />
          {/* Soft dark overlay gradients so the background remains highly visible */}
          <div 
            className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, #002a32)"
            }}
          />
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              background: "linear-gradient(to right, rgba(10, 10, 15, 0.5) 30%, rgba(10, 10, 15, 0.1) 70%, rgba(10, 10, 15, 0.4) 100%)"
            }}
          />
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, transparent 30%, rgba(10, 10, 15, 0.6) 90%)"
            }}
          />
        </div>

        {/* ── Background overlays ── */}
        <div className="absolute inset-0 speed-lines opacity-10 pointer-events-none z-10" />
        
        {/* dot-grid accent top-right */}
        <div
          className="absolute right-0 top-0 w-80 h-80 pointer-events-none opacity-[0.04] z-10"
          style={{
            backgroundImage: "radial-gradient(circle, #D7263D 1.5px, transparent 1.5px)",
            backgroundSize: "10px 10px",
          }}
        />
      </section>

      <AnimatePresence>
        {showLightbox && (
          <BannerLightbox 
            src="/personajes/LosPibes/group banner/Teamup.webp" 
            alt="The Boys Teamup" 
            onClose={() => setShowLightbox(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Interactive Zoomable/Panable Lightbox ──────────────────────────────────────── */
export function BannerLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const [isZoomed, setIsZoomed] = useState(false);

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
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 select-none"
    >
      <div 
        className="absolute inset-0 cursor-zoom-out" 
        onClick={onClose} 
      />

      <div className="relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: isZoomed ? 1.8 : 1.0, 
            opacity: 1,
            cursor: isZoomed ? 'grab' : 'zoom-in' 
          }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          src={src}
          alt={alt}
          drag={isZoomed}
          dragConstraints={{ left: -600, right: 600, top: -400, bottom: 400 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(!isZoomed);
          }}
          className="max-h-[90vh] max-w-[90vw] object-contain pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10"
        />
      </div>

      {/* Floating control badge */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 bg-black/80 border border-white/20 px-4 py-2 rounded-full text-white text-xs sm:text-sm font-[var(--font-bangers)] tracking-wider">
        <span>{isZoomed ? "ARRASTRÁ PARA NAVEGAR" : "CLICK PARA HACER ZOOM"}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(!isZoomed);
          }}
          className="bg-[#D7263D] hover:bg-[#ff3b51] px-3 py-1 rounded text-white transition-colors"
        >
          {isZoomed ? "LUPA -" : "LUPA +"}
        </button>
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-[#D7263D] border-2 border-white text-white font-[var(--font-bangers)] text-xl shadow-lg z-20 hover:bg-[#ff3b51] transition-colors"
      >
        ✕
      </button>
    </motion.div>
  );
}


