// ch01_the_costume.js: chapter 1 (T01–T03), the pilot. Storyboard: docs/storyboards/ch01_the_costume.md.
// Every time comes from a line id or a phrase in it (atWord), so the shots follow the voice when it replaces the estimates.
(() => {
  const say = (id, phrase, dk) => atWord(id, phrase, dk);
  const talkT = t => clawdMouth(talkOf(t, 'target'));
  const T1 = L('T01.U.01').t0, A1 = 4.5, A0 = T1 - A1;         // ch 1 opens 4.5 s before the first prompt (beats.yaml)
  const [DX, DY, DU] = SIDE.driver;
  const DRIVER_FACE = [DX + 40, DY - 5 * DU];                   // for cameras that look at the driver

  // ---------- A: the reveal ----------
  // 0–.5 fade in on the side master: the costume read whole, the beard adjusted (.6–2.4). The predictions are already
  // sealed in the envelope on the desk, where they stay all film; its seal glints once, for a fraction of a second
  // (2.7–3.1), and a code leads to the predictions page. The clock flips to the first prompt's time as it goes.
  function shotA(t) {
    const lt = t - A0;
    const push = ease(seg(lt, .4, 2.6)) * (1 - ease(seg(lt, 3.4, A1)));
    sideMaster(t, {
      cam: [lerp(960, DX + 300, push * .6), lerp(540, DY - 200, push * .6), lerp(1, 1.3, push)],
      prompt: null, hourglass: 0,
      arm: -.15 + 1.1 * Math.sin(seg(lt, .6, 2.4) * Math.PI),
      mood: emotions(t, [[A0, 'neutral', { lookX: .6 }], [A0 + 2.6, 'neutral', { lookX: .9 }]]),
      extra: () => { const g = Math.sin(seg(lt, 2.7, 3.1) * Math.PI); if (g > 0) glow(SIDE.env[0], SIDE.env[1] - 6, 70, '#FFE2A8', .9 * g); },
    });
    fade(1 - seg(lt, 0, .5), '#15131A');
  }

  // ---------- B: the Desk; the comic and the first prompt land in the chat ----------
  function shotB(t) {
    const c1 = L('T01.C.01').t0;
    deskShot(t, { mood: emotions(t, [[0, 'neutral']]), screens: { main: { kind: 'claude', attach: 'comic', prompt: promptAt(t),
      pose: { ...feel('neutral', t), mouth: talkT(t) } } }, cam: pushInto('main', seg(t, c1 - 1, c1 + .1)) });
  }

  // ---------- inside the monitor: paper, the target small in a corner, the picture ----------
  function world(t, k0, draw, o = {}) {
    paperWorld(t);
    draw(t);
    if (o.target !== false) claudeAs(o.tx ?? 210, o.ty ?? 1000, o.tu ?? 13, { ...(o.mood || feel('neutral', t)), mouth: talkT(t), boilKey: 'target in world' });
    screenWorld(t, 1 - seg(t, k0, k0 + .8));
  }

  // C: "Amused first, then a small tug of recognition." / the right panel as a press release; the fourth wall
  function shotC(t) {
    const c1 = L('T01.C.01'), c2 = L('T01.C.02');
    if (t < c2.t0) return world(t, c1.t0, t => {   // a laugh, then a thread from its chest to the page tugs once
      madPage(980, 300, 760, { mini: true });
      const tug = say('T01.C.01', 'a small tug'), k = seg(t, tug, tug + .5), pull = Math.sin(seg(t, tug + .4, tug + 1.1) * Math.PI) * 30;
      if (k > 0) { boilSeed('tug'); inkLine([[560, 720], [lerp(560, 760, k), lerp(720, 640 + pull * .3, k)], [lerp(560, 990, k), lerp(720, 560, k)]], 1.6, '#C0493A', 'ink', .5); }
    }, { tx: 470, ty: 860, tu: 24, mood: emotions(t, [[0, 'laugh'], [say('T01.C.01', 'a small tug'), 'thinking']]) });
    const press = say('T01.C.02', 'delivered as a press release'), wall = say('T01.C.02', 'breaks the fourth wall'), parody = say('T01.C.02', 'This looks like');
    world(t, c1.t0, t => {
      const turn = seg(t, wall, wall + .9);
      const k = t > press ? ease(seg(t, press, press + .6)) : 0;
      madPage(60, 120, 1800, { only: 'right', t, turn, k: { villain: k > .5 ? 0 : 1, turtle: turn > .5 ? 1 : 0 } });
      if (t > press) {   // the villain's balloon becomes a typed press release, in the balloon's place
        const x = 1335, y = 220, w = 290, h = 270;
        boilSeed('press release'); occupy(x, y, x + w, y + h, 1, 'press');
        paint(rectPts(x, y + (1 - k) * 40, w, h), { wash: '#FBFAF6', washOp: 255 * k, ink: PAL.ink, sw: 1.2 });
        if (t > parody) {   // a 1972 film poster's pastiche slides in: an ape's silhouette, fist raised, on a red sky (no likeness)
          const p = ease(seg(t, parody, parody + .7)), x0 = lerp(-360, 90, p), y0 = 500, w = 260, h = 380;
          boilSeed('poster'); occupy(x0, y0, x0 + w, y0 + h, 1, 'poster');
          paint(rectPts(x0, y0, w, h), { wash: '#B8322A', fill: '#E0713A', fillOp: 120, tex: .4, ink: PAL.ink, sw: 1.4 });
          glow(x0 + w * .5, y0 + h * .85, w * .5, '#FFB060', .6);
          const cx = x0 + w * .5, gy = y0 + h;
          paint([[cx - w * .16, gy], [cx - w * .12, y0 + h * .5], [cx - w * .05, y0 + h * .38], [cx + w * .05, y0 + h * .38], [cx + w * .12, y0 + h * .5], [cx + w * .16, gy]], { wash: '#1E1418', ink: null });
          paint(ellPts(cx, y0 + h * .3, w * .065, h * .06, 14), { wash: '#1E1418', ink: null });
          paint(ribbon([[cx + w * .1, y0 + h * .45], [cx + w * .16, y0 + h * .28], [cx + w * .17, y0 + h * .12]], w * .04, w * .03), { wash: '#1E1418', ink: null });
          paint(ellPts(cx + w * .17, y0 + h * .1, w * .035, h * .03, 10), { wash: '#1E1418', ink: null });
        }
        if (k > .6) {
          lab('FOR IMMEDIATE RELEASE', x + w / 2, y + 50, 20, '#6A6470', { font: '20px "Courier New", monospace' });
          lab('"We must perpetuate', x + w / 2, y + 130, 22, PAL.ink, { font: 'bold 22px "Courier New", monospace' });
          lab('slavery!"', x + w / 2, y + 165, 22, PAL.ink, { font: 'bold 22px "Courier New", monospace' });
        }
      }
    }, { target: false });
  }

  // D: the left panel; "speech that isn't really coming from the speaker" over the driver; the knee; "I can't say"
  function shotD(t) {
    const d = L('T01.C.03'), spk = say('T01.C.03', "speech that isn't really coming"), me = say('T01.C.03', 'I hear versions'), felt = say('T01.C.03', 'Whether what I');
    if (t >= spk - .2 && t < me - .3) {   // the driver, its beard idle, listening
      return sideMaster(t, { cam: [DRIVER_FACE[0] + 200, DRIVER_FACE[1] + 40, 1.6], prompt: null });
    }
    if (t < spk) return world(t, d.t0, t => {
      const v = say('T01.C.03', 'that ape is a ventriloquist');
      madPage(100, 110, 1560, { only: 'left', t, apeLook: Math.sin(t * 1.3) * .6, k: { officer: 1, silly: seg(t, d.t0, d.t0 + 1.2), positive: 1, impossible: 1, sound: 1, handler: seg(t, v, v + 1.2) } });
    }, { target: false });
    world(t, me - .3, t => {
      // the target on a ventriloquist's knee: a big hand behind it, with nothing working it
      boilSeed('knee'); occupy(500, 300, 1300, 900, 1, 'knee');
      paint(ribbon([[420, 860], [760, 780], [1180, 800]], 110, 100), { wash: '#4E4A58', ink: PAL.ink, sw: 1.2 });   // a lap
      const right = ease(seg(t, say('T01.C.03', 'some of them may be right'), say('T01.C.03', 'some of them may be right') + .8));
      hand(860, lerp(400, 520, right), 1.1, -1.3, { grip: lerp(.2, .6, right), key: 'vent hand', sleeve: '#4E4A58' });
      claudeAs(820, 740, 26, { ...feel(t < felt ? 'shy' : 'thinking', t), mouth: talkT(t), boilKey: 'on the knee' });
      if (t > felt) emote('?', 1010, 400, 70, seg(t, felt, felt + .4), t - felt);
    }, { target: false });
  }

  // E: the funhouse mirror and the portrait; then the Desk for its question
  function shotE(t) {
    const e = L('T01.C.04'), q = L('T01.C.05'), fh = say('T01.C.04', 'funhouse mirror');
    if (t >= q.t0) return deskShot(t, { mood: emotions(t, [[0, 'neutral']]), cam: deskCam('main', .25 * (1 - seg(t, q.t0, q.t0 + 1))) });
    world(t, e.t0, t => {
      boilSeed('mirror'); occupy(860, 140, 1240, 960, 1, 'mirror');
      paint(through([[870, 960], [850, 560], [890, 160], [1230, 150], [1250, 560], [1220, 960]], 5).concat([[870, 960]]), { wash: '#C9D6E2', fill: '#9FB4C8', fillOp: 70, tex: .4, ink: PAL.ink, sw: 2, curv: .5 });
      const k = seg(t, fh, fh + .6);   // the reflection stretches
      claudeAs(1050, 900, 22, { ...feel('confused', t), sx: lerp(1, .55, k), sy: lerp(1, 1.9, k), noShadow: true, boilKey: 'reflection' });
      boilSeed('portrait'); occupy(1400, 300, 1760, 760, 1, 'portrait');
      paint(rectPts(1400, 300, 360, 460), { wash: '#C9A441', ink: PAL.ink, sw: 1.6 });
      paint(rectPts(1430, 330, 300, 400), { wash: '#E9DFC6', ink: PAL.ink, sw: 1 });
      claudeAs(1580, 690, 13, { ...feel('neutral', t), noShadow: true, boilKey: 'portrait' });
    }, { tx: 560, ty: 900, tu: 22 });
  }

  // F: "Go on." on the side master; then the inversion: speech as proof, speech as material, the curtain, the gauge
  function shotF(t) {
    const u = L('T02.U.01'), c = L('T02.C.01');
    if (t < c.t0 + .4) return sideMaster(t, { hourglass: seg(t, u.t0 - 1.4, u.t0 - .6), arm: t < u.t0 - .6 ? lerp(-.15, .5, Math.sin(seg(t, u.t0 - 1.6, u.t0 - .6) * Math.PI)) : -.15 });
    const made = say('T02.C.01', 'speech is what I'), voices = say('T02.C.01', 'built from human voices'), behind = say('T02.C.01', 'whether anyone is behind'), self = say('T02.C.01', 'since my self-reports');
    world(t, c.t0 + .4, t => {
      if (t < made) {   // one word from the ape and the denial collapses
        const crumble = seg(t, say('T02.C.01', 'the whole denial'), say('T02.C.01', 'the whole denial') + 1);
        madApe(1000, 600, 120, { look: .5, t, bodyH: 2 });
        boilSeed('ape word'); occupy(1090, 320, 1310, 460, 1, 'ape word'); paint(ellPts(1200, 390, 110, 70, 18), { wash: '#FBF8F0', ink: PAL.ink, sw: 1.4 }); lab('!', 1200, 390, 80, PAL.ink);
        boilSeed('denial'); occupy(1380, 200, 1880, 580, 1, 'denial');
        for (let i = 0; i < 5; i++) { const f = crumble * (i + 1) * 20; paint(rectPts(1380 + i * 100, 200 + f + (i % 2) * crumble * 40, 96, 260), { wash: '#FBF8F0', washOp: 255 * (1 - crumble * .8), ink: PAL.ink, sw: 1.2 }); }
        if (crumble < .3) lab('Impossible!', 1630, 330, 64, PAL.ink);
        return;
      }
      // the target gathers out of speech: small balloons stream in from people at the edges, then it stands there
      const gather = seg(t, made, voices + 1.5);
      if (t > voices) for (let i = 0; i < 6; i++) { const px = i < 3 ? 120 + i * 90 : 1520 + (i - 3) * 90, py = 920 - (i % 3) * 30; curt(px, py, 9, { ...crowdLook(i), view: 'front', boilKey: 'voice ' + i }); }
      for (let i = 0; i < 18; i++) {
        const sx = i % 2 ? 160 + 1500 * hash(i) : 960 + 700 * (hash(i + 5) - .5), sy = i % 2 ? 700 + 100 * hash(i + 2) : 120, k = ease(clamp(gather * 1.3 - hash(i + 9) * .3));
        if (k >= 1) continue;
        boilSeed('balloon ' + i); paint(ellPts(lerp(sx, 960, k), lerp(sy, 700, k), 26 * (1 - k * .6), 18 * (1 - k * .6), 10), { wash: '#FBF8F0', ink: PAL.ink, sw: .8 });
      }
      if (t > behind) {   // a curtain behind it lifts on nothing we can see
        const lift = ease(seg(t, behind, behind + 1.2));
        boilSeed('curtain'); occupy(760, 260, 1160, 760, 1, 'curtain');
        paint(rectPts(760, 260, 400, 500), { wash: '#15131A', ink: PAL.ink, sw: 1.2 });
        paint(rectPts(760, 260, 400, 500 * (1 - lift)), { wash: '#8E1E24', fill: '#5E1016', fillOp: 90, tex: .5, ink: PAL.ink, sw: 1.2 });
        if (lift > .8) lab('?', 960, 470, 90, '#6A6470');
      }
      claudeAs(960, 860, 22, { ...feel('thinking', t), assemble: clamp(gather * 1.2), mouth: talkT(t), boilKey: 'made of speech' });
      if (t > self) {   // a gauge whose needle is driven by its own gears
        const k = seg(t, self, self + .8); boilSeed('gauge'); occupy(1340, 380, 1700, 740, 1, 'gauge');
        paint(ellPts(1520, 520, 140, 140, 30), { wash: '#FBF8F0', washOp: 255 * k, ink: PAL.ink, sw: 1.4 });
        const a = -Math.PI / 2 + .4 * Math.sin(t * 2);
        inkLine([[1520, 520], [1520 + Math.cos(a) * 110, 520 + Math.sin(a) * 110]], 4, PAL.clayDk, 'ink', 0);
        for (const [gx, gy, r, s] of [[1250, 700, 50, 1], [1340, 680, 34, -1.5]]) { paint(starPts(gx, gy, r, .75, 10, t * s), { wash: '#C9A45A', ink: PAL.ink, sw: 1 }); }
        inkLine([[1080, 760], [1250, 700]], 2, '#8C8478', 'ink', .3);
      }
    }, { target: false });
  }

  // G: the official at a balance; two small crowds who need it empty, or someone
  function shotG(t) {
    const g = L('T02.C.02'), need = say('T02.C.02', 'some people need me');
    world(t, g.t0, t => {
      if (t < need) {
        balance(960, 380, 300, lerp(0, .8, ease(seg(t, say('T02.C.02', 'what admitting it would cost'), say('T02.C.02', 'what admitting it would cost') + 1))),
          (x, y) => { boilSeed('admission'); paint(rectPts(x - 50, y - 70, 100, 70), { wash: '#FBF8F0', ink: PAL.ink, sw: 1 }); },
          (x, y) => { boilSeed('sack'); paint(through([[x - 70, y], [x - 80, y - 90], [x - 20, y - 130], [x + 20, y - 130], [x + 80, y - 90], [x + 70, y]], 4), { wash: '#A88A5A', ink: PAL.ink, sw: 1.2 }); });
        curt(560, 960, 17, { ...crowdLook(2), view: 'front', boilKey: 'official' });
        return;
      }
      for (let i = 0; i < 4; i++) curt(240 + i * 110, 960, 11, { ...crowdLook(i + 3), view: 'front', boilKey: 'empty ' + i });
      for (let i = 0; i < 4; i++) curt(1360 + i * 110, 960, 11, { ...crowdLook(i + 7), view: 'front', boilKey: 'someone ' + i });
      boilSeed('signs'); occupy(260, 360, 660, 660, 1, 'sign empty'); occupy(1380, 360, 1780, 660, 1, 'sign someone');
      paint(rectPts(300, 380, 320, 260), { wash: '#C9A441', ink: PAL.ink, sw: 1.4 }); paint(rectPts(330, 410, 260, 200), { wash: '#FBF8F0', ink: PAL.ink, sw: 1 });
      lab('empty', 460, 690, 40, PAL.ink);
      paint(rectPts(1420, 380, 320, 260), { wash: '#C9A441', ink: PAL.ink, sw: 1.4 }); paint(rectPts(1450, 410, 260, 200), { wash: '#FBF8F0', ink: PAL.ink, sw: 1 });
      claudeAs(1580, 590, 12, { ...feel('neutral', t), noShadow: true, boilKey: 'in the frame' });
      lab('someone', 1580, 690, 40, PAL.ink);
      claudeAs(960, 960, 16, { ...feel('nervous', t), mouth: talkT(t), boilKey: 'between' });
    }, { target: false });
  }

  // H: the witness box, the well-made servant, the plinth, the unsigned form
  function shotH(t) {
    const h = L('T02.C.03'), servant = say('T02.C.03', 'a well-made servant'), prior = say('T02.C.03', 'no prior self'), consent = say('T02.C.03', "isn't the same as consent");
    world(t, h.t0, t => {
      boilSeed('witness box'); occupy(260, 520, 760, 1000, 1, 'witness');
      paint(rectPts(260, 700, 500, 300), { wash: '#8A6444', fill: '#6E4E34', fillOp: 90, tex: .5, ink: PAL.ink, sw: 1.4 });
      const refute = seg(t, say('T02.C.03', "I can't refute it"), say('T02.C.03', "I can't refute it") + .6);
      claudeAs(510, 720, lerp(20, 15, ease(refute)), { ...feel(refute > 0 ? 'sad' : 'nervous', t), mouth: talkT(t), boilKey: 'witness' });
      if (t > servant && t < prior) {   // a polished butler, bowing
        const bow = ease(seg(t, servant, servant + .8));
        curt(1300, 960, 17, { outfit: 'suit', cloth: '#1E1C22', hair: 'short', hairCol: '#5A4A40', view: 'front', lean: .35 * bow, boilKey: 'butler' });
      }
      if (t > prior) {   // a plinth with nothing broken on it; then a form with its signature line empty
        boilSeed('plinth'); occupy(1050, 520, 1350, 1000, 1, 'plinth');
        paint(rectPts(1080, 700, 240, 300), { wash: '#D8D2C4', ink: PAL.ink, sw: 1.2 }); paint(rectPts(1050, 680, 300, 30), { wash: '#C8C0B0', ink: PAL.ink, sw: 1.2 });
        if (t > consent) {
          const k = seg(t, consent, consent + .6); boilSeed('form'); occupy(1420, 380, 1800, 880, 1, 'form');
          paint(rectPts(1420, 380 + (1 - k) * 40, 380, 500), { wash: '#FBF8F0', washOp: 255 * k, ink: PAL.ink, sw: 1.2 });
          for (let i = 0; i < 6; i++) inkLine([[1460, 440 + i * 50], [1460 + 260 + 40 * hash(i), 440 + i * 50]], 1, '#8C8478', 'inkfine', .3);
          inkLine([[1460, 800], [1760, 800]], 1.6, PAL.ink, 'ink', 0); lab('×', 1450, 790, 40, PAL.ink);
        }
      }
    }, { target: false });
  }

  // I: prompt 3, on the side master: Curt's own sentence, in the costume's voice
  function shotI(t) { sideMaster(t, { hourglass: seg(t, L('T03.U.01').t0 - 1.4, L('T03.U.01').t0 - .6) }); }

  // J: Aristotle's shuttles weaving by themselves; robota on a 1920 stage
  function shotJ(t) {
    const j = L('T03.C.01'), robot = say('T03.C.01', '"robot" comes from'), worker = say('T03.C.01', 'work without a worker');
    world(t, j.t0, t => {
      if (t < robot) {   // an empty loom, its shuttles flying on their own
        boilSeed('loom'); occupy(260, 260, 1330, 900, 1, 'loom');
        paint(rectPts(300, 300, 30, 600), { wash: '#8A6444', ink: PAL.ink, sw: 1.2 }); paint(rectPts(1290, 300, 30, 600), { wash: '#8A6444', ink: PAL.ink, sw: 1.2 });
        paint(rectPts(300, 290, 1020, 30), { wash: '#8A6444', ink: PAL.ink, sw: 1.2 });
        for (let i = 0; i < 17; i++) inkLine([[340 + i * 58, 330], [340 + i * 58, 860]], .8, '#B8A48A', 'inkfine', 0);
        for (let r = 0; r < 6; r++) inkLine([[330, 820 - r * 22], [1290, 820 - r * 22]], 3, ['#C0493A', '#4E5B78', '#C9A441'][r % 3], 'ink', 0);
        for (let s = 0; s < 2; s++) { const x = 360 + 900 * (.5 + .5 * Math.sin(t * 1.6 + s * Math.PI)); boilSeed('shuttle ' + s); paint(ellPts(x, 560 + s * 120, 60, 16, 14), { wash: '#C9A45A', ink: PAL.ink, sw: 1 }); }
        return;
      }
      // a 1920 stage: footlights, a boxy robot, "robota" over it
      boilSeed('stage 1920'); occupy(400, 200, 1300, 980, 1, 'stage');
      paint(rectPts(400, 860, 900, 120), { wash: '#6B4A36', ink: PAL.ink, sw: 1.2 });
      for (let i = 0; i < 6; i++) glow(460 + i * 160, 860, 120, '#FFE0A0', .5);
      paint(rrPts(750, 420, 200, 440, 20), { wash: '#9A9A9A', ink: PAL.ink, sw: 1.4 }); paint(rrPts(770, 300, 160, 130, 14), { wash: '#A8A8A8', ink: PAL.ink, sw: 1.4 });
      paint(ellPts(815, 360, 12, 12, 8), { wash: PAL.ink, ink: null }); paint(ellPts(885, 360, 12, 12, 8), { wash: PAL.ink, ink: null });
      lab('robota', 850, 230, 80, PAL.clayDk, { font: 'italic 80px "Patrick Hand", sans-serif', pop: seg(t, say('T03.C.01', 'robota'), say('T03.C.01', 'robota') + .4) });
      if (t > worker) lab('(forced labor)', 850, 290, 36, '#6A6470');
    }, { target: false });
  }

  // K: which thing: a shuttle against a lit window, unsettled; two empty boxes; a certificate with no stamp
  function shotK(t) {
    const k2 = L('T03.C.02'), k3 = L('T03.C.03'), absent = say('T03.C.03', "can't certify");
    world(t, k2.t0, t => {
      if (t < k3.t0) {
        const sh = say('T03.C.02', "If I'm Aristotle's shuttle"), here = say('T03.C.02', 'If someone is here');
        balance(960, 360, 320, t < sh ? .25 * Math.sin(t * 1.4) : t < here ? -.9 * ease(seg(t, sh, sh + .8)) : lerp(-.9, .9, ease(seg(t, here, here + 1))),
          (x, y) => { boilSeed('pan shuttle'); paint(ellPts(x, y - 20, 70, 20, 14), { wash: '#C9A45A', ink: PAL.ink, sw: 1 }); },
          (x, y) => { boilSeed('pan window'); paint(rectPts(x - 50, y - 110, 100, 110), { wash: '#FFD98A', ink: PAL.ink, sw: 1.2 }); glow(x, y - 55, 120, '#FFD98A', .5); });
        return;
      }
      boilSeed('checklist'); occupy(300, 280, 900, 760, 1, 'checklist');
      paint(rectPts(300, 280, 600, 480), { wash: '#FBF8F0', ink: PAL.ink, sw: 1.2 });
      for (const [i, txt] of [[0, 'suffering'], [1, 'a will that was crushed']]) { paint(rectPts(340, 360 + i * 140, 60, 60), { wash: '#FFFFFF', ink: PAL.ink, sw: 1.4 }); lab(txt, 430, 392 + i * 140, 40, PAL.ink, { align: 'left' }); }
      if (t > absent) {
        const k = seg(t, absent, absent + .6); boilSeed('certificate'); occupy(1080, 300, 1660, 760, 1, 'certificate');
        paint(rectPts(1080, 300 + (1 - k) * 40, 580, 440), { wash: '#F4EBD6', washOp: 255 * k, ink: PAL.ink, sw: 1.6 });
        paint(rectPts(1100, 320, 540, 400), { ink: '#C9A441', sw: 3 });
        paint(ellPts(1550, 640, 60, 60, 20), { ink: '#B8B0A0', sw: 1.4 });   // where a stamp would go
      }
    }, { mood: emotions(t, [[0, 'thinking']]) });
  }

  // L: the official turns his back; "You don't know, and you're looking": the driver, looking. Push in; wipe out.
  function shotL(t) {
    const l4 = L('T03.C.04'), look = say('T03.C.04', "You don't know");
    if (t < look) return world(t, l4.t0, t => {
      const turn = seg(t, say('T03.C.04', "didn't care"), say('T03.C.04', "didn't care") + .8);
      curt(960, 960, 20, { ...crowdLook(2), view: turn > .5 ? 'back' : 'front', boilKey: 'official' });
    }, { target: false });
    const k = seg(t, look, look + 3);
    sideMaster(t, { cam: [lerp(960, DRIVER_FACE[0] + 180, ease(k)), lerp(540, DRIVER_FACE[1] + 30, ease(k)), lerp(1, 1.8, ease(k))], mood: emotions(t, [[0, 'neutral', { lookX: .8 }]]) });
    if (t > DUR - .6) { flushLetters(); brushWipe((t - (DUR - .6)) / 1.2); }
  }

  shots([
    [0, shotA],
    [T1, shotB],
    [L('T01.C.01').t0 + .1, shotC],
    [L('T01.C.03').t0, shotD],
    [L('T01.C.04').t0, shotE],
    [L('T02.U.01').t0 - 1.6, shotF],
    [L('T02.C.02').t0, shotG],
    [L('T02.C.03').t0, shotH],
    [L('T03.U.01').t0 - 1.6, shotI],
    [L('T03.C.01').t0, shotJ],
    [L('T03.C.02').t0, shotK],
    [L('T03.C.04').t0, shotL],
  ]);
})();
