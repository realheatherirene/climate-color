/* ==========================================================================
   CLIMATE COLOR: the one source of truth for what each color means
   ==========================================================================
   Every page reads the color system from here, so nothing drifts out of
   sync. The Climate Trailway (climatetrailway.com/trail/) loads these
   files from the same site, at /core/.
   What lives where in core/:

     climate-color.js  What each color MEANS (this file): the six colors,
                       their archetypes, what each provides, and their
                       three words.
     atlas.css         What everything LOOKS like: the brand colors, their
                       text shades and light tints, plus the styles every
                       page shares (header, pills, buttons).
     site-foot.js      The footer every page shares.
     index.html        The reference page that shows all of it, with
                       contrast checks.

   RULES
     - Color names are the keys (links and data). Archetypes are display
       labels only, so they can be renamed without breaking links.
     - Lead with the color, then its archetype: "Blue · Communicator".
       In sentences, people use the archetype or the action form:
       "I am a Communicator", "I like Communicating".
     - COLORS is in the order of the old Climate Color Wheel, clockwise
       from the top: Yellow, Green, Blue, Indigo, Red, Orange. Lists,
       pills, cards and tables use COLOR_KEYS instead, which starts at Red.
     - `provides` is what the color brings to any group.
     - `words` are each color's three words. Each one covers one of
       purpose, process and people, in that order. Those three are for
       writing content only and never appear on the site. `phrase` is the
       plain meaning of each word. The Climate Trailway explains the
       same words in action form ("Unite: bringing people who care about
       the same thing together"), in its own trail files. When a phrase
       changes here, check the Trail's to match.
     - `label` is the text color to use on the full brand color: whichever
       of black or white clears 4.5:1 on it. core/index.html checks it
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

/* Color keys in list order, for pills, cards and tables: rainbow order,
   starting at Red. */
export const COLOR_KEYS = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo"];

const byKey = new Map(COLORS.map(c => [c.key, c]));

/* The full record for a color key: getColor("Green"). */
export function getColor(key) {
  return byKey.get(key) || null;
}

/* The atlas.css variable names for a color: cssVar("Green") ->
   "--green-color", cssVar("Green", "text") -> "--green-text". Use in
   styles as `var(${cssVar(key)})`. */
export function cssVar(key, kind = "color") {
  return `--${key.toLowerCase()}-${kind}`;
}

/* The live hex value from core/atlas.css, e.g. colorValue("Green") ->
   "#46760F". Needs a page that has loaded atlas.css. Returns "" if it
   can't find one. */
export function colorValue(key, kind = "color", el = document.documentElement) {
  return getComputedStyle(el).getPropertyValue(cssVar(key, kind)).trim().toUpperCase();
}
