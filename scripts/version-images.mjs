// Stamps each image in images.generated.json with `v`, a short hash of its renditions.
// /img/* is served as immutable for a year, so a photo replaced under the same file name
// would stay cached; the URLs carry ?v=<hash> and change whenever the content does.
// Run after any image processing: node scripts/version-images.mjs (process-brb runs it itself).
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public', 'img');
const MANIFEST = path.join(ROOT, 'src', 'data', 'images.generated.json');

export async function versionImages() {
  const manifest = JSON.parse(await fs.readFile(MANIFEST, 'utf8'));
  for (const [name, entry] of Object.entries(manifest)) {
    const hash = crypto.createHash('sha256');
    for (const w of entry.widths) hash.update(await fs.readFile(path.join(OUT, `${name}-${w}.webp`)));
    entry.v = hash.digest('hex').slice(0, 8);
  }
  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Versioned ${Object.keys(manifest).length} images.`);
}

if (process.argv[1]?.endsWith('version-images.mjs')) await versionImages();
