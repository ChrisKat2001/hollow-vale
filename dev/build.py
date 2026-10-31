import re, sys
APP_MODE = '--app' in sys.argv
css = open('/tmp/base.css').read() + open('src/extra.css').read()
r = open('src/r_setup.R').read()
js = open('src/sprites.js').read() + '\n' + open('src/spellbook.js').read() + '\n' + open('src/hints.js').read() + '\n' + open('src/interpret.js').read() + '\n' + open('src/app.js').read()
assert '`' not in r and '${' not in r
APP_HEAD = """
<meta name="theme-color" content="#0d0b0e">
<meta name="description" content="Learn data analysis in R through a fantasy tabletop campaign.">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" sizes="192x192" href="icons/icon-192.png">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Hollow Vale">""" if APP_MODE else ""
APP_TAIL = open("src/app_tail.html").read() if APP_MODE else ""
html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>The Hollow Vale</title>{APP_HEAD}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IM+Fell+English+SC&family=IM+Fell+English:ital@0;1&family=VT323&family=IBM+Plex+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>{css}</style>
</head>
<body>
<header>
  <div>
    <div class="eyebrow">THE BASEMENT CAMPAIGN · R EDITION</div>
    <h1>The Hollow Vale</h1>
  </div>
  <div id="status" class="status">Summoning R… (first load can take 20–60 s)</div>
</header>

<main>
  <section>
    <div class="track" id="track"></div>
    <div id="stage"></div>
  </section>

  <aside>
    <div class="sheet" id="sheet"></div>

    <div class="card dice">
      <div class="dm-label">ROLL FOR INSIGHT</div>
      <canvas id="d20" width="120" height="120" aria-hidden="true"></canvas>
      <button class="btn red" id="rollBtn">Roll the d20</button>
      <div class="roll-result" id="rollResult">Roll 10 or more for the next hint.</div>
      <div class="log" id="diceLog"></div>
    </div>

    <div class="card spellbook">
      <h3>Spellbook</h3>
      <div class="sub">A general R cheat sheet for data analysis. Search it anytime. Nobody memorises every spell.</div>
      <label for="spellSearch" class="sr-only">Search the spellbook</label>
      <input id="spellSearch" class="spellsearch" type="search" placeholder="Search: mean, plot, test, NA…" autocomplete="off" autocapitalize="off">
      <div class="scroll" id="spells"></div>
    </div>
  </aside>
</main>
<div class="levelup" id="levelup">Level Up!</div>

<script>
const R_SETUP = String.raw`{r}`;
{js}
$("spellSearch").addEventListener("input", (e) => {{ spellQuery = e.target.value; renderSpells(); }});
</script>{APP_TAIL}
</body>
</html>
'''
open('dist/index.html' if APP_MODE else 'index.html','w').write(html)
print(len(html))
