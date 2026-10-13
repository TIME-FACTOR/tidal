#!/usr/bin/env python3
"""
Convert MIDI file to Strudel pattern
Usage: python3 midi_to_strudel.py [midi_file_path]

Converts MIDI notes to Strudel note() patterns with .midi() output.
"""

import sys
import mido
from pathlib import Path

def midi_to_strudel(midi_path, max_notes=16):
    """Convert MIDI file to Strudel pattern"""
    midi = mido.MidiFile(str(midi_path))

    notes = []
    current_time = 0

    # Extract note data from first track
    for msg in midi.tracks[0]:
        current_time += msg.time
        if msg.type == 'note_on' and msg.velocity > 0:
            notes.append({
                'note': msg.note,
                'time': current_time,
                'velocity': msg.velocity
            })

    if not notes:
        print("No notes found in MIDI file")
        return None

    # Convert to Strudel pattern
    strudel_notes = [str(note['note']) for note in notes[:max_notes]]

    pattern = ' '.join(strudel_notes)
    full_pattern = f'note("{pattern}").midi().velocity(0.7)'

    return {
        'pattern': pattern,
        'full_pattern': full_pattern,
        'notes': strudel_notes,
        'count': len(notes),
        'note_range': f"{min(n['note'] for n in notes)}-{max(n['note'] for n in notes)}"
    }

def main():
    # Use default MIDI file if no argument provided
    midi_path = Path.home() / "Desktop" / "HYACIN02  - B1_PN.midi"

    if len(sys.argv) > 1:
        midi_path = Path(sys.argv[1])

    if not midi_path.exists():
        print(f"MIDI file not found: {midi_path}")
        return

    print(f"Converting: {midi_path.name}")

    result = midi_to_strudel(midi_path)
    if result:
        print(f"Found {result['count']} notes (range: {result['note_range']})")
        print(f"Strudel pattern: {result['pattern']}")
        print(f"Full pattern: {result['full_pattern']}")

        # Save to file
        output_file = midi_path.with_suffix('.strudel.txt')
        with open(output_file, 'w') as f:
            f.write(f"// Generated from {midi_path.name}\n")
            f.write(f"// {result['count']} notes, range: {result['note_range']}\n")
            f.write(f"{result['full_pattern']}\n")

        print(f"Saved to: {output_file}")

if __name__ == "__main__":
    main()