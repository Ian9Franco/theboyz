# FUEGO PÚRPURA — PROMPTS OPTIMIZADOS POR PÁGINA
## Páginas 38 a 74 — versión composición dinámica (Splash + Insets + Secuencias)

## POR QUÉ ESTE FORMATO
El objetivo de esta versión es que cada página se genere con una estructura de cómic más cercana a las referencias: **panel dominante**, mini-viñetas incrustadas, secuencias verticales u horizontales de detalle, personajes rompiendo el borde, gutters negros gruesos, diagonales agresivas, perspectiva marcada y fondos-sonido cuando corresponda. La trama se mantiene igual, pero cada prompt pide una página completa con arquitectura visual clara en vez de viñetas aisladas.

## CÓMO USAR CADA PROMPT
Cada bloque de página ya viene listo para pegar en SeaArt. Se arma así:
`[ESTILO BASE] + [DISEÑO DE PÁGINA] + [LOCKS/FICHA de los personajes de ESA PÁGINA] + [PROMPT DE PÁGINA COMPLETA] + [NEGATIVO ESTÁNDAR]`

Abajo tenés el ESTILO BASE, el DISEÑO DE PÁGINA, la Librería de Personajes (candados de diseño y referencias a sus archivos `_sheet.webp`) y el NEGATIVO ESTÁNDAR. Copien el texto correspondiente y péguenlo en el prompt de generación.

---

## ESTILO BASE (pegar siempre, sin cambios)
> Official modern American comic book page, bold solid black panel borders, thick black gutters, dynamic full-page composition with one dominant cinematic panel plus smaller inset panels, zoom strips, overlapping frames, diagonal panel cuts, occasional figures breaking panel borders, strong perspective, expressive body language. Solid hand-inked line work, clean organic line art, expressive faces, clean skin with no wrinkles, flat cel-shading with defined shadow borders, halftone matte paper texture, matte finish. Accurate character skin tones, no global color wash. 2D vector-like illustration, sharp focus, traditional inked texture, flat colors, no glossy or metallic reflections, dry matte surfaces. No rain. Time continuity: Dumbo assault and escape are dry night scenes; time passes during the underground vampire sequence; after the group exits the underground, exterior scenes become clear daytime or bright overcast daylight. Only a few old puddles are allowed on the ground for reflections.

## DISEÑO DE PÁGINA (pegar siempre, sin cambios)
> Page architecture inspired by modern superhero comic layouts: avoid simple equal-size grid pages. Use one clear dominant image per page, supported by smaller inset panels, stacked zoom strips, cinematic horizontal strips, and occasional borderless close-up inserts. Prefer bold black gutters and confident negative space. Characters may break out of panel borders when the action peaks. Use strong foreground silhouettes framing the scene, deep perspective corridors, low-angle and high-angle camera views, speed lines, impact bursts, and overlapping panels. For action pages, use sequential movement across panels like storyboard beats: wide establishing action, close-up mechanical detail, impact panel, reaction inset, final wide consequence. For emotional or noir pages, use a large atmospheric panel with small hand/eye/object insets. Allow stylized sound-effect lettering integrated into the background only when explicitly requested by the page prompt, as part of the art and not as dialogue. Use pure white or flat-color negative backgrounds for selected impact panels, with figures and energy breaking past the panel border.

## NEGATIVO ESTÁNDAR (pegar siempre, sin cambios)
> --no 3d render, photorealistic, cgi, rain, rainy weather, rainfall, raindrops, storm clouds, night rain, speech bubbles, captions, random unreadable text, watermarks, glossy reflections, plastic surfaces, shiny armor, metallic gloss, airbrushed soft shading, raytracing, digital painting gradients, white gutters, white panel borders, white divider lines, wet skin, wet clothes, soaked clothing, water droplets, facial wrinkles, hyper-detailed skin, sweat, dirty pores, shiny wet highlights

## LIBRERÍA DE PERSONAJES (candados de diseño y referencias)

**[IAN]** Ian / Vesperwing (Reference: `ian_sheet.webp`): slim young man, light skin, messy wavy brown hair, light brown eyes behind thick brown-framed glasses, exhausted analytical expression, dark grey hoodie over light grey shirt, dark jeans, amber tear pendant.

**[IAN-SUIT]** (usar en vez de [IAN] cuando esté equipado) Ian / Vesperwing (Reference: `vesperwing_sheet.webp`): wearing compact emerald-green vector exo-gauntlets and metallic exo-boots, green kinetic energy glow, same face and hair as base design.

**[MATI]** Mati / Snapfire (Reference: `mati_sheet.webp`): young man, warm light-brown skin, clean-shaven with dimples, short dark hair, charcoal tactical bomber jacket, olive round-neck shirt, khaki cargo pants.

**[SWAPFIRE]** (usar en vez de [MATI] cuando use visor) Mati / Snapfire (Reference: `swapfire_sheet.webp`): wearing prototype purple tactical visor covering his eyes, violet plasma glow behind the lenses.

**[JULIAN]** Julián / Wildcard (Reference: `julian_sheet.webp` / `wildcard_sheet.webp`): lean athletic young man, light warm-brown skin, short wavy black hair with clean side fade, thick stubble beard and mustache, almond light-brown eyes, dark navy knit sweater, dark jeans, sarcastic anxious expression; creates cyan-magenta glitch-energy constructs and a pure energy tactical staff with no physical handle.

**[UANDI]** Uandi (humano) (Reference: `uandi_sheet.webp`): muscular athletic young man, broad shoulders, coily dark brown curls, clean faded sides, short stubble beard, round black-framed glasses, left arm full black tattoo sleeve, right arm two thin black bands, fitted black crewneck shirt.

**[AEGIS]** Aegis (Uandi transformado) (Reference: `aegis_sheet.webp`): massive red incandescent hypertrophied body, glowing magma-like tattoos and runes, heat vapor rising from skin, cracked red-orange runes, shirt damaged by heat, no explicit gore.

**[REGULAR]** R.E.G.U.L.A.R. (Reference: `R.E.G.U.L.A.R_sheet.webp`): tactical armored commander, matte black and dark blue combat armor, sealed helmet with solid blue visor, cyan estasis lines, heavy tactical shield, disciplined military posture, expert close-quarters combat.

**[VOPS]** V.O.P.S. soldiers (Reference: `v.o.p.s_sheet.jpeg`): dark matte tactical uniforms, blue/cyan estasis lights, rifles with flashlights, heavy shields; dark blue/black color scheme, not gold.

**[VANGUARD]** Don Vanguard (Reference: `don vanguard_sheet.webp`): imposing older man, immaculate white suit, authoritative and furious demeanor, City Hall office setting.

**[CARMELLA]** Carmella Nocturna (Reference: `Carmilla_sheet.webp` - *Nota: Wawi es Carmella*): elegant pale vampire woman, black and deep crimson velvet coat, dark sunglasses even in daylight, folded crimson parasol or cane-parasol as an aristocratic accessory, aristocratic underworld poise.

**[CARMELLA-GUARDS]** (agregar a [CARMELLA] si aparecen): accompanied by two tall vampire bodyguards in black coats.

**[JAZ]** Jaz (Reference: `JAZ_sheet.webp`): young woman, sunset-gold hair, cat-eye glasses, black turtleneck, elegant East Side penthouse style, warm golden spiritual aura.

