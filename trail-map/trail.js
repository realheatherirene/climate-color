/* ==========================================================================
   THE TRAIL MAP: the renderer
   ==========================================================================
   Reads a content pack and draws the page. All words live in data/; all
   titles live in titles.js; colors and action words come from
   core/climate-color.js. This file holds only behavior.

   Flow: the Trailhead (get your bearings, pick your trail) -> stops 1-4
   along the trail -> the Lodge (pick an exhibit, A-I) -> the Field Guide
   -> the Bulletin Board. Everything is on one page. A trail and exhibit
   can be linked directly: #green or #green-water.
   ========================================================================== */

import { COLORS, COLOR_KEYS, getColor } from "../core/climate-color.js";
import { TITLES, TRAIL_ORDER, EXHIBIT_ORDER, GUIDE_ORDER } from "./titles.js";
import { renderStop, renderBlocks, fmt, icon } from "./exhibits.js";

const pack = await import("./data/adult/index.js");
const { trailhead, shared, topics, trails, exhibits } = pack;

const $ = id => document.getElementById(id);
const st = { trail: null, exhibit: null };
let uid = 0;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const topicOf = key => topics.topics.find(t => t.key === key);
const letterOf = key => "ABCDEFGHI".charAt(topics.topics.findIndex(t => t.key === key));

/* ---------- Notes: this device only ---------- */
/* Stored with the browser's own storage under one key per trail, exhibit,
   and stop. Never sent anywhere. Every read and write is guarded, because
   some browsers and private windows block storage. */
const NOTE_PREFIX = "climate-trail-map:notes:";
const store = {
  get(k) { try { return localStorage.getItem(NOTE_PREFIX + k) || ""; } catch (e) { return null; } },
  set(k, v) { try { v ? localStorage.setItem(NOTE_PREFIX + k, v) : localStorage.removeItem(NOTE_PREFIX + k); return true; } catch (e) { return false; } }
};
const noteKey = key => [st.trail, key === "fit" ? "" : st.exhibit, key].filter(Boolean).join(":").toLowerCase();
function notesBox(key) {
  const N = shared.notes, k = noteKey(key), saved = store.get(k), id = `note-${++uid}`;
  const works = saved !== null;
  return `<div class="notes"><label class="sub" for="${id}">${fmt(N.label)}</label>
    <textarea id="${id}" class="note" data-note="${k}" rows="4" placeholder="${fmt(N.placeholder)}">${saved ? saved.replace(/&/g, "&amp;").replace(/</g, "&lt;") : ""}</textarea>
    <p class="note-help">${fmt(works ? N.help : N.off)}</p>
    ${works ? `<button type="button" class="linkish" data-go="clearNote" data-note="${k}" data-for="${id}">${fmt(N.clear)}</button>` : ""}</div>`;
}

const ctx = {
  uid: () => ++uid,
  topic: () => topicOf(st.exhibit),
  otherTrails: () => COLOR_KEYS.filter(k => k !== st.trail).map(getColor),
  allWays: () => COLOR_KEYS.map(key => {
    const c = getColor(key);
    return { key, action: c.action, meaning: cap(trailhead.ways[key]), mine: key === st.trail, yours: shared.guide.yours };
  }),
  notes: notesBox
};

/* Fills {trail}, {action}, {meaning}, {words}, {exhibit}, {lower}, and
   {about} in shared wording. */
const fill = (txt, c, tp) => txt.replace(/\{trail\}/g, c.key).replace(/\{action\}/g, c.action)
  .replace(/\{meaning\}/g, trailhead.ways[c.key])
  .replace(/\{words\}/g, c.words.map(w => w.word).join(", ").replace(/, ([^,]*)$/, ", or $1"))
  .replace(/\{exhibit\}/g, tp ? tp.name : "").replace(/\{lower\}/g, tp ? tp.name.toLowerCase() : "")
  .replace(/\{about\}/g, tp ? tp.about : "");

/* ---------- Places: one source for names, icons, and signs ---------- */

