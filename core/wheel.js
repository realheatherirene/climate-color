/* ==========================================================================
   CLIMATE COLOR: the wheel (one copy, with options)
   ==========================================================================
   Draws the six-color Stewardship Wheel from core/climate-color.js
   (order, names, archetypes, words, label colors) and core/atlas.css (the
   colors, the 18 outer-ring shades, and the word text color). It has no
   colors or names of its own. The look follows the brand wheel (brand
   deck CC_Branding_091926.pptx, slide 6), with six wedges.

   USE
     import { renderWheel } from "../core/wheel.js";
     renderWheel(el, { variant: "brand" });

   OPTIONS (all optional)
     variant     "simple" (default): one ring, each wedge shows the color
                 name with its archetype in smaller text beneath.
                 "brand": the full brand wheel. Same inner ring, plus an
                 outer ring with each color's three words.
     links       A function, color key -> URL (usually pathwayUrl from
                 core/climate-color.js). A tap on a wedge then opens that
                 color's card (core/color-card.js) under the wheel, with a
                 button to the URL, and the other five colors fade back.
                 The button opens in the whole window, since the wheel
                 sits inside a page the site embeds. A tap on white space,
                 a second tap on the same color, or Escape closes the card.
     panel       With links: an element elsewhere on the page to show the
                 card in, instead of under the wheel. The hint then stays
                 under the wheel.
     onSelect    With links: called with the chosen color key when a card
                 opens, and with null when it closes.
     tooltip     Show what the color provides on hover or tap. Defaults
                 to on when there are no links.
     caption     A line of text under the wheel. Defaults to a hint when
                 the tooltip or the card is on; pass "" for none.
     globe       false to leave out the globe in the middle.
     label       The wheel's description for screen readers.

   For a download, wheelSVG(options) returns the SVG as text. Pass
   `inline: true` to write in the real hex values (a saved file can't read
   atlas.css), and `globeHref` for an embedded globe image.

   FONTS: color names in Nunito ExtraBold (close to the brand's Arial
   Rounded MT Bold), words in Barlow Semi Condensed SemiBold (close to the
   brand's Bahnschrift SemiBold). Both load from Google Fonts the first
   time a wheel is drawn. FONT_CSS below is the one place they're named.
   ========================================================================== */

import { COLORS, colorValue } from "./climate-color.js";
import { colorCard } from "./color-card.js";

// Proportions measured from the brand wheel, in SVG units. The white ring
// around the globe ends at 72, the inner (color) ring at 180, and the
// outer (word) ring at 279: 25.8%, 64.5%, and 100% of the full radius.
const CX = 200;
const CY = 200;
const RI = 72;
const RO = 180;
const R_OUTER = 279;
const GLOBE_D = 115.8;
// Each variant's viewBox: [corner, size]. The brand wheel needs more room
// for its outer ring.
const VIEW = { simple: [-40, 480], brand: [-82, 564] };
const SIZE = { name: 16.5, archetype: 11, word: 11.5 };

export const FONT_CSS = "https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600&family=Nunito:wght@700;800&display=swap";
const NAME_FONT = "Nunito, 'Arial Rounded MT Bold', Arial, sans-serif";
const WORD_FONT = "'Barlow Semi Condensed', Bahnschrift, 'Arial Narrow', sans-serif";

const GLOBE_SRC = new URL("./images/climate-color-globe.png", import.meta.url).href;
const LABEL_HEX = { black: "#000000", white: "#FFFFFF" };

const STEP = 360 / COLORS.length;
const START = -STEP / 2;   // Yellow is centered at 12 o'clock

function point(r, deg) {
  const a = (deg * Math.PI) / 180;
  return { x: CX + r * Math.sin(a), y: CY - r * Math.cos(a) };
}

const f = n => n.toFixed(2);
const normal = deg => ((deg % 360) + 360) % 360;

