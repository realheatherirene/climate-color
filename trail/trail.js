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

import { COLOR_KEYS, getColor, cssVar } from "climate-color/climate-color.js";
import { renderSiteFoot } from "climate-color/site-foot.js";
import { TITLES, TRAIL_ORDER, EXHIBIT_ORDER, GUIDE_TRAIL, GUIDE_TOPIC } from "./titles.js";
import { renderStop, renderBlocks, fmt, icon, setLabels } from "./exhibits.js";

const { trailhead, shared, topics, trails, exhibits } = await import("./data/adult/index.js");
setLabels({ ...shared.sources, say: shared.say, newTab: shared.newTab });

const $ = id => document.getElementById(id);
/* The trail picked; the exhibit open now; every exhibit visited, in the
   order visited; and any the reader left out of the Field Guide. */
const st = { trail: null, exhibit: null, visited: [], dropped: new Set(), noteEx: null };
const kept = () => st.visited.filter(k => !st.dropped.has(k));
let uid = 0;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const topicOf = key => topics.topics.find(t => t.key === key);
/* A topic's four everyday examples, with dots between them. Screen
   readers skip the dots and hear commas instead. A line can break after
   a dot, never before one. */
const examples = tp => tp.about.map(fmt).join(`<span aria-hidden="true">&nbsp;·</span><span class="vh">,</span> `);
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
   and {lower} in shared wording. */
const fill = (txt, c, tp) => txt.replace(/\{trail\}/g, c.key).replace(/\{action\}/g, c.action).replace(/\{archetype\}/g, c.archetype)
  .replace(/\{meaning\}/g, trailhead.ways[c.key])
  .replace(/\{words\}/g, c.words.map(w => w.word).join(", ").replace(/, ([^,]*)$/, ", or $1"))
  .replace(/\{exhibitName\}/g, tp ? exhibitName(tp) : "")
  .replace(/\{exhibit\}/g, tp ? tp.name : "").replace(/\{lower\}/g, tp ? tp.name.toLowerCase() : "");

/* "Water and Food"; "Water, Food, and Air." */
const listOf = n => n.length < 3 ? n.join(" and ") : `${n.slice(0, -1).join(", ")}, and ${n[n.length - 1]}`;

/* ---------- Places: one source for names, icons, and signs ---------- */

const P = shared.places;

/* A place's heading: a title, and a short line if it has one. */
const sign = pl => `<div class="place-sign"><div class="text"><h2 class="place-title">${fmt(pl.title)}</h2>
    ${pl.sub ? `<p class="place-sub">${fmt(pl.sub)}</p>` : ""}</div></div>`;

/* A place on the trail: its sign over a light board. */
const place = (key, cls, board) => `<li class="stop place ${cls}" id="${key}">
  <span class="marker" aria-hidden="true">${icon(P[key].icon)}</span>
  ${sign(P[key])}
  <div class="place-board">${board}</div></li>`;

/* ---------- Static parts: the header, footer, and Trailhead ---------- */

/* The "a Kinfeather project" tag and the footer tie the Trail to its
   owner. The footer is the one every page shares (core/site-foot.js).
   "Preview": while readers test the Trail, a tag beside the by-line links
   to a feedback line above the footer. Remove `preview` from the content
   pack to take both away. */
const SB = shared.site, PV = SB.preview;
const byLine = fmt(SB.by).replace("{owner}", `<a href="${SB.owner.url}">${fmt(SB.owner.name)}</a>`);
$("by").innerHTML = `${byLine}${PV ? ` <a class="preview-tag" href="#feedback">${fmt(PV.tag)}</a>` : ""}`;
renderSiteFoot($("siteFoot"),
  PV ? `<p class="feedback" id="feedback">${fmt(PV.line)} <a href="mailto:${PV.email}?subject=${encodeURIComponent(PV.subject)}">${fmt(PV.email)}</a></p>` : "");

document.title = trailhead.title;
$("title").textContent = trailhead.title;
$("lede").textContent = trailhead.lede;

/* ---------- The park map and its key: getting your bearings ---------- */
/* A small park-style map at the Trailhead, drawn the way a state park
   map is: woods, a lake, a north arrow, and one loop trail. It starts at
   the Trailhead, passes the four stops to the Lodge and the Field Guide,
   and comes back around to the Bulletin Board, right beside the
   Trailhead, so the trail always ends where it began. The places are
   made up: it shows the journey, not real ground. It is a picture only
   (screen readers skip it); the route strip under it is its key and
   says the same in words. Two drawings: wide for computers, tall for
   phones (trail.css shows one). Each lays out the places in
   shared.places by key and the four stops in TRAIL_ORDER, so names,
   icons, and order come from the data. */
