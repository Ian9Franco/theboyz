import { CharacterDetail } from "./types";

export const entidades: CharacterDetail[] = [
  {
    id: 'judge_null',
    name: 'Judge Null',
    category: 'entidades',
    isSecondary: true,
    image: '/personajes/Entidades/Judge Null/Judge Null.webp',
    fullBody: '/personajes/Entidades/Judge Null/Judge Null.webp',
    color: '#450a0a',
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
    id: 'malakas',
    name: 'Malakas',
    category: 'entidades',
    isSecondary: true,
    image: '/personajes/Entidades/Malakas/Malakas.webp',
    fullBody: '/personajes/Entidades/Malakas/Malakas.webp',
    color: '#86198f',
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
    id: 'terrorblade',
    name: 'Terrorblade',
    category: 'entidades',
    isSecondary: true,
    image: '/personajes/Entidades/Terrorblade/Terrorblade.webp',
    fullBody: '/personajes/Entidades/Terrorblade/Terrorblade.webp',
    color: '#047857',
    role: 'Merodeador del Infierno de Cristal',
    visualCode: 'Silueta de obsidiana, alas curvas de energía fractal verde, guadañas de mano',
    perfil: [
      'Demonio de reflejos: Entidad compuesta de obsidiana y sombras densas, prófugo del infierno de espejos Foulfell.',
      'Espejos de pesadilla: Rodeado de fragmentos de cristal que reflejan los miedos más profundos de sus rivales.',
      'Guadañas gemelas: Arma cortante doble de energía esmeralda que rasga el espacio en el combate cuerpo a cuerpo.'
    ],
    crisis: 'Interferencia de reflejo: Si sus cristales de Foulfell son destruidos, su capacidad de ilusión se cancela.',
    stats: { fuerza: 8, inteligencia: 7, carisma: 5, suerte: 6, combate: 8, defensa: 6, especialVal: 9 },
    especialLabel: 'Reflejo',
    powers: {
      role: 'Terrorblade',
      habilidades: [
        'Sunder: Intercambia instantáneamente el porcentaje de salud física actual con un aliado o enemigo.',
        'Metamorphosis: Transforma su cuerpo en un demonio gigante, aumentando su rango de ataque y daño.',
        'Reflection: Crea dobles oscuros de los enemigos que los atacan con sus propias habilidades físicas.'
      ],
      significa: 'El manipulador de salud. Intercambia la vitalidad del oponente y duplica amenazas mediante ilusiones.',
      crisis: 'Vulnerabilidad previa a Sunder: Si es silenciado o aturdido antes de ejecutar Sunder, su defense es limitada.',
      stats: { fuerza: 9, inteligencia: 8, carisma: 7, suerte: 7, combate: 9, defensa: 7, especialVal: 10 }
    }
  },
  {
    id: 'krillor',
    name: 'Krillor',
    category: 'entidades',
    isSecondary: true,
    image: '/personajes/Entidades/Krillor/Krillor_ficha.webp',
    fullBody: '/personajes/Entidades/Krillor/Krillor_ficha.webp',
    color: '#d1d5db',
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
    id: 'balanar',
    name: 'Night Stalker',
    category: 'entidades',
    isSecondary: true,
    image: '/personajes/Entidades/Balanar/Night Stalker.webp',
    fullBody: '/personajes/Entidades/Balanar/Night Stalker.webp',
    color: '#1e3a8a',
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
    id: 'freezer',
    name: 'Frieza',
    category: 'entidades',
    isSecondary: false,
    image: '/personajes/Entidades/Freezer/Freezer_ficha.webp',
    fullBody: '/personajes/Entidades/Freezer/Freezer_ficha.webp',
    color: '#8b5cf6',
    role: 'El Emperador Galáctico',
    visualCode: 'Alienígena de piel blanca y bioarmadura púrpura, mirada fría, aura intimidante y transformaciones devastadoras',
    perfil: [
      'Tirano interplanetario: Gobernó gran parte del universo mediante el miedo, conquistando y destruyendo mundos enteros.',
      'Genio estratégico: Manipulador, inteligente y extremadamente calculador. Prefiere quebrar psicológicamente a sus enemigos antes de eliminarlos.',
      'Poder monstruoso: Incluso en sus formas limitadas supera a la mayoría de los guerreros del universo. Su potencial evolutivo es extraordinario.'
    ],
    crisis: 'Exceso de confianza: Su arrogancia lo lleva a subestimar rivales aparentemente inferiores, permitiendo que sus enemigos encuentren oportunidades para derrotarlo.',
    stats: {
      fuerza: 10,
      inteligencia: 9,
      carisma: 7,
      suerte: 8,
      combate: 10,
      defensa: 9,
      especialVal: 10
    },
    especialLabel: 'Transformación',
    powers: {
      role: 'Frieza',
      habilidades: [
        'Death Beam: Dispara rayos de energía extremadamente precisos capaces de perforar casi cualquier defensa.',
        'Death Ball: Crea una esfera de energía colosal diseñada para aniquilar ciudades, planetas o incluso sistemas enteros.',
        'Golden Frieza: Libera una transformación dorada que multiplica drásticamente su velocidad, resistencia y poder destructivo.'
      ],
      significa: 'La encarnación de la dominación absoluta. Combina poder abrumador, crueldad estratégica y una capacidad destructiva capaz de amenazar galaxias enteras.',
      crisis: 'Desgaste energético: Sus transformaciones más avanzadas consumen enormes cantidades de energía si no han sido dominadas completamente.',
      stats: {
        fuerza: 10,
        inteligencia: 10,
        carisma: 8,
        suerte: 8,
        combate: 10,
        defensa: 10,
        especialVal: 10
      }
    }
  },
  {
    id: 'lion',
    name: 'Lion',
    category: 'entidades',
    isSecondary: true,
    image: '/personajes/Entidades/Lion/Lion.webp',
    fullBody: '/personajes/Entidades/Lion/Lion.webp',
    color: '#701a75',
    role: 'El Demonologista Corrupto',
    visualCode: 'Brujo felino jorobado, brazo izquierdo de garra demoníaca roja',
    perfil: [
      'Hechicero maldito: Brujo felino deforme con túnicas rasgadas de tonos púrpura y ocre.',
      'Garra del infierno: Brazo izquierdo reemplazado por una garra demoníaca roja incandescente con venas de lava mística.',
      'Resurrección constante: Cada vez que es derrotado, desciende al infierno y regresa más fuerte por tiempo limitado.',
      'Dependencia de maná: Sus destructivos hechizos consumen su energía mística rápidamente, necesitando drenarla.'
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
  }
];
