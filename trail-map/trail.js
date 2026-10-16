/* ==========================================================================
   THE TRAIL MAP: the renderer
   ==========================================================================
   Reads a content pack and draws the page. All words live in data/; all
   titles live in titles.js; colors and action words come from
   core/climate-color.js. This file holds only behavior.

   Flow: the Trailhead (get your bearings, pick your trail) -> stops 1-4
   along the trail -> the Lodge (pick an exhibit) -> the Field Guide
   -> the Bulletin Board. Everything is on one page. A trail and exhibit
   can be linked directly: ?spot=green-water (the form the site's links
   use, passed in by tools/squarespace-embed-links.html), or #green-water.
   ========================================================================== */

import { COLORS, COLOR_KEYS, getColor, cssVar, SITE } from "../core/climate-color.js";
import { TITLES, TRAIL_ORDER, EXHIBIT_ORDER, GUIDE_ORDER } from "./titles.js";
import { renderStop, renderBlocks, fmt, icon, setArchivedLabel } from "./exhibits.js";

const pack = await import("./data/adult/index.js");
const { trailhead, shared, topics, trails, exhibits } = pack;
setArchivedLabel(shared.sources.archived);

const $ = id => document.getElementById(id);
const st = { trail: null, exhibit: null };
let uid = 0;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const topicOf = key => topics.topics.find(t => t.key === key);
/* How every topic is named, from one setting: "Water Exhibit." */
const exhibitName = tp => shared.lodge.exhibitName.replace("{exhibit}", tp.name);

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
  notes: notesBox,
  route: () => `<ol class="route" id="route"></ol>`,
  map: () => `<div class="park-map" id="parkMap" aria-hidden="true"></div>`
};

/* Fills {trail}, {action}, {meaning}, {words}, {exhibit}, {exhibitName},
   {lower}, and {about} in shared wording. */
const fill = (txt, c, tp) => txt.replace(/\{trail\}/g, c.key).replace(/\{action\}/g, c.action)
  .replace(/\{meaning\}/g, trailhead.ways[c.key])
  .replace(/\{words\}/g, c.words.map(w => w.word).join(", ").replace(/, ([^,]*)$/, ", or $1"))
  .replace(/\{exhibitName\}/g, tp ? exhibitName(tp) : "")
  .replace(/\{exhibit\}/g, tp ? tp.name : "").replace(/\{lower\}/g, tp ? tp.name.toLowerCase() : "")
  .replace(/\{about\}/g, tp ? tp.about : "");

/* ---------- What's built: one source for every "for now" line ---------- */
/* Lists the trails and exhibits that exist in the content pack, so
   adding a trail or exhibit file updates every "still being built" note
   and the test note on its own. */
const listOf = n => n.length < 3 ? n.join(" and ") : `${n.slice(0, -1).join(", ")}, and ${n[n.length - 1]}`;
const builtTrails = COLOR_KEYS.filter(k => trails[k]);
const builtExhibits = topics.topics.filter(t => exhibits[t.key]);
const trailsReady = "the " + (builtTrails.length === 1 ? `${builtTrails[0]} Trail` : `${listOf(builtTrails)} Trails`);
const exhibitsReady = builtExhibits.length === 1 ? "the " + exhibitName(builtExhibits[0])
  : `the ${listOf(builtExhibits.map(t => t.name))} Exhibits`;
const isAre = n => n === 1 ? "is" : "are";
const readyLine = (txt, ready, n) => txt.replace("{ready}", ready).replace("{verb}", isAre(n));

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

/* ---------- The park map and its key: getting your bearings ---------- */
/* A small park-style map at the Trailhead, drawn the way a state park
   map is: woods, a lake, a north arrow, and one trail from the Trailhead
   past the four stops to the Lodge and the Bulletin Board, with the
   Field Guide beside the trail's end. The places are made up: it shows
   the journey, not real ground. It is a picture only (screen readers
   skip it); the route strip under it is its key, says the same in words,
   marks where you are (aria-current), and takes you to each place.
   Two drawings: wide for computers, tall for phones (trail.css shows
   one). Each lays out the places in shared.places by key and the stops
   in TRAIL_ORDER, so names, icons, and order come from the data. The
   spots are laid out for four stops. */
