// MIDI File Direct Playback Demo - HYACIN02 - B1_PN.midi
// This demonstrates Strudel playing your MIDI file data directly
// No external DAW required!

samples('github:tidalcycles/dirt-samples')

// Your MIDI file converted to Strudel:
// 15 notes, range: 31-36 (G1 to C2 bass register)
// Exact sequence: 33 33 36 33 33 31 33 33 36 33 33 31 33 33 36

setcps(126/60/4)

// Play the MIDI bass line directly
note("33 33 36 33 33 31 33 33 36 33 33 31 33 33 36")
.midi()  // Sends to your default MIDI output device
.velocity(0.7)
.sustain(0.4)

// Add some rhythm to make it more musical
stack(
  // MIDI bass
  note("33 33 36 33 33 31 33 33 36 33 33 31 33 33 36").midi().velocity(0.7).sustain(0.4),

  // Simple drums to accompany
  s("bd*4").gain(0.8),
  s("hh*8").gain(0.3)
)

// Alternative: If you want to loop just part of it
// note("33 33 36").midi().velocity(0.7).slow(2)