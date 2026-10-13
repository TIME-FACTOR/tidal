#!/usr/bin/env bash
# Run Tidal from this clone. Ensure Haskell is on PATH (e.g. open a new terminal or: source ~/.zshrc)
set -e
cd "$(dirname "$0")"
export PATH="${HOME}/.ghcup/bin:${PATH}"
exec cabal repl < BootTidal.hs
