"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import { GlosarioLink } from "./GlosarioLink";
import { Redacted } from "./Redacted";
import { getComputedCharacters } from "@/lib/characterData";

interface DossierTabProps {
  unlockAll: boolean;
  readChapters: string[];
}

const POWER_ORIGINS = [
  { id: "ian",    title: "IAN / VESPERWING",  desc: "No posee poderes biológicos. Uandi se interpuso para protegerlo del rayo en los Backrooms y absorbió el impacto arcano. Esa desventaja lo impulsó a convertirse en Vesperwing, diseñando tecnología táctica propia para competir en primera línea." },
  { id: "uandi",  title: "UANDI / AEGIS",  desc: "Su estructura celular asimiló el impacto provocando una mutación: su cuerpo reacciona ante la agresión aumentando drásticamente su ira y activando una regeneración instantánea. Sin embargo, esta furia extrema invoca a su \"otro yo\", un demonio llamado Aegis, y Uandi no sabe qué hace cuando se convierte en él." },
  { id: "julian", title: "JULIÁN / BANDIT",   desc: "Modula energía estática inestable (glitch azul/rojo) para proyectar constructos de naipes filosos de corto alcance y clones temporales de estática degradable que puede detonar de manera estratégica." },
  { id: "volvo",  title: "VOLVO / OUTRIDER",  desc: "DETALLES CLASIFICADOS. El origen exacto de sus habilidades atómicas y su contacto con la Corriente sigue bajo estricto secreto operativo. Se ha documentado su capacidad para generar estelas de portales mediante velocidad de escape e intangibilidad atómica transitoria, pero el detonante biológico permanece sin registrar." },
  { id: "mati",   title: "MATI / FARSIGHT",   desc: "Su cuerpo es una dimensión nexo entre todas las existentes, manifestando una poderosa energía multiversal a través de sus ojos como un portal físico a otra dimensión de plasma violeta pura regulado con un visor de conducción táctica." },
  { id: "jaz",    title: "JAZ / SIGIL",       desc: "Sintonizó su conciencia espiritual a través del estudio de runas y gemas energéticas en 616. Posee capacidades de aura-anclaje para proyectar defensas cristalinas de energía psíquica dorada y entrelazar las conciencias en un vínculo astral cohesivo." },
  { id: "sofi",   title: "SOFI / DUSK",       desc: "Nativa de la dimensión alterna. Carece de mutaciones biológicas; posee un oído absoluto y agudeza acústica refinada con entrenamiento ciego extremo. Ian complementa sus talentos con trajes silenciadores de vibraciones." },
];

const ALIAS_ORIGINS = [
  { id: "julian", name: "Julián → Bandit",    text: "Proviene de su obsesión con el póker, los juegos de cartas y las máquinas de casino (conocidas como 'one-armed bandits'). En una misión crítica, cuando Ian lo mira limpiar la mesa y quedarse con todas las ventajas del enemigo de forma imprevista, le dice que se llevó todo como un bandido.", extra: "Llama 'wachin' o 'wacha' para berretinear dependiendo del género. A su novia misteriosa le dice 'wawi'." },
  { id: "jaz",    name: "Jaz → Sigil",        text: "Proviene de su capacidad para trazar y manifestar runas y símbolos de protección (sigilos) que erigen las defensas del grupo y entrelazan sus mentes. Ian la bautiza formalmente como Sigil al ver su control defensivo.", extra: "Antes de misiones pesadas quema palo santo o recurre a sus piedras para limpiar la vibración." },
  { id: "sofi",   name: "Sofi → Dusk",        text: "Nace de su capacidad para fundirse en la penumbra y combatir a ciegas. Al destruir las luces del entorno, sume a los criminales en la oscuridad ('dusk') donde ella es letal y ellos no pueden verla venir.", extra: "Suele refugiarse a oscuras para apaciguar el zumbido constante de su audición hiperfocalizada." },
  { id: "uandi",  name: "Uandi → Aegis",   text: "Su 'otro yo' es un demonio llamado Aegis. Uandi no sabe qué hace cuando se convierte en él, perdiendo la noción de sus actos. 'Brimstone' (el calor infernal y el vapor ardiente) queda como una habilidad que emana de su cuerpo en este estado transformado.", extra: "Toma mate, maneja y amaga con cocinar asado que termina en guiso. Llama a otros 'pibe', 'loco' o 'maestro'." },
  { id: "volvo",  name: "Volvo → Outrider",   text: "Nace de su capacidad para correr a la vanguardia, explorar terreno y abrir portales rápidos de escape, actuando como el explorador ('outrider') definitivo que flanquea al enemigo.", extra: "Siempre está picando snacks o barritas por el enorme desgaste calórico de su vibración arcana." },
  { id: "mati",   name: "Mati → Farsight",    text: "Representa la inmensa distancia de donde proviene su energía y su capacidad para proyectar ráfagas multiversales precisas que destruyen amenazas lejanas (farsight), guiadas por completo por su mirada.", extra: "Julián se niega a usar su alias y solo le dice 'el mati' o 'el mati de mierda'." },
  { id: "ian",    name: "Ian → Vesperwing",   text: "Es el único que elige su propio alias. Cree firmemente que la identidad heroica debe ser diseñada con la misma frialdad analítica que un exochasis o un algoritmo de soporte.", extra: "Se comunica con jerga táctica y consume dosis peligrosas de café negro para su hiperenfoque." },
];