const MAPS = {
  wide: {
    w: 760, h: 380,
    at: { trailhead: [329, 307], lodge: [617, 144], guide: [577, 278], bulletin: [407, 311] },
    stops: [[162, 262], [123, 127], [285, 72], [458, 80]],
    /* where each place's name sits: [dx, dy, text-anchor] */
    label: { trailhead: [-6, 38, "end"], lodge: [-28, 5, "end"], guide: [28, 5, "start"], bulletin: [6, 38, "start"] },
    path: {
      start: "M329,307 C319,306 309,304 299,303 C290,301 280,300 270,298 C261,296 251,294 242,291 C232,289 223,286 214,283 C205,280 196,277 187,274 C178,270 170,266 162,262",
      trail: "M162,262 C154,258 147,254 140,249 C133,244 127,239 121,234 C116,229 111,223 107,217 C103,212 100,206 98,200 C95,194 94,187 94,181 C94,175 95,169 98,162 C100,156 103,150 107,144 C111,138 117,133 123,127 C128,122 135,117 142,113 C150,108 158,104 166,100 C175,96 184,93 194,90 C203,87 213,84 223,82 C233,79 243,77 253,76 C264,74 274,73 285,72 C295,71 305,70 315,70 C325,69 335,69 345,69 C355,69 364,70 374,70 C384,71 393,72 403,73 C412,73 421,75 431,76 C440,77 449,79 458,80 C468,82 478,84 488,86 C498,89 508,91 518,94 C527,97 537,100 546,104 C555,107 564,111 573,115 C581,119 589,124 597,129 C604,134 611,139 617,144",
      after: "M617,144 C623,150 628,155 632,161 C636,166 639,172 642,178 C644,184 645,190 646,196 C646,202 645,209 643,215 C642,221 639,227 635,233 C631,238 626,244 621,249 C615,255 608,260 601,265 C594,270 586,274 577,278 C568,283 557,287 546,290 C536,294 524,297 513,299 C502,302 490,304 478,306 C466,307 454,309 443,309 C431,310 419,311 407,311",
      /* The last few steps: from the Bulletin Board back to the Trailhead. */
      home: "M407,311 C399,311 390,311 381,310 C372,310 364,310 355,309 C346,308 338,308 330,307"
    },
    lake: "M330,165 C350,143 420,141 442,165 C460,185 446,221 402,225 C364,229 336,217 328,199 C322,187 322,175 330,165 Z", lakeAt: [386, 190],
    trees: [[215, 165], [239, 181], [195, 195], [260, 228], [480, 215], [502, 231], [20, 330], [44, 346], [700, 40], [724, 56], [640, 330], [664, 344], [690, 200]],
    north: [40, 48],
    top: 10
  },
  tall: {
    w: 340, h: 532,
    at: { trailhead: [151, 105], lodge: [266, 370], guide: [260, 242], bulletin: [202, 129] },
    stops: [[72, 196], [64, 323], [105, 444], [212, 483]],
    /* where each place's name sits: [dx, dy, text-anchor] */
    label: { trailhead: [-26, 5, "end"], lodge: [-26, 5, "end"], guide: [-26, 5, "end"], bulletin: [26, 5, "start"] },
    path: {
      start: "M151,105 C147,105 142,106 138,107 C134,108 129,110 125,112 C121,115 116,118 112,122 C108,125 104,130 100,135 C96,140 92,146 89,152 C86,158 82,165 79,172 C77,180 74,187 72,196",
      trail: "M72,196 C69,203 68,212 66,220 C65,228 63,237 63,245 C62,254 61,263 61,272 C61,280 61,289 61,298 C62,306 63,315 64,323 C65,332 66,340 68,348 C69,356 71,363 73,371 C75,378 77,385 80,392 C82,399 85,405 87,411 C90,417 93,423 96,428 C99,434 102,439 105,444 C108,448 112,453 115,457 C119,461 122,465 126,469 C129,472 133,476 137,479 C141,482 144,484 148,486 C152,488 156,490 160,492 C165,493 169,494 173,494 C177,495 182,495 186,494 C190,494 195,492 199,491 C203,489 208,486 212,483 C216,480 220,477 224,472 C228,468 232,463 235,458 C239,452 242,446 245,440 C248,433 251,426 254,419 C257,411 259,403 261,395 C263,387 264,378 266,370",
      after: "M266,370 C267,361 268,352 268,344 C269,335 269,326 269,317 C269,308 269,300 268,291 C267,282 266,274 265,266 C264,258 262,250 260,242 C259,235 257,227 254,220 C252,214 250,207 247,201 C245,194 242,188 240,183 C237,177 234,172 231,167 C228,162 225,157 222,153 C219,148 216,144 212,140 C209,136 206,133 202,129",
      /* The last few steps: from the Bulletin Board back to the Trailhead. */
      home: "M202,129 C198,126 194,122 190,119 C186,116 182,114 178,112 C174,110 169,108 165,107 C160,106 156,105 151,105"
    },
    lake: "M125,275 C140,251 200,251 215,277 C227,299 215,337 177,341 C145,345 125,327 121,307 C119,293 119,283 125,275 Z", lakeAt: [169, 301],
    trees: [[110, 170], [134, 186], [175, 380], [199, 396], [140, 420], [300, 500], [10, 500], [300, 300]],
    north: [312, 64],
    top: 34
  }
};

/* The trail stops the reader has opened. */
const seen = new Set();

