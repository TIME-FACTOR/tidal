// MIDI Bass Options - Choose your sound source!

samples('github:tidalcycles/dirt-samples')
setcps(126/60/4)

// Your MIDI file notes: 31(G1), 33(A#1), 36(C2)
// These are the exact bass notes from HYACIN02 - B1_PN.midi

// =====================================================
// OPTION 1: INTERNAL SYNTH (recommended - produces sound immediately)
// =====================================================
const midiBassSynth = note("31 33 36 31 36 33 31 36").s("sawtooth").gain(0.65).release(0.3)

// =====================================================
// OPTION 2: EXTERNAL MIDI (requires MIDI device setup)
// =====================================================
// const midiBassMIDI = note("31 33 36 31 36 33 31 36").midi().velocity(0.7)

// =====================================================
// TEST WITH DRUMS
// =====================================================
stack(
  // Choose ONE of these bass options:
  midiBassSynth,  // Use this for immediate sound
  // midiBassMIDI,    // Uncomment this if you have MIDI device

  s("bd*4").gain(0.8),
  s("hh*8").gain(0.3)
)

// =====================================================
// MIDI DEVICE SETUP (for Option 2)
// =====================================================
// If you want to use external MIDI, you need:
// 1. A MIDI synthesizer (hardware or software)
// 2. Connect it to your computer
// 3. Uncomment midiBassMIDI above
// 4. The MIDI notes will be sent to your external device