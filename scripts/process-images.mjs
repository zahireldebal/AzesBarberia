// Processes the original screenshots/photos into clean WebP sets in /public/img.
// Originals are never modified. Run: npm run images
//
// Every crop removes interface chrome (Google Maps buttons and credits,
// Instagram story UI, "Ver post" stickers). Upscaling is a 2x Lanczos3
// resample plus a gentle unsharp mask: it adds pixels and crispness, it does
// not invent detail the source never had.
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public', 'img');
const MANIFEST = path.join(ROOT, 'src', 'data', 'images.generated.json');
const WIDTHS = [480, 768, 1080, 1440, 1920];

const src = (...p) => path.join(ROOT, ...p);

/** name, file, crop {left, top, width, height}, scale or size */
/** Gallery tiles in use (3, 4, 5 and 9 dropped: captions cut in the source). */
const GALLERY_KEEP = new Set([1, 2, 6, 7, 8, 10, 11]);

const ALL_JOBS = [
  // Local / hero (Google Maps captures)
  { name: 'fachada', file: src('hero.png'), crop: [0, 0, 714, 795], scale: 2 },
  { name: 'local-sillones', file: src('SitioFisico', '1.png'), crop: [0, 0, 727, 858], scale: 2 },
  { name: 'local-salon', file: src('SitioFisico', '2.png'), crop: [170, 0, 1040, 858], scale: 2 },
  { name: 'local-espejo', file: src('SitioFisico', '3.png'), crop: [0, 0, 716, 852], scale: 2 },
  { name: 'local-lounge', file: src('SitioFisico', '4.png'), crop: [160, 0, 1050, 858], scale: 2 },
  { name: 'local-entrepiso', file: src('SitioFisico', '5.png'), crop: [0, 0, 716, 858], scale: 2 },

  // Team (Fresha profile photos, 340px squares)
  ...['lautaro', 'federico', 'emanuel', 'benjamin', 'alex'].map((n) => ({
    name: `equipo-${n}`, file: src('assets-src', 'team', `${n}.png`), crop: null, scale: 2,
  })),

  // Products (BRB story screenshots)
  { name: 'producto-cera-en-polvo', file: src('Productos', 'ceraenpolvo1.png'), crop: [697, 100, 511, 600], scale: 2 },
  // Pomada Mate: no clean source (BRB promo graphic with "Ver post" overlay) -> label panel in the site.

  // Before / after (BRB, illustrative): same square framing on the head
  { name: 'cera-antes', file: src('ANIMACION SIMULADO PRODUCTOS CAPILARES', 'antes.png'), crop: [70, 48, 315, 315], size: [800, 800] },
  { name: 'cera-despues', file: src('ANIMACION SIMULADO PRODUCTOS CAPILARES', 'despues.png'), crop: [40, 75, 340, 340], size: [800, 800] },

  // Gallery: Instagram grid tiles, right edge trimmed to drop the reel/pin icons
  ...[243, 525, 807, 1088, 1370].map((x, i) => ({
    name: `galeria-${String(i + 1).padStart(2, '0')}`, file: src('Instagram', '1.png'), crop: [x + 2, 478, 242, 372], scale: 2,
  })),
  ...[
    [771, 218], [589, 460], [1317, 460], [406, 703], [589, 703], [771, 703],
  ].map(([x, y], i) => ({
    name: `galeria-${String(i + 6).padStart(2, '0')}`, file: src('Instagram', '2.png'), crop: [x + 1, y, 154, 239], scale: 3,
  })),
];

const JOBS = ALL_JOBS.filter((j) => {
  const m = /^galeria-(\d+)$/.exec(j.name);
  return !m || GALLERY_KEEP.has(Number(m[1]));
});

async function processJob(job) {
  let img = sharp(job.file);
  if (job.crop) {
    const [left, top, width, height] = job.crop;
    img = img.extract({ left, top, width, height });
  }
  const meta = job.crop ? { width: job.crop[2], height: job.crop[3] } : await sharp(job.file).metadata();
  const [W, H] = job.size ?? [Math.round(meta.width * job.scale), Math.round(meta.height * job.scale)];
  const master = await img
    .removeAlpha()
    .resize(W, H, { kernel: 'lanczos3', fit: 'cover' })
    .sharpen({ sigma: 0.8, m1: 0.6, m2: 1.2 })
    .toBuffer();

  const widths = WIDTHS.filter((w) => w < W).concat(W);
  await Promise.all(widths.map((w) =>
    sharp(master).resize(w).webp({ quality: 80, effort: 5 }).toFile(path.join(OUT, `${job.name}-${w}.webp`)),
  ));
  return [job.name, { width: W, height: H, widths }];
}

