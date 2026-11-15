// Small retouching helpers for the image pipeline (pure JS on raw RGB buffers).
//
// removePlayButton: Instagram's paused-video badge is a translucent dark disc
// with an opaque white triangle. The disc only darkens what is under it, so
// the original is recovered by dividing out the darkening; the triangle hides
// the pixels completely, so that small area is filled by diffusion from its
// surroundings.

const N8 = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]];

/**
 * Fills masked pixels from their surroundings: an onion peel from the mask's
 * edge inward (each pixel only averages neighbours that are already known),
 * then a few smoothing passes over the filled area.
 */
export function inpaint(data, width, height, mask, smoothPasses = 25) {
  const known = new Uint8Array(width * height);
  let todo = [];
  for (let i = 0; i < known.length; i++) { if (mask[i]) todo.push(i); else known[i] = 1; }
  const filled = todo.slice();
  while (todo.length) {
    const next = [];
    const ready = [];
    for (const i of todo) {
      const x = i % width, y = (i / width) | 0;
      let r = 0, g = 0, b = 0, n = 0;
      for (const [dx, dy] of N8) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const j = ny * width + nx;
        if (!known[j]) continue;
        r += data[j * 3]; g += data[j * 3 + 1]; b += data[j * 3 + 2]; n++;
      }
      if (n) ready.push([i, r / n, g / n, b / n]); else next.push(i);
    }
    if (!ready.length) break;
    for (const [i, r, g, b] of ready) { data[i * 3] = r; data[i * 3 + 1] = g; data[i * 3 + 2] = b; known[i] = 1; }
    todo = next;
  }
  for (let p = 0; p < smoothPasses; p++) {
    for (const i of filled) {
      const x = i % width, y = (i / width) | 0;
      let r = 0, g = 0, b = 0, n = 0;
      for (const [dx, dy] of N8) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const j = ny * width + nx;
        r += data[j * 3]; g += data[j * 3 + 1]; b += data[j * 3 + 2]; n++;
      }
      data[i * 3] = r / n; data[i * 3 + 1] = g / n; data[i * 3 + 2] = b / n;
    }
  }
}

/**
 * @param {Buffer} data raw RGB
 * @param {{cx:number, cy:number, r:number, grain?:boolean}} disc centre and radius in pixels;
 *   grain=false on flat printed surfaces (labels), where borrowed texture would copy letters
 */
export function removePlayButton(data, width, height, { cx, cy, r, grain = true }) {
  // 1. Estimate the disc's darkening factor from pixel pairs just inside / outside its edge.
  const ratios = [];
  for (let a = 0; a < 360; a += 3) {
    const t = (a * Math.PI) / 180;
    const xi = Math.round(cx + Math.cos(t) * (r - 3)), yi = Math.round(cy + Math.sin(t) * (r - 3));
    const xo = Math.round(cx + Math.cos(t) * (r + 3)), yo = Math.round(cy + Math.sin(t) * (r + 3));
    if (xo < 0 || yo < 0 || xo >= width || yo >= height) continue;
    const ii = (yi * width + xi) * 3, oi = (yo * width + xo) * 3;
    const lin = data[ii] + data[ii + 1] + data[ii + 2];
    const lout = data[oi] + data[oi + 1] + data[oi + 2];
    if (lout > 90) ratios.push(lin / lout);
  }
  ratios.sort((p, q) => p - q);
  const keep = ratios[Math.floor(ratios.length / 2)] ?? 0.55; // median: (1 - alpha)
  // 2. Undo the darkening, feathered over the anti-aliased edge.
  const mask = new Uint8Array(width * height);
  for (let y = Math.floor(cy - r - 2); y <= cy + r + 2; y++) {
    for (let x = Math.floor(cx - r - 2); x <= cx + r + 2; x++) {
      if (x < 0 || y < 0 || x >= width || y >= height) continue;
      const d = Math.hypot(x - cx, y - cy);
      const w = Math.min(1, Math.max(0, (r + 1 - d) / 2));
      if (w <= 0) continue;
      const k = 1 - (1 - keep) * w;
      const i = (y * width + x) * 3;
      for (let c = 0; c < 3; c++) data[i + c] = Math.min(255, data[i + c] / k);
      // 3. The white triangle (opaque) by its geometry, measured on Instagram's badge:
      //    left edge at cx-0.27r, apex at cx+0.25r, half-height 0.28r (+ margin).
      const m = 3.5; // margin covers the anti-aliased halo around the triangle
      const left = cx - 0.27 * r - m, apex = cx + 0.25 * r + m * 1.6, half = 0.28 * r + m;
      if (x >= left && x <= apex) {
        const t = (apex - x) / (apex - left); // 1 at the left edge, 0 at the apex
        if (Math.abs(y - cy) <= half * t + 0.5) mask[y * width + x] = 1;
      }
      // plus any near-white pixel left in the badge's centre (triangle edge glow)
      if (d < r * 0.5 && Math.min(data[i], data[i + 1], data[i + 2]) > 228) mask[y * width + x] = 1;
    }
  }
  // Remember the source texture next to the badge before filling.
  const tex = Buffer.from(data);
  inpaint(data, width, height, mask);
  // 3b. Give the smooth fill some grain: add the high-frequency detail of a
  //     patch 2r to the side (left, or right near the image edge).
  const ox = cx - 2 * r >= 2 ? -Math.round(2 * r) : Math.round(2 * r);
  const lum = (b, x, y) => (b[(y * width + x) * 3] + b[(y * width + x) * 3 + 1] + b[(y * width + x) * 3 + 2]) / 3;
  if (grain) for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) {
    if (!mask[y * width + x]) continue;
    const sx = x + ox;
    if (sx < 1 || sx >= width - 1) continue;
    let avg = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) avg += lum(tex, sx + dx, y + dy);
    const detail = (lum(tex, sx, y) - avg / 9) * 0.9;
    const i = (y * width + x) * 3;
    for (let c = 0; c < 3; c++) data[i + c] = Math.max(0, Math.min(255, data[i + c] + detail));
  }
  // 4. Soften the seam where the edge ring was (1px blur on the circle's rim).
  const copy = Buffer.from(data);
  for (let y = Math.floor(cy - r - 2); y <= cy + r + 2; y++) {
    for (let x = Math.floor(cx - r - 2); x <= cx + r + 2; x++) {
      if (x < 1 || y < 1 || x >= width - 1 || y >= height - 1) continue;
      const d = Math.hypot(x - cx, y - cy);
      if (Math.abs(d - r) > 2) continue;
      const i = (y * width + x) * 3;
      for (let c = 0; c < 3; c++) {
        let s = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) s += copy[((y + dy) * width + x + dx) * 3 + c];
        data[i + c] = s / 9;
      }
    }
  }
  return keep;
}
