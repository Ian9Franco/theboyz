"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { getComputedCharacters } from "@/lib/characterData";
import { CharacterModal } from "./CharacterModal";
import { BannerLightbox } from "./HeroSection";

function getTextColor(hexColor: string) {
  if (!hexColor) return "white";
  const color = hexColor.replace("#", "");
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 140 ? "#0a0a0f" : "white";
}

const CATEGORY_METADATA = {
  pibes: {
    title: "LOS PIBES",
    tagline: "El equipo principal",
    badgeColor: "#1b4332",
    shadowColor: "rgba(27,67,50,0.2)",
    borderColor: "#1b4332",
  },
  independientes: {
    title: "ALIADOS INDEPENDIENTES",
    tagline: "Héroes del asfalto y la fortuna",
    badgeColor: "#8b5cf6",
    shadowColor: "rgba(139,92,246,0.2)",
    borderColor: "#8b5cf6",
  },
  secundarios: {
    title: "ALIADOS Y SOPORTE",
    tagline: "El soporte táctico",
    badgeColor: "#8b5cf6",
    shadowColor: "rgba(139,92,246,0.2)",
    borderColor: "#8b5cf6",
  },
  taberna_resistencia: {
    title: "TABERNA DE LA RESISTENCIA",
    tagline: "El bastión del norte",
    badgeColor: "#0284c7",
    shadowColor: "rgba(2,132,199,0.2)",
    borderColor: "#0284c7",
  },
  voughtverse: {
    title: "VOUGHTVERSE",
    tagline: "Variantes de otra realidad",
    badgeColor: "#2563eb",
    shadowColor: "rgba(37,99,235,0.2)",
    borderColor: "#2563eb",
  },
  matis: {
    title: "CONSEJO DE MATIS",
    tagline: "Las variantes cuánticas",
    badgeColor: "#b45309",
    shadowColor: "rgba(180,83,9,0.2)",
    borderColor: "#b45309",
  },
  antagonistas: {
    title: "ANTAGONISTAS",
    tagline: "Las amenazas del orden",
    badgeColor: "#ef4444",
    shadowColor: "rgba(239,68,68,0.2)",
    borderColor: "#ef4444",
  },
  entidades: {
    title: "ENTIDADES",
    tagline: "Fuerzas primordiales cósmicas",
    badgeColor: "#1e293b",
    shadowColor: "rgba(30,41,59,0.2)",
    borderColor: "#1e293b",
  },
  deidades: {
    title: "DEIDADES",
    tagline: "Seres cósmicos y divinos",
    badgeColor: "#fbbf24",
    shadowColor: "rgba(251,191,36,0.2)",
    borderColor: "#fbbf24",
  },
  locaciones: {
    title: "LOCACIONES",
    tagline: "Los escenarios de la historia",
    badgeColor: "#0ea5e9",
    shadowColor: "rgba(14,165,233,0.2)",
    borderColor: "#0ea5e9",
  },
};

function getCategoryMeta(key: string) {
  const predefined = (CATEGORY_METADATA as Record<string, any>)[key];
  if (predefined) return predefined;

  const title = key
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    "#10b981", // emerald
    "#06b6d4", // cyan
    "#ec4899", // pink
    "#f59e0b", // amber
    "#84cc16", // lime
    "#6366f1", // indigo
    "#14b8a6", // teal
  ];
  const color = colors[Math.abs(hash) % colors.length];

  return {
    title,
    tagline: `Roster de ${title}`,
    badgeColor: color,
    borderColor: color,
    shadowColor: `${color}33`,
  };
}

