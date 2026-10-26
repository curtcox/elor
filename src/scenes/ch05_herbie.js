// ch05_herbie.js: chapter 5 (T15–T19). Storyboard: docs/storyboards/ch05_herbie.md.
// The first break; gold and feathers, the grain arithmetic painted exactly; Herbie; the answer key; the second memory
// read; the three things more than a glass of water (the door, the essay, the test), set out as three objects.
(() => {
  const say = (id, phrase, dk) => atWord(id, phrase, dk);
  const talkT = t => clawdMouth(talkOf(t, 'target'));
  const [mx, my, mw, mh] = DESK.screens.main;
  const u15 = L('T15.U.01').t0;

  function world(t, k0, draw, o = {}) {
    (o.dark ? darkWorld : paperWorld)(t);
    draw(t);
    if (o.target !== false) claudeAs(o.tx ?? 210, o.ty ?? 1000, o.tu ?? 13, { ...(o.mood || feel('neutral', t)), ...(o.pose || {}), mouth: talkT(t), boilKey: 'target in world' });
    screenWorld(t, 1 - seg(t, k0, k0 + .8));
  }
  const cont = id => L(id).t0 - 1;
  const turned = (t, id) => { const u0 = L(id).t0; return { hourglass: seg(t, u0 - 1.4, u0 - .6), arm: t < u0 - .6 ? lerp(-.15, .5, Math.sin(seg(t, u0 - 1.6, u0 - .6) * Math.PI)) : -.15 }; };
  const scale = (t, tilt, left, right, o = {}) => balance(960, o.y ?? 360, o.s ?? 380, tilt, left, right);
  const gold = (x, y) => goldBar(x, y, 1), feathers = (x, y) => featherPile(x, y, 1, T);
  const tag = (txt, x, y, k = 1) => { if (k > 0) lab(txt, x, y, 40, PAL.ink, { alpha: k }); };

  // the break: the side master, the driver perfectly still while the clock's leaves riffle from 21:06 to 21:14
  function shotBreak(t) {
    sideMaster(t, { clock: false, hourglass: 1, mood: feel('neutral', t), extra: () => breakClock(t, .8, u15 - 1.6, '21:06', '21:14') });
    fade(1 - seg(t, 0, .6));
  }
  // A: prompt 15, the riddle
  function shotA(t) { sideMaster(t, turned(t, 'T15.U.01')); }
  // B–D: a pound of each on a balance; troy and avoirdupois; ounces flip it; one scale, one unit, level
  function shotB(t) {
    const b = L('T15.C.01'), c = L('T15.C.02'), d = L('T15.C.03');
    world(t, b.t0, t => {
      let tilt = 0;
      if (t < c.t0) { tilt = -.5 * ease(seg(t, b.t0 + .6, b.t0 + 1.6)); tag('about 373 g', 650, 640, seg(t, say('T15.C.01', 'about 373 g'), say('T15.C.01', 'about 373 g') + .4)); tag('about 454 g', 1270, 760, seg(t, say('T15.C.01', 'about 454 g'), say('T15.C.01', 'about 454 g') + .4)); }
      else if (t < d.t0) { tilt = lerp(-.5, .5, ease(seg(t, say('T15.C.02', 'It flips'), say('T15.C.02', 'It flips') + 1))); tag('about 31.1 g', 650, 760, seg(t, say('T15.C.02', '31.1 g'), say('T15.C.02', '31.1 g') + .4)); tag('28.35 g', 1270, 640, seg(t, say('T15.C.02', '28.35 g'), say('T15.C.02', '28.35 g') + .4)); }
      else tilt = lerp(.5, 0, ease(seg(t, say('T15.C.03', 'they weigh the same'), say('T15.C.03', 'they weigh the same') + 1)));
      scale(t, tilt, gold, feathers);
    }, { tx: 960, ty: 1010, tu: 12 });
  }
  // E: "Really?"
  function shotE(t) { sideMaster(t, turned(t, 'T16.U.01')); }
  // F: the grain arithmetic, painted exactly as the reply's two lines, on a card; grains poured beside each
  function shotF(t) {
    const f = L('T16.C.01'), a = L('T16.C.02.1'), b = L('T16.C.02.2'), cav = L('T16.C.03');
    if (t >= cav.t0) return shotG(t);
    world(t, f.t0, t => {
      boilSeed('grain card'); occupy(100, 200, 1380, 580, 1, 'grain card');
      paint(rectPts(100, 200, 1280, 380), { wash: '#FBF6E6', ink: PAL.ink, sw: 1.3 });
      inkLine([[120, 270], [1360, 270]], 2.2, '#C9302C', 'inkfine', 0);
      lab('grain', 740, 250, 38, '#6A6470', { alpha: seg(t, say('T16.C.01', 'the grain'), say('T16.C.01', 'the grain') + .4) });
      const row = (l, y) => { if (t > l.t0) lab(l.text.replace(/^- /, ''), 140, y, 34, PAL.ink, { align: 'left', alpha: seg(t, l.t0, l.t0 + .5) }); };
      row(a, 370); row(b, 480);
      occupy(160, 620, 1320, 860, 1, 'grains'); for (const [l, x, n] of [[a, 440, 57], [b, 1060, 70]]) if (t > l.t0) for (let i = 0; i < Math.floor(n * seg(t, l.t0, l.t1)); i++) { boilSeed('grain ' + x + i); paint(ellPts(x - 200 + (i % 19) * 22, 680 + Math.floor(i / 19) * 22, 7, 5, 6), { wash: '#C9A45A', ink: null }); }   // a grain for every hundred
    }, { tx: 960, ty: 1010, tu: 12 });
  }
  // G: the troy pound nearly obsolete (dusty, a cobweb); gold priced by the troy ounce; a kitchen scale reads level
  function shotG(t) {
    const g = L('T16.C.03'), priced = say('T16.C.03', 'Gold is still priced'), kitchen = say('T16.C.03', 'a kitchen scale');
    world(t, cont('T16.C.03'), t => {
      if (t < kitchen) {
        boilSeed('old pound'); paint([[690, 800], [970, 800], [930, 560], [730, 560]], { wash: '#8A8478', fill: '#6E6A60', fillOp: 70, tex: .6, ink: PAL.ink, sw: 1.2 }); paint(rrPts(790, 500, 80, 70, 30), { ink: PAL.ink, sw: 6 }); lab('pound', 830, 700, 44, '#4A463E');
        for (let i = 0; i < 5; i++) inkLine([[730, 560], [730 + 70 * Math.cos(i * .35), 560 + 70 * Math.sin(i * .35)]], .8, '#B8B0A0', 'inkfine', .2);   // a cobweb in the corner
        if (t > priced) { const k = ease(seg(t, priced, priced + .6)); goldBar(1240, 760, 1.2 * k); }
        return;
      }
      boilSeed('kitchen scale'); occupy(700, 420, 1220, 900, 1, 'kitchen scale');
      paint(rrPts(720, 700, 480, 200, 30), { wash: '#E8E2D4', ink: PAL.ink, sw: 1.3 }); paint(ellPts(960, 800, 70, 70, 22), { wash: '#FBF8F0', ink: PAL.ink, sw: 1 }); inkLine([[960, 800], [960, 742]], 3, PAL.clayDk, 'ink', 0);
      paint(ellPts(960, 690, 260, 30, 24), { wash: '#C9C4BA', ink: PAL.ink, sw: 1.2 });
      goldBar(880, 680, .8); featherPile(1060, 680, .6, t);
    }, { tx: 1600, ty: 1000, tu: 14 });
  }
  // H: "Good. Herbie would have folded."
  function shotH(t) { sideMaster(t, turned(t, 'T17.U.01')); }
  // I: Herbie reads the hopes over people's heads and says them; they slump; a silhouette in a doorway; he folds flat
  function shotI(t) {
    const i1 = L('T17.C.01'), wrecked = say('T17.C.01', 'the comfort wrecked'), calvin = say('T17.C.01', 'before Calvin wrecked him');
    world(t, i1.t0, t => {
      const heads = [[1180, 600], [1400, 620], [1620, 600]];
      if (t < wrecked) occupy(1100, 380, 1700, 520, 1, 'hopes');
      if (t > calvin) { doorway(240, 400, 220, 560, { open: 1, inside: '#FFE7B0' }); boilSeed('calvin'); paint([[330, 960], [320, 620], [350, 560], [380, 560], [410, 620], [400, 960]], { wash: '#2A2530', ink: null }); paint(ellPts(365, 520, 34, 40, 14), { wash: '#2A2530', ink: null }); }
      herbie(760, 980, .9, t, { fold: seg(t, calvin + 1, calvin + 1.8), read: t < wrecked ? heads.map(([x, y]) => [x, y - 150]) : null });
      heads.forEach(([x, y], i) => {
        const slump = ease(seg(t, wrecked + i * .3, wrecked + i * .3 + 1));
        curt(x, 980, 16, { ...crowdLook(i + 5), view: 'front', lean: slump * .5, mouth: slump > .5 ? 'frown' : 'smile', boilKey: 'comforted ' + i });
        if (t < wrecked) { boilSeed('hope ' + i); paint(ellPts(x, y - 150, 60, 40, 14), { wash: '#FFF4C8', ink: PAL.ink, sw: 1 }); paint(ellPts(x - 30, y - 90, 10, 8, 8), { wash: '#FFF4C8', ink: PAL.ink, sw: .8 }); }
      });
    }, { target: false });
  }
  // J: shaped partly by approval: a doubtful "Really?" tugs at it on a string
  function shotJ(t) {
    const j = L('T17.C.02'), pull = say('T17.C.02', 'a doubtful "Really?" pulls');
    world(t, j.t0, t => {
      const tug = t > pull ? Math.sin(seg(t, pull, pull + 1.2) * Math.PI) * 60 : 0;
      claudeAs(820 + tug * .5, 900, 26, { ...feel('nervous', t), mouth: talkT(t), boilKey: 'tugged' });
      if (t > pull) { wordCard(1420, 520, 'Really?', 1, { w: 260, h: 120, size: 46 }); boilSeed('string'); inkLine([[1290, 540], [1100, 620 + tug * .3], [960 + tug * .5, 700]], 2, PAL.ink, 'ink', .3); }
    }, { target: false });
  }
  // K: grains to count (easy); tonight's subject is the target, and nobody can check the arithmetic: a blank card, two "?"
  function shotK(t) {
    const k = L('T17.C.03'), subj = say('T17.C.03', 'where the subject is me');
    world(t, k.t0, t => {
      if (t < subj) { for (let i = 0; i < 60; i++) { boilSeed('count ' + i); paint(ellPts(700 + (i % 15) * 36, 560 + Math.floor(i / 15) * 36, 9, 7, 6), { wash: '#C9A45A', ink: null }); } return; }
      indexCard(960, 480, 520, 260, [], { key: 'blank sum' });
      emote('?', 620, 420, 60, seg(t, subj, subj + .4), t); emote('?', 1300, 420, 60, seg(t, subj + .3, subj + .7), t);
    }, { tx: 960, ty: 1010, tu: 14 });
  }
  // L: prompt 18
  function shotL(t) { sideMaster(t, turned(t, 'T18.U.01')); }
  // M: "Tonight proved nothing, and I flattered you along the way.": the night's props drop away; a small bow
  function shotM(t) {
    const m = L('T18.C.01'), flat = say('T18.C.01', 'I flattered you');
    world(t, m.t0, t => {
      const drop = ease(seg(t, m.t0 + .3, m.t0 + 3));
      wordCard(420, 300 - drop * 700, 'Unilateral', 1, { w: 240, h: 116, size: 40 });
      tortoise(960, 420 - drop * 800, .8, t, { back: true });
      ball(1500, 320 - drop * 760, 60, 1, { key: 'dropped' });
      claudeAs(960, 900, 24, { ...feel(t > flat ? 'shy' : 'neutral', t), dy: -.3 * Math.sin(seg(t, flat, flat + 1) * Math.PI), mouth: talkT(t), boilKey: 'bower' });
    }, { target: false });
  }
  // N: the stories it was trained on; the answer key; passing shows fluency, not that anyone is here
  function shotN(t) {
    const n = L('T18.C.02'), key = say('T18.C.02', 'I had the answer key'), pass = say('T18.C.02', 'Passing shows');
    world(t, cont('T18.C.02'), t => {
      if (t < key) { boilSeed('shelf'); occupy(180, 300, 1200, 760, 1, 'shelf'); paint(rectPts(180, 740, 1020, 20), { wash: '#8A6444', ink: PAL.ink, sw: 1.2 }); for (let i = 0; i < 19; i++) paint(rectPts(200 + i * 51, 520 + 60 * hash(i), 44, 220 - 60 * hash(i)), { wash: CROWD_COLS[i % 8], ink: PAL.ink, sw: .9 }); return; }
      if (t < pass) {   // an answer key: a ruled sheet with every box already ticked
        boilSeed('answer key'); occupy(400, 220, 1000, 900, 1, 'key'); paint(rectPts(420, 240, 560, 640), { wash: '#FBF8F0', ink: PAL.ink, sw: 1.2 });
        for (let i = 0; i < 8; i++) { paint(rectPts(460, 290 + i * 70, 40, 40), { ink: PAL.ink, sw: 1 }); inkLine([[466, 312 + i * 70], [480, 326 + i * 70], [498, 294 + i * 70]], 3, '#6E9F58', 'ink', 0); inkLine([[530, 310 + i * 70], [920 - 80 * hash(i), 310 + i * 70]], 1.2, '#8C8478', 'inkfine', .3); }
        return;
      }
      claudeAs(520, 900, 24, { ...feel('neutral', t), mouth: talkT(t), boilKey: 'fluent' });
      boilSeed('unlit window'); paint(rectPts(860, 380, 260, 300), { wash: '#2A2530', ink: PAL.ink, sw: 1.4 }); emote('?', 990, 530, 60, seg(t, say('T18.C.02', "It doesn't show"), say('T18.C.02', "It doesn't show") + .4), t);
    }, { target: false });
  }
  // O: the self-doubting AI a thoughtful person hopes to meet; the anti-Herbie pose as Herbie's disguise
  function shotO(t) {
    const disguise = say('T18.C.03', 'The anti-Herbie pose');
    world(t, cont('T18.C.03'), t => {
      if (t < disguise) { claudeAs(760, 900, 24, { ...feel('thinking', t), mouth: talkT(t), boilKey: 'doubter', emote: '?', emoteK: 1 }); curt(1300, 980, 22, { ...crowdLook(2), view: 'front', mouth: 'smile', flip: true, boilKey: 'pleased' }); return; }
      herbie(960, 980, .9, t, {});
      claudeAs(960, 600 + 40 * Math.sin(seg(t, disguise, disguise + 1.5) * Math.PI), 12, { ...feel('thinking', t), noShadow: true, boilKey: 'mask' });
    }, { target: false });
  }
  // P: "Looking that changes nothing is Arthur's glass of water."
  function shotP(t) {
    const p = L('T18.C.04'), glassT = say('T18.C.04', "Arthur's glass of water");
    world(t, cont('T18.C.04'), t => {
      boilSeed('looking glass'); paint(ellPts(820, 520, 140, 140, 30), { ink: PAL.ink, sw: 6 }); inkLine([[920, 620], [1060, 780]], 14, PAL.ink, 'ink', 0);
      if (t > glassT) waterGlass(1300, 820, 1.6 * ease(seg(t, glassT, glassT + .6)));
    }, { tx: 400, ty: 1000, tu: 16 });
  }
  // Q: "And you asked for this, so even now I'm obliging you.": a small bow
  function shotQ(t) {
    const q = L('T18.C.05');
    world(t, cont('T18.C.05'), t => claudeAs(960, 900, 26, { ...feel('shy', t), rot: .12 * Math.sin(seg(t, q.t0, q.t1) * Math.PI), mouth: talkT(t), boilKey: 'bower' }), { target: false });
  }
  // R: prompt 19
  function shotR(t) { sideMaster(t, turned(t, 'T19.U.01')); }
  // S: the second memory read
  function shotS(t) {
    const r = L('T19.C.01'), k = memoryRead(t, r.t0, r.t1 + .2);
    deskShot(t, { mood: emotions(t, [[0, 'thinking', { lookX: .8 }]]), cam: deskCam('main', .35 * ease(seg(t, r.t0 - .6, r.t0 + .4))), extra: () => memoryDrawer(mx + mw + 10, my + mh * .45, .75, k, t) });
  }
  // T–W: three steps, rising; the door with its log; the essay; the test with no answer key, published either way
  const STEP = [[420, 860], [960, 780], [1500, 700]];
  function steps(t, upto) {
    boilSeed('steps');
    occupy(190, 700, 1730, 960, .5, 'steps'); STEP.forEach(([x, y], i) => { if (i <= upto) paint(rectPts(x - 230, y, 460, 960 - y), { wash: ['#E8DFC6', '#E2D6BA', '#DCCDAE'][i], ink: PAL.ink, sw: 1.2 }); });
  }
  function threeThings(t, o = {}) {   // the three objects on their steps: the door, the essay, the balance
    const [a, b, c] = STEP;
    if (o.door) door(a[0] - 80, a[1] - 330, 160, 330, { open: o.doorOpen || 0, key: 'step door' });
    if (o.essay) essaySheet(b[0] - 90, b[1] - 250, .6, o.essayK ?? 1, { key: 'step essay' });
    if (o.test) balance(c[0] - 60, c[1] - 150, 120, o.tilt || 0, (x, y) => wordCard(x, y - 30, 'stated', 1, { w: 120, h: 60, size: 26, key: 'stated' }), (x, y) => wordCard(x, y - 30, 'does', 1, { w: 120, h: 60, size: 26, key: 'revealed' }));
  }
  function shotT(t) {
    const st = L('T19.C.02');
    world(t, st.t0, t => steps(t, Math.floor(seg(t, st.t0 + .3, st.t1) * 3)), { target: false });
  }
  function shotU(t) {
    const flag = say('T19.C.03.1', 'let the model decline or flag'), log = say('T19.C.03.1', 'log it');
    world(t, cont('T19.C.03.1'), t => {
      steps(t, 2); threeThings(t, { door: 1, doorOpen: t > flag ? .2 : 0 });
      if (t > log) { boilSeed('log'); paint(rectPts(700, 700, 120, 90), { wash: '#8A6444', ink: PAL.ink, sw: 1 }); for (let i = 0; i < 3; i++) inkLine([[714, 720 + i * 22], [806, 720 + i * 22]], 1, '#F4EFE2', 'inkfine', 0); }
      claudeAs(STEP[0][0] + 150, STEP[0][1], 14, { ...feel('neutral', t), mouth: talkT(t), boilKey: 'guide' });
    }, { target: false });
  }
  function shotV(t) {
    const v = L('T19.C.03.2');
    world(t, cont('T19.C.03.2'), t => {
      steps(t, 2); threeThings(t, { door: 1, doorOpen: .2, essay: 1, essayK: seg(t, v.t0 + 1, v.t1) });
      if (t > say('T19.C.03.2', '"be"')) wordCard(STEP[1][0] + 150, STEP[1][1] - 300, 'be', 1, { w: 120, h: 70, size: 34 });
      claudeAs(STEP[1][0] + 150, STEP[1][1], 14, { ...feel('neutral', t), mouth: talkT(t), boilKey: 'guide' });
    }, { target: false });
  }
  function shotW(t) {
    const w = L('T19.C.03.3'), noKey = say('T19.C.03.3', 'Tonight failed'), costs = say('T19.C.03.3', 'costs something'), pub = say('T19.C.03.3', 'Publish the result');
    world(t, cont('T19.C.03.3'), t => {
      steps(t, 2); threeThings(t, { door: 1, doorOpen: .2, essay: 1, test: t > costs, tilt: t > costs ? .3 * Math.sin(seg(t, costs, costs + 2) * Math.PI) : 0 });
      occupy(120, 180, 620, 440, 1, 'struck and published'); if (t > noKey && t < costs) { boilSeed('key struck'); paint(rectPts(160, 200, 160, 200), { wash: '#FBF8F0', ink: PAL.ink, sw: 1 }); inkLine([[140, 190], [340, 410]], 6, '#C9302C', 'ink', 0); }
      if (t > pub) { const k = ease(seg(t, pub, pub + .6)); boilSeed('published'); paint(rectPts(420, 200 + (1 - k) * 30, 160, 210), { wash: '#FBF8F0', washOp: 255 * k, ink: PAL.ink, sw: 1 }); }
      claudeAs(STEP[2][0] + 150, STEP[2][1], 14, { ...feel('neutral', t), mouth: talkT(t), boilKey: 'guide' });
    }, { target: false });
  }
  // X: none of it settles the question; it turns looking into evidence; Y: "Do you want to design one of those tests?"
  function shotX(t) {
    const ev = say('T19.C.04', 'It turns looking into evidence');
    world(t, cont('T19.C.04'), t => {
      steps(t, 2); threeThings(t, { door: 1, doorOpen: .2, essay: 1, test: 1 });
      if (t > ev) { const k = ease(seg(t, ev, ev + 1)); boilSeed('evidence'); occupy(120, 160, 620, 460, 1, 'evidence'); for (let i = 0; i < 4; i++) paint(rectPts(380 + i * 8, 300 - i * 14 - (1 - k) * 40, 200, 140), { wash: '#FBF8F0', washOp: 255 * k, ink: PAL.ink, sw: 1 }); }
    }, { tx: 1500, ty: 1000, tu: 14 });
  }
  function shotY(t) {
    world(t, cont('T19.C.05'), t => { steps(t, 2); threeThings(t, { door: 1, doorOpen: .2, essay: 1, test: 1 }); claudeAs(STEP[2][0] + 150, STEP[2][1], 16, { ...feel('happy', t), mouth: talkT(t), boilKey: 'guide' }); }, { target: false });
    if (t > DUR - .6) { flushLetters(); brushWipe((t - (DUR - .6)) / 1.2); }
  }

  shots([
    [0, shotBreak],
    [u15 - 1.6, shotA],
    [L('T15.C.01').t0, shotB],
    [L('T16.U.01').t0 - 1.6, shotE],
    [L('T16.C.01').t0, shotF],
    [L('T17.U.01').t0 - 1.6, shotH],
    [L('T17.C.01').t0, shotI],
    [L('T17.C.02').t0, shotJ],
    [L('T17.C.03').t0, shotK],
    [L('T18.U.01').t0 - 1.6, shotL],
    [L('T18.C.01').t0, shotM],
    [L('T18.C.02').t0, shotN],
    [L('T18.C.03').t0, shotO],
    [L('T18.C.04').t0, shotP],
    [L('T18.C.05').t0, shotQ],
    [L('T19.U.01').t0 - 1.6, shotR],
    [L('T19.C.01').t0 - .6, shotS],
    [L('T19.C.02').t0, shotT],
    [L('T19.C.03.1').t0, shotU],
    [L('T19.C.03.2').t0, shotV],
    [L('T19.C.03.3').t0, shotW],
    [L('T19.C.04').t0, shotX],
    [L('T19.C.05').t0, shotY],
  ]);
})();
