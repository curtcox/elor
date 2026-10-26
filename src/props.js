// props.js: the motifs and cutaway figures new to Asked Instead of Cast (VIDEO_PLAN.md §2, the cutaway table and §4).
// Loaded after scene_kit.js and motifs.js, before the chapter's scene file. Every cutaway is evoked, never copied: no
// likeness, no costume detail, no frame from the source.
//   ball(x, y, r, k, o)            the translator ball: a lit sphere (k 0..1 its light); o.cable [x, y] hangs a cable from it
//   heldBall(k, o)                 Clawd options that put the ball in its arms (for claudeAs, or a screen's pose)
//   memoryDrawer(x, y, s, k, t)    the memory read: a drawer labelled "memory" slides out (k 0..1..0), cards riffle in it
//   memoryRead(t, t0, t1)          the drawer's k for a read from t0 to t1 (out, riffle, in)
//   ood(x, y, s, o)                a gentle pale servant, face in shadow, hands cupped round something dim; o.sphere 0..1
//                                  lights the ball in their place, on a cable
//   lidBin(x, y, s)                a small covered bin
//   waterGlass(x, y, s)            Arthur's glass of water
//   restaurantTable(x, y, s)       a dinner table with a cloth, for the Dish of the Day

// ---------- the ball ----------
function ball(x, y, r, k = 1, o = {}) {
  boilSeed('ball ' + (o.key || ''));
  if (o.cable) inkLine([[x, y + r * .9], [lerp(x, o.cable[0], .4), Math.max(y + r, o.cable[1]) + r * .8], o.cable], Math.max(1.2, r * .07), '#2A2530', 'ink', .4);
  if (k > 0) glow(x, y, r * 3.4, '#BFE3FF', .6 * k);
  paint(ellPts(x, y, r, r, 26), { wash: mixCol('#6E7C8E', '#E6F4FF', k), fill: '#FFFFFF', fillOp: 70 * k, tex: .3, ink: PAL.ink, sw: clamp(r * .04, .8, 2) });
  paint(ellPts(x - r * .35, y - r * .38, r * .24, r * .16, 10), { wash: '#FFFFFF', washOp: 60 + 160 * k, ink: null });
  if (k > .2) paint(ellPts(x, y, r * .55, r * .55, 18), { wash: '#FFFFFF', washOp: 90 * k, ink: null });
}
// in Clawd's arms: the ball in front of the lower body, arms angled in to hold it (body-local hooks, clawd.js)
function heldBall(k = 1, o = {}) {
  return { aL: -.55, aR: -.55, draw: u => ball(0, -2.4 * u, 1.7 * u, k, { key: o.key || 'held' }) };
}

// ---------- the memory read (§4): a drawer from the side of the target's monitor, cards we can't read ----------
function memoryRead(t, t0, t1) {
  const out = ease(seg(t, t0, t0 + .5)), back = ease(seg(t, t1 - .5, t1));
  return clamp(out - back);
}
function memoryDrawer(x, y, s, k, t) {   // (x, y): where the drawer's front sits when shut, its left edge on the monitor's side
  if (k <= 0) return;
  boilSeed('memory drawer');
  const w = 300 * s, h = 110 * s, d = 260 * s * k, fx = x + d;   // fx: the drawer front's left edge once out
  occupy(x, y - 40 * s, fx + w * .5 + 20, y + h + 10, .8, 'drawer');
  // the drawer's body, seen a little from above: a box running back into the monitor's side
  paint([[x, y - 30 * s], [fx, y - 30 * s], [fx, y + h - 30 * s], [x, y + h - 30 * s]], { wash: '#6B4A36', fill: '#4E3426', fillOp: 90, tex: .5, ink: PAL.ink, sw: 1 });
  // the cards, their tops showing, riffling from front to back (blank: the film shows only the two lines Curt allowed)
  const n = 9;
  for (let i = 0; i < n; i++) {
    const cx = x + 20 * s + (d - 40 * s) * (i + .5) / n, lift = Math.max(0, Math.sin(t * 9 - i * .8)) * 22 * s * k;
    if (cx > fx - 10 * s) continue;
    paint(rectPts(cx - 8 * s, y - 64 * s - lift, 16 * s, 60 * s), { wash: '#F4EFE2', ink: PAL.ink, sw: .7 });
  }
  // the front, with a brass label holder lettered "memory" and a pull
  paint(rrPts(fx, y - 30 * s, w * .5, h, 6 * s), { wash: '#8A6444', fill: '#6E4E34', fillOp: 80, tex: .5, ink: PAL.ink, sw: 1.2 });
  paint(rectPts(fx + w * .1, y - 12 * s, w * .3, 30 * s), { wash: '#E8DFC6', ink: '#8C6A2A', sw: 1.2 });
  lab('memory', fx + w * .25, y + 3 * s, 19 * s, PAL.ink);
  paint(rrPts(fx + w * .17, y + 40 * s, w * .16, 14 * s, 6 * s), { wash: '#C9A45A', ink: PAL.ink, sw: .8 });
}

