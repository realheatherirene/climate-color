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

/* ---------- Static parts: header and the Trailhead ---------- */

document.title = trailhead.title + " | Climate Color";
$("title").textContent = trailhead.title;
$("lede").textContent = trailhead.lede;
$("todo").innerHTML = `<p class="sub">${fmt(trailhead.todoTitle)}</p><ol>${trailhead.todo.map(t => `<li>${fmt(t)}</li>`).join("")}</ol>`;
$("note").textContent = trailhead.note;
$("footnote").textContent = trailhead.footnote;

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
    <span><span class="oname">${c.action} <span class="tcolor">· ${key}</span></span>
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

/* A place on the trail: a colored sign over a light board. */
const place = ({ cls, id, iconId, eyebrow, title, sub, line, board }) => `<li class="stop place ${cls}" id="${id}">
  <span class="marker" aria-hidden="true">${icon(iconId)}</span>
  <div class="place-sign"><div class="text">${eyebrow ? `<p class="place-eyebrow">${fmt(eyebrow)}</p>` : ""}<p class="place-title">${fmt(title)}</p>
    ${sub ? `<p class="place-sub">${fmt(sub)}</p>` : ""}${line ? `<p class="place-line">${fmt(line)}</p>` : ""}</div>${icon(iconId, "place-icon")}</div>
  <div class="place-board">${board}</div></li>`;

/* Unnumbered parts, on a white panel, each ending with a "Next" line. */
const panel = parts => `<ul class="rooms">${parts.map(([key, s, next]) =>
  renderStop({ n: null, key, title: TITLES[key], stop: s, line: "room", ctx, aheadLabel: next || "Next" })).join("")}</ul>`;

/* ---------- The trail: stops 1-4 ---------- */

