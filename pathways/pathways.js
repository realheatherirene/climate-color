/* ==========================================================================
   PATHWAYS: fills in the words that live in core/
   ==========================================================================
   Color names are typed into each page, because they are the permanent
   keys that links depend on. Archetypes, what each color provides, and
   its three words live only in core/climate-color.js, and this script
   writes them into the page:

     data-archetype="Blue" -> "Communicator"
     data-provides="Blue"  -> "Provides language"
     id="pathway" with data-color="Blue"
                           -> the color page: its three words, each with
                              its plain meaning, then links to the Wheel
                              and back to all six colors
     data-site="wheel"     -> the link to that page on the site
     id="pathway-cards"    -> one card per color (core/color-card.js), in
                              list order; each button opens its page

   Change an archetype or a word in core/, and every Pathways page follows.
   ========================================================================== */

import { getColor, resolveColors, COLOR_KEYS, SITE, WHEEL_TEXT } from "../core/climate-color.js";
import { colorCard } from "../core/color-card.js";

// The color pages' own words.
const PATH_TEXT = {
  provides: "Provides",
  waysHeading: plural => `Three ways ${plural} help`,
  nextHeading: "Keep going",
  allColors: "All six colors"
};

const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const arrow = ` <span aria-hidden="true">&rarr;</span>`;

// A link that names one color (?style=Indigo) goes straight to that
// color's page. Any other ?style= value, or none, shows the index as usual.
const linked = resolveColors(new URLSearchParams(window.location.search).get("style") || "");
if (linked.length === 1 && /\/index\.html$|\/$/.test(window.location.pathname)) {
  window.location.replace(`${linked[0].toLowerCase()}.html`);
}

document.querySelectorAll("[data-archetype]").forEach(el => {
  const c = getColor(el.dataset.archetype);
  if (c) el.textContent = c.archetype;
});

document.querySelectorAll("[data-provides]").forEach(el => {
  const c = getColor(el.dataset.provides);
  if (c) el.innerHTML = `${PATH_TEXT.provides} <strong>${esc(c.provides)}</strong>`;
});

document.querySelectorAll("[data-site]").forEach(a => {
  if (SITE[a.dataset.site]) a.href = SITE[a.dataset.site];
});

// One color's page: its three words, then where to go next. Links to other
// site pages open in the whole window, since this page sits inside one.
const pathEl = document.getElementById("pathway");
const c = pathEl && getColor(pathEl.dataset.color);
if (c) {
  const k = c.key.toLowerCase();
  pathEl.innerHTML = `
    <section class="pathway-section">
      <h2>${esc(PATH_TEXT.waysHeading(c.plural))}</h2>
      <ul class="pathway-words">
        ${c.words.map(w => `<li><span class="pathway-word theme-${k}">${esc(w.word)}</span> ${esc(w.phrase)}</li>`).join("")}
      </ul>
    </section>
    <section class="pathway-section">
      <h2>${esc(PATH_TEXT.nextHeading)}</h2>
      <ul class="pathway-links">
        <li><a href="${esc(SITE.wheel)}" target="_top">${esc(WHEEL_TEXT.more)}${arrow}</a></li>
        <li><a href="index.html"><span aria-hidden="true">&larr;</span> ${esc(PATH_TEXT.allColors)}</a></li>
      </ul>
    </section>`;
}

const cardsEl = document.getElementById("pathway-cards");
if (cardsEl) {
  cardsEl.innerHTML = COLOR_KEYS.map(key => colorCard(key, { href: `${key.toLowerCase()}.html` })).join("");
}
