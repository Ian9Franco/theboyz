"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const CHARACTER_DETAILS = [
  { 
    id: 'ian', 
    name: 'Ian', 
    image: '/ian.png', 
    color: '#e8185a',
    role: 'Analista instintivo / observador clave',
    visualCode: 'remera marrón, lentes',
    perfil: [
      'Inteligencia alta pero desordenada (ve patrones donde otros ven ruido)',
      'Torpe en ejecución física, peligroso en lectura de situaciones',
      'Noble por defecto, no por elección',
      'Coqueto sin intención consciente (problema crónico)',
      'Adicción funcional: café como estabilizador cognitivo'
    ],
    crisis: 'Primero entiende, después actúa.. si tiene suerte. Detecta anomalías antes de poder explicarlas.',
    stats: { fuerza: 6, inteligencia: 9, carisma: 9, suerte: 7 }
  },
  { 
    id: 'jaz', 
    name: 'Jaz', 
    image: '/jaz.png', 
    color: '#00b8d4',
    role: 'Nodo psíquico / interfaz mística',
    visualCode: 'remera roja, lentes + piedras + incienso',
    perfil: [
      'Telepatía parcial + percepción simbólica',
      'Conexión con “capas no físicas” de la realidad',
      'Canaliza poder mediante objetos (dependencia ritual)',
      'Inteligencia emocional alta, lógica impredecible'
    ],
    crisis: 'No responde al mundo: lo interpreta. Puede estar “en otra frecuencia” incluso estando presente.',
    stats: { fuerza: 3, inteligencia: 8, carisma: 8, suerte: 9 }
  },
  { 
    id: 'julian', 
    name: 'Julián', 
    image: '/julian.png', 
    color: '#f5e642',
    role: 'Engaño estratégico / variable inestable',
    visualCode: 'remera azul, barba',
    perfil: [
      'Mentiroso funcional (la mentira como herramienta, no defecto)',
      'Leal cuando decide serlo (condición crítica)',
      'Mujeriego impulsivo',
      'Sarcástico como mecanismo de defensa',
      'Alta ansiedad interna'
    ],
    crisis: 'Niega información incluso cuando la está diciendo. Puede traicionar o salvar al equipo en la misma escena.',
    stats: { fuerza: 6, inteligencia: 8, carisma: 10, suerte: 7 },
    hint: 'Se desbloquea al terminar el Episodio 1 de la primera saga.'
  },
  { 
    id: 'mati', 
    name: 'Mati', 
    image: '/mati.png', 
    color: '#6d28d9',
    role: 'Variable estratégica / punto de decisión moral',
    visualCode: 'piel oscura',
    perfil: [
      'Capacidad de tomar decisiones extremas sin bloqueo emocional',
      'Alterna entre protector y amenaza según contexto',
      'Fuerza real + inteligencia adaptable',
      'Difícil de predecir incluso para el equipo'
    ],
    crisis: 'Puede ser el salvavidas o el detonante. Siempre redefine el resultado de la escena.',
    stats: { fuerza: 8, inteligencia: 9, carisma: 7, suerte: 6 },
    hint: 'Se desbloquea al terminar la primera saga.'
  },
  { 
    id: 'uandi', 
    name: 'Uandi', 
    image: '/uandi.png', 
    color: '#f97316',
    role: 'Tanque moral / fuerza de contención',
    visualCode: 'remera negra, tatuajes, lentes, barba',
    perfil: [
      'Honestidad absoluta (no filtra nada)',
      'Fuerza física elevada bajo necesidad extrema',
      'Torpeza general fuera de combate',
      'Lealtad rígida, casi mecánica',
      'Inteligencia práctica, no abstracta'
    ],
    crisis: 'Si el grupo cae, él se vuelve estructura. No duda: ejecuta.',
    stats: { fuerza: 10, inteligencia: 6, carisma: 9, suerte: 6 },
    hint: 'Se desbloquea al terminar el Episodio 3 de la primera saga.'
  },
  { 
    id: 'volvo', 
    name: 'Volvo', 
    image: '/volvo.png', 
    color: '#10b981',
    role: 'Caos táctico / cazador de sistemas',
    visualCode: 'remera naranja, ojos celestes, barba prominente',
    perfil: [
      'Baja reactividad emocional',
      'Alta impulsividad en acción (ejecuta antes de procesar)',
      'Curiosidad peligrosa (abre puertas que no debería)',
      'Ansiedad leve camuflada como calma',
      'Tendencia a ignorar instrucciones'
    ],
    crisis: 'Rompe sistemas antes de entenderlos. Sobrevive por instinto, no por planificación.',
    stats: { fuerza: 5, inteligencia: 7, carisma: 4, suerte: 9 },
    hint: 'Se desbloquea al terminar la primera saga.'
  },
  { 
    id: 'matapobre', 
    name: 'Matapobres', 
    image: '/matapobre.png', 
    color: '#6b7280',
    role: 'Antiheroína / manipulación narrativa',
    visualCode: 'cabello negro liso, tatuajes',
    perfil: [
      'Sarcasmo constante como arma social',
      'Manipulación emocional precisa',
      'Moral flexible (no inexistente, cambiante)',
      'Inteligencia social alta',
      'Funciona mejor en caos que en orden'
    ],
    crisis: 'No salva al grupo: lo redirige. Siempre tiene un segundo plan que nadie pidió.',
    stats: { fuerza: 6, inteligencia: 9, carisma: 8, suerte: 8 },
    hint: 'Clasificado. ¿Habrá alguna forma de desbloquearlo...?'
  },
  { 
    id: 'sofi', 
    name: 'Sofi', 
    image: '/sofi.png', 
    color: '#e8185a',
    role: 'Observadora táctica / combatiente sensorial',
    visualCode: 'polera blanca, pelo corto con rulos',
    perfil: [
      'Audición hiperdesarrollada (lectura del entorno en tiempo real)',
      'Terquedad estructural (no cede información ni posición)',
      'Capacidad de combate entrenada',
      'Presencia carismática + dominante'
    ],
    crisis: 'Detecta lo que nadie escucha. No negocia cuando ya decidió.',
    stats: { fuerza: 8, inteligencia: 7, carisma: 9, suerte: 8 },
    hint: 'Se desbloquea al terminar el Episodio 2 de la segunda saga.'
  },
];

