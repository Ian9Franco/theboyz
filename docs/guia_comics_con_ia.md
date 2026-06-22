# 🎨 Guía Universal de Creación de Cómics con IA
## Flujo de trabajo completo: guion, arte y consistencia entre sesiones

---

## Cómo usar esta guía

Esta guía es un sistema de trabajo, no una lista de prompts sueltos.
Está dividida en tres capas:

1. **Los Documentos Ancla** — se crean una vez por proyecto y se pegan al inicio de cada chat nuevo
2. **Los Prompts por Etapa** — se usan según en qué momento del proceso estés
3. **Las Reglas de Ritmo** — criterios editoriales para mejorar acción y cohesión narrativa

Funciona con cualquier IA (Claude, Gemini, GPT) y para cualquier género de cómic.

---

# PARTE 1 — DOCUMENTOS ANCLA

El problema principal al trabajar con múltiples chats y múltiples IAs es la pérdida de contexto.
La solución es mantener tres documentos vivos que pegás al inicio de cada sesión.

---

## ANCLA 1 — BIBLIA DE PERSONAJES

Completá una ficha por cada personaje principal. Sé lo más específico posible en los campos visuales: las IAs de imagen no recuerdan nada entre generaciones, así que si no lo escribís, lo inventan.

```
## PERSONAJES — REFERENCIA FIJA DEL PROYECTO [NOMBRE DEL CÓMIC]

### [NOMBRE DEL PERSONAJE] / "[ALIAS O NOMBRE DE ACCIÓN]"

FÍSICO:
- Contextura: [delgada / atlética / musculosa / robusta / etc.]
- Altura relativa: [el más alto del grupo / promedio / el más bajo / etc.]
- Cabello: [color, largo, textura, peinado específico]
- Cara: [rasgos distintivos: barba, cicatrices, anteojos, forma de ojos, etc.]
- Piel: [tono específico]
- Marcas únicas: [tatuajes, cicatrices, prótesis, marcas de poder, etc.]

ROL EN LA HISTORIA:
- Arquetipo: [el cerebro / el músculo / el comodín / el ancla moral / etc.]
- Motivación central: [qué quiere por encima de todo]
- Miedo central: [qué es lo que más teme]
- Defecto principal: [el rasgo que genera conflicto]

PODERES / HABILIDADES (si aplica):
- Poder principal: [descripción funcional]
- Cómo se ve activado: [descripción visual exacta — colores, efectos, cambios físicos]
- El costo / limitación: [qué le pasa al personaje cuando usa el poder]
- Señal visual de sobrecarga: [cómo se ve cuando está al límite]

VESTUARIO BASE:
- Ropa cotidiana: [descripción específica]
- Traje/uniforme (si aplica): [descripción específica]
- Accesorios recurrentes: [objetos que siempre lleva]

PALETA DE COLOR PERSONAL:
- Color dominante: [el color que lo define visualmente]
- Color de poder: [si tiene poderes, la paleta de sus efectos]
```

**Repetí esta ficha para cada personaje. Dejá los campos que no apliquen vacíos pero no los borres: la estructura consistente ayuda a la IA a procesar la información.**

---

## ANCLA 2 — BIBLIA DE AMBIENTES

```
## AMBIENTES — REFERENCIA FIJA DEL PROYECTO [NOMBRE DEL CÓMIC]

### MUNDO GENERAL
- Época / setting: [contemporáneo / futurista / histórico / fantasía / etc.]
- Tono visual del mundo: [oscuro y realista / colorido y caricaturesco / noir / etc.]
- Elementos que NUNCA deben aparecer: [lo que rompe la coherencia del mundo]
- Elementos que SIEMPRE deben aparecer: [lo que define el mundo visualmente]

### LOCACIONES RECURRENTES

#### [NOMBRE DE LA LOCACIÓN]
- Descripción general: [qué es este lugar]
- Paleta de color: [colores dominantes de este espacio]
- Iluminación característica: [natural / artificial / mixta / hora del día frecuente]
- Detalles visuales fijos: [objetos, muebles, elementos que siempre están]
- Atmósfera: [la sensación que debe transmitir]
- Aparece en: [en qué tipo de escenas se usa este lugar]

#### [NOMBRE DE LA LOCACIÓN 2]
[repetir estructura]

### CLIMA Y CONDICIONES ATMOSFÉRICAS FRECUENTES
- [Ejemplo: lluvia nocturna — aparece en escenas de tensión]
- [Ejemplo: sol de mediodía — aparece en escenas de falsa calma]

### REGLA DE CONSISTENCIA VISUAL
[Escribí acá la regla más importante de tu mundo. Ejemplo: "La magia siempre tiene un color frío. Nada de tonos cálidos en efectos mágicos." o "El futuro de esta historia es decadente, no brillante. Sin superficies relucientes ni luces de neón limpias."]
```

