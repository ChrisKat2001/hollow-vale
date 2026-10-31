# The Hollow Vale

A fantasy tabletop campaign that teaches data analysis in R. R runs in the browser through webR, so nothing needs to be installed.

Open `index.html` through a web server (for example GitHub Pages). After the first visit it also works offline and can be installed as an app.

When you change any file, bump `VERSION` in `sw.js` so players get the update.

webR is © the webR authors (MIT licence). R is © The R Foundation (GPL-2 | GPL-3).

## Source

The game is built from the files in `dev/`:

- `app.js`: campaign, sessions and game logic
- `r_setup.R`: R data for every session and the answer checks
- `hints.js`, `interpret.js`, `spellbook.js`, `sprites.js`: hints, interpretation questions, cheat sheet and pixel art
- `base.css`, `extra.css`: styles
- `worker-shim.js`: prepended to webR's `webr-worker.js` to load the compressed R files and work offline

Rebuild `index.html` with `python3 dev/build.py --app` (adjust the paths at the top of the script).
