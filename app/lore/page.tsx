export default function LorePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white selection:bg-[#e8185a] selection:text-white pb-20">
      
      <div className="max-w-4xl mx-auto px-6 pt-16">
        <h1 className="font-[var(--font-bangers)] text-6xl text-[#f5e642] mb-8" style={{ textShadow: "4px 4px 0 #e8185a" }}>
          LORE UNIFICADO
        </h1>
        
        <div className="space-y-16 font-sans text-lg leading-relaxed text-white/90">
          
          {/* SECTION 1 */}
          <section>
            <h2 className="font-[var(--font-bangers)] text-4xl text-[#e8185a] mb-6">1. Estatus Literal y Sinopsis</h2>
            <div className="bg-[#13131e] border-l-4 border-[#e8185a] p-6 shadow-lg shadow-black/50">
              <p className="mb-4 font-bold text-xl text-[#f5e642]">Punto de partida exacto para el cómic:</p>
              <p>
                Tras escapar de los Backrooms y recibir la descarga anómala que despertará sus poderes, el grupo quedó fracturado. 
                <strong className="text-white"> Ian, Uandi y Julián </strong> se encuentran varados en la habitación de un hotel en Los Ángeles (universo alterno), 
                procesando el trauma sin saber que el impacto energético pronto mutará a Uandi (batería cinética) y a Julián (ecos), mientras Ian permanecerá puramente humano. 
                Junto a ellos está <strong className="text-white">Sofi</strong>, nativa de esta realidad, quien con su aguda audición ya sospecha de la amenaza inminente tras ver a Mati en las pantallas.
              </p>
              <p className="mt-4">
                En el universo original (616), <strong className="text-white">Jaz</strong> continúa en su casa perfeccionando la clarividencia mística que les salvó la vida, mientras el <strong className="text-white">Mati original</strong> permanece ajeno a que sus variantes malignas —lideradas por <strong className="text-[#e8185a]">Mati Prime</strong> desde su base tecnológica tras dispararle a Supertrucker— han iniciado la Guerra Mativersal.
              </p>
              <p className="mt-4">
                Por otro lado, <strong className="text-white">Volvo</strong> se encuentra completamente aislado; tras escapar de Prime por portales y conseguir equipo nuevo en una ciudad cyberpunk, acaba de caer en la realidad de <em>The Boys</em> en pleno Times Square, donde tras ver un cartel de "Julander", se acaba de cruzar cara a cara con Billy Butcher.
              </p>
              <p className="mt-4 text-[#f5e642] italic">
                La continuación inmediata debe mostrar los primeros síntomas incontrolables de sus poderes: Uandi rompiendo cosas sin querer por exceso de energía, Julián viendo parpadeos de sí mismo en el espejo, y Volvo enfrentándose a Butcher usando su recién descubierto blink de cortocircuito para sobrevivir, obligando a Ian a usar su ingenio y empezar a diseñar tecnología para compensar su falta de mutación y liderar a este nuevo y caótico grupo.
              </p>
            </div>
          </section>

          {/* SECTION 2 */}
          <section>
            <h2 className="font-[var(--font-bangers)] text-4xl text-[#e8185a] mb-6">2. Origen de los Poderes</h2>
            <p className="mb-8 text-xl">
              La crisis comenzó cuando el grupo quedó atrapado en los Backrooms durante una incursión dimensional. 
              Al escapar, fueron dispersados a través de distintas realidades, alterando el destino de cada uno de ellos de maneras diferentes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1a1a25] border-2 border-white/10 p-5 rounded-sm hover:border-[#f5e642] transition-colors">
                <h3 className="font-[var(--font-bangers)] text-2xl text-[#f5e642] mb-2 tracking-widest">IAN <span className="text-white/40 text-lg">/ VESPERWING</span></h3>
                <p>Ian no posee poderes. Uandi se interpuso para protegerlo y absorbió el impacto dimensional. Esa desventaja lo impulsó a convertirse en Vesperwing, desarrollando tecnología capaz de competir con individuos superhumanos.</p>
              </div>

              <div className="bg-[#1a1a25] border-2 border-white/10 p-5 rounded-sm hover:border-[#f5e642] transition-colors">
                <h3 className="font-[var(--font-bangers)] text-2xl text-[#f5e642] mb-2 tracking-widest">UANDI <span className="text-white/40 text-lg">/ AEGIS</span></h3>
                <p>Recibió la mayor exposición a la energía. Su cuerpo se alteró genéticamente, convirtiéndose en una batería viviente capaz de absorber y almacenar radiacion. Con la capaidad de aumentar su poder a medida que se enoja. Desarrolla capacidades avanzadas de resistencia y fuerza devastadora.</p>
              </div>

              <div className="bg-[#1a1a25] border-2 border-white/10 p-5 rounded-sm hover:border-[#f5e642] transition-colors">
                <h3 className="font-[var(--font-bangers)] text-2xl text-[#f5e642] mb-2 tracking-widest">JULIÁN <span className="text-white/40 text-lg">/ WILDCARD</span></h3>
                <p>Modifica energía pura e inestable (glitch azul y rojo) para proyectar proyectiles y armas tácticas de corto alcance, además de crear clones o ecos cuya carga explosiva se degrada con el tiempo.</p>
              </div>

              <div className="bg-[#1a1a25] border-2 border-white/10 p-5 rounded-sm hover:border-[#f5e642] transition-colors">
                <h3 className="font-[var(--font-bangers)] text-2xl text-[#f5e642] mb-2 tracking-widest">VOLVO <span className="text-white/40 text-lg">/ NULL VECTOR</span></h3>
                <p>La exposición a tecnologías de realidades paralelas terminó transformándolo. Obtuvo la capacidad de generar interferencia energética constante, cortocircuitos y micro-teleportación cuántica (blink).</p>
              </div>

              <div className="bg-[#1a1a25] border-2 border-white/10 p-5 rounded-sm hover:border-[#f5e642] transition-colors">
                <h3 className="font-[var(--font-bangers)] text-2xl text-[#f5e642] mb-2 tracking-widest">MATI <span className="text-white/40 text-lg">/ SWAPFIRE</span></h3>
                <p>Su propio cuerpo es un nexo que absorbe y almacena energía térmica y cinética del multiverso. Canaliza esta devastación a través de su visor o de la palma de sus manos en ráfagas bifásicas.</p>
              </div>

              <div className="bg-[#1a1a25] border-2 border-white/10 p-5 rounded-sm hover:border-[#f5e642] transition-colors">
                <h3 className="font-[var(--font-bangers)] text-2xl text-[#f5e642] mb-2 tracking-widest">JAZ <span className="text-white/40 text-lg">/ ORACLE</span></h3>
                <p>Sus poderes nacen del estudio de runas y esoterismo. Posee habilidades psíquicas, percepción astral y clarividencia dimensional que evolucionan a través de su conocimiento y la meditación.</p>
              </div>

              <div className="bg-[#1a1a25] border-2 border-white/10 p-5 rounded-sm hover:border-[#f5e642] transition-colors md:col-span-2">
                <h3 className="font-[var(--font-bangers)] text-2xl text-[#f5e642] mb-2 tracking-widest">SOFI <span className="text-white/40 text-lg">/ HUSH</span></h3>
                <p>Nativa de la dimensión alterna de Los Ángeles. Sus capacidades hiper-sensoriales no son mutaciones, sino habilidades propias que perfeccionó con entrenamiento extremo. Ian le diseña equipo táctico para anular su fricción.</p>
              </div>
            </div>
          </section>

          {/* SECTION 3 */}
          <section>
            <h2 className="font-[var(--font-bangers)] text-4xl text-[#e8185a] mb-6">3. ¿Cómo obtienen sus Identidades Heroicas?</h2>
            <div className="space-y-6">
              
              <div className="flex gap-4">
                <div className="w-1.5 bg-[#f5e642] shrink-0"></div>
                <div>
                  <h4 className="font-bold text-2xl text-white">Julián → Wildcard</h4>
                  <p className="text-white/80 mt-1">No viene de sus poderes, sino de su personalidad. Siempre tiene un plan raro, una salida absurda y comentarios inesperados. En una misión, cuando saca "una carta buena" sin saber bien el plan, Mati lo bautiza como un <em>"wildcard"</em> literal.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1.5 bg-[#f5e642] shrink-0"></div>
                <div>
                  <h4 className="font-bold text-2xl text-white">Jaz → Oracle</h4>
                  <p className="text-white/80 mt-1">Nace como una broma de Uandi al verla rodeada de libros y runas intentando interpretar una anomalía: <em>"Preguntale al oráculo. Seguro ya sabe qué va a explotar."</em> Eventualmente termina siendo literalmente un oráculo.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1.5 bg-[#f5e642] shrink-0"></div>
                <div>
                  <h4 className="font-bold text-2xl text-white">Sofi → Hush</h4>
                  <p className="text-white/80 mt-1">Nace del miedo de los criminales: <em>"Si Hush te escucha, estamos muertos."</em> Un día Ian le muestra un foro criminal mencionando a 'Hush' y ella responde: <em>"¿Quién demonios es Hush?"</em></p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1.5 bg-[#f5e642] shrink-0"></div>
                <div>
                  <h4 className="font-bold text-2xl text-white">Uandi → Aegis</h4>
                  <p className="text-white/80 mt-1">Aparece después de que Uandi se pone delante del grupo para recibir un impacto colosal. Alguien comenta: <em>"Ese tipo es un escudo."</em> A lo que otro responde: <em>"No es un escudo. Es una maldita Aegis."</em></p>
                  <p className="text-white/60 text-sm mt-1 italic">
                    Uandi tiene la costumbre rústica y recurrente de dirigirse a otros (amigos o enemigos) usando la muletilla <strong>"Bub"</strong> (ej: <em>"Correte del camino, Bub"</em>).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1.5 bg-[#f5e642] shrink-0"></div>
                <div>
                  <h4 className="font-bold text-2xl text-white">Volvo → Null Vector</h4>
                  <p className="text-white/80 mt-1">Ni siquiera nace de sus amigos, nace de expedientes militares y agencias. Cada vez que él aparece hay sistemas caídos e interferencias, por lo que lo clasifican como <em>"Null Vector"</em>, el punto donde todo deja de funcionar.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1.5 bg-[#f5e642] shrink-0"></div>
                <div>
                  <h4 className="font-bold text-2xl text-white">Mati → Swapfire</h4>
                  <p className="text-white/80 mt-1">El nombre cobra un sentido destructivo: ya no intercambia posiciones, sino el estado de la materia alternando ráfagas bifásicas a alta velocidad, creando un &quot;fuego cruzado&quot; de plasma puramente sólido (cinético) y haz térmico de fricción molecular.</p>
                  <p className="text-white/60 text-sm mt-1 italic">
                    A pesar de este alias oficial, Julián se niega a usarlo y siempre se refiere a él como "el mati" o "el mati de mierda" (ej: <em>"Preguntale a el mati"</em> o <em>"¿En serio hizo eso? Qué mati de mierda"</em>).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1.5 bg-[#e8185a] shrink-0"></div>
                <div>
                  <h4 className="font-bold text-2xl text-white">Ian → Vesperwing</h4>
                  <p className="text-white/80 mt-1">Es el único que elige su propio nombre. Los demás reciben nombres por sus acciones o del exterior, pero Ian diseña su propia identidad de la misma forma que diseñaría un traje o un gadget táctico.</p>
                </div>
              </div>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