export function getComputedCharacters(readChapters: string[], isClient: boolean) {
  return CHARACTER_DETAILS.map((char) => {
    if (!isClient) {
      // Server-side skeleton state
      const defaultLocked = ['julian', 'mati', 'uandi', 'volvo', 'sofi', 'matapobre'].includes(char.id);
      return {
        ...char,
        incognito: defaultLocked,
        displayName: defaultLocked ? '???' : char.name,
        displayColor: defaultLocked ? '#6b7280' : char.color,
      };
    }

    if (char.id === 'ian' || char.id === 'jaz') {
      return {
        ...char,
        incognito: false,
        displayName: char.name,
        displayColor: char.color,
      };
    }

    if (char.id === 'julian') {
      const unlocked = readChapters.includes('the-green-truck-chronicles');
      return {
        ...char,
        incognito: !unlocked,
        displayName: unlocked ? char.name : '???',
        displayColor: unlocked ? char.color : '#6b7280',
      };
    }

    if (char.id === 'uandi') {
      const unlocked = readChapters.includes('no-turning-back');
      return {
        ...char,
        incognito: !unlocked,
        displayName: unlocked ? char.name : '???',
        displayColor: unlocked ? char.color : '#6b7280',
      };
    }

    if (char.id === 'mati' || char.id === 'volvo') {
      const unlocked = readChapters.includes('no-turning-back');
      return {
        ...char,
        incognito: !unlocked,
        displayName: unlocked ? char.name : '???',
        displayColor: unlocked ? char.color : '#6b7280',
      };
    }

    if (char.id === 'sofi') {
      const unlocked = readChapters.includes('casino');
      return {
        ...char,
        incognito: !unlocked,
        displayName: unlocked ? char.name : '???',
        displayColor: unlocked ? char.color : '#6b7280',
      };
    }

    // matapobre is always incognito
    return {
      ...char,
      incognito: true,
      displayName: '???',
      displayColor: '#6b7280',
    };
  });
}

