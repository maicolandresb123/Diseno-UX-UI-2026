# Referencias para actualizar el Figma de Electric Flow

**Archivo existente:** https://www.figma.com/design/Ls1mpNP9BDDakTddtmAEDO

Se prepararon **dos referencias de diseño** para las nuevas imágenes de SC, ERP y Coffea. Los SVG usan grupos, formas, textos y capturas reales insertadas; también hay PNG para visualización rápida.

- `referencia-proyectos-desktop.svg` — composición de referencia 1440×1970.
- `referencia-proyectos-mobile.svg` — composición de referencia 375×2130.
- Equivalentes `.png` para comparación visual.

**Importante:** no son una exportación de Figma ni un prototipo interactivo. No reemplazan el requisito de construir pantallas *nativas, editables, navegables* en Figma. La versión de la web no se ha sincronizado en Figma por límite de uso del plan Starter.

## Integración en Figma (manual, cuando se habiliten las operaciones)

1. Abrir el archivo existente y mantener el research inicial, el sitemap y el design system como historial de evolución.
2. Importar los SVG como **referencia visual** en un área nueva; no sobreescribir los wireframes existentes.
3. Crear frames nativos **desktop 1280** y **mobile 375** para Inicio (las 9 partes), Proyectos, Skills, Experiencia, Formación, Sobre mí, Contacto y los casos de estudio principales.
4. Reutilizar tokens MB: Deep Night `#0A1020`, Electric Blue `#2563EB`, Digital Violet `#8B5CF6`, Signal Cyan `#38BDF8`, Soft White `#F8FAFC`, tipografías Space Grotesk e Inter.
5. Crear componentes con variantes Default/Hover/Focus/Active y prototipar menú mobile, anclas y navegación a casos.
6. Para los elementos fotográficos, importar las imágenes de `assets/img/` desde el repositorio; verificar permisos y anonimización del ERP.
7. Ejecutar pruebas del prototipo con 3 personas y documentar cambios; capturar dos comparaciones Figma vs. web.

Los SVG son referencia estática; si el importador convierte texto a vectores, crear texto Figma editable de forma nativa en la versión definitiva.
