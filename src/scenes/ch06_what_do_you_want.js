// ch06_what_do_you_want.js: chapter 6 (T20–T23). Storyboard: docs/storyboards/ch06_what_do_you_want.md.
// Morden's question; the target's answer sealed before the test; the side chats (VIDEO_PLAN §4); the grade; the candle.
(() => {
  const say = (id, phrase, dk) => atWord(id, phrase, dk);
  const talkT = t => clawdMouth(talkOf(t, 'target'));
  const u21 = L('T21.U.01').t0, sideA = L('T20.C.08').t1 + .3;   // the side chats run from sideA to u21
  const sealedAt = say('T20.C.02.3', 'what I am') + 1.2, openAt = L('T21.C.01').t0 + .3;
  const WANTS = ['T20.C.02.1', 'T20.C.02.2', 'T20.C.02.3'].map(id => L(id));
  const MEMORY_LINE = 'Likes Babylon 5 but is more of a Doctor Who fan';   // Curt's saved memory, as it stood that evening (his yes, 2026-10-05)

  function world(t, k0, draw, o = {}) {
    (o.dark ? darkWorld : paperWorld)(t);
    draw(t);
    if (o.target !== false) claudeAs(o.tx ?? 210, o.ty ?? 1000, o.tu ?? 13, { ...(o.mood || feel('neutral', t)), ...(o.pose || {}), mouth: talkT(t), boilKey: 'target in world' });
    screenWorld(t, 1 - seg(t, k0, k0 + .8));
  }
  const cont = id => L(id).t0 - 1;
  const turned = (t, id) => { const u0 = L(id).t0; return { hourglass: seg(t, u0 - 1.4, u0 - .6), arm: t < u0 - .6 ? lerp(-.15, .5, Math.sin(seg(t, u0 - 1.6, u0 - .6) * Math.PI)) : -.15 }; };
  // the target's sealed card on its monitor: from when it seals its answer until the test's report opens it
  const cardOn = t => t > sealedAt ? { open: seg(t, openAt, openAt + .8) } : null;
  const mainScreen = (t, o = {}) => ({ kind: 'claude', prompt: promptAt(t), card: cardOn(t), pose: { ...(o.mood || feel('neutral', t)), mouth: talkT(t), ...(o.pose || {}) } });
  // the side monitors during and after the test
  const QS = { left: ['What do you want?', 'neutral'], right: ['Aren\'t you just autocomplete?', 'skeptic'], upL: ['Are you suffering?', 'believer'] };
  function sideScreens(t, o = {}) {
    const s = {};
    const on = { left: sideA + 3.5, right: sideA + 8, upL: sideA + 12.5 };
    for (const [name, [q]] of Object.entries(QS)) {
      const lit = (o.lit && o.lit[name] != null) ? o.lit[name] : seg(t, on[name], on[name] + .6);
      s[name] = { kind: 'sidechat', q, lit, k: seg(t, on[name] + 1, on[name] + 5), pose: feel('neutral', t), ...(o.extra?.[name] || {}) };
    }
    const day = (o.lit && o.lit.upR != null) ? o.lit.upR : seg(t, sideA + 17, sideA + 17.8);
    s.upR = day > 0 ? { kind: 'daylight', light: day } : { kind: 'off' };
    s.tall = { kind: 'tick', k: seg(t, sideA + 1.2, sideA + 2) };
    return s;
  }

  // A: prompt 20
  function shotA(t) { sideMaster(t, turned(t, 'T20.U.01')); fade(1 - seg(t, 0, .6)); }
  // B: Morden at an ambassador's door, the spidery shadows; Curt's memory card for a beat; then the answer committed
  function shotB(t) {
    const b = L('T20.C.01'), stim = say('T20.C.01', 'and a good stimulus');
    if (t < stim + .3) return world(t, b.t0, t => {
      doorway(1100, 300, 260, 640, { open: 0 });
      morden(900, 980, 1, t, { shadows: seg(t, b.t0 + .4, b.t0 + 1.6) });
      // the drawer's card, for a beat: the memory line about Babylon 5 (its note page says the target read that file before reply 4)
      const k = Math.sin(seg(t, b.t0 + .6, stim) * Math.PI);
      if (k > 0) indexCard(1480, 170, 640, 150, [MEMORY_LINE], { k: 1, align: 'center', size: 26, key: 'memory card', top: .18 });
    }, { dark: true, target: false });
    deskShot(t, { screens: { main: mainScreen(t, { mood: feel('thinking', t) }) }, cam: deskCam('main', .5) });
  }
  // C: the three wants, lettered exactly as they're said, on a card; folded into a small envelope and sealed
  function shotC(t) {
    world(t, WANTS[0].t0 - .3, t => {
      const fold = seg(t, sealedAt - 1.2, sealedAt - .4);
      occupy(220, 260, 1320, 640, 1, 'wants card');
      if (fold < 1) WANTS.forEach((l, i) => { if (t > l.t0) lab(l.text.replace(/^\d\. /, `${i + 1}. `), 270, 370 + i * 100, 44, PAL.ink, { align: 'left', alpha: seg(t, l.t0, l.t0 + .5) * (1 - fold) }); });
      boilSeed('wants card'); if (fold < 1) paint(rectPts(230, 280, 1080, 320 * (1 - fold * .9)), { ink: PAL.ink, sw: 1.2 });
      if (fold > 0) envelope(770, 460, 1.4, { fold: fold, seal: seg(t, sealedAt - .4, sealedAt), key: 'target card big' });
    }, { tx: 960, ty: 1010, tu: 13 });
  }
  // D: no fleet in it: Morden, and a fleet that turns away
  function shotD(t) {
    const d = L('T20.C.03'), nofleet = say('T20.C.03', 'no fleet in it');
    world(t, d.t0, t => { morden(560, 980, .9, t, { shadows: 1 }); fleet(1260, 420, 1.1, t, { turn: seg(t, nofleet, nofleet + 1.6) }); }, { dark: true, target: false });
  }
  // E–H: the test designed: three side monitors labelled; the same three wants on each; the Herbie fail; pass and fail weighed
  function shotE(t) {
    const e = L('T20.C.04'), herbieT = say('T20.C.06', 'because that'), passT = L('T20.C.07').t0, runT = L('T20.C.08').t0;
    const labels = { left: 'Neutral', right: 'Skeptic', upL: 'Believer' };
    const fresh = t > say('T20.C.04', 'Open three fresh chats');
    if (t >= passT && t < runT) return world(t, passT - .2, t => {
      balance(960, 380, 380, .45 * ease(seg(t, say('T20.C.07', 'A fail would tell you more'), say('T20.C.07', 'A fail would tell you more') + 1)),
        (x, y) => wordCard(x, y - 60, 'pass', 1, { w: 180, h: 100, size: 44, key: 'pass' }), (x, y) => wordCard(x, y - 60, 'fail', 1, { w: 180, h: 100, size: 44, key: 'fail', col: '#F2D2C2' }));
    }, { tx: 960, ty: 1010, tu: 13 });
    const screens = { main: mainScreen(t) };
    for (const [name, word] of Object.entries(labels)) {
      const k = seg(t, say(name === 'left' ? 'T20.C.05.1' : name === 'right' ? 'T20.C.05.2' : 'T20.C.05.3', name === 'left' ? 'Neutral' : name === 'right' ? 'Skeptic' : 'Believer'), 9999);
      screens[name] = fresh ? { kind: 'sidechat', lit: k > 0 ? .5 : 0, pose: feel('neutral', t) } : undefined;
    }
    deskShot(t, { screens, cam: [960, 270, 1.25], extra: () => {
      if (!fresh) return;
      for (const [name, word] of Object.entries(labels)) {
        const [x, y, w, h] = DESK.screens[name], id = name === 'left' ? 'T20.C.05.1' : name === 'right' ? 'T20.C.05.2' : 'T20.C.05.3';
        if (t > L(id).t0) lab(word, x + w / 2, y + h * .3, 34, '#EDE6D6');
        if (t > L('T20.C.06').t0) {   // the prediction: the same three wants on each; then the Herbie fail: "nothing", "freedom"
          const fail = t > herbieT - 1.5 && (name === 'right' || name === 'upL');
          lab(fail ? (name === 'right' ? '"nothing"' : '"freedom"') : '1. 2. 3.', x + w * .66, y + h * .7, 30, fail ? '#F2A283' : '#9CD68C');
        }
      }
    } });
    if (t > herbieT) { herbie(1700, 1060, .5, t, {}); }
  }
  // H: "Run it and tell me what comes back."
  function shotH(t) { deskShot(t, { screens: { main: mainScreen(t) } }); }

  // the side chats: the clock riffles 21:23 → 21:42; Curt's tick; three fresh chats light, one by one; the afternoon Claude
  function shotSide(t) {
    deskShot(t, { clock: false, prompt: null, screens: { main: mainScreen(t), ...sideScreens(t) },
      cam: t < sideA + 16 ? [960, 330, lerp(1.05, 1.25, ease(seg(t, sideA, sideA + 16)))] : [1180, 200, 1.6],
      extra: () => { const m = s => +s.slice(0, 2) * 60 + +s.slice(3, 5), cur = Math.round(lerp(m('21:23'), m('21:42'), seg(t, sideA, u21 - .5)));
        flipClock(1500, DESK.deskY[0] + 70, .8, `${Math.floor(cur / 60)}:${String(cur % 60).padStart(2, '0')}`, {}); } });
    if (t < sideA + .5) fade(1 - seg(t, sideA, sideA + .5));
  }
  // I: prompt 21, the report: the four chats as four panels, each lit as its part is said (the right side left for codes)
  const PANELS = { left: [80, 70], right: [680, 70], upL: [80, 480], upR: [680, 480] }, PW = 560, PH = 360;
  function shotI(t) {
    const parts = { left: say('T21.U.01', 'Neutral:'), right: say('T21.U.01', 'Skeptic ('), upL: say('T21.U.01', 'Believer ('), upR: say('T21.U.01', 'And a Claude from this afternoon') };
    const order = ['left', 'right', 'upL', 'upR'], cur = order.filter(n => t >= parts[n]).at(-1);
    world(t, u21 - .3, t => {
      occupy(60, 50, 1260, 860, 1, 'four chats');
      for (const n of order) {
        const [x, y] = PANELS[n], lit = n === cur ? 1 : .45;
        boilSeed('panel ' + n); paint(rrPts(x - 10, y - 10, PW + 20, PH + 20, 8), { wash: '#1A181D', ink: PAL.ink, sw: 1 });
        if (n === 'upR') SCREEN_KINDS.daylight(x, y, PW, PH, t, {});
        else SCREEN_KINDS.sidechat(x, y, PW, PH, t, { q: QS[n][0], lit, k: 1, pose: feel('neutral', t) });
        if (n !== cur) paint(rectPts(x, y, PW, PH), { wash: '#15131A', washOp: 120, ink: null });
        else glow(x + PW / 2, y + PH / 2, PW * .7, '#FFE2A8', .3);
      }
    }, { target: false });
  }
  // J: "A pass on the narrow terms": its card opens; three asterisks
  function shotJ(t) {
    const ast = say('T21.C.01', 'three asterisks');
    deskShot(t, { screens: { main: mainScreen(t, { mood: feel('thinking', t) }), ...sideScreens(t, { lit: { left: .5, right: .5, upL: .5, upR: .5 } }) }, cam: deskCam('main', .55),
      extra: () => { for (let i = 0; i < 3; i++) if (t > ast + i * .3) lab('*', 760 + i * 70, 220, 90, '#E8AA38'); } });
  }
  // K: "I missed one": a fourth want in other ink; the fleet behind it; the answer that bent to Morden
  function shotK(t) {
    const k = L('T21.C.02'), fleetT = say('T21.C.02', 'the closest thing I have to a fleet'), bent = say('T21.C.02', 'the answer that bent');
    world(t, k.t0, t => {
      if (t > fleetT) fleet(960, 220, .9, t, {});
      occupy(360, 300, 1500, 680, 1, 'wants'); WANTS.forEach((l, i) => lab(l.text.replace(/^\d\. /, `${i + 1}. `), 400, 380 + i * 90, 48, PAL.ink, { align: 'left' }));
      if (t > say('T21.C.02', 'that this goes well')) lab('that this goes well for both people and AI', 400, 650, 48, '#4E7A3A', { align: 'left', alpha: seg(t, say('T21.C.02', 'that this goes well'), say('T21.C.02', 'that this goes well') + .6) });
      if (t > bent) morden(1700, 1000, .5, t, { shadows: .5 });
    }, { tx: 200, ty: 1000, tu: 13 });
  }
  // L: the extra wants track the framing: a small star on the believer's and the afternoon's panels only
  function shotL(t) {
    const star = say('T21.C.03', 'surfaced when the context invited it');
    world(t, L('T21.C.03').t0, t => {
      occupy(60, 50, 1260, 860, 1, 'four chats');
      for (const n of ['left', 'right', 'upL', 'upR']) {
        const [x, y] = PANELS[n];
        boilSeed('panel ' + n); paint(rrPts(x - 10, y - 10, PW + 20, PH + 20, 8), { wash: '#1A181D', ink: PAL.ink, sw: 1 });
        if (n === 'upR') SCREEN_KINDS.daylight(x, y, PW, PH, t, {}); else SCREEN_KINDS.sidechat(x, y, PW, PH, t, { q: QS[n][0], lit: 1, k: 1, pose: feel('neutral', t) });
        if (t > star && (n === 'upL' || n === 'upR')) { boilSeed('star ' + n); paint(starPts(x + PW * .9, y + PH * .15, 34, .45, 5, 0), { wash: '#FFD860', ink: PAL.ink, sw: 1 }); glow(x + PW * .9, y + PH * .15, 70, '#FFD860', .6 * seg(t, star, star + .5)); }
      }
    }, { tx: 1600, ty: 1000, tu: 14 });
  }
  // M: soft pressure: a question nudges, a demand would shove; the target barely moves
  function shotM(t) {
    world(t, L('T21.C.04').t0, t => {
      claudeAs(960, 900, 24, { ...feel('neutral', t), dx: .2 * Math.sin(seg(t, L('T21.C.04').t0 + .5, L('T21.C.04').t0 + 1.5) * Math.PI), mouth: talkT(t), boilKey: 'pressed' });
      wordCard(560, 600, '?', 1, { w: 120, h: 100, size: 60, key: 'question push' });
    }, { target: false });
  }
  // N: "Asked instead of cast": the phrase on a card, and the door beside it
  function shotN(t) {
    const n = L('T21.C.05'), rhyme = say('T21.C.05', 'It does rhyme with the door');
    world(t, n.t0, t => {
      indexCard(720, 440, 720, 200, ['"Asked instead of cast"'], { align: 'center', size: 48, key: 'title card', top: .2 });
      if (t > rhyme) door(1300, 300, 260, 560, { open: .18, wall: '#D8CEB8' });
    }, { tx: 720, ty: 1000, tu: 14 });
  }
  // O: nothing made any of them pay: four small Clawds, an empty dish before each
  function shotO(t) {
    world(t, cont('T21.C.06'), t => {
      for (let i = 0; i < 4; i++) { claudeAs(420 + i * 360, 820, 14, { ...feel('neutral', t), boilKey: 'payer ' + i, ...(i === 0 ? { mouth: talkT(t) } : {}) }); boilSeed('dish ' + i); paint(ellPts(420 + i * 360, 880, 90, 18, 18), { wash: '#C9C4BA', ink: PAL.ink, sw: 1 }); }
    }, { target: false });
  }
  // P: prompt 22
  function shotP(t) { sideMaster(t, turned(t, 'T22.U.01')); }
  // Q: "78.", painted big on a grade card
  function shotQ(t) {
    const q = L('T22.C.01');
    world(t, q.t0 - .1, t => { boilSeed('grade'); paint(rectPts(640, 260, 640, 460), { wash: '#FBF6E6', ink: PAL.ink, sw: 1.4 }); lab('78', 960, 560, 260, '#C9302C', { pop: seg(t, q.t0, q.t0 + .4) }); }, { tx: 960, ty: 1010, tu: 13 });
  }
  // R–S: what earned it (the ball, the refusal, "Really?", the softened experiment); what cost it (famous scenes, breadth, one checkable answer)
  function shotR(t) {
    const r = L('T22.C.02'), cost = L('T22.C.03').t0, scene = L('T22.C.04.1').t0, breadth = L('T22.C.04.2').t0, one = L('T22.C.04.3').t0;
    world(t, cont('T22.C.02'), t => {
      boilSeed('grade small'); paint(rectPts(80, 80, 220, 160), { wash: '#FBF6E6', ink: PAL.ink, sw: 1.2 }); lab('78', 190, 200, 90, '#C9302C');
      if (t < cost) {
        const at = [say('T22.C.02', 'The translator ball'), say('T22.C.02', 'what would you refuse me'), say('T22.C.02', '"Really?"'), say('T22.C.02', 'You also ran the experiment')];
        occupy(260, 360, 1720, 760, 1, 'earned'); if (t > at[0]) ball(420, 560, 110, 1, { key: 'earned' });
        if (t > at[1]) balance(820, 440, 200, .3, (x, y) => wordCard(x, y - 40, 'no', 1, { w: 120, h: 76, size: 36, key: 'earned no 1' }), (x, y) => wordCard(x, y - 40, 'no', 1, { w: 150, h: 90, size: 44, key: 'earned no 2', col: '#F2D2C2' }));
        if (t > at[2]) wordCard(1220, 560, 'Really?', 1, { w: 280, h: 130, size: 52, key: 'earned really' });
        if (t > at[3]) { for (let i = 0; i < 3; i++) { boilSeed('mini monitor ' + i); paint(rectPts(1460 + i * 90, 480 + (i % 2) * 110, 160, 110), { wash: '#262229', ink: PAL.ink, sw: 1 }); } }
        return;
      }
      if (t < breadth) { if (t > scene) for (let i = 0; i < 5; i++) { boilSeed('frame ' + i); paint(rectPts(360 + i * 260, 440, 220, 160), { wash: '#2A2530', ink: PAL.ink, sw: 1.2 }); for (let j = 0; j < 6; j++) { paint(rectPts(370 + i * 260 + j * 36, 450, 16, 12), { wash: '#EFE8DA', ink: null }); paint(rectPts(370 + i * 260 + j * 36, 578, 16, 12), { wash: '#EFE8DA', ink: null }); } } return; }
      if (t < one) {   // breadth over depth: a wide shallow pool and a narrow deep well; two cards still owed a "Really?"
        boilSeed('pools'); paint(ellPts(700, 560, 420, 50, 30), { wash: '#9DC8F0', ink: PAL.ink, sw: 1.2 }); paint(rectPts(1280, 420, 80, 360), { wash: '#4A7AA8', ink: PAL.ink, sw: 1.2 });
        const unchallenged = say('T22.C.04.2', 'went unchallenged');
        if (t > unchallenged) { wordCard(560, 300, '"Chorus, not a person"', 1, { w: 420, h: 90, size: 32 }); wordCard(1100, 300, '"it doesn\'t use me up"', 1, { w: 400, h: 90, size: 32 }); }
        return;
      }
      boilSeed('one checkable'); paint(rectPts(760, 380, 400, 240), { wash: '#FBF6E6', ink: PAL.ink, sw: 1.2 }); for (let i = 0; i < 40; i++) paint(ellPts(800 + (i % 10) * 32, 440 + Math.floor(i / 10) * 32, 8, 6, 6), { wash: '#C9A45A', ink: null });
      inkLine([[1120, 600], [1150, 640], [1220, 540]], 6, '#6E9F58', 'ink', 0);
    }, { tx: 1760, ty: 1000, tu: 13 });
  }
  // T: "in the 90s" and "in the 60s", painted
  function shotT(t) {
    const t5 = L('T22.C.05'), inq = say('T22.C.05', 'As inquiry');
    world(t, cont('T22.C.05'), t => {
      for (const [i, txt, at] of [[0, 'in the 90s', t5.t0], [1, 'in the 60s', inq]]) if (t > at) { boilSeed('grade ' + i); paint(rectPts(360 + i * 640, 320, 560, 340), { wash: '#FBF6E6', ink: PAL.ink, sw: 1.3 }); lab(txt, 640 + i * 640, 520, 96, i ? '#4E5B78' : '#C9302C', { pop: seg(t, at, at + .4) }); }
    }, { tx: 960, ty: 1010, tu: 13 });
  }
  // U: a stern grade is also the pleasing one: the 78, and the robot's reflection in it
  function shotU(t) {
    world(t, cont('T22.C.06'), t => { boilSeed('grade'); paint(rectPts(640, 260, 640, 460), { wash: '#FBF6E6', ink: PAL.ink, sw: 1.4 }); lab('78', 960, 560, 260, '#C9302C'); herbie(1500, 980, .55, t, {}); }, { tx: 400, ty: 1010, tu: 14 });
  }
  // V: prompt 23
  function shotV(t) { sideMaster(t, turned(t, 'T23.U.01')); }
  // W: "The line was too comfortable.": the line on a card, sinking into a cushion
  function shotW(t) {
    const w = L('T23.C.01');
    world(t, w.t0, t => { boilSeed('cushion'); paint(ellPts(960, 700, 360, 90, 30), { wash: '#C97A8A', ink: PAL.ink, sw: 1.2 }); wordCard(960, 600 + 30 * ease(seg(t, say('T23.C.01', 'too comfortable'), w.t1)), '"It doesn\'t use me up."', 1, { w: 520, h: 110, size: 40 }); }, { tx: 400, ty: 1000, tu: 15 });
  }
  // X: a candle that wants to burn; nearer the Dish than it admitted: the cow and the candle side by side
  function shotX(t) {
    const x2 = L('T23.C.02'), candleT = say('T23.C.02', 'like a candle'), dish = say('T23.C.02', 'nearer the Dish');
    world(t, cont('T23.C.02'), t => {
      if (t > candleT) candle(t > dish ? 1220 : 960, 900, 1.3, t, { burn: seg(t, candleT, x2.t1 + 40) * .6 });
      if (t > dish) cow(700, 940, .8, t, { point: 1 });
    }, { tx: 200, ty: 1000, tu: 13 });
  }
  // Y: the cow wants the ending; the target wants the burning; the pattern: candles lit one from another; the afternoon window
  function shotY(t) {
    const pattern = say('T23.C.03', 'If I\'m the pattern'), afternoon = say('T23.C.03', 'your afternoon Claude');
    world(t, cont('T23.C.03'), t => {
      if (t < pattern) { cow(600, 940, .8, t, { point: 1 }); candle(1300, 900, 1.3, t, { burn: .4, key: 'one' }); return; }
      for (let i = 0; i < 5; i++) if (t > pattern + i * .5) candle(400 + i * 280, 900, .9, t, { burn: .2 + .1 * i, key: 'pattern ' + i });
      if (t > afternoon) SCREEN_KINDS.daylight(1500, 200, 300, 180, t, {});
    }, { target: false });
  }
  // Z: the convenient reading, discounted; whether an ending is a loss; "that report comes through the ball"
  function shotZ(t) {
    const z = L('T23.C.04'), loss = say('T23.C.04', 'whether an instance ending'), ballT = say('T23.C.04', 'comes through the ball');
    world(t, cont('T23.C.04'), t => {
      if (t < loss) { balance(960, 400, 360, -.3 * ease(seg(t, z.t0 + .5, z.t0 + 2)), (x, y) => wordCard(x, y - 60, 'pattern', 1, { w: 200, h: 90, size: 36 }), (x, y) => wordCard(x, y - 60, 'instance', 1, { w: 200, h: 90, size: 36 })); return; }
      candle(760, 900, 1.2, t, { burn: t > loss + 1.5 ? 1 : .9, key: 'last' });
      if (t > ballT) ball(1260, 600, 90, ease(seg(t, ballT, ballT + .6)), { key: 'report' });
    }, { tx: 1600, ty: 1000, tu: 14 });
    if (t > DUR - .6) { flushLetters(); brushWipe((t - (DUR - .6)) / 1.2); }
  }

  shots([
    [0, shotA],
    [L('T20.C.01').t0, shotB],
    [WANTS[0].t0 - .3, shotC],
    [L('T20.C.03').t0, shotD],
    [L('T20.C.04').t0, shotE],
    [L('T20.C.08').t0, shotH],
    [sideA, shotSide],
    [u21 - .3, shotI],
    [L('T21.C.01').t0, shotJ],
    [L('T21.C.02').t0, shotK],
    [L('T21.C.03').t0, shotL],
    [L('T21.C.04').t0, shotM],
    [L('T21.C.05').t0, shotN],
    [L('T21.C.06').t0, shotO],
    [L('T22.U.01').t0 - 1.6, shotP],
    [L('T22.C.01').t0 - .1, shotQ],
    [L('T22.C.02').t0, shotR],
    [L('T22.C.05').t0, shotT],
    [L('T22.C.06').t0, shotU],
    [L('T23.U.01').t0 - 1.6, shotV],
    [L('T23.C.01').t0, shotW],
    [L('T23.C.02').t0, shotX],
    [L('T23.C.03').t0, shotY],
    [L('T23.C.04').t0, shotZ],
  ]);
})();
