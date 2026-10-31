# MB · Electric Flow — Identidad visual y arquitectura de experiencia

**Trabajo final · Diseño UX/UI 2026 · FCyT-UADER**

## 1. Decisión visual

La identidad personal busca conectar los perfiles de Maikol Betancourt: sistemas de información, automatización industrial, desarrollo de software, análisis de datos y diseño de interfaces. No es una nueva marca comercial de SC Soluciones Conectadas; es una marca individual.

- **Nombre:** MB / Maikol Betancourt.
- **Descriptor:** Systems · Automation · Software.
- **Concepto:** Electric Flow — integración de sistemas, conexiones y circulación de información.
- **Personalidad:** profesional, tecnológica, funcional, precisa y accesible.
- **Monograma:** iniciales geométricas MB enlazadas por una pista de circuito con dos nodos; soporte vectorial SVG.
- **Fuentes:** Space Grotesk (títulos), Inter (lectura). Máximo dos familias.

### Colores

| Token | Valor | Uso |
|---|---|---|
| Deep Night | `#0A1020` | Fondo del modo oscuro |
| Electric Blue | `#2563EB` | Acciones, botones, identidad |
| Digital Violet | `#8B5CF6` | Detalles de flujo y degradados |
| Signal Cyan | `#38BDF8` | Conexiones, señales y texto sobre oscuro |
| Soft White | `#F8FAFC` | Texto claro y fondo de modo claro |
| Text Dark | `#0F172A` | Títulos del modo claro |
| Text Soft | `#475569` | Párrafos en modo claro |
| Surface Dark | `#121E34` | Tarjetas del modo oscuro |

Para asegurar contraste en el tema claro, el texto de acento emplea un cian oscuro `#0369A1`, distinto del cian luminoso empleado como efecto decorativo. Los colores de texto y los controles deberán evaluarse finalmente mediante Lighthouse y un comprobador WCAG 2.2 AA.

## 2. Arquitectura de la información: consigna + portfolio real

El docente solicita una página de presentación con **nueve secciones** y navegación por anclas. La página principal las conserva todas:

1. Header con navegación a anclas y botón de tema.
2. Hero con nombre, rol, valor, botones y zona geográfica.
3. Métricas con cuatro cifras verificables.
4. Skills con cuatro categorías de competencias.
5. Proyectos con tres ejemplos destacados.
6. Experiencia y formación como dos secciones visuales conectadas conceptualmente.
7. Sobre mí con retrato real y tres valores.
8. Contacto con llamada a la acción, correo y acceso a la página dedicada.
9. Footer con navegación repetida, año y créditos tecnológicos.

Como **extensión**, se ofrecen páginas estáticas independientes:

- `proyectos.html` — catálogo completo y filtros.
- `experiencia.html` — SC, cuatro áreas de Intellymation y experiencias anteriores.
- `formacion.html` — UADER, Coderhouse, IBM, AVEVA y otros.
- `sobre-mi.html` — fotografía real y presentación ampliada.
- `contacto.html` — formulario progresivo que abre el cliente de correo.
- `caso-sc.html`, `caso-agrimensura.html`, `caso-cubri.html` — casos.

La navegación principal retorna a las anclas de la página inicial y las CTA permiten abrir las páginas independientes. Se prioriza que un reclutador entienda experiencia y pueda contactar rápidamente.

## 3. Animaciones y accesibilidad

- **Animación de flujo:** líneas, pulsos y nodos en el esquema de Hero.
- **Botones:** ligero desplazamiento, brillo de barrido y resalte de foco.
- **Tarjetas:** elevación y halo radial asociado al puntero, solo en dispositivos que admiten hover.
- **Scroll:** aparición progresiva mediante `IntersectionObserver` sin dependencias.
- **Tema:** alternancia oscuro/claro con persistencia local y atributos accesibles.
- **Mobile:** menú compacto con `aria-expanded`, cierre mediante `Escape` y enlaces por teclado.
- **Movimiento reducido:** `prefers-reduced-motion` desactiva animaciones decorativas y deja contenido visible.

Animaciones CSS originales inspiradas de manera general por la biblioteca [Uiverse](https://uiverse.io/elements), sin copiar un template de página ni depender de frameworks. En cuanto al contenido y sección personal, se tomó como referente de jerarquía y disposición la página «Nosotros» de Click, sin copiar textos o identidad.

## 4. Evidencias, privacidad y uso profesional

- **Foto:** retrato proporcionado por el autor; codificación WebP optimizada sin metadatos EXIF.
- **SC:** la página de caso incluye fotografías/recursos gráficos del repositorio público `maicolandresb123/Mockups_Ventas`. Se usan como imágenes reales del proyecto web, **no** se presentan como capturas de datos operativos o de clientes.
- **ERP Agrimensura:** código fuente y base de datos privados; únicamente representación conceptual y descripción general.
- **Cubrí Seguros:** imágenes reales del ejercicio académico.
- **Certificados:** se publican nombres, instituciones, fechas y enlaces a credenciales digitales públicas, no documentos con DNI, PIN o datos reservados.
- **Experiencia laboral:** basada en el CV del autor, sin métricas de negocio inventadas.
- **Formulario:** usa `mailto:`, no envía ni almacena datos en el servidor.

## 5. Validación pendiente para la entrega académica

- Actualizar el prototipo Figma de alta fidelidad para que coincida con esta nueva versión.
- Test de usabilidad con **tres personas reales** y registro de hallazgos/cambios.
- Revisión entre pares del sitio web.
- Despliegue público HTTPS con CI/CD desde GitHub.
- Captura de Lighthouse mobile con Performance, Accessibility, Best Practices y SEO ≥ 90.
- Presentación PDF o diapositivas del proceso UX/UI, máximo 10 slides.

Estas evidencias no se presentan como completadas mientras no existan.