const P = shared.places;

/* A place's sign: an eyebrow, a title, a short line, and its icon. */
const sign = (pl, line = "") => `<div class="place-sign"><div class="text">${pl.eyebrow ? `<p class="place-eyebrow">${fmt(pl.eyebrow)}</p>` : ""}<p class="place-title">${fmt(pl.title)}</p>
    ${pl.sub ? `<p class="place-sub">${fmt(pl.sub)}</p>` : ""}${line ? `<p class="place-line">${fmt(line)}</p>` : ""}</div>${icon(pl.icon, "place-icon")}</div>`;

/* A place on the trail: its sign over a light board. */
const place = (key, cls, board) => `<li class="stop place ${cls}" id="${key}">
  <span class="marker" aria-hidden="true">${icon(P[key].icon)}</span>
  ${sign(P[key])}
  <div class="place-board">${board}</div></li>`;

/* ---------- Static parts: header and the Trailhead ---------- */

document.title = trailhead.title + " | Climate Color";
$("title").textContent = trailhead.title;
$("lede").textContent = trailhead.lede;

/* "Here's how it works": the places, in order, as a route strip. It
   doubles as the map's key, since each icon matches its place's sign. */
$("todo").innerHTML = `<p class="sub">${fmt(trailhead.todoTitle)}</p><ol class="route">${Object.entries(P).map(([key, pl]) =>
  `<li class="route-${key}"><span class="route-icon" aria-hidden="true">${icon(pl.icon)}</span><span><b>${fmt(pl.name)}.</b> ${fmt(pl.route)}</span></li>`).join("")}</ol>`;

/* The pace note, with a way to save your spot from the very top. */
const S0 = shared.save;
$("note").innerHTML = `${fmt(trailhead.note)} ${fmt(S0.pace)} <button type="button" class="linkish" data-go="copySpot">${fmt(S0.paceButton)}</button> ${fmt(S0.paceAfter)}`;
$("footnote").textContent = trailhead.footnote;

$("trailheadMarker").innerHTML = icon(P.trailhead.icon);
$("trailheadSign").outerHTML = sign(P.trailhead);

const B = trailhead.board;
$("board").innerHTML = `<h2 id="boardTitle">${TITLES.how}</h2>
  ${renderBlocks(B.blocks, ctx)}
  <p class="open-all">${fmt(B.open)}</p>
  <details class="mini"><summary>${fmt(B.storyLabel)}</summary><div class="story">${renderBlocks(B.story, ctx)}</div></details>`;

$("pickTitle").textContent = TITLES.pickTrail;
$("pickHint").textContent = trailhead.pick.hint;
$("trailOpts").innerHTML = COLOR_KEYS.map(key => {
  const c = getColor(key);
  return `<li><button type="button" class="opt" data-trail="${key}" aria-pressed="false">
    <span class="blaze" style="background:var(--${key.toLowerCase()}-color)" aria-hidden="true"></span>
    <span><span class="oname">${c.action} <span class="tcolor">· ${key}</span><span class="your-tag">${icon("i-check")}${fmt(shared.guide.yours)}</span></span>
    <span class="odesc">${fmt(cap(trailhead.ways[key]))}.</span></span></button></li>`;
}).join("");

/* ---------- Pieces ---------- */

/* "Save your spot." The link carries the trail and exhibit in its #hash,
   and nothing else: no account, nothing saved online. */
function savePanel(id) {
  const S = shared.save;
  return `<div class="save"><p class="sub">${fmt(S.title)}</p><p>${fmt(S.text)}</p>
    <div class="save-row"><input type="text" readonly class="save-link" id="${id}" aria-label="Link to your trail" value="">
    <button type="button" class="pill-btn pill-all next-btn" data-go="copy" data-for="${id}">${fmt(S.copy)}</button></div></div>`;
}

