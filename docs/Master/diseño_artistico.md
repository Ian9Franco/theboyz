# 🎨 Diseño Artístico y Guía de Generación Visual

Este documento reúne todas las especificaciones estéticas, técnicas y de prompting para mantener la consistencia artística del cómic mediante el uso de inteligencia artificial.

---

## 🎨 ANCLA 3 — ESTILO VISUAL DEL CÓMIC

Esta plantilla define las bases artísticas que deben ser respetadas para todas las generaciones visuales de un cómic determinado.

```markdown
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

## 📔 Guía de Portada (Midjourney / DALL-E)

Especificaciones para generar portadas de cómics profesionales y listas para impresión comercial.

### 1. Maquetación Editorial Común (Estructura de Portada)
Este bloque define la distribución de los elementos editoriales de la portada (código de barras, logo, numeración y textos de publicación). Debe incluirse siempre en el prompt:

> **Prompt de Estructura Editorial:**
> ```text
> A professional, high-end comic book cover layout and commercial print design. 
> 
> EDITORIAL LOGO AND TEXT ELEMENTS:
> - In the upper left corner, a clean, solid vertical rectangular logo box with a sharp publisher badge icon, a bold "#01" issue number, and a small "$4.99 US" price tag.
> - Across the top third, a massive, powerful comic book title logo reading "[INSERT_TITLE]" in an extra-bold, heavy-weight uppercase sans-serif font with a distinct gritty, slightly distressed stencil texture.
> - In the bottom left corner, a crisp, realistic white barcode box with black scanning lines and serialization numbers.
> - In the lower section, modern minimalist text in an uppercase, pure white condensed sans-serif font displaying brief dramatic story taglines, with a tiny, sharp "ian ©" mark aligned to the bottom right.
> 
> The final generation must look like a high-contrast, perfectly crisp printed comic book cover, professional, clean, balanced, and ready for commercial publication.
> ```

### 2. Variantes de Estilo Artístico

* **Estilo A: Trazo y Cel-Shading Digital (Línea Clásica)**
  * *Descripción:* Novela gráfica de acción con trazo definido, sombras duras y cell-shading moderno.
  * *Prompt de Estilo:*
    > `ARTWORK COMPOSITION AND STYLE: The background features a dynamic graphic novel illustration, beautifully split or framed into atmospheric composite scenes using sharp diagonal cinematic lines. The art style is high-end digital comic book line-art with deep, intense shadows, professional cell-shading, dramatic contrast, and an atmospheric graphic novel coloring palette. THE CENTRAL SCENE DEPICTION: [INSERT_SCENE_AND_CHARACTERS]`

* **Estilo B: Portada Pintada Digital / Painted Cover Art (Estilo "sin.thehatcat")**
  * *Descripción:* Estilo pictórico detallado e hiperrealista inspirado en portadas modernas de Marvel. Caracterizado por pinceladas visibles, iluminación oscura, atmósfera húmeda/humo y ricas texturas en metales y ropa.
  * *Prompt de Estilo:*
    > `ARTWORK COMPOSITION AND STYLE: Painted comic book cover art style, hyper-detailed digital painting blending realistic rendering with graphic novel composition. Dramatic moody lighting, muted earthy color palette (browns, grays, deep blues) with selective warm highlights. Heavy texture work on fabric, metal, and skin. Atmospheric effects like rain, smoke, or dust. Gritty, cinematic team-poster composition with characters layered front-to-back, high-contrast rim lighting, fine brushwork detail, realistic anatomy with stylized comic book heroics, title logo treated like a movie poster. THE CENTRAL SCENE DEPICTION: [INSERT_SCENE_AND_CHARACTERS]`

---

## 🎨 Guía de Arte para Páginas de Cómic (Midjourney)

### Especificaciones Técnicas Fundamentales
* **Estilo Artístico y Medio:** Estilo de página de novela gráfica y cómic independiente premium, dibujado a mano y entintado. La identidad visual equilibra el realismo humano y la ilustración madura, evitando renders 3D, brillos artificiales de concept art o degradados digitales lisos.
* **Línea y Tinta:** Trazo visible, limpio y definido. Entintado de alto contraste con pinceladas pesadas y orgánicas, y grosor de línea variable. Negros plenos profundos (claroscuro) que definen formas, pliegues de ropa, anatomía y entornos urbanos. Uso de hachurados tradicionales, tramas cruzadas y salpicaduras de tinta para textura. Sin difuminados digitales.
* **Diseño de Personajes:** Rostros expresivos con arrugas y texturas de tinta que transmitan fatiga, tensión o emoción madura. Ropa y equipamiento de diseño funcional y moderno con pliegues realistas. Planos de color plano y sombras de borde duro.
* **Paleta de Colores y Textura:** Paleta cinematográfica sofisticada con predominio de tonos desaturados, índigos profundos, azules fríos y colores tierra apagados, contrastados con acentos vibrantes (rosa eléctrico, naranja o amarillo neón). Colores planos con sombreado cel-shading y texturas mate que imiten papel tradicional y tramas de semitono (halftone).
* **Iluminación:** Alto contraste urbano mediante siluetas marcadas, retroiluminación fuerte y luces de contorno para separar las figuras de los fondos texturizados y oscuros.
* **Estructura y Composición:** Grilla de paneles limpia separada por bordes negros sólidos. Alternancia entre primeros planos íntimos y ángulos cinematográficos amplios con perspectiva de cámara baja para maximizar la escala de la acción.
* **Elementos Sistémicos:** Integración de diagramas minimalistas, esquemas técnicos o planos de estructuras directamente como superposiciones gráficas 2D integradas al fondo.
* **Movimiento Cinético:** Escenas de acción con encuadres dinámicos, líneas de fuga pronunciadas, humo, polvo, escombros y efectos tradicionales de cómic. Onomatopeyas integradas al entorno físico interactuando con personajes y fondos.

### Opciones de Prompt para Generación

* **Opción 1: El "Híbrido Moderno Elegante" (Equilibrado)**
  * *Descripción:* Prioriza la limpieza de trazo y el detalle facial, balanceado con sombras fuertes y composición dinámica.
  * *Prompt:*
    > `Official comic book page layout, dramatic multi-panel grid, professional graphic novel format. White panel borders, clean non-uniform dynamic layout. Art style is a hybrid of Modern American Comic Book and European Line Art. Technical breakdown: Clean organic line art and human expressions inspired by Sara Pichelli. Stylized, sleek character designs and clarity inspired by Lee Garbett. Kinetic compositions, aggressive foreshortening, and speed lines inspired by Jorge Jimenez. Dense ink rendering with strong usage of heavy black masses and high-contrast shadows inspired by Greg Capullo. Cell-shading with a sophisticated, slightly muted pop-color palette. 2D illustration, sharp focus. NO 3D render, NO photorealism, NO text, NO speech bubbles.`

* **Opción 2: El "Kinético Oscuro" (Acción Brutal)**
  * *Descripción:* Prioriza la energía desbordante de acción, escombros, sombreados densos y contrastes de luz de neón.
  * *Prompt:*
    > `Official comic book page layout, chaotic dynamic multi-panel grid, professional graphic novel format. White panel borders, aggressive non-uniform layout. Modern American heroic art style. Technical breakdown: Explosive energy, extreme perspectives, and manga-influenced lines of movement inspired by Jorge Jimenez. Visceral textures, brutalist rendering, heavy inking, and atmospheric darkness inspired by Greg Capullo. Clean facial features and fluent body language to balance the intensity inspired by Sara Pichelli. Elegant stilyzation and narrative clarity inspired by Lee Garbett. Flat digital colors with gritty overlay textures, palette of deep desaturated tones mixed with electric neon contrast highlights. 2D illustration, sharp focus. NO 3D render, NO photorealism, NO text, NO speech bubbles.`

---

## 🖤 Estilo de Arte para IA (Estricto)

**Prompt Maestro de Estilo (Base para todas las imágenes):**
```text
Official comic book page layout, dynamic non-uniform multi-panel grid mixing wide cinematic horizontal panels with tight vertical sequential panels. Bold solid black panel borders. Occasional panel bleeding — a character, weapon, or effect breaking through the panel border into the next panel or page margin for dramatic impact. Modern American heroic comic art style, hand-inked line work — the ink line defines all form and volume, color is flat and secondary to the line. Technical breakdown: Clean organic line art and expressive facial inking inspired by Sara Pichelli. Stylized, sleek character silhouettes and clarity inspired by Lee Garbett. Kinetic compositions, dramatic foreshortening, and speed lines inspired by Jorge Jimenez. Dense ink rendering with heavy black masses and high-contrast chiaroscuro shadows inspired by Greg Capullo. Color treatment: flat, hard-edged cel-shading with distinct color blocks per object — accurate, true-to-character skin tones preserved even under warm or colored lighting, NOT a uniform amber/sepia color-grade wash over the whole image. Cinematic saturated palette used selectively in backgrounds and lighting accents (warm backlit oranges/golds in explosive scenes, cool teal/indigo in night or rain scenes), not as a global filter over skin and faces. Strong rim lighting and backlit silhouettes used sparingly for dramatic separation, not as full-figure glow. Lettering: hand-drawn onomatopoeia (e.g. THWIP, WHAMM) integrated physically into the scene. 2D illustration, sharp focus, traditional inked texture with halftone/matte shading. NO 3D render, NO photorealistic rendering, NO photographic specular highlights on skin or lips, NO smooth airbrushed gradients, NO uniform warm color-grade filter over the entire image, NO glossy concept-art sheen, NO yellow/amber cast on skin tones.
```

---

## 🧍 Hojas de Modelo y Fichas de Personaje

### Prompt para crear la Sheet de aspecto del personaje (Turnaround):
```text
Character model sheet, reference turnaround, comic book character design sheet. Same hand-inked comic art style as the established house style — clean organic ink line defining all form and volume, flat hard-edged cel-shading, color is flat and secondary to the line. Three views of the same character on a single sheet: front view, three-quarter view, and side profile view, full body, neutral standing pose, arms relaxed, no dynamic action. Plain flat neutral grey or white background, no scenery, no props, no environment. Flat, even, neutral studio lighting — no dramatic shadows, no colored lighting, no backlighting, no rim light, no atmospheric effects. Accurate true-to-reference skin tone rendered as a flat color block with hard-edge shading only, NOT a warm amber/sepia wash. Precise, consistent facial features, hairstyle, body proportions and outfit matching the reference image exactly. NO 3D render, NO photorealism, NO photographic specular highlights, NO airbrushed gradients, NO color grading filter, NO background, NO text, NO labels, NO speech bubbles, NO panel borders, NO watermark.
```

### Prompt para generar las Fichas de Concepto (Concept Sheet):
```text
Character concept design sheet of [DESCRIPCIÓN DEL PERSONAJE: Ej. a rugged man with messy black hair and a dark tech-jacket]. Premium independent comic book and graphic novel style, hand-drawn and inked, mature illustration. Strong clean linework with variable thickness, high-contrast heavy ink brushstrokes, deep black shadows, traditional cross-hatching and halftone dot textures. No 3D renders, no digital glows. Sophisticated cinematic palette with desaturated dark blues, cold indigos, and stark neon [COLOR DE ACENTO: Ej. electric pink] accents. Flat colors with hard-edge cel-shading, matte paper texture. Front view and detail view panels separated by clean black borders.
```

---

## 🖼️ Estructuración de Prompts Artísticos para la IA

### Formato en Documento B (Prompts por Viñeta):
Por cada viñeta del guion, se genera un bloque de especificación con el siguiente formato:
* **PÁGINA [N] — VIÑETA [N]**
* **TAMAÑO:** `[pequeña / media / grande / splash]`
* **PLANO:** `[detalle extremo / primer plano / plano medio / plano americano / plano general / cenital / contrapicado / plano holandés]`
* **PERSONAJES EN ESCENA:** `[quiénes y qué están haciendo físicamente — ser específico]`
* **AMBIENTE:** `[locación, hora, clima]`
* **EMOCIÓN DOMINANTE:** `[una sola emoción que gobierna la imagen]`
* **EFECTOS VISUALES:** `[si hay poderes, magia, tecnología activa — describir paleta y forma]`
* **PROMPT EN INGLÉS:** `[prompt técnico completo integrando todo lo anterior + reglas de estilo del Ancla 3]`

---

## 📝 Template de Prompt Individual para la IA de Imagen

Al iniciar un nuevo chat con el generador de imágenes, se pega primero el Ancla 3 completa. Luego, para cada viñeta, se utiliza la siguiente estructura individual:

```text
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

*Nota:* Repetir la descripción física del personaje en cada prompt es indispensable para evitar que la IA invente detalles libres debido a su falta de memoria a largo plazo entre generaciones.

---

## 🛠️ Corrección de Inconsistencia Visual

Si la IA generó una viñeta que no coincide con el diseño del personaje o del estilo, se envía el siguiente prompt corrector:

```text
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
