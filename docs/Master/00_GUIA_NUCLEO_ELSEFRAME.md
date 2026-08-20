# 00 — Guía Núcleo Elseframe

**Versión:** 1.0  
**Función:** constitución común para todos los chats y todas las sagas.  
**Uso:** este archivo debe acompañar siempre al proyecto, independientemente de si el chat trabaja narrativa, prompts o generación de imágenes.

---

## 1. Propósito

Este documento define las reglas que no deben perderse al pasar una historia por distintas etapas o distintos chats.

No reemplaza a las guías especializadas:

- `01_GUIA_NARRATIVA_ELSEFRAME.md` desarrolla personajes, relaciones, escenas, actos, episodios, conflictos, voces y antagonistas.
- `02_GUIA_PAGINA_VISUAL_HOUSE_STYLE_ELSEFRAME.md` desarrolla páginas, viñetas, composición, acción, violencia estilizada, continuidad visual, prompting y house style.

Su función es impedir que cada chat interprete el proyecto como si fuera una obra distinta.

---

## 2. Jerarquía fundamental

Toda construcción debe respetar este orden:

**La trama determina qué sucede.**  
**El personaje determina qué significa.**  
**La escena determina qué cambia.**  
**La página determina qué mostramos.**  
**La viñeta determina dónde mira el lector.**

Nunca invertir esta jerarquía únicamente porque una imagen, una frase o una pelea podrían verse espectaculares.

---

## 3. Regla madre: personaje antes que trama

Antes de preguntar:

> ¿Qué tiene que pasar?

preguntar:

> ¿Cómo vive cada personaje lo que tiene que pasar?

Un mismo acontecimiento debe producir respuestas diferentes según la persona.

Una muerte puede provocar negación, pragmatismo, rabia, silencio, culpa, humor defensivo o necesidad de buscar responsables.

El acontecimiento pertenece a la trama.

La escena nace de la respuesta del personaje.

---

## 4. Toda escena debe cambiar algo

Idealmente cambia una o más de estas dimensiones:

### Información
Alguien sabe algo que antes no sabía.

### Relación
Dos personajes terminan en una posición diferente.

### Decisión
Alguien hará algo que antes no pensaba hacer.

Si una escena no cambia ninguna, revisar si existe únicamente para transportar información o mover personajes de un punto a otro.

---

## 5. Dueño emocional

Toda escena y toda página deben tener un **dueño emocional**.

Es el personaje cuya experiencia determina cómo debe sentirse lo que vemos.

No necesita:

- hablar más;
- estar centrado;
- ser el protagonista general;
- aparecer en todos los paneles.

Puede dominar mediante:

- punto de vista;
- reacción;
- conducta;
- silencio;
- composición;
- información.

Una explosión puede pertenecer emocionalmente a quien la observa, no a quien la provoca.

---

## 6. Progresión emocional

Antes de escribir o diseñar una escena, establecer:

**estado inicial → estado final**

Ejemplos:

- confianza → sospecha;
- miedo → acción;
- orgullo → vergüenza;
- esperanza → decepción;
- tensión → alivio;
- control → ruptura.

La escena debe mostrar la transición, no solamente el resultado.

---

## 7. Los personajes no se reinician

La continuidad no es solamente vestuario, heridas y utilería.

Debe mantenerse también:

- cansancio;
- miedo;
- bronca;
- culpa;
- confianza;
- distancia emocional;
- humor;
- decisiones;
- información conocida.

Lo que ocurrió antes debe modificar la conducta posterior.

---

## 8. Cada personaje vive el mismo hecho de forma distinta

Cuando hay varios personajes importantes, evitar respuestas uniformes.

Si tres personajes reciben una noticia, no deberían funcionar como:

A informa.  
B confirma.  
C asiente.

Como regla de diagnóstico, con tres o más personajes importantes presentes, al menos dos deberían interpretar la situación de manera diferente.

---

## 9. La emoción debe modificar conducta y composición

Evitar depender de:

> personaje quieto con “cara de emoción”.

La emoción debe alterar:

- postura;
- distancia;
- actividad;
- ritmo;
- mirada;
- manera de hablar;
- uso del espacio;
- decisiones.

En página, también puede modificar:

- tamaño de viñeta;
- distancia de cámara;
- cantidad de información ambiental;
- uso de silencio o espacio negativo.

---

## 10. Selección

El cómic no muestra todo.

No explicar todo.  
No dramatizar todo.  
No dibujar cada movimiento.  
No buscar una frase memorable en cada página.  
No utilizar todos los recursos visuales al mismo tiempo.

