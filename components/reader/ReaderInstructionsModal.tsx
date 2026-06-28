"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReaderInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ReaderInstructionsModal Component
 * Shows interactive guides/tutorial for the comic reader.
 */
export function ReaderInstructionsModal({ isOpen, onClose }: ReaderInstructionsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
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
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md max-h-[90vh] flex flex-col bg-white border-4 border-[#0a0a0f] p-4 sm:p-6 shadow-[8px_8px_0_#f5e642] z-10 rounded-md overflow-hidden"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center font-[var(--font-bangers)] text-sm bg-red-500 hover:bg-red-600 text-white border-2 border-[#0a0a0f] transition-colors shadow-[2px_2px_0_#000] z-20"
            >
              ✕
            </button>

            {/* Header */}
            <h3 className="font-[var(--font-bangers)] text-2xl sm:text-3xl text-[#0a0a0f] mb-3 sm:mb-4 tracking-wider text-center shrink-0">
              📖 GUÍA DE LECTURA
            </h3>

            {/* Scrollable body content */}
            <div className="flex-1 overflow-y-auto pr-1 my-2 flex flex-col gap-4 no-scrollbar">
              {/* Body Description */}
              <p className="font-sans text-xs text-zinc-500 text-center leading-relaxed shrink-0">
                ¡Disfrutá del cómic interactivo! Podés usar estas herramientas de lectura interactiva en cualquier momento.
              </p>

              {/* Instruction Items */}
              <div className="flex flex-col gap-3 sm:gap-4 pb-2">
                {/* Item 1 */}
                <div className="flex gap-3 items-start border-2 border-[#0a0a0f] p-2.5 sm:p-3 bg-zinc-50 rounded shadow-[3px_3px_0_#0a0a0f]">
                  <span className="text-xl shrink-0">🔎</span>
                  <div>
                    <h4 className="font-[var(--font-bangers)] text-sm sm:text-base text-[#0a0a0f] tracking-wide mb-0.5">
                      ZOOM Y DESPLAZAMIENTO
                    </h4>
                    <p className="font-sans text-[11px] sm:text-xs text-zinc-600 leading-relaxed">
                      Hacé <strong>doble clic o doble tap</strong> para hacer zoom instantáneo. Usá la rueda del mouse o pellizcá para ajustar, y <strong>arrastrá la página</strong> para moverte libremente.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-3 items-start border-2 border-[#0a0a0f] p-2.5 sm:p-3 bg-zinc-50 rounded shadow-[3px_3px_0_#0a0a0f]">
                  <span className="text-xl shrink-0">💬</span>
                  <div>
                    <h4 className="font-[var(--font-bangers)] text-sm sm:text-base text-[#0a0a0f] tracking-wide mb-0.5">
                      MOVER LOS DIÁLOGOS
                    </h4>
                    <p className="font-sans text-[11px] sm:text-xs text-zinc-600 leading-relaxed">
                      ¿Un globo de diálogo tapa el dibujo? No te preocupes: podés <strong>hacer clic y arrastrar</strong> cualquier globo para moverlo a donde quieras.
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex gap-3 items-start border-2 border-[#0a0a0f] p-2.5 sm:p-3 bg-zinc-50 rounded shadow-[3px_3px_0_#0a0a0f]">
                  <span className="text-xl shrink-0">🔠</span>
                  <div>
                    <h4 className="font-[var(--font-bangers)] text-sm sm:text-base text-[#0a0a0f] tracking-wide mb-0.5">
                      TAMAÑO DEL TEXTO
                    </h4>
                    <p className="font-sans text-[11px] sm:text-xs text-zinc-600 leading-relaxed">
                      Ajustá el tamaño de las letras con los botones de texto <strong>(A- / A / A+ / A++)</strong> ubicados en la barra superior para leer con mayor comodidad.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={onClose}
              className="w-full py-2.5 sm:py-3 bg-[#0a0a0f] hover:bg-zinc-800 text-white font-[var(--font-bangers)] text-base sm:text-lg tracking-widest border-2 border-[#0a0a0f] shadow-[4px_4px_0_#f5e642] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#f5e642] transition-all shrink-0"
            >
              ¡ENTENDIDO, A LEER! 🚀
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
