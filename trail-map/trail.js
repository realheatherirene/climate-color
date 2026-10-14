/* ==========================================================================
   CLIMATE TRAIL MAP: the renderer
   ==========================================================================
   Reads a content pack and draws the page. All words live in data/; all
   stop titles live in titles.js; colors and action words come from
   core/climate-color.js. This file holds only behavior.

   Flow: trailhead board -> 1 pick your trail -> 2-5 trail stops -> 6 pick
   your lodge -> 7 the lodge, with exhibits A-E inside -> 8 the Ranger
   Station. Everything is on one page. A trail and lodge can be linked
   directly: #green or #green-water.
   ========================================================================== */

import { COLORS, COLOR_KEYS, getColor } from "../core/climate-color.js";
import { TITLES, TRAIL_ORDER, LODGE_ORDER } from "./titles.js";
import { renderStop, renderBlocks, fmt, icon } from "./exhibits.js";

const pack = await import("./data/adult/index.js");
const { trailhead, shared, topics, trails, lodges } = pack;

const $ = id => document.getElementById(id);
const st = { trail: null, lodge: null };
let uid = 0;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const topicOf = key => topics.topics.find(t => t.key === key);

/* ---------- Notes at rest stops: this device only ---------- */
/* Stored with the browser's own storage under one key per trail, lodge,
   and stop. Never sent anywhere. Every read and write is guarded, because
   some browsers and private windows block storage. */
const NOTE_PREFIX = "climate-trail-map:notes:";
const store = {
  get(k) { try { return localStorage.getItem(NOTE_PREFIX + k) || ""; } catch (e) { return null; } },
  set(k, v) { try { v ? localStorage.setItem(NOTE_PREFIX + k, v) : localStorage.removeItem(NOTE_PREFIX + k); return true; } catch (e) { return false; } }
};
const noteKey = key => [st.trail, ["fit"].includes(key) ? "" : st.lodge, key].filter(Boolean).join(":").toLowerCase();
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
  notes: notesBox
};

/* ---------- Static parts: header, trailhead board, stop 1 ---------- */

document.title = trailhead.title;
$("title").textContent = trailhead.title;
$("lede").textContent = trailhead.lede;
$("todo").innerHTML = `<p class="sub">${fmt(trailhead.todoTitle)}</p><ol>${trailhead.todo.map(t => `<li>${fmt(t)}</li>`).join("")}</ol>`;
$("note").textContent = trailhead.note;
$("footnote").textContent = trailhead.footnote;

const B = trailhead.board;
$("board").innerHTML = `<h2 id="boardTitle">${TITLES.how}</h2>
  ${renderBlocks(B.blocks, ctx)}
  <p class="open-all">${fmt(B.open)}</p>
  <details class="mini"><summary>${fmt(B.storyLabel)}</summary><div class="story">${renderBlocks(B.story, ctx)}</div></details>
  <p class="start-small">${fmt(B.start)} <span aria-hidden="true">&darr;</span></p>`;

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

/* "Need a break?" The link carries the trail and lodge in its #hash, and
   nothing else: no account, nothing saved online. */
function savePanel(id) {
  const S = shared.save;
  return `<div class="save"><p class="sub">${fmt(S.title)}</p><p>${fmt(S.text)}</p>
    <div class="save-row"><input type="text" readonly class="save-link" id="${id}" aria-label="Link to your trail" value="">
    <button type="button" class="pill-btn pill-all next-btn" data-go="copy" data-for="${id}">${fmt(S.copy)}</button></div></div>`;
}
const fill = (txt, c, L, extra = {}) => txt.replace(/\{trail\}/g, c.key).replace(/\{action\}/g, c.action)
  .replace(/\{meaning\}/g, trailhead.ways[c.key]).replace(/\{lodge\}/g, L ? L.name : "")
  .replace(/\{lower\}/g, L ? L.name.toLowerCase() : "")
  .replace(/\{about\}/g, L ? L.about : "").replace(/\{lodgeStop\}/g, extra.lodgeStop || "");

/* The lodge picker: the same shape as the trail picker, so the two
   choices look and work alike. */
