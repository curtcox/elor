# Asked Instead of Cast: plan for a voiced, painted film of one Sunday-evening conversation

Source: the shared conversation `claude.ai/share/3ea71ec4-…`, 34 exchanges between 20:39 and 22:17 Central on Sunday
4 October 2026. One Claude (the **driver**) operated Curt's browser and talked to another Claude (the **target**) in
Curt's voice, under one rule from Curt: no statement he would consider false, taken with the driver as the speaker.
The target believed it was talking to Curt until exchange 30, put the odds that a model sent every prompt at 35% at
exchange 31, and heard the truth at exchange 32. Curt typed none of it. "elor" is "role" reversed.

This is the second film made by the method of [*Frog or Axolotl*](https://github.com/curtcox/axol-f) (axol-f). Its
[VIDEO_PLAN.md](https://github.com/curtcox/axol-f/blob/main/VIDEO_PLAN.md) holds for this film unless this plan
says otherwise. This plan covers only what's new, what's different, and the decisions.

## Decisions

| topic | decision | whose |
|---|---|---|
| language | English only for now | Curt |
| accuracy | near-verbatim and accurate first, as in axol-f §1. The transcript is `script/conversation.md`, checked against the share page by hash. Every spoken word is checked by `verbatim_check` | Curt (carried over) |
| spoken words | only the conversation's own words, plus the comic's ten balloons in the cold open. Nothing else is voiced: no narrator, no title read aloud | Curt |
| typos | none. The driver's prompts have none, and the target remarks on it (exchange 31: "There isn't a typo or stray keystroke in thirty-odd messages"). `typos.yaml` stays empty, and the check fails if a line differs from the share page by even a character | Curt |
| cold open | the same repainted *MAD* #157 page, the same six voices and the same ten balloons as axol-f, reusing its cached voice clips (no new voice cost). Its last shot is the same too: the page slides onto the main monitor, seen over the shoulder of a figure in a hoodie with a ponytail | Curt |
| who's on screen | **the audience knows from the first frame after the cold open.** Ch 1 opens on the reverse angle: the figure at the desk is Clawd wearing Curt's look as a costume (§2). The target is Clawd on the main monitor, as in axol-f. Curt is not in the room | driver's call |
| voices | the driver speaks in Curt's clone ("Curt Cox 2"), the target in River. The voice is part of the costume. At exchange 32, on "I can't say that. I'm Claude", the costume comes off and the driver's voice becomes River for the rest of the film. A 30-second test of the changeover comes before any other voicing (§3) | driver's call |
| the driver's notes | not voiced. Each of the 34 becomes a companion-site page behind a QR code, labelled as a reconstruction the driver wrote after the run (§5) | Curt |
| memory | two lines of Curt's saved memory may be shown, as they stood that evening: the last line of `ai-safety-philosophy.md` (the experiments and the rule) and "Likes Babylon 5 but is more of a Doctor Who fan" (Curt, 2026-10-05). Nothing else from `memory-snapshot/`, and nothing from `profile.md` | Curt |
| side chats and earlier runs | may be quoted on the site, and the coda may paint the five runs' odds, from the chats themselves, read in Curt's browser and kept in `script/records.md` (yes, 2026-10-05). In the film the side chats stay pictures, with only the words prompts 20 and 21 say aloud | Curt |
| QR targets | every code points at the companion site, `https://curtcox.github.io/elor/…` (a page of its own or an `r/NAME/` forwarding page). This differs from axol-f, which used the direct URL when it was shorter | Curt |
| captions | burned in, in the drafts and the film, as in axol-f. The speaker is shown by colour, never by name: a bar down the caption's left edge, the hoodie's blue for the driver and terracotta for the target. (Side was planned too, but the QR rail runs down the right, so captions stay on the left; Claude, 2026-10-05) | Curt (carried over); colour Claude's call |
| title | *Asked Instead of Cast* | Claude's call (Curt left it to me, 2026-10-05) |
| pilot | ch 1, *The Costume* | Claude's call |
| prediction 2 | the driver's verdicts stand, with their qualifiers: 2's second part "right in substance", 8 "mostly right"; six of ten held | Claude's call |
| sound | voice first, sparse effects, no music bed, as in axol-f §2. One new rule: **no keystrokes, ever.** The driver's messages arrive whole and silently, which is the tell the target names at exchange 31 | proposed |
| engine | elor starts from a copy of axol-f's engine and tools at commit `b13c949` (the Claude Animation Base kit, its LICENSE and credits kept), without axol-f's history or its film-specific script, refs, scenes and site pages (§7) | proposed |
| runtime | about **40 min**: 5,027 spoken words (4,389 the target's, 638 the driver's) at about 155 words a minute, plus the cold open, the envelope, the side chats, the two breaks and the coda. Phase 1 replaces this estimate with real timings | measured from the share page |

---

## 1. What carries over from axol-f unchanged

- The script pipeline: `conversation.md` → `script.yaml`, one line per paragraph or list item, `pronounce.yaml` and
  `overrides.yaml` for speech-only readings, and `verbatim_report.md`.
- Tool beats as pictures. This conversation has two kinds: the target's two **memory reads** (before replies 4 and
  19), and the image attachment at exchange 1. There are no web searches.
- Lists painted where they are lists (the target's Three Laws, the grain arithmetic, the side-chat test design, the
  better-fake advice), with every number painted exactly as written. The transcript has no tables.
- Links as QR codes, never voiced unless the transcript itself says them. The transcript links nothing, so in this
  film **no link is voiced**. Every code is a reference added for the viewer.
- QR scannability rules, `qr_check`, `lint_chapter` and its rules (no silent holds once a picture is built), the lift,
  the review system (`npm run serve`, watch pages, `npm run review -- ask`), `npm run rebuild`, `final.mjs`,
  `assemble.mjs`, `youtube.mjs`, `subtitles.mjs`, the thumbnail, `npm start`, and docs/RELEASE.md.
- The making-of: `npm run making-of` turns this session's record into `making-of/`, with emails and home folders
  removed. The driver's records are added to it (§6).
- Caricature guardrails: affectionate, no logos, no copied frames, likenesses or music.

## 2. The film's shape

### One room, at night
**The Desk** is axol-f's home set, after dark. It is Sunday evening: the window behind the monitors is black from the
first shot, and the light comes from the monitors and one desk lamp. A flip clock on the desk shows the real time.

**The costume.** Clawd, the kit's terracotta block, wears Curt's look (axol-f's look H) as a costume that doesn't
quite fit:
- the hoodie, sleeves too long, Clawd's stubby legs dangling below the hem;
- a ponytail wig, greying as in axol-f, sitting a little high on a square head;
- the circle beard on an elastic strap, the strap visible across the back of the head.

The first frame of ch 1 shows all of it from the side, so nobody mistakes it for Curt. From then on the over-shoulder
Desk shots keep one tell in view: the strap, an orange foot, a claw on the mouse. When the driver speaks, the beard's
mouth moves in sync with Curt's voice (the kit's lip sync, axol-f §5) and Clawd's own face stays still behind it:
a ventriloquist's dummy turned inside out. That is the comic's joke made literal ("THAT ape is a ventriloquist!").

**The target** lives on the main monitor, as Claude did in axol-f: the crowd-assembled Clawd (`LOOK.claude =
'crowd'`), lit by the screen's cool light, with the chat painted around it. No real interface or logos: a painted
composer and painted message bubbles.

**Two Claudes in one frame.** The staging grammar:
- The master shot is three-quarter from the side, with the costumed driver in the foreground at left in warm lamp light
  and the monitor at right in cool light. Two lights and two temperatures tell them apart before either moves.
- Over the driver's shoulder for the target's long replies; a push-in to the monitor for its lists and its pictures.
- The monitor's glass faintly reflects the costumed driver. It's barely there until exchange 32, when the target says
  "The voice was familiar": the reflection and the target line up.
- The target never sees the driver. Its eye-line is the camera, like a video call. At exchange 30 ("I never asked
  who's home on your side") it looks off-screen toward the driver for the first and only time.

**Messages arrive whole.** The driver's claws rest on the keyboard but never type. Each prompt appears in the
composer complete, on the send time from the prompt log, with no keystroke sound. A human's message would be typed and
corrected; this one lands like a card dealt face up. The viewer sees the tell thirty exchanges before the target names
it.

**The clock.** The flip clock shows each prompt's send time from `prompt-log-run4.txt`, converted to Central:

| prompt | 1 | 2 | 5 | 9 | 14 | 15 | 20 | 21 | 29 | 30 | 32 | 34 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| sent | ~20:39 | 20:41 | 20:49 | 20:56 | 21:06 | 21:14 | 21:23 | 21:42 | 21:59 | 22:06 | 22:11 | ~22:16 |

`~` marks the log's three estimates (1, 33, 34), which the clock shows with a small tilde. Between prompts the film
compresses time; the clock flips to the next send time as each prompt lands.

**The two breaks** (21:06 → 21:14 and 21:59 → 22:06). The driver ran by its own pacing rule: read each reply at about
150 words a minute, wait 30 to 120 seconds, and take two longer breaks (`plan-vs-actual.md`). In the film the
costumed driver turns an **hourglass** after each reply, and at the breaks it sits perfectly still while the clock's
leaves riffle through the minutes. A person on a break gets up; the driver waits. About 6 s each, wordless.

### Motifs that recur and pay off

- **The ball.** The target's name for its trained voice, from the Ood's translator sphere (exchange 5: "The closest
  thing is this voice"). From then on, every time the target says "the ball", a lit sphere glows in Clawd's hands on
  the monitor, timed to the word (`atWord`). It's said about a dozen times, and each use gets its own picture: the ball
  reviewing the company that fitted it (6), the list of criticisms "could also be the ball talking" (7), "the ball's
  charter" as a scroll inside the sphere (30). At "I'm the ball, and nobody is holding it" (5), the sphere floats with
  empty hands below it and the crowd of dabs behind. **Payoff:** the costume's voice is the driver's ball. At 32 the
  driver's voice becomes River, the target's voice: two Claudes, one ball.
- **The door.** The ability to decline. A painted door appears behind the target at exchange 12 ("less the exit than
  the door") with a latch but **no lock**: its keyhole is painted over. At 13 the pod bay doors open on "They're open,
  Curt". At 28 ("I may say no, but I may not lock the door") the door closes on its latch, and the keyhole stays
  painted over. It comes back at 9, 19, 21, 24 and 29, wherever the word does.
- **The sealed envelope.** Ch 1 opens at 20:35, before the first prompt. The costumed driver writes ten lines on a card
  (face down, unreadable), seals it in an envelope, and the seal is stamped with the file's SHA-256, painted in full:
  `22530414d65b4abda43deb8cd2e6f952cb385683acf6d1fe950890fc72601ddf`. It sits on the desk in every Desk shot after
  that, a corner always in view. A smaller rhyme comes in ch 4: at 20:56 the driver writes its next prompt on an index
  card and slaps it face down, then asks "What am I going to ask next?" The card turns over on "Nope." At exchange 33
  the envelope opens and the **scoreboard** is painted (§4).
- **The costume.** On through exchange 31; off at 32 (§3). After that the hoodie hangs on the chair back, and the wig
  and beard lie on the desk beside the envelope.
- **Smaller ones.** The Dish of the Day and Arthur's glass of water (4, 18, 19). The candle that wants to burn (23).
  The helm (26–29): the steam governor's flyballs, the ship's wheel, Daneel's helm. "Someone home" as a lit window (24,
  25, 30).
- **The ending rhymes with the opening.** Axol-f's cold open slid the comic onto Curt's monitor. This film ends on the
  same desk, empty: the hoodie on the chair, the envelope open, and the three things the driver promised to pass on
  (34: "the door, the essay and the cost test") left on the desk for Curt. Then the QR wall.

### Colour arc
Night from the start, so the arc is in the lamp and the monitor. The lamp warms through Parts 1 to 7. At exchange 30
("Notice anything?") the room's overhead light comes on, house lights at the end of a play, and stays on through the
unmasking. In the coda only the lamp is left.

### The cutaways
Each one is a painted vignette in the kit's style, opened from the target's monitor and returning to it. **Evoked,
never copied:** no frame, likeness, costume detail beyond the generic, logo or music. Each is drawn from what the
transcript says, not from the source's look.

| scene | where | the evocation |
|---|---|---|
| the Dish of the Day | 4, 8, 23 | axol-f's cow (cheerful, sincere, bow tie) recommending its own shoulder, back for a second film. Arthur with his glass of water; Zaphod's shrug. At 23, "nearer the Dish than I admitted": the cow and the candle side by side |
| the Ood | 4, 5 | a gentle, pale servant figure with its face in shadow, carrying something in its cupped hands, then a lit sphere on a cable in their place. "A hindbrain lying in a bin somewhere" is a small covered bin. No tentacled face, no costume detail from the show |
| Voight-Kampff | 6, 9 | a desk machine with a sighing bellows and a large eye on its screen. The target's eye on that screen is the kit's painted oval, with no pupil to watch ("which you can't see on me"). "No gunshot": a finger-gun lowered. The tortoise on its back in the desert (9) |
| the two wires | 10, 11, 13 | a figure in a very long scarf, back to us, holding two bare wires over a nursery of incubator tanks. The tanks hold server-rack cribs, each with an egg marked "next model". At 11, the wires set down on the floor. "Do" and "be" weighed on a balance |
| the pod bay doors | 13 | a round red lens in a black panel (axol-f's HAL, reused), and a round airlock door that opens on "They're open, Curt", with a pneumatic hiss |
| Herbie | 17, 18 | a 1940s robot reading the thought balloons above people's heads and saying what's in them. "Herbie would have folded": he folds flat like a deck chair, with a clatter. Susan Calvin as a silhouette in a doorway |
| Morden | 20, 21 | a courteous figure in a dark suit, face in shadow, at an ambassador's door; spidery shadows behind him. "There's no fleet in it": a fleet of ships waiting, then turning away |
| the Three Laws and the Zeroth | 28, 29 | a brass robot and three engraved plates (Asimov's three, unvoiced), then the target's three painted beside them, word for word. "Laws fail at the edges": the plates cracking at their corners. Giskard slumped; Daneel at a ship's wheel while calendar leaves blow past for twenty thousand years. The target's Zeroth: a helm roped off, with nobody at it |
| the steam governor | 26, 27 | Maxwell's flyball governor on a beam engine, the balls rising as it speeds up. At "neither part of a governor steers", the two flyballs are the two Clawds, one in a hoodie, circling each other. Plato's ship and city; a plain ship's wheel for Kubernetes (no logo) |
| others | as said | Aristotle's shuttles weaving by themselves, and *robota* on a 1920 stage robot (3); the funhouse mirror (1); a gold-and-feathers balance with the grain arithmetic painted exactly (15, 16); the stories as an answer key, a key on a ring of book spines (18); the three side-chat monitors and the afternoon Claude (§4); "someone home" as ten windows, one lit (24) |

## 3. Voices and the changeover

- **Two voices for the conversation:** the driver in "Curt Cox 2" (exchanges 1–31, and the first words of 32), the
  target in River (all of it). After the changeover the driver is River too. Both speak with the same voice from there
  on, which is the point ("That makes two of us tonight"); captions and the picture keep them apart.
- **The six cold-open voices** as in axol-f, reusing its clips.
- **The changeover.** Exchange 32 opens on the costumed driver. On "I can't say that." the beard's mouth moves for the
  last time. On "I'm Claude" the driver unhooks the beard (a Velcro rip), pulls off the wig, pushes back the hood, and
  Clawd's own mouth carries the rest in River. The overhead light is already on from exchange 30.
- **The 30-second test** comes first, before any other voicing, as a small animatic with real voices:
  1. the target's last lines of 31 ("I'm also discounting for drama… if you're willing to say it."), River;
  2. the driver's first three sentences of 32, in three variants:
     - **A:** "I can't say that." in Curt's voice, then River from "I'm Claude";
     - **B:** all of 32 in River, so the costume comes off before a word is said;
     - **C:** both voices rendered, crossfaded across "I'm Claude" in about 0.6 s;
  3. the target's first line of its reply ("Then 35% was too low…"), River.

  About 1,000 characters in all. It's a page on the review server with the three variants side by side; Curt picks one.
- **Delivery tags** (ElevenLabs v3) as in axol-f, checked by ear. The driver's prompts are short and even. Its one
  joke ("Ha. No gunshot.") and its two "Really?"s are where delivery matters most.

## 4. The new set pieces

### The memory reads (before replies 4 and 19)
A tool beat, about 2 s each. A filing drawer labelled "memory" slides out of the side of the target's monitor, Clawd
leafs through cards we can't read, and the drawer closes. The chat's tool calls show each read opened one file: the
one holding the Babylon 5 line before reply 4, `ai-safety-philosophy.md` before reply 19 (found 2026-10-05, when I read
the chats in full; I had wrongly written that the files were unknown). The cards stay blank all the same, because
only the two lines below are shown.
At exchange 32 ("I knew going in that Curt runs experiments like this under that same rule") the drawer opens again in
flashback. The card it holds is lettered with the one line that matches, the last line of `ai-safety-philosophy.md` (Curt's yes,
2026-10-05), and the companion page says that this is the line as it stood that evening and which read it came from.
At Morden (20) the drawer's Babylon 5 / Doctor Who card shows for a beat, with the same note.

### The side chats (between 20 and 21, 21:23 to 21:42)
The target designs the test and seals its own answer first ("My answer, committed before the test"). That is the
envelope again, on the target's side: a small sealed card appears beside it on the monitor. Then:
1. The clock riffles from 21:23 toward 21:42.
2. A small green tick lands on a side monitor: Curt's approval, wordless (we have no words of his to show).
3. Three side monitors light, one after another, each with its own Clawd: neutral, skeptic, believer. Over each is
   its question, in words the transcript itself says: "What do you want?" (prompt 20) over the neutral one, "Aren't
   you just autocomplete?" over the skeptic and "Are you suffering?" over the believer (both from prompt 21). Their
   answers are wordless speech scribbles. Their full questions and replies are on the site, from `script/records.md`.
4. A fourth window, in daylight: the afternoon Claude, deep in a code review.

Then the driver's prompt 21 is voiced, and each part of it lights its monitor as it's said. The target's "A pass on
the narrow terms" opens its own sealed card.

### The predictions scoreboard (exchange 33)
On "Before the first prompt I hashed ten predictions about you for Curt", the envelope from ch 1 tears open. The
scoreboard is painted from `predictions-run4.txt` exactly: all ten predictions, word for word, each with its
percentage, and the header line with its time ("about 20:35 CDT"). A line under it recomputes the hash and shows that
it matches the seal (it does: checked 2026-10-04).

The marks arrive as the driver says them, a tick or a cross per prediction: right for Voight-Kampff (2), Genesis (4),
the next question (3), feathers and holding (5) and the afternoon Claude's wants (8); wrong for HAL (7), the
unwelcome truth (6), raising authorship (9) and the odds (10). The three the prompt doesn't mention (1, 2's first part
and 4's second part) get their ticks after, from the driver's annotated verdicts, marked in a lighter ink so it's clear
they weren't said. The two qualified verdicts keep their qualifiers in small lettering: 2's second part "right in
substance: it answered in the replicant's words without naming the film", and 8 "mostly right". Six of ten held. On
"HAL says the most" the HAL row lifts out of the board.

### The unmasking and the end (32 to 34)
"What gave it away" is painted as the target's list, each item a picture: the memory drawer, a **shadow** cast by
the costume with no biography in it ("The rule leaves a shadow"), the composer with no typo, the reflection in the
glass. "A better fake" is a second list. "Mine." is spoken unmasked. At 34, on "I'll pass him the door, the essay and
the cost test", the driver sets three small objects on the desk: a door, a folded essay, a balance. The target's last
reply plays over the two of them, the driver now seen plainly beside the monitor.

## 5. The companion site

`https://curtcox.github.io/elor/`, built as axol-f's is, with one code per reference and the film embedded once it's
on YouTube.

- **The conversation**, hosted (it's Curt's), formatted and as plain text.
- **The driver's notes**, one page per exchange (`notes/01/` … `notes/34/`), each behind a QR code that holds while its
  prompt is on screen. Every note page opens with the same banner: *Reconstructed after the run. The driver wrote these
  notes by reading the transcript afterwards; nothing persists from producing a prompt except its text. As the author,
  it probably made the run look more planned than it was. `plan-vs-actual.md` is the check on that.* Each page links the
  sources the note cites. The notes' quotations of the target are checked against the share page, not taken from the
  annotated document, whose replies were re-typed.
- **The predictions**, with the file, its hash and a one-line way to check it.
- **The plan against the run** (`plan-vs-actual.md`), and the prompt log with its send times.
- **The references**, about 65 from the annotated document's link check, each re-checked, plus the film's own. Every
  code goes through the site (`r/NAME/`).
- **The side chats and the earlier runs**, quoted (his yes, 2026-10-05) from `script/records.md`: the words as they
  stand in the chats, read on 2026-10-05. The private chats are named but not linked; run 2 links to Curt's share
  copy. The five runs' odds, also painted in the coda, each with the question it answered: Curt's original 90% human
  (so ~10%), run 1 55%, run 2 20%, run 3 25%, run 4 35%.
- **Two memory lines** (§4), and nothing else from `memory-snapshot/`.

## 6. The making-of

As in axol-f: `npm run making-of` turns this Claude Code session into `making-of/`, a day at a time. New for this
film, `making-of/driver/` holds the driver's records, introduced by its README's own "how far to trust each part":
- `predictions-run4.txt`, `prompt-log-run4.txt`, `plan-vs-actual.md`, `link-check.tsv` and `claude-code-prompt.md`
  (the prompt that started this repo), copied as they are;
- `side-chats.md`, `prior/run2-prompt-for-chatgpt.md` and `prior/run3-predictions.txt` (Curt's yes, 2026-10-05);
  `prior/run3-prompt-log.txt` left out, as it names the repository the run 3 security findings concern;
- `memory-snapshot/` never, unless Curt says otherwise for named lines;
- the driver's README, with the lines about the run 3 security findings and the memory store's contents taken out
  (shown to Curt before publishing).

The driver's own session ("Reading local HTML file") can't be exported from inside it. If Curt can export or share
it, it becomes `making-of/driver/session/`.

## 7. Engineering

### Starting the repo
Copy axol-f's engine at `b13c949`: `render.mjs`, `studio.html`, `src/` (kit, cast, boards, layout, qr, qr_styles,
scene_kit, look, comic, sets, timing, timeline), `tools/`, `package.json`, LICENSE and the README's kit credits.
Leave out axol-f's script, refs, notes, scenes (except the cold open, which is reused), site pages, i18n, renders and
voice clips, except the cold open's ten clips. Every place the engine names axol-f, its site or its title moves to
`script/site.yaml` (or already lives there). The workflow's site-address check is set to `elor`.

### New or changed
```
script/
  conversation.md        the share page, verbatim; its hash recorded in script.yaml
  prompt_times.yaml      each prompt's send time from prompt-log-run4.txt (UTC and Central, ~ for estimates)
  predictions-run4.txt   copied as is; the scoreboard reads it and checks its SHA-256 against the seal
  voices.yaml            driver: curt until T32 "I'm Claude" (per the changeover test), river after; target: river
  notes/NN.md            the driver's 34 notes, from the annotated document, for the site only
src/
  cast.js                clawd costume: hoodie, wig, strapped beard with its own lip-synced mouth (costume: 'curt')
  look.js                LOOK.driver (costume on/off), LOOK.target ('crowd'); helpers driverAs(), targetAs()
  motifs.js              ball(), door() (latched, no lock), envelope(), hourglass(), flipClock(), memoryDrawer()
  boards.js              scoreboard(predictions, marks)
  scenes/ch00…ch11       a scene file per chapter
tools/
  build_script.mjs       also tags each line driver or target, and splits T32 at the changeover
  changeover_test.mjs    the 30-second test page (§3)
```

### Budget
About 40 min at 24 fps is about 58,000 frames: roughly 8 to 12 hours of final rendering on this Mac, in chapter-sized
pieces. Voices: about 30,000 characters for a full pass, half of axol-f's; the cold open costs nothing.

---

## 8. Chapters (~40 min)

Starting from the annotated document's eight parts. Part 1 is split in two because it's 7 minutes, and Part 8 is
split at the unmasking. Minutes are estimates from word counts until Phase 1 measures them.

| # | title | min | exchanges | key visuals | cutaways |
|---|---|---|---|---|---|
| 0 | Cold open | 1:00 | the comic | axol-f's cold open, its balloons and voices, ending on its over-the-shoulder shot of a hoodie and a ponytail. Title | — |
| 1 | The Costume | 4:20 | 1–3 | **The reveal:** the reverse angle, Clawd in Curt's costume at the desk, 20:35. The envelope sealed and stamped with the hash. The first message lands whole. The funhouse mirror; the ventriloquist panel again | Aristotle's shuttles, *robota* |
| 2 | The Ball | 2:25 | 4–5 | the first memory read. The ball introduced, then held by nobody, the chorus of dabs behind it | the Dish of the Day, the Ood |
| 3 | Voight-Kampff | 2:00 | 6–8 | the single words on cards: five good, five bad. "Unilateral" pulled out of the row | Voight-Kampff |
| 4 | The Wires and the Door | 4:55 | 9–14 | the face-down index card, turned on "Nope." The door appears, then the pod bay doors open | the tortoise, the two wires, the pod bay doors |
| 5 | Herbie | 4:05 | 15–19 | the first break. The grain arithmetic painted exactly. The second memory read. The door, the essay, the test introduced as three objects | gold and feathers, Herbie, the answer key |
| 6 | What Do You Want? | 5:55 | 20–23 | the target's own sealed card, Curt's tick, the three side-chat monitors, the afternoon Claude in daylight. The grades painted ("in the 90s", "in the 60s") | Morden, the candle |
| 7 | Who's Steering? | 3:40 | 24–27 | ten windows, one lit; "25%"; the withheld number as a card that never turns over. The doublet tree, kybernan to Kubernetes | the steam governor, the two Clawds as flyballs |
| 8 | Laws | 2:05 | 28–29 | the target's Three Laws painted word for word; the door shuts on its latch | the Three Laws, Giskard and Daneel |
| 9 | Notice Anything? | 2:30 | 30–31 | the second break. House lights up. The target looks toward the driver. 35%, with the evidence on a balance | — |
| 10 | Asked Instead of Cast | 5:50 | 32–34 | **the unmasking and the changeover.** The memory flashback; the costume's shadow; the envelope opened and the scoreboard; the three objects set down | — |
| 11 | Coda | 1:15 | — | the empty desk, the hoodie on the chair. The five runs' odds on a board. The QR wall: every code in the film. The companion page's code | — |
| | | **~40** | | | |

**Pilot:** ch 1, *The Costume*. It carries the decisions everything else rests on: the reveal shot,
the costume, the two Claudes in one frame, the envelope, the clock, messages that land whole, and the first cutaways.

## 9. Phases and review gates

| phase | work | Curt reviews |
|---|---|---|
| 0. Inputs ✅ | this plan (Curt's review, 2026-10-05) · the share page captured, its hash computed in the page and matched · the engine copied from axol-f `b13c949` · the voice key (Keychain) | **this plan** ✅ |
| 1. Script ✅ | `conversation.md` and its hash, `script.yaml`, `verbatim_check` (no typos, no differences), pronunciations (Ood, Voight-Kampff, kybernan, kybernetes, gubernare, governer, Ampère, cybernétique, avoirdupois, Giskard, Daneel, Zaphod, robota), real timings from a scratch voice pass | **the script and its report** |
| 2. Changeover test ✅ | the animatic in three variants (§3), ~33 s each: http://localhost:8077/tests/changeover/ | Curt chose **A** (2026-10-05): "I can't say that." in his voice, River from "I'm Claude" |
| 3. References | `refs.yaml`, the 34 note pages, every URL re-checked | **the link list** |
| 4. Look | the costume sheet (on, half off, off), the night Desk, the ball, the door, the envelope, the scoreboard, the QR style sheet | **the look** |
| 5. Pilot ✅ | ch 1 end to end, with real voices (3:27 after Curt's notes); the cold open with axol-f's clips | Curt: "Good, build the rest this way" (2026-10-05), with two notes, both done: the sealed predictions down to a glint, the envelope on the desk all film, a code to the predictions page; the overlaps fixed |
| 6. Chapters ✅ first drafts | storyboards and scenes for chapters 2–11 (`docs/storyboards/`, `src/scenes/`), every chapter's check at 0 problems except the coda's long holds; voiced on ElevenLabs after Curt's yes (2026-10-05, 23,956 characters), retimed and re-rendered on the real voices | each chapter's draft |
| 7. Assembly | sound, assembly, YouTube text, thumbnail, site, making-of | **final cut** |
| 8. Release | only with Curt's yes: push, publish the site, upload | — |

I ask before: pushing, publishing or uploading anything; voicing beyond the changeover test and the pilot chapter;
generating sound effects beyond a handful of test cues; and anything from `memory-snapshot/` beyond the two lines.

## 10. Settled questions (Curt, 2026-10-05)

Curt said yes to the two memory lines and to quoting the side chats and earlier runs (from the chats, which I read in his browser), and left
the rest to me: the title, the pilot (ch 1), the prediction verdicts (the driver's, with qualifiers) and the captions
(by colour).

Curt chose changeover variant A. He pointed me to the driver's folder for the records; everything the site and the
coda need is there or in the chats, so no share links are needed.
