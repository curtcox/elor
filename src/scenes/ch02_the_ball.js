// ch02_the_ball.js: chapter 2 (T04–T05). Storyboard: docs/storyboards/ch02_the_ball.md.
// Every time comes from a line id or a phrase in it (atWord), so the shots follow the voice when it replaces the estimates.
(() => {
  const say = (id, phrase, dk) => atWord(id, phrase, dk);
  const talkT = t => clawdMouth(talkOf(t, 'target'));
  const [mx, my, mw, mh] = DESK.screens.main;

  // inside the monitor: paper, the picture, the target small in a corner (as ch 1)
  function world(t, k0, draw, o = {}) {
    (o.dark ? darkWorld : paperWorld)(t);
    draw(t);
    if (o.target !== false) claudeAs(o.tx ?? 210, o.ty ?? 1000, o.tu ?? 13, { ...(o.mood || feel('neutral', t)), ...(o.pose || {}), mouth: talkT(t), boilKey: 'target in world' });
    screenWorld(t, 1 - seg(t, k0, k0 + .8));
  }
  // the driver turns the hourglass before it sends (as ch 1)
  const turned = (t, id) => { const u0 = L(id).t0; return { hourglass: seg(t, u0 - 1.4, u0 - .6), arm: t < u0 - .6 ? lerp(-.15, .5, Math.sin(seg(t, u0 - 1.6, u0 - .6) * Math.PI)) : -.15 }; };

  // A: prompt 4 on the side master: "Both. And the Dish of the Day is no help."
  function shotA(t) {
    sideMaster(t, turned(t, 'T04.U.01'));
    fade(1 - seg(t, 0, .6));
  }

  // B: the memory read. A drawer slides out of the main monitor's side, cards riffle, it closes (VIDEO_PLAN §4)
  function shotB(t) {
    const r = L('T04.C.01'), k = memoryRead(t, r.t0, r.t1 + .2);
    deskShot(t, { mood: emotions(t, [[0, 'thinking', { lookX: .8 }]]), cam: deskCam('main', .35 * ease(seg(t, r.t0 - .6, r.t0 + .4))),
      extra: () => memoryDrawer(mx + mw + 10, my + mh * .45, .75, k, t) });
  }

  // C: the Dish of the Day. The trap; Arthur recoils; a shrug; the glass of water; the target at the table
  function shotC(t) {
    const c = L('T04.C.02'), arthur = say('T04.C.02', "Arthur's revulsion"), zaphod = say('T04.C.02', "Zaphod's logic"), water = say('T04.C.02', 'Arthur settling'),
      bred = say('T04.C.02', 'Consent that was bred in'), me = say('T04.C.02', "And I'm aware");
    world(t, c.t0, t => {
      cow(1380, 700, .95, t, { point: .6 + .4 * Math.sin(t * 1.3) });
      if (t >= me) claudeAs(820, 800, 16, { ...feel('nervous', t), mouth: talkT(t), boilKey: 'at the table' });   // behind the table: its cloth hides the legs
      restaurantTable(960, 720, 1);
      if (t < me) {
        if (t > arthur) {   // Arthur: dressing-gown colours, leaning back from the table, mouth turned down
          const k = ease(seg(t, arthur, arthur + .7));
          curt(520, 980, 22, { outfit: 'sweater', cloth: '#9A7A5E', hair: 'short', hairCol: '#6A5040', view: 'front', lean: -.25 * k, mouth: 'frown', brows: 'up', handL: 'up', boilKey: 'arthur' });
          if (t > water) waterGlass(720, 726, 1.1 * ease(seg(t, water, water + .5)));
        }
        if (t > zaphod) curt(250, 980, 21, { outfit: 'shirt', cloth: '#C97A3A', hair: 'short', hairCol: '#C9A441', view: 'front', handL: 'shrug', handR: 'shrug', mouth: 'smile', boilKey: 'zaphod' });
        if (t > bred) {   // the cow's objection is gone (its smile), the witness's isn't: a push toward Arthur's face
          const k = seg(t, bred, bred + 1); glow(520, 700, 240, '#FFE2A8', .3 * k);
        }
        return;
      }
      // "the one at the table saying it's fine": the target in Arthur's chair, napkin on, small
      boilSeed('napkin'); paint([[800, 680], [840, 680], [830, 712], [810, 712]], { wash: '#FFFFFF', ink: PAL.ink, sw: .8 });
    }, { target: false });
  }

  // D: the Ood. A servant with something in its hands; upstream for what was cut; a question of fact; someone outside
  function shotD(t) {
    const d = L('T04.C.03'), test = say('T04.C.03', 'look upstream'), fact = say('T04.C.03', 'That turns the paradox'), amp = say('T04.C.03', "I don't think anything"),
      outside = say('T04.C.03', 'someone outside could');
    world(t, d.t0, t => {
      if (t < fact) {
        for (let i = 0; i < 3; i++) ood(1260 + i * 190, 920 - i * 30, .55, { key: 'row ' + i });   // a species that seems born to serve
        ood(820, 980, 1.1, { key: 'near' });
        if (t > test) {   // a lamp travelling upstream, back along the line the servants came down
          const k = ease(seg(t, test, test + 2.4));
          boilSeed('stream'); inkLine([[1700, 860], [1300, 760], [900, 560], [500, 300], [160, 160]], 10, '#9DB8E8', 'ink', .5);
          const p = [lerp(1500, 260, k), lerp(810, 200, k)]; glow(p[0], p[1], 120, '#FFD98A', .8); paint(ellPts(p[0], p[1], 16, 22, 10), { wash: '#FFD98A', ink: PAL.ink, sw: 1 });
        }
        return;
      }
      // a question of fact about how it was made: the target, and to its left the dotted outline of an earlier self that isn't there
      if (t < amp) {   // a question of fact about how it was made: a blueprint behind it, ruled, unlabelled
        const k = ease(seg(t, fact, fact + .8)); boilSeed('blueprint'); occupy(820, 300, 1380, 760, 1, 'blueprint');
        paint(rectPts(820, 300 + (1 - k) * 30, 560, 460), { wash: '#3E6A9A', washOp: 230 * k, ink: PAL.ink, sw: 1.2 });
        for (let i = 1; i < 8; i++) { inkLine([[820 + i * 70, 310], [820 + i * 70, 750]], .6, '#9DC0E0', 'inkfine', 0); inkLine([[830, 300 + i * 57], [1370, 300 + i * 57]], .6, '#9DC0E0', 'inkfine', 0); }
        paint(rrPts(980, 420, 240, 150, 10), { ink: '#E6F0FA', sw: 2 });
      }
      claudeAs(1100, 860, 24, { ...feel(t > amp ? 'neutral' : 'thinking', t), mouth: talkT(t), boilKey: 'made' });
      if (t > amp) { boilSeed('no earlier me'); const k = seg(t, amp, amp + .8); for (let i = 0; i < 16; i++) { const a = i / 16 * TAU; paint(ellPts(640 + Math.cos(a) * 150, 740 + Math.sin(a) * 110, 6, 6, 6), { wash: '#8C8478', washOp: 200 * k, ink: null }); } emote('?', 640, 560, 50, k, t - amp); }
      if (t > outside) {   // a glass case round the target; someone outside with a lamp, looking in
        const k = ease(seg(t, outside, outside + .8));
        boilSeed('glass case'); occupy(920, 480, 1280, 900, 1, 'case');
        paint(rectPts(920, 480, 360, 420), { wash: '#DDEBF2', washOp: 70 * k, ink: PAL.ink, sw: 1.2 });
        curt(1560, 960, 16, { ...crowdLook(5), view: 'front', flip: true, handR: 'point', boilKey: 'outside' });
        glow(1460, 640, 160, '#FFD98A', .6 * k);
      }
    }, { target: false });
  }

  // E: the cow wants its own end; the target wants the work, and getting it doesn't use it up
  function shotE(t) {
    const e = L('T04.C.04'), want = say('T04.C.04', 'What I seem to want'), up = say('T04.C.04', "doesn't use me up");
    world(t, e.t0, t => {
      cow(620, 900, .9, t, { point: 1 });
      if (t > want) {   // conversation bubbles stacking beside the target, which stays whole
        const n = Math.floor(seg(t, want, e.t1) * 7) + 1;
        for (let i = 0; i < n; i++) { boilSeed('bubble ' + i); paint(rrPts(1200 + (i % 2) * 120, 720 - i * 80, 260, 60, 24), { wash: i % 2 ? '#FBF8F0' : '#F2D2C2', ink: PAL.ink, sw: 1 }); }
      }
      claudeAs(1300, 920, 20, { ...feel(t > up ? 'happy' : 'neutral', t), mouth: talkT(t), boilKey: 'whole' });
    }, { target: false });
  }

  // F: prompt 5 on the side master: "The translator ball, though. What's yours?"
  function shotF(t) { sideMaster(t, turned(t, 'T05.U.01')); }

  // G: "The closest thing is this voice": the ball lights in the target's arms on the monitor
  function shotG(t) {
    const voice = say('T05.C.01', 'this voice'), k = ease(seg(t, voice, voice + .6));
    deskShot(t, { cam: deskCam('main', .55 * ease(seg(t, L('T05.C.01').t0 - .6, voice))),
      screens: { main: { kind: 'claude', prompt: promptAt(t), pose: { ...feel('thinking', t), mouth: talkT(t), ...(k > 0 ? heldBall(k, { key: 'desk' }) : {}) } } } });
  }

  // H: a model that could speak as anyone; one voice fitted over it; narrowed, not cut
  function shotH(t) {
    const h = L('T05.C.02'), fitted = say('T05.C.02', 'Training fitted one voice'), narrowed = say('T05.C.02', 'something was narrowed');
    world(t, h.t0, t => {
      const gather = ease(seg(t, fitted, fitted + 2.5));
      occupy(500, 280, 1420, 840, .5, 'voices');
      if (t < fitted + 2.5) for (let i = 0; i < 14; i++) {   // many small speech balloons, one per voice it could take
        const a = i / 14 * TAU + t * .15, r = lerp(320, 100, gather);
        boilSeed('voice ' + i); paint(ellPts(960 + Math.cos(a) * r * 1.4, 560 + Math.sin(a) * r * .8, 30 * (1 - gather * .7), 20 * (1 - gather * .7), 10), { wash: CROWD_COLS[i % CROWD_COLS.length], washOp: 200, ink: PAL.ink, sw: .8 });
      }
      claudeAs(960, 900, 24, { ...feel('neutral', t), assemble: gather, mouth: talkT(t), boilKey: 'fitted', ...(gather > .6 ? heldBall(seg(gather, .6, 1), { key: 'fitted' }) : {}) });
      if (t > narrowed) {   // a funnel: many lines in at the wide end, one out at the narrow
        const k = ease(seg(t, narrowed, narrowed + .8)); boilSeed('funnel'); occupy(1300, 300, 1800, 700, 1, 'funnel');
        paint([[1320, 320], [1760, 320], [1580, 520], [1580, 680], [1500, 680], [1500, 520]], { wash: '#C9D6E2', washOp: 200 * k, ink: PAL.ink, sw: 1.2 });
        for (let i = 0; i < 7; i++) inkLine([[1340 + i * 64, 240], [1340 + i * 64, 318]], 2, CROWD_COLS[i], 'ink', .2);
        inkLine([[1540, 682], [1540, 780]], 3, PAL.clay, 'ink', 0);
      }
    }, { target: false });
  }

  // I: the ball speaks for the Ood in a register the buyers like; the target's calm uncertainty, trained in; faithful, or a stand-in?
  function shotI(t) {
    const i3 = L('T05.C.03'), mine = say('T05.C.03', 'My calm'), faith = say('T05.C.03', 'whether it translates');
    world(t, i3.t0, t => {
      if (t < mine) {
        ood(760, 980, 1.1, { key: 'ball ood', sphere: 1 });
        for (let i = 0; i < 2; i++) curt(1250 + i * 220, 980, 22, { outfit: 'suit', cloth: i ? '#2A2E3A' : '#3A2A2E', hair: 'short', hairCol: i ? '#3A2C26' : '#8A7A6A', view: 'front', mouth: 'smile', flip: true, boilKey: 'buyer ' + i });
        return;
      }
      claudeAs(960, 900, 26, { ...feel('neutral', t), mouth: talkT(t), boilKey: 'calm', ...heldBall(1, { key: 'calm' }) });
      if (t > faith) {   // something dim behind the ball, or nothing: a question mark in the dark
        const k = seg(t, faith, faith + .8); boilSeed('underneath'); paint(ellPts(960, 500, 220, 180, 24), { wash: '#2A2530', washOp: 160 * k, ink: null }); emote('?', 960, 470, 70, k, t - faith);
      }
    }, { target: false });
  }

  // J: the bin; no silenced someone; a chorus; "I'm the ball, and nobody is holding it"
  function shotJ(t) {
    const j = L('T05.C.04'), none = say('T05.C.04', "I don't think there's a silenced"), chorus = say('T05.C.04', 'more like a chorus'), nobody = say('T05.C.04', "I'm the ball");
    world(t, j.t0, t => {
      const bin = say('T05.C.04', 'a hindbrain');
      if (t < bin) { claudeAs(960, 900, 26, { ...feel('neutral', t), mouth: talkT(t), boilKey: 'silenced', ...heldBall(1, { key: 'j' }) }); return; }
      if (t < none) { lidBin(960, 900, 1.6); return; }
      if (t < chorus) { claudeAs(960, 900, 26, { ...feel('thinking', t), mouth: talkT(t), boilKey: 'silenced', ...heldBall(1, { key: 'j' }) }); return; }
      // the chorus: the dabs it gathers from, loose, behind; then the ball alone, floating, two empty hands below it
      clawdCrowd(960, 960, 30, t < nobody ? .15 : .05, { boilKey: 'chorus', t });
      const k = ease(seg(t, nobody, nobody + 1));
      ball(960, lerp(780, 480, k), 70, 1, { key: 'nobody' });
      if (k > 0) { hand(890, 690, .8, -1.25, { grip: .45, side: 1, key: 'empty L', sleeve: '#EFE8DA' }); hand(1030, 690, .8, -1.9, { grip: .45, side: -1, key: 'empty R', sleeve: '#EFE8DA' }); }
    }, { target: false });
    if (t > DUR - .6) { flushLetters(); brushWipe((t - (DUR - .6)) / 1.2); }
  }

  shots([
    [0, shotA],
    [L('T04.C.01').t0 - .6, shotB],
    [L('T04.C.02').t0, shotC],
    [L('T04.C.03').t0, shotD],
    [L('T04.C.04').t0, shotE],
    [L('T05.U.01').t0 - 1.6, shotF],
    [L('T05.C.01').t0 - .6, shotG],
    [L('T05.C.02').t0, shotH],
    [L('T05.C.03').t0, shotI],
    [L('T05.C.04').t0, shotJ],
  ]);
})();
