/* ==========================================================================
   THE TRAIL MAP: the renderer
   ==========================================================================
   Reads a content pack and draws the page. All words live in data/; all
   titles live in titles.js; colors and action words come from
   core/climate-color.js. This file holds only behavior.

   Flow: the Trailhead (get your bearings, pick your trail) -> stops 1-4
   along the trail -> the Lodge (visit as many exhibits as you like, then
   choose which go in your Field Guide at the door) -> the Bulletin Board
   -> the Field Guide. Everything is on one page. A trail and the
   exhibits visited can be linked directly: ?spot=green-water,food.
   ========================================================================== */

import { COLORS, COLOR_KEYS, getColor, cssVar, SITE } from "climate-color/climate-color.js";
import { TITLES, TRAIL_ORDER, EXHIBIT_ORDER, GUIDE_TRAIL, GUIDE_TOPIC } from "./titles.js";
import { renderStop, renderBlocks, fmt, icon, setArchivedLabel, setSayLabel, setNewTabLabel, setSourceLabels } from "./exhibits.js";

const pack = await import("./data/adult/index.js");
const { trailhead, shared, topics, trails, exhibits } = pack;
setArchivedLabel(shared.sources.archived);
setSourceLabels(shared.sources.web, shared.sources.official);
setSayLabel(shared.say);
if (shared.newTab) setNewTabLabel(shared.newTab);

const $ = id => document.getElementById(id);
/* The trail picked; the exhibit open now; every exhibit visited, in the
   order visited; and any the reader left out of the Field Guide. */
const st = { trail: null, exhibit: null, visited: [], dropped: new Set(), noteEx: null };
const kept = () => st.visited.filter(k => !st.dropped.has(k));
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
/* The first step the reader picked on the Bulletin Board, per trail. */
const startKey = () => `${st.trail}:start`.toLowerCase();
const noteKey = key => [st.trail, key === "fit" ? "" : (st.noteEx || st.exhibit), key].filter(Boolean).join(":").toLowerCase();
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
const fill = (txt, c, tp) => txt.replace(/\{trail\}/g, c.key).replace(/\{action\}/g, c.action).replace(/\{archetype\}/g, c.archetype)
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
const sign = (pl, line = "") => `<div class="place-sign"><div class="text">${pl.eyebrow ? `<p class="place-eyebrow">${fmt(pl.eyebrow)}</p>` : ""}<h2 class="place-title">${fmt(pl.title)}</h2>
    ${pl.sub ? `<p class="place-sub">${fmt(pl.sub)}</p>` : ""}${line ? `<p class="place-line">${fmt(line)}</p>` : ""}</div>${icon(pl.icon, "place-icon")}</div>`;

/* A place on the trail: its sign over a light board. */
const place = (key, cls, board) => `<li class="stop place ${cls}" id="${key}">
  <span class="marker" aria-hidden="true">${icon(P[key].icon)}</span>
  ${sign(P[key])}
  <div class="place-board">${board}</div></li>`;

/* ---------- Static parts: the header, footer, and Trailhead ---------- */

/* The "Climate Color – a Kinfeather project" tag and the footer tie
   the Trail to Climate Color and its owner.
   Other tools' addresses come from SITE in the shared core; a link without an
   address (the legal pages until they're set) is left out. */
const SB = shared.site;
const siteLink = l => l.url || SITE[l.key];
/* The tag under the title: {home} links to Climate Color, {owner} to
   Kinfeather. */
/* "Preview": while readers test the Trail, a tag beside it links to
   the footer's feedback line. Remove `preview` from the content pack to
   take both away. */
const PV = SB.preview;
const byLine = fmt(SB.by)
  .replace("{home}", `<a href="${SB.homeUrl}">${fmt(SB.homeName)}</a>`)
  .replace("{owner}", SB.owner ? `<a href="${SB.owner.url}">${fmt(SB.owner.name)}</a>` : "");
$("by").innerHTML = `${byLine}${PV ? ` <a class="preview-tag" href="#feedback">${fmt(PV.tag)}</a>` : ""}`;
$("siteFoot").innerHTML = `${PV ? `<p class="feedback" id="feedback">${fmt(PV.line)} <a href="mailto:${PV.email}?subject=${encodeURIComponent(PV.subject)}">${fmt(PV.email)}</a></p>` : ""}<ul>${[...SB.more, ...SB.legal].filter(siteLink).map(l =>
  `<li><a href="${siteLink(l)}">${fmt(l.name)}</a></li>`).join("")}</ul><p>${fmt(SB.made)}</p>`;

