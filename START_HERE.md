# Tidal + SuperCollider + MCP – Quick start

## 1. Start SuperCollider + SuperDirt (for sound)

**Option A – Script (recommended)**

From the repo directory:

```bash
./start-sound.sh
```

SuperDirt runs in the background on port 57120. To stop it (or stop all Tidal services):

```bash
./stop-tidal.sh
```

Or only SuperDirt: `pkill -f "sclang.*start_superdirt"`

If you see "Could not open UDP port 57120", another instance is already running; stop it with the command above, then run `./start-sound.sh` again.

**Option B – SuperCollider app**

- Open **SuperCollider** (from Applications or `open -a SuperCollider`).
- In the editor, run:
  ```supercollider
  SuperDirt.start;
  ```
- You should see: **"SuperDirt: listening to Tidal on port 57120"**.

## 2. Run Tidal from this repo

In a terminal (new window so PATH includes Haskell):

```bash
/Users/andresline/Desktop/CODEBASE/TIDAL/run-tidal.sh
```

Or:

```bash
cd /Users/andresline/Desktop/CODEBASE/TIDAL
cabal repl < BootTidal.hs
```

At the `tidal>` prompt you can run patterns, e.g.:

```haskell
d1 $ sound "bd sd bd sd"
```

## 3. Tidal MCP in Cursor

The **Tidal Cycles MCP server** is installed and configured in Cursor:

- **Location:** `tidal-mcp-server/` in this repo.
- **Config:** Added to `~/.cursor/mcp.json` (Cursor MCP settings).

**To use it:**

1. **Restart Cursor** so it loads the Tidal MCP server.
2. Start **SuperCollider** and run `SuperDirt.start` (step 1 above).
3. In Cursor chat you can ask the AI to create or change Tidal patterns; it will use the MCP tools (`tidal_eval`, `tidal_hush`, etc.) to control Tidal.

If the MCP doesn’t connect, check:

- `node --version` is 18+.
- Paths in `~/.cursor/mcp.json` point to this repo (e.g. `.../TIDAL/tidal-mcp-server/...`).

## 4. Load the minimal track into Strudel

[Strudel](https://strudel.cc/) is a JavaScript port of Tidal that runs in the browser. The repo’s **Tidal** patterns (e.g. `minimal_deep_tech_126.tidal`) are Haskell and **cannot** be loaded directly in Strudel. Use the **Strudel** version instead:

1. Open **[strudel.cc](https://strudel.cc/)** in your browser.
2. Open the file **`minimal_deep_tech_126.strudel.js`** in this repo.
3. Copy its entire contents and paste them into the Strudel editor.
4. Press **Ctrl+Enter** (Windows/Linux) or **Cmd+Enter** (Mac) to run.

The script loads `github:tidalcycles/dirt-samples` so that `bd`, `hh`, `perc`, `rim`, `shaker`, etc. work. If you don’t have a `vocal` sample, change `s("vocal:1")` to something you have (e.g. `s("words:1")`) or comment out that line.

To run only some layers, comment out lines in the `stack(...)` or run a smaller stack, e.g.:

```javascript
samples('github:tidalcycles/dirt-samples')
setcps(126/60/4)
stack(
  s("bd*4").gain(0.9).lpf(2000).hpf(80),
  s("hh*8").gain(".35 .4 .35 .5").delay(0.2).delaytime(1/8).delayfeedback(0.4)
)
```

---

## 4. Load the minimal track into Strudel

[Strudel](https://strudel.cc/) is a JavaScript port of Tidal that runs in the browser. The repo's **Tidal** patterns (e.g. `minimal_deep_tech_126.tidal`) are Haskell and **cannot** be loaded directly in Strudel. Use the **Strudel** version instead:

1. Open **[strudel.cc](https://strudel.cc/)** in your browser.
2. Open the file **`minimal_deep_tech_126.strudel.js`** in this repo.
3. Copy its entire contents and paste them into the Strudel editor.
4. Press **Ctrl+Enter** (Windows/Linux) or **Cmd+Enter** (Mac) to run.

The script loads `github:tidalcycles/dirt-samples` so that `bd`, `hh`, `perc`, `rim`, `shaker`, etc. work. If you don't have a `vocal` sample, change `s("vocal:1")` to something you have (e.g. `s("words:1")`) or comment out that line.

## 5. Use the OSC Controller (Tidal only)

For Tidal users who want GUI sliders instead of typing `setF` commands:

1. Open **`osc-controller.html`** in your web browser.
2. Move the sliders to control volume, filters, and effects in real-time.
3. The page currently logs OSC messages to the console (you'd need a WebSocket OSC bridge for actual OSC sending).

**Note:** The current HTML file logs OSC commands. To actually send OSC, you'd need to run a WebSocket-to-OSC bridge or modify the JavaScript to use a proper OSC library.

## 6. MIDI Integration (HYACIN02 - B1_PN.midi)

Your MIDI file analysis: **Bass line** (31-36: G1-C2), 15 notes, medium velocity

### Tidal MIDI Setup
```haskell
-- In SuperCollider:
MIDIClient.init;
~midiOut = MIDIOut.newByName("Your MIDI Device", "Your MIDI Device");
~dirt.soundLibrary.addMIDI(\midiout, ~midiOut);

-- Then run d9 pattern (uses actual MIDI notes: 31, 33, 36)
```

### Strudel MIDI Setup
```javascript
// Option 1: INTERNAL SYNTH (produces sound - what the track uses):
note("31 33 36").s("sawtooth").gain(0.65)

// Option 2: EXTERNAL MIDI (requires connected MIDI device):
note("31 33 36").midi().velocity(0.7)
```

**Integration:**
- **Bass redesigned**: MIDI notes (31=G1, 33=A#1, 36=C2) now play as **rolling, rubbery bass**
- **Matches description**: Warm, sub-driven sawtooth with syncopated rolling pattern
- **d4 channel**: Plays during build, main, main2 sections with proper timing and effects

---

**Summary**

| Step | Action |
|------|--------|
| Sound | Open SuperCollider → run `SuperDirt.start` |
| Tidal REPL | Run `./run-tidal.sh` or `cabal repl < BootTidal.hs` |
| Cursor + AI | Restart Cursor, then use chat to drive Tidal via MCP |
| Strudel | Open strudel.cc → paste `minimal_deep_tech_126.strudel.js` |
| OSC Control | Open `osc-controller.html` in browser (Tidal only) |
