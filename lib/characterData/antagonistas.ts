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
    image: '/personajes/Antagonistas/Phobos/Phobos_ficha.webp',
    fullBody: '/personajes/Antagonistas/Phobos/Phobos.webp',
    altImage: '/personajes/Antagonistas/Phobos/Phobos_alt.webp',
    color: '#334155',
    role: 'El Arquitecto del Pánico / Mente Maestra Táctica',
    visualCode: 'Gabardina de cuero negro balístico pesado con correas y hebillas, cuello rígido, visor angular de hierro oscuro con pinchos geométricos',
    perfil: [
      'Genio táctico corrompido: Originalmente el científico militar más brillante del gobierno. Se expuso voluntariamente al Compuesto Alfa original, eliminando su empatía y liberando un sadismo absoluto.',
      'El monolito frío: Mientras planifica, mantiene una rigidez militar silenciosa y una boca plana sin sonrisa, calculando variables físicas y psicológicas diez pasos por delante de todos.',
      'El verdugo teatral: Al ejecutar su caza, adopta posturas exageradas, inclinadas y fluidas. Su sonrisa fija de porcelana y su risa maníaca de frecuencia distorzada quiebran la cordura de sus presas.'
    ],
    crisis: 'Arrogancia absoluta: Su convicción de que la esperanza y la ética son fallas lógicas lo lleva a subestimar los sacrificios irracionales que los héroes están dispuestos a hacer.',
    stats: { fuerza: 6, inteligencia: 10, carisma: 6, suerte: 5, combate: 7, defensa: 6, especialVal: 10 },
    especialLabel: 'Geometría del Trauma',
    powers: {
      role: 'El Diseñador de Dilemas',
      habilidades: [
        'Aparato de Frecuencia de Risa: Implantes neurológicos emiten una sutil frecuencia acústica a través de sus cuerdas vocales que provoca ataques de pánico y desorientación espacial.',
        'Guerra Psicológica: Diseña escenarios y dilemas éticos devastadores donde la mente de sus presas se quiebra por pura lógica matemática.',
        'Combate Purgante: Precisión quirúrgica militar utilizando cables de tensión pesados, herramientas de restricción y hojas de aleación oscura.'
      ],
      significa: 'El estratega del pánico. Desestabiliza la mente de sus presas y desmantela el orden social mediante la lógica de la caída.',
      crisis: 'Sacrificio irracional: Sus planes lógicos colapsan ante actos puramente desinteresados o sacrificios irracionales que no puede computar.',
      stats: { fuerza: 6, inteligencia: 10, carisma: 6, suerte: 5, combate: 7, defensa: 6, especialVal: 10 }
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
  image: '/personajes/Antagonistas/Gorgon/Gorgon_ficha.webp',
  fullBody: '/personajes/Antagonistas/Gorgon/Gorgon.webp',
  color: '#15803d',
  role: 'Ejecutor Táctico Mutado / Fuerza de Choque',
  visualCode: 'Arnés táctico de sujeción industrial en espalda y cuello, mangueras de polímero reforzado a sienes y brazos, respirador industrial pesado, chaleco de cuero oscuro rasgado',
  perfil: [
    'Rival Interno: Esclavo resentido de Phobos. Cuando está en estado alterado, planea en secreto su emancipación y la destrucción del Arquitecto del Pánico.',
    'Estado Base (El Ejecutor): "[Gruñidos de pesadez y respiración mecánica]". Un gigante tosco y pesado de fuerza descomunal pero mente simple.',
    'Estado Alterado (El Intelecto): La metatoxina enciende su sistema nervioso y expande su musculatura. Se convierte en un genio militar y analítico extremadamente calculador.'
  ],
  crisis: 'La Trampa del Olvido: Al regresar a su estado base, Gorgon pierde todo recuerdo de sus planes de rebelión y vuelve a ser dócil.',
  stats: { fuerza: 10, inteligencia: 4, carisma: 4, suerte: 5, combate: 8, defensa: 9, especialVal: 6 },
  especialLabel: 'Metatoxina Durmiente',
  powers: {
    role: 'El Intelecto Despierto',
    habilidades: [
      'Inyección de Comando: Activa de forma neumática la metatoxina para expandirse físicamente e hiperconectar su cerebro.',
      'Análisis Predictivo de Impacto: Calcula al instante los puntos de tensión del entorno y debilidades del enemigo para máxima destrucción.',
      'Supresión Física Industrial: Controla el espacio de combate usando ondas de choque y su colosal fuerza de impacto.'
    ],
    significa: 'El titán cerebral. Una mente brillante atrapada en un cuerpo de destrucción industrial que juega una guerra fría mental con su captor.',
    crisis: 'Purga química: Si se cortan o sabotean las mangueras de metatoxina, su sistema colapsa de inmediato volviendo al estado base.',
    stats: { fuerza: 11, inteligencia: 10, carisma: 8, suerte: 6, combate: 10, defensa: 10, especialVal: 10 }
  }
},
{
  id: 'apex',
  name: 'Apex',
  category: 'antagonistas',
  isSecondary: true,
  image: '/personajes/Antagonistas/Apex/Apex_sheet.webp',
  fullBody: '/personajes/Antagonistas/Apex/Apex_sheet.webp',
  altImage: '/personajes/Antagonistas/Apex/apex_alt.webp',
  color: '#475569',
  role: 'El Proyecto Estabilizado / Operativo de Gobierno',
  visualCode: 'Traje táctico de polímero gris militar, chaleco táctico ligero con arneses y fundas de armas, rostro descubierto con expresión fría',
  perfil: [
    'El agente definitivo: Creado por agencias secretas usando una muestra de la metatoxina confiscada a Phobos, refinada en la Fórmula Apex.',
    'Suero estabilizado: No causa deformidades físicas ni psicosis; se asimila a nivel celular para crear al soldado perfecto.',
    'Mente profesional: Corre por su sistema optimizando su tiempo de reacción, memoria muscular and procesamiento táctico de manera fría y profesional.'
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
  image: '/personajes/Antagonistas/Maker/Maker_sheet.webp',
  fullBody: '/personajes/Antagonistas/Maker/Maker_sheet.webp',
  altImage: '/personajes/Antagonistas/Maker/Maker_sheet_alt.webp',
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
