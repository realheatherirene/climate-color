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

import { COLOR_KEYS, getColor, cssVar, colorValue } from "climate-color/climate-color.js";
import { renderSiteFoot } from "climate-color/site-foot.js";
import { TITLES, TRAIL_ORDER, EXHIBIT_ORDER, BACK_ORDER } from "./titles.js";
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
const noteKey = key => [st.trail, key === "fit" || key === "place" ? "" : (st.noteEx || st.exhibit), key].filter(Boolean).join(":").toLowerCase();
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
const sign = pl => `<div class="place-sign"><div class="text"><h2 class="place-title">${fmt(pl.title)}</h2>${pl.stop ? `<p class="place-eyebrow">${fmt(pl.stop)}</p>` : ""}
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
   to the feedback section above the footer. Remove `preview` from the
   content pack to take the tag away. */
const SB = shared.site, PV = SB.preview;
const byLine = fmt(SB.by).replace("{owner}", `<a href="${SB.owner.url}">${fmt(SB.owner.name)}</a>`);
$("by").innerHTML = `${byLine}${PV ? ` <a class="preview-tag" href="#feedback">${fmt(PV.tag)}</a>` : ""}`;
/* The feedback section sits between the trail and the footer (see
   renderFeedback); the "Preview" tag jumps to it. */
renderSiteFoot($("siteFoot"));

document.title = trailhead.title;
$("title").textContent = trailhead.title;
$("lede").textContent = trailhead.lede;

/* ---------- The park map and its key: getting your bearings ---------- */
/* A small park-style map in the Visitor Center, drawn the way a state
   park map is: woods, a lake, a north arrow, and one loop trail. The loop
   leaves the Visitor Center's yard at the Trailhead sign, passes stops 1
   to 4, reaches the Climate Pavilion (stop 5) at its far end, and comes
   back past stops 6 to 8 to the Visitor Center, where it began. Arrows
   show the one way to go. The places are made up: it shows the journey,
   not real ground. It is a picture only (screen readers skip it); the
   key under it says the same in words. Two drawings: wide for computers,
   tall for phones (trail.css shows one). Names and icons come from
   shared.places, and stop shapes from the stops themselves. */
const MAPS = {
  wide: {
    w: 760, h: 380,
    /* The Visitor Center, and the Trailhead sign at the edge of its yard. */
    center: [288, 307], start: [233, 295],
    /* Stops 1 to 8, evenly spaced; the fifth is the Climate Pavilion. */
    stops: [[149, 258], [117, 136], [250, 75], [398, 67], [544, 95], [660, 180], [581, 289], [437, 318]],
    /* where each name sits: [dx, dy, text-anchor] */
    label: { center: [-18, 54, "middle"], start: [-20, 5, "end"], lodge: [0, 48, "middle"] },
    path: {
      /* Out of the yard, past the Trailhead sign, to stop 1. */
      start: "M288,307 C278,305 268,303 257,301 C247,299 237,296 228,293 C218,290 209,287 199,283 C190,280 181,276 173,272 C164,268 156,263 149,258",
      /* Stops 1 to 8. */
      trail: "M149,258 C142,254 135,249 129,244 C123,238 117,233 113,227 C108,222 105,216 102,210 C99,204 97,197 97,191 C96,185 96,178 97,172 C98,166 101,160 104,154 C107,148 111,142 117,136 C122,130 128,124 135,119 C142,114 150,109 159,105 C167,100 177,96 187,92 C196,88 207,85 217,82 C228,79 239,77 250,75 C262,72 275,71 287,69 C300,68 312,67 325,66 C337,66 349,66 362,66 C374,66 386,67 398,67 C408,68 418,69 429,70 C439,71 449,73 458,74 C468,76 478,78 488,80 C497,82 507,84 516,86 C526,89 535,92 544,95 C553,98 562,101 571,105 C579,108 588,112 595,116 C603,121 611,125 618,130 C625,135 631,140 636,145 C642,150 647,156 651,162 C655,168 658,174 660,180 C663,186 664,193 664,200 C664,207 663,214 661,220 C658,227 655,234 650,240 C645,246 640,252 633,258 C626,264 618,270 610,275 C601,280 591,284 581,289 C571,293 559,297 548,300 C536,304 524,307 512,309 C499,311 487,313 474,315 C462,316 449,317 437,318",
      /* From stop 8 back into the yard. */
      home: "M437,318 C424,318 411,318 398,318 C385,318 373,317 361,317 C348,316 336,314 324,313 C312,311 300,310 288,307"
    },
    /* One arrow on each stretch, pointing the way to go: [x, y, angle]. */
    arrows: [[190, 280, -157], [100, 204, -110], [179, 95, -23], [323, 66, -3], [472, 77, 10], [611, 126, 33], [643, 248, 132], [510, 309, 169], [362, 317, -176]],
    lake: "M325,165 C345,143 415,141 437,165 C455,185 441,221 397,225 C359,229 331,217 323,199 C317,187 317,175 325,165 Z", lakeAt: [381, 190],
    trees: [[225, 170], [249, 186], [205, 200], [480, 200], [502, 216], [20, 330], [44, 346], [700, 30], [724, 46], [690, 330], [714, 346]],
    north: [40, 48],
    top: 10
  },
  tall: {
    w: 340, h: 540,
    /* The Visitor Center, and the Trailhead sign at the edge of its yard. */
    center: [151, 96], start: [114, 112],
    /* Stops 1 to 8, evenly spaced; the fifth is the Climate Pavilion. */
    stops: [[79, 169], [62, 276], [77, 383], [130, 476], [225, 470], [264, 370], [265, 262], [233, 159]],
    /* where each name sits: [dx, dy, text-anchor] */
    label: { center: [-12, -42, "middle"], start: [-20, 5, "end"], lodge: [0, 48, "middle"] },
    path: {
      /* Out of the yard, past the Trailhead sign, to stop 1. */
      start: "M151,96 C147,96 142,97 138,98 C133,100 129,102 124,105 C120,107 116,111 112,115 C107,119 103,124 100,129 C96,135 92,141 89,147 C85,154 82,161 79,169",
      /* Stops 1 to 8. */
      trail: "M79,169 C76,177 74,185 72,193 C69,202 68,211 66,220 C65,229 63,238 63,247 C62,257 62,266 62,276 C61,285 62,295 63,304 C63,314 64,323 66,332 C67,341 68,350 70,358 C72,367 74,375 77,383 C79,390 81,397 84,403 C86,409 89,416 92,421 C94,427 97,433 100,438 C103,443 107,448 110,452 C113,457 116,461 120,465 C123,469 127,472 130,476 C134,479 137,482 141,484 C145,487 149,489 153,491 C156,492 160,494 164,495 C168,496 172,496 176,496 C181,496 185,496 189,495 C193,494 197,492 201,490 C205,488 209,485 213,482 C217,478 221,475 225,470 C229,465 234,458 238,451 C242,444 246,436 249,428 C252,420 255,410 258,401 C260,391 263,381 264,370 C266,362 267,353 267,343 C268,334 268,325 268,316 C268,307 268,298 268,289 C267,280 266,271 265,262 C264,254 262,246 261,238 C259,231 257,223 255,216 C253,209 251,202 249,195 C246,189 244,182 241,176 C238,170 235,165 233,159",
      /* From stop 8 back into the yard. */
      home: "M233,159 C229,154 226,148 223,143 C219,138 216,134 212,129 C209,125 205,121 201,118 C197,114 193,111 189,108 C185,105 181,103 177,101 C173,99 169,98 164,97 C160,96 156,96 151,96"
    },
    /* One arrow on each stretch, pointing the way to go: [x, y, angle]. */
    arrows: [[93, 139, 121], [66, 222, 99], [65, 330, 82], [97, 433, 61], [179, 496, -3], [251, 423, -70], [268, 316, -90], [253, 209, -107], [200, 116, -138]],
    lake: "M117,262 C132,238 192,238 207,264 C219,286 207,324 169,328 C137,332 117,314 113,294 C111,280 111,270 117,262 Z", lakeAt: [161, 288],
    trees: [[110, 190], [134, 206], [150, 370], [174, 386], [300, 520], [10, 505], [300, 300]],
    north: [312, 64],
    top: 34
  }
};

/* The trail stops the reader has opened, on the way out and the way back. */
const seen = new Set();

/* A stop's shape on the map: round for a rest stop, square for the rest. */
function stopKind(i) {
  if (i < 4) { const key = TRAIL_ORDER[i]; return key === "care" ? shared.care.exhibit : (trails[st.trail] || Object.values(trails)[0])[key].exhibit; }
  const key = BACK_ORDER[i - 5];
  return key === "story" ? "sign" : shared.back[key].exhibit;
}

function drawMap(M) {
  const W = shared.map, picked = !!st.trail;
  const line = (d, color, dashed) => `<path d="${d}" fill="none" style="stroke:${color}" stroke-width="${dashed ? 5 : 6}" stroke-linecap="round"${dashed ? ' stroke-dasharray="2 11"' : ""}/>`;
  const rest = d => d.replace(/^M[\d.,]+/, "");
  const trail = picked
    ? line(M.path.start, "var(--park)") + line(M.path.trail, "var(--trail)") + line(M.path.home, "var(--park)")
    : line(`${M.path.start} ${rest(M.path.trail)} ${rest(M.path.home)}`, "#64748B", true);
  /* One arrowhead, just past the Trailhead sign: the way to set out.
     The numbered stops show the order from there. */
  const [ax, ay, aa] = M.arrows[0];
  const arrows = `<path d="M-7,-8 L8,0 L-7,8 L-3,0 Z" transform="translate(${ax} ${ay}) rotate(${aa}) scale(1.35)" style="fill:#1F2937;stroke:#fff" stroke-width="1.6" stroke-linejoin="round"/>`;
  const stroke = picked ? "var(--trail)" : "#64748B", textC = picked ? "var(--trail-text)" : "#475569";
  const stops = M.stops.map(([x, y], i) => {
    if (i === 4) return "";
    const shape = stopKind(i) === "rest"
      ? `<circle cx="${x}" cy="${y}" r="15" style="fill:#fff;stroke:${stroke}" stroke-width="4"/>`
      : `<rect x="${x - 13}" y="${y - 15}" width="26" height="30" rx="4" style="fill:#fff;stroke:${stroke}" stroke-width="4"/>`;
    return `${shape}<text x="${x}" y="${y + 5}" class="map-num" text-anchor="middle" style="fill:${textC}">${i + 1}</text>`;
  }).join("");
  const name = ([x, y], [dx, dy, anchor], text, cls = "map-name") => `<text x="${x + dx}" y="${y + dy}" class="${cls}" text-anchor="${anchor}">${fmt(text)}</text>`;
  /* The Climate Pavilion, stop 5: the biggest marker on the map, with
     its number on a badge. */
  const [px, py] = M.stops[4];
  const pavilion = `<rect x="${px - 25}" y="${py - 25}" width="50" height="50" rx="10" style="fill:var(--map-lodge)"/>
    <use href="#${P.lodge.icon}" x="${px - 16}" y="${py - 16}" width="32" height="32" style="color:#fff"/>
    <circle cx="${px + 23}" cy="${py - 23}" r="11" style="fill:#fff;stroke:var(--map-lodge)" stroke-width="2.5"/>
    <text x="${px + 23}" y="${py - 18.5}" class="map-badge" text-anchor="middle">5</text>
    ${name(M.stops[4], M.label.lodge, P.lodge.name)}`;
  /* The Visitor Center in its yard, and the Trailhead sign at the yard's
     edge, where the trail sets out. */
  const [cx, cy] = M.center, [sx, sy] = M.start;
  const yard = `<ellipse cx="${(cx * 2 + sx) / 3}" cy="${(cy * 2 + sy) / 3}" rx="66" ry="38" class="map-yard"/>`;
  const center = `<rect x="${cx - 21}" y="${cy - 21}" width="42" height="42" rx="8" style="fill:var(--map-trailhead)"/>
    <use href="#${P.trailhead.icon}" x="${cx - 13}" y="${cy - 13}" width="26" height="26" style="color:#fff"/>
    ${name(M.center, M.label.center, P.trailhead.name)}`;
  const [sdx, sdy, sa] = M.label.start;
  const sign = `<rect x="${sx - 12}" y="${sy - 12}" width="24" height="24" rx="5" style="fill:var(--map-trailhead)"/>
    <use href="#${P.start.icon}" x="${sx - 8}" y="${sy - 8}" width="16" height="16" style="color:#fff"/>
    ${name(M.start, M.label.start, P.start.name)}
    <text x="${sx + sdx}" y="${sy + sdy + 16}" class="map-sub" text-anchor="${sa}">${fmt(W.startHere)}</text>`;
  /* The map is a picture for getting your bearings, not a tracker: the
     progress bar at the top of the screen shows where you are. */
  const [nx, ny] = M.north;
  return `<svg class="map-${M === MAPS.wide ? "wide" : "tall"}" viewBox="0 ${M.top} ${M.w} ${M.h - M.top}" focusable="false">
    <path d="${M.lake}" class="map-lake"/><text x="${M.lakeAt[0]}" y="${M.lakeAt[1]}" class="map-lake-name" text-anchor="middle">${fmt(W.lake)}</text>
    ${M.trees.map(([x, y]) => `<use href="#i-tree" x="${x}" y="${y}" width="20" height="22"/>`).join("")}
    ${yard}${trail}${arrows}${stops}${pavilion}${center}${sign}
    <circle cx="${nx}" cy="${ny}" r="18" class="map-north"/><path d="M${nx},${ny - 13} L${nx + 6},${ny + 5} L${nx},${ny + 1} L${nx - 6},${ny + 5} Z" style="fill:var(--text-secondary)"/>
    <text x="${nx}" y="${ny + 34}" class="map-n" text-anchor="middle">${fmt(W.north)}</text></svg>`;
}

/* The map's key: the Visitor Center, the Trailhead sign, the trail stops,
   and the Pavilion, each with what happens there. Getting around is the
   progress bar's job. */
const KEY_ORDER = ["trailhead", "start", "trail", "lodge"];
function routeStrip() {
  return KEY_ORDER.map(key => { const pl = P[key];
    return `<li class="route-${key}"><div class="route-place">
      <span class="route-icon" aria-hidden="true">${key === "trail" ? "1" : icon(pl.icon)}</span><span><b class="route-name">${fmt(pl.legendName || pl.name)}</b><span class="route-text">${fmt(pl.route)}</span></span></div></li>`; }).join("");
}

/* The progress bar: once a trail is picked and the reader is past the
   Visitor Center, a slim bar stays at the top of the screen. It shows the
   loop in order, from the Visitor Center back to the Visitor Center,
   marks where the reader is, fills a dot for each trail stop opened, and
   counts the exhibits visited. Each place is a button that goes there. */
const PLACES_IN_ORDER = ["trailhead", "trail", "lodge", "back", "finish"];
let now = "trailhead";
function drawProgress() {
  const bar = $("progress"), t = trails[st.trail];
  bar.hidden = !t || now === "trailhead";
  if (bar.hidden) return;
  const PR = shared.progress, built = st.visited.length;
  const dots = order => `<span class="prog-dots" aria-hidden="true">${order.map(k => `<i${seen.has(k) ? ' class="done"' : ""}></i>`).join("")}</span><span class="vh">, ${fmt(PR.stops.replace("{n}", order.filter(k => seen.has(k)).length).replace("{total}", order.length))}</span>`;
  bar.innerHTML = `<ol>${PLACES_IN_ORDER.map(key => {
    const pl = P[key];
    const extra = key === "trail" ? dots(TRAIL_ORDER) : key === "back" ? dots(BACK_ORDER)
      : key === "lodge" && built ? `<span class="prog-count" aria-hidden="true">${built}</span><span class="vh">, ${fmt(shared.lodge.visitedCount.replace("{n}", built))}</span>` : "";
    return `<li><button type="button" class="prog-btn prog-${key}" data-go="place-${key}"${key === now ? ' aria-current="location"' : ""}>
      <span class="prog-icon" aria-hidden="true">${icon(pl.icon)}</span><span class="prog-name">${fmt(pl.short || pl.name)}</span>${extra}</button></li>`;
  }).join("")}</ol>`;
}

/* Which place the reader is in: whichever crosses a line about a third
   of the way down the screen. Watched again after every redraw. */
const AT = { trailStops: "trail", backStops: "back" };
const watcher = new IntersectionObserver(entries => {
  let changed = false;
  entries.forEach(e => { if (e.isIntersecting) { const at = AT[e.target.id] || e.target.id; if (at !== now) { now = at; changed = true; } } });
  if (changed) drawProgress();
}, { rootMargin: "-30% 0px -65% 0px" });
function watchPlaces() {
  watcher.disconnect();
  ["trailhead", "trailStops", "lodge", "backStops", "finish"].forEach(id => { const el = $(id); if (el) watcher.observe(el); });
}

function drawBearings() {
  $("parkMap").innerHTML = drawMap(MAPS.wide) + drawMap(MAPS.tall);
  $("route").innerHTML = routeStrip();
}

/* Where each progress bar button goes. */
const placeTarget = key => key === "trail" ? $("trailStops") : key === "back" ? $("backStops") : $(key);

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
    <p>${fmt(F.result.replace("{list}", joinAnd(top.map(k => getColor(k).action))))} ${fmt(F.praise)}</p>
    <ul class="finder-go-list">${top.map(key => { const c = getColor(key);
      return `<li><button type="button" class="finder-go" data-trail="${key}">
        <span class="blaze" style="background:var(${cssVar(key)})" aria-hidden="true"></span>
        <span><span class="oname">${c.action} <span class="tcolor">· ${key}</span></span>
        <span class="finder-go-label">${fmt(F.go)} &rarr;</span></span></button></li>`; }).join("")}</ul>
    <p class="finder-after">${fmt(top.length > 1 ? F.afterMany : F.after)}</p>`;
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