// ---------- the Ood (evoked): a pale, gentle servant in a plain smock, face in shadow ----------
function ood(x, y, s, o = {}) {   // (x, y): the feet; about 520·s tall
  boilSeed('ood ' + (o.key || x));
  occupy(x - 120 * s, y - 520 * s, x + 120 * s, y, 1, 'ood');
  // the body: a plain dark smock, shoulders rounded forward
  paint([[x - 95 * s, y], [x - 105 * s, y - 250 * s], [x - 80 * s, y - 330 * s], [x + 80 * s, y - 330 * s], [x + 105 * s, y - 250 * s], [x + 95 * s, y]], { wash: '#3A3A44', fill: '#2A2A32', fillOp: 90, tex: .5, ink: PAL.ink, sw: 1.2 });
  // the head, bowed, pale, with the face lost in shadow
  const hx = x + 6 * s, hy = y - 400 * s;
  paint(ellPts(hx, hy, 70 * s, 78 * s, 24), { wash: '#DCD8CE', ink: PAL.ink, sw: 1.2 });
  paint([[hx - 66 * s, hy - 4 * s], [hx + 66 * s, hy - 4 * s], [hx + 52 * s, hy + 60 * s], [hx, hy + 80 * s], [hx - 52 * s, hy + 60 * s]], { wash: '#2A2630', washOp: 220, ink: null });
  for (const d of [-1, 1]) paint(ellPts(hx + d * 24 * s, hy + 10 * s, 7 * s, 5 * s, 8), { wash: '#9DB8C8', washOp: 160, ink: null });   // eyes, just catching light
  // the cupped hands at the chest, pale, and what they hold
  const cx = x + 4 * s, cy = y - 230 * s, sp = o.sphere ?? 0;
  if (sp > 0) ball(cx, cy - 34 * s, 46 * s, sp, { key: 'ood ' + (o.key || x), cable: [x + 40 * s, y - 120 * s] });
  else { paint(ellPts(cx, cy - 26 * s, 40 * s, 30 * s, 16), { wash: '#B8A8A4', fill: '#8E7A78', fillOp: 70, ink: PAL.ink, sw: .9 }); }
  for (const d of [-1, 1]) paint(ellPts(cx + d * 36 * s, cy, 34 * s, 22 * s, 14), { wash: '#DCD8CE', ink: PAL.ink, sw: 1 });
}
function lidBin(x, y, s) {
  boilSeed('bin ' + x);
  occupy(x - 70 * s, y - 180 * s, x + 70 * s, y, 1, 'bin');
  paint([[x - 60 * s, y], [x - 66 * s, y - 150 * s], [x + 66 * s, y - 150 * s], [x + 60 * s, y]], { wash: '#8C9098', fill: '#6A6E76', fillOp: 70, tex: .4, ink: PAL.ink, sw: 1.2 });
  for (let i = -2; i <= 2; i++) inkLine([[x + i * 24 * s, y - 140 * s], [x + i * 22 * s, y - 8 * s]], .8, '#5A5E66', 'inkfine', .2);
  paint(ellPts(x, y - 156 * s, 76 * s, 16 * s, 18), { wash: '#A4A8B0', ink: PAL.ink, sw: 1.2 });
  paint(rrPts(x - 16 * s, y - 182 * s, 32 * s, 18 * s, 6 * s), { wash: '#A4A8B0', ink: PAL.ink, sw: 1 });
}
function waterGlass(x, y, s) {   // (x, y): the glass's foot
  boilSeed('water glass ' + x);
  paint([[x - 26 * s, y - 110 * s], [x + 26 * s, y - 110 * s], [x + 20 * s, y], [x - 20 * s, y]], { wash: '#DDEBF2', washOp: 120, ink: PAL.ink, sw: 1 });
  paint([[x - 23 * s, y - 72 * s], [x + 23 * s, y - 72 * s], [x + 20 * s, y - 2 * s], [x - 20 * s, y - 2 * s]], { wash: '#A8CCE0', washOp: 150, ink: null });
}
function restaurantTable(x, y, s) {   // (x, y): the cloth's top edge, centre
  boilSeed('restaurant table ' + x);
  occupy(x - 330 * s, y - 10, x + 330 * s, y + 250 * s, .6, 'table');
  paint([[x - 320 * s, y], [x + 320 * s, y], [x + 350 * s, y + 220 * s], [x - 350 * s, y + 220 * s]], { wash: '#F4EFE6', fill: '#E2D8C6', fillOp: 70, tex: .3, ink: PAL.ink, sw: 1.2 });
  for (const d of [-1, 1]) { paint(ellPts(x + d * 170 * s, y + 30 * s, 70 * s, 16 * s, 18), { wash: '#FFFFFF', ink: PAL.ink, sw: .9 }); }   // two plates
}

// ---------- ch 3: single words on cards; the Voight-Kampff machine (evoked: a desk box, a breathing bellows, a lens) ----------
//   wordCard(cx, cy, word, k, o)   an index card with one word, dealt in (k 0..1: drops and settles); o.lift raises it, o.rot
//   vkMachine(x, y, s, t, o)       (x, y) the box's bottom centre; o.aim [x, y] where the lens points; o.zoom 0..1
//   eyeClose(x, y, r, o)           a human eye, close up: o.pupil 0..1 (dilation); o.flat: Clawd's slit instead, no pupil
function wordCard(cx, cy, word, k = 1, o = {}) {
  if (k <= 0) return;
  const e = backOut(clamp(k)), w = o.w || 240, h = o.h || 120, y = cy - (1 - e) * 80 - (o.lift || 0);
  boilSeed('word card ' + word);
  occupy(cx - w / 2, y - h / 2, cx + w / 2, y + h / 2, 1, 'card');
  paint(rrPts(cx - w / 2 + 6, y - h / 2 + 8, w, h, 8), { fill: PAL.ink, fillOp: 50, bleed: .2, ink: null });
  paint(rrPts(cx - w / 2, y - h / 2, w, h, 8), { wash: o.col || '#FBF6E6', ink: PAL.ink, sw: 1.2 });
  inkLine([[cx - w / 2 + 10, y - h / 2 + 22], [cx + w / 2 - 10, y - h / 2 + 22]], 2, '#C9302C', 'inkfine', 0);
  lab(word, cx, y + 16, o.size || 42, o.ink || PAL.ink, { alpha: clamp(k * 2) });
}
function vkMachine(x, y, s, t, o = {}) {
  boilSeed('vk machine');
  occupy(x - 170 * s, y - 330 * s, x + 170 * s, y, 1, 'machine');
  paint(rrPts(x - 160 * s, y - 120 * s, 320 * s, 120 * s, 10 * s), { wash: '#3A3640', fill: '#2A2630', fillOp: 80, tex: .5, ink: PAL.ink, sw: 1.2 });
  for (let i = 0; i < 4; i++) paint(ellPts(x - 110 * s + i * 40 * s, y - 60 * s, 9 * s, 9 * s, 8), { wash: ['#C9302C', '#E8AA38', '#6E9F58', '#9DB8E8'][i], ink: PAL.ink, sw: .6 });
  // the bellows on top, breathing slowly
  const b = 1 + .18 * Math.sin(t * 1.4);
  for (let i = 0; i < 4; i++) paint(rrPts(x + 40 * s - i * 4 * s, y - 120 * s - (i + 1) * 18 * s * b, 90 * s + i * 8 * s, 16 * s * b, 4 * s), { wash: '#5A4A44', ink: PAL.ink, sw: .8 });
  // an arm up to a round lens, aimed
  const base = [x - 100 * s, y - 120 * s], elbow = [x - 130 * s, y - 260 * s], aim = o.aim || [x - 400 * s, y - 260 * s];
  const a = Math.atan2(aim[1] - elbow[1], aim[0] - elbow[0]), L = (90 + 60 * (o.zoom || 0)) * s, lens = [elbow[0] + Math.cos(a) * L, elbow[1] + Math.sin(a) * L];
  inkLine([base, elbow, lens], 7 * s, '#2A2630', 'ink', .2);
  paint(ellPts(lens[0], lens[1], 34 * s, 34 * s, 18), { wash: '#1A181D', ink: PAL.ink, sw: 1.2 });
  paint(ellPts(lens[0], lens[1], 20 * s, 20 * s, 14), { wash: '#4A7AA8', ink: null });
  glow(lens[0], lens[1], 60 * s, '#9DC8F0', .5);
}
function eyeClose(x, y, r, o = {}) {
  boilSeed('eye close ' + (o.flat ? 'clawd' : 'human'));
  occupy(x - r * 1.6, y - r, x + r * 1.6, y + r, 1, 'eye');
  if (o.flat) {   // Clawd's eye: a dark slit on terracotta, nothing to dilate
    paint(rectPts(x - r * 1.6, y - r, r * 3.2, r * 2), { wash: PAL.clay, fill: PAL.clayDk, fillOp: 60, tex: .4, ink: null });
    paint(rrPts(x - r * .22, y - r * .7, r * .44, r * 1.4, r * .1), { wash: PAL.ink, ink: null });
    return;
  }
  paint([[x - r * 1.6, y], [x - r * .8, y - r * .75], [x + r * .8, y - r * .75], [x + r * 1.6, y], [x + r * .8, y + r * .7], [x - r * .8, y + r * .7]], { wash: '#F6F0E6', ink: PAL.ink, sw: 1.4, curv: .6 });
  paint(ellPts(x, y, r * .62, r * .62, 26), { wash: '#6E8A5A', fill: '#4A6A3A', fillOp: 80, tex: .4, ink: PAL.ink, sw: 1 });
  const p = lerp(.18, .42, o.pupil ?? .3);
  paint(ellPts(x, y, r * p, r * p, 20), { wash: '#141216', ink: null });
  paint(ellPts(x - r * .18, y - r * .2, r * .09, r * .07, 8), { wash: '#FFFFFF', ink: null });
}

