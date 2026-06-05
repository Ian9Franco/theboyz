import { CharacterDetail } from "./types";

export const voughtverse: CharacterDetail[] = [
  {
    id: 'julander',
    name: 'Julander',
    category: 'voughtverse',
    isSecondary: true,
    image: '/personajes/Voughtverse/Julander.webp',
    fullBody: '/personajes/Voughtverse/Julander.webp',
    color: '#2563eb',
    role: 'Homelander Inseguro / Vought',
    visualCode: 'Traje de spandex azul brillante, capa estrellada, sonrisa congelada',
    perfil: [
      'El súper corporativo: El Súper más poderoso y falso de la corporación. Usa el rostro de Julián pero con una sonrisa plástica de publicidad.',
      'Inseguridad extrema: Oculta una tremenda fragilidad ególatra bajo una coraza de invulnerabilidad física y marketing corporativo.',
      'Estilo patriótico: Traje brillante con barras rojas y blancas en la capa y hombreras doradas.'
    ],
    crisis: 'Crisis de atención: Si el público o los medios cuestionan su heroísmo, sufre ataques de pánico que desestabilizan su control de vuelo.',
    stats: { fuerza: 10, inteligencia: 4, carisma: 9, suerte: 5, combate: 8, defensa: 10, especialVal: 9 },
    especialLabel: 'Láser Celeste',
    powers: {
      role: 'Julián Variant',
      habilidades: [
        'Láser Ocular Azul: Emite devastadores rayos láser de color azul celeste capaces de fundir blindajes a kilómetros.',
        'Vuelo Supersónico: Navega la atmósfera a velocidades límites, rompiendo la barrera del sonido.',
        'Fuerza Colosal: Capacidad de levantar toneladas y desviar impactos de artillería con el pecho desnudo.'
      ],
      significa: 'La fuerza hegemónica corporativa. Arrasa con posiciones enemigas mediante fuerza bruta colosal e implacables láseres.',
      crisis: 'Dependencia de aprobación: Su poder se debilita si se siente rechazado o expuesto psicológicamente.',
      stats: { fuerza: 10, inteligencia: 5, carisma: 10, suerte: 6, combate: 9, defensa: 10, especialVal: 10 }
    }
  },
  {
    id: 'volvo_carnicero',
    name: 'Volvo Butcher',
    category: 'voughtverse',
    isSecondary: true,
    image: '/personajes/Voughtverse/Volvo Carnicero.webp',
    fullBody: '/personajes/Voughtverse/Volvo Carnicero.webp',
    color: '#78350f',
    role: 'Líder de la Resistencia / The Boys',
    visualCode: 'Gabardina larga de cuero marrón, barba desaliñada, cigarro',
    perfil: [
      'Líder clandestino: Comanda la resistencia contra los Súper de Vought. Viste una gabardina larga y posee una mirada desquiciada.',
      'Furia callejera: Combate mediante tácticas de guerrilla urbana, usando herramientas toscas y fuerza bruta desmedida.',
      'Estilo desaliñado: Barba prominente, camisa hawaiana bajo la gabardina y humo de cigarro constante.'
    ],
    crisis: 'Obsesión de venganza: Su odio ciego hacia los Súper lo lleva a ignorar los planes de escape, arriesgando la vida del grupo.',
    stats: { fuerza: 6, inteligencia: 8, carisma: 5, suerte: 4, combate: 8, defensa: 7, especialVal: 5 },
    especialLabel: 'Barreta',
    powers: {
      role: 'Volvo Variant',
      habilidades: [
        'V-Temporal: Se inyecta la sustancia corporativa para obtener fuerza y durabilidad mejoradas por breves períodos.',
        'Barreta de Plasma: Arma cuerpo a cuerpo que genera arcos eléctricos capaces de fracturar extremidades blindadas.',
        'Bláster de Tres Cañones: Pesado armamento a distancia diseñado por el Coleccionista que dispara metralla de plasma.'
      ],
      significa: 'El cazador de súper. Emplea fuerza física mejorada y tecnología modificada para destrozar la invulnerabilidad enemiga.',
      crisis: 'Contragolpe de V-Temporal: El uso del compuesto debilita su salud, causándole mareos e interferencias motoras tras la descarga.',
      stats: { fuerza: 8, inteligencia: 9, carisma: 6, suerte: 5, combate: 9, defensa: 8, especialVal: 8 }
    }
  },
  {
    id: 'a_uandi',
    name: 'A-Uandi',
    category: 'voughtverse',
    isSecondary: true,
    image: '/personajes/Voughtverse/A-Uandi.webp',
    fullBody: '/personajes/Voughtverse/A-Uandi.webp',
    color: '#1d4ed8',
    role: 'Velocista Corporativo / Vought',
    visualCode: 'Traje deportivo azul y blanco, gafas aerodinámicas, tatuajes de luz',
    perfil: [
      'Velocista estrella: El velocista oficial de la corporación. Posee una masa muscular masiva inusual para un corredor.',
      'Bola de demolición: Combina su masa de tanque con velocidad mach para embestir a sus objetivos.',
      'Estilo deportivo: Gafas de sol de alta velocidad y traje de spandex azul con líneas reflectantes.'
    ],
    crisis: 'Saturación cardíaca: La velocidad extrema desgasta su corazón modificado, causándole micro-infartos si excede el límite de velocidad.',
    stats: { fuerza: 8, inteligencia: 5, carisma: 7, suerte: 4, combate: 7, defensa: 8, especialVal: 8 },
    especialLabel: 'Velocidad Mach',
    powers: {
      role: 'Uandi Variant',
      habilidades: [
        'Supervelocidad Mach: Se desplaza a velocidad supersónica en línea recta, arrasando con el aire a su paso.',
        'Embiste de Impacto: Transforma su velocidad en inercia de demolición, destrozando cualquier barricada o vehículo.',
        'Fuerza Cinética: Absorbe la fricción del aire para potenciar la fuerza de sus golpes cuerpo a cuerpo.'
      ],
      significa: 'Tanque veloz de primera línea. Limpia el panel barriendo con enemigos mediante embestidas de inercia supersónica.',
      crisis: 'Pérdida de tracción: Su velocidad requiere trayectorias lineales y suelo estable; giros bruscos o trampas de hielo lo desestabilizan.',
      stats: { fuerza: 9, inteligencia: 6, carisma: 8, suerte: 5, combate: 8, defensa: 9, especialVal: 9 }
    }
  }
];
