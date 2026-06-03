"use client";



import { motion, AnimatePresence } from "framer-motion";

import { useEffect, useState } from "react";

import { CHARACTER_DETAILS, getComputedCharacters } from "@/lib/characterData";
import { CharacterModal } from "./CharacterModal";



export function CharacterRoster() {
  const [readChapters, setReadChapters] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [selectedChar, setSelectedChar] = useState<any | null>(null);
  const [unlockAll, setUnlockAll] = useState(false);

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

    const checkUnlock = () => {
      setUnlockAll(localStorage.getItem("unlock-all") === "true");
    };
    checkUnlock();
    window.addEventListener("unlockAllChanged", checkUnlock);
    return () => {
      window.removeEventListener("unlockAllChanged", checkUnlock);
    };
  }, []);

  const characters = getComputedCharacters(readChapters, isClient, unlockAll);
  const coreCharacters = characters.filter((c) => !c.isSecondary);
  const secondaryCharacters = characters.filter((c) => c.isSecondary);

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
          {coreCharacters.map((char, i) => (
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

        {/* Secondary Characters Section */}
        <div className="mt-24 pt-16 border-t-4 border-dashed border-gray-800">
          <div className="text-center mb-16">
            <span
              className="font-[var(--font-bangers)] text-sm tracking-[0.3em] uppercase mb-4 inline-block"
              style={{ background: "#8b5cf6", color: "white", padding: "0.25rem 1rem", border: "2px solid white" }}
            >
              Aliados y Soporte
            </span>
            <h3
              className="font-[var(--font-bangers)] text-5xl sm:text-7xl leading-none tracking-wider text-white"
              style={{ textShadow: "4px 4px 0 #8b5cf6, 8px 8px 0 rgba(139,92,246,0.2)" }}
            >
              SECUNDARIOS
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {secondaryCharacters.map((char, i) => (
              <motion.div
                key={char.id}
                onClick={() => setSelectedChar(char)}
                initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? 2 : -2 }}
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
                  rotate: i % 2 === 0 ? -1 : 1, 
                  boxShadow: `12px 12px 0 ${char.displayColor}`,
                  transition: { duration: 0.2 } 
                }}
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#2a2a35] shrink-0 flex items-center justify-center">
                  {char.incognito ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute inset-0 speed-lines opacity-20" />
                      <span 
                        className="font-[var(--font-bangers)] text-9xl text-white opacity-30 select-none z-10"
                        style={{ textShadow: "4px 4px 0 #000" }}
                      >
                        ?
                      </span>
                      {char.image ? (
                        <img 
                          src={char.image} 
                          alt="Incógnito" 
                          className="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-20 grayscale blur-sm"
                        />
                      ) : (
                        <div 
                          className="absolute inset-0 opacity-10 flex items-center justify-center"
                          style={{
                            background: `repeating-linear-gradient(45deg, ${char.color}, ${char.color} 10px, #13131e 10px, #13131e 20px)`
                          }}
                        />
                      )}
                      <div className="absolute inset-0 bg-black/50" />
                    </div>
                  ) : (
                    <>
                      {char.image ? (
                        <img 
                          src={char.image} 
                          alt={char.displayName} 
                          className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2 grayscale-[0.3] group-hover:grayscale-0"
                        />
                      ) : (
                        /* Premium dynamic typographic fallback avatar for characters without photo */
                        <div 
                          className="w-full h-full flex flex-col items-center justify-center relative transition-transform duration-500 group-hover:scale-105"
                          style={{
                            background: `radial-gradient(circle at center, ${char.color}33 0%, #13131e 100%)`,
                          }}
                        >
                          <div className="absolute inset-0 speed-lines opacity-10" />
                          <div 
                            className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center shadow-lg relative overflow-hidden transition-all duration-300 group-hover:rotate-12"
                            style={{ backgroundColor: char.color }}
                          >
                            <div 
                              className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.2]"
                              style={{
                                backgroundImage: "radial-gradient(circle, #fff 1.5px, transparent 1.5px)",
                                backgroundSize: "4px 4px",
                              }}
                            />
                            <span className="font-[var(--font-bangers)] text-white text-5xl select-none leading-none pt-2">
                              {char.id === 'supertrucker' ? 'SC' : char.id === 'comandante' ? 'CR' : 'TT'}
                            </span>
                          </div>
                          <span className="font-[var(--font-bangers)] text-xs text-white/50 tracking-widest uppercase mt-4">
                            {char.id === 'supertrucker' ? 'Super Camionero' : char.id === 'comandante' ? 'Comandante Regular' : 'The Tinkerer'}
                          </span>
                        </div>
                      )}
                    </>
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
                      fontSize: char.incognito ? "clamp(0.9rem, 2vw, 1.3rem)" : "clamp(1.1rem, 2vw, 1.6rem)"
                    }}
                  >
                    {char.incognito ? "PRÓXIMAMENTE" : char.displayName.toUpperCase()}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
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