function renderTrail() {
  document.querySelectorAll("[data-trail].opt").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.trail === st.trail)));
  const box = $("trailBox"), stops = $("trailStops");
  if (!st.trail) { box.innerHTML = ""; stops.innerHTML = ""; return; }
  const c = getColor(st.trail), t = trails[st.trail];
  box.innerHTML = `<div class="here"><p><b>Your trail</b></p><p class="route-name">The ${c.key} Trail</p>
    <p>You help by <b>${c.action}</b>: ${fmt(trailhead.ways[c.key])}.</p>
    ${t ? `<details class="mini"><summary>${fmt(shared.save.opener)}</summary>${savePanel("saveTop")}</details>` : ""}</div>` +
    (t ? `<p class="start-small">Start at stop 1, just below. <span aria-hidden="true">&darr;</span></p>` : `<p class="not-built">${fmt(trailhead.notBuilt)}</p><button type="button" class="pill-btn pill-all next-btn" data-trail="Green">Try the Green Trail <span aria-hidden="true">&rarr;</span></button>`);
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

  /* The open exhibit: its letter and sign, why the topic matters, then
     its parts. An exhibit that isn't built yet shows its teaser only. */
  let open = "";
  if (tp) {
    const head = `<div class="ex-head"><span class="letter big" aria-hidden="true">${letterOf(tp.key)}</span>
      ${icon(tp.icon, "ex-icon")}<div><p class="ex-name"><span class="sr">Exhibit ${letterOf(tp.key)}: </span>${fmt(tp.name)}</p><p class="ex-about">${fmt(cap(tp.about))}</p></div></div>
      <p class="sub">${fmt(f(L.why))}</p><p>${fmt(tp.teaser)}</p>
      <p class="cite">Source: <a class="ext" href="${tp.src.url}" target="_blank" rel="noopener">${fmt(tp.src.title)}${icon("i-ext")}</a></p>`;
    open = `<section class="exhibit-open" id="exhibitOpen" aria-label="Exhibit ${letterOf(tp.key)}: ${fmt(tp.name)}">${head}` + (E
      ? panel(EXHIBIT_ORDER.filter(k => E.parts[k]).map(k => [k, E.parts[k]]))
      : `<p class="not-built">${fmt(L.notBuilt)}</p><button type="button" class="pill-btn pill-all next-btn" data-exhibit="water">${fmt(L.tryReady)} <span aria-hidden="true">&rarr;</span></button>`) + `</section>`;
  }

  const lodge = place({ cls: "is-lodge", id: "lodge", iconId: "i-lodge", eyebrow: L.eyebrow, title: L.title, sub: L.sub, line: f(L.line),
    board: `<p>${fmt(L.welcome)}</p>
      <h3 class="board-h">${TITLES.pickExhibit}</h3>
      <ul class="options exhibits">${opts}</ul>${open}` });

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
  const guide = `<li class="stop is-guide" id="guide"><span class="marker" aria-hidden="true">${icon("i-guide")}</span>
    <div class="guide-card">
      <div class="guide-cover"><div><p class="place-eyebrow">${fmt(G.eyebrow)}</p><p class="place-title">${fmt(G.title)}</p>
        <p class="guide-sub">${fmt(G.sub)}</p>
        <p class="guide-for"><span class="blaze" style="background:var(--${c.key.toLowerCase()}-color)" aria-hidden="true"></span>The ${c.key} Trail <span aria-hidden="true">·</span> Exhibit ${letterOf(tp.key)}: ${fmt(tp.name)}</p>
        <p class="place-line">${fmt(f(G.line))}</p></div>${icon("i-guide", "place-icon")}</div>
      <div class="guide-body"><p>${fmt(G.intro)}</p>
        ${panel(GUIDE_ORDER.filter(k => guideParts[k]).map(k => [k, { ...guideParts[k], ahead: A[k] }]))}
        <p class="print-row"><button type="button" class="pill-btn pill-all next-btn" data-go="printGuide">${fmt(G.print)}</button> <span class="reach">${fmt(G.printHelp)}</span></p>
      </div></div></li>`;

  /* The Bulletin Board: the end of the trail and the place to choose. */
  const J = shared.bulletin;
  const farewell = (t.farewell || []).map(p => `<p>${fmt(p.replace("{topic}", tp.name.toLowerCase()))}</p>`).join("");
  const way = (go, w, ic, back, extraAttr = "") => `<li><button type="button" class="way ${back ? "back" : "on"}" data-go="${go}"${extraAttr}>
      <span class="dir">${back ? "&uarr;" : "&rarr;"} ${fmt(f(w.dir))}</span>${icon(ic)}<b>${w.label}</b><span>${fmt(f(w.hint))}</span></button></li>`;
  const bulletin = place({ cls: "is-board", id: "bulletin", iconId: "i-board", eyebrow: J.eyebrow, title: J.title, sub: J.sub,
    board: `<p>${fmt(J.lede)}</p>
      <div class="recap"><p>${fmt(f(J.recap))}</p></div>
      ${E.finder ? panel([["nearby", { ...E.finder, ahead: null }]]) : ""}
      <h3 class="board-h">${TITLES.next}</h3>
      <ul class="ways">
        ${way("lodge", J.exhibit, "i-lodge", true)}
        ${way("trailhead", J.trail, "i-trail", true)}
        ${way("keep", J.keep, "i-guide", false, ' aria-expanded="false" aria-controls="keep"')}
      </ul>
      <div class="keep" id="keep" hidden>${farewell}${savePanel("saveEnd")}
        <p class="print-row"><button type="button" class="pill-btn pill-all next-btn" data-go="printGuide">${fmt(G.print)}</button> <span class="reach">${fmt(G.printHelp)}</span></p></div>` });

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
  if (b.dataset.trail) { st.trail = b.dataset.trail; render(); go($("trailBox")); return; }
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
  if (to === "copy") {
    const input = $(b.dataset.for); input.select();
    const done = () => { b.textContent = shared.save.copied; setTimeout(() => { b.textContent = shared.save.copy; }, 2000); };
    const fallback = () => { try { document.execCommand("copy"); done(); } catch (err) { /* the link stays selected to copy by hand */ } };
    if (navigator.clipboard) navigator.clipboard.writeText(input.value).then(done, fallback); else fallback();
  }
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
if (k) go(st.exhibit && trails[st.trail] ? $("exhibitOpen") : $("trailBox"));

/* Printing the page opens every stop, so the printout carries it all. */
window.addEventListener("beforeprint", () => document.querySelectorAll("details").forEach(d => { d.open = true; }));