**[NORMAN]** Norman Parker (Reference: `Norman Parker_sheet.webp` / `Maker_sheet.webp`): tall elegant corporate man, impeccable dark blue tailored suit, slicked-back hair, calm predatory expression; subtle elastic cellular mutation visible only in reflections, not grotesque.

**[GORGON]** Gorgon (Reference: `gorgon_ficha_sheet.webp`): colossal mutated tactical brute, industrial respirator, dark torn leather tactical harness, reinforced polymer tubes at temples/neck/arms, neon green metatoxin vapor, intelligent calculating eyes.

## LIBRERÍA DE LOCACIONES

**[PARKER-TOWER]** Parker Tower (Reference: `public/personajes/Locaciones/Torre P/Torre P.webp`): monumental futuristic black graphite and blue-glass corporate skyscraper, tall tapered tower, exposed dark structural ribs, curved blue curtain-wall glass, sharp crown spires and antennae, massive cantilevered landing platform near the upper floors with a glowing white-blue "P" logo underneath, elevated glass skybridges, transparent glass lobby canopy, broad marble entrance plaza with a few old puddle reflections but no rain, clean daylight exterior.

**[PARKER-GARAGE]** Parker Tower garage / hangar (Reference: `public/personajes/Locaciones/Torre P/garaje.webp`): huge circular underground high-tech mech hangar, dark graphite metal walls, blue status lights, yellow industrial robotic arms, radial ceiling aperture, reinforced storage bays, command stations, a giant green-lit armored mech docked in the center on a heavy hydraulic circular platform, dense cables and pistons, industrial scale.

**[PARKER-INTERIOR]** Parker Tower interior (Reference: `public/personajes/Locaciones/Torre P/Interior.webp`): pristine futuristic corporate interior, grey polished floors with blue light strips, circular atrium lounge with central suspended fireplace, curved balconies, panoramic windows, glass display pods with armored suits, clean conference room with holographic blue interfaces, round command room with large blue hologram table, luxury meets laboratory.

---
---

# PÁGINA 38 — "Apagón Táctico"
Composición: página completa con panel dominante superior y dos insets de preparación abajo. Ritmo: tensión previa al asalto.
* **PERSONAJES:** Ian, Mati, Julián, Uandi, V.O.P.S.

### Prompt de página completa
> [ESTILO BASE] [IAN-SUIT] [MATI] [JULIAN] [UANDI] [VOPS] Full comic page layout. Dominant wide top panel: Interior of Dumbo Base, cluttered underground industrial loft with exposed brick, cables, screens, old red couch, server racks and workshop tables, suddenly plunged into darkness while blue and cyan V.O.P.S. siren lights slice through tall industrial windows. In the deep foreground, Ian kneels at the main breaker, plugging emerald vector gauntlets into thick power cables, green glow reflected on his glasses. Left vertical inset strip: outside street at dry night, V.O.P.S. tactical vehicles and searchlights pointing at the building facade, a few old puddles reflecting blue-cyan lights on otherwise dry pavement. Bottom row of three small black-bordered panels: Mati adjusts his purple visor; Julián forms a handle-less cyan-magenta glitch-energy staff; Uandi breathes heavily with faint red light under his skin. Strong black gutters, noir tactical tension, no dialogue. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 38.5 — "El Interruptor"
Composición: secuencia vertical de zoom + panel de impacto central + inset exterior. Ritmo: acción rápida y corte de energía.
* **PERSONAJES:** Ian, V.O.P.S.

### Prompt de página completa
> [ESTILO BASE] [IAN] [IAN-SUIT] [VOPS] Full comic page layout with a tall left zoom strip and one large action panel. Left strip, three stacked panels: close-up of Ian's exhausted face with green monitor glow in his eyes; extreme close-up of his finger hovering over a metallic starter button; close-up of a heavy industrial steel switch lever on concrete. Main central panel on selective pure white impact background: Ian's exo-gauntlet hand yanks the lever down, explosive green sparks and kinetic arcs burst past the black panel border into the gutters. Top-right small inset: the whole base goes black. Bottom-right horizontal inset: outside the building at night, V.O.P.S. soldiers throw tear-gas canisters through a shattered industrial window, grey smoke plumes curling inward through dry air. No speech bubbles, fast mechanical rhythm. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 39 — "Entrada Forzada"
Composición: panel grande de irrupción con micro-secuencia de botas/escudos. Ritmo: entrada destructiva.
* **PERSONAJES:** Ian, Mati, Julián, V.O.P.S.

### Prompt de página completa
> [ESTILO BASE] [VOPS] [IAN] [MATI] [JULIAN] Full comic page layout, aggressive diagonal slash composition. Dominant central panel: metal door blasts inward into Dumbo Base, shattered fragments and smoke exploding toward the reader, flashlight beams cutting the haze. Across the left edge, a vertical mini-sequence of three narrow panels: heavy black tactical boot stomps onto the broken frame; shield edge locks into formation; rifle flashlight switches on. Bottom wide panel: disciplined V.O.P.S. soldiers pour in with heavy shields while Ian, Mati and Julián crouch behind concrete columns and workshop machinery, their faces lit by crossing beams. One small inset overlaps the smoke: Ian's eyes calculating the entry path. Thick black gutters, cinematic tactical pressure, no dialogue. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 39.5 — "El Despertar del Coloso"
Composición: flashbang blanco + columna de zoom corporal + gran silueta final. Ritmo: caos cegador e inicio de la mutación.
* **PERSONAJES:** Uandi, V.O.P.S.

### Prompt de página completa
> [ESTILO BASE] [UANDI] [AEGIS] [VOPS] Full comic page layout. Top horizontal mini-sequence: tactical canister grenade rolling on concrete; extreme close-up of its red warning light blinking; blinding white flashbang eruption turning everyone into hard black silhouettes. Main body of page is a vertical transformation column: Uandi in shadows clutching his face; close-up of black veins pulsing red along his neck; extreme close-up of one eye turning incandescent magma; medium shot of chest and shoulders expanding, red runes cracking open, steam rising. Bottom half is a huge dramatic reveal panel: the colossal red Aegis silhouette stands upright in smoke, shoulders and head breaking past the border while V.O.P.S. flashlight beams converge on him. Heavy black gutters, white negative-space flash, no gore. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 40 — "Aegis Desatado"
Composición: splash dominante con insets de telemetría y daño físico. Ritmo: acción destructiva masiva.
* **PERSONAJES:** Ian, Julián, Uandi, V.O.P.S.

### Prompt de página completa
> [ESTILO BASE] [AEGIS] [IAN-SUIT] [JULIAN] [VOPS] Full comic page layout with one huge central splash. Aegis stands in a dry night street shadow like a red-hot colossus, vapor pouring from shoulders, V.O.P.S. soldiers firing cyan estasis bursts that splash across his incandescent chest and get absorbed by magma tattoos. In the same dominant panel, he hurls two soldiers by their tactical vests into an armored van, crumpling metal, no blood. Left side stacked insets: Ian inside the base reading a tablet; Julián beside him with nervous sarcastic expression; extreme close-up of unstable green vector wave lines peaking on the tablet reflected in Ian's glasses. Bottom overlapping insets: crushed van dent forming, tactical boot slipping near an old puddle, cracked helmet on asphalt. Strong black gutters, energy arcs breaking borders. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 41 — "Llamado de Prioridad"
Composición: figura inmóvil en panel grande + insets de comunicador. Ritmo: comedia táctica y presión.
* **PERSONAJES:** R.E.G.U.L.A.R., Don Vanguard, V.O.P.S.

