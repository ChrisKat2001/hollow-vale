/* ---------- Story Mode: stories written by a human DM ---------- */
const STORY_NPCS = ["thessaly", "maren", "seer", "ilsa", "odo", "agathe"];
const STORY_BOSSES = ["goblin", "gremlin", "ward", "siren", "wraith", "hydra", "crowd"];
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"];
const STAT_ROTA = ["wrangling", "sight", "modeling", "wisdom"];

/* Safe formatting for text written by DMs: everything is escaped, then `code`, **bold** and *italic* are allowed. */
function fmt(text) {
  return esc(text || "")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}
const paras = (text) => String(text || "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean).map(fmt);

/* Share codes: "HV1." + base64url(gzip(JSON)) */
async function encodeStory(story) {
  const bytes = new TextEncoder().encode(JSON.stringify(story));
  const gz = await new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream("gzip"))).arrayBuffer();
  let bin = ""; const u = new Uint8Array(gz);
  for (let i = 0; i < u.length; i += 0x8000) bin += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
  return "HV1." + btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function decodeStory(code) {
  code = String(code || "").trim();
  if (code.startsWith("{")) return validateStory(JSON.parse(code));
  if (!code.startsWith("HV1.")) throw new Error("This doesn't look like a story code. It should start with HV1.");
  const b64 = code.slice(4).replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64 + "===".slice((b64.length + 3) % 4));
  const u = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  const txt = await new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream("gzip"))).text();
  return validateStory(JSON.parse(txt));
}
function validateStory(st) {
  if (!st || typeof st !== "object" || !Array.isArray(st.chapters) || !st.chapters.length) throw new Error("This story has no chapters.");
  const s = (v, n = 4000) => String(v ?? "").slice(0, n);
  return {
    format: 1,
    title: s(st.title, 80) || "Untitled story", author: s(st.author, 60), npc: STORY_NPCS.includes(st.npc) ? st.npc : "thessaly",
    summary: s(st.summary, 200), intro: s(st.intro), ending: s(st.ending),
    dataset: { name: s(st.dataset?.name, 40) || "data", csv: s(st.dataset?.csv, 2000000) },
    chapters: st.chapters.slice(0, 15).map((c) => ({
      title: s(c.title, 80) || "Untitled chapter", story: s(c.story), task: s(c.task, 1500), starter: s(c.starter, 6000),
      check: s(c.check, 3000), fail: s(c.fail, 400), nudge: s(c.nudge, 800), clue: s(c.clue, 800), answer: s(c.answer, 6000),
      lesson: s(c.lesson, 1500), boss: !!c.boss, bossName: s(c.bossName, 60), bossArt: STORY_BOSSES.includes(c.bossArt) ? c.bossArt : "goblin",
      question: s(c.question, 600), options: s(c.options, 1500), why: s(c.why, 800),
    })),
  };
}
async function storyId(story) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(story)));
  return "st_" + [...new Uint8Array(buf)].slice(0, 6).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/* Turn a stored story into the session shape the chapter engine plays. */
function storyToSession(id, st) {
  if (!st) return null;
  return {
    id, story: true, npc: st.npc, num: "★", title: st.title, place: "Story", topic: st.author ? `by ${st.author}` : "",
    intro: st.intro,
    chapters: st.chapters.map((c, i) => ({
      id: i + 1, short: `${ROMAN[i] || i + 1} · ${c.title}`.slice(0, 32), title: `Chapter ${ROMAN[i] || i + 1} · ${c.title}`,
      stat: STAT_ROTA[i % 4], graphics: true, npc: st.npc,
      story: [...(i === 0 ? paras(st.intro) : []), ...paras(c.story)],
      task: fmt(c.task), starter: c.starter || "# Write your spell here\n",
      lesson: c.lesson ? `<b>Lesson:</b> ${fmt(c.lesson)}` : "<b>Well done.</b>",
      enemy: c.boss ? { name: c.bossName || "The Shadow", hp: 10, note: "Set by your DM.", art: c.bossArt } : null,
      check: c.check, fail: c.fail,
    })),
    epilogue: () => paras(st.ending || "The story ends here. Thanks for playing.").map((p) => `<p>${p}</p>`).join(""),
    summary: st.summary ? fmt(st.summary) : "",
  };
}
function storyHelp(sid, chId) {
  const c = S.stories?.[sid]?.chapters?.[chId - 1]; if (!c) return null;
  if (!c.nudge && !c.clue && !c.answer) return null;
  return { nudge: fmt(c.nudge || "Re-read the task. The spellbook can help."), clue: fmt(c.clue || c.nudge || "Search the spellbook for the key word in the task."), answer: c.answer || "", why: fmt(c.lesson || "") };
}
function storyInterp(sid, chId) {
  const c = S.stories?.[sid]?.chapters?.[chId - 1]; if (!c || !c.question || !c.options) return null;
  const lines = c.options.split("\n").map((l) => l.trim()).filter(Boolean).slice(0, 6);
  if (lines.length < 2 || !lines.some((l) => l.startsWith("*"))) return null;
  return {
    q: fmt(c.question),
    options: lines.map((l, k) => {
      const ok = l.startsWith("*");
      return { v: String.fromCharCode(97 + k), t: l.replace(/^\*\s*/, ""), ok, why: ok ? fmt(c.why || "That's right.") : "Not this one. Think about what the result really shows." };
    }),
  };
}