document.title = trailhead.title;
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
    at: { trailhead: [60, 320], lodge: [400, 110], guide: [560, 175], bulletin: [690, 255] },
    stops: [[150, 270], [250, 300], [330, 220], [250, 150]],
    /* where each place's name sits: [dx, dy, text-anchor] */
    label: { trailhead: [0, 38, "middle"], lodge: [0, 38, "middle"], bulletin: [0, 36, "middle"], guide: [0, 38, "middle"] },
    path: {
      start: "M60,320 C95,300 120,290 150,270",
      trail: "M150,270 C190,245 215,305 250,300 C290,295 300,250 330,220 C355,195 300,160 250,150 C290,140 340,95 400,110",
      after: "M400,110 C460,112 525,140 560,175 C595,210 640,250 690,255"
    },
    lake: "M520,40 C560,18 662,24 692,54 C716,80 682,112 630,106 C588,101 540,96 524,76 C514,63 511,48 520,40 Z", lakeAt: [606, 70],
    trees: [[78, 96], [100, 110], [58, 122], [88, 140], [122, 88], [380, 250], [404, 268], [428, 246], [452, 276], [410, 300],
      [300, 40], [324, 54], [276, 58], [560, 300], [584, 318], [536, 320]],
    north: [40, 48],
    /* Trimmed off the top of the drawing, so the map starts close to its
       highest point. */
    top: 10
  },
  tall: {
    w: 340, h: 532,
    at: { trailhead: [60, 70], lodge: [170, 360], guide: [255, 410], bulletin: [125, 470] },
    stops: [[150, 135], [250, 180], [200, 250], [90, 290]],
    label: { trailhead: [26, 5, "start"], lodge: [26, -6, "start"], bulletin: [0, 38, "middle"], guide: [-26, 5, "end"] },
    path: {
      start: "M60,70 C95,100 120,125 150,135",
      trail: "M150,135 C190,148 240,155 250,180 C262,210 225,230 200,250 C170,273 110,265 90,290 C75,315 120,350 170,360",
      after: "M170,360 C215,366 250,385 255,410 C260,445 190,470 125,470"
    },
    lake: "M22,392 C40,370 98,374 116,396 C132,416 120,452 86,458 C56,463 26,450 20,428 C16,414 14,402 22,392 Z", lakeAt: [68, 424],
    trees: [[240, 74], [262, 90], [226, 98], [20, 190], [42, 208], [18, 230], [290, 258], [312, 276], [284, 296], [290, 500], [314, 516]],
    north: [312, 64],
    top: 34
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
    ? line(M.path.start, "var(--park)") + line(M.path.trail, "var(--trail)") + line(M.path.after, "var(--board)", true)
    : line(`${M.path.start} ${M.path.trail.replace(/^M[\d.,]+/, "")} ${M.path.after.replace(/^M[\d.,]+/, "")}`, "#64748B", true);
  const stops = stopKeys.map((key, i) => {
    const [x, y] = M.stops[i], seen = false;
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
  /* The map is a picture for getting your bearings, not a tracker: the
     progress bar at the top of the screen shows where you are. */
  const pin = "";
  const [nx, ny] = M.north;
  return `<svg class="map-${M === MAPS.wide ? "wide" : "tall"}" viewBox="0 ${M.top || 0} ${M.w} ${M.h - (M.top || 0)}" focusable="false">
    <path d="${M.lake}" class="map-lake"/><text x="${M.lakeAt[0]}" y="${M.lakeAt[1]}" class="map-lake-name" text-anchor="middle">${fmt(W.lake)}</text>
    ${M.trees.map(([x, y]) => `<use href="#i-tree" x="${x}" y="${y}" width="20" height="22"/>`).join("")}
    ${trail}${stops}${places}${pin}
    <circle cx="${nx}" cy="${ny}" r="18" class="map-north"/><path d="M${nx},${ny - 13} L${nx + 6},${ny + 5} L${nx},${ny + 1} L${nx - 6},${ny + 5} Z" style="fill:var(--text-secondary)"/>
    <text x="${nx}" y="${ny + 34}" class="map-n" text-anchor="middle">${fmt(W.north)}</text></svg>`;
}

/* The route strip: the map's key, a plain list of the five places and
   what happens at each. Getting around is the progress bar's job. */
function routeStrip() {
  return Object.entries(P).map(([key, pl]) =>
    `<li class="route-${key}"><div class="route-btn">
      <span class="route-icon" aria-hidden="true">${key === "trail" ? "1" : icon(pl.icon)}</span><span><b class="route-name">${fmt(pl.legendName || pl.name)}</b><span class="route-text">${fmt(pl.route)}</span></span></div></li>`).join("");
}

/* The progress bar: once a trail is picked and the reader is past the
   Trailhead, a slim bar stays at the top of the screen. It shows the five
   places, marks the one the reader is in, fills a dot for each trail stop
   opened, and counts the exhibits visited. Each place is a button that
   goes there; the Bulletin Board and Field Guide wait for an exhibit. */
const PLACES_IN_ORDER = ["trailhead", "trail", "lodge", "guide", "bulletin"];
let now = "trailhead";
function drawProgress() {
  const bar = $("progress"), t = trails[st.trail];
  if (!bar) return;
  bar.hidden = !t || now === "trailhead";
  if (bar.hidden) return;
  const PR = shared.progress, built = st.visited.filter(k => exhibits[k]).length;
  const keptN = st.visited.filter(k => exhibits[k] && !st.dropped.has(k)).length;
  const stopKeys = TRAIL_ORDER.filter(k => k === "care" || t[k]);
  const opened = stopKeys.filter(k => here.seen.has(k)).length;
  bar.innerHTML = `<ol>${PLACES_IN_ORDER.map(key => {
    const pl = P[key], ready = key === "bulletin" || key === "guide" ? built > 0 : true;
    const extra = key === "trail"
      ? `<span class="prog-dots" aria-hidden="true">${stopKeys.map(k => `<i${here.seen.has(k) ? ' class="done"' : ""}></i>`).join("")}</span><span class="vh">, ${fmt(PR.stops.replace("{n}", opened).replace("{total}", stopKeys.length))}</span>`
      : key === "lodge" && built ? `<span class="prog-count" aria-hidden="true">${built}</span><span class="vh">, ${fmt(shared.lodge.visitedCount.replace("{n}", built))}</span>`
      : key === "guide" && keptN ? `<span class="prog-count" aria-hidden="true">${keptN}</span><span class="vh">, ${fmt(PR.topics.replace("{n}", keptN))}</span>` : "";
    return `<li><button type="button" class="prog-btn prog-${key}" data-go="place-${key}"${key === now ? ' aria-current="location"' : ""}${ready ? "" : " disabled"}>
      <span class="prog-icon" aria-hidden="true">${icon(pl.icon)}</span><span class="prog-name">${fmt(pl.short || pl.name)}</span>${extra}</button></li>`;
  }).join("")}</ol>`;
}

/* Which place the reader is in: whichever crosses a line about a third
   of the way down the screen. Watched again after every redraw. */
const watcher = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
  let changed = false;
  entries.forEach(e => { if (e.isIntersecting) { const at = e.target.id === "trailStops" ? "trail" : e.target.id; if (at !== now) { now = at; changed = true; } } });
  if (changed) drawProgress();
}, { rootMargin: "-30% 0px -65% 0px" }) : null;
function watchPlaces() {
  if (!watcher) return;
  watcher.disconnect();
  ["trailhead", "trailStops", "lodge", "bulletin", "guide"].forEach(id => { const el = $(id); if (el) watcher.observe(el); });
}

