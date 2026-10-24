/* ==========================================================================
   CLIMATE COLOR: the one source of truth for what each color means
   ==========================================================================
   Every page reads the color system from here, so nothing drifts out of
   sync: every Climate Color experience loads these files. The Trail
   (climatecolor.com/trail/) loads them from the same site, at /core/; the
   Wheel (stewardshipwheel.com, on hold) loads them from this repo's old
   GitHub Pages address, which forwards to climatecolor.com/core/.
   What lives where in core/:

     climate-color.js  What each color MEANS (this file): the six colors of
                       the Stewardship Wheel, their archetypes, what each
                       provides, their three words, the wheel's wording,
                       and the site's page addresses.
     atlas.css         What everything LOOKS like: the brand colors, their
                       text shades and wheel shades, plus the styles every
                       page shares (header, pills, cards, buttons). No hex
                       codes live in this file.
     wheel.js          The wheel, drawn from the two files above.
     color-card.js     One card per color, with a button to its trail.
     index.html        The reference page that shows all of it, with
                       wheel downloads and contrast checks.

   RULES
     - Color names are the keys (links and data). Archetypes are display
       labels only, so they can be renamed without breaking links. When
       one is renamed, add the old name to ALIASES so old links still work.
     - Lead with the color, then its archetype: "Blue · Communicator".
       In sentences, people use the archetype or the action form:
       "I am a Communicator", "I like Communicating".
     - COLORS is in wheel order, clockwise from 12 o'clock (Yellow centered
       at the top). Lists, pills, cards and tables use COLOR_KEYS instead,
       which starts at Red.
     - `provides` is what the color brings to any group.
     - `words` are the outer ring, clockwise. Each one covers one of
       purpose, process and people, in that order. Those three are for
       writing content only and never appear on the site. `phrase` is the
       plain meaning of each word, shown on the color's card on the Wheel.
       The Stewardship Trail explains the same words in action form ("Unite:
       bringing people who care about the same thing together"), in its own
       trail files. When a phrase changes here, check the Trail's to match.
     - `label` is the wheel's text color on that wedge: whichever of black
       or white clears 4.5:1 on the brand color. core/index.html checks it
       live and flags it if a palette change ever breaks it.
   ========================================================================== */

export const COLORS = [
  {
    key: "Yellow", archetype: "Motivator", plural: "Motivators", action: "Motivating",
    provides: "energy", label: "black",
    words: [
      { word: "Inspire", phrase: "excitement about why it matters now" },
      { word: "Rally", phrase: "momentum that keeps things moving" },
      { word: "Encourage", phrase: "encouragement" }
    ]
  },
  {
    key: "Green", archetype: "Connector", plural: "Connectors", action: "Connecting",
    provides: "support", label: "white",
    words: [
      { word: "Unite", phrase: "people who care about it together" },
      { word: "Network", phrase: "the right help and resources, linked up" },
      { word: "Include", phrase: "belonging" }
    ]
  },
  {
    key: "Blue", archetype: "Communicator", plural: "Communicators", action: "Communicating",
    provides: "language", label: "white",
    words: [
      { word: "Clarify", phrase: "words for why it matters" },
      { word: "Inform", phrase: "clear communication: everyone knows what's going on" },
      { word: "Influence", phrase: "shaping how people think and talk about it" }
    ]
  },
  {
    key: "Indigo", archetype: "Navigator", plural: "Navigators", action: "Navigating",
    provides: "direction", label: "white",
    words: [
      { word: "Assess", phrase: "priorities: what matters most now" },
      { word: "Adapt", phrase: "the next step, and adjusting when things change" },
      { word: "Guide", phrase: "guidance: helping people find their way" }
    ]
  },
  {
    key: "Red", archetype: "Anchor", plural: "Anchors", action: "Anchoring",
    provides: "grounding", label: "white",
    words: [
      { word: "Focus", phrase: "a clear mission everyone stands on" },
      { word: "Build", phrase: "a solid base: roles, commitments, structure" },
      { word: "Secure", phrase: "steadiness: someone to count on" }
    ]
  },
  {
    key: "Orange", archetype: "Creator", plural: "Creators", action: "Creating",
    provides: "vision", label: "black",
    words: [
      { word: "Dream", phrase: "an idea of what could be" },
      { word: "Invent", phrase: "new ways of doing things" },
      { word: "Invite", phrase: "room for everyone's ideas" }
    ]
  }
];

/* Old archetype names, so old links still find their color:
   { OldName: "ColorKey" }. When an archetype is renamed, add its old name
   here and keep it. */
export const ALIASES = {};

/* Color keys in list order, for pills, cards and tables: rainbow order,
   starting at Red. */
export const COLOR_KEYS = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo"];