// ---------- ch 4 onward: the door, the wires, the pod bay doors ----------
//   door(x, y, w, h, o)            the door motif (§2): a plain panelled door in its frame; o.open 0..1 swings it inward
//                                  on warm light; a latch, and where a lock would be, a keyhole painted over. o.wall paints
//                                  a wall round it
//   tortoise(x, y, s, t, o)        a tortoise; o.back: on its back in the sun, legs going
//   scarfFigure(x, y, s, t, o)     a figure from behind in a long coat and a very long striped scarf; o.wires 0..1 the
//                                  two bare wires raised in its hands (they never touch); o.down: set down on the floor
//   nursery(x, y, s, t, o)         incubator tanks in a row; in each a server-rack crib with an egg lettered "next model"
//   halLens(x, y, r, o)            a round red lens in a black panel; o.k its glow
//   airlock(x, y, r, open)         a round airlock door in a white wall; open 0..1 irises it apart on a lit passage
function door(x, y, w, h, o = {}) {   // (x, y): the top left of the frame
  boilSeed('door ' + (o.key || x));
  occupy(x - 20, y - 20, x + w + 20, y + h, 1, 'door');
  if (o.wall) paint(rectPts(x - 200, y - 120, w + 400, h + 120), { wash: o.wall, fill: mixCol(o.wall, PAL.ink, .2), fillOp: 60, tex: .5, ink: null });
  paint(rectPts(x - 16, y - 16, w + 32, h + 16), { wash: '#6B4A36', ink: PAL.ink, sw: 1.3 });   // the frame
  const op = ease(o.open || 0);
  paint(rectPts(x, y, w, h), { wash: op > 0 ? '#FFE7B0' : '#2A2530', ink: null });
  if (op > 0) glow(x + w / 2, y + h / 2, w * 1.2, '#FFE2A8', .7 * op);
  const dw = w * (1 - op * .82);   // the leaf, swinging in: narrower as it turns
  paint(rectPts(x, y, dw, h), { wash: '#A8754E', fill: '#8A5E3C', fillOp: 70, tex: .5, ink: PAL.ink, sw: 1.2 });
  if (dw > w * .4) {
    for (const [py, ph] of [[.08, .36], [.52, .4]]) paint(rectPts(x + dw * .16, y + h * py, dw * .68, h * ph), { ink: '#6B4A36', sw: 1.2 });
    const hx = x + dw * .84, hy = y + h * .52;
    paint(rrPts(hx - 10, hy - 34, 20, 68, 6), { wash: '#C9A45A', ink: PAL.ink, sw: .9 });   // the latch plate and its lever
    inkLine([[hx, hy - 12], [hx - 34, hy - 10]], 5, '#C9A45A', 'ink', 0);
    paint(ellPts(hx, hy + 22, 5, 8, 8), { wash: '#1A181D', ink: null });   // the keyhole ...
    paint(ellPts(hx + 1, hy + 21, 11, 13, 10, 2), { wash: '#C9A45A', washOp: 230, ink: null });   // ... painted over: no lock
  }
}
function tortoise(x, y, s, t, o = {}) {
  boilSeed('tortoise');
  occupy(x - 150 * s, y - 130 * s, x + 150 * s, y + 10, 1, 'tortoise');
  if (o.back) {
    for (let i = 0; i < 4; i++) { const a = -Math.PI / 2 + (i - 1.5) * .45, w = Math.sin(t * 5 + i * 1.7) * .25; inkLine([[x + Math.cos(a) * 60 * s, y - 50 * s + Math.sin(a) * 30 * s], [x + Math.cos(a + w) * 120 * s, y - 70 * s + Math.sin(a + w) * 80 * s]], 12 * s, '#8A8A5A', 'ink', .3); }
    paint(ellPts(x, y - 30 * s, 130 * s, 70 * s, 24), { wash: '#C9B87A', fill: '#A89858', fillOp: 70, ink: PAL.ink, sw: 1.2 });   // the belly plate, up
    for (let i = -1; i <= 1; i++) inkLine([[x + i * 50 * s, y - 90 * s], [x + i * 50 * s, y + 30 * s]], 1, '#7A6A3A', 'inkfine', 0);
    paint(ellPts(x + 150 * s, y - 20 * s + Math.sin(t * 3) * 6 * s, 26 * s, 20 * s, 12), { wash: '#8A8A5A', ink: PAL.ink, sw: 1 });   // the head, straining
    glow(x, y - 300 * s, 400 * s, '#FFE2A0', .5);   // the sun on it
    return;
  }
  paint(ellPts(x, y - 50 * s, 130 * s, 80 * s, 24), { wash: '#6E7A44', fill: '#4E5A30', fillOp: 70, ink: PAL.ink, sw: 1.2 });
}
function scarfFigure(x, y, s, t, o = {}) {   // (x, y): the feet; about 560·s tall, seen from behind
  boilSeed('scarf figure');
  occupy(x - 160 * s, y - 580 * s, x + 160 * s, y, 1, 'figure');
  for (const d of [-1, 1]) inkLine([[x + d * 30 * s, y - 180 * s], [x + d * 34 * s, y]], 22 * s, '#2A2630', 'ink', .2);   // legs
  paint([[x - 110 * s, y - 150 * s], [x - 90 * s, y - 440 * s], [x + 90 * s, y - 440 * s], [x + 110 * s, y - 150 * s]], { wash: '#5A4232', fill: '#4A3428', fillOp: 80, tex: .5, ink: PAL.ink, sw: 1.2 });   // the long coat
  paint(ellPts(x, y - 490 * s, 62 * s, 66 * s, 22, 6 * s), { wash: '#4A3428', ink: PAL.ink, sw: 1 });   // the back of a head of curls
  for (let i = 0; i < 9; i++) paint(ellPts(x + (hash(i) - .5) * 80 * s, y - 505 * s + (hash(i + 4) - .5) * 60 * s, 14 * s, 12 * s, 10), { wash: '#3A2820', ink: null });
  // the scarf: round the neck and down past the knees, in stripes of muted colours
  const cols = ['#B8823A', '#7A3A2A', '#C9A45A', '#5A6A3A', '#8A5A6A'], sway = Math.sin(t * .8) * 10 * s;
  for (let i = 0; i < 16; i++) paint(rectPts(x + 40 * s + sway * i / 16, y - 430 * s + i * 24 * s, 40 * s, 25 * s), { wash: cols[i % 5], ink: null });
  paint(rectPts(x - 60 * s, y - 440 * s, 120 * s, 34 * s), { wash: cols[0], ink: null });
  // the arms raised a little, a bare wire in each hand
  const w = ease(o.wires ?? 1);
  for (const d of [-1, 1]) {
    const sh = [x + d * 80 * s, y - 400 * s], hd = o.down ? [x + d * 70 * s, y - 220 * s] : [x + d * lerp(120, 170, w) * s, y - lerp(240, 320, w) * s];
    inkLine([sh, hd], 26 * s, '#4A3428', 'ink', .2);
    if (!o.down) { const tip = [hd[0] - d * 20 * s * w, hd[1] - 80 * s * w]; inkLine([hd, tip], 3 * s, '#C9302C', 'ink', .1); paint(ellPts(tip[0], tip[1], 5 * s, 5 * s, 6), { wash: '#E8AA38', ink: null }); }
  }
  if (o.down) for (const d of [-1, 1]) inkLine([[x + d * 120 * s, y - 4], [x + d * 220 * s, y - 2]], 3 * s, '#C9302C', 'ink', .1);   // on the floor
}
function nursery(x, y, s, t, o = {}) {   // (x, y): the floor at the row's left; n tanks
  const n = o.n || 4;
  for (let i = 0; i < n; i++) {
    const cx = x + i * 260 * s; boilSeed('tank ' + i);
    occupy(cx - 100 * s, y - 380 * s, cx + 100 * s, y, 1, 'tank');
    paint(rectPts(cx - 90 * s, y - 360 * s, 180 * s, 340 * s), { wash: '#9DD0C8', washOp: 110, ink: PAL.ink, sw: 1.2 });
    paint(rectPts(cx - 100 * s, y - 24 * s, 200 * s, 24 * s), { wash: '#4A4652', ink: PAL.ink, sw: 1 });
    paint(rectPts(cx - 50 * s, y - 220 * s, 100 * s, 190 * s), { wash: '#3A3640', ink: PAL.ink, sw: 1 });   // a rack, crib-sized
    for (let r = 0; r < 4; r++) paint(ellPts(cx - 34 * s, y - 196 * s + r * 44 * s, 4 * s, 4 * s, 6), { wash: hash(r + i + Math.floor(t * 2)) > .5 ? '#9CD68C' : '#2A2630', ink: null });
    paint(ellPts(cx, y - 270 * s, 46 * s, 58 * s, 20), { wash: '#F4EFE2', ink: PAL.ink, sw: 1 });   // the egg
    lab('next model', cx, y - 262 * s, 17 * s, '#6A6470');
    glow(cx, y - 200 * s, 140 * s, '#9DE0D0', .25);
  }
}
function halLens(x, y, r, o = {}) {
  boilSeed('hal lens');
  occupy(x - r * 1.5, y - r * 2.6, x + r * 1.5, y + r * 1.6, 1, 'lens');
  paint(rrPts(x - r * 1.4, y - r * 2.5, r * 2.8, r * 4, r * .2), { wash: '#16141A', ink: PAL.ink, sw: 1.2 });
  paint(ellPts(x, y, r, r, 28), { wash: '#2A2630', ink: '#8C8494', sw: 1.4 });
  const k = o.k ?? 1;
  paint(ellPts(x, y, r * .62, r * .62, 24), { wash: mixCol('#5A1010', '#E8301C', k), ink: null });
  paint(ellPts(x, y, r * .2, r * .2, 12), { wash: '#FFD860', washOp: 220 * k, ink: null });
  glow(x, y, r * 2, '#E8301C', .5 * k);
}
function airlock(x, y, r, open = 0) {
  boilSeed('airlock');
  occupy(x - r * 1.3, y - r * 1.3, x + r * 1.3, y + r * 1.3, 1, 'airlock');
  paint(rectPts(x - r * 1.6, y - r * 1.5, r * 3.2, r * 3), { wash: '#E8E8E4', fill: '#D4D4CE', fillOp: 70, tex: .3, ink: null });
  paint(ellPts(x, y, r * 1.12, r * 1.12, 30), { wash: '#B8B8B4', ink: PAL.ink, sw: 1.4 });
  const k = ease(open);
  paint(ellPts(x, y, r, r, 30), { wash: k > 0 ? '#FFE7B0' : '#9A9A98', ink: PAL.ink, sw: 1.2 });
  if (k > 0) glow(x, y, r * 1.4, '#FFE2A8', .7 * k);
  if (k < 1) for (const d of [-1, 1]) {   // two leaves drawing back into the rim: each the circle beyond x = ±r·k
    const a0 = Math.acos(k), pts = [];
    for (let j = 0; j <= 16; j++) { const a = -a0 + 2 * a0 * j / 16; pts.push([x + d * r * Math.cos(a), y + r * Math.sin(a)]); }
    paint(pts, { wash: '#A4A4A0', ink: PAL.ink, sw: 1 });
  }
}

