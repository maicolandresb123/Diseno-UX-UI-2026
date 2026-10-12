# TP4 - Coffea

Trabajo práctico de Diseño UX-UI 2026.

El objetivo fue reproducir la landing de Coffea usando HTML5 y CSS3, sin JavaScript, y adaptarla para desktop, tablet y mobile.

## Tecnologías usadas

- HTML5
- CSS3
- Flexbox y Grid
- CSS Custom Properties
- CSS Scroll Snap
- Media Queries
- Google Fonts

## Estructura

```text
TP4-Coffea/
├── index.html
├── 404.html
├── netlify.toml
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
```

Los estilos están separados por componentes y se usa nomenclatura BEM. Los colores, tipografías, radios y espaciados principales se centralizan en `tokens.css`.

## Responsive

La página fue trabajada con enfoque mobile-first y usa breakpoints principales en 768 px, 1024 px y 1440 px.

También se implementaron sin JavaScript:

- menú mobile con `details/summary`;
- carruseles con `overflow-x` y `scroll-snap`;
- estados hover y focus;
- favorito mediante checkbox;
- validación nativa del formulario de newsletter.

## Ejecutar en local

No necesita instalación ni compilación.

Se puede abrir `index.html` directamente en el navegador o ejecutar la carpeta con Live Server desde Visual Studio Code.

## Imágenes

Las fotografías usadas en esta versión fueron reemplazadas por imágenes de Unsplash y se guardaron localmente en `assets/img`. Los íconos SVG también están versionados dentro del proyecto.

## Sitio publicado

Netlify: https://charming-dragon-f39d2f.netlify.app/

## Autor

Maikol Andrés Betancourt Castaño  
Licenciatura en Sistemas de Información  
Diseño UX-UI - 2026
