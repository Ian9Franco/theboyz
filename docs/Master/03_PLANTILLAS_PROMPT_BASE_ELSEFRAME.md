# 03 — Plantillas de Prompt Base Elseframe

**Versión:** 1.1
**Dependencia:** usar siempre junto a `00_GUIA_NUCLEO_ELSEFRAME.md` y `02_GUIA_PAGINA_VISUAL_HOUSE_STYLE_ELSEFRAME_v2_1.md`. Este documento no redefine el House Style — lo aplica a cuatro tipos de pieza que no son una página narrativa de viñetas: sheets, locaciones/vehículos, portada y contraportada.

**Función de esta guía**

La guía 02 resuelve "cómo diseñar y prompear una página de cómic". Este documento resuelve cuatro piezas de producción que tienen su propia lógica de layout y que se repiten constantemente:

1. Sheets de personaje (nuevo, adaptado desde referencia, o regenerado desde sheet viejo).
2. Sheets de locación o vehículo.
3. Portada de saga o número.
4. Contraportada (recap, no narrativa en viñetas).

Cada plantilla remite a los bloques reutilizables de la guía 02 en vez de redefinir el acabado visual, para evitar que el House Style se desincronice entre documentos.

---

# 1. Sheet de personaje

Existen tres situaciones distintas. Usar la que corresponda — no son intercambiables.

## 1A. Personaje nuevo, creado desde cero por instrucciones

No hay sheet ni imagen de referencia de identidad. Todo el diseño sale del texto.

```
[Bloque House Style — copiar literal de la sección 76A o 76B de la guía 02, según si el personaje es de bajo o alto peso narrativo]

CHARACTER DESIGN BRIEF — no reference image, design from description only:
[Nombre del personaje]. [Especie/origen]. [Rango etario aproximado]. [Contextura física]. [Rasgos faciales distintivos]. [Peinado o su ausencia]. [Paleta de color principal — 2 a 3 colores dominantes]. [Vestuario/traje — corte, materiales, capas]. [Accesorios, armas, dispositivos, máscara/visor si aplica]. [Rasgo de personalidad que debe leerse en la pose o expresión].

Do NOT default to generic superhero proportions unless explicitly requested. Match body type, age and silhouette to the brief above exactly.

LAYOUT — three isolated panels on a single flat sheet, plain neutral flat-color background, clear gutter separating the three:

1. FULL BODY — front view, neutral standing pose, full costume and equipment visible, clean silhouette.
2. FULL BODY — three-quarter or side view, slight pose variation, same character, same outfit.
3. FACE / HEAD CLOSE-UP — shoulders-up, expression matching the personality trait described above, precise facial cel shading: base skin/mask color + one hard shadow shape + minimal highlight only where necessary.

FINISH: flat color fields, one hard shadow per surface plane, optional single secondary deep shadow. No texture pass, no noise/grain/speckle/scratches. No halftone except one restrained shadow area if unavoidable.
```

Nota: sin imagen de referencia, la identidad depende completamente de la precisión del brief textual. Cuanto más específico el color y la silueta, menor la deriva entre esta generación y la próxima vez que se regenere el mismo personaje.

## 1B. Adaptar un sheet existente (mismo diseño, nuevo estilo)

Usar el bloque **77C / 76C de la guía 02** (Regeneración de Sheet) sin modificar. No repetirlo acá para evitar que este documento y la guía 02 queden desincronizados si se actualiza el bloque. Ir a la sección 76C o 77C de `02_GUIA_PAGINA_VISUAL_HOUSE_STYLE_ELSEFRAME_v2_1.md`.

## 1C. Adaptar un sheet existente CON cambios de diseño

Mismo caso que 1B, pero además hay instrucciones de modificación que deben ganarle tanto al sheet viejo como al render viejo.

```
[Bloque House Style — 76A o 76B]

TWO REFERENCE IMAGES ARE ATTACHED — EACH HAS A DIFFERENT, STRICT PURPOSE:

REFERENCE 1 — OLD CHARACTER SHEET (identity baseline, outdated rendering):
Use as baseline for design identity: face shape, hairstyle, proportions, costume construction, accessories, color palette. Do NOT copy its rendering, lighting, shading style, background, or material finish — deprecated, fully discarded.

REFERENCE 2 — STYLE PAGE(S) (rendering only):
Use strictly for rendering technique. Do NOT copy character design, pose, or content from these pages.

MODIFICATIONS TO APPLY — HIGHEST PRIORITY, OVERRIDE REFERENCE 1 WHERE THEY CONFLICT:
[Listar cada cambio explícitamente. Todo lo no listado se asume igual al sheet viejo.]

PRECEDENCE: 1) Modifications above always win. 2) Design identity from Reference 1 for everything not modified. 3) Rendering technique from Reference 2 governs how everything is drawn.

LAYOUT — same three-panel structure as section 1A above.

FINISH — same hard rules as section 1A above.
```

