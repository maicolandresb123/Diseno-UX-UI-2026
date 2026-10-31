# Trabajo Final de Diseño UX/UI 2026
## Hito 1 — Investigación, concepto y arquitectura de información

**Proyecto:** Portfolio web profesional de Maikol Andrés Betancourt  
**Cátedra:** Diseño UX/UI — Licenciatura en Sistemas de Información  
**Docente:** Mg. Ernesto Ledesma  
**Archivo de trabajo en Figma:** https://www.figma.com/design/Ls1mpNP9BDDakTddtmAEDO

> **Estado de la evidencia:** Este documento contiene análisis de referentes, supuestos de diseño y una clasificación preliminar. No presenta entrevistas, card sorting con participantes ni tests realizados como si estuvieran completados. Esas instancias deben ejecutarse y documentarse en el proyecto.

## 1. Objetivo del producto

Diseñar un portfolio personal de una página, accesible y responsive, que permita comprender el perfil profesional de Maikol, explorar proyectos reales y académicos, revisar experiencia laboral y formación, y encontrar canales de contacto. Además de cumplir la consigna, el sitio se destinará a reclutadores tecnológicos y potenciales clientes B2B.

**Propuesta de valor preliminar:** “Desarrollo soluciones digitales que integran sistemas, automatizan procesos y convierten datos en información útil”.

## 2. Usuarios objetivo (hipótesis)

**Usuario principal — Reclutador/a IT:** necesita evaluar en menos de 30 segundos las especialidades, la experiencia, los proyectos demostrables y cómo contactar.

**Usuario secundario — Cliente B2B de SC Soluciones Conectadas:** busca comprender qué problemas empresariales puede resolver Maikol y conocer ejemplos de implementación.

### Proto-persona

**Valentina**, 32 años, reclutadora IT (personaje ficticio). Revisa diversos perfiles técnicos para seleccionar candidatos y valora una navegación directa, los proyectos explicados con contexto y las habilidades verificables. La falta de información clara, los enlaces poco visibles y las credenciales dispersas son posibles obstáculos, **todavía no validados con usuarios**.

### Escenario de uso

Valentina recibe el enlace al portfolio, lee la presentación profesional, consulta la experiencia en Intellymation, abre el caso de ERP Agrimensura y encuentra una credencial de Data Analytics y un medio de contacto. Esta secuencia se utilizará para definir tareas de test.

## 3. Benchmark — Tres referentes