function wedgePath(ro, ri, a0, a1) {
  const os = point(ro, a0), oe = point(ro, a1), ie = point(ri, a1), is = point(ri, a0);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${f(os.x)} ${f(os.y)} A ${ro} ${ro} 0 ${large} 1 ${f(oe.x)} ${f(oe.y)} ` +
         `L ${f(ie.x)} ${f(ie.y)} A ${ri} ${ri} 0 ${large} 0 ${f(is.x)} ${f(is.y)} Z`;
}

// Words run like spokes. Words are never upside down, and words that run
// nearly up and down read from bottom to top, as on the brand wheel.
function wordRotation(mid) {
  let rot = ((mid - 90) % 360 + 360) % 360;       // pointing outward
  if (rot > 180) rot -= 360;                      // -180..180
  if (rot > 90 || rot <= -90) rot += rot > 0 ? -180 : 180;
  if (rot >= 74.9) rot -= 180;                    // near-vertical: bottom to top
  return rot;
}

// All three words in a color face the same way: the way its middle word
// would read, outward from the center or turned around.
function flipFor(mid) {
  const turn = normal(wordRotation(mid) - (mid - 90));
  return turn > 90 && turn < 270 ? 180 : 0;
}

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* The wheel as SVG text. See the options above. */
export function wheelSVG(options = {}) {
  const {
    variant = "simple", links = null, globe = true,
    inline = false, globeHref = GLOBE_SRC, interactive = !!links,
    label = variant === "brand"
      ? "Stewardship Wheel: six colors around the Earth, each with its archetype and three words for how it helps."
      : "Stewardship Wheel: six colors around the Earth, each with its archetype."
  } = options;
  const brand = variant === "brand";
  const view = brand ? VIEW.brand : VIEW.simple;
  // A fill (and a matching thin stroke, which hides the hairline seams
  // browsers leave between touching shapes) from an atlas.css variable.
  const paint = (key, kind) => {
    const v = `--${key.toLowerCase()}-${kind}`;
    const c = inline ? colorValue(key, kind) : `var(${v})`;
    return inline ? `fill="${c}" stroke="${c}" stroke-width="0.75"`
                  : `style="fill: ${c}; stroke: ${c}; stroke-width: 0.75"`;
  };
  const wordInk = inline
    ? (getComputedStyle(document.documentElement).getPropertyValue("--wheel-word-text").trim() || "#333333")
    : "var(--wheel-word-text, #333333)";

  let body = "";
  COLORS.forEach((c, i) => {
    const a0 = START + i * STEP, a1 = a0 + STEP, mid = a0 + STEP / 2;
    const ink = LABEL_HEX[c.label];
    let g = "";

    if (brand) {
      const vStep = STEP / c.words.length, rv = (RO + R_OUTER) / 2;
      const flip = flipFor(mid);
      c.words.forEach(({ word }, j) => {
        const v0 = a0 + j * vStep, v1 = v0 + vStep, vm = v0 + vStep / 2;
        const p = point(rv, vm);
        const rot = vm - 90 + flip;
        g += `<path class="ccw-wedge ccw-word" d="${wedgePath(R_OUTER, RO - 0.5, v0, v1)}" ${paint(c.key, `tint-${j + 1}`)}/>`;
        g += `<text class="ccw-word-text" x="${f(p.x)}" y="${f(p.y)}" transform="rotate(${f(rot)} ${f(p.x)} ${f(p.y)})" ` +
             `text-anchor="middle" dominant-baseline="central" font-family="${WORD_FONT}" font-weight="600" ` +
             `font-size="${SIZE.word}" letter-spacing="0.4" fill="${wordInk}" aria-hidden="true">${esc(word.toUpperCase())}</text>`;
      });
    }

    g += `<path class="ccw-wedge" d="${wedgePath(RO, RI, a0, a1)}" ${paint(c.key, "color")}/>`;

    // Color name with its archetype in smaller text beneath.
    const lp = point((RI + RO) / 2 + 4, mid);
    g += `<text x="${f(lp.x)}" y="${f(lp.y)}" text-anchor="middle" fill="${ink}" ` +
         `font-family="${NAME_FONT}" aria-hidden="true">` +
         `<tspan x="${f(lp.x)}" dy="-0.15em" font-size="${SIZE.name}" font-weight="800">${esc(c.key)}</tspan>` +
         `<tspan class="ccw-archetype" x="${f(lp.x)}" dy="1.3em" font-size="${SIZE.archetype}" font-weight="700">${esc(c.archetype)}</tspan></text>`;

    // An interactive wedge carries the outline of the whole color (both
    // rings), so the keyboard focus ring can trace it as one shape.
    const name = `${c.key}, the ${c.archetype}`;
    const outline = wedgePath(brand ? R_OUTER : RO, RI, a0, a1);
    body += `<g class="ccw-item" data-color="${c.key}"` +
            (interactive ? ` aria-label="${esc(name)}" data-ring="${outline}"` : "") + `>${g}</g>`;
  });

  const off = f(CX - GLOBE_D / 2);
  const globeImg = globe
    ? `<image href="${esc(globeHref)}" x="${off}" y="${off}" width="${GLOBE_D}" height="${GLOBE_D}"/>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${view[0]} ${view[0]} ${view[1]} ${view[1]}" ` +
    `role="${interactive ? "group" : "img"}" aria-label="${esc(label)}" class="ccw-svg">` +
    `<title>${esc(label)}</title>` +
    `${body}<circle cx="${CX}" cy="${CY}" r="${RI + 0.5}" fill="#FFFFFF"/>${globeImg}` +
    // One focus ring, drawn last so no neighboring wedge covers it. A white
    // band under a dark line keeps it clear on every color.
    (interactive ? `<g class="ccw-ring" aria-hidden="true"><path class="ccw-ring-halo"/><path class="ccw-ring-line"/></g>` : "") +
    `</svg>`;
}

