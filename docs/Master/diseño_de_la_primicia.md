# 📔 Diseño de la Primicia y Documentos Ancla

Este documento reúne los elementos fundamentales para definir la primicia (o premisa), establecer las bases contextuales del proyecto y mantener la consistencia entre sesiones de trabajo mediante los **Documentos Ancla**.

---

## ⚓ Introducción a los Documentos Ancla

El problema principal al trabajar con múltiples chats y múltiples IAs es la pérdida de contexto. La solución es mantener documentos vivos que se pegan al inicio de cada sesión. Estos actúan como la referencia fija y la primicia de partida para cualquier generación.

---

## 👥 ANCLA 1 — BIBLIA DE PERSONAJES

Completa una ficha por cada personaje principal. Sé lo más específico posible en los campos visuales: las IAs de imagen no recuerdan nada entre generaciones, así que si no lo escribes, lo inventan.

```markdown
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

*Repite esta ficha para cada personaje. Deja los campos que no apliquen vacíos pero no los borres: la estructura consistente ayuda a la IA a procesar la información.*

---

## 🗺️ ANCLA 2 — BIBLIA DE AMBIENTES

Establece las directrices visuales del entorno global y las locaciones recurrentes donde se desarrolla la historia.

```markdown
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
[Escribe acá la regla más importante de tu mundo. Ejemplo: "La magia siempre tiene un color frío. Nada de tonos cálidos en efectos mágicos." o "El futuro de esta historia es decadente, no brillante. Sin superficies relucientes ni luces de neón limpias."]
```

---

## 💡 La Premisa de la Sesión

Cuando inicias una nueva sesión de escritura o desarrollo con la IA a partir de texto libre, la **primicia/premisa** es la semilla de la que brotará el guion y el arte. Se introduce de la siguiente manera dentro del flujo de trabajo:

```markdown
PREMISA DE ESTA SESIÓN:
[TU IDEA EN TEXTO LIBRE]
```

---

## 📋 Checklist Rápido antes de Cerrar una Sesión

Antes de terminar un chat y abrir uno nuevo, realiza estas tres acciones para mantener viva la primicia del proyecto:

1. **Actualiza el estado del proyecto (para pegarlo al inicio del próximo chat):**
   ```markdown
   ESTADO ACTUAL DEL PROYECTO — [FECHA]
   Cómic: [nombre]
   Último elemento completado: [acto / páginas / escena]
   Resumen en 3 líneas de lo que pasó hasta ahora: [resumen]
   Próxima tarea: [qué vas a hacer en la próxima sesión]
   Decisiones de diseño tomadas en esta sesión: [cambios al estilo, personajes o mundo que no están en las Anclas todavía]
   ```

2. **Actualiza las Anclas si algo cambió:**
   Si en esta sesión decidiste algo nuevo sobre un personaje, un ambiente o el estilo, actualiza el Ancla correspondiente antes de cerrar. Si lo dejas para después, se pierde.

3. **Guarda los prompts que funcionaron:**
   Si un prompt de IA de imagen generó exactamente lo que querías, guárdalo como referencia. Es mucho más fácil adaptar un prompt que funcionó que construir uno nuevo desde cero.