### Prompt de página completa
> [ESTILO BASE] [REGULAR] [VANGUARD] [VOPS] Full comic page layout, mostly one large still panel with comedic pressure. R.E.G.U.L.A.R. stands motionless in the dry night street, helmet and shield calm, while behind him a soldier flies through the air and crashes onto a patrol car hood as a dark silhouette. Across the bottom, three small inset panels like a zoom strip: armored wrist communicator buzzing with a red alert; extreme close-up of a red holographic icon blinking on the gauntlet; cyan holographic call projecting Don Vanguard furious in his City Hall office, slamming a desk. Use thick black panel borders, restrained body language, chaos in background, no speech bubbles. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 41.5 — "Decisión Táctica"
Composición: doble escena paralela, Aegis al fondo y launcher como reveal. Ritmo: escalada del conflicto y armamento pesado.
* **PERSONAJES:** R.E.G.U.L.A.R., Uandi, Don Vanguard, V.O.P.S.

### Prompt de página completa
> [ESTILO BASE] [REGULAR] [AEGIS] [VANGUARD] [VOPS] Full comic page layout with split diagonal tension. Upper large panel: Aegis rips a reinforced armored van door from its hinges and uses it as an improvised shield, cyan bolts deflecting, V.O.P.S. soldiers scrambling. Right vertical inset strip: R.E.G.U.L.A.R. argues with a cyan hologram of furious Don Vanguard in a City Hall office; close-up of R.E.G.U.L.A.R.'s gloved thumb slamming a manual kill switch; hologram shattering into horizontal static. Bottom dominant low-angle reveal: the commander opens an armored vehicle compartment and pulls out a massive black-and-blue launcher with cyan glowing coils. Small overlapping insets show coils powering up and his finger settling on the heavy trigger. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 42 — "El error de mirar al monstruo"
Composición: batalla coral con foco visual que se cierra sobre Julián. Ritmo: combate callejero intenso de múltiples frentes.
* **PERSONAJES:** Ian, Mati, Julián, R.E.G.U.L.A.R., Uandi, V.O.P.S.
* **CONTINUIDAD:** Julián queda marcado como objetivo principal mientras Aegis absorbe la atención del frente.

### Prompt de página completa
> [ESTILO BASE] [AEGIS] [IAN-SUIT] [SWAPFIRE] [JULIAN] [REGULAR] [VOPS] Full comic page layout, multi-front street battle. Dominant wide panel: Aegis smashes a patrol car door outside Dumbo Base at dry night while V.O.P.S. soldiers scatter behind shield walls, red vapor filling the street. Left lower inset: Ian repels a flanking soldier with emerald gauntlet arcs inside the broken entrance. Right lower inset: Mati fires short precise violet visor bursts to melt weapons, not people. Across the center, a narrow diagonal action panel isolates Julián at the alley mouth, spinning a handle-less cyan-magenta staff with afterimages. Bottom large still panel: R.E.G.U.L.A.R. stands motionless, shield low, launcher nearby, helmet visor locked on Julián while Aegis rages blurred behind. Tiny visor inset shows abstract targeting shapes separating Julián's cyan-magenta signature from Aegis's red mass. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 43 — "Captura limpia"
Composición: coreografía en cascada con golpes limpios y panel final de caída. Ritmo: combate clínico e inmovilización.
* **PERSONAJES:** Julián, R.E.G.U.L.A.R.
* **CONTINUIDAD:** El comandante no improvisa; neutraliza a Julián con precisión profesional.

### Prompt de página completa
> [ESTILO BASE] [JULIAN] [REGULAR] Full comic page layout, clean tactical MMA choreography. Top wide panel: Julián throws cyan-magenta glitch cards and swings a pure energy staff at R.E.G.U.L.A.R. in a dry night street. Middle of the page becomes a diagonal cascade of four tight panels: R.E.G.U.L.A.R. blocks with a heavy matte shield without stepping back; he slips inside the staff arc on a pure white impact background; shoulder-checks Julián's chest; armored glove strikes Julián's solar plexus with black impact lines, no gore. Bottom dominant horizontal panel: Julián hits dry asphalt hard near a few old puddles, energy staff dissolving into fading cyan-magenta static reflections, R.E.G.U.L.A.R. already balanced and upright. Thick black gutters, clinical precision, no dialogue. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 43.5 — "El Grillete"
Composición: panel grande de sometimiento + insets mecánicos de inhibidores. Ritmo: sometimiento físico.
* **PERSONAJES:** Julián, R.E.G.U.L.A.R., V.O.P.S.
* **CONTINUIDAD:** Julián queda inhibido y listo para traslado, pero el furgón todavía no se mueve.

### Prompt de página completa
> [ESTILO BASE] [JULIAN] [REGULAR] [VOPS] Full comic page layout. Dominant low horizontal panel: R.E.G.U.L.A.R. pins Julián on matte dry asphalt, knee on his back, one arm twisted into control position, Julián conscious and bruised. Around the main panel, V.O.P.S. shield soldiers close into a protective ring that blocks Ian and Mati's line of approach. Overlapping mechanical insets: heavy inhibitor cuffs clamp onto Julián's wrists on a pure white detail background; cyan-magenta sparks die instantly; close-up of Julián's face pressed to asphalt, one eye open toward Ian and Mati's direction, static fading around his cheek. Dense black gutters, restrained violence, no gore. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 44 — "Ruta de Mantenimiento"
Composición: mapa táctico integrado en la escena + vista exterior secundaria. Ritmo: descubrimiento táctico y decisión de flanqueo.
* **PERSONAJES:** Ian, Mati, Julián, V.O.P.S.
* **CONTINUIDAD:** Ian y Mati no escapan; ven a Julián siendo llevado al furgón e identifican el ducto como atajo hacia la zona trasera de carga.

### Prompt de página completa
> [ESTILO BASE] [VOPS] [IAN-SUIT] [SWAPFIRE] [JULIAN] [AEGIS] Full comic page layout, tactical spatial continuity. Main wide interior panel: Dumbo Base filled with smoke, V.O.P.S. shield wall advancing while red glow from Aegis's street battle burns through the broken entrance. In the mid-ground, soldiers drag handcuffed Julián toward a side loading area beyond machinery, not yet inside the van. Bottom-left inset cluster: Ian and Mati hidden behind a heavy metal lathe; Ian points at an old maintenance map on a cracked wall panel or tablet; extreme close-up of Ian's gloved finger tracing a route to the rear loading area, no readable labels. Bottom-right dominant detail: Ian lifts a grease-stained square floor hatch, revealing a dark duct. Thin exterior banner panel across the top edge: helicopters and searchlights focus on Aegis at the front, leaving the side alley shadowed. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 45 — "Bajo la Base"
Composición: ducto claustrofóbico como eje diagonal y mini-cortes de espacio arriba/abajo. Ritmo: avance subterráneo hacia el furgón.
* **PERSONAJES:** Ian, Mati, V.O.P.S.
* **CONTINUIDAD:** El ducto conecta físicamente la base con la parte trasera del área de carga. No hay explosión de escape definitiva.

