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
        ficha2: '/personajes/FULLBODY SUIT/VESPERWING/Vesperwing_ficha2.webp',
        ficha3: '/personajes/FULLBODY SUIT/VESPERWING/Vesperwing_ficha3.webp',
        combat: '/personajes/FULLBODY SUIT/VESPERWING/Vesperwing_combat.webp',
        mk3: '/personajes/FULLBODY SUIT/VESPERWING/MK3/MARK-3.webp',
        mk3_alt: '/personajes/FULLBODY SUIT/VESPERWING/MK3/MARK-3_ALT.webp',
        mkl: '/personajes/FULLBODY SUIT/VESPERWING/MKL/MARK-L.webp',
        archor: '/personajes/FULLBODY SUIT/VESPERWING/VESPER ARCHOR/VesperArchor.webp'
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
        },
        combat: {
          label: 'Protocolo Overlord (Exotraje)',
          habilidades: [
            'Sistemas Modular Mark III / LXXXV: Armaduras tácticas (estándar y cósmica) con propulsión verde esmeralda y sellado absoluto para el vacío espacial.',
            'Mark XLIV "Aegisbuster": Armadura pesada de contingencia diseñada para inmovilizar a Uandi si pierde el control, usando guanteletes de absorción hidráulica.',
            'Mark L "Mecha-Vesper": Coloso táctico de artillería pesada móvil pilotado desde el pecho para combatir amenazas de escala masiva o Kaiju.'
          ],
          significa: 'El Plan Overlord en acción. Ian utiliza armaduras modulares personalizadas y protocolos de contingencia dolorosos para proteger a sus amigos de amenazas cósmicas y de sí mismos.',
          crisis: 'Sobrecarga de Contingencia: Activar los modelos pesados (Aegisbuster o Mecha-Vesper) consume el Archor Core a velocidad crítica, arriesgando el apagado total de sus sistemas.'
        },
        mk3: {
          label: 'Mark III (Baseline)',
          habilidades: [
            'Placas Anatómicas de Titanio: Blindaje equilibrado que no limita la movilidad física en combates terrestres estándar.',
            'Ópticas GhostLens Activas: HUD avanzado que escanea y resalta firmas térmicas de enemigos locales.',
            'Propulsión Repulsora Estándar: Vuelo estable de mediano rango controlado por discos estabilizadores en las palmas.'
          ],
          significa: 'El traje principal para misiones estándar. Ian combate a la par de Los Pibes manteniendo su agilidad y reflejos tácticos sin sacrificar movilidad.',
          crisis: 'Limitación de Blindaje: Diseñado para amenazas locales; no soporta impactos de artillería pesada ni el vacío del espacio exterior.'
        },
        mk3_alt: {
          label: 'Mark III (Infiltración)',
          habilidades: [
            'Capa de Absorción Refractaria: Tejido molecular que absorbe luz visible y frecuencias de radar, garantizando sigilo completo.',
            'Supresión de Fricción Acústica: Borceguíes y articulaciones silenciadas para aproximación letal en absoluto silencio.',
            'GhostLens Pasivo: Reconocimiento indetectable que no emite firmas electromagnéticas activas.'
          ],
          significa: 'Especialista en sigilo y reconocimiento. Ideal para misiones de penetración profunda detrás de líneas enemigas sin alertar sensores.',
          crisis: 'Fragilidad en Combate Abierto: Al prescindir de blindaje pesado por sigilo, queda altamente expuesto a daño letal en confrontación directa.'
        },
        mkl: {
          label: 'Mark L (Mecha-Vesper)',
          habilidades: [
            'Cabina Acorazada Central: Compartimento blindado en el pecho de un coloso mecánico gigante desde donde Ian pilota la unidad.',
            'Artillería Pesada Vectorial: Cañones integrados que disparan ráfagas masivas de energía cinética concentrada a gran escala.',
            'Escudos de Absorción Magnética: Generadores que proyectan barreras masivas para absorber y disipar fuego de artillería de escala masiva.'
          ],
          significa: 'La respuesta de la ingeniería al tamaño colosal. Un mecha gigante pilotado para absorber daño masivo y proteger el flanco de ataque de Los Pibes.',
          crisis: 'Baja Maniobrabilidad: Su inmenso tamaño lo vuelve un objetivo lento y fácil de flanquear, requiriendo cobertura constante de velocistas y atacantes ágiles.'
        },
        archor: {
          label: 'Emperor Vesper Archor (Forma Divina)',
          habilidades: [
            'Tejido de Causalidad: Manipula probabilidades cuánticas para anular ataques enemigos o garantizar fallas estructurales críticas en el rival.',
            'Ráfagas de Antimateria Roja: Canaliza energía primordial de Archon en descargas destructivas que borran la materia física de la existencia.',
            'Capa Cósmica y Runas: Armadura negra mate grabada con runas rojas brillantes y capa cósmica que fluye con materia oscura y vacío.'
          ],
          significa: 'El Dios estratega de Vesperia. Ian asimila la entidad cósmica Archon para gobernar las probabilidades cuánticas del universo, sacrificando el libre albedrío por la supervivencia.',
          crisis: 'Desapego Emocional Absoluto: Al unirse a la anomalía divina, pierde toda empatía humana y ve a sus propios amigos como variables caóticas que debe resolver.'
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
    role: 'Hostigador ágil / Distracción táctica / Daño por fricción energética',
    visualCode: 'Suéter azul marino, barba, pelo corto con fade',
    perfil: [
      'Peleador ágil y hostigador: Combate con cartas y constructos de energía pura inestable (glitch azul y rojo) para desestabilizar coberturas y enemigos a corto/medio rango.',
      'Fachada sarcástica: Oculta una altísima ansiedad interna y un cerebro hiperactivo bajo una capa de cinismo, carisma magnético y humor negro.',
      'Contextos de Vestimenta: Ropa normal (suéter azul marino) en el día a día para pasar desapercibido, y el Traje Cósmico "Wildcard" en misiones críticas.',
      'Ancla Psicológica: Ponerse el traje cósmico le sirve como señal mental de que "la situación se fue global/multiversal", forzando a su mente ansiosa a enfocarse.'
    ],
    crisis: 'Agotamiento por sobrecarga: Si se sobreesfuerza intentando cargar objetos grandes (como autos o columnas) o inyectando demasiada energía a sus clones, sufre migrañas incapacitantes y queda indefenso.',
    stats: { fuerza: 3, inteligencia: 7, carisma: 8, suerte: 9, combate: 6, defensa: 4, especialVal: 0 },
    especialLabel: 'Energía Pura',
    hint: 'Terminá el Capítulo 1 de Green Truck para desbloquear.',
    powers: {
      role: 'Wildcard / Hostigador Energético',
      habilidades: [
        'Bomber Roja Táctica: Chaqueta de cuero técnico rojo borravino estilo Star-Lord que disipa la fricción de su energía glitch y hace juego visual con sus constructos.',
        'Casco de Conducción Colapsable: Casco hermético inspirado en Star-Lord que le permite respirar en el espacio/vacío y cuenta con ópticas HUD de luz azul analógica.',
        'Naipes de Energía: Proyectiles inestables de energía glitch (azul y roja) que lanza con asistencia del HUD de su casco para calcular parábolas perfectas.',
        'Ecos de Conservación Decreciente: Clones de estática azul y roja que decaen temporalmente. Su detonación y energía residual son monitoreadas por las ópticas del casco.'
      ],
      significa: 'El maestro del engaño y la agilidad táctica. Emplea constructos y clones de energía pura degradable para sembrar el caos y castigar al oponente sin comprometer su seguridad.',
      crisis: 'Migraña por Sobrecarga: Intentar mantener clones estables por mucho tiempo o cargar masas pesadas le genera migrañas y lo deja expuesto. Además, sus armas de energía vibran y pueden estallar en sus manos si no las descarta a tiempo.',
      stats: { fuerza: 7, inteligencia: 8, carisma: 9, suerte: 9, combate: 9, defensa: 7, especialVal: 9 },
      suitImages: {
        default: '/personajes/FULLBODY SUIT/WILDCARD/Wildcard.webp',
        ficha: '/personajes/FULLBODY SUIT/WILDCARD/Wildcard_Ficha.webp',
        combat: '/personajes/FULLBODY SUIT/WILDCARD/Wildcard_combat.webp'
      },
      variantData: {
        action: {
          label: 'Modo Acción (Traje Cósmico)',
          habilidades: [
            'Bomber Roja (Star-Lord Style): Cuero técnico carmesí con solapas mecánicas y cierres descentrados que amortigua la reacción cinética de sus dados y naipes.',
            'Asistencia de Apuntado HUD: Las ópticas de su máscara proyectan una interfaz azul que calcula trayectorias balísticas de naipes y la distancia exacta para detonar Ecos.',
            'Supervivencia Autónoma: Casco colapsable con sellado ambiental que filtra toxinas cuánticas y provee respiración en el vacío espacial.'
          ],
          significa: 'El combate sucio e improvisado llevado a escala interdimensional. Julián utiliza la tecnología de su traje para compensar la falta de gravedad y distorsiones del espacio.',
          crisis: 'Descalibración del HUD: Si la máscara sufre daños por impactos directos o estática glitch, el cálculo de trayectorias se distorsiona, arriesgando detonaciones accidentales.'
        },
        alt: {
          label: 'Sobrecarga de Masa (Forma Límite)',
          habilidades: [
            'Sobrecarga de Masa (Endgame): Mantiene contacto estático con objetos grandes (motores, columnas) inyectándoles energía masiva para causar una explosión devastadora.',
            'Decreto de Realidad: Modula su energía glitch para proyectar distorsiones cognitivas que obligan al enemigo a ver duplicados y desorientar su puntería.',
            'Válvula Cinética (Combo con Uandi): Crea pequeños constructos inestables que Uandi absorbe deliberadamente para cargar su barra de furia sin dañarse.',
            'Interferencia de Naipes: Descarga ráfagas masivas de cartas de energía para desviar la atención táctica de los aliados caídos o sobrecalentados.'
          ],
          significa: 'El comodín de la baraja. Al asumir riesgos críticos, Julián deja de correr para sobrecargar masas pesadas u ofrecer su energía glitch como catalizador directo de la potencia física de Uandi.',
          crisis: 'Exposición Total: Al realizar la sobrecarga de masa, queda completamente inmóvil y vulnerable durante varios segundos, arriesgando daño directo de fuego enemigo.'
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
      'Jovial y amante de los memes: El carismático que descontractura al grupo en medio del caos, aportando humor y ligereza incluso en las situaciones más tensas.',
      'Perspectiva particular: A veces descoloca a Los Pibes con pensamientos raros, teorías locas o comentarios polémicos, pero siempre desde la nobleza de ser un buen tipo.',
      'Switch táctico: Su supuesta frialdad es en realidad un switch de madurez. Cuando las papas queman, sabe asumir la responsabilidad y toma la batuta para tomar decisiones difíciles.',
      'Conciencia de su rol: Plenamente consciente de que sus poderes no son un accidente y de su responsabilidad en el multiverso. No tiene complejo de héroe, actúa por madura convicción.',
      'Resistencia y fuerza sobrehumana: Posee una fuerza física aumentada y una densidad dérmica que detiene las balas, hiriendo su piel pero sin perforar sus órganos vitales.'
    ],
    crisis: 'Fuego ciego catastrófico: Si pierde su visor y activa su poder, la energía violeta brota sin filtro ni calibración, expandiéndose instantáneamente a todo su campo de visión y provocando destrucción masiva de área con peligro de fuego aliado.',
    stats: { fuerza: 5, inteligencia: 6, carisma: 6, suerte: 4, combate: 5, defensa: 4, especialVal: 0 },
    especialLabel: 'Intercambio',
    hint: 'Terminá el Capítulo 3 (Worlds) de Mativerse Part 1.',
    powers: {
      role: 'Swapfire / Nexo Cósmico',
      habilidades: [
        'Portal Ocular ("The Aperture"): Sus ojos son un portal físico a otra dimensión de donde brota energía de plasma violeta base, la cual guía al 100% con su mirada y cabeza.',
        'Visor de Calibración Táctica: Regula la energía del portal ocular en ráfagas finas y rebotes geométricos. Cuenta con soporte de respiración autónoma para el vacío del espacio.',
        'Nexo de Anclajes (Punto A/B): Transpone objetivos geométricamente entre un Punto A (visión) y un Punto B (anclajes en armas/drones) catalizando calor molecular extremo.',
        'Burbuja de Anclaje Local: Mantiene de forma pasiva una porción de atmósfera terrestre pegada a su piel, permitiéndole sobrevivir en el espacio junto a su visor táctico.'
      ],
      significa: 'Mati es el primero en mandar un meme al grupo en medio de una crisis, pero también el primero en ponerse al frente cuando hay que tomar una decisión de la que depende la vida de todos. Sabe que sus ojos son una ventana al colapso multiversal, y no se permite parpadear cuando importa.',
      crisis: 'Meltdown Multiversal: Al sobrecalentarse o entrar en crisis, el rayo violeta se tiñe de rojo incandescente como fuego. Activar su poder sin visor desata una destrucción masiva y descontrolada en todo su campo de visión.',
      stats: { fuerza: 9, inteligencia: 10, carisma: 8, suerte: 7, combate: 10, defensa: 9, especialVal: 10 },
      suitImages: {
        default: '/personajes/FULLBODY SUIT/SWAPFIRE/Swapfire.webp',
        ficha: '/personajes/FULLBODY SUIT/SWAPFIRE/Swapfire_ficha.webp',
        combat: '/personajes/FULLBODY SUIT/SWAPFIRE/Swapfire_combat.webp'
      },
      variantData: {
        action: {
          label: 'Modo Acción (Traje de Combate)',
          habilidades: [
            'Traje de Acción Alternativo: Armadura ligera optimizada para combate en tierra o espacio, que absorbe la violenta presión de retroceso y facilita maniobras físicas.',
            'Guía Ocular Avanzada: Dirección del haz violeta base mediante giros de cabeza y ojos, logrando trayectorias geométricas complejas y rebotes en superficies de alta densidad.',
            'Sleight of Swap: Proyecta anclajes tridimensionales para intercambiar posiciones en fracciones de segundo, obligando al enemigo a interceptar su propia ráfaga.'
          ],
          significa: 'La manipulación espacial y de energía combinadas en combate cerrado. Mati utiliza su visor y traje de acción para guiar su rayo violeta con precisión quirúrgica.',
          crisis: 'Saturación en Meltdown: Sostener el flujo de disparos eleva la temperatura al límite, tiñendo el rayo de rojo y amenazando con fundir los disipadores del traje.'
        },
        full: {
          label: 'Overdrive Multiversal (Nexo Completo)',
          habilidades: [
            'Overdrive Ocular: Abre la compuerta del visor al máximo para liberar un pilar masivo de plasma violeta guiado con el movimiento de su cabeza que barre toda cobertura.',
            'Respiración Espacial HUD: Su visor actúa como un respirador sellado de ciclo cerrado que filtra gases nocivos y genera oxígeno en entornos hostiles o en el vacío.',
            'Lazo Cinético de Fricción: Conecta la inercia de objetos pesados a su rayo, permitiendo transferir momento físico e intercambiar estados moleculares por fricción térmica.',
            'Redirección Defensiva: Utiliza su traje de acción y drones de red como nodos de desvío de impacto, protegiendo a aliados del retroceso y fuego de área.'
          ],
          significa: 'El control absoluto y destructivo del frente. Con su traje alternativo de acción y el visor al límite, Mati asume el mando en la línea de fuego para redistribuir la física y materia a su antojo.',
          crisis: 'Fuego Ciego Catastrófico: Si el visor se daña bajo la inmensa presión, el rayo violeta se torna rojo fuego descontrolado, abarcando todo su campo visual y calcinando aliados por igual.'
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
    role: 'Vanguardia / Infiltración y Desborde / Movilidad Absoluta',
    visualCode: 'Remera naranja, ojos celestes, cinturón táctico',
    perfil: [
      'Velocidad de escape dimensional: Se desplaza a velocidades que desafían la física, abriendo portales naranjas brillantes por pura fricción con el espacio-tiempo.',
      'Inmunidad de entorno natural: Al nacer su mutación de la Corriente, su cuerpo resiste el vacío del espacio y atmósferas hostiles sin necesidad de trajes especiales.',
      'Vector Suit aerodinámico: Utiliza un traje molecular flexible diseñado por Ian que evita que la fricción dimensional desintegre su cuerpo o queme su ropa al correr.'
    ],
    crisis: 'Acecho del Eco Corrupto: Correr a máxima velocidad debilita las barreras dimensionales y atrae a Reverse Volvo, quien corre justo detrás de él en el fondo de sus portales, esperando a que se canse para ocupar su lugar.',
    stats: { fuerza: 4, inteligencia: 5, carisma: 4, suerte: 4, combate: 4, defensa: 3, especialVal: 0 },
    especialLabel: 'Disrupción',
    hint: 'Terminá el Capítulo 3 (Worlds) de Mativerse Part 1.',
    powers: {
      role: 'Null-Vector / Movilidad Absoluta',
      habilidades: [
        'Estelas de Portales: Abre grietas naranjas en el aire y superficies sólidas al correr, lo que le permite cruzar estructuras y saltar de dimensiones simplemente corriendo en línea recta.',
        'Inmunidad de Entorno: Resistencia innata al vacío espacial, temperaturas extremas y atmósferas hostiles debido a su sintonía orgánica con la Corriente extradimensional.',
        'Vibración Atómica: Hace vibrar sus átomos a alta velocidad para volverse completamente intangible durante unos breves segundos, dejando pasar amenazas físicas y energéticas a través de él.',
        'Vector Suit Táctico: Traje molecular ultraligero diseñado por Ian que canaliza sus estelas naranjas y evita que la fricción dimensional desintegre su cuerpo o dañe su indumentaria.'
      ],
      significa: 'El desborde y la movilidad absoluta. Volvo domina la velocidad a escala cuántica, convirtiendo el espacio y la materia sólida en simples puertas que puede abrir corriendo.',
      crisis: 'Acecho de Reverse Volvo: El uso de su velocidad de escape abre la puerta a su eco corrupto de estática oscura, quien le pisa los talones en el fondo de sus propios portales naranjas.',
      stats: { fuerza: 7, inteligencia: 8, carisma: 5, suerte: 9, combate: 8, defensa: 8, especialVal: 9 },
      suitImages: {
        default: '/personajes/FULLBODY SUIT/NULL-VECTOR/Null-Vector.webp',
        ficha: '/personajes/FULLBODY SUIT/NULL-VECTOR/Null-Vector_Ficha.webp',
        combat: '/personajes/FULLBODY SUIT/NULL-VECTOR/Null-Vector_combat.webp'
      },
      variantData: {
        action: {
          label: 'Modo Vector Suit (Movilidad Absoluta)',
          habilidades: [
            'Armadura Molecular Flexible: Traje negro mate y naranja que se adapta a su vibración cuántica y resiste altas temperaturas de fricción sin rasgarse.',
            'Estela de Portales Naranja: Desplazamiento supersónico que abre fisuras dimensionales en línea recta para flanquear coberturas y evadir proyectiles.',
            'Intangibilidad Atómica: Micro-vibraciones que le permiten cruzar ataques densos de energía y trampas sólidas sin sufrir daño físico.'
          ],
          significa: 'La velocidad de escape definitiva. Volvo utiliza la aerodinámica pura del Vector Suit para desbordar al enemigo y cruzar el campo de batalla sin restricciones físicas.',
          crisis: 'Fatiga de Conducción: Sostener la velocidad extrema desgasta sus músculos. Si se agota, las grietas naranjas pueden colapsar y atraparlo a merced de Reverse Volvo.'
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
