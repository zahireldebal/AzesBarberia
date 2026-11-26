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
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { removePlayButton } from './retouch.mjs';

/**
 * Optional AI upscaler. If REALESRGAN_BIN points to a realesrgan-ncnn-vulkan
 * executable (https://github.com/xinntao/Real-ESRGAN/releases), every photo is
 * first upscaled 4x with the realesrgan-x4plus model, which rebuilds fine detail.
 * Without it the pipeline falls back to the classic enhancement chain below.
 */
const ESRGAN = process.env.REALESRGAN_BIN && existsSync(process.env.REALESRGAN_BIN) ? process.env.REALESRGAN_BIN : null;
/** Black-and-white photography. Off: the client wants colour photos on the "Papel" theme. */
const MONO = false;
const CACHE = path.join(path.resolve(import.meta.dirname, '..'), 'assets-src', '.upscale-cache');

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public', 'img');
const MANIFEST = path.join(ROOT, 'src', 'data', 'images.generated.json');
const WIDTHS = [480, 768, 1080, 1440, 1920];

const src = (...p) => path.join(ROOT, ...p);

const BA = (...p) => src('ANIMACION SIMULADO PRODUCTOS CAPILARES', ...p);

/**
 * name, file, crop [left, top, width, height], scale or size [w, h],
 * retouch: Instagram play badge to remove before cropping ({cx, cy, r, grain}),
 * Every photo goes through enhance(): AI 4x (optional) or a two-step Lanczos
 * upscale, a 35% blend of local contrast (CLAHE) and a final sharpen.
 */
const JOBS = [
  // Local / hero (Google Maps captures)
  // The hero is a heavily compressed capture shown full-screen: the "soft" profile
  // removes compression blocks first and avoids the halos local contrast would add.
  { name: 'fachada', file: src('hero.png'), crop: [0, 0, 714, 795], scale: 3, profile: 'soft' },
  { name: 'local-sillones', file: src('SitioFisico', '1.png'), crop: [0, 0, 727, 858], scale: 2 },
  { name: 'local-espejo', file: src('SitioFisico', '3.png'), crop: [0, 0, 716, 852], scale: 2 },
  { name: 'local-entrepiso', file: src('SitioFisico', '5.png'), crop: [0, 0, 716, 858], scale: 2 },

  // Team (Fresha profile photos, 340px squares)
  ...['lautaro', 'federico', 'emanuel', 'benjamin', 'alex'].map((n) => ({
    name: `equipo-${n}`, file: src('assets-src', 'team', `${n}.png`), crop: null, scale: 2,
  })),

  // Products (BRB story screenshots)
  { name: 'producto-cera-en-polvo', file: src('Productos', 'ceraenpolvo1.png'), crop: [697, 100, 511, 600], scale: 2 },
  // Pomada Mate (imagenmate.png, a paused BRB reel): play badge removed, BRB sticker cropped out.
  { name: 'producto-pomada-mate', file: src('Productos', 'imagenmate.png'), retouch: { cx: 255, cy: 461, r: 36, grain: false }, crop: [15, 190, 430, 458], scale: 2 },

  // Before / after pairs (BRB reels, illustrative). Each pair shares framing,
  // head size and position so the comparison slider lines up.
  { name: 'cera-antes', file: BA('antes.png'), crop: [70, 48, 315, 315], size: [1000, 1000] },
  { name: 'cera-despues', file: BA('despues.png'), crop: [40, 75, 340, 340], size: [1000, 1000] },

];