/* Unnumbered parts, on a white panel, each ending with a "Next" line. */
const panel = parts => `<ul class="rooms">${parts.map(([key, s, next]) =>
  renderStop({ n: null, key, title: TITLES[key], stop: s, line: "room", ctx, aheadLabel: next || "Next" })).join("")}</ul>`;

/* ---------- The trail: stops 1-4 ---------- */

function renderTrail() {
  document.querySelectorAll("[data-trail].opt").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.trail === st.trail)));
  const box = $("trailBox"), stops = $("trailStops");
  if (!st.trail) { box.innerHTML = ""; stops.innerHTML = ""; return; }
  const t = trails[st.trail];
  /* The picked row carries the "Your trail" tag; a box below appears
     only for a trail that isn't built yet. */
  box.innerHTML = t ? "" : `<p class="not-built">${fmt(trailhead.notBuilt)}</p><button type="button" class="pill-btn pill-all next-btn" data-trail="Green">Try the Green Trail <span aria-hidden="true">&rarr;</span></button>`;
  if (!t) { stops.innerHTML = ""; return; }
  let n = 1;
  const stopFor = key => key === "care" ? shared.care : t[key];
  stops.innerHTML = TRAIL_ORDER.filter(stopFor).map(key =>
    renderStop({ n: n++, key, title: TITLES[key], stop: stopFor(key), ctx })).join("");
}

/* ---------- The Lodge, the Field Guide, and the Bulletin Board ---------- */

