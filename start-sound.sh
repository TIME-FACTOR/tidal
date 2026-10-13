#!/usr/bin/env bash
# Start SuperCollider + SuperDirt for Tidal (runs in background).
# Stop with: pkill -f "sclang.*start_superdirt"
# If port 57120 is in use, stop any existing run first with the command above.
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCLANG="/Applications/SuperCollider.app/Contents/MacOS/sclang"
if [[ ! -x "$SCLANG" ]]; then
  echo "SuperCollider not found at $SCLANG. Install with: brew install supercollider"
  exit 1
fi
"$SCLANG" "$SCRIPT_DIR/start_superdirt.scd" &
echo "SuperDirt starting in background (port 57120). To stop: pkill -f 'sclang.*start_superdirt'"
