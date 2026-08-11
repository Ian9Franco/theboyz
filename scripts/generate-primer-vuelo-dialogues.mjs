import fs from "node:fs";
import path from "node:path";

const chapterDir = path.join(process.cwd(), "public", "comics", "#8 Primer vuelo", "#5 Primer Vuelo");
const outputPath = path.join(chapterDir, "dialogues.json");
const previous = JSON.parse(fs.readFileSync(outputPath, "utf8"));

const L = (speaker, text, style = "normal", posX = 50, posY = 50, tailX = posX, tailY = posY + 8) => {
  const line = { text, speaker, style, size: style === "caption" ? "medium" : "small", posX, posY };
  if (style === "caption" || style === "cinematic" || style === "sfx") {
    line.tail = "none";
  } else {
    line.tailX = tailX;
    line.tailY = tailY;
    line.tailWidth = 6;
    line.tailCurvature = -22;
  }
  return line;
};

const P = (start, end, dialogue = []) => ({
  focusY: Number(((start + end) / 200).toFixed(2)),
  dialogue,
  zoomRects: [{ x: 0, y: start, w: 100, h: end - start }],
});

const pages = {
  "1": { panels: [
    P(0, 31, [L("Ian", "Ren dejó rutas, horarios y puntos ciegos. No son apuntes: es un mapa del sistema.", "normal", 30, 7, 22, 18), L("Brooke", "Entonces dejá de admirarlo y decinos por dónde entramos.", "normal", 78, 12, 72, 21)]),
    P(31, 65, [L("Ian", "La carrera concentra la seguridad afuera. Dusk entra por mantenimiento y nosotros sostenemos la distracción.", "normal", 28, 38, 21, 49), L("BYTE", "Dos operaciones. Un mismo reloj.", "electronic", 69, 50, 59, 48)]),
    P(65, 100, [L("Daichi", "El reloj no me preocupa. El auto sí.", "normal", 27, 72, 25, 84), L("Daichi", "Si lo fuerzan como al Eclipse, no vuelve.", "normal", 24, 84, 31, 89), L("Brooke", "Este vuelve.", "normal", 75, 77, 72, 87)])
  ]},
  "2": { panels: [
    P(0, 34, [L("Jaz", "La ruta azul es la carrera. La roja, el traslado interno de Kurogane.", "electronic", 76, 8, 82, 20), L("Ian", "Y se cruzan durante nueve minutos.", "normal", 24, 17, 27, 25)]),
    P(34, 67, [L("Brooke", "Nueve minutos alcanzan.", "normal", 22, 39, 27, 48), L("Ian", "Para vos, sí. Para infiltrarse, liberar detenidos y salir, es una ventana incómodamente optimista.", "normal", 56, 43, 53, 53), L("Dusk", "Alcanza.", "electronic", 81, 57, 78, 62)]),
    P(67, 100, [L("Daichi", "Entonces no improvisen.", "normal", 27, 73, 35, 80), L("Brooke", "En una carrera clandestina.", "normal", 72, 78, 69, 87), L("Daichi", "Dije que no improvisen. No que esperaba que obedecieran.", "normal", 31, 90, 36, 93)])
  ]},
  "3": { panels: [
    P(0, 35, [L("Ian", "Ren separó la información. Una parte estaba en el teléfono; la otra, en un depósito físico.", "normal", 24, 7, 29, 19), L("Brooke", "Porque sabía que iban a encontrarlo.", "normal", 76, 13, 70, 22)]),
    P(35, 72, [L("Jaz", "Accesos, cámaras, retenidos, cargas. Todo converge en la carrera final.", "electronic", 72, 41, 79, 53), L("BYTE", "Hay sectores dañados en el archivo.", "electronic", 26, 56, 28, 61)]),
    P(72, 100, [L("Daichi", "Ren nunca entregaba una llave sin esconder otra.", "normal", 27, 77, 31, 87), L("Ian", "Entonces vamos a encontrarla.", "normal", 70, 87, 66, 92)])
  ]},
  "4": { panels: [
    P(0, 32, [L("Ian", "La camioneta repitió esta ruta tres noches. Ren estaba siguiendo el traslado.", "normal", 30, 8, 23, 17), L("Daichi", "No. Estaba intentando que nosotros pudiéramos seguirlo después.", "normal", 73, 17, 68, 25)]),
    P(32, 68, [L("BYTE", "Última señal confirmada.", "electronic", 22, 48, 27, 53), L("Brooke", "Zona industrial. Sin cámaras públicas.", "normal", 72, 43, 75, 52)]),
    P(68, 100, [L("Daichi", "Vamos.", "normal", 76, 78, 71, 87), L("Ian", "Daichi...", "normal", 22, 84, 28, 88), L("Daichi", "Vamos a buscarlo.", "normal", 68, 91, 61, 94)])
  ]},
  "5": { panels: [
    P(0, 39, [L("Ren", "La copia ya salió.", "normal", 22, 12, 23, 21), L("ONI", "No pregunté por la copia.", "normal", 75, 12, 74, 22)]),
    P(39, 70, [L("Ren", "Entonces llegaste tarde y enojado. Mala combinación.", "normal", 26, 46, 27, 54), L("ONI", "¿Dónde está la información?", "normal", 74, 54, 71, 61)]),
    P(70, 100, [L("Ren", "Donde no te sirve matarme.", "normal", 24, 78, 31, 84), L("ONI", "Eso lo decido yo.", "normal", 75, 86, 70, 92)])
  ]},
  "6": { panels: [
    P(0, 33, [L("Ren", "No soy el tipo que peleás en un pasillo.", "normal", 25, 9, 29, 18), L("ONI", "No.", "normal", 74, 19, 72, 26)]),
    P(33, 68, [L("ONI", "Sos el tipo que corre.", "normal", 72, 37, 71, 46), L("Ren", "Hasta ahora funcionó.", "normal", 25, 54, 30, 61)]),
    P(68, 100, [L("ONI", "Hasta ahora.", "normal", 73, 73, 69, 81), L("Ren", "Ya gané el tiempo que necesitaba.", "normal", 28, 86, 32, 92)])
  ]},
  "7": { panels: [
    P(0, 35, [L("Ren", "Podés romper el teléfono.", "normal", 25, 11, 28, 19), L("Ren", "No podés romper lo que ya salió.", "normal", 28, 23, 32, 29)]),
    P(35, 70, [L("ONI", "Tu error fue creer que esto era una negociación.", "normal", 72, 46, 69, 55)]),
    P(70, 100, [L("Ren", "Mi error fue venir solo.", "thought", 28, 78, 35, 85), L("Ren", "El de ustedes fue dejarme elegir qué sobrevivía.", "thought", 31, 90, 36, 94)])
  ]},
  "8": { panels: [
    P(0, 52, [L("ONI", "Limpien todo.", "normal", 70, 12, 68, 21), L("Kurogane", "¿Y el cuerpo?", "normal", 25, 33, 31, 39), L("ONI", "Que lo encuentren.", "normal", 72, 42, 68, 48)]),
    P(52, 100, [L("Narrador", "Ren protegió la única pieza que ONI no vio.", "caption", 50, 68), L("Narrador", "Una señal esperando a que alguien supiera escucharla.", "caption", 50, 88)])
  ]},
  "9": { panels: [
    P(0, 34, [L("Brooke", "Todos adentro. Seguimos la señal y no nos separamos.", "normal", 72, 9, 70, 19), L("Daichi", "Conducí.", "normal", 24, 20, 29, 25)]),
    P(34, 70, [L("BYTE", "Doscientos metros. A la derecha.", "electronic", 50, 45, 51, 53), L("Ian", "La camioneta de Ren.", "normal", 28, 61, 33, 65)]),
    P(70, 100, [L("Brooke", "Quédense atrás de mí.", "normal", 70, 78, 69, 85), L("Daichi", "No.", "normal", 24, 89, 29, 92)])
  ]},
  "10": { panels: [
    P(0, 38, [L("Ian", "Las marcas son recientes.", "normal", 28, 10, 33, 17), L("Brooke", "Hay sangre.", "normal", 72, 25, 69, 31)]),
    P(38, 70, [L("Daichi", "Ren.", "normal", 24, 48, 31, 56), L("BYTE", "Detecto una señal bajo el piso.", "electronic", 71, 58, 63, 62)]),
    P(70, 100, [L("Ian", "Primero él.", "normal", 29, 78, 35, 84), L("Brooke", "Ian...", "normal", 74, 88, 69, 92)])
  ]},
  "11": { panels: [
    P(0, 42, [L("Daichi", "Ren. Escuchame.", "normal", 28, 10, 33, 19), L("Brooke", "Daichi... ya está.", "whisper", 73, 18, 68, 25)]),
    P(42, 72, [L("Ian", "Yo lo metí en esto.", "thought", 72, 48, 68, 55), L("Brooke", "No hagas esto sobre vos ahora.", "normal", 72, 63, 68, 67)]),
    P(72, 100, [L("BYTE", "La señal continúa.", "electronic", 24, 78, 30, 84), L("Daichi", "Entonces encontrá lo que dejó.", "normal", 72, 88, 67, 94)])
  ]},
  "12": { panels: [
    P(0, 35, [L("Ian", "Caja blindada. Alimentación independiente.", "normal", 29, 9, 34, 17), L("BYTE", "El cifrado reconoce el módulo de Ren.", "electronic", 72, 20, 67, 26)]),
    P(35, 68, [L("Ian", "ONI destruyó el señuelo.", "normal", 27, 42, 32, 49), L("Brooke", "Y Ren dejó esto para nosotros.", "normal", 72, 55, 68, 62)]),
    P(68, 100, [L("Daichi", "Nos lo llevamos todo.", "normal", 28, 76, 34, 83), L("Daichi", "A él también.", "normal", 28, 89, 35, 94)])
  ]},
  "13": { panels: [
    P(0, 36, [L("Narrador", "La vuelta al taller dura treinta y siete minutos.", "caption", 50, 8), L("Narrador", "Nadie dice una palabra.", "caption", 50, 25)]),
    P(36, 72, [L("BYTE", "Daichi...", "electronic", 72, 54, 66, 59), L("Daichi", "Después.", "normal", 25, 62, 31, 68)]),
    P(72, 100, [L("Brooke", "Cerrá el portón.", "normal", 73, 79, 69, 86), L("Ian", "Sí.", "normal", 28, 90, 33, 94)])
  ]},
  "14": { panels: [
    P(0, 45, [L("Daichi", "Siempre aparecía con una pieza que nadie debía tener.", "normal", 27, 10, 32, 19), L("Daichi", "Y una explicación que nunca alcanzaba.", "normal", 31, 25, 34, 31)]),
    P(45, 75, [L("Brooke", "Pero aparecía.", "normal", 74, 53, 69, 61), L("Daichi", "Sí.", "whisper", 28, 66, 33, 70)]),
    P(75, 100, [L("Ian", "Kurogane sabía que lo estábamos usando.", "thought", 29, 80, 34, 87), L("Ian", "Y yo seguí calculando como si el riesgo fuera abstracto.", "thought", 32, 92, 38, 96)])
  ]},
  "15": { panels: [
    P(0, 37, [L("Ren", "Traje café. No pregunten de dónde.", "normal", 26, 17, 31, 24), L("Daichi", "No iba a preguntar.", "normal", 72, 23, 68, 29)]),
    P(37, 70, [L("Daichi", "Mentiroso.", "whisper", 25, 42, 31, 48), L("Ian", "La información muestra detenidos y tecnología Parker dentro del complejo.", "normal", 72, 52, 66, 59)]),
    P(70, 100, [L("Brooke", "Entonces corremos.", "normal", 71, 75, 67, 83), L("Ian", "Y Dusk entra.", "normal", 28, 84, 34, 90), L("Daichi", "Terminamos lo que Ren empezó.", "normal", 51, 94, 50, 96)])
  ]},
  "16": { panels: [
    P(0, 43, [L("Ian", "Yo hago la primera etapa. Brooke recibe el auto en boxes y termina.", "normal", 28, 8, 33, 18), L("Brooke", "Primero salís. Después entro yo. Sin inventos.", "normal", 73, 19, 69, 27)]),
    P(43, 72, [L("Daichi", "El Skyline aguanta el relevo. No una guerra.", "normal", 25, 50, 32, 57), L("Ian", "La guerra ocurre al lado.", "normal", 72, 61, 68, 66)]),
    P(72, 100, [L("Ian", "Una carrera. Una entrada. Una oportunidad.", "thought", 50, 83, 52, 90), L("Ian", "No vuelvo a mandar a otra persona donde yo no iría.", "thought", 50, 94, 52, 97)])
  ]},
  "17": { panels: [
    P(0, 38, [L("Jaz", "Ren confirmó tres accesos. Dusk eligió el más defendido.", "electronic", 30, 10, 31, 18), L("Ian", "Sí. Eso suena a ella.", "normal", 75, 20, 69, 26)]),
    P(38, 70, [L("Dusk", "La carrera abre la puerta. Yo saco a los retenidos.", "electronic", 24, 44, 29, 51), L("Ian", "Si aparece ONI, no lo persigas fuera de la ruta.", "normal", 72, 52, 68, 60), L("Dusk", "No voy a perseguirlo.", "electronic", 25, 64, 31, 68)]),
    P(70, 100, [L("Dusk", "Él va a venir a mí.", "electronic", 27, 78, 32, 84), L("Jaz", "Eso no fue tranquilizador.", "electronic", 73, 89, 68, 94)])
  ]},
  "18": { panels: [
    P(0, 48, [L("Ian", "No puedo dormir.", "thought", 27, 13, 32, 20), L("Ian", "Puedo revisar el plan por sexta vez.", "thought", 29, 31, 34, 37)]),
    P(48, 100, [L("Narrador", "Tokio. La mañana de la carrera final.", "caption", 50, 64), L("Ian", "Eso no es lo mismo que estar listo.", "thought", 50, 88, 52, 94)])
  ]},
  "19": { panels: [
    P(0, 35, [L("Daichi", "Herramientas en la van. Repuestos en el segundo módulo.", "normal", 27, 8, 32, 17), L("Brooke", "BYTE va conmigo.", "normal", 72, 20, 68, 27)]),
    P(35, 70, [L("Ian", "Nos vemos en boxes.", "normal", 28, 45, 33, 52), L("Daichi", "No. Nos vemos de vuelta en el taller.", "normal", 72, 58, 68, 65)]),
    P(70, 100, [L("Narrador", "Dos vehículos parten.", "caption", 50, 79), L("Narrador", "Uno lleva un auto de carrera. El otro, todo lo necesario para sobrevivir.", "caption", 50, 92)])
  ]},
  "20": { panels: [
    P(0, 38, [L("Seguridad", "Identificación y módulos abiertos.", "normal", 24, 10, 29, 17), L("Ian", "Equipo técnico. Relevo autorizado.", "normal", 71, 20, 67, 27)]),
    P(38, 72, [L("Seguridad", "Nada sale de la zona asignada.", "normal", 25, 45, 31, 52), L("Daichi", "Nosotros tampoco pensábamos quedarnos.", "normal", 72, 60, 67, 66)]),
    P(72, 100, [L("Ian", "Ya estamos adentro.", "thought", 28, 80, 33, 87), L("Ian", "Ahora empieza la parte difícil.", "thought", 70, 91, 66, 95)])
  ]},
  "21": { panels: [
    P(0, 36, [L("Daichi", "Presión estable. Temperatura estable. No me obliguen a mentir sobre lo tercero.", "normal", 27, 8, 33, 17), L("Brooke", "¿Qué tercero?", "normal", 72, 18, 68, 25), L("Daichi", "Ustedes.", "normal", 25, 29, 31, 33)]),
    P(36, 70, [L("BYTE", "Telemetría conectada.", "electronic", 72, 45, 67, 51), L("Ian", "Rivales confirmados.", "normal", 28, 60, 34, 66)]),
    P(70, 100, [L("Brooke", "Dejá de mirar las escaleras.", "normal", 72, 77, 69, 85), L("Ian", "No estaba mirando las escaleras.", "normal", 28, 88, 34, 93), L("Brooke", "Claro.", "normal", 72, 94, 68, 97)])
  ]},
  "22": { panels: [
    P(0, 39, [L("Narrador", "Nissan Skyline R34.", "caption", 50, 9), L("Narrador", "Cuatro personas lo construyeron. Una quinta hizo posible que existiera.", "caption", 50, 27)]),
    P(39, 100, [L("Daichi", "No lo rompan.", "normal", 76, 63, 70, 72), L("Brooke", "Qué discurso inspirador.", "normal", 24, 74, 31, 80), L("Ian", "Fue más largo de lo habitual.", "normal", 28, 88, 34, 94)])
  ]},
  "23": { panels: [
    P(0, 42, [L("Brooke", "Primera etapa es tuya.", "normal", 72, 12, 68, 21), L("Ian", "No pensé que fueras a decirlo tan tranquila.", "normal", 25, 25, 31, 31)]),
    P(42, 72, [L("Brooke", "No estoy tranquila. Confío en el auto.", "normal", 72, 48, 67, 56), L("Ian", "Eso es casi confianza en mí.", "normal", 26, 61, 32, 67), L("Brooke", "No arruines el momento.", "normal", 72, 68, 67, 72)]),
    P(72, 100, [L("BYTE", "Cinturón asegurado.", "electronic", 69, 80, 62, 85), L("Ian", "Está bien. Hagamos que vuelva.", "normal", 28, 91, 35, 95)])
  ]},
  "24": { panels: [
    P(0, 50, [L("Presentador", "NSX. Precisión.", "caption", 25, 9), L("Presentador", "SUPRA. Potencia.", "caption", 75, 9), L("Presentador", "350Z. Estilo.", "caption", 25, 42), L("Presentador", "STI. Tracción.", "caption", 75, 42)]),
    P(50, 100, [L("Presentador", "Cinco autos. Dos pilotos por equipo. Una noche para recordarlos.", "caption", 50, 79)])
  ]},
  "25": { panels: [
    P(0, 40, [L("Daichi", "Radio abierta.", "normal", 25, 9, 31, 17), L("Brooke", "No le des instrucciones mientras maneja.", "normal", 73, 20, 68, 27)]),
    P(40, 70, [L("BYTE", "Todos los sistemas listos.", "electronic", 70, 46, 63, 53), L("Ian", "No todos.", "normal", 27, 61, 33, 66)]),
    P(70, 100, [L("Ian", "Yo todavía estoy aprendiendo.", "thought", 28, 78, 34, 86), L("Brooke", "Aprendé rápido.", "electronic", 72, 90, 67, 94)])
  ]},
  "26": { panels: [
    P(0, 55, [L("Ian", "NSX: línea limpia. STI: agresivo. Supra: demasiado pendiente de mí.", "thought", 28, 10, 34, 18), L("BYTE", "El 350Z te está mirando.", "electronic", 72, 34, 67, 40)]),
    P(55, 100, [L("Ian", "Todos me están mirando.", "normal", 28, 65, 34, 71), L("BYTE", "No de esa manera.", "electronic", 70, 77, 64, 83), L("Ian", "Ah.", "normal", 28, 90, 34, 94)])
  ]},
  "27": { panels: [
    P(0, 33, [L("Conductora 350Z", "Pensé que la rubia manejaba.", "normal", 74, 10, 68, 18), L("Ian", "Después. Es relevo.", "normal", 25, 20, 31, 26)]),
    P(33, 72, [L("Conductora 350Z", "Entonces sos la entrada.", "normal", 72, 40, 67, 48), L("Ian", "Esa es una manera extraña de describirlo.", "normal", 27, 51, 33, 57), L("Conductora 350Z", "Quería ver si te ponías nervioso.", "whisper", 72, 62, 68, 69)]),
    P(72, 100, [L("Ian", "No funcionó.", "normal", 27, 78, 34, 84), L("BYTE", "Tu pulso aumentó veintidós por ciento.", "electronic", 70, 87, 63, 92), L("Ian", "BYTE.", "normal", 28, 95, 34, 97)])
  ]},
  "28": { panels: [
    P(0, 38, [L("Organizador", "¿Zona limpia?", "normal", 27, 10, 31, 17), L("Radio", "Patrullas retiradas. Ventana confirmada.", "electronic", 72, 20, 67, 27)]),
    P(38, 72, [L("Organizador", "Motores.", "scream", 50, 48), L("BYTE", "Ian.", "electronic", 70, 61, 64, 66), L("Ian", "Lo sé.", "normal", 28, 65, 34, 69)]),
    P(72, 100, [L("Organizador", "¡AHORA!", "scream", 50, 88)])
  ]},
  "29": { panels: [
    P(0, 45, [L("Ian", "Primera marcha.", "thought", 27, 11, 33, 18), L("BYTE", "Tracción estable.", "electronic", 72, 20, 66, 27)]),
    P(45, 100, [L("Ian", "Segunda.", "thought", 27, 60, 33, 67), L("Ian", "Y por primera vez no estoy persiguiendo la carrera.", "thought", 50, 88, 52, 94)])
  ]},
  "30": { panels: [
    P(0, 50, [L("BYTE", "Skyline primero.", "electronic", 70, 12, 63, 19), L("Ian", "Temporalmente.", "normal", 27, 23, 33, 29)]),
    P(50, 100, [L("BYTE", "Eso también cuenta.", "electronic", 70, 62, 64, 68), L("Ian", "No para Brooke.", "normal", 27, 80, 33, 86)])
  ]},
  "31": { panels: [
    P(0, 50, [L("Ian", "Supra a la izquierda.", "normal", 27, 10, 33, 17), L("BYTE", "Lo tengo.", "electronic", 70, 22, 64, 28), L("Dusk", "Acceso exterior superado.", "electronic", 73, 42, 68, 47)]),
    P(50, 100, [L("Guardia", "¿Quién—?", "normal", 73, 60, 68, 66), L("Dusk", "Nadie.", "whisper", 25, 73, 31, 79), L("Ian", "Primera puerta abierta.", "thought", 28, 90, 34, 95)])
  ]},
  "32": { panels: [
    P(0, 48, [L("BYTE", "Cinco autos dentro de un segundo.", "electronic", 70, 12, 64, 18), L("Ian", "Entonces todavía no hay carrera. Hay una discusión.", "normal", 27, 27, 33, 34)]),
    P(48, 100, [L("Ian", "Vamos a terminarla.", "normal", 28, 72, 34, 79)])
  ]},
  "33": { panels: [
    P(0, 43, [L("BYTE", "Tráfico civil adelante.", "electronic", 72, 10, 66, 17), L("Ian", "No los usamos como obstáculos.", "normal", 27, 24, 33, 31)]),
    P(43, 73, [L("Conductora 350Z", "Buena elección.", "normal", 73, 51, 68, 58), L("Ian", "No fue por vos.", "normal", 27, 65, 33, 69)]),
    P(73, 100, [L("BYTE", "El Supra tomó la delantera.", "electronic", 70, 83, 64, 89), L("Ian", "Por ahora.", "normal", 28, 93, 34, 96)])
  ]},
  "34": { panels: [
    P(0, 35, [L("BYTE", "Cruce ferroviario. Señal activa.", "electronic", 70, 9, 64, 16), L("Ian", "Distancia al tren.", "normal", 27, 22, 33, 28)]),
    P(35, 70, [L("BYTE", "Insuficiente para todos.", "electronic", 72, 43, 66, 50), L("Ian", "Entonces elegimos quién pasa.", "normal", 27, 57, 33, 63)]),
    P(70, 100, [L("Ian", "BYTE, marcame la línea.", "normal", 28, 80, 34, 87), L("BYTE", "Marcada.", "electronic", 70, 92, 64, 95)])
  ]},
  "35": { panels: [
    P(0, 40, [L("BYTE", "¡Ahora!", "scream", 70, 12, 64, 19), L("Ian", "Sujetate.", "normal", 27, 27, 33, 33)]),
    P(40, 70, [L("Conductora 350Z", "¡No frenes!", "scream", 72, 49, 68, 56), L("Piloto STI", "¡Mierda!", "scream", 25, 62, 31, 68)]),
    P(70, 100, [L("BYTE", "STI fuera de carrera.", "electronic", 70, 79, 64, 85), L("Ian", "¿Piloto?", "normal", 27, 88, 33, 93), L("BYTE", "Consciente.", "electronic", 70, 95, 64, 98)])
  ]},
  "36": { panels: [
    P(0, 55, [L("Piloto Supra", "No te alcanza.", "normal", 74, 14, 68, 21), L("Ian", "Todavía no sabés cuánto necesito.", "normal", 27, 29, 33, 35)]),
    P(55, 100, [L("BYTE", "Está cubriendo ambas líneas.", "electronic", 70, 67, 64, 73), L("Ian", "Entonces dejamos de pedirle permiso.", "normal", 28, 86, 34, 92)])
  ]},
  "37": { panels: [
    P(0, 33, [L("BYTE", "Derecha bloqueada.", "electronic", 70, 9, 64, 16), L("Ian", "Cambio a izquierda.", "normal", 27, 22, 33, 28)]),
    P(33, 68, [L("BYTE", "Izquierda bloqueada.", "electronic", 70, 42, 64, 49), L("Ian", "Está mirando el auto. No la ruta.", "normal", 27, 56, 33, 62)]),
    P(68, 100, [L("BYTE", "Puente abierto adelante.", "electronic", 70, 76, 64, 82), L("Ian", "Perfecto.", "normal", 27, 87, 33, 92), L("BYTE", "Esa respuesta no era la esperada.", "electronic", 70, 94, 64, 97)])
  ]},
  "38": { panels: [
    P(0, 38, [L("Piloto Supra", "¡No frenes!", "scream", 73, 11, 68, 18), L("Ian", "No pensaba hacerlo.", "normal", 27, 24, 33, 30)]),
    P(38, 75, [L("BYTE", "Sin superficie durante uno coma ocho segundos.", "electronic", 70, 47, 64, 54), L("Ian", "Podrías haberlo dicho antes.", "normal", 27, 62, 33, 68)]),
    P(75, 100, [L("Ian", "¡Sí!", "scream", 28, 83, 34, 89), L("BYTE", "Adelantamiento confirmado.", "electronic", 70, 92, 64, 96)])
  ]},
  "39": { panels: [
    P(0, 40, [L("Guardia", "Encontramos la máscara.", "normal", 72, 12, 67, 19), L("Dusk", "La dejé para que miraran el piso.", "whisper", 25, 28, 31, 34)]),
    P(40, 72, [L("Dusk", "El miedo siempre mira donde le dicen.", "thought", 28, 49, 34, 56), L("Guardia", "¡Cierren el sector!", "scream", 72, 63, 67, 69)]),
    P(72, 100, [L("Dusk", "Demasiado tarde.", "normal", 28, 87, 34, 93)])
  ]},
  "40": { panels: [
    P(0, 37, [L("Dusk", "Puerta interna abierta.", "electronic", 28, 10, 34, 17), L("Jaz", "Los retenidos están dos niveles abajo.", "electronic", 72, 22, 67, 28)]),
    P(37, 72, [L("Guardia", "¡Detenela!", "scream", 72, 45, 68, 52), L("Dusk", "No.", "normal", 27, 60, 33, 66)]),
    P(72, 100, [L("ONI", "Sofi.", "normal", 73, 82, 68, 88), L("Dusk", "Hayato.", "normal", 27, 92, 33, 96)])
  ]},
  "41": { panels: [
    P(0, 40, [L("BYTE", "Boxes en cuatro kilómetros.", "electronic", 70, 10, 64, 17), L("Ian", "Mantengo posición.", "normal", 27, 23, 33, 29)]),
    P(40, 72, [L("ONI", "Ren murió intentando protegerlos.", "normal", 72, 47, 67, 54), L("Dusk", "Ren murió porque obedeciste.", "normal", 27, 61, 33, 67)]),
    P(72, 100, [L("ONI", "Y vos vas a morir porque no sabés hacerlo.", "normal", 71, 84, 66, 90), L("Dusk", "Probemos.", "normal", 28, 94, 34, 97)])
  ]},
  "42": { panels: [
    P(0, 38, [L("BYTE", "El NSX intenta encerrarnos.", "electronic", 70, 10, 64, 17), L("Ian", "Que lo intente.", "normal", 27, 23, 33, 29)]),
    P(38, 72, [L("ONI", "Sin sorpresa no sos nada.", "normal", 72, 45, 67, 52), L("Dusk", "Ya te sorprendí una vez.", "normal", 27, 61, 33, 67)]),
    P(72, 100, [L("Dusk", "Estás hablando demasiado.", "normal", 28, 89, 34, 95)])
  ]},
  "43": { panels: [
    P(0, 35, [L("ONI", "Tu hoja tiembla.", "normal", 72, 10, 67, 17), L("Dusk", "Cansancio. No miedo.", "normal", 27, 24, 33, 30)]),
    P(35, 70, [L("ONI", "El cuerpo no distingue.", "normal", 72, 43, 67, 50), L("Dusk", "El mío sí.", "normal", 27, 60, 33, 66)]),
    P(70, 100, [L("ONI", "Entonces usalo.", "normal", 72, 82, 67, 88), L("Dusk", "Eso hago.", "normal", 28, 93, 34, 97)])
  ]},
  "44": { panels: [
    P(0, 38, [L("ONI", "Cada corte te hace más lenta.", "normal", 72, 10, 67, 17), L("Dusk", "Cada palabra te hace más predecible.", "normal", 27, 24, 33, 30)]),
    P(38, 72, [L("BYTE", "Ruta de boxes disponible.", "electronic", 70, 47, 64, 54), L("Ian", "Entramos.", "normal", 27, 61, 33, 67)]),
    P(72, 100, [L("Dusk", "Ya te vi.", "thought", 28, 88, 34, 94)])
  ]},
  "45": { panels: [
    P(0, 40, [L("BYTE", "Los líderes siguen recto.", "electronic", 70, 10, 64, 17), L("Ian", "Nosotros no.", "normal", 27, 24, 33, 30)]),
    P(40, 72, [L("Daichi", "Frená antes de entrar.", "electronic", 72, 47, 67, 54), L("Ian", "Estoy frenando.", "normal", 27, 60, 33, 66)]),
    P(72, 100, [L("Daichi", "Eso no era frenar.", "normal", 72, 83, 67, 89), L("Ian", "Llegamos.", "normal", 28, 93, 34, 97)])
  ]},
  "46": { panels: [
    P(0, 35, [L("Brooke", "Salí.", "normal", 72, 10, 67, 17), L("Ian", "Eso estaba haciendo.", "normal", 27, 23, 33, 29)]),
    P(35, 70, [L("Ian", "El auto está bien. El Supra perdió temperatura atrás. El 350Z guarda algo.", "normal", 28, 43, 34, 51), L("Brooke", "¿Y vos?", "normal", 72, 58, 67, 64)]),
    P(70, 100, [L("Ian", "Tengo otra parte del plan.", "normal", 28, 78, 34, 84), L("Brooke", "Claro que sí.", "normal", 72, 86, 67, 92), L("Ian", "Traé el auto a casa.", "normal", 28, 95, 34, 98)])
  ]},
  "47": { panels: [
    P(0, 36, [L("Brooke", "No me cuides.", "normal", 72, 10, 67, 17), L("Ian", "No lo hago. Confío en vos.", "normal", 27, 23, 33, 29)]),
    P(36, 70, [L("BYTE", "Brooke, tu pulso—", "electronic", 70, 44, 64, 51), L("Brooke", "Lo sé.", "normal", 27, 58, 33, 64)]),
    P(70, 100, [L("BYTE", "El Skyline también lo sabe.", "electronic", 70, 77, 64, 84), L("Brooke", "Entonces que deje de esperarme.", "normal", 28, 89, 34, 95), L("Brooke", "Vamos.", "normal", 50, 96, 50, 98)])
  ]},
  "48": { panels: [
    P(0, 42, [L("Brooke", "Embrague bien. Dirección limpia.", "thought", 28, 10, 34, 17), L("BYTE", "Respuesta dentro de parámetros.", "electronic", 72, 24, 66, 30)]),
    P(42, 72, [L("Brooke", "No necesito que sea el GT-R.", "thought", 28, 49, 34, 56), L("Brooke", "Necesito que sea este auto.", "thought", 28, 62, 34, 68)]),
    P(72, 100, [L("BYTE", "Estás sonriendo.", "electronic", 70, 82, 64, 88), L("Brooke", "Concentrate.", "normal", 28, 93, 34, 97)])
  ]},
  "49": { panels: [
    P(0, 38, [L("BYTE", "Dos botellas disponibles.", "electronic", 70, 10, 64, 17), L("Brooke", "Ian construyó dos porque esperaba que usara una.", "normal", 27, 24, 33, 31)]),
    P(38, 70, [L("BYTE", "¿Vas a usar las dos?", "electronic", 70, 45, 64, 52), L("Brooke", "Daichi construyó el motor porque sabía que iba a hacerlo.", "normal", 27, 59, 33, 66)]),
    P(70, 100, [L("Brooke", "Ahora.", "normal", 28, 87, 34, 93)])
  ]},
  "50": { panels: [
    P(0, 38, [L("ONI", "Terminó.", "normal", 72, 10, 67, 17), L("Dusk", "Para Ren, sí.", "normal", 27, 24, 33, 30)]),
    P(38, 72, [L("Dusk", "Para vos, ahora.", "normal", 27, 48, 33, 55), L("ONI", "No sos—", "normal", 72, 62, 67, 68)]),
    P(72, 100, [L("Dusk", "No necesito que termines.", "whisper", 28, 89, 34, 95)])
  ]},
  "51": { panels: [P(0, 100, [L("Narrador", "ONI había convertido la disciplina en una máscara.", "caption", 50, 18), L("Narrador", "Dusk encuentra el hombre debajo.", "caption", 50, 82)])]},
  "52": { panels: [
    P(0, 45, [L("Dusk", "Esto es por Ren.", "normal", 28, 16, 34, 23)]),
    P(45, 100, [L("Dusk", "Y por todos los nombres que no conocí.", "thought", 50, 80, 52, 87)])
  ]},
  "53": { panels: [
    P(0, 38, [L("Shinjuro", "Hayato era reemplazable.", "normal", 72, 12, 67, 19), L("Dusk", "Decís eso porque no fuiste vos quien sangró.", "normal", 27, 25, 33, 31)]),
    P(38, 70, [L("Shinjuro", "Todos sangran por Kurogane.", "normal", 72, 47, 67, 54), L("Dusk", "Entonces hoy te toca.", "normal", 27, 61, 33, 67)]),
    P(70, 100, [L("Shinjuro", "Venís cansada.", "normal", 72, 82, 67, 88), L("Dusk", "Vine suficiente.", "normal", 28, 93, 34, 97)])
  ]},
  "54": { panels: [
    P(0, 35, [L("Ian", "Shinjuro.", "whisper", 28, 10, 34, 17), L("Daichi", "¿Qué ves?", "normal", 72, 23, 67, 29)]),
    P(35, 70, [L("Ian", "Dusk perdió velocidad. Él todavía no.", "normal", 28, 44, 34, 51), L("Daichi", "Brooke está en carrera.", "normal", 72, 59, 67, 65)]),
    P(70, 100, [L("Ian", "Lo sé.", "normal", 28, 79, 34, 85), L("Ian", "Por eso puedo ir.", "normal", 70, 91, 64, 96)])
  ]},
  "55": { panels: [
    P(0, 38, [L("Shinjuro", "Tus brazos pesan.", "normal", 72, 10, 67, 17), L("Dusk", "Todavía cortan.", "normal", 27, 24, 33, 30)]),
    P(38, 72, [L("Ian", "Tomá. Si Brooke pregunta, estaba revisando telemetría.", "normal", 28, 47, 34, 54), L("Daichi", "Eso es una mentira horrible.", "normal", 72, 61, 67, 67)]),
    P(72, 100, [L("Ian", "No tuve tiempo de preparar una mejor.", "normal", 28, 89, 34, 95)])
  ]},
  "56": { panels: [
    P(0, 42, [L("Daichi", "Ian.", "normal", 72, 12, 67, 19), L("Ian", "La saco y vuelvo.", "normal", 27, 25, 33, 31)]),
    P(42, 72, [L("Daichi", "Todos dicen eso antes de hacer algo estúpido.", "normal", 72, 49, 67, 56), L("Ian", "Entonces estadísticamente alguien tiene que cumplirlo.", "normal", 27, 62, 33, 68)]),
    P(72, 100, [L("Daichi", "Volvé.", "normal", 72, 89, 67, 95)])
  ]},
  "57": { panels: [
    P(0, 42, [L("Ian", "Guantes. Bastones. Grappling.", "thought", 28, 10, 34, 17), L("Ian", "Nada de esto me convierte en mejor peleador.", "thought", 30, 25, 35, 31)]),
    P(42, 72, [L("Ian", "Solo me permite llegar.", "thought", 28, 49, 34, 56), L("Ian", "Y esta vez llegar es mi responsabilidad.", "thought", 30, 62, 35, 68)]),
    P(72, 100, [L("Narrador", "VESPERWING.", "cinematic", 50, 88)])
  ]},
  "58": { panels: [
    P(0, 38, [L("Conductora 350Z", "La salida es mía.", "normal", 72, 10, 67, 17), L("Brooke", "Tomala.", "normal", 27, 24, 33, 30)]),
    P(38, 70, [L("BYTE", "¿La estás dejando pasar?", "electronic", 70, 45, 64, 52), L("Brooke", "Le estoy mostrando dónde quiero que esté.", "normal", 27, 59, 33, 66)]),
    P(70, 100, [L("Conductora 350Z", "Eso estuvo bien.", "normal", 72, 82, 67, 88), L("Brooke", "Todavía no.", "normal", 28, 93, 34, 97)])
  ]},
  "59": { panels: [
    P(0, 38, [L("BYTE", "NSX por dentro.", "electronic", 70, 10, 64, 17), L("Brooke", "No tiene espacio.", "normal", 27, 24, 33, 30)]),
    P(38, 72, [L("Piloto NSX", "¡Abrite!", "scream", 72, 47, 67, 54), L("Brooke", "No.", "normal", 27, 61, 33, 67)]),
    P(72, 100, [L("BYTE", "NSX fuera.", "electronic", 70, 82, 64, 88), L("Brooke", "Tres autos.", "normal", 28, 93, 34, 97)])
  ]},
  "60": { panels: [
    P(0, 42, [L("Shinjuro", "Arrodillate.", "normal", 72, 10, 67, 17), L("Dusk", "No.", "normal", 27, 24, 33, 30)]),
    P(42, 72, [L("Vesperwing", "Creo que dijo que no.", "normal", 28, 49, 34, 56), L("Shinjuro", "¿Quién sos?", "normal", 72, 62, 67, 68)]),
    P(72, 100, [L("Vesperwing", "El problema nuevo.", "normal", 28, 90, 34, 96)])
  ]},
  "61": { panels: [
    P(0, 42, [L("Dusk", "Llegaste tarde.", "normal", 72, 10, 67, 17), L("Vesperwing", "Tuve que estacionar.", "normal", 27, 24, 33, 30)]),
    P(42, 72, [L("Dusk", "No sabés pelear con él.", "normal", 72, 49, 67, 56), L("Vesperwing", "No. Pero sé interrumpirlo.", "normal", 27, 62, 33, 68)]),
    P(72, 100, [L("Shinjuro", "Otro cadáver.", "normal", 72, 89, 67, 95)])
  ]},
  "62": { panels: [
    P(0, 35, [L("Narrador", "Ian llegó a Tokio para observar.", "caption", 50, 10), L("Narrador", "Vesperwing aparece cuando decide ser observado.", "caption", 50, 27)]),
    P(35, 100, [L("Vesperwing", "Dusk, cuando mueva el hombro derecho, entra por abajo.", "normal", 28, 55, 34, 62), L("Dusk", "No me des órdenes.", "normal", 72, 69, 67, 75), L("Vesperwing", "Era información.", "normal", 28, 85, 34, 91)])
  ]},
  "63": { panels: [
    P(0, 38, [L("Shinjuro", "Sos lento.", "normal", 72, 10, 67, 17), L("Vesperwing", "Comparado con ella, todos lo somos.", "normal", 27, 24, 33, 30)]),
    P(38, 72, [L("Dusk", "Hombro.", "normal", 27, 47, 33, 54), L("Vesperwing", "Lo vi.", "normal", 72, 61, 67, 67)]),
    P(72, 100, [L("Vesperwing", "Ahora.", "normal", 28, 90, 34, 96)])
  ]},
  "64": { panels: [
    P(0, 38, [L("Brooke", "Tres en paralelo. Calle angosta adelante.", "thought", 28, 10, 34, 17), L("BYTE", "El 350Z elegirá la pared.", "electronic", 70, 24, 64, 30)]),
    P(38, 72, [L("Brooke", "Y el Supra va a confiar en potencia.", "thought", 28, 47, 34, 54), L("BYTE", "¿Nosotros?", "electronic", 70, 61, 64, 67)]),
    P(72, 100, [L("Brooke", "Nosotros elegimos la salida.", "normal", 28, 90, 34, 96)])
  ]},
  "65": { panels: [
    P(0, 35, [L("Policía", "Unidades a la autopista elevada. Tres vehículos a alta velocidad.", "electronic", 70, 10, 64, 17), L("BYTE", "La policía cerró atrás.", "electronic", 28, 25, 34, 31)]),
    P(35, 70, [L("Brooke", "Que cierren.", "normal", 27, 45, 33, 52), L("Piloto Supra", "Ahora sí.", "normal", 72, 59, 67, 65)]),
    P(70, 100, [L("Conductora 350Z", "No te pierdas, rubia.", "normal", 72, 82, 67, 88), L("Brooke", "Seguí mirando.", "normal", 28, 93, 34, 97)])
  ]},
  "66": { panels: [
    P(0, 38, [L("BYTE", "Sirenas a cuatrocientos metros.", "electronic", 70, 10, 64, 17), L("Brooke", "La meta está más cerca.", "normal", 27, 24, 33, 30)]),
    P(38, 72, [L("Piloto Supra", "No vas a pasar.", "normal", 72, 47, 67, 54), L("Brooke", "No necesito pasar todavía.", "normal", 27, 61, 33, 67)]),
    P(72, 100, [L("BYTE", "¿Cuándo?", "electronic", 70, 82, 64, 88), L("Brooke", "Cuando duela.", "normal", 28, 93, 34, 97)])
  ]},
  "67": { panels: [
    P(0, 38, [L("Policía", "Mantengan formación.", "electronic", 72, 10, 67, 17), L("Brooke", "Están mirando los autos, no el tránsito.", "normal", 27, 24, 33, 30)]),
    P(38, 72, [L("BYTE", "Hueco a la izquierda.", "electronic", 70, 47, 64, 54), L("Brooke", "No. Ese es el hueco que quieren.", "normal", 27, 61, 33, 67)]),
    P(72, 100, [L("Brooke", "Esperamos.", "normal", 28, 82, 34, 88), L("BYTE", "Esperamos.", "electronic", 70, 93, 64, 97)])
  ]},
  "68": { panels: [
    P(0, 35, [L("Dusk", "Casco.", "normal", 27, 10, 33, 17), L("Vesperwing", "Lo saco.", "normal", 72, 24, 67, 30)]),
    P(35, 70, [L("Shinjuro", "No coordinan.", "normal", 72, 43, 67, 50), L("Dusk", "No hace falta.", "normal", 27, 57, 33, 63)]),
    P(70, 100, [L("Vesperwing", "Solo necesitamos el mismo objetivo.", "normal", 28, 82, 34, 88), L("Shinjuro", "¡Basta!", "scream", 72, 93, 67, 97)])
  ]},
  "69": { panels: [
    P(0, 38, [L("Shinjuro", "¡Mírenme!", "scream", 72, 10, 67, 17), L("Vesperwing", "Ese es el problema.", "normal", 27, 24, 33, 30)]),
    P(38, 72, [L("Dusk", "Brazo derecho.", "normal", 27, 47, 33, 54), L("Vesperwing", "Robótico. Articulación expuesta.", "normal", 72, 61, 67, 67)]),
    P(72, 100, [L("Shinjuro", "¡Protocolo de emergencia!", "scream", 72, 82, 67, 88), L("Dusk", "Tarde.", "normal", 28, 93, 34, 97)])
  ]},
  "70": { panels: [
    P(0, 100, [L("Vesperwing", "Lo sostengo.", "normal", 27, 20, 33, 28), L("Dusk", "No lo sueltes.", "normal", 72, 31, 67, 38), L("Shinjuro", "¡MI BRAZO!", "scream", 50, 54), L("Dusk", "Ya no.", "normal", 28, 86, 34, 92)])
  ]},
  "71": { panels: [
    P(0, 38, [L("Shinjuro", "Sellen el complejo. Nadie sale.", "scream", 72, 10, 67, 17), L("Vesperwing", "Está activando los cierres.", "normal", 27, 24, 33, 30)]),
    P(38, 72, [L("Dusk", "Y llamando refuerzos.", "normal", 27, 47, 33, 54), L("Vesperwing", "Entonces dejamos de perseguirlo.", "normal", 72, 61, 67, 67)]),
    P(72, 100, [L("Dusk", "Sobrevivimos.", "normal", 28, 82, 34, 88), L("Vesperwing", "Era mi segunda opción.", "normal", 72, 93, 67, 97)])
  ]},
  "72": { panels: [
    P(0, 38, [L("Vesperwing", "Dos a la izquierda.", "normal", 27, 10, 33, 17), L("Dusk", "Tres.", "normal", 72, 24, 67, 30)]),
    P(38, 72, [L("Vesperwing", "El tercero estaba atrás.", "normal", 27, 47, 33, 54), L("Dusk", "Por eso son tres.", "normal", 72, 61, 67, 67)]),
    P(72, 100, [L("Shinjuro", "Esto no termina acá.", "normal", 72, 82, 67, 88), L("Dusk", "No.", "normal", 28, 93, 34, 97), L("Dusk", "Pero vos sí terminaste por hoy.", "normal", 28, 97, 34, 99)])
  ]},
  "73": { panels: [
    P(0, 38, [L("Vesperwing", "Puerta cerrada.", "normal", 27, 10, 33, 17), L("Dusk", "Techo.", "normal", 72, 24, 67, 30)]),
    P(38, 72, [L("Vesperwing", "Grappling listo.", "normal", 27, 47, 33, 54), L("Dusk", "No me sueltes.", "normal", 72, 61, 67, 67)]),
    P(72, 100, [L("Vesperwing", "Esa parte sí sé hacerla.", "normal", 28, 93, 34, 97)])
  ]},
  "74": { panels: [
    P(0, 36, [L("Vesperwing", "¿Estás bien?", "normal", 27, 10, 33, 17), L("Dusk", "No.", "normal", 72, 24, 67, 30)]),
    P(36, 68, [L("Vesperwing", "Respuesta honesta.", "normal", 27, 44, 33, 51), L("Dusk", "No te acostumbres.", "normal", 72, 58, 67, 64)]),
    P(68, 100, [L("Vesperwing", "Buena suerte, Dusk.", "normal", 27, 77, 33, 84), L("Dusk", "No trabajo con suerte.", "normal", 72, 88, 67, 94), L("Vesperwing", "Ya lo noté.", "normal", 28, 96, 34, 99)])
  ]},
  "75": { panels: [
    P(0, 38, [L("BYTE", "Línea final a doscientos metros.", "electronic", 70, 10, 64, 17), L("Brooke", "Ahora.", "normal", 27, 24, 33, 30)]),
    P(38, 72, [L("BYTE", "Motor en zona roja.", "electronic", 70, 47, 64, 54), L("Brooke", "Que aguante diez segundos.", "normal", 27, 61, 33, 67)]),
    P(72, 100, [L("BYTE", "¡Primero!", "scream", 70, 83, 64, 89), L("Brooke", "El auto sigue entero.", "whisper", 28, 94, 34, 98)])
  ]},
  "76": { panels: [
    P(0, 36, [L("Piloto Supra", "Buena carrera.", "normal", 25, 10, 31, 17), L("Conductora 350Z", "No te pongas cómoda.", "normal", 72, 22, 67, 28), L("Brooke", "No pensaba hacerlo.", "normal", 50, 31, 50, 34)]),
    P(36, 70, [L("Daichi", "Sirenas.", "normal", 72, 45, 67, 52), L("Brooke", "BYTE, adentro.", "normal", 27, 58, 33, 64)]),
    P(70, 100, [L("Daichi", "Cada uno por su ruta. Nos vemos en el taller.", "normal", 72, 79, 67, 86), L("Conductora 350Z", "Si llegás.", "normal", 25, 89, 31, 94), L("Brooke", "Cuando llegue.", "normal", 50, 96, 50, 99)])
  ]},
  "77": { panels: [
    P(0, 38, [L("Policía", "Skyline plateado, deténgase.", "electronic", 72, 10, 67, 17), L("Brooke", "No.", "normal", 27, 24, 33, 30)]),
    P(38, 72, [L("BYTE", "Peatones adelante.", "electronic", 70, 47, 64, 54), L("Brooke", "Los vi.", "normal", 27, 61, 33, 67)]),
    P(72, 100, [L("BYTE", "Parking a la derecha.", "electronic", 70, 82, 64, 88), L("Brooke", "Apagá luces cuando entremos.", "normal", 28, 93, 34, 97)])
  ]},
  "78": { panels: [
    P(0, 23, [L("Brooke", "Silencio.", "whisper", 28, 10, 34, 17), L("BYTE", "La policía continúa.", "electronic", 70, 17, 64, 21)]),
    P(23, 54, [L("BYTE", "No estamos solos.", "electronic", 70, 34, 64, 41), L("Brooke", "Ya la vi.", "normal", 27, 47, 33, 52)]),
    P(54, 81, [L("Conductora 350Z", "Te tardaste.", "normal", 72, 62, 67, 69), L("Brooke", "Tenía compañía.", "normal", 27, 75, 33, 79)]),
    P(81, 100, [L("Conductora 350Z", "Ahora tenés otra.", "normal", 72, 88, 67, 94), L("Brooke", "Perfecto.", "normal", 28, 96, 34, 99)])
  ]},
  "79": { panels: [
    P(0, 36, [L("Organizador", "La ganadora de la noche.", "normal", 72, 10, 67, 17), L("Conductora 350Z", "De la carrera grande.", "normal", 27, 24, 33, 30)]),
    P(36, 70, [L("Organizador", "Acá adentro la ruta es corta. Las excusas también.", "normal", 72, 44, 67, 51), L("Brooke", "¿Premio?", "normal", 27, 58, 33, 64)]),
    P(70, 100, [L("Organizador", "Si ganás.", "normal", 72, 78, 67, 84), L("Brooke", "Entonces preparalo.", "normal", 28, 90, 34, 96)])
  ]},
  "80": { panels: [
    P(0, 50, [L("BYTE", "Columnas cada seis metros. Rampa en espiral.", "electronic", 70, 12, 64, 19), L("Brooke", "No me dibujes la línea.", "normal", 27, 26, 33, 32)]),
    P(50, 100, [L("BYTE", "¿Por qué?", "electronic", 70, 62, 64, 68), L("Brooke", "Quiero ver la de ella.", "normal", 27, 80, 33, 86)])
  ]},
  "81": { panels: [
    P(0, 45, [L("Conductora 350Z", "¿Esto es seguirme?", "normal", 72, 12, 67, 19), L("Brooke", "Esto es dejarte elegir el error.", "normal", 27, 27, 33, 33)]),
    P(45, 100, [L("BYTE", "Ambas trayectorias convergen.", "electronic", 70, 59, 64, 66), L("Brooke", "La mía sale más rápido.", "normal", 27, 75, 33, 81)])
  ]},
  "82": { panels: [
    P(0, 62, [L("Narrador", "Dos líneas alrededor del mismo vacío.", "caption", 50, 12), L("Narrador", "Una persigue estilo. La otra, salida.", "caption", 50, 51)]),
    P(62, 100, [L("Conductora 350Z", "Empate.", "normal", 72, 74, 67, 81), L("Brooke", "No.", "normal", 27, 87, 33, 93), L("Brooke", "Reconocimiento.", "normal", 28, 96, 34, 99)])
  ]},
  "83": { panels: [
    P(0, 38, [L("Conductora 350Z", "La próxima no te dejo la salida.", "normal", 72, 10, 67, 17), L("Brooke", "La próxima no la necesito.", "normal", 27, 24, 33, 30)]),
    P(38, 75, [L("Organizador", "Carrera principal. Duelo del parking. Auto entero.", "normal", 72, 45, 67, 52), L("Organizador", "La noche fue tuya.", "normal", 72, 59, 67, 65), L("Brooke", "La noche fue de todos.", "normal", 27, 68, 33, 72)]),
    P(75, 100, [L("BYTE", "¿Volvemos a casa?", "electronic", 70, 82, 64, 88), L("Brooke", "Sí.", "normal", 28, 93, 34, 97)])
  ]},
  "84": { panels: [
    P(0, 30, [L("Brooke", "Daichi... ¿qué hiciste?", "normal", 27, 10, 33, 17), L("Daichi", "Yo no.", "normal", 72, 22, 67, 28)]),
    P(30, 60, [L("BYTE", "Sistemas nuevos. Herramientas nuevas. Mesa vieja preservada.", "electronic", 70, 38, 64, 45), L("Daichi", "Ese chico no sabe hacer algo pequeño.", "normal", 27, 53, 33, 59)]),
    P(60, 86, [L("Ian — carta", "Daichi: no sabía cómo agradecerte sin convertirlo en un proyecto.", "caption", 50, 66), L("Ian — carta", "Así que lo convertí en un proyecto.", "caption", 50, 79)]),
    P(86, 100, [L("Ian — carta", "No reemplacé nada que importara. Solo agregué herramientas para lo que venga.", "caption", 50, 92), L("Daichi", "Idiota.", "whisper", 75, 97, 70, 99)])
  ]},
  "85": { panels: [
    P(0, 36, [L("Ian", "Entrar por la ventana fue una mala decisión.", "thought", 28, 10, 34, 17), L("Ian", "La escalera habría sido objetivamente mejor.", "thought", 30, 25, 35, 31)]),
    P(36, 70, [L("Ian", "Una bota.", "thought", 28, 47, 34, 54), L("Ian", "Después la otra.", "thought", 30, 61, 35, 67)]),
    P(70, 100, [L("Ian", "O ninguna.", "thought", 28, 84, 34, 90), L("SFX", "PLOF", "sfx", 72, 94)])
  ]},
  "86": { panels: [
    P(0, 32, [L("Jaz", "Ian. Despertate.", "electronic", 72, 10, 67, 17), L("Ian", "Estoy despierto en un sentido muy flexible.", "normal", 27, 23, 33, 29)]),
    P(32, 58, [L("Jaz", "¿Recordás que tenías que volver?", "electronic", 72, 39, 67, 46), L("Ian", "Sí.", "normal", 27, 51, 33, 56)]),
    P(58, 78, [L("Ian", "No lo recordaba.", "thought", 28, 66, 34, 72)]),
    P(78, 100, [L("Jaz", "Hay otro problema.", "electronic", 72, 83, 67, 89), L("Ian", "Definí 'otro'.", "normal", 28, 94, 34, 98)])
  ]},
  "87": { panels: [
    P(0, 35, [L("Narrador", "EAST SIDE. NUEVA YORK.", "caption", 50, 10), L("Ian", "Vine directo del aeropuerto.", "normal", 27, 27, 33, 33)]),
    P(35, 70, [L("Jaz", "Te habría dejado dormir si esto pudiera esperar.", "normal", 72, 43, 67, 50), L("Ian", "¿Qué hizo Norman?", "normal", 27, 57, 33, 63)]),
    P(70, 100, [L("Jaz", "No es Norman.", "normal", 72, 76, 67, 82), L("Ian", "Entonces ¿qué—?", "normal", 27, 85, 33, 90), L("Jaz", "Él.", "normal", 72, 91, 67, 95), L("Uandi", "¿Alguien quiere mate?", "normal", 25, 97, 31, 99)])
  ]},
  "88": { panels: [
    P(0, 38, [L("Ian", "¿Desde cuándo está acá?", "normal", 27, 10, 33, 17), L("Uandi", "Hace un rato.", "normal", 72, 24, 67, 30), L("Jaz", "Ian se refiere al problema.", "normal", 50, 32, 50, 35)]),
    P(38, 70, [L("Ian", "Necesito información completa.", "normal", 27, 45, 33, 52), L("Jaz", "La vas a tener. Mientras te preparás.", "normal", 72, 59, 67, 65)]),
    P(70, 100, [L("Uandi", "Buen traje.", "normal", 72, 79, 67, 86), L("Ian", "Todavía no me lo puse.", "normal", 27, 90, 33, 95), L("Uandi", "La valija transmite confianza.", "normal", 72, 96, 67, 99)])
  ]},
  "89": { panels: [
    P(0, 38, [L("Ian", "Guante izquierdo dañado. Grappling derecho al sesenta por ciento.", "normal", 27, 10, 33, 17), L("Jaz", "¿Eso alcanza?", "normal", 72, 24, 67, 30)]),
    P(38, 72, [L("Ian", "No.", "normal", 27, 45, 33, 52), L("Ian", "Pero es lo que tenemos.", "normal", 27, 57, 33, 63), L("Uandi", "Esa frase sí transmite menos confianza.", "normal", 72, 65, 67, 70)]),
    P(72, 100, [L("Jaz", "Yo cubro lo que falte.", "normal", 72, 79, 67, 86), L("Ian", "Lo sé.", "normal", 28, 91, 34, 96)])
  ]},
  "90": { panels: [
    P(0, 52, [L("Jaz", "La puerta está atrás.", "normal", 72, 12, 67, 19), L("Vesperwing", "La ventana es más rápida.", "normal", 27, 26, 33, 32), L("Jaz", "Para mí, sí.", "normal", 72, 40, 67, 46)]),
    P(52, 100, [L("Vesperwing", "Yo no vuelo.", "normal", 27, 65, 33, 72), L("Jaz", "Lo noté.", "normal", 72, 82, 67, 88)])
  ]},
  "91": { panels: [P(0, 100, [L("Vesperwing", "¿Qué tan grave es?", "normal", 27, 18, 33, 25), L("Jaz", "Lo suficiente para que no terminaras de dormir.", "normal", 72, 32, 67, 39), L("Vesperwing", "Entonces vamos.", "normal", 27, 83, 33, 90), L("Narrador", "PRIMER VUELO.", "cinematic", 72, 92)])]},
  "92": { panels: [P(0, 100, [L("Narrador", "TOKIO. ESA MISMA NOCHE.", "caption", 50, 12), L("Narrador", "Una casa todavía mantiene la luz encendida.", "caption", 50, 86)])]},
  "93": { panels: [
    P(0, 35, [L("Sofi", "Llegué.", "whisper", 28, 12, 34, 19), L("Sofi", "Kenji... llegué.", "thought", 72, 25, 67, 31)]),
    P(35, 72, [L("Sofi", "No sé si eso cuenta como volver.", "thought", 28, 45, 34, 52), L("Sofi", "Pero estoy acá.", "thought", 72, 61, 67, 67)]),
    P(72, 100, [L("Sofi", "Hola, pequeño.", "whisper", 28, 82, 34, 88), L("Sofi", "Vos no necesitás explicaciones.", "thought", 70, 93, 64, 97)])
  ]},
  "94": { panels: [
    P(0, 42, [L("Víctima", "¡AYUDA!", "scream", 72, 12, 67, 19), L("Sofi", "No.", "whisper", 27, 25, 33, 31)]),
    P(42, 72, [L("Sofi", "Cinco minutos.", "thought", 28, 49, 34, 56), L("Sofi", "No puedo tener cinco minutos.", "thought", 30, 62, 35, 68)]),
    P(72, 100, [L("Narrador", "El gato mira la habitación vacía.", "caption", 50, 82), L("Narrador", "También faltan las espadas.", "caption", 50, 94)])
  ]},
  "95": { panels: [
    P(0, 45, [L("Agresor", "¿Qué carajo—?", "scream", 72, 12, 67, 19), L("Dusk", "Suéltenlo.", "normal", 27, 28, 33, 34)]),
    P(45, 100, [L("Narrador", "Sofi consiguió volver a casa.", "caption", 50, 58), L("Narrador", "Dusk todavía no sabe quedarse allí.", "caption", 50, 88)])
  ]}
};

fs.writeFileSync(outputPath, `${JSON.stringify({ pages, audioTracks: previous.audioTracks ?? [] }, null, 2)}\n`, "utf8");
console.log(`Generated ${Object.keys(pages).length} pages at ${outputPath}`);