function renderLodge() {
  const line = $("lodgeLine"), t = trails[st.trail];
  if (!t) { line.innerHTML = ""; return; }
  const c = getColor(st.trail), L = shared.lodge;
  const tp = topicOf(st.exhibit), E = exhibits[st.exhibit];
  const f = txt => fill(txt, c, tp);

  /* The exhibit picker, lettered A to I, in the same row style as the
     trail picker. */
  const opts = topics.topics.map(x => `<li><button type="button" class="opt" data-exhibit="${x.key}" aria-pressed="${st.exhibit === x.key}">
    <span class="letter" aria-hidden="true">${letterOf(x.key)}</span>
    <span><span class="oname">${icon(x.icon, "oicon")}${fmt(x.name)}</span><span class="odesc">${fmt(cap(x.about))}.</span></span></button></li>`).join("");

  /* The open exhibit: a room in the Lodge, with its own sign (letter,
     name, and what it covers), a one-line promise, then its parts. An
     exhibit that isn't built yet shows its teaser only. */
  let open = "";
  if (tp) {
    const letter = letterOf(tp.key);
    const roomSign = `<div class="room-sign"><span class="letter big" aria-hidden="true">${letter}</span>
      <div class="text"><p class="place-eyebrow">${fmt(L.exhibitWord)} ${letter}</p><p class="room-title">${fmt(tp.name)}</p>
      <p class="place-sub">${fmt(cap(tp.about))}</p></div>${icon(tp.icon, "place-icon")}</div>`;
    open = `<section class="exhibit-open" id="exhibitOpen" aria-label="${fmt(L.exhibitWord)} ${letter}: ${fmt(tp.name)}">${roomSign}` + (E
      ? `<div class="room-body"><p class="promise">${fmt(E.promise)}</p>${panel(EXHIBIT_ORDER.filter(k => E.parts[k]).map(k => [k, E.parts[k]]))}</div>`
      : `<div class="room-body">${renderBlocks([{ teaser: true }], ctx)}<p class="not-built">${fmt(L.notBuilt)}</p><button type="button" class="pill-btn pill-all next-btn" data-exhibit="water">${fmt(L.tryReady)} <span aria-hidden="true">&rarr;</span></button></div>`) + `</section>`;
  }

  const lodge = place("lodge", "is-lodge", `<p>${fmt(f(L.welcome))}</p>
      <h3 class="board-h">${TITLES.pickExhibit}</h3>
      <p class="step-hint">${fmt(L.pickHint)}</p>
      <ul class="options exhibits">${opts}</ul>${open}`);

  if (!E) { line.innerHTML = lodge; return; }

  /* The Field Guide: one frame for everyone. The trail file gives the
     story and "Try it now"; the exhibit file gives the situation; the
     reader writes the rest. */
  const G = shared.guide, A = G.ahead;
  const guideParts = {
    story: t.story,
    think: { exhibit: "rest", blocks: [{ sub: G.think.lead }, { p: E.situation }, { questions: G.think.questions.map(f) }] },
    tryIt: t.tryIt,
    others: { exhibit: "sign", blocks: [{ p: f(G.others.lead) }, { ways: true }, { questions: [G.others.ask] }] },
    first: { exhibit: "rest", blocks: [
      { questions: [...G.first.questions, ...(E.first ? E.first.questions : [])] },
      { questions: [...G.first.friend, ...(E.first ? E.first.friend : [])], title: "With a friend" }
    ] }
  };
  const PG = P.guide;
  const printRow = `<p class="print-row"><button type="button" class="pill-btn pill-all next-btn" data-go="printGuide">${fmt(G.print)}</button> <span class="reach">${fmt(G.printHelp)}</span></p>`;
  /* Its cover says what it's for and how to use it, with Print right
     there; its parts follow, and Print comes again at the end. */
  const guide = `<li class="stop is-guide" id="guide"><span class="marker" aria-hidden="true">${icon(PG.icon)}</span>
    <div class="guide-card">
      <div class="guide-cover"><div><p class="place-eyebrow">${fmt(PG.eyebrow)}</p><p class="place-title">${fmt(PG.title)}</p>
        <p class="guide-sub">${fmt(PG.sub)}</p>
        <p class="guide-for"><span class="blaze" style="background:var(--${c.key.toLowerCase()}-color)" aria-hidden="true"></span>The ${c.key} Trail <span aria-hidden="true">·</span> ${fmt(L.exhibitWord)} ${letterOf(tp.key)}: ${fmt(tp.name)}</p>
        <p class="place-line">${fmt(f(G.line))}</p>
        <p class="guide-use">${fmt(G.whatFor)}</p><p class="guide-use">${fmt(G.howTo)}</p>${printRow}</div>${icon(PG.icon, "place-icon")}</div>
      <div class="guide-body">
        ${panel(GUIDE_ORDER.filter(k => guideParts[k]).map(k => [k, { ...guideParts[k], ahead: A[k], line: G.lines[k] }]))}
        ${printRow}
      </div></div></li>`;

  /* The Bulletin Board: the end of the trail and the place to choose. */
  const J = shared.bulletin;
  const farewell = (t.farewell || []).map(p => `<p>${fmt(p.replace("{topic}", tp.name.toLowerCase()))}</p>`).join("");
  const way = (go, w, ic, back, extraAttr = "") => `<li><button type="button" class="way ${back ? "back" : "on"}" data-go="${go}"${extraAttr}>
      <span class="dir">${back ? "&uarr;" : "&rarr;"} ${fmt(f(w.dir))}</span>${icon(ic)}<b>${w.label}</b><span>${fmt(f(w.hint))}</span></button></li>`;
  const bulletin = place("bulletin", "is-board", `<p>${fmt(J.lede)}</p>
      <div class="recap"><p>${fmt(f(J.recap))}</p></div>
      ${E.finder ? panel([["nearby", { ...E.finder, ahead: null }]]) : ""}
      <h3 class="board-h">${TITLES.next}</h3>
      <ul class="ways">
        ${way("lodge", J.exhibit, P.lodge.icon, true)}
        ${way("trailhead", J.trail, P.trail.icon, true)}
        ${way("keep", J.keep, P.guide.icon, false, ' aria-expanded="false" aria-controls="keep"')}
      </ul>
      <div class="keep" id="keep" hidden>${farewell}${savePanel("saveEnd")}${printRow}</div>`);

  line.innerHTML = lodge + guide + bulletin;
}

