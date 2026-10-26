// motifs.js: the film's recurring things (VIDEO_PLAN.md §2). Loaded after scene_kit.js.
//
//   clockAt(t)                     the desk clock's time at t: the send time of the last prompt that has landed
//                                  (script/prompt_times.yaml, carried on each prompt's line as l.sent), else the chapter's
//                                  clock0; '~' marks the log's estimates
//   flipClock(x, y, s, hhmm, o)    a flip clock on the desk; o.flip 0..1 folds the minutes' leaf over (a change)
//   envelope(x, y, s, o)           the predictions: o.card 0..1 (a card being written, face down), o.fold 0..1 (into the
//                                  envelope), o.seal 0..1 (the wax seal stamped), o.open 0..1 (torn open, ch 10)
//   hashSeal(x, y, s, k)           the seal close up: the SHA-256 lettered round it, in full
//   hourglass(x, y, s, k)          the driver's pacing rule: turned (k 0..1 of a turn) after each reply
//   promptBubble(x, y, w, txt, k)  a prompt landing in the chat: whole at once, no typing (k 0..1 the pop)
const PRED_SHA = '22530414d65b4abda43deb8cd2e6f952cb385683acf6d1fe950890fc72601ddf';   // predictions-run4.txt

function clockAt(t) {
  const c0 = window.CHAPTER && CHAPTER.clock0;
  let cur = c0 ? { sent: c0.replace('~', ''), approx: c0.startsWith('~') } : null, prev = null, at = 0;
  for (const l of CH_LINES) if (l.sent && l.t0 <= t) { prev = cur; cur = l; at = l.t0; }
  const hm = c => c ? (c.approx ? '~' : '') + c.sent.slice(0, 5) : '';
  return { now: hm(cur), was: hm(prev), since: t - at };
}

function flipClock(x, y, s, hhmm, o = {}) {
  boilSeed('flip clock');
  occupy(x - 120 * s, y - 80 * s, x + 120 * s, y + 10 * s, .4, 'clock');
  paint(rrPts(x - 118 * s, y - 78 * s, 236 * s, 82 * s, 10 * s), { wash: '#2C2830', ink: PAL.ink, sw: 1.1 });
  const [hh, mm] = hhmm.replace('~', '').split(':'), leaf = (cx, txt) => {
    paint(rrPts(cx - 46 * s, y - 70 * s, 92 * s, 66 * s, 6 * s), { wash: '#EDE6D6', ink: PAL.ink, sw: .8 });
    inkLine([[cx - 46 * s, y - 37 * s], [cx + 46 * s, y - 37 * s]], .8, '#8C8478', 'inkfine', 0);
    lab(txt, cx, y - 14 * s, 56 * s, '#2A2530');
  };
  leaf(x - 55 * s, hh); leaf(x + 55 * s, mm);
  if (o.flip > 0 && o.flip < 1) {   // the minutes' top leaf falling over its hinge
    const k = ease(o.flip), top = y - 70 * s, mid = y - 37 * s;
    paint([[x + 9 * s, lerp(top, mid, k)], [x + 101 * s, lerp(top, mid, k)], [x + 101 * s, mid], [x + 9 * s, mid]], { wash: '#E2DACA', ink: PAL.ink, sw: .8 });
  }
  if (hhmm.startsWith('~')) lab('~', x - 135 * s, y - 30 * s, 40 * s, '#EDE6D6');
}

