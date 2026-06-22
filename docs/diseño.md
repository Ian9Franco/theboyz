
---

## 🎨 Guías de Generación y Narrativa

### 📔 Guía de Portada (Midjourney / DALL-E)

Esta guía define las especificaciones para generar portadas de cómics profesionales y listas para impresión comercial.

#### 1. Maquetación Editorial Común (Estructura de Portada)
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

---

#### 2. Variantes de Estilo Artístico

* **Estilo A: Trazo y Cel-Shading Digital (Línea Clásica)**
  * *Descripción:* Estilo clásico de novela gráfica de acción con trazo definido, sombras de borde duro y cell-shading moderno.
  * *Prompt de Estilo:*
    > `ARTWORK COMPOSITION AND STYLE: The background features a dynamic graphic novel illustration, beautifully split or framed into atmospheric composite scenes using sharp diagonal cinematic lines. The art style is high-end digital comic book line-art with deep, intense shadows, professional cell-shading, dramatic contrast, and an atmospheric graphic novel coloring palette. THE CENTRAL SCENE DEPICTION: [INSERT_SCENE_AND_CHARACTERS]`

* **Estilo B: Portada Pintada Digital / Painted Cover Art (Estilo "sin.thehatcat")**
  * *Descripción:* Estilo pictórico digital altamente detallado e hiperrealista, inspirado en portadas modernas de Marvel (tipo Mike Deodato / Marko Djurdjevic). Se caracteriza por pinceladas visibles, iluminación oscura, atmósfera húmeda o con humo, y texturas ricas en ropa y metales.
  * *Prompt de Estilo:*
    > `ARTWORK COMPOSITION AND STYLE: Painted comic book cover art style, hyper-detailed digital painting blending realistic rendering with graphic novel composition. Dramatic moody lighting, muted earthy color palette (browns, grays, deep blues) with selective warm highlights. Heavy texture work on fabric, metal, and skin. Atmospheric effects like rain, smoke, or dust. Gritty, cinematic team-poster composition with characters layered front-to-back, high-contrast rim lighting, fine brushwork detail, realistic anatomy with stylized comic book heroics, title logo treated like a movie poster. THE CENTRAL SCENE DEPICTION: [INSERT_SCENE_AND_CHARACTERS]`

---

### 🎨 Guía de Arte para Páginas de Cómic (Prompts de Midjourney)

#### Especificaciones Técnicas Fundamentales
* **Estilo Artístico y Medio:** Estilo de página de novela gráfica y cómic independiente premium, dibujado a mano y entintado. La identidad visual equilibra el realismo humano y la ilustración madura, evitando estrictamente renders 3D, brillos artificiales de concept art o degradados digitales lisos.
* **Línea y Tinta:** Trazo visible, limpio y definido. Entintado de alto contraste con pinceladas pesadas y orgánicas, y grosor de línea variable. Negros plenos profundos (claroscuro) que definen formas, pliegues de ropa, anatomía y entornos urbanos. Uso de hachurados tradicionales, tramas cruzadas y salpicaduras de tinta para textura. Sin difuminados digitales.
* **Diseño de Personajes:** Rostros expresivos con arrugas y texturas de tinta que transmitan fatiga, tensión o emoción madura. Ropa y equipamiento de diseño funcional y moderno con pliegues realistas. Planos de color plano y sombras de borde duro.
* **Paleta de Colores y Textura:** Paleta cinematográfica sofisticada con predominio de tonos desaturados, índigos profundos, azules fríos y colores tierra apagados, contrastados con acentos vibrantes (rosa eléctrico, naranja o amarillo neón). Colores planos con sombreado cel-shading y texturas mate que imiten papel tradicional y tramas de semitono (halftone).
* **Iluminación:** Alto contraste urbano mediante siluetas marcadas, retroiluminación fuerte y luces de contorno para separar las figuras de los fondos texturizados y oscuros.
* **Estructura y Composición:** Grilla de paneles limpia separada por bordes negros sólidos. Alternancia entre primeros planos íntimos y ángulos cinematográficos amplios con perspectiva de cámara baja para maximizar la escala de la acción.
* **Elementos Sistémicos:** Integración de diagramas minimalistas, esquemas técnicos o planos de estructuras directamente como superposiciones gráficas 2D integradas al fondo.
* **Movimiento Cinético:** Escenas de acción con encuadres dinámicos, líneas de fuga pronunciadas, humo, polvo, escombros y efectos tradicionales de cómic. Onomatopeyas integradas al entorno físico interactuando con personajes y fondos.

#### Opciones de Prompt para Generación

* **Opción 1: El "Híbrido Moderno Elegante" (Equilibrado)**
  * *Descripción:* Prioriza la limpieza de trazo y el detalle facial, balanceado con sombras fuertes y composición dinámica.
  * *Prompt:*
    > `Official comic book page layout, dramatic multi-panel grid, professional graphic novel format. White panel borders, clean non-uniform dynamic layout. Art style is a hybrid of Modern American Comic Book and European Line Art. Technical breakdown: Clean organic line art and human expressions inspired by Sara Pichelli. Stylized, sleek character designs and clarity inspired by Lee Garbett. Kinetic compositions, aggressive foreshortening, and speed lines inspired by Jorge Jimenez. Dense ink rendering with strong usage of heavy black masses and high-contrast shadows inspired by Greg Capullo. Cell-shading with a sophisticated, slightly muted pop-color palette. 2D illustration, sharp focus. NO 3D render, NO photorealism, NO text, NO speech bubbles.`

