# Hito 2 — Design system del portfolio

**Concepto:** Profesional, Tecnológico y Funcional. Interfaz luminosa y estructurada; no copia el estilo del portfolio de referencia.

## Tipografía

- Encabezados: **Space Grotesk** (H1 48/56 en Figma, H2 32/40, H3 22/30).
- Texto: **Inter** (16/25 cuerpo, 14/21 secundario, 15/22 botones).
- Solo dos familias; fuente `display=swap` mediante Google Fonts.
- Escalas adaptadas en código con `clamp()` y media queries para evitar saltos en móvil.

## Paleta preliminar

| Uso | Hex | CSS |
|---|---|---|
| Principal | `#2563EB` | `--color-primary` |
| Hover | `#1D4ED8` | `--color-primary-hover` |
| Active | `#1E40AF` | `--color-primary-active` |
| Secundario / foco | `#6D5EF5` | `--color-secondary` |
| Texto | `#0F172A` | `--color-ink` |
| Texto secundario | `#475569` | `--color-muted` |
| Fondo | `#F8FAFC` | `--color-bg` |
| Surface | `#FFFFFF` | `--color-panel` |
| Éxito | `#0F766E` | `--color-teal` |

Comprobar contraste final por componente. El sitio usa texto blanco sobre azul primario/activo para CTA, y fondo blanco con tinta oscura para contenido general. No confundir tonos de fondo decorativos con colores de texto.

## Grid y espaciado

- Mobile-first, base **375 px**; 1 columna en proyectos y habilidades.
- Tablet **768 px**; 2 columnas y ajuste de hero.
- Desktop **1280–1440 px**; 4 tarjetas en habilidades, 3 columnas para certificados.
- Espaciados basados en 8, 16, 24 y 32 px.
- Radios 12 px para CTAs y 20 px para tarjetas.
- Anclas con `scroll-margin-top` para header fijo.

## Componentes

- Botón primario en Figma: Default, Hover, Focus, Active.
- Tag de tecnología (componente).
- Card de proyecto (componente y casos reales/académicos).
- Timeline item (componente).
- Menú mobile con botón que actualiza `aria-expanded` y `aria-label`.
- Filtro de categorías con botones `aria-pressed`; regiones `aria-live` anuncian cambios.

## Fidelity note

La portada de alta fidelidad existe en Figma para desktop y mobile. El resto del diseño visual está implementado inicialmente como **versión web de desarrollo**. Se deberá reconstruir/sincronizar la página completa en Figma para cumplir el requisito de fidelidad diseño→implementación, con una captura lado a lado de dos secciones.