/* ---------- The Climate Pavilion, the way back, and the return ---------- */

/* "You opened 3 of 4 stops": kept current as stops are opened. */
const openedLine = (order, some, none) => {
  const n = order.filter(k => seen.has(k)).length;
  return (n ? some : none).replace("{n}", n).replace("{total}", order.length);
};
const tripTrailLine = () => { const B = shared.bulletin.board; return openedLine(TRAIL_ORDER, B.trailOpened, B.trailAll); };
const tripBackLine = () => { const B = shared.bulletin.board; return openedLine(BACK_ORDER, B.backOpened, B.backAll); };
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

/* Stop 5, the Climate Pavilion: "Climate Change: Reality" at the door,
   then the exhibits. Its cards are its rooms, a floor plan you can click.
   The door signs are only a picture; screen readers skip them. */
function renderLodge() {
  const line = $("lodgeLine");
  if (!st.trail) { line.innerHTML = ""; return; }
  const c = getColor(st.trail), L = shared.lodge;
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

  line.innerHTML = `<li class="stop place is-lodge" id="lodge">
  <span class="marker" aria-hidden="true">${icon(P.lodge.icon)}</span>
  ${sign(P.lodge)}
  <div class="lodge-card">
    <div class="place-board"><div class="reality">${panel([["reality", shared.reality]])}</div><h3 class="board-h">${TITLES.pickExhibit}</h3>
      <p class="step-hint">${fmt(L.pickHint)}</p>
      <div class="floor"><ul class="options exhibits">${opts}</ul></div>
      ${open}</div></div></li>`;
}