function render(trailChanged = true) {
  if (trailChanged) renderTrail();
  renderLodge();
  const hash = st.trail ? "#" + st.trail.toLowerCase() + (st.exhibit && trails[st.trail] ? "-" + st.exhibit : "") : " ";
  history.replaceState(null, "", hash.trim() || location.pathname);
  document.querySelectorAll(".save-link").forEach(i => { i.value = location.href; });
}

/* ---------- Events (one listener each, so re-rendered parts just work) ---------- */

const go = el => el && el.scrollIntoView({ behavior: "smooth", block: "start" });

/* Copies a link to the reader's spot, then says "Copied" on the button
   for a moment. Some embeds block the clipboard, so there's a fallback. */
function copyText(text, btn, label) {
  const done = () => { btn.textContent = shared.save.copied; setTimeout(() => { btn.textContent = label; }, 2000); };
  const fallback = () => {
    const t = document.createElement("textarea");
    t.value = text; t.setAttribute("readonly", ""); t.style.position = "absolute"; t.style.left = "-9999px";
    document.body.appendChild(t); t.select();
    try { document.execCommand("copy"); done(); } catch (err) { /* the save panel's link can still be copied by hand */ }
    t.remove();
  };
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
}

/* Print the Field Guide only: everything else is hidden while printing. */
function printGuide() {
  document.body.classList.add("print-guide");
  document.querySelectorAll("#guide details").forEach(d => { d.open = true; });
  try { window.print(); } catch (err) { /* blocked in some previews */ }
  setTimeout(() => document.body.classList.remove("print-guide"), 500);
}

document.addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.dataset.trail) {
    st.trail = b.dataset.trail; render();
    /* Bring stop 1 (or the "still being built" note) into view, keeping
       the picked row in sight where the screen allows. */
    const next = trails[st.trail] ? $("trailStops") : $("trailBox");
    if (next) next.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return;
  }
  if (b.dataset.exhibit) { st.exhibit = b.dataset.exhibit; render(false); go($("exhibitOpen")); return; }
  if (b.classList.contains("find-btn")) {
    const r = $(b.getAttribute("aria-controls")); r.hidden = !r.hidden;
    b.setAttribute("aria-expanded", String(!r.hidden)); return;
  }
  const to = b.dataset.go;
  if (to === "lodge") go($("lodge"));
  if (to === "trailhead") go($("pick"));
  if (to === "keep") { const k = $("keep"); k.hidden = !k.hidden; b.setAttribute("aria-expanded", String(!k.hidden)); }
  if (to === "printGuide") printGuide();
  if (to === "clearNote") {
    store.set(b.dataset.note, ""); $(b.dataset.for).value = "";
    b.textContent = shared.notes.cleared; setTimeout(() => { b.textContent = shared.notes.clear; }, 2000);
  }
  if (to === "copySpot") copyText(location.href, b, shared.save.paceButton);
  if (to === "copy") { $(b.dataset.for).select(); copyText(location.href, b, shared.save.copy); }
});

/* Notes save as you type, on this device only. */
document.addEventListener("input", e => {
  if (e.target.matches("textarea.note")) store.set(e.target.dataset.note, e.target.value);
});

/* A stop's marker fills in only while it's open. */
document.addEventListener("toggle", e => {
  if (e.target.tagName === "DETAILS" && e.target.parentNode.classList.contains("stop")) e.target.parentNode.classList.toggle("is-open", e.target.open);
}, true);

/* Direct links: #green or #green-water. */
const [hTrail, hExhibit] = location.hash.slice(1).split("-");
const k = COLORS.find(c => c.key.toLowerCase() === (hTrail || "").toLowerCase());
if (k) { st.trail = k.key; if (topicOf(hExhibit)) st.exhibit = hExhibit; }
render();
if (k) go(st.exhibit && trails[st.trail] ? $("exhibitOpen") : $("trailStops"));

/* Printing the page opens every stop, so the printout carries it all. */
window.addEventListener("beforeprint", () => document.querySelectorAll("details").forEach(d => { d.open = true; }));