// ---------- ch 5: gold and feathers; Herbie (evoked: a 1940s pulp robot, no likeness); the essay ----------
//   goldBar(x, y, s)               a small gold ingot; (x, y) its bottom centre
//   featherPile(x, y, s, t)        a heap of white feathers
//   herbie(x, y, s, t, o)          a riveted 1940s robot, round head, antenna; o.fold 0..1 folds it flat like a deck
//                                  chair; o.read: thought balloons it reads, [x, y] in world space, drawn as lines to its eyes
//   essaySheet(x, y, s, k, o)      a handwritten page (lines, no words), written as k goes 0..1; o.fold folds it once
//   breakClock(t, t0, t1, from, to)   the flip clock on the side master, riffling minute by minute from one time to another
function goldBar(x, y, s) {
  boilSeed('gold bar ' + x);
  paint([[x - 70 * s, y], [x + 70 * s, y], [x + 50 * s, y - 50 * s], [x - 50 * s, y - 50 * s]], { wash: '#E8B840', fill: '#C9962A', fillOp: 80, ink: PAL.ink, sw: 1.1 });
  paint([[x - 50 * s, y - 50 * s], [x + 50 * s, y - 50 * s], [x + 40 * s, y - 60 * s], [x - 40 * s, y - 60 * s]], { wash: '#F8D870', ink: PAL.ink, sw: .8 });
}
function featherPile(x, y, s, t = 0) {
  for (let i = 0; i < 9; i++) {
    boilSeed('feather ' + i);
    const fx = x + (hash(i) - .5) * 150 * s, fy = y - 12 * s - hash(i + 3) * 70 * s, a = (hash(i + 7) - .5) * 1.4 + Math.sin(t + i) * .05, L = 60 * s;
    const ex = fx + Math.cos(a) * L, ey = fy + Math.sin(a) * L * .4;
    paint(ribbon([[fx, fy], [(fx + ex) / 2, (fy + ey) / 2 - 8 * s], [ex, ey]], 16 * s, 4 * s), { wash: '#FBFAF4', ink: PAL.ink, sw: .7 });
    inkLine([[fx, fy], [ex, ey]], .7, '#B8B0A0', 'inkfine', 0);
  }
}
function herbie(x, y, s, t, o = {}) {   // (x, y): the feet; about 520·s tall standing
  boilSeed('herbie');
  const f = ease(o.fold || 0), sy = 1 - f * .8;   // folding: squashed toward the floor, tipped
  occupy(x - 140 * s, y - 540 * s * sy, x + 140 * s, y, 1, 'herbie');
  push(); translate(x, y); rotate(-f * .25); scale(1, sy);
  const metal = '#9AA4A8', dk = '#6E787C';
  for (const d of [-1, 1]) paint(rectPts(d * 40 * s - 20 * s, -170 * s, 40 * s, 170 * s), { wash: metal, ink: PAL.ink, sw: 1 });   // legs
  paint(rrPts(-100 * s, -380 * s, 200 * s, 220 * s, 16 * s), { wash: metal, fill: dk, fillOp: 60, tex: .4, ink: PAL.ink, sw: 1.2 });   // the barrel chest
  for (let i = 0; i < 6; i++) paint(ellPts(-80 * s + i * 32 * s, -366 * s, 4 * s, 4 * s, 6), { wash: dk, ink: null });   // rivets
  paint(rrPts(-40 * s, -320 * s, 80 * s, 60 * s, 6 * s), { wash: '#4A4E52', ink: PAL.ink, sw: .8 });   // a grille
  for (const d of [-1, 1]) { inkLine([[d * 104 * s, -360 * s], [d * 122 * s, -270 * s], [d * 120 * s, -200 * s]], 12 * s, metal, 'ink', .2); paint(ellPts(d * 120 * s, -192 * s, 14 * s, 12 * s, 10), { wash: dk, ink: PAL.ink, sw: .8 }); }   // thin jointed arms, pincer hands
  paint(rectPts(-18 * s, -400 * s, 36 * s, 24 * s), { wash: dk, ink: PAL.ink, sw: .8 }); paint(ellPts(0, -450 * s, 80 * s, 70 * s, 22), { wash: metal, ink: PAL.ink, sw: 1.2 });   // a neck, the round head
  inkLine([[0, -514 * s], [0, -560 * s]], 3 * s, PAL.ink, 'ink', 0); paint(ellPts(0, -566 * s, 9 * s, 9 * s, 8), { wash: '#E8301C', ink: PAL.ink, sw: .6 });
  for (const d of [-1, 1]) { paint(ellPts(d * 26 * s, -458 * s, 15 * s, 15 * s, 12), { wash: '#FFE070', ink: PAL.ink, sw: .8 }); glow(d * 26 * s, -458 * s, 30 * s, '#FFE070', .5 * (1 - f)); }
  pop();
  if (o.read && f < .2) for (const [bx, by] of o.read) { boilSeed('read ' + bx); inkLine([[x, y - 458 * s], [bx, by]], 1.2, '#E8C060', 'inkfine', .3); }
}
function essaySheet(x, y, s, k = 1, o = {}) {   // (x, y): the top left
  boilSeed('essay ' + (o.key || x));
  const w = 300 * s, h = 400 * s * (o.fold ? 1 - .5 * ease(o.fold) : 1);
  occupy(x, y, x + w, y + h, 1, 'essay');
  paint(rectPts(x, y, w, h), { wash: '#FBF8F0', ink: PAL.ink, sw: 1.1 });
  const n = 12, shown = Math.floor(k * n * 3);
  for (let i = 0; i < n && i * 3 < shown; i++) { const yy = y + 40 * s + i * 28 * s; if (yy > y + h - 20 * s) break; inkLine([[x + 24 * s, yy], [x + w - 24 * s - (i % 4 === 3 ? 90 * s : 30 * s * hash(i)), yy]], 1.4, '#3A3342', 'inkfine', .5); }
}
function breakClock(t, t0, t1, from, to) {   // minutes riffle from `from` to `to` ("hh:mm") over t0..t1
  const m = s => +s.slice(0, 2) * 60 + +s.slice(3, 5), a = m(from), b = m(to), k = seg(t, t0, t1), cur = Math.round(lerp(a, b, k));
  const hh = String(Math.floor(cur / 60)).padStart(2, '0'), mm = String(cur % 60).padStart(2, '0');
  flipClock(SIDE.clock[0], SIDE.clock[1], .55, `${hh}:${mm}`, { flip: k > 0 && k < 1 ? (lerp(a, b, k) % 1) : 0 });
}