/* ---------- The way back: stops 6 to 8 ---------- */

/* Stop 6 is the trail's own story; stops 7 and 8 are the same for every
   trail, and work for any topic and any number of exhibits. */
function renderBack() {
  const ol = $("backStops");
  if (!st.trail) { ol.innerHTML = ""; return; }
  const t = trails[st.trail], c = getColor(st.trail), K = shared.back;
  const filled = b => b.questions ? { ...b, questions: b.questions.map(q => fill(q, c)) } : b;
  const stopFor = key => key === "story" ? { ...t.story, ...K.story } : { ...K[key], blocks: K[key].blocks.map(filled) };
  const top = `<li class="stop place is-trail is-back" id="backTop">
    <span class="marker" aria-hidden="true">${icon(P.back.icon)}</span>
    <div class="place-sign"><div class="text"><h2 class="place-title">${fmt(P.back.title)}</h2><p class="place-sub">${fmt(P.back.sub)}</p></div></div></li>`;
  let n = TRAIL_ORDER.length + 2;
  ol.innerHTML = top + BACK_ORDER.map(key =>
    renderStop({ n: n++, key, title: TITLES[key], stop: stopFor(key), ctx })).join("");
}

/* ---------- Back at the Visitor Center ---------- */

/* The reader's own first step, written at the planning desk. Kept with
   their notes, on this device only. */
