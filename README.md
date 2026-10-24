# Climate Color
> Find the kind of climate action that energizes you.

Climate Color helps people find their **climate colors**: the strengths they
already use to care for their communities, and can use for the climate too.
Community care is climate care. Six colors, each with an archetype (like the
Connector or the Navigator) and three words for how it helps, sit at the
center of every Climate Color experience.

Climate Color is a project of **Kinfeather** (Kinfeather LLC). Its Terms,
Privacy, and Accessibility pages live on kinfeather.com.

* **Creator:** Heather Succio
* **Status:** Public preview
* **License:** Creative Commons (CC BY-NC-SA 4.0)

---

## The site

This repository is the whole site at **https://climatecolor.com**. GitHub
Pages serves it from the main branch, at the top level; `CNAME` holds the
address and `.nojekyll` tells GitHub to serve every file as it is.

| Address | Folder | What it is |
|---|---|---|
| climatecolor.com | top level | The home page: what Climate Color is, and a card for each experience |
| climatecolor.com/trail/ | `trail/` | **The Trail** (Climate Color Trail): pick a way of helping, follow four stops, visit the Climate Lodge, take a Field Guide, end at the Bulletin Board |
| climatecolor.com/core/ | `core/` | The shared core every experience loads |

**The Wheel** (Climate Color Wheel) is on hold. It lives in the
`stewardship-wheel` repository at stewardshipwheel.com for now and is listed
on the home page as coming later. When it returns, it becomes a `wheel/`
folder here (today `wheel/` holds a one-line page that forwards to the home
page).

Old addresses keep working: stewardshiptrail.com and
trailmap.climatecolor.com forward to /trail/ at the registrar, and the
one-line pages in `trail-map/`, `pathways/`, `wheel/`, `terms/`,
`privacy/`, and `accessibility/` forward old climatecolor.com links.

## Where everything lives

| Path | What's in it |
|---|---|
| `index.html`, `home.css`, `404.html`, `images/` | The home page, its look, the "page not found" page, and its icons and link preview |
| `core/climate-color.js` | **The source of truth:** the six colors, their archetypes, what each provides, their three words, the wheel's wording, and the site's addresses |
| `core/atlas.css` | How everything looks: the brand colors and shades, and the styles every page shares |
| `core/wheel.js`, `core/color-card.js` | Draws the wheel, and one card per color (used by the Wheel) |
| `core/index.html` | A reference page: the wheel with downloads, every color with its contrast checks |
| `core/images/` | The globe at the center of the wheel |
| `trail/` | The Trail. See `trail/README.md` |
| `.github/workflows/check-links.yml`, `.lycheeignore` | The weekly link check for the whole site, and the sites it skips |

## How it's built

Plain HTML, CSS, and JavaScript (ES modules), with no build step and no
dependencies. Everything runs in the browser. There are no accounts and no
tracking. Pages load fonts from Google Fonts. Each page carries a Content
Security Policy; the Trail's names its two small inline scripts by
fingerprint, so edit those lines only with care (see `trail/index.html`).

## Making common changes

* **A color's archetype, words, or "provides":** edit `COLORS` in
  `core/climate-color.js`. If you rename an archetype, add the old name to
  `ALIASES` so old links still work.
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

Then visit `http://localhost:8000/` and `http://localhost:8000/trail/`.

---

## ⚖️ Licensing & Attribution

This project is open-access and licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)** license.

### How to Credit

If you adapt, share, or build upon this work, please include the following attribution:

> **"Climate Color"** by Heather Succio, used under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

For full license terms, visit [Creative Commons](https://creativecommons.org/licenses/by-nc-sa/4.0/).

---

## 💼 Enterprise & Organizational Inquiries

Looking to facilitate Climate Color workshops, run team assessment cohorts, or access enterprise L&D tools for your organization?

We offer facilitated team mapping, B2B toolkits, and organizational resources. Visit [climatecolor.com](https://climatecolor.com) or reach out to **hello@climatecolor.com** to learn more.

---

🌐 *Explore the web app live at [climatecolor.com](https://climatecolor.com)*

---
