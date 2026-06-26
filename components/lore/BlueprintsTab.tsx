"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data Types ───────────────────────────────────────────────────────────────

interface Habilidad {
  nombre: string;
  desc: string;
}

interface Blueprint {
  id: string;
  hero: string;
  objeto: string;
  color: string;
  habilidades: Habilidad[];
}

const BLUEPRINTS: Blueprint[] = [
  {
    id: "vesperwing",
    hero: "VESPERWING",
    objeto: "EXOCORAZA VESPERWING MK3 & HUD GHOSTLENS",
    color: "#10b981", // Emerald green
    habilidades: [
      {
        nombre: "CASCO GHOSTLENS",
        desc: "HUD táctico con ópticas activas de espectro térmico, escáner de firmas biológicas e intercomunicador encriptado integrado de alta frecuencia.",
      },
      {
        nombre: "EXOCHASIS DE TITANIO",
        desc: "Placas anatómicas modulares ultraligeras que absorben y desvían energía cinética directa sin restringir la agilidad en combate terrestre.",
      },
      {
        nombre: "GUANTELETES VECTORIALES",
        desc: "Dispositivos de muñeca calibrados para proyectar ráfagas cinéticas de repulsión corta, desviar proyectiles y desplegar anclajes magnéticos.",
      },
      {
        nombre: "CAPA REFRACTARIA DE PLANEADOR",
        desc: "Tejido molecular inteligente de supresión de radar y frenado aerodinámico controlado por inclinación para aproximaciones de sigilo desde las alturas.",
      },
    ],
  },
  {
    id: "hush",
    hero: "HUSH",
    objeto: "KATANAS ANCESTRALES — FAMILIA KUROGANE",
    color: "#06b6d4", // Cyan
    habilidades: [
      {
        nombre: "FILO FOLDED-STEEL",
        desc: "Acero japonés tradicional forjado en múltiples capas por la familia Kurogane. Retiene un temple molecular extremo capaz de cortar blindajes y desviar ráfagas.",
      },
      {
        nombre: "GUARDIA DE TSUBA",
        desc: "Anillo de bronce lacado que absorbe la vibración mecánica durante el choque de hojas, protegiendo el agarre del usuario ante impactos masivos.",
      },
      {
        nombre: "TSUKA DE SEDA (ITTO)",
        desc: "Empuñadura envuelta en ito de seda trenzada sobre piel de raya. Garantiza una tracción antideslizante bajo lluvia, sudor o maniobras acrobáticas rápidas.",
      },
      {
        nombre: "EQUILIBRIO DUELISTA",
        desc: "Calibración del centro de gravedad optimizada para draws rápidos (Iaido) desde la vaina y cortes de precisión guiados por radar eco-acústico.",
      },
    ],
  },
  {
    id: "wildcard",
    hero: "WILDCARD",
    objeto: "CASCO COLAPSABLE & NAIPES GLITCH",
    color: "#6366f1", // Indigo
    habilidades: [
      {
        nombre: "CASCO DE CONDUCCIÓN",
        desc: "Máscara hermética con HUD de luz azul analógica que filtra toxinas cuánticas, permite respirar en el vacío y calcula trayectorias balísticas en tiempo real.",
      },
      {
        nombre: "BOMBER ROJA TÁCTICA",
        desc: "Chaqueta de cuero técnico con solapas mecánicas diseñada por Ian que amortigua la reacción cinética y disipa la fricción de la energía glitch de Julián.",
      },
      {
        nombre: "NAIPES DE ENERGÍA",
        desc: "Proyectiles inestables de energía glitch (azul y roja) cargados de estática que detonan al impacto, distorsionando temporalmente el espacio local.",
      },
      {
        nombre: "ECOS DE CONSERVACIÓN",
        desc: "Constructos-señuelo de energía residual glitch que atraen el fuego enemigo y causan una detonación de stasis al disiparse.",
      },
    ],
  },
  {
    id: "swapfire",
    hero: "SWAPFIRE",
    objeto: "VISOR DE CALIBRACIÓN TÁCTICA",
    color: "#8b5cf6", // Purple
    habilidades: [
      {
        nombre: "COMPUERTA APERTURE LENS",
        desc: "Filtro de cuarzo refractario que polariza y concentra el haz de plasma violeta proveniente del portal ocular de Mati, evitando el desborde destructivo.",
      },
      {
        nombre: "DISIPADORES DE CARBONO",
        desc: "Conductores integrados en los laterales que evacúan el calor molecular extremo provocado por la fricción de la energía de portal.",
      },
      {
        nombre: "NEXO DE ANCLAJE B",
        desc: "Puerto inalámbrico para enlazar coordenadas espaciales con drones y balizas, facilitando el intercambio instantáneo de materia por transposición.",
      },
      {
        nombre: "SELLADO DE AMBIENTE",
        desc: "Bucle de ciclo cerrado que genera oxígeno y mantiene una burbuja de atmósfera terrestre para sobrevivir en el espacio exterior.",
      },
    ],
  },
  {
    id: "aegis",
    hero: "AEGIS",
    objeto: "TATUAJES DE RECEPCIÓN CUÁNTICA",
    color: "#ef4444", // Red
    habilidades: [
      {
        nombre: "RECEPTOR CUÁNTICO (TINTA)",
        desc: "Estructuras moleculares inyectadas en la piel que actúan como dipolos absorbentes de impacto. Convierten la fuerza cinética recibida en carga utilizable.",
      },
      {
        nombre: "DESCARGA VECTORIAL",
        desc: "Liberación explosiva de la carga acumulada para desatar súper-saltos de gran rango, golpes devastadores y ondas de choque terrestres.",
      },
      {
        nombre: "REFUERZO DE DENSIDAD",
        desc: "Rigidización molecular instantánea de la dermis reactiva, otorgando resistencia extrema a impactos balísticos pesados o caídas libres.",
      },
      {
        nombre: "HIPERTROFIA KINÉTICA",
        desc: "Estado límite donde los tatuajes brillan en rojo vivo, la masa se expande y se libera vapor denso a causa del calor residual acumulado.",
      },
    ],
  },
  {
    id: "oracle",
    hero: "ORACLE",
    objeto: "RUNAS DE ANCLAJE MÍSTICO",
    color: "#f5e642", // Yellow
    habilidades: [
      {
        nombre: "GEOMETRÍA DE ANCLAJE",
        desc: "Manifiesta estructuras tridimensionales de energía psíquica pura que funcionan como escudos deflectores, barreras o plataformas de paso.",
      },
      {
        nombre: "RESONANCIA EMOCIONAL",
        desc: "Lectura mística de firmas vibracionales de pánico, hostilidad o concentración, permitiendo modular el estado anímico del entorno.",
      },
      {
        nombre: "VÍNCULO ASTRAL COHESIVO",
        desc: "Enlace telepático de alta fidelidad que comparte alertas, coordenadas de movimiento e intenciones de combate en tiempo real.",
      },
      {
        nombre: "APERTURA DEL NEXO",
        desc: "Canalización de leyes multidimensionales arcanas transferibles a algoritmos lógicos o utilizadas para desestabilizar la energía enemiga.",
      },
    ],
  },
  {
    id: "null-vector",
    hero: "NULL-VECTOR",
    objeto: "VECTOR SUIT MOLECULAR",
    color: "#f97316", // Orange
    habilidades: [
      {
        nombre: "TEJIDO ANTIFRICCIÓN",
        desc: "Traje molecular ultraligero diseñado por Ian que disipa el calor térmico extremo generado por correr a velocidades que doblan el espacio-tiempo.",
      },
      {
        nombre: "NODOS PORTAL-ESTELA",
        desc: "Anclajes magnéticos en el calzado que ayudan a abrir portales estables de escape dimensional al alcanzar velocidades supersónicas.",
      },
      {
        nombre: "ESTABILIZADORES CUÁNTICOS",
        desc: "Dispositivos en las pantorrillas y muñecas que regulan la tasa de vibración atómica del cuerpo para coordinar la intangibilidad.",
      },
      {
        nombre: "FILTRADO REFRACTARIO",
        desc: "Visor y caperuza de dispersión molecular que evitan la acumulación de estática oscura y lecturas de radar durante el desborde rápido.",
      },
    ],
  },
];