### Prompt de página completa
> [ESTILO BASE] [IAN-SUIT] [SWAPFIRE] [VOPS] Full comic page layout, claustrophobic infiltration page. A long diagonal dominant panel runs from upper-left to lower-right inside a narrow industrial maintenance duct: Ian leads with emerald gauntlet light as a small lamp, Mati crawls behind under pipes and old cables, dust shaking from red tremors above. Top-left inset: Ian holds open the heavy floor hatch while Mati drops in, shield-wall flashlights sweeping above without seeing them. Small overhead cutaway inset in the center: abstract route passes beneath the workshop toward parked vehicles, no readable labels. Bottom-left inset: Mati pauses, hearing muffled boots and engine checks above, purple visor flickering. Bottom-right low-angle grate panel: silhouettes of V.O.P.S. boots and the underside of an armored transport van appear above them. Heavy black gutters, compressed perspective. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 46 — "Carga de Aegis"
Composición: gran acción frontal + panel táctico del furgón detenido. Ritmo: Aegis concentra involuntariamente el frente.
* **PERSONAJES:** Uandi, R.E.G.U.L.A.R., V.O.P.S.
* **CONTINUIDAD:** Aegis no cubre una retirada consciente; su furia obliga a V.O.P.S. a mirar al frente y detiene el traslado.

### Prompt de página completa
> [ESTILO BASE] [AEGIS] [REGULAR] [JULIAN] [VOPS] Full comic page layout. Dominant upper action panel: Aegis hurls a torn van door across the front street, forcing V.O.P.S. shield teams to pivot away from the side loading zone, red heat vapor crossing blue estasis fire. Overlapping detail insets: Aegis's incandescent fingers burning marks into torn metal; V.O.P.S. boot sliding backward in a puddle. Middle horizontal tactical strip: R.E.G.U.L.A.R. watches Aegis approach the transport lane; soldiers push cuffed Julián toward the stationary armored van; R.E.G.U.L.A.R. raises one armored hand ordering the transport to wait while his visor tracks Aegis. Bottom wide panel: side loading alley, armored V.O.P.S. van parked with rear doors open, engine lights on but wheels still. Insets show the tire motionless in a puddle and a guard's tense hand on the rear handle. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 47 — "La Rejilla Trasera"
Composición: punto de vista desde rejilla + acción frontal separada por profundidad. Ritmo: llegada al punto de observación y espera.
* **PERSONAJES:** Ian, Mati, Julián, V.O.P.S.
* **CONTINUIDAD:** Ian y Mati llegan detrás del furgón, pero no salen todavía; atacar antes alertaría al perímetro.

### Prompt de página completa
> [ESTILO BASE] [IAN-SUIT] [SWAPFIRE] [AEGIS] [REGULAR] [VOPS] Full comic page layout from a hidden viewpoint. Large lower panel seen through rusty grate bars: Ian and Mati crouch inside the duct behind trash bins and industrial crates, Ian signaling Mati to wait with one finger raised, their faces lit green and violet. Through the grate, the stationary V.O.P.S. van sits with rear doors open, two guards at the back, most soldiers turned toward the front battle. Top dominant exterior action panel: Aegis charges too close to the vehicle lane, forcing soldiers back and R.E.G.U.L.A.R. to plant himself between Aegis and the parked van. Overlapping insets: red brake lights reflected in a puddle; R.E.G.U.L.A.R.'s boots planted firmly; old brick blind spot with broken analog service gate; extreme close-up of corroded grate and dead sensor cable. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 48 — "Transporte en Espera"
Composición: interior del furgón en columna + perímetro dividido en plano grande. Ritmo: preparación de traslado sin partida.
* **PERSONAJES:** Julián, R.E.G.U.L.A.R., V.O.P.S., Aegis.
* **CONTINUIDAD:** Julián entra al furgón, pero R.E.G.U.L.A.R. prohíbe moverlo hasta expulsar a Aegis.

### Prompt de página completa
> [ESTILO BASE] [JULIAN] [REGULAR] [AEGIS] [VOPS] Full comic page layout, procedural tactical rhythm. Left vertical strip of five tight panels: soldiers shove cuffed Julián into the dark armored van; Julián lands on metal floor, bruised, inhibitor cuffs glowing cyan; rear doors begin closing but do not lock fully, guards still outside; driver cockpit seen through windshield, systems lit but van parked; close-up of a still wheel in a puddle. Right dominant tactical layout panel: front street is dominated by Aegis and heavy V.O.P.S. fire while the side alley holds the parked prisoner van. R.E.G.U.L.A.R. in foreground gestures that nobody moves the transport, red Aegis glow reflected in his visor, Ian and Mati barely visible as silhouettes behind the hidden grate. Thick black gutters connect all zones. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 49 — "La Oportunidad No Llega"
Composición: página silenciosa de espera con primerísimos planos. Ritmo: tensión contenida, no ataque frontal.
* **PERSONAJES:** Ian, Mati, Julián, V.O.P.S.
* **CONTINUIDAD:** Se elimina el intento frontal de Ian. Ian y Mati esperan ocultos porque atacar revelaría su posición.

### Prompt de página completa
> [ESTILO BASE] [IAN-SUIT] [SWAPFIRE] [JULIAN] [REGULAR] [AEGIS] [VOPS] Full comic page layout, stealth tension and restraint. Dominant lower panel from inside the grate: two V.O.P.S. guards pass within inches, boots huge in foreground, Ian and Mati frozen in darkness behind the bars. Left column of small close-ups: Ian watches guards around the van, jaw clenched; Mati lifts his visor with shaking fingers, wanting to shoot; Ian stops him with a firm hand on his shoulder. Tiny inset through the van rear window slit: Julián sits cuffed inside, fighting to stay conscious. Top wide panel: R.E.G.U.L.A.R. turns away from the transport, attention locked on approaching Aegis. Overlapping visor inset shows Aegis's huge red thermal mass dominating abstract ballistic reflection, van tiny and blurred behind. No action release yet. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 50 — "Furia Roja"
Composición: ascenso visual desde ojo/furgón/puño hacia splash de amenaza. Ritmo: Aegis amenaza el transporte y obliga al disparo.
* **PERSONAJES:** Uandi, R.E.G.U.L.A.R., V.O.P.S.
* **CONTINUIDAD:** La furia de Aegis se activa por ver a Julián capturado y el furgón cerca, no por una derrota de Ian.

### Prompt de página completa
> [ESTILO BASE] [AEGIS] [JULIAN] [REGULAR] [VOPS] Full comic page layout. Top-left vertical zoom strip: Aegis's red-hot face turns toward the side alley; tiny view through the van rear slit shows Julián cuffed inside with weak cyan-magenta static; extreme close-up of Aegis's massive fist clenching, magma cracks widening. Main splash: Aegis advances toward the prisoner van, heatwave bending dry night air, soldiers shouting and retreating, transport guards panicking while the van remains stationary. Foreground lower-right: R.E.G.U.L.A.R. raises the heavy launcher into firing position, soldiers clearing his line of fire. Overlapping insets: guard hand hovering over van door lock; van suspension trembling; cyan coils charging; Ian and Mati watching helplessly from the hidden grate. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 51 — "El Traslado Suspendido"
Composición: interior cerrado y símbolos de inmovilidad. Ritmo: encierro, inmovilidad y llamada posible.
* **PERSONAJES:** Julián, V.O.P.S., R.E.G.U.L.A.R.
* **CONTINUIDAD:** Julián está encerrado en un vehículo inmóvil; los soldados esperan autorización.

