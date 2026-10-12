# TP4 — Coffea Landing Page

Trabajo práctico de **Diseño UX-UI 2026** de la Licenciatura en Sistemas de Información.

## Objetivo

Reproducir la landing page de la cafetería ficticia **Coffea** con HTML5 semántico y CSS3, siguiendo el PRD de la cátedra y manteniendo una implementación responsive de 360 px a 1920 px.

## Tecnologías

- HTML5 semántico
- CSS3
- CSS Custom Properties
- Flexbox
- CSS Grid
- CSS Scroll Snap
- Media Queries
- Google Fonts

El proyecto no utiliza JavaScript, frameworks, preprocesadores, bundlers ni CMS.

## Estructura

```text
TP4-Coffea/
├── index.html
├── 404.html
├── netlify.toml
├── README.md
├── assets/
│   ├── img/
│   └── icons/
└── css/
    ├── main.css
    ├── tokens.css
    ├── base.css
    ├── layout.css
    ├── utilities.css
    └── components/
        ├── header.css
        ├── hero.css
        ├── categories.css
        ├── product-card.css
        ├── carousel.css
        ├── promo.css
        ├── testimonial-card.css
        ├── newsletter.css
        ├── footer.css
        └── error-page.css
```

## Convenciones

- Nomenclatura BEM.
- Enfoque mobile-first.
- Breakpoints principales: 768 px, 1024 px y 1440 px.
- Colores, tipografías y radios centralizados en `css/tokens.css`.
- Interacciones resueltas sin JavaScript.
- Uso de `@layer` para ordenar la cascada CSS.

## Secciones implementadas

1. Header / navegación.
2. Hero.
3. Categorías.
4. Our Special Coffee.
5. Our Special Dessert.
6. CTA de granos de café.
7. Testimonios.
8. Newsletter.
9. Footer.

## Accesibilidad

La implementación incluye:

- Skip link.
- Landmarks semánticos.
- Foco visible.
- Navegación por teclado.
- `aria-label` en controles solo-ícono.
- `alt` descriptivo en imágenes de contenido y `alt=""` en imágenes decorativas.
- Soporte para `prefers-reduced-motion`.
- Validación nativa del newsletter con `type="email"`, `required` y `autocomplete="email"`.

## Interacciones CSS-only

- Menú mobile mediante `<details>/<summary>`.
- Carruseles con `overflow-x` y `scroll-snap`.
- Favoritos mediante checkbox + `:checked`.
- Paginador de testimonios con anclas.
- Hover y focus sin JavaScript.

## Ejecutar en local

No requiere instalación ni build.

1. Clonar el repositorio.
2. Abrir la carpeta `TP4-Coffea`.
3. Abrir `index.html` en el navegador o usar Live Server en Visual Studio Code.

## Netlify

El sitio debe publicarse desde la rama `main`.

Como este TP está dentro de un repositorio que también contiene otros trabajos, en Netlify se debe configurar:

- **Base directory:** `TP4-Coffea`
- **Build command:** ninguno
- **Publish directory:** `.`

El archivo `netlify.toml` contiene los headers de seguridad y caché requeridos.

## QA antes de la entrega

Comprobar:

- HTML W3C: 0 errores.
- CSS W3C: 0 errores.
- Lighthouse Performance mobile: 90 o más.
- Lighthouse Accessibility: 95 o más.
- Lighthouse Best Practices: 95 o más.
- Lighthouse SEO: 95 o más.
- Sin scroll horizontal entre 360 px y 1920 px.
- Pruebas en Chrome/Edge, Firefox, Safari iOS/macOS y Samsung Internet.

## Assets

El PRD solicita exportar y versionar en `assets/` las imágenes e íconos originales del Figma, optimizados en AVIF/WebP con fallback JPG cuando corresponda.

La estructura técnica ya está preparada para esos assets. Antes de la entrega final se deben reemplazar las imágenes remotas de desarrollo por los archivos exportados del diseño original o por imágenes con licencia confirmada.

## Autor

Maikol Andrés Betancourt Castaño  
Licenciatura en Sistemas de Información  
Diseño UX-UI — 2026
