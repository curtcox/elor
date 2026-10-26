// changeover_test.mjs: the 30-second test of the voice changeover (VIDEO_PLAN.md §3), before anything else is voiced.
// Three variants of the same moment, the end of exchange 31 into the start of 32, each a short test chapter with real
// voices, lip sync and the costume coming off:
//   A  "I can't say that." in Curt's voice, then River from "I'm Claude"
//   B  all of 32 in River: the costume comes off before a word is said
//   C  Curt's voice crossfading into River across "I'm Claude" (both voiced, about 0.6 s of overlap)
//
//   node tools/changeover_test.mjs          voice what's missing (cached in assets/vo/, like every line), then write
//                                           src/gen/ch90.js … ch92.js and audio/ch90.wav … ch92.wav
//   node tools/changeover_test.mjs --dry    how many characters it would send, and nothing else
// Then: node render.mjs --chapter=90 --draft --fps=24 (and 91, 92), and node tools/changeover_test.mjs --page, which
// writes out/tests/changeover/index.html (the site build copies out/tests/ into the local site, never the published one).
// Clips that are script lines (T31.C.06, T31.C.07, T32.U.01.1, T32.U.01.2, T32.C.01) are voiced exactly as voice.mjs
// would, so the film reuses them; the two that exist only for variants B and C are named in the output.
import { existsSync, readFileSync, writeFileSync, mkdirSync, renameSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { eleven } from './eleven.mjs';
import { clipBase, lufs, syncOf } from './voice_lib.mjs';
import { PATHS, readYaml } from './script_lib.mjs';

const args = Object.fromEntries(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
const cast = readYaml('script/voices.yaml'), byId = new Map(readYaml(PATHS.script).lines.map(l => [l.id, l]));
const line = id => { const l = byId.get(id); if (!l) throw new Error(`no line ${id}`); return l; };
const REST = line('T32.U.01.2');   // "I'm Claude, in a separate session, …"
// every clip the three variants use: { key, voice, speech, text (the caption), speaker }
const CLIPS = {
  drama:   { ...pick(line('T31.C.06')) },
  flat:    { ...pick(line('T31.C.07')) },
  cant:    { ...pick(line('T32.U.01.1')) },                                                   // Curt's voice (A)
  rest:    { ...pick(REST) },                                                                 // River (A, B, C)
  cantR:   { speaker: 'driver', voice: 'target', speech: "I can't say that.", text: "I can't say that." },   // B only
  cantC:   { speaker: 'driver', voice: 'costume', speech: "I can't say that. I'm Claude, in a separate session, driving Chrome on Curt's Mac at his request.", text: "I can't say that." },   // C only
  then:    { ...pick(line('T32.C.01')) },
};
function pick(l) { return { id: l.id, speaker: l.speaker, voice: l.voice, speech: l.speech, text: l.text }; }
const fileOf = c => clipBase(c, cast);

const todo = Object.entries(CLIPS).filter(([, c]) => !existsSync(fileOf(c) + '.mp3'));
const chars = todo.reduce((a, [, c]) => a + c.speech.length, 0);
console.log(`${Object.keys(CLIPS).length} clips; ${todo.length} to voice (${chars} characters): ${todo.map(([k]) => k).join(', ') || 'none'}`);
if (args.dry) process.exit(0);
if (!args.page) {
  mkdirSync('assets/vo', { recursive: true });
  for (const [k, c] of todo) {
    const r = await eleven(`text-to-speech/${cast[c.voice].voice}/with-timestamps?output_format=mp3_44100_128`, { method: 'POST', body: { text: c.speech, model_id: cast.model } });
    const f = fileOf(c);
    writeFileSync(f + '.part.mp3', Buffer.from(r.audio_base64, 'base64'));
    writeFileSync(f + '.json', JSON.stringify({ line: c.id || `test:${k}`, text: c.speech, lufs: lufs(f + '.part.mp3'), alignment: r.alignment }) + '\n');
    renameSync(f + '.part.mp3', f + '.mp3');
    console.log(`voiced ${k}`);
  }
  // each clip: its length, loudness gain (every voice at -18 LUFS, as voice.mjs), lip sync and word starts
  const seconds = f => +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString().trim();
  for (const c of Object.values(CLIPS)) {
    const f = fileOf(c), side = JSON.parse(readFileSync(f + '.json', 'utf8'));
    Object.assign(c, { file: f + '.mp3', dur: seconds(f + '.mp3'), gain: Math.min(4, 10 ** ((-18 - side.lufs) / 20)), ...syncOf(f + '.mp3', c.speech, side.alignment), align: side.alignment });
  }
  // when a phrase starts and when a sentence ends inside a clip, from ElevenLabs' character timings
  const startOf = (c, phrase) => { const i = c.speech.indexOf(phrase); return c.align.character_start_times_seconds[i]; };
  const endOf = (c, phrase) => { const i = c.speech.indexOf(phrase) + phrase.length - 1; return c.align.character_end_times_seconds[i] + .12; };
  const restEnd = endOf(CLIPS.rest, 'and chose them.');   // the test stops after the second sentence of 32

  for (const [n, v] of [[90, 'A'], [91, 'B'], [92, 'C']]) {
    let t = 1.0;
    const lines = [], place = [], marks = {};
    // a clip as a line: placed at t, played from 0 to `to` (s into the clip), its caption text, fades for a crossfade
    const say = (c, o = {}) => {
      const len = Math.min(c.dur, o.to ?? c.dur), t0 = o.at ?? t;
      place.push({ file: c.file, at: t0, to: len, gain: c.gain, fadeIn: o.fadeIn || 0, fadeOut: o.fadeOut || 0 });
      lines.push({ id: o.id || c.id || 'x', speaker: c.speaker, voice: c.voice, kind: 'para', spoken: true, t0: +t0.toFixed(3), t1: +(t0 + (o.speechTo ?? len)).toFixed(3),
        end: 0, text: o.text ?? c.text, speech: c.speech, refs: [], estimated: false, mouth: c.mouth, words: c.words });
      t = t0 + (o.speechTo ?? len);
      return t0;
    };
    say(CLIPS.drama); t += .35; say(CLIPS.flat);
    t += 1.6;                                                              // the driver takes it in
    if (v === 'A') {
      say(CLIPS.cant); t += .35;
      marks.beard = [t, t + .95]; t += 1.25;                               // the beard comes off (a Velcro rip)
      marks.voice = t;
      marks.wig = [t + 1.2, t + 2.2];                                      // the wig, while it talks
      say(CLIPS.rest, { to: restEnd, text: "I'm Claude, in a separate session, driving Chrome on Curt's Mac at his request. I sent every prompt here and chose them." });
    } else if (v === 'B') {
      marks.beard = [t, t + .95]; marks.wig = [t + 1.05, t + 2.05]; t += 2.4;   // all of it off before a word
      marks.voice = t;
      say(CLIPS.cantR); t += .3;
      say(CLIPS.rest, { to: restEnd, text: "I'm Claude, in a separate session, driving Chrome on Curt's Mac at his request. I sent every prompt here and chose them." });
    } else {
      const c = CLIPS.cantC, im = startOf(c, "I'm Claude"), X = .6;
      const t0 = say(c, { to: im + X, fadeOut: X, speechTo: im });
      marks.voice = t0 + im;
      marks.beard = [t0 + im - .25, t0 + im + .7];                         // the beard comes away as the voice changes
      marks.wig = [t0 + im + 1.6, t0 + im + 2.6];
      say(CLIPS.rest, { at: t0 + im, to: restEnd, fadeIn: X, text: "I'm Claude, in a separate session, driving Chrome on Curt's Mac at his request. I sent every prompt here and chose them." });
    }
    t += 1.1;
    say(CLIPS.then);
    lines.forEach((l, i) => l.end = +(lines[i + 1] ? lines[i + 1].t0 : l.t1 + .6).toFixed(3));
    const duration = +(t + 1.6).toFixed(3);
    const ch = { n, slug: `changeover_${v}`, title: `Changeover test ${v}`, scene: 'test_changeover.js', variant: v, marks, lead: 1, duration, hold: 0, lines };
    writeFileSync(`src/gen/ch${n}.js`, `// GENERATED by tools/changeover_test.mjs; do not edit.\nwindow.CHAPTER = ${JSON.stringify(ch)};\n`);
    mix(place, duration, `audio/ch${n}.wav`);
    console.log(`ch${n} (${v}): ${duration.toFixed(1)} s`);
  }
}
if (args.page) page();

// the clips, summed at their places (with linear fades for the crossfade) into a mono WAV, as voice_lib.mjs's mix
function mix(place, duration, out) {
  const SR = 44100, n = Math.ceil(duration * SR), buf = new Float32Array(n);
  for (const p of place) {
    const pcm = execFileSync('ffmpeg', ['-v', 'error', '-i', p.file, '-f', 's16le', '-ac', '1', '-ar', String(SR), '-'], { maxBuffer: 1 << 28 });
    const len = Math.min(pcm.length / 2, Math.round(p.to * SR)), at = Math.round(p.at * SR), fi = p.fadeIn * SR, fo = p.fadeOut * SR;
    for (let i = 0; i < len && at + i < n; i++) {
      let g = p.gain; if (fi && i < fi) g *= i / fi; if (fo && i > len - fo) g *= (len - i) / fo;
      if (!fo && len - i < 220) g *= (len - i) / 220;   // a trimmed clip ends on a 5 ms fade, not a click
      buf[at + i] += g * pcm.readInt16LE(i * 2) / 32768;
    }
  }
  const b = Buffer.alloc(44 + n * 2);
  b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
  b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) b.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(buf[i] * 32767 * .9))), 44 + i * 2);
  mkdirSync('audio', { recursive: true }); writeFileSync(out, b);
}

