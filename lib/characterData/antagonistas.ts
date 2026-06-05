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
    id: 'krillor',
    name: 'Krillor',
    category: 'antagonistas',
    isSecondary: true,
    image: '/personajes/Antagonistas/Krillor/Krillor_ficha.webp',
    fullBody: '/personajes/Antagonistas/Krillor/Krillor_ficha.webp',
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
    id: 'azathos',
    name: 'Azathos',
    category: 'antagonistas',
    isSecondary: true,
    image: '/personajes/Antagonistas/Azathos/Azathos.webp',
    fullBody: '/personajes/Antagonistas/Azathos/Azathos.webp',
    altImage: '/personajes/Antagonistas/Azathos/Azathos_alt.webp',
    color: '#fca5a5',
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
  {
    id: 'balanar',
    name: 'Night Stalker',
    category: 'antagonistas',
    isSecondary: true,
    image: '/personajes/Antagonistas/Balanar/Night Stalker.webp',
    fullBody: '/personajes/Antagonistas/Balanar/Night Stalker.webp',
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
    id: 'lion',
    name: 'Lion',
    category: 'antagonistas',
    isSecondary: true,
    image: '/personajes/Antagonistas/Lion/Lion.webp',
    fullBody: '/personajes/Antagonistas/Lion/Lion.webp',
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