---

# 2. Sheet de locación o vehículo

Reutilizar la lógica de referencia dual (identidad = Grupo A, estilo = Grupo B) igual que con personajes, pero el layout cambia según el tipo de elemento — no existe un layout único.

## 2A. Locación (interior o exterior, no planeta completo)

```
[Bloque House Style — 76A o 76B]

TWO REFERENCE IMAGES ARE ATTACHED:

REFERENCE 1 — OLD LOCATION SHEET / CONCEPT (identity baseline):
Use strictly for identity: architecture, layout, scale, recognizable landmarks within the space, materials, color palette, permanent fixtures, state of damage or wear if canonical. Do NOT copy its rendering, lighting or material finish.

REFERENCE 2 — STYLE PAGE(S) (rendering only):
Use strictly for ink and cel-shading technique. Do NOT copy content or composition.

LOCATION: [nombre]. [2-3 rasgos clave de identidad si hace falta refuerzo textual].

LAYOUT — adapt panel count to what the location needs to communicate, typically:

1. WIDE ESTABLISHING VIEW — full space, cinematic angle, large flat color fields, bold ink contours, one main cel-shadow shape per structural mass.
2. SECOND ANGLE — alternate viewpoint (opposite corner, or exterior-to-interior transition if relevant) showing spatial relationships not visible in panel 1.
3. DETAIL INSET(S) — one or two close views on a distinctive architectural or functional element (entrance, control panel, landmark object, signage silhouette without readable text).

FINISH: flat color fields, one hard shadow per plane, optional secondary deep shadow. No texture pass, no photographic material texture. No readable text/signage — represent signs as flat graphic shapes only.
```

## 2B. Vehículo

```
[Bloque House Style — 76A o 76B]

TWO REFERENCE IMAGES ARE ATTACHED:

REFERENCE 1 — OLD VEHICLE SHEET (identity baseline):
Use strictly for identity: hull/body silhouette, proportions, panel layout, insignia, color scheme, damage state if canonical, interior layout and lighting sources if the sheet includes interior. Do NOT copy rendering, reflective finish or material texture.

REFERENCE 2 — STYLE PAGE(S) (rendering only):
Use strictly for ink and cel-shading technique.

VEHICLE: [nombre]. [2-3 rasgos clave si hace falta refuerzo textual].

LAYOUT — preserve the same panel structure as the old sheet if one exists; otherwise use:

1. EXTERIOR — three-quarter hero view, full vehicle, flat neutral background, large flat color fields, one hard shadow shape per plane.
2. EXTERIOR — second angle (top-down, front, or rear as relevant).
3. INTERIOR (if applicable) — flat color fields for walls/console/seats, one hard shadow mass for dominant light condition, emissive controls as small flat graphic shapes only, no volumetric light.
4. DETAIL INSET(S) — damage, markings or mechanical detail relevant to canon.

FINISH: flat color fields, one hard shadow per plane, optional secondary deep shadow. Metal = shape + one hard shadow + one broad highlight maximum. No texture pass, no photographic material texture beyond ink-drawn damage marks.
```

---

# 3. Portada de saga o número

Una portada NO es una página narrativa: es una sola imagen de máximo impacto, generalmente en **Emphasis Render** por defecto (una portada casi siempre se gana el peso visual — ver sección 53A de la guía 02), con espacio reservado para elementos tipográficos que se agregan después en maquetación.

