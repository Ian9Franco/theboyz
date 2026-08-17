const line = (speaker, text, style, posX, posY, tailX = posX, tailY = posY + 8) => {
  const result = { text, speaker, size: style === "caption" ? "medium" : "small", posX, posY };

  if (/^oni$/i.test(speaker)) {
    result.speaker = "ONI";
    result.customBg = "#e81818";
    result.customColor = "#ffffff";
    result.textColor = "#000000";
  }
  if (/^shinjuro$/i.test(speaker)) {
    result.speaker = "Shinjuro";
    result.customBg = "#0b1f3a";
    result.customColor = "#000000";
    result.textColor = "#ffffff";
  }

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
      line("Ren", "No debería haber nadie acá.", "thought", 70, 9, 30, 18),
    ],
    [
      line("Ren", "ONI…", "normal", 25, 30, 31, 38),
      line("ONI", "Ren.", "normal", 72, 41, 68, 47),
    ],
    [
      line("Ren", "Eso fue hace años.", "normal", 23, 56, 29, 64),
    ],
    [
      line("ONI", "Kurogane recuerda.", "normal", 75, 55, 71, 63),
      line("SFX", "KRAK", "sfx", 74, 69),
    ],
    [
      line("Ren", "No vino a recuperar nada.", "thought", 28, 81, 34, 87),
      line("Ren", "Vino a cobrar.", "thought", 70, 92, 65, 96),
    ],
  ],
  "6": [
    [
      line("Ren", "Pasarela norte. Escalera. Calle.", "thought", 72, 10, 31, 19),
    ],
    [
      line("SFX", "CLINK", "sfx", 40, 38),
      line("Ren", "No mires abajo.", "thought", 23, 49, 29, 53),
    ],
    [
      line("Ren", "¡Soltame!", "scream", 62, 36, 58, 45),
      line("ONI", "No.", "normal", 83, 49, 79, 53),
    ],
    [
      line("Ren", "No vas a sacarme nada.", "normal", 25, 61, 31, 69),
      line("ONI", "No vine a preguntar.", "normal", 73, 72, 69, 78),
    ],
    [
      line("SFX", "THK", "sfx", 24, 85),
      line("Ren", "No tengo que ganarle.", "thought", 40, 93, 45, 97),
    ],
    [
      line("Ren", "Sólo tengo que llegar a la salida.", "thought", 76, 90, 70, 96),
    ],
  ],
  "7": [
    [
      line("Ren", "La puerta.", "thought", 71, 9, 65, 16),
      line("Ren", "Llegá a la puerta.", "thought", 70, 20, 64, 25),
    ],
    [
      line("Ren", "Cinco metros.", "thought", 24, 36, 30, 42),
    ],
    [],
    [
      line("SFX", "TCHK", "sfx", 25, 70),
      line("SFX", "TCHK", "sfx", 50, 73),
      line("SFX", "TCHK", "sfx", 75, 70),
    ],
    [
      line("Ren", "La salida estaba ahí.", "thought", 70, 89, 64, 95),
    ],
  ],
  "8": [
    [
      line("Ren", "Todavía… puedo…", "whisper", 25, 13, 31, 21),
      line("ONI", "No.", "normal", 74, 24, 70, 29),
    ],
    [
      line("Ren", "Ellos no tienen nada que ver.", "normal", 66, 43, 61, 49),
    ],
    [
      line("ONI", "Ahora sí.", "normal", 71, 62, 67, 69),
    ],
    [
      line("Dispositivo", "RASTREO ACTIVO", "electronic", 79, 94, 84, 97),
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

const panelLayouts = {
  "5": [
    { focusY: 0.125, zoomRects: [{ x: 0, y: 0, w: 100, h: 25 }] },
    { focusY: 0.37, zoomRects: [{ x: 0, y: 25, w: 100, h: 24 }] },
    { focusY: 0.625, zoomRects: [{ x: 0, y: 49, w: 53, h: 27 }] },
    { focusY: 0.625, zoomRects: [{ x: 48, y: 49, w: 52, h: 27 }] },
    { focusY: 0.88, zoomRects: [{ x: 0, y: 76, w: 100, h: 24 }] },
  ],
  "6": [
    { focusY: 0.145, zoomRects: [{ x: 0, y: 0, w: 100, h: 29 }] },
    { focusY: 0.415, zoomRects: [{ x: 0, y: 29, w: 50, h: 25 }] },
    { focusY: 0.415, zoomRects: [{ x: 45, y: 29, w: 55, h: 25 }] },
    { focusY: 0.67, zoomRects: [{ x: 0, y: 54, w: 100, h: 26 }] },
    { focusY: 0.9, zoomRects: [{ x: 0, y: 80, w: 55, h: 20 }] },
    { focusY: 0.9, zoomRects: [{ x: 50, y: 80, w: 50, h: 20 }] },
  ],
  "7": [
    { focusY: 0.13, zoomRects: [{ x: 0, y: 0, w: 100, h: 26 }] },
    { focusY: 0.36, zoomRects: [{ x: 0, y: 26, w: 100, h: 20 }] },
    { focusY: 0.54, zoomRects: [{ x: 0, y: 46, w: 100, h: 16 }] },
    { focusY: 0.7, zoomRects: [{ x: 0, y: 62, w: 100, h: 16 }] },
    { focusY: 0.89, zoomRects: [{ x: 0, y: 78, w: 100, h: 22 }] },
  ],
  "8": [
    { focusY: 0.145, zoomRects: [{ x: 0, y: 0, w: 100, h: 29 }] },
    { focusY: 0.39, zoomRects: [{ x: 0, y: 29, w: 100, h: 20 }] },
    { focusY: 0.6, zoomRects: [{ x: 0, y: 49, w: 100, h: 22 }] },
    { focusY: 0.855, zoomRects: [{ x: 0, y: 71, w: 100, h: 29 }] },
  ],
};

const insertedPageLayouts = {
  "24": [
    { focusY: 0.18, zoomRects: [{ x: 0, y: 0, w: 57, h: 36 }] },
    { focusY: 0.18, zoomRects: [{ x: 52, y: 0, w: 48, h: 36 }] },
    { focusY: 0.48, zoomRects: [{ x: 0, y: 36, w: 100, h: 24 }] },
    { focusY: 0.69, zoomRects: [{ x: 0, y: 60, w: 100, h: 18 }] },
    { focusY: 0.89, zoomRects: [{ x: 0, y: 78, w: 50, h: 22 }] },
    { focusY: 0.89, zoomRects: [{ x: 48, y: 78, w: 52, h: 22 }] },
  ],
  "28": [
    { focusY: 0.135, zoomRects: [{ x: 0, y: 0, w: 100, h: 27 }] },
    { focusY: 0.385, zoomRects: [{ x: 0, y: 27, w: 100, h: 23 }] },
    { focusY: 0.555, zoomRects: [{ x: 0, y: 50, w: 100, h: 11 }] },
    { focusY: 0.695, zoomRects: [{ x: 0, y: 61, w: 100, h: 17 }] },
    { focusY: 0.89, zoomRects: [{ x: 0, y: 78, w: 100, h: 22 }] },
  ],
};

const duskOniInsertedPageLayouts = {
  "40": [
    { focusY: 0.13, zoomRects: [{ x: 0, y: 0, w: 100, h: 26 }] },
    { focusY: 0.33, zoomRects: [{ x: 0, y: 23, w: 52, h: 22 }] },
    { focusY: 0.33, zoomRects: [{ x: 48, y: 23, w: 52, h: 22 }] },
    { focusY: 0.56, zoomRects: [{ x: 0, y: 43, w: 100, h: 25 }] },
    { focusY: 0.84, zoomRects: [{ x: 0, y: 66, w: 100, h: 34 }] },
  ],
  "41": [
    { focusY: 0.125, zoomRects: [{ x: 0, y: 0, w: 100, h: 25 }] },
    { focusY: 0.375, zoomRects: [{ x: 0, y: 25, w: 100, h: 25 }] },
    { focusY: 0.625, zoomRects: [{ x: 0, y: 50, w: 100, h: 25 }] },
    { focusY: 0.875, zoomRects: [{ x: 0, y: 75, w: 100, h: 25 }] },
  ],
};

const renumberPages = (pages) => {
  if (!pages?.["95"] || pages?.["5"]?.panels?.length === 5) {
    return { pages, removed: false };
  }

  const result = {};
  for (const [pageKey, page] of Object.entries(pages)) {
    const pageNumber = Number(pageKey);
    if (pageNumber === 11 || pageNumber === 12) continue;
    result[String(pageNumber >= 13 ? pageNumber - 2 : pageNumber)] = page;
  }
  return { pages: result, removed: true };
};

const insertRacePages = (pages) => {
  const insertsAlreadyPresent = pages?.["24"]?.panels?.length === 6
    && pages?.["28"]?.panels?.length === 5;
  if (insertsAlreadyPresent) return { pages, inserted: false };

  const result = {};
  for (const [pageKey, page] of Object.entries(pages)) {
    const pageNumber = Number(pageKey);
    const shifted = pageNumber >= 27 ? pageNumber + 2 : pageNumber >= 24 ? pageNumber + 1 : pageNumber;
    result[String(shifted)] = page;
  }

  for (const [pageKey, layout] of Object.entries(insertedPageLayouts)) {
    result[pageKey] = {
      panels: layout.map((panel) => ({ ...panel, dialogue: [] })),
    };
  }

  return { pages: result, inserted: true };
};

const removeRacePage34 = (pages) => {
  if (!pages?.["95"]) return { pages, removed: false };

  const result = {};
  for (const [pageKey, page] of Object.entries(pages)) {
    const pageNumber = Number(pageKey);
    if (pageNumber === 34) continue;
    result[String(pageNumber >= 35 ? pageNumber - 1 : pageNumber)] = page;
  }

  return { pages: result, removed: true };
};

const removeRacePages34And35 = (pages) => {
  if (!pages?.["94"]) return { pages, removed: false };

  const result = {};
  for (const [pageKey, page] of Object.entries(pages)) {
    const pageNumber = Number(pageKey);
    if (pageNumber === 34 || pageNumber === 35) continue;
    result[String(pageNumber >= 36 ? pageNumber - 2 : pageNumber)] = page;
  }

  return { pages: result, removed: true };
};

const shiftAudioAfterRemovingPages34And35 = (tracks) => {
  for (const track of tracks ?? []) {
    const startPage = Number(track.startPageKey);
    if (Number.isInteger(startPage) && startPage >= 36) {
      track.startPageKey = String(startPage - 2);
    }
    const stopPage = Number(track.stopTrigger?.pageKey);
    if (Number.isInteger(stopPage) && stopPage >= 36) {
      track.stopTrigger.pageKey = String(stopPage - 2);
    }
  }
};

const insertDuskOniPagesAfter39 = (pages) => {
  const result = {};
  for (const [pageKey, page] of Object.entries(pages)) {
    const pageNumber = Number(pageKey);
    result[String(pageNumber >= 40 ? pageNumber + 2 : pageNumber)] = page;
  }

  for (const [pageKey, layout] of Object.entries(duskOniInsertedPageLayouts)) {
    result[pageKey] = {
      panels: layout.map((panel) => ({ ...panel, dialogue: [] })),
    };
  }

  return result;
};

const shiftAudioAfterInsertingPagesAfter39 = (tracks) => {
  for (const track of tracks ?? []) {
    const startPage = Number(track.startPageKey);
    if (Number.isInteger(startPage) && startPage >= 40) {
      track.startPageKey = String(startPage + 2);
    }
    const stopPage = Number(track.stopTrigger?.pageKey);
    if (Number.isInteger(stopPage) && stopPage >= 40) {
      track.stopTrigger.pageKey = String(stopPage + 2);
    }
  }
};

const removePages55And66 = (pages) => {
  const result = {};
  for (const [pageKey, page] of Object.entries(pages)) {
    const pageNumber = Number(pageKey);
    if (pageNumber === 55 || pageNumber === 66) continue;
    const shifted = pageNumber >= 67 ? pageNumber - 2 : pageNumber >= 56 ? pageNumber - 1 : pageNumber;
    result[String(shifted)] = page;
  }
  return result;
};

const shiftAudioAfterRemovingPages55And66 = (tracks) => {
  const remap = (pageNumber) => pageNumber >= 67 ? pageNumber - 2 : pageNumber >= 56 ? pageNumber - 1 : pageNumber;

  for (let index = (tracks?.length ?? 0) - 1; index >= 0; index -= 1) {
    const track = tracks[index];
    const startPage = Number(track.startPageKey);
    if (startPage === 55 || startPage === 66) {
      tracks.splice(index, 1);
      continue;
    }
    if (Number.isInteger(startPage)) track.startPageKey = String(remap(startPage));

    const stopPage = Number(track.stopTrigger?.pageKey);
    if (Number.isInteger(stopPage)) {
      if (stopPage === 55) track.stopTrigger.pageKey = "54";
      else if (stopPage === 66) track.stopTrigger.pageKey = "64";
      else track.stopTrigger.pageKey = String(remap(stopPage));
    }
  }
};

export const applyPrimerVueloRevision = (document) => {
  if (document.primerVueloRevision === 7) return structuredClone(document);

  if (document.primerVueloRevision === 6) {
    const revised = structuredClone(document);
    revised.pages = removePages55And66(revised.pages ?? {});
    shiftAudioAfterRemovingPages55And66(revised.audioTracks);
    revised.primerVueloRevision = 7;
    return revised;
  }

  if (document.primerVueloRevision === 5) {
    const revised = structuredClone(document);
    revised.pages = insertDuskOniPagesAfter39(revised.pages ?? {});
    shiftAudioAfterInsertingPagesAfter39(revised.audioTracks);
    revised.pages = removePages55And66(revised.pages);
    shiftAudioAfterRemovingPages55And66(revised.audioTracks);
    revised.primerVueloRevision = 7;
    return revised;
  }

  if (document.primerVueloRevision === 4) {
    const revised = structuredClone(document);
    const finalRemoval = removeRacePages34And35(revised.pages ?? {});
    revised.pages = finalRemoval.pages;
    if (finalRemoval.removed) shiftAudioAfterRemovingPages34And35(revised.audioTracks);
    revised.pages = insertDuskOniPagesAfter39(revised.pages);
    shiftAudioAfterInsertingPagesAfter39(revised.audioTracks);
    revised.pages = removePages55And66(revised.pages);
    shiftAudioAfterRemovingPages55And66(revised.audioTracks);
    revised.primerVueloRevision = 7;
    return revised;
  }

  const revised = structuredClone(document);
  const renumbered = renumberPages(revised.pages ?? {});
  const withInserts = insertRacePages(renumbered.pages);
  const withoutPage34 = removeRacePage34(withInserts.pages);
  const finalRemoval = removeRacePages34And35(withoutPage34.pages);
  revised.pages = finalRemoval.pages;

  if (renumbered.removed) {
    for (const [pageKey, panels] of Object.entries(dialogueByPage)) {
      const page = revised.pages[pageKey];
      if (!page) throw new Error(`Missing Primer Vuelo page ${pageKey}`);
      const layout = panelLayouts[pageKey];
      if (layout) {
        if (layout.length !== panels.length) {
          throw new Error(`Layout mismatch on Primer Vuelo page ${pageKey}: ${layout.length} != ${panels.length}`);
        }
        page.panels = layout.map((panel, index) => ({ ...panel, dialogue: panels[index] }));
        continue;
      }
      if (page.panels.length !== panels.length) {
        throw new Error(`Panel mismatch on Primer Vuelo page ${pageKey}: ${page.panels.length} != ${panels.length}`);
      }
      page.panels.forEach((panel, index) => {
        panel.dialogue = panels[index];
      });
    }
  }

  for (const track of revised.audioTracks ?? []) {
    if (renumbered.removed) {
      if (track.startPageKey === "78") track.startPageKey = "76";
      if (track.stopTrigger?.pageKey === "83") track.stopTrigger.pageKey = "81";
    }
    if (withInserts.inserted) {
      if (track.startPageKey === "76") track.startPageKey = "78";
      if (track.stopTrigger?.pageKey === "81") track.stopTrigger.pageKey = "83";
    }
    if (withoutPage34.removed) {
      const startPage = Number(track.startPageKey);
      if (Number.isInteger(startPage) && startPage >= 35) {
        track.startPageKey = String(startPage - 1);
      }
      const stopPage = Number(track.stopTrigger?.pageKey);
      if (Number.isInteger(stopPage) && stopPage >= 35) {
        track.stopTrigger.pageKey = String(stopPage - 1);
      }
    }
  }

  if (finalRemoval.removed) shiftAudioAfterRemovingPages34And35(revised.audioTracks);

  revised.pages = insertDuskOniPagesAfter39(revised.pages);
  shiftAudioAfterInsertingPagesAfter39(revised.audioTracks);
  revised.pages = removePages55And66(revised.pages);
  shiftAudioAfterRemovingPages55And66(revised.audioTracks);
  revised.primerVueloRevision = 7;

  return revised;
};
