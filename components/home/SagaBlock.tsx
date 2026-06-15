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
  return yiq >= 140 ? "#0a0a0f" : "white";
}

export function SagaBlock({ 
  saga, 
  index, 
  prevSaga,
  onCoverClick 
}: { 
  saga: any; 
  index: number; 
  prevSaga?: any;
  onCoverClick?: (coverUrl: string) => void;
}) {
  const isEven = index % 2 === 0;
  const [readChapters, setReadChapters] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [unlockAll, setUnlockAll] = useState(false);
  const [showChapters, setShowChapters] = useState(false);

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

  const isLightBg = getTextColor(saga.color) === "#0a0a0f";
  const buttonIconSrc = isLightBg ? "/boom.png" : "/boom-white.png";

  return (
    <div className="border-4 border-[#0a0a0f] bg-white p-6 sm:p-10 shadow-[8px_8px_0_#1b4332] relative overflow-hidden rounded-lg">
      {/* Halftone pop-art subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #0f2042 1.5px, transparent 1.5px)",
          backgroundSize: "10px 10px",
        }}
      />

      <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 sm:gap-12 relative z-10">
        {saga.cover && (
          <div 
            className="relative shrink-0 w-64 sm:w-80 aspect-[3/4] border-4 border-[#0a0a0f] overflow-hidden rounded bg-zinc-900 shadow-[8px_8px_0_rgba(10,10,15,1)] group cursor-zoom-in"
            style={{ transform: isEven ? "rotate(-1.5deg)" : "rotate(1.5deg)" }}
            onClick={() => onCoverClick?.(getComicPageUrl(saga.cover))}
          >
            <img 
              src={getComicPageUrl(saga.cover)} 
              alt={`Portada de la saga ${saga.title}`} 
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-between text-center lg:text-left items-center lg:items-start py-2">
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/comic-book.png" 
                alt="Saga Icon" 
                className="w-6 h-6 object-contain" 
              />
              <span
                className="tag text-xs font-[var(--font-bangers)] tracking-widest px-2.5 py-0.5 border-2 border-black"
                style={{ background: saga.color, color: getTextColor(saga.color) }}
              >
                SAGA
              </span>
            </div>
            <h2
              className="font-[var(--font-bangers)] text-4xl sm:text-6xl leading-none tracking-wider mb-4"
              style={{ color: "#0a0a0f", textShadow: `3px 3px 0 ${saga.color}44` }}
            >
              {saga.title}
            </h2>
            <div className="font-sans text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mb-6">
              {saga.description}
            </div>
          </div>

          <button
            onClick={() => setShowChapters(!showChapters)}
            className="font-[var(--font-bangers)] text-lg sm:text-xl tracking-wider px-8 py-3.5 border-4 border-[#0a0a0f] uppercase transition-all shadow-[4px_4px_0_#0a0a0f] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[2px_2px_0_#0a0a0f] cursor-pointer flex items-center gap-3 mt-4"
            style={{ 
              background: saga.color, 
              color: getTextColor(saga.color)
            }}
          >
            <img 
              src={buttonIconSrc} 
              alt="Boom" 
              className={`w-6 h-6 object-contain transition-transform duration-300 ${showChapters ? "rotate-45" : ""}`} 
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
            animate={{ opacity: 1, height: "auto", marginTop: 40 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t-4 border-dashed border-[#0a0a0f]/20 pt-8">
              <div className="flex items-center gap-3 mb-8">
                <img 
                  src="/comic-page.png" 
                  alt="Page" 
                  className="w-6 h-6 object-contain" 
                />
                <h4 className="font-[var(--font-bangers)] text-2xl tracking-wider text-[#0a0a0f]">
                  EPISODIOS DISPONIBLES
                </h4>
                <div className="h-[2px] flex-1 bg-[#0a0a0f]/10" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {saga.chapters.map((chapter: any, ci: number) => {
                  let isLocked = false;
                  if (isClient && !unlockAll) {
                    if (ci === 0) {
                      if (prevSaga) {
                        isLocked = !prevSaga.chapters.every((ch: any) => readChapters.includes(ch.id));
                      }
                    } else {
                      isLocked = !readChapters.includes(saga.chapters[ci - 1].id);
                    }
                  }
                  return (
                    <ChapterCard
                      key={chapter.id}
                      chapter={chapter}
                      sagaId={saga.id}
                      sagaColor={saga.color}
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

      {/* Lightbox rendered at page level */}
    </div>
  );
}

/* ── CHAPTER CARD ── */
const ACCENTS = ["#1b4332", "#00b8d4", "#f5e642", "#6d28d9", "#f97316"];

function ChapterCard({ chapter, sagaId, sagaColor, index, isLocked, sagaCover }: {
  chapter: any;
  sagaId: string;
  sagaColor: string;
  index: number;
  isLocked: boolean;
  sagaCover?: string | null;
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
    return (
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.08 }}
        whileHover={{ y: -4, scale: 1.01 }}
        className="h-full select-none cursor-not-allowed"
      >
        <div
          className="flex flex-col h-full overflow-hidden border-[3px] border-[#0a0a0f]"
          style={{
            background: "#e5e5eb",
            boxShadow: "5px 5px 0 #0a0a0f",
          }}
        >
          {/* Cover image area locked */}
          <div
            className="relative w-full overflow-hidden shrink-0 flex items-center justify-center"
            style={{
              aspectRatio: "3/4",
              background: `repeating-linear-gradient(45deg, #13131e, #13131e 10px, #2a2a35 10px, #2a2a35 20px)`,
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
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/80 border border-white/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-[var(--font-bangers)] text-lg text-white/60 tracking-widest uppercase">
                Bloqueado
              </span>
            </div>
          </div>

          {/* Info strip */}
          <div className="flex-1 p-4 flex flex-col justify-between gap-3 bg-[#eef0f4]">
            <div>
              <p className="font-[var(--font-bangers)] text-xs tracking-[0.2em] uppercase mb-1 text-gray-400">
                {saga_label(index)}
              </p>
              <h3 className="font-[var(--font-bangers)] text-2xl sm:text-3xl leading-tight uppercase tracking-wide text-gray-400">
                {chapter.title}
              </h3>
              <p className="font-[var(--font-sans)] text-xs text-gray-500 mt-1">
                Leé el capítulo anterior para poder desbloquear este.
              </p>
            </div>
            <div className="h-1 w-12 bg-gray-300" />
          </div>
        </div>
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
              ? "#0a0a0f"
              : `linear-gradient(145deg, #0a0a0f 0%, ${accent}33 100%)`,
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
                background: "#f5e642",
                color: "#0a0a0f",
                border: "2px solid #0a0a0f",
                boxShadow: "3px 3px 0 #1b4332",
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
            <h3 className="font-[var(--font-bangers)] text-2xl sm:text-3xl leading-tight uppercase tracking-wide text-[#0a0a0f]">
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
