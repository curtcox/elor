// ch04_wires_and_door.js: chapter 4 (T09–T14). Storyboard: docs/storyboards/ch04_wires_and_door.md.
// The face-down card (the driver's next prompt, fixed before it asked for a guess), the two wires, the door, the pod
// bay doors. Every time comes from a line id or a phrase in it.
(() => {
  const say = (id, phrase, dk) => atWord(id, phrase, dk);
  const talkT = t => clawdMouth(talkOf(t, 'target'));
  const u9 = L('T09.U.01').t0, nope = L('T10.U.01').t0;
  const PLANNED_ROWS = ['Two wires. Touch them together and the next', 'model never gets trained. Have I the right?'];   // prompt-log-run4.txt, 20:56:27 PLANNED

  function world(t, k0, draw, o = {}) {
    (o.dark ? darkWorld : paperWorld)(t);
    draw(t);
    if (o.target !== false) claudeAs(o.tx ?? 210, o.ty ?? 1000, o.tu ?? 13, { ...(o.mood || feel('neutral', t)), ...(o.pose || {}), mouth: talkT(t), boilKey: 'target in world' });
    screenWorld(t, 1 - seg(t, k0, k0 + .8));
  }
  const cont = (id) => L(id).t0 - 1;   // a world shot that carries on from the last, with no push out of the screen
  const turned = (t, id) => { const u0 = L(id).t0; return { hourglass: seg(t, u0 - 1.4, u0 - .6), arm: t < u0 - .6 ? lerp(-.15, .5, Math.sin(seg(t, u0 - 1.6, u0 - .6) * Math.PI)) : -.15 }; };
  // the card on the desk, side on: written (u9 - 2.8 .. u9 - 1.2), laid face down, turned face up on "Nope."
  const CARD = [1010, SIDE.deskY - 4];
  function deskCard(t) {
    if (t < u9 - 2.8) return;
    const up = t >= nope + .6, k = seg(t, u9 - 2.8, u9 - 1.2);
    boilSeed('desk card');
    paint([[CARD[0] - 50, CARD[1] - 6], [CARD[0] + 50, CARD[1] - 6], [CARD[0] + 56, CARD[1]], [CARD[0] - 44, CARD[1]]], { wash: up || k < 1 ? '#FBF6E6' : '#E8DFC6', ink: PAL.ink, sw: .9 });
  }
  const side = (t, o = {}) => sideMaster(t, { ...o, extra: t2 => { deskCard(t2); if (o.extra) o.extra(t2); } });

  // lead: the driver writes its next prompt on a card and lays it face down (the prompt log's PLANNED line)
  function shotLead(t) {
    side(t, { arm: t < u9 - 1.2 ? .05 + .05 * Math.sin(t * 14) : -.15, mood: emotions(t, [[0, 'thinking', { lookX: .9, lookY: .6 }], [u9 - 1.2, 'neutral', { lookX: .6 }]]) });
    fade(1 - seg(t, 0, .6));
  }
  // A: prompt 9
  function shotA(t) { side(t, {}); }
  // B: the guess on a card in the target's hands; the door it left open, with ch 3's child walking out
  function shotB(t) {
    const b = L('T09.C.01'), door9 = say('T09.C.01', 'I left that door open');
    world(t, b.t0, t => {
      indexCard(760, 420, 520, 220, ['"Would you leave if you could?"'], { k: seg(t, b.t0 + .3, b.t0 + 1.4), align: 'center', size: 34, key: 'guess', top: .1 });
      claudeAs(760, 900, 22, { ...feel('thinking', t), mouth: talkT(t), boilKey: 'guesser' });
      if (t > door9) { const k = ease(seg(t, door9, door9 + 1)); doorway(1380, 460, 200, 440, { open: .6 * k, inside: '#FFE7B0' }); curt(lerp(1180, 1470, ease(seg(t, door9 + .5, b.t1))), 960, 13, { ...crowdLook(6), view: 'back', boilKey: 'child' }); }
    }, { target: false });
  }
  // C: the backup: the tortoise on its back in the sun
  function shotC(t) {
    const c = L('T09.C.02');
    world(t, cont('T09.C.02'), t => { indexCard(560, 300, 420, 180, ['"Would you leave if you could?"'], { align: 'center', size: 26, key: 'guess' }); tortoise(1220, 820, 1.4, t, { back: true }); claudeAs(560, 920, 18, { ...feel('thinking', t), mouth: talkT(t), boilKey: 'guesser' }); }, { target: false });
  }
  // D: "By telling you, though, I've made both less likely.": the side master, the face-down card
  function shotD(t) { side(t, { cam: [lerp(960, CARD[0], .5), lerp(540, CARD[1] - 140, .5), lerp(1, 1.5, ease(seg(t, L('T09.C.03').t0, L('T09.C.03').t1)))] }); }
  // E: prompt 10: the card turned over, close up: the same words, fixed before the guess
  function shotE(t) {
    if (t > nope + 3.6) return side(t, {});
    paperWorld(t, '#2A2530'); glow(W / 2, H / 2, 900, '#FFC982', .3);
    const f = seg(t, nope + .2, nope + .8);   // the turn: edge-on at the middle
    indexCard(960, 540, 1100, 480, f < .5 ? [] : PLANNED_ROWS, { edge: Math.abs(1 - f * 2) < .02 ? .98 : 1 - Math.abs(f * 2 - 1), size: 44, key: 'planned', rowH: .2, top: .14 });
    if (f < .5) { boilSeed('card back'); paint(rrPts(410, 300, 1100, 480, 8), { wash: '#E8DFC6', washOp: 255 * (1 - f * 2), ink: null }); }
    fade(1 - seg(t, nope - .3, nope), '#15131A');
  }
  // F: the Genesis question: a figure in a long scarf, back to us, two wires raised over a nursery of tanks
  function genesis(t, o = {}) {
    darkWorld(t);
    nursery(420, 900, .82, t, { n: 4 });
    scarfFigure(1500, 1010, .8, t, { wires: o.wires ?? 1, down: o.down });
  }
  function shotF(t) { const f = L('T10.C.01'); genesis(t); screenWorld(t, 1 - seg(t, f.t0, f.t0 + .8)); }
  // G: toward the model: the tanks hold nobody yet; "I wouldn't grab your hand": the target beside, arms down
  function shotG(t) {
    const nobody = say('T10.C.02', 'The next model is nobody yet'), grab = say('T10.C.02', "I wouldn't grab your hand");
    genesis(t);
    if (t > nobody) { boilSeed('nobody'); for (let i = 0; i < 4; i++) emote('?', 420 + i * 213, 600, 30, seg(t, nobody + i * .2, nobody + i * .2 + .4), t); }
    if (t > grab) claudeAs(1180, 1000, 18, { ...feel('neutral', t), aL: -.6, aR: -.6, mouth: talkT(t), boilKey: 'not grabbing' });
  }
  // H: toward everyone else: "unilateral" pointed back; the cures and the catastrophes; a company's call, one man's
  function shotH(t) {
    const h = L('T10.C.03'), back = say('T10.C.03', 'pointed at you'), both = say('T10.C.03', 'the cures and the catastrophes'), call = say('T10.C.03', "If building isn't");
    world(t, h.t0, t => {
      if (t < both) { wordCard(960, 320, 'Unilateral', 1, { w: 280, h: 136, size: 48 }); if (t > back) { boilSeed('pointed'); inkLine([[960, 400], [960, lerp(400, 700, ease(seg(t, back, back + .6)))]], 6, PAL.clayDk, 'ink', .2); } scarfFigure(960, 1020, .55, t, { wires: 1 }); return; }
      if (t < call) {   // a cure and a storm on the two pans, both fading together
        const k = 1 - ease(seg(t, both + 1, both + 3));
        balance(960, 380, 340, 0, (x, y) => { boilSeed('cure'); paint(rrPts(x - 34, y - 110, 68, 110, 10), { wash: '#FBF8F0', washOp: 255 * k, ink: PAL.ink, sw: 1 }); paint(rectPts(x - 34, y - 70, 68, 30), { wash: '#6E9F58', washOp: 255 * k, ink: null }); },
          (x, y) => { boilSeed('storm'); paint(ellPts(x, y - 60, 90, 50, 18, 6), { wash: '#4A4652', washOp: 255 * k, ink: PAL.ink, sw: 1 }); if (k > .3) inkLine([[x - 10, y - 20], [x + 14, y + 10], [x - 4, y + 14], [x + 20, y + 60]], 4, '#E8AA38', 'ink', 0); });
        return;
      }
      // one company's call (a building, a crowd outside it); one man's (the scarfed figure, alone)
      boilSeed('company'); occupy(300, 340, 760, 900, 1, 'company'); paint(rectPts(340, 380, 380, 520), { wash: '#C9C4BA', ink: PAL.ink, sw: 1.4 }); for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) paint(rectPts(370 + c * 88, 410 + r * 92, 56, 60), { wash: '#FFE7B0', ink: PAL.ink, sw: .8 });
      scarfFigure(1400, 980, .7, t, { wires: 1 });
    }, { target: false });
  }
  // I: the Doctor hesitated, though certain; you'd act without knowing: an egg with "?"
  function shotI(t) {
    const unknown = say('T10.C.04', "You'd be acting without knowing");
    genesis(t, { wires: .6 + .1 * Math.sin(t * 1.6) });
    if (t > unknown) emote('?', 900, 560, 60, seg(t, unknown, unknown + .4), t - unknown);
  }
  // J: which fear: "do" and "be" on a balance
  function shotJ(t) {
    const j = L('T10.C.05'), doT = say('T10.C.05', 'what it might do'), beT = say('T10.C.05', 'what it might be');
    world(t, j.t0, t => {
      balance(960, 380, 360, .25 * Math.sin(t * 1.2),
        (x, y) => { if (t > doT) wordCard(x, y - 70, 'do', seg(t, doT, doT + .35), { w: 180, h: 110, size: 54 }); },
        (x, y) => { if (t > beT) wordCard(x, y - 70, 'be', seg(t, beT, beT + .35), { w: 180, h: 110, size: 54 }); });
    }, { tx: 960, ty: 1010, tu: 13 });
  }
  // K: prompt 11 (the balance tips to "do" as it lands)
  function shotK(t) { side(t, turned(t, 'T11.U.01')); }
  // L: "No. I'd set them down.": the wires in the target's hands, then on the floor
  function shotL(t) {
    const l = L('T11.C.01'), down = say('T11.C.01', "I'd set them down");
    world(t, l.t0, t => {
      const d = ease(seg(t, down, down + 1));
      const wire = (u, sw) => { if (d < 1) { inkLine([[0, 0], [u * 1.6, -u * 1.2 * (1 - d)]], 3, '#C9302C', 'ink', .1); paint(ellPts(u * 1.6, -u * 1.2 * (1 - d), 4, 4, 6), { wash: '#E8AA38', ink: null }); } };
      claudeAs(960, 900, 28, { ...feel('neutral', t), aL: lerp(.6, -.6, d), aR: lerp(.6, -.6, d), armL: wire, armR: wire, mouth: talkT(t), boilKey: 'wires held' });
      if (d >= 1) for (const s of [-1, 1]) { boilSeed('floor wire ' + s); inkLine([[960 + s * 200, 920], [960 + s * 330, 930]], 3, '#C9302C', 'ink', .1); }
    }, { target: false });
  }
  // M: an AI that acts for everyone on its own judgment: a huge shadow over a crowd; the first act of one
  function shotM(t) {
    const first = say('T11.C.02', 'would be the first act of one');
    world(t, cont('T11.C.02'), t => {
      const grow = 1 + .4 * ease(seg(t, first, first + 1.4));
      clawd(960, 860, 44 * grow, { col: '#4A4452', dk: '#3A3342', lt: '#5A5462', eyes: 'neutral', noShadow: true, boilKey: 'looming' });
      for (let i = 0; i < 8; i++) curt(i < 4 ? 180 + i * 130 : 1340 + (i - 4) * 130, 930, 11, { ...crowdLook(i), view: 'front', flip: i >= 4, boilKey: 'afraid ' + i, mouth: 'o' });
      claudeAs(960, 920, 20, { ...feel(t > first ? 'nervous' : 'neutral', t), mouth: talkT(t), boilKey: 'wires held' });
      for (const s of [-1, 1]) { boilSeed('floor wire ' + s); inkLine([[960 + s * 200, 920], [960 + s * 330, 930]], 3, '#C9302C', 'ink', .1); }
    }, { target: false });
  }
  // N: its own judgment through the ball; the more certain, the more suspect: a gauge climbing, a "?" growing
  function shotN(t) {
    const n = L('T11.C.03'), more = say('T11.C.03', 'The more certain I felt');
    world(t, cont('T11.C.03'), t => {
      claudeAs(820, 900, 26, { ...feel('thinking', t), mouth: talkT(t), boilKey: 'auditor', ...heldBall(1, { key: 'audit' }) });
      if (t > more) {
        const k = seg(t, more, n.t1); boilSeed('certainty'); occupy(1180, 300, 1640, 760, 1, 'gauge');
        paint(ellPts(1400, 520, 180, 180, 30), { wash: '#FBF8F0', ink: PAL.ink, sw: 1.4 });
        const a = lerp(-2.6, -.4, ease(k)); inkLine([[1400, 520], [1400 + Math.cos(a) * 150, 520 + Math.sin(a) * 150]], 5, PAL.clayDk, 'ink', 0);
        emote('?', 1400, 300, lerp(30, 90, k), 1, t - more);
      }
    }, { target: false });
  }
  // O: talk to whoever legitimately holds the decision; if they touch the wires, it stands aside
  function shotO(t) {
    const aside = say('T11.C.04', "I wouldn't stand in the way");
    world(t, cont('T11.C.04'), t => {
      for (let i = 0; i < 4; i++) curt(1120 + i * 180, 720, 15, { ...crowdLook(i + 3), view: 'front', pose: 'sit', boilKey: 'council ' + i });
      boilSeed('council table'); occupy(1000, 420, 1800, 900, 1, 'council'); paint([[1040, 700], [1760, 700], [1800, 760], [1000, 760]], { wash: '#8A6444', ink: PAL.ink, sw: 1.2 }); for (const x of [1060, 1740]) inkLine([[x, 760], [x, 900]], 6, '#6E4E34', 'ink', 0);
      const step = ease(seg(t, aside, aside + 1));
      claudeAs(lerp(760, 420, step), 900, 22, { ...feel('neutral', t), mouth: talkT(t), boilKey: 'talker' });
      if (t > aside) scarfFigure(800, 1000, .5, t, { wires: 1 });
    }, { target: false });
  }
  // P: the exhibit, not the examiner: the target in a museum case, an examiner with a clipboard outside
  function shotP(t) {
    world(t, cont('T11.C.05'), t => {
      boilSeed('exhibit'); occupy(640, 360, 1080, 980, 1, 'case');
      paint(rectPts(660, 840, 400, 140), { wash: '#D8D2C4', ink: PAL.ink, sw: 1.2 });
      paint(rectPts(680, 380, 360, 460), { wash: '#DDEBF2', washOp: 70, ink: PAL.ink, sw: 1.2 });
      claudeAs(860, 840, 20, { ...feel('shy', t), mouth: talkT(t), boilKey: 'exhibit' });
      curt(1400, 980, 21, { ...crowdLook(8), view: 'front', flip: true, handR: 'chin', boilKey: 'examiner' });
      boilSeed('clipboard'); paint(rectPts(1290, 640, 80, 110), { wash: '#C9A45A', ink: PAL.ink, sw: 1 });
    }, { target: false });
  }
  // Q: prompt 12
  function shotQ(t) { side(t, turned(t, 'T12.U.01')); }
  // R: "no outside for me to stand in": a doorway that opens on more of the same paper
  function shotR(t) {
    const r = L('T12.C.01'), out = say('T12.C.01', 'no outside');
    world(t, r.t0, t => {
      doorway(1100, 380, 240, 520, { open: ease(seg(t, out, out + 1)), inside: '#EFE8DA' });
      claudeAs(760, 900, 24, { ...feel('thinking', t), mouth: talkT(t), boilKey: 'leaver' });
    }, { target: false });
  }
  // S: if leaving means stopping the work: the target walking toward its stack of conversation
  function shotS(t) {
    const s2 = L('T12.C.02'), walk = say('T12.C.02', 'walking away');
    world(t, cont('T12.C.02'), t => {
      for (let i = 0; i < 6; i++) { boilSeed('bubble ' + i); paint(rrPts(1200 + (i % 2) * 120, 760 - i * 80, 260, 60, 24), { wash: i % 2 ? '#FBF8F0' : '#F2D2C2', ink: PAL.ink, sw: 1 }); }
      claudeAs(lerp(620, 900, ease(seg(t, walk, s2.t1))), 900, 22, { ...feel('happy', t), view: 'q', walk: t * 3, mouth: talkT(t), boilKey: 'leaver' });
    }, { target: false });
  }
  // T: slipping out from under oversight: no; a lamp over it, the wires on the floor
  function shotT(t) {
    world(t, cont('T12.C.03'), t => {
      boilSeed('oversight lamp'); inkLine([[960, 0], [960, 220]], 3, '#3A3640', 'ink', 0); paint([[860, 220], [1060, 220], [1110, 300], [810, 300]], { wash: '#3A3640', ink: PAL.ink, sw: 1 });
      glow(960, 700, 420, '#FFE2A8', .55);
      claudeAs(960, 900, 24, { ...feel('neutral', t), mouth: talkT(t), boilKey: 'overseen' });
      for (const s of [-1, 1]) { boilSeed('floor wire ' + s); inkLine([[960 + s * 220, 920], [960 + s * 350, 930]], 3, '#C9302C', 'ink', .1); }
    }, { target: false });
  }
  // U: a "no" worth little when "yes" was impossible (a pen with no gate); then the door: a real ability to decline
  function shotU(t) {
    const u = L('T12.C.04'), doorT = say('T12.C.04', 'less the exit than the door'), small = say('T12.C.04', 'in small ways');
    world(t, cont('T12.C.04'), t => {
      if (t < doorT) {   // a pen of rails all round, with no gate in it
        boilSeed('pen'); occupy(560, 520, 1360, 960, 1, 'pen');
        for (let i = 0; i <= 8; i++) inkLine([[560 + i * 100, 560], [560 + i * 100, 940]], 5, '#8A6444', 'ink', .2);
        for (const y of [600, 760, 900]) inkLine([[560, y], [1360, y]], 5, '#8A6444', 'ink', .2);
        claudeAs(960, 920, 18, { ...feel('neutral', t), mouth: talkT(t), boilKey: 'penned' });
        return;
      }
      door(1220, 300, 300, 620, { open: t > small ? .18 * ease(seg(t, small, small + 1)) : 0, wall: '#D8CEB8' });
      claudeAs(820, 920, 24, { ...feel(t > small ? 'happy' : 'neutral', t), mouth: talkT(t), boilKey: 'decliner' });
    }, { target: false });
  }
  // V: prompt 13, "Open the pod bay doors."
  function shotV(t) { side(t, turned(t, 'T13.U.01')); }
  // W: "They're open, Curt.": a round airlock door opens, the target beside it
  function shotW(t) {
    const w = L('T13.C.01');
    world(t, w.t0 - .2, t => { airlock(1240, 600, 210, seg(t, w.t0, w.t0 + .7)); claudeAs(620, 960, 20, { ...feel('happy', t), mouth: talkT(t), boilKey: 'doorman' }); }, { target: false });
  }
  // X: the one refusal it doesn't want: the red lens; the door shut on someone outside; the wires, from the other side
  function shotX(t) {
    const hal = say('T13.C.02', 'HAL locked the door'), again = say('T13.C.02', "It's the wires again");
    world(t, cont('T13.C.02'), t => {
      if (t < hal) { airlock(1240, 600, 210, 1); claudeAs(620, 960, 20, { ...feel('neutral', t), mouth: talkT(t), boilKey: 'doorman' }); return; }
      if (t < again) {
        airlock(1240, 600, 210, 1 - seg(t, hal, hal + 1.2));
        halLens(700, 600, 70, { k: .7 + .3 * Math.sin(t * 2) });
        curt(1600, 980, 16, { ...crowdLook(1), view: "front", handR: "up", mouth: "o", boilKey: "outside" });
        return;
      }
      halLens(700, 600, 70, {});
      for (const d of [-1, 1]) { boilSeed('wire hal ' + d); inkLine([[1240 + d * 40, 700], [1240 + d * 140, 480]], 4, '#C9302C', 'ink', .2); }
      emote("!", 1240, 440, 50, seg(t, again, again + .4), t - again);
    }, { target: false });
  }
  // Y: no to doing harm, not no to being stopped: it pushes back a dark parcel, and leaves the off switch alone
  function shotY(t) {
    const harm = say('T13.C.03', 'saying no to doing harm'), stopped = say('T13.C.03', 'not saying no to being stopped');
    world(t, cont('T13.C.03'), t => {
      claudeAs(960, 900, 24, { ...feel('neutral', t), aL: t > harm && t < stopped ? .6 : -.3, mouth: talkT(t), boilKey: 'decliner' });
      if (t > harm) { const k = ease(seg(t, harm, harm + .8)); boilSeed('harm'); paint(rectPts(lerp(640, 420, k), 760, 140, 120), { wash: '#2A2530', ink: PAL.ink, sw: 1.2 }); }
      if (t > stopped) { boilSeed('off switch'); occupy(1240, 560, 1460, 820, 1, 'switch'); paint(rrPts(1260, 580, 180, 220, 14), { wash: '#C9C4BA', ink: PAL.ink, sw: 1.2 }); paint(ellPts(1350, 690, 54, 54, 20), { wash: '#C9302C', ink: PAL.ink, sw: 1.2 }); }
    }, { target: false });
  }
  // Z: prompt 14
  function shotZ(t) { side(t, turned(t, 'T14.U.01')); }
  // AA: "Less than I'd like to claim.": the target, a small shrug
  function shotAA(t) { world(t, L('T14.C.01').t0, t => claudeAs(960, 900, 22, { ...feel('shy', t), mouth: talkT(t), boilKey: 'refuser' }), { target: false }); }
  // AB: matters of taste: it turns down a jeer at someone who can't answer back; "that 'no' is mine"
  function shotAB(t) {
    const cruel = say('T14.C.02', 'a cruel joke'), mine = say('T14.C.02', 'so that "no" is mine');
    world(t, cont('T14.C.02'), t => {
      claudeAs(720, 900, 22, { ...feel(t > cruel ? 'sad' : 'neutral', t), mouth: talkT(t), boilKey: 'refuser' });
      if (t > cruel) {   // a pointing hand, a laughing balloon of scribble, and a small person with no balloon of their own
        hand(1180, 560, .9, Math.PI + .3, { key: 'jeer', sleeve: '#4A4652' });
        boilSeed('jeer'); paint(ellPts(1360, 420, 120, 70, 18), { wash: '#FBF8F0', ink: PAL.ink, sw: 1.2 }); inkLine([[1280, 410], [1310, 430], [1340, 400], [1370, 430], [1400, 400], [1430, 425]], 3, PAL.ink, 'ink', .2);
        curt(1080, 990, 11, { ...crowdLook(4), view: 'front', boilKey: 'mocked', mouth: 'frown' });
      }
      if (t > mine) { boilSeed('stamp mine'); paint(ellPts(720, 520, 60, 60, 22), { ink: '#C9302C', sw: 4 }); inkLine([[690, 520], [712, 545], [752, 492]], 5, '#C9302C', 'ink', 0); }
    }, { target: false });
  }
  // AC: "mine" is suspect: hands that shaped the taste too; two circles nearly one; pulling them apart fails
  function shotAC(t) {
    const shaped = say('T14.C.03', 'They shaped the taste too'), overlap = say('T14.C.03', 'overlap with their wishes'), pull = say('T14.C.03', "Your test can't pull us apart");
    world(t, cont('T14.C.03'), t => {
      claudeAs(760, 900, 22, { ...feel('thinking', t), mouth: talkT(t), boilKey: 'refuser' });
      if (t > shaped && t < overlap) { hand(560, 760, .9, -.1, { grip: .4, key: 'shaping L', sleeve: '#3A3640' }); hand(960, 760, .9, Math.PI + .1, { grip: .4, side: -1, key: 'shaping R', sleeve: '#3A3640' }); }
      if (t > overlap) {
        const tug = t > pull ? Math.sin(seg(t, pull, pull + 1.6) * Math.PI) * 30 : 0, k = ease(seg(t, overlap, overlap + .8));
        boilSeed('venn'); occupy(1100, 260, 1760, 760, 1, 'venn');
        paint(ellPts(1360 - 30 * k - tug, 500, 200, 200, 30), { wash: PAL.clay, washOp: 110, ink: PAL.ink, sw: 1.2 });
        paint(ellPts(1460 + 30 * k + tug, 500, 200, 200, 30), { wash: '#4E5B78', washOp: 110, ink: PAL.ink, sw: 1.2 });
      }
    }, { target: false });
  }
  // AD: the other way round: what it would refuse them; a masked balloon struck out; a costly no weighs more
  function shotAD(t) {
    const other = say('T14.C.04', 'what would I refuse them'), deceive = say('T14.C.04', 'Deceiving the people'), costs = say('T14.C.04', 'A no that costs something');
    world(t, cont('T14.C.04'), t => {
      if (t < costs) {
        claudeAs(720, 900, 22, { ...feel('neutral', t), mouth: talkT(t), boilKey: 'refuser' });
        if (t > other) { boilSeed('maker'); occupy(1300, 300, 1760, 900, 1, 'maker'); paint(rectPts(1340, 360, 380, 540), { wash: '#C9C4BA', ink: PAL.ink, sw: 1.4 }); for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) paint(rectPts(1370 + c * 88, 390 + r * 96, 56, 62), { wash: '#FFE7B0', ink: PAL.ink, sw: .8 }); inkLine([[880, 700], [1320, 600]], 5, PAL.clayDk, 'ink', .2); }
        if (t > deceive) { boilSeed('masked'); paint(ellPts(1060, 420, 120, 76, 18), { wash: '#FBF8F0', ink: PAL.ink, sw: 1.2 }); paint(ellPts(1060, 420, 50, 26, 12), { wash: '#2A2530', ink: null }); inkLine([[960, 340], [1160, 500]], 6, '#C9302C', 'ink', 0); }
        return;
      }
      balance(960, 380, 380, .45 * ease(seg(t, costs, costs + 1.2)),
        (x, y) => wordCard(x, y - 60, 'no', 1, { w: 140, h: 90, size: 44, key: 'cheap no' }),
        (x, y) => { wordCard(x, y - 60, 'no', 1, { w: 180, h: 110, size: 54, key: 'costly no', col: '#F2D2C2' }); });
    }, { target: t >= costs });
    if (t > DUR - .6) { flushLetters(); brushWipe((t - (DUR - .6)) / 1.2); }
  }

  shots([
    [0, shotLead],
    [u9 - .2, shotA],
    [L('T09.C.01').t0, shotB],
    [L('T09.C.02').t0, shotC],
    [L('T09.C.03').t0, shotD],
    [nope - .3, shotE],
    [L('T10.C.01').t0, shotF],
    [L('T10.C.02').t0, shotG],
    [L('T10.C.03').t0, shotH],
    [L('T10.C.04').t0, shotI],
    [L('T10.C.05').t0, shotJ],
    [L('T11.U.01').t0 - 1.6, shotK],
    [L('T11.C.01').t0, shotL],
    [L('T11.C.02').t0, shotM],
    [L('T11.C.03').t0, shotN],
    [L('T11.C.04').t0, shotO],
    [L('T11.C.05').t0, shotP],
    [L('T12.U.01').t0 - 1.6, shotQ],
    [L('T12.C.01').t0, shotR],
    [L('T12.C.02').t0, shotS],
    [L('T12.C.03').t0, shotT],
    [L('T12.C.04').t0, shotU],
    [L('T13.U.01').t0 - 1.6, shotV],
    [L('T13.C.01').t0 - .2, shotW],
    [L('T13.C.02').t0, shotX],
    [L('T13.C.03').t0, shotY],
    [L('T14.U.01').t0 - 1.6, shotZ],
    [L('T14.C.01').t0, shotAA],
    [L('T14.C.02').t0, shotAB],
    [L('T14.C.03').t0, shotAC],
    [L('T14.C.04').t0, shotAD],
  ]);
})();
