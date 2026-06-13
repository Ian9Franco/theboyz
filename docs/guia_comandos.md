# 📖 Guía de Comandos y Flujo de Trabajo (The Boyz Comics)

Este documento centraliza todas las instrucciones, comandos y flujos de trabajo para maquetar, optimizar y sincronizar nuevos capítulos y sagas tanto localmente como en producción.

---

## 🛠️ Resumen de Repositorios
1. **Web (`the-boys`)**: Contiene el código Next.js, los globos de diálogo (`dialogues.json`) y las portadas reales (`portada.webp`). Las páginas de lectura son marcadores de **0 bytes**.
2. **Assets (`the-boyz-comic`)**: Contiene las imágenes originales en alta resolución, el script de conversión a WebP y el servidor local de archivos.

---

## ⚡ Comandos Rápidos

### En la Web (`the-boys`)
*   `npm run dev` — Levanta la aplicación web Next.js en `http://localhost:3000`.
*   `npm run sync-assets` — Sincroniza los metadatos y crea los marcadores de 0 bytes desde la carpeta de assets.

### En Assets (`the-boyz-comic`)
*   `npm run dev` — Levanta el servidor local de imágenes en `http://localhost:8080` (con soporte CORS).
*   `npm run convert` — Convierte y optimiza recursivamente todas las imágenes de la carpeta `comics/` a formato WebP.
*   `npm run sync` — Ejecuta la sincronización hacia el proyecto web desde esta misma carpeta.

---

## 🚀 Flujo Paso a Paso para Crear un Nuevo Capítulo

Sigue esta rutina para añadir material nuevo de manera automática y sin errores de caché:

### Paso 1: Agregar las imágenes originales
1. Ve a la carpeta de assets `D:\.CodeProjects\the-boyz-comic\comics\`.
2. Crea la estructura de carpetas usando el prefijo `#` para indicar el orden. Ejemplo:
   *   `#4 saga-test/`
   *   `#4 saga-test/#1 capitulo-test/`
3. Guarda dentro de la carpeta del capítulo tus imágenes nombradas secuencialmente (`1.png`, `2.jpg`, etc.) y una portada llamada `portada.png` (o `.jpg`).

### Paso 2: Optimizar las imágenes a WebP
Abre una terminal en `the-boyz-comic` y ejecuta:
```bash
npm run convert
```
*Esto convertirá todas las imágenes a `.webp` optimizadas y borrará los archivos pesados originales.*

### Paso 3: Sincronizar con el proyecto Web
Abre una terminal en cualquiera de los dos repositorios y ejecuta:
*   En `the-boys`: `npm run sync-assets`
*   En `the-boyz-comic`: `npm run sync`

**¿Qué hace este script automáticamente?**
*   Crea la estructura de carpetas en tu proyecto web.
*   Copia la portada real `portada.webp` para que el home se vea hermoso de inmediato.
*   Crea marcadores vacíos de **0 bytes** para el resto de las imágenes para que Next.js sepa que existen sin ocupar espacio en Vercel.
*   **Crea por defecto los archivos `saga.json` y `chapter.json` en modo `draft` (borrador)** si no existían previamente.

### Paso 4: Editar Diálogos en Local
1. Asegúrate de tener corriendo ambos servidores de desarrollo:
   *   En `the-boyz-comic`: `npm run dev` (puerto 8080)
   *   En `the-boys`: `npm run dev` (puerto 3000)
2. Entra a `http://localhost:3000` e inicia sesión en el editor de diálogos con tu contraseña.
3. Al entrar al nuevo capítulo, verás que la imagen se carga desde tu puerto 8080. Añade los globos de diálogo, setea las paradas de la cámara y dale a **Guardar**.
4. Vuelve a ejecutar la sincronización (`npm run sync-assets`) para que el `dialogues.json` editado en tu web se respalde en tu carpeta de assets automáticamente.

### Paso 5: Publicar y Pushear a Producción
Cuando todo esté listo y verificado localmente:

1. **Subir los assets pesados a GitHub**:
   Abre tu terminal en `the-boyz-comic`:
   ```bash
   git add .
   git commit -m "feat: agregar capitulo 1 de saga de prueba"
   git push
   ```

2. **Subir la web y los diálogos**:
   Abre tu terminal en `the-boys`:
   ```bash
   git add .
   git commit -m "feat: maquetar y sincronizar capitulo de prueba"
   git push
   ```

3. **Publicar el Cómic**:
   Cuando quieras que deje de estar bloqueado por contraseña en producción, cambia la propiedad `"status"` de `"draft"` a `"published"` en el archivo `chapter.json` (o `saga.json`), vuelve a ejecutar la sincronización y haz push en `the-boys`.

---

## 🔒 Variables de Entorno en Producción (Vercel)

Asegúrate de tener configuradas las siguientes variables de entorno en el panel de **Vercel** para que la web funcione correctamente:

| Variable | Valor Recomendado | Descripción |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_ASSETS_BASE_URL` | `https://cdn.jsdelivr.net/gh/Ian9Franco/theboyz-comic-v1@main` | Ruta del CDN para servir los assets desde GitHub. |
| `PREVIEW_PASSWORD` | `tu_contraseña_secreta` | Contraseña requerida por la web para ver capítulos en modo `draft`. |