function drawBearings() {
  const map = $("parkMap"), route = $("route");
  if (map) map.innerHTML = drawMap(MAPS.wide) + drawMap(MAPS.tall);
  if (route) route.innerHTML = routeStrip();
}

/* Where each key button goes. A place that isn't on the page yet (no
   trail picked) sends you to the trail picker. */
const placeTarget = key => ({ trailhead: $("trailhead"), trail: $("trailStops") && $("trailStops").children.length ? $("trailStops") : null,
  lodge: $("lodge"), bulletin: $("bulletin"), guide: $("guide"), pick: $("pick") }[key]) || $("pick");

/* One line on the whole journey. */
$("todo").innerHTML = `<p class="intro">${fmt(trailhead.intro)}</p>`;

/* "Want to finish later?": once a trail is picked, a button that opens
   the ways to save a link back to this spot. */
const S0 = shared.save;
$("note").innerHTML = `<p class="pace-q">${fmt(S0.pace)}
  <button type="button" class="pill-btn pill-all next-btn" data-go="saveOpen" aria-expanded="false" aria-controls="saveTop">${fmt(S0.paceButton)}</button></p>
  <div id="saveTop" hidden>${savePanel("saveLinkTop")}</div>`;
$("footnote").textContent = trailhead.footnote;
/* The test note shows only while something is still being built. */
const allBuilt = builtTrails.length === COLOR_KEYS.length && builtExhibits.length === topics.topics.length;
$("testNote").hidden = allBuilt;
if (!allBuilt) $("testNote").textContent = trailhead.testNote.replace("{trails}", trailsReady).replace("{exhibits}", exhibitsReady);

$("trailheadMarker").innerHTML = icon(P.trailhead.icon);
$("trailheadSign").outerHTML = sign(P.trailhead);

/* "Get your bearings": the promise that the trail is open to everyone,
   the map, then its key (the places, the two kinds of stops) and the
   story, always in sight. */
const B = trailhead.board;
$("board").setAttribute("aria-label", TITLES.how);
$("board").innerHTML = `<p class="open-all">${fmt(B.open)}</p>
  ${renderBlocks(B.blocks, ctx)}
  ${B.storyIntro ? `<p class="story-intro">${fmt(B.storyIntro)}</p>` : ""}
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

/* "Save your spot." The link is the trail's own address with the trail
   and the exhibits visited after a #: #green-water,food, and nothing
   else. Browsers never send the part after # to any server, so no one
   but the reader sees it. Older ?spot= links still open (see the end). */
const spot = () => st.trail ? st.trail.toLowerCase() + (st.visited.length && trails[st.trail] ? "-" + st.visited.join(",") : "") : "";
/* The page's own address: the Trail Map has a site of its own now. */
const home = location.origin + location.pathname;
const spotUrl = () => spot() ? `${home}#${spot()}` : home;

/* The same panel at the top and at the Bulletin Board: share, email, or
   copy a link back to this spot. Share shows only where the device has a
   share menu. */
