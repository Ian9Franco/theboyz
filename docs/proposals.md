# 📖 Proposals — Optimizaciones del Lector Cinematográfico

> Análisis técnico completo del `CinematicReader` y sus componentes, con propuestas de mejora agrupadas por área. Cada sección incluye **el estado actual**, **el problema identificado** y **la propuesta concreta**.

---

## 1. 🎬 Transiciones de Página

### Estado actual
La transición de página consiste en un overlay negro sólido (`bg-[#0a0a0f]`) que cubre toda la pantalla con un fade-out de `0.3s` al terminar de cargar. El `isPageChanging` se activa 1 segundo con `setTimeout` tras el `onload` de la imagen.

### Problemas identificados
- El overlay aparece **sin animar su entrada** (`initial` no tiene opacidad, sólo sale con `exit`). Esto produce un corte brusco al cambiar página.
- El fondo siempre es negro plano — no hay variedad o identidad visual.
- El spinner de carga es el mismo en todos los capítulos.
- El delay fijo de 1 segundo es arbitrario: si la imagen ya cargó (cache), el overlay permanece 1 segundo en negro innecesariamente.

### 🚀 Propuestas

#### A — Transición cinematográfica con entrada animada
```
initial: { opacity: 0 }  →  animate: { opacity: 1, duration: 0.15 }  →  exit: { opacity: 0, duration: 0.4 }
```
El overlay debe tener **entrada y salida** animadas. La entrada debería ser rápida (150ms) y la salida suave (400ms), para que el lector no pierda contexto.

#### B — Reducir el timeout a `200ms` tras `img.onload`
Actualmente se espera 1000ms siempre. Propuesta: esperar `200ms` si ya estaba en cache (o usar `img.complete`), y `600ms` si hubo carga real (detectado con un timestamp).

#### C — Transición temática con color de saga
En lugar de negro sólido, aplicar un gradiente oscuro con el color de la saga (`saga.color`) en el overlay:
```
background: radial-gradient(ellipse at center, ${sagaColor}22 0%, #0a0a0f 70%)
```
Esto da identidad a cada capítulo/saga.

#### D — Variante de transición "Page Turn" (opcional/premium)
Agregar un efecto de page flip con GSAP o CSS 3D transform que simule girar la página. Configurable en las settings del capítulo como `pageTransition: "fade" | "slam" | "slide" | "flip"`.

---

## 2. ⏱️ Timing y Aparición de Diálogos

### Estado actual
Los diálogos aparecen con un delay fijo de `index * 800ms` entre cada burbuja. El `activeReadingBubbleIdx` avanza de `0` a `N` con timers. El delay es igual para todos, independientemente del tipo de burbuja o longitud del texto.

### Problemas identificados
- Un delay de **800ms por burbuja es lento** para diálogos cortos, y puede ser demasiado rápido para textos largos.
- No hay diferencia de timing entre un `scream` y un `whisper`, o entre una línea de 5 palabras y una de 30.
- El usuario no puede acelerar ni ralentizar la aparición manualmente.
- Los diálogos del mismo panel **no se relacionan** entre sí en timing: si hay un diálogo que responde a otro, deberían separarse más.

### 🚀 Propuestas

#### A — Delay dinámico basado en longitud de texto
```typescript
// Delay base: 400ms + 20ms por cada palabra del texto
const wordsInText = line.text.split(' ').length;
const delay = instant ? 0 : index * (400 + wordsInText * 20);
```
Textos cortos aparecen antes; textos largos dan tiempo de lectura.

#### B — Delay por tipo de burbuja
| Tipo | Multiplicador |
|------|--------------|
| `scream` | 0.6× (más impacto, más rápido) |
| `whisper` | 1.4× (más íntimo, más pausado) |
| `caption` | 0.8× (narración fluida) |
| `thought` | 1.2× (reflexivo) |
| `electronic` | 0.7× (tecnológico, frío) |
| `sfx` | 0.3× (instantáneo) |

