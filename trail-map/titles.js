/* ==========================================================================
   STOP TITLES: written once, used on every trail and in every lodge
   ==========================================================================
   Titles are universal, so a reader learns them once and finds them again
   anywhere on the map. Nothing topic-specific goes here: topic words live
   inside the stop, with the content they describe. Each title starts with
   a verb. Keys match the stop keys in the data files.
   ========================================================================== */

export const TITLES = {
  how:       "How this trail works",
  pickTrail: "Pick your trail",
  pickLodge: "Pick your lodge",
  care:      "Find out why your care matters",
  know:      "Get to know your way of helping",
  fit:       "Rest and Reflect",
  community: "Discover what your way of helping brings to a community",
  changing:  "Find out what's changing",
  role:      "Discover what your way of helping can do here",
  local:     "Rest and Reflect",
  nearby:    "Find work close to home",
  first:     "Rest and Reflect",
  station:   "Ranger Station",
  junction:  "Choose what comes next"
};

/* The order stops appear in. The renderer numbers them in this order,
   skipping any that a trail or lodge hasn't been written for yet. */
export const TRAIL_ORDER = ["care", "know", "fit", "community"];
export const LODGE_ORDER = ["changing", "role", "local", "nearby", "first"];