const LOCATIONS = [
  {
    id: "parker",
    name: "EDIFICIO PARKER (PARKER TOWER)",
    subtitle: "Sede Corporativa de Parker Industries",
    color: "#3b82f6",
    borderColor: "border-[#3b82f6]",
    badgeBg: "bg-[#3b82f6]",
    control: "Norman Parker (The Maker)",
    status: "Operativo / Bajo Monitoreo",
    desc: "Un colosal rascacielos corporativo futurista de grafito negro y cristales azules que se alza sobre Manhattan. Detrás de sus fachadas de lujo, alberga laboratorios de última generación, hangares robóticos subterráneos para mechas de combate y sistemas de escaneo biométrico avanzados de espectro arcano.",
    lore: "Tras la destrucción de la base de Los Pibes en Dumbo, Ian se vio obligado a pactar con su manipulador exmentor Norman Parker para refugiarse allí junto a Mati, Uandi y Julián. Aunque el edificio funciona como un santuario blindado contra las fuerzas tácticas de V.O.P.S., Norman Parker ya utiliza los sensores del lobby para recolectar en secreto sus firmas biométricas multiversales a cambio del soporte técnico."
  },
  {
    id: "nadir",
    name: "EL NADIR",
    subtitle: "El Reino Subterráneo de Manhattan",
    color: "#ef4444",
    borderColor: "border-[#ef4444]",
    badgeBg: "bg-[#ef4444]",
    control: "Severine Alucard (La Reina del Nadir)",
    status: "Clandestino / Aislado",
    desc: "Una antigua y oculta civilización subterránea construida en los cimientos olvidados de la ciudad: criptas coloniales, catedrales sepultadas y redes de metro clausuradas. Iluminada por neones y un resplandor rojo-negro, sirve de hogar para miles de vampiros organizados bajo el Pacto de las Venas.",
    lore: "El Nadir opera con sistemas y bases de datos completamente cerrados e impenetrables desde el exterior. Tras el asedio del Comandante R.E.G.U.L.A.R., Los Pibes usaron sus túneles como ruta de escape. Allí, Severine Alucard rescató y marcó el cuello de Julián para saldar la deuda de su rescate, sembrando una futura tensión para el grupo."
  }
];

import { GLOSARIO_CHARS } from "./GlosarioLink";