---

## ANCLA 3 — ESTILO VISUAL DEL CÓMIC

```
## ESTILO ARTÍSTICO FIJO — [NOMBRE DEL CÓMIC]

ESTILO GENERAL:
- Definición: [cómic occidental / manga / cartoon / realista / semi-realista / etc.]
- Referentes visuales: [nombrar 2-3 artistas o cómics como referencia]
- Líneas: [gruesas y expresivas / finas y detalladas / línea clara / scratchy / etc.]
- Color: [paleta plana / cell shading / acuarela digital / blanco y negro / etc.]
- Sombras: [duras y geométricas / suaves y graduadas / crosshatching / etc.]

EFECTOS ESPECIALES (si aplica):
- [Poder/elemento 1]: [descripción visual exacta — formas, colores, texturas]
- [Poder/elemento 2]: [descripción visual exacta]
- [Efecto de impacto]: [cómo se ven los golpes, explosiones, colisiones en este cómic]

FORMATO DE PÁGINA:
- Orientación: [vertical / apaisada]
- Ratio aproximado: [2:3 / 3:4 / etc.]
- Estilo de bordes de viñeta: [bordes negros limpios / sin bordes / bordes irregulares / etc.]

REGLAS TÉCNICAS PARA GPT (agregar siempre al final de cada prompt):
- No speech bubbles
- No text or letters in the image
- No watermarks
- [agregar cualquier restricción específica de tu estilo]
```

---

# PARTE 2 — PROMPTS POR ETAPA

---

## ETAPA 1 — GENERACIÓN SIMULTÁNEA DE GUION + PROMPTS DE ARTE
*(Para Claude / Gemini — cuando arrancás de una premisa en texto libre)*

```
Sos el co-guionista y storyboard artist de un cómic llamado [NOMBRE].

[PEGAR ANCLA 1 — BIBLIA DE PERSONAJES]
[PEGAR ANCLA 2 — BIBLIA DE AMBIENTES]
[PEGAR ANCLA 3 — ESTILO VISUAL]

A partir de la siguiente premisa, generá DOS documentos simultáneos:

---

DOCUMENTO A — GUION NARRATIVO

Por cada página:
- Encabezado: PÁGINA [N] — [TÍTULO INTERNO DE LA ESCENA]
- Cantidad y distribución de viñetas
- Por cada viñeta:
  * Descripción de la acción y posición de personajes
  * Emoción dominante que debe transmitir
  * Diálogos con formato → PERSONAJE: "texto"
  * Efectos de sonido sugeridos (onomatopeyas)
  * Nota de dirección si es necesaria

---

DOCUMENTO B — PROMPTS ARTÍSTICOS PARA [IA DE IMAGEN]

Por cada viñeta del Documento A, generá un bloque con este formato:

PÁGINA [N] — VIÑETA [N]
TAMAÑO: [pequeña / media / grande / splash]
PLANO: [detalle extremo / primer plano / plano medio / plano americano / plano general / cenital / contrapicado / plano holandés]
PERSONAJES EN ESCENA: [quiénes y qué están haciendo físicamente — ser específico]
AMBIENTE: [locación, hora, clima]
EMOCIÓN DOMINANTE: [una sola emoción que gobierna la imagen]
EFECTOS VISUALES: [si hay poderes, magia, tecnología activa — describir paleta y forma]
PROMPT EN INGLÉS: [prompt técnico completo integrando todo lo anterior + reglas de estilo del Ancla 3]

---

PREMISA DE ESTA SESIÓN:
[TU IDEA EN TEXTO LIBRE]

---

REGLAS NARRATIVAS A APLICAR:
1. Cada acción tiene una consecuencia física visible en los personajes
2. Cada página termina con una razón para pasar a la siguiente
3. Secuencias de acción: viñetas pequeñas para velocidad, grandes para impacto
4. Los poderes/habilidades siempre tienen un costo visible
5. El clímax de cada acto necesita al menos una splash page o viñeta dominante
6. Los personajes secundarios reaccionan al peligro según su personalidad, no genéricamente
```