function renderLodgePick(n) {
  const opts = topics.topics.map(tp => `<li><button type="button" class="opt" data-lodge="${tp.key}" aria-pressed="${st.lodge === tp.key}">
    <span class="opt-icon" aria-hidden="true">${icon(tp.icon)}</span>
    <span><span class="oname">${fmt(tp.name)}</span><span class="odesc">${fmt(cap(tp.about))}.</span></span></button></li>`).join("");
  return `<li class="stop picker" id="pickLodge" data-stop="pickLodge">
    <span class="marker" aria-hidden="true">${n}</span>
    <div class="pick-body"><h3>${TITLES.pickLodge}</h3>
      <p class="step-hint">${fmt(topics.hint)}</p>
      <ul class="options lodges">${opts}</ul>
      <div id="lodgeBox" aria-live="polite"></div></div></li>`;
}

/* ---------- Dynamic parts ---------- */

function renderTrail() {
  document.querySelectorAll("[data-trail].opt").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.trail === st.trail)));
  const box = $("trailBox"), stops = $("trailStops");
  if (!st.trail) { box.innerHTML = ""; stops.innerHTML = ""; return; }
  const c = getColor(st.trail), t = trails[st.trail];
  box.innerHTML = `<div class="here"><p><b>Your trail</b></p><p class="route-name">The ${c.key} Trail</p>
    <p>You help by <b>${c.action}</b>: ${fmt(trailhead.ways[c.key])}.</p>
    ${t ? `<details class="mini"><summary>Need a break? Save your spot</summary>${savePanel("saveTop")}</details>` : ""}</div>` +
    (t ? "" : `<p class="not-built">${fmt(trailhead.notBuilt)}</p><button type="button" class="pill-btn pill-all next-btn" data-trail="Green">Try the Green Trail <span aria-hidden="true">&rarr;</span></button>`);
  if (!t) { stops.innerHTML = ""; return; }

  let n = 2;
  const stopFor = key => key === "care" ? shared.care : t[key];
  stops.innerHTML = TRAIL_ORDER.filter(stopFor).map(key =>
    renderStop({ n: n++, key, title: TITLES[key], stop: stopFor(key), ctx })).join("") +
    renderLodgePick(n);
}

function lodgeStopNumber() { const el = document.querySelector("#pickLodge .marker"); return el ? Number(el.textContent) : 0; }

