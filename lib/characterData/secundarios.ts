import { CharacterDetail } from "./types";

export const secundarios: CharacterDetail[] = [
  {
    id: 'matapobre',
    name: 'Matapobres',
    category: 'independientes',
    isSecondary: true,
    image: '/personajes/SECUNDARIOS/Independientes/Matapobres/Matapobres_ficha.webp',
    fullBody: '/personajes/SECUNDARIOS/Independientes/Matapobres/MATAPOBRES.webp',
    color: '#6b7280',
    role: 'Antiheroína / Karma',
    visualCode: 'Traje de piloto espacial, lentes de cazadora',
    perfil: [
      'Mercenaria de información: Cínica, sarcástica y con una flexibilidad moral supeditada a las circunstancias y al beneficio propio.',
      'Estilo de piloto: Traje de cuero sintético con parches militares, botas magnéticas y cigarrillo espacial.',
      'Lazos de probabilidad: Lentes de cazadora que proyectan hilos de energía gris plateada indicando los puntos de falla mecánica.'
    ],
    crisis: 'Prioridad de supervivencia: Ante un colapso, manipula la suerte para asegurar su propia ruta de escape, desentendiéndose del equipo.',
    stats: { fuerza: 3, inteligencia: 6, carisma: 5, suerte: 6, combate: 3, defensa: 2, especialVal: 2 },
    especialLabel: 'Efecto Dominó',
    hint: 'Terminá el Capítulo 3 (Worlds) de Mativerse Part 1.',
    powers: {
      role: 'Karma',
      habilidades: [
        'Distorsión de Probabilidad Arcana: Altera la probabilidad local de manera irónica, provocando fallas catastróficas en tecnología enemiga.',
        'Lazos del Destino: Percibe e interceptar los hilos de la probabilidad, forzando fallas o colisiones.',
        'Navegación del Caos: Transmuta el momentum de peligro en un escape fortuito.'
      ],
      significa: 'La variable del vacío. Domina el caos fortuito y sabotea los sistemas enemigos mediante mala suerte dirigida.',
      crisis: 'Rebote estocástico: Intentar forzar eventos de probabilidad nula genera un contragolpe de mala suerte sobre ella.',
      stats: { fuerza: 5, inteligencia: 8, carisma: 7, suerte: 10, combate: 6, defensa: 5, especialVal: 9 }
    }
  },
  {
    id: 'supertrucker',
    name: 'Supercamionero',
    category: 'independientes',
    isSecondary: true,
    image: '/personajes/SECUNDARIOS/Independientes/Supercamionero/Supercamionero_ficha.webp',
    fullBody: '/personajes/SECUNDARIOS/Independientes/Supercamionero/Supercamionero.webp',
    color: '#f97316',
    role: 'El Centinela del Asfalto',
    visualCode: 'Gorra cromada, capa de lona roja, faros xenón',
    perfil: [
      'Héroe legendario del asfalto: Una fuerza independiente y mítica obsesionada con el dominio, la física y las rutas terrestres.',
      'Piloto de vanguardia: Conduce un titánico camión de combate semirremolque modificado con ingeniería balística avanzada.',
      'Estilo de pesada herencia: Capa de lona roja gruesa impermeable, gorra cromada de alta resistencia y faros de luz azul xenón.'
    ],
    crisis: 'Fijación de mantenimiento: Ante cualquier daño menor en sus sistemas mecánicos, prioriza la reparación preventiva sobre la amenaza.',
    stats: { fuerza: 8, inteligencia: 4, carisma: 6, suerte: 5, combate: 7, defensa: 8, especialVal: 8 },
    especialLabel: 'Embestida',
    hint: 'Terminá el Capítulo 1 de Green Truck para desbloquear.',
    powers: {
      role: 'Supertrucker',
      habilidades: [
        'Armadura de Cromo: Cuerpo forjado en una aleación metálica cromada que disipa el calor y repele impactos balísticos pesados.',
        'Llave de Plasma Cruzada: Pesada herramienta táctica de energía ionizada capaz de cortar blindajes y estructuras vehiculares.',
        'Mega-Transporter: Invoca un gigantesco camión semirremolque de combate equipado con cañones de repulsión cinética.'
      ],
      significa: 'Tanque pesado motorizado. Su propósito es la demolición absoluta y el control de carril mediante embestidas.',
      crisis: 'Rigidez operativa: Su enfoque lineal lo vuelve vulnerable ante distorsiones cognitivas e ilusiones.',
      stats: { fuerza: 10, inteligencia: 5, carisma: 8, suerte: 7, combate: 9, defensa: 10, especialVal: 10 }
    }
  },
  {
    id: 'coleccionista',
    name: 'El Viejo Coleccionista',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/SECUNDARIOS/Tinkerer/The Tinkerer.webp',
    fullBody: '/personajes/SECUNDARIOS/Tinkerer/The Tinkerer.webp',
    color: '#8b5cf6',
    role: 'Proveedor tecnológico / The Tinkerer',
    visualCode: 'Overol de mecánico con grasa arcana, visor ocular multi-lente',
    perfil: [
      'Mentor silencioso y huraño: Atiende el taller "Interdimensional Repairs", actuando como el nexo logístico de los pibes en el multiverso.',
      'Ingeniero de desguace: Un experto absoluto en rediseñar, hibridar y estabilizar tecnologías y componentes arcanos dañados.',
      'Estilo de taller arcano: Overol de mecánico desgastado y visor ocular de cuatro lentes móviles que proyectan planos en azul holográfico.'
    ],
    crisis: 'Recelo profesional: Si los pibes tratan con descuido las piezas de su inventario, se rehúsa a cooperar o proveer armamento.',
    stats: { fuerza: 2, inteligencia: 8, carisma: 4, suerte: 6, combate: 1, defensa: 3, especialVal: 7 },
    especialLabel: 'Ingeniería',
    hint: 'Terminá el Capítulo 4 (No Turning Back) de Green Truck.',
    powers: {
      role: 'The Tinkerer',
      habilidades: [
        'Análisis de Código Físico: Percepción analítica intuitiva que le permite descifrar el funcionamiento y planos de cualquier artefacto.',
        'Modificación Arcana: Transmuta componentes comunes y chatarra tecnológica en portales estables o celdas de energía.',
        'Ocular Multiespectral: Visor que detecta vulnerabilidades atómicas, fugas de energía y fallas estructurales invisibles.'
      ],
      significa: 'El armero de las dimensiones. Altera y refina la materia arcana para generar recursos logísticos e infraestructura.',
      crisis: 'Saturación del espectro: El uso continuo de su visor lo expone a sufrir interferencias arcanas severas, bloqueando su lectura.',
      stats: { fuerza: 4, inteligencia: 10, carisma: 6, suerte: 8, combate: 3, defensa: 6, especialVal: 10 }
    }
  },
  {
    id: 'rylai',
    name: 'Crystal Maiden',
    category: 'taberna_resistencia',
    isSecondary: true,
    image: '/personajes/SECUNDARIOS/Taberna de la resistencia/Rylai/Rylai.webp',
    fullBody: '/personajes/SECUNDARIOS/Taberna de la resistencia/Rylai/Rylai.webp',
    color: '#3b82f6',
    role: 'La Canalizadora de la Tormenta',
    visualCode: 'Capa azul ártico con piel blanca, bastón místico con gema de hielo',
    perfil: [
      'Control del frío: Joven decidida que canaliza la magia de la escarcha. Sus pasos dejan huellas de hielo sobre el asfalto urbano.',
      'El ancla del equipo de taberna: Hermana menor para Tusk, a quien tranquiliza mediante brisas heladas cuando se nubla por la adrenalina.',
      'Estilo invernal: Capa de azul ártico con bordes de piel blanca y detalles de cristales en los hombros.'
    ],
    crisis: 'Vulnerabilidad física: Su magia requiere canalización estática, lo que la vuelve un blanco fácil si logran flanquear sus defensas de hielo.',
    stats: { fuerza: 2, inteligencia: 7, carisma: 8, suerte: 6, combate: 4, defensa: 5, especialVal: 8 },
    especialLabel: 'Congelación',
    powers: {
      role: 'Crystal Maiden',
      habilidades: [
        'Frostbite: Encierra a un enemigo en un bloque de hielo sólido, impidiendo su movimiento y causándole daño por frío extremo.',
        'Crystal Nova: Crea una explosión de escarcha que ralentiza a múltiples enemigos en el área de impacto.',
        'Freezing Field: Canaliza una masiva tormenta de nieve que congela el panel y ralentiza todo a su alrededor.'
      ],
      significa: 'Control de masas y soporte elemental. Congela el terreno de combate para limitar la movilidad de las amenazas.',
      crisis: 'Interrupción mágica: Cualquier aturdimiento físico o interrupción interrumpe su canalización, disipando la tormenta.',
      stats: { fuerza: 4, inteligencia: 9, carisma: 9, suerte: 7, combate: 5, defensa: 6, especialVal: 10 }
    }
  },
  {
    id: 'bristleback',
    name: 'Bristleback',
    category: 'independientes',
    isSecondary: true,
    image: '/personajes/SECUNDARIOS/Independientes/Bristleback/Bristleback.webp',
    fullBody: '/personajes/SECUNDARIOS/Independientes/Bristleback/Bristleback.webp',
    color: '#15803d',
    role: 'El Matón de Callejón',
    visualCode: 'Chaleco vaquero sin mangas, aro en la nariz, lomo de espinas biomecánicas',
    perfil: [
      'Matón pendenciero: Puercoespín humanoide inspirado en los hooligans de callejón, con acento británico y cicatrices en el rostro.',
      'Vínculo de hermandad: Compañero de taberna de Tusk. El primero en romper botellas si amenazan a sus aliados.',
      'Lomo biomecánico: Espinas que brillan con fluido verde tóxico y vibran al recibir impactos.'
    ],
    crisis: 'Furia ciega: Si es insultado o desafiado, pierde el control y ataca de espaldas para forzar su defensa pasiva, ignorando órdenes tácticas.',
    stats: { fuerza: 7, inteligencia: 3, carisma: 4, suerte: 5, combate: 6, defensa: 7, especialVal: 6 },
    especialLabel: 'Espinas',
    powers: {
      role: 'Rigwarl',
      habilidades: [
        'Viscous Nasal Goo: Cubre al enemigo con moco pegajoso y ácido, reduciendo su armadura y velocidad de movimiento.',
        'Quill Spray: Dispara ráfagas de espinas desde su lomo, infligiendo daño que se acumula con cada golpe sucesivo.',
        'Bristleback (Lomo de Acero): Reduce pasivamente el daño recibido por la espalda y los costados, disparando Quill Spray de forma automática.'
      ],
      significa: 'Tanque dispersor. Se planta en el centro de la pelea atrayendo fuego para saturar el entorno de púas y metralla orgánica.',
      crisis: 'Ataques directos: Su reducción de daño no aplica a ataques frontales de precisión, quedando expuesto si es inmovilizado de cara al enemigo.',
      stats: { fuerza: 9, inteligencia: 4, carisma: 5, suerte: 6, combate: 8, defensa: 10, especialVal: 8 }
    }
  },
  {
    id: 'invoker',
    name: 'Invoker',
    category: 'independientes',
    isSecondary: true,
    image: '/personajes/SECUNDARIOS/Independientes/Invoker/Invoker.webp',
    fullBody: '/personajes/SECUNDARIOS/Independientes/Invoker/Invoker.webp',
    color: '#d97706',
    role: 'El Mago del Arsenal',
    visualCode: 'Cabello blanco ingrávido, capa-gabardina marfil, orbes de energía',
    perfil: [
      'Elegancia inmortal: Flota a centímetros del asfalto. Muestra una actitud fría y aristocrática en medio del caos de la metrópoli.',
      'Mente enciclopédica: Memoriza fórmulas arcanas antiguas y las combina a velocidad luz en orbes de Quas, Wex y Exort.',
      'Estilo majestuoso: Gabardina de cuello alto color marfil y bordes dorados que levita sola alrededor de su cuerpo.'
    ],
    crisis: 'Complejo de superioridad: Considera a los humanos tan inferiores que se niega a usar hechizos defensivos básicos, prefiriendo la espectacularidad.',
    stats: { fuerza: 3, inteligencia: 10, carisma: 7, suerte: 5, combate: 7, defensa: 4, especialVal: 9 },
    especialLabel: 'Invocación',
    powers: {
      role: 'Kael',
      habilidades: [
        'Tornado: Despliega una corriente de viento Wex-Quas que levanta a los enemigos del panel y los suspende en el aire.',
        'Chaos Meteor: Invoca un meteorito incandescente cargado de Exort que rueda arrasando el campo y quemando a su paso.',
        'Deafening Blast: Emite una onda sónica de energía combinada que inflige daño, empuja y desarma temporalmente a los oponentes.'
      ],
      significa: 'Artillería mágica omnidireccional. Combina orbes elementales para conjurar soluciones destructivas adaptadas a la situación.',
      crisis: 'Saturación mental: Si el orden de conjuración falla por milisegundos, el hechizo se disipa y bloquea su invocación temporalmente.',
      stats: { fuerza: 5, inteligencia: 10, carisma: 8, suerte: 6, combate: 9, defensa: 6, especialVal: 10 }
    }
  },
  {
    id: 'ymir',
    name: 'Tusk',
    category: 'taberna_resistencia',
    isSecondary: true,
    image: '/personajes/SECUNDARIOS/Taberna de la resistencia/Ymir/Tusk.webp',
    fullBody: '/personajes/SECUNDARIOS/Taberna de la resistencia/Ymir/Tusk.webp',
    color: '#0284c7',
    role: 'El Boxeador del Norte',
    visualCode: 'Morsa robusta, chaleco con piel de oso, guantelete de hielo eterno',
    perfil: [
      'Boxeador del norte: Morsa gigante de bigote denso y parche en el ojo, con un entusiasmo contagioso por las peleas de bar.',
      'Protector de Rylai: Sumamente sobreprotector con Crystal Maiden, a quien trata como su hermana menor y defiende ferozmente.',
      'Guantelete helado: Mano derecha equipada con un guantelete metálico que acumula escarcha azul y energía cinética.'
    ],
    crisis: 'Temeridad de taberna: Su amor por el espectáculo lo empuja a rodar en bolas de nieve directo hacia posiciones enemigas fortificadas.',
    stats: { fuerza: 8, inteligencia: 4, carisma: 8, suerte: 6, combate: 7, defensa: 6, especialVal: 7 },
    especialLabel: 'Walrus Punch',
    powers: {
      role: 'Ymir',
      habilidades: [
        'Walrus PUNCH!: Un golpe devastador cargado de hielo que lanza al enemigo por los aires con onomatopeyas congeladas en escena.',
        'Snowball: Se envuelve junto a sus aliados cercanos en una gigantesca bola de nieve rodante que atropella todo a su paso.',
        'Ice Shards: Lanza fragmentos de hielo comprimido que se despliegan en una barrera física semicircular, atrapando al rival.'
      ],
      significa: 'Iniciador y luchador cuerpo a cuerpo. Desestabiliza las líneas enemigas mediante embestidas heladas y golpes críticos.',
      crisis: 'Exposición post-golpe: Tras descargar su Walrus Punch, el guantelete requiere enfriamiento térmico, reduciendo su defensa física.',
      stats: { fuerza: 10, inteligencia: 5, carisma: 9, suerte: 7, combate: 9, defensa: 8, especialVal: 10 }
    }
  },
  {
    id: 'kenji',
    name: 'Kenji Sato',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/SECUNDARIOS/Kenji/Kenji.webp',
    fullBody: '/personajes/SECUNDARIOS/Kenji/Kenji.webp',
    color: '#c2410c',
    role: 'Cocinero Tradicional / Soporte Emocional',
    visualCode: 'Delantal de lona azul, vincha Hachimaki azul oscuro, mirada cansada pero cálida',
    perfil: [
      'Cocinero de callejón: Dueño de Sato\'s Ramen, un pequeño y acogedor local de fideos ubicado en las profundidades de Neo-Tokio.',
      'Mentor y ancla: Ofrece cobijo, comida y consejos de vida a Sofi, sirviendo como su soporte emocional y conexión humana.',
      'Espíritu zen: Mantiene un pequeño jardín de bambú y arce donde reina el silencio absoluto que Sofi necesita.'
    ],
    crisis: 'Temeridad obstinada: Su rigidez ética y lealtad le impiden someterse a la extorsión de las mafias, prefiriendo resistir de pie.',
    stats: { fuerza: 3, inteligencia: 6, carisma: 7, suerte: 5, combate: 3, defensa: 4, especialVal: 1 },
    especialLabel: 'Refugio',
    hint: 'Desbloqueado desde el inicio de la historia de Tokio.',
    powers: {
      role: 'Kenji Sato',
      habilidades: [
        'Tazón de Calidez: Prepara cuencos humeantes de ramen que restauran la energía psíquica y física de sus aliados.',
        'Machete de Jardín: Utiliza una herramienta de corte larga para el cuidado de su patio, utilizable en defensa desesperada.',
        'Advertencia Táctica: Revela información local y dinámicas urbanas del Clan Kurogane para guiar a los héroes.'
      ],
      significa: 'El cable a tierra del equipo. Su ramen y sabiduría proveen un descanso vital para aliviar el trauma y recargar fuerzas.',
      crisis: 'Muerte del mentor: Su deceso a manos del Clan Kurogane marca un punto sin retorno, forzando el despertar total de Dusk.',
      stats: { fuerza: 4, inteligencia: 7, carisma: 8, suerte: 6, combate: 4, defensa: 5, especialVal: 5 }
    }
  },
  {
    id: 'magnus',
    name: 'Magnus',
    category: 'independientes',
    isSecondary: true,
    image: '/personajes/SECUNDARIOS/Independientes/Magnus/magnus_ficha.webp',
    fullBody: '/personajes/SECUNDARIOS/Independientes/Magnus/magnus.webp',
    color: '#991b1b',
    role: 'El Señor del Metal / Antihéroe Pragomático',
    visualCode: 'Elegante gabardina/capa negra con forro carmesí oscuro, casco magnético estilizado y acorazado, cabello y barba canosos',
    perfil: [
      'Superviviente del sistema: Descubrió cómo manipular los campos magnéticos de la Tierra tras sufrir experimentos corporativos.',
      'Antihéroe pragmático: Detesta el monopolio corporativo de Don Vanguard y considera a Phobos un demente peligroso.',
      'Aliado por conveniencia: Ayuda a los chicos únicamente cuando sus objetivos se alinean para erradicar el control institucional.'
    ],
    crisis: 'Invalidez magnética: En entornos sin materiales ferrosos o campos magnéticos naturales, su capacidad ofensiva se reduce.',
    stats: { fuerza: 6, inteligencia: 8, carisma: 8, suerte: 5, combate: 8, defensa: 8, especialVal: 9 },
    especialLabel: 'Magnetismo Alfa',
    powers: {
      role: 'El Señor del Metal',
      habilidades: [
        'Control Magnético: Manipula aleaciones metálicas a gran escala, arrancando vigas de edificios, desviando balas o aplastando tanques.',
        'Escudo de Inducción: Genera un campo de fuerza electromagnético personal que detiene proyectiles y deforma ataques de energía.',
        'Casco Acorazado: Yelmo metálico especial diseñado específicamente para anular ataques y lecturas psíquicas.'
      ],
      significa: 'El veterano del magnetismo. Un antihéroe que dobla el metal y los campos magnéticos para proteger a los suyos.',
      crisis: 'Aislamiento de Metal: En entornos completamente desprovistos de materiales ferrosos u orgánicos con magnetismo, su poder ofensivo disminuye drásticamente.',
      stats: { fuerza: 7, inteligencia: 9, carisma: 9, suerte: 6, combate: 9, defensa: 10, especialVal: 10 }
    }
  },
  {
    id: 'valery',
    name: 'Valery',
    category: 'independientes',
    isSecondary: true,
    image: '/personajes/SECUNDARIOS/Valery/Valery_ficha.webp',
    fullBody: '/personajes/SECUNDARIOS/Valery/Valery.webp',
    color: '#1e1b4b',
    role: 'Bruja de la Tinta Primordial / Antiheroína',
    visualCode: 'Grimorio antiguo de cuero oscuro, vestido midi bohemio, lentes de carey',
    perfil: [
      'Erudita y Alquimista: Saboteó los laboratorios reales para absorber la Tinta Viva en su cuerpo, encadenando su mente a un grimorio oscuro.',
      'Forma Monocromática: Al desatar el libro, la Tinta Viva devora la luz y el color de su entorno, transformándola en una ilustración de alto contraste.',
      'Atracción en la Sombra: Mantiene una tensión intelectual y física secreta con Vesper, mofándose de su brújula moral e intento de ser un héroe.'
    ],
    crisis: 'Vínculo del Libro: Si el grimorio es cerrado, destruido o separado de ella, la Tinta Viva se disuelve y pierde sus defensas y poder mágico.',
    stats: { fuerza: 5, inteligencia: 10, carisma: 9, suerte: 5, combate: 8, defensa: 8, especialVal: 10 },
    especialLabel: 'Pacto del Grimorio',
    powers: {
      role: 'Soberana de la Tinta',
      habilidades: [
        'Calamar de Sombras: Lanza espinas y látigos rígidos de tinta de obsidiana desde sus manos o páginas del grimorio.',
        'Paso de Ceniza y Tinta: Se disuelve en un charco de líquido oscuro para deslizarse por las sombras antes de materializarse.',
        'Unción Prohibida: Recubre las runas de Vesper con Tinta Viva, catalizando su magia en un poder devastador.'
      ],
      significa: 'Hechicera de Control y Vanguardia Líquida. Absorbe la esencia mágica de seres caídos y controla el campo con fluidos oscuros.',
      crisis: 'Consumo Vital: La Tinta Viva se alimenta de su propia fuerza vital, debilitando su cuerpo físico si se usa por tiempo prolongado.',
      stats: { fuerza: 8, inteligencia: 10, carisma: 9, suerte: 5, combate: 8, defensa: 8, especialVal: 10 }
    }
  },
  {
    id: 'aurelia',
    name: 'Aurelia Veyr',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/Fichas/Secundarios/Aurelia Veyr/Aurelia Veyr_sheet.png',
    fullBody: '/personajes/Fichas/Secundarios/Aurelia Veyr/Aurelia Veyr_sheet.png',
    color: '#cbd5e1',
    role: 'La Cartógrafa Blanca / Astrónoma del Fin',
    visualCode: 'Túnica blanca, marcas de mapas estelares biológicos en la piel, bastón de navegación estelar',
    perfil: [
      'La última Elyndari: Su planeta natal, Elyndra, fue removido de la realidad, convirtiéndola en el último mapa vivo de su mundo.',
      'Cartógrafa estelar: Capaz de leer rutas cósmicas imposibles, corredores gravitacionales y órbitas fantasma.',
      'Ancla de realidad: Su cuerpo y bastón biológico conservan las coordenadas de lugares borrados del mapa estelar.'
    ],
    crisis: 'Remembranza dolorosa: Intentar manifestar coordenadas de Elyndra le genera una intensa disonancia cognitiva y fatiga física.',
    loreNote: 'Miembro de La Órbita Muerta. Aurelia pertenece a los Elyndari, especie que cartografiaba y conectaba mundos. Su planeta natal Elyndra fue "removido" de la realidad por una fuerza desconocida. Ella es el último mapa vivo de un mundo que nadie recuerda.',
    stats: { fuerza: 4, inteligencia: 9, carisma: 8, suerte: 6, combate: 5, defensa: 6, especialVal: 9 },
    especialLabel: 'Navegación',
    powers: {
      role: 'Cartógrafa Astral',
      habilidades: [
        'Bastón de Elyndra: Fija coordenadas espaciales estables para abrir mapas holográficos y detectar caminos ocultos.',
        'Lectura de Rutas: Detecta fluctuaciones dimensionales y percibe cuando una realidad local ha sido manipulada.',
        'Sello de Brechas: Cierra pequeñas fisuras dimensionales canalizando la energía de mapas estelares antiguos.'
      ],
      significa: 'La navegante de la realidad. Abre y cierra accesos interdimensionales guiando al grupo por caminos seguros.',
      crisis: 'Disonancia de mapa: Si la realidad física difiere demasiado de sus coordenadas estelares, su orientación colapsa.',
      stats: { fuerza: 5, inteligencia: 10, carisma: 9, suerte: 7, combate: 6, defensa: 7, especialVal: 10 }
    }
  },
  {
    id: 'john_wick',
    name: 'John Wick',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/Fichas/Secundarios/John Wick/John Wick_sheet.jpeg',
    fullBody: '/personajes/Fichas/Secundarios/John Wick/John Wick_sheet.jpeg',
    color: '#1c1917',
    role: 'El Diurno / Baba Yaga',
    visualCode: 'Traje negro a medida, mirada implacable, estaca táctica de plata, espada corta Luto',
    perfil: [
      'Dhampir por traición: Sometido a una conversión fallida por la Mesa Carmesí (red de casas vampíricas de la Mesa Alta), quedó atrapado entre la vida y la muerte.',
      'Depredador de la noche: Caza vampiros impulsado por una disciplina inquebrantable y el deseo de vengar su humanidad perdida.',
      'Eficacia letal: Combina técnicas de combate profesional humano con reflejos, fuerza y sentidos vampíricos aumentados.'
    ],
    crisis: 'Sed de sangre: Luchar contra su propia naturaleza dhampir consume su autocontrol si se expone a heridas sagradas o plata.',
    loreNote: 'Conocido como Baba Yaga y temido en el mundo oculto como El Diurno, John Wick fue traicionado por la Mesa Carmesí. Quedó transformado en un dhampir con fuerza y regeneración aumentadas, pero todavía dueño de su voluntad. Ahora caza vampiros buscando cobrar con sangre.',
    stats: { fuerza: 7, inteligencia: 8, carisma: 6, suerte: 5, combate: 10, defensa: 8, especialVal: 8 },
    especialLabel: 'Baba Yaga',
    powers: {
      role: 'Diurno',
      habilidades: [
        'Estaca Táctica: Ataques quirúrgicos a puntos vitales usando una estaca plegable de aleación de plata.',
        'Tiro Profesional: Uso letal de armas de fuego con munición de plata, UV e incendiaria contra nidos vampíricos.',
        'Reflejos Dhampir: Esquiva y contraataca a velocidades sobrehumanas sin perder su enfoque táctico limpio.'
      ],
      significa: 'El ejecutor de la noche. Limpia salones de enemigos mediante fuerza híbrida y precisión balística absoluta.',
      crisis: 'Agotamiento híbrido: La exposición prolongada a la luz solar o heridas purificadoras debilita su regeneración.',
      stats: { fuerza: 9, inteligencia: 9, carisma: 7, suerte: 6, combate: 10, defensa: 9, especialVal: 9 }
    }
  },
  {
    id: 'lucian',
    name: 'Lucian Graves',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/Fichas/Secundarios/Lucian Graves/Lucian Graves_sheet.png',
    fullBody: '/personajes/Fichas/Secundarios/Lucian Graves/Lucian Graves_sheet.png',
    color: '#292524',
    role: 'El Exorcista Maldito / Abogado del Desastre',
    visualCode: 'Gabardina gastada, cigarrillo encendido, Fósforo de San Judas, bolsa de reliquias robadas',
    perfil: [
      'Condenado al Infierno: Su alma pertenece a Malphas el Contador tras despertar a una entidad con un grimorio antiguo.',
      'Visión del más allá: Puede ver de forma innata posesiones, pecados adheridos al cuerpo y demonios camuflados.',
      'Embaucador astuto: Utiliza la "Mentira Santa" y reliquias robadas para engañar y disolver pactos demoníacos.'
    ],
    crisis: 'Plazo de cobro: Malphas y sus cobradores acechan constantemente, obligándolo a gastar energía para evitar su descenso.',
    loreNote: 'Un ocultista y exorcista maldito de Saint Marrow condenado al Infierno. Graves sobrevive resolviendo casos sobrenaturales mientras navega una red de pactos y figuras infernales que lo odian y lo necesitan, usando el Fósforo de San Judas y su bolsa de reliquias robadas.',
    stats: { fuerza: 3, inteligencia: 9, carisma: 7, suerte: 5, combate: 6, defensa: 5, especialVal: 8 },
    especialLabel: 'Exorcismo',
    powers: {
      role: 'Ocultista',
      habilidades: [
        'Fósforo de San Judas: Enciende y activa sigilos, sal negra o papel con nombres verdaderos para repeler entidades.',
        'Mentira Santa: Negocia o confunde a demonios usando verdades a medias, alterando las reglas de sus contratos.',
        'Bolsa de Recursos: Extrae reliquias consagradas o malditas (como agua bendita robada o sal negra) para defensa.'
      ],
      significa: 'El negociador maldito. Desactiva ventajas demoníacas y manipula las reglas del combate místico.',
      crisis: 'Límite contractual: Forzar la Mentira Santa puede alertar a Malphas, acelerando el cobro de su deuda.',
      stats: { fuerza: 5, inteligencia: 10, carisma: 8, suerte: 6, combate: 8, defensa: 7, especialVal: 10 }
    }
  },
  {
    id: 'mando',
    name: 'Mando',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/Fichas/Secundarios/Mando/Mando_sheet.png',
    fullBody: '/personajes/Fichas/Secundarios/Mando/Mando_sheet.png',
    color: '#334155',
    role: 'El Errante del Polvo / Cazador de Órbitas Muertas',
    visualCode: 'Armadura de combate abollada, casco con tres ranuras azules Ghostline, capa de camuflaje térmico',
    perfil: [
      'Sobreviviente de Veyra-9: Ex-soldado colonial cuya unidad y memoria fueron borradas tras un desastre de horror cósmico.',
      'Rastreador implacable: Caza recompensas en la frontera espacial buscando la señal que causó la masacre de su escuadrón.',
      'Disciplina militar: Silencioso, seco y metódico. Carga en su capa fragmentos de los uniformes de sus caídos.'
    ],
    crisis: 'Fantasmas de Ghostline: Su visor táctico muestra ecos térmicos del pasado, distorsionando su enfoque en combate.',
    loreNote: 'Miembro de La Órbita Muerta. Antiguo soldado colonial sobreviviente de Veyra-9, donde su escuadrón y una colonia entera desaparecieron tras una señal cósmica. Acepta contratos mientras rastrea pistas sobre el origen de la señal a bordo de su nave, El Cuervo de Veyra.',
    stats: { fuerza: 8, inteligencia: 7, carisma: 5, suerte: 6, combate: 9, defensa: 8, especialVal: 7 },
    especialLabel: 'Ghostline',
    powers: {
      role: 'Cazarecompensas',
      habilidades: [
        'Rastreo Ghostline: Lee trazas de calor, energía arcana y motores espaciales para predecir movimientos.',
        'Manto de Supervivencia: Capa de camuflaje térmico que absorbe radiación e interrumpe sensores enemigos.',
        'Arsenal de Frontera: Emplea rifles pesados, ganchos de anclaje y explosivos tácticos con eficiencia de soldado.'
      ],
      significa: 'El soldado de asalto. Rastrea objetivos invisibles y resiste daños masivos gracias a su blindaje.',
      crisis: 'Obsesión de rastro: Si la señal Ghostline coincide con Veyra-9, ignora amenazas para seguir el origen.',
      stats: { fuerza: 9, inteligencia: 8, carisma: 6, suerte: 7, combate: 10, defensa: 9, especialVal: 8 }
    }
  },
  {
    id: 'vexa',
    name: 'Vexa Ruun',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/Fichas/Secundarios/Vexa Ruun/Vexa Ruun_sheet.png',
    fullBody: '/personajes/Fichas/Secundarios/Vexa Ruun/Vexa Ruun_sheet.png',
    color: '#0891b2',
    role: 'La Cazadora de Vidrio / Ejecutora de Órbita Limpia',
    visualCode: 'Cuerpo translúcido con núcleo de energía, armadura biomecánica blanca y dorada, garras de vidrio',
    perfil: [
      'Ejecutora arcana: Cazadora de élite corporativa que modela la cacería como una ecuación matemática pura.',
      'Tecnología prohibida: Su cuerpo translúcido alberga un núcleo de energía recuperada de la anomalía de Veyra-9.',
      'Precisión implacable: Carece de emoción en combate. Rastrea mediante predicción probabilística y sigilo óptico.'
    ],
    crisis: 'Sincronía inestable: Su núcleo entra en resonancia violenta y pierde control al acercarse al Ghostline de Mando.',
    loreNote: 'Miembro de La Órbita Muerta. Cazadora de élite biomecánica cuyos sistemas de probabilidad son extremadamente precisos. Posee un núcleo de energía recuperada de Veyra-9, y al acercarse a Mando, su núcleo reacciona al Ghostline de su casco.',
    stats: { fuerza: 6, inteligencia: 9, carisma: 4, suerte: 5, combate: 9, defensa: 7, especialVal: 8 },
    especialLabel: 'Probabilidad',
    powers: {
      role: 'Blue Wraith',
      habilidades: [
        'Cálculo Probabilístico: Modela rutas y movimientos enemigos en tiempo real, aumentando su evasión.',
        'Garras de Vidrio: Cuchillas biomecánicas de alta frecuencia que vibran para cortar escudos energéticos.',
        'Camuflaje del Espectro: Vuelve su cuerpo translúcido invisible a la luz visible y sensores térmicos.'
      ],
      significa: 'La cazadora sigilosa. Se infiltra tras líneas enemigas y neutraliza objetivos clave con precisión clínica.',
      crisis: 'Error algorítmico: Si un objetivo actúa de forma irracional o caótica, sus modelos probabilísticos se sobrecargan.',
      stats: { fuerza: 8, inteligencia: 10, carisma: 5, suerte: 6, combate: 10, defensa: 8, especialVal: 9 }
    }
  },
  {
    id: 'severine',
    name: 'Severine Alucard',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/Fichas/Secundarios/Severine/severine_ficha.webp',
    fullBody: '/personajes/Fichas/Secundarios/Severine/severine_ficha.webp',
    color: '#8b0000',
    role: 'La Reina del Nadir',
    visualCode: 'Abrigo militar victoriano rojo carmesí, manto negro de terciopelo, guantes negros de contención',
    perfil: [
      'Soberana del Nadir: Gobierna la civilización vampírica subterránea y protege a los de linaje (aquellos que eligen no ser monstruos).',
      'Última heredera Alucard: Capaz de resistir la corrupción de la sangre de Drácula y destinada a contener su legado.',
      'Edad de Sangre: Su cuerpo no envejece de forma normal; alterna entre una forma joven descubierta y una forma antigua de pelo blanco con guantes negros.'
    ],
    crisis: 'Pérdida de Recuerdos: Cada vez que obliga a otro vampiro a obedecer mediante su Soberanía Hemática, sacrifica un recuerdo personal importante.',
    stats: { fuerza: 8, inteligencia: 9, carisma: 10, suerte: 6, combate: 8, defensa: 7, especialVal: 10 },
    especialLabel: 'Soberanía Hemática',
    hint: 'Terminá La cacería para desbloquear.',
    powers: {
      role: 'Reina del Nadir',
      habilidades: [
        'Soledad del Linaje (Soberanía Hemática): Control absoluto sobre cualquier vampiro descendiente de Drácula, a costa de sus propios recuerdos.',
        'Manipulación y Armas Hemáticas: Modela su propia sangre en cuchillas, filamentos y sellos letales.',
        'Descomposición en Enjambre: Transmuta parte de su cuerpo en murciélagos para desplazarse rápidamente a través de sombras.'
      ],
      significa: 'La soberana de la noche. Domina el combate de media distancia mediante constructos de sangre y subyugación de voluntades.',
      crisis: 'Corrupción Primordial: El uso excesivo de su poder desata la sangre de Balanar en ella, envejeciéndola y haciéndola rastreable.',
      stats: { fuerza: 10, inteligencia: 10, carisma: 10, suerte: 7, combate: 10, defensa: 9, especialVal: 10 }
    }
  },
  {
    id: 'brewmaster',
    name: 'Brewmaster',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/PORTADAS/Brewmaster/Brewmaster.webp',
    fullBody: '/personajes/PORTADAS/Brewmaster/Brewmaster.webp',
    color: '#6b7280',
    role: 'Nuevo Personaje',
    visualCode: 'Descripción visual base',
    perfil: [
      'Detalle de perfil 1: Escribe aquí sobre el personaje.',
      'Detalle de perfil 2: Escribe aquí sobre el personaje.',
      'Detalle de perfil 3: Escribe aquí sobre el personaje.'
    ],
    crisis: 'Descripción de su momento de crisis o debilidad.',
    stats: { fuerza: 5, inteligencia: 5, carisma: 5, suerte: 5, combate: 5, defensa: 5, especialVal: 5 },
    especialLabel: 'Poder Único',
    powers: {
      role: 'Rol de Poder',
      habilidades: [
        'Habilidad 1: Descripción de la habilidad.',
        'Habilidad 2: Descripción de la habilidad.',
        'Habilidad 3: Descripción de la habilidad.'
      ],
      significa: 'Qué significa su poder en combate.',
      crisis: 'Debilidad o crisis al usar su poder.',
      stats: { fuerza: 6, inteligencia: 6, carisma: 6, suerte: 6, combate: 6, defensa: 6, especialVal: 6 }
    }
  },
  {
    id: 'enchantress',
    name: 'Enchantress',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/PORTADAS/Enchantress/Enchantress.webp',
    fullBody: '/personajes/PORTADAS/Enchantress/Enchantress.webp',
    color: '#6b7280',
    role: 'Nuevo Personaje',
    visualCode: 'Descripción visual base',
    perfil: [
      'Detalle de perfil 1: Escribe aquí sobre el personaje.',
      'Detalle de perfil 2: Escribe aquí sobre el personaje.',
      'Detalle de perfil 3: Escribe aquí sobre el personaje.'
    ],
    crisis: 'Descripción de su momento de crisis o debilidad.',
    stats: { fuerza: 5, inteligencia: 5, carisma: 5, suerte: 5, combate: 5, defensa: 5, especialVal: 5 },
    especialLabel: 'Poder Único',
    powers: {
      role: 'Rol de Poder',
      habilidades: [
        'Habilidad 1: Descripción de la habilidad.',
        'Habilidad 2: Descripción de la habilidad.',
        'Habilidad 3: Descripción de la habilidad.'
      ],
      significa: 'Qué significa su poder en combate.',
      crisis: 'Debilidad o crisis al usar su poder.',
      stats: { fuerza: 6, inteligencia: 6, carisma: 6, suerte: 6, combate: 6, defensa: 6, especialVal: 6 }
    }
  },
  {
    id: 'jade',
    name: 'Jade',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/PORTADAS/Jade/Jade.webp',
    fullBody: '/personajes/PORTADAS/Jade/Jade.webp',
    color: '#6b7280',
    role: 'Nuevo Personaje',
    visualCode: 'Descripción visual base',
    perfil: [
      'Detalle de perfil 1: Escribe aquí sobre el personaje.',
      'Detalle de perfil 2: Escribe aquí sobre el personaje.',
      'Detalle de perfil 3: Escribe aquí sobre el personaje.'
    ],
    crisis: 'Descripción de su momento de crisis o debilidad.',
    stats: { fuerza: 5, inteligencia: 5, carisma: 5, suerte: 5, combate: 5, defensa: 5, especialVal: 5 },
    especialLabel: 'Poder Único',
    powers: {
      role: 'Rol de Poder',
      habilidades: [
        'Habilidad 1: Descripción de la habilidad.',
        'Habilidad 2: Descripción de la habilidad.',
        'Habilidad 3: Descripción de la habilidad.'
      ],
      significa: 'Qué significa su poder en combate.',
      crisis: 'Debilidad o crisis al usar su poder.',
      stats: { fuerza: 6, inteligencia: 6, carisma: 6, suerte: 6, combate: 6, defensa: 6, especialVal: 6 }
    }
  },
  {
    id: 'lina',
    name: 'Lina',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/PORTADAS/Lina/Lina.webp',
    fullBody: '/personajes/PORTADAS/Lina/Lina.webp',
    color: '#6b7280',
    role: 'Nuevo Personaje',
    visualCode: 'Descripción visual base',
    perfil: [
      'Detalle de perfil 1: Escribe aquí sobre el personaje.',
      'Detalle de perfil 2: Escribe aquí sobre el personaje.',
      'Detalle de perfil 3: Escribe aquí sobre el personaje.'
    ],
    crisis: 'Descripción de su momento de crisis o debilidad.',
    stats: { fuerza: 5, inteligencia: 5, carisma: 5, suerte: 5, combate: 5, defensa: 5, especialVal: 5 },
    especialLabel: 'Poder Único',
    powers: {
      role: 'Rol de Poder',
      habilidades: [
        'Habilidad 1: Descripción de la habilidad.',
        'Habilidad 2: Descripción de la habilidad.',
        'Habilidad 3: Descripción de la habilidad.'
      ],
      significa: 'Qué significa su poder en combate.',
      crisis: 'Debilidad o crisis al usar su poder.',
      stats: { fuerza: 6, inteligencia: 6, carisma: 6, suerte: 6, combate: 6, defensa: 6, especialVal: 6 }
    }
  },
  {
    id: 'mutantes',
    name: 'Mutantes',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/PORTADAS/Mutantes/Mutantes.webp',
    fullBody: '/personajes/PORTADAS/Mutantes/Mutantes.webp',
    color: '#6b7280',
    role: 'Nuevo Personaje',
    visualCode: 'Descripción visual base',
    perfil: [
      'Detalle de perfil 1: Escribe aquí sobre el personaje.',
      'Detalle de perfil 2: Escribe aquí sobre el personaje.',
      'Detalle de perfil 3: Escribe aquí sobre el personaje.'
    ],
    crisis: 'Descripción de su momento de crisis o debilidad.',
    stats: { fuerza: 5, inteligencia: 5, carisma: 5, suerte: 5, combate: 5, defensa: 5, especialVal: 5 },
    especialLabel: 'Poder Único',
    powers: {
      role: 'Rol de Poder',
      habilidades: [
        'Habilidad 1: Descripción de la habilidad.',
        'Habilidad 2: Descripción de la habilidad.',
        'Habilidad 3: Descripción de la habilidad.'
      ],
      significa: 'Qué significa su poder en combate.',
      crisis: 'Debilidad o crisis al usar su poder.',
      stats: { fuerza: 6, inteligencia: 6, carisma: 6, suerte: 6, combate: 6, defensa: 6, especialVal: 6 }
    }
  },
  {
    id: 'tiny',
    name: 'Tiny',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/PORTADAS/Tiny/Tiny.webp',
    fullBody: '/personajes/PORTADAS/Tiny/Tiny.webp',
    color: '#6b7280',
    role: 'Nuevo Personaje',
    visualCode: 'Descripción visual base',
    perfil: [
      'Detalle de perfil 1: Escribe aquí sobre el personaje.',
      'Detalle de perfil 2: Escribe aquí sobre el personaje.',
      'Detalle de perfil 3: Escribe aquí sobre el personaje.'
    ],
    crisis: 'Descripción de su momento de crisis o debilidad.',
    stats: { fuerza: 5, inteligencia: 5, carisma: 5, suerte: 5, combate: 5, defensa: 5, especialVal: 5 },
    especialLabel: 'Poder Único',
    powers: {
      role: 'Rol de Poder',
      habilidades: [
        'Habilidad 1: Descripción de la habilidad.',
        'Habilidad 2: Descripción de la habilidad.',
        'Habilidad 3: Descripción de la habilidad.'
      ],
      significa: 'Qué significa su poder en combate.',
      crisis: 'Debilidad o crisis al usar su poder.',
      stats: { fuerza: 6, inteligencia: 6, carisma: 6, suerte: 6, combate: 6, defensa: 6, especialVal: 6 }
    }
  },
  {
    id: 'treant_protector',
    name: 'Treant Protector',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/PORTADAS/Treant Protector/Treant Protector.webp',
    fullBody: '/personajes/PORTADAS/Treant Protector/Treant Protector.webp',
    color: '#6b7280',
    role: 'Nuevo Personaje',
    visualCode: 'Descripción visual base',
    perfil: [
      'Detalle de perfil 1: Escribe aquí sobre el personaje.',
      'Detalle de perfil 2: Escribe aquí sobre el personaje.',
      'Detalle de perfil 3: Escribe aquí sobre el personaje.'
    ],
    crisis: 'Descripción de su momento de crisis o debilidad.',
    stats: { fuerza: 5, inteligencia: 5, carisma: 5, suerte: 5, combate: 5, defensa: 5, especialVal: 5 },
    especialLabel: 'Poder Único',
    powers: {
      role: 'Rol de Poder',
      habilidades: [
        'Habilidad 1: Descripción de la habilidad.',
        'Habilidad 2: Descripción de la habilidad.',
        'Habilidad 3: Descripción de la habilidad.'
      ],
      significa: 'Qué significa su poder en combate.',
      crisis: 'Debilidad o crisis al usar su poder.',
      stats: { fuerza: 6, inteligencia: 6, carisma: 6, suerte: 6, combate: 6, defensa: 6, especialVal: 6 }
    }
  },
  {
    id: 'victor',
    name: 'Victor',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/PORTADAS/Victor/Victor.webp',
    fullBody: '/personajes/PORTADAS/Victor/Victor.webp',
    color: '#6b7280',
    role: 'Nuevo Personaje',
    visualCode: 'Descripción visual base',
    perfil: [
      'Detalle de perfil 1: Escribe aquí sobre el personaje.',
      'Detalle de perfil 2: Escribe aquí sobre el personaje.',
      'Detalle de perfil 3: Escribe aquí sobre el personaje.'
    ],
    crisis: 'Descripción de su momento de crisis o debilidad.',
    stats: { fuerza: 5, inteligencia: 5, carisma: 5, suerte: 5, combate: 5, defensa: 5, especialVal: 5 },
    especialLabel: 'Poder Único',
    powers: {
      role: 'Rol de Poder',
      habilidades: [
        'Habilidad 1: Descripción de la habilidad.',
        'Habilidad 2: Descripción de la habilidad.',
        'Habilidad 3: Descripción de la habilidad.'
      ],
      significa: 'Qué significa su poder en combate.',
      crisis: 'Debilidad o crisis al usar su poder.',
      stats: { fuerza: 6, inteligencia: 6, carisma: 6, suerte: 6, combate: 6, defensa: 6, especialVal: 6 }
    }
  },
  {
    id: 'brooke',
    name: 'Brooke',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/Fichas/Secundarios/Brooke&Byte/Brooke&Byte_ficha.png',
    fullBody: '/personajes/Fichas/Secundarios/Brooke&Byte/Brooke&Byte_ficha.png',
    color: '#00ff66',
    role: 'Piloto Underground de Tokio',
    visualCode: 'Rubia, atlética, ropa práctica de taller tuner y actitud contenida',
    perfil: [
      'El Corazón de Tokio: Piloto underground experta que traduce la telemetría técnica en decisiones extremas a alta velocidad.',
      'Instinto al límite: Capaz de percibir inestabilidades, pérdidas de adherencia y retrasos antes que cualquier sensor.',
      'Lealtad inquebrantable: Directa y reservada. Expresa su afecto confiando su auto, defendiendo al equipo y sosteniendo la calma bajo presión.'
    ],
    crisis: 'Carga Emocional post-accidente: Tras el choque del GT-R, debe superar el trauma físico y mecánico para recuperar la confianza en el Skyline final.',
    stats: { fuerza: 6, inteligencia: 8, carisma: 8, suerte: 6, combate: 8, defensa: 7, especialVal: 10 },
    especialLabel: 'Pilotaje Intuitivo',
    hint: 'Terminá #4 (#8 Primer Vuelo) para desbloquear.',
    powers: {
      role: 'Piloto de Élite',
      habilidades: [
        'Corrección de Inestabilidad: Mantiene control absoluto sobre vehículos imperfectos o descompensados en maniobras límite.',
        'Derrape Técnico: Ejecuta cambios de dirección inmediatos aprovechando la masa y el peso sin perder velocidad.',
        'Conservación Mecánica: Capaz de llevar un vehículo dañado hasta la meta protegiendo el cockpit e identificando riesgos.'
      ],
      significa: 'Pared de velocidad. Convierte cualquier vehículo en una extensión orgánica de su reflejo y templanza.',
      crisis: 'Falla Mecánica Catastrófica: Si el sistema del vehículo colapsa por completo, debe recurrir a maniobras de impacto controlado para sobrevivir.',
      stats: { fuerza: 7, inteligencia: 8, carisma: 8, suerte: 6, combate: 9, defensa: 8, especialVal: 10 }
    }
  },
  {
    id: 'byte',
    name: 'BYTE',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/Fichas/Secundarios/Brooke&Byte/Brooke&Byte_ficha.png',
    fullBody: '/personajes/Fichas/Secundarios/Brooke&Byte/Brooke&Byte_ficha.png',
    color: '#3b82f6',
    role: 'Asistente Robótico / Copiloto de Cabina',
    visualCode: 'Chasis compacto de aleación, pantalla facial expresiva y gastado por el uso de taller',
    perfil: [
      'Compañero Físico: Robot compacto tecnológicamente avanzado instalado en el asiento de copiloto del Skyline.',
      'Vínculo de Cabina: Ancla emocional de Brooke que lee telemetría en tiempo real y detecta anomalías térmicas y de presión.',
      'Navegante de Datos: Sirve de puente entre la electrónica avanzada de Ian y la experiencia mecánica tradicional de Daichi.'
    ],
    crisis: 'Sobrecarga de Datos: La interferencia de radio de Kurogane o temperaturas extremas pueden saturar sus sensores temporariamente.',
    stats: { fuerza: 4, inteligencia: 10, carisma: 9, suerte: 7, combate: 4, defensa: 6, especialVal: 9 },
    especialLabel: 'Telemetría Viva',
    hint: 'Terminá #4 (#8 Primer Vuelo) para desbloquear.',
    powers: {
      role: 'Copiloto de Procesamiento',
      habilidades: [
        'Escaneo en Tiempo Real: Detecta fallas electrónicas, fuga de fluidos y variaciones térmicas al instante.',
        'Asistencia Emocional: Emite señales de calibración y guía al piloto para mantener la calma bajo presión extrema.',
        'Análisis de Telemetría Rival: Decodifica patrones de conducción de competidores para sugerir trayectorias de sobrepaso.'
      ],
      significa: 'El ojo técnico. Conecta la información de sensores con el estado biológico del piloto.',
      crisis: 'Dependencia de Batería y Chasis: Si su módulo principal sufre daños físicos directos, pierde capacidad de procesamiento.',
      stats: { fuerza: 5, inteligencia: 10, carisma: 9, suerte: 7, combate: 5, defensa: 7, especialVal: 9 }
    }
  },
  {
    id: 'daichi',
    name: 'Daichi',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/PORTADAS/Daichi/Daichi.webp',
    fullBody: '/personajes/PORTADAS/Daichi/Daichi.webp',
    color: '#d97706',
    role: 'Maestro Mecánico de Tokio',
    visualCode: 'Mecánico veterano de cabello gris, ropa de trabajo gastada y presencia paternal',
    perfil: [
      'La Experiencia del Taller: Pilar práctico del equipo con décadas reconstruyendo motores y chasis en Tokio.',
      'Sabiduría Empírica: Detecta fallas por sonido, olor y vibración antes de que las computadoras puedan procesarlas.',
      'Guardián del Taller: Mentor protector de Brooke y ancla de resistencia moral frente a los abusos corporativos.'
    ],
    crisis: 'Desgaste Físico: Su resistencia tiene un límite frente a jornadas interminables y la pérdida de aliados clave.',
    stats: { fuerza: 7, inteligencia: 9, carisma: 8, suerte: 5, combate: 5, defensa: 8, especialVal: 8 },
    especialLabel: 'Maestría de Foso',
    hint: 'Terminá #4 (#8 Primer Vuelo) para desbloquear.',
    powers: {
      role: 'Maestro de la Mecánica',
      habilidades: [
        'Diagnóstico Acústico: Identifica descompensaciones en válvulas, suspensión o frenos tan solo escuchando el motor.',
        'Reconstrucción Imposible: Capaz de devolverle la vida a vehículos destrozados con repuestos adaptados e ingenio.',
        'Blindaje de Seguridad: Insiste en márgenes de tolerancia estructurales para garantizar que el piloto regrese vivo.'
      ],
      significa: 'El ancla de tierra. Garantiza la integridad mecánica y el espíritu humano dentro del garage.',
      crisis: 'Falta de Repuestos Críticos: Si la cadena de suministro se corta por completo, no puede evitar la fatiga de materiales.',
      stats: { fuerza: 7, inteligencia: 9, carisma: 8, suerte: 6, combate: 6, defensa: 9, especialVal: 8 }
    }
  },
  {
    id: 'ren',
    name: 'Ren',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/PORTADAS/Ren/Ren.webp',
    fullBody: '/personajes/PORTADAS/Ren/Ren.webp',
    color: '#10b981',
    role: 'Intermediario del Mercado Gris',
    visualCode: 'Joven ágil, mirada atenta, vestimenta urbana ligera y red de contactos clandestinos',
    perfil: [
      'Puente de las Sombras: El contacto que consigue piezas, vehículos retenidos y accesos a zonas prohibidas de Tokio.',
      'Recuperador del Eclipse: Consigue el Mitsubishi Eclipse GT verde en el mercado gris para la carrera relay del equipo.',
      'Lealtad Peligrosa: Se arriesga navegando entre depósitos ilegales y la vigilancia implacable del Clan Kurogane.'
    ],
    crisis: 'Blanco de Kurogane: Su cercanía con las filtraciones lo convierte en objetivo prioritario de las operaciones de ONI.',
    stats: { fuerza: 5, inteligencia: 8, carisma: 9, suerte: 6, combate: 6, defensa: 5, especialVal: 7 },
    especialLabel: 'Red Subterránea',
    hint: 'Terminá #4 (#8 Primer Vuelo) para desbloquear.',
    powers: {
      role: 'Informante y Conector',
      habilidades: [
        'Localización de Repuestos: Encuentra componentes descontinuados o incautados en depósitos fuera de registro.',
        'Evasión de Vigilancia: Se mueve con soltura por los callejones y contactos grises evitando patrullas corporativas.',
        'Negociación de Emergencia: Consigue oportunidades y favores clave cuando el equipo se queda sin opciones.'
      ],
      significa: 'El proveedor de lo imposible. Abre las puertas clandestinas de la ciudad a expensas de su propia seguridad.',
      crisis: 'Vulnerabilidad Extrema: Carece de protección corporativa, quedando expuesto si Kurogane decide cortar el nexo.',
      stats: { fuerza: 5, inteligencia: 8, carisma: 9, suerte: 6, combate: 6, defensa: 6, especialVal: 7 }
    }
  },
  {
    id: 'ar_cnido_mutante',
    name: 'ARÁCNIDO-MUTANTE',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/PORTADAS/ARÁCNIDO-MUTANTE/ARÁCNIDO-MUTANTE.webp',
    fullBody: '/personajes/PORTADAS/ARÁCNIDO-MUTANTE/ARÁCNIDO-MUTANTE.webp',
    color: '#6b7280',
    role: 'Nuevo Personaje',
    visualCode: 'Descripción visual base',
    perfil: [
      'Detalle de perfil 1: Escribe aquí sobre el personaje.',
      'Detalle de perfil 2: Escribe aquí sobre el personaje.',
      'Detalle de perfil 3: Escribe aquí sobre el personaje.'
    ],
    crisis: 'Descripción de su momento de crisis o debilidad.',
    stats: { fuerza: 5, inteligencia: 5, carisma: 5, suerte: 5, combate: 5, defensa: 5, especialVal: 5 },
    especialLabel: 'Poder Único',
    powers: {
      role: 'Rol de Poder',
      habilidades: [
        'Habilidad 1: Descripción de la habilidad.',
        'Habilidad 2: Descripción de la habilidad.',
        'Habilidad 3: Descripción de la habilidad.'
      ],
      significa: 'Qué significa su poder en combate.',
      crisis: 'Debilidad o crisis al usar su poder.',
      stats: { fuerza: 6, inteligencia: 6, carisma: 6, suerte: 6, combate: 6, defensa: 6, especialVal: 6 }
    }
  },
  {
    id: 'tinker',
    name: 'Tinker',
    category: 'secundarios',
    isSecondary: true,
    image: '/personajes/PORTADAS/Tinker/Tinker.webp',
    fullBody: '/personajes/PORTADAS/Tinker/Tinker.webp',
    color: '#6b7280',
    role: 'Nuevo Personaje',
    visualCode: 'Descripción visual base',
    perfil: [
      'Detalle de perfil 1: Escribe aquí sobre el personaje.',
      'Detalle de perfil 2: Escribe aquí sobre el personaje.',
      'Detalle de perfil 3: Escribe aquí sobre el personaje.'
    ],
    crisis: 'Descripción de su momento de crisis o debilidad.',
    stats: { fuerza: 5, inteligencia: 5, carisma: 5, suerte: 5, combate: 5, defensa: 5, especialVal: 5 },
    especialLabel: 'Poder Único',
    powers: {
      role: 'Rol de Poder',
      habilidades: [
        'Habilidad 1: Descripción de la habilidad.',
        'Habilidad 2: Descripción de la habilidad.',
        'Habilidad 3: Descripción de la habilidad.'
      ],
      significa: 'Qué significa su poder en combate.',
      crisis: 'Debilidad o crisis al usar su poder.',
      stats: { fuerza: 6, inteligencia: 6, carisma: 6, suerte: 6, combate: 6, defensa: 6, especialVal: 6 }
    }
  }
];