// ── Interactive Hotspot Dot ──────────────────────────────────────────────────

interface HotspotDotProps {
  cx: number;
  cy: number;
  index: number;
  activeIdx: number | null;
  setActiveIdx: (idx: number | null) => void;
  color: string;
}

function HotspotDot({ cx, cy, index, activeIdx, setActiveIdx, color }: HotspotDotProps) {
  const isActive = activeIdx === index;
  return (
    <g
      className="cursor-pointer group"
      onClick={(e) => {
        e.stopPropagation();
        setActiveIdx(isActive ? null : index);
      }}
    >
      {/* Pulsing ring when active */}
      {isActive ? (
        <motion.circle
          cx={cx}
          cy={cy}
          r={15}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
      ) : (
        <circle
          cx={cx}
          cy={cy}
          r={9}
          fill="none"
          stroke="transparent"
          strokeWidth={1.5}
          className="group-hover:stroke-white/20 transition-all duration-200"
        />
      )}
      {/* Central dot */}
      <circle
        cx={cx}
        cy={cy}
        r={isActive ? 7 : 4.5}
        fill={isActive ? color : "#f5e642"}
        stroke="#ffffff"
        strokeWidth={isActive ? 2 : 1}
        className="transition-all duration-300"
      />
    </g>
  );
}