const ownKey = () => `${st.trail}:own`.toLowerCase();
/* The first steps to choose from: one from each exhibit visited. */
const firstOf = (c, k) => exhibits[k].work[c.key].first;

/* The plan's answers, kept with the reader's notes on this device. */
const planKey = key => `${st.trail}:plan:${key}`.toLowerCase();
const noteText = v => v ? v.replace(/&/g, "&amp;").replace(/</g, "&lt;") : "";

/* A pinned note on the Bulletin Board: every one the same, a title and
   what's under it. */
const pin = (cls, title, body, line = "") => `<article class="pin ${cls}"><h3>${fmt(title)}</h3>${line ? `<p class="pin-line">${line}</p>` : ""}${body}</article>`;

/* "Plan your first step": a walk-through, one small question at a time.
   Step 1 picks the step (from the exhibits visited, or the reader's own);
   the rest make it real. Every answer is optional. */
function planPin(c, built) {
  const Pl = shared.bulletin.board.plan, picking = built.length > 1;
  const chosen = picking ? store.get(startKey()) : "";
  const order = chosen ? [...built].sort((a, b) => (b === chosen) - (a === chosen)) : built;
  const item = k => {
    const text = `<span class="first-icon" aria-hidden="true">${icon(topicOf(k).icon)}</span><span><b>${fmt(topicOf(k).name)}:</b> ${fmt(firstOf(c, k))}<span class="start-tag">${fmt(Pl.start)}</span></span>`;
    return `<li data-topic="${k}"${k === chosen ? ' class="is-start"' : ""}>${picking
      ? `<label class="first-pick"><input type="radio" name="firstStart" value="${k}"${k === chosen ? " checked" : ""}><span class="vh">${fmt(Pl.startHere)}: </span>${text}</label>`
      : text}</li>`;
  };
  const field = (id, key, label, ph = "") => `<label class="vh" for="${id}">${fmt(label)}</label>
    <textarea id="${id}" class="note plan-field" data-note="${key}" rows="2"${ph ? ` placeholder="${fmt(ph)}"` : ""}>${noteText(store.get(key))}</textarea>`;
  const steps = Pl.steps.map((step, i) => `<li class="plan-step"><p class="plan-q"><b>${fmt(step.q)}</b> ${fmt(step.hint)}</p>
    ${i === 0
      ? `<ul class="first-list" id="firstList"${picking ? ` role="radiogroup" aria-label="${fmt(step.q)}"` : ""}>${order.map(item).join("")}</ul>
         <p class="plan-own">${fmt(Pl.own)}</p>${field("ownStep", ownKey(), Pl.own, Pl.ownPlaceholder)}`
      : field(`plan-${step.key}`, planKey(step.key), step.q)}</li>`).join("");
  return pin("pin-plan", Pl.title, `<ol class="plan-steps">${steps}</ol>
    <p class="pin-note">${fmt(Pl.saved)}</p>`);
}

/* "Near you": one note per exhibit visited, with every place to find help
   close to home for that topic. Directories first, then events. On the
   board there's no guessing: each one is simply listed. */
