// Test arrange() function timing
// This should help debug why bass isn't playing

samples('github:tidalcycles/dirt-samples')
setcps(126/60/4)

// Simple arrange test: 4 cycles silence, then 4 cycles bass
arrange(
  [4, silence],  // 4 cycles of silence
  [4, note("31 33 36").s("sawtooth").gain(0.8)]  // 4 cycles of bass
)

// You should hear:
// Cycles 0-4: silence
// Cycles 4-8: bass playing

// Alternative: RUBBERY BASS (per track description)
// note("31 ~ 36 ~ 33 ~ 31 36").s("sawtooth").gain(0.75).release(0.5).lpf(500).hpf(35).delay(0.1).delaytime(1/6).delayfeedback(0.15)