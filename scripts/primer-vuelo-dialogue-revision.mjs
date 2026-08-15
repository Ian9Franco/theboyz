const line = (speaker, text, style, posX, posY, tailX = posX, tailY = posY + 8) => {
  const result = { text, speaker, size: style === "caption" ? "medium" : "small", posX, posY };

  if (style !== "normal") result.style = style;

  if (style === "caption" || style === "cinematic" || style === "sfx") {
    result.tail = "none";
  } else {
    result.tailX = tailX;
    result.tailY = tailY;
    result.tailWidth = 6;
    result.tailCurvature = -22;
  }

  return result;
};

const dialogueByPage = {
  "1": [
    [
      line("Brooke", "¿Eso es equipaje o estás desarmando el taller para una carrera?", "normal", 76, 8, 72, 19),
      line("Ian", "Es una carrera clandestina. No publicaron reglamento de equipaje.", "normal", 26, 18, 31, 25),
    ],
    [
      line("Brooke", "Regla uno: yo manejo.", "normal", 73, 38, 68, 49),
      line("Ian", "Eso no es una regla. Es la conclusión que repetís cada vez que alguien dice ‘auto’.", "normal", 27, 50, 33, 58),
      line("BYTE", "Frecuencia registrada: catorce veces.", "electronic", 53, 60, 52, 64),
    ],
    [
      line("Daichi", "Brooke maneja.", "normal", 24, 73, 29, 82),
      line("Ian", "Quince.", "normal", 28, 88, 34, 92),
      line("Brooke", "Me gusta cuando la ciencia funciona.", "normal", 73, 80, 68, 89),
    ],
  ],
  "2": [
    [
      line("Jaz", "Para que la carrera distraiga a Kurogane, tiene que parecer que toda la noche depende de ella.", "electronic", 78, 8, 83, 18),
      line("Brooke", "Entonces depende de mí.", "normal", 55, 21, 59, 27),
      line("Ian", "La modestia también se queda en boxes.", "normal", 24, 27, 30, 32),
    ],
    [
      line("Jaz", "Mientras Brooke arrastra la seguridad hacia la ruta, Dusk entra por el corredor de servicio.", "electronic", 76, 40, 80, 49),
      line("Dusk", "Libero a los retenidos. Desarmo la operación.", "electronic", 75, 58, 78, 64),
    ],
    [
      line("Daichi", "¿Y nosotros?", "normal", 74, 73, 68, 81),
      line("Ian", "Vos mantenés vivo el auto. Yo mantengo vivo el plan.", "normal", 27, 82, 33, 89),
      line("Brooke", "¿Quién te mantiene vivo a vos?", "normal", 72, 91, 67, 95),
      line("Ian", "Todavía estamos asignando recursos.", "normal", 28, 97, 34, 99),
    ],
  ],
  "3": [
    [
      line("Daichi", "La carrera exige todo del Skyline. La infiltración exige que nadie mire hacia adentro.", "normal", 28, 8, 33, 18),
      line("Jaz", "Puedo cegar cámaras y abrir ventanas. No sostenerlas para siempre.", "electronic", 75, 22, 80, 29),
    ],
    [
      line("Ian", "Dusk necesita nueve minutos.", "normal", 27, 42, 33, 49),
      line("Dusk", "Ocho.", "electronic", 76, 54, 72, 60),
      line("BYTE", "Margen de optimismo: doce coma cinco por ciento.", "electronic", 27, 64, 33, 69),
    ],
    [
      line("Brooke", "Entonces ganamos un minuto manejando más rápido.", "normal", 72, 78, 67, 86),
      line("Daichi", "Así no funciona el tiempo.", "normal", 27, 88, 33, 93),
      line("Brooke", "En una carrera, sí.", "normal", 72, 95, 67, 98),
    ],
  ],
  "4": [
    [
      line("Brooke", "Bien. ¿Quién le explica todo esto a Ren?", "normal", 72, 8, 67, 18),
      line("Ian", "Ren no está.", "normal", 27, 21, 33, 27),
      line("Daichi", "No volvió anoche.", "normal", 73, 27, 68, 31),
    ],
    [
      line("BYTE", "La camioneta salió ayer a las veintidós catorce. El rastreador sigue activo.", "electronic", 23, 42, 29, 50),
      line("Brooke", "¿Y recién lo vemos ahora?", "normal", 72, 57, 67, 63),
      line("Ian", "Estábamos mirando el mapa equivocado.", "normal", 27, 64, 33, 68),
    ],
    [
      line("Daichi", "Ubicación.", "normal", 74, 76, 69, 84),
      line("BYTE", "Zona industrial.", "electronic", 28, 85, 34, 90),
      line("Daichi", "Vamos a buscarlo.", "normal", 72, 93, 67, 97),
    ],
  ],
  "5": [
    [
      line("Ren", "Sabía que seguían enojados.", "normal", 24, 10, 30, 18),
      line("ONI", "Robaste al clan.", "normal", 74, 20, 70, 27),
    ],
    [
      line("Ren", "Hace bastante. Pensé que con el tiempo iba a pasar de traición a anécdota.", "normal", 27, 45, 33, 53),
      line("ONI", "No.", "normal", 74, 60, 70, 65),
    ],
    [
      line("Ren", "Sí, bueno. Vos nunca fuiste de cerrar ciclos.", "normal", 27, 75, 33, 83),
      line("ONI", "Estás muerto.", "normal", 74, 88, 70, 94),
      line("Ren", "Eso es bastante definitivo.", "normal", 28, 96, 34, 99),
    ],
  ],
  "6": [
    [
      line("Ren", "Puerta bloqueada. Escalera. Salida de servicio.", "thought", 27, 10, 33, 18),
      line("ONI", "Corré.", "normal", 73, 24, 69, 30),
    ],
    [
      line("Ren", "Era el plan.", "normal", 27, 43, 33, 50),
      line("Ren", "Mierda.", "normal", 27, 61, 33, 66),
    ],
    [
      line("Ren", "Podríamos fingir que no me viste.", "normal", 28, 77, 34, 84),
      line("ONI", "No.", "normal", 73, 90, 69, 95),
      line("Ren", "Tenía que intentarlo.", "normal", 29, 96, 35, 99),
    ],
  ],
  "7": [
    [
      line("Ren", "Esperá...", "whisper", 27, 11, 33, 18),
      line("ONI", "No.", "normal", 73, 25, 69, 31),
    ],
    [
      line("Teléfono", "RASTREO ACTIVO", "electronic", 50, 52, 50, 58),
      line("Teléfono", "SEÑAL COMPARTIDA", "electronic", 50, 63, 50, 68),
    ],
    [
      line("Narrador", "ONI ve el punto rojo.", "caption", 50, 78),
      line("Narrador", "Entiende que alguien viene.", "caption", 50, 90),
    ],
  ],
  "8": [
    [
      line("Narrador", "ONI revisa lo que Ren llevaba.", "caption", 50, 10),
      line("Dispositivo", "DATOS IRRECUPERABLES", "electronic", 28, 37, 33, 43),
    ],
    [
      line("Narrador", "El rastreador sigue emitiendo.", "caption", 50, 59),
      line("Narrador", "ONI decide dejarlo.", "caption", 50, 70),
      line("ONI", "Que vengan.", "normal", 27, 80, 33, 86),
      line("Narrador", "Debajo del piso, otra señal espera.", "caption", 50, 94),
    ],
  ],
  "9": [
    [
      line("Narrador", "A la mañana siguiente.", "caption", 50, 7),
      line("Brooke", "Ren no responde desde ayer.", "normal", 73, 18, 68, 25),
      line("Ian", "El teléfono sigue emitiendo.", "normal", 27, 27, 33, 32),
    ],
    [
      line("BYTE", "Doscientos metros. A la derecha.", "electronic", 50, 45, 51, 53),
      line("Daichi", "La camioneta.", "normal", 26, 61, 32, 66),
    ],
    [
      line("BYTE", "Puerta lateral abierta.", "electronic", 28, 76, 34, 83),
      line("Brooke", "Eso no es propio de Ren.", "normal", 72, 87, 67, 93),
      line("Daichi", "No. Quédense cerca.", "normal", 27, 95, 33, 98),
    ],
  ],
  "10": [
    [
      line("Ian", "Ren, ¿me escuchás?", "normal", 27, 9, 33, 17),
      line("Teléfono", "La llamada ha sido transferida...", "electronic", 72, 23, 67, 30),
      line("Brooke", "No está en la camioneta.", "normal", 27, 32, 33, 36),
    ],
    [
      line("BYTE", "Hay un rastro.", "electronic", 71, 44, 65, 51),
      line("Daichi", "Sangre.", "normal", 26, 58, 32, 64),
      line("Brooke", "Daichi, esperá.", "normal", 72, 66, 67, 70),
    ],
    [
      line("Daichi", "No.", "normal", 27, 77, 33, 83),
      line("Daichi", "Ren...", "whisper", 28, 91, 34, 96),
    ],
  ],
  "11": [
    [
      line("Narrador", "Nadie sabe qué pasó. Sólo saben quién no volvió.", "caption", 50, 7),
      line("Daichi", "Despacio.", "whisper", 26, 24, 32, 30),
      line("Brooke", "Lo tenemos.", "whisper", 73, 31, 68, 35),
    ],
    [
      line("Ian", "No hay una ecuación para esto. No hay una versión del plan donde Ren se levante.", "thought", 28, 43, 34, 51),
      line("BYTE", "Detecté otra transmisión.", "electronic", 72, 59, 66, 65),
      line("Ian", "¿De su teléfono?", "normal", 27, 67, 33, 71),
    ],
    [
      line("BYTE", "No. Viene de debajo del depósito.", "electronic", 29, 77, 35, 84),
      line("Brooke", "¿No vamos a buscarla?", "normal", 72, 87, 67, 92),
      line("Daichi", "Primero llevamos a Ren a casa.", "normal", 28, 95, 34, 98),
    ],
  ],
  "12": [
    [
      line("Daichi", "Tenía una excusa para todo.", "normal", 27, 9, 33, 17),
      line("Brooke", "Esta vez no.", "whisper", 73, 24, 68, 30),
    ],
    [
      line("BYTE", "La segunda señal sigue activa.", "electronic", 73, 49, 67, 56),
      line("Ian", "No sabemos quién hizo esto.", "normal", 27, 62, 33, 68),
      line("Daichi", "Todavía.", "normal", 28, 70, 34, 74),
    ],
    [
      line("Ian", "El plan seguía sobre la mesa. Ren estaba sobre otra.", "thought", 28, 80, 34, 87),
      line("Ian", "De pronto, la diferencia importaba.", "thought", 31, 93, 37, 97),
    ],
  ],
};

const renumberPages = (pages) => {
  if (!pages?.["95"]) return pages;

  const result = {};
  for (const [pageKey, page] of Object.entries(pages)) {
    const pageNumber = Number(pageKey);
    if (pageNumber === 11 || pageNumber === 12) continue;
    result[String(pageNumber >= 13 ? pageNumber - 2 : pageNumber)] = page;
  }
  return result;
};

export const applyPrimerVueloRevision = (document) => {
  const revised = structuredClone(document);
  revised.pages = renumberPages(revised.pages ?? {});

  for (const [pageKey, panels] of Object.entries(dialogueByPage)) {
    const page = revised.pages[pageKey];
    if (!page) throw new Error(`Missing Primer Vuelo page ${pageKey}`);
    if (page.panels.length !== panels.length) {
      throw new Error(`Panel mismatch on Primer Vuelo page ${pageKey}: ${page.panels.length} != ${panels.length}`);
    }
    page.panels.forEach((panel, index) => {
      panel.dialogue = panels[index];
    });
  }

  for (const track of revised.audioTracks ?? []) {
    if (track.startPageKey === "78") track.startPageKey = "76";
    if (track.stopTrigger?.pageKey === "83") track.stopTrigger.pageKey = "81";
  }

  return revised;
};
