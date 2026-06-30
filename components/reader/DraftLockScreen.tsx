"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function DraftLockScreen({
  chapterTitle,
  onUnlock,
}: {
  chapterTitle: string;
  onUnlock: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Dispatch event so other components (NavBar, Home) know that unlockAll or preview state updated
        window.dispatchEvent(new Event("previewStateChanged"));
        onUnlock();
      } else {
        setError(data.error || "Contraseña incorrecta");
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex-1 flex items-center justify-center flex-col gap-6 p-8 min-h-[90vh] relative overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      {/* Halftone / Comic speed lines bg */}
      <div className="absolute inset-0 speed-lines opacity-15 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, rotate: -1 }}
        animate={shake 
          ? { x: [-10, 10, -10, 10, -5, 5, 0], scale: 1, opacity: 1, rotate: 0 } 
          : { x: 0, scale: 1, opacity: 1, rotate: 0 }
        }
        transition={{ duration: 0.4 }}
        className="panel panel-lg px-8 py-12 max-w-md w-full text-center relative z-10 bg-white"
        style={{
          borderColor: "#e8185a",
          boxShadow: "10px 10px 0 #e8185a",
        }}
      >
        {/* Neon warning icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-16 h-16 rounded-full flex items-center justify-center text-[#e8185a]"
            style={{
              background: "rgba(232, 24, 90, 0.1)",
              border: "2px solid #e8185a",
              boxShadow: "0 0 15px rgba(232, 24, 90, 0.4)",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>

        <h1 className="font-[var(--font-bangers)] text-4xl md:text-5xl mb-2 text-white tracking-wider leading-none">
          ACCESO RESTRINGIDO
        </h1>
        <p className="font-[var(--font-marker)] text-base text-[#e8185a] mb-6 uppercase tracking-widest">
          Contenido en Borrador
        </p>

        <p className="font-sans text-sm text-zinc-300 mb-8 leading-relaxed">
          El capítulo <strong className="text-white font-bold">"{chapterTitle}"</strong> aún está en desarrollo.
          Ingresá la contraseña secreta para ver la previsualización en la web.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="password"
              placeholder="Contraseña secreta..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full font-[var(--font-bangers)] text-xl tracking-widest px-4 py-3 border-3 border-[#0a0a0f] text-center focus:outline-none focus:border-[#e8185a] transition-all bg-[#f4f0e6] text-[#0a0a0f] placeholder:text-zinc-500/70"
              style={{
                boxShadow: "3px 3px 0 #0a0a0f",
              }}
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-[var(--font-marker)] text-xs text-[#e8185a] tracking-wide animate-pulse"
            >
              ⚠️ {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-dark w-full text-xl mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "🔑 DESBLOQUEAR ACCESO"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