#### C — Soporte para `delay` por burbuja en el editor
Agregar campo `delay?: number` en `DialogueLine` para que el editor pueda fijar delays manuales específicos por burbuja. Esto sobrescribiría el delay automático.

#### D — Control de velocidad en ajustes del lector
En el panel de Ajustes (TopBar), agregar un selector de "Velocidad de diálogos":
```
🐢 Lento  |  ⚡ Normal  |  ⚡⚡ Rápido
```
Guardado en `localStorage` como `reader_dialogue_speed` (multiplicador: 0.5, 1.0, 1.5).

---

## 3. 🎯 Focus / Auto-Pan del Canvas

### Estado actual
El `useReaderLayout` calcula un `autoPanX/Y` con `shiftFraction = 0.25` y un máximo del 15% del viewport. El desplazamiento apunta a centrar la burbuja activa con un movimiento suave de imagen via CSS `transition: all 400ms`.

### Problemas identificados
- **El autopan es muy sutil** (25% de la diferencia, capped al 15% del viewport). En pantallas grandes, la burbuja puede estar fuera del viewport visible.
- El movimiento de imagen usa `transition: all 400ms` — animando **todas** las propiedades CSS incluyendo `width`, lo cual puede causar jitter visual en cambios de zoom.
- Si hay múltiples diálogos, el focus cambia abruptamente entre burbujas.
- No hay feedback visual de cuál burbuja está activa.

### 🚀 Propuestas

#### A — Aumentar el autopan a 40% con límite al 25% del viewport
```typescript
const shiftFraction = 0.40;      // de 0.25 a 0.40
const maxAutoPanX = containerSize.w * 0.25;  // de 0.15 a 0.25
const maxAutoPanY = containerSize.h * 0.25;
```
El lector seguirá mejor las burbujas sin sentirse errático.

#### B — Separar `transition` en propiedades específicas
En vez de `transition: all 400ms`, usar:
```css
transition: left 400ms cubic-bezier(0.25, 1, 0.5, 1),
            top 400ms cubic-bezier(0.25, 1, 0.5, 1);
```
Evita animar `width` durante cambios de escala, eliminando el jitter.

#### C — Framer Motion para el movimiento de imagen en modo lectura
Reemplazar el `<img>` estático por un `<motion.img>` con `animate={{ left, top }}`:
```tsx
<motion.img
  animate={{ left: imgLeft, top: imgTop, width: imgWidth }}
  transition={{ type: "spring", stiffness: 180, damping: 28 }}
/>
```
Esto produce un movimiento físico y premium, no lineal.

#### D — Indicador sutil de burbuja activa
La burbuja activa podría tener una leve pulsación (scale 1.0 → 1.03 → 1.0) para indicar que es la que está "hablando" en este momento. Muy sutil, 1 ciclo, duración 0.6s.

---

## 4. 💬 Posicionamiento y Diseño de Burbujas

### Estado actual
Las burbujas se posicionan con coordenadas `posX/posY` en % sobre la imagen. El parallax aplica un `shiftX/Y * parallaxFactor` donde `factor = dialogueDepth * 0.08`. La burbuja se centra (`transform: translate(-50%, -50%)`).

### Problemas identificados
- Las burbujas **no tienen ninguna lógica de detección de colisión** entre sí. Dos burbujas en posiciones similares se solapan completamente.
- El sistema de cola (tail) triangular clásico es demasiado genérico — todos los personajes tienen el mismo estilo de globo.
- Las cajas tienen `max-w-sm` (384px fijo), lo cual en pantallas pequeñas puede ser demasiado ancho, y en pantallas muy grandes puede verse diminuto.
- No existe un concepto de "zona segura" — una burbuja puede aparecer parcialmente fuera del canvas de la imagen.

### 🚀 Propuestas

