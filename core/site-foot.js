/* ==========================================================================
   CLIMATE COLOR: the footer every page shares
   ==========================================================================
   The owner's legal pages, a note about what Climate Color is and isn't,
   and one line about the owner. Change the words here and the Trail and
   the core reference page follow.

   The 404 page runs no scripts on purpose, so it holds a typed copy of
   this footer in its HTML. When the words here change, change that copy
   too.

   USE
     import { renderSiteFoot } from "../core/site-foot.js";
     renderSiteFoot(document.getElementById("siteFoot"));
     renderSiteFoot(el, '<p class="feedback">...</p>');  // a page's own
                                                          // line on top
   ========================================================================== */

export const SITE_FOOT = {
  links: [
    { name: "Terms of Service", url: "https://kinfeather.com/terms" },
    { name: "Privacy Policy", url: "https://kinfeather.com/privacy" },
    { name: "Accessibility", url: "https://kinfeather.com/accessibility" }
  ],
  note: "Climate Color is an open resource. No payment, login, or download is needed. To the best of our knowledge, all outside resources linked here are also free and open to access. Kinfeather is not affiliated with the organizations that host these resources and receives no financial or other incentive for sharing them.",
  made: "Climate Color is a project of Kinfeather LLC."
};

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* The footer's inside as HTML text. `before` is HTML a page adds on top. */
export function siteFootHTML(before = "") {
  const f = SITE_FOOT;
  return `${before}<ul>${f.links.map(l => `<li><a href="${esc(l.url)}">${esc(l.name)}</a></li>`).join("")}</ul>` +
    `<p class="site-note">${esc(f.note)}</p><p>${esc(f.made)}</p>`;
}

/* Fills a <footer class="site-foot"> element. */
export function renderSiteFoot(el, before = "") {
  if (el) el.innerHTML = siteFootHTML(before);
}
