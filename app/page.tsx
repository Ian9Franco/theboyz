"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/home/HeroSection";
import { SagaBlock } from "@/components/home/SagaBlock";
import { CharacterRoster } from "@/components/home/CharacterRoster";
import { ImageLightbox } from "@/components/home/CharacterModal/ImageLightbox";

export default function Home() {
  const [sagasList, setSagasList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showClassic, setShowClassic] = useState(false);
  const [lightboxSaga, setLightboxSaga] = useState<{ url: string; title: string } | null>(null);
  const [isUpcomingExpanded, setIsUpcomingExpanded] = useState(false);

  useEffect(() => {
    const load = () => {
      fetch("/api/sagas")
        .then((r) => r.json())
        .then((d) => {
          setSagasList(d);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };
    load();
    window.addEventListener("previewStateChanged", load);
    return () => window.removeEventListener("previewStateChanged", load);
  }, []);

  const officialSagas = sagasList.filter((s) => s.order >= 3);
  const classicSagas = sagasList.filter((s) => s.order < 3);

  return (
    <div className="flex flex-col" style={{ background: "#0a0a0f" }}>
      <HeroSection />
      <section id="sagas" className="py-16 px-4 sm:px-6 relative" style={{ background: "#0a0a0f" }}>
        {/* Subtle halftone grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle, #1b4332 1.5px, transparent 1.5px)", backgroundSize: "18px 18px" }} />

        <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
          {loading ? (
            <div className="text-center py-20">
              <span className="font-[var(--font-bangers)] text-4xl text-[#f5e642] animate-pulse tracking-wider">
                Cargando Sagas...
              </span>
            </div>
          ) : sagasList.length === 0 ? (
            <div className="text-center py-20">
              <span className="font-[var(--font-bangers)] text-3xl text-white/40 tracking-wider">
                Aún no hay sagas disponibles.
              </span>
            </div>
          ) : (
            <>
              {/* === ERA CANON OFICIAL === */}
              {officialSagas.length > 0 && (
                <div className="flex flex-col gap-12">
                  {/* Section Header */}
                  <div className="relative border-4 border-white overflow-hidden shadow-[8px_8px_0_#1b4332]"
                    style={{ background: "linear-gradient(135deg, #0e1a14 0%, #0a0a0f 60%, #071510 100%)" }}>
                    {/* Accent bar top */}
                    <div className="h-1 w-full bg-[#1b4332]" />
                    <div className="p-6 md:p-8 relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-2 h-8 bg-[#f5e642]" />
                            <span className="font-[var(--font-bangers)] text-[10px] tracking-[0.3em] text-[#f5e642] uppercase border border-[#f5e642] px-2 py-0.5">
                              LÍNEA CANON OFICIAL
                            </span>
                          </div>
                          <h2 className="font-[var(--font-bangers)] text-4xl sm:text-5xl text-white tracking-widest leading-none mb-3"
                            style={{ textShadow: "3px 3px 0 #1b4332" }}>
                            HISTORIA PRINCIPAL
                          </h2>
                          <p className="font-sans text-sm text-gray-400 max-w-2xl leading-relaxed">
                            Acá comienza el canon oficial de <strong className="text-white">The Boyz</strong>.{" "}
                            La historia arranca tras un escape desesperado:{" "}
                            <strong className="text-[#f5e642]">Ian</strong> y <strong className="text-[#ef4444]">Uandi</strong> lograron rescatar a{" "}
                            <strong className="text-[#3b82f6]">Julián</strong> de un secuestro en los <strong className="text-white">Backrooms</strong>.
                            Al huir, terminaron varados en el <strong className="text-[#a855f7]">Universo 616</strong>.{" "}
                            Mientras tanto, <strong className="text-white">Volvo</strong> vaga perdido en otra realidad y la{" "}
                            <strong className="text-[#a855f7]">Guerra Mativersal</strong> se aproxima.
                          </p>
                        </div>
                        <img src="/comic-book.webp" alt="" className="w-10 h-10 object-contain opacity-30 shrink-0 hidden sm:block" />
                      </div>
                    </div>
                    {/* Bottom accent */}
                    <div className="h-1 w-full" style={{ background: "linear-gradient(to right, #1b4332, #f5e642, #1b4332)" }} />
                  </div>

                  {/* featured split grid */}
                  {(() => {
                    const nuevoSagas = officialSagas.filter((s) => s.nuevo === true);
                    const proximamenteSagas = officialSagas.filter((s) => s.proximamente === true);
                    const otherOfficialSagas = officialSagas.filter(
                      (s) => !nuevoSagas.find(n => n.id === s.id) && !proximamenteSagas.find(p => p.id === s.id)
                    );

                    return (
                      <div className="flex flex-col gap-24">
                        {(nuevoSagas.length > 0 || proximamenteSagas.length > 0 || otherOfficialSagas.length > 0) && (
                          <div className={`flex flex-row items-start w-full relative transition-all duration-300 ${
                            isUpcomingExpanded ? "gap-0 md:gap-8" : "gap-4 sm:gap-8"
                          }`}>
                            {nuevoSagas.length > 0 || otherOfficialSagas.length > 0 ? (
                              <div 
                                className={`flex flex-col gap-8 transition-all duration-300 ${
                                  isUpcomingExpanded 
                                    ? "w-0 overflow-hidden opacity-0 shrink-0 pointer-events-none md:w-auto md:opacity-100 md:pointer-events-auto" 
                                    : "flex-1"
                                } md:flex-1`}
                              >
                                {nuevoSagas.map((saga) => (
                                  <SagaBlock
                                    key={saga.id}
                                    saga={saga}
                                    index={sagasList.findIndex((s) => s.id === saga.id)}
                                    onCoverClick={(url) => setLightboxSaga({ url, title: saga.title })}
                                    isFeatured={true}
                                  />
                                ))}
                                {[...otherOfficialSagas].reverse().map((saga) => (
                                  <SagaBlock
                                    key={saga.id}
                                    saga={saga}
                                    index={sagasList.findIndex((s) => s.id === saga.id)}
                                    onCoverClick={(url) => setLightboxSaga({ url, title: saga.title })}
                                    isFeatured={true}
                                  />
                                ))}
                              </div>
                            ) : (
                              <div />
                            )}
                            
                            {/* Column: Proximamente */}
                            {proximamenteSagas.length > 0 ? (
                              <div className={`flex flex-col gap-8 transition-all duration-300 ${isUpcomingExpanded ? "flex-1 w-full" : "w-auto"} md:flex-1`}>
                                {proximamenteSagas.map((saga) => (
                                  <SagaBlock
                                    key={saga.id}
                                    saga={saga}
                                    index={sagasList.findIndex((s) => s.id === saga.id)}
                                    onCoverClick={(url) => setLightboxSaga({ url, title: saga.title })}
                                    isFeatured={true}
                                    isCollapsed={!isUpcomingExpanded}
                                    onToggleCollapse={() => setIsUpcomingExpanded(!isUpcomingExpanded)}
                                  />
                                ))}
                              </div>
                            ) : (
                              <div />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* === ERA CLÁSICA / PILOTO (COLAPSABLE) === */}
              {classicSagas.length > 0 && (
                <div className="mt-8 border-4 border-dashed border-white/10 p-6 md:p-8 relative overflow-hidden"
                  style={{ background: "#0d0d12" }}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="font-[var(--font-bangers)] text-2xl tracking-wider text-white/40">
                        ARCHIVOS HISTÓRICOS <span className="text-[10px] text-gray-600 font-sans ml-2">(ETAPA PILOTO)</span>
                      </h3>
                      <p className="font-sans text-xs text-gray-600 mt-1 max-w-xl">
                        Sagas experimentales creadas libremente antes de formalizar el rumbo y los guiones definitivos de la serie.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowClassic(!showClassic)}
                      className="font-[var(--font-bangers)] text-sm tracking-wider px-5 py-2 border-2 border-white/20 bg-transparent hover:bg-white/5 text-white/50 hover:text-white uppercase transition-all shadow-[3px_3px_0_rgba(255,255,255,0.05)] active:translate-y-0.5 active:translate-x-0.5 cursor-pointer self-start sm:self-auto shrink-0"
                    >
                      {showClassic ? "Ocultar Pilotos" : "Ver Etapas Anteriores"}
                    </button>
                  </div>

                  {showClassic && (
                    <div className="mt-12 flex flex-col gap-32 border-t-2 border-dashed border-white/10 pt-12">
                      {classicSagas.map((saga) => {
                        const fullIndex = sagasList.findIndex((s) => s.id === saga.id);
                        const prevSaga = fullIndex > 0 ? sagasList[fullIndex - 1] : null;
                        return (
                          <SagaBlock
                            key={saga.id}
                            saga={saga}
                            index={fullIndex}
                            prevSaga={prevSaga}
                            onCoverClick={(url) => setLightboxSaga({ url, title: saga.title })}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <CharacterRoster />

      <AnimatePresence>
        {lightboxSaga && (
          <ImageLightbox
            src={lightboxSaga.url}
            alt={`Portada de la saga ${lightboxSaga.title}`}
            onClose={() => setLightboxSaga(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
