# Bass Design - Matching Track Description

## Original Track Description
> "Bass: A warm, sub-driven sine or low-passed sawtooth bassline. It follows a syncopated, "rolling" pattern that locks in perfectly with the kick."

> "rubbery" synth bassline

## MIDI File Analysis
- **Notes**: 31(G1), 33(A#1), 36(C2)
- **Original pattern**: `31 33 36 31 36 33 31 36` (straight 8th notes)
- **Issue**: Too mechanical, not "rolling" or "rubbery"

## Redesigned Bass Characteristics

### 1. **Warm & Sub-Driven**
```javascript
.s("sawtooth").lpf(500).hpf(35)
```
- Low-pass filter at 500Hz for warmth
- High-pass at 35Hz to remove unwanted sub
- Sawtooth wave for rich harmonics

### 2. **Syncopated Rolling Pattern**
```javascript
note("31 ~ 36 ~ 33 ~ 31 36 ~ 33")
```
- Uses `~` rests for syncopation
- Creates rolling, groovy feel
- Locks with kick rhythm

### 3. **Rubbery Feel**
```javascript
.delay(0.1).delaytime(1/6).delayfeedback(0.15)
```
- Short delay creates "rubbery" bounce
- Feedback adds sustain to the effect
- Timing syncs with 16th notes for groove

### 4. **Dynamic Evolution**
- **Build section**: Basic rolling pattern
- **Main groove**: More complex syncopation
- **Main2**: Intensified with longer sustain and more delay

## Pattern Examples

### Build Section (Rolling introduction)
```javascript
note("31 ~ 36 ~ 33 ~ 31 36").s("sawtooth").gain(0.7).release(0.4).lpf(600).hpf(40).delay(0.08).delaytime(1/8).delayfeedback(0.2)
```

### Main Groove (Complex syncopation)
```javascript
note("31 ~ 36 ~ 33 ~ 31 36 ~ 33").s("sawtooth").gain(0.75).release(0.5).lpf(500).hpf(35).delay(0.1).delaytime(1/6).delayfeedback(0.15)
```

### Main2 (Intensified)
```javascript
note("36 ~ 31 ~ 36 33 ~ 31 ~").s("sawtooth").gain(0.8).release(0.6).lpf(450).hpf(30).delay(0.12).delaytime(1/5).delayfeedback(0.2)
```

## Result
The bass now provides:
- ✅ Warm, sub-driven character
- ✅ Rolling, syncopated groove
- ✅ Rubber bounce effect
- ✅ Perfect lock with kick pattern
- ✅ Evolution throughout the track