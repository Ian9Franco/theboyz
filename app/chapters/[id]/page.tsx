"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { Lightbox as ReaderLightbox } from "@/components/reader/ReaderLightbox";

export default function ChapterPage() {
  const params  = useParams();
  const router  = useRouter();
  const id      = params.id as string;

  const [chapterData, setChapterData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [visiblePagesCount, setVisiblePagesCount] = useState(3);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisiblePagesCount((prev) => prev + 2);
        }
      },
      { rootMargin: "600px" }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [chapterData]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setIsLocked(false);
    setVisiblePagesCount(3);

    fetch(`/api/chapters/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setChapterData(data);
        setLoading(false);

        // Lock verification
        if (data.prevChapter) {
          try {
            const read = localStorage.getItem("read-chapters");
            const readList = read ? JSON.parse(read) : [];
            if (!readList.includes(data.prevChapter.id)) {
              setIsLocked(true);
              return; // Keep locked, do not mark current as read
            }
          } catch (e) {
            console.error(e);
          }
        }

        // Mark as read if not locked
        try {
          const read = localStorage.getItem("read-chapters");
          const readList = read ? JSON.parse(read) : [];
          if (!readList.includes(id)) {
            readList.push(id);
            localStorage.setItem("read-chapters", JSON.stringify(readList));
          }
        } catch (e) {
          console.error(e);
        }
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  // Load more pages automatically in Lightbox (vista grande)
  useEffect(() => {
    if (lightboxIndex !== null && lightboxIndex >= visiblePagesCount && chapterData?.pages) {
      const nextBatch = Math.ceil((lightboxIndex + 1) / 3) * 3;
      setVisiblePagesCount(Math.min(chapterData.pages.length, nextBatch));
    }
  }, [lightboxIndex, chapterData?.pages, visiblePagesCount]);

  if (!mounted) return null;

  if (error || (!loading && !chapterData)) {
    return (
      <div className="flex-1 flex items-center justify-center flex-col gap-6 p-8 text-center" style={{ background: "#0a0a0f" }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="panel panel-lg px-10 py-8 max-w-md text-center"
          style={{ borderColor: "#e8185a", boxShadow: "8px 8px 0 #e8185a" }}
        >
          <h1 className="font-[var(--font-bangers)] text-5xl md:text-7xl mb-4" style={{ color: "#e8185a", textShadow: "3px 3px 0 #0a0a0f" }}>
            404
          </h1>
          <p className="font-[var(--font-bangers)] text-2xl text-[#0a0a0f] mb-6 tracking-wider">
            Capítulo no encontrado
          </p>
          <button onClick={() => router.push("/")} className="btn btn-dark text-2xl">
            ← Volver al inicio
          </button>
        </motion.div>
      </div>
    );
  }

  if (loading) return <div className="flex-1" style={{ background: "#f4f0e6" }}><LoadingState /></div>;

  const { chapter, saga, pages, prevChapter, nextChapter } = chapterData;

  // Lock UI
  if (isLocked) {
    const handleUnlockThis = () => {
      try {
        const read = localStorage.getItem("read-chapters");
        const readList = read ? JSON.parse(read) : [];
        if (prevChapter && !readList.includes(prevChapter.id)) {
          readList.push(prevChapter.id);
        }
        if (!readList.includes(id)) {
          readList.push(id);
        }
        localStorage.setItem("read-chapters", JSON.stringify(readList));
      } catch (e) {
        console.error(e);
      }
      setIsLocked(false);
    };

    const handleUnlockAndNext = () => {
      try {
        const read = localStorage.getItem("read-chapters");
        const readList = read ? JSON.parse(read) : [];
        if (prevChapter && !readList.includes(prevChapter.id)) {
          readList.push(prevChapter.id);
        }
        if (!readList.includes(id)) {
          readList.push(id);
        }
        localStorage.setItem("read-chapters", JSON.stringify(readList));
      } catch (e) {
        console.error(e);
      }
      if (nextChapter) {
        setIsLocked(false);
        router.push(`/chapters/${nextChapter.id}`);
      } else {
        router.push("/");
      }
    };

    return (
      <div className="flex-1 flex items-center justify-center flex-col gap-6 p-8 min-h-[90vh]" style={{ background: "#0a0a0f" }}>
        <div className="absolute inset-0 speed-lines opacity-10 pointer-events-none" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="panel panel-lg px-8 py-10 max-w-md w-full text-center relative z-10"
          style={{ borderColor: "#e8185a", boxShadow: "8px 8px 0 #e8185a", background: "white" }}
        >
          {/* Padlock Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#e8185a]/10 flex items-center justify-center text-[#e8185a]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2.5" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <h1 className="font-[var(--font-bangers)] text-4xl md:text-5xl mb-4 text-[#0a0a0f] tracking-wider leading-none">
            ¡SPOILER WARNING!
          </h1>
          <p className="font-[var(--font-marker)] text-lg text-[#e8185a] mb-6 uppercase tracking-wider">
            Capítulo Bloqueado
          </p>
          <p className="font-[var(--font-sans)] text-base text-[#0a0a0f] mb-8 leading-relaxed">
            Para leer el <strong>{chapter.title}</strong>, primero tenés que completar el capítulo anterior.
          </p>
          <div className="flex flex-col gap-3">
            {prevChapter && (
              <>
                <button
                  onClick={handleUnlockThis}
                  className="btn btn-yellow text-xl flex items-center justify-center gap-2"
                >
                  ⚡ Marcar leído y desbloquear este
                </button>
                {nextChapter && (
                  <button
                    onClick={handleUnlockAndNext}
                    className="btn btn-magenta text-xl flex items-center justify-center gap-2"
                  >
                    🚀 Marcar leído y ver el siguiente
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsLocked(false);
                    router.push(`/chapters/${prevChapter.id}`);
                  }}
                  className="btn btn-dark text-xl"
                >
                  ← Ir a leer {prevChapter.title}
                </button>
              </>
            )}
            <button
              onClick={() => router.push("/")}
              className="btn btn-dark text-xl"
            >
              Volver al Inicio
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1" style={{ background: "#f4f0e6" }}>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && pages.length > 0 && (
          <ReaderLightbox 
            src={pages[lightboxIndex]} 
            alt={`${chapter.title} — Página ${lightboxIndex + 1}`} 
            onClose={() => setLightboxIndex(null)}
            onNext={() => setLightboxIndex(lightboxIndex + 1)}
            onPrev={() => setLightboxIndex(lightboxIndex - 1)}
            hasNext={lightboxIndex < pages.length - 1}
            hasPrev={lightboxIndex > 0}
          />
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <div
        className="sticky top-0 z-50 bg-white"
        style={{ borderBottom: "3px solid #0a0a0f", boxShadow: "0 3px 0 #0a0a0f" }}
      >
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/" className="btn btn-dark text-base sm:text-lg shrink-0">
            ← Volver
          </Link>

          <div className="flex-1 text-center overflow-hidden">
            <div
              className="tag text-xs mb-0.5 block"
              style={{ background: saga.color, color: "white", borderColor: "#0a0a0f" }}
            >
              {saga.title}
            </div>
            <h1 className="font-[var(--font-bangers)] text-xl sm:text-3xl text-[#0a0a0f] leading-none truncate tracking-wider">
              {chapter.title}
            </h1>
          </div>

          <div
            className="shrink-0 font-[var(--font-bangers)] text-xl px-3 py-1 hidden sm:block"
            style={{ background: "#0a0a0f", color: "#f5e642", border: "2px solid #0a0a0f" }}
          >
            #{chapter.number}
          </div>
        </div>
      </div>

      {/* ── Page count banner ── */}
      {pages.length > 0 && (
        <div className="py-2.5 px-4 text-center" style={{ background: "#e8185a" }}>
          <span className="font-[var(--font-bangers)] text-white text-lg tracking-[0.2em]">
            {pages.length} páginas — click en cualquier imagen para hacer zoom
          </span>
        </div>
      )}

      {/* ── Content ── */}
      <div className="max-w-2xl mx-auto px-0 sm:px-6 py-4 sm:py-10">
        {pages.length === 0 && <EmptyState chapterTitle={chapter.title} sagaColor={saga.color} />}

        {pages.length > 0 && (
          <div className="flex flex-col gap-0 sm:gap-4">
            {pages.slice(0, visiblePagesCount).map((src: string, i: number) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative w-full group border-0 sm:border-[3px] border-[#0a0a0f] shadow-none sm:shadow-[5px_5px_0_#0a0a0f] bg-white"
              >
                <img
                  src={src}
                  alt={`${chapter.title} — Página ${i + 1}`}
                  className="w-full h-auto block"
                  loading="lazy"
                  style={{ cursor: "zoom-in", display: "block" }}
                  onClick={() => setLightboxIndex(i)}
                />
                {/* Page number */}
                <div
                  className="absolute bottom-0 right-0 font-[var(--font-bangers)] text-lg px-2.5 py-0.5"
                  style={{ background: "#0a0a0f", color: "#f5e642" }}
                >
                  {i + 1}
                </div>
                {/* Zoom hint on hover */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  style={{ background: "rgba(10,10,15,0.35)" }}
                >
                  <span
                    className="font-[var(--font-bangers)] text-white text-2xl tracking-widest px-5 py-2"
                    style={{ background: "#e8185a", border: "2px solid white" }}
                  >
                    🔍 Zoom
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More Sentinel */}
        {pages.length > visiblePagesCount && (
          <div ref={observerRef} className="h-10 w-full" />
        )}

        {/* ── Chapter Navigation ── */}
        <div className="mt-20 flex flex-col sm:flex-row gap-4 justify-between">
          {nextChapter ? (
            <Link href={`/chapters/${nextChapter.id}`} className="btn btn-magenta text-xl flex-1 text-center truncate px-2">
              {nextChapter.title} →
            </Link>
          ) : <div className="flex-1" />}
          {prevChapter ? (
            <Link href={`/chapters/${prevChapter.id}`} className="btn btn-dark text-xl flex-1 text-center truncate px-2">
              ← {prevChapter.title}
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </div>
    </div>
  );
}

/* ── Loading ── */
function LoadingState() {
  return (
    <div className="text-center py-32 flex flex-col items-center gap-6">
      <motion.div
        className="font-[var(--font-bangers)] text-6xl md:text-8xl text-white px-8 py-5"
        style={{ background: "#0a0a0f", border: "3px solid #e8185a", boxShadow: "8px 8px 0 #e8185a" }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
      >
        CARGANDO…
      </motion.div>
      <p className="font-[var(--font-marker)] text-2xl text-[#0a0a0f]/60">
        Bancá un toque...
      </p>
    </div>
  );
}

/* ── Empty ── */
function EmptyState({ chapterTitle, sagaColor }: { chapterTitle: string; sagaColor: string }) {
  return (
    <div className="text-center py-24 flex flex-col items-center gap-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="panel panel-lg px-8 py-10 max-w-md w-full text-center"
        style={{ borderColor: sagaColor, boxShadow: `8px 8px 0 ${sagaColor}` }}
      >
        <div
          className="font-[var(--font-bangers)] text-5xl md:text-6xl mb-4"
          style={{ color: sagaColor, textShadow: "3px 3px 0 #0a0a0f" }}
        >
          ¡PRÓXIMAMENTE!
        </div>
        <p className="font-[var(--font-marker)] text-xl text-[#0a0a0f]/70">
          Todavía no se subieron páginas para este capítulo.
        </p>
      </motion.div>
    </div>
  );
}
