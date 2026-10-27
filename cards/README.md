# Climate Color Cards

The starter pack of the Climate Color card deck, at climatecolor.com/cards/. It's a working page: kept out of search results (`noindex`) and not linked from the rest of the site yet.

## What's on the page

- **Draw a pair.** Two face-down cards turn over to one action and one topic. The page asks how that action could help with that topic, gives the Trail's own idea for the pair, and links to that trail and exhibit.
- **The deck.** All 18 action cards, all 9 topic cards, and the card back.
- **Print a set.** Prints the cards on letter paper at playing-card size (2.5 × 3.5 inches), nine to a page, with lines to cut along. A checkbox adds a page of backs after each page of cards, for two-sided printing.

## Where the words come from

None of the card text is written here. `cards.js` reads it from the same files the Trail uses, so the cards and the Trail always match:

| On the card | Comes from |
|---|---|
| Color and archetype ("Red · Anchor") | `core/climate-color.js` |
| Action word, phrase, and "For example" | `trail/data/adult/trails/<color>.js`, the "Three typical actions" |
| Topic name, icon, teaser, and source chapter | `trail/data/adult/topics.js` |
| The idea for a drawn pair | `trail/data/adult/exhibits/<topic>.js`, its `work` lines |
| Card colors and tints | `core/atlas.css` |

## Files

| File | What it holds |
|---|---|
| `index.html` | The page shell and a copy of the nine topic icons |
| `cards.js` | Builds every card, the draw, and the print sheet |
| `cards.css` | Card styles, phone sizes, and the print sheet |

## When something changes

- **Card words:** change them in the Trail's data. The cards follow.
- **A topic icon:** the icons are copied from `trail/index.html`. Change them in both places.
- **The import map in `index.html`:** recompute its sha256 in the Content Security Policy line, or no cards will appear.
- **Card sizes:** every size on a card is in `em`, set from `--card-size` in `cards.css`: 15px on screen, 12px in print (a 2.5 × 3.5 inch card).
