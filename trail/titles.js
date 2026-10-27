/* ==========================================================================
   TITLES: written once, used on every trail, in every exhibit, and in
   every Field Guide
   ==========================================================================
   Titles are universal, so a reader learns them once and finds them again
   anywhere on the map. Nothing topic-specific goes here: topic words live
   inside, with the content they describe. Each title starts with a verb
   and is no longer than "Find out why your care matters." Keys match the
   keys in the data files. A part may add a short line under its title
   (its `line` field), which is written with its content.
   ========================================================================== */

export const TITLES = {
  /* The Trailhead */
  how:         "Get your bearings",
  pickTrail:   "Pick your trail",

  /* Stops along the trail, numbered 1 to 4 */
  know:        "Meet your way of helping",
  care:        "Find out why your care matters",
  fit:         "Rest and Reflect",
  community:   "Discover what you bring",

  /* The Lodge and its exhibits */
  pickExhibit: "Pick an exhibit",
  why:         "Discover why it matters",
  changing:    "Find out what's changing",
  who:         "Meet who feels it first",
  life:        "Find it in your own life",
  /* {action} is the reader's trail: "Put your Connecting to work." */
  work:        "Put your {action} to work",

  /* The Field Guide */
  story:       "Meet someone like you",
  think:       "Think it through",
  tryIt:       "Try it now",
  others:      "Learn other ways to help",
  nearby:      "Find ways to help close to home",
  first:       "Choose your first step"
};

/* The order things appear in. */
export const TRAIL_ORDER = ["know", "care", "fit", "community"];
export const EXHIBIT_ORDER = ["why", "changing", "who", "life"];
/* The Field Guide: the trail's pages once, then a set for each topic the
   reader keeps. */
export const GUIDE_TRAIL = ["story", "tryIt", "others"];
export const GUIDE_TOPIC = ["think", "nearby", "first"];