/* ---------- Story Mode screen ---------- */
function renderStories() {
  $("track").innerHTML = "";
  const list = Object.entries(S.stories || {}).filter(([id]) => id !== "st_test");
  $("stage").innerHTML = `
    <div class="card">
      <div class="chead"><canvas class="portrait" id="npcArt" width="64" height="64" aria-hidden="true"></canvas>
        <div><div class="dm-label">STORY MODE</div><h2 class="chapter">Tales from other tables</h2>
        <div class="npcname">Stories written by a Dungeon Master: a teacher, a friend, or you.</div></div></div>
      <div class="narration"><p>In Story Mode, a human DM writes the adventure: the scenes, the data and the challenges. Load a story someone shared with you, or open the editor and write your own.</p></div>
      <div class="actions" style="padding:6px 0 0;border:0">
        <button class="btn red" id="newStory">✒️ Write a story</button>
        <button class="btn ghost" id="exampleStory">Try the example story</button>
      </div>
    </div>
    <div class="card">
      <div class="dm-label">LOAD A STORY</div>
      <p class="fbintro">Paste the story code your DM gave you, or open a story file.</p>
      <textarea id="storyCode" class="storycode" rows="3" placeholder="HV1.…" spellcheck="false" autocapitalize="off"></textarea>
      <div class="actions" style="padding:8px 0 0;border:0">
        <button class="btn" id="loadCode">Load story</button>
        <label class="btn ghost filebtn">Open a file<input type="file" id="storyFile" accept=".json,.hvstory,.txt,application/json,text/plain" hidden></label>
        <span class="fbstatus" id="loadStatus" role="status"></span>
      </div>
    </div>
    <div class="card">
      <div class="dm-label">YOUR STORIES</div>
      ${list.length ? `<div class="sessions" style="padding:8px 0 0">${list.map(([id, st]) => {
        const p = S.progress[id]; const done = p?.done;
        return `<div class="storyrow">
          <button class="sess ${done ? "done" : "open"}" data-play="${id}"><span class="badge">★</span>
            <span><strong>${esc(st.title)}</strong><span>${st.author ? "by " + esc(st.author) + " · " : ""}${st.chapters.length} chapter${st.chapters.length > 1 ? "s" : ""}${st.summary ? " · " + esc(st.summary) : ""}</span></span>
            <span class="state">${done ? "✓ replay" : p && p.step > 1 ? "▶ continue" : "▶ play"}</span></button>
          <div class="storyactions"><button class="reset" data-edit="${id}">Edit</button><button class="reset" data-share="${id}">Share</button><button class="reset" data-del="${id}">Remove</button></div>
        </div>`; }).join("")}</div>` : `<p class="fbintro" style="margin-top:8px">No stories yet. Load one above, try the example, or write your own.</p>`}
      <div class="sharebox" id="sharebox" hidden></div>
    </div>`;
  drawSprite($("npcArt"), "thessaly");
  $("newStory").addEventListener("click", () => openEditor(null));
  $("exampleStory").addEventListener("click", async () => { const id = await addStory(EXAMPLE_STORY); openSession(id); });
  $("loadCode").addEventListener("click", async () => {
    try { const st = await decodeStory($("storyCode").value); const id = await addStory(st); $("loadStatus").textContent = `Loaded “${st.title}”.`; render(); }
    catch (e) { $("loadStatus").textContent = "Couldn't load it: " + e.message; }
  });
  $("storyFile").addEventListener("change", async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try { const st = await decodeStory(await f.text()); await addStory(st); render(); }
    catch (err) { $("loadStatus").textContent = "Couldn't open that file: " + err.message; }
  });
  document.querySelectorAll("[data-play]").forEach((b) => b.addEventListener("click", () => openSession(b.dataset.play)));
  document.querySelectorAll("[data-edit]").forEach((b) => b.addEventListener("click", () => openEditor(b.dataset.edit)));
  document.querySelectorAll("[data-del]").forEach((b) => b.addEventListener("click", () => {
    if (b.dataset.armed) { delete S.stories[b.dataset.del]; delete S.progress[b.dataset.del]; save(); render(); }
    else { b.dataset.armed = "1"; b.textContent = "Click again to remove"; }
  }));
  document.querySelectorAll("[data-share]").forEach((b) => b.addEventListener("click", () => showShare(b.dataset.share)));
}
async function addStory(st) {
  const clean = validateStory(st);
  const id = await storyId(clean);
  S.stories = Object.assign({}, S.stories, { [id]: clean }); save();
  return id;
}
async function showShare(id) {
  const st = S.stories[id]; const box = $("sharebox"); if (!st || !box) return;
  const code = await encodeStory(st);
  const link = location.protocol.startsWith("http") && !window.claude?.use ? `${location.origin}${location.pathname}?story=${code}` : "";
  box.hidden = false;
  box.innerHTML = `<div class="dm-label">SHARE “${esc(st.title)}”</div>
    <p class="fbintro">Send this code to your players. They paste it in <b>Load a story</b>. It contains the whole story, data included (${Math.round(code.length / 1024)} KB).</p>
    <textarea class="storycode" rows="3" readonly id="shareCode">${esc(code)}</textarea>
    <div class="actions" style="padding:8px 0 0;border:0">
      <button class="btn" id="copyCode">Copy code</button>
      ${link && link.length < 8000 ? `<button class="btn ghost" id="copyLink">Copy a direct link</button>` : ""}
      <span class="fbstatus" id="shareStatus" role="status"></span>
    </div>`;
  const copy = async (text, what) => { try { await navigator.clipboard.writeText(text); $("shareStatus").textContent = `${what} copied.`; } catch (e) { $("shareCode").select(); $("shareStatus").textContent = "Copy was blocked. Select the code and copy it by hand."; } };
  $("copyCode").addEventListener("click", () => copy(code, "Code"));
  if ($("copyLink")) $("copyLink").addEventListener("click", () => copy(link, "Link"));
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ---------- DM editor ---------- */
let ED = null, edId = null;
const blankChapter = () => ({ title: "", story: "", task: "", starter: "", check: "", fail: "", nudge: "", clue: "", answer: "", lesson: "", boss: false, bossName: "", bossArt: "goblin", question: "", options: "", why: "" });
function openEditor(id) {
  edId = id;
  ED = id && S.stories[id] ? JSON.parse(JSON.stringify(S.stories[id])) : { format: 1, title: "", author: "", npc: "thessaly", summary: "", intro: "", ending: "", dataset: { name: "data", csv: "" }, chapters: [blankChapter()] };
  S.view = "editor"; save(); render(); window.scrollTo({ top: 0 });
}
function edField(label, key, val, opts = {}) {
  const id = "ed_" + key.replace(/\W/g, "_");
  const help = opts.help ? `<small>${opts.help}</small>` : "";
  if (opts.area) return `<label for="${id}">${label}${help}</label><textarea id="${id}" data-k="${key}" rows="${opts.rows || 3}" class="${opts.code ? "codefield" : ""}" spellcheck="${opts.code ? "false" : "true"}" placeholder="${esc(opts.ph || "")}">${esc(val)}</textarea>`;
  return `<label for="${id}">${label}${help}</label><input id="${id}" data-k="${key}" value="${esc(val)}" placeholder="${esc(opts.ph || "")}">`;
}
function renderEditor() {
  $("track").innerHTML = `<button class="backlink" id="edBack">← Story Mode</button>`;
  $("edBack").addEventListener("click", () => { S.view = "stories"; save(); render(); });
  const csvRows = ED.dataset.csv ? ED.dataset.csv.trim().split("\n").length - 1 : 0;
  $("stage").innerHTML = `
    <div class="card editor">
      <div class="dm-label">THE DM'S DESK</div>
      <h2 class="chapter">${edId ? "Edit your story" : "Write a new story"}</h2>
      <p class="fbintro">Fill in the story, add your data and write each challenge. Use \`backticks\` for code, *stars* for italics and **double stars** for bold. Your work is saved in this browser as you go.</p>
      <div class="edgrid">
        ${edField("Title", "title", ED.title, { ph: "The Baker's Dozen" })}
        ${edField("Your name as DM", "author", ED.author, { ph: "Dr. Example" })}
        ${edField("One-line summary", "summary", ED.summary, { ph: "Averages, groups and a boxplot" })}
        <label>Guide character<small>Shown next to every chapter.</small></label>
        <div class="npcpick">${STORY_NPCS.map((n) => `<button type="button" class="npcopt ${ED.npc === n ? "picked" : ""}" data-npc="${n}" title="${esc(NPC_NAMES[n])}"><canvas width="48" height="48" data-art="${n}"></canvas><span>${esc(NPC_NAMES[n].split(",")[0])}</span></button>`).join("")}</div>
        ${edField("Opening", "intro", ED.intro, { area: true, rows: 4, ph: "Set the scene. Say what the data is called." })}
      </div>
    </div>
    <div class="card editor">
      <div class="dm-label">THE DATA</div>
      <div class="edgrid">
        ${edField("Name of the data frame in R", "dataset.name", ED.dataset.name, { ph: "bakery", help: "Players will type this name." })}
        <label>CSV data<small>${csvRows ? `${csvRows} rows loaded.` : "First row = column names."}</small></label>
        <div><label class="btn ghost filebtn small">Upload a CSV file<input type="file" id="csvFile" accept=".csv,text/csv,text/plain" hidden></label></div>
        ${edField("…or paste it here", "dataset.csv", ED.dataset.csv, { area: true, rows: 5, code: true, ph: "day,weekday,sales\n1,Mon,42" })}
      </div>
    </div>
    ${ED.chapters.map((c, i) => `
    <div class="card editor chapterbox">
      <div class="edhead"><div class="dm-label">CHAPTER ${ROMAN[i] || i + 1}</div>
        <div class="edtools">
          <button class="reset" data-move="${i}:-1" ${i ? "" : "disabled"}>↑ Up</button>
          <button class="reset" data-move="${i}:1" ${i < ED.chapters.length - 1 ? "" : "disabled"}>↓ Down</button>
          <button class="reset" data-test="${i}">Test this chapter</button>
          ${ED.chapters.length > 1 ? `<button class="reset" data-rm="${i}">Delete</button>` : ""}
        </div></div>
      <div class="edgrid">
        ${edField("Chapter title", `ch.${i}.title`, c.title)}
        ${edField("Story", `ch.${i}.story`, c.story, { area: true, rows: 3, ph: "What happens. What the characters say." })}
        ${edField("Task", `ch.${i}.task`, c.task, { area: true, rows: 2, ph: "Store the average of `sales` in `avg_sales`." })}
        ${edField("Starter code", `ch.${i}.starter`, c.starter, { area: true, rows: 5, code: true, help: "Use ____ for blanks the player fills in.", ph: "avg_sales <- ____(data$sales)" })}
        ${edField("Check", `ch.${i}.check`, c.check, { area: true, rows: 2, code: true, help: "An R condition that is TRUE when the task is solved. <code>n_plots</code> is the number of charts drawn.", ph: "exists(\"avg_sales\") && abs(avg_sales - mean(data$sales)) < 1e-6" })}
        ${edField("Message when the check fails", `ch.${i}.fail`, c.fail, { ph: "avg_sales should be the mean of sales." })}
        ${edField("Hint 1: nudge", `ch.${i}.nudge`, c.nudge, { ph: "Where to look, without the answer." })}
        ${edField("Hint 2: clue", `ch.${i}.clue`, c.clue, { ph: "Which function or column." })}
        ${edField("Answer (revealed after 2 failed casts)", `ch.${i}.answer`, c.answer, { area: true, rows: 4, code: true })}
        ${edField("Lesson", `ch.${i}.lesson`, c.lesson, { area: true, rows: 2, ph: "What the player should take away." })}
        <details class="edmore" ${c.question || c.boss ? "open" : ""}><summary>Optional: boss fight and interpretation question</summary>
          <div class="edgrid">
            <label class="chk"><input type="checkbox" data-k="ch.${i}.boss" ${c.boss ? "checked" : ""}> This chapter is a boss fight</label>
            ${edField("Boss name", `ch.${i}.bossName`, c.bossName, { ph: "The Stale Spirit" })}
            <label>Boss look</label>
            <div class="npcpick">${STORY_BOSSES.map((b) => `<button type="button" class="npcopt ${c.bossArt === b ? "picked" : ""}" data-boss="${i}:${b}"><canvas width="48" height="48" data-art="${b}"></canvas></button>`).join("")}</div>
            ${edField("Question after the code works", `ch.${i}.question`, c.question, { ph: "What can we safely conclude?" })}
            ${edField("Answer options, one per line, start the correct one with *", `ch.${i}.options`, c.options, { area: true, rows: 3, ph: "*The correct answer\nA common mistake\nAnother mistake" })}
            ${edField("Why the correct answer is right", `ch.${i}.why`, c.why, { area: true, rows: 2 })}
          </div></details>
      </div>
    </div>`).join("")}
    <div class="card editor">
      <button class="btn ghost" id="addCh" ${ED.chapters.length >= 15 ? "disabled" : ""}>+ Add a chapter</button>
      <div class="edgrid" style="margin-top:14px">${edField("Ending", "ending", ED.ending, { area: true, rows: 3, ph: "How the story ends." })}</div>
      <div class="actions" style="padding:14px 0 0;border:0">
        <button class="btn red" id="saveStory">Save story</button>
        <button class="btn" id="playStory">Save and play</button>
        <span class="fbstatus" id="edStatus" role="status"></span>
      </div>
    </div>`;
  document.querySelectorAll(".editor canvas[data-art]").forEach((cv) => drawSprite(cv, cv.dataset.art));
  const setK = (k, v) => {
    if (k.startsWith("ch.")) { const [, i, f] = k.split("."); ED.chapters[+i][f] = v; }
    else if (k.startsWith("dataset.")) ED.dataset[k.split(".")[1]] = v;
    else ED[k] = v;
    try { localStorage.setItem(KEY + "-draft", JSON.stringify({ id: edId, ED })); } catch (e) {}
  };
  document.querySelectorAll(".editor [data-k]").forEach((el) => el.addEventListener(el.type === "checkbox" ? "change" : "input", () => setK(el.dataset.k, el.type === "checkbox" ? el.checked : el.value)));
  document.querySelectorAll("[data-npc]").forEach((b) => b.addEventListener("click", () => { ED.npc = b.dataset.npc; renderEditor(); }));
  document.querySelectorAll("[data-boss]").forEach((b) => b.addEventListener("click", () => { const [i, art] = b.dataset.boss.split(":"); ED.chapters[+i].bossArt = art; ED.chapters[+i].boss = true; renderEditor(); }));
  document.querySelectorAll("[data-move]").forEach((b) => b.addEventListener("click", () => { const [i, d] = b.dataset.move.split(":").map(Number); const ch = ED.chapters.splice(i, 1)[0]; ED.chapters.splice(i + d, 0, ch); renderEditor(); }));
  document.querySelectorAll("[data-rm]").forEach((b) => b.addEventListener("click", () => {
    if (b.dataset.armed) { ED.chapters.splice(+b.dataset.rm, 1); renderEditor(); } else { b.dataset.armed = "1"; b.textContent = "Click again to delete"; }
  }));
  document.querySelectorAll("[data-test]").forEach((b) => b.addEventListener("click", () => testChapter(+b.dataset.test)));
  $("addCh").addEventListener("click", () => { ED.chapters.push(blankChapter()); renderEditor(); window.scrollTo({ top: document.body.scrollHeight }); });
  $("csvFile").addEventListener("change", async (e) => { const f = e.target.files[0]; if (!f) return; ED.dataset.csv = (await f.text()).replace(/\r\n/g, "\n"); renderEditor(); });
  const saveIt = async () => {
    if (!ED.title.trim()) { $("edStatus").textContent = "Give your story a title first."; return null; }
    if (!ED.chapters.some((c) => c.task.trim())) { $("edStatus").textContent = "Write at least one task."; return null; }
    const clean = validateStory(ED);
    const id = await storyId(clean);
    const stories = Object.assign({}, S.stories);
    if (edId && edId !== id) { delete stories[edId]; if (S.progress[edId]) { S.progress[id] = S.progress[edId]; delete S.progress[edId]; } }
    stories[id] = clean; S.stories = stories; edId = id; save();
    try { localStorage.removeItem(KEY + "-draft"); } catch (e) {}
    $("edStatus").textContent = "Saved.";
    return id;
  };
  $("saveStory").addEventListener("click", saveIt);
  $("playStory").addEventListener("click", async () => { const id = await saveIt(); if (id) { S.progress[id] = freshProgress(); openSession(id); } });
}
async function testChapter(i) {
  const id = await (async () => { const clean = validateStory(Object.assign({}, ED, { title: ED.title || "Test" })); const tid = "st_test"; S.stories = Object.assign({}, S.stories, { [tid]: clean }); return tid; })();
  S.progress[id] = Object.assign(freshProgress(), { step: i + 1, testFrom: edId ?? "new" });
  save(); openSession(id);
}
