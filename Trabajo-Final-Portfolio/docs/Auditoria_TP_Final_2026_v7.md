# Auditoría del Trabajo Final UX/UI — Portfolio MB Electric Flow · 31/10/2026

**Fuente de requisitos:** `Trabajo_Final_UXUI_Portfolio_Web(1).pdf` (5 páginas, Mg. Ernesto Ledesma). Los resultados indicados a continuación son verificaciones sobre los archivos locales y pruebas estáticas; **no son un test de usabilidad ni una medición Lighthouse**.

## Decisión de arquitectura

- **Inicio** (`index.html`): mantiene las nueve partes obligatorias y anclas en el **header**. La barra de navegación global lleva a páginas independientes, que amplían cada tema.
- **Páginas independientes:** `skills.html`, `proyectos.html`, `experiencia.html`, `formacion.html`, `sobre-mi.html`, `contacto.html` y tres casos de estudio `caso-sc.html`, `caso-agrimensura.html`, `caso-cubri.html`, más `caso-coffea.html` como caso académico adicional.
- La expansión multipágina **no sustituye** la estructura one-page exigida, sino que la complementa.

## Revisión objetiva de requisitos

| Requisito de la consigna | Estado al 31/10/2026 | Evidencia / siguiente paso |
|---|---|---|
| Header sticky + logo + anclas + contacto + GitHub + hamburguesa | **Implementado en código**, comportamiento pendiente de verificación manual | `index.html`, `styles.css`, `script.js` |
| Hero: nombre, rol, 2 CTAs, disponibilidad/ubicación | **Implementado** | `index.html` |
| 3–4 métricas o logros | **Implementado** | 4 tarjetas en Inicio |
| Skills: ≥3 categorías + herramientas | **Implementado** | 4 tarjetas en Inicio, 6 áreas en `skills.html` |
| Proyectos: ≥3 con imagen, año, descripción, resultado/aprendizaje, tags y enlace | **Implementado en código** | 3 destacados en Inicio, 6 en Proyectos, con aprendizajes |
| Experiencia/Formación: período, rol, institución y logros | **Implementado, requiere revisión académica de cada logro** | Timeline ordenado de 2 entradas en Inicio; trayectoria completa en `experiencia.html` |
| Sobre mí con foto/alt y 3 principios | **Implementado** | `index.html`, `sobre-mi.html` |
| Contacto con mailto, LinkedIn y otra red | **Implementado** | `contacto.html` (GitHub como tercera red) |
| Footer completo | **Implementado** | Pie común entre páginas |
| Caso de estudio propio | **Implementado** | `caso-cubri.html` y casos adicionales de SC, ERP y Coffea |
| Metadatos, OG, favicon, lang, un h1 | **Implementado; auditoría real SEO pendiente** | HTML + pruebas estáticas |
| HTML/CSS sin frameworks JS | **Implementado** | HTML, CSS, JavaScript vanilla |
| Variables CSS, Grid/Flexbox, estados, reduced-motion | **Implementado en código** | `styles.css`; falta revisión visual y de teclado |
| Responsive 375/768/1280 sin scroll horizontal | **Código responsive existente; validación real pendiente** | El navegador automatizado del entorno bloqueó las visitas locales; comprobar en Chrome del equipo |
| Optimización de imágenes | **Parcialmente completado** | Nuevas capturas WebP; auditar el resto de imágenes y caché en deploy |
| ≥10 commits incrementales en repo público | **Cumplido según historial revisado** | Carpeta `Trabajo-Final-Portfolio` de `Diseno-UX-UI-2026` |
| Investigación: proto-persona, benchmark x3, moodboard, sitemap/card sorting | **Documentación inicial disponible; actualizar con iteraciones v7** | `docs/Hito1_Investigacion_UX.md` |
| Wireframes baja fidelidad mobile + desktop de página completa | **Parcial: wireframes previos en Figma, versión final sin sincronizar** | Revisar versión actual en Figma |
| Design system Figma: paleta, tipografía, grilla, estados, componentes | **Sistema inicial creado; actualizar Electric Flow y input de contacto** | Archivo Figma existente |
| Prototipo alta fidelidad mobile + desktop + menú | **Pendiente actualización y navegación en Figma** | No es equivalente a la web terminada |
| Test real del prototipo con ≥3 personas y cambios aplicados | **Pendiente** | `docs/guion-test-usabilidad.md`; registrar tareas, evidencia y cambios reales |
| Revisión entre pares del sitio con 2 compañeros | **Pendiente** | Registrar 2 revisiones reales y correcciones |
| Lighthouse mobile ≥90 en 4 métricas + captura | **No medido; pendiente** | Ejecutar en Chrome DevTools sobre URL publicada |
| Deploy HTTPS automático desde GitHub, URL en README | **Pendiente** | Conectar Netlify / GitHub Pages mediante CI/CD |
| Presentación del proceso máx. 10 diapositivas | **Pendiente** | Ver esquema recomendado más abajo |
| Comparación Figma frente a implementación (2 secciones) | **Pendiente** | Comparar capturas de Figma y web cuando se sincronice |
| URL pública del sitio + link Figma + repo | **Parcial: repo y archivo Figma existen, falta sitio** | README y entrega |

**Punto de atención:** Figma devolvió error explícito de límite de llamadas del plan Starter el 31/10/2026. No se ha aplicado esta actualización v7 directamente al archivo remoto. Los SVG de `docs/figma-import/` son referencias que pueden importarse y ajustarse cuando el acceso esté disponible; **no son prototipos Figma conectados**.

## Evidencias nuevas incorporadas

- **ERP Agrimensura:** dos capturas proporcionadas por el autor (acceso y dashboard). Versión web anonimizando nombre de usuario, contraseña e indicadores operativos. No se publican datos ni código privado.
- **Coffea:** captura proporcionada por el autor de la web pública. Caso de estudio académico sin atribuir investigaciones ni métricas no realizadas.
- **SC:** se conservan las tres capturas derivadas de las demos públicas ejecutadas localmente (Salud, Hotelería, Logística).
- No fue posible abrir directamente las dos URL externas en este entorno; no debe afirmarse que las nuevas capturas de ERP/Coffea se obtuvieron de una sesión web automatizada.

## Propuesta de presentación (10 diapositivas como máximo)

1. Portada — Trabajo Final, autor, carrera y docente.
2. Problema y objetivo del portfolio — usuario principal y secundario.
3. Benchmark de 3 portfolios — aprendizajes y riesgos.
4. Concepto Electric Flow — palabras, paleta, tipografía e identidad MB.
5. Arquitectura — one-page obligatoria + páginas independientes.
6. Wireframes — mobile 375 y desktop 1280, principales decisiones.
7. Design system — componentes, estados, animaciones accesibles.
8. Prototipo — navegación, proyectos con evidencias y foto/certificados.
9. Test real con 3 usuarios — tareas, observaciones, mejoras **una vez realizadas**.
10. Implementación y resultado — repositorio, Figma, URL pública, Lighthouse y captura comparativa.

No completar las diapositivas 9/10 con cifras inventadas. Sin URL publicada o sin todas las secciones, la consigna indica que el trabajo **no se califica**.
