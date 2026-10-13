// BASS ONLY TEST - No arrange, just continuous bass
// This should definitely play your MIDI bass notes immediately

samples('github:tidalcycles/dirt-samples')
setcps(126/60/4)

// Your MIDI bass notes reimagined as RUBBERY BASS per track description
// 31(G1), 33(A#1), 36(C2) - warm, sub-driven, rolling pattern
note("31 ~ 36 ~ 33 ~ 31 36 ~ 33 ~").s("sawtooth").gain(0.75).release(0.5).lpf(500).hpf(35).delay(0.1).delaytime(1/6).delayfeedback(0.15)

// With kick to demonstrate the rolling syncopation
stack(
  note("31 ~ 36 ~ 33 ~ 31 36 ~ 33 ~").s("sawtooth").gain(0.75).release(0.5).lpf(500).hpf(35).delay(0.1).delaytime(1/6).delayfeedback(0.15),
  s("bd*4").gain(0.6).lpf(2000).hpf(60)
)