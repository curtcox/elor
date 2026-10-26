// test_changeover.js: the changeover test (tools/changeover_test.mjs; VIDEO_PLAN.md §3). One shot, side on: the
// costumed driver at the desk on the left in warm lamp light, the target on the monitor at the right in cool light.
// The end of 31 plays on the monitor; then the driver answers, and the beard and wig come off. CHAPTER.variant (A, B
// or C) and CHAPTER.marks ({ beard: [t0, t1], wig: [t0, t1], voice }) come from the tool: the voice switches at
// marks.voice, the beard comes off over marks.beard, the wig over marks.wig. A rough animatic: the look comes later.
(() => {
  const M = CHAPTER.marks, DX = 560, DY = 905, DU = 34;            // the driver: ground point (on the stool) and size
  const DESK_Y = 770, BEARD_AT = [830, DESK_Y - 8], WIG_AT = [930, DESK_Y - 14];
  // the near arm's tip in world space (side view; clawd.js: pivot (1.6u, -4.5u), +.3u, rotated .7 - a, 2.1u long)
  // one piece coming off: reach (arm up to it), grab, pull away, drop onto the desk. → { arm, worn, held, flying }
  function takeOff(t, [t0, t1], reachA) {
    const k = seg(t, t0, t1);
    if (k <= 0) return { arm: null, worn: 1 };
    if (k >= 1) return { arm: null, worn: 0, landed: 1 };
    const up = .3, pull = .6;                                      // fractions of the move: reach, pull, drop
    if (k < up) return { arm: lerp(-.2, reachA, ease(k / up)), worn: 1 };
    if (k < pull) return { arm: lerp(reachA, -.5, ease((k - up) / (pull - up))), worn: 0, held: 1 };
    return { arm: lerp(-.5, -.2, ease((k - pull) / (1 - pull))), worn: 0, flying: (k - pull) / (1 - pull) };
  }

  function shot(t, lt, dur) {
    const push = ease(seg(t, M.beard[0] - 1.6, M.beard[0] - .4)) * (1 - ease(seg(t, M.wig[1] + 1.2, M.wig[1] + 2.4)));
    const b = takeOff(t, M.beard, 1.05), w = takeOff(t, M.wig, 1.75), arm = b.arm ?? w.arm;
    sideMaster(t, { cam: [lerp(960, DX + 260, push * .7), lerp(540, DY - 260, push * .7), lerp(1, 1.45, push)], prompt: null, envelope: false, hourglass: false, clock: false,
      arm: arm ?? -.15, costume: { beard: b.worn, wig: w.worn, held: b.held ? 'beard' : w.held ? 'wig' : null },
      extra: () => {   // the pieces once let go: an arc from the hand to their place on the desk, then lying there
        for (const [p, at, prop, s, rot] of [[b, BEARD_AT, beardProp, DU * .55, .15], [w, WIG_AT, wigProp, DU * .45, -.08]]) {
          if (p.flying != null) { const from = sideTipOf(p.arm), q = arcPt(from, at, 60, ease(p.flying)); prop(q[0], q[1], s, { rot: rot * p.flying }); }
          else if (p.landed) prop(at[0], at[1], s, { rot });
        }
      } });
    if (lt < .5) fade(1 - lt / .5);
    if (lt > dur - .6) fade((lt - (dur - .6)) / .6);
  }
  shots([[0, shot]]);
})();