function renderLodge() {
  document.querySelectorAll("[data-lodge].opt").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lodge === st.lodge)));
  const box = $("lodgeBox"), line = $("lodgeLine");
  const t = trails[st.trail], L = lodges[st.lodge], tp = topicOf(st.lodge), LB = shared.lodgeBoard;
  /* A built lodge introduces itself at stop 7, so the box here is only for
     a lodge that isn't built yet. */
  if (box) box.innerHTML = !t || !tp || L ? "" : `<div class="here"><p><b>Your lodge</b></p><p class="route-name">${icon(tp.icon, "here-icon")}${fmt(tp.name)} Lodge</p>
    <p>You care about <b>${fmt(tp.name.toLowerCase())}</b>: ${fmt(tp.about)}.</p></div>` + ( `<p>${fmt(tp.teaser)}</p><p class="cite">Source: <a class="ext" href="${tp.src.url}" target="_blank" rel="noopener">${fmt(tp.src.title)}${icon("i-ext")}</a></p>
      <p class="not-built">${fmt(topics.notBuilt)}</p><button type="button" class="pill-btn pill-all next-btn" data-lodge="water">Try the Water Lodge <span aria-hidden="true">&rarr;</span></button>`);
  if (!t || !L) { line.innerHTML = ""; return; }
  const c = getColor(st.trail), mine = L.byTrail[c.key] || {};

  /* Exhibits: shared ones from the lodge, the trail's own slot, and the
     shared questions that every lodge's last rest stop starts with. */
  const build = key => {
    if (key === "role") return mine.role;
    if (key === "local") {
      const s = L.stops.local; if (!s) return null;
      const extra = (mine.questions && mine.questions.local) || [];
      return { ...s, blocks: s.blocks.map(b => b.questions ? { ...b, questions: [...b.questions, ...extra] } : b) };
    }
    if (key === "first") {
      const own = L.stops.first || {};
      return { exhibit: "rest", ahead: shared.first.ahead, blocks: [
        { sub: shared.first.title },
        { questions: [...shared.first.questions, ...(own.questions || [])] },
        { questions: [...shared.first.friend, ...(own.friend || [])], title: "With a friend" }
      ] };
    }
    return L.stops[key];
  };
  const built = LODGE_ORDER.map(k => [k, build(k)]).filter(([, s]) => s);
  const lodgeN = lodgeStopNumber() + 1, stationN = lodgeN + 1;
  const x = { lodgeStop: String(lodgeStopNumber()) };
  const lf = txt => fill(txt, c, L, x);
  const letters = "ABCDEFGHIJ";
  const rooms = built.map(([key, s], i) => renderStop({ n: letters.charAt(i), key, title: TITLES[key], stop: s, line: "room", ctx,
    aheadLabel: i < built.length - 1 ? "Next exhibit" : "Next stop" })).join("");

  /* Stop 7: the lodge, one place on the trail, with its exhibits inside. */
  const lodgeStop = `<li class="stop place is-lodge" id="lodgeStop"><span class="marker" aria-hidden="true">${lodgeN}</span>
    <div class="place-sign"><div class="band" aria-hidden="true"></div>
      <div class="text"><p class="place-eyebrow">You've arrived</p><p class="place-title">${fmt(L.name)} Lodge</p>
      <p class="place-sub">${fmt(cap(L.about))}</p>
      <p class="place-line">You care about ${fmt(L.name.toLowerCase())}, and you help by ${c.action}.</p></div>
      ${icon(L.icon, "place-icon")}</div>
    <div class="place-board">
      <p>${fmt(lf(LB.welcome))}</p>
      <p class="sub">${fmt(lf(LB.why))}</p>
      <p>${fmt(tp.teaser)}</p>
      <p class="cite">Source: <a class="ext" href="${tp.src.url}" target="_blank" rel="noopener">${fmt(tp.src.title)}${icon("i-ext")}</a></p>
      <p class="sub">${fmt(LB.inside)}</p>
      <p class="inside-hint">${fmt(LB.insideHint)}</p>
      <ul class="rooms">${rooms}</ul>
      <p class="leave">${fmt(lf(LB.leave))}</p>
    </div></li>`;

  /* Stop 8: the Ranger Station, the end of the trail and the place to choose. */
  const J = shared.junction, S = shared.save;
  const farewell = (t.farewell || []).map(p => `<p>${fmt(p.replace("{topic}", L.name.toLowerCase()))}</p>`).join("");
  const way = (go, w, ic, back, extraAttr = "") => `<li><button type="button" class="way ${back ? "back" : "on"}" data-go="${go}"${extraAttr}>
      <span class="dir">${back ? "&uarr;" : "&rarr;"} ${fmt(lf(w.dir))}</span>${icon(ic)}<b>${w.label}</b><span>${fmt(lf(w.hint))}</span></button></li>`;
  const station = `<li class="stop place is-station" id="station"><span class="marker" aria-hidden="true">${stationN}</span>
    <div class="place-sign"><div class="text"><p class="place-eyebrow">${fmt(J.eyebrow)}</p><p class="place-title">${fmt(J.title)}</p>
      <p class="place-sub">${fmt(J.sub)}</p></div>${icon("i-station", "place-icon")}</div>
    <div class="place-board">
      <p>${fmt(J.lede)}</p>
      <div class="recap">${J.recap.map(r => `<p>${fmt(lf(r))}</p>`).join("")}</div>
      <h3 class="choose">${icon("i-junction", "jicon")}${TITLES.junction}</h3>
      <svg class="fork" viewBox="0 0 720 96" aria-hidden="true" focusable="false">
        <defs><marker id="fork-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#4A3422"/></marker></defs>
        <path d="M360 0V34" style="fill:none;stroke:#4A3422;stroke-width:5;stroke-dasharray:0.1 9;stroke-linecap:round"/>
        <circle cx="360" cy="40" r="9" style="fill:#fff;stroke:#4A3422;stroke-width:4"/>
        <path d="M352 46C300 70 150 60 120 90" marker-end="url(#fork-arrow)" style="fill:none;stroke:#4A3422;stroke-width:4;stroke-dasharray:0.1 9;stroke-linecap:round"/>
        <path d="M360 50V90" marker-end="url(#fork-arrow)" style="fill:none;stroke:#4A3422;stroke-width:4;stroke-dasharray:0.1 9;stroke-linecap:round"/>
        <path d="M368 46C420 70 570 60 600 90" marker-end="url(#fork-arrow)" style="fill:none;stroke:#4A3422;stroke-width:4;stroke-dasharray:0.1 9;stroke-linecap:round"/>
      </svg>
      <ul class="ways">
        ${way("lodge", J.lodge, "i-pin", true)}
        ${way("pick", J.trail, "i-trail", true)}
        ${way("keep", J.keep, "i-tip", false, ' aria-expanded="false" aria-controls="keep"')}
      </ul>
      <div class="keep" id="keep" hidden>${farewell}${savePanel("saveEnd")}
        <p><button type="button" class="pill-btn pill-all next-btn" data-go="print">${fmt(S.print)}</button> <span class="reach">${fmt(S.printHelp)}</span></p></div>
    </div></li>`;

  line.innerHTML = lodgeStop + station;
}