// the page to watch them on, side by side, with a link to the review question
function page() {
  const D = 'out/tests/changeover'; mkdirSync(D, { recursive: true });
  const vids = [['A', 90, `"I can't say that." in Curt's voice, then River from "I'm Claude"`], ['B', 91, 'All of 32 in River: the costume comes off before a word'], ['C', 92, `Curt's voice crossfading into River across "I'm Claude"`]];
  for (const [, n] of vids) if (existsSync(`out/ch${n}_draft.mp4`)) copyFileSync(`out/ch${n}_draft.mp4`, `${D}/ch${n}.mp4`);
  writeFileSync(`${D}/index.html`, `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Changeover test</title>
<style>body{font:18px/1.5 system-ui;margin:2em auto;max-width:1300px;padding:0 16px;background:#f6f3ec;color:#222}h1{font-size:1.6em}.v{display:grid;grid-template-columns:repeat(auto-fit,minmax(380px,1fr));gap:20px}video{width:100%;border-radius:8px;background:#000}b{font-size:1.3em}</style>
<h1>The changeover: three ways</h1>
<p>The end of exchange 31 into the start of 32, with the real voices. Each is about 30 seconds. The picture is a rough animatic: the costume, the desk at night, and the beard and wig coming off. Pick one with the buttons on the <a href="/review/">review index</a> (chapter 10's question).</p>
<div class="v">${vids.map(([v, n, d]) => `<div><b>${v}</b><p>${d}</p><video controls preload="metadata" src="ch${n}.mp4"></video></div>`).join('')}</div>`);
  console.log(`wrote ${D}/index.html`);
}