### Prompt de página completa
> [ESTILO BASE] [JULIAN] [REGULAR] [VOPS] [AEGIS] Full comic page layout, trapped interior against battlefield exterior. Dominant interior panel: Julián inside the parked armored van, thrown against a metal bench, wrists cuffed with inhibitor restraints, bruised but alert under dim emergency light. Across the right edge, a vertical mechanical zoom strip: rear doors slam shut; latch locks; van tire rests still in a puddle, engine vibration making ripples but no rotation; driver's gloved hand waits on the gear lever. Top exterior banner: V.O.P.S. guards close the doors while the driver's silhouette checks controls. Bottom wide panel: R.E.G.U.L.A.R. stands between approaching Aegis and the transport lane, one hand raised to hold the van in place, launcher beginning to charge. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 52 — "Wawi"
Composición: página íntima, encierro oscuro y respuesta roja en contrapunto. Ritmo: SOS discreto desde el furgón inmóvil.
* **PERSONAJES:** Julián, Carmella Nocturna.
* **CONTINUIDAD:** La llamada ocurre antes del disparo contra Aegis, con el furgón detenido y los guardias afuera.

### Prompt de página completa
> [ESTILO BASE] [JULIAN] [CARMELLA] Full comic page layout, claustrophobic SOS. Main large panel: Julián alone inside the parked armored van, cuffed wrists in his lap, dim red emergency light, exterior battle flashing through thin seams. Left vertical zoom strip: he painfully twists one hand toward his pocket; pulls out a cracked smartphone despite inhibitor cuffs; cracked phone screen glows red-pink on his bruised face with abstract call-interface shapes, no readable text; trembling thumb presses the call button while boots and muffled voices remain outside. Bottom contrasting panel in red-lit underground bar: a phone vibrates on a dark table, pale gloved hand reaching from shadow, only Carmella's lips and black velvet sleeve visible, crimson neon reflected on glass. No full reveal yet. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 53 — "El disparo contra Aegis"
Composición: disparo como splash blanco-cian, con la sombra moviéndose en insets. Ritmo: evento dominante que permite la infiltración silenciosa.
* **PERSONAJES:** R.E.G.U.L.A.R., Uandi, Ian, Mati, Carmella Nocturna.
* **CONTINUIDAD:** Carmella empieza a acercarse en segundo plano, pero R.E.G.U.L.A.R. solo registra a Aegis.

### Prompt de página completa
> [ESTILO BASE] [REGULAR] [AEGIS] [IAN-SUIT] [SWAPFIRE] [CARMELLA] Full comic page layout. Main central splash on pure white-cyan impact background: R.E.G.U.L.A.R. fires a colossal cyan containment blast from the heavy launcher, the flash overpowering the dry night street, vehicles vibrating, soldiers covering visors. Top-left zoom strip: launcher raised; cyan capacitor coils charging; dry air warping near the muzzle. Across the blast path, Aegis is struck in the chest and launched violently out of the Dumbo perimeter over broken concrete and barricades, not yet landing in Central Park. Shadow insets along the blind alley: barely visible red eyes and black coat shape slip behind transport guards; van guards blinded by flash; Ian and Mati flinch behind the grate seeing dark shapes move. Bottom still panel: R.E.G.U.L.A.R. lowers smoking launcher but looks toward Aegis's trajectory, not the van. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 54 — "La sombra"
Composición: rescate noir con sombras superpuestas al furgón. Ritmo: intervención silenciosa aprovechando el destello.
* **PERSONAJES:** Julián, Carmella Nocturna, V.O.P.S.
* **CONTINUIDAD:** Carmella libera a Julián sin que el comandante la vea.

### Prompt de página completa
> [ESTILO BASE] [JULIAN] [CARMELLA] [IAN-SUIT] [SWAPFIRE] [VOPS] Full comic page layout, noir stealth rescue. Dominant shadowy alley panel: Carmella and two dark vampire silhouettes silently neutralize the few van guards in the cyan afterflash, no gore, bodies dropping as dark shapes, crimson eyes and black coats in mist. Overlapping insets: pale hand catches a falling rifle before it hits ground; guard helmet rolls silently under the van; broken latch on rear door. Right vertical sequence: rear of stationary van with disoriented guards; van doors opening quietly; Julián inside turning toward a pale hand; Julián pulled out with one inhibitor cuff broken and one still hanging. Bottom small grate panel: Ian and Mati watch, eyes wide. Final narrow panel: dark feminine silhouette points toward blind alley entrance, face unrevealed. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 55 — "Cortina violeta"
Composición: carrera lateral con vapor violeta como gran forma gráfica. Ritmo: salida del ducto, rescate físico y cobertura.
* **PERSONAJES:** Ian, Mati, Julián, Carmella Nocturna, V.O.P.S.
* **CONTINUIDAD:** Ian y Mati salen solo cuando Julián ya está fuera del furgón. La cortina se genera después de alcanzarlo.

### Prompt de página completa
> [ESTILO BASE] [IAN-SUIT] [SWAPFIRE] [JULIAN] [CARMELLA] [VOPS] Full comic page layout, horizontal escape movement. Top-left inset: Ian quietly pushes open the hidden grate behind crates while Mati follows. Main sweeping horizontal panel: Ian reaches Julián and catches him under one arm as Julián limps, one cuff hanging; Mati turns back and fires a short violet plasma line into a street steam grate or exposed pipe, producing dense vapor, violet sparks and camera interference, not an explosion. The vapor wall becomes a huge graphic shape crossing the page. Insets inside the vapor: Mati's visor glowing intense purple; boiling water bursting from the grate; confused V.O.P.S. silhouettes behind haze. Bottom wide panel: Ian supports Julián while Mati covers rear, Carmella's silhouette with a folded crimson parasol gestures them toward the blind alley entrance. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 56 — "Callejón / primera aparición frontal de Carmella"
Composición: reveal de personaje en panel dominante con mini-reacciones. Ritmo: noir, misterio y respiro breve.
* **PERSONAJES:** Ian, Mati, Julián, Carmella Nocturna.
* **CONTINUIDAD:** Primera presentación clara de Carmella ocurre después de haber cruzado el punto ciego.

### Prompt de página completa
> [ESTILO BASE] [IAN] [MATI] [JULIAN] [CARMELLA] Full comic page layout, iconic noir reveal. Dominant central panel: Carmella Nocturna fully visible for the first time, elegant pale vampire woman in black and deep crimson velvet coat, dark sunglasses, folded crimson parasol held like a cane, standing beneath broken red neon in an old brick alley with aristocratic underworld poise. Top-left small panel: Ian, Mati and Julián enter beyond violet vapor, Julián leaning heavily on Ian, one cuff dangling, no V.O.P.S. line of sight. Bottom-left inset: Julián embarrassed and exhausted holding his wrist while Mati scans behind through purple visor. Overlapping close-up insets on Carmella: pale lips forming cold half-smile; crimson parasol tip touching the dry pavement; one gloved finger raised toward an old hidden iron gate. Right narrow reaction panel: Ian studies her suspiciously, glasses reflecting red alley light, amber pendant visible. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 57 — "Entrada al túnel"
Composición: descenso vertical con puerta como umbral principal. Ritmo: escape por infraestructura abandonada.
* **PERSONAJES:** Ian, Mati, Julián, Carmella Nocturna.
* **CONTINUIDAD:** El grupo desciende por la reja oculta antes de que R.E.G.U.L.A.R. revise el furgón.

