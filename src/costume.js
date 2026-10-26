// costume.js: the driver (VIDEO_PLAN.md §2). Clawd wearing Curt's look as a costume that doesn't quite fit: the hoodie,
// sleeves too long, the stubby legs dangling below its hem; a greying ponytail wig sitting a little high on a square
// head; the circle beard on an elastic strap. While the costume is on, the beard's own mouth moves with Curt's voice
// and Clawd's face stays still behind it: a ventriloquist's dummy turned inside out.
//
//   driverAs(x, y, u, o)          Clawd in costume. o is clawd()'s options, plus o.costume (below) and o.talk (0..1,
//                                 the voice's mouth: talkOf(t, 'driver')). With the beard on, the beard talks; with it
//                                 off, Clawd's own mouth does.
//   o.costume = { hoodie: 1, wig: 1, beard: 1, hood: 'down' }   1 = worn, 0 = off (drawn elsewhere: in a hand, on the desk)
//                 held: 'beard' | 'wig'   the piece the near arm is holding (drawn at its tip)
//   beardProp(x, y, s, o), wigProp(x, y, s, o)   a piece off the body: on the desk, in the air (s = the wearer's u)
//
// Every piece is drawn through clawd()'s own hooks (draw, armL, armR), so it squashes, flips and turns with Clawd. The
// costume follows the key views (front, q, side, qback, back) from VIEWS in clawd.js.
const COSTUME = {
  hoodie: '#4E5B78', hoodieDk: '#3A445C', cuff: '#45516B', string: '#D8D2C4',
  hair: '#A8A39C', ponyTip: '#1C1917', beard: '#B9B4AD', beardDk: '#8E8984', mouth: '#2A1A14', strap: '#E2D6BC',
};

// The beard, in u about the mouth (front view): goatee and sides as one shape, open round the mouth; the moustache
// over it. Wide and full, hanging over the hoodie's neckline, so it reads as a beard at any size.
const BEARD_SHAPE = through([[-1.95, -.4], [-2.05, .8], [-1.4, 1.95], [0, 2.3], [1.4, 1.95], [2.05, .8], [1.95, -.4],
  [1.15, -.05], [1.0, .85], [0, 1.1], [-1.0, .85], [-1.15, -.05]], 4);
const MOUSTACHE = [[-2.0, -.15], [-.8, -.68], [.8, -.68], [2.0, -.15]];

// where a front-view face point lands in this view: x in u (body-local), the same y
function faceX(V, x) { const F = V.face; return F ? (F.cx + x * F.fw) : null; }

