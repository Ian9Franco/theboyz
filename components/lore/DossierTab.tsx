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
  { id: "uandi",  title: "UANDI / BRIMSTONE",  desc: "Su estructura celular asimiló el impacto provocando una mutación: en lugar de absorber y almacenar energía cinética, su cuerpo reacciona ante cualquier agresión física aumentando drásticamente su nivel de ira, lo que potencia su fuerza exponencialmente y activa una regeneración celular instantánea." },
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
  { id: "uandi",  name: "Uandi → Brimstone",   text: "Proviene del calor infernal y el vapor ardiente ('brimstone') que emana de su cuerpo cuando se enfurece al extremo, haciendo brillar sus tatuajes y runas como magma puro en el combate.", extra: "Toma mate, maneja y amaga con cocinar asado que termina en guiso. Llama a otros 'pibe', 'loco' o 'maestro'." },
  { id: "volvo",  name: "Volvo → Outrider",   text: "Nace de su capacidad para correr a la vanguardia, explorar terreno y abrir portales rápidos de escape, actuando como el explorador ('outrider') definitivo que flanquea al enemigo.", extra: "Siempre está picando snacks o barritas por el enorme desgaste calórico de su vibración arcana." },
  { id: "mati",   name: "Mati → Farsight",    text: "Representa la inmensa distancia de donde proviene su energía y su capacidad para proyectar ráfagas multiversales precisas que destruyen amenazas lejanas (farsight), guiadas por completo por su mirada.", extra: "Julián se niega a usar su alias y solo le dice 'el mati' o 'el mati de mierda'." },
  { id: "ian",    name: "Ian → Vesperwing",   text: "Es el único que elige su propio alias. Cree firmemente que la identidad heroica debe ser diseñada con la misma frialdad analítica que un exochasis o un algoritmo de soporte.", extra: "Se comunica con jerga táctica y consume dosis peligrosas de café negro para su hiperenfoque." },
];

import { GLOSARIO_CHARS } from "./GlosarioLink";

export function DossierTab({ unlockAll, readChapters }: DossierTabProps) {
  const [activeCategory, setActiveCategory] = useState<string>("pibes");

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
    { id: "secundarios", label: "SECUNDARIOS" },
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

      {/* SECTION 4 — CATEGORÍAS Y EXPEDIENTES */}
      <section className="bg-[#0e0e16] border-2 border-white/10 p-6 sm:p-8 rounded relative shadow-[6px_6px_0_rgba(255,255,255,0.03)] border-l-4 border-l-[#3b82f6]">
        <div className="absolute top-[-10px] left-6 bg-[#3b82f6] px-3 py-0.5 text-[10px] font-[var(--font-bangers)] tracking-widest shadow-[2px_2px_0_#000]">
          SECCIÓN IV — EXPEDIENTES DE LA BASE DE DATOS
        </div>
        <h3 className="font-[var(--font-bangers)] text-2xl text-[#f5e642] mt-2 mb-6 tracking-widest">
          DIRECTORIO DE EXPEDIENTES MULTIVERSALES
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
                  {isUnlocked ? (
                    <img
                      src={cardImg}
                      alt={char.displayName}
                      className="w-full h-full object-cover object-top transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-3 text-center">
                      <Lock className="w-6 h-6 text-gray-600 mb-1" />
                      <span className="text-[9px] text-gray-600 font-[var(--font-bangers)] uppercase tracking-wider">
                        ENCRIPTADO
                      </span>
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