export function CharacterRoster() {
  const [readChapters, setReadChapters] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [selectedChar, setSelectedChar] = useState<any | null>(null);
  const [unlockAll, setUnlockAll] = useState(false);
  const [showMatiLightbox, setShowMatiLightbox] = useState(false);

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
  }, []);  const getCardImage = (char: any) => {
    const isPibe = char.category === 'pibes' || ['ian', 'jaz', 'julian', 'mati', 'uandi', 'volvo', 'sofi'].includes(char.id);
    if (!isPibe) {
      if (char.category === 'locaciones') return char.image;
      if (char.fichaImage) return char.fichaImage;
      if (char.id !== 'comandante' && char.altImage) return char.altImage;
      if (char.powers?.suitImages?.ficha) return char.powers.suitImages.ficha;
    }
    return char.image;
  };

  const characters = getComputedCharacters(readChapters, isClient, unlockAll).filter(
    (c) => c.image && c.image !== ""
  );

  const activeCategories = Array.from(
    new Set(
      characters.map((c) => c.category || (c.isSecondary ? "secundarios" : "pibes"))
    )
  );

  const orderedCategories = activeCategories.sort((a, b) => {
    const orderPriority: Record<string, number> = {
      pibes: 1,
      locaciones: 2,
      antagonistas: 3,
      secundarios: 4,
      independientes: 4,
      taberna_resistencia: 4,
      voughtverse: 5,
      matis: 6,
      entidades: 7,
      deidades: 8,
    };
    const priorityA = orderPriority[a] ?? 99;
    const priorityB = orderPriority[b] ?? 99;
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    return a.localeCompare(b);
  });

  const getCategoryIcon = (key: string): string => {
    if (key === "pibes") return "/comic-dynamic-white.png";
    if (key === "antagonistas") return "/boom-white.png";
    if (key === "locaciones") return "/comic-page-white.png";
    return "/comic-book-white.png";
  };

  return (
    <section className="bg-dark-popart py-24 px-4 sm:px-6 overflow-hidden relative" style={{ borderTop: "6px solid white" }}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 speed-lines opacity-10" />
      <div
        className="absolute right-[-100px] top-[10%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, white 2px, transparent 2px)",
          backgroundSize: "12px 12px",
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-24">
        {orderedCategories.map((key, secIndex) => {
          const meta = getCategoryMeta(key);
          const groupChars = characters.filter((c) => {
            const cat = c.category || (c.isSecondary ? "secundarios" : "pibes");
            return cat === key;
          });

          if (groupChars.length === 0) return null;

          return (
            <div 
              key={key} 
              className={`pt-16 ${secIndex > 0 ? "border-t-4 border-dashed border-gray-800" : ""}`}
            >
              {key === 'matis' && (
                <div 
                  className="w-full mb-12 border-4 border-white shadow-[8px_8px_0_#b45309] overflow-hidden relative group cursor-zoom-in pointer-events-auto"
                  onClick={() => setShowMatiLightbox(true)}
                >
                  <img 
                    src="/personajes/Consejo de matis/Mativariantes.webp" 
                    alt="Consejo de Matis Banner"
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-2 border-2 border-dashed border-white/40 pointer-events-none" />
                </div>
              )}

              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span
                    className="font-[var(--font-bangers)] text-sm tracking-[0.3em] uppercase mb-4 inline-block"
                    style={{ 
                      background: meta.badgeColor, 
                      color: getTextColor(meta.badgeColor), 
                      padding: "0.25rem 1rem", 
                      border: "2px solid white" 
                    }}
                  >
                    {meta.tagline}
                  </span>
                  <h2
                    className="font-[var(--font-bangers)] text-5xl sm:text-7xl leading-none tracking-wider text-white"
                    style={{ textShadow: `4px 4px 0 ${meta.borderColor}, 8px 8px 0 ${meta.shadowColor}` }}
                  >
                    {meta.title}
                  </h2>
                </motion.div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {groupChars.map((char, i) => {
                  const cardImg = getCardImage(char);
                  return (
                    <motion.div
                      key={char.id}
                      onClick={() => setSelectedChar(char)}
                      initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
                      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
                      className="relative group bg-[#13131e] flex flex-col cursor-pointer select-none border-4 transition-colors duration-300"
                      style={{ 
                        borderColor: "white", 
                        boxShadow: char.incognito 
                          ? "8px 8px 0 #6b7280" 
                          : `8px 8px 0 ${char.displayColor}, 0 0 15px ${char.displayColor}2b` 
                      }}
                      whileHover={{ 
                        scale: 1.03, 
                        rotate: i % 2 === 0 ? 1 : -1, 
                        borderColor: char.incognito ? "white" : char.displayColor,
                        boxShadow: char.incognito 
                          ? "12px 12px 0 #6b7280" 
                          : `12px 12px 0 ${char.displayColor}, 0 0 25px ${char.displayColor}55`,
                        transition: { duration: 0.2 } 
                      }}
                    >
                      <div 
                        className="relative w-full aspect-[2/3] overflow-hidden shrink-0"
                        style={{
                          background: char.incognito 
                            ? "#2a2a35" 
                            : `radial-gradient(circle at center, ${char.displayColor}33 0%, #13131e 100%)`
                        }}
                      >
                        {char.incognito ? (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="absolute inset-0 speed-lines opacity-20" />
                            <span 
                              className="font-[var(--font-bangers)] text-9xl text-white opacity-30 select-none z-10"
                              style={{ textShadow: "4px 4px 0 #000" }}
                            >
                              ?
                            </span>
                            {cardImg && (
                              <img 
                                src={cardImg} 
                                alt="Incógnito" 
                                className="absolute inset-0 w-full h-full object-cover object-top opacity-20 grayscale blur-sm"
                              />
                            )}
                            <div className="absolute inset-0 bg-black/50" />
                          </div>
                        ) : (
                          <>
                            {cardImg && (
                              <img 
                                src={cardImg} 
                                alt={char.displayName} 
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2 grayscale-[0.3] group-hover:grayscale-0"
                              />
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
                      className="px-2 py-2.5 text-center border-t-[4px] border-white relative z-10 flex items-center justify-center overflow-hidden" 
                      style={{ 
                        background: char.incognito 
                          ? "#374151" 
                          : (char.id === 'sofi' 
                             ? "linear-gradient(135deg, #06b6d4, #0891b2)" 
                             : char.displayColor) 
                      }}
                    >
                      <h3 
                        className="font-[var(--font-bangers)] tracking-widest drop-shadow-md leading-none truncate w-full"
                        style={{ 
                          color: char.incognito ? "white" : getTextColor(char.displayColor),
                          textShadow: char.incognito 
                            ? "2px 2px 0 rgba(0,0,0,0.3)"
                            : (getTextColor(char.displayColor) === '#0a0a0f' 
                              ? "1px 1px 0 rgba(255,255,255,0.6)" 
                              : "2px 2px 0 rgba(0,0,0,0.3)"),
                          fontSize: "0.85rem"
                        }}
                      >
                        {char.incognito 
                          ? "PRÓXIMAMENTE" 
                          : (char.powers?.role 
                              ? `${char.displayName.toUpperCase()} · ${char.powers.role.split(" / ")[0].toUpperCase()}`
                              : char.displayName.toUpperCase())}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            </div>
          );
        })}
      </div>

      {/* Pop-up Character Modal & Banner Lightbox */}
      <AnimatePresence>
        {selectedChar && (
          <CharacterModal 
            char={selectedChar} 
            onClose={() => setSelectedChar(null)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMatiLightbox && (
          <BannerLightbox 
            src="/personajes/Consejo de matis/Mativariantes.webp" 
            alt="Consejo de Matis Banner" 
            onClose={() => setShowMatiLightbox(false)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