function costumeParts(view, c = {}, talkK = 0) {
  const V = VIEWS[view] || VIEWS.front, C = COSTUME, worn = k => (c[k] ?? 1) >= .5;
  const facing = V.face, back = !!V.back || view === 'qback';
  // the back of the head, for a right-facing view: the ponytail and the hood hang there
  const rear = view === 'side' || view === 'q' ? V.L : view === 'qback' ? V.R : 0;
  const draw = (u, sw) => {
    // ---- the hoodie: the lower half of the block, a ribbed hem, a kangaroo pocket, the hood down behind ----
    if (worn('hoodie')) {
      boilSeed('costume hoodie ' + view);
      const L = V.L - .35, R = V.R + .35, top = -3.6, hem = -1.45;   // the neckline below the mouth, so Clawd's own shows once the beard is off
      // the hood, down, bunched behind the neck (at the back edge in profile, across the shoulders from behind)
      if (rear) paint(ribbon([[rear * u, -4.6 * u], [(rear - Math.sign(rear) * .8) * u, -3.8 * u], [(rear - Math.sign(rear) * .5) * u, -2.9 * u]], 1.3 * u, 1.0 * u), { wash: C.hoodieDk, ink: PAL.ink, sw: sw * .8 });
      if (back) paint(rrPts(-3.4 * u, -4.6 * u, 6.8 * u, 1.6 * u, .8 * u), { wash: C.hoodieDk, ink: PAL.ink, sw: sw * .8 });
      paint([[L * u, top * u], [R * u, top * u], [(R + .2) * u, hem * u], [(L - .2) * u, hem * u]], { wash: C.hoodie, ink: PAL.ink, sw });
      paint(rectPts((L - .2) * u, (hem - .45) * u, (R - L + .4) * u, .45 * u), { wash: C.hoodieDk, ink: PAL.ink, sw: sw * .7 });
      if (facing && view !== 'side') {
        const px = faceX(V, 0);
        paint([[(px - 2.2) * u, -2.95 * u], [(px + 2.2) * u, -2.95 * u], [(px + 2.7) * u, -2.0 * u], [(px - 2.7) * u, -2.0 * u]], { wash: C.hoodieDk, ink: PAL.ink, sw: sw * .7 });
        // the drawstrings, hanging from the neckline
        for (const s of [-1, 1]) inkLine([[(px + s * .9) * u, top * u], [(px + s * 1.0) * u, -3.1 * u], [(px + s * .95) * u, -2.85 * u]], sw * 1.4, C.string, 'ink', .4);
      }
    }
    // ---- the wig: a grey mop sitting a little high on a square head, a fringe, the ponytail hanging down the back ----
    if (worn('wig')) {
      boilSeed('costume wig ' + view);
      const lift = .3, top = -8 - lift, L = V.L - .25, R = V.R + .25;
      if (rear || back) costumePonytail(rear ? rear + Math.sign(rear) * .2 : 0, top + .6, rear ? Math.sign(rear) : 0, u, sw);
      // the mop: a domed crown over the top edge, its fringe a row of scallops along the forehead
      const P = [[L * u, (top + 1.3) * u], [(L + .2) * u, (top - .5) * u], [(L + 1.6) * u, (top - 1.1) * u], [0, (top - 1.3) * u], [(R - 1.6) * u, (top - 1.1) * u], [(R - .2) * u, (top - .5) * u], [R * u, (top + 1.3) * u]];
      const n = 7; for (let k = n; k >= 0; k--) { const x = lerp(L + .2, R - .2, k / n); P.push([x * u, (top + (k % 2 ? .75 : 1.25)) * u]); }
      paint(through(P, 4), { wash: C.hair, ink: PAL.ink, sw: sw * .8, curv: .4 });
      for (let k = 0; k < 6; k++) { const x = lerp(L + .8, R - .8, k / 5); inkLine([[x * u, (top - .9) * u], [(x + .25) * u, (top - .1) * u], [(x + .15) * u, (top + .6) * u]], sw * .45, mixCol(C.hair, PAL.ink, .45), 'inkfine', .5); }
    }
    // ---- the beard: a circle beard (moustache, goatee and the sides joining them) on a thin elastic ----
    // from behind, the beard's elastic shows across the back of the head: the tell
    if (worn('beard') && !facing) { boilSeed('costume strap ' + view); inkLine([[(V.L + .1) * u, -5.2 * u], [0, -5.0 * u], [(V.R - .1) * u, -5.2 * u]], sw * .9, C.strap, 'inkfine', .5); }
    if (worn('beard') && facing) {
      boilSeed('costume beard ' + view);
      const F = V.face, cx = F.cx + F.mx * F.fw, fw = F.fw, my = -4.25;
      // the elastic first, so the beard sits on it: from the moustache's ends, back round the head
      inkLine([[(cx - 1.9 * fw) * u, (my - .4) * u], [(V.L + .05) * u, (my - 1.25) * u]], sw * .8, C.strap, 'inkfine', .2);
      if (view !== 'side') inkLine([[(cx + 1.9 * fw) * u, (my - .4) * u], [(V.R - .05) * u, (my - 1.25) * u]], sw * .8, C.strap, 'inkfine', .2);
      const X = x => (cx + x * fw) * u, Y = y => (my + y) * u;
      // goatee and sides, one shape: down from the moustache's ends, round the chin, leaving the mouth open
      paint(BEARD_SHAPE.map(([x, y]) => [X(x), Y(y)]), { wash: C.beard, ink: PAL.ink, sw: sw * .7, curv: .4 });
      paint(ribbon(MOUSTACHE.map(([x, y]) => [X(x), Y(y)]), .75 * u, .55 * u), { wash: C.beard, ink: PAL.ink, sw: sw * .7 });
      for (let k = 0; k < 7; k++) inkLine([[X(-1.5 + k * .5), Y(1.25)], [X(-1.45 + k * .48), Y(1.85)]], sw * .4, C.beardDk, 'inkfine', .3);
      // the beard's mouth, between moustache and chin: shut, a line; talking, open with the voice
      const k = clamp(talkK);
      if (k < .12) inkLine([[X(-.75), Y(.2)], [X(.75), Y(.2)]], sw * 1.1, C.mouth, 'ink', .2);
      else paint(ellPts(X(0), Y(.25), .8 * fw * u, (.08 + .3 * k) * u, 14), { wash: C.mouth, ink: PAL.ink, sw: sw * .6 });
    }
  };
  // ---- sleeves, too long: each covers its arm and runs past the tip; a held piece sits in the near hand ----
  const sleeve = which => (u, sw) => {
    if (worn('hoodie')) {
      boilSeed('costume sleeve ' + which + view);
      paint(rrPts(-2.45 * u, -.62 * u, 2.95 * u, 1.24 * u, .4 * u), { wash: C.hoodie, ink: PAL.ink, sw: sw * .8 });
      paint(rrPts(.2 * u, -.6 * u, .5 * u, 1.2 * u, .3 * u), { wash: C.cuff, ink: PAL.ink, sw: sw * .7 });
    }
    const nearArm = view === 'side' ? 'L' : view === 'qback' ? 'L' : 'R';
    if (which === nearArm && c.held === 'beard') beardProp(1.0 * u, 0, u * .6, { inHand: true });
    if (which === nearArm && c.held === 'wig') wigProp(1.6 * u, -.3 * u, u * .45, { inHand: true });
  };
  return { draw, armL: sleeve('L'), armR: sleeve('R') };
}

