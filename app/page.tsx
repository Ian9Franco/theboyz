"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsTicker } from "@/components/home/NewsTicker";
import { SagaBlock } from "@/components/home/SagaBlock";
import { CharacterRoster } from "@/components/home/CharacterRoster";

export default function Home() {
  const [sagasList, setSagasList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showClassic, setShowClassic] = useState(false);

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
    <div className="flex flex-col">
      <HeroSection />
      <NewsTicker sagas={sagasList} />
      <section id="sagas" className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          {loading ? (
            <div className="text-center py-20">
              <span className="font-[var(--font-bangers)] text-4xl text-[#0a0a0f] animate-pulse">
                Cargando Sagas...
              </span>
            </div>
          ) : sagasList.length === 0 ? (
            <div className="text-center py-20">
              <span className="font-[var(--font-bangers)] text-3xl text-[#0a0a0f]/60">
                Aún no hay sagas disponibles. ¡Agregá una en public/comics!
              </span>
            </div>
          ) : (
            <>
              {/* === ERA CANON OFICIAL === */}
              {officialSagas.length > 0 && (
                <div className="flex flex-col gap-24">
                  <div className="border-4 border-[#0a0a0f] bg-white p-6 md:p-8 shadow-[8px_8px_0_#1b4332] relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#1b4332] text-white font-[var(--font-bangers)] text-xs px-3 py-1 uppercase tracking-wider">
                      Línea Canon
                    </div>
                    <h3 className="font-[var(--font-bangers)] text-3xl sm:text-4xl text-[#0a0a0f] mb-2 flex items-center gap-3">
                      <img src="/comic-dynamic.png" alt="Comic Book" className="w-8 h-8 object-contain shrink-0" />
                      HISTORIA PRINCIPAL
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-gray-700 max-w-2xl leading-relaxed">
                      Aquí comienza la historia oficial del cómic. La trama, el guion formal y los dibujos manuales están completamente trabajados para establecer el canon oficial de <strong>The Boyz</strong>.
                    </p>
                  </div>

                  <div className="flex flex-col gap-32">
                    {officialSagas.map((saga) => {
                      const fullIndex = sagasList.findIndex((s) => s.id === saga.id);
                      const prevSaga = fullIndex > 0 ? sagasList[fullIndex - 1] : null;
                      return (
                        <SagaBlock
                          key={saga.id}
                          saga={saga}
                          index={fullIndex}
                          prevSaga={prevSaga}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* === ERA CLÁSICA / PILOTO (COLAPSABLE) === */}
              {classicSagas.length > 0 && (
                <div className="mt-16 border-4 border-dashed border-[#0a0a0f]/30 bg-[#fbfaf7]/60 p-6 md:p-8 shadow-[4px_4px_0_rgba(10,10,15,0.05)] transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="font-[var(--font-bangers)] text-2xl tracking-wider text-gray-500 flex items-center gap-2">
                        <img src="/comic-book.png" alt="Comic Book" className="w-6 h-6 object-contain grayscale opacity-60 shrink-0" />
                        ARCHIVOS HISTÓRICOS (ETAPA PILOTO)
                      </h3>
                      <p className="font-sans text-xs text-gray-500 mt-1 max-w-xl">
                        Sagas experimentales creadas libremente antes de formalizar el rumbo y los guiones definitivos de la serie.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowClassic(!showClassic)}
                      className="font-[var(--font-bangers)] text-sm tracking-wider px-5 py-2 border-2 border-black bg-white hover:bg-gray-100 text-black uppercase transition-all shadow-[3px_3px_0_#000] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0_#000] cursor-pointer self-start sm:self-auto shrink-0"
                    >
                      {showClassic ? "Ocultar Pilotos" : "Ver Etapas Anteriores"}
                    </button>
                  </div>

                  {showClassic && (
                    <div className="mt-12 flex flex-col gap-32 border-t-2 border-dashed border-[#0a0a0f]/20 pt-12">
                      {classicSagas.map((saga) => {
                        const fullIndex = sagasList.findIndex((s) => s.id === saga.id);
                        const prevSaga = fullIndex > 0 ? sagasList[fullIndex - 1] : null;
                        return (
                          <SagaBlock
                            key={saga.id}
                            saga={saga}
                            index={fullIndex}
                            prevSaga={prevSaga}
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
    </div>
  );
}
