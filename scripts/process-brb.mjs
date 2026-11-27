// BRB product photos and before/after pairs (update 2026-11-27). Originals in assets-src/brb/.
// Only touches these images and their entries in images.generated.json, so it can
// run without the other original photos. Run: node scripts/process-brb.mjs
//
// The small sources are upscaled x4 with Real-ESRGAN (realesrgan-x4plus model, portable
// realesrgan-ncnn-vulkan build: https://github.com/xinntao/Real-ESRGAN/releases). Results are
// cached in assets-src/brb/x4/, so the binary is only needed when a crop changes:
//   REALESRGAN=path/to/realesrgan-ncnn-vulkan.exe node scripts/process-brb.mjs
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { versionImages } from './version-images.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public', 'img');
const MANIFEST = path.join(ROOT, 'src', 'data', 'images.generated.json');
const SRC = (f) => path.join(ROOT, 'assets-src', 'brb', f);
const X4 = path.join(ROOT, 'assets-src', 'brb', 'x4');
const WIDTHS = [480, 768, 1080, 1440];

/**
 * name, file, crop [left, top, width, height] (null = whole image), final size [w, h].
 * pad: fit inside the size and fill the rest with the photo's own corner colour.
 * upscale: run the crop through Real-ESRGAN x4 before the final resize.
 * erase: areas where a bright stroke is painted out: { rect: [left, top, width, height] } plus either
 *   `above` (brighter than the pixels a few steps away by this much: for a stroke over skin)
 *   or `over` (absolute brightness, sum of RGB: for a wide stroke over a light, blurred background).
 */
const JOBS = [
  // Jar on light grey (a screenshot: the crop drops the dark frame lines), squared on the jar.
  { name: 'producto-pomada-mate', file: 'pomada-mate.png', crop: [2, 93, 338, 338], size: [1080, 1080], upscale: true },
  // Tall bottle on white: cropped with headroom, then padded to a square with the photo's own white.
  { name: 'producto-cera-en-polvo', file: 'cera-en-polvo.png', crop: [0, 160, 1024, 1220], size: [1080, 1080], pad: true },
  // Before/after pairs (AI images from the same angle). Each pair is cropped so the head,
  // neck and shoulders line up in the comparison slider; both halves share one final size.
  { name: 'cera-antes', file: 'cera-antes.png', crop: [1, 13, 204, 295], size: [872, 1264], upscale: true },
  { name: 'cera-despues', file: 'cera-despues.png', crop: [10, 4, 218, 313], size: [872, 1264], upscale: true, erase: [{ rect: [150, 215, 40, 60], above: 40 }, { rect: [188, 226, 47, 42], over: 655 }] },
  { name: 'pomada-antes', file: 'pomada-antes.png', crop: [3, 5, 417, 583], size: [1000, 1398], upscale: true },
  { name: 'pomada-despues', file: 'pomada-despues.png', crop: [40, 2, 417, 583], size: [1000, 1398], upscale: true },
];

