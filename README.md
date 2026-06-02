# ⚡ THE BOYS COMIC READER

Un lector de cómics web interactivo, dinámico y con estética pop-art/cómic, desarrollado con **Next.js 16** (App Router y Turbopack).

---

## 🎨 Características Visuales y Funcionalidades

- **Estética Pop-Art / Cómic Duro**: Bordes gruesos blancos y negros, sombras de bloque desplazadas, efectos halftone (puntos de trama) e identidad urbana.
- **Roster de Personajes**: Sección interactiva con animaciones de entrada fluidas. Los personajes aún no presentados en la trama física (`matapobre` y `sofi`) se muestran con un filtro de incógnito (desenfoque y escala de grises) y un indicador misterioso.
- **Hero Banner Dinámico**: Portadas flotantes de los personajes asomándose responsivamente en la pantalla (tanto en Mobile como en Desktop) con animaciones 3D e interacciones `hover` juguetonas.
- **Lector de Capítulos con Gesto Swipe**:
  - Zoom dinámico (pinch-to-zoom en móvil y rueda en desktop).
  - Paneo libre al estar con zoom.
  - Gesto de **deslizar (swipe/drag) horizontal** para pasar de página de forma fluida.
  - Atajos de teclado (flechas ⬅️ y ➡️).
- **Tipografías Temáticas**: Uso estratégico de **Bungee** para el logo, **Bangers** para los títulos cómicos pesados y **Permanent Marker** para textos a mano.

---

## 📂 Arquitectura del Proyecto

El código está modularizado para asegurar escalabilidad y evitar archivos gigantescos:

- `/app`: Rutas del lector, páginas dinámicas de capítulos e inicialización de fuentes.
- `/components`: Componentes reutilizables separados por contexto (ej: `/home/HeroSection`, `/home/CharacterRoster`, `/home/SagaBlock`).
- `/lib`: Lógica de análisis de archivos locales para cargar dinámicamente las sagas y capítulos desde `/public/comics/`.

---

## 🚀 Desarrollo Local

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Correr el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abrir [http://localhost:3000](http://localhost:3000).

---

## ⚡ Despliegue

El proyecto está configurado para desplegarse automáticamente en **Vercel** ante cada push en la rama `main`.