* **Opción 2: El "Kinético Oscuro" (Acción Brutal)**
  * *Descripción:* Prioriza la energía desbordante de acción, escombros, sombreados densos y contrastes de luz de neón.
  * *Prompt:*
    > `Official comic book page layout, chaotic dynamic multi-panel grid, professional graphic novel format. White panel borders, aggressive non-uniform layout. Modern American heroic art style. Technical breakdown: Explosive energy, extreme perspectives, and manga-influenced lines of movement inspired by Jorge Jimenez. Visceral textures, brutalist rendering, heavy inking, and atmospheric darkness inspired by Greg Capullo. Clean facial features and fluent body language to balance the intensity inspired by Sara Pichelli. Elegant stilyzation and narrative clarity inspired by Lee Garbett. Flat digital colors with gritty overlay textures, palette of deep desaturated tones mixed with electric neon contrast highlights. 2D illustration, sharp focus. NO 3D render, NO photorealism, NO text, NO speech bubbles.`

### 🎨 Estilo de Arte para IA (Estricto)

**Prompt Maestro de Estilo (Base para todas las imágenes):**
```
Official comic book page layout, dynamic non-uniform multi-panel grid mixing wide cinematic horizontal panels with tight vertical sequential panels. Bold solid black panel borders. Occasional panel bleeding — a character, weapon, or effect breaking through the panel border into the next panel or page margin for dramatic impact. Modern American heroic comic art style, hand-inked line work — the ink line defines all form and volume, color is flat and secondary to the line. Technical breakdown: Clean organic line art and expressive facial inking inspired by Sara Pichelli. Stylized, sleek character silhouettes and clarity inspired by Lee Garbett. Kinetic compositions, dramatic foreshortening, and speed lines inspired by Jorge Jimenez. Dense ink rendering with heavy black masses and high-contrast chiaroscuro shadows inspired by Greg Capullo. Color treatment: flat, hard-edged cel-shading with distinct color blocks per object — accurate, true-to-character skin tones preserved even under warm or colored lighting, NOT a uniform amber/sepia color-grade wash over the whole image. Cinematic saturated palette used selectively in backgrounds and lighting accents (warm backlit oranges/golds in explosive scenes, cool teal/indigo in night or rain scenes), not as a global filter over skin and faces. Strong rim lighting and backlit silhouettes used sparingly for dramatic separation, not as full-figure glow. Lettering: hand-drawn onomatopoeia (e.g. THWIP, WHAMM) integrated physically into the scene. 2D illustration, sharp focus, traditional inked texture with halftone/matte shading. NO 3D render, NO photorealistic rendering, NO photographic specular highlights on skin or lips, NO smooth airbrushed gradients, NO uniform warm color-grade filter over the entire image, NO glossy concept-art sheen, NO yellow/amber cast on skin tones.
```

---

### 📝 Guía de Guión y Arquitectura Narrativa

Guía de estilo y reglas de escritura para estructurar guiones de páginas de cómic.

#### 1. Filosofía Narrativa y Construcción de Mundo (Top-Down)
* **Enfoque de arriba hacia abajo (Systemic/Top-Down):** La trama no avanza por conveniencia individual, sino regida por sistemas macro (corporativos, geopolíticos o tecnológicos). El entorno debe sentirse denso y con reglas claras de ciencia ficción dura.
* **Optimismo Trágico:** Equilibrio entre la inmensidad y frialdad de las fuerzas macrosociales y el núcleo profundamente humano, cálido y vulnerable de los protagonistas que resisten con esperanza.

#### 2. Ritmo y Estructura de Página (Descompresión Slow-Burn)
* **Tensión Intelectual:** Espacio abundante para interacciones de diálogos domésticos, debates ideológicos y silencios que ganen el impacto emocional antes de cualquier estallido de violencia.
* **Yuxtaposición de Escalas:** Conexión explícita entre lo inmenso y lo cotidiano (ej. intercalar viñetas de informes corporativos y diagramas globales con escenas de personajes cocinando o trabajando en sus talleres).

#### 3. Directrices de Diálogo y Viñetado
* **Diálogos Cerebrales y Maduros:** Personajes expresivos con elocuencia reflexiva y contenida. La tensión se transmite a través del subtexto y lo no dicho en lugar de explicaciones teatrales o gritos.
* **Micro-Reacciones Silenciosas:** Viñetas dedicadas a capturar el lenguaje corporal, expresiones de fatiga y planos detalle de objetos cotidianos que cargan significado simbólico (un reloj, una taza, una herramienta).
* **Simetría y Orden:** Estructura de grilla ordenada y limpia que refleje control, rompiéndose rítmicamente solo en giros argumentales críticos o revelaciones extremas.