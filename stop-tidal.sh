#!/usr/bin/env bash
# Stop all Tidal-related services: SuperDirt (sclang), Tidal REPL (ghci), Tidal MCP server.
set -e
pkill -f "sclang.*start_superdirt" 2>/dev/null || true
pkill -f "BootTidal" 2>/dev/null || true  # ghci/cabal repl with BootTidal
pkill -f "tidal-mcp-server/dist/index.js" 2>/dev/null || true
echo "All Tidal services stopped."