/** Paint out near-white marks (an arrow from the source collage) by diffusing the surrounding colours in. */
async function eraseMarks(file, areas) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width;
  const at = (x, y) => (y * W + x) * 3;
  // The mark is a thin bright stroke: a pixel belongs to it when it is clearly brighter
  // than the pixels a few steps away on either side (which the stroke does not reach),
  // looking both vertically and horizontally so steep parts of the curve are caught too.
  const lum = (x, y) => { const i = at(x, y); return data[i] + data[i + 1] + data[i + 2]; };
  let mask = new Set();
  for (const { rect: [ex, ey, ew, eh], above, over } of areas) for (let y = ey; y < ey + eh; y++) for (let x = ex; x < ex + ew; x++) {
    if (over !== undefined) { if (lum(x, y) > over) mask.add(y * W + x); continue; }
    const ref = Math.min(Math.max(lum(x, y - 7), lum(x, y + 7)), Math.max(lum(x - 7, y), lum(Math.min(x + 7, W - 1), y)));
    if (lum(x, y) > ref + above) mask.add(y * W + x);
  }
  // grow by 1px to catch the anti-aliased edge
  const grown = new Set(mask);
  for (const p of mask) for (const d of [-1, 1, -W, W, -W - 1, -W + 1, W - 1, W + 1]) grown.add(p + d);
  mask = grown;
  for (let pass = 0; pass < 200 && mask.size; pass++) {
    const filled = [];
    for (const p of mask) {
      let r = 0, g = 0, b = 0, n = 0;
      for (const d of [-1, 1, -W, W]) {
        const q = p + d;
        if (q < 0 || q >= W * info.height || mask.has(q)) continue;
        r += data[q * 3]; g += data[q * 3 + 1]; b += data[q * 3 + 2]; n++;
      }
      if (n) filled.push([p, r / n, g / n, b / n]);
    }
    for (const [p, r, g, b] of filled) { data[p * 3] = r; data[p * 3 + 1] = g; data[p * 3 + 2] = b; mask.delete(p); }
  }
  return sharp(data, { raw: { width: W, height: info.height, channels: 3 } }).png().toBuffer();
}

/** x4 Real-ESRGAN upscale of a prepared crop, cached by job name and crop contents. */
async function upscale(name, png) {
  await fs.mkdir(X4, { recursive: true });
  const src = path.join(X4, `${name}.in.png`);
  const out = path.join(X4, `${name}.png`);
  const same = await fs.readFile(src).then((b) => b.equals(png), () => false);
  if (same && (await fs.stat(out).catch(() => null))) return out;
  if (!process.env.REALESRGAN) throw new Error(`${name}: crop changed, set REALESRGAN to the realesrgan-ncnn-vulkan binary to upscale it again`);
  await fs.writeFile(src, png);
  execFileSync(process.env.REALESRGAN, ['-i', src, '-o', out, '-n', 'realesrgan-x4plus', '-s', '4'], { stdio: 'inherit' });
  return out;
}

const manifest = JSON.parse(await fs.readFile(MANIFEST, 'utf8'));
// The WhatsApp order banner was removed: drop its ad image.
for (const f of await fs.readdir(OUT)) if (/^brb-anuncio-\d+\.webp$/.test(f)) await fs.unlink(path.join(OUT, f));
delete manifest['brb-anuncio'];

for (const job of JOBS) {
  // remove previous renditions of this name
  for (const f of await fs.readdir(OUT)) if (new RegExp(`^${job.name}-\\d+\\.webp$`).test(f)) await fs.unlink(path.join(OUT, f));
  const input = job.erase ? await eraseMarks(SRC(job.file), job.erase) : SRC(job.file);
  let img = sharp(input).removeAlpha();
  if (job.crop) {
    const [left, top, width, height] = job.crop;
    img = img.extract({ left, top, width, height });
  }
  if (job.upscale) img = sharp(await upscale(job.name, await img.png().toBuffer()));
  const [W, H] = job.size;
  let background;
  if (job.pad) {
    const { data } = await sharp(SRC(job.file)).extract({ left: 4, top: 4, width: 8, height: 8 }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    background = { r: data[0], g: data[1], b: data[2] };
  }
  img = img.resize(W, H, { kernel: 'lanczos3', fit: job.pad ? 'contain' : 'cover', background });
  // the AI upscale already restores detail; extra sharpening would only add halos
  if (!job.upscale) img = img.sharpen({ sigma: 0.6, m1: 0.4, m2: 0.8 });
  const master = await img.png().toBuffer();
  const widths = WIDTHS.filter((w) => w < W).concat(W);
  await Promise.all(widths.map((w) =>
    sharp(master).resize(w, null, { kernel: 'lanczos3' }).webp({ quality: 86, effort: 6, smartSubsample: true }).toFile(path.join(OUT, `${job.name}-${w}.webp`)),
  ));
  manifest[job.name] = { width: W, height: H, widths };
}
await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Processed ${JOBS.length} BRB images.`);
await versionImages();