function nearPin(k) {
  const N = shared.bulletin.board.near, x = topicOf(k), blocks = exhibits[k].finder.blocks;
  const finds = blocks.filter(b => b.find && b.find.link).map(b => ({ verb: "Use", name: b.find.link.name, url: b.find.link.url, reach: b.find.link.reach, desc: b.find.reveal, when: b.find.link.when }));
  const all = [...blocks.filter(b => b.resources).flatMap(b => b.resources), ...finds];
  const now = all.filter(r => r.when !== "event"), later = all.filter(r => r.when === "event");
  const list = rs => renderBlocks([{ resources: rs }], ctx);
  return pin("pin-near", N.title, `<p>${fmt(blocks[0].p)}</p>${list(now)}${later.length ? `<p class="sub">${fmt(N.coming)}</p>${list(later)}` : ""}`,
    `${icon(x.icon)}${fmt(x.name)}`);
}

/* The Field Guide, on its own under the board: which topics go in, and
   every way to keep it, in one row. */
function takeSection(built) {
  const T = shared.bulletin.board.take, S = shared.save, G = shared.guide;
  const canShare = typeof navigator.share === "function";
  return `<section class="pin take" aria-labelledby="takeTitle">
    <h3 id="takeTitle"><span class="take-icon" aria-hidden="true">${icon("i-guide")}</span>${fmt(T.title)}</h3>
    <p>${fmt(T.text)}</p>
    <p class="door-q">${fmt(T.door)}</p>
    <ul class="door-list">${built.map(k => { const x = topicOf(k);
      return `<li><label class="door-pick"><input type="checkbox" data-keep="${k}"${st.dropped.has(k) ? "" : " checked"}>${icon(x.icon)}<span>${fmt(x.name)}</span></label></li>`; }).join("")}</ul>
    <div class="save-row take-row">
      <button type="button" class="save-btn" data-go="printGuide">${fmt(T.print)}</button>
      <button type="button" class="save-btn" data-go="downloadGuide">${fmt(T.download)}</button>
      <a class="save-btn save-email" href="#">${fmt(T.email)}</a>
      <button type="button" class="save-btn" data-go="copyLink">${fmt(T.copy)}</button>
      ${canShare ? `<button type="button" class="save-btn" data-go="share">${fmt(S.share)}</button>` : ""}</div>
    <p class="pin-note">${fmt(T.note)}</p>
    <p class="pin-note">${fmt(S.privacy)}</p>
    <p class="back-row"><button type="button" class="linkish" data-go="place-lodge">${fmt(G.back.label)}</button> <span class="reach">${fmt(G.back.hint)}</span></p>
  </section>`;
}

/* The return: the loop just finished, then the Bulletin Board, then the
   Field Guide. Before any exhibit, it points the way to the Pavilion. */
function finishBody(c, built) {
  const J = shared.bulletin, B = J.board, t = trails[st.trail], G = shared.guide;
  if (!built.length) return `<p class="board-lede">${fmt(B.empty)}</p>
    <p><button type="button" class="pill-btn pill-all next-btn" data-go="place-lodge">${fmt(B.emptyGo)}</button></p>`;
  const names = built.length === 1 ? exhibitName(topicOf(built[0])) : `${listOf(built.map(k => topicOf(k).name))} Exhibits`;
  const did = {
    trailhead: fill(B.trailhead, c),
    trail: tripTrailLine(),
    lodge: B.lodge.replace("{exhibits}", names),
    back: tripBackLine(),
    finish: B.here
  };
  /* The same park map as the start, now in the reader's trail color: the
     whole loop, back where it began, every place checked. */
  const trip = `<section class="trip" aria-labelledby="tripTitle"><h3 class="vh" id="tripTitle">${fmt(B.trip)}</h3>
    <div class="park-map trip-map" aria-hidden="true">${drawMap(MAPS.wide) + drawMap(MAPS.tall)}</div>
    <ol class="trip-steps">${PLACES_IN_ORDER.map(key => `<li class="trip-${key}${key === "finish" ? " is-here" : ""}">
      <span class="trip-icon" aria-hidden="true">${icon(P[key].icon)}</span>
      <span><b>${fmt(P[key].name)}</b><span class="vh">: ${fmt(did[key])}</span></span>
      <span class="trip-check" aria-hidden="true">${icon("i-check")}</span></li>`).join("")}</ol></section>`;
  /* Pass it on. */
  const msg = fill(B.pass.message, c).replace("{url}", home);
  const canShare = typeof navigator.share === "function";
  const pass = pin("pin-pass", B.pass.title, `<p>${fmt(B.pass.text)}</p><blockquote class="pass-msg">${fmt(msg)}</blockquote>
    <div class="save-row">${canShare ? `<button type="button" class="save-btn" data-go="passShare">${fmt(shared.save.share)}</button>` : ""}
      <a class="save-btn" href="mailto:?subject=${encodeURIComponent(B.pass.subject)}&body=${encodeURIComponent(msg)}">${fmt(B.pass.email)}</a>
      <button type="button" class="save-btn" data-go="passCopy">${fmt(shared.save.copy)}</button></div>`);
  /* Try another trail. */
  const others = COLOR_KEYS.filter(k => k !== c.key).map(k => getColor(k));
  const other = pin("pin-other", B.other.title, `<p>${fmt(B.other.text)}</p>
    <div class="try-trails">${others.map(o => `<button type="button" class="try-trail" data-trail="${o.key}"><span class="blaze" style="background:var(--${o.key.toLowerCase()}-color)" aria-hidden="true"></span>${fmt(o.action)} <span class="tcolor">· ${o.key}</span></button>`).join("")}</div>`);
  /* "Remember your trail": the trail's swatch and name, then an icon for
     each exhibit visited. Names in plain text, never colored. */
  const recap = pin("pin-recap", B.recap.title, `<ul class="recap">
    <li><span class="blaze" style="background:var(--trail)" aria-hidden="true"></span>${c.key} · ${fmt(c.archetype)}</li>
    ${built.map(k => `<li><span class="recap-icon" aria-hidden="true">${icon(topicOf(k).icon)}</span>${fmt(topicOf(k).name)}</li>`).join("")}</ul>`);
  /* Your local leaders: the same for every topic. */
  const leaders = pin("pin-leaders", B.leaders.title, renderBlocks(G.local, ctx));
  /* The hopeful note, pinned last. */
  const farewell = [...t.farewell, ...J.close].map(p => `<p>${fmt(p)}</p>`).join("");
  const board = `<section class="board" aria-labelledby="boardTitle">
    <div class="board-sign"><span class="board-sign-icon" aria-hidden="true">${icon("i-board")}</span><h3 id="boardTitle">${fmt(B.title)}</h3></div>
    <div class="pins">${recap}${planPin(c, built)}${built.map(nearPin).join("")}${leaders}${pass}${other}${pin("pin-words", B.words, farewell)}</div>
  </section>`;
  return `${trip}${board}${takeSection(built)}`;
}

