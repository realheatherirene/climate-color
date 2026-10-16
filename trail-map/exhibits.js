/* ==========================================================================
   EXHIBITS: the kinds of stops, and how each piece of a stop is drawn
   ==========================================================================
   A stop is one exhibit type plus a list of blocks. Data files hold only
   words and links; this file turns them into HTML. To add a new kind of
   block, add one entry to BLOCKS. Text may use **bold**; nothing else is
   read as markup, so content files never contain HTML.
   ========================================================================== */

/* Each kind has a word label and an icon. Sign, rest, overlook, and tip
   describe a whole stop: they set its shape (a rest stop gets a round
   marker and a notes box) and carry no label of their own. Find,
   stretch, and quote are surprises inside a stop; each carries its own
   label in its own box, so color is never the only signal. */
export const EXHIBITS = {
  sign:     { label: "Trail sign",  icon: "i-sign" },
  quote:    { label: "Quote",       icon: "i-quote" },
  overlook: { label: "Overlook",    icon: "i-overlook" },
  stretch:  { label: "Stretch",     icon: "i-stretch" },
  find:     { label: "Hidden find", icon: "i-find" },
  tip:      { label: "Trail tip",   icon: "i-tip" },
  rest:     { label: "Rest stop",   icon: "i-reflect" }
};

export const STOP_TYPES = ["sign", "rest", "overlook", "tip"];

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
export const icon = (id, cls = "") => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;

const ext = (url, name) =>
  `<a class="ext" href="${esc(url)}" target="_blank" rel="noopener">${fmt(name)}${icon("i-ext")}</a>`;
const label = (id, word, cls = "") =>
  `<p class="lab ${cls}"><span class="badge" aria-hidden="true">${icon(id)}</span>${word}</p>`;
/* A source: the live link, then its saved copy on the Wayback Machine when
   it has one, so a source that goes offline can still be read. The
   label comes from the content pack (setArchivedLabel). */
let ARCHIVED = "archived copy";
export const setArchivedLabel = word => { ARCHIVED = word; };
const source = s => ext(s.url, s.title) + (s.archive ? ` <span class="archived">(${ext(s.archive, ARCHIVED)})</span>` : "");
const sources = list => `<p class="cite">Source${list.length > 1 ? "s" : ""}: ${list.map(source).join(" · ")}</p>`;
const tag = type => `<p class="exhibit tag">${icon(EXHIBITS[type].icon)}${EXHIBITS[type].label}</p>`;
const check = inner => `<label class="check"><input type="checkbox"><span>${inner}</span></label>`;

/* One renderer per block type. `ctx` carries what a block may need from
   the page, such as the list of trails. */
