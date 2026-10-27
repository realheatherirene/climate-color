# Climate Color
> Find the kind of climate action that energizes you.

Climate Color helps people find their **climate colors**: the strengths they
already use to care for their communities, and can use for the climate too.
Community care is climate care. Six colors, each with an archetype (like the
Connector or the Navigator) and three words for how it helps, sit at the
center of the Climate Color Trail.

Climate Color is a project of **Kinfeather** (Kinfeather LLC). Its Terms,
Privacy, and Accessibility pages live on kinfeather.com.

* **Creator:** Heather Succio
* **Status:** Public preview

---

## The site

This repository is the whole site at **https://climatecolor.com**: the
**Climate Color Trail**, a learning trail where readers pick a way of
helping, follow four stops, visit the Climate Lodge, take a Field Guide,
and end at the Bulletin Board. GitHub Pages serves it from the main
branch, at the top level; `CNAME` holds the address and `.nojekyll` tells
GitHub to serve every file as it is.

| Address | Folder | What it is |
|---|---|---|
| climatecolor.com/trail/ | `trail/` | **The Trail.** See `trail/README.md` |
| climatecolor.com | top level | Forwards to /trail/ |
| climatecolor.com/core/ | `core/` | The shared core the Trail loads, and a reference page |

The Trail stays at /trail/ on purpose: its saved-spot links
(climatecolor.com/trail/#green-water) depend on that address.

Old addresses keep working. stewardshiptrail.com and
trailmap.climatecolor.com forward to /trail/ at the registrar. The one-line
pages in `terms/`, `privacy/`, and `accessibility/` forward to
kinfeather.com. Links to retired pages land on the 404 page, which points
to the Trail.

Until October 2026, the site also held a home page, the Climate Color
Wheel, and the Climate Color Directory. They retired when the site became
the Trail alone, and the earlier repository is archived as a record.

## Where everything lives

| Path | What's in it |
|---|---|
| `trail/` | The Trail: its page, code, look, words, and icons |
| `core/climate-color.js` | **The source of truth:** the six colors, their archetypes, what each provides, their three words, and the Trail's address |
| `core/atlas.css` | How everything looks: the brand colors, text shades, and tints, and the styles every page shares |
| `core/site-foot.js` | The footer every page shares: legal links, the open-resource note, the owner line. The 404 page runs no scripts, so it holds a typed copy; change both together |
| `core/index.html` | A reference page: every color with its contrast checks |
| `index.html`, `404.html` | The forward to the Trail, and the "page not found" page |
| `.github/workflows/check-links.yml`, `.lycheeignore` | The weekly link check for the whole site, and the sites it skips |

## How it's built

Plain HTML, CSS, and JavaScript (ES modules), with no build step and no
dependencies. Everything runs in the browser. There are no accounts and no
tracking. Pages load fonts from Google Fonts. Each page carries a Content
Security Policy. Pages with inline scripts name them by fingerprint (the
Trail's two, and the one in `core/index.html`), so edit those scripts only
with care and recompute the fingerprint after any change.

## Making common changes

* **A color's archetype, words, or "provides":** edit `COLORS` in
  `core/climate-color.js`. Links use color names, so renaming an archetype
  breaks nothing.
* **A brand color or shade:** edit `core/atlas.css`, then open
  `core/index.html` and check that every contrast check still passes.
* **Trail words:** edit the files in `trail/data/adult/`. Titles live once in
  `trail/titles.js`.
* **Uploading:** go into the right folder on GitHub first. Trail files go in
  `trail/`, core files in `core/`. Files keep Windows line endings (CRLF).

## Conventions

* **One place for everything.** Colors, names, and wording live in `core/`;
  pages never keep their own copies.
* **Color first, then archetype:** "Blue · Communicator". Never show a color
  without its name.
* **Public wording** is plain, at a 9th-grade reading level or below, with no
  words that assume a body or a sense (walk, see, look, hear, listen, notice).
* **Contrast:** all text clears 4.5:1.

## Trying it locally

The pages use ES modules and root-relative addresses (`/core/`), so serve
this folder as the site's top level:

```
cd climate-color
python3 -m http.server
```

Then visit `http://localhost:8000/trail/`.

---

## 💼 Enterprise & Organizational Inquiries

Looking to facilitate Climate Color workshops, run team assessment cohorts, or access enterprise L&D tools for your organization?

We offer workshops, facilitated team mapping, B2B toolkits, and organizational resources through Kinfeather. Visit [kinfeather.com](https://kinfeather.com) or reach out to **climatecolor@kinfeather.com** to learn more.

---

🌐 *Explore the web app live at [climatecolor.com](https://climatecolor.com)*

---
