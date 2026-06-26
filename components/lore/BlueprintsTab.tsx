"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const HOTSPOTS = {
  vesper: [
    { id: "h1", x: 130, y: 55,  label: "CASCO GHOSTLENS",        desc: "HUD táctico con ópticas activas de espectro térmico e intercomunicador encriptado integrado." },
    { id: "h2", x: 130, y: 110, label: "EXOCHASIS DE TITANIO",   desc: "Placas anatómicas modulares que absorben y desvían energía cinética directa." },
    { id: "h3", x: 80,  y: 155, label: "GUANTELETES VECTORIALES",desc: "Dispositivos en muñecas calibrados para proyectar ráfagas cinéticas breves y desviar proyectiles." },
    { id: "h4", x: 190, y: 90,  label: "CAPA DE PLANEADOR",      desc: "Tejido refractario de supresión de radar y frenado aerodinámico controlado por inclinación." },
  ],
  visor: [
    { id: "v1", x: 130, y: 130, label: "THE APERTURE LENS",   desc: "Filtro de cuarzo refractario que polariza y enfoca el flujo de plasma violeta de Mati." },
    { id: "v2", x: 75,  y: 130, label: "DISIPADORES DE CALOR", desc: "Conductores de carbono que evacúan el calor extremo provocado por la fricción molecular." },
    { id: "v3", x: 185, y: 130, label: "NEXO DE ANCLAJE B",   desc: "Puerto inalámbrico para sincronizar coordenadas tridimensionales con drones auxiliares de desvío." },
  ],
  kinetic: [
    { id: "k1", x: 110, y: 110, label: "RECEPTOR CUÁNTICO",  desc: "Microestructura de tinta molecular inyectada que convierte fricción de impacto en carga cinética." },
    { id: "k2", x: 150, y: 150, label: "DIPOLO DE DESCARGA", desc: "Punto de liberación rúnica en nudillos para proyectar ondas expansivas a corta distancia." },
    { id: "k3", x: 130, y: 70,  label: "VÁLVULA TÉRMICA",    desc: "Alivio de vapor sobrecalentado para disipar el exceso de energía cuando el límite de retención peligra." },
  ],
} as const;

type BlueprintKey = keyof typeof HOTSPOTS;

const BLUEPRINTS: { id: BlueprintKey; label: string; color: string }[] = [
  { id: "vesper",  label: "EXOCHASIS VESPERWING MK3",         color: "#0284c7" },
  { id: "visor",   label: "VISOR SWAPFIRE",                    color: "#a855f7" },
  { id: "kinetic", label: "GUANTELETES AEGIS",                 color: "#ef4444" },
];