// ── SVG Diagrams ──────────────────────────────────────────────────────────────

interface SVGProps {
  color: string;
  activeIdx: number | null;
  setActiveIdx: (idx: number | null) => void;
}

function VesperwingSVG({ color, activeIdx, setActiveIdx }: SVGProps) {
  return (
    <svg width="260" height="280" viewBox="0 0 260 280" style={{ color }}>
      <rect x="90" y="40" width="80" height="150" rx="10" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-20" />
      <circle cx="130" cy="55" r="22" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M90 70 L20 110 L90 130" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M170 70 L240 110 L170 130" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="130" y1="190" x2="130" y2="250" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />

      {/* Hotspots mapped to abilities:
          0: Casco, 1: Torso (Exochasis), 2: Wrists/Wings (Guanteletes), 3: Bottom tail (Capa) */}
      <HotspotDot cx={130} cy={55} index={0} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={130} cy={120} index={1} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={55} cy={90} index={2} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={205} cy={90} index={2} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={130} cy={190} index={3} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
    </svg>
  );
}

function HushSVG({ color, activeIdx, setActiveIdx }: SVGProps) {
  return (
    <svg width="260" height="280" viewBox="0 0 260 280" style={{ color }}>
      <line x1="65" y1="48" x2="195" y2="240" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="195" y1="48" x2="65" y2="240" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="113" cy="124" rx="15" ry="8" fill={`${color}25`} stroke="currentColor" strokeWidth="1.5" transform="rotate(-51, 113, 124)" />
      <ellipse cx="147" cy="124" rx="15" ry="8" fill={`${color}25`} stroke="currentColor" strokeWidth="1.5" transform="rotate(51, 147, 124)" />
      <line x1="65" y1="48" x2="82" y2="74" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity={0.5} />
      <line x1="195" y1="48" x2="178" y2="74" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity={0.5} />

      {/* Hotspots mapped to abilities:
          0: Filo (blade lines), 1: Tsuba (crossguards), 2: Handle grip (Tsuka), 3: Center balance point */}
      <HotspotDot cx={98} cy={96} index={0} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={162} cy={96} index={0} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={113} cy={124} index={1} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={147} cy={124} index={1} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={74} cy={61} index={2} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={186} cy={61} index={2} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={130} cy={144} index={3} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
    </svg>
  );
}

