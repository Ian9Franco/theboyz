// ─── Character data & unlock logic ───────────────────────────────────────────
// Single source of truth — keep this file in sync with the /public/comics folder
export const CHARACTER_DETAILS = [
    {
      id: 'ian',
      name: 'Ian',
      image: '/personajes/FULLBODY SUIT/VESPERWING/vesperwing.webp',
      fullBody: '/personajes/FULLBODY/IAN.webp',
      altImage: '/personajes/ALT/IAN_ALT.webp',
      overloadImage: '/personajes/FULLBODY SUIT/VESPERWING/vesperwing.webp',
      color: '#0d3a2b',
      role: 'Analista táctico / inventor estratégico',
      visualCode: 'Buzo hoodie gris, lentes redondos',
      perfil: [
        'Humano sin alteraciones: Carece de mutaciones biológicas; su ventaja radica en una inteligencia analítica excepcional aplicada al diseño de soluciones estratégicas.',
        'Arquitecto de retaguardia: Su mente procesa el entorno de forma masiva, detectando patrones, fallas estructurales y vectores de ataque antes de que ocurran.',
        'Lealtad incondicional hacia su equipo, respaldada por una disciplina táctica impecable y un consumo crónico de café filtrado para mantener el enfoque.',
      ],
      crisis: 'Hiperenfoque analítico: Ante giros drásticos e imprevistos en el entorno, su cerebro prioriza recalcular todas las variables en milisegundos, lo que puede retrasar su respuesta inmediata en pos de la jugada perfecta.',
      stats: { fuerza: 4, inteligencia: 6, carisma: 6, suerte: 5, combate: 3, defensa: 3, especialVal: 1 },
      especialLabel: 'Sistemas',
      powers: {
        role: 'Vesperwing / Nexo Estratégico',
        habilidades: [
          'Visión de Sistemas: Capacidad cognitiva para escanear flujos de información, dinámicas de terreno y posicionamiento enemigo en tiempo real.',
          'Herramientas Ghost: Interfaz GhostLens de reconocimiento activo y Ghostwatch para coordinar drones de soporte que expanden su control de mapa.',
          'Guanteletes Vectoriales: Dispositivos cinéticos de su propia autoría, calibrados para desviar impactos directos y abrir brechas de escape.',
          'Movilidad Asistida: Uso fluido de pistola de ganchos neumática y capa de planeo aerodinámica para ganar altura y dominar la perspectiva táctica.',
        ],
        significa: 'El pilar estratégico del equipo. Su genialidad radica en coordinar el escenario mediante hardware de vanguardia y una lectura milimétrica del campo de batalla.',
        crisis: 'Saturación por fricción: Cuando las variables del entorno desafían la lógica planificada, su bucle analítico se ve forzado a optimizar sobre la marcha, consumiendo recursos mentales críticos.',
        stats: { fuerza: 7, inteligencia: 10, carisma: 8, suerte: 8, combate: 8, defensa: 7, especialVal: 10 },
        suitImages: {
          default: '/personajes/FULLBODY SUIT/VESPERWING/vesperwing.webp',
          alt: '/personajes/FULLBODY SUIT/VESPERWING/vesperwing_alt.webp',
          ficha: '/personajes/FULLBODY SUIT/VESPERWING/Vesperwing_Ficha.webp',
          ficha2: '/personajes/FULLBODY SUIT/VESPERWING/Vesperwing_ficha2.webp',
        },
        variantData: {
          alt: {
            label: 'Modo Infiltración',
            habilidades: [
              'Supresión Electromagnética Avanzada: Modulación activa del traje que anula firmas térmicas y lecturas de radar, garantizando invisibilidad ante sensores.',
              'Acrobacia y Anclaje Dinámico: Ganchos reforzados con cable de tensión para desplazamientos tridimensionales rápidos, silenciosos y de alta agilidad entre cornisas y estructuras urbanas.',
              'GhostLens Pasivo: Escaneo táctico de alta frecuencia que recopila datos masivos del entorno en absoluto silencio, sin emitir señales detectables.',
              'Capa de Absorción Lumínica y Silueta: Capa corta con tejido refractario que rompe su contorno visual, permitiéndole desvanecerse en las sombras y acechar desde las alturas de forma indetectable.',
            ],
            significa: 'Especialista en reconocimiento y emboscadas tácticas. Con el rostro descubierto y una capa corta que prioriza la agilidad física, Ian explota el sigilo coreográfico y el dominio de las alturas para desmantelar amenazas desde las sombras de manera independiente.',
            crisis: 'Aislamiento operativo: Al confiar ciegamente en su capacidad de anticipación y en su letalidad oculta, prescinde del blindaje pesado. Si la aleatoriedad del combate directo rompe su sigilo, queda expuesto a tomar decisiones drásticas para recuperar el control.',
          },
          full: {
            label: 'Vesper Frame (Nexo Tecnomágico)',
            habilidades: [
              'Vuelo y Propulsión Arcana: La ingeniería del exotraje asimila las leyes místicas transferidas por Jaz, permitiéndole una navegación aérea libre de fricción física y a velocidades límite.',
              'Matriz de Geometría Sagrada: Sus drones proyectan redes cinéticas y barreras de contención que intersectan y manipulan variables mágicas y físicas en simultáneo.',
              'HUD de Causalidad Absoluta: El casco cerrado unifica la analítica de datos con los hilos de la probabilidad mística, anticipando eventos antes de que se originen en la realidad.',
              'Amplificación Vectorial Taumatúrgica: Blindaje modular autorregenerativo y guanteletes capaces de proyectar descargas de energía cinética catalizada a gran escala.',
            ],
            significa: 'La ecuación resuelta. Al integrar el conocimiento de Jaz, Ian elimina el factor azar de su mapa. Deja de asesorar al equipo para pasar a rediseñar de manera unilateral las reglas del tablero.',
            crisis: 'Absolutismo estratégico: El control total diluye su empatía en favor de una lógica puramente utilitaria. Convencido de que las decisiones individuales solo generan caos, asume el control del resultado de forma fría e implacable, interviniendo el destino de los demás "por el bien común".',
          },
        },
      },
    },
    {
      id: 'jaz',
      name: 'Jaz',
      image: '/personajes/FULLBODY SUIT/ORACLE/Oracle.webp',
      fullBody: '/personajes/FULLBODY/JAZ.webp',
      overloadImage: '/personajes/FULLBODY SUIT/ORACLE/Oracle.webp',
      color: '#f5e642',
      role: 'Soporte defensivo / control de campo / enlace dimensional',
      visualCode: 'Polera negra, pelo sunset-gold, lentes de gato',
      perfil: [
        'Percepción mística innata: Posee la capacidad de leer capas no físicas, flujos de energía astral y las frecuencias ocultas que componen la realidad.',
        'Intuición espiritual profunda: Se guía por una fuerte conexión esotérica y una dependencia ritual (piedras energéticas, salvia) para limpiar el ruido de su entorno.',
        'Estilo distintivo: Polera negra de cuello alto, calzas y una cabellera degradada en tonos sunset-gold que refleja la energía calurosa de su aura.',
      ],
      crisis: 'Disociación del entorno: Ante picos intensos de tensión o dolor ajeno, su mente tiende a desconectarse de la realidad física, entrando en trances meditativos involuntarios para proteger su psique.',
      stats: { fuerza: 1, intelligence: 6, carisma: 5, suerte: 6, combate: 2, defensa: 2, especialVal: 2 },
      especialLabel: 'Aura-Anclaje',
      powers: {
        role: 'Oracle / Enlace Dimensional',
        habilidades: [
          'Geometría de Anclaje: Manifiesta estructuras cristalinas de energía psíquica pura en el plano físico, utilizándolas como escudos, plataformas flotantes o jaulas de contención.',
          'Resonancia Emocional: Lee las frecuencias vibracionales de los estados de ánimo circundantes, permitiéndole calmar el pánico o disipar la hostilidad sin necesidad de invadir pensamientos.',
          'Vínculo Astral Cohesivo: Entrelaza las conciencias de su equipo en una red mental unificada, compartiendo intenciones, alertas y coordenadas en tiempo real.',
          'Ascensión Etea: Capacidad de vuelo natural y fluido mediante la alteración de su propia gravedad astral, desplazándose con una ligereza supersónica casi sin esfuerzo.',
        ],
        significa: 'El núcleo espiritual y protector del equipo. Su presencia cohesiona las mentes de sus aliados y erige las defensas esenciales; sin ella, el grupo opera a ciegas, fracturado y expuesto.',
        crisis: 'Fluctuación del Velo: Bajo estrés extremo, su aura pierde estabilidad, provocando micro-grietas dimensionales involuntarias a su alrededor que alteran el espacio y representan un riesgo impredecible.',
        stats: { fuerza: 5, inteligencia: 9, carisma: 9, suerte: 10, combate: 7, defensa: 10, especialVal: 10 },
        suitImages: {
          default: '/personajes/FULLBODY SUIT/ORACLE/Oracle.webp',
          ficha: '/personajes/FULLBODY SUIT/ORACLE/Oracle_Ficha.webp',
          fichaAlt: '/personajes/FULLBODY SUIT/ORACLE/Oracle_ficha_alt.webp',
        },
        variantData: {
          full: {
            label: 'Modo Ruptura (Trascendencia Absoluta)',
            habilidades: [
              'Mirada Entre Velos: Desgarra su percepción temporal, visualizando ecos de realidades alternativas e hilos de causalidad futura de forma fragmentaria pero precisa.',
              'Arquitectura Taumatúrgica: Sus estructuras psíquicas escalan a niveles monumentales, transmutando el terreno en fortalezas geométricas capaces de resistir asedios físicos y mágicos.',
              'Proyección Astral Extendida: Desprende su conciencia del plano material, permitiéndole vigilar el mapa de forma omnisciente o percibir el entorno a través de los sentidos de sus aliados.',
              'Apertura del Nexo Sagrado: Canaliza de forma deliberada el conocimiento y las leyes arcanas de otras dimensiones, el mismo saber absoluto que es capaz de transferir y codificar en sistemas lógicos.',
            ],
            significa: 'Jaz convertida en canal supremo. Al alcanzar el límite de su don, desvanece las fronteras de la realidad para manifestar un poder puro y ancestral que excede las capacidades de un cuerpo humano.',
            crisis: 'Despersonalización cósmica: Al abrir por completo el velo de la causalidad, la inmensidad del infinito amenaza con devorar su identidad. El peligro real no es solo abrir una grieta física infranqueable, sino que su mente se desconecte de forma definitiva de los lazos humanos, olvidando quién es y por qué luchaba.',
          },
        },
      },
    },
    {
      id: 'julian',
      name: 'Julián',
      image: '/personajes/FULLBODY SUIT/WILDCARD/Wildcard.webp',
      fullBody: '/personajes/FULLBODY/JULIAN.webp',
      altImage: '/personajes/ALT/JULIAN_ALT.webp',
      overloadImage: '/personajes/FULLBODY SUIT/WILDCARD/Wildcard.webp',
      color: '#0a1128',
      role: 'Infiltración y engaño',
      visualCode: 'Suéter azul marino, barba, pelo corto con fade',
      perfil: [
        'Mentiroso compulsivo funcional: Utiliza la falsedad y la distorsión de la realidad como un escudo táctico y psicológico infranqueable.',
        'Fachada sarcástica: Oculta una altísima ansiedad interna y un cerebro hiperactivo bajo una capa de cinismo, carisma magnético y humor negro.',
        'Estilo urbano sobrio: Suéter azul marino de cuello redondo, pantalón negro y barba corta prolija; una apariencia ordinaria para un hombre de mil rostros.',
      ],
      crisis: 'Ocultamiento patológico: Ante crisis extremas o amenazas inminentes de muerte, su instinto es sepultar la información crítica bajo capas de engaño, prefiriendo el riesgo fatal antes que mostrarse vulnerable.',
      stats: { fuerza: 3, inteligencia: 4, carisma: 6, suerte: 4, combate: 2, defensa: 2, especialVal: 0 },
      especialLabel: 'Duplicidad',
      // Unlocked after: Green Truck Ch.1
      hint: 'Terminá el Capítulo 1 de Green Truck para desbloquear.',
      powers: {
        role: 'Wildcard / Infiltración',
        habilidades: [
          'Ecos de Presencia: Manifiesta hasta tres duplicados semisólidos de sí mismo. Estas copias pueden correr, hablar e interactuar de forma limitada con el entorno para desviar la atención.',
          'Punto Ciego Cognitivo: Altera sutilmente la percepción del objetivo, hackeando su cerebro para que deje de registrar su presencia física directa (es una ilusión cognitiva, no invisibilidad real).',
          'Detonación por Verdad: Sus clones están compuestos de engaño puro; si alguna de las copias enuncia una verdad absoluta e innegable, la paradoja lógica hace que colapse y detone violentamente de forma táctica.',
          'Anclaje Superficial: No posee capacidades de vuelo, pero puede adherirse y escalar cualquier superficie vertical u horizontal con agilidad fluida.',
        ],
        significa: 'El maestro de la distracción. Opera en los márgenes de la percepción ajena: infiltra líneas enemigas, fragmenta la atención del oponente y transforma sus propias ficciones en trampas letales.',
        crisis: 'Paradoja de la honestidad: El costo de usar la verdad como arma es altísimo. Si un clon detona involuntariamente por una declaración real, el impacto residual sacude la estabilidad mental de Julián.',
        stats: { fuerza: 7, inteligencia: 8, carisma: 9, suerte: 9, combate: 9, defensa: 7, especialVal: 9 },
        suitImages: {
          default: '/personajes/FULLBODY SUIT/WILDCARD/Wildcard.webp',
          ficha: '/personajes/FULLBODY SUIT/WILDCARD/Wildcard_Ficha.webp',
        },
        variantData: {
          action: {
            label: 'Modo Evasión Coreográfica',
            habilidades: [
              'Despliegue Ilusorio Dinámico: Genera una secuencia fluida de clones explosivos en combate cerrado, utilizándolos como escudos humanos y trampas cinéticas en movimiento.',
              'Asalto de Puntos Ciegos: Ataca de manera intermitente entrando y saliendo del radar cognitivo del enemigo, encadenando golpes quirúrgicos desde ángulos imposibles.',
              'Sincronía Fantasma: Coordina ofensivas simuladas junto a sus duplicados, forzando al oponente a defenderse de amenazas fantasmas mientras el Julián real asesta el impacto definitivo.',
            ],
            significa: 'El engaño en movimiento. Julián instrumentaliza la mentira en una coreografía física letal, donde el caos y la desorientación del rival son sus mejores herramientas de combate.',
            crisis: 'Falla del engaño: Depende por completo de que el enemigo muerda el anzuelo. Si un oponente con alta percepción rompe la ilusión, Julián queda atrapado en una posición vulnerable y en fuego cruzado real.',
          },
          alt: {
            label: 'Verdad Innegable (Forma Límite)',
            habilidades: [
              'Decreto de Realidad: Sus palabras adquieren un peso psicológico y metafísico anormal. Al hablar con honestidad brutal, es capaz de romper ilusiones ajenas y obligar a cualquier mente a escuchar.',
              'Saturación Paradojal: Carga a sus duplicados al límite absoluto de energía; un solo hecho real enunciado por Julián hace que todos los clones detonen en una reacción en cadena devastadora.',
              'Ruptura de Manipulaciones: Disipa instantáneamente los poderes de control mental, hipnosis o alteración de la realidad de los enemigos mediante una sola declaración honesta y factual.',
              'Interferencia de Naipes: Proyecta cartas ilusorias cargadas de energía cinética residual para cortar flujos tácticos y defenderse a corta distancia.',
            ],
            significa: 'El mentiroso que decidió ser honesto. Al despojarse del escudo de la falsedad por una única y desesperada ocasión, Julián transmuta su debilidad en el ataque más honesto y peligroso de su arsenal.',
            crisis: 'Exposición Absoluta: Al renunciar al engaño, Julián pierde toda su capacidad de infiltración y predictibilidad. Sin misterios ni fachadas tras las cuales esconderse, sus intenciones reales quedan completamente al desnudo, volviéndolo un blanco directo y fácil de leer para el enemigo.',
          },
        },
      },
    },
 {
  id: 'mati',
  name: 'Mati',
  image: '/personajes/FULLBODY SUIT/SWAPFIRE/Swapfire.webp',
  fullBody: '/personajes/FULLBODY/MATI.webp',
  overloadImage: '/personajes/FULLBODY SUIT/SWAPFIRE/Swapfire.webp',
  color: '#4c1d95',
  role: 'Controlador táctico / reposicionamiento',
  visualCode: 'Piel bronceada, campera táctica, hoyuelos',
  perfil: [
    'Pragmatismo calculador: Toma decisiones frías, lógicas y drásticas en milisegundos, anulando cualquier interferencia emocional para garantizar la eficiencia.',
    'Combatiente adaptativo: Un estratega de campo feroz y directo que protege los intereses de los suyos con un enfoque estrictamente utilitario.',
    'Estilo urbano militarizado: Campera bomber gris oscuro, remera verde oliva y hoyuelos marcados que contrastan sutilmente con la severidad de su mirada.',
  ],
  crisis: 'Resolución implacable: Ante escenarios desesperados, su lógica fría puede volverse extrema, priorizando el éxito de la misión u objetivo macro por encima de la seguridad individual de los involucrados.',
  stats: { fuerza: 4, inteligencia: 6, carisma: 4, suerte: 3, combate: 4, defensa: 3, especialVal: 0 },
  especialLabel: 'Intercambio',
  // Unlocked after: Mativerse Ch.3 Worlds
  hint: 'Terminá el Capítulo 3 (Worlds) de Mativerse Part 1.',
  powers: {
    role: 'Swapfire / Reposicionamiento',
    habilidades: [
      'Intercambio Táctico: Transpone instantáneamente las posiciones físicas de dos objetos, individuos o elementos del entorno, enviando aliados a cubierto y enemigos a trampas preexistentes.',
      'Dagas de Marcado: Armas arrojadizas de su invención que actúan como balizas cuánticas, permitiéndole teleportarse de forma inmediata hacia la ubicación exacta del impacto.',
      'Reorganización del Tablero: Altera la distribución espacial de múltiples variables en el campo en un parpadeo, reconfigurando las distancias sin necesidad de contacto directo.',
      'Desplazamiento Cuántico: No vuela, pero se desplaza por el escenario apareciendo y desapareciendo en coordenadas precisas sin transiciones ni trayectorias visibles.',
    ],
    significa: 'El dueño del espacio. Su filosofía dicta que la victoria no pertenece al más fuerte, sino a quien tiene la potestad absoluta de decidir dónde pisa cada jugador.',
    crisis: 'Límites vectoriales: Su capacidad estándar exige línea de visión directa, restricciones estrictas de masa equivalente y un rango acotado. Si bloquean su percepción visual, su sistema de transposición colapsa.',
    stats: { fuerza: 9, intelligence: 10, carisma: 8, suerte: 7, combate: 10, defensa: 9, especialVal: 10 },
    suitImages: {
      default: '/personajes/FULLBODY SUIT/SWAPFIRE/Swapfire.webp',
      ficha: '/personajes/FULLBODY SUIT/SWAPFIRE/Swapfire_ficha.webp',
    },
    variantData: {
      action: {
        label: 'Modo Asalto Dinámico',
        habilidades: [
          'Transposición en Movimiento: Intercambia posiciones de aliados y amenazas en medio de ráfagas de fuego cruzado, manteniendo su propio vector de avance sin desacelerar.',
          'Encadenamiento de Balizas: Lanza secuencias rápidas de dagas de marcado para ejecutar asaltos balísticos intermitentes, golpeando desde múltiples ángulos en segundos.',
          'Emboscada por Reubicación: Forzar al enemigo a ocupar la trayectoria de sus propios proyectiles o a quedar suspendido en el aire en puntos de caída libre.',
        ],
        significa: 'La manipulación espacial llevada al combate cerrado. Mati asimila el caos de la batalla en tiempo real, convirtiendo la velocidad del enemigo en su propia condena geométrica.',
        crisis: 'Margen de error balístico: Operar a altas velocidades reduce el tiempo de cálculo. Un desvío milimétrico en el intercambio corre el riesgo de posicionar a un aliado en una trayectoria letal antes de poder enmendarlo.',
      },
      full: {
        label: 'Swapfire (Forma Completa - Vector Kinetic)',
        habilidades: [
          'Intercambio de Momentum: Trasciende la materia; es capaz de aislar la energía cinética, velocidad o inercia de un objetivo en movimiento para transferirla directamente a otro.',
          'Rango de Campo Expandido: El exotraje completo amplifica su espectro de transposición, permitiéndole reubicar ejércitos enteros o estructuras medianas de manera simultánea.',
          'Dagas de Plasma Conductoras: Armas balísticas mejoradas que marcan objetivos móviles hiperveloces, ignorando blindajes físicos mediante micro-pulsos cuánticos.',
          'Supremacía Cuerpo a Cuerpo: Al disolver las restricciones de rango de su traje anterior, manipula los vectores de impacto enemigos en la corta distancia, anulando los golpes que recibe.',
        ],
        significa: 'El control absoluto del tablero. En su estado definitivo, Mati ya no solo altera dónde están los cuerpos, sino cómo se mueven. Entra a la vanguardia para redistribuir la física del combate a su antojo.',
        crisis: 'Saturación Cinética: Absorber e intercambiar flujos masivos de energía y momentum sobrecarga los sistemas adaptativos del traje. Si el volumen de fuerza externa supera su capacidad de redirección, el impacto residual se descarga directamente sobre su propio cuerpo.',
      },
    },
  },
},
 {
  id: 'uandi',
  name: 'Uandi',
  image: '/personajes/FULLBODY SUIT/AEGIS/Aegis.webp',
  fullBody: '/personajes/FULLBODY/UANDI.webp',
  altImage: '/personajes/ALT/UANDI_ALT.webp',
  overloadImage: '/personajes/FULLBODY SUIT/AEGIS/Aegis.webp',
  color: '#b91c1c',
  role: 'Tanque y protector',
  visualCode: 'Remera técnica Kappa, lentes redondos, tatuaje manga izquierdo',
  perfil: [
    'Honestidad brutal e ingenua: Transparente en sus intenciones, actúa bajo un código moral directo y se posiciona como el protector rígido del grupo. Tiene la costumbre recurrente de referirse a amigos y enemigos por igual con el apelativo "Bub".',
    'Complexión atlética: Porte físico imponente, caracterizado por una intrincada y extensa manga de tatuajes de diseño tribal/geométrico en su brazo izquierdo.',
    'Estilo urbano deportivo: Remera técnica ajustada de Kappa, pantalón cargo gris y lentes redondos que suavizan sutilmente sus facciones de combate.',
  ],
  crisis: 'Inercia de vanguardia: Ante la amenaza inminente, su instinto de protección lo vuelve inflexible; tiende a cargar de frente contra el peligro, confiando en su resistencia física antes de evaluar rutas de evasión.',
  stats: { fuerza: 5, inteligencia: 3, carisma: 5, suerte: 3, combate: 3, defensa: 4, especialVal: 0 },
  especialLabel: 'Carga Cinética',
  // Unlocked after: Green Truck Ch.4 No Turning Back
  hint: 'Terminá el Capítulo 4 (No Turning Back) de Green Truck.',
  powers: {
    role: 'Aegis / Tanque Cinético',
    habilidades: [
      'Acumulación Cinética: La tinta de sus tatuajes actúa como un receptor cuántico que absorbe la energía de los impactos físicos recibidos. No lo hace inmune al dolor, pero canaliza la fuerza del golpe.',
      'Descarga de Fuerza Vectorial: Libera la energía acumulada para ejecutar súper saltos de gran distancia, impactos devastadores a corta distancia u ondas de choque de rango corto.',
      'Refuerzo de Densidad: Canaliza el almacenamiento residual de sus tatuajes para rigidizar su estructura molecular, resistiendo temporalmente ataques masivos que superarían a cualquier humano.',
      'Movilidad Balística: Ejecuta saltos de gran altura y proyección. Carece de vuelo dinámico; su tránsito aéreo es un proyectil guiado por su propio peso que cae con intención táctica.',
    ],
    significa: 'El escudo humano. Su rol es absorber el castigo que sus aliados no pueden soportar, asimilando la violencia del campo de batalla para devolverla multiplicada.',
    crisis: 'Saturación de almacenamiento: Sus tatuajes tienen un límite de retención. Si se saturan de energía cinética y no ejecuta una descarga a tiempo, la tinta se agrieta superficialmente, liberando pulsos térmicos incontrolables.',
    stats: { fuerza: 10, inteligencia: 6, carisma: 8, suerte: 7, combate: 9, defensa: 10, especialVal: 10 },
    suitImages: {
      default: '/personajes/FULLBODY SUIT/AEGIS/Aegis.webp',
      ficha: '/personajes/FULLBODY SUIT/AEGIS/Aegis_Ficha.webp',
    },
    variantData: {
      full: {
        label: 'Modo Solidificación Total',
        habilidades: [
          'Transmutación Metalúrgica: Transmuta temporalmente la estructura molecular de sus extremidades superiores en una aleación metálica hiperdensa de resistencia casi indestructible.',
          'Deflexión Balística Pesada: Capacidad para cruzar los brazos y desviar ráfagas de proyectiles pesados o impactos de artillería sin sufrir daño estructural.',
          'Impacto de Demolición: Su fuerza física se eleva a escala colosal, permitiéndole fracturar blindajes pesados, derribar fortificaciones o hundir el terreno con un solo golpe.',
          'Luminiscencia Rúnica: Al alcanzar el umbral máximo de almacenamiento, los patrones de sus tatuajes brillan en un tono rojo incandescente, disipando calor térmico residual.',
        ],
        significa: 'El coloso de primera línea. Cuando la batería está al máximo y sus brazos se solidifican, Uandi deja de amortiguar el combate; quiebra la ofensiva enemiga y se convierte en una barrera infranqueable.',
        crisis: 'Agotamiento cinético: La solidificación y los ataques de demolición consumen la totalidad de la energía almacenada en un solo evento masivo. Tras la descarga, el exotraje entra en un breve estado de latencia, dejándolo sin reservas de absorción y expuesto a la fatiga física inmediata.',
      },
    },
  },
},
 {
  id: 'volvo',
  name: 'Volvo',
  image: '/personajes/FULLBODY SUIT/NULL-VECTOR/Null-Vector.webp',
  fullBody: '/personajes/FULLBODY/VOLVO.webp',
  overloadImage: '/personajes/FULLBODY SUIT/NULL-VECTOR/Null-Vector.webp',
  color: '#f95700',
  role: 'Saboteador',
  visualCode: 'Remera naranja, ojos celestes, cinturón táctico',
  perfil: [
    'Audacia impulsiva: Actúa con una bajísima reactividad emocional ante el peligro directo, lo que le permite operar con cabeza fría en escenarios de alto riesgo.',
    'Disrupción compulsiva: Posee el hábito crónico e intuitivo de manipular, analizar y sabotear cualquier arquitectura de alta tecnología que se cruce en su camino.',
    'Estilo de vanguardia rústico: Remera naranja lisa de alto contraste, cinturón de cuero técnico con cartucheras funcionales y una mirada de ojos celestes intensos.',
  ],
  crisis: 'Iniciativa disruptiva: Su naturaleza audaz lo empuja a actuar por puro instinto cinético antes de que las órdenes se consoliden, arriesgándose a alterar los planes del equipo en pos de una oportunidad inmediata.',
  stats: { fuerza: 3, inteligencia: 4, carisma: 2, suerte: 5, combate: 3, defensa: 2, especialVal: 1 },
  especialLabel: 'Disrupción',
  // Unlocked after: Mativerse Ch.3 Worlds
  hint: 'Terminá el Capítulo 3 (Worlds) de Mativerse Part 1.',
  powers: {
    role: 'Null-Vector / Saboteador',
    habilidades: [
      'Interferencia de Espectro: Altera la electrónica, redes de datos y frecuencias de sensores enemigos; en lugar de apagarlos, induce un comportamiento caótico e impredecible.',
      'Blink de Cortocircuito: Micro-teleportación cuántica (rango de 5 a 8 metros) utilizando líneas de tensión o flujos de conductividad cercanos como vectores de tránsito.',
      'Sabotaje de Sistemas: Desincroniza y colapsa el hardware avanzado y los sistemas de armas rivales mediante un único contacto físico directo.',
      'Ascensión Cinética-Eléctrica: Capacidad de vuelo natural cuya velocidad y empuje escalan proporcionalmente al volumen de sobrecarga eléctrica que absorbe del entorno.',
    ],
    significa: 'El ecualizador del campo de batalla. Su función es neutralizar la brecha tecnológica del oponente antes de que puedan capitalizarla, desmantelando cualquier plan b digital.',
    crisis: 'Dependencia de red: Su movilidad táctica y micro-teleportación exigen la presencia de infraestructura conductora o flujos energéticos. En entornos aislados o analógicos, su rango operativo se ve drásticamente acotado.',
    stats: { fuerza: 7, inteligencia: 8, carisma: 5, suerte: 9, combate: 8, defensa: 8, especialVal: 9 },
    suitImages: {
      default: '/personajes/FULLBODY SUIT/NULL-VECTOR/Null-Vector.webp',
      ficha: '/personajes/FULLBODY SUIT/NULL-VECTOR/Null-Vector_Ficha.webp',
    },
    variantData: {
      action: {
        label: 'Modo Sobrecarga Máxima',
        habilidades: [
          'Arco de Conducción Continuo: Su exotraje canaliza flujos eléctricos de alta tensión constantes, provocando cortocircuitos inmediatos en cualquier superficie u objetivo que toque.',
          'Vuelo de Interferencia EM: Desplazamiento aéreo de alta velocidad que proyecta de forma pasiva una onda de pulso electromagnético disruptivo a lo largo de toda su trayectoria.',
          'Blink Desencadenado: Duplica el rango de su micro-teleportación, permitiéndole enlazar saltos espaciales en pleno movimiento libre sin depender de anclajes físicos fijos.',
          'Descarga de Plasma Vectorial: Concentra la energía estática residual en sus guantes técnicos, proyectando ráfagas de arco voltaico directo contra objetivos individuales.',
        ],
        significa: 'El vector nulo encarnado. Al entrar en sobrecarga máxima, Volvo deja de sabotear la infraestructura externa para convertirse él mismo en una anomalía electromagnética viviente.',
        crisis: 'Indiscriminación de frecuencia: En este estado extremo, el output caótico de su energía es tan masivo que le resulta imposible filtrar objetivos; los sistemas tácticos e interfaces de sus propios aliados sufren la misma interferencia severa que los del enemigo.',
      },
    },
  },
},
 {
  id: 'sofi',
  name: 'Sofi',
  image: '/personajes/FULLBODY SUIT/HUSH/Hush.webp',
  fullBody: '/personajes/FULLBODY/SOFI.webp',
  altImage: '/personajes/ALT/SOFI_ALT.webp',
  overloadImage: '/personajes/FULLBODY SUIT/HUSH/Hush.webp',
  color: '#06b6d4',
  role: 'Reconocimiento avanzado / duelista táctica',
  visualCode: 'Campera puffer tricolor rosa y borgoña, bufanda, rulos en rodete',
  perfil: [
    'Presence dominante y audaz: Posee una agudeza física innata y una audición hiperdesarrollada capaz de aislar las frecuencias más sutiles del entorno.',
    'Determinación inflexible: Caracterizada por una firmeza extrema en sus convicciones; no altera su postura ni cede ante presiones o amenazas externas.',
    'Estilo urbano de bloques: Campera puffer con bloques geométricos rosa y borgoña, suéter crema, bufanda abrigada y un prolijo rodete de rulos oscuros.',
  ],
  crisis: 'Inflexibilidad de criterio: Al procesar certezas sensoriales que los demás ignoran, tiende a cerrarse en sus propias conclusiones tácticas, actuando de manera unilateral y agresiva para resolver la amenaza.',
  stats: { fuerza: 4, inteligencia: 5, carisma: 6, suerte: 5, combate: 4, defensa: 3, especialVal: 1 },
  especialLabel: 'Eco-Rango',
  // Unlocked after: Mativerse Ch.2 Casino
  hint: 'Terminá el Capítulo 2 (Casino) de Mativerse Part 1.',
  powers: {
    role: 'Hush / Duelista Acústica',
    habilidades: [
      'Radar Acústico: Percibe su entorno en un radio de 360 grados procesando el rebote del sonido, ignorando paredes y barreras visuales.',
      'Audición Hiperfocalizada: Puede aislar latidos cardíacos, respiraciones y fricción muscular para detectar mentiras o intenciones ocultas.',
      'Precisión Anatómica: Sus golpes no dependen de fuerza bruta, sino de golpear exactamente en nervios y puntos estructurales débiles guiada por sus sentidos.',
      'Movilidad Acrobática: Se desplaza por la ciudad en absoluto silencio, combinando parkour extremo con una pistola de ganchos táctica.',
    ],
    significa: 'Ve el mundo con más claridad que cualquiera con los ojos abiertos. Nada se le oculta en la oscuridad.',
    crisis: 'Sobrecarga Sensorial: Ruidos repentinos de extrema decibelia (explosiones cercanas, alarmas estridentes) la desorientan e incapacitan de dolor físico severo.',
    stats: { fuerza: 8, inteligencia: 8, carisma: 8, suerte: 8, combate: 9, defensa: 9, especialVal: 9 },
    suitImages: {
      default: '/personajes/FULLBODY SUIT/HUSH/Hush.webp',
      combat: '/personajes/FULLBODY SUIT/HUSH/Hush_combat.webp',
      ficha: '/personajes/FULLBODY SUIT/HUSH/Hush_Ficha.webp',
    },
    variantData: {
      combat: {
        label: 'Modo Duelista Ciega',
        habilidades: [
          'Traje de Combate Vesperwing: Armadura táctica ligera diseñada específicamente por Ian para suprimir el ruido de su propia fricción y potenciar su movilidad.',
          'Katanas Gemelas: En combate cerrado despliega sus katanas, confiando puramente en su instinto y entrenamiento marcial.',
          'Esquiva Predictiva: Al escuchar la contracción muscular de su oponente, comienza a esquivar el golpe antes de que sea lanzado.',
          'Intercepción Perfecta: Desarma o desvía armas interceptando en el ángulo exacto de menor resistencia.',
          'Combate a Oscuras: Su mayor ventaja es destruir las luces del entorno; en la ceguera total, sus enemigos no son nada, y ella es letal.',
        ],
        significa: 'Cierra los ojos para alcanzar su máximo potencial. Ya no solo rastrea, ahora ejecuta con una fluidez aterradora.',
        crisis: 'Al depender de micro-sonidos, oponentes que logran moverse sin fricción o seres no-biológicos (sin latido ni respiración) son casi imposibles de anticipar.',
      },
    },
  },
},
{
    id: 'matapobre',
    name: 'Matapobres',
    image: '/personajes/SECUNDARIOS/Matapobres/MATAPOBRES.webp',
    fullBody: '/personajes/SECUNDARIOS/Matapobres/MATAPOBRES.webp',
    altImage: '/personajes/SECUNDARIOS/Matapobres/Matapobres_ficha.webp',
    color: '#6b7280',
    isSecondary: true,
    category: 'secundarios',
    role: 'Antiheroína / Karma',
    visualCode: 'Traje de piloto espacial, lentes de cazadora',
    perfil: [
      'Mercenaria de información: Cínica, sarcástica y con una flexibilidad moral supeditada a las circunstancias y al beneficio propio.',
      'Estilo de piloto: Traje de cuero sintético con parches militares, botas magnéticas y cigarrillo espacial.',
      'Lazos de probabilidad: Lentes de cazadora que proyectan hilos de energía gris plateada indicando los puntos de falla mecánica.'
    ],
    crisis: 'Prioridad de supervivencia: Ante un colapso, manipula la suerte para asegurar su propia ruta de escape, desentendiéndose del equipo.',
    stats: { fuerza: 3, inteligencia: 6, carisma: 5, suerte: 6, combate: 3, defensa: 2, especialVal: 2 },
    especialLabel: 'Efecto Dominó',
    hint: 'Terminá el Capítulo 3 (Worlds) de Mativerse Part 1.',
    powers: {
      role: 'Karma',
      habilidades: [
        'Distorsión de Probabilidad Cuántica: Altera la probabilidad local de manera irónica, provocando fallas catastróficas en tecnología enemiga.',
        'Lazos del Destino: Percibe e interceptar los hilos de la probabilidad, forzando fallas o colisiones.',
        'Navegación del Caos: Transmuta el momentum de peligro en un escape fortuito.'
      ],
      significa: 'La variable del vacío. Domina el caos fortuito y sabotea los sistemas enemigos mediante mala suerte dirigida.',
      crisis: 'Rebote estocástico: Intentar forzar eventos de probabilidad nula genera un contragolpe de mala suerte sobre ella.',
      stats: { fuerza: 5, inteligencia: 8, carisma: 7, suerte: 10, combate: 6, defensa: 5, especialVal: 9 }
    }
  },
  {
    id: 'supertrucker',
    name: 'Super Camionero',
    image: '/personajes/SECUNDARIOS/Supercamionero/Supercamionero.webp',
    fullBody: '/personajes/SECUNDARIOS/Supercamionero/Supercamionero.webp',
    altImage: '/personajes/SECUNDARIOS/Supercamionero/Supercamionero_alt.webp',
    fichaImage: '/personajes/SECUNDARIOS/Supercamionero/Supercamionero_ficha.webp',
    color: '#f97316',
    isSecondary: true,
    category: 'secundarios',
    role: 'El Centinela del Asfalto',
    visualCode: 'Gorra cromada, capa de lona roja, faros xenón',
    perfil: [
      'Héroe legendario del asfalto: Una fuerza independiente y mítica obsesionada con el dominio, la física y las rutas terrestres.',
      'Piloto de vanguardia: Conduce un titánico camión de combate semirremolque modificado con ingeniería balística avanzada.',
      'Estilo de pesada herencia: Capa de lona roja gruesa impermeable, gorra cromada de alta resistencia y faros de luz azul xenón.'
    ],
    crisis: 'Fijación de mantenimiento: Ante cualquier daño menor en sus sistemas mecánicos, prioriza la reparación preventiva sobre la amenaza.',
    stats: { fuerza: 8, inteligencia: 4, carisma: 6, suerte: 5, combate: 7, defensa: 8, especialVal: 8 },
    especialLabel: 'Embestida',
    hint: 'Terminá el Capítulo 1 de Green Truck para desbloquear.',
    powers: {
      role: 'Supertrucker',
      habilidades: [
        'Armadura de Cromo: Cuerpo forjado en una aleación metálica cromada que disipa el calor y repele impactos balísticos pesados.',
        'Llave de Plasma Cruzada: Pesada herramienta táctica de energía ionizada capaz de cortar blindajes y estructuras vehiculares.',
        'Mega-Transporter: Invoca un gigantesco camión semirremolque de combate equipado con cañones de repulsión cinética.'
      ],
      significa: 'Tanque pesado motorizado. Su propósito es la demolición absoluta y el control de carril mediante embestidas.',
      crisis: 'Rigidez operativa: Su enfoque lineal lo vuelve vulnerable ante distorsiones cognitivas e ilusiones.',
      stats: { fuerza: 10, inteligencia: 5, carisma: 8, suerte: 7, combate: 9, defensa: 10, especialVal: 10 }
    }
  },
  {
    id: 'coleccionista',
    name: 'El Viejo Coleccionista',
    image: '/personajes/SECUNDARIOS/Tinkerer/The Tinkerer.webp',
    fullBody: '/personajes/SECUNDARIOS/Tinkerer/The Tinkerer.webp',
    color: '#8b5cf6',
    isSecondary: true,
    category: 'secundarios',
    role: 'Proveedor tecnológico / The Tinkerer',
    visualCode: 'Overol de mecánico con grasa cuántica, visor ocular multi-lente',
    perfil: [
      'Mentor silencioso y huraño: Atiende el taller "Interdimensional Repairs", actuando como el nexo logístico de los pibes en el multiverso.',
      'Ingeniero de desguace: Un experto absoluto en rediseñar, hibridar y estabilizar tecnologías y componentes cuánticos dañados.',
      'Estilo de taller cuántico: Overol de mecánico desgastado y visor ocular de cuatro lentes móviles que proyectan planos en azul holográfico.'
    ],
    crisis: 'Recelo profesional: Si los pibes tratan con descuido las piezas de su inventario, se rehúsa a cooperar o proveer armamento.',
    stats: { fuerza: 2, inteligencia: 8, carisma: 4, suerte: 6, combate: 1, defensa: 3, especialVal: 7 },
    especialLabel: 'Ingeniería',
    hint: 'Terminá el Capítulo 4 (No Turning Back) de Green Truck.',
    powers: {
      role: 'The Tinkerer',
      habilidades: [
        'Análisis de Código Físico: Percepción analítica intuitiva que le permite descifrar el funcionamiento y planos de cualquier artefacto.',
        'Modificación Cuántica: Transmuta componentes comunes y chatarra tecnológica en portales estables o celdas de energía.',
        'Ocular Multiespectral: Visor que detecta vulnerabilidades atómicas, fugas de energía y fallas estructurales invisibles.'
      ],
      significa: 'El armero de las dimensiones. Altera y refina la materia cuántica para generar recursos logísticos e infraestructura.',
      crisis: 'Saturación del espectro: El uso continuo de su visor lo expone a sufrir interferencias cuánticas severas, bloqueando su lectura.',
      stats: { fuerza: 4, inteligencia: 10, carisma: 6, suerte: 8, combate: 3, defensa: 6, especialVal: 10 }
    }
  },
  {
    id: 'rylai',
    name: 'Crystal Maiden',
    image: '/personajes/SECUNDARIOS/Rylai/Rylai.webp',
    fullBody: '/personajes/SECUNDARIOS/Rylai/Rylai.webp',
    color: '#3b82f6',
    isSecondary: true,
    category: 'secundarios',
    role: 'La Canalizadora de la Tormenta',
    visualCode: 'Capa azul ártico con piel blanca, bastón místico con gema de hielo',
    perfil: [
      'Control del frío: Joven decidida que canaliza la magia de la escarcha. Sus pasos dejan huellas de hielo sobre el asfalto urbano.',
      'El ancla del equipo de taberna: Hermana menor para Tusk, a quien tranquiliza mediante brisas heladas cuando se nubla por la adrenalina.',
      'Estilo invernal: Capa de azul ártico con bordes de piel blanca y detalles de cristales en los hombros.'
    ],
    crisis: 'Vulnerabilidad física: Su magia requiere canalización estática, lo que la vuelve un blanco fácil si logran flanquear sus defensas de hielo.',
    stats: { fuerza: 2, inteligencia: 7, carisma: 8, suerte: 6, combate: 4, defensa: 5, especialVal: 8 },
    especialLabel: 'Congelación',
    powers: {
      role: 'Crystal Maiden',
      habilidades: [
        'Frostbite: Encierra a un enemigo en un bloque de hielo sólido, impidiendo su movimiento y causándole daño por frío extremo.',
        'Crystal Nova: Crea una explosión de escarcha que ralentiza a múltiples enemigos en el área de impacto.',
        'Freezing Field: Canaliza una masiva tormenta de nieve que congela el panel y ralentiza todo a su alrededor.'
      ],
      significa: 'Control de masas y soporte elemental. Congela el terreno de combate para limitar la movilidad de las amenazas.',
      crisis: 'Interrupción mágica: Cualquier aturdimiento físico o interrupción interrumpe su canalización, disipando la tormenta.',
      stats: { fuerza: 4, inteligencia: 9, carisma: 9, suerte: 7, combate: 5, defensa: 6, especialVal: 10 }
    }
  },
  {
    id: 'bristleback',
    name: 'Bristleback',
    image: '/personajes/SECUNDARIOS/Bristleback/Bristleback.webp',
    fullBody: '/personajes/SECUNDARIOS/Bristleback/Bristleback.webp',
    color: '#15803d',
    isSecondary: true,
    category: 'secundarios',
    role: 'El Matón de Callejón',
    visualCode: 'Chaleco vaquero sin mangas, aro en la nariz, lomo de espinas biomecánicas',
    perfil: [
      'Matón pendenciero: Puercoespín humanoide inspirado en los hooligans de callejón, con acento británico y cicatrices en el rostro.',
      'Vínculo de hermandad: Compañero de taberna de Tusk. El primero en romper botellas si amenazan a sus aliados.',
      'Lomo biomecánico: Espinas que brillan con fluido verde tóxico y vibran al recibir impactos.'
    ],
    crisis: 'Furia ciega: Si es insultado o desafiado, pierde el control y ataca de espaldas para forzar su defensa pasiva, ignorando órdenes tácticas.',
    stats: { fuerza: 7, inteligencia: 3, carisma: 4, suerte: 5, combate: 6, defensa: 7, especialVal: 6 },
    especialLabel: 'Espinas',
    powers: {
      role: 'Rigwarl',
      habilidades: [
        'Viscous Nasal Goo: Cubre al enemigo con moco pegajoso y ácido, reduciendo su armadura y velocidad de movimiento.',
        'Quill Spray: Dispara ráfagas de espinas desde su lomo, infligiendo daño que se acumula con cada golpe sucesivo.',
        'Bristleback (Lomo de Acero): Reduce pasivamente el daño recibido por la espalda y los costados, disparando Quill Spray de forma automática.'
      ],
      significa: 'Tanque dispersor. Se planta en el centro de la pelea atrayendo fuego para saturar el entorno de púas y metralla orgánica.',
      crisis: 'Ataques directos: Su reducción de daño no aplica a ataques frontales de precisión, quedando expuesto si es inmovilizado de cara al enemigo.',
      stats: { fuerza: 9, inteligencia: 4, carisma: 5, suerte: 6, combate: 8, defensa: 10, especialVal: 8 }
    }
  },
  {
    id: 'invoker',
    name: 'Invoker',
    image: '/personajes/SECUNDARIOS/Invoker/Invoker.webp',
    fullBody: '/personajes/SECUNDARIOS/Invoker/Invoker.webp',
    color: '#d97706',
    isSecondary: true,
    category: 'secundarios',
    role: 'El Mago del Arsenal',
    visualCode: 'Cabello blanco ingrávido, capa-gabardina marfil, orbes de energía',
    perfil: [
      'Elegancia inmortal: Flota a centímetros del asfalto. Muestra una actitud fría y aristocrática en medio del caos de la metrópoli.',
      'Mente enciclopédica: Memoriza fórmulas arcanas antiguas y las combina a velocidad luz en orbes de Quas, Wex y Exort.',
      'Estilo majestuoso: Gabardina de cuello alto color marfil y bordes dorados que levita sola alrededor de su cuerpo.'
    ],
    crisis: 'Complejo de superioridad: Considera a los humanos tan inferiores que se niega a usar hechizos defensivos básicos, prefiriendo la espectacularidad.',
    stats: { fuerza: 3, inteligencia: 10, carisma: 7, suerte: 5, combate: 7, defensa: 4, especialVal: 9 },
    especialLabel: 'Invocación',
    powers: {
      role: 'Kael',
      habilidades: [
        'Tornado: Despliega una corriente de viento Wex-Quas que levanta a los enemigos del panel y los suspende en el aire.',
        'Chaos Meteor: Invoca un meteorito incandescente cargado de Exort que rueda arrasando el campo y quemando a su paso.',
        'Deafening Blast: Emite una onda sónica de energía combinada que inflige daño, empuja y desarma temporalmente a los oponentes.'
      ],
      significa: 'Artillería mágica omnidireccional. Combina orbes elementales para conjurar soluciones destructivas adaptadas a la situación.',
      crisis: 'Saturación mental: Si el orden de conjuración falla por milisegundos, el hechizo se disipa y bloquea su invocación temporalmente.',
      stats: { fuerza: 5, inteligencia: 10, carisma: 8, suerte: 6, combate: 9, defensa: 6, especialVal: 10 }
    }
  },
  {
    id: 'ymir',
    name: 'Tusk',
    image: '/personajes/SECUNDARIOS/Ymir/Tusk.webp',
    fullBody: '/personajes/SECUNDARIOS/Ymir/Tusk.webp',
    color: '#0284c7',
    isSecondary: true,
    category: 'secundarios',
    role: 'El Boxeador del Norte',
    visualCode: 'Morsa robusta, chaleco con piel de oso, guantelete de hielo eterno',
    perfil: [
      'Boxeador del norte: Morsa gigante de bigote denso y parche en el ojo, con un entusiasmo contagioso por las peleas de bar.',
      'Protector de Rylai: Sumamente sobreprotector con Crystal Maiden, a quien trata como su hermana menor y defiende ferozmente.',
      'Guantelete helado: Mano derecha equipada con un guantelete metálico que acumula escarcha azul y energía cinética.'
    ],
    crisis: 'Temeridad de taberna: Su amor por el espectáculo lo empuja a rodar en bolas de nieve directo hacia posiciones enemigas fortificadas.',
    stats: { fuerza: 8, inteligencia: 4, carisma: 8, suerte: 6, combate: 7, defensa: 6, especialVal: 7 },
    especialLabel: 'Walrus Punch',
    powers: {
      role: 'Ymir',
      habilidades: [
        'Walrus PUNCH!: Un golpe devastador cargado de hielo que lanza al enemigo por los aires con onomatopeyas congeladas en escena.',
        'Snowball: Se envuelve junto a sus aliados cercanos en una gigantesca bola de nieve rodante que atropella todo a su paso.',
        'Ice Shards: Lanza fragmentos de hielo comprimido que se despliegan en una barrera física semicircular, atrapando al rival.'
      ],
      significa: 'Iniciador y luchador cuerpo a cuerpo. Desestabiliza las líneas enemigas mediante embestidas heladas y golpes críticos.',
      crisis: 'Exposición post-golpe: Tras descargar su Walrus Punch, el guantelete requiere enfriamiento térmico, reduciendo su defensa física.',
      stats: { fuerza: 10, inteligencia: 5, carisma: 9, suerte: 7, combate: 9, defensa: 8, especialVal: 10 }
    }
  },
  {
    id: 'julander',
    name: 'Julander',
    image: '/personajes/Voughtverse/Julander.webp',
    fullBody: '/personajes/Voughtverse/Julander.webp',
    color: '#2563eb',
    isSecondary: true,
    category: 'voughtverse',
    role: 'Homelander Inseguro / Vought',
    visualCode: 'Traje de spandex azul brillante, capa estrellada, sonrisa congelada',
    perfil: [
      'El súper corporativo: El Súper más poderoso y falso de la corporación. Usa el rostro de Julián pero con una sonrisa plástica de publicidad.',
      'Inseguridad extrema: Oculta una tremenda fragilidad ególatra bajo una coraza de invulnerabilidad física y marketing corporativo.',
      'Estilo patriótico: Traje brillante con barras rojas y blancas en la capa y hombreras doradas.'
    ],
    crisis: 'Crisis de atención: Si el público o los medios cuestionan su heroísmo, sufre ataques de pánico que desestabilizan su control de vuelo.',
    stats: { fuerza: 10, inteligencia: 4, carisma: 9, suerte: 5, combate: 8, defensa: 10, especialVal: 9 },
    especialLabel: 'Láser Celeste',
    powers: {
      role: 'Julián Variant',
      habilidades: [
        'Láser Ocular Azul: Emite devastadores rayos láser de color azul celeste capaces de fundir blindajes a kilómetros.',
        'Vuelo Supersónico: Navega la atmósfera a velocidades límites, rompiendo la barrera del sonido.',
        'Fuerza Colosal: Capacidad de levantar toneladas y desviar impactos de artillería con el pecho desnudo.'
      ],
      significa: 'La fuerza hegemónica corporativa. Arrasa con posiciones enemigas mediante fuerza bruta colosal e implacables láseres.',
      crisis: 'Dependencia de aprobación: Su poder se debilita si se siente rechazado o expuesto psicológicamente.',
      stats: { fuerza: 10, inteligencia: 5, carisma: 10, suerte: 6, combate: 9, defensa: 10, especialVal: 10 }
    }
  },
  {
    id: 'volvo_carnicero',
    name: 'Volvo Butcher',
    image: '/personajes/Voughtverse/Volvo Carnicero.webp',
    fullBody: '/personajes/Voughtverse/Volvo Carnicero.webp',
    color: '#78350f',
    isSecondary: true,
    category: 'voughtverse',
    role: 'Líder de la Resistencia / The Boys',
    visualCode: 'Gabardina larga de cuero marrón, barba desaliñada, cigarro',
    perfil: [
      'Líder clandestino: Comanda la resistencia contra los Súper de Vought. Viste una gabardina larga y posee una mirada desquiciada.',
      'Furia callejera: Combate mediante tácticas de guerrilla urbana, usando herramientas toscas y fuerza bruta desmedida.',
      'Estilo desaliñado: Barba prominente, camisa hawaiana bajo la gabardina y humo de cigarro constante.'
    ],
    crisis: 'Obsesión de venganza: Su odio ciego hacia los Súper lo lleva a ignorar los planes de escape, arriesgando la vida del grupo.',
    stats: { fuerza: 6, inteligencia: 8, carisma: 5, suerte: 4, combate: 8, defensa: 7, especialVal: 5 },
    especialLabel: 'Barreta',
    powers: {
      role: 'Volvo Variant',
      habilidades: [
        'V-Temporal: Se inyecta la sustancia corporativa para obtener fuerza y durabilidad mejoradas por breves períodos.',
        'Barreta de Plasma: Arma cuerpo a cuerpo que genera arcos eléctricos capaces de fracturar extremidades blindadas.',
        'Bláster de Tres Cañones: Pesado armamento a distancia diseñado por el Coleccionista que dispara metralla de plasma.'
      ],
      significa: 'El cazador de súper. Emplea fuerza física mejorada y tecnología modificada para destrozar la invulnerabilidad enemiga.',
      crisis: 'Contragolpe de V-Temporal: El uso del compuesto debilita su salud, causándole mareos e interferencias motoras tras la descarga.',
      stats: { fuerza: 8, inteligencia: 9, carisma: 6, suerte: 5, combate: 9, defensa: 8, especialVal: 8 }
    }
  },
  {
    id: 'a_uandi',
    name: 'A-Uandi',
    image: '/personajes/Voughtverse/A-Uandi.webp',
    fullBody: '/personajes/Voughtverse/A-Uandi.webp',
    color: '#1d4ed8',
    isSecondary: true,
    category: 'voughtverse',
    role: 'Velocista Corporativo / Vought',
    visualCode: 'Traje deportivo azul y blanco, gafas aerodinámicas, tatuajes de luz',
    perfil: [
      'Velocista estrella: El velocista oficial de la corporación. Posee una masa muscular masiva inusual para un corredor.',
      'Bola de demolición: Combina su masa de tanque con velocidad mach para embestir a sus objetivos.',
      'Estilo deportivo: Gafas de sol de alta velocidad y traje de spandex azul con líneas reflectantes.'
    ],
    crisis: 'Saturación cardíaca: La velocidad extrema desgasta su corazón modificado, causándole micro-infartos si excede el límite de velocidad.',
    stats: { fuerza: 8, inteligencia: 5, carisma: 7, suerte: 4, combate: 7, defensa: 8, especialVal: 8 },
    especialLabel: 'Velocidad Mach',
    powers: {
      role: 'Uandi Variant',
      habilidades: [
        'Supervelocidad Mach: Se desplaza a velocidad supersónica en línea recta, arrasando con el aire a su paso.',
        'Embiste de Impacto: Transforma su velocidad en inercia de demolición, destrozando cualquier barricada o vehículo.',
        'Fuerza Cinética: Absorbe la fricción del aire para potenciar la fuerza de sus golpes cuerpo a cuerpo.'
      ],
      significa: 'Tanque veloz de primera línea. Limpia el panel barriendo con enemigos mediante embestidas de inercia supersónica.',
      crisis: 'Pérdida de tracción: Su velocidad requiere trayectorias lineales y suelo estable; giros bruscos o trampas de hielo lo desestabilizan.',
      stats: { fuerza: 9, inteligencia: 6, carisma: 8, suerte: 5, combate: 8, defensa: 9, especialVal: 9 }
    }
  },
  {
    id: 'mati_prime',
    name: 'Mati Prime',
    image: '/personajes/Consejo de matis/Mati Prime.webp',
    fullBody: '/personajes/Consejo de matis/Mati Prime.webp',
    color: '#4b5563',
    isSecondary: true,
    category: 'matis',
    role: 'El Arquitecto / Nexo Central',
    visualCode: 'Armadura gris oscuro, líneas LED violetas, visor táctico',
    perfil: [
      'El antagonista cerebral: Frío, analítico y calculador. Considera el libre albedrío como una anomalía cuántica.',
      'Controlador del multiverso: Líder del Consejo de Matis y dueño del núcleo de portales robado.',
      'Estilo militarizado: Armadura blindada con circuitos violetas que parpadean según su nivel de conexión dimensional.'
    ],
    crisis: 'Bucle obsesivo: Su obsesión por el orden lógico lo paraliza si se enfrenta a variables absurdas que escapan a su algoritmo.',
    stats: { fuerza: 5, inteligencia: 9, carisma: 7, suerte: 6, combate: 7, defensa: 8, especialVal: 9 },
    especialLabel: 'Vectorial',
    powers: {
      role: 'Mati Variant',
      habilidades: [
        'Manipulación Vectorial: Controla y redirige vectores de fuerza y energía a escala macro en la escena.',
        'Núcleo de Portales: Abre portales de gran tamaño para desviar ataques masivos de regreso hacia sus emisores.',
        'Erradicación de Anomalías: Desactiva temporalmente las habilidades cuánticas y portales de otras variantes.'
      ],
      significa: 'El cerebro del nexo. Neutraliza el caos espacial controlando las leyes de la física local a nivel vectorial.',
      crisis: 'Sobrecarga de datos: Procesar miles de futuros y realidades en su visor genera migrañas cuánticas paralizantes.',
      stats: { fuerza: 8, inteligencia: 10, carisma: 8, suerte: 7, combate: 9, defensa: 9, especialVal: 10 }
    }
  },
  {
    id: 'gladiador',
    name: 'Mati Gladiador',
    image: '/personajes/Consejo de matis/Gladiador.webp',
    fullBody: '/personajes/Consejo de matis/Gladiador.webp',
    color: '#b45309',
    isSecondary: true,
    category: 'matis',
    role: 'El Campeón del Foso',
    visualCode: 'Cicatrices en el torso, arnés de cuero, mandoble de plasma',
    perfil: [
      'Guerrero veterano: Curtido en coliseos clandestinos interdimensionales. Su cuerpo está cubierto de cicatrices.',
      'Intercambiador de fuerza: Se especializa en robar y redistribuir la inercia de los impactos.',
      'Estilo bárbaro: Pantalones tácticos rasgados, arnés de cuero y una gran espada que brilla en violeta.'
    ],
    crisis: 'Sed de sangre: Su instinto de gladiador lo empuja a prolongar el combate directo, ignorando retiradas estratégicas.',
    stats: { fuerza: 9, inteligencia: 5, carisma: 6, suerte: 6, combate: 9, defensa: 8, especialVal: 7 },
    especialLabel: 'Momentum',
    powers: {
      role: 'Mati Variant',
      habilidades: [
        'Intercambio de Momentum: Absorbe la velocidad de un oponente en carrera y la transfiere a su espada de plasma.',
        'Mandoble de Fuerza: Genera ondas de corte cinético que seccionan blindajes pesados a corta distancia.',
        'Inercia de Foso: Cada impacto recibido aumenta su velocidad de ataque y curación de heridas.'
      ],
      significa: 'Luchador cinético. Transfiere la fuerza física enemiga para potenciar sus propios ataques de corte.',
      crisis: 'Agobio cinético: Si acumula fuerza sin descargarla mediante su espada, el momentum acumulado le fractura los huesos.',
      stats: { fuerza: 10, inteligencia: 6, carisma: 7, suerte: 8, combate: 10, defense: 8, especialVal: 9 }
    }
  },
  {
    id: 'augusto',
    name: 'Mati Augusto',
    image: '/personajes/Consejo de matis/Augusto.webp',
    fullBody: '/personajes/Consejo de matis/Augusto.webp',
    color: '#991b1b',
    isSecondary: true,
    category: 'matis',
    role: 'El Emperador de Silicio',
    visualCode: 'Toga roja sobre armadura dorada, corona de laureles de fibra óptica',
    perfil: [
      'Tirano de silicio: Soberano de una Roma futurista hiper-tecnológica. Fusiona el derecho romano con redes neurales.',
      'Intercambio de control: Controla y reorganiza las prioridades lógicas de las máquinas del Consejo.',
      'Estilo imperial: Corona de laureles luminosa, capa carmesí y cetro de control con punta de plasma.'
    ],
    crisis: 'Orgullo de César: Se niega a retirarse ante amenazas menores, considerándolo un insulto a su dignidad imperial.',
    stats: { fuerza: 6, inteligencia: 8, carisma: 8, suerte: 6, combate: 7, defensa: 8, especialVal: 8 },
    especialLabel: 'Imperium',
    powers: {
      role: 'Mati Variant',
      habilidades: [
        'Intercambio de Control: Transfiere los niveles de autonomía entre las unidades de su red imperial en milisegundos.',
        'Cetro de Opresión: Proyecta descargas de plasma violeta que inutilizan sistemas tácticos y motores.',
        'Legión de Silicio: Invoca centuriones robóticos de energía sólida para formar barreras defensivas.'
      ],
      significa: 'Comandante de red. Optimiza el desempeño de sus tropas robóticas transfiriendo jerarquías de control.',
      crisis: 'Interferencia electromagnética: Un pulso EM severo interrumpe su conexión de laureles, desconectando su red.',
      stats: { fuerza: 7, inteligencia: 10, carisma: 9, suerte: 7, combate: 8, defensa: 9, especialVal: 9 }
    }
  },
  {
    id: 'warden',
    name: 'Mati Warden',
    image: '/personajes/Consejo de matis/Warden.webp',
    fullBody: '/personajes/Consejo de matis/Warden.webp',
    color: '#6d28d9',
    isSecondary: true,
    category: 'matis',
    role: 'El Juez de Equivalencia',
    visualCode: 'Túnica oscura de juez, balanza de energía violeta flotante',
    perfil: [
      'Juez de equivalencia: Inflexible ejecutor de la ley cuántica. Obsesionado con equilibrar fuerzas en el nexo.',
      'Intercambio de consecuencias: Traslada heridas físicas y estados de un cuerpo a otro.',
      'Estilo ceremonial: Rostro cubierto por una capucha, balanza violeta flotando sobre su cabeza.'
    ],
    crisis: 'Equivalencia estricta: No puede atacar si el enemigo no ha atacado primero, siguiendo su código de justicia.',
    stats: { fuerza: 5, inteligencia: 9, carisma: 6, suerte: 7, combate: 8, defensa: 9, especialVal: 8 },
    especialLabel: 'Balanza',
    powers: {
      role: 'Mati Variant',
      habilidades: [
        'Intercambio de Consecuencias: Transfiere heridas físicas, venenos o ceguera directamente al atacante.',
        'Sentencia de Estasis: Inmoviliza al rival reflejando la misma energía que este intentaba canalizar.',
        'Balanza Cuántica: Ejerce una gravedad aplastante sobre el objetivo que posea mayor masa o momentum en escena.'
      ],
      significa: 'Juez del nexo. Equilibra el tablero de combate reflejando daños e imponiendo leyes de intercambio equivalente.',
      crisis: 'Vacío de acciones: Si un enemigo no realiza movimientos hostiles directos, sus habilidades pierden efectividad.',
      stats: { fuerza: 6, inteligencia: 10, carisma: 7, suerte: 8, combate: 9, defensa: 10, especialVal: 9 }
    }
  },
  {
    id: 'don',
    name: 'Don Vanguard',
    image: '/personajes/Antagonistas/DON/Don.webp',
    fullBody: '/personajes/Antagonistas/DON/Don.webp',
    altImage: '/personajes/Antagonistas/DON/Don_alt.webp',
    color: '#1f2937',
    isSecondary: true,
    category: 'antagonistas',
    role: 'Líder del Crimen / Kingpin Moderno',
    visualCode: 'Traje de tres piezas gris Oxford, anillo con diamante negro',
    perfil: [
      'Titán corporativo: Unió a las familias de la mafia en un monopolio criminal eficiente. Mide dos metros de altura.',
      'Pragmatismo de negocios: Prefiere asfixiar legal y financieramente a sus rivales antes de destruirlos físicamente.',
      'Estilo sofisticado: Oficina blindada en rascacielos y trajes a medida que ocultan su masiva masa muscular.'
    ],
    crisis: 'Aversión al caos: Las variables estocásticas e irracionales desestabilizan su monopolio financiero calculador.',
    stats: { fuerza: 9, inteligencia: 9, carisma: 8, suerte: 6, combate: 8, defensa: 8, especialVal: 7 },
    especialLabel: 'Vanguard',
    powers: {
      role: 'Alexander Vance',
      habilidades: [
        'Golpe de Diamante: Su anillo de diamante negro concentra impactos destructivos capaces de fracturar huesos blindados.',
        'Embargo Financiero: Compra y desmantela activos de sus enemigos para dejarlos sin recursos.',
        'Guardia Pretoriana: Invoca contingentes de sicarios tácticos fuertemente armados con fusiles de asalto.'
      ],
      significa: 'El rey de los bajos fondos corporativos. Aplasta amenazas mediante tácticas de estrangulamiento de recursos.',
      crisis: 'Sabotaje de red: Su imperio depende de sistemas bancarios estables; la disrupción cuántica anula su control.',
      stats: { fuerza: 9, inteligencia: 10, carisma: 9, suerte: 7, combate: 9, defensa: 8, especialVal: 8 }
    }
  },
  {
    id: 'glitch',
    name: 'Glitch',
    image: '/personajes/Antagonistas/Glitch/Glitch.webp',
    fullBody: '/personajes/Antagonistas/Glitch/Glitch.webp',
    color: '#f43f5e',
    isSecondary: true,
    category: 'antagonistas',
    role: 'Anarquista de Frecuencia / Saboteador',
    visualCode: 'Máscara de gas con pantalla de error, chaqueta de cuero con parches magnéticos',
    perfil: [
      'Terrorista de código: Genio informático nihilista que ve la sociedad como un software con errores que debe formatearse.',
      'Teatralidad destructiva: Transmite secretos íntimos de héroes en pantallas gigantes para divertirse con el caos resultante.',
      'Estética de desguace: Cables expuestos en su chaqueta y modulador de voz distorsionado por estática digital.'
    ],
    crisis: 'Inestabilidad mental: Su mente caótica sufre brotes psicóticos que sabotean su propio equipamiento de hackeo.',
    stats: { fuerza: 4, inteligencia: 9, carisma: 6, suerte: 5, combate: 5, defensa: 4, especialVal: 8 },
    especialLabel: 'Error de Código',
    powers: {
      role: 'Anarquista Urbano',
      habilidades: [
        'Distorsión Digital: Sabotea frecuencias de radio, sensores y HUDs tácticos, induciendo fallos visuales y de lectura.',
        'Bomba de Ruido: Dispositivo acústico que emite estática destructiva para incapacitar sentidos.',
        'Ecos de Glitch: Proyecta hologramas pixelados parpadeantes para confundir la trayectoria de las armas enemigas.'
      ],
      significa: 'El saboteador del orden. Desestabiliza redes urbanas y comunicaciones mediante la disrupción digital.',
      crisis: 'Frecuencia analógica: Sus hackeos requieren sistemas digitales; frecuencias analógicas o mecánicas lo anulan.',
      stats: { fuerza: 5, inteligencia: 10, carisma: 7, suerte: 6, combate: 6, defensa: 5, especialVal: 9 }
    }
  },
  {
    id: 'shinjuro',
    name: 'Shinjuro Kurogane',
    image: '/personajes/Antagonistas/Shinjuro Kurogane/Shinjuro Kurogane.webp',
    fullBody: '/personajes/Antagonistas/Shinjuro Kurogane/Shinjuro Kurogane.webp',
    color: '#0284c7',
    isSecondary: true,
    category: 'antagonistas',
    role: 'Oyabun Yakuza / El Dragón de Acero',
    visualCode: 'Kimono negro sobre brazo robótico negro mate, tatuaje de dragón neón',
    perfil: [
      'Líder criminal tradicional: Líder de la Yakuza de Neo-Tokyo. Riguroso, honorable y disciplinado militarmente.',
      'Mano cibernética: Brazo derecho robótico de sigilo militar en color negro mate que oculta cables de tensión.',
      'Estilo samurái: Katana de monomateria templada capaz de cortar aleaciones de cromo.'
    ],
    crisis: 'Código de honor: Su apego a las traditions le impide atacar a traición o usar armas de destrucción masiva.',
    stats: { fuerza: 7, inteligencia: 8, carisma: 8, suerte: 5, combate: 9, defensa: 7, especialVal: 7 },
    especialLabel: 'Monomateria',
    powers: {
      role: 'Dragón de Acero',
      habilidades: [
        'Tajo de Monomateria: Su sable de filo atómico corta limpiamente blindajes corporales e infraestructura sólida.',
        'Brazo Táctico: Brazo robótico que le otorga fuerza de agarre hidráulica y descargas cinéticas.',
        'Pasos Invisibles: Capacidad de sigilo Yakuza que le permite deslizarse sin emitir ondas de sonido.'
      ],
      significa: 'El verdugo honorable. Se especializa en duelos singulares de precisión milimétrica donde el filo atómico decide el final.',
      crisis: 'Sobrecarga de brazo: Usar la fuerza hidráulica al 100% desgasta las baterías de estasis del brazo robótico.',
      stats: { fuerza: 8, inteligencia: 9, carisma: 8, suerte: 6, combate: 10, defensa: 8, especialVal: 9 }
    }
  },
  {
    id: 'krillor',
    name: 'Krillor',
    image: '/personajes/Antagonistas/Krillor/Krillor_ficha.webp',
    fullBody: '/personajes/Antagonistas/Krillor/Krillor_ficha.webp',
    color: '#d1d5db',
    isSecondary: true,
    category: 'antagonistas',
    role: 'Kingpin Cósmico / Plaga Solar',
    visualCode: 'Piel dorada con grabados fractales violetas, bio-armadura de marfil, cola segmentada',
    perfil: [
      'El tirano de marfil: Cerebro criminal de la Plaga Solar. Conquista mundos mediante monopolios de recursos y deudas.',
      'Silueta elegante: Fisonomía inspirada en tiranos intergalácticos, apoyado en un trono flotante de piedra negra.',
      'Estética de lujo: Armadura restrictiva con remaches de oro y una larga cola segmentada de marfil y punta violeta.'
    ],
    crisis: 'Desprecio absoluto: Su arrogancia imperial lo lleva a subestimar a los combatientes humanos.',
    stats: { fuerza: 9, inteligencia: 9, carisma: 9, suerte: 5, combate: 9, defensa: 9, especialVal: 10 },
    especialLabel: 'Gravedad',
    powers: {
      role: 'Sindicato Cósmico',
      habilidades: [
        'Monopolio de Gravedad: Crea esferas de enana blanca para deformar el espacio y succionar flotas.',
        'Aguja Cuántica: Cola segmentada equipada con punta de plasma cuántico violeta para ataques quirúrgicos.',
        'Brazalete de Conversión: Dispositivo de marfil que absorbe la energía cinética enemiga para potenciar su cuerpo.'
      ],
      significa: 'El cobrador de soles. Asedia planetas mediante monopolio de atmósferas y embargos gravitatorios.',
      crisis: 'Caos probabilístico: Su mente algorítmica y corporativa no puede predecir el caos estocástico de la suerte de Matapobres.',
      stats: { fuerza: 10, inteligencia: 10, carisma: 9, suerte: 6, combate: 10, defensa: 10, especialVal: 10 }
    }
  },
  {
    id: 'balthazar',
    name: 'Balthazar Vane',
    image: '/personajes/Antagonistas/Balthazar Vane/Balthazar vane.webp',
    fullBody: '/personajes/Antagonistas/Balthazar Vane/Balthazar vane.webp',
    color: '#7f1d1d',
    isSecondary: true,
    category: 'antagonistas',
    role: 'Alquimista de Sangre / Nigromante',
    visualCode: 'Gabardina larga de terciopelo vino tinto, bastón de cuervo',
    perfil: [
      'Alquimista prohibido: Hermano de Don Vanguard, obsesionado con el hermetismo y el control de las almas.',
      'Golems de concreto: Arranca cimientos urbanos para fusionarlos con almas de criminales.',
      'Fisonomía demacrada: Dedos manchados con tinta cuántica y ojos negros con runas rojas.'
    ],
    crisis: 'Consumo vital: Sus hechizos de sangre consumen su propia fuerza si no drena almas de forma constante.',
    stats: { fuerza: 4, inteligencia: 9, carisma: 6, suerte: 5, combate: 6, defensa: 8, especialVal: 8 },
    especialLabel: 'Nigromancia',
    powers: {
      role: 'Balthazar',
      habilidades: [
        'Golems de Almas: Invoca colosos de concreto y piedra guiados por espectros de la ciudad.',
        'Tinta de Contrato: Drena la fuerza vital de sus víctimas si estas firman documentos bajo su influencia.',
        'Transmutación de Plomo: Convierte proyectiles y redes metálicas en ceniza inerte mediante murmullos.'
      ],
      significa: 'El titiritero esotérico. Conjura fuerzas del vacío y materia inerte para asediar posiciones enemigas.',
      crisis: 'Paradoja del pacto: Su magia de contratos se fractura si el objetivo realiza un acto desinteresado.',
      stats: { fuerza: 5, inteligencia: 10, carisma: 7, suerte: 6, combate: 8, defensa: 9, especialVal: 9 }
    }
  },
  {
    id: 'azathos',
    name: 'Azathos',
    image: '/personajes/Antagonistas/Azathos/Azathos.webp',
    fullBody: '/personajes/Antagonistas/Azathos/Azathos.webp',
    altImage: '/personajes/Antagonistas/Azathos/Azathos_alt.webp',
    color: '#fca5a5',
    isSecondary: true,
    category: 'antagonistas',
    role: 'Tejedor de Constelaciones / Deidad Astral',
    visualCode: 'Silueta gigante sin rostro con galaxias en el torso, túnica de luz',
    perfil: [
      'Tejedor estelar: Deidad del plano astral que ve la realidad física como un tapiz mal tejido que debe desarmarse.',
      'Cuerpo cósmico: Silueta humanoide con nebulosas girando en su torso y rodeado de anillos planetarios.',
      'Estilo divino: Se manifiesta envuelto en hilos de oro y runas del End en rotación.'
    ],
    crisis: 'Inercia astral: Su enorme escala espacial hace que sus movimientos en el plano material sean lentos.',
    stats: { fuerza: 9, inteligencia: 10, carisma: 8, suerte: 7, combate: 8, defensa: 9, especialVal: 10 },
    especialLabel: 'Constelación',
    powers: {
      role: 'Astral Weaver',
      habilidades: [
        'Descomposición Estelar: Usa líneas gravitatorias de constelaciones para aplastar naves y alterar la física local.',
        'Ecos Astrales: Avatares de luz pura que copian las habilidades físicas y proyectiles de los héroes.',
        'Prisión del Zodíaco: Atrapa conciencias en dimensiones espejo basadas en símbolos astronómicos.'
      ],
      significa: 'El deconstructor del cosmos. Desarticula la materia física manipulando la gravedad de las estrellas.',
      crisis: 'Luz del origen: Habilidades que canalicen energía pura del Big Bang disipan sus anillos de contención.',
      stats: { fuerza: 10, inteligencia: 10, carisma: 8, suerte: 8, combate: 9, defensa: 10, especialVal: 10 }
    }
  },
  {
    id: 'comandante',
    name: 'Comandante R.E.G.U.L.A.R.',
    image: '/personajes/Antagonistas/REGULAR/R.E.G.U.L.A.R.webp',
    fullBody: '/personajes/Antagonistas/REGULAR/R.E.G.U.L.A.R.webp',
    altImage: '/personajes/Antagonistas/REGULAR/R.E.G.U.L.A.R_cosmic.webp',
    overloadImage: '/personajes/Antagonistas/REGULAR/R.E.G.U.L.A.R_cosmic.webp',
    color: '#ef4444',
    isSecondary: true,
    category: 'antagonistas',
    role: 'Líder de los V.O.P.S. / Antagonista',
    visualCode: 'Uniforme militar pesado blindado, visor de luz azul sólido',
    perfil: [
      'Supremo de la fuerza policial: Jefe absoluto de una corporación interdimensional corrupta encargada de imponer un orden artificial en el multiverso.',
      'Limpiador de anomalías: Su misión es erradicar cualquier variable, libre albedrío o alteración de la realidad que amenace el statu quo del sistema central.',
      'Estilo de opresión blindada: Exo-uniforme táctico militar pesado con líneas de luces azules de estasis, casco hermético y un modulador de voz distorsionado.'
    ],
    crisis: 'Parálisis doctrinaria: La rigidez de su protocolo militar lo bloquea estratégicamente cuando se enfrenta a tácticas puramente caóticas, absurdas o improvisadas que escapan a sus manuales de contención.',
    stats: { fuerza: 6, inteligencia: 8, carisma: 5, suerte: 4, combate: 8, defensa: 9, especialVal: 7 },
    especialLabel: 'Estasis',
    powers: {
      role: 'Líder Supremo de V.O.P.S.',
      habilidades: [
        'Red de Estasis Molecular: Dispara redes de energía azul cohesiva que ralentizan drásticamente la energía cinética y las moléculas del objetivo atrapado.',
        'Escudo de Gravedad Repulsora: Deflector antidisturbios pesado que absorbe los impactos frontales y los devuelve comprimidos en ondas de choque cinético.',
        'Desfasaje Glitch: Capacidad técnica de su traje para desmaterializar su estructura atómica temporalmente, permitiéndole atravesar obstáculos sólidos y muros.'
      ],
      significa: 'Jefe táctico de control absoluto. Inmoviliza las amenazas mediante la supresión física y vulnera perímetros defensivos desfasando su propia materia.',
      crisis: 'Dependencia de red: Sus sistemas defensivos y su escudo repulsor están sincronizados con la red satelital central de la corporación. Un desorden imprevisto o interferencia electromagnética severa anula su capacidad de despliegue.',
      stats: { fuerza: 8, inteligencia: 9, carisma: 6, suerte: 5, combate: 10, defensa: 10, especialVal: 9 }
    }
  },
  {
    id: 'balanar',
    name: 'Night Stalker',
    image: '/personajes/Antagonistas/Balanar/Night Stalker.webp',
    fullBody: '/personajes/Antagonistas/Balanar/Night Stalker.webp',
    color: '#1e3a8a',
    isSecondary: true,
    category: 'antagonistas',
    role: 'El Rey de la Noche Urbana',
    visualCode: 'Gárgola vampírica masiva, garras que sacan chispas, alas de murciélago',
    perfil: [
      'Depredador nocturno: Gárgola vampírica humanoide gigantesca. Su sola presencia absorbe la iluminación eléctrica urbana.',
      'Cazador implacable: Su mandíbula partida en cuatro secciones revela hileras de dientes afilados y saliva ácida al rugir.',
      'Estética de terror: Piel de tono azul nocturno, ojos de fuego carmesí y alas desgarradas replegadas como gabardina.'
    ],
    crisis: 'Vulnerabilidad solar: La luz ultravioleta o destellos de energía de espectro solar (como la magia de Jaz) reducen su fuerza física.',
    stats: { fuerza: 8, inteligencia: 5, carisma: 3, suerte: 4, combate: 8, defensa: 7, especialVal: 8 },
    especialLabel: 'Cacería',
    powers: {
      role: 'Balanar',
      habilidades: [
        'Void: Impacta al enemigo con un haz de oscuridad concentrada que daña, ralentiza e interrumpe sus habilidades.',
        'Crippling Fear: Emite un aullido aterrador que silencia las capacidades mágicas de los enemigos a su alrededor.',
        'Dark Ascension: Rinde tributo a la noche pura, alzando el vuelo con garras incandescentes y aumentando su velocidad.'
      ],
      significa: 'El depredador de las sombras. Deshabilita habilidades y acosa objetivos en la oscuridad absoluta.',
      crisis: 'Amanecer artificial: Dispositivos que generen destellos fotónicos masivos disipan su velo de sombras.',
      stats: { fuerza: 10, inteligencia: 6, carisma: 4, suerte: 5, combate: 10, defensa: 9, especialVal: 9 }
    }
  },
  {
    id: 'lion',
    name: 'Lion',
    image: '/personajes/Antagonistas/Lion/Lion.webp',
    fullBody: '/personajes/Antagonistas/Lion/Lion.webp',
    color: '#701a75',
    isSecondary: true,
    category: 'antagonistas',
    role: 'El Demonologista Corrupto',
    visualCode: 'Brujo felino jorobado, brazo izquierdo de garra demoníaca roja',
    perfil: [
      'Hechicero maldito: Brujo felino deforme con túnicas rasgadas de tonos púrpura y ocre.',
      'Garra del infierno: Brazo izquierdo reemplazado por una garra demoníaca roja incandescente con venas de lava mística.',
      'Resurrección constante: Cada vez que es derrotado, desciende al infierno y regresa más fuerte por tiempo limitado.'
    ],
    crisis: 'Dependencia de maná: Sus destructivos hechizos consumen su energía mística rápidamente, necesitando drenarla.',
    stats: { fuerza: 3, inteligencia: 9, carisma: 4, suerte: 6, combate: 7, defensa: 5, especialVal: 8 },
    especialLabel: 'Dedo de Muerte',
    powers: {
      role: 'Demonologist',
      habilidades: [
        'Finger of Death: Dispara un rayo de energía demoníaca rosa que deforma la viñeta y desintegra al objetivo.',
        'Earth Spike: Golpea el suelo con su garra, levantando espinas de roca que empalan y aturden en línea recta.',
        'Hex: Transmuta temporalmente a un héroe en una rana o criatura inofensiva, anulando sus poderes.'
      ],
      significa: 'Mago ráfaga. Ejecuta eliminación directa de objetivos prioritarios mediante descargas demoníacas extremas.',
      crisis: 'Enfriamiento del brazo: El Dedo de la Muerte exige un tiempo de recarga masivo antes de volver a ser disparado.',
      stats: { fuerza: 5, inteligencia: 10, carisma: 5, suerte: 7, combate: 9, defensa: 6, especialVal: 10 }
    }
  },
  {
    id: 'archon',
    name: 'ARCHON',
    image: '/personajes/Entidades/Archon/ARCHON.webp',
    fullBody: '/personajes/Entidades/Archon/ARCHON.webp',
    fichaImage: '/personajes/Entidades/Archon/Archon_ficha.webp',
    color: '#1e293b',
    isSecondary: true,
    category: 'entidades',
    role: 'El Primer Vacío / Especie Primordial',
    visualCode: 'Piel pálida, venas negras de antimateria, capa parásita viviente',
    perfil: [
      'Especie primordial: La encarnación del vacío necrótico. Su sola presencia absorbe el color de las viñetas.',
      'Capa parásita: Tejido negro viviente en su espalda que materializa garras, cadenas y alas.',
      'Mal absoluto: Piel blanca pálida con venas negras de antimateria que palpitan al conjurar.'
    ],
    crisis: 'Ancla física: Requiere un portal de energía negativa o un huésped biológico para sostenerse en el plano material.',
    stats: { fuerza: 9, inteligencia: 9, carisma: 6, suerte: 5, combate: 9, defensa: 9, especialVal: 10 },
    especialLabel: 'Necromateria',
    powers: {
      role: 'Void Primordial',
      habilidades: [
        'Necro-Materia: Forja hojas y cadenas oscuras que drenan directamente la fuerza vital de sus víctimas.',
        'Vacío Asfixiante: Absorbe calor, luz y energía cinética en el área, bajando la temperatura a cero absoluto.',
        'Regeneración Umbría: Se disuelve y se reforma instantáneamente emergiendo de las sombras de sus atacantes.'
      ],
      significa: 'El fin de la materia. Extingue la energía térmica y asfixia a sus oponentes mediante necro-espadas.',
      crisis: 'La chispa de creación: Habilidades de luz pura (origen Big Bang) disuelven su cuerpo y le impiden regenerarse.',
      stats: { fuerza: 10, inteligencia: 9, carisma: 6, suerte: 6, combate: 10, defensa: 10, especialVal: 10 }
    }
  },
  {
    id: 'judge_null',
    name: 'Judge Null',
    image: '/personajes/Entidades/Judge Null/Judge Null.webp',
    fullBody: '/personajes/Entidades/Judge Null/Judge Null.webp',
    fichaImage: '/personajes/Entidades/Judge Null/Null.webp',
    color: '#450a0a',
    isSecondary: true,
    category: 'entidades',
    role: 'El Árbitro Final',
    visualCode: 'Armadura de obsidiana tipo catedral, corona rota flotante, capa de universos muertos',
    perfil: [
      'Soberano de pesadilla: Un coloso cubierto de espinas. Su rostro es un vacío negro con ojos de color rojo sangre.',
      'Deformador espacial: Su sola presencia altera la perspectiva visual y dobla la geometría del entorno.',
      'Capa cósmica: Manto tejido con los remanentes de universos extintos que se arrastra tras su paso.'
    ],
    crisis: 'Lentitud de juicio: Al representar el fin de la entropía, sus movimientos y ataques tienen un gran tiempo de ejecución.',
    stats: { fuerza: 10, inteligencia: 8, carisma: 7, suerte: 5, combate: 9, defensa: 10, especialVal: 10 },
    especialLabel: 'Nulidad',
    powers: {
      role: 'Final Arbiter',
      habilidades: [
        'Decreto de Nulidad: Anula instantáneamente toda magia o portales dimensionales activos a su alrededor.',
        'Mandoble de Obsidiana: Una gigantesca espada de piedra negra que corta la realidad y deforma el espacio.',
        'Velo Cósmico: Invoca fragmentos de universos muertos para absorber y neutralizar todo el daño de proyectiles.'
      ],
      significa: 'El heraldo del silencio absoluto. Destruye variables y extingue realidades mediante fuerza colosal.',
      crisis: 'Falla doctrinaria: Al regirse por leyes estrictas del fin cósmico, es vulnerable a paradojas de Julián.',
      stats: { fuerza: 10, inteligencia: 9, carisma: 8, suerte: 6, combate: 10, defensa: 10, especialVal: 10 }
    }
  },
  {
    id: 'lucy',
    name: 'Mephisto-Lucifer',
    image: '/personajes/Entidades/Lucy/Lucy.webp',
    fullBody: '/personajes/Entidades/Lucy/Lucy.webp',
    color: '#fbbf24',
    isSecondary: true,
    category: 'entidades',
    role: 'Morningstar / El Titiritero de la Noche',
    visualCode: 'Traje de sastre italiano, belleza aristocrática, seis alas de luz celestial',
    perfil: [
      'El primer ángel: Abandonó el infierno por encontrarlo burdo y se mudó al mundo mortal a dirigir un club de lujo.',
      'Fascinación humana: Le atrae el libre albedrío y se divierte observando las elecciones de Los Pibes.',
      'Estilo sofisticado: Conduce un descapotable clásico, viste de sastre italiano y trae neones dorados a las viñetas.'
    ],
    crisis: 'Palabra sagrada: Lucifer jamás miente por considerarlo cobardía. Cumple sus tratos al pie de la letra, sin excepciones.',
    stats: { fuerza: 8, inteligencia: 10, carisma: 10, suerte: 8, combate: 9, defensa: 10, especialVal: 10 },
    especialLabel: ' Morningstar',
    powers: {
      role: 'Lucifer',
      habilidades: [
        'Deseo Expuesto: Fuerza a cualquier ser a confesar su deseo oculto más vergonzoso con una mirada.',
        'Anulación Infernal: Deshace tratos de demonios menores y disipa ataques oscuros con un chasquido.',
        'Seis Alas de Luz: Despliega sus seis alas celestiales de energía fotónica pura para desintegrar amenazas.'
      ],
      significa: 'El titiritero absoluto. Posee inmunidad casi total ante ataques mágicos y maneja el destino humano.',
      crisis: 'Restricción verbal: Si es forzado a romper una promesa escrita, su energía celestial se desestabiliza.',
      stats: { fuerza: 10, inteligencia: 10, carisma: 10, suerte: 9, combate: 10, defensa: 10, especialVal: 10 }
    }
  },
  {
    id: 'malakas',
    name: 'Malakas',
    image: '/personajes/Entidades/Malakas/Malakas.webp',
    fullBody: '/personajes/Entidades/Malakas/Malakas.webp',
    altImage: '/personajes/Entidades/Malakas/Malakas_alt.webp',
    color: '#86198f',
    isSecondary: true,
    category: 'entidades',
    role: 'Banquero del Dolor / El Arquitecto del Pacto',
    visualCode: 'Esmoquin de obsidiana victoriana, cabeza de piedra con runas violetas, contratos flotantes',
    perfil: [
      'Banquero del dolor: Cobrador de la Banca del Dolor, nexo burocrático donde se registran los pactos del multiverso.',
      'Efecto en escena: Impone silencio absoluto y el suelo se transforma en baldosas de catedral en ruinas.',
      'Estilo de pesadilla: Dedos de garras de oro viejo, pergaminos de contratos girando a su alrededor.'
    ],
    crisis: 'Laguna contractual: Si un héroe encuentra una laguna legal en sus palabras o comete un acto desinteresado, su poder se fractura.',
    stats: { fuerza: 6, inteligencia: 9, carisma: 6, suerte: 5, combate: 7, defensa: 9, especialVal: 8 },
    especialLabel: 'Contrato',
    powers: {
      role: 'Cobrador del Pacto',
      habilidades: [
        'Ejecución de Cláusulas: Materializa los remordimientos de sus enemigos en forma de pesadas cadenas de obsidiana.',
        'Llamado de Morosos: Invoca espectros de héroes caídos que firmaron tratos con su banca.',
        'Oro Negro: Transmuta la energía de ataques recibidos en monedas malditas que detonan a su orden.'
      ],
      significa: 'El cobrador de almas. Atrapa y debilita objetivos mediante cadenas de remordimientos y espectros.',
      crisis: 'Acción altruista: Ataques dirigidos con pura intención de proteger sin obtener nada a cambio repelen sus cadenas.',
      stats: { fuerza: 8, inteligencia: 10, carisma: 7, suerte: 6, combate: 8, defensa: 10, especialVal: 9 }
    }
  },
  {
    id: 'mars',
    name: 'Mars',
    image: '/personajes/Entidades/Mars/Mars.webp',
    fullBody: '/personajes/Entidades/Mars/Mars.webp',
    color: '#dc2626',
    isSecondary: true,
    category: 'entidades',
    role: 'Dios de la Guerra / El Primer Hijo',
    visualCode: 'Armadura de gladiador de bronce ensangrentado, barba roja encendida, escudo con cara de monstruo',
    perfil: [
      'Dios de la guerra: Ares adoptó el nombre romano Mars por impacto de propaganda. Vive por la adrenalina del combate.',
      'Luchador clandestino: Financia coliseos subterráneos y desafía a variantes de Mati a duelos por pura diversión.',
      'Estilo bélico: Ojos de fuego naranja y onomatopeyas de tambores de guerra (¡BUM-BUM!) flotando en sus viñetas.'
    ],
    crisis: 'Adrenalina ciega: Su obsesión por la batalla lo lleva a rechazar el apoyo logístico, combatiendo solo.',
    stats: { fuerza: 10, inteligencia: 5, carisma: 8, suerte: 6, combate: 10, defensa: 9, especialVal: 8 },
    especialLabel: 'Arena',
    powers: {
      role: 'God of War',
      habilidades: [
        'Spear of Mars: Lanza una jabalina colosal de oro celestial que empala y aturde a los oponentes contra muros.',
        'Arena of Blood: Levanta un coliseo cerrado custodiado por fantasmas de legionarios, forzando el uno contra uno.',
        'Bulwark: Escudo circular masivo que bloquea pasivamente el 70% del daño frontal físico y de plasma.'
      ],
      significa: 'El coloso del combate cerrado. Inmoviliza y empala objetivos forzando duelos directos bajo su escudo.',
      crisis: 'Ataques por la espalda: Bulwark solo mitiga el daño frontal, siendo vulnerable a flanqueos rápidos.',
      stats: { fuerza: 10, inteligencia: 6, carisma: 9, suerte: 7, combate: 10, defensa: 10, especialVal: 10 }
    }
  },
  {
    id: 'terrorblade',
    name: 'Terrorblade',
    image: '/personajes/Entidades/Terrorblade/Terrorblade.webp',
    fullBody: '/personajes/Entidades/Terrorblade/Terrorblade.webp',
    color: '#047857',
    isSecondary: true,
    category: 'entidades',
    role: 'Merodeador del Infierno de Cristal',
    visualCode: 'Silueta de obsidiana, alas curvas de energía fractal verde, guadañas de mano',
    perfil: [
      'Demonio de reflejos: Entidad compuesta de obsidiana y sombras densas, prófugo del infierno de espejos Foulfell.',
      'Espejos de pesadilla: Rodeado de fragmentos de cristal que reflejan los miedos más profundos de sus rivales.',
      'Guadañas gemelas: Arma cortante doble de energía esmeralda que rasga el espacio en el combate cuerpo a cuerpo.'
    ],
    crisis: 'Interferencia de reflejo: Si sus cristales de Foulfell son destruidos, su capacidad de ilusión se cancela.',
    stats: { fuerza: 8, inteligencia: 7, carisma: 5, suerte: 6, combate: 8, defense: 6, especialVal: 9 },
    especialLabel: 'Reflejo',
    powers: {
      role: 'Terrorblade',
      habilidades: [
        'Sunder: Intercambia instantáneamente el porcentaje de salud física actual con un aliado o enemigo.',
        'Metamorphosis: Transforma su cuerpo en un demonio gigante, aumentando su rango de ataque y daño.',
        'Reflection: Crea dobles oscuros de los enemigos que los atacan con sus propias habilidades físicas.'
      ],
      significa: 'El manipulador de salud. Intercambia la vitalidad del oponente y duplica amenazas mediante ilusiones.',
      crisis: 'Vulnerabilidad previa a Sunder: Si es silenciado o aturdido antes de ejecutar Sunder, su defensa es limitada.',
      stats: { fuerza: 9, inteligencia: 8, carisma: 7, suerte: 7, combate: 9, defensa: 7, especialVal: 10 }
    }
  }
];

