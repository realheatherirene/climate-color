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
  care:        "Find out why your care matters",
  know:        "Meet your way of helping",
  fit:         "Rest and Reflect",
  community:   "Discover what you bring",

  /* The Lodge and its exhibits, lettered A to I */
  pickExhibit: "Pick an exhibit",
  why:         "Discover why it matters",
  changing:    "Find out what's changing",
  who:         "Meet who feels it first",
  life:        "Find it in your own life",

  /* The Field Guide */
  story:       "Meet someone like you",
  think:       "Think it through",
  tryIt:       "Try it now",
  others:      "Learn other ways to help",
  first:       "Choose your first step",

  /* The Bulletin Board */
  next:        "Choose what comes next",
  nearby:      "Find work close to home"
};

/* The order things appear in. Anything a trail or exhibit hasn't been
   written for yet is skipped. */
export const TRAIL_ORDER = ["care", "know", "fit", "community"];
export const EXHIBIT_ORDER = ["why", "changing", "who", "life"];
export const GUIDE_ORDER = ["story", "think", "tryIt", "others", "first"];