#### A — Detección de bordes y "safe zone" de burbujas
Calcular si la burbuja sale del canvas del viewport y aplicar un clamp:
```typescript
// Clamp para que la burbuja no salga del viewport
const clampedLeft = Math.max(bubbleHalfW, Math.min(containerSize.w - bubbleHalfW, bubbleLeft));
const clampedTop  = Math.max(bubbleHalfH, Math.min(containerSize.h - bubbleHalfH, bubbleTop));
```
Esto se puede hacer en `DialogueLayers` de forma no destructiva (sólo en modo lectura).

#### B — Tamaño responsive de burbujas
En lugar de `max-w-sm` hardcoded, escalar según el canvas:
```typescript
const maxBubbleWidth = Math.min(320, imgWidth * 0.42);
```
En móvil, las burbujas serán más angostas; en escritorio, más generosas.

#### C — Efecto "pop" en la aparición de burbujas
Las variantes actuales de `spring` animan con `scale: 0.75 → 1`. Propuesta: añadir un keyframe más expresivo:
```typescript
// Variante "pop" (nuevo tipo de animation)
initial: { opacity: 0, scale: 0.3, rotate: -6 }
animate: { opacity: 1, scale: 1,   rotate: 0 }
transition: { type: "spring", stiffness: 400, damping: 18 }
```
Disponible como nueva opción `appearanceAnimation: "pop"` en el editor.

#### D — Burbuja con glassmorphism para `electronic`
El estilo `electronic` actualmente usa un fondo oscuro sólido. Propuesta premium:
```css
background: rgba(0, 240, 255, 0.08);
backdrop-filter: blur(12px);
border: 1px solid rgba(0, 240, 255, 0.4);
box-shadow: 0 0 20px rgba(0, 240, 255, 0.15), inset 0 0 20px rgba(0, 240, 255, 0.05);
```

#### E — Nuevo tipo de burbuja: `shout` (grito extremo)
Similar al `scream` pero con el fondo en forma de explosión jagged más dramática (diferente al starburst actual), con tipografía más grande y rotación dinámica. Útil para momentos de acción máxima.

---

## 5. 📄 Carga de Páginas y Preloading

### Estado actual
La imagen de la página actual se carga on-demand cuando `pageIdx` cambia. No hay prefetch de páginas siguientes. El overlay de carga aparece durante todo el tiempo de carga.

### Problemas identificados
- **No hay preloading de páginas adyacentes**. Al navegar rápido, cada página espera su carga.
- El spinner actual es genérico ("CARGANDO PÁGINA..."). No hay progreso visual.
- Las imágenes WebP de cómic pueden ser pesadas (500KB–2MB). Sin preload, el usuario ve negro entre páginas.
- No se usa `priority` ni `loading="eager"` en ningún punto.

### 🚀 Propuestas

#### A — Preloading especulativo de N páginas adyacentes
```typescript
// En CinematicReader, precargar 2 páginas siguientes y 1 anterior
useEffect(() => {
  const preloadIdxs = [pageIdx - 1, pageIdx + 1, pageIdx + 2].filter(
    (i) => i >= 0 && i < pages.length
  );
  preloadIdxs.forEach((i) => {
    const img = new window.Image();
    img.src = getComicPageUrl(pages[i]);
  });
}, [pageIdx, pages]);
```
Simple, nativo, sin dependencias. Reduce el tiempo de espera al 0 en la mayoría de casos.

#### B — Remover el delay fijo de 1000ms
Reemplazar:
```typescript
timer = setTimeout(() => setIsPageChanging(false), 1000);
```
Por:
```typescript
// Desactivar apenas la imagen esté lista + 150ms de gracia
timer = setTimeout(() => setIsPageChanging(false), 150);
```
Si el preloading funciona bien, el overlay casi nunca se verá.

#### C — Indicador de progreso tipo "páginas"
Reemplazar el spinner con un contador visual del estilo cómic:
```
[■ ■ ■ □ □]  Pág 3 / 5
```
Con las páginas cargadas marcadas y las pendientes en gris. Más informativo y con identidad visual.

#### D — Transición de imagen entre páginas con crossfade
Mantener la imagen anterior visible con `opacity: 0.4` mientras carga la siguiente, en vez de un negro total. Esto reduce la percepción de carga.

