// gallery.js: old works a film can borrow, hung in its own painted frames (from axol-f, where Curt picked 21). Real scans, public domain, from
// docs/artworks/ (sources and licences in docs/artworks/SOURCES.md), hung in the film's own painted frames; the four
// "close, but not free" works are our own evocations (src/evocations.js), rendered to the same folder.
//
//   ART[key]                    a work: its scan (docs/artworks/<key>.jpg), its chapters (only those load it), a crop
//                               [x, y, w, h] in fractions of the scan that leaves out any lettering of its own (the film
//                               letters only the transcript; the site shows the whole work), lettering the crop can't
//                               reach painted out (blank: rects in the same fractions, in the print's paper colour), and
//                               its reference's id
//   artwork(key, cx, cy, h, o)  the work framed, the picture h px tall, centred on (cx, cy) (world space: a camera applies)
//     o.k 0..1    arrival: the frame goes up, then the picture paints in from the top, a wet edge travelling down it
//     o.out 0..1  it goes (fades)
//     o.frame     'gilt' (default) | 'wood' | 'none' (a picture a scene frames itself, e.g. on a monitor)
//     o.rot       a slight tilt
//     o.weight    how much covering it hurts (default 1)
//   Returns the frame's box [x0, y0, x1, y1] in world space.
// No code on the frame: the film's frames already carry their share of codes. Each work is a reference (script/refs.yaml,
// mode page, id art-*), and refTimes() reports when it's on screen, so the watch pages list it, linked, while it's up.
// This film hangs no old works yet; axol-f's 21 (and their scans) stay in axol-f.
const ART = {};
const ART_IMG = {}, ART_SEEN = new Map();   // when each work is on screen, found by refTimes()'s DRY sweep
async function loadArt() {
  const n = window.CHAPTER ? CHAPTER.n : null;
  await Promise.all(Object.entries(ART).filter(([, a]) => n == null || a.ch.includes(n))
    .map(async ([key]) => { ART_IMG[key] = await loadImage(`docs/artworks/${key}.jpg`); }));
}
// the picture's width for a height h (its crop's shape)
function artW(key, h) {
  const a = ART[key], img = ART_IMG[key], [, , cw, ch] = a.crop || [0, 0, 1, 1];
  const [iw, ih] = img ? [img.width, img.height] : a.size || [1000, 1000];
  return h * (cw * iw) / (ch * ih);
}
const FRAMES = {
  gilt: { outer: '#B8913F', inner: '#E2C274', lip: '#6E5226', w: .075 },
  wood: { outer: '#5A3F2C', inner: '#7E5C40', lip: '#3A281C', w: .06 },
};
function artwork(key, cx, cy, h, o = {}) {
  const a = ART[key], k = o.k ?? 1, out = o.out ?? 0;
  if (k <= 0 || out >= 1) return null;
  const w = artW(key, h), x = cx - w / 2, y = cy - h / 2, F = FRAMES[o.frame ?? 'gilt'], fw = F ? Math.max(14, h * F.w) : 0;
  const box = [x - fw, y - fw, x + w + fw, y + h + fw];
  const up = easeOut(seg(k, 0, .25)), paintK = seg(k, .2, 1), fadeK = 1 - out;
  occupy(...box, o.weight ?? 1, 'art: ' + key);
  push(); translate(cx, cy + (1 - up) * 30); rotate(o.rot || 0); translate(-cx, -cy);
  boilSeed('art frame ' + key);
  if (F) {
    paint(rectPts(box[0] + 8, box[1] + 10, box[2] - box[0], box[3] - box[1]), { wash: PAL.ink, washOp: 40 * up * fadeK, ink: null });   // its shadow on the wall
    paint(rectPts(box[0], box[1], box[2] - box[0], box[3] - box[1]), { wash: F.outer, washOp: 255 * up * fadeK, fill: F.lip, fillOp: 50 * up * fadeK, bleed: 0, tex: .5, ink: PAL.ink, sw: 1.2 * up });
    paint(rectPts(x - fw * .4, y - fw * .4, w + fw * .8, h + fw * .8), { wash: F.inner, washOp: 255 * up * fadeK, ink: F.lip, sw: .8 * up });
  }
  paint(rectPts(x, y, w, h), { wash: '#EDE3CC', washOp: 255 * up * fadeK, ink: null });   // the ground the picture paints onto
  // the picture, top to bottom as far as paintK has reached
  const img = ART_IMG[key], [sx, sy, sw, sh] = a.crop || [0, 0, 1, 1], rh = h * ease(paintK);
  if (rh > 0) {
    if (DRY) { if (INK) inkOf([[x, y], [x + w, y + rh]], fadeK); }
    else if (img) {
      brushFlush();
      push(); if (fadeK < 1) tint(255, 255 * fadeK);
      image(img, x, y, w, rh, sx * img.width, sy * img.height, sw * img.width, sh * img.height * rh / h);
      pop();
    }
    for (const [bx, by, bw, bh] of a.blank || []) {   // lettering painted out, as far as the picture has come
      const px = x + (bx - sx) / sw * w, py = y + (by - sy) / sh * h, ph = Math.min(bh / sh * h, y + rh - py);
      if (ph > 0) { boilSeed('art blank ' + key + bx); paint(rectPts(px, py, bw / sw * w, ph), { wash: a.paper || '#EEE5D0', washOp: 255 * fadeK, ink: null }); }
    }
    if (paintK < 1) { boilSeed('art wet edge ' + key); paint(rectPts(x, y + rh - 8, w, 16), { wash: '#D9C9A8', washOp: 150, ink: null }); }
  }
  pop();
  if (DRY) { const e = ART_SEEN.get(key); if (!e) ART_SEEN.set(key, { t0: T, t1: T }); else { e.t0 = Math.min(e.t0, T); e.t1 = Math.max(e.t1, T); } }
  return box;
}
// any Desk monitor can show a work: { kind: 'art', art: key, k } (k: it paints in), fitted to the glass on a dark ground
SCREEN_KINDS.art = (x, y, w, h, t, o) => {
  paint(rectPts(x, y, w, h), { wash: '#15131A', ink: null });
  const ph = Math.min(h * .94, w * .94 * h / artW(o.art, h));
  artwork(o.art, x + w / 2, y + h / 2, ph, { frame: 'none', k: o.k ?? 1, weight: .12 });
};