// The ponytail, from (x, y) at the back of the head (in u), hanging down and a little outward (d = which way), fading
// from grey at the roots to a dark tip; a hair tie at the root. As axol-f's curtPonytail, on a block.
function costumePonytail(x, y, d, u, sw) {
  const sway = Math.sin(T * 2.1) * .12, P = [[x * u, y * u], [(x + d * .7) * u, (y + 1.2) * u], [(x + d * .85 + sway) * u, (y + 2.8) * u], [(x + d * .6 + sway * 2) * u, (y + 4.2) * u]];
  const Cc = through(P), n = Cc.length, w0 = u * (d ? 1.1 : 1.6), w1 = u * .3, bands = 6;
  for (let b = 0; b < bands; b++) {
    const i0 = Math.floor(b * (n - 1) / bands), i1 = Math.min(n - 1, Math.ceil((b + 1) * (n - 1) / bands) + 1);
    paint(ribbon(Cc.slice(i0, i1 + 1), lerp(w0, w1, i0 / (n - 1)), lerp(w0, w1, i1 / (n - 1))), { wash: mixCol(COSTUME.hair, COSTUME.ponyTip, (b + .5) / bands), ink: null });
  }
  paint(ribbon(P, w0, w1), { ink: PAL.ink, sw: sw * .7 });
  paint(ellPts((x + d * .12) * u, (y + .25) * u, u * .6, u * .2, 10), { wash: '#26222C', ink: PAL.ink, sw: sw * .5 });
}