const STYLES = `
.ccw-wrap { position: relative; width: 100%; max-width: 480px; margin: 0 auto; }
.ccw-svg { display: block; width: 100%; height: auto; overflow: visible; }
.ccw-item { cursor: pointer; transition: opacity 0.2s ease; }
.ccw-item:hover .ccw-wedge { filter: brightness(1.06); }
.ccw-item:focus { outline: none; }
/* While a color is chosen, the other five fade back, and come up a
   little on hover to show they can still be tapped. */
.ccw-has-choice .ccw-item:not([aria-pressed="true"]) { opacity: 0.35; }
.ccw-has-choice .ccw-item:not([aria-pressed="true"]):hover { opacity: 0.6; }
/* Keyboard focus only: one outline around the whole color. */
.ccw-ring { visibility: hidden; pointer-events: none; fill: none; stroke-linejoin: round; }
.ccw-ring.is-on { visibility: visible; }
.ccw-ring-halo { stroke: #FFFFFF; stroke-width: 5; }
.ccw-ring-line { stroke: #212121; stroke-width: 2; }
@media (prefers-reduced-motion: reduce) { .ccw-item { transition: none; } }
/* On paper every color prints at full strength. */
@media print { .ccw-has-choice .ccw-item { opacity: 1 !important; } .ccw-ring { display: none; } }
.ccw-panel { max-width: 480px; margin: 0.75rem auto 0; }
.ccw-panel .ccw-caption { margin-top: 0; }
.ccw-tip { position: absolute; transform: translate(-50%, calc(-100% - 24px)); max-width: 220px;
  padding: 0.5rem 0.75rem; border-radius: 8px; background: #212121; color: #FFFFFF;
  font-size: 0.85rem; line-height: 1.35; text-align: center; pointer-events: none;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15); z-index: 2; }
.ccw-tip strong { display: block; }
.ccw-caption { margin-top: 0.5rem; text-align: center; font-size: 0.9rem; color: var(--text-muted, #64748B); }
/* On phones the wheel is small, so the words and archetypes get a little
   bigger. At this size ENCOURAGE and INFLUENCE, the longest words, still
   clear both edges of the outer ring; don't go larger without checking
   it. Downloads are drawn without these styles, so they keep the brand
   sizes. */
@media (max-width: 640px) {
  .ccw-word-text { font-size: 12.75px; letter-spacing: 0.1px; }
  .ccw-archetype { font-size: 13px; }
}
`;

function addStyles() {
  if (document.getElementById("ccw-styles")) return;
  const s = document.createElement("style");
  s.id = "ccw-styles";
  s.textContent = STYLES;
  document.head.appendChild(s);
  if (!document.querySelector(`link[href="${FONT_CSS}"]`)) {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONT_CSS;
    document.head.appendChild(l);
  }
}