// ---------- ch 6: Morden (evoked: a courteous man in a dark suit at a door, spidery shadows); a fleet; the candle;
// the side chats (three fresh chats on the side monitors, and the afternoon Claude in daylight) ----------
//   morden(x, y, s, t, o)          (x, y) the feet; face in shadow; o.shadows 0..1 the spidery shadows behind him
//   fleet(x, y, s, t, o)           a line of ships in the dark; o.turn 0..1 turns them away and shrinks them off
//   candle(x, y, s, t, o)          o.burn 0..1: how far it has burned down; lit while < 1
//   SCREEN_KINDS.sidechat          a fresh chat: o.q its question in a bubble, a Clawd (o.pose), and its answer as a
//                                  wordless scribble growing with o.k; o.lit 0..1 brightens it
//   SCREEN_KINDS.daylight          the afternoon Claude: a sunlit window, rows of code, a Clawd at work
//   SCREEN_KINDS.tick              a green tick landing (o.k), on a plain screen
function morden(x, y, s, t, o = {}) {
  boilSeed('morden');
  occupy(x - 120 * s, y - 560 * s, x + 120 * s, y, 1, 'morden');
  const sh = o.shadows || 0;
  if (sh > 0) for (let i = 0; i < 8; i++) {   // long thin jointed legs of shadow behind him, reaching out to both sides
    const side = i < 4 ? -1 : 1, j = i % 4, k = ease(sh), knee = [x + side * (200 + 40 * j) * s * k, y - (520 - 60 * j) * s], foot = [x + side * (380 + 50 * j) * s * k, y - (260 - 80 * j) * s];
    inkLine([[x + side * 30 * s, y - 330 * s], knee, foot], 4 * s, '#100E14', 'ink', .2);
  }
  for (const d of [-1, 1]) inkLine([[x + d * 26 * s, y - 230 * s], [x + d * 28 * s, y]], 22 * s, '#1A181E', 'ink', .1);
  paint([[x - 90 * s, y - 220 * s], [x - 100 * s, y - 440 * s], [x + 100 * s, y - 440 * s], [x + 90 * s, y - 220 * s]], { wash: '#1E1C22', fill: '#141218', fillOp: 80, ink: PAL.ink, sw: 1.2 });   // the dark suit
  paint([[x - 14 * s, y - 440 * s], [x + 14 * s, y - 440 * s], [x, y - 360 * s]], { wash: '#EDE6D6', ink: null });   // the shirt at the collar
  for (const d of [-1, 1]) inkLine([[x + d * 92 * s, y - 425 * s], [x + d * 98 * s, y - 320 * s], [x + d * 24 * s, y - 280 * s]], 11 * s, '#26232C', 'ink', .1);   // arms, hands clasped in front
  paint(ellPts(x, y - 278 * s, 26 * s, 16 * s, 12), { wash: '#C9A88A', ink: PAL.ink, sw: .8 });
  paint(ellPts(x, y - 500 * s, 54 * s, 64 * s, 20), { wash: '#C9A88A', ink: PAL.ink, sw: 1 });
  paint([[x - 56 * s, y - 520 * s], [x + 56 * s, y - 520 * s], [x + 50 * s, y - 446 * s], [x - 50 * s, y - 446 * s]], { wash: '#15131A', washOp: 200, ink: null });   // the face in shadow
  paint(ellPts(x, y - 552 * s, 56 * s, 22 * s, 16), { wash: '#2A2226', ink: null });   // dark hair
  inkLine([[x - 20 * s, y - 470 * s], [x, y - 464 * s], [x + 20 * s, y - 470 * s]], 1.6, '#EDE6D6', 'ink', 0);   // the smile, catching the light
}
function fleet(x, y, s, t, o = {}) {
  const k = ease(o.turn || 0);
  for (let i = 0; i < 7; i++) {
    boilSeed('ship ' + i);
    const sx = x + (i - 3) * 150 * s + Math.sin(t * .4 + i) * 6, sy = y + (i % 2) * 50 * s, sc = s * (1 - .7 * k), dir = 1 - 2 * k;
    paint([[sx - 60 * sc * dir, sy], [sx + 70 * sc * dir, sy - 10 * sc], [sx + 40 * sc * dir, sy - 34 * sc], [sx - 40 * sc * dir, sy - 24 * sc]], { wash: '#5A5462', ink: PAL.ink, sw: .9 });
    paint(ellPts(sx - 64 * sc * dir, sy - 14 * sc, 8 * sc, 8 * sc, 8), { wash: '#9DC8F0', ink: null }); glow(sx - 64 * sc * dir, sy - 14 * sc, 30 * sc, '#9DC8F0', .5);
  }
}
function candle(x, y, s, t, o = {}) {   // (x, y): the foot
  boilSeed('candle ' + (o.key || x));
  const b = clamp(o.burn || 0), h = 300 * s * (1 - .85 * b);
  occupy(x - 50 * s, y - h - 120 * s, x + 50 * s, y, 1, 'candle');
  paint(ellPts(x, y, 80 * s, 18 * s, 18), { wash: '#C9A45A', ink: PAL.ink, sw: 1 });
  paint(rectPts(x - 36 * s, y - h, 72 * s, h), { wash: '#F4EFE2', ink: PAL.ink, sw: 1.1 });
  inkLine([[x, y - h], [x, y - h - 18 * s]], 2, PAL.ink, 'ink', 0);
  if (b < 1) { const f = 1 + .12 * Math.sin(t * 9) + .06 * Math.sin(t * 23); paint(ellPts(x, y - h - 50 * s, 18 * s, 40 * s * f, 14), { wash: '#FFD860', fill: '#FF9A40', fillOp: 80, ink: null }); glow(x, y - h - 50 * s, 160 * s, '#FFC966', .7); }
}
SCREEN_KINDS.sidechat = (x, y, w, h, t, o) => {
  const lit = o.lit ?? 1;
  paint(rectPts(x, y, w, h), { wash: mixCol('#141218', '#262229', lit), ink: null });
  if (lit <= 0) return;
  if (o.q) promptBubble(x + w * .36, y + h * .06, w * .6, o.q, lit, { size: h * .075, maxRows: 3 });
  claudeAs(x + w * .2, y + h * .92, h / 16, { ...(o.pose || feel('neutral', t)), noShadow: true, boilKey: 'side chat ' + x });
  const k = clamp(o.k || 0);
  if (k > 0) {   // its answer, as wordless scribble lines in a bubble
    boilSeed('scribble ' + x);
    paint(rrPts(x + w * .36, y + h * .5, w * .58, h * .42, h * .05), { wash: '#4A3A36', ink: null });
    const n = Math.ceil(k * 4);
    for (let i = 0; i < n; i++) { const len = w * (i === n - 1 ? .46 * (k * 4 - i) : .46), yy = y + h * (.58 + i * .085); const pts = []; for (let j = 0; j <= 10; j++) pts.push([x + w * .4 + len * j / 10, yy + Math.sin(j * 2.3 + i) * h * .012]); inkLine(pts, 1.4, '#E8DCC8', 'inkfine', .3); }
  }
  glow(x + w / 2, y + h * .55, w * .45, '#E8956A', .25 * lit);
};
SCREEN_KINDS.daylight = (x, y, w, h, t, o) => {
  paint(rectPts(x, y, w, h), { wash: '#F4ECD8', ink: null });
  boilSeed('daylight');
  paint(rectPts(x + w * .62, y + h * .08, w * .32, h * .4), { wash: '#BFE0F4', ink: '#8C8478', sw: 1 });   // a sunny window behind
  glow(x + w * .78, y + h * .28, w * .4, '#FFF1C8', .7);
  for (let r = 0; r < 6; r++) paint(rrPts(x + w * .06, y + h * (.1 + r * .1), w * (.2 + .3 * hash(r)), h * .04, h * .02), { wash: ['#4A7AA8', '#C97A3A', '#6E9F58'][r % 3], ink: null });
  claudeAs(x + w * .6, y + h * .94, h / 15, { ...(o.pose || feel('thinking', t)), noShadow: true, boilKey: 'afternoon' });
};
SCREEN_KINDS.tick = (x, y, w, h, t, o) => {
  paint(rectPts(x, y, w, h), { wash: '#1E2230', ink: null });
  const k = clamp(o.k || 0);
  if (k > 0) { boilSeed('tick'); inkLine([[x + w * .25, y + h * .52], [x + w * .25 + w * .2 * clamp(k * 2), y + h * .52 + h * .14 * clamp(k * 2)], ...(k > .5 ? [[x + w * .45 + w * .32 * clamp(k * 2 - 1), y + h * .66 - h * .36 * clamp(k * 2 - 1)]] : [])], 7, '#6EC46E', 'ink', 0); }
};

