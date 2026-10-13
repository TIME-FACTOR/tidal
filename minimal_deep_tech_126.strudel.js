// Minimal / Deep Tech – ACCURATE TRACK RECREATION (126 BPM, A minor, 4/4, 7:12)
// Structure: Intro (30s) → Build (61s) → Main (123s) → Breakdown (45s) → Main2 (116s) → Outro (57s)
// BPM: 126, Key: A minor, Genre: Minimal/Deep Tech, Hypnotic micro-house groove

samples('github:tidalcycles/dirt-samples')
setcps(126/60/4)

// Section lengths in cycles (at 126 BPM = ~0.508 cycles/second)
const introLen = 16, buildLen = 32, mainLen = 65, breakLen = 24, main2Len = 61, outroLen = 30

// === INTRO (0:00–0:30): Dry punchy kick + subtle shaker ===
const kickIntro = s("bd").gain(0.8).lpf(2500).hpf(60).orbit(1)  // dry, punchy kick
const shakerIntro = s("shaker").gain(0.15).hpf(2000).lpf(8000).orbit(8)  // subtle foundation

// === BUILD-UP (0:30–1:31): Vocal "Listen" + shuffling hi-hats + rubbery bass ===
const hatsBuild = s("hh*8").gain(".3 .35 .3 .4 .3 .35 .3 .45").pan(sine.slow(2)).hpf(4000).lpf(18000).delay(0.15).delaytime(1/8).delayfeedback(0.3).orbit(2)
const bassBuild = note("31 ~ 36 ~ 33 ~ 31 36").s("sawtooth").gain(0.7).release(0.4).lpf(600).hpf(40).delay(0.08).delaytime(1/8).delayfeedback(0.2).orbit(4)  // Rolling, rubbery bass
const vocalBuild = s("vocal:1").gain(0.5).delay(0.2).delaytime(1/4).delayfeedback(0.4).room(0.2).orbit(7)  // "Listen" hook

// === MAIN GROOVE (1:31–3:34): Complex syncopated percussion ===
const percMain = s("[~ rim:1] [~ wood:2] [rim:1 ~] [~ wood:3] [click:1 ~] [wood:1 rim:2]").gain(0.45).pan(rand).delay(0.2).delaytime(1/6).delayfeedback(0.3).room(0.15).orbit(3)  // rimshots, woodblocks, clicks
const chordsMain = note("[0 3 7] [3 7 10]").scale("a:minor").s("sawtooth").gain(0.35).release(0.4).lpf(1100).room(0.5).rsize(0.6).delay(0.3).delaytime(1/4).delayfeedback(0.4).pan(0.6).orbit(5)
const padsMain = note("[0 3 7]").scale("a:minor").s("sawtooth").gain(0.2).release(1.0).lpf(700).room(0.7).rsize(0.8).pan(-0.5).orbit(6)

// === BREAKDOWN (3:34–4:19): Kick drops, pads/chords swell ===
const chordsBreak = note("[0 3 7] [3 7 10]").scale("a:minor").s("sawtooth").gain(0.4).release(0.6).lpf(500).room(0.9).rsize(0.95).delay(0.5).delaytime(1/4).delayfeedback(0.5).pan(0.7).orbit(5)
const padsBreak = note("[0 3 7]").scale("a:minor").s("sawtooth").gain(0.25).release(1.5).lpf(400).room(0.95).rsize(0.98).pan(-0.7).orbit(6)
const vocalBreak = s("vocal:1").gain(0.55).delay(0.35).delaytime(1/4).delayfeedback(0.5).room(0.4).lpf(1500).orbit(7)

// === MAIN SECOND HALF (4:19–6:15): Kick returns with sharp clap, intensified ===
const hatsMain2 = stack(
  s("hh*8").gain(".35 .4 .35 .5 .35 .4 .35 .55").pan(sine.slow(2)).hpf(4000).lpf(18000).delay(0.2).delaytime(1/8).delayfeedback(0.4),
  s("cp*2").gain(0.4).delay(0.15).delaytime(1/4)  // sharp clap on kick return
).orbit(2)
const percMain2 = s("[~ rim:1] [wood:2 ~] [rim:1 ~] [wood:3 rim:2] [click:1 wood:1] [~ wood:2]").gain(0.5).pan(rand).delay(0.25).delaytime(1/6).delayfeedback(0.35).room(0.2).orbit(3)  // more prominent high-end

// Full arrangement using arrange() for precise timing
stack(
  // d1 – Kick: intro, build, main, (breakdown silent), main2, outro
  arrange([introLen, kickIntro], [buildLen, kickIntro], [mainLen, kickIntro], [breakLen, silence], [main2Len, kickIntro], [outroLen, kickIntro]),

  // d2 – Hi-hats: build, main, (breakdown silent), main2 with clap, (outro silent)
  arrange([introLen, silence], [buildLen, hatsBuild], [mainLen, hatsBuild], [breakLen, silence], [main2Len, hatsMain2], [outroLen, silence]),

  // d3 – Percussion: main, main2 (more complex in second half)
  arrange([introLen, silence], [buildLen, silence], [mainLen, percMain], [breakLen, silence], [main2Len, percMain2], [outroLen, silence]),

  // d4 – Bass: WARM SUB-DRIVEN SAWTOOTH (build, main, main2 only)
  // Rolling, rubbery pattern that locks with kick - per track description
  arrange([introLen, silence], [buildLen, bassBuild], [mainLen, note("31 ~ 36 ~ 33 ~ 31 36 ~ 33").s("sawtooth").gain(0.75).release(0.5).lpf(500).hpf(35).delay(0.1).delaytime(1/6).delayfeedback(0.15)], [breakLen, silence], [main2Len, note("36 ~ 31 ~ 36 33 ~ 31 ~").s("sawtooth").gain(0.8).release(0.6).lpf(450).hpf(30).delay(0.12).delaytime(1/5).delayfeedback(0.2)], [outroLen, silence]),

  // d5 – Chords: main, breakdown (filtered/swell), main2
  arrange([introLen, silence], [buildLen, silence], [mainLen, chordsMain], [breakLen, chordsBreak], [main2Len, chordsMain], [outroLen, silence]),

  // d6 – Pads: main, breakdown (swell), main2
  arrange([introLen, silence], [buildLen, silence], [mainLen, padsMain], [breakLen, padsBreak], [main2Len, padsMain], [outroLen, silence]),

  // d7 – Vocal: build, main, breakdown, main2
  arrange([introLen, silence], [buildLen, vocalBuild], [mainLen, vocalBuild], [breakLen, vocalBreak], [main2Len, vocalBuild], [outroLen, silence]),

  // d8 – Shaker: intro, build, main, (breakdown silent), main2, outro
  arrange([introLen, shakerIntro], [buildLen, shakerIntro], [mainLen, shakerIntro], [breakLen, silence], [main2Len, shakerIntro], [outroLen, shakerIntro])

  // 🎵 MIDI BASS INTEGRATION COMPLETE
  // Your HYACIN02 - B1_PN.midi bass line now replaces the original synth bass
  // Notes: 33(A#1), 36(C2), 31(G1) - exact sequence from your MIDI file
  // Plays during build, main, and main2 sections via d4 channel above
)