```
[Bloque House Style — usar 76B (Emphasis Render) salvo que la saga pida deliberadamente una portada más contenida; en ese caso usar 76A]

TWO REFERENCE GROUPS ARE ATTACHED (if applicable):

GROUP A — CHARACTER/LOCATION/VEHICLE IDENTITY SHEETS:
Use strictly for identity of every element that must appear. Do NOT copy their rendering.

GROUP B — STYLE PAGE(S):
Use strictly for ink/cel-shading technique.

COVER BRIEF:
- Characters appearing: [lista con estado/traje/daño relevante]
- Composition concept: [qué debe transmitir la portada en una frase — confrontación, soledad, escala, revelación, etc.]
- Focal hierarchy: [quién/qué domina la imagen — un solo elemento dominante, no una escena de grupo equilibrada salvo que la saga lo pida]
- Symbolic or environmental elements: [objeto, ruina, cielo, luz, criatura de fondo — opcional]

COMPOSITION RULES:
Single dominant image, no panel subdivisions, no dialogue/action beats — this is an iconic pose or moment, not a story sequence. Strong silhouette readable at thumbnail size. Clear focal point achieved through scale, contrast, negative space or camera angle, not through added text.

RESERVED SPACE — CRITICAL:
Leave a clean, visually calm area near the top (logo/title lockup) and a clean strip near the bottom (indicia/credits) free of critical visual information. Do not place important faces, hands or focal details inside these zones. No generated text, no logo, no readable lettering, no barcode — these are added afterward in layout software.

FINISH: same hard rules as Emphasis Render (section 62/76B of guide 02) — hard-edged shading remains structural, soft transitions only for atmosphere/skin/glow/reflected color/bloom.
```

---

# 4. Contraportada (recap de texto, no página de viñetas)

Estructuralmente es lo opuesto a una portada: la imagen es secundaria, el protagonismo es del bloque de texto (que se agrega después). No es una página de cómic dividida en viñetas de acción — es una sola pieza compuesta por una ilustración de apoyo + una gran zona tipográfica limpia.

```
[Bloque House Style — 76A o 76B según el peso narrativo del recap]

REFERENCE (if applicable): identity sheets for any character/location featured, following the same Group A / Group B logic as sections 1-3 above.

BACK COVER BRIEF:
- Mood/tone of the recap: [ej. amenaza contenida, cierre de arco, revelación final]
- Featured visual element: [un personaje en pose contenida / un objeto simbólico / un paisaje de bajo detalle — UNO SOLO, no una escena de acción]

LAYOUT — single composition, NOT divided into sequential comic panels:

1. UPPER OR SIDE ILLUSTRATION ZONE (roughly 35-50% of the composition) — one contained image: a single character in a quiet/iconic pose, or a symbolic object/environment fragment. Moderate detail, muted palette, no dynamic action, no motion lines, no impact effects. This is a mood image, not a story beat.
2. LARGE CLEAN ZONE (remaining 50-65% of the composition) — flat or subtly gradient background color field, visually calm, completely free of characters, props, or busy detail. This area is reserved for recap text to be added later — do not generate any text, lettering or paragraph shapes here.
3. LOWER STRIP — a clean, simple horizontal band reserved for publisher/credits information, kept visually quiet and separate from the illustration zone.

COMPOSITION RULES:
The illustration zone must not compete with the reserved text zone — no elements bleeding across the boundary between them. No panel borders, no gutters, no sequential storytelling. This is a single evocative image plus negative space, not a scene broken into moments.

FINISH: same hard rules as the selected Render Mode (section 62/76A or 76B of guide 02). No generated text, no logo, no barcode, no readable signage anywhere in the composition — these are added afterward in layout software.
```

---

# 5. Nota de uso común a las cuatro plantillas

- **Acabado seco, sin brillo disperso (v1.1):** en todos los bloques FINISH de este documento, agregar siempre: "Maximum one broad, deliberate highlight per material plane — no scattered specular highlight dots, no sparkle or starburst highlights, no wet-look sheen. Shadow does real narrative work through hard-edged shapes; the finish should read as dry, matte comic-print ink and flat color, not photographic gloss." Ver sección 66 de la guía 02 para el detalle completo de este patrón de falla.
- Siempre completar el bloque House Style copiando literal de la sección 76A/76B de la guía 02 — no parafrasear (ver regla de no parafraseo, sección 52A de la guía 02).
- Cuando se adjunten referencias de identidad + estilo, declarar siempre cuál es Style Anchor y cuál es Style Complement (sección 52A).
- Ninguna de estas cuatro piezas debe generar texto legible, logos ni indicia real — son elementos que se agregan en maquetación, no en la generación de imagen (sección 74/75 de la guía 02).
- Estas plantillas no reemplazan el protocolo de la sección 53-55 de la guía 02 para páginas narrativas de viñetas; son piezas de producción distintas con su propia lógica de layout.
