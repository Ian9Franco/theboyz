"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReaderAuthModalProps {
  showAuthModal: boolean;
  setShowAuthModal: (val: boolean) => void;
  passwordInput: string;
  setPasswordInput: (val: string) => void;
  authError: boolean;
  setAuthError: (val: boolean) => void;
  handleAuthSubmit: (e: React.FormEvent) => void;
}

/**
 * ReaderAuthModal Component
 * Renders the pop-up modal requiring authentication to enter editor mode.
 */
export function ReaderAuthModal({
  showAuthModal,
  setShowAuthModal,
  passwordInput,
  setPasswordInput,
  authError,
  setAuthError,
  handleAuthSubmit,
}: ReaderAuthModalProps) {
  return (
    <AnimatePresence>
      {showAuthModal && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAuthModal(false)}
            className="absolute inset-0 bg-[#0a0a0f]/90 backdrop-blur-sm cursor-pointer"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm bg-white border-4 border-[#0a0a0f] p-6 shadow-[8px_8px_0_#f5e642] z-10"
          >
            <button
              type="button"
              onClick={() => setShowAuthModal(false)}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center font-[var(--font-bangers)] text-sm bg-red-500 text-white border-2 border-[#0a0a0f] hover:bg-red-600 transition-colors shadow-[2px_2px_0_#000]"
            >
              ✕
            </button>

            <h3 className="font-[var(--font-bangers)] text-3xl text-[#0a0a0f] mb-2 tracking-wider">
              🔐 MODO EDITOR
            </h3>
            <p className="font-sans text-xs text-zinc-500 mb-4 leading-relaxed">
              Ingresá la contraseña de edición para poder modificar y guardar los diálogos de las viñetas.
            </p>

            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError(false);
                  }}
                  placeholder="Contraseña"
                  className="w-full border-2 border-[#0a0a0f] p-3 text-sm font-mono rounded bg-white text-[#0a0a0f] focus:outline-none"
                  autoFocus
                />
                {authError && (
                  <span className="text-red-500 font-mono text-[10px] uppercase font-bold tracking-wider animate-bounce">
                    ⚠️ Contraseña incorrecta
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0a0a0f] hover:bg-zinc-800 text-white font-[var(--font-bangers)] text-base tracking-widest border-2 border-[#0a0a0f] shadow-[3px_3px_0_#f5e642] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#f5e642] transition-all"
              >
                AUTORIZAR →
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
