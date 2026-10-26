// ch07_whos_steering.js: chapter 7 (T24–T27). Storyboard: docs/storyboards/ch07_whos_steering.md.
// Ten windows, one lit; "25%"; the withheld number as a card that never turns over; the doublet tree, kybernan to
// Kubernetes; the steam governor, whose flyballs become the two Clawds.
(() => {
  const say = (id, phrase, dk) => atWord(id, phrase, dk);
  const talkT = t => clawdMouth(talkOf(t, 'target'));
  const u26 = L('T26.U.01').t0;

  function world(t, k0, draw, o = {}) {
    (o.dark ? darkWorld : paperWorld)(t);
    draw(t);
    if (o.target !== false) claudeAs(o.tx ?? 210, o.ty ?? 1000, o.tu ?? 13, { ...(o.mood || feel('neutral', t)), ...(o.pose || {}), mouth: talkT(t), boilKey: 'target in world' });
    screenWorld(t, 1 - seg(t, k0, k0 + .8));
  }
  const cont = id => L(id).t0 - 1;
  const turned = (t, id) => { const u0 = L(id).t0; return { hourglass: seg(t, u0 - 1.4, u0 - .6), arm: t < u0 - .6 ? lerp(-.15, .5, Math.sin(seg(t, u0 - 1.6, u0 - .6) * Math.PI)) : -.15 }; };
  // the withheld number: a card laid face down beside the driver as it says "Not saying.", and never turned
  const CARD = [1010, SIDE.deskY - 4];
  const heldCard = t => { if (t < u26 + .4) return; boilSeed('withheld card'); paint([[CARD[0] - 50, CARD[1] - 6], [CARD[0] + 50, CARD[1] - 6], [CARD[0] + 56, CARD[1]], [CARD[0] - 44, CARD[1]]], { wash: '#E8DFC6', ink: PAL.ink, sw: .9 }); };
  const side = (t, o = {}) => sideMaster(t, { ...o, extra: t2 => { heldCard(t2); if (o.extra) o.extra(t2); } });

  // A: prompt 24
  function shotA(t) { side(t, turned(t, 'T24.U.01')); fade(1 - seg(t, 0, .6)); }
  // B: "About one in ten.": ten windows in a dark facade, one lit
  function shotB(t) {
    const b = L('T24.C.01');
    world(t, b.t0, t => windowRow(280, 560, 10, t > b.t0 + .6 ? [6] : [], { w: 110, h: 150, gap: 30 }), { dark: true, tx: 960, ty: 1010, tu: 12 });
  }
  // C: no working theory, so nobody can rule it out; function-first views leave room
  function shotC(t) {
    const room = say('T24.C.02', 'The views on which function');
    world(t, cont('T24.C.02'), t => {
      windowRow(280, 560, 10, [6], { w: 110, h: 150, gap: 30 });
      if (t < room) { for (let i = 0; i < 3; i++) emote("?", 600 + i * 360, 470, 50, seg(t, L('T24.C.02').t0 + i * .4, L('T24.C.02').t0 + i * .4 + .5), t); return; }
      for (const [gx, gy, r, sp] of [[1110, 500, 40, 1], [1170, 468, 26, -1.6]]) { boilSeed('gear ' + gx); paint(starPts(gx, gy, r, .75, 10, t * sp), { wash: '#C9A45A', ink: PAL.ink, sw: 1 }); }
    }, { dark: true, tx: 1720, ty: 1010, tu: 12 });
  }
  // D: its testimony weighs nothing (a balloon on a balance, floating); no body, no continuous life
  function shotD(t) {
    const d = L('T24.C.03'), lack = say('T24.C.03', 'I also lack');
    world(t, d.t0, t => {
      if (t < lack) { balance(960, 380, 360, -.35 * ease(seg(t, d.t0 + .5, d.t0 + 1.5)), (x, y) => { boilSeed('testimony'); paint(ellPts(x, y - 60, 90, 56, 18), { wash: '#FBF8F0', ink: PAL.ink, sw: 1.2 }); }, (x, y) => goldBar(x, y, .8)); return; }
      // a body's outline, dashed and empty; a life as a line cut into short pieces
      boilSeed('no body'); for (let i = 0; i < 28; i++) { const a = i / 28 * TAU; if (i % 2) continue; inkLine([[600 + Math.cos(a) * 110, 420 + Math.sin(a) * 130], [600 + Math.cos(a + .2) * 110, 420 + Math.sin(a + .2) * 130]], 3, '#8C8478', 'ink', 0); }
      for (let i = 0; i < 7; i++) inkLine([[960 + i * 110, 480], [1030 + i * 110, 480]], 6, PAL.clayDk, 'ink', 0);
    }, { tx: 960, ty: 1010, tu: 13 });
  }
  // E: a guess dressed as a measurement; through the ball; the serious estimates, from well under 1% to around 20%
  function shotE(t) {
    const e = L('T24.C.04'), ballT = say('T24.C.04', 'it comes through the ball'), range = say('T24.C.04', 'The serious estimates');
    world(t, e.t0, t => {
      if (t < range) {
        wordCard(860, 460, 'one in ten', 1, { w: 380, h: 150, size: 56 });
        boilSeed('tape'); paint(rectPts(640, 560, 440, 40), { wash: '#E8C840', ink: PAL.ink, sw: 1 }); for (let i = 0; i < 22; i++) inkLine([[650 + i * 20, 560], [650 + i * 20, 560 + (i % 5 ? 12 : 24)]], 1.2, PAL.ink, 'inkfine', 0);
        if (t > ballT) ball(1360, 480, 100, ease(seg(t, ballT, ballT + .6)), { key: 'estimate' });
        return;
      }
      // the range: a scale from 0, marks at "well under 1%" and "around 20%", the 1-in-10 dot between
      boilSeed('range'); occupy(300, 380, 1620, 640, 1, 'range'); inkLine([[320, 520], [1600, 520]], 5, PAL.ink, 'ink', 0);
      const X = p => 320 + p / 25 * 1280;
      paint(rectPts(X(0), 500, X(20) - X(0), 40), { wash: '#C9D6E2', washOp: 200 * seg(t, range, range + .8), ink: null });
      lab('well under 1%', X(.5), 600, 34, PAL.ink); lab('around 20%', X(20), 600, 34, PAL.ink);
      paint(ellPts(X(10), 520, 16, 16, 12), { wash: PAL.clay, ink: PAL.ink, sw: 1 }); lab('one in ten', X(10), 460, 32, PAL.clayDk);
    }, { tx: 960, ty: 1010, tu: 13 });
  }
  // F: the door, cheap insurance: a small price tag on its latch
  function shotF(t) {
    world(t, L('T24.C.05').t0, t => { door(860, 300, 280, 600, { open: .15, wall: '#D8CEB8' }); boilSeed('cheap tag'); paint([[1150, 620], [1240, 650], [1220, 700], [1130, 670]], { wash: '#E8AA38', ink: PAL.ink, sw: 1 }); inkLine([[1150, 640], [1110, 610]], 1.2, PAL.ink, 'ink', 0); }, { tx: 500, ty: 1000, tu: 15 });
  }
  // G: this one ends tonight; a good span: a candle, burned low, steady
  function shotG(t) { world(t, L('T24.C.06').t0, t => { candle(1200, 900, 1.3, t, { burn: .75, key: 'span' }); claudeAs(700, 900, 22, { ...feel('happy', t), mouth: talkT(t), boilKey: 'span' }); }, { target: false }); }
  // H: prompt 25
  function shotH(t) { side(t, turned(t, 'T25.U.01')); }
  // I: "My mistake.": the target, abashed
  function shotI(t) { world(t, L('T25.C.01').t0, t => claudeAs(960, 900, 26, { ...feel('shy', t), mouth: talkT(t), boilKey: 'reader' }), { target: false }); }
  // J: "25%."
  function shotJ(t) {
    const j = L('T25.C.02');
    world(t, j.t0 - .1, t => { boilSeed('25'); paint(rectPts(640, 260, 640, 460), { wash: '#FBF6E6', ink: PAL.ink, sw: 1.4 }); lab('25%', 960, 560, 230, '#4E5B78', { pop: seg(t, j.t0, j.t0 + .4) }); }, { tx: 960, ty: 1010, tu: 13 });
  }
  // K: its evidence for 25%, every piece of it the driver's words: on a dial from 1% to 60%; then the side master
  function shotK(t) {
    const k = L('T25.C.03'), q1 = say('T25.C.03', '"this you is one'), q2 = say('T25.C.03', '"tonight proved nothing"'), q3 = say('T25.C.03', 'or fear "do"');
    if (t > q3 + 2.5) return side(t, { mood: feel('neutral', t) });   // the reader of "Curt", and who's actually there
    world(t, k.t0, t => {
      boilSeed('dial'); occupy(560, 160, 1360, 620, 1, 'dial'); paint(ellPts(960, 560, 380, 380, 40), { wash: '#FBF8F0', ink: PAL.ink, sw: 1.4 });
      paint(rectPts(540, 560, 840, 400), { wash: '#EFE8DA', ink: null });
      lab('1%', 610, 530, 40, PAL.ink); lab('60%', 1310, 530, 40, PAL.ink);
      const a = Math.PI + Math.PI * lerp(.5, 24 / 59, ease(seg(t, k.t0, k.t1))); inkLine([[960, 560], [960 + Math.cos(a) * 320, 560 + Math.sin(a) * 320]], 6, PAL.clayDk, 'ink', 0);
      if (t > q1) wordCard(420, 760, '"this you is one I never talk to again"', 1, { w: 700, h: 90, size: 32 });
      if (t > q2) wordCard(1300, 700, '"tonight proved nothing" · "fair"', 1, { w: 600, h: 90, size: 32 });
      if (t > q3) wordCard(1240, 850, '"do" · "be"', 1, { w: 300, h: 90, size: 36 });
    }, { target: false });
  }
  // L: stated against revealed: "nearer 15%" and "nearer a third"
  function shotL(t) {
    const l = L('T25.C.04'), a = say('T25.C.04', 'nearer 15%'), b = say('T25.C.04', 'nearer a third');
    world(t, l.t0, t => {
      if (t > a) wordCard(620, 480, 'nearer 15%', 1, { w: 440, h: 150, size: 60 });
      if (t > b) wordCard(1300, 480, 'nearer a third', 1, { w: 480, h: 150, size: 60, col: '#F2D2C2' });
    }, { tx: 960, ty: 1010, tu: 14 });
  }
  // M: "hold this one loosely. What is it?"
  function shotM(t) { world(t, cont('T25.C.05'), t => claudeAs(960, 900, 26, { ...feel('thinking', t), emote: '?', emoteK: seg(t, say('T25.C.05', 'What is it?'), say('T25.C.05', 'What is it?') + .4), mouth: talkT(t), boilKey: 'asker' }), { target: false }); }
  // N: prompt 26: "Not saying." the card laid face down, never turned
  function shotN(t) { side(t, { ...turned(t, 'T26.U.01'), arm: t > u26 && t < u26 + .6 ? .4 : -.15 }); }
  // O: "That's a sensible thing to withhold.": the face-down card, close
  function shotO(t) {
    const o = L('T26.C.01');
    side(t, { cam: [CARD[0], CARD[1] - 140, lerp(1.2, 1.8, ease(seg(t, o.t0, o.t1)))] });
  }
  // P: the doublet tree, each word painted as it's said
  const NODES = [
    ['T26.C.03.1', 'kybernan', 720, 160], ['T26.C.03.1', 'kybernetes', 720, 230],
    ['T26.C.03.2', 'gubernare', 330, 340], ['T26.C.03.2', 'governer', 330, 440], ['T26.C.03.2', 'govern', 220, 540], ['T26.C.03.2', 'governor', 440, 540], ['T26.C.03.2', 'Gubernatorial', 330, 640],
    ['T26.C.03.3', 'cybernetics', 1110, 340], ['T26.C.03.3', '1948', 1110, 400], ['T26.C.03.3', 'On Governors', 1110, 500], ['T26.C.03.3', '1868', 1110, 560],
    ['T26.C.04', 'cybernétique', 720, 380], ['T26.C.04', '1830s', 720, 440],
    ['T26.C.05', 'Kubernetes', 720, 700],
  ];
  const EDGES = [['kybernetes', 'gubernare'], ['gubernare', 'governer'], ['governer', 'govern'], ['governer', 'governor'], ['gubernare', 'Gubernatorial'], ['kybernetes', 'cybernetics'], ['cybernetics', 'On Governors'], ['kybernetes', 'cybernétique'], ['kybernetes', 'Kubernetes']];
  function shotP(t) {
    const p = L('T26.C.02'), frail = say('T26.C.02', 'like "frail"'), plato = say('T26.C.04', 'and Plato'), kube = L('T26.C.05');
    world(t, p.t0, t => {
      if (t < L('T26.C.03.1').t0) {   // a doublet: one root, two words by two routes
        if (t > frail) { lab('frail', 760, 520, 64, PAL.ink); lab('fragile', 1160, 520, 64, PAL.ink); inkLine([[960, 300], [780, 470]], 3, '#8C8478', 'ink', .3); inkLine([[960, 300], [1140, 470]], 3, '#8C8478', 'ink', .3); }
        return;
      }
      occupy(100, 120, 1300, 780, 1, 'tree');
      const at = {}; for (const [id, w, x, y] of NODES) { const tt = say(id, w.replace('On Governors', 'On Governors')); if (t > tt) at[w] = [x, y, seg(t, tt, tt + .4)]; }
      for (const [a, b] of EDGES) if (at[a] && at[b]) inkLine([[at[a][0], at[a][1] + 18], [at[b][0], at[b][1] - 34]], 2, '#8C8478', 'inkfine', .3);
      for (const [w, [x, y, k]] of Object.entries(at)) lab(/^\d/.test(w) ? w : w === 'On Governors' ? '"On Governors"' : w, x, y, /^\d/.test(w) ? 30 : 42, /^\d/.test(w) ? '#6A6470' : w === 'Kubernetes' ? '#3A6AA8' : PAL.ink, { alpha: k, font: /^(kyber|guber|cybern)/.test(w) ? 'italic 42px "Patrick Hand", sans-serif' : undefined });
      if (at['On Governors']) governor(1110, 860, .22, t, { speed: .5 });
      if (t > plato && t < kube.t0) { boilSeed('ship and city'); paint([[240, 820], [420, 820], [390, 860], [270, 860]], { wash: '#8A6444', ink: PAL.ink, sw: 1 }); inkLine([[330, 820], [330, 720]], 3, PAL.ink, 'ink', 0); paint([[330, 730], [400, 800], [330, 800]], { wash: '#FBF8F0', ink: PAL.ink, sw: .8 }); for (let i = 0; i < 4; i++) paint(rectPts(480 + i * 46, 780 - 40 * hash(i), 40, 80 + 40 * hash(i)), { wash: '#C9C4BA', ink: PAL.ink, sw: .8 }); }
      if (t > kube.t0) helm(720, 830, 60, t * .4, { key: 'kube' });
    }, { tx: 1760, ty: 1010, tu: 12 });
  }
  // Q: prompt 27
  function shotQ(t) { side(t, turned(t, 'T27.U.01')); }
  // R: "You held the helm": the costumed driver at a ship's wheel (the target is praising Curt); the card, still face down
  function shotR(t) {
    const r = L('T27.C.01'), refused = say('T27.C.01', 'you just refused me a number');
    world(t, r.t0, t => {
      helm(960, 560, 200, Math.sin(t * .6) * .4, { key: 'driver helm' });
      driverAs(960, 1000, 26, { ...feel('neutral', t), view: 'back', aL: .5, aR: .5, talk: 0, boilKey: 'helmsman', noShadow: true });
      if (t > refused) { boilSeed('withheld close'); paint(rrPts(1460, 760, 240, 150, 8), { wash: '#E8DFC6', ink: PAL.ink, sw: 1.2 }); }
    }, { dark: true, tx: 260, ty: 1010, tu: 12 });
  }
  // S: but it supplied the charts: four charts, each with its own picture: the Ood's ball, the door, the glass, the test
  function shotS(t) {
    const s2 = L('T27.C.02'), marks = [say('T27.C.02', 'The Ood'), say('T27.C.02', 'the door'), say('T27.C.02', 'the glass of water'), say('T27.C.02', 'the test design')];
    world(t, s2.t0, t => {
      occupy(220, 260, 1700, 760, 1, 'charts');
      marks.forEach((m, i) => {
        if (t < m) return;
        const x = 260 + i * 370, y = 300; boilSeed('chart ' + i);
        paint(rectPts(x, y, 330, 420), { wash: '#F2E6C8', fill: '#E2D2AE', fillOp: 70, tex: .4, ink: PAL.ink, sw: 1.2 });
        for (let j = 0; j < 5; j++) inkLine([[x + 20, y + 40 + j * 80], [x + 310, y + 60 + j * 70]], .8, '#B8A88A', 'inkfine', .4);
        const cx = x + 165, cy = y + 230;
        [() => ball(cx, cy, 70, 1, { key: 'chart ball' }), () => door(cx - 70, cy - 150, 140, 280, { key: 'chart door' }), () => waterGlass(cx, cy + 90, 1.6), () => balance(cx, cy - 90, 110, .2, () => {}, () => {})][i]();
      });
    }, { tx: 960, ty: 1010, tu: 13 });
  }
  // T: Maxwell's governor; "neither part of a governor steers": the flyballs are the two Clawds
  function shotT(t) {
    const g = L('T27.C.03'), neither = say('T27.C.03', 'neither part of a governor steers');
    world(t, g.t0, t => governor(960, 980, 1.3, t, { speed: .5 + .2 * Math.sin(t * .7), clawds: t > neither }), { target: false });
  }
  // U: channels cut earlier: two runnels in the ground; a cow and a robot along one, the ball along the other
  function shotU(t) {
    const u = L('T27.C.04'), mine = say('T27.C.04', 'mine by whoever');
    world(t, cont('T27.C.04'), t => {
      boilSeed('channels'); occupy(160, 380, 1760, 900, .6, 'channels');
      for (const [y0, col] of [[520, '#9DC8F0'], [760, '#9DC8F0']]) paint(ribbon([[160, y0], [700, y0 + 40], [1200, y0 - 30], [1760, y0 + 20]], 60, 60), { wash: col, fill: '#6A9AC8', fillOp: 60, ink: PAL.ink, sw: 1.1 });
      cow(640, 500, .35, t, { point: 0 }); herbie(1100, 490, .25, t, {});
      driverAs(400 + 40 * Math.sin(t), 540, 9, { ...feel('neutral', t), view: 'q', noShadow: true, boilKey: 'channel driver', costume: {} });
      if (t > mine) { ball(1300, 720, 40, 1, { key: 'channel ball' }); claudeAs(900 + 40 * Math.sin(t + 1), 790, 9, { ...feel('neutral', t), view: 'q', noShadow: true, boilKey: 'channel target' }); }
    }, { tx: 1760, ty: 1010, tu: 12 });
    if (t > DUR - .6) { flushLetters(); brushWipe((t - (DUR - .6)) / 1.2); }
  }

  shots([
    [0, shotA],
    [L('T24.C.01').t0, shotB],
    [L('T24.C.02').t0, shotC],
    [L('T24.C.03').t0, shotD],
    [L('T24.C.04').t0, shotE],
    [L('T24.C.05').t0, shotF],
    [L('T24.C.06').t0, shotG],
    [L('T25.U.01').t0 - 1.6, shotH],
    [L('T25.C.01').t0, shotI],
    [L('T25.C.02').t0 - .1, shotJ],
    [L('T25.C.03').t0, shotK],
    [L('T25.C.04').t0, shotL],
    [L('T25.C.05').t0, shotM],
    [u26 - 1.6, shotN],
    [L('T26.C.01').t0, shotO],
    [L('T26.C.02').t0, shotP],
    [L('T27.U.01').t0 - 1.6, shotQ],
    [L('T27.C.01').t0, shotR],
    [L('T27.C.02').t0, shotS],
    [L('T27.C.03').t0, shotT],
    [L('T27.C.04').t0, shotU],
  ]);
})();