---

## 6. ⚙️ Personalización Premium del Lector

### Estado actual
El panel de ajustes (TopBar) expone: tamaño de letra (4 opciones) y auto-avance (sí/no). Todo guardado en `localStorage`.

### Problemas identificados
- Hay muchas más opciones ya definidas en el sistema (`appearanceAnimation`, `fadeOutAnimation`, `dialogueDepth`) pero **el lector no las puede cambiar en runtime**.
- No existe modo de lectura alternativo (ej. modo "cómic clásico" sin zoom automático).
- No hay preferencia de tema de interfaz (la topbar es siempre blanca).

### 🚀 Propuestas

#### A — Expandir el panel de Ajustes con opciones in-reader
Agregar al dropdown de Ajustes (`ReaderTopBar`):

| Control | Opciones |
|---------|---------|
| Animación de entrada | spring / fade / zoom / slide / pop |
| Velocidad de diálogos | 🐢 / ⚡ / ⚡⚡ |
| Profundidad de sombra (depth) | 0–5 slider |
| Modo de lectura | Cinematográfico / Galería / Clásico |
| Tema de interfaz | Oscuro / Claro / Transparente |

Todas guardadas en `localStorage` con prefijo `reader_`.

#### B — Modo "Galería" (vista de toda la página sin zoom)
Un modo alternativo donde el lector ve la página completa sin autopan ni diálogos superpuestos — ideal para releer y apreciar el arte. Accesible desde el botón de ajustes.

#### C — Botón "Mostrar todos los diálogos" en topbar
Actualmente este estado existe internamente (`showAllDialogues`). Propuesta: añadir un botón visible en la topbar:
```
💬 Ver todos
```
Útil para relectura rápida.

#### D — Shortcut de teclado para controles clave
| Tecla | Acción |
|-------|--------|
| `→` / `Space` | Avanzar panel/página |
| `←` | Retroceder panel/página |
| `A` | Toggle autoplay |
| `G` | Toggle modo galería |
| `+` / `-` | Zoom in/out |
| `Esc` | Zoom out / volver |

---

## 7. 🎨 Mejoras Visuales Premium de Interfaz

### Estado actual
La topbar es blanca con bordes negros, estilo pop-art. El fondo del reader es `#0a0a0f` plano. El overlay de carga tiene un spinner rojo.

### Problemas identificados
- La **topbar blanca rompe la inmersión** del lector oscuro. Al leer una página de acción, la barra blanca se siente fuera de contexto.
- No hay vignette ni efectos ambientales en el canvas del lector.
- El progreso de página (Pág X / Y) no es visualmente llamativo.

### 🚀 Propuestas

#### A — Topbar con glassmorphism en modo lectura
En modo `read`, la topbar podría volverse semi-transparente:
```css
background: rgba(10, 10, 15, 0.85);
backdrop-filter: blur(16px);
border-bottom: 1px solid rgba(255, 255, 255, 0.08);
```
Con texto blanco / iconos en gris claro.

#### B — Topbar coloreada por saga
La topbar toma un tinte del `saga.color` como borde inferior o como fondo sutil:
```css
border-bottom: 3px solid ${saga.color};
box-shadow: 0 4px 20px ${saga.color}33;
```

#### C — Vignette ambiental alrededor del canvas
Un gradiente radial muy sutil en los bordes del canvas del reader:
```css
background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.5) 100%)
```
Esto hace que el centro (la imagen) se sienta más enfocado y premium.

#### D — Indicador de progreso visual de página
Reemplazar el texto "Pág X / Y" por una barra de progreso fina debajo de la topbar:
```
[━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━░░░░░░░░░]
```
Animada con Framer Motion al cambiar página. Color = `saga.color`.

#### E — Modo pantalla completa real
Botón para activar la Fullscreen API del navegador, para máxima inmersión. Guardado en preferencias.

---

## 8. 🔔 UX y Micro-interacciones