const MAPS = {
  wide: {
    w: 760, h: 380,
    at: { trailhead: [60, 320], lodge: [400, 110], bulletin: [600, 196], guide: [700, 290] },
    stops: [[150, 270], [250, 300], [330, 220], [250, 150]],
    /* where each place's name sits: [dx, dy, text-anchor] */
    label: { trailhead: [0, 38, "middle"], lodge: [0, 38, "middle"], bulletin: [0, 36, "middle"], guide: [0, 38, "middle"] },
    path: {
      start: "M60,320 C95,300 120,290 150,270",
      trail: "M150,270 C190,245 215,305 250,300 C290,295 300,250 330,220 C355,195 300,160 250,150 C290,140 340,95 400,110",
      after: "M400,110 C470,125 540,205 600,196"
    },
    lake: "M520,40 C560,18 662,24 692,54 C716,80 682,112 630,106 C588,101 540,96 524,76 C514,63 511,48 520,40 Z", lakeAt: [606, 70],
    trees: [[78, 96], [100, 110], [58, 122], [88, 140], [122, 88], [380, 250], [404, 268], [428, 246], [452, 276], [410, 300],
      [300, 40], [324, 54], [276, 58], [560, 300], [584, 318], [536, 320]],
    north: [40, 40]
  },
  tall: {
    w: 340, h: 532,
    at: { trailhead: [60, 70], lodge: [170, 360], bulletin: [250, 450], guide: [120, 500] },
    stops: [[150, 135], [250, 180], [200, 250], [90, 290]],
    label: { trailhead: [26, 5, "start"], lodge: [26, -6, "start"], bulletin: [0, 38, "middle"], guide: [-26, 5, "end"] },
    path: {
      start: "M60,70 C95,100 120,125 150,135",
      trail: "M150,135 C190,148 240,155 250,180 C262,210 225,230 200,250 C170,273 110,265 90,290 C75,315 120,350 170,360",
      after: "M170,360 C220,370 255,410 250,450"
    },
    lake: "M22,392 C40,370 98,374 116,396 C132,416 120,452 86,458 C56,463 26,450 20,428 C16,414 14,402 22,392 Z", lakeAt: [68, 424],
    trees: [[240, 74], [262, 90], [226, 98], [20, 190], [42, 208], [18, 230], [282, 290], [304, 308], [276, 330], [290, 500], [314, 516]],
    north: [312, 40]
  }
};

/* Where the reader is, and which stops they've opened. "You are here"
   moves to the last stop or place opened; it never slides. */
const here = { at: "trailhead", seen: new Set() };