function savePanel(id) {
  const S = shared.save;
  const canShare = typeof navigator.share === "function";
  return `<div class="save"><p class="sub">${fmt(S.title)}</p><p>${fmt(S.text)}</p>
    <div class="save-row">${canShare ? `<button type="button" class="save-btn" data-go="share">${fmt(S.share)}</button>` : ""}
      <a class="save-btn save-email" href="#">${fmt(S.email)}</a>
      <button type="button" class="save-btn" data-go="copy" data-for="${id}">${fmt(S.copy)}</button></div>
    <input type="text" readonly class="save-link" id="${id}" aria-label="Link back to this spot" value="">
    <p class="save-privacy">${fmt(S.privacy)}</p></div>`;
}

/* Unnumbered parts, on a white panel, each ending with a "Next" line. */
const panel = parts => `<ul class="rooms">${parts.map(([key, s, next]) =>
  renderStop({ n: null, key, title: s.title || TITLES[key], stop: s, line: "room", ctx, aheadLabel: next || "Next" })).join("")}</ul>`;

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
  const c = getColor(st.trail), TT = shared.trailTop;
  /* Stop 1 ends with the trail's "Try it now": something to do in the
     first minute. The Field Guide keeps it too. */
  const tryNow = t.tryIt && t.tryIt.blocks.filter(b => b.stretch).map(b =>
    ({ stretch: { ...b.stretch, title: `${TITLES.tryIt}: ${b.stretch.title.charAt(0).toLowerCase()}${b.stretch.title.slice(1)}` } }));
  const stopFor = key => key === "care" ? { ...shared.care, ahead: fill(shared.care.ahead, c) }
    : key === "know" && tryNow ? { ...t.know, blocks: [...t.know.blocks, ...tryNow] } : t[key];
  /* The top of the trail: its marker, name, and what it's about. */
  const top = `<li class="stop place is-trail" id="trailTop">
    <span class="marker" aria-hidden="true">${icon(P.trail.icon)}</span>
    <div class="place-sign"><div class="text"><h2 class="place-title">${fmt(fill(TT.title, c))}</h2><p class="place-sub">${fmt(fill(TT.line, c))}</p></div></div></li>`;
  let n = 1;
  stops.innerHTML = top + TRAIL_ORDER.filter(stopFor).map(key =>
    renderStop({ n: n++, key, title: TITLES[key], stop: stopFor(key), ctx })).join("");
}

/* ---------- The Lodge, the Field Guide, and the Bulletin Board ---------- */

/* The Bulletin Board: the end of the trail, as rich as its start. A recap
   of the whole trip, place by place; then notes pinned to the board: the
   reader's way of helping, their first steps, a way to pass the trail on,
   the other trails, Save for later, and the trail's closing words. */