function WildcardSVG({ color, activeIdx, setActiveIdx }: SVGProps) {
  return (
    <svg width="260" height="280" viewBox="0 0 260 280" style={{ color }}>
      <rect x="72" y="82" width="52" height="76" rx="5" fill={`${color}15`} stroke="currentColor" strokeWidth="1.5" transform="rotate(-18, 98, 120)" />
      <rect x="136" y="82" width="52" height="76" rx="5" fill={`${color}15`} stroke="currentColor" strokeWidth="1.5" transform="rotate(18, 162, 120)" />
      <rect x="104" y="72" width="52" height="78" rx="5" fill={`${color}20`} stroke="currentColor" strokeWidth="2.5" />
      <text x="130" y="120" textAnchor="middle" fontSize="22" fill="currentColor" opacity={0.9}>♠</text>
      <line x1="157" y1="92" x2="168" y2="85" stroke="currentColor" strokeWidth="1.5" />
      <line x1="102" y1="140" x2="88" y2="148" stroke="currentColor" strokeWidth="1.5" />

      {/* Hotspots mapped to:
          0: Casco (upper card/center), 1: Jacket (lower-left), 2: Cards/Aim (top-right), 3: Echo/Stasis (lower card/center-low) */}
      <HotspotDot cx={130} cy={105} index={0} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={98} cy={142} index={1} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={162} cy={95} index={2} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={130} cy={140} index={3} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
    </svg>
  );
}

function SwapfireSVG({ color, activeIdx, setActiveIdx }: SVGProps) {
  return (
    <svg width="260" height="280" viewBox="0 0 260 280" style={{ color }}>
      <rect x="50" y="100" width="160" height="60" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="130" cy="130" r="22" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-30" />
      <circle cx="130" cy="130" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="50" y1="130" x2="70" y2="130" stroke="currentColor" strokeWidth="2" />
      <line x1="210" y1="130" x2="190" y2="130" stroke="currentColor" strokeWidth="2" />

      {/* Hotspots mapped to:
          0: Center Ocular Lens, 1: Left/Right Carbon Dissipators, 2: Upper Anchor node, 3: Ambient atmosphere seal */}
      <HotspotDot cx={130} cy={130} index={0} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={75} cy={130} index={1} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={185} cy={130} index={1} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={130} cy={105} index={2} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={130} cy={155} index={3} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
    </svg>
  );
}

function AegisSVG({ color, activeIdx, setActiveIdx }: SVGProps) {
  return (
    <svg width="260" height="280" viewBox="0 0 260 280" style={{ color }}>
      <ellipse cx="130" cy="68" rx="25" ry="28" fill="none" stroke="currentColor" strokeWidth="1.5" opacity={0.4} />
      <path d="M103 98 L90 200 L170 200 L157 98 Z" fill="none" stroke="currentColor" strokeWidth="1.5" opacity={0.4} />
      <line x1="103" y1="108" x2="72" y2="178" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity={0.2} />
      <line x1="157" y1="108" x2="188" y2="178" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity={0.2} />
      <path d="M92 118 L80 128 M90 133 L78 143 M168 118 L180 128 M170 133 L182 143" stroke="currentColor" strokeWidth="1.5" opacity={0.8} />
      <circle cx="130" cy="145" r="16" fill={`${color}15`} stroke="currentColor" strokeWidth="1.5" />

      {/* Hotspots mapped to:
          0: Tattoo receptors (arms), 1: Core discharge (chest), 2: Head/Neck density, 3: Bottom ground force */}
      <HotspotDot cx={85} cy={133} index={0} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={175} cy={133} index={0} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={130} cy={145} index={1} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={130} cy={105} index={2} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={130} cy={185} index={3} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
    </svg>
  );
}

