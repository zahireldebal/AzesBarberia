# Azes Barbería: sitio webb

Sitio one-page de Azes Barbería (Maldonado, Uruguay), en español y en inglés. Las reservas se hacen en **Fresha**: el sitio solo enlaza a Fresha, nunca la reemplaza ni la embebe.

Stack: Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion, exportado como sitio estático (`out/`) y publicado en **Cloudflare Workers** (static assets).

## Correrlo

Requiere Node 20 o superior.

```bash
npm install
npm run dev        # http://localhost:3000 (ES) y http://localhost:3000/en/ (EN)
npm run build      # genera el sitio estático en out/
npm start          # sirve out/ para probar el build
```

## Dónde se edita cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| **El link de Fresha** (un solo lugar) | `src/data/business.ts` → `FRESHA_BOOKING_URL` |
| Dirección, teléfono/WhatsApp, horarios, Instagram, medios de pago | `src/data/business.ts` → `BUSINESS` |
| Servicios, precios y duración | `src/data/services.ts` |
| Barberos (nombre, foto, precio, especialidad) | `src/data/team.ts` |
| Productos | `src/data/products.ts` |
| Antes/después de un producto | `src/data/products.ts` → `showcase` (fotos, textos y pasos) |
| Preguntas frecuentes | `src/data/faq.ts` |
| Cualquier texto del sitio | `src/i18n/es.ts` (español) y `src/i18n/en.ts` (inglés) |
| URL pública del sitio (SEO, sitemap) | `src/data/business.ts` → `SITE_URL` |

### Links de Fresha

`bookingUrl()` (en `business.ts`) arma todos los links a partir de `FRESHA_BOOKING_URL`:

- reserva general: `…/booking?menu=true&pId=560997`
- un servicio preseleccionado: `…/booking?offerItemId=s:<id del servicio>&pId=560997`
- un barbero preseleccionado: `…/booking?employeeId=<id del barbero>&pId=560997`
- inglés: la misma ruta sin `/es/`

Los IDs de servicios y barberos están en `services.ts` y `team.ts` (`freshaId`). Si se crea un servicio nuevo en Fresha, su ID aparece en la página pública de Fresha del negocio.

### Fotos

Las fotos originales **no se suben** al repositorio. El script `scripts/process-images.mjs` las recorta (sacando la interfaz de Google Maps o Instagram), las amplía, las convierte a WebP en varios tamaños y deja todo en `public/img/`. También genera el favicon (`src/app/icon.png`) y la imagen para redes (`public/og.jpg`).

Para cambiar o agregar una foto:

1. Copiá el original a la carpeta del proyecto.
2. Agregá o editá su entrada en `JOBS` dentro de `scripts/process-images.mjs` (nombre, archivo, recorte; `retouch` quita el botón ▶ de Instagram).
3. Corré `npm run images`. Opcional: con la variable `REALESRGAN_BIN` apuntando a `realesrgan-ncnn-vulkan.exe` (Real-ESRGAN) las fotos se reescalan con IA.
4. Usá el nombre en el archivo de datos correspondiente (por ejemplo `products.ts`).
5. Commiteá `public/img/` y `src/data/images.generated.json`.

## Desplegar en Cloudflare Workers

El sitio es 100 % estático: Cloudflare solo sirve la carpeta `out/` (config en `wrangler.jsonc`, proyecto `azesbarberia`).

1. En Cloudflare: **Workers & Pages → Create → Import a repository** y elegí `zahireldebal/AzesBarberia`.
2. Build command: `npm run build` · Deploy command: `npx wrangler deploy`. Node 22 sale de `.node-version`.
3. No hay variables de entorno que cargar.
4. Cada push a `main` despliega solo. URL provisoria: https://azesbarberia.zahireldebal.workers.dev
5. Headers (seguridad, CSP y caché) en `public/_headers`. Si hiciera falta redirigir algo, va en `public/_redirects`.
6. Cuando haya dominio propio, cambiá `SITE_URL` en `src/data/business.ts` (canonical, hreflang, sitemap, robots y Open Graph salen de ahí).

Probar la configuración sin publicar: `npm run build && npx wrangler deploy --dry-run`.

## Pendientes

Ver `PENDIENTES.md`: fotos originales a pedir y datos a confirmar.