function renderFinish() {
  const line = $("finishLine");
  if (!st.trail) { line.innerHTML = ""; return; }
  const E = shared.bulletin.board.end;
  /* The end of the line: the Trailhead sign, where the trail began, and
     the way back to the start. */
  const end = `<li class="stop place is-end" id="lineEnd">
    <span class="marker" aria-hidden="true">${icon(P.start.icon)}</span>
    <div class="end-sign"><p class="end-name">${fmt(E.sign)}</p>
      <button type="button" class="pill-btn pill-all next-btn" data-go="place-trailhead">${fmt(E.home)}</button></div></li>`;
  line.innerHTML = place("finish", "is-finish", finishBody(getColor(st.trail), st.visited)) + end;
}

/* ---------- Feedback: below the trail, on its own ---------- */

/* "Help make the trail better": near the trail but not part of it, so
   anyone can use it, finished or not. The answers live in `fb`, so they
   survive the page being drawn again. */
function renderFeedback() {
  const FB = shared.bulletin.board.feedback;
  $("feedback").innerHTML = `<h2 class="fb-title">${fmt(FB.title)}</h2><p>${fmt(FB.text)}</p>
    ${FB.questions.map(q => `<fieldset class="fb-q"><legend>${fmt(q.ask)}</legend><div class="fb-opts">
      ${q.options.map(o => `<label class="fb-opt"><input type="radio" name="fb-${q.key}" value="${fmt(o)}" data-fb="${q.key}"${fb[q.key] === o ? " checked" : ""}><span>${fmt(o)}</span></label>`).join("")}
    </div></fieldset>`).join("")}
    <label class="fb-label" for="fbComment">${fmt(FB.comment)}</label>
    <textarea id="fbComment" class="fb-comment" data-fb="comment" rows="3" maxlength="1200">${noteText(fb.comment || "")}</textarea>
    <p class="fb-includes">${fmt(FB.includes)}</p>
    <div class="save-row"><a class="save-btn" id="fbSend" href="${feedbackMail()}">${fmt(FB.send)}</a>
      <button type="button" class="save-btn" data-go="fbCopy">${fmt(FB.copy)}</button></div>
    <p class="fb-privacy">${fmt(FB.privacy.replace("{to}", FB.to))}</p>`;
}

/* ---------- The Field Guide: the keepsake ---------- */

/* Everything the reader did, gathered for printing or downloading. It
   asks nothing new. Built fresh each time, so it always carries the
   latest notes and choices. */