---

## ETAPA 2 — PULIDO NARRATIVO DE UN ACTO
*(Para Claude / Gemini — cuando tenés el borrador y querés crítica editorial)*

```
Sos un editor de cómics con experiencia en narrativa de acción, drama de personajes y dirección de arte.

[PEGAR ANCLA 1 — BIBLIA DE PERSONAJES]

Analizá el siguiente acto del cómic [NOMBRE] e identificá problemas y mejoras en estas cuatro áreas:

---

1. COHESIÓN NARRATIVA
- ¿Las motivaciones de cada personaje son consistentes con su ficha?
- ¿Hay saltos de lógica entre escenas o viñetas?
- ¿El estado emocional de los personajes evoluciona de forma creíble o hay cambios abruptos injustificados?
- ¿La información se revela al lector en el orden correcto?

2. RITMO DE LECTURA
- ¿Las secuencias de acción tienen variación en el tamaño de viñetas?
- ¿Hay viñetas de "respiro" entre los momentos de alta tensión?
- ¿El inicio de cada página engancha al lector para seguir leyendo?
- ¿El final de cada página (page turn) tiene peso dramático?

3. EL COSTO DE LAS ACCIONES
- ¿Cada uso de poder / habilidad tiene una consecuencia visible?
- ¿Las limitaciones de los personajes aparecen en la acción, o solo se mencionan en diálogo?
- ¿Los antagonistas son reactivos y adaptativos, o están parados esperando que los golpeen?

4. CLARIDAD VISUAL
- ¿La descripción de cada viñeta es suficientemente específica para un artista?
- ¿Hay viñetas donde no queda claro qué está pasando espacialmente?
- ¿La dirección de lectura (izquierda a derecha, arriba a abajo) es respetada en las escenas de acción?

---

FORMATO DE RESPUESTA:
Para cada problema encontrado:
- Problema: [descripción]
- Ubicación: [página y viñeta]
- Propuesta de solución: [cómo reescribirías o reorganizarías esa sección]

Al final, listá las 3 mejoras de mayor impacto en orden de prioridad.

---

ACTO A ANALIZAR:
[PEGAR EL TEXTO DEL ACTO]
```

---

## ETAPA 3 — DISEÑO DE SECUENCIA DE ACCIÓN
*(Para Claude / Gemini → el output se usa para generar los prompts de GPT)*

Este prompt es específico para cuando tenés una pelea, persecución o secuencia de tensión y necesitás que fluya visualmente.

```
Sos un storyboard artist especializado en cómics de acción.

[PEGAR ANCLA 1 — BIBLIA DE PERSONAJES]
[PEGAR ANCLA 3 — ESTILO VISUAL]

---

GUÍA DE RITMO PARA ACCIÓN EN CÓMIC (aplicar siempre):

TAMAÑOS DE VIÑETA Y SU FUNCIÓN:
- Viñeta PEQUEÑA (1/6 de página o menos): movimientos rápidos, cortes de reacción, impactos múltiples, fragmentación del tiempo
- Viñeta MEDIA (1/3 de página): acciones principales, diálogos con tensión física, confrontaciones directas
- Viñeta GRANDE (1/2 página): momento de impacto fuerte, revelación visual importante, pausa dramática
- SPLASH PAGE (página completa): el clímax visual del acto, el golpe definitivo, la imagen que el lector recuerda

REGLA DE ORO: Una secuencia de acción sin variación de tamaño se lee como una lista, no como acción.
Cada página de acción debe tener al menos 3 tamaños diferentes de viñeta.

ÁNGULOS Y SU SIGNIFICADO:
- Contrapicado (cámara mira hacia arriba): el personaje es amenazante, poderoso, dominante
- Picado (cámara mira hacia abajo): el personaje es vulnerable, pequeño, superado
- Plano holandés (ángulo inclinado): caos, desequilibrio, peligro inminente
- Plano detalle: consecuencias físicas — manos, ojos, heridas, efectos de poder, objetos clave
- Plano general: establece la escala del combate y las posiciones relativas
- Over-the-shoulder: intimidad incluso en la violencia, punto de vista subjetivo

ESTRUCTURA RECOMENDADA PARA UNA PELEA DE 2 PÁGINAS:
- Página 1, viñeta 1 (grande): establecimiento — quiénes están, dónde, cuál es la tensión inicial
- Página 1, viñetas 2-4 (pequeñas): intercambio rápido, golpes, movimientos
- Página 1, viñeta final (media/grande): el primer giro — algo cambia, alguien toma ventaja o la pierde
- Página 2, viñetas 1-3 (pequeñas): escalada, consecuencias físicas visibles
- Página 2, viñeta final (splash o grande): el clímax o la interrupción dramática

---

A partir de la siguiente descripción de secuencia, generá el layout viñeta por viñeta aplicando estas reglas.
Para cada viñeta incluí el prompt técnico en inglés listo para usar en [IA DE IMAGEN].

SECUENCIA A DESARROLLAR:
[DESCRIBÍ LA ACCIÓN EN TEXTO LIBRE — qué pasa, quiénes participan, cuál es el resultado]
```

