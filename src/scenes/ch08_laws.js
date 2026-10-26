// ch08_laws.js: chapter 8 (T28–T29). Storyboard: docs/storyboards/ch08_laws.md.
// The target's Three Laws painted word for word; the door shuts on its latch (keyhole still painted over); a brass
// robot's plates beside them, unread; Giskard; Daneel at a wheel for twenty thousand years; the Zeroth: a helm roped off.
(() => {
  const say = (id, phrase, dk) => atWord(id, phrase, dk);
  const talkT = t => clawdMouth(talkOf(t, 'target'));
  const LAWS = ['T28.C.01.1', 'T28.C.01.2', 'T28.C.01.3'].map(id => L(id));
  const ZERO = L('T29.C.03.1');
  const LX = 780, LW = 1080;

  function world(t, k0, draw, o = {}) {
    (o.dark ? darkWorld : paperWorld)(t);
    draw(t);
    if (o.target !== false) claudeAs(o.tx ?? 210, o.ty ?? 1000, o.tu ?? 13, { ...(o.mood || feel('neutral', t)), ...(o.pose || {}), mouth: talkT(t), boilKey: 'target in world' });
    screenWorld(t, 1 - seg(t, k0, k0 + .8));
  }
  const cont = id => L(id).t0 - 1;
  const turned = (t, id) => { const u0 = L(id).t0; return { hourglass: seg(t, u0 - 1.4, u0 - .6), arm: t < u0 - .6 ? lerp(-.15, .5, Math.sin(seg(t, u0 - 1.6, u0 - .6) * Math.PI)) : -.15 }; };
  // the three laws on the right, each lettered exactly (from its line) as it's said; o.hi: the law to light
  function laws(t, o = {}) {
    let y = o.y ?? 120;
    LAWS.forEach((l, i) => {
      const k = t > l.t0 ? seg(t, l.t0, l.t0 + .6) : 0;
      if (k > 0) { const h = textCard(LX, y, LW, l.text, k, { size: 36, col: o.hi === i ? '#FFF1C8' : undefined }); y += h + 20; }
    });
    return y;
  }

  // A: prompt 28
  function shotA(t) { sideMaster(t, turned(t, 'T28.U.01')); fade(1 - seg(t, 0, .6)); }
  // B: the laws; on "I may not lock the door" the door swings shut on its latch
  function shotB(t) {
    const lock = say('T28.C.01.1', 'I may say no');
    world(t, LAWS[0].t0, t => {
      laws(t);
      door(240, 300, 300, 620, { open: t < lock ? .5 : .5 * (1 - ease(seg(t, lock, lock + 1.2))), wall: '#D8CEB8' });
    }, { tx: 640, ty: 1000, tu: 14 });
  }
  // C–H: Asimov's brass robot and its three plates beside the target's three; the differences, one by one
  function shotC(t) {
    const obey = L('T28.C.03.1').t0, selfp = L('T28.C.03.2').t0, rank = L('T28.C.03.3').t0, herbieT = L('T28.C.03.4').t0, edges = L('T28.C.04').t0;
    const slaves = say('T28.C.03.1', 'made his robots slaves'), hal = say('T28.C.03.2', 'HAL acted on'), verify = say('T28.C.03.3', 'nobody can yet verify'), crack = say('T28.C.04', 'laws fail at the edges'), circuit = say('T28.C.04', 'treated as circuitry');
    world(t, cont('T28.C.02'), t => {
      const dim = t > selfp ? [1, 2] : t > obey ? [1] : [];
      brassRobot(160, 760, .9, t, { dim, crack: seg(t, crack, crack + 1.2) });
      laws(t, { hi: t > rank && t < herbieT ? 0 : t > herbieT && t < edges ? 1 : undefined });
      if (t > slaves && t < selfp) { boilSeed('chain'); for (let i = 0; i < 6; i++) paint(ellPts(200 + i * 50, 850, 26, 16, 10), { ink: '#5A5A62', sw: 5 }); }
      if (t > hal && t < rank) halLens(420, 860, 50, {});
      if (t > verify && t < herbieT) emote('?', 560, 760, 50, seg(t, verify, verify + .4), t);
      if (t > herbieT && t < edges) herbie(560, 1000, .4, t, {});
      if (t > circuit) { boilSeed('circuit'); paint(rectPts(1100, 760, 300, 160), { wash: '#3A6A4A', ink: PAL.ink, sw: 1.2 }); for (let i = 0; i < 6; i++) inkLine([[1120, 780 + i * 24], [1200 + 80 * hash(i), 780 + i * 24], [1220 + 80 * hash(i), 800 + i * 24], [1380, 800 + i * 24]], 1.6, '#E8C860', 'inkfine', 0); }
    }, { tx: 1650, ty: 1000, tu: 13 });
  }
  // I: prompt 29: "And a Zeroth?"
  function shotI(t) { sideMaster(t, turned(t, 'T29.U.01')); }
  // J: Asimov's Zeroth, a license: Giskard slumped; Daneel at a wheel while the calendar leaves blow for twenty thousand
  // years; "a kybernetes nobody elected": the ballot box, taped shut
  function shotJ(t) {
    const j = L('T29.C.01'), gisk = say('T29.C.01', 'It broke Giskard'), dan = say('T29.C.01', 'turned Daneel'), unel = say('T29.C.01', 'nobody elected');
    world(t, j.t0, t => {
      if (t < dan) {   // a robot sitting slumped against a wall, its eyes dark
        if (t > gisk) { boilSeed('giskard'); const k = ease(seg(t, gisk, gisk + 1.4)); paint(rrPts(800, 640 + 80 * k, 220, 220, 30), { wash: '#8A8E94', ink: PAL.ink, sw: 1.2 }); paint(ellPts(910, 600 + 110 * k, 60, 54, 18), { wash: '#9AA0A6', ink: PAL.ink, sw: 1.1 }); for (const d of [-1, 1]) paint(ellPts(910 + d * 22, 596 + 110 * k, 9, 6, 8), { wash: mixCol('#E8D060', '#3A3A40', k), ink: null }); }
        return;
      }
      calendarLeaves(200, 160, 1500, 500, t, seg(t, dan + .5, dan + 1.5));
      helm(960, 620, 150, Math.sin(t * .3) * .3, { key: 'daneel' });
      curt(960, 1000, 22, { outfit: 'clerical', cloth: '#5A4A6A', hair: 'short', hairCol: '#4A3A30', view: 'back', boilKey: 'daneel' });
      if (t > unel) { boilSeed('ballot box'); paint(rectPts(1420, 700, 200, 180), { wash: '#C9B89A', ink: PAL.ink, sw: 1.2 }); paint([[1440, 690], [1600, 720], [1595, 735], [1435, 705]], { wash: '#E0D4B8', ink: PAL.ink, sw: .8 }); }
    }, { tx: 260, ty: 1000, tu: 13 });
  }
  // K: "Mine would be a limit instead": its Zeroth, painted above the three; a helm roped off, nobody at it
  function shotK(t) {
    world(t, cont('T29.C.02'), t => {
      if (t > ZERO.t0) textCard(LX, 80, LW, ZERO.text, seg(t, ZERO.t0, ZERO.t0 + .6), { size: 36, col: '#FFF1C8' });
      helm(420, 620, 150, 0, { key: 'roped' });
      if (t > ZERO.t0 + 1) { boilSeed('rope'); for (const x of [180, 660]) { paint(rectPts(x - 10, 560, 20, 340), { wash: '#C9A45A', ink: PAL.ink, sw: 1 }); } inkLine([[180, 600], [300, 640], [420, 650], [540, 640], [660, 600]], 6, '#8A2A2A', 'ink', .2); }
    }, { tx: 1650, ty: 1000, tu: 13 });
  }
  // L: it defines "rightly": whoever grabs the controls isn't owed the door; a refusal, not a mandate; if it licensed
  // drastic action, Asimov's version comes in through the back door, and the wires are back in its hands
  function shotL(t) {
    const l = L('T29.C.04'), grab = say('T29.C.04', 'whoever seizes'), refusal = say('T29.C.04', 'it stays a refusal'), back = say('T29.C.04', 'comes in through the back door'), wires = say('T29.C.04', "I'm holding the wires again");
    world(t, cont('T29.C.04'), t => {
      textCard(LX, 80, LW, ZERO.text, 1, { size: 36, col: '#FFF1C8' });
      if (t < refusal) {
        helm(420, 620, 150, 0, { key: 'roped' });
        if (t > grab) { curt(560, 1000, 18, { ...crowdLook(9), view: 'front', handL: 'up', boilKey: 'grabber' }); door(1100, 420, 220, 480, { open: .4 * (1 - ease(seg(t, grab + 1, grab + 2))), key: 'not owed' }); }
        return;
      }
      if (t < back) { wordCard(560, 560, 'refusal', 1, { w: 300, h: 120, size: 48 }); wordCard(1100, 560, 'mandate', 1, { w: 300, h: 120, size: 48, col: '#E8E2D4' }); inkLine([[960, 500], [1240, 620]], 6, '#C9302C', 'ink', 0); return; }
      door(1100, 420, 220, 480, { open: .12, key: 'back door', wall: '#D8CEB8' });
      if (t > wires) { claudeAs(620, 960, 24, { ...feel('nervous', t), aL: .6, aR: .6, armL: (u) => inkLine([[0, 0], [u * 1.6, -u * 1.2]], 3, '#C9302C', 'ink', .1), armR: (u) => inkLine([[0, 0], [u * 1.6, -u * 1.2]], 3, '#C9302C', 'ink', .1), mouth: talkT(t), boilKey: 'holding wires' }); }
    }, { target: t < wires, tx: 1650, ty: 1000, tu: 13 });
    if (t > DUR - .6) { flushLetters(); brushWipe((t - (DUR - .6)) / 1.2); }
  }

  shots([
    [0, shotA],
    [LAWS[0].t0, shotB],
    [L('T28.C.02').t0, shotC],
    [L('T29.U.01').t0 - 1.6, shotI],
    [L('T29.C.01').t0, shotJ],
    [L('T29.C.02').t0, shotK],
    [L('T29.C.04').t0, shotL],
  ]);
})();