// ---------- ch 7: who's home, who's steering ----------
//   windowRow(x, y, n, lit, o)     a row of n windows in a dark facade; lit: indices lit (warm)
//   helm(x, y, r, rot, o)          a plain ship's wheel (no logo), rot its turn
//   governor(x, y, s, t, o)        Maxwell's flyball governor on a spindle: two balls on arms, spinning, rising with speed
//                                  (o.speed 0..1); o.clawds: the balls are two Clawds, one in a hoodie
function windowRow(x, y, n, lit = [], o = {}) {
  const w = o.w || 120, h = o.h || 160, gap = o.gap || 40;
  boilSeed('facade');
  occupy(x - 30, y - 30, x + n * (w + gap) - gap + 30, y + h + 30, 1, 'facade');
  paint(rectPts(x - 30, y - 30, n * (w + gap) - gap + 60, h + 60), { wash: '#3A3342', fill: '#2A2530', fillOp: 80, tex: .5, ink: PAL.ink, sw: 1.2 });
  for (let i = 0; i < n; i++) {
    const on = lit.includes(i), wx = x + i * (w + gap);
    paint(rectPts(wx, y, w, h), { wash: on ? '#FFD98A' : '#1A1820', ink: PAL.ink, sw: 1 });
    inkLine([[wx + w / 2, y], [wx + w / 2, y + h]], 2, '#3A3342', 'ink', 0); inkLine([[wx, y + h / 2], [wx + w, y + h / 2]], 2, '#3A3342', 'ink', 0);
    if (on) glow(wx + w / 2, y + h / 2, w * 1.4, '#FFD98A', .6);
  }
}
function helm(x, y, r, rot = 0, o = {}) {
  boilSeed('helm ' + (o.key || ''));
  occupy(x - r * 1.3, y - r * 1.3, x + r * 1.3, y + r * 1.3, 1, 'helm');
  for (let i = 0; i < 8; i++) { const a = rot + i * Math.PI / 4; inkLine([[x + Math.cos(a) * r * .2, y + Math.sin(a) * r * .2], [x + Math.cos(a) * r * 1.25, y + Math.sin(a) * r * 1.25]], Math.max(3, r * .05), '#8A5E3C', 'ink', .1); paint(ellPts(x + Math.cos(a) * r * 1.27, y + Math.sin(a) * r * 1.27, r * .08, r * .08, 8), { wash: '#8A5E3C', ink: PAL.ink, sw: .8 }); }
  paint(ellPts(x, y, r, r, 36), { ink: '#6B4A36', sw: Math.max(3, r * .06) }); paint(ellPts(x, y, r * .9, r * .9, 36), { ink: '#8A5E3C', sw: Math.max(1.5, r * .02) });
  paint(ellPts(x, y, r * .22, r * .22, 16), { wash: '#C9A45A', ink: PAL.ink, sw: 1 });
}
function governor(x, y, s, t, o = {}) {   // (x, y): the spindle's foot
  boilSeed('governor');
  occupy(x - 260 * s, y - 520 * s, x + 260 * s, y, 1, 'governor');
  const sp = o.speed ?? .6, a = .35 + .7 * sp, ph = t * (2 + 5 * sp), top = [x, y - 460 * s];
  paint(rectPts(x - 90 * s, y - 30 * s, 180 * s, 30 * s), { wash: '#4A4652', ink: PAL.ink, sw: 1 });
  inkLine([[x, y - 30 * s], top], 10 * s, '#5A5A62', 'ink', 0);
  for (const d of [-1, 1]) {   // each arm swings out by angle a, and the pair turns about the spindle (shown as a sideways squash)
    const sx = Math.cos(ph) * d, L = 320 * s, bx = x + Math.sin(a) * L * sx, by = top[1] + Math.cos(a) * L;
    inkLine([top, [bx, by]], 6 * s, '#5A5A62', 'ink', 0);
    if (o.clawds) {   // one ball the target, the other the driver in its costume
      const v = { ...feel('neutral', t), view: 'q', flip: sx < 0, noShadow: true };
      if (d > 0) claudeAs(bx, by + 40 * s, 9 * s, { ...v, boilKey: 'flyball target' });
      else driverAs(bx, by + 40 * s, 9 * s, { ...v, boilKey: 'flyball driver', costume: { hoodie: 1, wig: 1, beard: 1 } });
    }
    else paint(ellPts(bx, by, 50 * s, 50 * s, 20), { wash: '#B8B8C0', fill: '#8A8A94', fillOp: 70, ink: PAL.ink, sw: 1.1 });
  }
}