function drawMap(M) {
  const W = shared.map, picked = !!trails[st.trail];
  const kindOf = key => key === "care" ? shared.care : (trails[st.trail] || Object.values(trails)[0])[key];
  const stopKeys = TRAIL_ORDER.filter(kindOf).slice(0, M.stops.length);
  const pos = key => M.at[key] || M.stops[stopKeys.indexOf(key)];
  const line = (d, color, dashed) => `<path d="${d}" fill="none" style="stroke:${color}" stroke-width="${dashed ? 5 : 6}" stroke-linecap="round"${dashed ? ' stroke-dasharray="2 11"' : ""}/>`;
  const trail = picked
    ? line(M.path.start, "var(--park)") + line(M.path.trail, "var(--trail)") + line(M.path.after, "var(--lodge)")
    : line(`${M.path.start} ${M.path.trail.replace(/^M[\d.,]+/, "")} ${M.path.after.replace(/^M[\d.,]+/, "")}`, "#64748B", true);
  const stops = stopKeys.map((key, i) => {
    const [x, y] = M.stops[i], seen = picked && here.seen.has(key);
    const stroke = picked ? "var(--trail)" : "#64748B";
    const fillC = seen ? "var(--trail)" : "#fff", textC = seen ? "var(--trail-on)" : (picked ? "var(--trail-text)" : "#475569");
    const shape = kindOf(key).exhibit === "rest"
      ? `<circle cx="${x}" cy="${y}" r="15" style="fill:${fillC};stroke:${stroke}" stroke-width="4"/>`
      : `<rect x="${x - 13}" y="${y - 15}" width="26" height="30" rx="4" style="fill:${fillC};stroke:${stroke}" stroke-width="4"/>`;
    return `${shape}<text x="${x}" y="${y + 5}" class="map-num" text-anchor="middle" style="fill:${textC}">${i + 1}</text>`;
  }).join("");
  const places = Object.entries(P).filter(([key]) => M.at[key]).map(([key, pl]) => {
    const [x, y] = M.at[key], [dx, dy, anchor] = M.label[key];
    const box = pl.offTrail
      ? `<rect x="${x - 17}" y="${y - 17}" width="34" height="34" rx="7" style="fill:var(--note-tint);stroke:var(--note)" stroke-width="2" stroke-dasharray="4 3"/>`
      : `<rect x="${x - 17}" y="${y - 17}" width="34" height="34" rx="7" style="fill:var(--map-${key})"/>`;
    return `${box}<use href="#${pl.icon}" x="${x - 11}" y="${y - 11}" width="22" height="22" style="color:${pl.offTrail ? "var(--note)" : "#fff"}"/>
      <text x="${x + dx}" y="${y + dy}" class="map-name" text-anchor="${anchor}">${fmt(pl.name)}</text>`;
  }).join("");
  /* "You are here": a tag just above the spot you're at, pointing down
     at it, kept inside the map. */
  const [px, py] = pos(here.at) || M.at.trailhead, tip = py - 18;
  const bx = Math.min(Math.max(px - 52, 4), M.w - 108);
  const pin = `<path d="M${px - 7},${tip - 8} L${px + 7},${tip - 8} L${px},${tip} Z" style="fill:var(--text-primary)"/>
    <rect x="${bx}" y="${tip - 34}" width="104" height="26" rx="13" style="fill:var(--text-primary)"/>
    <text x="${bx + 52}" y="${tip - 16}" class="map-here" text-anchor="middle">${fmt(W.here)}</text>`;
  const [nx, ny] = M.north;
  return `<svg class="map-${M === MAPS.wide ? "wide" : "tall"}" viewBox="0 0 ${M.w} ${M.h}" focusable="false">
    <path d="${M.lake}" class="map-lake"/><text x="${M.lakeAt[0]}" y="${M.lakeAt[1]}" class="map-lake-name" text-anchor="middle">${fmt(W.lake)}</text>
    ${M.trees.map(([x, y]) => `<use href="#i-tree" x="${x}" y="${y}" width="20" height="22"/>`).join("")}
    ${trail}${stops}${places}${pin}
    <circle cx="${nx}" cy="${ny}" r="18" class="map-north"/><path d="M${nx},${ny - 13} L${nx + 6},${ny + 5} L${nx},${ny + 1} L${nx - 6},${ny + 5} Z" style="fill:var(--text-secondary)"/>
    <text x="${nx}" y="${ny + 34}" class="map-n" text-anchor="middle">${fmt(W.north)}</text></svg>`;
}

/* The route strip: the map's key. Each place is a button that takes you
   there; the place you're at says so for screen readers. */
const placeOf = at => P[at] ? at : "trail";
function routeStrip() {
  const now = placeOf(here.at);
  return Object.entries(P).map(([key, pl]) =>
    `<li class="route-${key}"><button type="button" class="route-btn" data-go="place-${key}"${key === now ? ' aria-current="location"' : ""}>
      <span class="route-icon" aria-hidden="true">${icon(pl.icon)}</span><span><b class="route-name">${fmt(pl.name)}</b><span class="route-text">${fmt(pl.route)}</span></span></button></li>`).join("");
}

