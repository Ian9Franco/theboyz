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
    category: 'antagonistas',
    isSecondary: true,
    image: '/personajes/Antagonistas/Glitch/Glitch.webp',
    fullBody: '/personajes/Antagonistas/Glitch/Glitch.webp',
    color: '#f43f5e',
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

];
