# Optimización editorial y visual — MB Electric Flow v5

**Fecha de revisión:** 31/10/2026. **Proyecto:** Trabajo Final UX/UI 2026, FCyT-UADER.

## Diagnóstico real del sitio v4

- Inicio y Sobre mí repetían biografía y enumeraciones de herramientas.
- Skills y Proyectos tenían bloques de metodología equivalentes (Comprender, Diseñar, Integrar, Validar).
- La página Skills contenía seis tarjetas principalmente textuales, sin ilustraciones diferenciadas.
- En Proyectos coexistían capturas reales (Cubrí), imágenes provenientes del sitio SC y diagramas conceptuales para ERP/CRM. Se necesitaba hacer explícita la diferencia.

## Rol editorial único de cada página

| Página | Pregunta que responde | Contenido prioritario | Dirección visual |
|---|---|---|---|
| Inicio (one-page) | ¿Quién es y qué hace? | Presentación, métricas, 4 áreas resumidas, tres proyectos, experiencia, formación, tres principios, contacto y footer. | Hero workflow + tres proyectos con evidencia visual. |
| Skills | ¿Qué sabe resolver con herramientas? | Seis áreas vinculadas a experiencias y casos demostrables. | Seis ilustraciones SVG originales, dos flujos técnicos animados. |
| Proyectos | ¿Qué construyó y para qué? | Seis proyectos filtrables y evidencia visual con tipología clara. | Recursos públicos SC, capturas genuinas Cubrí y diagrama ERP privado identificado como conceptual. |
| Experiencia | ¿En qué trabajó y qué hizo? | SC, cuatro áreas de Intellymation, trayectorias anteriores. | Timeline y vínculos con proyectos; sin métricas inventadas. |
| Formación | ¿Cómo respalda sus habilidades? | Carreras en UADER, Coderhouse, IBM, AVEVA y demás. | 43 imágenes de documentos seguros y visor accesible. |
| Sobre mí | ¿Qué lo diferencia y cómo trabaja? | Fotografía, historia y objetivos profesionales, tres principios y cinco fases propias. | Retrato real + secuencia ilustrada animada. |
| Contacto | ¿Cómo comunicarse? | Email, LinkedIn, GitHub y formulario. | CTA claro y estados de interacción. |

## Criterios de recursos gráficos

- Se crean seis diagramas SVG originales de 900 × 320 px, todos con la paleta MB Electric Flow.
- El proyecto ERP Agrimensura y las referencias industriales de clientes son **privados**. Sus esquemas deben titularse «ilustración conceptual», nunca «captura real».
- Los recursos del catálogo SC provienen de su repositorio público, pero **no deben llamarse capturas de la aplicación cuando son imágenes de catálogo**.
- Las capturas de Cubrí Seguros proceden del TP5 publicado; son muestras de interfaz auténtica.
- Antes de agregar más capturas profesionales deben generarse desde entornos demo autorizados, usando datos ficticios.
- Las animaciones no cambian el significado del contenido y se desactivan con `prefers-reduced-motion`.

## Pendientes académicos

- Actualizar Figma con esta arquitectura visual y alta fidelidad mobile/desktop.
- Validar prototipo con al menos tres personas reales y documentar cambios (no inventar resultados).
- Revisar 375/768/1280, navegación con teclado, contraste, Lighthouse mobile ≥90 en cuatro categorías.
- Desplegar automáticamente desde GitHub, probar URL HTTPS, completar PDF/slides de proceso de hasta diez páginas.