function drawMap(M) {
  const W = shared.map, picked = !!st.trail;
  const kindOf = key => key === "care" ? shared.care : (trails[st.trail] || Object.values(trails)[0])[key];
  const line = (d, color, dashed) => `<path d="${d}" fill="none" style="stroke:${color}" stroke-width="${dashed ? 5 : 6}" stroke-linecap="round"${dashed ? ' stroke-dasharray="2 11"' : ""}/>`;
  const rest = d => d.replace(/^M[\d.,]+/, "");
  const trail = picked
    ? line(M.path.home, "var(--park)", true) + line(M.path.start, "var(--park)") + line(M.path.trail, "var(--trail)") + line(M.path.after, "var(--board)", true)
    : line(`${M.path.start} ${rest(M.path.trail)} ${rest(M.path.after)} ${rest(M.path.home)}`, "#64748B", true);
  const stops = TRAIL_ORDER.map((key, i) => {
    const [x, y] = M.stops[i];
    const stroke = picked ? "var(--trail)" : "#64748B", textC = picked ? "var(--trail-text)" : "#475569";
    const shape = kindOf(key).exhibit === "rest"
      ? `<circle cx="${x}" cy="${y}" r="15" style="fill:#fff;stroke:${stroke}" stroke-width="4"/>`
      : `<rect x="${x - 13}" y="${y - 15}" width="26" height="30" rx="4" style="fill:#fff;stroke:${stroke}" stroke-width="4"/>`;
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
  const [nx, ny] = M.north;
  return `<svg class="map-${M === MAPS.wide ? "wide" : "tall"}" viewBox="0 ${M.top} ${M.w} ${M.h - M.top}" focusable="false">
    <path d="${M.lake}" class="map-lake"/><text x="${M.lakeAt[0]}" y="${M.lakeAt[1]}" class="map-lake-name" text-anchor="middle">${fmt(W.lake)}</text>
    ${M.trees.map(([x, y]) => `<use href="#i-tree" x="${x}" y="${y}" width="20" height="22"/>`).join("")}
    ${trail}${stops}${places}
    <circle cx="${nx}" cy="${ny}" r="18" class="map-north"/><path d="M${nx},${ny - 13} L${nx + 6},${ny + 5} L${nx},${ny + 1} L${nx - 6},${ny + 5} Z" style="fill:var(--text-secondary)"/>
    <text x="${nx}" y="${ny + 34}" class="map-n" text-anchor="middle">${fmt(W.north)}</text></svg>`;
}

/* The route strip: the map's key, a plain list of the five places and
   what happens at each. Getting around is the progress bar's job. */
function routeStrip() {
  return Object.entries(P).map(([key, pl]) =>
    `<li class="route-${key}"><div class="route-place">
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
  bar.hidden = !t || now === "trailhead";
  if (bar.hidden) return;
  const PR = shared.progress, built = st.visited.length, keptN = kept().length;
  const opened = TRAIL_ORDER.filter(k => seen.has(k)).length;
  bar.innerHTML = `<ol>${PLACES_IN_ORDER.map(key => {
    const pl = P[key], ready = key === "bulletin" || key === "guide" ? built > 0 : true;
    const extra = key === "trail"
      ? `<span class="prog-dots" aria-hidden="true">${TRAIL_ORDER.map(k => `<i${seen.has(k) ? ' class="done"' : ""}></i>`).join("")}</span><span class="vh">, ${fmt(PR.stops.replace("{n}", opened).replace("{total}", TRAIL_ORDER.length))}</span>`
      : key === "lodge" && built ? `<span class="prog-count" aria-hidden="true">${built}</span><span class="vh">, ${fmt(shared.lodge.visitedCount.replace("{n}", built))}</span>`
      : key === "guide" && keptN ? `<span class="prog-count" aria-hidden="true">${keptN}</span><span class="vh">, ${fmt(PR.topics.replace("{n}", keptN))}</span>` : "";
    return `<li><button type="button" class="prog-btn prog-${key}" data-go="place-${key}"${key === now ? ' aria-current="location"' : ""}${ready ? "" : " disabled"}>
      <span class="prog-icon" aria-hidden="true">${icon(pl.icon)}</span><span class="prog-name">${fmt(pl.short || pl.name)}</span>${extra}</button></li>`;
  }).join("")}</ol>`;
}

/* Which place the reader is in: whichever crosses a line about a third
   of the way down the screen. Watched again after every redraw. */
const watcher = new IntersectionObserver(entries => {
  let changed = false;
  entries.forEach(e => { if (e.isIntersecting) { const at = e.target.id === "trailStops" ? "trail" : e.target.id; if (at !== now) { now = at; changed = true; } } });
  if (changed) drawProgress();
}, { rootMargin: "-30% 0px -65% 0px" });
function watchPlaces() {
  watcher.disconnect();
  ["trailhead", "trailStops", "lodge", "bulletin", "guide"].forEach(id => { const el = $(id); if (el) watcher.observe(el); });
}

function drawBearings() {
  $("parkMap").innerHTML = drawMap(MAPS.wide) + drawMap(MAPS.tall);
  $("route").innerHTML = routeStrip();
}

/* Where each progress bar button goes. */
const placeTarget = key => key === "trail" ? $("trailStops") : $(key);

/* One line on the whole journey. */
$("todo").innerHTML = `<p class="intro">${fmt(trailhead.intro)}</p>`;

/* "Want to finish later?": once a trail is picked, a button that opens
   the ways to save a link back to this spot. */
const S0 = shared.save;
$("note").innerHTML = `<p class="pace-q">${fmt(S0.pace)}
  <button type="button" class="pill-btn pill-all next-btn" data-go="saveOpen" aria-expanded="false" aria-controls="saveTop">${fmt(S0.paceButton)}</button></p>
  <div id="saveTop" hidden>${savePanel("saveLinkTop")}</div>`;
$("footnote").textContent = trailhead.footnote;

$("trailheadMarker").innerHTML = icon(P.trailhead.icon);
$("trailheadSign").outerHTML = sign(P.trailhead);

/* "Get your bearings": the promise that the trail is open to everyone,
   the map, then its key (the places, the two kinds of stops) and the
   story, always in sight. */
const B = trailhead.board;
$("board").setAttribute("aria-label", TITLES.how);
$("board").innerHTML = `<p class="open-all">${fmt(B.open)}</p>
  ${renderBlocks(B.blocks, ctx)}
  <p class="story-intro">${fmt(B.storyIntro)}</p>
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

/* "Find your trail": three everyday questions that point to the trails a
   reader already walks. Nothing is stored or sent. The answers live only
   on the page, and the reader still picks the trail. */
const F = trailhead.pick.finder;
const joinAnd = xs => xs.length < 3 ? xs.join(" and ") : `${xs.slice(0, -1).join(", ")}, and ${xs[xs.length - 1]}`;
$("pickHelp").innerHTML = `<details class="mini finder"><summary>${fmt(F.open)}</summary>
  <div class="finder-body"><p class="finder-intro">${fmt(F.intro)}</p>
  ${F.moments.map((m, i) => `<fieldset class="finder-q"><legend>${fmt(m.ask)}</legend>
    ${m.options.map(([key, text], j) => `<label class="finder-a"><input type="checkbox" data-finder="${key}" id="finder-${i}-${j}"><span>${fmt(text)}</span></label>`).join("")}
  </fieldset>`).join("")}
  <div class="finder-out" id="finderOut" aria-live="polite"></div></div></details>`;

function renderFinder() {
  const counts = {};
  document.querySelectorAll("[data-finder]:checked").forEach(b => { counts[b.dataset.finder] = (counts[b.dataset.finder] || 0) + 1; });
  const most = Math.max(0, ...Object.values(counts));
  const out = $("finderOut");
  if (!most) { out.innerHTML = ""; return; }
  const top = COLOR_KEYS.filter(k => counts[k] === most);
  out.innerHTML = `<p class="finder-result">${fmt(F.lead)}</p>
    <p>${fmt(F.result.replace("{list}", joinAnd(top.map(k => getColor(k).action))))} ${fmt(F.praise)} ${fmt(F.start)}</p>
    <ul class="finder-go-list">${top.map(key => { const c = getColor(key);
      return `<li><button type="button" class="finder-go" data-trail="${key}">
        <span class="blaze" style="background:var(${cssVar(key)})" aria-hidden="true"></span>
        <span><span class="oname">${c.action} <span class="tcolor">· ${key}</span></span>
        <span class="finder-go-label">${fmt(F.go)} &rarr;</span></span></button></li>`; }).join("")}</ul>
    <p class="finder-after">${fmt(F.after)}</p>`;
}
$("pickHelp").addEventListener("change", e => { if (e.target.matches("[data-finder]")) renderFinder(); });

/* ---------- Pieces ---------- */

/* "Save your spot." The link is the trail's own address with the trail
   and the exhibits visited after a #: #green-water,food, and nothing
   else. Browsers never send the part after # to any server, so no one
   but the reader sees it. Older ?spot= links still open (see the end). */
const spot = () => st.trail ? st.trail.toLowerCase() + (st.visited.length ? "-" + st.visited.join(",") : "") : "";
/* The page's own address: climatecolor.com/trail/. */
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

/* The picked row in the trail picker carries the "Your trail" tag. */
function renderTrail() {
  document.querySelectorAll("[data-trail].opt").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.trail === st.trail)));
  const stops = $("trailStops");
  if (!st.trail) { stops.innerHTML = ""; return; }
  const t = trails[st.trail], c = getColor(st.trail), TT = shared.trailTop;
  /* Stop 1 ends with the trail's "Try it now": something to do in the
     first minute. The Field Guide keeps it too. */
  const tryNow = t.tryIt.blocks.filter(b => b.stretch).map(b =>
    ({ stretch: { ...b.stretch, title: `${TITLES.tryIt}: ${b.stretch.title.charAt(0).toLowerCase()}${b.stretch.title.slice(1)}` } }));
  const stopFor = key => key === "care" ? { ...shared.care, ahead: fill(shared.care.ahead, c) }
    : key === "know" ? { ...t.know, blocks: [...t.know.blocks, ...tryNow] } : t[key];
  /* The top of the trail: its marker, name, and what it's about. */
  const top = `<li class="stop place is-trail" id="trailTop">
    <span class="marker" aria-hidden="true">${icon(P.trail.icon)}</span>
    <div class="place-sign"><div class="text"><h2 class="place-title">${fmt(fill(TT.title, c))}</h2><p class="place-sub">${fmt(fill(TT.line, c))}</p></div></div></li>`;
  let n = 1;
  stops.innerHTML = top + TRAIL_ORDER.map(key =>
    renderStop({ n: n++, key, title: TITLES[key], stop: stopFor(key), ctx })).join("");
}

/* ---------- The Lodge, the Field Guide, and the Bulletin Board ---------- */

/* "You opened 3 of 4 stops": kept current as stops are opened. */
function tripTrailLine() {
  const B = shared.bulletin.board, opened = TRAIL_ORDER.filter(k => seen.has(k)).length;
  return (opened ? B.trailOpened : B.trailAll).replace("{n}", opened).replace("{total}", TRAIL_ORDER.length);
}
/* The feedback email: the reader's answers, their trail, and the
   exhibits they visited, as plain text. Empty answers are left out. */
const fb = {};
function feedbackText() {
  const FB = shared.bulletin.board.feedback, M = FB.mail, c = st.trail && getColor(st.trail);
  const lines = [M.intro, ""];
  if (c) lines.push(`${M.trail}: ${c.key} (${c.action})`);
  if (st.visited.length) lines.push(`${M.exhibits}: ${st.visited.map(k => topicOf(k).name).join(", ")}`);
  FB.questions.forEach(q => { if (fb[q.key]) lines.push(`${q.ask} ${fb[q.key]}`); });
  if (fb.comment && fb.comment.trim()) lines.push("", `${M.comment}:`, fb.comment.trim());
  return lines.join("\n");
}
const feedbackMail = () => {
  const FB = shared.bulletin.board.feedback;
  return `mailto:${FB.to}?subject=${encodeURIComponent(FB.subject)}&body=${encodeURIComponent(feedbackText())}`;
};
function feedbackChanged(el) {
  fb[el.dataset.fb] = el.value;
  const a = $("fbSend"); if (a) a.href = feedbackMail();
}

/* The first step from each topic visited: gathered at the end of the
   Field Guide, where the reader picks one to start with (when there's
   more than one), and shown again on the Bulletin Board. Topics left out
   of the Field Guide are hidden, never removed, so nothing redraws. */
function stepsSection(c, built) {
  const S = shared.guide.steps, picking = built.length > 1;
  const chosen = picking ? store.get(startKey()) : "";
  const order = chosen ? [...built].sort((a, b) => (b === chosen) - (a === chosen)) : built;
  const item = k => {
    const text = `<span class="first-icon" aria-hidden="true">${icon(topicOf(k).icon)}</span><span><b>${fmt(topicOf(k).name)}:</b> ${fmt(exhibits[k].work[c.key].first)}<span class="start-tag">${fmt(S.start)}</span></span>`;
    return `<li data-topic="${k}"${k === chosen ? ' class="is-start"' : ""}${st.dropped.has(k) ? " hidden" : ""}>${picking
      ? `<label class="first-pick"><input type="radio" name="firstStart" value="${k}"${k === chosen ? " checked" : ""}><span class="vh">${fmt(S.startHere)}: </span>${text}</label>`
      : text}</li>`;
  };
  return `<section class="guide-topic guide-steps" aria-labelledby="stepsTitle">
    <h3 class="guide-h" id="stepsTitle">${fmt(picking ? S.title : S.titleOne)}</h3>
    ${picking ? `<p class="first-hint">${fmt(S.pickOne)}</p>` : ""}
    <ul class="first-list" id="firstList"${picking ? ` role="radiogroup" aria-label="${fmt(S.title)}"` : ""}>${order.map(item).join("")}</ul></section>`;
}

/* The Bulletin Board's echo of that choice: the one picked, or every
   first step with a note when none is picked yet. */
function boardStep(c) {
  const B = shared.bulletin.board, ks = kept();
  if (!ks.length) return "";
  const chosen = ks.length > 1 ? store.get(startKey()) : "";
  const show = chosen && ks.includes(chosen) ? [chosen] : ks;
  return `<p class="board-step-h"><b>${fmt(show.length > 1 ? B.stepMany : B.step)}</b></p>
    <ul class="first-list">${show.map(k => `<li><span class="first-icon" aria-hidden="true">${icon(topicOf(k).icon)}</span><span><b>${fmt(topicOf(k).name)}:</b> ${fmt(exhibits[k].work[c.key].first)}</span></li>`).join("")}</ul>
    ${show.length > 1 ? `<p class="first-hint">${fmt(B.stepPick)}</p>` : ""}`;
}
const refreshBoardStep = () => { const el = $("boardStep"); if (el && st.trail) el.innerHTML = boardStep(getColor(st.trail)); };

/* The Bulletin Board: a short goodbye, back beside the Trailhead. The
   loop just finished; your way of helping and your first step; one short
   list of things to do before you go; a way to tell us how it went; the
   trail's closing words; and the way back to the start. Choosing happens
   in the Field Guide, so nothing new is asked here. */
function boardBody(c, built, farewell) {
  const J = shared.bulletin, B = J.board, kept = built.filter(k => !st.dropped.has(k));
  const names = list => list.length === 1 ? exhibitName(topicOf(list[0])) : `${listOf(list.map(k => topicOf(k).name))} Exhibits`;
  const did = {
    trailhead: fill(B.trailhead, c),
    trail: tripTrailLine(),
    lodge: B.lodge.replace("{exhibits}", names(built)),
    guide: (kept.length === 1 ? B.guideOne : B.guideMany).replace("{n}", kept.length),
    bulletin: B.here
  };
  /* The same park map as the Trailhead, now in the reader's trail color:
     the whole loop, closed, ending back at the start. */
  const trip = `<section class="trip" aria-labelledby="tripTitle"><h3 class="board-h" id="tripTitle">${fmt(B.trip)}</h3>
    <div class="park-map trip-map" aria-hidden="true">${drawMap(MAPS.wide) + drawMap(MAPS.tall)}</div>
    <ol class="trip-steps">${PLACES_IN_ORDER.map(key => `<li class="trip-${key}${key === "bulletin" ? " is-here" : ""}">
      <span class="trip-icon" aria-hidden="true">${icon(P[key].icon)}</span>
      <span><b>${fmt(P[key].name)}</b><span class="trip-did">${fmt(did[key])}</span></span>
      ${key === "bulletin" ? "" : `<span class="trip-check" aria-hidden="true">${icon("i-check")}</span>`}</li>`).join("")}</ol></section>`;
  const way = `<article class="pin pin-way"><h3>${fmt(B.way)}</h3>
    <p class="way-you"><span class="blaze" style="background:var(--trail)" aria-hidden="true"></span>${fmt(B.you.replace("{a}", aAn(c.archetype)).replace("{archetype}", c.archetype))}</p>
    <p>${fmt(cap(trailhead.ways[c.key]))}.</p>
    <div class="board-step" id="boardStep">${boardStep(c)}</div></article>`;
  /* "Before you go": print, save, pass it on, or try another trail. Each
     one opens only when chosen, so the list stays short. */
  const msg = fill(B.pass.message, c).replace("{url}", home);
  const canShare = typeof navigator.share === "function";
  const others = COLOR_KEYS.filter(k => k !== c.key).map(k => getColor(k));
  const item = (label, body) => `<details class="mini before-item"><summary>${fmt(label)}</summary><div class="before-body">${body}</div></details>`;
  const before = `<article class="pin pin-before"><h3>${fmt(B.before.title)}</h3>
    <p class="before-print"><button type="button" class="save-btn" data-go="printGuide">${fmt(shared.guide.print)}</button></p>
    ${item(B.before.save, savePanel("saveEnd"))}
    ${item(B.before.pass, `<p>${fmt(B.pass.text)}</p><blockquote class="pass-msg">${fmt(msg)}</blockquote>
      <div class="save-row">${canShare ? `<button type="button" class="save-btn" data-go="passShare">${fmt(shared.save.share)}</button>` : ""}
        <a class="save-btn" href="mailto:?subject=${encodeURIComponent(B.pass.subject)}&body=${encodeURIComponent(msg)}">${fmt(B.pass.email)}</a>
        <button type="button" class="save-btn" data-go="passCopy">${fmt(shared.save.copy)}</button></div>`)}
    ${item(B.before.other, `<p>${fmt(J.trail.hint)}</p>
      <div class="try-trails">${others.map(o => `<button type="button" class="try-trail" data-trail="${o.key}"><span class="blaze" style="background:var(--${o.key.toLowerCase()}-color)" aria-hidden="true"></span>${fmt(o.action)} <span class="tcolor">· ${o.key}</span></button>`).join("")}</div>`)}
  </article>`;
  /* "Help make the trail better": the answers live in `fb`, so they
     survive the board being drawn again. */
  const FB = B.feedback;
  const feedback = FB ? `<article class="pin pin-feedback"><h3>${fmt(FB.title)}</h3><p>${fmt(FB.text)}</p>
    ${FB.questions.map(q => `<fieldset class="fb-q"><legend>${fmt(q.ask)}</legend><div class="fb-opts">
      ${q.options.map(o => `<label class="fb-opt"><input type="radio" name="fb-${q.key}" value="${fmt(o)}" data-fb="${q.key}"${fb[q.key] === o ? " checked" : ""}><span>${fmt(o)}</span></label>`).join("")}
    </div></fieldset>`).join("")}
    <label class="fb-label" for="fbComment">${fmt(FB.comment)}</label>
    <textarea id="fbComment" class="fb-comment" data-fb="comment" rows="3" maxlength="1200">${(fb.comment || "").replace(/&/g, "&amp;").replace(/</g, "&lt;")}</textarea>
    <p class="fb-includes">${fmt(FB.includes)}</p>
    <div class="save-row"><a class="save-btn" id="fbSend" href="${feedbackMail()}">${fmt(FB.send)}</a>
      <button type="button" class="save-btn" data-go="fbCopy">${fmt(FB.copy)}</button></div>
    <p class="fb-privacy">${fmt(FB.privacy.replace("{to}", FB.to))}</p></article>` : "";
  /* The last thing on the page: back to where the loop began. */
  const homeRow = `<p class="home-row"><button type="button" class="pill-btn pill-all next-btn" data-go="place-trailhead">${fmt(B.home)}</button> <span class="reach">${fmt(B.homeHint)}</span></p>`;
  return `<p class="board-lede">${fmt(B.lede)}</p>${trip}
    <div class="pins">${way}${before}${feedback}
      <article class="pin pin-words"><h3>${fmt(B.words)}</h3>${farewell}</article></div>
    ${homeRow}`;
}

/* An exhibit's parts, then "Put your [action] to work": where the reader's
   trail meets the topic, written for each trail. */
const aAn = w => /^[AEIOU]/.test(w) ? "an" : "a";
function exhibitParts(E, c, tp) {
  const W = shared.work, Wk = E.work[c.key];
  const line = fill(W.line, c, tp).replace("{a}", aAn(c.archetype));
  const parts = EXHIBIT_ORDER.map(k => [k, k === "life" ? { ...E.parts[k], ahead: line } : E.parts[k]]);
  parts.push(["work", { exhibit: "sign", title: fill(TITLES.work, c), line, ahead: W.ahead, blocks: [
    { sub: W.imagine }, { p: E.situation },
    { list: c.words.map(w => `**${w.word}:** ${Wk[w.word]}`) },
    { p: `**${W.first}** ${Wk.first}` },
    { p: W.added }
  ] }]);
  return parts;
}

function renderLodge() {
  const line = $("lodgeLine");
  if (!st.trail) { line.innerHTML = ""; return; }
  const t = trails[st.trail], c = getColor(st.trail), L = shared.lodge;
  const tp = topicOf(st.exhibit), E = exhibits[st.exhibit];
  const visitedMark = `<span class="visited">${icon("i-check")}${fmt(L.visited)}</span>`;

  /* The exhibit picker: a card for each topic. Readers can visit as many
     as they like; each one visited says so. */
  const opts = topics.topics.map(x => `<li><button type="button" class="opt${st.visited.includes(x.key) ? " is-visited" : ""}" data-exhibit="${x.key}" aria-pressed="${st.exhibit === x.key}">
    <span class="opt-icon" aria-hidden="true">${icon(x.icon)}</span>${st.exhibit === x.key ? `<span class="here" aria-hidden="true">${fmt(shared.map.here)}</span>` : ""}
    <span><span class="oname">${fmt(x.name)}</span><span class="odesc">${examples(x)}</span>${st.visited.includes(x.key) && st.exhibit !== x.key ? visitedMark : ""}</span></button></li>`).join("");

  /* The open exhibit: a room in the Lodge, with its own sign (its name
     and what it covers), a one-line promise, then its parts. */
  const open = tp ? `<section class="exhibit-open" id="exhibitOpen" aria-label="${fmt(exhibitName(tp))}">
    <div class="room-sign"><div class="text"><p class="room-title">${fmt(exhibitName(tp))}</p>
      <p class="place-sub">${examples(tp)}</p></div>${icon(tp.icon, "place-icon")}</div>
    <div class="room-body"><p class="promise">${fmt(E.promise)}</p>${panel(exhibitParts(E, c, tp))}</div></section>` : "";

  const built = st.visited;

  /* The Lodge: a building of its own, like the park map and the Field
     Guide. The exhibit cards are its rooms, a floor plan you can click:
     in from the trail at the top, out to the Bulletin Board at the
     bottom. The door signs are only a picture; screen readers skip them. */
  const lodge = `<li class="stop place is-lodge" id="lodge">
  <span class="marker" aria-hidden="true">${icon(P.lodge.icon)}</span>
  ${sign(P.lodge)}
  <div class="lodge-card">
    <div class="place-board"><div class="reality">${panel([["reality", shared.reality]])}</div><h3 class="board-h">${TITLES.pickExhibit}</h3>
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
  const keep = kept();
  const names = listOf(keep.map(k => topicOf(k).name));
  const many = { name: names };
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
        { questions: [...G.first.questions, ...X.first.questions] },
        { questions: [...G.first.friend, ...X.first.friend], title: "With a friend" }
      ] }
    };
  };
  const partList = (order, parts) => order.map(k => [k, { ...parts[k], ahead: A[k], line: G.lines[k] || parts[k].line }]);
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
  /* The booklet you take with you: between the Lodge and the Bulletin
     Board, beside the trail line. Its cover names the trail and the topics kept, with one
     line on how to use it and Print right there. */
  const guide = `<li class="stop is-guide" id="guide">
    <span class="marker" aria-hidden="true">${icon(PG.icon)}</span>
    <div class="place-sign guide-sign"><div class="text"><h2 class="place-title">${fmt(PG.title)}</h2>
      <p class="place-sub">${fmt(G.cover)}</p></div></div>
    <div class="guide-card">
      <div class="guide-body">
        ${printRow}
        <p class="guide-safety">${fmt(G.safety)}</p>
        ${door}
        <section class="guide-topic" aria-label="${fmt(fill(G.forTrail, c))}">
          <h3 class="guide-h"><span class="guide-h-blaze" style="background:var(--${c.key.toLowerCase()}-color)" aria-hidden="true"></span>${fmt(fill(G.forTrail, c))}</h3>
          ${panel(partList(GUIDE_TRAIL, trailParts))}</section>
        ${topicPages}
        ${stepsSection(c, built)}
        ${printRow}
      </div></div></li>`;

  /* The Bulletin Board: the end of the loop, back beside the Trailhead. */
  const farewell = [...t.farewell, ...shared.bulletin.close].map(p => `<p>${fmt(p.replace("{topic}", (names || tp.name).toLowerCase()))}</p>`).join("");
  const bulletin = place("bulletin", "is-board", boardBody(c, built, farewell));

  line.innerHTML = lodge + guide + bulletin;
  const lead = document.querySelector('#guide [data-stop="others"] .body p');
  if (lead) lead.id = "othersLead";
}

/* The Field Guide's "other ways" lead names the topics kept: "How the
   other ways of helping fit with Water and Food." */
function refreshGuideNames() {
  const n = listOf(kept().map(k => topicOf(k).name));
  if (n) $("othersLead").textContent = fill(shared.guide.others.lead, getColor(st.trail), { name: n });
}

/* The trail line, markers, and "your trail" touches take the picked
   trail's color, from the shared tokens in core/atlas.css. Text on that
   color follows each color's `label` in the shared core, so Yellow and
   Orange get dark numbers. With no trail picked, trail.css's green
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

/* After a stop opens: the progress bar's dots and the Bulletin Board's
   "You opened 3 of 4 stops." */
function stopOpened() {
  drawProgress();
  const line = document.querySelector(".trip-trail .trip-did");
  if (line) line.textContent = tripTrailLine();
}

/* ---------- Events (one listener each, so re-rendered parts just work) ---------- */

/* Smooth scrolling, unless the device asks for less motion. */
const motion = () => matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
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
    st.trail = b.dataset.trail; seen.clear(); render();
    /* Bring stop 1 into view, keeping the picked row in sight where the
       screen allows. */
    $("trailStops").scrollIntoView({ behavior: motion(), block: "nearest" });
    return;
  }
  if (b.dataset.exhibit) {
    st.exhibit = b.dataset.exhibit;
    if (!st.visited.includes(st.exhibit)) st.visited.push(st.exhibit);
    render(false); go($("exhibitOpen")); return;
  }
  if (b.classList.contains("find-btn")) {
    const r = $(b.getAttribute("aria-controls")); r.hidden = !r.hidden;
    b.setAttribute("aria-expanded", String(!r.hidden)); return;
  }
  const to = b.dataset.go;
  if (to && to.startsWith("place-")) { go(placeTarget(to.slice(6))); return; }
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
  if (to === "fbCopy") { const FB = shared.bulletin.board.feedback; copyText(`${FB.to}\n\n${feedbackText()}`, b, FB.copy); }
});

/* The Lodge door: a topic left unchecked stays out of the Field Guide. */
document.addEventListener("change", e => {
  if (e.target.dataset && e.target.dataset.fb) { feedbackChanged(e.target); return; }
  /* "Your first steps": the one picked moves to the top. */
  if (e.target.name === "firstStart") {
    store.set(startKey(), e.target.value);
    const list = $("firstList"), li = e.target.closest("li");
    list.querySelectorAll("li").forEach(x => x.classList.toggle("is-start", x === li));
    list.prepend(li); e.target.focus();
    refreshBoardStep();
    return;
  }
  const k = e.target.dataset && e.target.dataset.keep;
  if (!k) return;
  if (e.target.checked) st.dropped.delete(k); else st.dropped.add(k);
  document.querySelectorAll(`.guide-topic[data-topic="${k}"]`).forEach(s => { s.hidden = !e.target.checked; });
  document.querySelectorAll(`#firstList li[data-topic="${k}"]`).forEach(li => { li.hidden = !e.target.checked; });
  refreshBoardStep();
  refreshGuideNames();
});

