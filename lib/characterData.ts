// ─── Character data & unlock logic ───────────────────────────────────────────
// Single source of truth — keep this file in sync with the /public/comics folder
export const CHARACTER_DETAILS = [
  {
    id: 'ian',
    name: 'Ian',
    image: '/personajes/CLOSEUP/IAN_FACE.webp',
    fullBody: '/personajes/FULLBODY/IAN.webp',
    altImage: '/personajes/ALT/IAN_ALT.webp',
    color: '#0d3a2b',
    role: 'Analista táctico / inventor estratégico',
    visualCode: 'buzo hoodie gris, lentes redondos',
    perfil: [
      'Inteligencia analítica alta pero desordenada (ve patrones en el ruido)',
      'Torpe en ejecución, pero letal leyendo el entorno, evita el combate directo',
      'Lealtad incondicional por defecto, con adicción al café filtrado',
    ],
    crisis: 'Se sobrecarga intentando anticipar cada variable física antes de actuar.',
    stats: { fuerza: 2, inteligencia: 6, carisma: 4, suerte: 5, combate: 2, defensa: 3, especialVal: 1 },
    especialLabel: 'Sistemas',
    powers: {
      role: 'Vesperwing',
      habilidades: [
        'Visión de Sistemas: Percibe patrones, relaciones y puntos críticos con precisión sobrehumana.',
        'Herramientas Ghost: GhostLens (análisis táctico) y Ghostwatch (centro de control y drones).',
        'Guanteletes y Vesper Frame: Impulsos cinéticos, exotraje modular y planeo asistido.',
        'Buscara el combate fisico.',
      ],
      significa: 'Cree que todo problema tiene una solución si se comprende el sistema detrás de él. Diseña sistemas tácticos completos.',
      crisis: 'Riesgo de obsesionarse con el control y convencerse de que sabe qué es lo mejor para todos (Vesper Frame).',
      stats: { fuerza: 5, inteligencia: 10, carisma: 8, suerte: 8, combate: 8, defensa: 7, especialVal: 10 },
    },
  },
  {
    id: 'jaz',
    name: 'Jaz',
    image: '/personajes/CLOSEUP/JAZ_FACE.webp',
    fullBody: '/personajes/FULLBODY/JAZ.webp',
    color: '#f5e642',
    role: 'Soporte defensivo / control de campo / enlace dimensional',
    visualCode: 'polera negra, pelo sunset-gold, lentes de gato',
    perfil: [
      'Capacidad de leer capas no físicas y frecuencias de la realidad',
      'Fuerte intuición espiritual y dependencia ritual (piedras y salvia)',
      'Estilo: Polera negra de cuello alto, calzas y cabello degradado sunset-gold',
    ],
    crisis: 'Tiende a desconectarse y entrar en trance en los momentos de mayor tensión.',
    stats: { fuerza: 1, inteligencia: 6, carisma: 5, suerte: 6, combate: 2, defensa: 2, especialVal: 2 },
    especialLabel: 'Aura-Anclaje',
    powers: {
      role: 'Oracle / Soporte Defensivo',
      habilidades: [
        'Geometría de Anclaje: Crea estructuras cristalinas de energía psíquica para escudos y barreras.',
        'Resonancia Emocional: Percibe emociones intensas e influye sutilmente en ellas.',
        'Vínculo Astral: Conecta mentalmente a sus aliados para compartir información y guiar la batalla.',
      ],
      significa: 'Crea estructuras psíquicas protectoras, apacigua emociones y conecta mentalmente al equipo.',
      crisis: 'Ruptura del Velo: Abre grietas inestables hacia otras dimensiones bajo estrés extremo.',
      stats: { fuerza: 5, inteligencia: 9, carisma: 9, suerte: 10, combate: 7, defensa: 10, especialVal: 10 },
    },
  },
  {
    id: 'julian',
    name: 'Julián',
    image: '/personajes/CLOSEUP/JULIAN_FACE.webp',
    fullBody: '/personajes/FULLBODY/JULIAN.webp',
    color: '#0a1128',
    role: 'Infiltración y engaño',
    visualCode: 'suéter azul marino, barba, pelo corto con fade',
    perfil: [
      'Mentiroso compulsivo funcional (usa el engaño como escudo táctico)',
      'Sarcástico por fuera, con alta ansiedad interna controlada',
      'Estilo: Suéter azul marino de cuello redondo, pantalón negro y barba corta',
    ],
    crisis: 'Oculta información crítica incluso bajo amenaza de muerte inminente.',
    stats: { fuerza: 3, inteligencia: 4, carisma: 6, suerte: 4, combate: 2, defensa: 2, especialVal: 0 },
    especialLabel: 'Duplicidad',
    // Unlocked after: Green Truck Ch.1
    hint: 'Terminá el Capítulo 1 de Green Truck para desbloquear.',
    powers: {
      role: 'Wildcard / Infiltración y Engaño',
      habilidades: [
        'Ecos de Presencia: Genera hasta tres duplicados semisólidos de sí mismo para interactuar y confundir.',
        'Punto Ciego: Altera la percepción de los rivales para que ignoren temporalmente su presencia.',
        'Verdad Innegable: Decir verdades absolutas interrumpe manipulaciones mentales y rompe ilusiones.',
      ],
      significa: 'El maestro del engaño y el sigilo, capaz de infiltrar defensas mediante clones y alterar la percepción.',
      crisis: 'El efecto de ocultación falla si demasiadas personas lo observan de manera simultánea.',
      stats: { fuerza: 7, inteligencia: 8, carisma: 9, suerte: 9, combate: 9, defensa: 7, especialVal: 9 },
    },
  },
  {
    id: 'mati',
    name: 'Mati',
    image: '/personajes/CLOSEUP/MATI_FACE.webp',
    fullBody: '/personajes/FULLBODY/MATI.webp',
    color: '#4c1d95',
    role: 'Controlador táctico / reposicionamiento',
    visualCode: 'piel bronceada, campera táctica, hoyuelos',
    perfil: [
      'Toma decisiones frías y extremas sin interferencia emocional',
      'Gran combatiente táctico y protector feroz de sus propios intereses',
      'Estilo: Campera bomber gris oscuro, remera verde oliva y hoyuelos marcados',
    ],
    crisis: 'Actúa de manera totalmente impredecible, priorizando el resultado sobre las vidas.',
    stats: { fuerza: 4, inteligencia: 6, carisma: 4, suerte: 3, combate: 4, defensa: 3, especialVal: 0 },
    especialLabel: 'Intercambio',
    // Unlocked after: Mativerse Ch.3 Worlds
    hint: 'Terminá el Capítulo 3 (Worlds) de Mativerse Part 1.',
    powers: {
      role: 'Swapfire / Controlador Táctico',
      habilidades: [
        'Intercambio Táctico: Intercambia posiciones de dos objetos o personas dentro de su rango de acción.',
        'Dagas de Marcado: Lanza dagas especiales que sirven como anclajes físicos para reubicarse.',
        'Reorganización del Campo: Reordena aliados o enemigos para crear ventajas tácticas inesperadas.',
      ],
      significa: 'Controla el flujo de la batalla intercambiando posiciones estratégicamente sin recurrir a fuerza bruta.',
      crisis: 'Restricciones de alcance, tamaño y masa del objetivo; requiere línea de visión directa.',
      stats: { fuerza: 9, inteligencia: 10, carisma: 8, suerte: 7, combate: 10, defensa: 9, especialVal: 10 },
    },
  },
  {
    id: 'uandi',
    name: 'Uandi',
    image: '/personajes/CLOSEUP/UANDI_FACE.webp',
    fullBody: '/personajes/FULLBODY/UANDI.webp',
    altImage: '/personajes/ALT/UANDI_ALT.webp',
    color: '#b91c1c',
    role: 'Tanque y protector',
    visualCode: 'remera técnica Kappa, lentes redondos, tatuaje manga izquierdo',
    perfil: [
      'Honestidad brutal e ingenua; protector rígido del equipo',
      'Cuerpo atlético con una compleja manga de tatuaje en el brazo izquierdo',
      'Estilo: Remera técnica ajustada de Kappa, pantalón cargo gris y lentes redondos',
    ],
    crisis: 'Se vuelve terco e inmóvil, cargando de frente contra todo peligro.',
    stats: { fuerza: 5, inteligencia: 3, carisma: 5, suerte: 3, combate: 3, defensa: 4, especialVal: 0 },
    especialLabel: 'Carga Cinética',
    // Unlocked after: Green Truck Ch.4 No Turning Back
    hint: 'Terminá el Capítulo 4 (No Turning Back) de Green Truck.',
    powers: {
      role: 'Aegis / La Batería Cinética',
      habilidades: [
        'Acumulación Cinética: Sus tatuajes absorben parte de la energía de los impactos físicos.',
        'Descarga de Fuerza: Libera energía acumulada en súper saltos, súper golpes u ondas de choque.',
        'Solidificación de Brazos: Puede transmutar sus extremidades en un metal indestructible.',
      ],
      significa: 'El escudo y ariete humano: disipa y almacena impactos para devolverlos con potencia sísmica.',
      crisis: 'La capacidad de almacenamiento es limitada; si se sobrecarga, los tatuajes se agrietan.',
      stats: { fuerza: 10, inteligencia: 6, carisma: 8, suerte: 7, combate: 9, defensa: 10, especialVal: 10 },
    },
  },
  {
    id: 'volvo',
    name: 'Volvo',
    image: '/personajes/CLOSEUP/VOLVO_FACE.webp',
    fullBody: '/personajes/FULLBODY/VOLVO.webp',
    color: '#f95700',
    role: 'Saboteador',
    visualCode: 'remera naranja, ojos celestes, cinturón táctico',
    perfil: [
      'Impulsivo, audaz y con baja reactividad emocional ante el peligro',
      'Hábito crónico de tocar y sabotear aparatos de alta tecnología',
      'Estilo: Remera naranja lisa, cinturón de cuero con cartucheras y ojos celestes intensos',
    ],
    crisis: 'Rompe planes enteros actuando por puro instinto antes de recibir órdenes.',
    stats: { fuerza: 3, inteligencia: 4, carisma: 2, suerte: 5, combate: 3, defensa: 2, especialVal: 1 },
    especialLabel: 'Disrupción',
    // Unlocked after: Mativerse Ch.3 Worlds
    hint: 'Terminá el Capítulo 3 (Worlds) de Mativerse Part 1.',
    powers: {
      role: 'Null-Vector / El Saboteador',
      habilidades: [
        'Interferencia: Altera sistemas electrónicos, redes, sensores y dispositivos de tecnología avanzada.',
        'Blink de Cortocircuito: Micro-teleportación instantánea de 5 a 8 metros usando conductividad.',
        'Sabotaje de Sistemas: Provoca fallos, desincronización y comportamientos inesperados en el hardware.',
      ],
      significa: 'Inhabilita la infraestructura y armas enemigas de base científica, desorganizando sus ventajas.',
      crisis: 'Necesita una ruta física o energética conectada para poder realizar sus desplazamientos.',
      stats: { fuerza: 7, inteligencia: 8, carisma: 5, suerte: 9, combate: 8, defensa: 8, especialVal: 9 },
    },
  },
  {
    id: 'sofi',
    name: 'Sofi',
    image: '/personajes/CLOSEUP/SOFI_FACE.webp',
    fullBody: '/personajes/FULLBODY/SOFI.webp',
    altImage: '/personajes/ALT/SOFI_ALT.webp',
    color: '#06b6d4',
    role: 'Reconocimiento avanzado / duelista táctica',
    visualCode: 'campera puffer tricolor rosa y borgoña, bufanda, rulos en rodete',
    perfil: [
      'Presencia dominante, audición hiperdesarrollada y alta capacidad física',
      'Terquedad extrema: no cambia de posición ni cede bajo presiones externas',
      'Estilo: Campera puffer con bloques rosa/borgoña, suéter crema, rodete de rulos oscuros',
    ],
    crisis: 'Se cierra en sus propias conclusiones y actúa de forma agresiva y unilateral.',
    stats: { fuerza: 4, inteligencia: 5, carisma: 6, suerte: 5, combate: 4, defensa: 3, especialVal: 1 },
    especialLabel: 'Eco-Rango',
    // Unlocked after: Mativerse Ch.2 Casino
    hint: 'Terminá el Capítulo 2 (Casino) de Mativerse Part 1.',
    powers: {
      role: 'Hush / La Vanguardia Acústica',
      habilidades: [
        'Mapa Resonante: Percibe vibraciones y cambios de presión en el aire para mapear el entorno en 3D.',
        'Katanas Resonantes: Canaliza y amplifica vibraciones sónicas y de impacto mediante sus espadas.',
        'Burbuja Silente: Genera una zona de silencio controlado ideal para infiltración y sigilo.',
      ],
      significa: 'Reconocimiento de amenazas detrás de muros y un letal estilo de combate evasivo basado en la vibración.',
      crisis: 'Sufre interferencias extremas si se expone a ambientes con ausencia total de vibraciones.',
      stats: { fuerza: 8, inteligencia: 8, carisma: 8, suerte: 8, combate: 9, defense: 9, especialVal: 9 },
    },
  },
  {
    id: 'matapobre',
    name: 'Matapobres',
    image: '/personajes/CLOSEUP/MATAPOBRES_FACE.webp',
    fullBody: '/personajes/FULLBODY/MATAPOBRES.webp',
    color: '#6b7280',
    isSecondary: true,
    role: 'Antiheroína / manipulación probabilidad',
    visualCode: 'pelo liso negro, remera halter blanca, rodilleras de protección',
    perfil: [
      'Mercenaria de información cínica, sarcástica y con moral flexible',
      'Cuerpo delgado con varios tatuajes pequeños (ojo en antebrazo, corazón en bicep)',
      'Estilo: Remera musculosa halter blanca, jeans azules con rodilleras de combate grises',
    ],
    crisis: 'Manipula situaciones a espaldas del grupo para asegurar su propio escape.',
    stats: { fuerza: 3, inteligencia: 6, carisma: 5, suerte: 6, combate: 3, defensa: 2, especialVal: 2 },
    especialLabel: 'Efecto Dominó',
    // Unlocked after: Mativerse Ch.3 Worlds
    hint: 'Terminá el Capítulo 3 (Worlds) de Mativerse Part 1.',
    powers: {
      role: 'Karma / La Variable Callejera',
      habilidades: [
        'Efecto Dominó: Altera la suerte para provocar accidentes ridículos y letales a enemigos.',
        'Lazos del Destino: Visualiza y altera hilos de probabilidad para forzar colisiones fortuitas.',
        'Inversión de Causalidad: Cuanto más planeado esté un ataque en su contra, más falla.',
      ],
      significa: 'La reina del caos fortuito: altera la probabilidad para que los planes enemigos les exploten en la cara.',
      crisis: 'Si intenta alterar algo extremadamente improbable, la mala suerte le rebota directo.',
      stats: { fuerza: 7, inteligencia: 10, carisma: 8, suerte: 10, combate: 8, defensa: 7, especialVal: 10 },
    },
  },
  {
    id: 'supertrucker',
    name: 'Super Camionero',
    image: '',
    fullBody: '',
    color: '#f97316',
    isSecondary: true,
    role: 'El Centinela del Asfalto / Supertrucker',
    visualCode: 'gorra cromada, capa de lona roja, faros xenón',
    perfil: [
      'Un superhéroe legendario e independiente obsesionado con el asfalto',
      'Conduce el gigantesco camión de combate semirremolque modificado',
      'Estilo: Capa de lona roja gruesa, gorra cromada y faros de luz azul xenón en su pecho',
    ],
    crisis: 'Sufre una pinchadura de llanta y se detiene obsesivamente a repararla en pleno combate.',
    stats: { fuerza: 8, inteligencia: 4, carisma: 6, suerte: 5, combate: 7, defensa: 8, especialVal: 8 },
    especialLabel: 'Embestida',
    // Unlocked after: Green Truck Ch.1
    hint: 'Terminá el Capítulo 1 de Green Truck para desbloquear.',
    powers: {
      role: 'Supertrucker / El Centinela del Asfalto',
      habilidades: [
        'Armadura de Cromo: Cuerpo forjado en metal cromado que absorbe calor y repele ataques.',
        'Llave de Plasma: Pesada llave cruz de plasma que corta vehículos militares enemigos.',
        'Mega-Transporter: Invoca un gigantesco camión semirremolque con cañones repulsores.',
      ],
      significa: 'Tanque pesado motorizado: invoca un camión semirremolque con cañones y embiste con fuerza descomunal.',
      crisis: 'La obsesión por el mantenimiento preventivo lo distrae ante tácticas psicológicas.',
      stats: { fuerza: 10, inteligencia: 5, carisma: 8, suerte: 7, combate: 9, defensa: 10, especialVal: 10 },
    },
  },
  {
    id: 'coleccionista',
    name: 'El Viejo Coleccionista',
    image: '',
    fullBody: '',
    color: '#8b5cf6',
    isSecondary: true,
    role: 'Proveedor tecnológico / The Tinkerer',
    visualCode: 'overol de mecánico con grasa cuántica, visor ocular multi-lente',
    perfil: [
      'Mentor silencioso que atiende la tienda Interdimensional Repairs',
      'Experto en rediseñar y modificar tecnologías alienígenas o dañadas',
      'Estilo: Overol de mecánico desgastado, visor ocular de cuatro lentes móviles',
    ],
    crisis: 'Se niega a cooperar si los pibes dañan o tratan con descuido sus piezas.',
    stats: { fuerza: 2, inteligencia: 8, carisma: 4, suerte: 6, combate: 1, defensa: 3, especialVal: 7 },
    especialLabel: 'Ingeniería',
    // Unlocked after: Green Truck Ch.4
    hint: 'Terminá el Capítulo 4 (No Turning Back) de Green Truck.',
    powers: {
      role: 'The Tinkerer / El Armero de las Dimensiones',
      habilidades: [
        'Manipulación de Código Físico: Entiende la ingeniería de cualquier objeto con solo mirarlo.',
        'Modificación Cuántica: Transmuta componentes comunes en portales portátiles estables.',
        'Ocular Analítico: Detecta vulnerabilidades y fallas estructurales invisibles al ojo humano.',
      ],
      significa: 'El armero dimensional: analiza y altera la materia cuántica para crear portales estables sobre la marcha.',
      crisis: 'Su visor sufre interferencia cuántica, dejándolo temporalmente ciego al espectro EM.',
      stats: { fuerza: 4, inteligencia: 10, carisma: 6, suerte: 8, combate: 3, defensa: 6, especialVal: 10 },
    },
  },
  {
    id: 'comandante',
    name: 'Comandante R.E.G.U.L.A.R.',
    image: '',
    fullBody: '',
    color: '#ef4444',
    isSecondary: true,
    role: 'Líder de los V.O.P.S. / Antagonista',
    visualCode: 'uniforme militar pesado blindado, visor de luz azul sólido',
    perfil: [
      'Jefe supremo de la fuerza de seguridad policial corrupta interdimensional',
      'Encargado de "limpiar" las anomalías multiversales que amenazan el statu quo',
      'Estilo: Blindaje táctico pesado con luces azules de estasis y modulador de voz',
    ],
    crisis: 'El exceso de protocolo lo paraliza cuando enfrenta tácticas puramente caóticas y absurdas.',
    stats: { fuerza: 6, inteligencia: 8, carisma: 5, suerte: 4, combate: 8, defensa: 9, especialVal: 7 },
    especialLabel: 'Estasis',
    // Unlocked after: Mativerse Ch.2 Casino
    hint: 'Terminá el Capítulo 2 (Casino) de Mativerse Part 1.',
    powers: {
      role: 'Líder Supremo de V.O.P.S.',
      habilidades: [
        'Red de Estasis: Dispara redes de energía azul que ralentizan las moléculas del objetivo.',
        'Escudo Gravedad: Escudo antidisturbios pesado que devuelve los disparos en ondas repulsoras.',
        'Fase Glitch: Su traje le permite atravesar paredes sólidas desmaterializándose temporalmente.',
      ],
      significa: 'Jefe táctico de control: inmoviliza amenazas con redes de estasis y atraviesa obstáculos desfasando su traje.',
      crisis: 'Cualquier fallo de red satelital o desorden no planificado deshabilita su escudo.',
      stats: { fuerza: 8, inteligencia: 9, carisma: 6, suerte: 5, combate: 10, defensa: 10, especialVal: 9 },
    },
  },
];

// ── Unlock rules (matched to actual chapter folder IDs after parsePrefix) ──────
// Folder: "#1 the-green-truck-chronicles" → id: "the-green-truck-chronicles"
// Folder: "#2 special chapter - the mysterious contact" → id: "special-chapter-the-mysterious-contact"
// Folder: "#3 sleeping-with-the-fishes" → id: "sleeping-with-the-fishes"
// Folder: "#4 no-turning-back" → id: "no-turning-back"
// Folder: "#1 The First Incursion" → id: "the-first-incursion"
// Folder: "#2 Casino" → id: "casino"
// Folder: "#3 Worlds" → id: "worlds"

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
};

export function getComputedCharacters(readChapters: string[], isClient: boolean, unlockAll: boolean = false) {
  const normalizedRead = readChapters.map(id => id.toLowerCase().trim());

  const hasRead = (chapterId: string) =>
    normalizedRead.includes(chapterId.toLowerCase().trim());

  return CHARACTER_DETAILS.map((char) => {
    // Before hydration, show all locked (avoids flash of unlocked content)
    if (!isClient) {
      const alwaysUnlocked = ['ian', 'jaz'].includes(char.id);
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