### Prompt de página completa
> [ESTILO BASE] [IAN] [MATI] [JULIAN] [CARMELLA] Full comic page layout with strong vertical descent. Top wide panel: Carmella opens a heavy rusted iron gate hidden behind old pipes and brickwork, revealing steep stairs into darkness. Dominant tall central panel: the group descends into a dark brick storm-drain tunnel, Carmella leading, Ian supporting Julián, Mati last with visor turned back toward the alley. Small technical insets: Ian notices no modern card readers, cameras or tactical sensors, only old mechanical locks; Ian's muddy boot on a metal step; Julián's broken inhibitor cuff scraping against railing. Bottom panel: Carmella closes the gate from inside and locks it with an old mechanical padlock while the group disappears below, violet haze fading outside. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 57.5 — "Descubrimiento tardío"
Composición: investigación posterior en página fría y controlada. Ritmo: reacción profesional de R.E.G.U.L.A.R. y puente hacia la persecución futura.
* **PERSONAJES:** R.E.G.U.L.A.R., V.O.P.S.
* **CONTINUIDAD:** El comandante descubre la fuga después de seguir la trayectoria de Aegis. No fue derrotado; perdió de vista un frente secundario mientras neutralizaba la amenaza principal.

### Prompt de página completa
> [ESTILO BASE] [REGULAR] [VOPS] Full comic page layout, cold investigative aftermath. Top wide panel: R.E.G.U.L.A.R. lowers the overheated launcher in the street, helmet still angled toward the distant red trajectory of Aegis leaving the perimeter. Middle procedural strip: he turns back toward the transport lane, posture controlled, issuing an order through wrist communicator; armored van revealed with rear doors open, guards down or dazed, violet steam thinning around the empty compartment. Dominant lower noir panel: R.E.G.U.L.A.R. and two V.O.P.S. soldiers stand before the sealed old gate, modern scanners useless, alley empty except fading violet vapor and faint impossible crimson trace. Insets: armored hand touches violet plasma residue; visor reflects fragmented heat traces vanishing into old brick infrastructure. Controlled anger, no panic. [NEGATIVO ESTÁNDAR]

---
# PÁGINA 58 — "Descenso under / cierre del escape inmediato"
Composición: transición al submundo con vigilancia en balcones y puerta final. Ritmo: descenso, ambientación y paso de tiempo hacia el amanecer.
* **PERSONAJES:** Mati, Julián, Carmella Nocturna

### Prompt de página completa
> [ESTILO BASE] [MATI] [JULIAN] [CARMELLA] Full comic page layout, descent into underworld. Dominant atmospheric panel: the group walks through ancient brick tunnels, water dripping from arched ceilings, steam rising, Carmella leading with absolute authority, Mati wary, Julián holding his arm and looking uncomfortable. Along the upper tunnel walls, shadow-filled balcony insets show mysterious pale-skinned figures watching. Zoom inset: pale guard's face sniffing the air, eyes reflecting faint red. Middle small panel: Carmella raises one hand in a commanding gesture and unseen onlookers retreat. Small time-passage inset near a high street grate: the outside sky above the city shifts from black night toward pale blue dawn while the group remains underground. Bottom large reveal panel: the group arrives at a massive metal service door, red neon tube casting long silhouettes on brick. Overlapping insets show neon tube flickering and heavy steel door handle turning. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 59 — "Impacto en Central Park"
Composición: impacto tipo meteorito + encuentro cara a cara en panel inferior. Ritmo: choque violento y avistamiento.
* **PERSONAJES:** Uandi, Gorgon

### Prompt de página completa
> [ESTILO BASE] [AEGIS] [GORGON] Full comic page layout. Dominant upper impact panel on white negative background: a red glowing streak slams into Central Park grass like a meteor, shattering stone benches and iron fences, mud and debris flying beyond the black border. Overlapping insets: shattered iron fence rail bent like wire; hot steam rising from muddy crater. Middle horizontal search sequence: Gorgon moves through trees and green chemical smoke; he stops with calculating eyes narrowing at the crater; Aegis rises from mud fully transformed, red-hot skin and magma runes breathing steam. Bottom wide face-off panel: Aegis on the left, steam rising from shoulders, glaring; Gorgon on the right, massive and calm, neon-green tubes pulsing, faint smirk behind respirator. Insets show Aegis's glowing fist and Gorgon's metatoxin tubes. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 60 — "Dos colosos"
Composición: secuencia de combate diagonal con impacto central blanco. Ritmo: acción pesada y colisión.
* **PERSONAJES:** Uandi, Gorgon

### Prompt de página completa
> [ESTILO BASE] [AEGIS] [GORGON] Full comic page layout, heavy action with diagonal slash gutters. Top-left large panel: Aegis charges headlong, fists clenched, red trail tearing across park mud. Center dominant impact panel on pure white background: Aegis's punch crashes into Gorgon's polymer-reinforced guard, ground cracking under their feet, trees bending from shockwave. Overlapping insets show stone splitting and neon-green metatoxin surging violently in Gorgon's arm tubes. Right-side vertical combat strip: Gorgon counters with a heavy elbow to Aegis's neck; Aegis recovers and throws a hammer-fist. Bottom wide panel: Gorgon is forced onto one knee while a stone bridge cracks behind them, mud spraying past the panel frame. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 61 — "Más fuerte no significa más claro"
Composición: Aegis ocupa la página, Gorgon lo lee desde insets fríos. Ritmo: sobrecarga y desgaste estratégico.
* **PERSONAJES:** Uandi, Gorgon

### Prompt de página completa
> [ESTILO BASE] [AEGIS] [GORGON] Full comic page layout, imbalance between rage and analysis. Dominant central panel: Aegis roars and strikes repeatedly, red energy flashing around him, his huge body breaking the upper panel border. Around him, smaller cool-toned inset panels show Gorgon dodging and weaving between trees with calm precision; Gorgon taking a hit to the ribs but keeping his eyes locked on Aegis's cracked runes; close-up of Gorgon's intelligent eyes behind respirator tracking heat telemetry through abstract shapes. Bottom close-up strip: Aegis's arm tattoos crack open with bright yellow magma heat, steam escaping, warning that his power is becoming unstable. Thick black gutters, red versus green contrast, no dialogue. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 62 — "El intelecto despierto"
Composición: táctica ambiental con géiser como gran forma vertical. Ritmo: uso táctico del entorno.
* **PERSONAJES:** Uandi, Gorgon