function envelope(x, y, s, o = {}) {
  boilSeed('envelope ' + (o.key || ''));
  const w = 220 * s, h = 140 * s, fold = ease(clamp(o.fold ?? 1)), open = ease(clamp(o.open || 0));
  occupy(x - w / 2, y - h / 2, x + w / 2, y + h / 2, .6, 'envelope');
  push(); translate(x, y); rotate(o.rot || 0);
  // the card (face down: ten ruled lines, no words), sliding in as it folds
  if (o.card != null && fold < 1) {
    const cy = lerp(-h * 1.1, 0, fold), lines = Math.floor(clamp(o.card) * 10);
    paint(rrPts(-w * .42, cy - h * .45, w * .84, h * .9, 6 * s), { wash: '#FBF6E6', ink: PAL.ink, sw: .9 });
    for (let i = 0; i < lines; i++) inkLine([[-w * .36, cy - h * .36 + i * h * .08], [-w * .36 + w * (.4 + .3 * hash(i + 3)), cy - h * .36 + i * h * .08]], .9, '#4E5B78', 'inkfine', .3);
  }
  paint(rectPts(-w / 2, -h / 2, w, h), { wash: '#E9DFC6', ink: PAL.ink, sw: 1.1 });
  // the flap: open (up) until it folds shut; torn open in ch 10
  const flapY = lerp(-h * 1.0, h * .1, fold) - open * h * 1.1;
  paint([[-w / 2, -h / 2], [w / 2, -h / 2], [0, flapY]], { wash: '#DDD1B4', ink: PAL.ink, sw: 1 });
  inkLine([[-w / 2, h / 2], [0, h * .02], [w / 2, h / 2]], .9, '#8C8070', 'inkfine', .2);
  if (o.seal > 0 && open < .5) {
    const k = backOut(clamp(o.seal));
    paint(ellPts(0, h * .08, 26 * s * k, 26 * s * k, 16), { wash: '#A8322A', ink: PAL.ink, sw: .9 });
    paint(ellPts(0, h * .08, 15 * s * k, 15 * s * k, 12), { wash: '#C0493A', ink: null });
  }
  pop();
}

// the seal, close up: the hash in full, two rows of 32 round a wax disc (the commitment: what the envelope's card hashes to)
function hashSeal(x, y, s, k = 1) {
  boilSeed('hash seal');
  occupy(x - 620 * s, y - 230 * s, x + 620 * s, y + 230 * s, 1, 'seal');
  paint(rrPts(x - 610 * s, y - 220 * s, 1220 * s, 440 * s, 22 * s), { wash: '#E9DFC6', ink: PAL.ink, sw: 1.4 });
  const d = backOut(clamp(k * 3));
  paint(ellPts(x, y - 60 * s, 95 * s * d, 95 * s * d, 26), { wash: '#A8322A', ink: PAL.ink, sw: 1.4 });
  paint(ellPts(x, y - 60 * s, 60 * s * d, 60 * s * d, 20), { wash: '#C0493A', ink: null });
  const n = Math.floor(clamp((k - .25) / .75) * 64), font = `${Math.round(38 * s)}px "Courier New", monospace`;
  if (n > 0) lab(PRED_SHA.slice(0, Math.min(32, n)).padEnd(32, ' '), x, y + 95 * s, 38 * s, PAL.ink, { font });
  if (n > 32) lab(PRED_SHA.slice(32, n).padEnd(32, ' '), x, y + 150 * s, 38 * s, PAL.ink, { font });
  lab('SHA-256', x, y + 40 * s, 30 * s, '#6A5E50');
}

function hourglass(x, y, s, k = 0) {
  boilSeed('hourglass');
  occupy(x - 34 * s, y - 120 * s, x + 34 * s, y, .3, 'hourglass');
  push(); translate(x, y - 60 * s); rotate(Math.PI * ease(clamp(k)));
  paint(rectPts(-36 * s, -62 * s, 72 * s, 10 * s), { wash: '#6B4A36', ink: PAL.ink, sw: .9 });
  paint(rectPts(-36 * s, 52 * s, 72 * s, 10 * s), { wash: '#6B4A36', ink: PAL.ink, sw: .9 });
  paint([[-28 * s, -52 * s], [28 * s, -52 * s], [4 * s, 0], [28 * s, 52 * s], [-28 * s, 52 * s], [-4 * s, 0]], { wash: '#DCE6EE', washOp: 140, ink: PAL.ink, sw: .9 });
  paint([[-20 * s, 52 * s], [20 * s, 52 * s], [6 * s, 30 * s], [-6 * s, 30 * s]], { wash: '#D9B470', ink: null });
  pop();
}