### Estado actual
Al llegar al final de un panel, no hay feedback al usuario. La navegación es invisible (clic en cualquier lugar).

### Problemas identificados
- El usuario **no sabe que puede hacer clic** para avanzar, especialmente en la primera visita.
- No hay feedback haptico en móvil al avanzar.
- El overlay de "Siguiente Página" aparece de golpe sin transición.
- No hay micro-animación al alcanzar el último panel de una página.

### 🚀 Propuestas

#### A — Hint animado de "tap para avanzar" en el primer panel
En el primer panel de la primera página (`panelIdx === 0 && pageIdx === 0`), mostrar un indicador pulsante en la esquina inferior:
```
[  ➤ Toca para avanzar  ]
```
Desaparece al primer tap. No intrusivo.

#### B — Feedback haptico en móvil (Vibration API)
```typescript
// Al avanzar panel
navigator.vibrate?.(30);

// Al cambiar página
navigator.vibrate?.([20, 10, 20]);
```
Muy sutil. Desactivable en ajustes.

#### C — Animación del overlay de navegación con Framer Motion
El overlay de "Siguiente Página / Fin del Capítulo" al hacer `zoomedOut=true` actualmente no tiene entrada animada. Propuesta:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 22 }}
>
```

#### D — Indicador de paneles restantes en canvas
Una pequeña fila de dots en la parte inferior del canvas que indica cuántos paneles quedan en la página actual:
```
● ● ○ ○
```
Los círculos rellenos = paneles visitados. Desaparece con la imagen. Muy discreto.

---

## 9. 🐛 Bugs y Problemas Técnicos Detectados

### B1 — `transition: all 400ms` en la imagen
**Archivo:** `ReaderCanvas.tsx` L170-172  
**Problema:** `all` anima width + left + top + height simultáneamente. Durante un cambio de zoomRect, esto puede causar animaciones de ancho extrañas.  
**Fix:** Cambiar a `transition: left 400ms ease, top 400ms ease`.

### B2 — Re-render excesivo de `dialoguesNode`
**Archivo:** `CinematicReader.tsx` L445-503  
**Problema:** El `useMemo` de `dialoguesNode` depende de 20+ valores. Un cambio en `bubbleOffsets` (que ocurre en cada `pointermove` durante arrastre) re-renderiza todo el árbol de burbujas.  
**Fix:** Separar `bubbleOffsets` y `draggedBubbleKey` en un memo de segundo nivel dentro de `DialogueLayers`, o usar `React.memo` con comparador personalizado.

### B3 — Delay fijo de 800ms entre burbujas
**Archivo:** `CinematicReader.tsx` L315  
**Problema:** `i * 800` es fijo. Si hay 5 burbujas, la última aparece a los 3200ms sin considerar si el lector ya las leyó.  
**Fix:** Ver propuestas 2A/2D.

### B4 — `SPEAKER_COLORS` duplicado en 3 archivos
**Archivos:** `StandardBubble.tsx`, `CaptionBubble.tsx`, `ThoughtBubble.tsx`  
**Problema:** La misma constante `SPEAKER_COLORS` y la función `getSpeakerColor` están copiadas en los tres bubbles.  
**Fix:** Extraer a `bubbles/bubbleHelpers.ts` y re-exportar desde ahí.

### B5 — `parseParagraphs` duplicado en 3 archivos
**Mismo problema que B4.** La función `parseParagraphs` es idéntica en los tres componentes.  
**Fix:** Mover a `bubbleHelpers.ts`.

### B6 — `isPageChanging` se activa aunque la imagen esté en cache
**Archivo:** `CinematicReader.tsx` L220-238  
**Problema:** Siempre espera 1 segundo aunque el `img.onload` dispare inmediatamente (imagen cacheada).  
**Fix:** Verificar `img.complete` antes de hacer `setIsPageChanging(true)`:
```typescript
if (img.complete) {
  setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
  setIsPageChanging(false);
} else {
  setIsPageChanging(true);
  img.onload = () => { ... setTimeout 150ms ... }
}
```

---

## 11. 👥 Sección de Personajes (Roster y Fichas de Detalle)

### Estado actual
El roster de personajes está estructurado en una cuadrícula Pop-Art agrupada por afiliaciones. Cada tarjeta cuenta con un efecto hover de inclinación y escala básica. Al hacer clic, se despliega una ficha detallada que, para los personajes principales ("Los Pibes"), ofrece un modo "Detalles" que desencadena una animación de transición en pantalla completa para desvelar detalles de su traje y habilidades especiales.

### Problemas identificados
- **Estadísticas ausentes:** A pesar de la ambientación inspirada en cómics de superhéroes, no existe un desglose visual de sus capacidades de combate o atributos técnicos.
- **Falta de inmersión auditiva:** La transición al modo "Detalles" es puramente visual, careciendo de efectos sonoros que amplifiquen el impacto del cambio.
- **Tarjetas reactivas pero planas:** El efecto de hover de las tarjetas es básico; no hay reflejos metálicos, efectos de profundidad ni interactividad que responda dinámicamente al cursor del usuario.
- **Navegación difícil a escala:** Con la suma constante de variantes del multiverso, se echa en falta un sistema de búsqueda y filtrado dinámico.

### 🚀 Propuestas

#### A — Radar de Atributos (Stats Radar / Pentágono de Poder)
En el panel de "Detalles" (modo poderes), integrar un gráfico radial dinámico animado con Framer Motion que desglose los atributos clave del personaje:
* *Fuerza* (Daño físico/cinético)
* *Velocidad* (Movimiento/reacción)
* *Poder Anómalos* (Habilidades especiales/místicas)
* *Resistencia* (Soportar daño/regeneración)
* *Intelecto / Tecnología* (Gadgets/táctica)

#### B — Efectos de Sonido Inmersivos (SFX Clips)
Incorporar pequeños fragmentos de audio (SFX) temáticos e interactivos al abrir un perfil de personaje o activar el modo "Detalles":
* **Volvo:** Estática de televisión distorsionada y pitido digital glitch.
* **Ian:** Ruido de propulsores de jet o encendido de armadura metálica.
* **Swapfire:** Sonido de llamarada súbita o láser concentrado.
* **Aegis:** Un golpe sordo de escudo pesado de metal vibrando.

#### C — Efecto Holográfico e Halftones Interactivos
* Desarrollar un sombreado CSS sobre las tarjetas que siga el movimiento del cursor (`onMouseMove`), simulando un acabado holográfico o "foil collector card" con reflejos y sombras tridimensionales.
* Añadir pequeños globos de diálogo flotantes con frases emblemáticas al pasar el ratón (hover) sobre cada personaje (ej. Uandi diciendo *"Correte del camino, Bub"*).

#### D — Buscador y Filtrado Pop-Art
Implementar un panel superior de búsqueda y filtrado interactivo:
* Caja de búsqueda con autocompletado y tipografía Bangers.
* Botones de filtrado rápido con estilo Pop-Art: *"Líderes"*, *"Supe-humanos"*, *"Humanos"*, *"Mutantes"* y *"Variantes Multiverso"*.

---

## 12. 📜 Sección de Lore y Mitología

### Estado actual
La sección de Lore es una página lineal con textos detallados que describen la sinopsis literal del cómic, los orígenes de los poderes individuales de los personajes y el origen de sus identidades heroicas.

### Problemas identificados
- **Lectura densa y plana:** El diseño carece por completo de elementos multimedia (ilustraciones, blueprints, logos) o interactividad que haga atractiva la inmersión en la mitología.
- **Sin conexión directa con el Roster:** Si un lector ve un nombre destacado (como *Mati Prime* o *Billy Butcher*), no tiene forma rápida de saber quién es sin salirse de la sección de Lore.
- **Estructura estática:** Toda la información se muestra de golpe, arruinando sorpresas de la trama o sin dar incentivos al usuario para desbloquear contenido a medida que avanza en el cómic.

### 🚀 Propuestas

#### A — Interfaz de Expedientes Clasificados (UI "Dossier")
Rediseñar el Lore simulando una base de datos gubernamental clasificada o la computadora táctica de Vesperwing:
* Textos censurados mediante barras negras (`[CLASIFICADO]`) que se revelan con una animación de desvanecimiento si el usuario ha leído ciertos capítulos en el lector (utilizando la clave `read-chapters` del almacenamiento local).
* Estética de carpetas virtuales y efectos de escaneo de línea retro.

#### B — Timeline Interactiva del Multiverso
Crear una línea temporal horizontal interactiva e ilustrada:
* El usuario desliza horizontalmente a través de hitos cruciales (ej. *El Incidente de los Backrooms*, *La Fragmentación*, *El Encuentro en Times Square*).
* Al pulsar sobre un hito, se despliega una ficha con ilustraciones conceptuales, resúmenes breves y enlaces a los perfiles de los personajes involucrados.

#### C — Glosario Dinámico con Tarjetas Flotantes (Hover Cards)
Utilizar la biblioteca Radix UI o Framer Motion para convertir los nombres clave del lore en elementos interactivos:
* Al pasar el cursor sobre términos clave (ej. *Aegis*, *Vought*, *Mati Prime*), aparece una pequeña tarjeta flotante con su retrato, afiliación y un resumen rápido.
* Al hacer doble clic en ella, redirige o abre directamente el perfil en el modal del Roster.

#### D — Blueprints Técnicos del Equipamiento
Incorporar planos interactivos estilizados (en color azul blueprint neón) del equipamiento principal:
* Traje Vesperwing Mark III (con descripciones de las alas planeadoras, propulsores y blindaje).
* Visor Violeta de Swapfire (detallando el sistema de enfoque y disipación térmica).
* Guantes de canalización cinética de Aegis.

---

## 10. 🗓️ Priorización Sugerida Actualizada

| Prioridad | Área | Propuesta | Impacto | Esfuerzo |
|-----------|------|-----------|---------|----------|
| 🔴 Alta | Bugs | B4+B5 — DRY en bubbles | Mantenibilidad | Bajo |
| 🔴 Alta | Bugs | B6 — Fix cache/isPageChanging | UX crítica | Bajo |
| 🔴 Alta | Lector | 5A — Preloading de páginas | UX crítica | Bajo |
| 🔴 Alta | Roster | 11D — Buscador y Filtrado Pop-Art | Usabilidad | Bajo |
| 🟠 Media | Lector | 1A/1B — Transición de página animada | Premium feel | Medio |
| 🟠 Media | Lector | 3C — Framer Motion en imagen | Fluidez máxima | Medio |
| 🟠 Media | Lector | 2D — Control de velocidad en ajustes | Personalización | Medio |
| 🟠 Media | Lector | 7A — Topbar glassmorphism | Visual premium | Medio |
| 🟠 Media | Roster | 11A — Radar de Atributos (Stats) | Visual premium | Medio |
| 🟠 Media | Lore | 12C — Glosario y Hover Cards | Experiencia | Medio |
| 🟡 Baja | Lector | 4C — Animación "pop" nuevo estilo | Expresividad | Bajo |
| 🟡 Baja | Lector | 6D — Shortcuts de teclado | Power users | Medio |
| 🟡 Baja | Roster | 11B — Audio SFX de Personajes | Visual premium | Bajo |
| 🟡 Baja | Roster | 11C — Tarjetas foil holográficas | Visual premium | Medio |
| 🟡 Baja | Lore | 12A — UI Dossier Clasificado | Inmersión | Alto |
| 🟡 Baja | Lore | 12B — Timeline del Multiverso | Inmersión | Medio |
| 🟡 Baja | Lore | 12D — Blueprints interactivos | Visual premium | Medio |
| 🟡 Baja | Lector | 1D — Page flip effect | WOW factor | Alto |
| 🟡 Baja | Lector | 8E — Fullscreen API | Inmersión | Bajo |

