import { CharacterDetail } from "./types";

export const pibes: CharacterDetail[] = [
  {
    id: 'ian',
    name: 'Ian',
    category: 'pibes',
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
      'Lealtad incondicional hacia su equipo, respaldada por una disciplina táctica impecable y un consumo crónico de café filtrado para mantener el enfoque.'
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
        'Movilidad Asistida: Uso fluido de pistola de ganchos neumática y capa de planeo aerodinámica para ganar altura y dominar la perspectiva táctica.'
      ],
      significa: 'El pilar estratégico del equipo. Su genialidad radica en coordinar el escenario mediante hardware de vanguardia y una lectura milimétrica del campo de batalla.',
      crisis: 'Saturación por fricción: Cuando las variables del entorno desafían la lógica planificada, su bucle analítico se ve forzado a optimizar sobre la marcha, consumiendo recursos mentales críticos.',
      stats: { fuerza: 7, inteligencia: 10, carisma: 8, suerte: 8, combate: 8, defensa: 7, especialVal: 10 },
      suitImages: {
        default: '/personajes/FULLBODY SUIT/VESPERWING/vesperwing.webp',
        alt: '/personajes/FULLBODY SUIT/VESPERWING/vesperwing_alt.webp',
        ficha: '/personajes/FULLBODY SUIT/VESPERWING/Vesperwing_Ficha.webp',
        ficha2: '/personajes/FULLBODY SUIT/VESPERWING/Vesperwing_ficha2.webp'
      },
      variantData: {
        alt: {
          label: 'Modo Infiltración',
          habilidades: [
            'Supresión Electromagnética Avanzada: Modulación activa del traje que anula firmas térmicas y lecturas de radar, garantizando invisibilidad ante sensores.',
            'Acrobacia y Anclaje Dinámico: Ganchos reforzados con cable de tensión para desplazamientos tridimensionales rápidos, silenciosos y de alta agilidad entre cornisas y estructuras urbanas.',
            'GhostLens Pasivo: Escaneo táctico de alta frecuencia que recopila datos masivos del entorno en absoluto silencio, sin emitir señales detectables.',
            'Capa de Absorción Lumínica y Silueta: Capa corta con tejido refractario que rompe su contorno visual, permitiéndole desvanecerse en las sombras y acechar desde las alturas de forma indetectable.'
          ],
          significa: 'Especialista en reconocimiento y emboscadas tácticas. Con el rostro descubierto y una capa corta que prioriza la agilidad física, Ian explota el sigilo coreográfico y el dominio de las alturas para desmantelar amenazas desde las sombras de manera independiente.',
          crisis: 'Aislamiento operativo: Al confiar ciegamente en su capacidad de anticipación y en su letalidad oculta, prescinde del blindaje pesado. Si la aleatoriedad del combate directo rompe su sigilo, queda expuesto a tomar decisiones drásticas para recuperar el control.'
        },
        full: {
          label: 'Vesper Frame (Nexo Tecnomágico)',
          habilidades: [
            'Vuelo y Propulsión Arcana: La ingeniería del exotraje asimila las leyes místicas transferidas por Jaz, permitiéndole una navegación aérea libre de fricción física y a velocidades límite.',
            'Matriz de Geometría Sagrada: Sus drones proyectan redes cinéticas y barreras de contención que intersectan y manipulan variables mágicas y físicas en simultáneo.',
            'HUD de Causalidad Absoluta: El casco cerrado unifica la analítica de datos con los hilos de la probabilidad mística, anticipando eventos antes de que se originen en la realidad.',
            'Amplificación Vectorial Taumatúrgica: Blindaje modular autorregenerativo y guanteletes capaces de proyectar descargas de energía cinética catalizada a gran escala.'
          ],
          significa: 'La ecuación resuelta. Al integrar el conocimiento de Jaz, Ian elimina el factor azar de su mapa. Deja de asesorar al equipo para pasar a rediseñar de manera unilateral las reglas del tablero.',
          crisis: 'Absolutismo estratégico: El control total diluye su empatía en favor de una lógica puramente utilitaria. Convencido de que las decisiones individuales solo generan caos, asume el control del resultado de forma fría e implacable, interviniendo el destino de los demás "por el bien común".'
        }
      }
    }
  },
  {
    id: 'jaz',
    name: 'Jaz',
    category: 'pibes',
    image: '/personajes/FULLBODY SUIT/ORACLE/Oracle.webp',
    fullBody: '/personajes/FULLBODY/JAZ.webp',
    overloadImage: '/personajes/FULLBODY SUIT/ORACLE/Oracle.webp',
    color: '#f5e642',
    role: 'Soporte defensivo / control de campo / enlace dimensional',
    visualCode: 'Polera negra, pelo sunset-gold, lentes de gato',
    perfil: [
      'Percepción mística innata: Posee la capacidad de leer capas no físicas, flujos de energía astral y las frecuencias ocultas que componen la reality.',
      'Intuición espiritual profunda: Se guía por una fuerte conexión esotérica y una dependencia ritual (piedras energéticas, salvia) para limpiar el ruido de su entorno.',
      'Estilo distintivo: Polera negra de cuello alto, calzas y una cabellera degradada en tonos sunset-gold que refleja la energía calurosa de su aura.'
    ],
    crisis: 'Disociación del entorno: Ante picos intensos de tensión o dolor ajeno, su mente tiende a desconectarse de la realidad física, entrando en trances meditativos involuntarios para proteger su psique.',
    stats: { fuerza: 1, inteligencia: 6, carisma: 5, suerte: 6, combate: 2, defensa: 2, especialVal: 2 },
    especialLabel: 'Aura-Anclaje',
    powers: {
      role: 'Oracle / Enlace Dimensional',
      habilidades: [
        'Geometría de Anclaje: Manifiesta estructuras cristalinas de energía psíquica pura en el plano físico, utilizándolas como escudos, plataformas flotantes o jaulas de contención.',
        'Resonancia Emocional: Lee las frecuencias vibracionales de los estados de ánimo circundantes, permitiéndole calmar el pánico o disipar la hostilidad sin necesidad de invadir pensamientos.',
        'Vínculo Astral Cohesivo: Entrelaza las conciencias de su equipo en una red mental unificada, compartiendo intenciones, alertas y coordenadas en tiempo real.',
        'Ascensión Etea: Capacidad de vuelo natural y fluido mediante la alteración de su propia gravedad astral, desplazándose con una ligereza supersónica casi sin esfuerzo.'
      ],
      significa: 'El núcleo espiritual y protector del equipo. Su presencia cohesiona las mentes de sus aliados y erige las defensas esenciales; sin ella, el grupo opera a ciegas, fracturado y expuesto.',
      crisis: 'Fluctuación del Velo: Bajo estrés extremo, su aura pierde estabilidad, provocando micro-grietas dimensionales involuntarias a su alrededor que alteran el espacio y representan un riesgo impredecible.',
      stats: { fuerza: 5, inteligencia: 9, carisma: 9, suerte: 10, combate: 7, defensa: 10, especialVal: 10 },
      suitImages: {
        default: '/personajes/FULLBODY SUIT/ORACLE/Oracle.webp',
        ficha: '/personajes/FULLBODY SUIT/ORACLE/Oracle_Ficha.webp',
        fichaAlt: '/personajes/FULLBODY SUIT/ORACLE/Oracle_ficha_alt.webp'
      },
      variantData: {
        full: {
          label: 'Modo Ruptura (Trascendencia Absoluta)',
          habilidades: [
            'Mirada Entre Velos: Desgarra su percepción temporal, visualizando ecos de realidades alternativas e hilos de causalidad futura de forma fragmentaria pero precisa.',
            'Arquitectura Taumatúrgica: Sus estructuras psíquicas escalan a niveles monumentales, transmutando el terreno en fortalezas geométricas capaces de resistir asedios físicos y mágicos.',
            'Proyección Astral Extendida: Desprende su conciencia del plano material, permitiéndole vigilar el mapa de forma omnisciente o percibir el entorno a través de los sentidos de sus aliados.',
            'Apertura del Nexo Sagrado: Canaliza de forma deliberada el conocimiento y las leyes arcanas de otras dimensiones, el mismo saber absoluto que es capaz de transferir y codificar en sistemas lógicos.'
          ],
          significa: 'Jaz convertida en canal supremo. Al alcanzar el límite de su don, desvanece las fronteras de la realidad para manifestar un poder puro y ancestral que excede las capacidades de un cuerpo humano.',
          crisis: 'Despersonalización cósmica: Al abrir por completo el velo de la causalidad, la inmensidad del infinito amenaza con devorar su identidad. El peligro real no es solo abrir una grieta física infranqueable, sino que su mente se desconecte de forma definitiva de los lazos humanos, olvidando quién es y por qué luchaba.'
        }
      }
    }
  },
  {
    id: 'julian',
    name: 'Julián',
    category: 'pibes',
    image: '/personajes/FULLBODY SUIT/WILDCARD/Wildcard.webp',
    fullBody: '/personajes/FULLBODY/JULIAN.webp',
    altImage: '/personajes/ALT/JULIAN_ALT.webp',
    overloadImage: '/personajes/FULLBODY SUIT/WILDCARD/Wildcard.webp',
    color: '#0a1128',
    role: 'Infiltración y engaño',
    visualCode: 'Suéter azul marino, barba, pelo corto con fade',
    perfil: [
      'Mentiroso compulsivo funcional: Utiliza la falsedad y la distorsión de la reality como un escudo táctico y psicológico infranqueable.',
      'Fachada sarcástica: Oculta una altísima ansiedad interna y un cerebro hiperactivo bajo una capa de cinismo, carisma magnético y humor negro.',
      'Estilo urbano sobrio: Suéter azul marino de cuello redondo, pantalón negro y barba corta prolija; una apariencia ordinaria para un hombre de mil rostros.'
    ],
    crisis: 'Ocultamiento patológico: Ante crisis extremas o amenazas inminentes de muerte, su instinto es sepultar la información crítica bajo capas de engaño, prefiriendo el riesgo fatal antes que mostrarse vulnerable.',
    stats: { fuerza: 3, inteligencia: 4, carisma: 6, suerte: 4, combate: 2, defensa: 2, especialVal: 0 },
    especialLabel: 'Duplicidad',
    hint: 'Terminá el Capítulo 1 de Green Truck para desbloquear.',
    powers: {
      role: 'Wildcard / Infiltración',
      habilidades: [
        'Ecos de Presencia: Manifiesta hasta tres duplicados semisólidos de sí mismo. Estas copias pueden correr, hablar e interactuar de forma limitada con el entorno para desviar la atención.',
        'Punto Ciego Cognitivo: Altera sutilmente la percepción del objetivo, hackeando su cerebro para que deje de registrar su presencia física directa (es una ilusión cognitiva, no invisibilidad real).',
        'Detonación por Verdad: Sus clones están compuestos de engaño puro; si alguna de las copias enuncia una verdad absoluta e innegable, la paradoja lógica hace que colapse y detone violentamente de forma táctica.',
        'Anclaje Superficial: No posee capacidades de vuelo, pero puede adherirse y escalar cualquier superficie vertical u horizontal con agilidad fluida.'
      ],
      significa: 'El maestro de la distracción. Opera en los márgenes de la percepción ajena: infiltra líneas enemigas, fragmenta la atención del oponente y transforma sus propias ficciones en trampas letales.',
      crisis: 'Paradoja de la honestidad: El costo de usar la verdad como arma es altísimo. Si un clon detona involuntariamente por una declaración real, el impacto residual sacude la estabilidad mental de Julián.',
      stats: { fuerza: 7, inteligencia: 8, carisma: 9, suerte: 9, combate: 9, defensa: 7, especialVal: 9 },
      suitImages: {
        default: '/personajes/FULLBODY SUIT/WILDCARD/Wildcard.webp',
        ficha: '/personajes/FULLBODY SUIT/WILDCARD/Wildcard_Ficha.webp'
      },
      variantData: {
        action: {
          label: 'Modo Evasión Coreográfica',
          habilidades: [
            'Despliegue Ilusorio Dinámico: Genera una secuencia fluida de clones explosivos en combate cerrado, utilizándolos como escudos humanos y trampas cinéticas en movimiento.',
            'Asalto de Puntos Ciegos: Ataca de manera intermitente entrando y saliendo del radar cognitivo del enemigo, encadenando golpes quirúrgicos desde ángulos imposibles.',
            'Sincronía Fantasma: Coordina ofensivas simuladas junto a sus duplicados, forzando al oponente a defenderse de amenazas fantasmas mientras el Julián real asesta el impacto definitivo.'
          ],
          significa: 'El engaño en movimiento. Julián instrumentaliza la mentira en una coreografía física letal, donde el caos y la desorientación del rival son sus mejores herramientas de combate.',
          crisis: 'Falla del engaño: Depende por completo de que el enemigo muerda el anzuelo. Si un oponente con alta percepción rompe la ilusión, Julián queda atrapado en una posición vulnerable y en fuego cruzado real.'
        },
        alt: {
          label: 'Verdad Innegable (Forma Límite)',
          habilidades: [
            'Decreto de Realidad: Sus palabras adquieren un peso psicológico y metafísico anormal. Al hablar con honestidad brutal, es capaz de romper ilusiones ajenas y obligar a cualquier mente a escuchar.',
            'Saturación Paradojal: Carga a sus duplicados al límite absoluto de energía; un solo hecho real enunciado por Julián hace que todos los clones detonen en una reacción en cadena devastadora.',
            'Ruptura de Manipulaciones: Disipa instantáneamente los poderes de control mental, hipnosis o alteración de la realidad de los enemigos mediante una sola declaración honesta y factual.',
            'Interferencia de Naipes: Proyecta cartas ilusorias cargadas de energía cinética residual para cortar flujos tácticos y defenderse a corta distancia.'
          ],
          significa: 'El mentiroso que decidió ser honesto. Al despojarse del escudo de la falsedad por una única y desesperada ocasión, Julián transmuta su debilidad en el ataque más honesto y peligroso de su arsenal.',
          crisis: 'Exposición Absoluta: Al renunciar al engaño, Julián pierde toda su capacidad de infiltración y predictibilidad. Sin misterios ni fachadas tras las cuales esconderse, sus intenciones reales quedan completamente al desnudo, volviéndolo un blanco directo y fácil de leer para el enemigo.'
        }
      }
    }
  },
  {
    id: 'mati',
    name: 'Mati',
    category: 'pibes',
    image: '/personajes/FULLBODY SUIT/SWAPFIRE/Swapfire.webp',
    fullBody: '/personajes/FULLBODY/MATI.webp',
    overloadImage: '/personajes/FULLBODY SUIT/SWAPFIRE/Swapfire.webp',
    color: '#4c1d95',
    role: 'Controlador táctico / reposicionamiento y ofensiva de fricción',
    visualCode: 'Piel bronceada, campera táctica, hoyuelos',
    perfil: [
      'Pragmatismo calculador: Toma decisiones frías, lógicas y drásticas en milisegundos, aunando cualquier interferencia emocional para garantizar la eficiencia.',
      'Combatiente adaptativo: Un estratega de campo feroz y directo que protege los intereses de los suyos con un enfoque estrictamente utilitario.',
      'Dilución de su humanidad: Su sistema nervioso transmuta a impulsos sobre hilos de plasma púrpura y a nivel atómico experimenta frame drops, transitando de carne a un vector de datos.'
    ],
    crisis: 'Resolución implacable: Ante escenarios desesperados, su lógica fría puede volverse extrema, priorizando el éxito de la misión u objetivo macro por encima de la seguridad individual de los involucrados.',
    stats: { fuerza: 4, inteligencia: 6, carisma: 4, suerte: 3, combate: 4, defensa: 3, especialVal: 0 },
    especialLabel: 'Intercambio',
    hint: 'Terminá el Capítulo 3 (Worlds) de Mativerse Part 1.',
    powers: {
      role: 'Swapfire / Nexo Cósmico',
      habilidades: [
        'Sistema de Anclajes: Etiqueta objetivos geométricamente usando el Punto A (Mati o su línea de visión/Remanente) y el Punto B (Anclajes IP Espaciales en sus armas/drones) para transponerlos.',
        'Friction Overload (Swapfire): La compresión del aire en el intercambio genera un crack sónico y calor molecular extremo, infligiendo ondas de choque térmicas directas a quemarropa.',
        'Memoria de Matriz: Almacena firmas geométricas de coordenadas para retornos seguros o escapes interdimensionales a larga distancia con costo de masa equivalente.',
        'Burbuja de Espacio Local: Mantiene de forma inconsciente una porción de atmósfera terrestre pegada a su piel, permitiéndole sobrevivir a la presión y al frío absoluto en el vacío.'
      ],
      significa: 'El dueño del espacio. Su filosofía dicta que la victoria no pertenece al más fuerte, sino a quien tiene la potestad absoluta de decidir dónde pisa cada jugador.',
      crisis: 'Memory Leak y Desgaste: Si es desarmado de sus anclajes tácticos entra en estado crítico. Además, calcular intercambios a escalas cósmicas sobrecarga su cerebro y desgasta su soporte físico.',
      stats: { fuerza: 9, inteligencia: 10, carisma: 8, suerte: 7, combate: 10, defensa: 9, especialVal: 10 },
      suitImages: {
        default: '/personajes/FULLBODY SUIT/SWAPFIRE/Swapfire.webp',
        ficha: '/personajes/FULLBODY SUIT/SWAPFIRE/Swapfire_ficha.webp'
      },
      variantData: {
        action: {
          label: 'Modo Acción (Sleight of Swap)',
          habilidades: [
            'Sleight of Swap: Arroja tres dagas en abanico y activa un intercambio consecutivo a velocidad subatómica para ejecutar tres cortes físicos y térmicos instantáneos en la escena.',
            'Transposición en Movimiento: Intercambia posiciones de aliados y amenazas en medio de ráfagas de fuego cruzado, manteniendo su propio vector de avance sin desacelerar.',
            'Emboscada por Reubicación: Fuerza al enemigo a ocupar la trayectoria de sus propios proyectiles o a quedar suspendido en el aire en puntos de caída libre.'
          ],
          significa: 'La manipulación espacial llevada al combate cerrado. Mati asimila el caos de la batalla en tiempo real, convirtiendo la velocidad del enemigo en su propia condena geométrica.',
          crisis: 'Margen de error balístico: Operar a altas velocidades reduce el tiempo de cálculo. Un desvío milimétrico en el intercambio corre el riesgo de posicionar a un aliado en una trayectoria de peligro antes de poder enmendarlo.'
        },
        full: {
          label: 'Swapfire (Modo Completo - Lazo Cinético)',
          habilidades: [
            'Lazo Cinético (Intercambio en Cadena): Conecta la inercia y energía cinética de cargas pesadas a través de hilos de plasma y la transfiere directamente a otros cuerpos por efecto dominó.',
            'Router y Navegación Cósmica: Su exotraje completo y visor HUD le permiten calcular coordenadas a años luz, teletransportando naves enteras a través de galaxias.',
            'Arsenal de Red Avanzado: Emplea balas de aleación cuántica para Swaps balísticos inmediatos y drones "Ping-Pong" como nodos móviles tridimensionales que proyectan líneas de intercambio HUD.',
            'Supremacía Cuerpo a Cuerpo: Al disolver las restricciones de rango, manipula los vectores de impacto enemigos en la corta distancia y utiliza dagas de plasma de gran tamaño.'
          ],
          significa: 'El control absoluto del tablero. En su estado definitivo, Mati ya no solo altera dónde están los cuerpos, sino cómo se mueven. Entra a la vanguardia para redistribuir la física del combate a su antojo.',
          crisis: 'Saturación Cinética: Absorber e intercambiar flujos masivos de energía y momentum sobrecarga los sistemas adaptativos del traje. Si el volumen de fuerza externa supera su capacidad de redirección, el impacto residual se descarga directamente sobre su propio cuerpo.'
        }
      }
    }
  },
  {
    id: 'uandi',
    name: 'Uandi',
    category: 'pibes',
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
      'Estilo urbano deportivo: Remera técnica ajustada de Kappa, pantalón cargo gris y lentes redondos que suavizan sutilmente sus facciones de combate.'
    ],
    crisis: 'Inercia de vanguardia: Ante la amenaza inminente, su instinto de protección lo vuelve inflexible; tiende a cargar de frente contra el peligro, confiando en su resistencia física antes de evaluar rutas de evasión.',
    stats: { fuerza: 5, inteligencia: 3, carisma: 5, suerte: 3, combate: 3, defensa: 4, especialVal: 0 },
    especialLabel: 'Carga Cinética',
    hint: 'Terminá el Capítulo 4 (No Turning Back) de Green Truck.',
    powers: {
      role: 'Aegis / Tanque Cinético',
      habilidades: [
        'Acumulación Cinética: La tinta de sus tatuajes actúa como un receptor cuántico que absorbe la energía de los impactos físicos recibidos. No lo hace inmune al dolor, pero canaliza la fuerza del golpe.',
        'Descarga de Fuerza Vectorial: Libera la energía acumulada para ejecutar súper saltos de gran distancia, impactos devastadores a corta distancia u ondas de choque de rango corto.',
        'Refuerzo de Densidad: Canaliza el almacenamiento residual de sus tatuajes para rigidizar su estructura molecular, resistiendo temporalmente ataques masivos que superarían a cualquier humano.',
        'Movilidad Balística: Ejecuta saltos de gran altura y proyección. Carece de vuelo dinámico; su tránsito aéreo es un proyectil guiado por su propio peso que cae con intención táctica.'
      ],
      significa: 'El escudo humano. Su rol es absorber el castigo que sus aliados no pueden soportar, asimilando la violencia del campo de batalla para devolverla multiplicada.',
      crisis: 'Saturación de almacenamiento: Sus tatuajes tienen un límite de retención. Si se saturan de energía cinética y no ejecuta una descarga a tiempo, la tinta se agrieta superficialmente, liberando pulsos térmicos incontrolables.',
      stats: { fuerza: 10, inteligencia: 6, carisma: 8, suerte: 7, combate: 9, defensa: 10, especialVal: 10 },
      suitImages: {
        default: '/personajes/FULLBODY SUIT/AEGIS/Aegis.webp',
        ficha: '/personajes/FULLBODY SUIT/AEGIS/Aegis_Ficha.webp'
      },
      variantData: {
        full: {
          label: 'Modo Solidificación Total',
          habilidades: [
            'Transmutación Metalúrgica: Transmuta temporalmente la estructura molecular de sus extremidades superiores en una aleación metálica hiperdensa de resistencia casi indestructible.',
            'Deflexión Balística Pesada: Capacidad para cruzar los brazos y desviar ráfagas de proyectiles pesados o impactos de artillería sin sufrir daño estructural.',
            'Impacto de Demolición: Su fuerza física se eleva a escala colosal, permitiéndole fracturar blindajes pesados, derribar fortificaciones o hundir el terreno con un solo golpe.',
            'Luminiscencia Rúnica: Al alcanzar el umbral máximo de almacenamiento, los patrones de sus tatuajes brillan en un tono rojo incandescente, disipando calor térmico residual.'
          ],
          significa: 'El coloso de primera línea. Cuando la batería está al máximo y sus brazos se solidifican, Uandi deja de amortiguar el combate; quiebra la ofensiva enemiga y se convierte en una barrera infranqueable.',
          crisis: 'Agotamiento cinético: La solidificación y los ataques de demolición consumen la totalidad de la energía almacenada en un solo evento masivo. Tras la descarga, el exotraje entra en un breve estado de latencia, dejándolo sin reservas de absorción y expuesto a la fatiga física inmediata.'
        }
      }
    }
  },
  {
    id: 'volvo',
    name: 'Volvo',
    category: 'pibes',
    image: '/personajes/FULLBODY SUIT/NULL-VECTOR/Null-Vector.webp',
    fullBody: '/personajes/FULLBODY/VOLVO.webp',
    overloadImage: '/personajes/FULLBODY SUIT/NULL-VECTOR/Null-Vector.webp',
    color: '#f95700',
    role: 'Saboteador',
    visualCode: 'Remera naranja, ojos celestes, cinturón táctico',
    perfil: [
      'Audacia impulsiva: Actúa con una bajísima reactividad emocional ante el peligro directo, lo que le permite operar con cabeza fría en escenarios de alto riesgo.',
      'Disrupción compulsiva: Posee el hábito crónico e intuitivo de manipular, analizar y sabotear cualquier arquitectura de alta tecnología que se cruce en su camino.',
      'Estilo de vanguardia rústico: Remera naranja lisa de alto contraste, cinturón de cuero técnico con cartucheras funcionales y una mirada de ojos celestes intensos.'
    ],
    crisis: 'Iniciativa disruptiva: Su naturaleza audaz lo empuja a actuar por puro instinto cinético antes de que las órdenes se consoliden, arriesgándose a alterar los planes del equipo en pos de una oportunidad inmediata.',
    stats: { fuerza: 3, inteligencia: 4, carisma: 2, suerte: 5, combate: 3, defensa: 2, especialVal: 1 },
    especialLabel: 'Disrupción',
    hint: 'Terminá el Capítulo 3 (Worlds) de Mativerse Part 1.',
    powers: {
      role: 'Null-Vector / Saboteador',
      habilidades: [
        'Interferencia de Espectro: Altera la electrónica, redes de datos y frecuencias de sensores enemigos; en lugar de apagarlos, induce un comportamiento caótico e impredecible.',
        'Blink de Cortocircuito: Micro-teleportación cuántica (rango de 5 a 8 metros) utilizando líneas de tensión o flujos de conductividad cercanos como vectores de tránsito.',
        'Sabotaje de Sistemas: Desincroniza y colapsa el hardware avanzado y los sistemas de armas rivales mediante un único contacto físico directo.',
        'Ascensión Cinética-Eléctrica: Capacidad de vuelo natural cuya velocidad y empuje escalan proporcionalmente al volumen de sobrecarga eléctrica que absorbe del entorno.'
      ],
      significa: 'El ecualizador del campo de batalla. Su función es neutralizar la brecha tecnológica del oponente antes de que puedan capitalizarla, desmantelando cualquier plan b digital.',
      crisis: 'Dependencia de red: Su movilidad táctica y micro-teleportación exigen la presencia de infraestructura conductora o flujos energéticos. En entornos aislados o analógicos, su rango operativo se ve drásticamente acotado.',
      stats: { fuerza: 7, inteligencia: 8, carisma: 5, suerte: 9, combate: 8, defensa: 8, especialVal: 9 },
      suitImages: {
        default: '/personajes/FULLBODY SUIT/NULL-VECTOR/Null-Vector.webp',
        ficha: '/personajes/FULLBODY SUIT/NULL-VECTOR/Null-Vector_Ficha.webp'
      },
      variantData: {
        action: {
          label: 'Modo Sobrecarga Máxima',
          habilidades: [
            'Arco de Conducción Continuo: Su exotraje canaliza flujos eléctricos de alta tensión constantes, provocando cortocircuitos inmediatos en cualquier superficie u objetivo que toque.',
            'Vuelo de Interferencia EM: Desplazamiento aéreo de alta velocidad que proyecta de forma pasiva una onda de pulso electromagnético disruptivo a lo largo de toda su trayectoria.',
            'Blink Desencadenado: Duplica el rango de su micro-teleportación, permitiéndole enlazar saltos espaciales en pleno movimiento libre sin depender de anclajes físicos fijos.',
            'Descarga de Plasma Vectorial: Concentra la energía estática residual en sus guantes técnicos, proyectando ráfagas de arco voltaico directo contra objetivos individuales.'
          ],
          significa: 'El vector nulo encarnado. Al entrar en sobrecarga máxima, Volvo deja de sabotear la infraestructura externa para convertirse él mismo en una anomalía electromagnética viviente.',
          crisis: 'Indiscriminación de frecuencia: En este estado extremo, el output caótico de su energía es tan masivo que le resulta imposible filtrar objetivos; los sistemas tácticos e interfaces de sus propios aliados sufren la misma interferencia severa que los del enemigo.'
        }
      }
    }
  },
  {
    id: 'sofi',
    name: 'Sofi',
    category: 'pibes',
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
      'Estilo urbano de bloques: Campera puffer con bloques geométricos rosa y borgoña, suéter crema, bufanda abrigada y un prolijo rodete de rulos oscuros.'
    ],
    crisis: 'Inflexibilidad de criterio: Al procesar certezas sensoriales que los demás ignoran, tiende a cerrarse en sus propias conclusiones tácticas, actuando de manera unilateral y agresiva para resolver la amenaza.',
    stats: { fuerza: 4, inteligencia: 5, carisma: 6, suerte: 5, combate: 4, defensa: 3, especialVal: 1 },
    especialLabel: 'Eco-Rango',
    hint: 'Terminá el Capítulo 2 (Casino) de Mativerse Part 1.',
    powers: {
      role: 'Hush / Duelista Acústica',
      habilidades: [
        'Radar Acústico: Percibe su entorno en un radio de 360 grados procesando el rebote del sonido, ignorando paredes y barreras visuales.',
        'Audición Hiperfocalizada: Puede aislar latidos cardíacos, respiraciones y fricción muscular para detectar mentiras o intenciones ocultas.',
        'Precisión Anatómica: Sus golpes no dependen de fuerza bruta, sino de golpear exactamente en nervios y puntos estructurales débiles guiada por sus sentidos.',
        'Movilidad Acrobática: Se desplaza por la ciudad en absoluto silencio, combinando parkour extremo con una pistola de ganchos táctica.'
      ],
      significa: 'Ve el mundo con más claridad que cualquiera con los ojos abiertos. Nada se le oculta en la oscuridad.',
      crisis: 'Sobrecarga Sensorial: Ruidos repentinos de extrema decibelia (explosiones cercanas, alarmas estridentes) la desorientan e incapacitan de dolor físico severo.',
      stats: { fuerza: 8, inteligencia: 8, carisma: 8, suerte: 8, combate: 9, defensa: 9, especialVal: 9 },
      suitImages: {
        default: '/personajes/FULLBODY SUIT/HUSH/Hush.webp',
        combat: '/personajes/FULLBODY SUIT/HUSH/Hush_combat.webp',
        ficha: '/personajes/FULLBODY SUIT/HUSH/Hush_Ficha.webp'
      },
      variantData: {
        combat: {
          label: 'Modo Duelista Ciega',
          habilidades: [
            'Traje de Combate Vesperwing: Armadura táctica ligera diseñada específicamente por Ian para suprimir el ruido de su propia fricción y potenciar su movilidad.',
            'Katanas Gemelas: En combate cerrado despliega sus katanas, confiando puramente en su instinto y entrenamiento marcial.',
            'Esquiva Predictiva: Al escuchar la contracción muscular de su oponente, comienza a esquivar el golpe antes de que sea lanzado.',
            'Intercepción Perfecta: Desarma o desvía armas interceptando en el ángulo exacto de menor resistencia.',
            'Combate a Oscuras: Su mayor ventaja es destruir las luces del entorno; en la ceguera total, sus enemigos no son nada, y ella es letal.'
          ],
          significa: 'Cierra los ojos para alcanzar su máximo potencial. Ya no solo rastrea, ahora ejecuta con una fluidez aterradora.',
          crisis: 'Al depender de micro-sonidos, oponentes que logran moverse sin fricción o seres no-biológicos (sin latido ni respiración) son casi imposibles de anticipar.'
        }
      }
    }
  }
];
