// BRB product photos sent by the client (2026-11-26). Originals in assets-src/brb/.
// Only touches these images and their entries in images.generated.json, so it can
// run without the other original photos. Run: node scripts/process-brb.mjs
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public', 'img');
const MANIFEST = path.join(ROOT, 'src', 'data', 'images.generated.json');
const SRC = (f) => path.join(ROOT, 'assets-src', 'brb', f);
const WIDTHS = [480, 768, 1080, 1440];

/** name, file, crop [left, top, width, height] (null = whole image), final size [w, h]. */
const JOBS = [
  // Studio shots on white. The jar photo is a phone screenshot: the crop drops the iOS chrome.
  { name: 'producto-pomada-mate', file: 'pomada-mate.jpeg', crop: [0, 430, 738, 738], size: [1080, 1080] },
  // Tall bottle: cropped with headroom, then padded to a square with the photo's own white.
  { name: 'producto-cera-en-polvo', file: 'cera-en-polvo.jpeg', crop: [0, 150, 1024, 1170], size: [1080, 1080], pad: true },
  // BRB before/after collage: each photo panel cut out on its own (header band and divider removed)
  // with the same size and offset, so the comparison slider lines up.
  { name: 'cera-antes', file: 'antes-despues.jpeg', crop: [0, 450, 506, 664], size: [1012, 1328] },
  { name: 'cera-despues', file: 'antes-despues.jpeg', crop: [562, 450, 506, 664], size: [1012, 1328] },
  // "Pedila ahora" ad used in the WhatsApp order banner, kept whole.
  { name: 'brb-anuncio', file: 'anuncio.jpeg', crop: null, size: [768, 1344] },
];

const manifest = JSON.parse(await fs.readFile(MANIFEST, 'utf8'));
for (const job of JOBS) {
  // remove previous renditions of this name
  for (const f of await fs.readdir(OUT)) if (new RegExp(`^${job.name}-\\d+\\.webp$`).test(f)) await fs.unlink(path.join(OUT, f));
  let img = sharp(SRC(job.file));
  if (job.crop) {
    const [left, top, width, height] = job.crop;
    img = img.extract({ left, top, width, height });
  }
  const [W, H] = job.size;
  let background;
  if (job.pad) {
    const { data } = await sharp(SRC(job.file)).extract({ left: 4, top: 4, width: 8, height: 8 }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    background = { r: data[0], g: data[1], b: data[2] };
  }
  const master = await img.resize(W, H, { kernel: 'lanczos3', fit: job.pad ? 'contain' : 'cover', background }).sharpen({ sigma: 0.6, m1: 0.4, m2: 0.8 }).png().toBuffer();
  const widths = WIDTHS.filter((w) => w < W).concat(W);
  await Promise.all(widths.map((w) =>
    sharp(master).resize(w, null, { kernel: 'lanczos3' }).webp({ quality: 86, effort: 6, smartSubsample: true }).toFile(path.join(OUT, `${job.name}-${w}.webp`)),
  ));
  manifest[job.name] = { width: W, height: H, widths };
}
await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Processed ${JOBS.length} BRB images.`);
