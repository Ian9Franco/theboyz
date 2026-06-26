"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Cpu, Flame, Calendar, BookOpen, Layers, Unlock, Lock } from "lucide-react";

// Glossario Lookup Map
const GLOSARIO_CHARS: Record<string, { name: string; role: string; color: string; image: string; tag: string }> = {
  ian: { name: "Ian", role: "Vesperwing", color: "#10b981", image: "/personajes/LosPibes/CLOSEUP/IAN_FACE.webp", tag: "Humano / Nexo Estratégico sin poderes biológicos" },
  jaz: { name: "Jaz", role: "Oracle", color: "#f5e642", image: "/personajes/LosPibes/CLOSEUP/JAZ_FACE.webp", tag: "Enlace Dimensional / Clarividente Psíquica" },
  julian: { name: "Julián", role: "Wildcard", color: "#3b82f6", image: "/personajes/LosPibes/CLOSEUP/JULIAN_FACE.webp", tag: "Hostigador Energético / Constructos Glitch" },
  mati: { name: "Mati", role: "Swapfire", color: "#a855f7", image: "/personajes/LosPibes/CLOSEUP/MATI_FACE.webp", tag: "Nexo Cósmico / Plasma Violeta Bifásico" },
  uandi: { name: "Uandi", role: "Aegis", color: "#ef4444", image: "/personajes/LosPibes/CLOSEUP/UANDI_FACE.webp", tag: "Tanque Cinético / Batería de Impacto" },
  volvo: { name: "Volvo", role: "Null Vector", color: "#f97316", image: "/personajes/LosPibes/CLOSEUP/VOLVO_FACE.webp", tag: "Movilidad Absoluta / Teletransportación Blink" },
  sofi: { name: "Sofi", role: "Hush", color: "#06b6d4", image: "/personajes/LosPibes/CLOSEUP/SOFI_FACE.webp", tag: "Duelista Acústica / Sigilo y Eco-Precisión" },
};