/* Draws the wheel into `container`. Returns the <svg> element. */
export function renderWheel(container, options = {}) {
  if (!container) return null;
  addStyles();
  const links = options.links;
  const tooltip = !links && (options.tooltip ?? true);
  const caption = options.caption ?? (links ? "Tap a color to learn about it. Tap again to unselect." : tooltip ? "Hover or tap any color to learn about it." : "");
  const captionHtml = caption ? `<div class="ccw-caption">${esc(caption)}</div>` : "";
  const outside = links && options.panel ? options.panel : null;

  container.innerHTML = `<div class="ccw-wrap">${wheelSVG({ ...options, interactive: tooltip || !!links })}` +
    (tooltip ? `<div class="ccw-tip" role="status" hidden></div>` : "") + `</div>` +
    (links ? `<div class="ccw-panel"${outside ? "" : ` aria-live="polite"`}>${captionHtml}</div>` : captionHtml);

  const svg = container.querySelector("svg");
  const items = [...container.querySelectorAll(".ccw-item")];

  // Page-wide listeners from an earlier draw of this wheel are removed, so
  // redrawing never stacks them.
  if (container._ccwCleanup) container._ccwCleanup();
  const listen = (type, fn) => {
    document.addEventListener(type, fn);
    const before = container._ccwCleanup;
    container._ccwCleanup = () => { document.removeEventListener(type, fn); if (before) before(); };
  };
  container._ccwCleanup = null;

  // The focus ring shows only for keyboard focus, not for a tap or click.
  const ring = svg.querySelector(".ccw-ring");
  if (ring) {
    items.forEach(el => {
      el.addEventListener("focus", () => {
        let keyboard = true;
        try { keyboard = el.matches(":focus-visible"); } catch { /* older browser: show it */ }
        if (!keyboard) return;
        ring.querySelectorAll("path").forEach(p => p.setAttribute("d", el.dataset.ring));
        ring.classList.add("is-on");
      });
      el.addEventListener("blur", () => ring.classList.remove("is-on"));
    });
  }

  if (links) {
    // A tap, click, Enter, or Space on a wedge shows that color's card,
    // and the other colors fade back. A tap on white space, a second tap
    // on the same color, or Escape closes it. Taps inside the card leave
    // it open, so its words can be read and its button used.
    const panel = outside || container.querySelector(".ccw-panel");
    if (outside) outside.setAttribute("aria-live", "polite");
    let current = null;

    const close = () => {
      if (!current) return;
      // Focus inside the card would be lost when it empties, so it goes
      // back to the color that opened it.
      if (panel.contains(document.activeElement)) current.focus();
      current = null;
      items.forEach(i => i.setAttribute("aria-pressed", "false"));
      svg.classList.remove("ccw-has-choice");
      panel.innerHTML = outside ? "" : captionHtml;
      if (options.onSelect) options.onSelect(null);
    };
    const choose = el => {
      if (el === current) return close();
      current = el;
      items.forEach(i => i.setAttribute("aria-pressed", String(i === el)));
      svg.classList.add("ccw-has-choice");
      panel.innerHTML = colorCard(el.dataset.color, { href: links(el.dataset.color), target: "_top" });
      if (options.onSelect) options.onSelect(el.dataset.color);
    };

    items.forEach(el => {
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "button");
      el.setAttribute("aria-pressed", "false");
      el.addEventListener("click", () => choose(el));
      el.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(el); }
      });
    });

    listen("click", e => {
      if (!current) return;
      const onWedge = e.target.closest && e.target.closest(".ccw-item") && container.contains(e.target);
      if (!onWedge && !panel.contains(e.target)) close();
    });
    listen("keydown", e => { if (e.key === "Escape") close(); });
    return svg;
  }
  if (!tooltip) return svg;

  const tip = container.querySelector(".ccw-tip");
  const view = options.variant === "brand" ? VIEW.brand : VIEW.simple;
  const pct = v => ((v - view[0]) / view[1]) * 100;

  const show = key => {
    const i = COLORS.findIndex(c => c.key === key);
    const c = COLORS[i];
    const p = point((RI + RO) / 2, START + i * STEP + STEP / 2);
    tip.innerHTML = `<strong>${esc(c.key)} · ${esc(c.archetype)}</strong>Provides ${esc(c.provides)}.`;
    tip.style.left = `${pct(p.x)}%`;
    tip.style.top = `${pct(p.y)}%`;
    tip.hidden = false;
  };
  const hide = () => { tip.hidden = true; };

  items.forEach(el => {
    const key = el.dataset.color;
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    el.addEventListener("mouseenter", () => show(key));
    el.addEventListener("mouseleave", hide);
    el.addEventListener("focus", () => show(key));
    el.addEventListener("blur", hide);
    el.addEventListener("click", e => { e.stopPropagation(); show(key); });
    el.addEventListener("keydown", e => { if (e.key === "Escape") hide(); });
  });

  listen("click", e => { if (!container.contains(e.target)) hide(); });
  return svg;
}
