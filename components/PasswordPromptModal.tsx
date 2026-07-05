"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";

interface PasswordPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function PasswordPromptModal({
  isOpen,
  onClose,
  onSuccess,
}: PasswordPromptModalProps) {
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
        body: JSON.stringify({ password, onlyMaster: true }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onSuccess();
        setPassword("");
        onClose();
      } else {
        setError(data.error || "Contraseña maestra incorrecta");
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } catch (err) {
      setError("Error al verificar con el servidor");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0a0a0f]/90 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={
              shake
                ? { x: [-10, 10, -10, 10, -5, 5, 0], scale: 1, opacity: 1, y: 0 }
                : { x: 0, scale: 1, opacity: 1, y: 0 }
            }
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-md brand-grain-light p-6 md:p-8 border-4 border-[#0a0a0a] shadow-[8px_8px_0_#880d16] z-10"
            style={{
              backgroundColor: "#E9E2D3",
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeBlend in='SourceGraphic' mode='multiply'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23g)' opacity='0.25'/%3E%3C/svg%3E\")",
              backgroundSize: "200px 200px",
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center font-[var(--font-bangers)] text-sm bg-[#880d16] text-[#E9E2D3] border-2 border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#E9E2D3] transition-colors shadow-[2px_2px_0_#000] cursor-pointer"
            >
              ✕
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 rounded-full bg-[#880d16]/10 flex items-center justify-center border-2 border-[#0a0a0a] text-[#880d16] shadow-[3px_3px_0_#000]">
                <Lock className="w-6 h-6" />
              </div>
            </div>

            <h3 className="font-[var(--font-bangers)] text-3xl text-center text-[#0a0a0a] mb-2 tracking-widest uppercase">
              DESBLOQUEAR SPOILERS
            </h3>
            <p className="font-[var(--font-marker)] text-xs text-center text-[#880d16] mb-5 uppercase tracking-wider">
              Requiere Contraseña Maestra
            </p>

            <p className="font-sans text-xs text-center text-[#0a0a0a]/80 mb-6 leading-relaxed">
              Para desbloquear todas las fichas de personajes y revelar Spoilers de la historia, ingresá la Contraseña Maestra de Elseframe.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  disabled={loading}
                  placeholder="CONTRASEÑA MAESTRA..."
                  className="w-full font-[var(--font-bangers)] text-lg tracking-widest px-4 py-3 border-3 border-[#0a0a0a] text-center focus:outline-none focus:border-[#880d16] transition-all bg-[#F3EFE3] text-[#0a0a0a] placeholder:text-zinc-500/70"
                  style={{
                    boxShadow: "4px 4px 0 #0a0a0a",
                  }}
                  autoFocus
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-[var(--font-marker)] text-xs text-center text-[#880d16] tracking-wide animate-pulse"
                >
                  ⚠️ {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#0a0a0a] hover:bg-[#880d16] text-[#E9E2D3] font-[var(--font-bungee)] text-xs tracking-widest border-2 border-[#0a0a0a] shadow-[4px_4px_0_#880d16] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#880d16] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "DESBLOQUEAR TODO →"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