function driverAs(x, y, u, o = {}) {
  const c = o.costume || {}, beardOn = (c.beard ?? 1) >= .5 && (VIEWS[o.view] || VIEWS.front).face;
  const parts = costumeParts(o.view || 'front', c, beardOn ? o.talk || 0 : 0);
  // with the beard on, Clawd's own mouth stays still; with it off, Clawd talks
  const mouth = beardOn ? null : clawdMouth(o.talk || 0, o.mouth ?? null);
  return clawd(x, y, u, { ...o, mouth, draw: parts.draw, armL: parts.armL, armR: parts.armR });
}

// A costume piece off the body, at (x, y), at the wearer's size u: on the desk, or in the air on its way there.
function beardProp(x, y, u, o = {}) {
  if (!o.inHand) boilSeed('beard prop');
  push(); translate(x, y); rotate(o.rot || 0);
  const X = v => v * u, Y = v => v * u;
  inkLine([[X(-2.0), Y(-.3)], [X(-2.9), Y(.5)], [X(-2.6), Y(1.5)], [X(-1.5), Y(2.1)]], u * .07, COSTUME.strap, 'inkfine', .5);   // the elastic, slack
  paint(BEARD_SHAPE.map(([x, y]) => [X(x), Y(y)]), { wash: COSTUME.beard, ink: PAL.ink, sw: u * .05, curv: .4 });
  paint(ribbon(MOUSTACHE.map(([x, y]) => [X(x), Y(y)]), .75 * u, .55 * u), { wash: COSTUME.beard, ink: PAL.ink, sw: u * .05 });
  pop();
}
function wigProp(x, y, u, o = {}) {
  if (!o.inHand) boilSeed('wig prop');
  push(); translate(x, y); rotate(o.rot || 0);
  costumePonytail(-4.2, -.2, -1, u, u * .06);
  const P = [[-5 * u, .4 * u], [-4.8 * u, -1.2 * u], [-3.2 * u, -1.8 * u], [0, -2 * u], [3.2 * u, -1.8 * u], [4.8 * u, -1.2 * u], [5 * u, .4 * u]];
  for (let k = 7; k >= 0; k--) P.push([lerp(-4.8, 4.8, k / 7) * u, (k % 2 ? -.2 : .3) * u]);
  paint(through(P, 4), { wash: COSTUME.hair, ink: PAL.ink, sw: u * .05, curv: .4 });
  pop();
}

// The costume's model sheet: node render.mjs --loop=costume --sheet=0,1,2,3 --cols=4 --w=640 --out=out/look/costume.jpg
// Row one: the five views, costumed. Row two: the beard talking (shut, half, wide), the beard in hand, both pieces on
// the desk, and Clawd unmasked and talking.
LOOPS.costume = t => {
  boilSeed('costume sheet ground');
  paint(rectPts(-40, -40, W + 80, H + 80), { wash: '#2A2530', ink: null });
  glow(300, 200, 900, '#FFD9A0', .35);
  const views = ['front', 'q', 'side', 'qback', 'back'], u = 26, talkK = [0, .5, 1, .8][Math.floor(t) % 4];
  views.forEach((v, i) => driverAs(220 + i * 370, 470, u, { ...feel('neutral', t), view: v, talk: talkK, boilKey: 'sheet ' + v, aL: -.3, aR: -.3 }));
  [0, .5, 1].forEach((k, i) => driverAs(220 + i * 370, 980, u, { ...feel('neutral', t), view: 'q', talk: k, boilKey: 'talk ' + i, aL: -.3, aR: -.3 }));
  driverAs(1330, 980, u, { ...feel('neutral', t), view: 'side', costume: { beard: 0, held: 'beard' }, aL: .6, boilKey: 'held' });
  beardProp(1600, 1000, u * .8, { rot: .2 }); wigProp(1800, 1010, u * .55, { rot: -.1 });
  driverAs(1720, 760, u * .8, { ...feel('happy', t), view: 'q', costume: { beard: 0, wig: 0 }, talk: talkK, boilKey: 'unmasked' });
};
LOOPS.costume.len = 4;
