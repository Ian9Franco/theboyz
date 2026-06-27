import { CharacterDetail } from "./types";

export const locaciones: CharacterDetail[] = [
  {
    id: "dumbo_base",
    name: "Dumbo Base",
    category: "locaciones",
    isSecondary: true,
    image: "/personajes/Locaciones/Dumbo Base/DUMBO_BASE.webp",
    fullBody: "/personajes/Locaciones/Dumbo Base/DUMBO_BASE.webp",
    color: "#0ea5e9",
    role: "Refugio Subterráneo / Cuartel General",
    visualCode: "Paredes de ladrillo visto, pantallas holográficas, sillón rojo viejo, cables expuestos",
    perfil: [
      "El centro de operaciones clandestinas de Los Pibes, oculto en las alcantarillas de la ciudad.",
      "Equipada con servidores de alta capacidad hackeados, monitores de vigilancia y un área de descanso improvisada.",
      "Sirve como punto de reunión estratégico para planificar misiones en contra de los superhéroes corruptos."
    ],
    crisis: "Invasión de base: Si la ubicación de la base es comprometida por satélites de Vought o el Consejo de Matis, se perderá el único refugio seguro.",
    stats: {
      fuerza: 4,        // Recursos / Suministros
      inteligencia: 8,  // Tecnología / Comunicaciones
      carisma: 5,       // Confort / Habitabilidad
      suerte: 9,        // Sigilo / Ocultación
      combate: 3,       // Defensas / Armamento
      defensa: 7,       // Blindaje / Estructura
      especialVal: 8    // Energía / Soporte
    },
    especialLabel: "Energía",
    powers: {
      role: "Base de Operaciones",
      habilidades: [
        "Ocultamiento Electromagnético: Genera una firma fantasma que desvía los escaneos térmicos y satelitales.",
        "Red Descentralizada: Acceso a la dark web para interceptar comunicaciones de Vought o coordinar filtraciones.",
        "Taller de Ingeniería: Espacio para reparar trajes, vehículos y desarrollar dispositivos tácticos."
      ],
      significa: "El último bastión de la resistencia humana. Protege de la detección y permite el reabastecimiento táctico.",
      crisis: "Si la consola central sufre una sobrecarga o hackeo inverso, toda la red local quedará expuesta.",
      stats: {
        fuerza: 4,
        inteligencia: 8,
        carisma: 5,
        suerte: 9,
        combate: 3,
        defensa: 7,
        especialVal: 8
      }
    }
  }
];