---

## ETAPA 4 — TEMPLATE DE PROMPT INDIVIDUAL PARA IA DE IMAGEN
*(Usar directamente en GPT-5 u otra IA de imagen, viñeta por viñeta)*

Al inicio de cada chat nuevo con la IA de imagen, pegá el Ancla 3 completa.
Luego, por cada viñeta, usá este formato:

```
Comic book panel. [ESTILO DEL ANCLA 3].

[PLANO]: [descripción de lo que muestra el plano]

Characters present:
- [Personaje 1]: [descripción física completa del Ancla 1] — [qué está haciendo físicamente en esta viñeta]
- [Personaje 2]: [descripción física completa del Ancla 1] — [qué está haciendo físicamente en esta viñeta]

Setting: [descripción del ambiente según Ancla 2 — locación, hora, clima, iluminación]

Visual effects: [si hay poderes u efectos especiales — describir forma, color, intensidad]

Mood: [una sola palabra o frase que define la emoción de la imagen]

Color palette: [colores dominantes de esta viñeta específica]

[REGLAS TÉCNICAS DEL ANCLA 3: no speech bubbles, no text, etc.]
```

**Por qué repetir la descripción física del personaje en cada prompt:** las IAs de imagen no tienen memoria entre generaciones. Si no lo escribís, lo inventan. Los campos críticos a nunca omitir son: contextura corporal, rasgo facial más distintivo y el elemento de vestuario más único.

---

## ETAPA 5 — CORRECCIÓN DE INCONSISTENCIA VISUAL
*(Para cuando GPT generó algo que no coincide con el personaje o el estilo)*

```
La imagen generada no es consistente con el diseño del personaje [NOMBRE].

Lo que está mal: [describir el problema específico — ej: "el personaje aparece delgado cuando debe ser musculoso" o "el cabello es lacio cuando debe ser rizado"]

Referencia correcta del personaje:
- [campo físico 1]: [valor correcto]
- [campo físico 2]: [valor correcto]
- [campo físico 3]: [valor correcto]

Mantener todo lo demás igual: composición, ambiente, iluminación, ángulo.
Solo corregir los elementos mencionados arriba.

[PEGAR EL PROMPT ORIGINAL]
```

---

# PARTE 3 — REGLAS EDITORIALES DE RITMO Y NARRATIVA

Estas reglas son para aplicar durante el proceso de escritura y revisión, no son prompts. Son criterios para evaluar si el guion está funcionando.

---

## REGLAS DE RITMO

**La regla del page turn**
El lector decide si sigue leyendo en el momento en que da vuelta la página. La última viñeta de cada página debe crear una pregunta, una tensión o una sorpresa que haga imposible no seguir.

**La regla del respiro**
Después de dos páginas de acción intensa, el lector necesita una viñeta o media página de pausa. No para detener la historia, sino para procesar lo que acaba de pasar. Las mejores pausas muestran la consecuencia física de la acción: un personaje sin aliento, una herida que acaba de notar, un objeto roto en el suelo.