| Referente | Fortalezas observables | Límite para nuestro público | Decisión de diseño |
|---|---|---|---|
| [Brittany Chiang](https://brittanychiang.com/) | Experiencia y proyectos con tecnologías y roles visibles. | Un archivo amplio de trabajos requiere mayor exploración. | Proyectos destacados con enlace directo, navegación clara y experiencia fácil de localizar. |
| [Adham Dannaway](https://www.adhamdannaway.com/) | Identidad que integra diseño y desarrollo; casos de estudio seleccionados. | Su presentación enfatiza diseño/producto más que automatización industrial o B2B. | Presentar un perfil multidisciplinario, con casos centrados en el problema y la solución. |
| [Bruno Simon](https://bruno-simon.com/) | Interactividad y personalidad distintivas. | Recorrer el entorno exige interacción adicional y puede no favorecer una consulta rápida. | Usar microinteracciones discretas, sin comprometer accesibilidad ni velocidad. |

**Conclusión:** Identidad visual propia, experiencia sencilla, contenido verificable y proyectos documentados como casos de estudio. No se copiará el estilo de la referencia de cátedra ni el de los sitios analizados.

## 4. Concepto visual y moodboard

**Profesional:** jerarquía tipográfica sobria, mensajes concretos, información verificable.

**Tecnológico:** azul como color de acción, acento violeta, tarjetas y visualizaciones de interfaces reales.

**Funcional:** navegación por anclas, controles con foco, accesibilidad y movimiento reducido cuando el usuario lo solicite.

**Paleta preliminar:** primario `#2563EB`, secundario `#6D5EF5`, texto fuerte `#0F172A`, texto secundario `#475569`, fondo `#F8FAFC`, superficies `#FFFFFF`, éxito de texto `#0F766E`, advertencia `#B45309`.

**Tipografía:** títulos con Space Grotesk y texto de lectura con Inter (dos familias como máximo).

**Composición:** grilla de 12 columnas en escritorio y 4 en mobile, espaciado de 8 px y múltiplos, tarjetas con radios de 12/20 px.

**Imágenes:** capturas reales, diagramas y mockups de los proyectos propios. No se inventarán resultados o pantallas de clientes ni se publicarán datos confidenciales.

## 5. Arquitectura de información — Sitemap de one-page

1. **Header:** iniciales, enlaces ancla, GitHub y acceso a contacto.
2. **Hero:** nombre, rol, propuesta de valor, dos CTAs y ubicación general.
3. **Métricas:** tres o cuatro indicadores verificables, sin cifras inventadas.
4. **Skills:** automatización; software e integraciones; datos/BI; UX/UI.
5. **Proyectos:** SC, ERP Agrimensura, CRM Comercial, Cubrí Seguros, Coffea. Incluir un caso de estudio interno de Cubrí Seguros.
6. **Experiencia / Formación:** Intellymation, SC, estudios universitarios, cursos y una galería de certificados.
7. **Sobre mí:** párrafo, foto/ilustración con texto alternativo y tres valores.
8. **Contacto:** correo con `mailto:`, LinkedIn y otra red o perfil.
9. **Footer:** copyright, créditos, redes y navegación repetida.

### Card sorting inicial — Contenido propio

La clasificación anterior agrupa los siguientes elementos:

| Contenido | Grupo asignado | Justificación |
|---|---|---|
| SC, ERP Agrimensura y CRM | Proyectos | Evidencias de resolución de problemas reales. |
| Cubrí Seguros y Coffea | Proyectos | Casos académicos demostrables de UX/UI y frontend. |
| Intellymation | Experiencia / Formación | Rol, período, responsabilidades y logros. |
| UADER, Coderhouse, IBM, AVEVA, etc. | Experiencia / Formación | Trayectoria académica y aprendizaje continuo. |
| Certificados digitales | Formación, con subsección de credenciales | Verificación sin saturar la portada. |
| n8n, SQL, PLC, SCADA, Odoo, Power BI, etc. | Skills | Facilitan búsqueda por tecnologías y categorías. |
| Email, GitHub, LinkedIn | Contacto, con accesos redundantes en header/footer | Reduce la dificultad para iniciar contacto. |

**Advertencia metodológica:** es un ordenamiento preliminar del autor, no una actividad de card sorting observada con participantes. Se contrastará con los test de usabilidad.

## 6. Wireframes y design system creados en Figma

El archivo incluye wireframes mobile 375 px y desktop 1440 px, y tableros editables de benchmark, proto-persona, card sorting, moodboard y design system.

Se crearon 18 variables (12 de color y 6 numéricas), seis estilos tipográficos y componentes reutilizables para botón con cuatro estados, etiqueta, tarjeta de proyecto y timeline. Existen bocetos de alta fidelidad del hero desktop y mobile, **no equivalentes aún al prototipo completo**.

## 7. Plan de validación (pendiente de ejecutar)

**Participantes:** tres personas reales, idealmente con perfiles distintos; al menos una familiarizada con búsqueda laboral tecnológica y otra con contratación de servicios. No inventar participantes.

**Instrucción general:** “Explorá el prototipo como si recibieras el enlace por primera vez. Pensá en voz alta mientras realizás cada tarea”.

| Tarea | Qué registrar | Resultado |
|---|---|---|
| Encontrar la experiencia en Intellymation | Logro, tiempo, intentos, dudas | Pendiente |
| Abrir ERP Agrimensura y describir qué resuelve | Logro y comprensión del proyecto | Pendiente |
| Consultar la credencial Data Analytics de Coderhouse | Logro y facilidad para encontrarla | Pendiente |
| Encontrar la dirección de contacto | Logro y tiempo | Pendiente |

Al concluir las sesiones: registrar hallazgos repetidos, priorizarlos por impacto, aplicar cambios al prototipo y documentar un antes/después.

## 8. Próximos hitos

- Completar todas las secciones de alta fidelidad en 375 y 1440 px; prototipar menú mobile y navegación.
- Realizar test con tres usuarios y documentar cambios; luego revisión entre pares de la web.
- Maquetar con HTML5, CSS3 y JavaScript vanilla sin frameworks ni constructores visuales.
- Verificar 375, 768 y 1280 px, WCAG AA, Lighthouse en mobile y despliegue automático desde GitHub.
- Entregar URL pública, repositorio, Figma visible, hasta 10 diapositivas del proceso y captura Lighthouse.

**Fuentes:** Consigna oficial “Trabajo Final UX/UI — Portfolio Web Personal” (2026) y los tres portfolios enlazados en el benchmark.