function drawBearings() {
  const map = $("parkMap"), route = $("route");
  if (map) map.innerHTML = drawMap(MAPS.wide) + drawMap(MAPS.tall);
  if (route) route.innerHTML = routeStrip();
}

/* Where each key button goes. A place that isn't on the page yet (no
   trail picked) sends you to the trail picker. */
const placeTarget = key => ({ trailhead: $("trailhead"), trail: $("trailStops") && $("trailStops").children.length ? $("trailStops") : null,
  lodge: $("lodge"), bulletin: $("bulletin"), guide: $("guide") }[key]) || $("pick");

$("todo").innerHTML = `<p class="sub">${fmt(trailhead.todoTitle)}</p>${trailhead.intro.map(t => `<p>${fmt(t)}</p>`).join("")}`;

/* The pace note, with a way to save your spot from the very top. */
const S0 = shared.save;
$("note").innerHTML = `<p>${fmt(trailhead.note)} ${fmt(S0.pace)}</p>
  <p><button type="button" class="pill-btn pill-all next-btn" data-go="copySpot">${fmt(S0.paceButton)}</button></p>`;
$("footnote").textContent = trailhead.footnote;
/* The test note shows only while something is still being built. */
const allBuilt = builtTrails.length === COLOR_KEYS.length && builtExhibits.length === topics.topics.length;
$("testNote").hidden = allBuilt;
if (!allBuilt) $("testNote").textContent = trailhead.testNote.replace("{trails}", trailsReady).replace("{exhibits}", exhibitsReady);

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

/* "Save your spot." The link is the site's own Trail Map page with the
   trail and exhibit in ?spot=, and nothing else: no account, nothing
   saved online. The page sits inside a Squarespace frame, so its own
   address wouldn't bring a reader back to climatecolor.com. */
