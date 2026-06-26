"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TIMELINE_EVENTS = [
  {
    phase: "Fase 1",
    title: "EL INCIDENTE DE LOS BACKROOMS",
    desc: "El grupo queda atrapado en el Nivel 0 de los Backrooms tras una falla en la resonancia dimensional. Al escapar, una descarga de energía cósmica pura altera su genética, marcándolos para siempre.",
    details: "Esto causa la dispersión dimensional inicial de Jaz, Ian, Uandi, Julián y Volvo a través de distintas coordenadas temporales, forzándolos a sobrevivir de manera aislada.",
    icon: "🚪",
  },
  {
    phase: "Fase 2",
    title: "LA FRAGMENTACIÓN EN L.A.",
    desc: "El nexo dimensional colapsa. Julián y Uandi caen en un callejón de Los Ángeles de una realidad alterna sin comprender que su trauma biológico ya los ha transformado en baterías de energía residual.",
    details: "Jaz permanece en la realidad 616 canalizando su aura en runas sagradas para estabilizar la grieta mística. Sofi se cruza con el grupo en Los Ángeles, alertada por las firmas acústicas sospechosas del portal.",
    icon: "⚡",
  },
  {
    phase: "Fase 3",
    title: "EL ENCUENTRO EN TIMES SQUARE",
    desc: "Volvo, huyendo de las variantes asesinas de Mati por portales cuánticos, cae desorientado en Times Square. Es catalogado como 'Null Vector' por agencias militares locales tras generar cortes masivos de red.",
    details: "En esta realidad alternativa cruzada por carteles de superhéroes fascistas ('Julander'), Volvo tiene su primer encuentro tenso de supervivencia cara a cara con Billy Butcher.",
    icon: "🗽",
  },
  {
    phase: "Fase 4",
    title: "LA FRACTURA PÚRPURA",
    desc: "Las variantes agresivas de Mati se unifican bajo el mando de Mati Prime, iniciando la Guerra Mativersal para absorber todos los nexos moleculares de la realidad.",
    details: "Frente a la debilidad de Uandi y los colapsos de naipes glitch de Julián, Ian empieza a diseñar los primeros exotrajes Vesperwing para coordinar la ofensiva de supervivencia del grupo.",
    icon: "🔮",
  },
];

export function TimelineTab() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <motion.div
      key="timeline"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-8"
    >
      {/* Phase selector */}
      <div className="bg-[#0e0e16] border-4 border-white p-6 shadow-[5px_5px_0_#000] relative">
        <div className="absolute top-[-12px] left-6 bg-[#e8185a] border border-white px-2 py-0.5 text-[9px] font-[var(--font-bangers)] tracking-widest shadow-[2px_2px_0_#000] rotate-[-1deg]">
          CRONOLOGÍA MULTIVERSAL
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {TIMELINE_EVENTS.map((event, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                style={{
                  backgroundColor: isSelected ? "#f5e642" : "#1a1a25",
                  color: isSelected ? "#0a0a0f" : "#ffffff",
                  boxShadow: isSelected ? "3px 3px 0 #e8185a" : "3px 3px 0 #000",
                  borderColor: isSelected ? "#ffffff" : "rgba(255,255,255,0.1)",
                }}
                className="p-4 border-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                <span className="text-2xl mb-1">{event.icon}</span>
                <span className="font-[var(--font-bangers)] text-[10px] tracking-widest uppercase opacity-75">{event.phase}</span>
                <span className="font-[var(--font-bangers)] text-xs tracking-wider uppercase leading-tight mt-0.5">{event.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="bg-[#0e0e16] border-2 border-white/10 p-6 sm:p-8 rounded relative shadow-[6px_6px_0_rgba(255,255,255,0.03)] flex flex-col md:flex-row gap-6 items-start"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#f5e642]/10 border-2 border-[#f5e642] flex items-center justify-center text-2xl sm:text-3xl shrink-0">
            {TIMELINE_EVENTS[selectedIdx].icon}
          </div>
          <div className="flex-1">
            <span className="font-[var(--font-bangers)] text-[#e8185a] text-sm tracking-widest uppercase block">{TIMELINE_EVENTS[selectedIdx].phase}</span>
            <h3 className="font-[var(--font-bangers)] text-2xl sm:text-3xl text-[#f5e642] leading-none mt-1 mb-4 tracking-widest">{TIMELINE_EVENTS[selectedIdx].title}</h3>
            <p className="font-sans text-sm sm:text-base leading-relaxed text-gray-200 mb-4">{TIMELINE_EVENTS[selectedIdx].desc}</p>
            <div className="p-4 bg-black/45 border-l-4 border-[#10b981] rounded-r-sm text-xs text-gray-400">
              <strong className="text-white block font-[var(--font-bangers)] text-[10px] tracking-wider uppercase mb-1">INFORME DE CAUSALIDAD:</strong>
              {TIMELINE_EVENTS[selectedIdx].details}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