export function CharacterRoster() {
  const [readChapters, setReadChapters] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [selectedChar, setSelectedChar] = useState<any | null>(null);

  useEffect(() => {
    setIsClient(true);
    try {
      const read = localStorage.getItem("read-chapters");
      if (read) {
        setReadChapters(JSON.parse(read));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const characters = getComputedCharacters(readChapters, isClient);

  return (
    <section className="py-24 px-4 sm:px-6 overflow-hidden relative" style={{ background: "#0a0a0f", borderTop: "6px solid white" }}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 speed-lines opacity-10" />
      <div
        className="absolute right-[-100px] top-[10%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, white 2px, transparent 2px)",
          backgroundSize: "12px 12px",
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="font-[var(--font-bangers)] text-sm tracking-[0.3em] uppercase mb-4 inline-block"
              style={{ background: "#e8185a", color: "white", padding: "0.25rem 1rem", border: "2px solid white" }}
            >
              Conocé a
            </span>
            <h2
              className="font-[var(--font-bangers)] text-6xl sm:text-8xl leading-none tracking-wider text-white"
              style={{ textShadow: "5px 5px 0 #e8185a, 10px 10px 0 rgba(232,24,90,0.2)" }}
            >
              LOS PIBES
            </h2>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {characters.map((char, i) => (
            <motion.div
              key={char.id}
              onClick={() => setSelectedChar(char)}
              initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
              className="relative group bg-[#13131e] flex flex-col cursor-pointer select-none"
              style={{ 
                border: "4px solid white", 
                boxShadow: `8px 8px 0 ${char.displayColor}` 
              }}
              whileHover={{ 
                scale: 1.03, 
                rotate: i % 2 === 0 ? 1 : -1, 
                boxShadow: `12px 12px 0 ${char.displayColor}`,
                transition: { duration: 0.2 } 
              }}
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#2a2a35] shrink-0">
                {char.incognito ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 speed-lines opacity-20" />
                    <span 
                      className="font-[var(--font-bangers)] text-9xl text-white opacity-30 select-none z-10"
                      style={{ textShadow: "4px 4px 0 #000" }}
                    >
                      ?
                    </span>
                    <img 
                      src={char.image} 
                      alt="Incógnito" 
                      className="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-20 grayscale blur-sm"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                  </div>
                ) : (
                  <img 
                    src={char.image} 
                    alt={char.displayName} 
                    className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2 grayscale-[0.3] group-hover:grayscale-0"
                  />
                )}
                
                {/* Comic style halftone overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.15] group-hover:opacity-0 transition-opacity duration-500"
                  style={{
                    backgroundImage: "radial-gradient(circle, #fff 1.5px, transparent 1.5px)",
                    backgroundSize: "6px 6px",
                  }}
                />
              </div>
              
              <div 
                className="p-3 sm:p-4 text-center border-t-[4px] border-white relative z-10 flex-1 flex items-center justify-center overflow-hidden" 
                style={{ background: char.incognito ? "#374151" : char.displayColor }}
              >
                <h3 
                  className="font-[var(--font-bangers)] text-white tracking-widest drop-shadow-md leading-none pt-1 truncate w-full"
                  style={{ 
                    textShadow: "2px 2px 0 rgba(0,0,0,0.3)",
                    fontSize: char.incognito ? "clamp(0.9rem, 2vw, 1.3rem)" : "clamp(1.2rem, 2.5vw, 1.8rem)"
                  }}
                >
                  {char.incognito ? "PRÓXIMAMENTE" : char.displayName.toUpperCase()}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pop-up Character Modal */}
      <AnimatePresence>
        {selectedChar && (
          <CharacterModal 
            char={selectedChar} 
            onClose={() => setSelectedChar(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export function CharacterModal({ char, onClose }: { char: any; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0a0a0f]/90 cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white w-full max-w-2xl border-4 border-[#0a0a0f] z-10 flex flex-col md:flex-row overflow-hidden max-h-[85vh] md:max-h-none shadow-2xl"
        style={{
          boxShadow: `12px 12px 0 ${char.incognito ? '#6b7280' : char.displayColor}`,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 w-10 h-10 border-3 border-[#0a0a0f] bg-[#e8185a] hover:bg-[#c8134d] text-white flex items-center justify-center font-[var(--font-bangers)] text-xl shadow-[3px 3px 0_#0a0a0f] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px 4px 0_#0a0a0f] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px 1px 0_#0a0a0f] transition-all z-20"
        >
          ✕
        </button>

        {/* Left Side: Avatar Panel */}
        <div 
          className="w-full md:w-[240px] aspect-[4/3] sm:aspect-[4/5] md:aspect-auto md:min-h-[380px] relative border-b-4 md:border-b-0 md:border-r-4 border-[#0a0a0f] bg-[#2a2a35] shrink-0"
        >
          {char.incognito ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 speed-lines opacity-20" />
              <span className="font-[var(--font-bangers)] text-9xl text-white opacity-20 select-none z-10">?</span>
              <img 
                src={char.image} 
                alt="Locked" 
                className="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-15 grayscale blur-sm"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ) : (
            <img 
              src={char.image} 
              alt={char.displayName} 
              className="w-full h-full object-cover object-[center_20%] block"
            />
          )}
          {/* Comic halftone overlay */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.2]"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1.5px, transparent 1.5px)",
              backgroundSize: "6px 6px",
            }}
          />
        </div>

        {/* Right Side: Info Panel */}
        <div className="p-6 flex-1 flex flex-col justify-between bg-white text-[#0a0a0f] overflow-y-auto max-h-[50vh] md:max-h-[550px]">
          {char.incognito ? (
            <div className="flex-1 flex flex-col justify-center items-center py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mb-4 border-2 border-black">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="font-[var(--font-bangers)] text-4xl mb-2 tracking-wider text-[#0a0a0f]">PERSONAJE BLOQUEADO</h3>
              <p className="font-[var(--font-marker)] text-lg text-[#e8185a] uppercase tracking-wider mb-4">Próximamente</p>
              <p className="font-sans text-sm text-gray-600 max-w-sm">
                {char.hint || "Seguí leyendo los capítulos para desbloquear la información de este personaje."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div>
                <span 
                  className="tag text-xs mb-1" 
                  style={{ background: char.displayColor, color: char.id === 'julian' ? '#0a0a0f' : 'white', borderColor: '#0a0a0f' }}
                >
                  {char.role}
                </span>
                <h2 
                  className="font-[var(--font-bangers)] text-5xl leading-none tracking-widest text-[#0a0a0f] mt-1"
                  style={{ textShadow: `2px 2px 0 ${char.displayColor}` }}
                >
                  {char.name.toUpperCase()}
                </h2>
              </div>

              {/* Operational Profile Dossier */}
              <div className="flex flex-col gap-1.5 border-t-2 border-black pt-3">
                <h4 className="font-[var(--font-bangers)] text-sm tracking-wider text-[#0a0a0f] mb-1">
                  PERFIL OPERATIVO:
                </h4>
                <ul className="list-disc list-inside font-sans text-sm text-gray-700 leading-relaxed pl-1 flex flex-col gap-1.5">
                  {char.perfil.map((item: string, idx: number) => (
                    <li key={idx} className="pl-1 text-left">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Crisis Behavior Block */}
              <div 
                className="border-2 border-black p-3 bg-yellow-50 relative overflow-hidden"
                style={{
                  boxShadow: "3px 3px 0 #0a0a0f",
                  backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)",
                  backgroundSize: "6px 6px"
                }}
              >
                <div className="absolute top-0 right-0 bg-[#e8185a] text-white font-[var(--font-bangers)] text-[9px] tracking-wider px-2 py-0.5 border-b-2 border-l-2 border-black uppercase">
                  En Crisis
                </div>
                <h5 className="font-[var(--font-bangers)] text-xs tracking-wider text-[#0a0a0f] mb-1 text-left">
                  COMPORTAMIENTO:
                </h5>
                <p className="font-sans text-sm leading-relaxed text-gray-800 pr-12 text-left">
                  {char.crisis}
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-col gap-2 pt-1 border-t border-gray-100">
                <h4 className="font-[var(--font-bangers)] text-sm tracking-wider text-[#0a0a0f] mb-1">METROS OPERATIVOS:</h4>
                
                {/* Strength */}
                <div className="flex items-center gap-3">
                  <span className="w-20 text-[10px] font-[var(--font-bangers)] uppercase tracking-wider text-[#0a0a0f]">Fuerza</span>
                  <div className="flex-1 h-3.5 bg-gray-200 border-2 border-black overflow-hidden flex">
                    {Array.from({ length: 10 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="h-full flex-1 border-r border-black last:border-0"
                        style={{
                          background: idx < char.stats.fuerza ? char.displayColor : 'transparent',
                        }}
                      />
                    ))}
                  </div>
                  <span className="font-[var(--font-bangers)] text-xs text-[#0a0a0f] w-8 text-right">{char.stats.fuerza}/10</span>
                </div>

                {/* Intelligence */}
                <div className="flex items-center gap-3">
                  <span className="w-20 text-[10px] font-[var(--font-bangers)] uppercase tracking-wider text-[#0a0a0f]">Inteligencia</span>
                  <div className="flex-1 h-3.5 bg-gray-200 border-2 border-black overflow-hidden flex">
                    {Array.from({ length: 10 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="h-full flex-1 border-r border-black last:border-0"
                        style={{
                          background: idx < char.stats.inteligencia ? char.displayColor : 'transparent',
                        }}
                      />
                    ))}
                  </div>
                  <span className="font-[var(--font-bangers)] text-xs text-[#0a0a0f] w-8 text-right">{char.stats.inteligencia}/10</span>
                </div>

                {/* Charisma */}
                <div className="flex items-center gap-3">
                  <span className="w-20 text-[10px] font-[var(--font-bangers)] uppercase tracking-wider text-[#0a0a0f]">Carisma</span>
                  <div className="flex-1 h-3.5 bg-gray-200 border-2 border-black overflow-hidden flex">
                    {Array.from({ length: 10 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="h-full flex-1 border-r border-black last:border-0"
                        style={{
                          background: idx < char.stats.carisma ? char.displayColor : 'transparent',
                        }}
                      />
                    ))}
                  </div>
                  <span className="font-[var(--font-bangers)] text-xs text-[#0a0a0f] w-8 text-right">{char.stats.carisma}/10</span>
                </div>

                {/* Luck */}
                <div className="flex items-center gap-3">
                  <span className="w-20 text-[10px] font-[var(--font-bangers)] uppercase tracking-wider text-[#0a0a0f]">Suerte</span>
                  <div className="flex-1 h-3.5 bg-gray-200 border-2 border-black overflow-hidden flex">
                    {Array.from({ length: 10 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="h-full flex-1 border-r border-black last:border-0"
                        style={{
                          background: idx < char.stats.suerte ? char.displayColor : 'transparent',
                        }}
                      />
                    ))}
                  </div>
                  <span className="font-[var(--font-bangers)] text-xs text-[#0a0a0f] w-8 text-right">{char.stats.suerte}/10</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
