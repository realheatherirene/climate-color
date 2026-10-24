# The Climate Color Trail

A learning trail into the climate movement: one of the Climate Color
experiences, a project of Kinfeather. Readers pick
a way of helping (a trail), follow four stops, pick a topic in the Lodge,
choose what's next at the Bulletin Board, and take home a Field Guide.

Live at **https://climatecolor.com/trail/**. stewardshiptrail.com and
trailmap.climatecolor.com forward here.

## How it's built

- `index.html`: the page shell and icon set. It names the shared core's
  address once (CORE), in two lines: an import map and the base stylesheet.
- `trail.js`: draws the page from the data files; behavior only.
- `exhibits.js`: how each kind of block is drawn.
- `titles.js`: every universal stop title, written once.
- `trail.css`: the page's look.
- `data/adult/`: all the words. One file per trail and per exhibit, plus
  `shared.js`, `topics.js`, and `trailhead.js`. Adding a trail or an
  exhibit is one file plus one line in `data/adult/index.js`.

## The shared core

Colors, ways of helping, plain meanings, and the base stylesheet
live in `core/`, beside this folder in the climate-color repository, and
load from `/core/`, so a change there reaches every tool that shares it.

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
changes the address.