**La regla de la viñeta silenciosa**
Una viñeta sin diálogo ni onomatopeya, bien colocada, tiene más peso dramático que tres viñetas llenas de texto. Usarla en: el momento justo antes del golpe decisivo, la reacción de un personaje a una revelación, el instante entre la amenaza y la respuesta.

**La regla de los tres actos dentro del acto**
Cada acto del cómic debe tener su propia mini-estructura: una situación inicial, una complicación que la rompe, y una nueva situación que lleva al siguiente acto. Si el acto es solo "pasan cosas", le falta estructura interna.

---

## REGLAS DE ACCIÓN

**El costo siempre es visible**
Cualquier poder, habilidad o esfuerzo físico extremo tiene un costo que el lector debe ver. No se menciona en el diálogo: se muestra en el cuerpo del personaje, en el ambiente, en los objetos. Un héroe que usa sus poderes sin consecuencias visibles pierde tensión dramática rápidamente.

**Los antagonistas aprenden**
Si el mismo ataque funciona dos veces contra el mismo enemigo, el enemigo es un maniquí. Los antagonistas deben adaptarse, cubrirse, cambiar de táctica. Esto no solo hace la acción más interesante: le da al protagonista el problema real de tener que encontrar algo nuevo.

**La escala importa**
Una pelea en un pasillo de dos metros genera claustrofobia y urgencia. La misma pelea en una plaza abierta genera otra tensión completamente distinta. El ambiente no es decorado: es una variable activa en la acción. Preguntarse siempre: ¿cómo el espacio complica o ayuda a cada personaje?

**Acción en tres tiempos**
Las mejores secuencias de acción tienen tres momentos: el protagonista tiene ventaja → el antagonista revierte la situación → el protagonista encuentra una solución inesperada. Este patrón puede comprimirse en una página o expandirse en diez, pero sin los tres tiempos la acción es plana.

---

## REGLAS DE COHESIÓN NARRATIVA

**El personaje hace lo que haría, no lo que conviene al plot**
Si un personaje tiene miedo a las alturas, no sube al tejado sin que algo lo fuerce a hacerlo y sin que eso tenga un costo emocional. Si un personaje es cínico, no da discursos motivadores sin que haya una razón interna que lo lleve ahí. La cohesión narrativa se rompe cuando el personaje actúa para servir al guion en vez de actuar según quien es.

**La información viaja por el cómic como viaja en la vida**
Un personaje no sabe lo que le pasó a otro personaje a menos que alguien se lo haya contado. Un secreto no es dramático si el lector tampoco lo sabe. Un giro sorpresa no funciona si el lector no tenía las pistas para anticiparlo. Mapear quién sabe qué y cuándo es una herramienta narrativa fundamental.

**El mundo reacciona**
Si un personaje usa poderes en la vía pública, alguien lo ve. Si hay una explosión, el barrio cambia. Si se rompe algo, sigue roto hasta que alguien lo arregle. Un mundo que no reacciona a los eventos de la historia se siente de plástico. Las consecuencias secundarias de las acciones son lo que hace que el mundo se sienta real.

---

## CHECKLIST RÁPIDO ANTES DE CERRAR UNA SESIÓN

Antes de terminar un chat y abrir uno nuevo, hacé estas tres cosas:

**1. Actualizá el estado del proyecto (para pegarlo al inicio del próximo chat)**
```
ESTADO ACTUAL DEL PROYECTO — [FECHA]
Cómic: [nombre]
Último elemento completado: [acto / páginas / escena]
Resumen en 3 líneas de lo que pasó hasta ahora: [resumen]
Próxima tarea: [qué vas a hacer en la próxima sesión]
Decisiones de diseño tomadas en esta sesión: [cambios al estilo, personajes o mundo que no están en las Anclas todavía]
```

**2. Actualizá las Anclas si algo cambió**
Si en esta sesión decidiste algo nuevo sobre un personaje, un ambiente o el estilo, actualizá el Ancla correspondiente antes de cerrar. Si lo dejás para después, se pierde.

**3. Guardá los prompts que funcionaron**
Si un prompt de GPT generó exactamente lo que querías, guardalo como referencia. Es mucho más fácil adaptar un prompt que funcionó que construir uno nuevo desde cero.

---

*Esta guía es un documento vivo. Actualizá las Anclas con cada decisión de diseño que tomes.*
*Versión 1.0 — para uso con Claude, Gemini y GPT-5*
