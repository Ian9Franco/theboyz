"use client";

import { motion } from "framer-motion";

const CHARACTERS = [
  { id: 'ian', name: 'Ian', image: '/ian.png', incognito: false, color: '#e8185a' },
  { id: 'jaz', name: 'Jaz', image: '/jaz.png', incognito: false, color: '#00b8d4' },
  { id: 'julian', name: 'Julián', image: '/julian.png', incognito: false, color: '#f5e642' },
  { id: 'mati', name: 'Mati', image: '/mati.png', incognito: false, color: '#6d28d9' },
  { id: 'uandi', name: 'Uandi', image: '/uandi.png', incognito: false, color: '#f97316' },
  { id: 'volvo', name: 'Volvo', image: '/volvo.png', incognito: false, color: '#10b981' },
  { id: 'matapobre', name: '???', image: '/matapobre.png', incognito: true, color: '#6b7280' },
  { id: 'sofi', name: '???', image: '/sofi.png', incognito: true, color: '#6b7280' },
];

export function CharacterRoster() {
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
          {CHARACTERS.map((char, i) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
              className="relative group bg-[#13131e] flex flex-col"
              style={{ 
                border: "4px solid white", 
                boxShadow: `8px 8px 0 ${char.color}` 
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
                    alt={char.name} 
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
                className="p-3 sm:p-4 text-center border-t-[4px] border-white relative z-10 flex-1 flex items-center justify-center" 
                style={{ background: char.incognito ? "#374151" : char.color }}
              >
                <h3 
                  className="font-[var(--font-bangers)] text-2xl sm:text-3xl text-white tracking-widest drop-shadow-md leading-none pt-1"
                  style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.3)" }}
                >
                  {char.incognito ? "PRÓXIMAMENTE" : char.name.toUpperCase()}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
