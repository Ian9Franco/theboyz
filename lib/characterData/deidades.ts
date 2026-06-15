import { CharacterDetail } from "./types";

export const deidades: CharacterDetail[] = [
  {
    id: 'archon',
    name: 'ARCHON',
    category: 'deidades',
    isSecondary: true,
    image: '/personajes/Deidades/Archon/ARCHON.webp',
    fullBody: '/personajes/Deidades/Archon/ARCHON.webp',
    fichaImage: '/personajes/Deidades/Archon/Archon_ficha.webp',
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
    id: 'azathos',
    name: 'Azathos',
    category: 'deidades',
    isSecondary: true,
    image: '/personajes/Deidades/Azathos/Azathos.webp',
    fullBody: '/personajes/Deidades/Azathos/Azathos.webp',
    altImage: '/personajes/Deidades/Azathos/Azathos_alt.webp',
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
  id: 'lucifer',
  name: 'Lucifer Morningstar',
  category: 'deidades',
  isSecondary: true,
  image: '/personajes/Deidades/Lucifer/Lucifer.webp',
  fullBody: '/personajes/Deidades/Lucifer/Lucifer.webp',
  color: '#d97706',
  role: 'El Diablo Retirado / Dueño de Lux',
  visualCode: 'Traje italiano impecable, sonrisa encantadora, ojos demoníacos carmesí, alas angelicales blancas',
  perfil: [
    'Ex Señor del Infierno: Abandonó su trono infernal para vivir entre los humanos y dirigir Lux, el club nocturno más exclusivo de la ciudad.',
    'Consultor investigador: Colabora con agencias policiales resolviendo homicidios gracias a su intuición sobrenatural y su habilidad para leer deseos ocultos.',
    'Encanto irresistible: Carismático, elegante y provocador. Utiliza el humor, la seducción y la honestidad brutal como armas principales.'
  ],
  crisis: 'Vulnerabilidad emocional: Sus sentimientos hacia las personas que aprecia pueden afectar su juicio y volverlo menos efectivo en situaciones críticas.',
  stats: {
    fuerza: 8,
    inteligencia: 9,
    carisma: 10,
    suerte: 8,
    combate: 8,
    defensa: 9,
    especialVal: 10
  },
  especialLabel: 'Deseo',
  powers: {
    role: 'Lucifer Morningstar',
    habilidades: [
      '¿Qué es lo que realmente deseas?: Con una simple pregunta obliga a las personas a revelar su deseo más profundo y sincero.',
      'Rostro del Diablo: Revela su verdadera apariencia infernal, paralizando de terror incluso a criminales y entidades sobrenaturales.',
      'Alas Celestiales: Despliega sus enormes alas angelicales para volar, proteger aliados o atravesar grandes distancias instantáneamente.'
    ],
    significa: 'El amo del libre albedrío. No domina a las personas por la fuerza; las expone ante sus propias verdades y deseos ocultos.',
    crisis: 'Moralidad humana: Cuanto más se involucra emocionalmente con los mortales, más impredecibles se vuelven sus poderes y decisiones.',
    stats: {
      fuerza: 100,
      inteligencia: 100,
      carisma: 10,
      suerte: 100,
      combate: 100,
      defensa: 100,
      especialVal: 100
    }
  },

  extras: {
    vehiculo: 'Chevrolet Corvette C1 descapotable negro de colección.',
    negocio: 'Lux, un exclusivo club nocturno de lujo donde se reúne la élite, criminales, celebridades y seres sobrenaturales.',
    ocupacion: 'Consultor civil de investigaciones criminales, especializado en homicidios y casos imposibles.'
  }
},
  {
    id: 'mars',
    name: 'Mars',
    category: 'deidades',
    isSecondary: true,
    image: '/personajes/Deidades/Mars/Mars.webp',
    fullBody: '/personajes/Deidades/Mars/Mars.webp',
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
  }
];
