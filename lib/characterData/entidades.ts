import { CharacterDetail } from "./types";

export const entidades: CharacterDetail[] = [
  {
    id: 'archon',
    name: 'ARCHON',
    category: 'entidades',
    isSecondary: true,
    image: '/personajes/Entidades/Archon/ARCHON.webp',
    fullBody: '/personajes/Entidades/Archon/ARCHON.webp',
    fichaImage: '/personajes/Entidades/Archon/Archon_ficha.webp',
    color: '#1e293b',
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
    category: 'entidades',
    isSecondary: true,
    image: '/personajes/Entidades/Judge Null/Judge Null.webp',
    fullBody: '/personajes/Entidades/Judge Null/Judge Null.webp',
    fichaImage: '/personajes/Entidades/Judge Null/Judge Null.webp',
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
    id: 'lucy',
    name: 'Mephisto-Lucifer',
    category: 'entidades',
    isSecondary: true,
    image: '/personajes/Entidades/Lucy/Lucy.webp',
    fullBody: '/personajes/Entidades/Lucy/Lucy.webp',
    color: '#fbbf24',
    role: 'Morningstar / El Titiritero de la Noche',
    visualCode: 'Traje de sastre italiano, beauty aristocrática, seis alas de luz celestial',
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
    category: 'entidades',
    isSecondary: true,
    image: '/personajes/Entidades/Malakas/Malakas.webp',
    fullBody: '/personajes/Entidades/Malakas/Malakas.webp',
    altImage: '/personajes/Entidades/Malakas/Malakas_alt.webp',
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
    id: 'mars',
    name: 'Mars',
    category: 'entidades',
    isSecondary: true,
    image: '/personajes/Entidades/Mars/Mars.webp',
    fullBody: '/personajes/Entidades/Mars/Mars.webp',
    color: '#dc2626',
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
      crisis: 'Vulnerabilidad previa a Sunder: Si es silenciado o aturdido antes de ejecutar Sunder, su defensa es limitada.',
      stats: { fuerza: 9, inteligencia: 8, carisma: 7, suerte: 7, combate: 9, defensa: 7, especialVal: 10 }
    }
  }
];
