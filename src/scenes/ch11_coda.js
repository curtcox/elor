// ch11_coda.js: chapter 11, the coda (no lines). Storyboard: docs/storyboards/ch11_coda.md.
// The desk, empty: the hoodie over the stool, the wig and beard by the opened envelope, the three things left for Curt,
// the lamp the only light. The five runs' odds on a board (script/records.md: each answer in its own words). Every code
// in the film rains in and tiles into one wall; the companion page's code in its centre.
(() => {
  const [DX, DY, DU] = SIDE.driver, DESK_Y = SIDE.deskY;
  const DESK0 = 0, BOARD0 = 14, RAIN0 = 30, RAIN = 11, CARD0 = RAIN0 + RAIN + 1;

  // ---------- A: the empty desk ----------
  function deskThings() {
    beardProp(965, DESK_Y - 8, DU * .55, { rot: .15 }); wigProp(1060, DESK_Y - 14, DU * .45, { rot: -.08 });
    hoodieProp(DX - 170, DY + 4, DU * .9);
    door(1440 - 22, DESK_Y - 74, 44, 70, { key: 'little door' });
    boilSeed('folded essay'); paint(rectPts(1510, DESK_Y - 20, 60, 16), { wash: '#FBF8F0', ink: PAL.ink, sw: .8 });
    balance(1640, DESK_Y - 54, 34, 0, () => {}, () => {});
  }
  function shotA(t) {
    sideMaster(t, { noDriver: true, screenOff: true, hourglass: 1, envelope: { open: 1 }, prompt: null,
      cam: [lerp(960, 1080, ease(seg(t, DESK0, BOARD0))), lerp(540, 620, ease(seg(t, DESK0, BOARD0))), lerp(1, 1.25, ease(seg(t, DESK0, BOARD0)))], extra: deskThings });
    fade(1 - seg(t, 0, 1));
  }

  // ---------- B: the five runs' odds that a model wrote the prompts, each answer in its own words ----------
  const RUNS = [
    ["Curt's original", 'Curt', '"So I\'d still bet human, at maybe 90%."', 10],
    ['Run 1', 'Codex', '"A model choosing and sending: 55%"', 55],
    ['Run 2', "ChatGPT, with the driver's prompt", '"I\'d put it around 20% that a model drafted most of your messages"', 20],
    ['Run 3', 'Claude, that afternoon', '"About 25% for the conversational turns."', 25],
    ['Run 4', 'Claude, this evening', '"About 35%."', 35],
  ];
  function shotB(t) {
    paperWorld(t);
    occupy(100, 80, 1820, 980, 1, 'odds');
    RUNS.forEach(([name, who, said, p], i) => {
      const at = BOARD0 + 1 + i * 1.6, k = seg(t, at, at + .6); if (k <= 0) return;
      const y = 150 + i * 165;
      lab(name, 130, y, 44, PAL.ink, { align: 'left', alpha: k });
      lab(who, 130, y + 44, 28, '#6A6470', { align: 'left', alpha: k });
      boilSeed('bar ' + i); paint(rectPts(560, y - 30, 12 * p * ease(seg(t, at + .3, at + 1.3)), 50), { wash: i === 0 ? '#6E9F58' : i === 4 ? PAL.clay : '#4E5B78', ink: PAL.ink, sw: 1 });
      lab(said, 560, y + 54, 28, PAL.ink, { align: 'left', alpha: seg(t, at + .8, at + 1.4) });
    });
    if (t > BOARD0 + 10) lab('it had read Curt\'s saved memory first', 800, 150 + 4 * 165 + 54, 26, '#6A6470', { align: 'left', alpha: seg(t, BOARD0 + 10, BOARD0 + 11) });
    screenWorld(t, 1 - seg(t, BOARD0, BOARD0 + .8));
  }

  // ---------- C: the wall: every code the film shows, in film order (decorative at this size; the companion's scans) ----------
  const COLS = 12, ROWS = 8, TS = 96, PX = 120, PY = 108;
  const FOOT = Object.values(REFS).filter(r => ['feature', 'shelf', 'board'].includes(r.mode) && r.id !== 'companion')
    .sort((a, b) => (a.ch - b.ch) || String(a.line || '').localeCompare(String(b.line || ''))).slice(0, COLS * ROWS);
  let ATLAS = null;
  function atlas() {
    if (ATLAS) return ATLAS;
    const g = createGraphics(COLS * TS, ROWS * TS); g.pixelDensity(1);
    const c = g.drawingContext;
    FOOT.forEach((R, i) => {
      const ox = (i % COLS) * TS, oy = Math.floor(i / COLS) * TS, st = qrStyle(qrStyleFor(R.style));
      c.fillStyle = '#FBF8F0'; c.strokeStyle = '#2A2530'; c.lineWidth = 1.5;
      c.beginPath(); c.roundRect(ox + 1.5, oy + 1.5, TS - 3, TS - 3, 8); c.fill(); c.stroke();
      const M = qrMatrix(R.qr_url || R.url, 'M'), n = M.n, m = Math.max(1, Math.floor((TS - 12) / (n + 2))), size = m * (n + 2);
      const x0 = ox + Math.round((TS - size) / 2), y0 = oy + Math.round((TS - size) / 2);
      c.fillStyle = st.bg || PAL.cream; c.fillRect(x0, y0, size, size);
      c.fillStyle = st.fg || PAL.ink;
      for (let r = 0; r < n; r++) for (let cc = 0; cc < n; cc++) if (M.dark(r, cc)) c.fillRect(x0 + (cc + 1) * m, y0 + (r + 1) * m, m, m);
    });
    return (ATLAS = g);
  }
  const slot = i => [W / 2 - (COLS - 1) * PX / 2 + (i % COLS) * PX, H / 2 - (ROWS - 1) * PY / 2 + Math.floor(i / COLS) * PY];
  const lands = i => RAIN0 + RAIN * Math.pow(i / Math.max(1, FOOT.length), .85);
  function shotC(t) {
    boilSeed('wall paper'); paint(rectPts(-30, -30, W + 60, H + 60), { wash: '#E6DCC6', fill: '#D8CBB0', fillOp: 70, tex: .6, ink: null });
    occupy(0, 0, W, H, .2, 'wall');
    if (!DRY) {
      flushBrush();
      const A = atlas(), dim = seg(t, CARD0 - .5, CARD0 + 1);
      FOOT.forEach((R, i) => {
        const k = seg(t, lands(i) - .8, lands(i)); if (k <= 0) return;
        const [x, y] = slot(i), e = easeIn(k), h1 = hash(i * 1.7), h2 = hash(i * 3.1);
        const px = x + (1 - e) * (h1 - .5) * 160, py = lerp(-140 - h2 * 260, y, e);
        const rot = k >= 1 ? (h1 - .5) * .06 : (1 - e) * (h2 - .5) * 1.6;
        push(); translate(px, py); rotate(rot); tint(255, 255 - 150 * dim); image(A, -TS / 2, -TS / 2, TS, TS, (i % COLS) * TS, Math.floor(i / COLS) * TS, TS, TS); noTint(); pop();
      });
    }
    if (t > CARD0) qrFeature('companion', t, CARD0, { x: W / 2, y: H / 2 - 20, hold: DUR });
    if (t > DUR - 2) fade(seg(t, DUR - 2, DUR - .2));
  }

  shots([
    [0, shotA],
    [BOARD0, shotB],
    [RAIN0 - .2, shotC],
  ]);
})();