const BLOCKS = {
  p:    b => `<p>${fmt(b.p)}</p>`,
  sub:  b => `<p class="sub">${fmt(b.sub)}</p>`,
  list: b => `<ul class="plain">${b.list.map(i => `<li>${fmt(i)}</li>`).join("")}</ul>`,
  cite: b => sources(b.cite),

  quote: b => `<figure class="quote">${tag("quote")}<blockquote>${fmt(b.quote.text)}</blockquote>
    <figcaption>${fmt(b.quote.who)}, ${source(b.quote.src)}</figcaption></figure>`,

  defs: b => `<dl class="defs">${b.defs.map(d => `<dt>${fmt(d.term)}</dt><dd>${fmt(d.def)}</dd>`).join("")}</dl>`,

  /* The bridge from action words to everyday helping: the word, what it
     means in plain words, then an everyday example. Never the word alone. */
  actions: b => `<dl class="actions">${b.actions.map(a =>
    `<dt>${fmt(a.word)}</dt><dd>${fmt(a.phrase)}.<span class="eg">${fmt(a.example)}</span></dd>`).join("")}</dl>`,

  tips: b => label("i-explore", "Explore") + b.tips.map(t =>
    check(`<b>${fmt(t.verb)}</b> ${fmt(t.text)}${t.reach ? ` <span class="reach">${fmt(t.reach)}</span>` : ""}`)).join(""),

  more: b => (b.label === false ? "" : label("i-explore", "Explore")) + b.more.map(t => `<p class="sub">${fmt(t.sub)}</p>` +
    t.items.map(i => check(`<b>${fmt(i.verb)}</b> ${fmt(i.text)}${i.reach ? ` <span class="reach">${fmt(i.reach)}</span>` : ""}`)).join("")).join(""),

  resources: b => (b.label === false ? "" : label("i-explore", "Explore")) + b.resources.map(r => check(
    `<b>${fmt(r.verb)}</b> ${r.before ? fmt(r.before) + " " : ""}${ext(r.url, r.name)} <span class="reach">(opens a new site · ${fmt(r.reach)})</span><span class="rdesc">${fmt(r.desc)}</span>`)).join(""),

  say: b => label("i-say", "Say") + `<ul class="say">${b.say.map(s => `<li>${fmt(s.where)}: <q>${fmt(s.words)}</q></li>`).join("")}</ul>`,

  questions: b => `<div class="reflect">${b.title ? `<p class="sub">${fmt(b.title)}</p>` : ""}<ul>${b.questions.map(q => `<li>${fmt(q)}</li>`).join("")}</ul></div>`,

  /* A guess first, then the reveal: the reader commits to an answer
     before finding out. */
  find: (b, ctx) => {
    const id = `find-${ctx.uid()}`;
    return `<div class="find">${tag("find")}<p class="find-prompt">${fmt(b.find.prompt)}</p>
      <button type="button" class="pill-btn pill-all find-btn" aria-expanded="false" aria-controls="${id}">${fmt(b.find.button || "Reveal the answer")}</button>
      <div class="find-reveal" id="${id}" hidden><p>${fmt(b.find.reveal)}</p>${b.find.link ? `<p>${ext(b.find.link.url, b.find.link.name)} <span class="reach">(opens a new site · ${fmt(b.find.link.reach)})</span></p>` : ""}${b.find.src ? sources([b.find.src]) : ""}</div></div>`;
  },

  /* A short activity. Always offers a version that needs no movement. */
  stretch: b => `<div class="stretch">${tag("stretch")}<p class="sub">${fmt(b.stretch.title)}</p><ol>${b.stretch.steps.map(s => `<li>${fmt(s)}</li>`).join("")}</ol>
    <p class="stretch-note">${fmt(b.stretch.note)}</p></div>`,

  /* A visual key: each item shows the mark it stands for on the page. */
  legend: b => `<ul class="legend">${b.legend.map(i => `<li><span class="mark mark-${i.mark}" aria-hidden="true">${
    i.mark === "stop" || i.mark === "rest" ? "0" : icon(i.icon)}</span><span><b>${fmt(i.term)}</b> ${fmt(i.text)}</span></li>`).join("")}</ul>`,

  /* The open topic's teaser and its source, from topics.js: written once,
     shown here and in the exhibit picker's "still being built" note. */
  teaser: (b, ctx) => { const t = ctx.topic(); return `<p>${fmt(t.teaser)}</p>${sources([t.src])}`; },

  /* The places on the map, as a route strip: the Trailhead's key. */
  route: (b, ctx) => ctx.route(),

  /* Buttons for the other trails, keeping the current exhibit. */
  trails: (b, ctx) => `<div class="pills">${ctx.otherTrails().map(c =>
    `<button type="button" class="pill-btn pill-${c.key.toLowerCase()}" data-trail="${c.key}">${c.action} · ${c.key}</button>`).join("")}</div>`,

  /* All six ways of helping, color first, each with its plain meaning.
     The reader's own trail is marked in words, not by color alone. */
  ways: (b, ctx) => `<ul class="ways-list">${ctx.allWays().map(w =>
    `<li${w.mine ? ' class="mine"' : ""}><span class="blaze" style="background:var(--${w.key.toLowerCase()}-color)" aria-hidden="true"></span>
    <span><b>${w.key} · ${w.action}</b>${w.mine ? ` <span class="yours">${fmt(w.yours)}</span>` : ""}<span class="odesc">${fmt(w.meaning)}.</span></span></li>`).join("")}</ul>`
};

export function renderBlocks(blocks, ctx) {
  return blocks.map(b => {
    const type = Object.keys(BLOCKS).find(k => k in b);
    if (!type) throw new Error("Unknown block: " + JSON.stringify(b));
    return BLOCKS[type](b, ctx);
  }).join("\n");
}

/* One stop: the title (and its short line, if any) while closed; the
   content and the "Next" line inside. Stops along the trail are numbered; parts
   of an exhibit, the Field Guide, and the Bulletin Board are not. */
export function renderStop({ n, key, title, stop, line = "trail", ctx, tag = "li", aheadLabel = "Next stop" }) {
  const ex = EXHIBITS[stop.exhibit];
  if (!ex || !STOP_TYPES.includes(stop.exhibit)) throw new Error("Not a stop type: " + stop.exhibit);
  const rest = stop.exhibit === "rest" ? " rest" : "";
  return `<${tag} class="stop ${line}${rest}" data-stop="${key}">
  ${n == null ? "" : `<span class="marker" aria-hidden="true">${n}</span>`}
  <details><summary><span class="sum"><h3>${fmt(title)}</h3><span class="toggle"><span class="open-label">Open <span aria-hidden="true">&#9662;</span></span><span class="close-label">Close <span aria-hidden="true">&#9652;</span></span></span></span>${stop.line ? `<span class="sum-line">${fmt(stop.line)}</span>` : ""}</summary>
  <div class="body">
    ${renderBlocks(stop.blocks, ctx)}
    ${stop.exhibit === "rest" && ctx.notes ? ctx.notes(key) : ""}
    ${stop.ahead ? `<p class="ahead">${icon("i-ahead")}<span><b>${aheadLabel}:</b> ${fmt(stop.ahead)}</span></p>` : ""}
  </div></details></${tag}>`;
}
