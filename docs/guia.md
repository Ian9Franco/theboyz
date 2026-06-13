# Guía de The Boyz Comics

Documento de referencia rápida para desarrollo, publicación y control de acceso.

---

## Repositorios

| Repo | Propósito | Puerto Dev |
|---|---|---|
| `the-boys` | App Next.js — UI, diálogos, código | `3000` |
| `the-boyz-comic` | Assets pesados — imágenes en alta resolución | `8080` |

---

## Comandos rápidos

### `the-boys`
```bash
npm run dev          # Levanta la web en localhost:3000
npm run sync-assets  # Sincroniza marcadores de assets desde the-boyz-comic
npm run build        # Verifica que compila sin errores antes de pushear
```

### `the-boyz-comic`
```bash
npm run dev     # Servidor de imágenes en localhost:8080 (CORS habilitado)
npm run convert # Convierte todas las imágenes a .webp optimizado
npm run sync    # Sincroniza hacia the-boys (equivalente a sync-assets)
```

---

## Flujo para agregar un capítulo nuevo

```
1. Crear carpeta en the-boyz-comic/comics/
   └── #4 nombre-saga/
       └── #1 nombre-capitulo/
           ├── portada.png     ← portada del capítulo
           ├── 1.png
           ├── 2.png ...

2. Convertir a WebP (en the-boyz-comic):
   npm run convert

3. Sincronizar hacia la web (en cualquiera de los dos):
   npm run sync  /  npm run sync-assets

   → Crea saga.json y chapter.json en draft automáticamente
   → Copia portada.webp real
   → Crea marcadores vacíos (0 bytes) para el resto

4. Editar diálogos:
   - Tener corriendo ambos dev servers (3000 y 8080)
   - Ir a localhost:3000, entrar al capítulo, activar editor con contraseña
   - Posicionar globos, zooms, guardar

5. Publicar (ver sección de bloqueo abajo)

6. Push en ambos repos:
   git add . && git commit -m "feat: ..." && git push
```

---

## 🔒 Bloqueo y desbloqueo de sagas / capítulos

El sistema usa el campo **`"status"`** en los JSON de cada capítulo o saga.

### Estados posibles

| `status` | Comportamiento |
|---|---|
| `"draft"` | **Bloqueado.** Solo accesible con contraseña (`PREVIEW_PASSWORD` o la contraseña de saga). |
| `"published"` | **Público.** Visible para todos sin contraseña. |

---

### Bloquear / desbloquear un **capítulo**

Editá el archivo `chapter.json` de ese capítulo:

```
the-boys/public/comics/#3 El Silencio del Dragon/#1 Un Lugar/chapter.json
```

```json
{
  "title": "Un Lugar",
  "number": 1,
  "status": "draft"      ← bloqueado
}
```

```json
{
  "title": "Un Lugar",
  "number": 1,
  "status": "published"  ← público
}
```

---

### Bloquear / desbloquear una **saga completa**

Editá el `saga.json` de esa saga:

```
the-boys/public/comics/#3 El Silencio del Dragon/saga.json
```

```json
{
  "title": "Hush: El Silencio del Dragón",
  "status": "draft",     ← toda la saga bloqueada
  "password": "hush"     ← contraseña específica para esta saga (opcional)
}
```

```json
{
  "title": "Hush: El Silencio del Dragón",
  "status": "published"  ← toda la saga pública
}
```

> Si la saga tiene `"status": "draft"` pero un capítulo tiene `"status": "published"`, **el capítulo sigue bloqueado** porque el sistema evalúa ambos niveles.

---

### Contraseñas de acceso

Hay **dos niveles** de contraseña:

| Tipo | Dónde se define | Quién la usa |
|---|---|---|
| **Master** | Variable de entorno `PREVIEW_PASSWORD` (`.env.local` + Vercel) | Desbloquea cualquier saga/capítulo + acceso al editor de diálogos |
| **Por saga** | Campo `"password"` en `saga.json` | Desbloquea solo esa saga (sin dar acceso al editor) |

**Ejemplo saga con contraseña propia:**
```json
{
  "title": "Hush: El Silencio del Dragón",
  "status": "draft",
  "password": "hush"
}
```
Cualquiera que ingrese `hush` en el modal de contraseña podrá ver esa saga, sin conocer la master password.

---

## Variables de entorno

### `.env.local` (desarrollo)
```env
NEXT_PUBLIC_ASSETS_BASE_URL="http://localhost:8080"
PREVIEW_PASSWORD="tu_contraseña_secreta"
```

### Vercel (producción)
| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_ASSETS_BASE_URL` | `https://cdn.jsdelivr.net/gh/Ian9Franco/theboyz-comic-v1@main` |
| `PREVIEW_PASSWORD` | `tu_contraseña_secreta` |

---

## Unlock temporal sin editar JSON (admin local)

En `localhost:3000`, abrí la consola del navegador y ejecutá:

```js
localStorage.setItem("unlock-all", "true")
window.dispatchEvent(new Event("unlockAllChanged"))
```

Esto desbloquea todo visualmente **solo en tu navegador** para poder revisar el contenido sin cambiar los JSON. Para volver al estado normal:

```js
localStorage.removeItem("unlock-all")
window.dispatchEvent(new Event("unlockAllChanged"))
```