function keepsakeHTML() {
  const G = shared.guide, c = getColor(st.trail), t = trails[st.trail], ks = kept();
  const chosen = ks.length > 1 ? store.get(startKey()) : "";
  const steps = chosen && ks.includes(chosen) ? [chosen] : ks;
  const own = store.get(ownKey());
  const plan = shared.bulletin.board.plan.steps.filter(x => x.key).map(x => [x.q, store.get(planKey(x.key))]).filter(([, v]) => v);
  const noteOf = key => store.get(`${st.trail}:${key}`.toLowerCase());
  const notes = [["fit", G.noteFrom.fit], ["place", G.noteFrom.place],
    ...ks.map(k => [`${k}:life`, G.noteFrom.life.replace("{exhibit}", topicOf(k).name)])]
    .map(([k, label]) => [label, noteOf(k)]).filter(([, v]) => v);
  const esc = v => v.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const actions = t.know.blocks.filter(b => b.actions);
  const stretch = t.tryIt.blocks.filter(b => b.stretch);
  const topicPage = k => {
    const x = topicOf(k), X = exhibits[k], Wk = X.work[c.key];
    return `<section class="ks-topic"><h2>${icon(x.icon, "ks-icon")}${fmt(fill(G.forTopic, c, x))}</h2>
      <h3>${fmt(fill(G.work, c))}</h3><p class="sub">${fmt(G.imagine)}</p><p>${fmt(X.situation)}</p>
      <ul class="plain">${c.words.map(w => `<li><b>${fmt(w.word)}:</b> ${fmt(Wk[w.word])}</li>`).join("")}</ul>
      <h3>${fmt(G.nearby)}</h3>${renderBlocks(X.finder.blocks, ctx)}</section>`;
  };
  const band = COLOR_KEYS.map(k => `<i style="background:var(--${k.toLowerCase()}-color)"></i>`).join("");
  const html = `<header class="ks-cover">
      <div class="ks-band" aria-hidden="true">${band}</div>
      <p class="ks-brand"><span class="ks-wordmark">${fmt(G.brand)}</span> <span class="ks-by">${fmt(G.by)}</span></p>
      <h1>${fmt(G.title)}</h1>
      <p class="ks-trail"><span class="ks-blaze" aria-hidden="true"></span>${fmt(fill(G.trailLine, c))}</p>
      <p class="ks-safety">${fmt(G.safety)}</p></header>
    <section><h2>${fmt(G.way)}</h2><p class="ks-you"><b>${fmt(G.you.replace("{a}", aAn(c.archetype)).replace("{archetype}", c.archetype))}</b> ${fmt(cap(trailhead.ways[c.key]))}.</p>${renderBlocks(actions, ctx)}</section>
    <section><h2>${fmt(steps.length > 1 ? G.steps : G.step)}</h2>
      <ul class="plain ks-steps">${steps.map(k => `<li><b>${fmt(topicOf(k).name)}:</b> ${fmt(firstOf(c, k))}</li>`).join("")}</ul>
      ${own ? `<p class="ks-own"><b>${fmt(G.own)}:</b> ${esc(own)}</p>` : ""}
      ${plan.length ? `<h3>${fmt(G.plan)}</h3><ul class="plain ks-plan">${plan.map(([q, v]) => `<li><b>${fmt(q)}</b> ${esc(v)}</li>`).join("")}</ul>` : ""}</section>
    <section><h2>${fmt(G.tryIt)}</h2>${renderBlocks(stretch, ctx)}</section>
    <section><h2>${fmt(G.notes)}</h2>${notes.length ? notes.map(([label, v]) => `<p class="sub">${fmt(label)}</p><p class="ks-note">${esc(v)}</p>`).join("") : `<p>${fmt(G.noNotes)}</p>`}
      <p class="sub">${fmt(G.moreNotes)}</p><div class="ks-lines" aria-hidden="true"></div></section>
    ${ks.map(topicPage).join("")}
    <section class="ks-topic"><h2>${fmt(G.localTitle)}</h2>${renderBlocks(G.local, ctx)}</section>
    <section><h2>${fmt(G.story)}</h2>${renderBlocks(t.story.blocks, ctx)}</section>
    <section><h2>${fmt(G.helpers)}</h2>${renderBlocks([{ ways: true }], ctx)}</section>
    <footer class="ks-foot"><div class="ks-band" aria-hidden="true">${band}</div>
      <p>${fmt(G.comeBack)} <a href="${spotUrl()}">${spotUrl()}</a></p><p>${fmt(G.footBrand)} climatecolor.com</p></footer>`;
  /* On paper, a link can't be followed: each one prints its address, and
     the "opens a new site" notes go away. */
  const short = u => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  return html
    .replace(/<a class="ext" href="([^"]+)"([^>]*)>([\s\S]*?)<\/a>/g, (m, url, rest, inner) => `<a class="ext" href="${url}"${rest}>${inner}</a><span class="ks-url"> ${short(url)}</span>`)
    .replace(/\(opens a new site · /g, "(");
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
  if (trailChanged) { renderTrail(); renderBack(); }
  renderLodge();
  renderFinish();
  renderFeedback();
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

/* After a stop opens: the progress bar's dots and the return's
   "You opened 3 of 4 stops." */
function stopOpened() {
  drawProgress();
  const out = document.querySelector(".trip-trail .vh"), back = document.querySelector(".trip-back .vh");
  if (out) out.textContent = tripTrailLine();
  if (back) back.textContent = tripBackLine();
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

/* Print the Field Guide only: it's built fresh, and everything else is
   hidden while printing. The print window also offers Save as PDF. */
function printGuide() {
  const k = $("keepsake");
  k.innerHTML = keepsakeHTML(); k.hidden = false;
  let style = $("keepsakeStyle");
  if (!style) { style = document.createElement("style"); style.id = "keepsakeStyle"; document.head.appendChild(style); }
  style.textContent = `@media print{${KEEPSAKE_STYLE}${keepsakeColors()}}${keepsakePage().replace(/^/, "@media print{").replace(/$/, "}")}`;
  document.body.classList.add("print-guide");
  try { window.print(); } catch (err) { /* blocked in some previews */ }
  setTimeout(() => { document.body.classList.remove("print-guide"); k.hidden = true; }, 500);
}

/* The Field Guide's look: one set of styles for printing and for the
   downloaded file, so both come out the same. Colors are the core's own,
   read live from core/atlas.css and written in, so the downloaded file
   keeps them with no connection. */
const KEEPSAKE_STYLE = `
.keepsake{color:#212121;font:11pt/1.5 'Varela Round',system-ui,sans-serif;max-width:7in;margin:0 auto}
.keepsake *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
.keepsake p{margin:0 0 .55em}
.ks-band{display:flex;gap:4px;height:9px;margin:0 0 20px}.ks-band i{flex:1;border-radius:3px}
.ks-brand{margin:0;font-size:11pt;color:#475569}
.ks-wordmark{font-family:'ADLaM Display','Varela Round',sans-serif;font-size:15pt;color:#0F7393;margin-right:.3em}
.ks-by{font-weight:700}
.keepsake h1{font-family:'ADLaM Display','Varela Round',sans-serif;font-weight:400;font-size:32pt;line-height:1.05;margin:.2em 0 .25em}
.ks-trail{display:flex;align-items:center;gap:.5em;margin:0 0 1em;font-size:14pt;font-weight:700}
.ks-blaze{display:inline-block;width:13px;height:22px;border-radius:3px;background:var(--ks-trail)}
.ks-safety{padding:.6em .9em;border-radius:8px;background:#F6EFE1;font-weight:700}
.keepsake h2{font-family:'ADLaM Display','Varela Round',sans-serif;font-weight:400;font-size:18pt;line-height:1.2;margin:1.4em 0 .45em;padding-top:.45em;border-top:3px solid var(--ks-trail);break-after:avoid}
.keepsake h3{font-size:12.5pt;margin:1.1em 0 .35em;break-after:avoid}
.ks-topic{break-before:page}
.ks-icon{width:20px;height:20px;margin-right:.4em;vertical-align:-3px;color:#0F7393}
.keepsake .sub{font-weight:700;margin:.9em 0 .25em}
.keepsake ul{margin:.3em 0 .8em;padding-left:1.2em}.keepsake li{margin:.25em 0}
.ks-steps{font-size:12pt}.ks-own{font-size:12pt}
.ks-note{white-space:pre-wrap;padding:.5em .8em;border-left:4px solid #7A5C22;background:#FBF7EE;break-inside:avoid}
.ks-lines{height:2.4in;background:repeating-linear-gradient(to bottom,transparent 0,transparent calc(.4in - 1px),#CBD5E1 calc(.4in - 1px),#CBD5E1 .4in)}
dl.actions{margin:.6em 0}dl.actions dt{font-weight:700;margin-top:.55em;color:var(--ks-text)}dl.actions dd{margin:0 0 0 1.2em}
.eg,.rdesc{display:block;color:#475569}
.reach,.stretch-note,.cite{color:#475569;font-size:9.5pt}
.ks-url{color:#475569;font-size:9.5pt;word-break:break-all}
.keepsake .archived{display:none}
.keepsake a{color:#0F7393}.keepsake a svg{display:none}
.check{display:flex;gap:.55em;align-items:flex-start;margin:.45em 0;break-inside:avoid}.check input{margin:.25em 0 0;width:14px;height:14px;flex:none}
.stretch{padding:.7em 1em;border:2px dashed #C9B48A;border-radius:10px;break-inside:avoid}.stretch ol{margin:.3em 0 .5em;padding-left:1.4em}
.find{padding:.6em .9em;border-left:4px solid #CBD5E1;margin:.8em 0;break-inside:avoid}.find-prompt{font-weight:700}.find-btn{display:none}.find-reveal{display:block!important}
.say{list-style:none;padding:0}.say li{margin:.35em 0}
.quote{margin:1em 0;padding-left:1em;border-left:4px solid #CBD5E1}.quote blockquote{margin:0 0 .3em;font-size:12.5pt}.quote figcaption{color:#475569;font-size:9.5pt}
.ways-list{list-style:none;padding:0}.ways-list li{display:flex;gap:.6em;align-items:flex-start;margin:.55em 0;break-inside:avoid}
.ways-list .blaze{flex:none;width:12px;height:20px;border-radius:2px;margin-top:2px}.ways-list .odesc{display:block;color:#475569}
.ways-list li.mine{padding:.3em .5em;border-radius:6px;background:#F3F4F6}
.yours{font-size:8.5pt;text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin-left:.3em}
.vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.ks-foot{margin-top:2em;color:#475569;font-size:10pt}.ks-foot .ks-band{margin:0 0 1em}
`;
/* The page rules: letter paper, real margins, and a line at the foot of
   every page. Printers that can't draw the foot line simply skip it. */
const keepsakePage = () => `@page{size:letter;margin:.75in .8in .85in}
@page{@bottom-center{content:"${shared.guide.pageFoot} · " counter(page);font:9pt 'Varela Round',sans-serif;color:#64748B}}`;
/* The colors the Field Guide uses, from the core: the six colors and the
   reader's trail. */
const keepsakeColors = () => `.keepsake{${COLOR_KEYS.map(k => `--${k.toLowerCase()}-color:${colorValue(k)};`).join("")}--ks-trail:${colorValue(st.trail)};--ks-text:${colorValue(st.trail, "text")}}`;

/* Download the Field Guide as one web page file, notes and all. It's made
   right here in the browser and saved to the reader's device; nothing is
   sent anywhere. Its look is written into the file, so it opens and
   prints anywhere. Fonts load from Google Fonts when there's a connection. */
function downloadGuide() {
  const G = shared.guide;
  const body = keepsakeHTML().replace(/<svg[\s\S]*?<\/svg>/g, "");
  const screen = `body{margin:0;background:#F4F1EA}@media screen{.keepsake{background:#fff;padding:.8in .8in 1in;margin:24px auto;box-shadow:0 1px 6px rgba(0,0,0,.12);border-radius:6px}}`;
  const doc = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${fmt(G.title)} · ${fmt(G.brand)}</title>
<link href="https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Varela+Round&display=swap" rel="stylesheet">
<style>${KEEPSAKE_STYLE}${keepsakeColors()}${keepsakePage()}${screen}</style></head><body><main class="keepsake">${body}</main></body></html>`;
  const url = URL.createObjectURL(new Blob([doc], { type: "text/html" }));
  const a = document.createElement("a");
  a.href = url; a.download = G.file; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
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
  if (to === "downloadGuide") downloadGuide();
  if (to === "clearNote") {
    store.set(b.dataset.note, ""); $(b.dataset.for).value = "";
    b.textContent = shared.notes.cleared; setTimeout(() => { b.textContent = shared.notes.clear; }, 2000);
  }
  if (to === "saveOpen") { const p = $("saveTop"); p.hidden = !p.hidden; b.setAttribute("aria-expanded", String(!p.hidden)); }
  if (to === "passShare") { const B = shared.bulletin.board; navigator.share({ title: document.title, text: fill(B.pass.message, getColor(st.trail)).replace(" {url}", ""), url: home }).catch(() => { /* closed without sharing */ }); return; }
  if (to === "passCopy") { copyText(fill(shared.bulletin.board.pass.message, getColor(st.trail)).replace("{url}", home), b, shared.save.copy); return; }
  if (to === "share") navigator.share({ title: document.title, url: spotUrl() }).catch(() => { /* closed without sharing */ });
  if (to === "copy") { $(b.dataset.for).select(); copyText(spotUrl(), b, shared.save.copy); }
  if (to === "copyLink") copyText(spotUrl(), b, shared.bulletin.board.take.copy);
  if (to === "fbCopy") { const FB = shared.bulletin.board.feedback; copyText(`${FB.to}\n\n${feedbackText()}`, b, FB.copy); }
});

/* Answers on the page: feedback, the first step picked, and which topics
   go in the Field Guide (one left unchecked stays out of it). */
document.addEventListener("change", e => {
  if (e.target.dataset && e.target.dataset.fb) { feedbackChanged(e.target); return; }
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
  if (item.classList.contains("stop") && list && (list.id === "trailStops" || list.id === "backStops" || list.classList.contains("rooms"))) {
    const sum = e.target.querySelector("summary"), before = sum.getBoundingClientRect().top;
    list.querySelectorAll(":scope > .stop > details[open]").forEach(d => { if (d !== e.target) d.open = false; });
    const shift = sum.getBoundingClientRect().top - before;
    if (Math.abs(shift) > 1) window.scrollBy(0, shift);
  }
  const s = e.target.closest("#trailStops > .stop, #backStops > .stop");
  if (s) { seen.add(s.dataset.stop); stopOpened(); }
}, true);

/* Direct links: ?spot=green-water,food, or #green-water,food. The last
   exhibit listed opens. Links saved before the Pavilion's topics changed
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
