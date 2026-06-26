"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GlosarioLink } from "./GlosarioLink";
import { Redacted } from "./Redacted";

interface DossierTabProps {
  unlockAll: boolean;
  readChapters: string[];
}

const POWER_ORIGINS = [
  { id: "ian",    title: "IAN / VESPERWING",  desc: "No posee poderes biológicos. Uandi se interpuso para protegerlo del rayo en los Backrooms y absorbió el impacto cuántico. Esa desventaja lo impulsó a convertirse en Vesperwing, diseñando tecnología táctica propia para competir en primera línea." },
  { id: "uandi",  title: "UANDI / AEGIS",     desc: "Absorbió la mayor exposición a la radiación cuántica. Su estructura dérmica mutó, permitiéndole asimilar impactos físicos directamente en sus tatuajes tribales para acumularlos y devolverlos en descargas o súper saltos cinéticos." },
  { id: "julian", title: "JULIÁN / WILDCARD", desc: "Modula energía estática inestable (glitch azul/rojo) para proyectar constructos de naipes filosos de corto alcance y clones temporales de estática degradable que puede detonar de manera estratégica." },
  { id: "volvo",  title: "VOLVO / NULL VECTOR",desc: "El escape extradimensional colapsó sus átomos con tecnología molecular de la Corriente. Desarrolló la capacidad de generar micro-teleportaciones cuánticas (blink) e intangibilidad atómica transitoria para evadir daño físico." },
  { id: "mati",   title: "MATI / SWAPFIRE",   desc: "Su cuerpo es un nexo de calor del Mativerse. Brota plasma violeta puramente cinético/térmico por sus ojos que guía con precisión de cabeza gracias a su visor táctico, transponiendo materia y causando fricción molecular extrema." },
  { id: "jaz",    title: "JAZ / ORACLE",      desc: "Sintonizó su conciencia espiritual a través del estudio de runas y gemas energéticas en 616. Posee capacidades de aura-anclaje para proyectar defensas cristalinas y entrelazar las conciencias en un vínculo astral cohesivo." },
  { id: "sofi",   title: "SOFI / HUSH",       desc: "Nativa de la dimensión alterna. Carece de mutaciones biológicas; posee un oído absoluto y agudeza acústica refinada con entrenamiento ciego extremo. Ian complementa sus talentos con trajes silenciadores de vibraciones." },
];

const ALIAS_ORIGINS = [
  { id: "julian", name: "Julián → Wildcard",  text: "No viene de sus poderes, sino de su personalidad caótica. En una misión táctica, cuando saca 'una carta buena' improvisada de estática azul que salva la retirada, Mati lo bautiza como un wildcard literal." },
  { id: "jaz",    name: "Jaz → Oracle",       text: "Nace como una broma de Uandi al verla rodeada de grimorios astrales interpretando anomalías: 'Preguntale al oráculo. Seguro ya sabe qué va a explotar.' Eventualmente se convierte en el ancla clarividente del grupo." },
  { id: "sofi",   name: "Sofi → Hush",        text: "Proviene de la reputación que infunde en los foros criminales del bajo fondo en Los Ángeles alterno: 'Si Hush te escucha, estás acabado.' Sofi adopta el alias tras descubrir que Ian leía esos registros." },
  { id: "uandi",  name: "Uandi → Aegis",      text: "Aparece después de que Uandi se pone delante del grupo para recibir un impacto colosal de artillería. Alguien comenta: 'Ese tipo es un escudo.' A lo que Ian responde: 'No es un escudo. Es una maldita Aegis.'", extra: "Uandi se dirige rústicamente a otros usando 'Bub'." },
  { id: "volvo",  name: "Volvo → Null Vector", text: "Originado de los expedientes tácticos militares paralelos. Su mera presencia anula comunicaciones e interfiere sensores, siendo catalogado como el vector nulo donde todo sistema deja de operar." },
  { id: "mati",   name: "Mati → Swapfire",    text: "Intercambia el estado de la materia alternando plasma puramente sólido (cinético) y fuego cruzado térmico mediante anclajes dimensionales en sus ojos.", extra: "Julián se niega a usar su alias y solo le dice 'el mati' o 'el mati de mierda'." },
  { id: "ian",    name: "Ian → Vesperwing",   text: "Es el único que elige su propio alias. Cree firmemente que la identidad heroica debe ser diseñada con la misma frialdad analítica que un exochasis o un algoritmo de soporte." },
];

import { GLOSARIO_CHARS } from "./GlosarioLink";

export function DossierTab({ unlockAll, readChapters }: DossierTabProps) {
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
            Por otro lado, <GlosarioLink id="volvo">Volvo</GlosarioLink> se encuentra completamente aislado; tras escapar de Prime por portales, acaba de caer en la realidad de <em>The Boys</em> en pleno Times Square, cruzándose cara a cara con Billy Butcher.
          </p>
          <div className="p-4 bg-black/50 border border-[#f5e642]/30 rounded-sm text-[#f5e642] italic text-xs sm:text-sm mt-2">
            <strong>ANÁLISIS DE CAMPO:</strong> La continuación inmediata debe mostrar los primeros síntomas incontrolables de sus poderes:{" "}
            <Redacted chapterId="the-green-truck-chronicles" chapterName="Chronicles #1" unlockAll={unlockAll} readChapters={readChapters}>Uandi rompiendo cosas sin querer por exceso de energía</Redacted>,{" "}
            <Redacted chapterId="no-turning-back" chapterName="No Turning Back" unlockAll={unlockAll} readChapters={readChapters}>Julián viendo parpadeos de clones glitch en el espejo</Redacted>,
            y Volvo enfrentándose a Butcher usando su recién descubierto blink para sobrevivir.
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
    </motion.div>
  );
}