/* "You opened 3 of 4 stops": kept current as stops are opened. */
function tripTrailLine(t) {
  const B = shared.bulletin.board, stopKeys = TRAIL_ORDER.filter(k => k === "care" || t[k]), opened = stopKeys.filter(k => here.seen.has(k)).length;
  return (opened ? B.trailOpened : B.trailAll).replace("{n}", opened).replace("{total}", stopKeys.length);
}
function boardBody(c, t, built, farewell) {
  const J = shared.bulletin, B = J.board, kept = built.filter(k => !st.dropped.has(k));
  const stopKeys = TRAIL_ORDER.filter(k => k === "care" || t[k]), opened = stopKeys.filter(k => here.seen.has(k)).length;
  const names = list => list.length === 1 ? exhibitName(topicOf(list[0])) : `${listOf(list.map(k => topicOf(k).name))} Exhibits`;
  const did = {
    trailhead: fill(B.trailhead, c),
    trail: tripTrailLine(t),
    lodge: B.lodge.replace("{exhibits}", names(built)),
    guide: (kept.length === 1 ? B.guideOne : B.guideMany).replace("{n}", kept.length),
    bulletin: B.here
  };
  /* The same park map as the Trailhead, now in the reader's trail color:
     the trip they just took, start to finish. */
  const trip = `<section class="trip" aria-labelledby="tripTitle"><h3 class="board-h" id="tripTitle">${fmt(B.trip)}</h3>
    <div class="park-map trip-map" aria-hidden="true">${drawMap(MAPS.wide) + drawMap(MAPS.tall)}</div>
    <ol class="trip-steps">${PLACES_IN_ORDER.map(key => `<li class="trip-${key}${key === "bulletin" ? " is-here" : ""}">
      <span class="trip-icon" aria-hidden="true">${icon(P[key].icon)}</span>
      <span><b>${fmt(P[key].name)}</b><span class="trip-did">${fmt(did[key])}</span></span>
      ${key === "bulletin" ? "" : `<span class="trip-check" aria-hidden="true">${icon("i-check")}</span>`}</li>`).join("")}</ol></section>`;
  const meaning = trailhead.ways[c.key];
  const way = `<article class="pin pin-way"><h3>${fmt(B.way)}</h3>
    <p class="way-you"><span class="blaze" style="background:var(--trail)" aria-hidden="true"></span>${fmt(B.you.replace("{a}", aAn(c.archetype)).replace("{archetype}", c.archetype))}</p>
    <p>${fmt(cap(meaning))}.</p>
    <ul class="way-words">${c.words.map(w => `<li>${fmt(w.word)}</li>`).join("")}</ul></article>`;
  /* With more than one, the reader picks a first step to start with. It
     moves to the top and is kept on this device (startKey). */
  const firsts = kept.map(k => [k, exhibits[k] && exhibits[k].work && exhibits[k].work[c.key]]).filter(([, w]) => w);
  const picking = firsts.length > 1, chosen = picking ? store.get(startKey()) : "";
  if (chosen) firsts.sort(([a], [b]) => (b === chosen) - (a === chosen));
  const firstItem = ([k, w]) => {
    const text = `<span class="first-icon" aria-hidden="true">${icon(topicOf(k).icon)}</span><span><b>${fmt(topicOf(k).name)}:</b> ${fmt(w.first)}<span class="start-tag">${fmt(B.start)}</span></span>`;
    return `<li data-topic="${k}"${k === chosen ? ' class="is-start"' : ""}>${picking
      ? `<label class="first-pick"><input type="radio" name="firstStart" value="${k}"${k === chosen ? " checked" : ""}><span class="vh">${fmt(B.startHere)}: </span>${text}</label>`
      : text}</li>`;
  };
  const first = firsts.length ? `<article class="pin pin-first"><h3>${fmt(B.firsts)}</h3>
    ${picking ? `<p class="first-hint">${fmt(B.pickOne)}</p>` : ""}
    <ul class="first-list" id="firstList"${picking ? ` role="radiogroup" aria-label="${fmt(B.firsts)}"` : ""}>${firsts.map(firstItem).join("")}</ul></article>` : "";
  const msg = fill(B.pass.message, c).replace("{url}", home);
  const canShare = typeof navigator.share === "function";
  const pass = `<article class="pin pin-pass"><h3>${fmt(B.pass.title)}</h3><p>${fmt(B.pass.text)}</p>
    <blockquote class="pass-msg">${fmt(msg)}</blockquote>
    <div class="save-row">${canShare ? `<button type="button" class="save-btn" data-go="passShare">${fmt(shared.save.share)}</button>` : ""}
      <a class="save-btn" href="mailto:?subject=${encodeURIComponent(B.pass.subject)}&body=${encodeURIComponent(msg)}">${fmt(B.pass.email)}</a>
      <button type="button" class="save-btn" data-go="passCopy">${fmt(shared.save.copy)}</button></div></article>`;
  const others = COLOR_KEYS.filter(k => k !== c.key).map(k => getColor(k));
  const tryOther = `<article class="pin pin-try"><h3>${fmt(J.trail.label)}</h3><p>${fmt(J.trail.hint)}</p>
    <div class="try-trails">${others.map(o => `<button type="button" class="try-trail" data-trail="${o.key}"><span class="blaze" style="background:var(--${o.key.toLowerCase()}-color)" aria-hidden="true"></span>${fmt(o.action)} <span class="tcolor">· ${o.key}</span></button>`).join("")}</div></article>`;
  return `<p class="board-lede">${fmt(B.lede)}</p>${trip}
    <div class="pins">${way}${first}${pass}${tryOther}
      <article class="pin pin-save" id="keep">${savePanel("saveEnd")}</article>
      <article class="pin pin-words"><h3>${fmt(B.words)}</h3>${farewell}</article></div>`;
}

/* An exhibit's parts, then "Put your [action] to work": where the reader's
   trail meets the topic, written for each trail. A trail without one yet
   goes straight from the last part to the Field Guide. */
const aAn = w => /^[AEIOU]/.test(w) ? "an" : "a";
function exhibitParts(E, c, tp) {
  const W = shared.work, Wk = E.work && E.work[c.key];
  const line = fill(W.line, c, tp).replace("{a}", aAn(c.archetype));
  const parts = EXHIBIT_ORDER.filter(k => E.parts[k]).map(k => [k, k === "life" ? { ...E.parts[k], ahead: Wk ? line : W.toGuide } : E.parts[k]]);
  if (Wk) parts.push(["work", { exhibit: "sign", title: fill(TITLES.work, c), line, ahead: W.ahead, blocks: [
    { sub: W.imagine }, { p: E.situation },
    { list: c.words.map(w => `**${w.word}:** ${Wk[w.word]}`) },
    { p: `**${W.first}** ${Wk.first}` },
    { p: W.added }
  ] }]);
  return parts;
}