// a prompt in the chat: it arrives whole (there's no typing, so no cursor and no half-written words), and pops
function promptBubble(x, y, w, txt, k = 1, o = {}) {
  if (k <= 0) return;
  boilSeed('prompt ' + txt.slice(0, 12));
  const size = o.size || 22, all = wrapLab(txt, w - 2 * size, size), cut = o.maxRows && all.length > o.maxRows;   // a long message shows its top, as a chat window would
  const rows = cut ? all.slice(0, o.maxRows) : all, h = rows.length * size * 1.3 + size, p = clamp(k * 3), dy = (1 - easeOut(p)) * size;
  occupy(x, y, x + w, y + h, .5, 'prompt');
  paint(rrPts(x, y + dy, w, h, size * .7), { wash: '#3A3440', washOp: 255 * p, ink: null });
  rows.forEach((r, i) => lab(r, x + size, y + dy + size * 1.15 + i * size * 1.3, size, '#EDE6D6', { align: 'left', alpha: p * (cut && i === rows.length - 1 ? .35 : 1) }));
}
// wrap lettering to a width (Patrick Hand at size): rows
function wrapLab(txt, w, size) {
  const ctx = (wrapLab.c ||= document.createElement('canvas').getContext('2d')); ctx.font = `${size}px "Patrick Hand", sans-serif`;
  const rows = [[]]; for (const word of txt.split(' ')) { const r = rows[rows.length - 1]; if (r.length && ctx.measureText([...r, word].join(' ')).width > w) rows.push([word]); else r.push(word); }
  return rows.map(r => r.join(' '));
}

