"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsTicker } from "@/components/home/NewsTicker";
import { SagaBlock } from "@/components/home/SagaBlock";
import { CharacterRoster } from "@/components/home/CharacterRoster";

export default function Home() {
  const [sagasList, setSagasList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sagas")
      .then((r) => r.json())
      .then((d) => {
        setSagasList(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col">
      <HeroSection />
      <NewsTicker sagas={sagasList} />
      <section id="sagas" className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-32">
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
            sagasList.map((saga, si) => (
              <SagaBlock key={saga.id} saga={saga} index={si} />
            ))
          )}
        </div>
      </section>
      <CharacterRoster />
    </div>
  );
}
