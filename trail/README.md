# The Climate Trailway

A learning trail into the climate movement, from Kinfeather, laid out
like a state park:

1. **Trailhead:** get your bearings and pick a way of helping. Each one
   is its own trail, marked by its color, like trail blazes.
2. **Markers 1 to 4:** meet your way of helping, on your own trail.
3. **Climate Pavilion:** where every trail meets. Pick a topic and visit
   its exhibit. It's a place, not a numbered marker.
4. **Markers 5 to 7, the Return Trail:** a story, your own place, and
   the other helpers. The same for everyone, in the park's wood brown.
5. **Visitor Center:** the end of the trail. Choose a first step, find
   ways to help on the Bulletin Board, and take home a Field Guide
   (print, save as PDF, download, or keep a link).

The Field Guide is a keepsake, not a place: it gathers what the reader
did, notes included, and asks nothing new. Inside the code, some old
names stay as keys so saved links keep working: `lodge` is the Pavilion,
`back` is the Return Trail, and `finish` is the Visitor Center.

Live at **https://climatetrailway.com/trail/**. climatetrailway.com
forwards here, and so do climatecolor.com, stewardshiptrail.com and
trailmap.climatecolor.com once they're set to forward at the registrar.

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
live in `core/`, beside this folder in the climate-trailway repository, and
load from `/core/`.

## Owner

The Climate Trailway is a project of Kinfeather (Kinfeather LLC). Its Terms,
Privacy, and Accessibility pages live on kinfeather.com.

## Links

Every outside link is written out in full. Sources also carry an
`archive:` link to a saved copy on the Wayback Machine. The weekly link
check and its skip list live at the top of the climate-trailway repository
(`.github/workflows/check-links.yml` and `.lycheeignore`).

## Address

This folder is served at climatetrailway.com/trail/. Renaming the folder
changes the address and breaks every saved-spot link
(climatetrailway.com/trail/#green-water), so keep the name.

Saved-spot links name exhibits by key. If an exhibit's key changes, add
the old key to `OLD_KEYS` in `trail.js`, so saved links still open the
exhibit that took it in.