// ---------- the side master: the reverse angle (VIDEO_PLAN.md §2) ----------
// Side on: the costumed driver on a stool at the desk's near end (left, warm lamp light), the target on the monitor
// (right, cool), the flip clock and the hourglass on the desk between them, the envelope at the driver's elbow.
//   sideMaster(t, o)
//     o.costume   driverAs's costume ({ beard, wig, held }); o.arm the near arm's angle (default: resting on the keys)
//     o.mood      the driver's face (feel/emotions); o.target the target's (default neutral, talking with its voice)
//     o.noDriver  an empty stool; o.screenOff the monitor dark (the coda)
//     o.envelope  envelope()'s options, or false; o.hourglass 0..1 (turned), o.clock false hides it
//     o.cam       [cx, cy, zoom] (default the wide frame, drifting); o.house 0..1 the overhead light; o.extra(t) after all
// SIDE has the layout, so a scene can aim a camera at the driver's face or fly a prop to the desk.
const SIDE = { driver: [560, 905, 34], deskY: 770, monitor: [1000, 170, 700, 430], clock: [1180, 770], glass: [1330, 770], env: [860, 762] };
function sideTipOf(a) { const [x, y, u] = SIDE.driver, r = .7 - a; return [x + 1.6 * u + 2.1 * u * Math.cos(r), y - 4.2 * u + 2.1 * u * Math.sin(r)]; }
function sideMaster(t, o = {}) {
  const cam = o.cam || [960, 540, 1], [DX, DY, DU] = SIDE.driver, DESK_Y = SIDE.deskY;
  camBegin(cam[0] + 5 * Math.sin(t * .3), cam[1] + 3 * Math.sin(t * .23), cam[2]);
  const house = o.house || 0;
  boilSeed('side wall');
  paint(rectPts(-200, -200, W + 400, H + 400), { wash: mixCol('#25212C', '#8A8070', house * .75), fill: mixCol('#2E2836', '#6E6658', house * .75), fillOp: 90, bleed: .2, tex: .6, ink: null });
  if (house > 0) { glow(W / 2, -200, 1600, '#FFF1D8', .6 * house); glow(W / 2, H * .5, 1400, '#FFF6E6', .18 * house); }
  // the window, black: a Sunday evening
  boilSeed('side window');
  paint(rectPts(110, 110, 300, 330), { wash: '#121725', ink: PAL.ink, sw: 1.6 });
  inkLine([[260, 112], [260, 438]], 3, '#3A3444', 'ink', 0); inkLine([[112, 275], [408, 275]], 3, '#3A3444', 'ink', 0);
  for (let i = 0; i < 5; i++) paint(ellPts(150 + hash(i) * 230, 140 + hash(i + 9) * 120, 2, 2, 6), { wash: '#D8DCEA', ink: null });
  // the monitor on its stand, the target in it (cheated toward us, as a stage set is)
  boilSeed('side monitor');
  const [mx, my, mw, mh] = SIDE.monitor;
  occupy(mx - 14, my - 14, mx + mw + 14, my + mh + 14, 1, 'monitor');
  paint(rectPts(mx + mw / 2 - 20, my + mh, 40, DESK_Y - my - mh), { wash: '#2A272E', ink: PAL.ink, sw: .9 });
  paint(rrPts(mx + mw / 2 - 110, DESK_Y - 14, 220, 18, 6), { wash: '#2A272E', ink: PAL.ink, sw: .9 });
  paint(rrPts(mx - 14, my - 14, mw + 28, mh + 28, 10), { wash: '#1A181D', ink: PAL.ink, sw: 1.2 });
  if (o.screenOff) paint(rectPts(mx, my, mw, mh), { wash: '#141218', ink: null });   // the coda: the chat closed
  else SCREEN_KINDS.claude(mx, my, mw, mh, t, { u: 22, prompt: o.prompt === undefined ? promptAt(t) : o.prompt,
    pose: { ...(o.target || feel('neutral', t)), mouth: clawdMouth(talkOf(t, 'target'), (o.target || {}).mouth) } });
  if (!o.screenOff) glow(mx + mw / 2, my + mh * .55, mw * .5, '#9DB8E8', .3);
  // the desk, side on, from the driver to under the monitor; the keyboard edge on; the lamp at the far end
  boilSeed('side desk');
  paint([[740, DESK_Y], [W + 60, DESK_Y], [W + 60, DESK_Y + 36], [740, DESK_Y + 36]], { wash: '#8A6444', fill: '#6E4E34', fillOp: 90, tex: .6, ink: PAL.ink, sw: 1.3 });
  paint(rectPts(770, DESK_Y + 36, 40, H), { wash: '#5E4230', ink: PAL.ink, sw: 1 });
  paint([[740, DESK_Y - 6], [930, DESK_Y - 6], [938, DESK_Y], [732, DESK_Y]], { wash: '#2E2B33', ink: PAL.ink, sw: .9 });
  boilSeed('side lamp');
  paint(rectPts(1790, DESK_Y - 12, 70, 12), { wash: '#3A3640', ink: PAL.ink, sw: .9 });
  inkLine([[1825, DESK_Y - 12], [1790, DESK_Y - 160], [1730, DESK_Y - 220]], 4, '#3A3640', 'ink', .3);
  paint([[1690, DESK_Y - 250], [1770, DESK_Y - 205], [1740, DESK_Y - 170], [1660, DESK_Y - 215]], { wash: '#C9A24A', ink: PAL.ink, sw: 1 });
  glow(1600, DESK_Y - 170, 900, '#FFC982', .45);
  glow(DX + 60, DY - 150, 420, '#FFC982', .25);
  if (o.clock !== false) { const c = clockAt(t); flipClock(SIDE.clock[0], SIDE.clock[1], .55, c.now, { flip: seg(c.since, 0, .35) }); }
  if (o.hourglass !== false) hourglass(SIDE.glass[0], SIDE.glass[1], .5, o.hourglass || 0);
  if (o.envelope !== false) envelope(SIDE.env[0], SIDE.env[1] - 6, .45, { seal: 1, rot: -.06, key: 'side', ...(o.envelope || {}) });
  // the stool, the driver
  boilSeed('side stool');
  paint(ellPts(DX, DY + 8, 170, 22, 20), { wash: '#4A3E48', ink: PAL.ink, sw: 1.1 });
  inkLine([[DX - 120, DY + 20], [DX - 150, H + 20]], 6, '#3A3040', 'ink', 0); inkLine([[DX + 120, DY + 20], [DX + 150, H + 20]], 6, '#3A3040', 'ink', 0);
  if (!o.noDriver) driverAs(DX, DY, DU, { ...(o.mood || feel('neutral', t)), view: 'side', lookX: .6, aL: o.arm ?? -.15, boilKey: 'side driver', talk: talkOf(t, 'driver'), costume: o.costume || {} });
  if (o.extra) o.extra(t);
  camEnd();
}
