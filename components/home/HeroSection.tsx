"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function HeroSection() {
  return (
    <section
      className="relative min-h-[88vh] flex items-center justify-center overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      {/* Speed lines */}
      <div className="absolute inset-0 speed-lines opacity-30" />

      {/* Magenta radial glow */}
      <div
        className="absolute right-0 top-0 w-[700px] h-[700px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 70% 30%, rgba(232,24,90,0.18) 0%, transparent 65%)",
        }}
      />
      {/* Cyan glow */}
      <div
        className="absolute left-0 bottom-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 30% 70%, rgba(0,184,212,0.12) 0%, transparent 65%)",
        }}
      />

      {/* Halftone circles (decorative) */}
      <div
        className="absolute right-[-60px] top-[-60px] w-[380px] h-[380px] rounded-full pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #e8185a 1.5px, transparent 1.5px)",
          backgroundSize: "10px 10px",
        }}
      />
      <div
        className="absolute left-[-40px] bottom-[-40px] w-[260px] h-[260px] rounded-full pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #00b8d4 1.5px, transparent 1.5px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Left Stack */}
      <FloatingHeroCard
        src="/ian.png"
        alt="Ian"
        fallbackColor="#e8185a"
        className="left-[-2%] md:left-[1.5%] xl:left-[3.5%] top-[5%] md:top-[10%] xl:top-[12%] z-10"
        initialX={-120}
        initialRotate={-30}
        animateRotate={-15}
        delay={0.3}
      />
      <FloatingHeroCard
        src="/jaz.png"
        alt="Jaz"
        fallbackColor="#00b8d4"
        className="left-[4%] md:left-[7.5%] xl:left-[9.5%] top-[25%] md:top-[28%] xl:top-[30%] z-20"
        initialX={-100}
        initialRotate={-25}
        animateRotate={-5}
        delay={0.4}
      />
      <FloatingHeroCard
        src="/julian.png"
        alt="Julián"
        fallbackColor="#f5e642"
        className="left-[-4%] md:left-[2.5%] xl:left-[4.5%] top-[45%] md:top-[46%] xl:top-[48%] z-10"
        initialX={-120}
        initialRotate={-20}
        animateRotate={-25}
        delay={0.5}
      />
      <FloatingHeroCard
        src="/matapobre.png"
        alt="Matapobre"
        fallbackColor="#6b7280"
        className="left-[6%] md:left-[8.5%] xl:left-[10.5%] top-[65%] md:top-[64%] xl:top-[66%] z-20"
        initialX={-100}
        initialRotate={-15}
        animateRotate={-8}
        delay={0.6}
        incognito={true}
      />

      {/* Right Stack */}
      <FloatingHeroCard
        src="/mati.png"
        alt="Mati"
        fallbackColor="#6d28d9"
        className="right-[-2%] md:right-[1.5%] xl:right-[3.5%] top-[5%] md:top-[10%] xl:top-[12%] z-10"
        initialX={120}
        initialRotate={30}
        animateRotate={15}
        delay={0.35}
      />
      <FloatingHeroCard
        src="/uandi.png"
        alt="Uandi"
        fallbackColor="#f97316"
        className="right-[4%] md:right-[7.5%] xl:right-[9.5%] top-[25%] md:top-[28%] xl:top-[30%] z-20"
        initialX={100}
        initialRotate={25}
        animateRotate={5}
        delay={0.45}
      />
      <FloatingHeroCard
        src="/volvo.png"
        alt="Volvo"
        fallbackColor="#10b981"
        className="right-[-4%] md:right-[2.5%] xl:right-[4.5%] top-[45%] md:top-[46%] xl:top-[48%] z-10"
        initialX={120}
        initialRotate={20}
        animateRotate={25}
        delay={0.55}
      />
      <FloatingHeroCard
        src="/sofi.png"
        alt="Sofi"
        fallbackColor="#6b7280"
        className="right-[6%] md:right-[8.5%] xl:right-[10.5%] top-[65%] md:top-[64%] xl:top-[66%] z-20"
        initialX={100}
        initialRotate={15}
        animateRotate={8}
        delay={0.65}
        incognito={true}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex justify-center"
        >
          <span
            className="font-[var(--font-bangers)] text-sm tracking-[0.35em] uppercase"
            style={{
              color: "#e8185a",
              border: "1px solid rgba(232,24,90,0.4)",
              padding: "0.35rem 1.2rem",
              letterSpacing: "0.35em",
            }}
          >
            Un cómic original
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 130, damping: 15, delay: 0.2 }}
          className="font-[var(--font-bangers)] leading-[0.85] text-white mb-6 select-none"
          style={{
            fontSize: "clamp(5rem,18vw,13rem)",
            textShadow: "5px 5px 0 #e8185a, 10px 10px 0 rgba(232,24,90,0.18)",
          }}
        >
          THE<br />BOYS
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="font-[var(--font-marker)] text-xl sm:text-2xl mb-8"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          una historia basada en hechos reales
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#sagas" className="btn btn-magenta text-xl sm:text-2xl">
            Empezá a leer →
          </a>
          <a
            href="#sagas"
            className="btn text-xl sm:text-2xl"
            style={{
              background: "transparent",
              color: "white",
              border: "2px solid rgba(255,255,255,0.2)",
              boxShadow: "none",
            }}
          >
            Ver sagas
          </a>
        </motion.div>
      </div>

      {/* Bottom gradient into paper */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #f4f0e6)" }}
      />
    </section>
  );
}

function FloatingHeroCard({ 
  src, 
  alt, 
  fallbackColor, 
  className, 
  initialX, 
  initialRotate, 
  animateRotate,
  delay,
  incognito
}: { 
  src: string; 
  alt: string; 
  fallbackColor: string; 
  className: string;
  initialX: number;
  initialRotate: number;
  animateRotate: number;
  delay: number;
  incognito?: boolean;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, rotate: initialRotate }}
      animate={{ opacity: 1, x: 0, rotate: animateRotate }}
      transition={{ type: "spring", stiffness: 80, damping: 15, delay }}
      className={`absolute w-[75px] md:w-[120px] lg:w-[140px] xl:w-[170px] aspect-[4/5] overflow-hidden select-none pointer-events-auto ${className}`}
      style={{
        border: "3px solid white",
        boxShadow: `${hasError ? '2px 2px' : '4px 4px'} 0 ${fallbackColor}, 8px 8px 15px rgba(0,0,0,0.6)`,
        background: incognito ? "#2a2a35" : "#13131e"
      }}
      whileHover={{ scale: 1.1, rotate: animateRotate + (initialX > 0 ? 4 : -4), zIndex: 40, transition: { duration: 0.2 } }}
    >
      {!hasError ? (
        <>
          {incognito ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 speed-lines opacity-20" />
              <span 
                className="font-[var(--font-bangers)] text-4xl md:text-8xl text-white opacity-30 select-none z-10"
                style={{ textShadow: "2px 2px 0 #000" }}
              >
                ?
              </span>
              <img 
                src={src} 
                alt="Incógnito" 
                className="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-20 grayscale blur-[4px]"
                onError={() => setHasError(true)}
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover object-[center_20%]"
              onError={() => setHasError(true)}
            />
          )}
          
          {/* Halftone overlay */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "4px 4px",
            }}
          />
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
          <div className="absolute inset-0 speed-lines opacity-[0.15]" />
          <span 
            className="font-[var(--font-bangers)] text-6xl text-white mb-1 leading-none select-none"
            style={{ textShadow: `3px 3px 0 ${fallbackColor}` }}
          >
            ?
          </span>
        </div>
      )}
    </motion.div>
  );
}
