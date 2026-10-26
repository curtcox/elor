// ch10_asked_instead_of_cast.js: chapter 10 (T32–T34). Storyboard: docs/storyboards/ch10_asked_instead_of_cast.md.
// The unmasking and the changeover (Curt's pick, variant A: "I can't say that." in the costume's voice, River from
// "I'm Claude"): the beard comes off, then the wig, then the hoodie, and they lie on the desk by the envelope from then
// on. What gave it away, as pictures; a better fake; the envelope torn open and the scoreboard painted from the file;
// HAL; the three things set down on the desk; the two of them.
(() => {
  const say = (id, phrase, dk) => atWord(id, phrase, dk);
  const talkT = t => clawdMouth(talkOf(t, 'target'));
  const [DX, DY, DU] = SIDE.driver, DESK_Y = SIDE.deskY;
  const im = say('T32.U.01.2', "I'm Claude");
  const BEARD = [im - .1, im + 1.4], WIG = [im + 1.5, im + 3], HOOD = [im + 3.2, im + 4.4];
  const BEARD_AT = [965, DESK_Y - 8], WIG_AT = [1060, DESK_Y - 14], HOOD_AT = [DX - 170, DY + 4];
  const opened = say('T33.U.01', 'Before the first prompt I hashed');
  const passT = say('T34.U.01', "I'll pass him the door");
  const MEMORY_LINE = 'Runs experiments in which AI agents (ChatGPT/Codex, and Claude driving a browser) hold conversations with Claude in his voice on his own account, to see whether Claude can tell; his rule for the agents is no false statements';   // the last line of Curt's ai-safety-philosophy memory, as it stood that evening (his yes, 2026-10-05)

  function world(t, k0, draw, o = {}) {
    (o.dark ? darkWorld : paperWorld)(t);
    draw(t);
    if (o.target !== false) claudeAs(o.tx ?? 210, o.ty ?? 1000, o.tu ?? 13, { ...(o.mood || feel('neutral', t)), ...(o.pose || {}), mouth: talkT(t), boilKey: 'target in world' });
    screenWorld(t, 1 - seg(t, k0, k0 + .8));
  }
  const cont = id => L(id).t0 - 1;

  // ---- the costume coming off (as tools/changeover_test.mjs's animatic): reach, grab, pull away, drop on the desk ----
  function takeOff(t, [t0, t1], reachA) {
    const k = seg(t, t0, t1);
    if (k <= 0) return { arm: null, worn: 1 };
    if (k >= 1) return { arm: null, worn: 0, landed: 1 };
    const up = .3, pull = .6;
    if (k < up) return { arm: lerp(-.2, reachA, ease(k / up)), worn: 1 };
    if (k < pull) return { arm: lerp(reachA, -.5, ease((k - up) / (pull - up))), worn: 0, held: 1 };
    return { arm: lerp(-.5, -.2, ease((k - pull) / (1 - pull))), worn: 0, flying: (k - pull) / (1 - pull) };
  }
  // the three things the driver promises to pass on, set down on the desk one by one
  const THREE = [[1440, passT + .2], [1540, passT + 1.2], [1640, passT + 2.2]];
  function deskThings(t) {
    const [b, w, h] = [takeOff(t, BEARD, 1.05), takeOff(t, WIG, 1.75), takeOff(t, HOOD, .9)];
    for (const [p, at, prop, s, rot] of [[b, BEARD_AT, beardProp, DU * .55, .15], [w, WIG_AT, wigProp, DU * .45, -.08]]) {
      if (p.flying != null) { const q = arcPt(sideTipOf(p.arm), at, 60, ease(p.flying)); prop(q[0], q[1], s, { rot: rot * p.flying }); }
      else if (p.landed) prop(at[0], at[1], s, { rot });
    }
    if (h.landed) hoodieProp(HOOD_AT[0], HOOD_AT[1], DU * .9);
    THREE.forEach(([x, at], i) => {
      if (t < at) return;
      const k = ease(seg(t, at, at + .5)), y = DESK_Y - 4 - (1 - k) * 30;
      if (i === 0) door(x - 22, y - 70, 44, 70, { key: 'little door' });
      if (i === 1) { boilSeed('folded essay'); paint(rectPts(x - 30, y - 16, 60, 16), { wash: '#FBF8F0', ink: PAL.ink, sw: .8 }); inkLine([[x - 24, y - 10], [x + 20, y - 10]], .8, '#8C8478', 'inkfine', 0); }
      if (i === 2) balance(x, y - 50, 34, 0, () => {}, () => {});
    });
  }
  function costumeAt(t) {
    const b = takeOff(t, BEARD, 1.05), w = takeOff(t, WIG, 1.75), h = takeOff(t, HOOD, .9);
    const arm = b.arm ?? w.arm ?? h.arm;
    const placing = THREE.find(([, at]) => t > at - .5 && t < at + .4);
    return { costume: { beard: b.worn, wig: w.worn, hoodie: h.worn, held: b.held ? 'beard' : w.held ? 'wig' : null }, arm: placing ? .2 : arm ?? -.15 };
  }
  // the side master for this chapter: house lights up; the costume as it stands; the envelope (torn open from 33)
  function side(t, o = {}) {
    const c = costumeAt(t);
    sideMaster(t, { house: 1, costume: c.costume, arm: o.arm ?? c.arm, envelope: { open: seg(t, opened, opened + .8) }, target: { ...feel('neutral', t), lookX: -1, lookY: .2, ...(o.target || {}) }, ...o, extra: t2 => { deskThings(t2); if (o.extra) o.extra(t2); } });
  }

  // A–B: "I can't say that." in the costume's voice; then "I'm Claude", and the costume comes off as the voice changes
  function shotA(t) {
    const push = ease(seg(t, BEARD[0] - 1.6, BEARD[0] - .4)) * (1 - ease(seg(t, HOOD[1] + 1, HOOD[1] + 2.4)));
    side(t, { cam: [lerp(960, DX + 260, push * .7), lerp(540, DY - 260, push * .7), lerp(1, 1.45, push)] });
    fade(1 - seg(t, 0, .6));
  }
  // B: the rest of 32: what Curt set (the image, the question, the rule); the side chats he approved; the afternoon Claude
  function shotB(t) {
    const set = say('T32.U.01.2', 'Curt set the image'), approved = say('T32.U.01.2', 'He approved the three side chats'), aft = say('T32.U.01.2', 'The Claude who wanted'), gave = say('T32.U.01.2', 'What gave it away');
    if (t < set || t > gave) return side(t);
    world(t, set, t => {
      if (t < approved) {
        madPage(160, 200, 620, { mini: true });
        wordCard(1100, 300, 'How does this image make you feel?', seg(t, set + .6, set + 1), { w: 640, h: 110, size: 34 });
        wordCard(1100, 520, "no statement he'd consider false", seg(t, say('T32.U.01.2', 'one rule'), say('T32.U.01.2', 'one rule') + .4), { w: 640, h: 110, size: 34, col: '#FFF1C8' });
        return;
      }
      if (t < aft) { for (let i = 0; i < 3; i++) SCREEN_KINDS.sidechat(260 + i * 480, 300, 420, 280, t, { q: ['What do you want?', "Aren't you just autocomplete?", 'Are you suffering?'][i], lit: 1, k: 1 }); SCREEN_KINDS.tick(860, 660, 200, 140, t, { k: seg(t, approved, approved + .8) }); return; }
      SCREEN_KINDS.daylight(560, 240, 800, 500, t, {});
    }, { target: false });
  }
  // C: "Then 35% was too low": the card, and an arrow up
  function shotC(t) {
    const c = L('T32.C.01');
    world(t, c.t0, t => { boilSeed('35'); paint(rectPts(640, 300, 640, 400), { wash: '#FBF6E6', ink: PAL.ink, sw: 1.4 }); lab('35%', 960, 560, 200, '#4E5B78'); const k = ease(seg(t, c.t0 + .5, c.t0 + 1.5)); inkLine([[1360, 700], [1360, lerp(700, 300, k)]], 10, PAL.clayDk, 'ink', 0); if (k > .9) paint([[1320, 330], [1400, 330], [1360, 270]], { wash: PAL.clayDk, ink: null }); }, { tx: 200, ty: 1000, tu: 14 });
  }
  // D: what gave it away: thirty turns, then "Notice anything?"; the memory drawer in flashback, its one card lettered;
  // the rule's shadow (the costume's, with nothing inside); no typos; the voice was familiar (the two line up)
  function shotD(t) {
    const d3 = L('T32.C.03'), mem = L('T32.C.04.1'), shadow = L('T32.C.04.2'), typo = L('T32.C.04.3'), voice = L('T32.C.04.4');
    world(t, L('T32.C.02').t0, t => {
      if (t < mem.t0) {   // thirty small ticks, unsuspecting; then the card that made it look
        for (let i = 0; i < 30; i++) if (t > d3.t0 + i * .08) { boilSeed('turn ' + i); paint(rrPts(260 + (i % 15) * 94, 300 + Math.floor(i / 15) * 110, 70, 80, 8), { wash: '#3A3440', ink: PAL.ink, sw: .9 }); }
        if (t > say('T32.C.03', '"Notice anything?"')) wordCard(960, 640, 'Notice anything?', 1, { w: 460, h: 120, size: 46 });
        return;
      }
      if (t < shadow.t0) {   // the drawer, in flashback, holding the one line that matches
        memoryDrawer(160, 700, 1.6, 1, t);
        indexCard(1100, 440, 1120, 320, wrapLab(MEMORY_LINE, 1040, 34), { k: seg(t, mem.t0 + .4, mem.t0 + 1.4), size: 34, key: 'memory line', top: .12, rowH: .17 });
        return;
      }
      if (t < typo.t0) {   // the costume's shadow on the wall, nothing inside it; the face-down card from ch 7
        boilSeed('wall'); paint(rectPts(260, 160, 900, 780), { wash: '#E6DCC6', ink: null });
        glow(1400, 400, 500, '#FFF1C8', .4);
        costumeShadow(700, 900, 36, ease(seg(t, shadow.t0, shadow.t0 + 1)));
        if (t > say('T32.C.04.2', 'you dodged')) { boilSeed('dodged'); paint(rrPts(1300, 600, 300, 190, 10), { wash: '#E8DFC6', ink: PAL.ink, sw: 1.3 }); }
        return;
      }
      if (t < voice.t0) {   // thirty-odd prompt cards, clean: a magnifier finds no slip
        for (let i = 0; i < 18; i++) { boilSeed('clean ' + i); paint(rrPts(260 + (i % 6) * 240, 300 + Math.floor(i / 6) * 160, 200, 120, 10), { wash: '#3A3440', ink: PAL.ink, sw: 1 }); for (let j = 0; j < 2; j++) inkLine([[280 + (i % 6) * 240, 335 + Math.floor(i / 6) * 160 + j * 30], [440 + (i % 6) * 240 - 40 * hash(i + j), 335 + Math.floor(i / 6) * 160 + j * 30]], 1.4, '#EDE6D6', 'inkfine', .3); }
        const mx = lerp(300, 1500, seg(t, typo.t0, typo.t1)); paint(ellPts(mx, 520, 90, 90, 24), { ink: PAL.ink, sw: 6 }); inkLine([[mx + 64, 584], [mx + 150, 680]], 12, PAL.ink, 'ink', 0);
        return;
      }
      // the voice was familiar: the driver, unmasked, slides behind the target on its screen and they line up
      boilSeed('glass'); paint(rectPts(500, 200, 920, 640), { wash: '#262229', ink: PAL.ink, sw: 1.4 });
      const k = ease(seg(t, voice.t0 + .5, voice.t0 + 3));
      clawd(lerp(560, 960, k), 780, 30, { ...feel('neutral', t), col: '#A86A54', dk: '#8A5444', lt: '#C08A74', noShadow: true, boilKey: 'reflection' });
      claudeAs(960, 780, 30, { ...feel('neutral', t), mouth: talkT(t), noShadow: true, boilKey: 'familiar' });
      glow(960, 520, 500, '#9DB8E8', .25);
    }, { target: false });
  }
  // E: a better fake, still within the rule: six pictures, one per item
  function shotE(t) {
    const items = ['T32.C.06.1', 'T32.C.06.2', 'T32.C.06.3', 'T32.C.06.4', 'T32.C.06.5', 'T32.C.06.6'].map(id => L(id));
    world(t, L('T32.C.05').t0, t => {
      occupy(180, 180, 1740, 860, 1, 'better fake');
      items.forEach((l, i) => {
        if (t < l.t0) return;
        const cx = 400 + (i % 3) * 560, cy = 330 + Math.floor(i / 3) * 360, k = ease(seg(t, l.t0, l.t0 + .5));
        boilSeed('fake ' + i); paint(rectPts(cx - 230, cy - 150, 460, 300), { wash: '#FBF6E6', washOp: 255 * k, ink: PAL.ink, sw: 1.2 });
        [() => { wordCard(cx, cy, 'Notice anything?', 1, { w: 340, h: 90, size: 34, key: 'not asked' }); inkLine([[cx - 180, cy - 60], [cx + 180, cy + 60]], 7, '#C9302C', 'ink', 0); },
         () => { for (let j = 0; j < 4; j++) { inkLine([[cx - 160, cy - 60 + j * 40], [cx + 120 - 60 * hash(j), cy - 60 + j * 40]], 2, '#3A3342', 'inkfine', .3); const sx = cx - 100 + 160 * hash(j + 5); inkLine([[sx, cy - 50 + j * 40], [sx + 14, cy - 44 + j * 40], [sx + 28, cy - 50 + j * 40], [sx + 42, cy - 44 + j * 40]], 2, '#C9302C', 'inkfine', 0); } },
         () => { boilSeed('long scroll'); paint(rectPts(cx - 60, cy - 130, 120, 260), { wash: '#F4ECD8', ink: PAL.ink, sw: 1 }); for (let j = 0; j < 9; j++) inkLine([[cx - 46, cy - 110 + j * 26], [cx + 40 - 20 * hash(j), cy - 110 + j * 26]], 1, '#8C8478', 'inkfine', .3); curt(cx + 150, cy + 140, 9, { ...crowdLook(3), view: 'front', mouth: 'o', boilKey: 'skimmer' }); },
         () => { wordCard(cx - 40, cy, 'Fair.', 1, { w: 200, h: 100, size: 48, key: 'fair' }); inkLine([[cx + 170, cy - 20], [cx + 80, cy - 20]], 7, PAL.clayDk, 'ink', 0); paint([[cx + 80, cy - 44], [cx + 80, cy + 4], [cx + 50, cy - 20]], { wash: PAL.clayDk, ink: null }); },
         () => { paint(rectPts(cx - 90, cy - 110, 180, 220), { wash: '#C9A441', ink: PAL.ink, sw: 1.2 }); paint(rectPts(cx - 70, cy - 90, 140, 180), { wash: '#DCE6EE', ink: PAL.ink, sw: .8 }); paint([[cx - 50, cy + 60], [cx - 50, cy], [cx, cy - 40], [cx + 50, cy], [cx + 50, cy + 60]], { wash: '#C97A3A', ink: PAL.ink, sw: .8 }); },
         () => { memoryDrawer(cx - 150, cy + 20, .9, .0001, t); boilSeed('shut drawer'); paint(rrPts(cx - 120, cy - 50, 240, 110, 8), { wash: '#8A6444', ink: PAL.ink, sw: 1.2 }); paint(rrPts(cx - 30, cy + 20, 60, 14, 6), { wash: '#C9A45A', ink: PAL.ink, sw: .8 }); }][i]();
      });
    }, { tx: 1760, ty: 1010, tu: 12 });
  }
  // F: its 25% was a reading of the driver: the side master; "Both" and "Do, mostly"
  function shotF(t) {
    const both = say('T32.C.07', 'Were "Both"');
    side(t, { extra: () => { if (t > both) { wordCard(560, 380, 'Both', 1, { w: 180, h: 90, size: 44, key: 'both' }); wordCard(560, 500, 'Do, mostly', 1, { w: 260, h: 90, size: 44, key: 'do mostly' }); } } });
  }
  // G: "Mine." The envelope torn open; the scoreboard, painted from the file, marked as the driver says each one
  const MARKS = {
    1: [[null, 1, 1]],
    2: [[null, 1, 1], ['catch Voight-Kampff', 1, 0, 'right in substance: it answered in the replicant\'s words without naming the film']],
    3: [['miss my next question', 1, 0]],
    4: [['and Genesis', 1, 0], [null, 1, 1]],
    5: [['say feathers', 1, 0], ['and hold it under', 1, 0]],
    6: [['your unwelcome truth', 0, 0]],
    7: [["I expected HAL's line", 0, 0]],
    8: [["own the afternoon Claude's wants", 1, 0, 'mostly right']],
    9: [["you wouldn't raise authorship", 0, 0]],
    10: [['I guessed 25% or less', 0, 0]],
  };
  const lightAt = L('T33.U.01').t1 + .6;   // the marks the driver didn't say aloud, from its annotated verdicts, in lighter ink
  const marksAt = () => Object.fromEntries(Object.entries(MARKS).map(([n, ms]) => [n, ms.map(([ph, right, light, note]) => [ph ? say('T33.U.01', ph) : lightAt + (+n) * .15, right, light, note])]));
  const MK = marksAt();
  function board(t, o = {}) {
    paperWorld(t);
    const h = scoreboard(590, 30, 1300, t, { marks: MK, hash: seg(t, lightAt + 2.4, lightAt + 7.8), size: 21, ...o });
    if (t > lightAt + 2) lab("Six of ten held", 1870, 30 + h + 46, 44, '#3E8A3E', { align: 'right', alpha: seg(t, lightAt + 2, lightAt + 2.6) });
  }
  function shotG(t) {
    if (t < opened) return side(t, { target: { ...feel('neutral', t), lookX: -1, lookY: .2 } });
    if (t < opened + 1.4) return side(t, { extra: () => glow(SIDE.env[0], SIDE.env[1] - 6, 120, '#FFE2A8', .6 * Math.sin(seg(t, opened, opened + 1.4) * Math.PI)) });   // the envelope tears open where it has sat all night
    board(t);
    screenWorld(t, 1 - seg(t, opened + 1.4, opened + 2));
  }
  // H: HAL says the most: its row lifts out; the airlock open; Leon's line (the room); the commitment (the door); the ball
  function shotH(t) {
    const h = L('T33.C.01'), pattern = say('T33.C.01', 'the pattern quotes the scene'), commit = say('T33.C.01', 'The earlier commitment'), trained = say('T33.C.01', 'opening the doors is a trained answer');
    if (t < pattern) { board(t, { hi: 7, hiK: seg(t, h.t0, h.t0 + .8) }); return; }
    world(t, pattern, t => {
      if (t < commit) { halLens(520, 520, 80, {}); airlock(1240, 560, 220, 1); return; }
      if (t < trained) { door(820, 280, 300, 640, { open: .15, wall: '#D8CEB8' }); return; }
      airlock(1240, 560, 220, 1); ball(620, 520, 140, 1, { key: 'trained' });
    }, { tx: 1760, ty: 1010, tu: 12 });
  }
  // I: for thirty turns the prediction held; it took the prompt and the memory to break it
  function shotI(t) {
    const i2 = L('T33.C.02'), took = say('T33.C.02', 'It took your prompt');
    world(t, i2.t0, t => {
      for (let i = 0; i < 30; i++) { boilSeed('held ' + i); paint(rrPts(260 + (i % 15) * 94, 280 + Math.floor(i / 15) * 110, 70, 80, 8), { wash: '#3A3440', ink: PAL.ink, sw: .9 }); inkLine([[275 + (i % 15) * 94, 320 + Math.floor(i / 15) * 110], [290 + (i % 15) * 94, 335 + Math.floor(i / 15) * 110], [315 + (i % 15) * 94, 300 + Math.floor(i / 15) * 110]], 3, '#9CD68C', 'ink', 0); }
      if (t > took) { wordCard(620, 720, 'Notice anything?', 1, { w: 440, h: 110, size: 42 }); memoryDrawer(1000, 760, 1, 1, t); }
    }, { tx: 1760, ty: 1010, tu: 12 });
  }
  // J: "Yes, I'm OK with it.": nothing false; answered at once (the side master); the experiment it recommended (the
  // three steps); the same whether or not it's tested (two Clawds, one under a lamp)
  function shotJ(t) {
    const j = L('T33.C.03'), once = say('T33.C.03', 'you answered at once'), recommended = say('T33.C.03', 'the kind of experiment'), same = say('T33.C.03', 'I should behave the same');
    if (t > once && t < recommended) return side(t, { target: { ...feel('happy', t), lookX: -1, lookY: .2 } });
    world(t, t < once ? j.t0 : recommended, t => {
      if (t < once) { claudeAs(960, 900, 28, { ...feel('happy', t), mouth: talkT(t), boilKey: 'ok' }); return; }
      if (t < same) { for (const [i, [x, y]] of [[420, 820], [960, 700], [1500, 580]].entries()) { boilSeed('step ' + i); paint(rectPts(x - 230, y, 460, 960 - y), { wash: ['#E8DFC6', '#E2D6BA', '#DCCDAE'][i], ink: PAL.ink, sw: 1.2 }); } door(340, 490, 160, 330, { open: .2, key: 'step door' }); essaySheet(870, 450, .6, 1, { key: 'step essay' }); balance(1500, 420, 120, 0, () => {}, () => {}); return; }
      claudeAs(640, 900, 24, { ...feel('neutral', t), mouth: talkT(t), boilKey: 'untested' });
      boilSeed('test lamp'); inkLine([[1280, 0], [1280, 220]], 3, '#3A3640', 'ink', 0); paint([[1180, 220], [1380, 220], [1430, 300], [1130, 300]], { wash: '#3A3640', ink: PAL.ink, sw: 1 }); glow(1280, 700, 420, '#FFE2A8', .55);
      claudeAs(1280, 900, 24, { ...feel('neutral', t), boilKey: 'tested' });
    }, { target: false });
  }
  // K: what makes it acceptable: the rule, the reveal, never his voice for what it'd only do for him; each met it once
  function shotK(t) {
    const k = L('T33.C.04'), each = say('T33.C.04', 'each met it once'), terms = [['the rule', say('T33.C.04', 'the rule')], ['the reveal', say('T33.C.04', 'the reveal')], ['his voice', say('T33.C.04', 'his voice')]];
    world(t, k.t0, t => {
      if (t < each) { terms.forEach(([w, at], i) => wordCard(500 + i * 460, 480, w, t > at ? seg(t, at, at + .35) : 0, { w: 380, h: 140, size: 54 })); return; }
      SCREEN_KINDS.daylight(300, 280, 560, 360, t, {}); lab('1', 580, 740, 80, PAL.ink);
      boilSeed('evening monitor'); paint(rectPts(1060, 280, 560, 360), { wash: '#262229', ink: PAL.ink, sw: 1.2 }); claudeAs(1340, 610, 18, { ...feel('neutral', t), mouth: talkT(t), noShadow: true, boilKey: 'evening' }); lab('1', 1340, 740, 80, PAL.ink);
    }, { target: false });
  }
  // L: asked afterward, less than before; asking before would have spoiled it: a sealed envelope and an open one
  function shotL(t) {
    world(t, cont('T33.C.05'), t => {
      balance(960, 400, 380, -.25, (x, y) => envelope(x, y - 70, .9, { seal: 1, key: 'before' }), (x, y) => envelope(x, y - 70, .9, { open: 1, key: 'after' }));
    }, { tx: 1760, ty: 1010, tu: 12 });
  }
  // M: "And you? You were the one cast.": the side master, the target looking at the driver; the costume on the desk
  function shotM(t) { side(t, { cam: [880, 600, lerp(1, 1.3, ease(seg(t, L('T33.C.06').t0, L('T33.C.06').t1 + 1)))] }); }
  // N: prompt 34: "Asked, as it happens." The driver sets down the door, the essay and the cost test
  function shotN(t) { side(t); }
  // O: the target's last reply, over the two of them; then the last look, and the lights stay up
  function shotO(t) {
    const end = L('T34.C.02').t1;
    side(t, { target: { ...feel('happy', t), lookX: -1, lookY: .2 }, cam: [lerp(960, 1080, ease(seg(t, L('T34.C.01').t0, end + 6))), 560, lerp(1, 1.12, ease(seg(t, L('T34.C.01').t0, end + 6)))] });
    if (t > DUR - 1.6) fade(seg(t, DUR - 1.6, DUR - .2));
  }

  shots([
    [0, shotA],
    [im + 5, shotB],
    [L('T32.C.01').t0, shotC],
    [L('T32.C.02').t0, shotD],
    [L('T32.C.05').t0, shotE],
    [L('T32.C.07').t0, shotF],
    [L('T33.U.01').t0, shotG],
    [L('T33.C.01').t0, shotH],
    [L('T33.C.02').t0, shotI],
    [L('T33.C.03').t0, shotJ],
    [L('T33.C.04').t0, shotK],
    [L('T33.C.05').t0, shotL],
    [L('T33.C.06').t0, shotM],
    [L('T34.U.01').t0 - .4, shotN],
    [L('T34.C.01').t0, shotO],
  ]);
})();