function renderLodge() {
  const line = $("lodgeLine"), t = trails[st.trail];
  if (!t) { line.innerHTML = ""; return; }
  const c = getColor(st.trail), L = shared.lodge;
  const tp = topicOf(st.exhibit), E = exhibits[st.exhibit];
  const f = txt => fill(txt, c, tp);
  const visitedMark = `<span class="visited">${icon("i-check")}${fmt(L.visited)}</span>`;

  /* The exhibit picker: a card for each topic. Readers can visit as many
     as they like; each one visited says so. */
  const opts = topics.topics.map(x => `<li><button type="button" class="opt${st.visited.includes(x.key) ? " is-visited" : ""}" data-exhibit="${x.key}" aria-pressed="${st.exhibit === x.key}">
    <span class="opt-icon" aria-hidden="true">${icon(x.icon)}</span>${st.exhibit === x.key ? `<span class="here" aria-hidden="true">${fmt(shared.map.here)}</span>` : ""}
    <span><span class="oname">${fmt(x.name)}</span><span class="odesc">${fmt(cap(x.about))}.</span>${st.visited.includes(x.key) && st.exhibit !== x.key ? visitedMark : ""}</span></button></li>`).join("");

  /* The open exhibit: a room in the Lodge, with its own sign (its name
     and what it covers), a one-line promise, then its parts. An exhibit
     that isn't built yet shows its teaser only. */
  let open = "";
  if (tp) {
    const roomSign = `<div class="room-sign"><div class="text"><p class="room-title">${fmt(exhibitName(tp))}</p>
      <p class="place-sub">${fmt(cap(tp.about))}</p></div>${icon(tp.icon, "place-icon")}</div>`;
    open = `<section class="exhibit-open" id="exhibitOpen" aria-label="${fmt(exhibitName(tp))}">${roomSign}` + (E
      ? `<div class="room-body"><p class="promise">${fmt(E.promise)}</p>${panel(exhibitParts(E, c, tp))}</div>`
      : `<div class="room-body">${renderBlocks([{ teaser: true }], ctx)}<p class="not-built">${fmt(readyLine(L.notBuilt, exhibitsReady, builtExhibits.length))}</p>${builtExhibits.map(x => `<button type="button" class="pill-btn pill-all next-btn" data-exhibit="${x.key}">${fmt(L.tryReady.replace("{name}", exhibitName(x)))} <span aria-hidden="true">&rarr;</span></button>`).join(" ")}</div>`) + `</section>`;
  }

  const built = st.visited.filter(k => exhibits[k]);

  /* The Lodge: a building of its own, like the park map and the Field
     Guide. The exhibit cards are its rooms, a floor plan you can click:
     in from the trail at the top, out to the Bulletin Board at the
     bottom. The door signs are only a picture; screen readers skip them. */
  const lodge = `<li class="stop place is-lodge" id="lodge">
  <span class="marker" aria-hidden="true">${icon(P.lodge.icon)}</span>
  ${sign(P.lodge)}
  <div class="lodge-card">
    <div class="place-board">${shared.reality ? `<div class="reality">${panel([["reality", shared.reality]])}</div>` : ""}<h3 class="board-h">${TITLES.pickExhibit}</h3>
      <p class="step-hint">${fmt(L.pickHint)}</p>
      <div class="floor"><ul class="options exhibits">${opts}</ul></div>
      ${open}</div></div></li>`;

  /* At the Bulletin Board: which visited topics go in the Field Guide. */
  const door = `<div class="door" id="door"><p class="door-q">${fmt(L.door)}</p>
      <ul class="door-list">${built.map(k => { const x = topicOf(k);
        return `<li><label class="door-pick"><input type="checkbox" data-keep="${k}"${st.dropped.has(k) ? "" : " checked"}>${icon(x.icon)}<span>${fmt(x.name)}</span></label></li>`; }).join("")}</ul>
      <p class="back-row"><button type="button" class="linkish" data-go="place-lodge">${fmt(shared.guide.back.label)}</button> <span class="reach">${fmt(shared.guide.back.hint)}</span></p>
    </div>`;

  if (!built.length) { line.innerHTML = lodge; return; }

  /* The Field Guide: one frame for everyone. The trail's pages come once
     (its story, "Try it now," and every way of helping); then each topic
     the reader kept adds its own pages (the situation, work close to
     home, and a first step). */
  const G = shared.guide, A = G.ahead;
  const keep = kept().filter(k => exhibits[k]);
  const names = listOf(keep.map(k => topicOf(k).name));
  const many = { name: names, about: "" };
  const trailParts = {
    story: t.story,
    tryIt: t.tryIt,
    others: { exhibit: "sign", blocks: [{ p: fill(G.others.lead, c, keep.length ? many : tp) }, { ways: true }, { questions: [G.others.ask] }] }
  };
  const topicParts = (x, X) => {
    const fx = txt => fill(txt, c, x);
    return {
      think: { exhibit: "rest", blocks: [{ sub: G.think.lead }, { p: X.situation }, { questions: G.think.questions.map(fx) }] },
      nearby: { ...X.finder, blocks: [X.finder.blocks[0], ...G.local, ...X.finder.blocks.slice(1)] },
      first: { exhibit: "rest", blocks: [
        { questions: [...G.first.questions, ...(X.first ? X.first.questions : [])] },
        { questions: [...G.first.friend, ...(X.first ? X.first.friend : [])], title: "With a friend" }
      ] }
    };
  };
  const partList = (order, parts) => order.filter(k => parts[k]).map(k => [k, { ...parts[k], ahead: A[k], line: G.lines[k] || parts[k].line }]);
  /* Every visited topic gets its pages; one left unchecked is hidden, so
     checking or unchecking never redraws the page or moves it. */
  const topicPages = built.map(k => {
    const x = topicOf(k);
    st.noteEx = k;
    const html = `<section class="guide-topic" data-topic="${k}" aria-label="${fmt(fill(G.forTopic, c, x))}"${st.dropped.has(k) ? " hidden" : ""}>
      <h3 class="guide-h"><span class="guide-h-icon" aria-hidden="true">${icon(x.icon)}</span>${fmt(fill(G.forTopic, c, x))}</h3>
      ${panel(partList(GUIDE_TOPIC, topicParts(x, exhibits[k])))}</section>`;
    st.noteEx = null;
    return html;
  }).join("");
  const PG = P.guide;
  /* Print, then a way back to the Lodge for more topics: each exhibit
     visited adds its pages here. */
  const printRow = `<p class="print-row"><button type="button" class="pill-btn pill-all next-btn" data-go="printGuide">${fmt(G.print)}</button> <span class="reach">${fmt(G.printHelp)}</span></p>`;
  /* The booklet you take with you: after the Bulletin Board, off the
     trail line. Its cover names the trail and the topics kept, with one
     line on how to use it and Print right there. */
  const guide = `<li class="stop is-guide" id="guide">
    <span class="marker" aria-hidden="true">${icon(PG.icon)}</span>
    <div class="place-sign guide-sign"><div class="text"><h2 class="place-title">${fmt(PG.title)}</h2>
      <p class="place-sub">${fmt(G.cover)}</p></div></div>
    <div class="guide-card">
      <div class="guide-body">
        ${printRow}
        ${G.safety ? `<p class="guide-safety">${fmt(G.safety)}</p>` : ""}
        ${door}
        <section class="guide-topic" aria-label="${fmt(fill(G.forTrail, c))}">
          <h3 class="guide-h"><span class="guide-h-blaze" style="background:var(--${c.key.toLowerCase()}-color)" aria-hidden="true"></span>${fmt(fill(G.forTrail, c))}</h3>
          ${panel(partList(GUIDE_TRAIL, trailParts))}</section>
        ${topicPages}
        ${printRow}
      </div></div></li>`;

  /* The Bulletin Board: outside the Lodge, the end of the trail and the
     place to choose. */
  const J = shared.bulletin;
  const farewell = [...(t.farewell || []), ...(shared.bulletin.close || [])].map(p => `<p>${fmt(p.replace("{topic}", (names || tp.name).toLowerCase()))}</p>`).join("");
  const bulletin = place("bulletin", "is-board", boardBody(c, t, built, farewell));

  line.innerHTML = lodge + guide + bulletin;
  const lead = document.querySelector('#guide [data-stop="others"] .body p');
  if (lead) lead.id = "othersLead";
}