### Prompt de página completa
> [ESTILO BASE] [GORGON] [AEGIS] Full comic page layout, tactical use of environment. Top diagonal sequence: Gorgon grabs a heavy iron lamppost and jams it between Aegis's legs; Aegis falls forward and shatters a stone bench, red sparks flying; tight close-up of Aegis's confused face as spray begins to hit him. Dominant central vertical panel: Gorgon slams his fist into a water main box and a massive geyser of water and steam explodes upward, water spray breaking into the gutters. Overlapping insets: Gorgon's heavy boot stepping back; metal lid flying off; condensation running down Aegis's face. Bottom wide panel: Aegis swings blindly in dense steam and water spray while Gorgon's dark shadow retreats into fog, footprints filling with muddy water. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 63 — "Retirada calculada"
Composición: colapso de puente + nube química como pantalla de escape. Ritmo: colapso y repliegue químico.
* **PERSONAJES:** Uandi, Gorgon, V.O.P.S.

### Prompt de página completa
> [ESTILO BASE] [AEGIS] [GORGON] [VOPS] Full comic page layout. Top wide panel: Gorgon stands before a stone arch bridge, baiting Aegis with calm posture. Left vertical collapse strip: Aegis charges and slams fists into bridge support columns; stone arch collapses; blocks crash over Aegis in dust. Dominant middle panel: Gorgon disconnects a secondary tube from his respirator, releasing a dense bright neon-green metatoxin vapor cloud. Overlapping insets show green fluid draining from tube and respirator valve hissing. Bottom wide panel: green cloud fills the park area while V.O.P.S. headlights cut through in the background. Final dark inset: Gorgon escapes through a broken service grate inside collapsed bridge ruins. Thick black gutters, controlled retreat. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 64 — "La bestia en el techo"
Composición: salto vertical que rompe el borde + destransformación en panel íntimo. Ritmo: huida vertical y destransformación.
* **PERSONAJES:** Uandi, Gorgon, V.O.P.S.

### Prompt de página completa
> [ESTILO BASE] [VOPS] [AEGIS] [UANDI] Full comic page layout with vertical escape energy. Top narrow search panels: V.O.P.S. containment units enter the park, spotlights illuminating ruins; Aegis stands in beams surrounded by smoke and broken stone. Dominant central panel: Aegis executes a massive ballistic leap from the park, launch shockwaves cracking pavement, his red body flying toward a dark roof and breaking beyond the panel border. Overlapping insets: cracked pavement steaming; distant V.O.P.S. spotlight pointing upward in vain. Bottom vertical zoom-out: Aegis lands on a dark rooftop in shadow, red glow fading; close shot of Uandi now human, exhausted and gasping, torn clothes, staring at warm penthouse lights nearby. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 65 — "No toques nada blanco"
Composición: refugio elegante interrumpido por aterrizaje sucio. Ritmo: tensión en el refugio y llegada de Uandi.
* **PERSONAJES:** Mati, Julián, Uandi, Jaz

### Prompt de página completa
> [ESTILO BASE] [JAZ] [MATI] [JULIAN] [UANDI] Full comic page layout, elegant refuge disrupted. Top calm panel: Jaz speaks with Mati and Julián inside an immaculate penthouse, clean white rug, glass balcony doors, warm golden aura restrained. Left vertical alert strip: close-up of Jaz's face suddenly pausing; her golden aura flickers; glass balcony doors shake as something heavy lands outside. Dominant middle panel: Uandi kneels on the balcony in pre-dawn blue light, covered in mud, soot and twigs, steam rising from his back, city horizon just beginning to pale behind him. Bottom wide panel: Uandi limps inside and collapses onto the clean white rug while Jaz looks at him with resignation and anger, hand on forehead. Insets: muddy torn boot marking the white rug; soot and water dripping from his hand. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 66 — "Club under / Carmella y Julián"
Composición: splash de lugar + entrada de Carmella en catwalk con detalles incrustados. Ritmo: descenso al ambiente de club mientras arriba ya amanece.
* **PERSONAJES:** Julián, Carmella Nocturna

### Prompt de página completa
> [ESTILO BASE] [JULIAN] [CARMELLA] Full comic page layout, gothic-industrial club reveal. Dominant upper splash: underground club with cathedral-like vaulted ceilings, steel structures, red theatrical vapor drifting over a crowded dance floor, thick black gutters framing the architecture. A tiny high-vent inset shows pale morning light far above, unread by the characters, emphasizing that day is arriving outside while the underworld stays red and dark. Overlapping environmental insets: red neon sign reading NOCTURNA in stylized script; crimson condensation glowing on a steel handrail; dark glasses filled with thick dark liquid on a bar. Main lower panel: Carmella walks down a steel catwalk, crimson coat flowing, elegant patrons parting below in respect. Insets on the catwalk: her high-heeled boot stepping on steel grid; patrons bowing their heads. Bottom narrow panel: Julián follows behind, nervous, holding bruised wrist, eyes reflecting red club light. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 67 — "Under más oscuro / Ian y Mati observan"
Composición: investigación lateral + gran panel de mercado negro. Ritmo: investigación y revelación de mercado negro.
* **PERSONAJES:** Ian, Mati, V.O.P.S.

### Prompt de página completa
> [ESTILO BASE] [IAN] [MATI] Full comic page layout, undercover investigation. Top narrow panel: Ian and Mati walk past heavy crimson velvet curtains lining the club's side rooms. Dominant central panel: dark black-market corner with weapon crates containing UV-rifles and stolen glowing cyan tech parts, shady dealers negotiating in red club haze. Overlapping insets: UV-rifle energy core glowing in wooden crate; cash changing hands between pale fingers; dealer in black coat holding a small vial of synthetic blood glowing red. Right vertical reaction strip: Mati's eyes widen behind purple visor; Ian analyzes stacked high-tech servers and custom cables with serious expression. Keep the page dense and shadowy, with thick black gutters and no speech bubbles. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 68 — "Beso-marca de Carmella"
Composición: escena íntima dominante con lectura secreta para el lector. Ritmo: intimidad, mordida sutil y marca no transformadora.
* **PERSONAJES:** Ian, Julián, Carmella Nocturna

### Prompt de página completa
> [ESTILO BASE] [CARMELLA] [JULIAN] [IAN] Full comic page layout, intimate red-noir page. Top small approach panels: Carmella stops in front of Julián and gently takes his chin in her pale hand; close-up of her wiping dry blood from his cheek. Dominant central panel: Carmella leans in as if kissing Julián on the neck, red neon behind them creating warm haze, other patrons politely diverting their eyes. The reader can see the secret detail: her lips part just enough for tiny fangs to pierce the side of his neck, a thin controlled trickle of blood at the contact point, Julián willingly allowing it with a dazed but calm expression. Ian and the other boys must not see the bite; their sightline is blocked by Carmella's hair, shoulder and coat collar, so to them it reads only as an intimate protective kiss. Overlapping insets: Carmella's long pale fingers gently gripping Julián's dark knit sweater; a tiny blood bead at her lip visible only to the reader; onlooker's hand holding a glass paused mid-air. Bottom zoom strip: close-up of Julián's neck with two tiny puncture marks hidden under his collar, no glowing rune, no transformation mark; Ian watches from shadows but does not register the bite, only mild suspicion about the intimacy. No vampire transformation, no turning Julián into a vampire, no explicit gore, no erotic exaggeration. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 69 — "Ian se separa para ver a Norman"
Composición: salida del under oscuro hacia exterior diurno y figura solitaria. Ritmo: bifurcación y decisión solitaria.
* **PERSONAJES:** Ian, Mati, Julián, Norman Parker