export function DossierTab({ unlockAll, readChapters }: DossierTabProps) {
  const [activeCategory, setActiveCategory] = useState<string>("pibes");
  const [expandedLocation, setExpandedLocation] = useState<string | null>(null);

  const normalizedRead = readChapters.map((c) => decodeURIComponent(c).toLowerCase().trim());
  const hasReadLaCaceria = unlockAll || normalizedRead.includes("la caceria");

  const computedChars = getComputedCharacters(readChapters, true, unlockAll);

  const getGroupedCharacters = (cat: string) => {
    return computedChars.filter((c) => {
      if (cat === "pibes") return c.category === "pibes";
      if (cat === "antagonistas") return c.category === "antagonistas";
      if (cat === "deidades") return c.category === "deidades";
      if (cat === "entidades") return c.category === "entidades";
      if (cat === "secundarios") {
        return ["secundarios", "independientes", "taberna_resistencia", "voughtverse", "matis"].includes(c.category);
      }
      return false;
    });
  };

  const CATEGORIES = [
    { id: "pibes", label: "LOS PIBES" },
    { id: "antagonistas", label: "ANTAGONISTAS" },
    { id: "secundarios", label: "ALIADOS Y SOPORTE" },
    { id: "deidades", label: "DEIDADES" },
    { id: "entidades", label: "ENTIDADES" },
  ];

  return (
    <motion.div
      key="dossier"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-10"
    >
      {/* SECTION 1 — Sinopsis */}
      <section className="bg-[#0e0e16] border-2 border-white/10 p-6 sm:p-8 rounded relative shadow-[6px_6px_0_rgba(255,255,255,0.03)] border-l-4 border-l-[#e8185a]">
        <div className="absolute top-[-10px] left-6 bg-[#e8185a] px-3 py-0.5 text-[10px] font-[var(--font-bangers)] tracking-widest shadow-[2px_2px_0_#000]">
          SECCIÓN I — SINOPSIS OPERATIVA
        </div>
        <h3 className="font-[var(--font-bangers)] text-2xl text-[#f5e642] mt-2 mb-4 tracking-widest">ESTATUS LITERAL DEL CONFLICTO</h3>
        <div className="font-sans text-sm sm:text-base leading-relaxed text-gray-300 space-y-4">
          <p>
            Tras escapar de los Backrooms y recibir la descarga anómala que despertará sus poderes, el grupo quedó fracturado.{" "}
            <GlosarioLink id="ian">Ian</GlosarioLink>, <GlosarioLink id="uandi">Uandi</GlosarioLink> y <GlosarioLink id="julian">Julián</GlosarioLink> se encuentran varados en la habitación de un hotel en Los Ángeles (universo alterno),
            procesando el trauma sin saber que el impacto energético pronto mutará a Uandi (batería cinética) y a Julián (ecos), mientras Ian permanecerá puramente humano.
            Junto a ellos está <GlosarioLink id="sofi">Sofi</GlosarioLink>, nativa de esta realidad, quien con su aguda audición ya sospecha de la amenaza inminente tras ver a Mati en las pantallas.
          </p>
          <p>
            En el universo original (616), <GlosarioLink id="jaz">Jaz</GlosarioLink> continúa en su casa perfeccionando la clarividencia mística que les salvó la vida, mientras el{" "}
            <GlosarioLink id="mati">Mati original</GlosarioLink> permanece ajeno a que sus variantes malignas —lideradas por <strong className="text-[#e8185a]">Mati Prime</strong>— han iniciado la Guerra Mativersal.
          </p>
          <p>
            Por otro lado, <GlosarioLink id="volvo">Volvo</GlosarioLink> se encuentra completamente aislado; tras huir cuando Mati disparó al Supercamionero por una inestabilidad de sus poderes, esperaba encontrarse con los chicos, pero en su lugar cayó en este universo distorsionado donde el destino de los personajes fue diferente, así como la manifestación de sus poderes.
          </p>
          <div className="p-4 bg-black/50 border border-[#f5e642]/30 rounded-sm text-[#f5e642] italic text-xs sm:text-sm mt-2">
            <strong>ANÁLISIS DE CAMPO:</strong> La continuación inmediata debe mostrar los primeros síntomas incontrolables de sus poderes:{" "}
            <Redacted chapterId="the-green-truck-chronicles" chapterName="Chronicles #1" unlockAll={unlockAll} readChapters={readChapters}>Uandi doblando estructuras sin querer por acumulación extrema de energía cinética pura</Redacted>,{" "}
            <Redacted chapterId="no-turning-back" chapterName="No Turning Back" unlockAll={unlockAll} readChapters={readChapters}>Julián viendo desfases de estática glitch cian y magenta en el espejo</Redacted>,
            y Volvo descubriendo las anomalías de este universo alterno.
          </div>
        </div>
      </section>

      {/* SECTION 2 — Poderes */}
      <section className="bg-[#0e0e16] border-2 border-white/10 p-6 sm:p-8 rounded relative shadow-[6px_6px_0_rgba(255,255,255,0.03)] border-l-4 border-l-[#f5e642]">
        <div className="absolute top-[-10px] left-6 bg-[#f5e642] text-[#0a0a0f] px-3 py-0.5 text-[10px] font-[var(--font-bangers)] tracking-widest shadow-[2px_2px_0_#000]">
          SECCIÓN II — REGISTRO DE ADQUISICIÓN DE PODERES
        </div>
        <h3 className="font-[var(--font-bangers)] text-2xl text-[#e8185a] mt-2 mb-6 tracking-widest">ORIGEN DE LOS PODERES BIOLÓGICOS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {POWER_ORIGINS.map((item) => (
            <div key={item.id} className="p-4 bg-black/40 border border-white/5 rounded-sm hover:border-[#f5e642]/30 transition-colors">
              <span className="font-[var(--font-bangers)] text-lg text-white flex justify-between items-center tracking-wider">
                <GlosarioLink id={item.id}>{item.title.split(" / ")[0]}</GlosarioLink>
                <span className="text-[10px] text-gray-500 font-sans tracking-widest">{item.title.split(" / ")[1]}</span>
              </span>
              <p className="font-sans text-xs text-gray-400 mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — Alias */}
      <section className="bg-[#0e0e16] border-2 border-white/10 p-6 sm:p-8 rounded relative shadow-[6px_6px_0_rgba(255,255,255,0.03)] border-l-4 border-l-[#10b981]">
        <div className="absolute top-[-10px] left-6 bg-[#10b981] px-3 py-0.5 text-[10px] font-[var(--font-bangers)] tracking-widest shadow-[2px_2px_0_#000]">
          SECCIÓN III — EXPEDIENTES DE IDENTIDADES HEROICAS
        </div>
        <h3 className="font-[var(--font-bangers)] text-2xl text-[#f5e642] mt-2 mb-6 tracking-widest">GÉNESIS DE LOS ALIAS TÁCTICOS</h3>
        <div className="space-y-4">
          {ALIAS_ORIGINS.map((item) => (
            <div key={item.id} className="flex gap-4 p-3 bg-black/20 border-b border-white/5 last:border-0 hover:bg-black/45 transition-colors rounded-sm">
              <div className="w-1 shrink-0" style={{ backgroundColor: GLOSARIO_CHARS[item.id]?.color }} />
              <div className="flex-1">
                <span className="font-bold text-base text-white tracking-wider flex items-center gap-2">
                  <GlosarioLink id={item.id}>{item.name.split(" → ")[0]}</GlosarioLink>
                  <span className="text-gray-400 font-normal">→</span>
                  <span className="font-[var(--font-bangers)] text-sm tracking-widest uppercase" style={{ color: GLOSARIO_CHARS[item.id]?.color }}>
                    {item.name.split(" → ")[1]}
                  </span>
                </span>
                <p className="text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">{item.text}</p>
                {item.extra && (
                  <p className="text-[10px] text-[#f5e642]/60 mt-1 italic uppercase tracking-wider">DATOS COMPLEMENTARIOS: {item.extra}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — Archivos Geográficos (Locaciones) */}
      <section className="bg-[#0e0e16] border-2 border-white/10 p-6 sm:p-8 rounded relative shadow-[6px_6px_0_rgba(255,255,255,0.03)] border-l-4 border-l-[#a855f7]">
        <div className="absolute top-[-10px] left-6 bg-[#a855f7] px-3 py-0.5 text-[10px] font-[var(--font-bangers)] tracking-widest shadow-[2px_2px_0_#000]">
          SECCIÓN IV — ARCHIVOS GEOGRÁFICOS (LOCACIONES)
        </div>
        <h3 className="font-[var(--font-bangers)] text-2xl text-[#f5e642] mt-2 mb-6 tracking-widest">
          PUNTOS DE INTERÉS MULTIVERSAL
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LOCATIONS.map((loc) => {
            const isExpanded = expandedLocation === loc.id;
            
            if (!hasReadLaCaceria) {
              return (
                <div
                  key={loc.id}
                  className="border-2 p-5 bg-black/40 rounded-sm relative overflow-hidden flex flex-col justify-between border-white/5 opacity-70"
                >
                  <div>
                    <span className="text-[9px] font-[var(--font-bangers)] tracking-widest text-red-500 uppercase flex items-center gap-1.5 mb-2">
                      <Lock className="w-3 h-3" /> UBICACIÓN CLASIFICADA // ENCRIPTADO
                    </span>
                    <h4 className="font-[var(--font-bangers)] text-xl text-zinc-500 tracking-wide mt-1 mb-2">
                      ████████████████
                    </h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-600 font-mono mb-4 border-b border-white/5 pb-2">
                      <div>
                        <span className="text-zinc-700">CONTROL:</span> ██████████
                      </div>
                      <div>
                        <span className="text-zinc-700">ESTADO:</span> RESTRINGIDO
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                      El acceso a las coordenadas físicas y al informe táctico de esta locación se encuentra bloqueado por la directiva de seguridad de V.O.P.S.
                    </p>
                  </div>
                  
                  <div className="mt-4 p-3 bg-red-950/20 border border-red-900/30 rounded text-[10px] text-red-400 font-mono leading-tight">
                    ⚠ Requiere completar la lectura de <strong>"Distrito Nulo #3: La Cacería"</strong> para iniciar el descifrado.
                  </div>
                </div>
              );
            }

            return (
              <div
                key={loc.id}
                className={`border-2 p-5 bg-black/30 rounded-sm transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isExpanded ? "border-white" : "border-white/10 hover:border-white/20"
                }`}
                style={{
                  boxShadow: isExpanded ? `6px 6px 0 ${loc.color}25` : "4px 4px 0 rgba(0,0,0,0.4)"
                }}
              >
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none filter blur-xl rounded-full"
                  style={{ backgroundColor: loc.color }}
                />
                
                <div>
                  <span className="text-[10px] font-[var(--font-bangers)] tracking-widest uppercase" style={{ color: loc.color }}>
                    {loc.subtitle}
                  </span>
                  <h4 className="font-[var(--font-bangers)] text-xl text-white tracking-wide mt-1 mb-2">
                    {loc.name}
                  </h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-400 font-mono mb-4 border-b border-white/5 pb-2">
                    <div>
                      <span className="text-zinc-600">CONTROL:</span> {loc.control}
                    </div>
                    <div>
                      <span className="text-zinc-600">ESTADO:</span> {loc.status}
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    {loc.desc}
                  </p>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-white/5 pt-3 mt-3"
                      >
                        <span className="text-[9px] font-[var(--font-bangers)] tracking-widest text-[#f5e642] block mb-1">
                          REGISTRO DE CAMPO / TRASFONDO
                        </span>
                        <p className="text-xs text-gray-400 leading-relaxed italic">
                          {loc.lore}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <button
                  onClick={() => setExpandedLocation(isExpanded ? null : loc.id)}
                  className="mt-4 w-full py-1.5 border border-white/10 hover:border-white/30 text-[10px] font-[var(--font-bangers)] tracking-widest uppercase transition-all bg-black/40 hover:bg-black/60 cursor-pointer flex items-center justify-center gap-1.5"
                  style={{ color: loc.color }}
                >
                  <span>{isExpanded ? "OCULTAR REGISTROS" : "REVELAR EXPEDIENTE"}</span>
                  <span>{isExpanded ? "▲" : "▼"}</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5 — CATEGORÍAS Y EXPEDIENTES */}
      <section className="bg-[#0e0e16] border-2 border-white/10 p-6 sm:p-8 rounded relative shadow-[6px_6px_0_rgba(255,255,255,0.03)] border-l-4 border-l-[#3b82f6]">
        <div className="absolute top-[-10px] left-6 bg-[#3b82f6] px-3 py-0.5 text-[10px] font-[var(--font-bangers)] tracking-widest shadow-[2px_2px_0_#000]">
          SECCIÓN V — EXPEDIENTES DE LA BASE DE DATOS
        </div>
        <h3 className="font-[var(--font-bangers)] text-2xl text-[#f5e642] mt-2 mb-6 tracking-widest">
          DIRECTORIO DE EXPEDIENTES
        </h3>
        
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center sm:justify-start">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 border-2 font-[var(--font-bangers)] text-xs tracking-wider uppercase transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                  isActive
                    ? "bg-[#3b82f6] text-white border-white shadow-[3px_3px_0_#000]"
                    : "bg-[#181824] text-gray-400 border-white/15 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Character list/grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {getGroupedCharacters(activeCategory).map((char) => {
            const isUnlocked = !char.incognito;
            const cardImg = char.image || char.fullBody;
            return (
              <div
                key={char.id}
                onClick={() => {
                  if (isUnlocked) {
                    window.dispatchEvent(new CustomEvent("open-character-modal", { detail: { id: char.id } }));
                  }
                }}
                className={`relative border-2 p-2 flex flex-col bg-black/40 rounded transition-all duration-300 ${
                  isUnlocked ? "cursor-pointer hover:border-[#3b82f6] hover:scale-105 hover:bg-black/60" : "opacity-60 cursor-not-allowed"
                }`}
                style={{
                  borderColor: isUnlocked ? `${char.color}50` : "rgba(255,255,255,0.06)",
                  boxShadow: isUnlocked ? `4px 4px 0 ${char.color}15` : "none",
                }}
              >
                {/* Character portrait/locked box */}
                <div className="w-full aspect-square overflow-hidden bg-zinc-900 rounded mb-2 relative flex items-center justify-center border border-white/5">
                  {isUnlocked && cardImg ? (
                    <img
                      src={cardImg}
                      alt={char.displayName}
                      className="w-full h-full object-cover object-top transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          // Prevent duplicate fallbacks
                          if (parent.querySelector('.image-fallback-container')) return;
                          const fallback = document.createElement('div');
                          fallback.className = "image-fallback-container flex flex-col items-center justify-center p-3 text-center w-full h-full bg-zinc-950/80 absolute inset-0";
                          fallback.innerHTML = `
                            <svg class="w-8 h-8 text-zinc-600 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                            <span class="text-[9px] text-zinc-500 font-mono">SIN PORTADA</span>
                          `;
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-3 text-center w-full h-full bg-zinc-950/80 absolute inset-0">
                      {!isUnlocked ? (
                        <>
                          <Lock className="w-6 h-6 text-gray-600 mb-1" />
                          <span className="text-[9px] text-gray-600 font-[var(--font-bangers)] uppercase tracking-wider">
                            ENCRIPTADO
                          </span>
                        </>
                      ) : (
                        <>
                          <svg className="w-8 h-8 text-zinc-600 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          <span className="text-[9px] text-zinc-500 font-mono">SIN PORTADA</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Character Name / Info */}
                <div className="text-center min-w-0">
                  <span className="font-[var(--font-bangers)] text-xs sm:text-sm tracking-wider uppercase block truncate" style={{ color: isUnlocked ? char.color : "#6b7280" }}>
                    {char.displayName}
                  </span>
                  {isUnlocked ? (
                    <span className="text-[9px] text-gray-400 block truncate uppercase tracking-widest font-[var(--font-marker)]">
                      {char.role}
                    </span>
                  ) : (
                    <span className="text-[8px] text-gray-500 block leading-tight font-sans italic max-w-full overflow-hidden text-ellipsis line-clamp-2">
                      {char.hint || "Sigue leyendo para desbloquear."}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}