const byKey = new Map(COLORS.map(c => [c.key, c]));

/* Any name a link might carry (color, archetype, plural, action form, or
   old alias, in any capitalization) mapped to its color key. */
const lookup = new Map();
for (const c of COLORS) {
  for (const n of [c.key, c.archetype, c.plural, c.action]) lookup.set(n.toLowerCase(), c.key);
}
for (const [oldName, key] of Object.entries(ALIASES)) {
  lookup.set(oldName.toLowerCase(), key);
  lookup.set((oldName + "s").toLowerCase(), key);
}

/* "blue", "Communicator", "communicators", "Communicating" -> "Blue".
   Returns null for anything that isn't one of the six. */
export function resolveColor(name) {
  if (typeof name !== "string") return null;
  return lookup.get(name.trim().toLowerCase()) || null;
}

/* A list of colors from a link, like "Green,Indigo,Orange". Each name
   resolves the same way as resolveColor. Unknown names and repeats are
   dropped, and the order given is kept:
   resolveColors("green, navigators, green") -> ["Green", "Indigo"]. */
export function resolveColors(text) {
  if (typeof text !== "string") return [];
  return [...new Set(text.split(",").map(resolveColor).filter(Boolean))];
}

/* How many of a palette's colors an item carries. Pages use it to show
   the best matches first:
   paletteMatches(["Green", "Orange"], ["Green", "Indigo", "Orange"]) -> 2. */
export function paletteMatches(itemColors, palette) {
  return itemColors.filter(k => palette.includes(k)).length;
}

/* The full record for a color key (or any name resolveColor accepts). */
export function getColor(name) {
  return byKey.get(resolveColor(name)) || null;
}

/* The atlas.css variable names for a color: cssVar("Green") ->
   "--green-color", cssVar("Green", "text") -> "--green-text". Use in
   styles as `var(${cssVar(key)})`. */
export function cssVar(name, kind = "color") {
  const key = resolveColor(name);
  return key ? `--${key.toLowerCase()}-${kind}` : null;
}

/* The words that go with the wheel. Change a line here and every page
   that shows the wheel follows. Written at a 9th-grade reading level or
   below, with no words that assume a body or a sense (walk, see, look,
   hear).

     short   One short paragraph. Used wherever the wheel appears.
     how     "How to read it", on the Wheel page.
     why     "Why a wheel?", on the Wheel page.
     more    The line that points from other pages to the Wheel page. */
export const WHEEL_TEXT = {
  short: "The Stewardship Wheel is an interactive tool that can be used to identify the mental, emotional, and practical strengths you use to care for the world around you.",
  how: {
    title: "How to read it",
    body: "The words in the inner ring of the wheel represent the six core stewardship styles. The words in the outer ring suggest some behaviors, choices, and expressions that can bring each style to life."
  },
  why: {
    title: "Why a wheel?",
    body: "Because care moves in a circle. We care for the Earth, and the Earth cares for us. The Earth teaches us, and it learns from what we do. The rainbow starts with Red, the ground everything stands on. Every color has a place, and the circle is only whole with all six. You bring your colors, and other people bring the rest. That's how you find your friends in the climate movement."
  },
  more: "Learn about the Stewardship Wheel"
};

/* Climate Color (climatecolor.com), a project of Kinfeather, and its
   experiences: the Trail, where people find their way of helping and put
   it to work, and the Wheel, where groups learn how the ways fit together
   (on hold, shown on the home page as coming later). The key trailMap
   keeps its old name, since other pages already read it. */
export const SITE = {
  home: "https://climatecolor.com",
  wheel: "https://stewardshipwheel.com",
  trailMap: "https://climatecolor.com/trail"
};

/* A link that opens the Trail with one color's trail already picked:
   trailUrl("Green") -> "https://climatecolor.com/trail/#green".
   The one place these links are built, so a future teen version can
   change them in one line. */
export function trailUrl(name) {
  const key = resolveColor(name);
  return key ? `${SITE.trailMap}/#${key.toLowerCase()}` : `${SITE.trailMap}/`;
}

/* A link that opens the Wheel with one color's card showing:
   wheelUrl("Green") -> "https://stewardshipwheel.com/?color=green". */
export function wheelUrl(name) {
  const key = resolveColor(name);
  return key ? `${SITE.wheel}/?color=${key.toLowerCase()}` : SITE.wheel;
}

/* The live hex value from core/atlas.css, e.g. colorValue("Green") ->
   "#46760F". Needs a page that has loaded atlas.css. Returns "" if it
   can't find one. */
export function colorValue(name, kind = "color", el = document.documentElement) {
  const v = cssVar(name, kind);
  return v ? getComputedStyle(el).getPropertyValue(v).trim().toUpperCase() : "";
}
