"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getComicPageUrl } from "@/components/reader/readerUtils";

function getTextColor(hexColor: string) {
  if (!hexColor) return "white";
  const color = hexColor.replace("#", "");
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 140 ? "#001419" : "white";
}

export function SagaBlock({ 
  saga, 
  index, 
  prevSaga,
  onCoverClick,
  isFeatured = false,
  isCollapsed = false,
  onToggleCollapse
}: { 
  saga: any; 
  index: number; 
  prevSaga?: any;
  onCoverClick?: (coverUrl: string) => void;
  isFeatured?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const isEven = index % 2 === 0;
  const [readChapters, setReadChapters] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [unlockAll, setUnlockAll] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const read = localStorage.getItem("read-chapters");
      if (read) {
        setReadChapters(JSON.parse(read));
      }
    } catch (e) {
      console.error(e);
    }

    const checkUnlock = () => {
      setUnlockAll(localStorage.getItem("unlock-all") === "true");
    };
    checkUnlock();
    window.addEventListener("unlockAllChanged", checkUnlock);
    return () => {
      window.removeEventListener("unlockAllChanged", checkUnlock);
    };
  }, []);

  const isNuevo = saga.nuevo === true;
  const isProximamente = saga.proximamente === true;

  const colorPrimary = "#D7263D";
  const colorSecondary = "#D7263D";

  const isLightBg = getTextColor(colorPrimary) === "#001419";
  const buttonIconSrc = isLightBg ? "/boom.webp" : "/boom-white.webp";

  // Proximamente siempre usa layout vertical con banda crimson, independientemente de isFeatured
  if (isProximamente) {
    return (
      <div 
        onClick={() => { if (isCollapsed && typeof window !== 'undefined' && window.innerWidth < 768) onToggleCollapse?.(); }}
        className={`border-4 border-dashed border-[#D7263D]/80 relative overflow-hidden rounded-lg opacity-95 transition-all duration-300 flex flex-row items-stretch min-h-[350px] animate-fadeIn ${
          isCollapsed 
            ? "w-12 sm:w-14 md:w-full cursor-pointer md:cursor-default select-none md:select-text pl-0 md:pl-12 md:sm:pl-14" 
            : "w-full pl-12 sm:pl-14"
        }`}
        style={{
          boxShadow: isCollapsed 
            ? "6px 6px 0 #000, 9px 9px 0 rgba(215, 38, 61, 0.15), 0 10px 20px rgba(0,0,0,0.5)" 
            : "10px 10px 0 #000, 14px 14px 0 rgba(215, 38, 61, 0.25), 0 20px 40px -10px rgba(215, 38, 61, 0.2)",
          background: "#021e25"
        }}
      >
        {/* Absolute Docked Left Banner for perfect full-height alignment */}
        <div 
          onClick={(e) => { 
            if (!isCollapsed && typeof window !== 'undefined' && window.innerWidth < 768) {
              e.stopPropagation();
              onToggleCollapse?.(); 
            }
          }}
          className={`absolute left-0 top-0 bottom-0 w-12 sm:w-14 bg-[#D7263D] flex items-center justify-center shrink-0 select-none border-r-4 border-black z-20 ${
            isCollapsed 
              ? "cursor-pointer" 
              : "cursor-pointer hover:bg-[#ff3b51] transition-colors"
          }`}
        >
          <span 
            className="font-[var(--font-bangers)] text-lg sm:text-xl text-black uppercase tracking-widest whitespace-nowrap"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", display: "block" }}
          >
            PRÓXIMAMENTE
          </span>
          {isCollapsed && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-black font-bold text-sm animate-pulse md:hidden">
              ◀
            </div>
          )}
        </div>

        {/* Premium Gold Halftone Dots for background texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07] z-0"
          style={{
            backgroundImage: "radial-gradient(circle, #D7263D 1.5px, transparent 1.5px)",
            backgroundSize: "12px 12px",
          }}
        />

        <div className={isCollapsed ? "hidden md:flex flex-1 p-6 sm:p-8 flex-col justify-between h-full relative z-10" : "flex-1 p-6 sm:p-8 flex flex-col justify-between h-full relative z-10"}>
          {/* Main content stack */}
          <div className="flex flex-col gap-6 items-center justify-between h-full w-full relative z-10">
            <div className="flex flex-col items-center text-center w-full">
              {saga.cover && (
                <div 
                  className="relative shrink-0 w-36 sm:w-40 aspect-[3/4] border-4 border-white overflow-hidden rounded bg-zinc-900 shadow-[6px_6px_0_#D7263D] group cursor-zoom-in"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCoverClick?.(getComicPageUrl(saga.cover));
                  }}
                >
                  <img 
                    src={getComicPageUrl(saga.cover)} 
                    alt={`Portada de la saga ${saga.title}`} 
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
              )}
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2 justify-center">
                  <img 
                    src="/comic-book-white.webp" 
                    alt="Saga Icon" 
                    className="w-5 h-5 object-contain" 
                  />
                  <span
                    className="tag text-[10px] font-[var(--font-bangers)] tracking-widest px-2 py-0.5 border-2 border-white"
                    style={{ background: colorPrimary, color: getTextColor(colorPrimary) }}
                  >
                    SAGA
                  </span>
                  <span className="tag text-[10px] font-[var(--font-bangers)] tracking-widest px-2 py-0.5 border-2 border-black bg-[#D7263D] text-black shadow-[1px_1px_0_#000]">
                    EN CAMINO
                  </span>
                </div>
                <h2 className="font-[var(--font-bangers)] text-2xl sm:text-3xl leading-none tracking-wider mb-2 text-white"
                  style={{ textShadow: "2px 2px 0 #D7263D" }}>
                  {saga.title}
                </h2>
                <div 
                  className={`font-sans text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl transition-all duration-300 mt-2 ${
                    showDescription ? "block" : "hidden lg:block"
                  }`}
                >
                  {saga.description}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDescription(!showDescription);
                  }}
                  className="lg:hidden text-[10px] font-sans font-bold underline hover:no-underline text-[#D7263D] mt-2 tracking-wide uppercase cursor-pointer"
                >
                  {showDescription ? "Ocultar Sinopsis ▲" : "Leer Sinopsis ▼"}
                </button>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowChapters(!showChapters);
              }}
              className="font-[var(--font-bangers)] text-sm tracking-wider px-5 py-2.5 border-2 border-[#D7263D] bg-[#D7263D] hover:bg-[#ff3b51] text-black uppercase transition-all shadow-[3px_3px_0_#000] active:translate-y-0.5 active:translate-x-0.5 cursor-pointer flex items-center gap-2 mt-4"
            >
              <img 
                src="/comic-page.webp" 
                alt="Icon" 
                className="w-4 h-4 object-contain" 
              />
              {showChapters ? "Ocultar Avance" : "Ver Episodios Planeados"}
            </button>
          </div>

          {/* Chapters list inside collapsible accordion */}
          <AnimatePresence>
            {showChapters && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden relative z-10 w-full"
              >
                <div className="border-t-2 border-dashed border-white/20 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <img 
                      src="/comic-page-white.webp" 
                      alt="Page" 
                      className="w-5 h-5 object-contain" 
                    />
                    <h4 className="font-[var(--font-bangers)] text-lg tracking-wider text-white">
                      EPISODIOS PROYECTADOS
                    </h4>
                    <div className="h-[1px] flex-1 bg-white/20" />
                  </div>

                  <div className="grid grid-cols-1 gap-4 items-stretch">
                    {saga.chapters.map((chapter: any, ci: number) => {
                      return (
                        <ChapterCard
                          key={chapter.id}
                          chapter={chapter}
                          sagaId={saga.id}
                          sagaColor={colorPrimary}
                          index={ci}
                          isLocked={true}
                          sagaCover={saga.cover}
                          isSagaProximamente={true}
                        />
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  if (isFeatured) {
    if (isNuevo) {
      return (
        <div 
          className="border-4 border-black relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.002] flex flex-col animate-fadeIn"
          style={{
            boxShadow: "10px 10px 0 #001419, 14px 14px 0 #D7263D, 0 25px 50px -12px rgba(0, 184, 212, 0.35)",
            background: "#ecf7f8"
          }}
        >
          {/* Horizontal Banner for nuevo - un poco más grande */}
          <div 
            className="w-full bg-[#D7263D] text-white border-b-4 border-black py-4 px-4 flex items-center justify-center font-[var(--font-bangers)] text-xl sm:text-2xl tracking-widest select-none shadow-md"
          >
            ¡ÚLTIMO LANZAMIENTO!
          </div>

          <div className="p-6 sm:p-8 relative z-10 flex flex-col justify-between">
            {/* Halftone pop-art highly visible background pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.06] z-0"
              style={{
                backgroundImage: "radial-gradient(circle, #D7263D 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />
            
            {/* Main content split */}
            <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-stretch w-full relative z-10">
              {saga.cover && (
                <div 
                  className="relative shrink-0 w-40 sm:w-44 aspect-[3/4] border-4 border-[#001419] overflow-hidden rounded bg-zinc-900 shadow-[6px_6px_0_rgba(10,10,15,1)] group cursor-zoom-in self-center"
                  onClick={() => onCoverClick?.(getComicPageUrl(saga.cover))}
                >
                  <img 
                    src={getComicPageUrl(saga.cover)} 
                    alt={`Portada de la saga ${saga.title}`} 
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001419]/40 via-transparent to-transparent pointer-events-none" />
                </div>
              )}
              <div className="flex-1 flex flex-col justify-between items-center lg:items-start text-center lg:text-left py-1">
                <div>
                  <div className="flex items-center gap-2 mb-2 justify-center lg:justify-start">
                    <img 
                      src="/comic-book.webp" 
                      alt="Saga Icon" 
                      className="w-5 h-5 object-contain" 
                    />
                    <span
                      className="tag text-[10px] font-[var(--font-bangers)] tracking-widest px-2 py-0.5 border-2 border-black"
                      style={{ background: colorPrimary, color: getTextColor(colorPrimary) }}
                    >
                      SAGA
                    </span>
                    <span className="tag text-[10px] font-[var(--font-bangers)] tracking-widest px-2 py-0.5 border-2 border-black bg-[#D7263D] text-white shadow-[1px_1px_0_#D7263D] animate-bounce">
                      ¡NUEVA!
                    </span>
                  </div>
                  <h2
                    className="font-[var(--font-bangers)] text-2xl sm:text-4xl leading-none tracking-wider mb-2 text-[#001419]"
                    style={{ textShadow: `2px 2px 0 rgba(15, 32, 66, 0.15)` }}
                  >
                    {saga.title}
                  </h2>
                  <div className="font-sans text-xs sm:text-sm text-gray-800 leading-relaxed max-w-md">
                    {saga.description}
                  </div>
                </div>

                <button
                  onClick={() => setShowChapters(!showChapters)}
                  className="font-[var(--font-bangers)] text-sm tracking-wider px-5 py-2.5 border-2 border-[#001419] uppercase transition-all shadow-[3px_3px_0_#001419] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0_#001419] cursor-pointer flex items-center gap-2 mt-4"
                  style={{ 
                    background: colorPrimary, 
                    color: getTextColor(colorPrimary)
                  }}
                >
                  <img 
                    src={buttonIconSrc} 
                    alt="Boom" 
                    className={`w-4 h-4 object-contain transition-transform duration-300 ${showChapters ? "rotate-45" : ""}`} 
                  />
                  {showChapters ? "Ocultar Episodios" : "Ver Episodios"}
                </button>
              </div>
            </div>

            {/* Chapters list inside collapsible accordion */}
            <AnimatePresence>
              {showChapters && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden relative z-10 w-full"
                >
                  <div className="border-t-2 border-dashed border-[#001419]/20 pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <img 
                        src="/comic-page.webp" 
                        alt="Page" 
                        className="w-5 h-5 object-contain" 
                      />
                      <h4 className="font-[var(--font-bangers)] text-lg tracking-wider text-[#001419]">
                        EPISODIOS DISPONIBLES
                      </h4>
                      <div className="h-[1px] flex-1 bg-[#001419]/10" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
                      {saga.chapters.map((chapter: any, ci: number) => {
                        let isLocked = false;
                        if (isClient && !unlockAll) {
                          if (ci === 0) {
                            isLocked = false;
                          } else {
                            isLocked = !readChapters.includes(saga.chapters[ci - 1].id);
                          }
                        }
                        return (
                          <ChapterCard
                            key={chapter.id}
                            chapter={chapter}
                            sagaId={saga.id}
                            sagaColor={colorPrimary}
                            index={ci}
                            isLocked={isLocked}
                            sagaCover={saga.cover}
                          />
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      );
    } else {
      return (
        <div 
          className="border-4 border-[#001419] relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.002] flex flex-col animate-fadeIn"
          style={{
            boxShadow: `8px 8px 0 #001419, 12px 12px 0 ${colorSecondary}, 0 25px 50px -12px ${colorPrimary}35`,
            background: "#ecf7f8"
          }}
        >
          <div className="p-6 sm:p-8 relative z-10 flex flex-col justify-between">
            {/* Halftone pop-art highly visible background pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.06] z-0"
              style={{
                backgroundImage: "radial-gradient(circle, #001419 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />
            
            {/* Main content split */}
            <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-stretch w-full relative z-10">
              {saga.cover && (
                <div 
                  className="relative shrink-0 w-40 sm:w-44 aspect-[3/4] border-4 border-[#001419] overflow-hidden rounded bg-zinc-900 shadow-[6px_6px_0_rgba(10,10,15,1)] group cursor-zoom-in self-center"
                  onClick={() => onCoverClick?.(getComicPageUrl(saga.cover))}
                >
                  <img 
                    src={getComicPageUrl(saga.cover)} 
                    alt={`Portada de la saga ${saga.title}`} 
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001419]/40 via-transparent to-transparent pointer-events-none" />
                </div>
              )}
              <div className="flex-1 flex flex-col justify-between items-center lg:items-start text-center lg:text-left py-1">
                <div>
                  <div className="flex items-center gap-2 mb-2 justify-center lg:justify-start">
                    <img 
                      src="/comic-book.webp" 
                      alt="Saga Icon" 
                      className="w-5 h-5 object-contain" 
                    />
                    <span
                      className="tag text-[10px] font-[var(--font-bangers)] tracking-widest px-2 py-0.5 border-2 border-black"
                      style={{ background: colorPrimary, color: getTextColor(colorPrimary) }}
                    >
                      SAGA
                    </span>
                    {/* Badge de color secundario si se define en saga.json */}
                    {colorSecondary && (
                      <span
                        className="tag text-[10px] font-[var(--font-bangers)] tracking-widest px-2 py-0.5 border-2 border-black"
                        style={{
                          background: colorSecondary,
                          color: getTextColor(colorSecondary),
                          boxShadow: `1px 1px 0 ${colorSecondary}88`
                        }}
                      >
                        ALT
                      </span>
                    )}
                  </div>
                  <h2
                    className="font-[var(--font-bangers)] text-2xl sm:text-3xl leading-none tracking-wider mb-2 text-[#001419]"
                    style={{ textShadow: `2px 2px 0 rgba(10, 10, 15, 0.05)` }}
                  >
                    {saga.title}
                  </h2>
                  <div className="font-sans text-xs sm:text-sm text-gray-800 leading-relaxed max-w-md">
                    {saga.description}
                  </div>
                </div>

                <button
                  onClick={() => setShowChapters(!showChapters)}
                  className="font-[var(--font-bangers)] text-sm tracking-wider px-5 py-2.5 border-2 border-[#001419] uppercase transition-all shadow-[3px_3px_0_#001419] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0_#001419] cursor-pointer flex items-center gap-2 mt-4"
                  style={{ 
                    background: colorPrimary, 
                    color: getTextColor(colorPrimary)
                  }}
                >
                  <img 
                    src={buttonIconSrc} 
                    alt="Boom" 
                    className={`w-4 h-4 object-contain transition-transform duration-300 ${showChapters ? "rotate-45" : ""}`} 
                  />
                  {showChapters ? "Ocultar Episodios" : "Ver Episodios"}
                </button>
              </div>
            </div>

            {/* Chapters list inside collapsible accordion */}
            <AnimatePresence>
              {showChapters && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden relative z-10 w-full"
                >
                  <div className="border-t-2 border-dashed border-[#001419]/20 pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <img 
                        src="/comic-page.webp" 
                        alt="Page" 
                        className="w-5 h-5 object-contain" 
                      />
                      <h4 className="font-[var(--font-bangers)] text-lg tracking-wider text-[#001419]">
                        EPISODIOS DISPONIBLES
                      </h4>
                      <div className="h-[1px] flex-1 bg-[#001419]/10" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
                      {saga.chapters.map((chapter: any, ci: number) => {
                        let isLocked = false;
                        if (isClient && !unlockAll) {
                          if (ci === 0) {
                            isLocked = false;
                          } else {
                            isLocked = !readChapters.includes(saga.chapters[ci - 1].id);
                          }
                        }
                        return (
                          <ChapterCard
                            key={chapter.id}
                            chapter={chapter}
                            sagaId={saga.id}
                            sagaColor={colorPrimary}
                            index={ci}
                            isLocked={isLocked}
                            sagaCover={saga.cover}
                          />
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      );
    }
  }

  const containerClass = isNuevo
    ? "border-4 border-black p-6 sm:p-10 relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.005]"
    : isProximamente
      ? "border-4 border-dashed border-[#D7263D] bg-[#021e25] p-6 sm:p-10 relative overflow-hidden rounded-lg opacity-90 transition-opacity hover:opacity-100"
      : "border-4 border-[#001419] bg-[#ecf7f8] p-6 sm:p-10 relative overflow-hidden rounded-lg";

  return (
    <div 
      className={containerClass}
      style={{
        boxShadow: isNuevo 
          ? "10px 10px 0 #001419, 14px 14px 0 #D7263D, 0 25px 50px -12px rgba(0, 184, 212, 0.35)" 
          : isProximamente 
            ? "10px 10px 0 #000, 14px 14px 0 rgba(215, 38, 61, 0.25), 0 20px 40px -10px rgba(215, 38, 61, 0.2)"
            : `8px 8px 0 #001419, 12px 12px 0 ${colorSecondary}, 0 25px 50px -12px ${colorPrimary}35`,
        background: isProximamente
          ? "#021e25"
          : "#ecf7f8"
      }}
    >
      {/* Halftone pop-art highly visible background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] z-0"
        style={{
          backgroundImage: isProximamente
            ? "radial-gradient(circle, #D7263D 1.5px, transparent 1.5px)"
            : "radial-gradient(circle, #001419 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* Retro sticker/banner highlights */}
      {isNuevo && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-[#D7263D] text-white font-[var(--font-bangers)] text-xs sm:text-sm px-3.5 py-1.5 uppercase tracking-widest border-2 border-black shadow-[3px_3px_0_#D7263D] z-20 rotate-[3deg] select-none animate-pulse">
          ¡ÚLTIMO LANZAMIENTO!
        </div>
      )}

      {isProximamente && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-[#D7263D] text-black font-[var(--font-bangers)] text-xs sm:text-sm px-3.5 py-1.5 uppercase tracking-widest border-2 border-black shadow-[3px_3px_0_#000] z-20 -rotate-[3deg] select-none">
          PRÓXIMAMENTE
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 sm:gap-12 relative z-10">
        {saga.cover && (
          <div 
            className="relative shrink-0 w-64 sm:w-80 aspect-[3/4] border-4 border-[#001419] overflow-hidden rounded bg-zinc-900 shadow-[8px_8px_0_rgba(10,10,15,1)] group cursor-zoom-in"
            style={{ transform: isEven ? "rotate(-1.5deg)" : "rotate(1.5deg)" }}
            onClick={() => onCoverClick?.(getComicPageUrl(saga.cover))}
          >
            <img 
              src={getComicPageUrl(saga.cover)} 
              alt={`Portada de la saga ${saga.title}`} 
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001419]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-between text-center lg:text-left items-center lg:items-start py-2">
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/comic-book.webp" 
                alt="Saga Icon" 
                className="w-6 h-6 object-contain" 
              />
              <span
                className="tag text-xs font-[var(--font-bangers)] tracking-widest px-2.5 py-0.5 border-2 border-black"
                style={{ background: colorPrimary, color: getTextColor(colorPrimary) }}
              >
                SAGA
              </span>
              {/* Badge de color secundario si se define en saga.json */}
              {colorSecondary && !isNuevo && !isProximamente && (
                <span
                  className="tag text-xs font-[var(--font-bangers)] tracking-widest px-2.5 py-0.5 border-2 border-black"
                  style={{
                    background: colorSecondary,
                    color: getTextColor(colorSecondary),
                    boxShadow: `2px 2px 0 ${colorSecondary}88`
                  }}
                >
                  ALT
                </span>
              )}
              {isNuevo && (
                <span className="tag text-xs font-[var(--font-bangers)] tracking-widest px-2.5 py-0.5 border-2 border-black bg-[#D7263D] text-white shadow-[2px_2px_0_#D7263D] animate-bounce">
                  ¡NUEVA!
                </span>
              )}
              {isProximamente && (
                <span className="tag text-xs font-[var(--font-bangers)] tracking-widest px-2.5 py-0.5 border-2 border-black bg-[#D7263D] text-black shadow-[2px_2px_0_#000]">
                  EN CAMINO
                </span>
              )}
            </div>
            <h2
              className="font-[var(--font-bangers)] text-4xl sm:text-6xl leading-none tracking-wider mb-4"
              style={{ color: "#001419", textShadow: `3px 3px 0 ${colorSecondary}44` }}
            >
              {saga.title}
            </h2>
            <div className="font-sans text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mb-6">
              {saga.description}
            </div>
          </div>

          <button
            onClick={() => setShowChapters(!showChapters)}
            className="font-[var(--font-bangers)] text-lg sm:text-xl tracking-wider px-8 py-3.5 border-4 border-[#001419] uppercase transition-all shadow-[4px_4px_0_#001419] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[2px_2px_0_#001419] cursor-pointer flex items-center gap-3 mt-4"
            style={{ 
              background: isProximamente ? "#475569" : colorPrimary, 
              color: isProximamente ? "#ffffff" : getTextColor(colorPrimary),
              borderColor: isProximamente ? "#0f172a" : "#001419"
            }}
          >
            <img 
              src={isProximamente ? "/comic-page.webp" : buttonIconSrc} 
              alt="Icon" 
              className={`w-6 h-6 object-contain transition-transform duration-300 ${showChapters ? "rotate-45" : ""}`} 
            />
            {isProximamente 
              ? (showChapters ? "Ocultar Avance" : "Ver Episodios Planeados")
              : (showChapters ? "Ocultar Episodios" : "Ver Episodios")
            }
          </button>
        </div>
      </div>

      {/* Chapters list inside collapsible accordion */}
      <AnimatePresence>
        {showChapters && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 40 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t-4 border-dashed border-[#001419]/20 pt-8">
              <div className="flex items-center gap-3 mb-8">
                <img 
                  src="/comic-page.webp" 
                  alt="Page" 
                  className="w-6 h-6 object-contain" 
                />
                <h4 className="font-[var(--font-bangers)] text-2xl tracking-wider text-[#001419]">
                  {isProximamente ? "EPISODIOS PROYECTADOS" : "EPISODIOS DISPONIBLES"}
                </h4>
                <div className="h-[2px] flex-1 bg-[#001419]/10" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {saga.chapters.map((chapter: any, ci: number) => {
                  let isLocked = false;
                  if (isClient && !unlockAll) {
                    if (isProximamente) {
                      isLocked = true;
                    } else if (ci === 0) {
                      isLocked = false; // El capítulo #1 de cada saga siempre está desbloqueado
                    } else {
                      isLocked = !readChapters.includes(saga.chapters[ci - 1].id);
                    }
                  }
                  return (
                    <ChapterCard
                      key={chapter.id}
                      chapter={chapter}
                      sagaId={saga.id}
                      sagaColor={colorPrimary}
                      index={ci}
                      isLocked={isLocked}
                      sagaCover={saga.cover}
                      isSagaProximamente={isProximamente}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox rendered at page level */}
    </div>
  );
}

/* ── CHAPTER CARD ── */
const ACCENTS = ["#D7263D", "#D7263D", "#D7263D", "#D7263D", "#D7263D"];

function ChapterCard({ chapter, sagaId, sagaColor, index, isLocked, sagaCover, isSagaProximamente }: {
  chapter: any;
  sagaId: string;
  sagaColor: string;
  index: number;
  isLocked: boolean;
  sagaCover?: string | null;
  isSagaProximamente?: boolean;
}) {
  const accent = ACCENTS[index % ACCENTS.length];
  const [cover, setCover] = useState<string | null>(null);

  useEffect(() => {
    if (isLocked) return;
    if (chapter.cover) {
      setCover(chapter.cover);
      return;
    }
    fetch(`/api/pages/${sagaId}/${chapter.id}`)
      .then(r => r.json())
      .then((d: { cover: string | null }) => {
        if (d.cover) setCover(d.cover);
      })
      .catch(() => {});
  }, [sagaId, chapter.id, isLocked, chapter.cover]);

  if (isLocked) {
    // Si el capítulo es draft, permitimos navegar para que aparezca el DraftLockScreen
    const isDraftChapter = chapter.draft;
    const cardContent = (
      <div
        className={`flex flex-col h-full overflow-hidden border-[3px] border-[#001419] ${isDraftChapter ? "cursor-pointer hover:scale-[1.01] transition-transform" : ""}`}
        style={{
          background: isDraftChapter ? "#003842" : "#e5e5eb",
          boxShadow: isDraftChapter ? "5px 5px 0 #D7263D" : "5px 5px 0 #001419",
        }}
      >
        {/* Cover image area locked */}
        <div
          className="relative w-full overflow-hidden shrink-0 flex items-center justify-center"
          style={{
            aspectRatio: "3/4",
            background: `repeating-linear-gradient(45deg, #003842, #003842 10px, #063f49 10px, #063f49 20px)`,
          }}
        >
          {(chapter.cover || sagaCover) && (
            <img
              src={getComicPageUrl(chapter.cover || sagaCover)}
              alt={`Portada de ${chapter.title}`}
              className="absolute inset-0 w-full h-full object-cover object-top opacity-30 grayscale filter blur-[1px] brightness-[0.25]"
            />
          )}
          <div className="absolute inset-0 speed-lines opacity-20" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${isDraftChapter ? "bg-[#D7263D]/20 border-[#D7263D]/50 text-[#D7263D]" : "bg-white/10 border-white/20 text-white/80"}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2.5" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className={`font-[var(--font-bangers)] text-lg tracking-widest uppercase ${isDraftChapter ? "text-[#D7263D]" : "text-white/60"}`}>
              {isDraftChapter ? "DRAFT" : "Bloqueado"}
            </span>
          </div>
        </div>

        {/* Info strip */}
        <div className={`flex-1 p-4 flex flex-col justify-between gap-3 ${isDraftChapter ? "bg-[#021e25]" : "bg-[#eef0f4]"}`}>
          <div>
            <p className={`font-[var(--font-bangers)] text-xs tracking-[0.2em] uppercase mb-1 ${isDraftChapter ? "text-[#D7263D]/60" : "text-gray-400"}`}>
              {saga_label(index)}
            </p>
            <h3 className={`font-[var(--font-bangers)] text-2xl sm:text-3xl leading-tight uppercase tracking-wide ${isDraftChapter ? "text-white/70" : "text-gray-400"}`}>
              {chapter.title}
            </h3>
            <p className={`font-[var(--font-sans)] text-xs mt-1 ${isDraftChapter ? "text-[#D7263D]/70" : "text-gray-500"}`}>
              {isDraftChapter
                ? "Borrador — ingresá la contraseña para previsualizar."
                : isSagaProximamente
                  ? "Este capítulo estará disponible próximamente."
                  : "Leé el capítulo anterior para poder desbloquear este."}
            </p>
          </div>
          {isDraftChapter && (
            <div className="text-[10px] font-[var(--font-bangers)] tracking-widest text-[#D7263D] uppercase flex items-center gap-1">
              <span>🔑</span> Acceso con contraseña →
            </div>
          )}
          {!isDraftChapter && <div className="h-1 w-12 bg-gray-300" />}
        </div>
      </div>
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.08 }}
        whileHover={{ y: -4, scale: 1.01 }}
        className={`h-full ${isDraftChapter ? "" : "select-none cursor-not-allowed"}`}
      >
        {isDraftChapter ? (
          <Link href={`/chapters/${chapter.id}`} className="block h-full">
            {cardContent}
          </Link>
        ) : cardContent}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.08 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full"
    >
      <Link
        href={`/chapters/${chapter.id}`}
        className="group flex flex-col h-full panel panel-lg overflow-hidden"
        style={{ background: "white" }}
      >
        {/* Cover image — fixed aspect ratio so all cards are the same height */}
        <div
          className="relative w-full overflow-hidden shrink-0"
          style={{
            aspectRatio: "3/4",
            background: (cover || chapter.cover || sagaCover)
              ? "#001419"
              : `linear-gradient(145deg, #001419 0%, ${accent}33 100%)`,
          }}
        >
          {/* Actual cover image */}
          {(cover || chapter.cover || sagaCover) && (
            <img
              src={getComicPageUrl(cover || chapter.cover || sagaCover || undefined)}
              alt={`Portada de ${chapter.title}`}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {/* Overlay gradient always present */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: (cover || chapter.cover || sagaCover)
                ? "linear-gradient(to top, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.1) 50%, transparent 100%)"
                : undefined,
            }}
          />

          {/* No-cover placeholder */}
          {!(cover || chapter.cover || sagaCover) && (
            <div className="absolute inset-0 flex items-center justify-center z-10 speed-lines opacity-30" />
          )}

          {/* Borrador Badge */}
          {chapter.draft && (
            <div
              className="absolute top-3 right-3 z-30 font-[var(--font-bangers)] text-sm px-2.5 py-0.5 tracking-wider rotate-[6deg] animate-pulse"
              style={{
                background: "#D7263D",
                color: "#001419",
                border: "2px solid #001419",
                boxShadow: "3px 3px 0 #D7263D",
              }}
            >
              Borrador
            </div>
          )}

          {/* Hover CTA overlay */}
          <div
            className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250"
            style={{ background: "rgba(10,10,15,0.5)" }}
          >
            <span
              className="font-[var(--font-bangers)] text-2xl text-white px-6 py-2.5 tracking-widest"
              style={{ background: accent, border: "3px solid white", boxShadow: "4px 4px 0 rgba(0,0,0,0.5)" }}
            >
              LEER →
            </span>
          </div>
        </div>

        {/* Info strip — grows to fill, keeps cards same height */}
        <div className="flex-1 p-4 flex flex-col justify-between gap-3">
          <div>
            <p
              className="font-[var(--font-bangers)] text-xs tracking-[0.2em] uppercase mb-1"
              style={{ color: sagaColor }}
            >
              {saga_label(index)}
            </p>
            <h3 className="font-[var(--font-bangers)] text-2xl sm:text-3xl leading-tight uppercase tracking-wide text-[#001419]">
              {chapter.title}
            </h3>
          </div>
          {/* Bottom accent bar */}
          <div className="h-1 w-12" style={{ background: accent }} />
        </div>
      </Link>
    </motion.div>
  );
}

function saga_label(index: number) {
  const labels = ["Primer número", "Segundo número", "Tercer número", "Cuarto número", "Quinto número"];
  return labels[index] ?? `Número ${index + 1}`;
}