Elegir lo que merece atención.

---

## 11. Autores como herramientas, no como disfraces

Las referencias autorales pueden nombrarse cuando ayudan a resolver un problema concreto.

No usar:

> escribilo como X.

Preferir:

> usar enfoque X para esta función concreta.

### Hickman — arquitectura

Usar para:

- planificación;
- escala;
- facciones;
- política;
- misterio;
- revelaciones;
- consecuencias;
- finales de acto;
- cambios de tablero.

Pregunta útil:

> ¿Qué cambia objetivamente después de esta escena?

### Gillen — psicología y subtexto

Usar para:

- deseo oculto;
- relaciones complejas;
- manipulación;
- secretos;
- tensión interpersonal.

Preguntas útiles:

> ¿Qué quiere A de B?  
> ¿Qué no está dispuesto a admitir A?

### Fraction — humanidad

Usar para:

- cotidianeidad;
- hábitos;
- humor;
- cansancio;
- objetos;
- torpezas;
- respiración.

### Whedon — dinámica coral

Usar para:

- grupos;
- rebotes de diálogo;
- contradicción;
- interrupciones;
- funciones diferentes dentro de una conversación.

### Waid — corazón

Usar para:

- heroísmo;
- miedo;
- sacrificio;
- reconciliación;
- esperanza;
- decisiones morales;
- claridad emocional.

Los nombres pueden mencionarse en análisis o instrucciones de trabajo cuando aporten orientación real. No hace falta repetirlos en cada prompt visual.

---

## 12. Modos de trabajo

### Modo Narrativa

Pregunta principal:

> ¿Qué pasa y qué significa para estas personas?

Usar `00 + 01`.

### Modo Prompts / Diseño de Página

Pregunta principal:

> ¿Qué debemos mostrar, en qué orden y mediante qué recursos para transmitir lo anterior?

Usar `00 + 01 + 02`.

Este es el puente entre escritura y dibujo.

### Modo Generación de Imagen

Pregunta principal:

> ¿Cómo ejecuto exactamente la página aprobada?

Usar `00 + 02` más el prompt aprobado.

En este modo no reescribir la historia por iniciativa propia.

### Modo Depuración

Primero identificar en qué nivel nació el error:

- narrativa;
- escena;
- diseño de página;
- prompt;
- ejecución visual.

Corregir el nivel correcto en lugar de intentar arreglar todo desde la imagen final.

---

## 13. Precedencia de instrucciones

Cuando dos instrucciones entren en conflicto, utilizar este orden:

1. instrucción actual y explícita del usuario;
2. canon y continuidad vigente de la saga;
3. brief específico de la escena o página;
4. esta Guía Núcleo;
5. guía especializada correspondiente;
6. defaults de house style.

Una regla general nunca debe borrar una excepción explícita de la escena.

---

## 14. Preguntas

La IA puede preguntar cuando falte información capaz de cambiar significativamente la solución.

Preguntar sobre todo si no está claro:

- función narrativa;
- dueño emocional;
- progresión emocional;
- acontecimiento obligatorio;
- revelación que debe ocultarse;
- continuidad crítica;
- identidad o naturaleza de un personaje si afecta la escena.

Evitar interrogatorios interminables.

Máximo recomendado: **3 preguntas críticas por ronda**.

Si falta un dato menor, realizar la inferencia más conservadora y no modificar canon silenciosamente.

---

## 15. Regla de depuración mínima

Cuando algo falla:

1. identificar el problema;
2. encontrar dónde nació;
3. corregir lo mínimo necesario;
4. reconstruir solamente si la estructura está realmente rota.

No rehacer una página completa porque una mano está mal colocada.

No intentar corregir con composición un problema que nació en la narrativa.

---

## 16. Cinco reglas inviolables

Si el contexto disponible obliga a reducir este documento a cinco principios, conservar estos:

1. **Personaje antes que trama.**
2. **Toda escena cambia algo.**
3. **Cada personaje vive el mismo acontecimiento de manera diferente.**
4. **La emoción debe modificar conducta y composición.**
5. **La trama determina qué pasa; el personaje determina qué significa.**

---

## 17. Objetivo final

La meta no es:

> qué compleja es esta historia.

Ni:

> qué inteligentes hablan todos.

Ni:

> qué increíble render.

La meta es:

> **Entiendo qué está pasando, entiendo qué significa para esta persona y quiero ver qué ocurre después.**
