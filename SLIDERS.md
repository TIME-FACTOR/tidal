# Slider-style controls for the minimal track

Both the Tidal and Strudel versions of `minimal_deep_tech_126` support making changes via "slider" options: controllable parameters you can tweak without re-typing the whole pattern.

## Tidal (REPL / OSC)

Parameters use **control names** and **`cF`** in the pattern. You change them in two ways:

### 1. From the Tidal REPL: `setF` / `setI` / `setS`

After your pattern is running, type in the REPL:

```haskell
setF "gainKick" 0.8
setF "gainHats" 0.5
setF "lpfKick" 3000
setF "delaySend" 0.3
setF "roomSend" 0.4
```

- **`setF`** – float (decimal) control
- **`setI`** – integer control
- **`setS`** – string control

The pattern keeps running; the next cycle will use the new values.

### 2. From another app: OSC on port 6010

Tidal listens for **OSC** on **localhost port 6010** (by default). Send:

- **Path:** `/ctrl`
- **Args:** control name (string), value (float or int)

Examples:

- `/ctrl "gainKick" 0.8`
- `/ctrl "lpfKick" 2500`

So you can:

- Build a small HTML/JS page with `<input type="range">` sliders that send OSC to `127.0.0.1:6010`.
- Use **TouchOSC**, **OSCulator**, or similar to map hardware sliders to these `/ctrl` messages.
- Use **SuperCollider** to map MIDI CC to OSC and send to Tidal (see [Controller Input](https://tidalcycles.org/docs/working-with/patterns/Controller_Input/) in the Tidal docs).

### Control names used in this track

| Name        | Default | Use in pattern      |
|------------|---------|----------------------|
| `gainKick` | 0.9     | Kick volume          |
| `gainHats` | 0.45    | Hi-hat volume        |
| `gainBass` | 0.65    | Bass volume          |
| `lpfKick`  | 2000    | Kick low-pass (Hz)   |
| `delaySend`| 0.2–0.4 | Delay amount         |
| `roomSend` | 0.2–0.9 | Reverb amount        |

---

## Strudel (browser)

The Strudel version uses **`createParams`** so each "slider" has a name and a default:

- **Change in code:** Edit the number in e.g. `gainKick(0.9)` or `lpfKick(2000)` and re-run the block (Ctrl/Cmd+Enter).
- **REPL UI:** If your Strudel REPL has a Controls/Pattern panel that lists these params, they may show up as sliders or inputs there.
- **Other:** You can also drive values with gamepad/MIDI and `.range()` (see [Input Devices](https://strudel.cc/learn/input-devices/)).

### Params used in this track

- **gainKick**, **gainHats**, **gainBass** – volume
- **lpfKick** – kick filter
- **delaySend**, **roomSend** – delay and reverb

---

## Summary

| Environment | How to change "slider" values |
|-------------|-------------------------------|
| **Tidal**   | `setF "controlName" value` in the REPL, or send OSC `/ctrl "controlName" value` to port 6010. |
| **Strudel** | Edit the number in `paramName(value)` and re-run, or use the REPL controls if available. |

---

## MIDI Integration (HYACIN02 - B1_PN.midi)

Your MIDI file analysis results:
- **Format:** 1 track, 282 messages, 15 notes total
- **Note range:** 31-36 (G1 to C2 - very low bass register)
- **Unique notes:** 31(G1), 33(A#1), 36(C2)
- **Velocities:** 63-69 (medium)
- **Pattern suggestion:** `midinote "31 33 36" # s "midiout" # velocity 0.7`

Both versions now include **MIDI integration** for your bass line MIDI file:

### Tidal Setup
```haskell
-- In SuperCollider:
MIDIClient.init;
~midiOut = MIDIOut.newByName("Your MIDI Device Name", "Your MIDI Device Name");
~dirt.soundLibrary.addMIDI(\midiout, ~midiOut);

-- Then run d9 for MIDI bass using actual notes from your file
```

### Strudel Setup
```javascript
// Option 1: INTERNAL SYNTH (produces sound immediately):
note("31 33 36 31 36 33 31 36").s("sawtooth").gain(0.65).release(0.3)

// Option 2: EXTERNAL MIDI (requires MIDI device):
note("31 33 36 31 36 33 31 36").midi().velocity(0.7)
```

**The track now uses Option 1** (internal synth) so you hear sound immediately. If you want external MIDI, edit the bass line in `minimal_deep_tech_126.strudel.js`.

### Usage Methods

**Method 1: External MIDI Player (Recommended)**
- Play your MIDI file in Logic/Ableton/etc.
- Route MIDI output to Tidal/Strudel
- The track provides timing reference and complementary elements

**Method 2: Direct Pattern Control**
- MIDI notes (31=G1, 33=A#1, 36=C2) redesigned as **rolling, rubbery bass per track description**
- Patterns include syncopation, delay effects, and warm low-pass filtering
- Matches: "warm, sub-driven sine or low-passed sawtooth bassline" with "rolling pattern that locks with kick"

---

## Key Improvements in This Version

The track now accurately matches the original description:

- **Intro (0:00–0:30)**: Dry punchy kick + subtle shaker
- **Build (0:30–1:31)**: "Listen" vocal + shuffling hi-hats + rubbery bass
- **Main Groove (1:31–3:34)**: Complex percussion with rimshots, woodblocks, micro-glitches
- **Breakdown (3:34–4:19)**: Kick drops, pads/chords swell atmospherically
- **Main2 (4:19–6:15)**: Kick returns with sharp clap, intensified groove
- **Outro (6:15–7:12)**: Elements peel away to kick + shaker

**Production features:**
- **Swing/shuffle** on hi-hats
- **"Rubbery" bass** synth (warm sub-driven sawtooth)
- **Complex percussion** layers
- **Stereo imaging** (kick/bass mono, hats/percussion panned wide)
- **Ping-pong delay** and filtered reverb on percussion/vocal