### Prompt de página completa
> [ESTILO BASE] [IAN] [MATI] [JULIAN] [NORMAN] Full comic page layout, separation beat with strong contrast between underground and daylight. Top horizontal panel: Ian, Mati and Julián climb old iron exit stairs toward a street grate, underworld red light fading behind them. Left vertical decision strip: Ian pulls out glowing blue phone, unreadable notification blocks lighting his face; extreme close-up of address coordinate map overlay blinking; Ian turns to Mati and Julián and indicates he has to go alone, no speech bubble. Dominant bottom panel: Ian steps out alone into a clear daytime street, pulling up his hood against bright city light, no rain, dry air, a few old puddles reflecting signs on the pavement. Overlapping insets: boot stepping near a puddle reflection; amber tear pendant swinging against his chest. Keep Norman absent but implied by the cold corporate blue phone glow. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 70 — "Bar con Norman"
Composición: bar clásico con Norman como aparición incrustada en el espacio. Ritmo: encuentro sobrio y calculador.
* **PERSONAJES:** Ian, Norman Parker

### Prompt de página completa
> [ESTILO BASE] [IAN] [NORMAN] Full comic page layout, quiet predatory meeting. Top establishing panel: Ian enters a quiet old-fashioned pub with dark wood paneling, bright daytime city visible through windows. Middle narrow panel: Ian sits on a leather stool at polished wooden counter, shoulders tense, ordering a drink without dialogue. Dominant atmospheric lower panel: Norman Parker is already seated at the bar as if he had always been there, dark blue tailored suit, slicked-back hair, calm predatory expression, turning slightly toward Ian. Overlapping detail insets: Norman's whiskey glass with large ice sphere; polished leather oxford shoes resting on brass rail; close-up of Norman's sideways smile. Muted warm interior light versus clear daylight outside, thick black gutters. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 71 — "Segunda oferta"
Composición: trato silencioso con flash mental rasgando la página. Ritmo: pacto forzado e impacto mental.
* **PERSONAJES:** Ian, Julián, Uandi, V.O.P.S., Norman Parker

### Prompt de página completa
> [ESTILO BASE] [NORMAN] [IAN] [AEGIS] [VOPS] [JULIAN] Full comic page layout, quiet bargain interrupted by jagged mental imagery. Top horizontal bar sequence: Norman rotates his drink slowly while Ian watches coldly; Norman's hand slides a clean corporate keycard across dark wood; extreme close-up of keycard with embossed golden P logo; Ian takes it, eyes hardened, Norman satisfied. Across the middle, a jagged high-contrast mental flash tears through the page: overloaded red colossus Aegis roaring in black-and-white speed lines with red accent. Overlapping flash insets: base in flames; shield commander's helmet; Julián's cuffed wrists. Bottom still panel: Ian's hand closes around the card, decision made, pub light dim and heavy. No speech bubbles. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 72 — "Limusina / Parker Tower"
Composición: intercuts de limusina/parque/Gorgon y splash vertical de Torre Parker. Ritmo: trayecto y revelación monumental.
* **PERSONAJES:** Ian, Norman Parker, Gorgon, V.O.P.S.

### Prompt de página completa
> [ESTILO BASE] [IAN] [NORMAN] [GORGON] [VOPS] [PARKER-TOWER] Full comic page layout. Top cinematic strip: interior of luxury black limousine, Ian and Norman sitting opposite under cool blue light; Norman looks out window at the bright daytime city, calm and unreadable. Middle intercut strip: empty broken park in daylight with V.O.P.S. searchlights cutting through green smoke; Gorgon as a dark silhouette inside concrete sewer drain, respirator tubes glowing green. Dominant vertical splash occupying the right two-thirds: Parker Tower rises in clear daylight, a monumental black graphite and blue-glass corporate skyscraper with tapered vertical body, exposed dark structural ribs, curved blue curtain-wall glass, sharp crown spires and antennae, elevated skybridges and a massive cantilevered upper landing platform with a glowing white-blue P logo underneath. Overlapping architectural insets: security camera panning on tower corner; glowing blue corporate P logo on glass facade; transparent glass lobby canopy far below; blue glass panels reflecting the bright sky. Thick black gutters, clean corporate menace, no rain. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 73 — "Ian vuelve por el grupo / Jaz no va"
Composición: penthouse como escenario emocional, grupo dividido por diagonales. Ritmo: debate interno y ruptura.
* **PERSONAJES:** Ian, Mati, Julián, Uandi, Jaz, Norman Parker

### Prompt de página completa
> [ESTILO BASE] [IAN] [MATI] [JULIAN] [UANDI] [JAZ] Full comic page layout, emotional group decision. Dominant wide penthouse panel: Ian stands before Mati, Julián and Uandi with the Parker keycard in hand, clean room lights contrasting with everyone's exhaustion. Left stacked reaction panels: Mati, Julián and Uandi listen, bruised and tired, weighing the choice; close-up of keycard held between Ian's fingers. Right diagonal panel: Jaz crosses her arms, golden aura tight and defensive, refusing to go while Ian watches her. Bottom wide departure panel: the three gather small bags and prepare to leave, Jaz at her doorway looking at them with sadness, emotional distance shown by black gutter splitting her from the group. No dialogue, all body language. [NEGATIVO ESTÁNDAR]

---

# PÁGINA 74 — "Llegada final a Parker Tower / reveal Norman"
Composición: entrada monumental + Norman reflejado + monitor wall final. Ritmo: incursión y revelación perturbadora.
* **PERSONAJES:** Ian, Mati, Julián, Uandi, Norman Parker

### Prompt de página completa
> [ESTILO BASE] [IAN] [MATI] [JULIAN] [UANDI] [NORMAN] [PARKER-TOWER] [PARKER-INTERIOR] [PARKER-GARAGE] Full comic page layout, final corporate reveal. Top ground-level wide panel: the four enter Parker Tower's transparent glass lobby in bright daylight, tiny beneath a massive black graphite steel frame, blue glass curtain walls, angular exterior ribs and a clean glass canopy; polished marble floor reflects them and a few old outdoor puddles are visible beyond the entrance, no rain. Overlapping insets: Ian swipes the keycard and scanner flashes green; their reflection stretches across polished marble; the glowing white-blue P logo appears above the entrance. Middle vertical Norman strip: Norman Parker in a high-rise office with back to camera, looking down through panoramic blue-tinted glass toward the tower plaza; close-up of his face reflected in glass with subtle fluid elastic cellular distortion for one split second. Dominant bottom final panel: pristine Parker Tower command interior with grey polished floor, blue light strips, curved walls and wall-sized tactical monitors displaying three-dimensional biometric and energy scans in violet, red, magenta and green, Norman a dark silhouette in foreground, data light bleeding into bottom gutter. Insets show Aegis DNA sequencing, Ian's green vector energy signature spiking, and a hidden sublevel garage feed: circular graphite mech hangar with yellow robotic arms and a giant green-lit armored suit docked on a hydraulic platform. [NEGATIVO ESTÁNDAR]

---

# FIN DEL SUPLEMENTO OPTIMIZADO