export function BlueprintsTab() {
  const [activeBlueprint, setActiveBlueprint] = useState<BlueprintKey>("vesper");
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const activeColor = BLUEPRINTS.find((b) => b.id === activeBlueprint)?.color ?? "#0284c7";

  return (
    <motion.div
      key="blueprints"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-8"
    >
      {/* Blueprint selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {BLUEPRINTS.map((bp) => (
          <button
            key={bp.id}
            onClick={() => { setActiveBlueprint(bp.id); setActiveHotspot(null); }}
            style={{
              backgroundColor: activeBlueprint === bp.id ? bp.color : "#1a1a25",
              color: activeBlueprint === bp.id ? "#ffffff" : "#cbd5e1",
              boxShadow: activeBlueprint === bp.id ? "3px 3px 0 #000" : "2px 2px 0 #000",
              borderColor: activeBlueprint === bp.id ? "#ffffff" : "rgba(255,255,255,0.1)",
            }}
            className="px-3.5 py-2 border font-[var(--font-bangers)] text-[10px] sm:text-xs tracking-wider uppercase transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            {bp.label}
          </button>
        ))}
      </div>

      {/* Interactive panel */}
      <div
        className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#090d16] border-2 p-6 rounded relative min-h-[380px]"
        style={{ borderColor: `${activeColor}40`, boxShadow: `8px 8px 0 ${activeColor}18` }}
      >
        <div className="absolute top-[-10px] left-6 px-3 py-0.5 text-[10px] font-[var(--font-bangers)] tracking-widest shadow-[2px_2px_0_#000]"
          style={{ backgroundColor: activeColor }}>
          PLANOS DE INGENIERÍA VIRTUAL
        </div>

        {/* SVG canvas */}
        <div className="md:col-span-6 flex items-center justify-center bg-black/60 border border-white/10 rounded relative min-h-[300px] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_95%,rgba(255,255,255,0.15)_95%)] bg-[size:100%_12px]" />

          {activeBlueprint === "vesper" && (
            <svg width="260" height="280" viewBox="0 0 260 280" style={{ color: activeColor }}>
              <rect x="90" y="40" width="80" height="150" rx="10" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-25" />
              <circle cx="130" cy="55" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M90 70 L20 110 L90 130" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M170 70 L240 110 L170 130" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="130" y1="190" x2="130" y2="250" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
              {HOTSPOTS.vesper.map((hs) => (
                <g key={hs.id} className="cursor-pointer" onClick={() => setActiveHotspot(hs.id)}>
                  <circle cx={hs.x} cy={hs.y} r="12" fill={`${activeColor}25`} stroke="currentColor" strokeWidth="1" className="animate-pulse" />
                  <circle cx={hs.x} cy={hs.y} r="5" fill="#f5e642" stroke="#ffffff" strokeWidth="1.5" />
                </g>
              ))}
            </svg>
          )}

          {activeBlueprint === "visor" && (
            <svg width="260" height="280" viewBox="0 0 260 280" style={{ color: activeColor }}>
              <rect x="50" y="100" width="160" height="60" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="130" cy="130" r="22" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-30" />
              <circle cx="130" cy="130" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="50" y1="130" x2="70" y2="130" stroke="currentColor" strokeWidth="2" />
              <line x1="210" y1="130" x2="190" y2="130" stroke="currentColor" strokeWidth="2" />
              {HOTSPOTS.visor.map((hs) => (
                <g key={hs.id} className="cursor-pointer" onClick={() => setActiveHotspot(hs.id)}>
                  <circle cx={hs.x} cy={hs.y} r="12" fill={`${activeColor}25`} stroke="currentColor" strokeWidth="1" className="animate-pulse" />
                  <circle cx={hs.x} cy={hs.y} r="5" fill="#f5e642" stroke="#ffffff" strokeWidth="1.5" />
                </g>
              ))}
            </svg>
          )}

          {activeBlueprint === "kinetic" && (
            <svg width="260" height="280" viewBox="0 0 260 280" style={{ color: activeColor }}>
              <path d="M80 80 L180 80 L160 220 L100 220 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="130" cy="110" r="18" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-30" />
              <path d="M110 150 L150 150" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M120 160 L140 160" fill="none" stroke="currentColor" strokeWidth="1.5" />
              {HOTSPOTS.kinetic.map((hs) => (
                <g key={hs.id} className="cursor-pointer" onClick={() => setActiveHotspot(hs.id)}>
                  <circle cx={hs.x} cy={hs.y} r="12" fill={`${activeColor}25`} stroke="currentColor" strokeWidth="1" className="animate-pulse" />
                  <circle cx={hs.x} cy={hs.y} r="5" fill="#f5e642" stroke="#ffffff" strokeWidth="1.5" />
                </g>
              ))}
            </svg>
          )}
        </div>

        {/* Hotspot detail panel */}
        <div className="md:col-span-6 flex flex-col justify-center">
          {activeHotspot ? (() => {
            const hs = HOTSPOTS[activeBlueprint].find((h) => h.id === activeHotspot);
            if (!hs) return null;
            return (
              <motion.div
                key={activeHotspot}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-5 bg-black/40 border rounded relative"
                style={{ borderColor: `${activeColor}30` }}
              >
                <span className="font-[var(--font-bangers)] text-[9px] text-[#f5e642] tracking-widest block uppercase">SISTEMA SELECCIONADO</span>
                <h4 className="font-[var(--font-bangers)] text-xl text-white tracking-widest mt-1 mb-2">{hs.label}</h4>
                <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed">{hs.desc}</p>
              </motion.div>
            );
          })() : (
            <div className="text-center p-6 border-2 border-dashed border-white/5 rounded text-gray-500 font-sans text-xs sm:text-sm">
              PULSÁ CUALQUIER PUNTO AMARILLO EN EL PLANO PARA VER EL COMPONENTE DE HARDWARE
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