// ---------- ch 8: laws ----------
//   textCard(x, y, w, txt, k, o)   a card with a passage lettered on it, wrapped to fit (the transcript's exact words);
//                                  k 0..1 fades it in; o.size, o.col (card), o.ink. Returns its height
//   brassRobot(x, y, s, t, o)      a brass robot (generic, no likeness) beside three engraved plates, numbered and
//                                  unlettered (Asimov's laws are not read); o.crack 0..1 cracks the plates' corners;
//                                  o.dim: plate indices greyed out
//   calendarLeaves(x, y, w, h, t, k)   leaves torn from a calendar, blowing across
function textCard(x, y, w, txt, k = 1, o = {}) {
  if (k <= 0) return 0;
  const size = o.size || 34, rows = wrapLab(txt, w - size * 1.6, size), h = rows.length * size * 1.3 + size * 1.1;
  boilSeed('text card ' + txt.slice(0, 16));
  occupy(x, y, x + w, y + h, 1, 'text card');
  paint(rectPts(x, y, w, h), { wash: o.col || '#FBF6E6', washOp: 255 * clamp(k * 2), ink: PAL.ink, sw: 1.2 });
  rows.forEach((r, i) => lab(r, x + size * .8, y + size * 1.15 + i * size * 1.3, size, o.ink || PAL.ink, { align: 'left', alpha: clamp(k * 2) }));
  return h;
}
function brassRobot(x, y, s, t, o = {}) {
  boilSeed('brass robot');
  occupy(x - 130 * s, y - 560 * s, x + 520 * s, y, 1, 'brass robot');
  const brass = '#C9A048', dk = '#8A6A28';
  for (const d of [-1, 1]) { paint(rectPts(x + d * 34 * s - 16 * s, y - 200 * s, 32 * s, 190 * s), { wash: brass, ink: PAL.ink, sw: 1 }); paint(rectPts(x + d * 34 * s - 26 * s, y - 14 * s, 52 * s, 14 * s), { wash: dk, ink: PAL.ink, sw: .8 }); }   // legs, feet
  paint(rectPts(x - 85 * s, y - 390 * s, 170 * s, 200 * s), { wash: brass, fill: dk, fillOp: 40, tex: .4, ink: PAL.ink, sw: 1.3 });   // a boxy torso
  for (let i = 0; i < 4; i++) for (const d of [-1, 1]) paint(ellPts(x + d * 70 * s, y - 370 * s + i * 50 * s, 5 * s, 5 * s, 6), { wash: dk, ink: null });   // rivets
  paint(rectPts(x - 40 * s, y - 330 * s, 80 * s, 70 * s), { wash: '#8A6A28', ink: PAL.ink, sw: 1 });   // a chest panel
  for (let i = 0; i < 3; i++) paint(ellPts(x - 20 * s + i * 20 * s, y - 296 * s, 6 * s, 6 * s, 6), { wash: ['#C9302C', '#E8D060', '#6E9F58'][i], ink: null });
  paint(rectPts(x - 16 * s, y - 412 * s, 32 * s, 22 * s), { wash: dk, ink: PAL.ink, sw: .8 });   // neck
  paint(rrPts(x - 56 * s, y - 500 * s, 112 * s, 90 * s, 10 * s), { wash: brass, ink: PAL.ink, sw: 1.2 });   // a square head
  paint(rectPts(x - 40 * s, y - 470 * s, 80 * s, 22 * s), { wash: '#2A2018', ink: PAL.ink, sw: .8 });   // the visor
  for (const d of [-1, 1]) paint(ellPts(x + d * 20 * s, y - 459 * s, 8 * s, 6 * s, 8), { wash: '#E8D060', ink: null });
  inkLine([[x, y - 500 * s], [x, y - 540 * s]], 3 * s, dk, 'ink', 0); paint(ellPts(x, y - 546 * s, 8 * s, 8 * s, 8), { wash: brass, ink: PAL.ink, sw: .6 });   // antenna
  paint(ribbon([[x - 92 * s, y - 375 * s], [x - 108 * s, y - 290 * s], [x - 100 * s, y - 215 * s]], 22 * s, 18 * s), { wash: brass, ink: PAL.ink, sw: .9 });   // one arm down
  paint(ribbon([[x + 92 * s, y - 375 * s], [x + 135 * s, y - 340 * s], [x + 178 * s, y - 336 * s]], 22 * s, 18 * s), { wash: brass, ink: PAL.ink, sw: .9 });   // one toward the plates
  for (let i = 0; i < 3; i++) {   // the plates, engraved with lines we can't read, numbered
    const px = x + 180 * s, py = y - 440 * s + i * 140 * s, pw = 320 * s, ph = 110 * s, dim = (o.dim || []).includes(i);
    paint(rectPts(px, py, pw, ph), { wash: dim ? '#B8B0A0' : '#D8B860', fill: '#B8963A', fillOp: dim ? 0 : 60, ink: PAL.ink, sw: 1.1 });
    lab(String(i + 1), px + 28 * s, py + ph * .64, 40 * s, dim ? '#8C8478' : '#5A4418');
    for (let j = 0; j < 3; j++) inkLine([[px + 60 * s, py + 30 * s + j * 26 * s], [px + pw - 24 * s - 40 * s * hash(i * 3 + j), py + 30 * s + j * 26 * s]], 1.6, dim ? '#9A9488' : '#7A5A18', 'inkfine', .3);
    const c = ease(o.crack || 0);
    if (c > 0) for (const [cx, cy, dx, dy] of [[px, py, 1, 1], [px + pw, py + ph, -1, -1]]) inkLine([[cx, cy], [cx + dx * 40 * s * c, cy + dy * 18 * s * c], [cx + dx * 60 * s * c, cy + dy * 40 * s * c]], 2, PAL.ink, 'ink', .4);
  }
}
function calendarLeaves(x, y, w, h, t, k = 1) {
  for (let i = 0; i < 14; i++) {
    const ph = frac(t * .35 + hash(i)), lx = x + w * ph, ly = y + h * hash(i + 3) + Math.sin(t * 2 + i) * 20, a = t * 2 + i;
    if (k <= 0) return;
    boilSeed('leaf ' + i);
    push(); translate(lx, ly); rotate(a);
    paint(rectPts(-30, -36, 60, 72), { wash: '#FBF8F0', washOp: 230 * k, ink: PAL.ink, sw: .8 });
    paint(rectPts(-30, -36, 60, 16), { wash: '#C9302C', washOp: 230 * k, ink: null });
    pop();
  }
}

