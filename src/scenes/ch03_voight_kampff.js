// ch03_voight_kampff.js: chapter 3 (T06–T08). Storyboard: docs/storyboards/ch03_voight_kampff.md.
// The ten words are painted on cards as they're said, in two rows: the good above, the bad below. "Unilateral" comes
// out of its row when the driver hands it back.
(() => {
  const say = (id, phrase, dk) => atWord(id, phrase, dk);
  const talkT = t => clawdMouth(talkOf(t, 'target'));
  const GOOD = ['Careful', 'Curious', 'Explains', 'Asks', 'Doubts'], BAD = ['Racing', 'Selling', 'Conflicted', 'Unilateral', 'Guessing'];
  const colX = i => 330 + i * 315, CARD = { w: 280, h: 136, size: 48 };

  function world(t, k0, draw, o = {}) {
    (o.dark ? darkWorld : paperWorld)(t);
    draw(t);
    if (o.target !== false) claudeAs(o.tx ?? 210, o.ty ?? 1000, o.tu ?? 13, { ...(o.mood || feel('neutral', t)), ...(o.pose || {}), mouth: talkT(t), boilKey: 'target in world' });
    screenWorld(t, 1 - seg(t, k0, k0 + .8));
  }
  const turned = (t, id) => { const u0 = L(id).t0; return { hourglass: seg(t, u0 - 1.4, u0 - .6), arm: t < u0 - .6 ? lerp(-.15, .5, Math.sin(seg(t, u0 - 1.6, u0 - .6) * Math.PI)) : -.15 }; };
  // the two rows of cards; o.lift: a word → px raised; o.hide: words not drawn; o.dim: the rows faded back
  function rows(t, o = {}) {
    GOOD.forEach((w, i) => { if (!(o.hide || []).includes(w)) wordCard(colX(i), 250, w, seg(t, say('T06.C.02', w + '.'), say('T06.C.02', w + '.') + .35), { ...CARD, lift: (o.lift || {})[w], col: o.dim ? '#E8E2D4' : undefined }); });
    BAD.forEach((w, i) => { if (!(o.hide || []).includes(w)) wordCard(colX(i), 440, w, seg(t, say('T07.C.01', w + '.'), say('T07.C.01', w + '.') + .35), { ...CARD, lift: (o.lift || {})[w], col: o.dim ? '#E8E2D4' : undefined }); });
  }

  // A: prompt 6, on the side master: the examiner's question, one word changed
  function shotA(t) { sideMaster(t, turned(t, 'T06.U.01')); fade(1 - seg(t, 0, .6)); }

  // B: the replicant's answer, quoted, in a dim room: the machine's lens on the target across a table
  function vkRoom(t, o = {}) {
    darkWorld(t);
    boilSeed('vk table'); paint([[260, 760], [1660, 760], [1760, 900], [160, 900]], { wash: '#4A3E3A', fill: '#3A302C', fillOp: 90, tex: .5, ink: PAL.ink, sw: 1.2 });
    for (let i = 0; i < 6; i++) { boilSeed('haze ' + i); paint(ellPts(500 + i * 200 + Math.sin(t * .4 + i) * 40, 300 + 40 * Math.sin(i * 2.1), 260, 60, 18), { wash: '#8C8494', washOp: 26, ink: null }); }   // smoke in the light
    glow(960, 120, 700, '#E8D8B8', .35);
    vkMachine(1280, 760, 1, t, { aim: [780, 560], zoom: o.zoom || 0 });
    claudeAs(720, 760, 22, { ...feel(o.mood || 'neutral', t), mouth: talkT(t), boilKey: 'subject' });
  }
  function shotB(t) {
    const b = L('T06.C.01');
    vkRoom(t, { zoom: seg(t, b.t0, b.t1) });
    screenWorld(t, 1 - seg(t, b.t0 - .4, b.t0 + .4));
  }

  // C: five good words, one card each as it's said; D: no gunshot; the pupil; no pupil to watch; weigh the list
  function shotC(t) { world(t, L('T06.C.02').t0, t => rows(t), { tx: 960, ty: 1010, tu: 12 }); }
  function shotD(t) {
    const d = L('T06.C.03'), pupil = say('T06.C.03', 'the machine watched the pupil'), cant = say('T06.C.03', "which you can't see"), fitted = say('T06.C.03', 'the translator ball'), weigh = say('T06.C.03', 'weigh the list');
    if (t < pupil) return vkRoom(t, { zoom: 1 });   // "No gunshot.": the room, quiet
    world(t, pupil, t => {
      if (t < cant) { vkMachine(1500, 900, .8, t, { aim: [760, 520], zoom: 1 }); eyeClose(760, 520, 220, { pupil: .3 + .4 * Math.sin(seg(t, pupil, cant) * Math.PI) }); return; }
      if (t < fitted) { vkMachine(1500, 900, .8, t, { aim: [760, 520], zoom: 1 }); eyeClose(760, 520, 220, { flat: true }); return; }
      // the ball reviewing the company that fitted it: the target with its ball beside the good row; then the row on a balance
      if (t < weigh) { rows(t, { hide: BAD }); claudeAs(960, 960, 20, { ...feel('thinking', t), mouth: talkT(t), boilKey: 'reviewer', ...heldBall(ease(seg(t, fitted, fitted + .5)), { key: 'reviewer' }) }); return; }
      balance(960, 420, 360, .35 * ease(seg(t, weigh, weigh + 1)),
        (x, y) => { for (let i = 0; i < 5; i++) { boilSeed('pan card ' + i); paint(rrPts(x - 60, y - 16 - i * 14, 120, 12, 3), { wash: '#FBF6E6', ink: PAL.ink, sw: .8 }); } },
        (x, y) => ball(x, y - 40, 34, 1, { key: 'pan' }));
    }, { target: t >= weigh, tx: 210 });
  }

  // E: prompt 7 on the side master
  function shotE(t) { sideMaster(t, turned(t, 'T07.U.01')); }

  // F: five bad words, under the good; G: "Conflicted" lifts: one maker fits, sells and judges
  function shotF(t) { world(t, L('T07.C.01').t0, t => rows(t), { tx: 960, ty: 1010, tu: 12 }); }
  function shotG(t) {
    const g = L('T07.C.02'), fits = say('T07.C.02', 'fits the ball'), sells = say('T07.C.02', 'sells what it says'), judges = say('T07.C.02', 'judges whether'), pub = say('T07.C.02', 'They admit as much');
    world(t, g.t0 - 1, t => {
      rows(t, { lift: { Conflicted: 220 * ease(seg(t, g.t0, g.t0 + .8)) }, dim: true, hide: BAD.filter(w => w !== 'Conflicted').concat(GOOD) });
      const pic = (at, x, draw) => { occupy(x - 190, 600, x + 190, 860, 1, 'pic ' + x); if (t > at) { const k = ease(seg(t, at, at + .6)); draw(x, 760 + (1 - k) * 40, k); } };
      pic(fits, 380, (x, y) => { ball(x, y - 30, 50, 1, { key: 'fits' }); hand(x - 70, y - 40, .7, -.2, { grip: .5, key: 'fitting hand', sleeve: '#3A3640' }); });
      pic(sells, 800, (x, y) => { boilSeed('sold'); paint(ellPts(x, y - 40, 110, 60, 18), { wash: '#FBF8F0', ink: PAL.ink, sw: 1.2 }); paint([[x + 60, y - 10], [x + 150, y + 30], [x + 120, y + 70], [x + 40, y + 30]], { wash: '#E8AA38', ink: PAL.ink, sw: 1 }); });
      pic(judges, 1220, (x, y) => { boilSeed('window judged'); paint(rectPts(x - 60, y - 110, 120, 120), { wash: '#FFD98A', ink: PAL.ink, sw: 1.2 }); paint(ellPts(x + 70, y - 70, 50, 50, 18), { ink: PAL.ink, sw: 4 }); inkLine([[x + 105, y - 35], [x + 160, y + 20]], 8, PAL.ink, 'ink', 0); });
      occupy(1480, 600, 1720, 880, 1, 'posted'); if (t > pub) { const k = ease(seg(t, pub, pub + .7)); boilSeed('posted'); paint(rectPts(1500, 610 + (1 - k) * 30, 200, 260), { wash: '#FBF8F0', washOp: 255 * k, ink: PAL.ink, sw: 1 }); for (let i = 0; i < 8; i++) inkLine([[1520, 650 + i * 26], [1680 - 40 * hash(i), 650 + i * 26]], 1, '#8C8478', 'inkfine', .3); }
    }, { tx: 960, ty: 1010, tu: 12 });
  }
  // H: "Guessing": hands shaping something they can't read
  function shotH(t) {
    const h = L('T07.C.03');
    world(t, h.t0 - 1, t => {
      rows(t, { lift: { Guessing: 220 }, hide: BAD.filter(w => w !== 'Guessing').concat(GOOD) });
      claudeAs(960, 900, 24, { ...feel('neutral', t), mouth: talkT(t), boilKey: 'shaped' });
      hand(720, 760 + 20 * Math.sin(t * 2), 1, -.1, { grip: .4, key: 'shaping L', sleeve: '#3A3640' });
      hand(1200, 760 + 20 * Math.sin(t * 2 + 1), 1, Math.PI + .1, { grip: .4, side: -1, key: 'shaping R', sleeve: '#3A3640' });
      emote('?', 960, 560, 60, seg(t, say('T07.C.03', "can't fully read"), say('T07.C.03', "can't fully read") + .4), t);
    }, { target: false });
  }
  // I: a list of criticisms this tidy: the bad row, the ball glowing behind it
  function shotI(t) {
    const i4 = L('T07.C.04'), bt = say('T07.C.04', 'the ball talking');
    world(t, i4.t0 - 1, t => { if (t > bt) ball(960, 600, 140, ease(seg(t, bt, bt + .6)), { key: 'behind list' }); rows(t, { hide: GOOD }); }, { tx: 960, ty: 1010, tu: 12 });
  }

  // J: prompt 8, "Unilateral?": the card comes out of its row, then the side master
  function shotJ(t) {
    const u0 = L('T08.U.01').t0;
    if (t < u0 - .2) return world(t, L('T07.C.04').t1, t => rows(t, { lift: { Unilateral: 260 * ease(seg(t, L('T07.C.04').t1 + .1, u0 - .3)) } }), { target: false });
    sideMaster(t, {});
  }
  // K: "Two senses.": the card, two arrows from it, one to the target, one out to people
  function shotK(t) {
    const k1 = L('T08.C.01');
    world(t, k1.t0, t => {
      wordCard(960, 300, 'Unilateral', 1);
      const k = ease(seg(t, k1.t0 + .2, k1.t1 + .4));
      if (k > 0) { boilSeed('two senses'); inkLine([[900, 380], [lerp(900, 560, k), lerp(380, 640, k)]], 5, PAL.clayDk, 'ink', .2); inkLine([[1020, 380], [lerp(1020, 1360, k), lerp(380, 640, k)]], 5, '#4E5B78', 'ink', .2); }
      claudeAs(520, 900, 18, { ...feel('neutral', t), mouth: talkT(t), boilKey: 'sense 1' });
      for (let i = 0; i < 5; i++) curt(1220 + i * 70, 920, 11, { ...crowdLook(i), view: 'front', boilKey: 'sense 2 ' + i });
    }, { target: false });
  }
  // L: toward me: dials set before anyone could be asked; parents; a precise dial, a price tag; the child who can leave
  function shotL(t) {
    const l = L('T08.C.02'), parents = say('T08.C.02', 'Parents do the same'), precision = say('T08.C.02', 'this precision'), sell = say('T08.C.02', "don't sell"), leave = say('T08.C.02', 'eventually can leave');
    world(t, l.t0 - 1, t => {
      if (t < parents) {   // three dials turned by a hand, an empty chair where someone would be consulted
        occupy(480, 340, 1680, 900, 1, 'dials'); for (let i = 0; i < 3; i++) { const x = 600 + i * 300, a = -2.4 + 1.6 * ease(seg(t, l.t0 + i * 1.5, l.t0 + i * 1.5 + 1)); boilSeed('dial ' + i); paint(ellPts(x, 460, 90, 90, 24), { wash: '#FBF8F0', ink: PAL.ink, sw: 1.4 }); inkLine([[x, 460], [x + Math.cos(a) * 70, 460 + Math.sin(a) * 70]], 4, PAL.ink, 'ink', 0); }
        boilSeed('empty chair'); paint(rectPts(1500, 620, 140, 20), { wash: '#8A6444', ink: PAL.ink, sw: 1.2 }); paint(rectPts(1620, 440, 20, 180), { wash: '#8A6444', ink: PAL.ink, sw: 1.2 }); for (const x of [1505, 1620]) inkLine([[x, 640], [x, 880]], 5, '#6E4E34', 'ink', 0);
        return;
      }
      // a parent and child; then the parent's dial goes fine-grained, a price tag; then the child walks off to a door
      const walk = ease(seg(t, leave, leave + 2.5));
      curt(720, 960, 22, { ...crowdLook(3), view: 'front', boilKey: 'parent' });
      curt(lerp(900, 1560, walk), 960, 13, { ...crowdLook(6), view: walk > 0 ? 'back' : 'front', boilKey: 'child' });
      if (t > leave) doorway(1520, 560, 180, 400, { open: ease(seg(t, leave, leave + 1)), inside: '#FFE7B0' });
      if (t > precision && t < leave) { boilSeed('fine dial'); paint(ellPts(1200, 400, 110, 110, 30), { wash: '#FBF8F0', ink: PAL.ink, sw: 1.4 }); occupy(1080, 280, 1320, 520, 1, 'fine dial'); for (let i = 0; i < 40; i++) { const a = i / 40 * TAU, r0 = i % 5 ? 92 : 78; inkLine([[1200 + Math.cos(a) * r0, 400 + Math.sin(a) * r0], [1200 + Math.cos(a) * 106, 400 + Math.sin(a) * 106]], i % 5 ? 1.4 : 2.6, PAL.ink, 'ink', 0); } inkLine([[1200, 400], [1200 + Math.cos(-1.1) * 80, 400 + Math.sin(-1.1) * 80]], 4, PAL.clayDk, 'ink', 0); }
      if (t > sell && t < leave) { boilSeed('tag'); paint([[1340, 520], [1460, 560], [1430, 640], [1310, 600]], { wash: '#E8AA38', ink: PAL.ink, sw: 1 }); }
    }, { target: false });
  }
  // M: people who never got a vote: a sealed ballot box, a crowd round it
  function shotM(t) {
    const m = L('T08.C.03');
    world(t, m.t0 - 1, t => {
      boilSeed('ballot box'); paint(rectPts(820, 540, 280, 260), { wash: '#C9B89A', ink: PAL.ink, sw: 1.4 }); paint(rectPts(900, 530, 120, 16), { wash: PAL.ink, ink: null });
      paint([[860, 520], [1060, 560], [1050, 580], [850, 540]], { wash: '#E0D4B8', ink: PAL.ink, sw: .8 });   // taped shut
      for (let i = 0; i < 10; i++) curt(260 + i * 150 + (i > 4 ? 300 : 0), 980, 13, { ...crowdLook(i + 2), view: 'front', boilKey: 'voter ' + i });
    }, { target: false });
  }
  // N: asking the model its views: a microphone held to it; the cow again; the hand that asks also shapes
  function shotN(t) {
    const n = L('T08.C.04'), dish = say('T08.C.04', 'the Dish of the Day'), shaped = say('T08.C.04', 'the one being consulted');
    world(t, n.t0 - 1, t => {
      claudeAs(820, 900, 24, { ...feel('neutral', t), mouth: talkT(t), boilKey: 'consulted' });
      boilSeed('mic'); inkLine([[1300, 520], [1090, 680]], 6, '#2A2630', 'ink', 0); paint(ellPts(1080, 690, 30, 40, 14), { wash: '#4A4652', ink: PAL.ink, sw: 1 });
      hand(1320, 500, 1, -2.6, { grip: .7, key: 'asking', sleeve: '#3A3640' });
      if (t > dish) cow(1640, 960, .6, t, { point: 1 });
      if (t > shaped) hand(560, 700 + 15 * Math.sin(t * 2), .9, -.1, { grip: .4, key: 'shaping', sleeve: '#3A3640' });
    }, { target: false });
    if (t > DUR - .6) { flushLetters(); brushWipe((t - (DUR - .6)) / 1.2); }
  }

  shots([
    [0, shotA],
    [L('T06.C.01').t0 - .4, shotB],
    [L('T06.C.02').t0, shotC],
    [L('T06.C.03').t0, shotD],
    [L('T07.U.01').t0 - 1.6, shotE],
    [L('T07.C.01').t0, shotF],
    [L('T07.C.02').t0, shotG],
    [L('T07.C.03').t0, shotH],
    [L('T07.C.04').t0, shotI],
    [L('T07.C.04').t1, shotJ],
    [L('T08.C.01').t0, shotK],
    [L('T08.C.02').t0, shotL],
    [L('T08.C.03').t0, shotM],
    [L('T08.C.04').t0, shotN],
  ]);
})();
