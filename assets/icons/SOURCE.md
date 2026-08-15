# Project icons

Vendored from the BRUNO-OS icon suite in `br9704/brwski-portfolio`
(`public/icons/projects/*.svg`) — original 1-bit Win95 pixel art, © Bruno Jaamaa.

Each `<slug>.svg` is the source glyph (`fill="currentColor"`); each `<slug>.png`
is that glyph rendered white on a dark app-tile for use in the README.

Mapping: `desktop` = `br95` (the Win95 desktop), `ossq` = `oss-contributions`.
Others match their slug.

Rendering (so a later pass can reproduce these exactly): the glyph's
`currentColor` is replaced with `#f5f5f5` and drawn at 224x224 over a rounded
rect of `#0b0e0c` with a 22px corner radius. Measured off the existing tiles
rather than guessed.