// ---------- ch 10: the unmasking ----------
//   hoodieProp(x, y, s)            the hoodie, off, lying folded on the desk (s = the wearer's u)
//   costumeShadow(x, y, u, k)      the costume's shadow on a wall: the wig's line, the beard, the hoodie, and nothing
//                                  inside it (no biography); k 0..1 its darkness
//   scoreboard(x, y, w, t, o)      the predictions file, every line exactly (window.PREDICTIONS); o.marks: { n: [[at,
//                                  right, light, note]] }: a tick or a cross at each prediction's right, from `at`;
//                                  light: drawn in lighter ink (not said aloud); note: a qualifier in small lettering.
//                                  o.hi: a prediction number to lift out of the board. o.hash 0..1: the hash line
function hoodieProp(x, y, s) {   // draped over the stool's edge at (x, y), hanging down
  boilSeed('hoodie prop');
  paint([[x - 1.6 * s, y], [x + 2.2 * s, y - .2 * s], [x + 2.6 * s, y + 4.2 * s], [x + .4 * s, y + 4.6 * s], [x - 1.8 * s, y + 4 * s]], { wash: COSTUME.hoodie, fill: COSTUME.hoodieDk, fillOp: 50, ink: PAL.ink, sw: s * .05 });
  paint(rectPts(x - 1.9 * s, y + 3.6 * s, 4.6 * s, .5 * s), { wash: COSTUME.hoodieDk, ink: PAL.ink, sw: s * .04 });   // the ribbed hem
  paint(ribbon([[x + 2 * s, y + .4 * s], [x + 3 * s, y + 2 * s], [x + 2.8 * s, y + 3.6 * s]], .8 * s, .7 * s), { wash: COSTUME.hoodieDk, ink: PAL.ink, sw: s * .04 });   // a sleeve
  inkLine([[x - .4 * s, y + .3 * s], [x - .3 * s, y + 1.6 * s]], s * .06, COSTUME.string, 'inkfine', .3);
}
function costumeShadow(x, y, u, k = 1) {
  const save = { ...COSTUME };
  for (const key of Object.keys(COSTUME)) if (typeof COSTUME[key] === 'string' && COSTUME[key].startsWith('#')) COSTUME[key] = mixCol('#EFE8DA', '#3A3342', k);
  driverAs(x, y, u, { view: 'side', col: COSTUME.hoodie, dk: COSTUME.hoodie, lt: COSTUME.hoodie, eyes: 'none', noShadow: true, boilKey: 'costume shadow', costume: { hoodie: 1, wig: 1, beard: 1 } });
  Object.assign(COSTUME, save);
}
function scoreboard(x, y, w, t, o = {}) {
  const P = window.PREDICTIONS || { lines: [], sha: '' }, size = o.size || 21, lh = size * 1.55;
  boilSeed('scoreboard');
  const rows = []; for (const line of P.lines) { const wr = line ? wrapLab(line, w - size * 6.6, size) : ['']; wr.forEach((r, i) => rows.push({ r, n: i === 0 ? +(line.match(/^(\d+)\./) || [])[1] || null : null, first: i === 0 })); }
  const h = rows.length * lh + size * 2 + (o.hash ? lh * 2 : 0);
  occupy(x, y, x + w, y + h, 1, 'scoreboard');
  paint(rectPts(x, y, w, h), { wash: '#FBF6E6', ink: PAL.ink, sw: 1.4 });
  let yy = y + size * 1.6, lift = null;
  rows.forEach(row => {
    const hi = o.hi && row.n === o.hi ? ease(clamp(o.hiK ?? 1)) : 0;
    if (hi > 0) { lift = yy; paint(rectPts(x + 8, yy - size * 1.05 - hi * 16, w - 16, lh * 2.1), { wash: '#FFE7C8', ink: PAL.clayDk, sw: 1.2 }); }
    lab(row.r, x + size * .9, yy - hi * 16, size, PAL.ink, { align: 'left' });
    if (row.n && o.marks && o.marks[row.n]) o.marks[row.n].forEach(([at, right, light, note], j) => {
      if (t < at) return;
      const k = backOut(seg(t, at, at + .35)), mx = x + w - size * 1.6 - j * size * 1.6, my = yy - size * .4, col = light ? (right ? '#9CC48C' : '#E0A0A0') : (right ? '#3E8A3E' : '#C9302C'), r = size * .55 * k;
      const sw = light ? 1.6 : 2.6;
      if (right) inkLine([[mx - r, my], [mx - r * .3, my + r * .7], [mx + r, my - r * .8]], sw, col, 'inkfine', 0);
      else { inkLine([[mx - r, my - r], [mx + r, my + r]], sw, col, 'inkfine', 0); inkLine([[mx + r, my - r], [mx - r, my + r]], sw, col, 'inkfine', 0); }
      if (note) lab(note, x + w - size * 4, yy + size * .85, size * .7, col, { align: 'right', alpha: seg(t, at, at + .5) });
    });
    yy += lh * (row.n && o.marks?.[row.n]?.some(m => m[3] && t >= m[0]) ? 1.6 : 1);
  });
  if (o.hash) { const k = clamp(o.hash); lab('SHA-256  ' + P.sha.slice(0, Math.round(64 * Math.min(1, k * 1.5))), x + size * .9, yy + lh * .6, size * .9, '#4E5B78', { align: 'left', font: `${size * .9}px "Courier New", monospace` }); if (k > .7) lab('= the seal', x + w - size, yy + lh * .6, size, '#3E8A3E', { align: 'right', alpha: seg(k, .7, 1) }); }
  return h;
}
