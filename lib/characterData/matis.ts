import { CharacterDetail } from "./types";

export const matis: CharacterDetail[] = [
  {
    id: 'mati_prime',
    name: 'Mati Prime',
    category: 'matis',
    isSecondary: true,
    image: '/personajes/Consejo de matis/Mati Prime.webp',
    fullBody: '/personajes/Consejo de matis/Mati Prime.webp',
    color: '#4b5563',
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
    category: 'matis',
    isSecondary: true,
    image: '/personajes/Consejo de matis/Gladiador.webp',
    fullBody: '/personajes/Consejo de matis/Gladiador.webp',
    color: '#b45309',
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
      stats: { fuerza: 10, inteligencia: 6, carisma: 7, suerte: 8, combate: 10, defensa: 8, especialVal: 9 }
    }
  },
  {
    id: 'augusto',
    name: 'Mati Augusto',
    category: 'matis',
    isSecondary: true,
    image: '/personajes/Consejo de matis/Augusto.webp',
    fullBody: '/personajes/Consejo de matis/Augusto.webp',
    color: '#991b1b',
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
    category: 'matis',
    isSecondary: true,
    image: '/personajes/Consejo de matis/Warden.webp',
    fullBody: '/personajes/Consejo de matis/Warden.webp',
    color: '#6d28d9',
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
    id: 'astronauta',
    name: 'Mati Astronauta',
    category: 'matis',
    isSecondary: true,
    image: '/personajes/Fichas/matis/Mati Astronauta/Mati_Astronauta_sheet.png',
    fullBody: '/personajes/Fichas/matis/Mati Astronauta/Mati_Astronauta_sheet.png',
    color: '#1e1b4b',
    role: 'El Exiliado Orbital / Especialista Extradimensional',
    visualCode: 'Traje espacial negro dañado, luces orbitales tenues, casco con visor trizado',
    perfil: [
      'El desterrado: Variante proveniente de una línea temporal donde la humanidad alcanzó viajes interdimensionales, exiliada por negarse a drenar energía de universos vecinos.',
      'Especialista técnico: Experto en tecnología extradimensional, combate orbital y anomalías de variantes dentro del equipo de La Órbita Muerta.',
      'Traje de condena: Su armadura espacial dañada conserva la marca grabada en el núcleo del traje: "No pertenece a ningún cielo".'
    ],
    crisis: 'Desconexión de órbita: Su traje dañado sufre micro-desgarros dimensionales si se expone a fluctuaciones cuánticas inestables.',
    loreNote: 'Miembro de La Órbita Muerta. Starfall descubrió que su universo sobrevivía drenando energía de realidades vecinas. Al intentar exponerlo, fue exiliado y arrojado a una realidad ajena con su traje dañado.',
    stats: { fuerza: 6, inteligencia: 9, carisma: 6, suerte: 5, combate: 8, defensa: 7, especialVal: 9 },
    especialLabel: 'Orbital',
    powers: {
      role: 'Mati Variant',
      habilidades: [
        'Salto de Vacío: Realiza micro-teletransportaciones tácticas simulando caída libre orbital.',
        'Gravedad Cero: Altera el peso cinético de los objetos a su alrededor, desestabilizando al oponente.',
        'Núcleo Desterrado: Sobrecarga el reactor de su traje para emitir un pulso de energía extradimensional.'
      ],
      significa: 'Combatiente táctico espacial. Controla la gravedad local y realiza maniobras tridimensionales rápidas.',
      crisis: 'Falla del soporte vital: Usar el Núcleo Desterrado drena el oxígeno y la energía interna de su armadura.',
      stats: { fuerza: 7, inteligencia: 10, carisma: 7, suerte: 6, combate: 9, defensa: 8, especialVal: 10 }
    }
  }
];