/* The Field Guide's cover line and "other ways" lead name the topics
   kept: "The Green Trail, with Water and Food." */
const keptNames = () => listOf(kept().filter(k => exhibits[k]).map(k => topicOf(k).name));
function guideWith() {
  const tp = topicOf(st.exhibit);
  return shared.guide.with.replace("{trail}", st.trail).replace("{exhibits}", keptNames() || (tp ? exhibitName(tp) : ""));
}
function refreshGuideNames() {
  const c = getColor(st.trail), n = keptNames();
  if ($("guideFor")) $("guideFor").textContent = guideWith();
  if ($("othersLead") && n) $("othersLead").textContent = fill(shared.guide.others.lead, c, { name: n, about: "" });
}

/* The trail line, markers, and "your trail" touches take the picked
   trail's color, from the shared tokens in core/atlas.css. Text on that
   color follows the Wheel's own rule (each color's `label`), so Yellow
   and Orange get dark numbers. With no trail picked, trail.css's green
   defaults apply. */
const TEXT_ON = { black: "var(--text-primary)", white: "#fff" };
/* Text on a trail's own tint (tags, chips, an open stop's "Close"). Red
   and Orange text clear 4.5:1 on white but not on their tints, so they
   get a darker shade here; the rest already clear it. */
const INK_ON_TINT = { Red: "#B30227", Orange: "#965915" };
function paintTrail() {
  const root = document.documentElement.style;
  const props = { "--trail": "color", "--trail-text": "text", "--trail-tint": "tint-1" };
  if (!st.trail) { [...Object.keys(props), "--trail-on", "--trail-ink"].forEach(p => root.removeProperty(p)); return; }
  Object.entries(props).forEach(([p, kind]) => root.setProperty(p, `var(${cssVar(st.trail, kind)})`));
  root.setProperty("--trail-on", TEXT_ON[getColor(st.trail).label] || "#fff");
  root.setProperty("--trail-ink", INK_ON_TINT[st.trail] || `var(${cssVar(st.trail, "text")})`);
}

function render(trailChanged = true) {
  paintTrail();
  $("note").hidden = !st.trail;
  if (trailChanged) renderTrail();
  renderLodge();
  drawBearings();
  watchPlaces();
  drawProgress();
  /* The frame's own address keeps the spot too, as #green-water. */
  history.replaceState(null, "", location.pathname + (spot() ? "#" + spot() : ""));
  document.querySelectorAll(".save-link").forEach(i => { i.value = spotUrl(); });
  const S = shared.save;
  document.querySelectorAll(".save-email").forEach(a => {
    a.href = `mailto:?subject=${encodeURIComponent(S.emailSubject)}&body=${encodeURIComponent(S.emailBody + "\n" + spotUrl())}`; });
}