const spot = () => st.trail ? st.trail.toLowerCase() + (st.exhibit && trails[st.trail] ? "-" + st.exhibit : "") : "";
const spotUrl = () => spot() ? `${SITE.trailMap}?spot=${spot()}` : SITE.trailMap;

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
  box.innerHTML = t ? "" : `<p class="not-built">${fmt(readyLine(trailhead.notBuilt, trailsReady, builtTrails.length))}</p>` +
    builtTrails.map(k => `<button type="button" class="pill-btn pill-all next-btn" data-trail="${k}">${fmt(trailhead.tryReady.replace("{name}", k))} <span aria-hidden="true">&rarr;</span></button>`).join(" ");
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

  /* The exhibit picker, in the same row style as the
     trail picker. */
  const opts = topics.topics.map(x => `<li><button type="button" class="opt" data-exhibit="${x.key}" aria-pressed="${st.exhibit === x.key}">
    <span class="opt-icon" aria-hidden="true">${icon(x.icon)}</span>
    <span><span class="oname">${fmt(exhibitName(x))}</span><span class="odesc">${fmt(cap(x.about))}.</span></span></button></li>`).join("");

  /* The open exhibit: a room in the Lodge, with its own sign (its name
     and what it covers), a one-line promise, then its parts. An exhibit
     that isn't built yet shows its teaser only. */
  let open = "";
  if (tp) {
    const roomSign = `<div class="room-sign"><div class="text"><p class="room-title">${fmt(exhibitName(tp))}</p>
      <p class="place-sub">${fmt(cap(tp.about))}</p></div>${icon(tp.icon, "place-icon")}</div>`;
    open = `<section class="exhibit-open" id="exhibitOpen" aria-label="${fmt(exhibitName(tp))}">${roomSign}` + (E
      ? `<div class="room-body"><p class="promise">${fmt(E.promise)}</p>${panel(EXHIBIT_ORDER.filter(k => E.parts[k]).map(k => [k, E.parts[k]]))}</div>`
      : `<div class="room-body">${renderBlocks([{ teaser: true }], ctx)}<p class="not-built">${fmt(readyLine(L.notBuilt, exhibitsReady, builtExhibits.length))}</p>${builtExhibits.map(x => `<button type="button" class="pill-btn pill-all next-btn" data-exhibit="${x.key}">${fmt(L.tryReady.replace("{name}", exhibitName(x)))} <span aria-hidden="true">&rarr;</span></button>`).join(" ")}</div>`) + `</section>`;
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
    nearby: E.finder,
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
  /* Its cover names the reader's trail and exhibit, each on its own line,
     with one line on how to use it and Print right there. Its parts
     follow, and Print comes again at the end. */
  /* The booklet you take with you: after the Bulletin Board, off the
     trail line. */
  const guide = `<li class="stop is-guide off-trail" id="guide">
    <div class="guide-card">
      <div class="guide-cover"><div><p class="place-eyebrow">${fmt(PG.eyebrow)}</p><p class="place-title">${fmt(PG.title)}</p>
        <p class="guide-for"><span class="blaze" style="background:var(--${c.key.toLowerCase()}-color)" aria-hidden="true"></span>The ${c.key} Trail</p>
        <p class="guide-for">${icon(tp.icon, "guide-ex-icon")}${fmt(exhibitName(tp))}</p>
        <p class="guide-use">${fmt(G.cover)}</p>${printRow}</div>${icon(PG.icon, "place-icon")}</div>
      <div class="guide-body">
        ${panel(GUIDE_ORDER.filter(k => guideParts[k]).map(k => [k, { ...guideParts[k], ahead: A[k], line: G.lines[k] || guideParts[k].line }]))}
        ${printRow}
      </div></div></li>`;

  /* The Bulletin Board: the end of the trail and the place to choose. */
  const J = shared.bulletin;
  const farewell = (t.farewell || []).map(p => `<p>${fmt(p.replace("{topic}", tp.name.toLowerCase()))}</p>`).join("");
  const way = (go, w, ic, back, extraAttr = "") => `<li><button type="button" class="way ${back ? "back" : "on"}" data-go="${go}"${extraAttr}>
      <span class="dir">${back ? "&uarr;" : "&rarr;"} ${fmt(f(w.dir))}</span>${icon(ic)}<b>${w.label}</b><span>${fmt(f(w.hint))}</span></button></li>`;
  const bulletin = place("bulletin", "is-board", `<p>${fmt(J.lede)}</p>
      <div class="recap"><p class="recap-title">${fmt(J.recapTitle)}</p><p>${fmt(f(J.recap))}</p></div>
      <h3 class="board-h">${TITLES.next}</h3>
      <ul class="ways">
        ${way("lodge", J.exhibit, P.lodge.icon, true)}
        ${way("trailhead", J.trail, P.trail.icon, true)}
        ${way("keep", J.keep, P.guide.icon, false, ' aria-expanded="false" aria-controls="keep"')}
      </ul>
      <div class="keep" id="keep" hidden>${farewell}${savePanel("saveEnd")}${printRow}</div>`);

  line.innerHTML = lodge + bulletin + guide;
}

/* The trail line, markers, and "your trail" touches take the picked
   trail's color, from the shared tokens in core/atlas.css. Text on that
   color follows the Wheel's own rule (each color's `label`), so Yellow
   and Orange get dark numbers. With no trail picked, trail.css's green
   defaults apply. */
const TEXT_ON = { black: "var(--text-primary)", white: "#fff" };
function paintTrail() {
  const root = document.documentElement.style;
  const props = { "--trail": "color", "--trail-text": "text", "--trail-tint": "tint-1" };
  if (!st.trail) { [...Object.keys(props), "--trail-on"].forEach(p => root.removeProperty(p)); return; }
  Object.entries(props).forEach(([p, kind]) => root.setProperty(p, `var(${cssVar(st.trail, kind)})`));
  root.setProperty("--trail-on", TEXT_ON[getColor(st.trail).label] || "#fff");
}