/** White background -> alpha. Neutral ink is recoloured to `ink`; the suit red is kept. */
function toAlpha(data, info, ink) {
  {
    const out = Buffer.alloc(info.width * info.height * 4);
    for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
      const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
      const a = 255 - Math.min(r, g, b);
      const isRed = r - Math.max(g, b) > 60;
      if (isRed) {
        // keep the suit red, un-premultiplied from white
        const k = a / 255 || 1;
        out[j] = Math.round((r - 255 * (1 - k)) / k);
        out[j + 1] = Math.max(0, Math.round((g - 255 * (1 - k)) / k));
        out[j + 2] = Math.max(0, Math.round((b - 255 * (1 - k)) / k));
      } else {
        [out[j], out[j + 1], out[j + 2]] = ink;
      }
      out[j + 3] = a < 12 ? 0 : a;
    }
    return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).trim({ threshold: 1 });
  }
}

/** Logo: a light (cream ink) and a dark variant with transparent background. */
async function processLogo() {
  const { data, info } = await sharp(src('logo.png')).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const make = (ink) => toAlpha(data, info, ink);
  const light = await make([243, 237, 225]).png().toBuffer();
  const dark = await make([14, 14, 15]).png().toBuffer();
  const m = await sharp(light).metadata();
  for (const [n, buf] of [['logo-light', light], ['logo-dark', dark]]) {
    for (const w of [320, 640, 960]) {
      await sharp(buf).resize(w).webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(OUT, `${n}-${w}.webp`));
    }
  }
  return { width: m.width, height: m.height, light };
}

/** Favicon / app icon: the logo's suit row on the near-black ground. */
async function processIcon() {
  // The four suits in the original logo.png (measured: x 325-660, y 72-155).
  const { data, info } = await sharp(src('logo.png'))
    .extract({ left: 325, top: 72, width: 335, height: 83 })
    .resize(1340, 332, { kernel: 'lanczos3' })
    .removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const band = await toAlpha(data, info, [243, 237, 225]).png().toBuffer();
  const size = 512;
  const inner = Math.round(size * 0.84);
  const resized = await sharp(band).resize({ width: inner, height: inner, fit: 'inside' }).toBuffer();
  const rm = await sharp(resized).metadata();
  const icon = sharp({ create: { width: size, height: size, channels: 4, background: '#0E0E0F' } })
    .composite([{ input: resized, left: Math.round((size - rm.width) / 2), top: Math.round((size - rm.height) / 2) }]);
  const iconBuf = await icon.png().toBuffer();
  await fs.mkdir(path.join(ROOT, 'src', 'app'), { recursive: true });
  await sharp(iconBuf).toFile(path.join(ROOT, 'src', 'app', 'icon.png'));
  await sharp(iconBuf).resize(180).toFile(path.join(ROOT, 'src', 'app', 'apple-icon.png'));
}

/** Open Graph card 1200x630: darkened interior + light logo. */
async function processOg(light) {
  const bg = await sharp(src('SitioFisico', '2.png'))
    .extract({ left: 170, top: 0, width: 1040, height: 858 })
    .resize(1200, 630, { fit: 'cover', position: 'top' })
    .modulate({ brightness: 0.38, saturation: 0.6 })
    .toBuffer();
  const logo = await sharp(light).resize({ width: 560 }).toBuffer();
  const lm = await sharp(logo).metadata();
  await sharp(bg)
    .composite([{ input: logo, left: Math.round((1200 - lm.width) / 2), top: Math.round((630 - lm.height) / 2) }])
    .jpeg({ quality: 86 })
    .toFile(path.join(ROOT, 'public', 'og.jpg'));
}

await fs.mkdir(OUT, { recursive: true });
// Start clean: every file in public/img is generated by this script.
for (const f of await fs.readdir(OUT)) if (f.endsWith('.webp') || f.endsWith('.png')) await fs.unlink(path.join(OUT, f));
const entries = [];
for (const job of JOBS) entries.push(await processJob(job));
const logo = await processLogo();
await processIcon();
await processOg(logo.light);
const manifest = Object.fromEntries(entries);
manifest['logo-light'] = { width: logo.width, height: logo.height, widths: [320, 640, 960] };
manifest['logo-dark'] = { width: logo.width, height: logo.height, widths: [320, 640, 960] };
await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Processed ${entries.length} images + logo, icon, og.`);
