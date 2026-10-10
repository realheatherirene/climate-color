/* ==========================================================================
   CLIMATE COLOR: one card per color
   ==========================================================================
   The same card everywhere a color is introduced: the Wheel page and the
   Pathways index. It shows the color with its archetype, what it
   provides, and its three words, each with its plain meaning, plus a
   button to the color's page. Everything comes from
   core/climate-color.js; the card's look is in core/atlas.css
   (.color-card).

   USE
     import { colorCard } from "../core/color-card.js";
     el.innerHTML = colorCard("Blue", { href: pathwayUrl("Blue"), target: "_top" });

   OPTIONS (all optional)
     href     Where the button goes. Leave out for a card with no button.
     target   The button's target, e.g. "_top" to open in the whole window.
     label    A small line above the title.
   ========================================================================== */

import { getColor } from "./climate-color.js";

// The card's own words.
export const CARD_TEXT = {
  provides: "Provides",
  button: key => `Explore ${key}`
};

const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* The card as HTML text. Returns "" for a name that isn't one of the six. */
export function colorCard(name, { href = "", target = "", label = "" } = {}) {
  const c = getColor(name);
  if (!c) return "";
  const k = c.key.toLowerCase();
  return `<div class="color-card" style="--card-color: var(--${k}-color);">
  ${label ? `<p class="color-card-label">${esc(label)}</p>` : ""}
  <h3 class="color-card-title"><span class="theme-${k}">${esc(c.key)}</span> · ${esc(c.archetype)}</h3>
  <p class="color-card-provides">${CARD_TEXT.provides} <strong>${esc(c.provides)}</strong></p>
  <ul class="color-card-words">
    ${c.words.map(w => `<li><span class="color-card-word theme-${k}">${esc(w.word)}</span> ${esc(w.phrase)}</li>`).join("\n    ")}
  </ul>
  ${href ? `<a class="pill-btn pill-${k} color-card-btn" href="${esc(href)}"${target ? ` target="${esc(target)}"` : ""}>${esc(CARD_TEXT.button(c.key))} <span aria-hidden="true">&rarr;</span></a>` : ""}
</div>`;
}
