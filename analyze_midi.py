#!/usr/bin/env python3
"""
MIDI Analysis Script for HYACIN02 - B1_PN.midi
Run: python3 analyze_midi.py

This script analyzes your MIDI file and generates Tidal/Strudel patterns
based on the actual note data found in the file.

Requirements: pip install mido
"""

import sys
from pathlib import Path

def analyze_midi_file():
    midi_path = Path.home() / "Desktop" / "HYACIN02  - B1_PN.midi"

    try:
        import mido
    except ImportError:
        print("Install mido: pip install mido")
        return

    try:
        midi = mido.MidiFile(str(midi_path))
    except Exception as e:
        print(f"Error reading MIDI file: {e}")
        return

    print("🎵 MIDI File Analysis: HYACIN02 - B1_PN.midi")
    print(f"Format: {midi.type}")
    print(f"Tracks: {len(midi.tracks)}")
    print(f"PPQ (ticks per beat): {midi.ticks_per_beat}")
    print(".1f")

    for i, track in enumerate(midi.tracks):
        print(f"\n🎼 Track {i}: {len(track)} messages")

        notes = []
        current_time = 0

        for msg in track:
            current_time += msg.time

            if msg.type == 'note_on' and msg.velocity > 0:
                notes.append({
                    'note': msg.note,
                    'velocity': msg.velocity,
                    'time': current_time
                })

        if notes:
            print(f"  Notes found: {len(notes)}")
            print(f"  Note range: {min(n['note'] for n in notes)} - {max(n['note'] for n in notes)}")
            print(f"  Velocity range: {min(n['velocity'] for n in notes)} - {max(n['velocity'] for n in notes)}")

            # Show first 10 notes
            print("  First 10 notes (MIDI numbers):")
            for j, note in enumerate(notes[:10]):
                midi_note = note['note']
                note_name = midi_to_note_name(midi_note)
                print("2d")

            # Suggest Tidal patterns
            unique_notes = sorted(set(n['note'] for n in notes))
            print("\n  Suggested Tidal pattern (first 8 unique notes):")
            pattern = " ".join(str(n) for n in unique_notes[:8])
            print(f"    midinote \"{pattern}\" # s \"midiout\" # velocity 0.8")
        else:
            print("  No note data found")

def midi_to_note_name(midi_note):
    """Convert MIDI note number to note name"""
    notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    octave = (midi_note // 12) - 1
    note = notes[midi_note % 12]
    return f"{note}{octave}"

if __name__ == "__main__":
    analyze_midi_file()