/* Notes save as you type, on this device only. */
document.addEventListener("input", e => {
  if (e.target.matches("textarea.note")) store.set(e.target.dataset.note, e.target.value);
  if (e.target.matches("textarea.fb-comment")) feedbackChanged(e.target);
});

/* A stop's marker fills in only while it's open. Opening a trail stop
   fills its dot on the progress bar. */
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
  if (s) { seen.add(s.dataset.stop); stopOpened(); }
}, true);

/* Direct links: ?spot=green-water,food, or #green-water,food. The last
   exhibit listed opens. Links saved before the Lodge's topics changed
   still work: each old key opens the exhibit that took it in. */
const OLD_KEYS = { wildlife: "land", waste: "goods", shelter: "housing" };
const [hTrail, hExhibits = ""] = (new URLSearchParams(location.search).get("spot") || location.hash.slice(1)).split("-");
const k = COLOR_KEYS.find(key => key.toLowerCase() === (hTrail || "").toLowerCase());
if (k) {
  st.trail = k;
  st.visited = [...new Set(hExhibits.split(",").map(s => s.trim().toLowerCase()).map(s => OLD_KEYS[s] || s).filter(topicOf))];
  if (st.visited.length) st.exhibit = st.visited[st.visited.length - 1];
}
render();
/* Drawn: show the page (index.html starts with class="loading", which
   hides the empty frames so they don't flash before this point). */
document.documentElement.classList.remove("loading");
if (k) go(st.exhibit ? $("exhibitOpen") : $("trailStops"));

/* Printing the page opens every stop, so the printout carries it all. */
window.addEventListener("beforeprint", () => document.querySelectorAll("details").forEach(d => { d.open = true; }));
