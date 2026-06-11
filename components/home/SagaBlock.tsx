"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SagaBlock({ saga, index, prevSaga }: { saga: any; index: number; prevSaga?: any }) {
  const isEven = index % 2 === 0;
  const [readChapters, setReadChapters] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [unlockAll, setUnlockAll] = useState(false);

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

  return (
    <div>
      {/* Saga header */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 18 }}
        className="mb-3 flex flex-col sm:flex-row sm:items-end gap-4 flex-wrap"
      >
        <div>
          <span
            className="tag text-xs mb-2 block w-fit"
            style={{ background: saga.color, color: "white", borderColor: "#0a0a0f" }}
          >
            Saga
          </span>
          <h2
            className="font-[var(--font-bangers)] text-5xl sm:text-7xl leading-none tracking-wider"
            style={{ color: "#0a0a0f", textShadow: `3px 3px 0 ${saga.color}44` }}
          >
            {saga.title}
          </h2>
        </div>
        <div className="caption text-base sm:text-lg max-w-xs" style={{ transform: "rotate(-1deg)" }}>
          {saga.description}
        </div>
      </motion.div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-10">
        <div className="h-[3px] flex-1" style={{ background: "#0a0a0f" }} />
        <div className="w-3 h-3 rotate-45" style={{ background: saga.color }} />
      </div>

      {/* Cards — uniform grid */}
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
            />
          );
        })}
      </div>
    </div>
  );
}

/* ── CHAPTER CARD ── */
const ACCENTS = ["#e8185a", "#00b8d4", "#f5e642", "#6d28d9", "#f97316"];

function ChapterCard({ chapter, sagaId, sagaColor, index, isLocked }: {
  chapter: any;
  sagaId: string;
  sagaColor: string;
  index: number;
  isLocked: boolean;
}) {
  const accent = ACCENTS[index % ACCENTS.length];
  const [cover, setCover] = useState<string | null>(null);

  // Fetch the first page or the explicit "portada" image to use as cover
  useEffect(() => {
    if (isLocked) return;
    fetch(`/api/pages/${sagaId}/${chapter.id}`)
      .then(r => r.json())
      .then((d: { pages: string[]; cover: string | null }) => {
        if (d.cover) setCover(d.cover);
      })
      .catch(() => {});
  }, [sagaId, chapter.id, isLocked]);

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

            {/* Issue number badge */}
            <div
              className="absolute top-3 left-3 z-30 font-[var(--font-bangers)] text-xl px-2.5 py-0.5"
              style={{ background: "#0a0a0f", color: "white", border: "2px solid #0a0a0f", boxShadow: "2px 2px 0 #0a0a0f" }}
            >
              #{chapter.number}
            </div>
          </div>

          {/* Info strip */}
          <div className="flex-1 p-4 flex flex-col justify-between gap-3 bg-[#eef0f4]">
            <div>
              <p className="font-[var(--font-bangers)] text-xs tracking-[0.2em] uppercase mb-1 text-gray-400">
                {saga_label(index)}
              </p>
              <h3 className="font-[var(--font-bangers)] text-2xl sm:text-3xl leading-tight uppercase tracking-wide text-gray-400">
                Capítulo {chapter.number}
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
            background: cover
              ? "#0a0a0f"
              : `linear-gradient(145deg, #0a0a0f 0%, ${accent}33 100%)`,
          }}
        >
          {/* Actual cover image */}
          {cover && (
            <img
              src={cover}
              alt={`Portada de ${chapter.title}`}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {/* Overlay gradient always present */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: cover
                ? "linear-gradient(to top, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.1) 50%, transparent 100%)"
                : undefined,
            }}
          />

          {/* No-cover placeholder */}
          {!cover && (
            <div className="absolute inset-0 flex items-center justify-center z-10 speed-lines opacity-30" />
          )}
          {!cover && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <span
                className="font-[var(--font-bangers)] text-[clamp(4rem,12vw,7rem)] leading-none text-white"
                style={{ WebkitTextStroke: `3px ${accent}`, textShadow: `0 0 60px ${accent}55` }}
              >
                #{chapter.number}
              </span>
            </div>
          )}

          {/* Issue number badge */}
          <div
            className="absolute top-3 left-3 z-30 font-[var(--font-bangers)] text-xl px-2.5 py-0.5"
            style={{ background: accent, color: accent === "#f5e642" ? "#0a0a0f" : "white", border: "2px solid #0a0a0f", boxShadow: "2px 2px 0 #0a0a0f" }}
          >
            #{chapter.number}
          </div>

          {/* Borrador Badge */}
          {chapter.draft && (
            <div
              className="absolute top-3 right-3 z-30 font-[var(--font-bangers)] text-sm px-2.5 py-0.5 tracking-wider rotate-[6deg] animate-pulse"
              style={{
                background: "#f5e642",
                color: "#0a0a0f",
                border: "2px solid #0a0a0f",
                boxShadow: "3px 3px 0 #e8185a",
              }}
            >
              ⚠️ Borrador
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