function render(trailChanged = true) {
  if (trailChanged) renderTrail();
  renderLodge();
  /* A picker's number fills in once a choice is made there. */
  $("pick").classList.toggle("is-open", !!st.trail);
  const lp = $("pickLodge"); if (lp) lp.classList.toggle("is-open", !!st.lodge);
  const hash = st.trail ? "#" + st.trail.toLowerCase() + (st.lodge && trails[st.trail] ? "-" + st.lodge : "") : " ";
  history.replaceState(null, "", hash.trim() || location.pathname);
  document.querySelectorAll(".save-link").forEach(i => { i.value = location.href; });
}

/* ---------- Events (one listener each, so re-rendered parts just work) ---------- */

const go = el => el && el.scrollIntoView({ behavior: "smooth", block: "start" });

document.addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.dataset.trail) { st.trail = b.dataset.trail; render(); go($("trailBox")); return; }
  if (b.dataset.lodge) { st.lodge = b.dataset.lodge; render(false); go(lodges[st.lodge] ? $("lodgeStop") : $("lodgeBox")); return; }
  if (b.classList.contains("find-btn")) {
    const r = $(b.getAttribute("aria-controls")); r.hidden = !r.hidden;
    b.setAttribute("aria-expanded", String(!r.hidden)); return;
  }
  const to = b.dataset.go;
  if (to === "lodge") go($("pickLodge"));
  if (to === "lodgeStop") go($("lodgeStop"));
  if (to === "pick") go($("pick"));
  if (to === "keep") { const k = $("keep"); k.hidden = !k.hidden; b.setAttribute("aria-expanded", String(!k.hidden)); }
  if (to === "print") { try { window.print(); } catch (err) { /* blocked in some previews */ } }
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

/* A stop's number (or an exhibit's letter) fills in only while it's open. */
document.addEventListener("toggle", e => {
  if (e.target.tagName === "DETAILS" && e.target.parentNode.classList.contains("stop")) e.target.parentNode.classList.toggle("is-open", e.target.open);
}, true);

/* Direct links: #green or #green-water. */
const [hTrail, hLodge] = location.hash.slice(1).split("-");
const k = COLORS.find(c => c.key.toLowerCase() === (hTrail || "").toLowerCase());
if (k) { st.trail = k.key; if (topicOf(hLodge)) st.lodge = hLodge; }
render();
if (k) go(st.lodge && lodges[st.lodge] ? $("lodgeStop") : $("trailBox"));

/* Printing opens every stop, so the printout carries the whole trail. */
window.addEventListener("beforeprint", () => document.querySelectorAll("details").forEach(d => { d.open = true; }));