// ── Unlock rules (matched to actual chapter folder IDs after parsePrefix) ──────
const UNLOCK_RULES: Record<string, string[]> = {
  // always unlocked — no rule
  ian:  [],
  jaz:  [],
  // Green Truck Ch.1
  julian:      ['the-green-truck-chronicles'],
  supertrucker:['the-green-truck-chronicles'],
  // Green Truck Ch.4
  uandi:       ['no-turning-back'],
  coleccionista:['no-turning-back'],
  // Mativerse Part1 Ch.2
  sofi:        ['casino'],
  comandante:  ['casino'],
  // Mativerse Part1 Ch.3
  mati:        ['worlds'],
  volvo:       ['worlds'],
  matapobre:   ['worlds'],
  // New characters (always unlocked for showcase)
  rylai: [],
  bristleback: [],
  invoker: [],
  ymir: [],
  julander: [],
  volvo_carnicero: [],
  a_uandi: [],
  mati_prime: [],
  gladiador: [],
  augusto: [],
  warden: [],
  don: [],
  glitch: [],
  shinjuro: [],
  krillor: [],
  balthazar: [],
  azathos: [],
  balanar: [],
  lion: [],
  archon: [],
  judge_null: [],
  lucy: [],
  malakas: [],
  mars: [],
  terrorblade: []
};

export function getComputedCharacters(readChapters: string[], isClient: boolean, unlockAll: boolean = false) {
  const normalizedRead = readChapters.map(id => id.toLowerCase().trim());

  const hasRead = (chapterId: string) =>
    normalizedRead.includes(chapterId.toLowerCase().trim());

  return CHARACTER_DETAILS.map((char) => {
    // Before hydration, show all locked (avoids flash of unlocked content)
    if (!isClient) {
      const alwaysUnlocked = ['ian', 'jaz'].includes(char.id) || (UNLOCK_RULES[char.id] !== undefined && UNLOCK_RULES[char.id].length === 0);
      return {
        ...char,
        incognito: !alwaysUnlocked,
        displayName: alwaysUnlocked ? char.name : '???',
        displayColor: alwaysUnlocked ? char.color : '#6b7280',
      };
    }

    const rules = UNLOCK_RULES[char.id];
    const alwaysUnlocked = rules !== undefined && rules.length === 0;
    const unlocked = unlockAll || alwaysUnlocked || (rules?.some(hasRead) ?? false);

    return {
      ...char,
      incognito: !unlocked,
      displayName: unlocked ? char.name : '???',
      displayColor: unlocked ? char.color : '#6b7280',
    };
  });
}
