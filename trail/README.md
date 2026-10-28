# The Climate Color Trail

A learning trail into the climate movement, from Climate Color, a project
of Kinfeather, laid out as a loop in a park:

1. **Visitor Center (arriving):** get your bearings and pick a way of
   helping (a trail).
2. **Stops 1 to 4:** meet your way of helping.
3. **Stop 5, the Climate Pavilion:** pick a topic and visit its exhibit.
4. **Stops 6 to 8, the way back:** a story, your own place, and the
   other helpers. The same for every topic.
5. **Back at the Visitor Center:** choose a first step, find what's
   happening near you on the Bulletin Board, and take home a Field Guide
   (print, save as PDF, download, or keep a link).

The Field Guide is a keepsake, not a place: it gathers what the reader
did, notes included, and asks nothing new. Inside the code, some old
names stay as keys so saved links keep working: `trailhead` is the
Visitor Center on arrival, `lodge` is the Pavilion, and `finish` is the
return.

Live at **https://climatecolor.com/trail/**. climatecolor.com,
stewardshiptrail.com and trailmap.climatecolor.com forward here.

## How it's built

- `index.html`: the page shell and icon set. It names the shared core's
  address once (CORE), in two lines: an import map and the base stylesheet.
- `trail.js`: draws the page from the data files; behavior only.
- `exhibits.js`: how each kind of block is drawn.
- `titles.js`: every universal stop title, written once.
- `trail.css`: the page's look.
- `data/adult/`: all the words. One file per trail and per exhibit, plus
  `shared.js`, `topics.js`, and `trailhead.js`. Adding a trail or an
  exhibit is one file, plus its import and entry in `data/adult/index.js`.

## The shared core

Colors, ways of helping, plain meanings, and the base stylesheet
live in `core/`, beside this folder in the climate-color repository, and
load from `/core/`.

## Owner

Climate Color, including the Trail, is a project of Kinfeather (Kinfeather LLC). Its Terms,
Privacy, and Accessibility pages live on kinfeather.com.

## Links

Every outside link is written out in full. Sources also carry an
`archive:` link to a saved copy on the Wayback Machine. The weekly link
check and its skip list live at the top of the climate-color repository
(`.github/workflows/check-links.yml` and `.lycheeignore`).

## Address

This folder is served at climatecolor.com/trail/. Renaming the folder
changes the address and breaks every saved-spot link
(climatecolor.com/trail/#green-water), so keep the name.

Saved-spot links name exhibits by key. If an exhibit's key changes, add
the old key to `OLD_KEYS` in `trail.js`, so saved links still open the
exhibit that took it in.