async function processJob(job) {
  let img = sharp(job.file);
  if (job.retouch) {
    const { data, info } = await sharp(job.file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    removePlayButton(data, info.width, info.height, job.retouch);
    img = sharp(data, { raw: { width: info.width, height: info.height, channels: 3 } });
  }
  if (job.crop) {
    const [left, top, width, height] = job.crop;
    img = img.extract({ left, top, width, height });
  }
  const meta = job.crop ? { width: job.crop[2], height: job.crop[3] } : await sharp(job.file).metadata();
  const [W, H] = job.size ?? [Math.round(meta.width * job.scale), Math.round(meta.height * job.scale)];
  const cropped = await img.removeAlpha().png().toBuffer();
  const enhanced = job.profile === 'soft'
    ? await enhanceSoft(cropped, meta, W, H)
    : await enhance(job.name, cropped, meta, W, H);
  // Theme "Papel": photos are black and white. Baked into the files (not a CSS
  // filter) so the browser does no per-frame filtering. Set MONO = false for colour.
  const master = MONO
    ? await sharp(enhanced).grayscale().linear(1.05, -6).png().toBuffer()
    : enhanced;

  const widths = WIDTHS.filter((w) => w < W).concat(W);
  await Promise.all(widths.map((w) =>
    sharp(master).resize(w, null, { kernel: 'lanczos3' }).webp({ quality: 84, effort: 6, smartSubsample: true }).toFile(path.join(OUT, `${job.name}-${w}.webp`)),
  ));
  return [job.name, { width: W, height: H, widths }];
}

/** Upscale + local contrast + sharpen. Returns a PNG buffer of exactly W x H. */
/**
 * For compressed sources shown large: a light denoise at source size removes
 * JPEG blocking, then three Lanczos steps, then a wide low-amount sharpen
 * (perceived crispness without halos). No CLAHE: it would re-amplify blocks.
 */
async function enhanceSoft(input, meta, W, H) {
  let buf = await sharp(input).blur(0.55).png().toBuffer();
  const steps = 3;
  for (let i = 1; i <= steps; i++) {
    const w = Math.round(meta.width + ((W - meta.width) * i) / steps);
    const h = Math.round(meta.height + ((H - meta.height) * i) / steps);
    buf = await sharp(buf).resize(w, h, { kernel: 'lanczos3', fit: 'cover' })
      .sharpen({ sigma: 0.6, m1: 0.25, m2: 0.5 })
      .png().toBuffer();
  }
  return sharp(buf)
    .sharpen({ sigma: 1.6, m1: 0.45, m2: 0.7, x1: 3, y2: 8, y3: 12 })
    .modulate({ saturation: 1.06 })
    .png().toBuffer();
}

async function enhance(name, input, meta, W, H) {
  let base = input;
  if (ESRGAN) {
    await fs.mkdir(CACHE, { recursive: true });
    const inFile = path.join(CACHE, `${name}-in.png`);
    const outFile = path.join(CACHE, `${name}-x4.png`);
    await fs.writeFile(inFile, input);
    execFileSync(ESRGAN, ['-i', inFile, '-o', outFile, '-n', 'realesrgan-x4plus'], { stdio: 'ignore' });
    base = await fs.readFile(outFile);
    const up = await sharp(base).resize(W, H, { kernel: 'lanczos3', fit: 'cover' }).png().toBuffer();
    return sharp(up).sharpen({ sigma: 0.5, m1: 0.4, m2: 0.8 }).png().toBuffer();
  }
  // 1. two smaller Lanczos steps keep edges crisper than one big jump
  const mid = await sharp(base)
    .resize(Math.round((W + meta.width) / 2), Math.round((H + meta.height) / 2), { kernel: 'lanczos3', fit: 'cover' })
    .sharpen({ sigma: 0.7, m1: 0.5, m2: 1 })
    .png().toBuffer();
  const up = await sharp(mid).resize(W, H, { kernel: 'lanczos3', fit: 'cover' }).png().toBuffer();
  // 2. local contrast (CLAHE) blended at 35% so hair and textures read without looking processed
  const tile = Math.max(8, Math.round(Math.min(W, H) / 10));
  const local = await sharp(up).clahe({ width: tile, height: tile, maxSlope: 2 }).ensureAlpha(0.35).png().toBuffer();
  // 3. final sharpen tuned for upscaled photos, a touch of saturation
  return sharp(up)
    .composite([{ input: local, blend: 'over' }])
    .sharpen({ sigma: 1, m1: 0.8, m2: 1.6, x1: 2, y2: 12, y3: 20 })
    .modulate({ saturation: 1.05 })
    .png().toBuffer();
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