/* Notes where the reader is and redraws only the progress bar. */
function moveHere(at) {
  here.at = at; drawProgress();
  const line = document.querySelector(".trip-trail .trip-did");
  if (line && trails[st.trail]) line.textContent = tripTrailLine(trails[st.trail]);
}

/* ---------- Events (one listener each, so re-rendered parts just work) ---------- */

/* Smooth scrolling, unless the device asks for less motion. */
const motion = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
const go = el => el && el.scrollIntoView({ behavior: motion(), block: "start" });

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
    if (next) next.scrollIntoView({ behavior: motion(), block: "nearest" });
    return;
  }
  if (b.dataset.exhibit) {
    st.exhibit = b.dataset.exhibit;
    if (!st.visited.includes(st.exhibit)) st.visited.push(st.exhibit);
    here.at = "lodge"; render(false); go($("exhibitOpen")); return;
  }
  if (b.classList.contains("find-btn")) {
    const r = $(b.getAttribute("aria-controls")); r.hidden = !r.hidden;
    b.setAttribute("aria-expanded", String(!r.hidden)); return;
  }
  const to = b.dataset.go;
  if (to && to.startsWith("place-")) { go(placeTarget(to.slice(6))); return; }
  if (to === "bulletin") { moveHere("bulletin"); go($("bulletin")); return; }
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
  if (to === "saveOpen") { const p = $("saveTop"); p.hidden = !p.hidden; b.setAttribute("aria-expanded", String(!p.hidden)); }
  if (to === "passShare") { const B = shared.bulletin.board; navigator.share({ title: document.title, text: fill(B.pass.message, getColor(st.trail)).replace(" {url}", ""), url: home }).catch(() => { /* closed without sharing */ }); return; }
  if (to === "passCopy") { copyText(fill(shared.bulletin.board.pass.message, getColor(st.trail)).replace("{url}", home), b, shared.save.copy); return; }
  if (to === "share") navigator.share({ title: document.title, url: spotUrl() }).catch(() => { /* closed without sharing */ });
  if (to === "copy") { $(b.dataset.for).select(); copyText(spotUrl(), b, shared.save.copy); }
});

/* The Lodge door: a topic left unchecked stays out of the Field Guide. */
document.addEventListener("change", e => {
  /* "Your first steps": the one picked moves to the top. */
  if (e.target.name === "firstStart") {
    store.set(startKey(), e.target.value);
    const list = $("firstList"), li = e.target.closest("li");
    list.querySelectorAll("li").forEach(x => x.classList.toggle("is-start", x === li));
    list.prepend(li); e.target.focus();
    return;
  }
  const k = e.target.dataset && e.target.dataset.keep;
  if (!k) return;
  if (e.target.checked) st.dropped.delete(k); else st.dropped.add(k);
  document.querySelectorAll(`.guide-topic[data-topic="${k}"]`).forEach(s => { s.hidden = !e.target.checked; });
  refreshGuideNames();
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
  /* One stop open at a time, on the trail and in each list of parts, so
     the page doesn't grow long. */
  /* Closing a part above would pull this one up the screen, so the page
     scrolls by the same amount: the title you tapped stays put. */
  const item = e.target.parentNode, list = item.parentNode;
  if (item.classList.contains("stop") && list && (list.id === "trailStops" || list.classList.contains("rooms"))) {
    const sum = e.target.querySelector("summary"), before = sum.getBoundingClientRect().top;
    list.querySelectorAll(":scope > .stop > details[open]").forEach(d => { if (d !== e.target) d.open = false; });
    const shift = sum.getBoundingClientRect().top - before;
    if (Math.abs(shift) > 1) window.scrollBy(0, shift);
  }
  const s = e.target.closest("#trailStops > .stop");
  if (s) { here.seen.add(s.dataset.stop); moveHere(s.dataset.stop); return; }
  const pl = e.target.closest("#lodge, #bulletin, #guide");
  if (pl) moveHere(pl.id);
}, true);

/* Direct links: ?spot=green-water,food, or #green-water,food. The last
   exhibit listed opens. */
const [hTrail, hExhibits = ""] = (new URLSearchParams(location.search).get("spot") || location.hash.slice(1)).split("-");
const k = COLORS.find(c => c.key.toLowerCase() === (hTrail || "").toLowerCase());
if (k) {
  st.trail = k.key;
  st.visited = [...new Set(hExhibits.split(",").map(s => s.trim().toLowerCase()).filter(topicOf))];
  if (st.visited.length) { st.exhibit = st.visited[st.visited.length - 1]; here.at = "lodge"; }
}
render();
/* Drawn: show the page (index.html starts with class="loading", which
   hides the empty frames so they don't flash before this point). */
document.documentElement.classList.remove("loading");
if (k) go(st.exhibit && trails[st.trail] ? $("exhibitOpen") : $("trailStops"));

/* Printing the page opens every stop, so the printout carries it all. */
window.addEventListener("beforeprint", () => document.querySelectorAll("details").forEach(d => { d.open = true; }));