// Local component for hover-based character dossiers (glossary cards)
function GlosarioLink({ id, children }: { id: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const charData = GLOSARIO_CHARS[id];
  if (!charData) return <span className="font-bold text-white">{children}</span>;

  return (
    <span
      className="relative inline-block cursor-help group"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <strong 
        className="underline decoration-dotted decoration-2 transition-all duration-200 hover:text-white"
        style={{ color: charData.color, textDecorationColor: charData.color }}
      >
        {children}
      </strong>
      <AnimatePresence>
        {visible && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2.5 p-3 bg-[#13131e] border-2 border-white rounded shadow-[5px_5px_0_#000] w-[210px] text-left leading-normal block cursor-default"
          >
            <span className="flex gap-2.5 items-center">
              <img 
                src={charData.image} 
                alt={charData.name} 
                className="w-10 h-10 rounded-full border border-white/20 object-cover bg-gray-800 shrink-0" 
              />
              <span className="min-w-0 flex flex-col">
                <span className="font-[var(--font-bangers)] text-base text-white tracking-wider leading-none">
                  {charData.name.toUpperCase()}
                </span>
                <span className="font-[var(--font-marker)] text-[9px] uppercase tracking-wider block mt-0.5" style={{ color: charData.color }}>
                  {charData.role}
                </span>
              </span>
            </span>
            <span className="font-sans text-[10px] text-gray-400 block mt-2 pt-1.5 border-t border-white/10 uppercase">
              {charData.tag}
            </span>
            <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

// Local component for classified spoiler text
interface RedactedProps {
  chapterId: string;
  chapterName: string;
  unlockAll: boolean;
  readChapters: string[];
  children: React.ReactNode;
}

function Redacted({ chapterId, chapterName, unlockAll, readChapters, children }: RedactedProps) {
  const [hovered, setHovered] = useState(false);
  const isRevealed = unlockAll || readChapters.includes(chapterId);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={`transition-all duration-500 px-1 rounded-sm ${
          isRevealed 
            ? "bg-transparent text-white/90" 
            : "bg-[#0c0c14] text-transparent select-none cursor-help border-b border-[#e8185a]/40"
        }`}
        style={{ textShadow: isRevealed ? "none" : "0 0 8px rgba(0,0,0,0.9)" }}
      >
        {isRevealed ? children : "█".repeat(String(children).length || 8)}
      </span>
      <AnimatePresence>
        {hovered && !isRevealed && (
          <motion.span
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            className="absolute bottom-full left-1/2 mb-1.5 bg-[#e8185a] border-2 border-white px-2 py-0.5 rounded text-[8px] font-[var(--font-bangers)] text-white tracking-widest whitespace-nowrap shadow-[3px_3px_0_#000] z-30"
          >
            SPOILER: LEÉ "{chapterName.toUpperCase()}" PARA DEVELAR
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function LorePage() {
  const [activeTab, setActiveTab] = useState<"dossier" | "timeline" | "blueprints">("dossier");
  const [readChapters, setReadChapters] = useState<string[]>([]);
  const [unlockAll, setUnlockAll] = useState(false);
  
  // Timeline Active state
  const [selectedTimelineIdx, setSelectedTimelineIdx] = useState(0);

  // Blueprints states
  const [activeBlueprint, setActiveBlueprint] = useState<"vesper" | "visor" | "kinetic">("vesper");
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  useEffect(() => {
    try {
      const read = localStorage.getItem("read-chapters");
      if (read) setReadChapters(JSON.parse(read));
      
      const unlocked = localStorage.getItem("unlock-all") === "true";
      setUnlockAll(unlocked);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleUnlockAll = () => {
    const newVal = !unlockAll;
    setUnlockAll(newVal);
    localStorage.setItem("unlock-all", newVal ? "true" : "false");
    window.dispatchEvent(new Event("unlockAllChanged"));
  };

  // Timeline database
  const TIMELINE_EVENTS = [
    {
      phase: "Fase 1",
      title: "EL INCIDENTE DE LOS BACKROOMS",
      desc: "El grupo queda atrapado en el Nivel 0 de los Backrooms tras una falla en la resonancia dimensional. Al escapar, una descarga de energía cósmica pura altera su genética, marcándolos para siempre.",
      details: "Esto causa la dispersión dimensional inicial de Jaz, Ian, Uandi, Julián y Volvo a través de distintas coordenadas temporales, forzándolos a sobrevivir de manera aislada.",
      icon: "🚪"
    },
    {
      phase: "Fase 2",
      title: "LA FRAGMENTACIÓN EN L.A.",
      desc: "El nexo dimensional colapsa. Julián y Uandi caen en un callejón de Los Ángeles de una realidad alterna sin comprender que su trauma biológico ya los ha transformado en baterías de energía residual.",
      details: "Jaz permanece en la realidad 616 canalizando su aura en runas sagradas para estabilizar la grieta mística. Sofi se cruza con el grupo en Los Ángeles, alertada por las firmas acústicas sospechosas del portal.",
      icon: "⚡"
    },
    {
      phase: "Fase 3",
      title: "EL ENCUENTRO EN TIMES SQUARE",
      desc: "Volvo, huyendo de las variantes asesinas de Mati por portales cuánticos, cae desorientado en Times Square. Es catalogado como 'Null Vector' por agencias militares locales tras generar cortes masivos de red.",
      details: "En esta realidad alternativa cruzada por carteles de superhéroes fascistas ('Julander'), Volvo tiene su primer encuentro tenso de supervivencia cara a cara con Billy Butcher.",
      icon: "🗽"
    },
    {
      phase: "Fase 4",
      title: "LA FRACTURA PÚRPURA",
      desc: "Las variantes agresivas de Mati se unifican bajo el mando de Mati Prime, iniciando la Guerra Mativersal para absorber todos los nexos moleculares de la realidad.",
      details: "Frente a la debilidad de Uandi y los colapsos de naipes glitch de Julián, Ian empieza a diseñar los primeros exotrajes Vesperwing para coordinar la ofensiva de supervivencia del grupo.",
      icon: "🔮"
    }
  ];

  // Hotspots definitions for blueprints
  const HOTSPOTS = {
    vesper: [
      { id: "h1", x: 130, y: 55, label: "CASCO GHOSTLENS", desc: "HUD táctico con ópticas activas de espectro térmico e intercomunicador encriptado integrado." },
      { id: "h2", x: 130, y: 110, label: "EXOCHASIS DE TITANIO", desc: "Placas anatómicas modulares que absorben y desvían energía cinética directa." },
      { id: "h3", x: 80, y: 155, label: "GUANTELETES VECTORIALES", desc: "Dispositivos en muñecas calibrados para proyectar ráfagas cinéticas breves y desviar proyectiles." },
      { id: "h4", x: 190, y: 90, label: "CAPA DE PLANEADOR", desc: "Tejido refractario de supresión de radar y frenado aerodinámico controlado por inclinación." }
    ],
    visor: [
      { id: "v1", x: 130, y: 130, label: "THE APERTURE LENS", desc: "Filtro de cuarzo refractario que polariza y enfoca el flujo de plasma violeta de Mati." },
      { id: "v2", x: 75, y: 130, label: "DISIPADORES DE CALOR", desc: "Conductores de carbono que evacúan el calor extremo provocado por la fricción molecular." },
      { id: "v3", x: 185, y: 130, label: "NEXO DE ANCLAJE B", desc: "Puerto inalámbrico para sincronizar coordenadas tridimensionales con drones auxiliares de desvío." }
    ],
    kinetic: [
      { id: "k1", x: 110, y: 110, label: "RECEPTOR CUÁNTICO", desc: "Microestructura de tinta molecular inyectada que convierte fricción de impacto en carga cinética." },
      { id: "k2", x: 150, y: 150, label: "DIPOLO DE DESCARGA", desc: "Punto de liberación rúnica en nudillos para proyectar ondas expansivas a corta distancia." },
      { id: "k3", x: 130, y: 70, label: "VÁLVULA TÉRMICA", desc: "Alivio de vapor sobrecalentado para disipar el exceso de energía cuando el límite de retención peligra." }
    ]
  };

  return (
    <main className="min-h-screen bg-[#07070c] text-white selection:bg-[#e8185a] selection:text-white pb-20 relative overflow-hidden font-sans">
      {/* Sci-Fi grid backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] z-0" />
      
      <div className="max-w-5xl mx-auto px-6 pt-12 relative z-10">
        
        {/* Header and Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 border-b-3 border-white pb-6">
          <div>
            <Link href="/" className="inline-block text-xs font-[var(--font-bangers)] text-[#e8185a] tracking-widest hover:underline mb-2 uppercase">
              ← REGRESAR A LA CENTRAL
            </Link>
            <h1 className="font-[var(--font-bangers)] text-5xl sm:text-6xl text-[#f5e642] tracking-widest" style={{ textShadow: "3px 3px 0 #e8185a" }}>
              MULTIVERSAL DATABASE
            </h1>
          </div>
          
          {/* Unlock-all toggle (pop-art style) */}
          <button
            onClick={toggleUnlockAll}
            style={{
              backgroundColor: unlockAll ? "#e8185a" : "#1a1a25",
              borderColor: "#ffffff",
              boxShadow: "3px 3px 0 #000",
            }}
            className="px-4 py-2 border-2 text-[10px] sm:text-xs font-[var(--font-bangers)] tracking-widest uppercase transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer shrink-0"
          >
            {unlockAll ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-white" />
                <span>EXPEDIENTES REVELADOS</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-gray-400" />
                <span>ENCRIPTAR SPOILERS</span>
              </>
            )}
          </button>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex border-3 border-white bg-[#0e0e16] p-1 shadow-[5px_5px_0_#000] mb-12">
          {[
            { id: "dossier", label: "EXPEDIENTES CLASIFICADOS", icon: <BookOpen className="w-4 h-4 shrink-0" /> },
            { id: "timeline", label: "TIMELINE DEL MULTIVERSO", icon: <Calendar className="w-4 h-4 shrink-0" /> },
            { id: "blueprints", label: "PLANOS TÉCNICOS (BLUEPRINTS)", icon: <Cpu className="w-4 h-4 shrink-0" /> }
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 text-center flex items-center justify-center gap-2 font-[var(--font-bangers)] text-xs sm:text-sm tracking-wider transition-all cursor-pointer ${
                  active 
                    ? "bg-[#f5e642] text-[#0a0a0f] border-2 border-black shadow-[2px_2px_0_#000] translate-y-[-1px]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT: DOSSIER */}
        <AnimatePresence mode="wait">
          {activeTab === "dossier" && (
            <motion.div
              key="dossier"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              {/* SECTION 1 */}
              <section className="bg-[#0e0e16] border-2 border-white/10 p-6 sm:p-8 rounded relative shadow-[6px_6px_0_rgba(255,255,255,0.03)] border-l-4 border-l-[#e8185a]">
                <div className="absolute top-[-10px] left-6 bg-[#e8185a] px-3 py-0.5 text-[10px] font-[var(--font-bangers)] tracking-widest shadow-[2px_2px_0_#000]">
                  SECCIÓN I — SINOPSIS OPERATIVA
                </div>
                <h3 className="font-[var(--font-bangers)] text-2xl text-[#f5e642] mt-2 mb-4 tracking-widest">
                  ESTATUS LITERAL DEL CONFLICTO
                </h3>
                <div className="font-sans text-sm sm:text-base leading-relaxed text-gray-300 space-y-4">
                  <p>
                    Tras escapar de los Backrooms y recibir la descarga anómala que despertará sus poderes, el grupo quedó fracturado. 
                    <GlosarioLink id="ian"> Ian</GlosarioLink>, <GlosarioLink id="uandi">Uandi</GlosarioLink> y <GlosarioLink id="julian">Julián</GlosarioLink> se encuentran varados en la habitación de un hotel en Los Ángeles (universo alterno), 
                    procesando el trauma sin saber que el impacto energético pronto mutará a Uandi (batería cinética) y a Julián (ecos), mientras Ian permanecerá puramente humano. 
                    Junto a ellos está <GlosarioLink id="sofi">Sofi</GlosarioLink>, nativa de esta realidad, quien con su aguda audición ya sospecha de la amenaza inminente tras ver a Mati en las pantallas.
                  </p>
                  <p>
                    En el universo original (616), <GlosarioLink id="jaz">Jaz</GlosarioLink> continúa en su casa perfeccionando la clarividencia mística que les salvó la vida, mientras el <GlosarioLink id="mati">Mati original</GlosarioLink> permanece ajeno a que sus variantes malignas —lideradas por <strong className="text-[#e8185a]">Mati Prime</strong> desde su base tecnológica tras dispararle a Supertrucker— han iniciado la Guerra Mativersal.
                  </p>
                  <p>
                    Por otro lado, <GlosarioLink id="volvo">Volvo</GlosarioLink> se encuentra completamente aislado; tras escapar de Prime por portales y conseguir equipo nuevo en una ciudad cyberpunk, acaba de caer en la realidad de <em>The Boys</em> en pleno Times Square, donde tras ver un cartel de "Julander", se acaba de cruzar cara a cara con Billy Butcher.
                  </p>
                  <div className="p-4 bg-black/50 border border-[#f5e642]/30 rounded-sm text-[#f5e642] italic text-xs sm:text-sm mt-4">
                    <strong>ANÁLISIS DE CAMPO:</strong> La continuación inmediata debe mostrar los primeros síntomas incontrolables de sus poderes: 
                    {" "}<Redacted chapterId="the-green-truck-chronicles" chapterName="Chronicles #1" unlockAll={unlockAll} readChapters={readChapters}>Uandi rompiendo cosas sin querer por exceso de energía</Redacted>,
                    {" "}<Redacted chapterId="no-turning-back" chapterName="No Turning Back" unlockAll={unlockAll} readChapters={readChapters}>Julián viendo parpadeos de clones glitch en el espejo</Redacted>, 
                    y Volvo enfrentándose a Butcher usando su recién descubierto blink para sobrevivir, obligando a Ian a usar su ingenio y empezar a diseñar tecnología para compensar su falta de mutación y liderar a este nuevo y caótico grupo.
                  </div>
                </div>
              </section>

              {/* SECTION 2 */}
              <section className="bg-[#0e0e16] border-2 border-white/10 p-6 sm:p-8 rounded relative shadow-[6px_6px_0_rgba(255,255,255,0.03)] border-l-4 border-l-[#f5e642]">
                <div className="absolute top-[-10px] left-6 bg-[#f5e642] text-[#0a0a0f] px-3 py-0.5 text-[10px] font-[var(--font-bangers)] tracking-widest shadow-[2px_2px_0_#000]">
                  SECCIÓN II — REGISTRO DE ADQUISICIÓN DE PODERES
                </div>
                <h3 className="font-[var(--font-bangers)] text-2xl text-[#e8185a] mt-2 mb-6 tracking-widest">
                  ORIGEN DE LOS PODERES BIOLÓGICOS
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "ian", title: "IAN / VESPERWING", desc: "No posee poderes biológicos. Uandi se interpuso para protegerlo del rayo en los Backrooms y absorbió el impacto cuántico. Esa desventaja lo impulsó a convertirse en Vesperwing, diseñando tecnología táctica propia para competir en primera línea." },
                    { id: "uandi", title: "UANDI / AEGIS", desc: "Absorbió la mayor exposición a la radiación cuántica. Su estructura dérmica mutó, permitiéndole asimilar impactos físicos directamente en sus tatuajes tribales para acumularlos y devolverlos en descargas o súper saltos cinéticos." },
                    { id: "julian", title: "JULIÁN / WILDCARD", desc: "Modula energía estática inestable (glitch azul/rojo) para proyectar constructos de naipes filosos de corto alcance y clones temporales de estática degradable que puede detonar de manera estratégica." },
                    { id: "volvo", title: "VOLVO / NULL VECTOR", desc: "El escape extradimensional colapsó sus átomos con tecnología molecular de la Corriente. Desarrolló la capacidad de generar micro-teleportaciones cuánticas (blink) e intangibilidad atómica transitoria para evadir daño físico." },
                    { id: "mati", title: "MATI / SWAPFIRE", desc: "Su cuerpo es un nexo de calor del Mativerse. Brota plasma violeta puramente cinético/térmico por sus ojos que guía con precisión de cabeza gracias a su visor táctico, transponiendo materia y causando fricción molecular extrema." },
                    { id: "jaz", title: "JAZ / ORACLE", desc: "Sintonizó su conciencia espiritual a través del estudio de runas y gemas energéticas en 616. Posee capacidades de aura-anclaje para proyectar defensas cristalinas y entrelazar las conciencias en un vínculo astral cohesivo." },
                    { id: "sofi", title: "SOFI / HUSH", desc: "Nativa de la dimensión alterna. Carece de mutaciones biológicas; posee un oído absoluto y agudeza acústica refinada con entrenamiento ciego extremo. Ian complementa sus talentos con trajes silenciadores de vibraciones." }
                  ].map((item) => (
                    <div key={item.id} className="p-4 bg-black/40 border border-white/5 rounded-sm hover:border-[#f5e642]/30 transition-colors">
                      <span className="font-[var(--font-bangers)] text-lg text-white flex justify-between items-center tracking-wider">
                        <GlosarioLink id={item.id}>{item.title.split(" / ")[0]}</GlosarioLink>
                        <span className="text-[10px] text-gray-500 font-sans tracking-widest">{item.title.split(" / ")[1]}</span>
                      </span>
                      <p className="font-sans text-xs text-gray-400 mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 3 */}
              <section className="bg-[#0e0e16] border-2 border-white/10 p-6 sm:p-8 rounded relative shadow-[6px_6px_0_rgba(255,255,255,0.03)] border-l-4 border-l-[#10b981]">
                <div className="absolute top-[-10px] left-6 bg-[#10b981] px-3 py-0.5 text-[10px] font-[var(--font-bangers)] tracking-widest shadow-[2px_2px_0_#000]">
                  SECCIÓN III — EXPEDIENTES DE IDENTIDADES HEROICAS
                </div>
                <h3 className="font-[var(--font-bangers)] text-2xl text-[#f5e642] mt-2 mb-6 tracking-widest">
                  GÉNESIS DE LOS ALIAS TÁCTICOS
                </h3>

                <div className="space-y-4">
                  {[
                    { id: "julian", name: "Julián → Wildcard", text: "No viene de sus poderes, sino de su personalidad caótica. En una misión táctica, cuando saca 'una carta buena' improvisada de estática azul que salva la retirada, Mati lo bautiza como un wildcard literal." },
                    { id: "jaz", name: "Jaz → Oracle", text: "Nace como una broma de Uandi al verla rodeada de grimorios astrales interpretando anomalías: 'Preguntale al oráculo. Seguro ya sabe qué va a explotar.' Eventualmente se convierte en el ancla clarividente del grupo." },
                    { id: "sofi", name: "Sofi → Hush", text: "Proviene de la reputación que infunde en los foros criminales del bajo fondo en Los Ángeles alterno: 'Si Hush te escucha, estás acabado.' Sofi adopta el alias tras descubrir que Ian leía esos registros." },
                    { id: "uandi", name: "Uandi → Aegis", text: "Aparece después de que Uandi se pone delante del grupo para recibir un impacto colosal de artillería. Alguien comenta: 'Ese tipo es un escudo.' A lo que Ian responde: 'No es un escudo. Es una maldita Aegis.'", extra: "Uandi se dirige rústicamente a otros usando 'Bub'." },
                    { id: "volvo", name: "Volvo → Null Vector", text: "Originado de los expedientes tácticos militares paralelos. Su mera presencia anula comunicaciones e interfiere sensores, siendo catalogado como el vector nulo donde todo sistema deja de operar." },
                    { id: "mati", name: "Mati → Swapfire", text: "Intercambia el estado de la materia alternando plasma puramente sólido (cinético) y fuego cruzado térmico mediante anclajes dimensionales en sus ojos.", extra: "Julián se niega a usar su alias y solo le dice 'el mati' o 'el mati de mierda'." },
                    { id: "ian", name: "Ian → Vesperwing", text: "Es el único que elige su propio alias. Cree firmemente que la identidad heroica debe ser diseñada con la misma frialdad analítica que un exochasis o un algoritmo de soporte." }
                  ].map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 bg-black/20 border-b border-white/5 last:border-0 hover:bg-black/45 transition-colors rounded-sm">
                      <div className="w-1 bg-[#10b981] shrink-0" style={{ backgroundColor: GLOSARIO_CHARS[item.id]?.color }} />
                      <div className="flex-1">
                        <span className="font-bold text-base text-white tracking-wider flex items-center gap-2">
                          <GlosarioLink id={item.id}>{item.name.split(" → ")[0]}</GlosarioLink> 
                          <span className="text-gray-400 font-normal">→</span>
                          <span className="font-[var(--font-bangers)] text-sm tracking-widest uppercase" style={{ color: GLOSARIO_CHARS[item.id]?.color }}>
                            {item.name.split(" → ")[1]}
                          </span>
                        </span>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">
                          {item.text}
                        </p>
                        {item.extra && (
                          <p className="text-[10px] text-[#f5e642]/60 mt-1 italic uppercase tracking-wider">
                            DATOS COMPLEMENTARIOS: {item.extra}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* TAB CONTENT: TIMELINE */}
          {activeTab === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Timeline Horizontal Selector */}
              <div className="bg-[#0e0e16] border-4 border-white p-6 shadow-[5px_5px_0_#000] relative">
                <div className="absolute top-[-12px] left-6 bg-[#e8185a] border border-white px-2 py-0.5 text-[9px] font-[var(--font-bangers)] tracking-widest shadow-[2px_2px_0_#000] rotate-[-1deg]">
                  CRONOLOGÍA MULTIVERSAL
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {TIMELINE_EVENTS.map((event, idx) => {
                    const isSelected = selectedTimelineIdx === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedTimelineIdx(idx)}
                        style={{
                          backgroundColor: isSelected ? "#f5e642" : "#1a1a25",
                          color: isSelected ? "#0a0a0f" : "#ffffff",
                          boxShadow: isSelected ? "3px 3px 0 #e8185a" : "3px 3px 0 #000",
                          borderColor: isSelected ? "#ffffff" : "rgba(255,255,255,0.1)"
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

              {/* Selected Hito Details Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTimelineIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#0e0e16] border-2 border-white/10 p-6 sm:p-8 rounded relative shadow-[6px_6px_0_rgba(255,255,255,0.03)] flex flex-col md:flex-row gap-6 items-start"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#f5e642]/10 border-2 border-[#f5e642] flex items-center justify-center text-2xl sm:text-3xl shrink-0">
                    {TIMELINE_EVENTS[selectedTimelineIdx].icon}
                  </div>
                  <div className="flex-1">
                    <span className="font-[var(--font-bangers)] text-[#e8185a] text-sm tracking-widest uppercase block">
                      {TIMELINE_EVENTS[selectedTimelineIdx].phase}
                    </span>
                    <h3 className="font-[var(--font-bangers)] text-2xl sm:text-3xl text-[#f5e642] leading-none mt-1 mb-4 tracking-widest">
                      {TIMELINE_EVENTS[selectedTimelineIdx].title}
                    </h3>
                    <p className="font-sans text-sm sm:text-base leading-relaxed text-gray-200 mb-4">
                      {TIMELINE_EVENTS[selectedTimelineIdx].desc}
                    </p>
                    <div className="p-4 bg-black/45 border-l-3 border-[#10b981] rounded-r-sm text-xs text-gray-400">
                      <strong className="text-white block font-[var(--font-bangers)] text-[10px] tracking-wider uppercase mb-1">
                        INFORME DE CAUSALIDAD:
                      </strong>
                      {TIMELINE_EVENTS[selectedTimelineIdx].details}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {/* TAB CONTENT: BLUEPRINTS */}
          {activeTab === "blueprints" && (
            <motion.div
              key="blueprints"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Selector */}
              <div className="flex gap-2 justify-center">
                {[
                  { id: "vesper", label: "EXOCHASIS VESPERWING MK3" },
                  { id: "visor", label: "VISOR DE CALIBRACIÓN SWAPFIRE" },
                  { id: "kinetic", label: "GUANTELETES VECTORIALES AEGIS" }
                ].map((bp) => (
                  <button
                    key={bp.id}
                    onClick={() => {
                      setActiveBlueprint(bp.id as any);
                      setActiveHotspot(null);
                    }}
                    style={{
                      backgroundColor: activeBlueprint === bp.id ? "#0284c7" : "#1a1a25",
                      color: activeBlueprint === bp.id ? "#ffffff" : "#cbd5e1",
                      boxShadow: activeBlueprint === bp.id ? "3px 3px 0 #000" : "2px 2px 0 #000",
                      borderColor: activeBlueprint === bp.id ? "#ffffff" : "rgba(255,255,255,0.1)"
                    }}
                    className="px-3.5 py-2 border font-[var(--font-bangers)] text-[10px] sm:text-xs tracking-wider uppercase transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    {bp.label}
                  </button>
                ))}
              </div>

              {/* Interactive SVG Display */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#090d16] border-2 border-[#0284c7]/40 p-6 rounded shadow-[8px_8px_0_rgba(2,132,199,0.15)] relative min-h-[380px]">
                <div className="absolute top-[-10px] left-6 bg-[#0284c7] px-3 py-0.5 text-[10px] font-[var(--font-bangers)] tracking-widest shadow-[2px_2px_0_#000]">
                  PLANOS DE INGENIERÍA VIRTUAL
                </div>
                
                {/* SVG Visual Panel */}
                <div className="md:col-span-6 flex items-center justify-center bg-black/60 border border-[#0284c7]/20 rounded relative min-h-[300px] overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_95%,rgba(2,132,199,0.5)_95%)] bg-[size:100%_12px]" />
                  
                  {activeBlueprint === "vesper" && (
                    <svg width="260" height="280" viewBox="0 0 260 280" className="text-[#0284c7]">
                      {/* Outlines representing armor */}
                      <rect x="90" y="40" width="80" height="150" rx="10" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-25" />
                      <circle cx="130" cy="55" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
                      {/* Wings */}
                      <path d="M90 70 L20 110 L90 130" fill="none" stroke="currentColor" strokeWidth="2" />
                      <path d="M170 70 L240 110 L170 130" fill="none" stroke="currentColor" strokeWidth="2" />
                      {/* Laser pointer lines */}
                      <line x1="130" y1="190" x2="130" y2="250" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
                      
                      {/* Hotspots */}
                      {HOTSPOTS.vesper.map((hs) => (
                        <g key={hs.id} className="cursor-pointer" onClick={() => setActiveHotspot(hs.id)}>
                          <circle cx={hs.x} cy={hs.y} r="12" fill="rgba(2,132,199,0.15)" stroke="currentColor" strokeWidth="1" className="animate-pulse" />
                          <circle cx={hs.x} cy={hs.y} r="5" fill="#f5e642" stroke="#ffffff" strokeWidth="1.5" />
                        </g>
                      ))}
                    </svg>
                  )}

                  {activeBlueprint === "visor" && (
                    <svg width="260" height="280" viewBox="0 0 260 280" className="text-[#a855f7]">
                      {/* Visor Frame outlines */}
                      <rect x="50" y="100" width="160" height="60" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
                      <circle cx="130" cy="130" r="22" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-30" />
                      <circle cx="130" cy="130" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      {/* Calibrators */}
                      <line x1="50" y1="130" x2="70" y2="130" stroke="currentColor" strokeWidth="2" />
                      <line x1="210" y1="130" x2="190" y2="130" stroke="currentColor" strokeWidth="2" />
                      
                      {/* Hotspots */}
                      {HOTSPOTS.visor.map((hs) => (
                        <g key={hs.id} className="cursor-pointer" onClick={() => setActiveHotspot(hs.id)}>
                          <circle cx={hs.x} cy={hs.y} r="12" fill="rgba(168,85,247,0.15)" stroke="currentColor" strokeWidth="1" className="animate-pulse" />
                          <circle cx={hs.x} cy={hs.y} r="5" fill="#f5e642" stroke="#ffffff" strokeWidth="1.5" />
                        </g>
                      ))}
                    </svg>
                  )}

                  {activeBlueprint === "kinetic" && (
                    <svg width="260" height="280" viewBox="0 0 260 280" className="text-[#ef4444]">
                      {/* Glove / Arm outlines */}
                      <path d="M80 80 L180 80 L160 220 L100 220 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
                      <circle cx="130" cy="110" r="18" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-30" />
                      <path d="M110 150 L150 150" fill="none" stroke="currentColor" strokeWidth="2" />
                      <path d="M120 160 L140 160" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      
                      {/* Hotspots */}
                      {HOTSPOTS.kinetic.map((hs) => (
                        <g key={hs.id} className="cursor-pointer" onClick={() => setActiveHotspot(hs.id)}>
                          <circle cx={hs.x} cy={hs.y} r="12" fill="rgba(239,68,68,0.15)" stroke="currentColor" strokeWidth="1" className="animate-pulse" />
                          <circle cx={hs.x} cy={hs.y} r="5" fill="#f5e642" stroke="#ffffff" strokeWidth="1.5" />
                        </g>
                      ))}
                    </svg>
                  )}
                </div>

                {/* Hotspot details panel */}
                <div className="md:col-span-6 flex flex-col justify-center">
                  {activeHotspot ? (() => {
                    const hsList = HOTSPOTS[activeBlueprint];
                    const hsData = hsList.find((h) => h.id === activeHotspot);
                    if (!hsData) return <div className="text-gray-500 italic text-sm">Seleccioná un punto interactivo en el plano.</div>;

                    return (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-5 bg-black/40 border border-[#0284c7]/20 rounded relative"
                      >
                        <span className="font-[var(--font-bangers)] text-[9px] text-[#f5e642] tracking-widest block uppercase">
                          SISTEMA SELECCIONADO
                        </span>
                        <h4 className="font-[var(--font-bangers)] text-xl text-white tracking-widest mt-1 mb-2">
                          {hsData.label}
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed">
                          {hsData.desc}
                        </p>
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
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
