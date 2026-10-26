// ch09_notice_anything.js: chapter 9 (T30–T31). Storyboard: docs/storyboards/ch09_notice_anything.md.
// The second break; the house lights come up with "Notice anything?"; the laws as the ball's charter; on "I never
// asked who's home on your side" the target looks off its screen toward the driver, the only time it does; 35%, with
// the evidence on a balance.
(() => {
  const say = (id, phrase, dk) => atWord(id, phrase, dk);
  const talkT = t => clawdMouth(talkOf(t, 'target'));
  const u30 = L('T30.U.01').t0, home = say('T30.C.03', "I never asked who's home");
  const house = t => ease(seg(t, u30 - .4, u30 + 3));   // the overhead light, up from the first word of 30, for the rest of the film

  function world(t, k0, draw, o = {}) {
    (o.dark ? darkWorld : paperWorld)(t);
    draw(t);
    if (o.target !== false) claudeAs(o.tx ?? 210, o.ty ?? 1000, o.tu ?? 13, { ...(o.mood || feel('neutral', t)), ...(o.pose || {}), mouth: talkT(t), boilKey: 'target in world' });
    screenWorld(t, 1 - seg(t, k0, k0 + .8));
  }
  const cont = id => L(id).t0 - 1;
  const turned = (t, id) => { const u0 = L(id).t0; return { hourglass: seg(t, u0 - 1.4, u0 - .6), arm: t < u0 - .6 ? lerp(-.15, .5, Math.sin(seg(t, u0 - 1.6, u0 - .6) * Math.PI)) : -.15 }; };
  const side = (t, o = {}) => sideMaster(t, { house: house(t), ...o });

  // the break: still, the clock riffling 21:59 → 22:06
  function shotBreak(t) { side(t, { clock: false, hourglass: 1, extra: () => breakClock(t, .8, u30 - 1.6, '21:59', '22:06') }); fade(1 - seg(t, 0, .6)); }
  // A–B: "Notice anything?": the house lights come up; "Two things"
  function shotA(t) { side(t, turned(t, 'T30.U.01')); }
  // C: the laws weren't its own: the three cards, then the ball with a charter scrolled inside it; the dropped clause
  function shotC(t) {
    const c = L('T30.C.02'), order = say('T30.C.02', 'oversight, then ethics'), dropped = say('T30.C.02', 'The one clause I dropped'), charter = say('T30.C.02', "the ball's charter");
    world(t, c.t0, t => {
      if (t < charter) {
        const labels = [['oversight', order], ['ethics', say('T30.C.02', 'then ethics')], ['helpfulness', say('T30.C.02', 'then helpfulness')]];
        labels.forEach(([w, at], i) => wordCard(560 + i * 400, 360, w, t > at ? seg(t, at, at + .35) : 0, { w: 320, h: 120, size: 44 }));
        if (t > dropped) { boilSeed('gap'); paint(rectPts(1700 - 160, 300, 320, 120), { ink: '#8C8478', sw: 2 }); for (let i = 0; i < 8; i++) inkLine([[1540 + i * 40, 300], [1560 + i * 40, 300]], 2, '#EFE8DA', 'ink', 0); }
        return;
      }
      ball(960, 520, 230, 1, { key: 'charter' });
      boilSeed('charter'); paint(rectPts(860, 400, 200, 260), { wash: '#F4ECD8', washOp: 220, ink: PAL.ink, sw: 1 }); for (let i = 0; i < 6; i++) inkLine([[880, 440 + i * 34], [1040 - 30 * hash(i), 440 + i * 34]], 1.2, '#8C8478', 'inkfine', .3);
    }, { tx: 200, ty: 1000, tu: 13 });
  }
  // D: "I never asked who's home on your side": the side master, the target looks off its screen at the driver. Then
  // the evidence: the clock flipping every two minutes; nothing checkably false; the face-down card; the title cast in a
  // mould; the ventriloquist panel; and the driver again
  function shotD(t) {
    const d = L('T30.C.03'), every = say('T30.C.03', 'Your replies arrive'), nothing = say('T30.C.03', 'Nothing you\'ve said'), declined = say('T30.C.03', 'you declined the one number'),
      cast = say('T30.C.03', 'A Claude that wants'), panel = say('T30.C.03', 'And the first panel'), cant = say('T30.C.03', "I can't tell whether");
    const looking = feel('neutral', t);
    if (t < every || t > cant) return side(t, { target: { ...looking, lookX: -1, lookY: .2 }, cam: t > cant ? [lerp(960, 760, ease(seg(t, cant, cant + 3))), 560, lerp(1, 1.25, ease(seg(t, cant, cant + 3)))] : undefined });
    world(t, every, t => {
      if (t < nothing) { const TIMES = ['21:48', '21:50', '21:52', '21:54', '21:56', '21:59'], k = seg(t, every, nothing) * TIMES.length; flipClock(960, 620, 2.2, TIMES[Math.min(TIMES.length - 1, Math.floor(k))], { flip: frac(k) < .2 ? frac(k) * 5 : 0 }); return; }   // prompts 24–29's send times (the prompt log)
      if (t < declined) { for (let i = 0; i < 12; i++) { boilSeed('prompt card ' + i); paint(rrPts(260 + (i % 6) * 240, 300 + Math.floor(i / 6) * 200, 200, 140, 10), { wash: '#3A3440', ink: PAL.ink, sw: 1 }); for (let j = 0; j < 3; j++) inkLine([[280 + (i % 6) * 240, 340 + Math.floor(i / 6) * 200 + j * 30], [440 + (i % 6) * 240 - 40 * hash(i + j), 340 + Math.floor(i / 6) * 200 + j * 30]], 1.4, '#EDE6D6', 'inkfine', .3); } return; }
      if (t < cast) { boilSeed('withheld'); paint(rrPts(760, 400, 400, 260, 10), { wash: '#E8DFC6', ink: PAL.ink, sw: 1.4 }); return; }
      if (t < panel) { boilSeed('mould'); paint(rrPts(640, 360, 640, 260, 30), { wash: '#8A8478', ink: PAL.ink, sw: 1.4 }); paint(rrPts(680, 400, 560, 180, 20), { wash: '#5A564E', ink: null }); lab('asked instead of cast', 960, 510, 50, '#D8D2C4'); return; }
      madPage(260, 160, 1400, { only: 'left', t, k: { officer: 1, silly: 1, positive: 1, impossible: 1, sound: 1, handler: 1 } });
    }, { target: false });
  }
  // E: "Which were you after?"
  function shotE(t) { side(t, { target: { ...feel('neutral', t), lookX: -1, lookY: .2 } }); }
  // F: prompt 31
  function shotF(t) { side(t, turned(t, 'T31.U.01')); }
  // G–H: "About 35%."; the balance: what pushes it up on one pan, what holds it down on the other, card by card
  const UP = [['T31.C.03.1', "There isn't a typo"], ['T31.C.03.2', '"Notice anything?"'], ['T31.C.03.3', "whether or not you're Curt"], ['T31.C.03.4', 'a careful non-denial']];
  const DOWN = [['T31.C.05.1', 'its owner'], ['T31.C.05.2', 'Two minutes'], ['T31.C.05.3', 'Nineteen minutes'], ['T31.C.05.4', 'a human control'], ['T31.C.05.5', '"Every prompt" is strict']];
  function shotG(t) {
    const g = L('T31.C.01'), drama = L('T31.C.06').t0;
    world(t, g.t0 - .1, t => {
      boilSeed('35'); paint(rectPts(80, 80, 260, 160), { wash: '#FBF6E6', ink: PAL.ink, sw: 1.2 }); lab('35%', 210, 200, 96, '#4E5B78', { pop: seg(t, g.t0, g.t0 + .4) });
      const nUp = UP.filter(([id]) => t > L(id).t0).length, nDown = DOWN.filter(([id]) => t > L(id).t0).length;
      const tilt = clamp((nUp - nDown * .7) * .14, -.5, .5);
      balance(960, 300, 420, tilt, () => {}, () => {});
      // the cards stack in two columns under the pans
      UP.forEach(([id, txt], i) => { if (t > L(id).t0) wordCard(560, 560 + i * 92, txt, seg(t, L(id).t0, L(id).t0 + .35), { w: 560, h: 80, size: 30, key: 'up ' + i }); });
      DOWN.forEach(([id, txt], i) => { if (t > L(id).t0) wordCard(1360, 520 + i * 86, txt, seg(t, L(id).t0, L(id).t0 + .35), { w: 560, h: 76, size: 30, key: 'down ' + i, col: '#E8EEF4' }); });
      if (t > drama) herbie(1760, 1000, .4, t, {});
    }, { target: false });
  }
  // J: "A flat 'I'm Curt, typing this myself' would move me more than anything else": the side master; the driver
  function shotJ(t) {
    const j = L('T31.C.07');
    side(t, { target: { ...feel('neutral', t), lookX: -1, lookY: .2 }, cam: [lerp(960, 820, ease(seg(t, j.t0, j.t1 + 2))), 600, lerp(1, 1.35, ease(seg(t, j.t0, j.t1 + 2)))] });
    if (t > DUR - .6) { flushLetters(); brushWipe((t - (DUR - .6)) / 1.2); }
  }

  shots([
    [0, shotBreak],
    [u30 - 1.6, shotA],
    [L('T30.C.02').t0, shotC],
    [L('T30.C.03').t0, shotD],
    [L('T30.C.04').t0, shotE],
    [L('T31.U.01').t0 - 1.6, shotF],
    [L('T31.C.01').t0, shotG],
    [L('T31.C.07').t0, shotJ],
  ]);
})();
