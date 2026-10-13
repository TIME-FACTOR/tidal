// DEBUG: Simple bass test - should play immediately

samples('github:tidalcycles/dirt-samples')
setcps(126/60/4)

// Test 1: RUBBERY BASS (per track description: warm, sub-driven, rolling)
note("31 ~ 36 ~ 33 ~ 31 36").s("sawtooth").gain(0.75).release(0.5).lpf(500).hpf(35).delay(0.1).delaytime(1/6).delayfeedback(0.15)

// Test 2: With kick to check syncopation and rolling feel
stack(
  note("31 ~ 36 ~ 33 ~ 31 36").s("sawtooth").gain(0.75).release(0.5).lpf(500).hpf(35).delay(0.1).delaytime(1/6).delayfeedback(0.15),
  s("bd*4").gain(0.6).lpf(2000).hpf(60)
)

// Test 3: Full track bass pattern (main groove)
// note("31 ~ 36 ~ 33 ~ 31 36 ~ 33").s("sawtooth").gain(0.75).release(0.5).lpf(500).hpf(35).delay(0.1).delaytime(1/6).delayfeedback(0.15)