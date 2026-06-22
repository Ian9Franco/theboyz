import { CharacterDetail } from "./types";

export const antagonistas: CharacterDetail[] = [
  {
    id: 'don',
    name: 'Don Vanguard',
    category: 'antagonistas',
    isSecondary: true,
    image: '/personajes/Antagonistas/DON/Don.webp',
    fullBody: '/personajes/Antagonistas/DON/Don.webp',
    altImage: '/personajes/Antagonistas/DON/Don_alt.webp',
    color: '#1f2937',
    role: 'Alcalde de Nueva York / Kingpin Institucional',
    visualCode: 'Trajes de sastre impecables a medida, anillo de diamante negro, físico imponente',
    perfil: [
      'Poder dual: Alcalde electo de Nueva York y líder real del crimen organizado. Unificó las familias bajo un monopolio corporativo usando la alcaldía como escudo legal perfecto.',
      'Pragmatismo institucional: Prefiere asfixiar a sus rivales mediante ordenanzas, embargos y burocracia antes de recurrir a la violencia, que delega en R.E.G.U.L.A.R.',
      'Estilo de estadista: Se mueve entre conferencias de prensa y reuniones de cúpula criminal con la misma naturalidad. Sus trajes a medida ocultan una masa muscular que nadie en la ciudad debería subestimar.'
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
    id: 'phobos',
    name: 'Phobos',
    category: 'antagonistas',
    isSecondary: true,
    image: '/personajes/Antagonistas/PHOBOS/phobos_ficha.webp',
    fullBody: '/personajes/Antagonistas/PHOBOS/phobos.webp',
    altImage: '/personajes/Antagonistas/PHOBOS/alt.webp',
    color: '#334155',
    role: 'El Joker de los Backrooms / Estratega de Frecuencia',
    visualCode: 'Visera ciega de metal y cuero remachado, cables de cobre expuestos hacia atrás, gabardina de lona negra muy larga',
    perfil: [
      'Mente maquiavélica: Un estratega brillante que diseña planes meticulosos para aislar a sus víctimas en el laberinto. Controla totalmente la situación y prefiere el "Teatro del Trauma" antes que los combates directos.',
      'Lenguaje corporal teatral: Su postura fría y apática esconde a un actor de teatro macabro durante la cacería, realizando movimientos exagerados e inclinando la cabeza ante una sinfonía inaudible.',
      'Firma de distorsión: Su presencia deforma la realidad circundante con estática analógica y ruido blanco. Cuando sonríe con muecas maníacas grotescas, la interferencia visual quiebra la cordura de sus presas.'
    ],
    crisis: 'Inestabilidad mental: Sus brotes psicóticos y obsesión con la agonía ajena pueden distraerlo de variables imprevistas en su plan.',
    stats: { fuerza: 5, inteligencia: 10, carisma: 6, suerte: 5, combate: 6, defensa: 5, especialVal: 9 },
    especialLabel: 'Teatro del Trauma',
    powers: {
      role: 'El Titiritero de los Backrooms',
      habilidades: [
        'Cámara de Agonía: Su visera ciega de metal transmite en vivo el sufrimiento de sus presas, dándole información táctica instantánea del entorno.',
        'Distorsión de Entorno: Genera líneas de interferencia de televisión vieja y ruido blanco analógico que bloquean señales y quiebran la orientación de sus objetivos.',
        'Transmisión Forzada: Hackea y secuestra frecuencias y pantallas de la ciudad para reproducir transmisiones distorsionadas y sembrar pánico social.'
      ],
      significa: 'El director del laberinto. Desestabiliza la cordura mediante la teatralidad y el control absoluto del trauma visual.',
      crisis: 'Señal analógica: Su equipamiento y visera dependen de frecuencias electromagnéticas analógicas; una interferencia cuántica o de plasma anula su visión.',
      stats: { fuerza: 5, inteligencia: 10, carisma: 7, suerte: 6, combate: 7, defensa: 6, especialVal: 10 }
    }
  },
  {
    id: 'shinjuro',
    name: 'Shinjuro Kurogane',
    category: 'antagonistas',
    isSecondary: true,
    image: '/personajes/Antagonistas/Shinjuro Kurogane/Shinjuro Kurogane.webp',
    fullBody: '/personajes/Antagonistas/Shinjuro Kurogane/Shinjuro Kurogane.webp',
    color: '#0284c7',
    role: 'Oyabun Yakuza / El Dragón de Acero',
    visualCode: 'Kimono negro sobre brazo robótico negro mate, tatuaje de dragón neón',
    perfil: [
      'Líder criminal tradicional: Líder de la Yakuza de Neo-Tokyo. Riguroso, honorable y disciplinado militarmente.',
      'Mano cibernética: Brazo derecho robótico de sigilo militar en color negro mate que oculta cables de tensión.',
      'Estilo samurái: Katana de monomateria templada capaz de cortar aleaciones de cromo.'
    ],
    crisis: 'Código de honor: Su apego a las tradiciones le impide atacar a traición o usar armas de destrucción masiva.',
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
    id: 'balthazar',
    name: 'Balthazar Vane',
    category: 'antagonistas',
    isSecondary: true,
    image: '/personajes/Antagonistas/Balthazar Vane/Balthazar vane.webp',
    fullBody: '/personajes/Antagonistas/Balthazar Vane/Balthazar vane.webp',
    color: '#7f1d1d',
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
  id: 'comandante',
  name: 'Comandante R.E.G.U.L.A.R.',
  category: 'antagonistas',
  isSecondary: true,
  image: '/personajes/Antagonistas/REGULAR/R.E.G.U.L.A.R.webp',
  fullBody: '/personajes/Antagonistas/REGULAR/R.E.G.U.L.A.R.webp',
  altImage: '/personajes/Antagonistas/REGULAR/R.E.G.U.L.A.R_cosmic.webp',
  overloadImage: '/personajes/Antagonistas/REGULAR/R.E.G.U.L.A.R_cosmic.webp',
  color: '#ef4444',
  role: 'Jefe de los V.O.P.S. / Brazo Armado de Vanguard',
  visualCode: 'Uniforme táctico blindado negro y azul, visor de luz azul sólido, modulador de voz',
  perfil: [
    'Supersoldado institucional: Jefe operativo de los V.O.P.S., la fuerza policial de élite privatizada que Don Vanguard controla desde la alcaldía de Nueva York bajo fachada de seguridad pública.',
    'Cazador de raros: Su unidad tiene mandato encubierto de identificar, contener y neutralizar a individuos con alteraciones cuánticas en la ciudad. Opera con total impunidad institucional.',
    'Estilo de opresión blindada: Exo-uniforme táctico militar negro mate con líneas de luces azules de estasis, casco hermético con visor sellado y modulador de voz que distorsiona sus órdenes en frecuencia de radio.'
  ],
  crisis: 'Parálisis doctrinaria: La rigidez de su protocolo lo bloquea cuando enfrenta tácticas caóticas o improvisadas que escapan a sus manuales de contención táctica.',
  loreNote: 'Versión terrenal. Su versión cósmica — líder de una corporación interdimensional — corresponde a una escala narrativa futura de la saga, cuando la amenaza de los V.O.P.S. trascienda Nueva York.',
  stats: { fuerza: 7, inteligencia: 8, carisma: 5, suerte: 4, combate: 9, defensa: 9, especialVal: 7 },
  especialLabel: 'Estasis',
  powers: {
    role: 'Jefe Táctico V.O.P.S.',
    habilidades: [
      'Red de Contención: Dispara redes de energía azul que inmovilizan y suprimen físicamente a individuos con alteraciones cuánticas activas.',
      'Escudo Repulsor Antidisturbios: Deflector táctico pesado que absorbe impactos frontales y los devuelve como ondas de choque cinético.',
      'Protocolo de Neutralización: Coordina a su unidad de V.O.P.S. en formaciones de cerco que cortan las rutas de escape y aíslan al objetivo.'
    ],
    significa: 'El puño institucional. Ejecuta la agenda encubierta de Don Vanguard con impunidad legal, convirtiendo la persecución de raros en operativo policial rutinario.',
    crisis: 'Dependencia de red: Sus sistemas están sincronizados con la central de V.O.P.S. Una interferencia electromagnética severa degrada su capacidad táctica.',
    stats: { fuerza: 8, inteligencia: 9, carisma: 6, suerte: 5, combate: 10, defensa: 10, especialVal: 8 }
  }
},
{
  id: 'gorgon',
  name: 'Gorgon',
  category: 'antagonistas',
  isSecondary: true,
  image: '/personajes/Antagonistas/Gorgon/gorgon_ficha.webp',
  fullBody: '/personajes/Antagonistas/Gorgon/gorgon.png',
  color: '#15803d',
  role: 'El Gigante de Metatoxina / Ejecutor Mutado',
  visualCode: 'Respirador táctico pesado, mangueras industriales en cabeza y brazos, chaleco de cuero oscuro rasgado',
  perfil: [
    'Experimento y lacayo: Sometido a cirugías invasivas por Phobos el Ventrílocuo para instalarle puertos y mangueras, convirtiéndolo en el contenedor de su metatoxina verde.',
    'Estado Base (El Ejecutor): Sin el químico en sus venas, es un gigante tosco, encorvado y pesado que actúa como un letal pero predecible ariete de fuerza bruta.',
    'Estado Alterado (El Intelecto): Bajo la toxina, sus venas brillan de verde neón y sus músculos se expanden. Su intelecto se enciende volviéndolo hiperinteligente, sádico y refinado.'
  ],
  crisis: 'Dualidad cognitiva: En su estado base es predecible y tosco; en su estado alterado florece un intelecto refinado que odia su sumisión y planea rebelarse de Phobos.',
  stats: { fuerza: 10, inteligencia: 4, carisma: 5, suerte: 5, combate: 8, defensa: 9, especialVal: 6 },
  especialLabel: 'Metatoxina',
  powers: {
    role: 'El Intelecto Mutado',
    habilidades: [
      'Carga de Toxina: Bombea metatoxina verde para expandir su musculatura y encender su sistema nervioso.',
      'Hiperreflexia Refinada: En estado mutado, predice trayectorias y diseña tácticas analíticas crueles en milisegundos.',
      'Embate Sísmico: Descarga su colosal fuerza física amplificada contra el suelo para desestabilizar el entorno.'
    ],
    significa: 'El titán cerebral. Una fuerza imparable cuyo mayor peligro no es la musculatura mutada, sino la mente calculadora que despierta el químico.',
    crisis: 'Purga química: Si se cortan o sabotean las mangueras de metatoxina, su sistema colapsa regresando a su estado base tosco y vulnerable.',
    stats: { fuerza: 11, inteligencia: 10, carisma: 8, suerte: 6, combate: 9, defensa: 10, especialVal: 10 }
  }
},
{
  id: 'apex',
  name: 'Apex',
  category: 'antagonistas',
  isSecondary: true,
  image: '/personajes/Antagonistas/APEX/apex_ficha.webp',
  fullBody: '/personajes/Antagonistas/APEX/apex.webp',
  color: '#475569',
  role: 'El Proyecto Estabilizado / Operativo de Gobierno',
  visualCode: 'Traje táctico de polímero gris militar, chaleco táctico ligero con arneses y fundas de armas, rostro descubierto con expresión fría',
  perfil: [
    'El agente definitivo: Creado por agencias secretas usando una muestra de la metatoxina confiscada a Phobos, refinada en la Fórmula Apex.',
    'Suero estabilizado: No causa deformidades físicas ni psicosis; se asimila a nivel celular para crear al soldado perfecto.',
    'Mente profesional: Corre por su sistema optimizando su tiempo de reacción, memoria muscular y procesamiento táctico de manera fría y profesional.'
  ],
  crisis: 'Sobrecarga táctica: Al depender de cálculos geométricos lógicos, los eventos puramente caóticos o cuánticos desestabilizan su estrategia.',
  stats: { fuerza: 7, inteligencia: 8, carisma: 5, suerte: 6, combate: 9, defensa: 7, especialVal: 8 },
  especialLabel: 'Fórmula Apex',
  powers: {
    role: 'El Soldado Perfecto',
    habilidades: [
      'Cálculo Geométrico: Su mente procesa instantáneamente ángulos y trayectorias, garantizando una precisión infalible en combate a distancia.',
      'Fisiología Optimizada: Asimilación celular de la toxina que le otorga agilidad, velocidad de reacción y reflejos sobrehumanos.',
      'Mente de Acero: Mantiene una frialdad absoluta que lo hace inmune a manipulaciones psicológicas o pánico en el campo de batalla.'
    ],
    significa: 'El operativo definitivo del gobierno. Un combatiente de precisión quirúrgica e inmunidad mental total.',
    crisis: 'Sobrecarga de Datos: Si es bombardeado por estímulos o variables caóticas que escapan a los cálculos lógicos, su procesamiento táctico se ralentiza.',
    stats: { fuerza: 8, inteligencia: 9, carisma: 5, suerte: 6, combate: 10, defensa: 8, especialVal: 9 }
  }
},
{
  id: 'maker',
  name: 'Maker',
  category: 'antagonistas',
  isSecondary: false,
  image: '/personajes/Antagonistas/MAKER/maker_ficha.webp',
  fullBody: '/personajes/Antagonistas/MAKER/maker.webp',
  color: '#0f172a',
  role: 'El Creador Elástico / Anomalía Mutante Científica',
  visualCode: 'Traje de polímero oscuro ceñido, casco alargado de alta tecnología que expande y contiene su masa elástica',
  perfil: [
    'Anatomía maleable: Antiguo genetista obsesionado con la metatoxina que mutó su cuerpo hasta volver su estructura celular completamente líquida y elástica.',
    'Pulcritud futurista: A diferencia de otros mutantes toscos, viste un diseño limpio, futurista y minimalista para ocultar su carencia de huesos y órganos fijos.',
    'Supercomputadora viva: Puede estirar su propio cráneo o crear lóbulos temporales adicionales para procesar información a nivel de supercomputadora.'
  ],
  crisis: 'Inestabilidad térmica: El calor extremo derrite su cohesión celular, mientras que el frío extremo congela sus tejidos volviéndolo frágil.',
  stats: { fuerza: 6, inteligencia: 10, carisma: 6, suerte: 5, combate: 7, defensa: 8, especialVal: 9 },
  especialLabel: 'Elasticidad Cerebral',
  powers: {
    role: 'La Anomalía Biológica',
    habilidades: [
      'Maleabilidad Anatómica: Estira, aplana y contorsiona su cuerpo de formas físicamente imposibles para esquivar ataques o apresar objetivos a distancia.',
      'Expansión Cerebral: Modifica la estructura de su cráneo para generar masa cerebral adicional, procesando datos a nivel de supercomputadora.',
      'Anatomía Líquida: Carece de órganos y huesos fijos, lo que le permite regenerarse y deslizarse a través de espacios reducidos.'
    ],
    significa: 'El intelectual mutable. Un villano pulcro y futurista que combina elasticidad anatómica absoluta con un procesamiento cerebral supercomputador.',
    crisis: 'Temperatura Extrema: El calor intenso licúa su estructura celular perdiendo cohesión, mientras que el frío extremo cristaliza sus tejidos elásticos.',
    stats: { fuerza: 7, inteligencia: 11, carisma: 7, suerte: 5, combate: 9, defensa: 10, especialVal: 10 }
  }
}
];
