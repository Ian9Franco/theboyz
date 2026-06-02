"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SagaBlock({ saga, index }: { saga: any; index: number }) {
  const isEven = index % 2 === 0;

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
        {saga.chapters.map((chapter: any, ci: number) => (
          <ChapterCard
            key={chapter.id}
            chapter={chapter}
            sagaId={saga.id}
            sagaColor={saga.color}
            index={ci}
          />
        ))}
      </div>
    </div>
  );
}

/* ── CHAPTER CARD ── */
const ACCENTS = ["#e8185a", "#00b8d4", "#f5e642", "#6d28d9", "#f97316"];

function ChapterCard({ chapter, sagaId, sagaColor, index }: {
  chapter: any;
  sagaId: string;
  sagaColor: string;
  index: number;
}) {
  const accent = ACCENTS[index % ACCENTS.length];
  const [cover, setCover] = useState<string | null>(null);

  // Fetch the first page or the explicit "portada" image to use as cover
  useEffect(() => {
    fetch(`/api/pages/${sagaId}/${chapter.id}`)
      .then(r => r.json())
      .then((d: { pages: string[]; cover: string | null }) => {
        if (d.cover) setCover(d.cover);
      })
      .catch(() => {});
  }, [sagaId, chapter.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
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
