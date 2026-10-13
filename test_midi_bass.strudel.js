// Test: MIDI Bass with INTERNAL SYNTH
// Your MIDI notes (31=G1, 33=A#1, 36=C2) played through Strudel synth

samples('github:tidalcycles/dirt-samples')
setcps(126/60/4)

// Option 1: INTERNAL SYNTH (will produce sound immediately)
note("31 33 36 31 36 33 31 36").s("sawtooth").gain(0.65).release(0.3)

// Option 2: EXTERNAL MIDI (requires MIDI device - uncomment to test)
// note("31 33 36 31 36 33 31 36").midi().velocity(0.7)

// Add some drums to test timing
stack(
  note("31 33 36 31 36 33 31 36").s("sawtooth").gain(0.65).release(0.3),
  s("bd*4").gain(0.8),
  s("hh*8").gain(0.3)
)