function OracleSVG({ color, activeIdx, setActiveIdx }: SVGProps) {
  return (
    <svg width="260" height="280" viewBox="0 0 260 280" style={{ color }}>
      <circle cx="130" cy="145" r="90" fill="none" stroke="currentColor" strokeWidth="0.75" opacity={0.15} />
      <circle cx="130" cy="145" r="65" fill="none" stroke="currentColor" strokeWidth="1" opacity={0.3} />
      <circle cx="130" cy="145" r="40" fill="none" stroke="currentColor" strokeWidth="2" opacity={0.6} />
      <circle cx="130" cy="145" r="7" fill={`${color}50`} />

      {/* Hotspots mapped to:
          0: Anchor geometries (top), 1: Resonance/Empathy (left/right nodes), 2: Telepathic link (center nex), 3: Portal aperture (lower nodes) */}
      <HotspotDot cx={130} cy={105} index={0} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={92} cy={122} index={1} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={168} cy={122} index={1} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={130} cy={145} index={2} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={107} cy={178} index={3} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={153} cy={178} index={3} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
    </svg>
  );
}

function NullVectorSVG({ color, activeIdx, setActiveIdx }: SVGProps) {
  return (
    <svg width="260" height="280" viewBox="0 0 260 280" style={{ color }}>
      <ellipse cx="130" cy="140" rx="90" ry="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5,3" opacity={0.3} />
      <ellipse cx="130" cy="140" rx="60" ry="25" fill="none" stroke="currentColor" strokeWidth="2" opacity={0.5} />
      <circle cx="130" cy="140" r="15" fill={`${color}20`} stroke="currentColor" strokeWidth="1.5" />
      <path d="M50 140 L210 140" stroke="currentColor" strokeWidth="1" opacity={0.3} />

      {/* Hotspots mapped to:
          0: Antifriction suit (center), 1: Foot portal node (extreme sides), 2: Stabilizers (mid sides), 3: Refractive helm (top) */}
      <HotspotDot cx={130} cy={140} index={0} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={70} cy={140} index={1} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={190} cy={140} index={1} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={100} cy={140} index={2} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={160} cy={140} index={2} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
      <HotspotDot cx={130} cy={110} index={3} activeIdx={activeIdx} setActiveIdx={setActiveIdx} color={color} />
    </svg>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function BlueprintsTab() {
  const [activeId, setActiveId] = useState<string>("vesperwing");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const bp = BLUEPRINTS.find((b) => b.id === activeId) ?? BLUEPRINTS[0];

  const SVG_MAP: Record<string, React.ReactElement> = {
    vesperwing:   <VesperwingSVG color={bp.color} activeIdx={expandedIdx} setActiveIdx={setExpandedIdx} />,
    hush:         <HushSVG color={bp.color} activeIdx={expandedIdx} setActiveIdx={setExpandedIdx} />,
    wildcard:     <WildcardSVG color={bp.color} activeIdx={expandedIdx} setActiveIdx={setExpandedIdx} />,
    swapfire:     <SwapfireSVG color={bp.color} activeIdx={expandedIdx} setActiveIdx={setExpandedIdx} />,
    aegis:        <AegisSVG color={bp.color} activeIdx={expandedIdx} setActiveIdx={setExpandedIdx} />,
    oracle:       <OracleSVG color={bp.color} activeIdx={expandedIdx} setActiveIdx={setExpandedIdx} />,
    "null-vector": <NullVectorSVG color={bp.color} activeIdx={expandedIdx} setActiveIdx={setExpandedIdx} />,
  };

  return (
    <motion.div
      key="blueprints"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-8"
    >
      {/* Hero selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {BLUEPRINTS.map((b) => (
          <button
            key={b.id}
            onClick={() => { setActiveId(b.id); setExpandedIdx(null); }}
            style={{
              backgroundColor: activeId === b.id ? b.color : "#1a1a25",
              color: activeId === b.id ? (b.color === "#f5e642" ? "#0a0a0f" : "#ffffff") : "#cbd5e1",
              boxShadow: activeId === b.id ? `3px 3px 0 #000` : "2px 2px 0 #000",
              borderColor: activeId === b.id ? "#ffffff" : "rgba(255,255,255,0.1)",
            }}
            className="px-3.5 py-2 border font-[var(--font-bangers)] text-[10px] sm:text-xs tracking-wider uppercase transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            {b.hero}
          </button>
        ))}
      </div>

      {/* Main panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.22 }}
          className="bg-[#090d16] border-2 p-6 rounded relative min-h-[400px] grid grid-cols-1 md:grid-cols-12 gap-6"
          style={{ borderColor: `${bp.color}40`, boxShadow: `8px 8px 0 ${bp.color}18` }}
        >
          {/* Badge */}
          <div
            className="absolute top-[-10px] left-6 px-3 py-0.5 text-[10px] font-[var(--font-bangers)] tracking-widest shadow-[2px_2px_0_#000]"
            style={{ backgroundColor: bp.color, color: bp.color === "#f5e642" ? "#0a0a0f" : "#fff" }}
          >
            PLANOS DE INGENIERÍA VIRTUAL
          </div>

          {/* SVG illustration */}
          <div className="md:col-span-5 flex items-center justify-center bg-black/50 border border-white/8 rounded relative min-h-[280px] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-8 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_95%,rgba(255,255,255,0.15)_95%)] bg-[size:100%_12px]" />
            {SVG_MAP[activeId]}
          </div>

          {/* Object + abilities */}
          <div className="md:col-span-7 flex flex-col gap-4 justify-start">
            <div>
              <span
                className="font-[var(--font-bangers)] text-[10px] tracking-widest uppercase block opacity-70"
                style={{ color: bp.color }}
              >
                {bp.hero} — OBJETO
              </span>
              <h3
                className="font-[var(--font-bangers)] text-xl sm:text-2xl tracking-widest uppercase leading-tight mt-0.5"
                style={{ color: bp.color }}
              >
                {bp.objeto}
              </h3>
            </div>

            <div className="space-y-2">
              <span className="font-[var(--font-bangers)] text-[9px] tracking-widest uppercase text-zinc-500 block">
                HABILIDADES Y FUNCIONAMIENTO (PULSÁ UN CIRCUITO O ELEMENTO PARA VER DETALLES)
              </span>
              {bp.habilidades.map((hab, idx) => {
                const isOpen = expandedIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setExpandedIdx(isOpen ? null : idx)}
                    className="w-full text-left border rounded transition-all cursor-pointer"
                    style={{
                      borderColor: isOpen ? `${bp.color}60` : "rgba(255,255,255,0.06)",
                      backgroundColor: isOpen ? `${bp.color}12` : "rgba(255,255,255,0.02)",
                    }}
                  >
                    <div className="flex items-center gap-2 px-3 py-2">
                      <span
                        className="font-[var(--font-bangers)] text-[9px] tracking-wider shrink-0 w-5 h-5 rounded-full flex items-center justify-center border"
                        style={{
                          color: isOpen ? bp.color : "#64748b",
                          borderColor: isOpen ? bp.color : "#334155",
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span
                        className="font-[var(--font-bangers)] text-xs tracking-wider uppercase"
                        style={{ color: isOpen ? bp.color : "#94a3b8" }}
                      >
                        {hab.nombre}
                      </span>
                      <span className="ml-auto text-zinc-600 text-[10px]">{isOpen ? "▲" : "▼"}</span>
                    </div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="overflow-hidden"
                        >
                          <p className="px-3 pb-3 text-xs text-gray-400 font-sans leading-relaxed border-t border-white/5 pt-2">
                            {hab.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
