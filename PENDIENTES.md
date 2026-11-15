# Pendientes: confirmar o pedir al cliente

Estado: **prototipo** (no publicado al público). Todo lo de abajo hay que resolverlo antes de lanzar.

## Fotos (prioridad alta)

| Qué | Por qué | Dónde se cambia |
|---|---|---|
| Fotos originales del local (fachada, salón, entrepiso, espejos) | Las actuales son capturas de Google Maps; varias fueron subidas por otras personas (aparecen "Joaquin Gonzalez" y "Joaquin Artazu"). No usar en público sin permiso o sin reemplazarlas. | Originales en la raíz del proyecto → trabajos en `scripts/process-images.mjs` → `npm run images` |
| 9 a 12 fotos originales de cortes, sin texto encima | La galería sale de miniaturas de Instagram (180–280 px) con textos de los reels. Se quitaron 4 porque el texto quedaba cortado; hoy hay 7. | `src/data/gallery.ts` + `scripts/process-images.mjs` (`GALLERY_KEEP`) |
| **Foto de la Pomada Mate** | La única fuente era una pieza publicitaria de BRB con el botón "Ver post", "Envíos a todo el país" y estrellas que no son de Azes. Hoy se muestra un panel tipográfico (BRB · Pomada mate · 50 ml). | `src/data/products.ts` (`image`) + `scripts/process-images.mjs` |
| Foto oficial de la Cera en Polvo | Es una captura de una historia de @brbproductos.uy. Pedirla a BRB (brbproductos.com). | `src/data/products.ts` + `scripts/process-images.mjs` |
| Par antes/después tomado igual (misma pose, distancia y luz) | Las fotos actuales son de BRB, no de un cliente de Azes, y no coinciden en ángulo: por eso se usa fundido y no slider. Con un par bien tomado se puede hacer el slider arrastrable. | `src/components/BeforeAfter.tsx` |
| Fotos del equipo en mayor resolución | Las de Fresha son de 340 px (se ampliaron a 680). | `assets-src/team/` + `npm run images` |

> Las fotos se mejoraron con reescalado Lanczos ×2 y un enfoque suave. Eso agrega nitidez, no detalle que la foto no tenía. Para un "HD" real hace falta la foto original o un reescalador con IA (Real-ESRGAN o similar).

## Datos a confirmar

| Dato | Estado | Archivo |
|---|---|---|
| Especialidad de cada barbero | No figura en ningún lado. Si se completa, aparece bajo el nombre. | `src/data/team.ts` (`specialty`) |
| Calificación y reseñas de Google | No se capturaron. Hoy se muestra solo la de Fresha (5,0 · 1 reseña). | `src/data/business.ts` (`rating`) y `src/components/Reviews.tsx` |
| Pasos de uso de la cera en polvo | Redactados a partir de "rápida absorción, sin necesidad de peine" (post de BRB). Confirmar con BRB. | `src/i18n/es.ts` y `en.ts` (`beforeAfter.steps`) |
| Lautaro en la descripción de Fresha | La descripción del negocio en Fresha nombra solo a Álex, Benjamín, Emanuel y Federico. El cliente confirmó que son 5; conviene actualizar ese texto en Fresha. | Panel de Fresha (no el sitio) |
| Dominio propio | `SITE_URL` apunta a `https://azesbarberia.netlify.app` (provisorio). | `src/data/business.ts` |

## Rendimiento

- Lighthouse local (build estático servido con `serve`): escritorio 99 / 100 / 100 / 100. En mobile, accesibilidad, buenas prácticas y SEO dan 100, y rendimiento varía entre 80 y 90 según la corrida (LCP simulado ~3,2–3,7 s). Volver a medir sobre la URL de Netlify, que sirve más rápido que el servidor local.

## Fresha

- Links verificados el 14/11/2026: reserva general, por servicio (`offerItemId=s:<id>`) y por barbero (`employeeId=<id>`), en ES (`/es/`) y EN (sin prefijo).
- En EN, Fresha muestra inglés a quien tiene el navegador en inglés; si el visitante ya usó Fresha en español, Fresha recuerda ese idioma.
- **Botón/widget oficial de Fresha:** Fresha ofrece botones de reserva para sitios web desde el panel del negocio (requiere acceso del dueño). No se implementó: los links directos ya preseleccionan servicio y barbero, y evitar un script de terceros mantiene el sitio rápido. Decidir con el cliente.