function render(trailChanged = true) {
  paintTrail();
  if (trailChanged) renderTrail();
  renderLodge();
  drawBearings();
  /* The frame's own address keeps the spot too, as #green-water. */
  history.replaceState(null, "", spot() ? "#" + spot() : location.pathname);
  document.querySelectorAll(".save-link").forEach(i => { i.value = spotUrl(); });
}

/* Moves "You are here" and redraws only the map and its key. */
function moveHere(at) { here.at = at; drawBearings(); }

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
    st.trail = b.dataset.trail; here.at = "trailhead"; here.seen.clear(); render();
    /* Bring stop 1 (or the "still being built" note) into view, keeping
       the picked row in sight where the screen allows. */
    const next = trails[st.trail] ? $("trailStops") : $("trailBox");
    if (next) next.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return;
  }
  if (b.dataset.exhibit) { st.exhibit = b.dataset.exhibit; here.at = "lodge"; render(false); go($("exhibitOpen")); return; }
  if (b.classList.contains("find-btn")) {
    const r = $(b.getAttribute("aria-controls")); r.hidden = !r.hidden;
    b.setAttribute("aria-expanded", String(!r.hidden)); return;
  }
  const to = b.dataset.go;
  if (to && to.startsWith("place-")) { go(placeTarget(to.slice(6))); return; }
  if (to === "lodge" || to === "trailhead") moveHere(to);
  if (to === "keep") moveHere("bulletin");
  if (to === "lodge") go($("lodge"));
  if (to === "trailhead") go($("pick"));
  if (to === "keep") { const k = $("keep"); k.hidden = !k.hidden; b.setAttribute("aria-expanded", String(!k.hidden)); }
  if (to === "printGuide") printGuide();
  if (to === "clearNote") {
    store.set(b.dataset.note, ""); $(b.dataset.for).value = "";
    b.textContent = shared.notes.cleared; setTimeout(() => { b.textContent = shared.notes.clear; }, 2000);
  }
  if (to === "copySpot") copyText(spotUrl(), b, shared.save.paceButton);
  if (to === "copy") { $(b.dataset.for).select(); copyText(spotUrl(), b, shared.save.copy); }
});

/* Notes save as you type, on this device only. */
document.addEventListener("input", e => {
  if (e.target.matches("textarea.note")) store.set(e.target.dataset.note, e.target.value);
});

/* A stop's marker fills in only while it's open. Opening a stop or a
   part of a place also moves "You are here" on the map. */
document.addEventListener("toggle", e => {
  if (e.target.tagName !== "DETAILS") return;
  if (e.target.parentNode.classList.contains("stop")) e.target.parentNode.classList.toggle("is-open", e.target.open);
  if (!e.target.open) return;
  const s = e.target.closest("#trailStops > .stop");
  if (s) { here.seen.add(s.dataset.stop); moveHere(s.dataset.stop); return; }
  const pl = e.target.closest("#lodge, #bulletin, #guide");
  if (pl) moveHere(pl.id);
}, true);

/* Direct links: ?spot=green-water (from the site), or #green-water. */
const [hTrail, hExhibit] = (new URLSearchParams(location.search).get("spot") || location.hash.slice(1)).split("-");
const k = COLORS.find(c => c.key.toLowerCase() === (hTrail || "").toLowerCase());
if (k) { st.trail = k.key; if (topicOf(hExhibit)) { st.exhibit = hExhibit; here.at = "lodge"; } }
render();
if (k) go(st.exhibit && trails[st.trail] ? $("exhibitOpen") : $("trailStops"));

/* Printing the page opens every stop, so the printout carries it all. */
window.addEventListener("beforeprint", () => document.querySelectorAll("details").forEach(d => { d.open = true; }));
