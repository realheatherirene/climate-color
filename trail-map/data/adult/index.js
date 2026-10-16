/* The adult content pack. A youth pack (data/youth/index.js) exports the
   same names with youth wording; the renderer picks a pack and never
   changes. Adding a trail or an exhibit = one file + one line here. */
export { default as trailhead } from "./trailhead.js";
export { default as shared } from "./shared.js";
export { default as topics } from "./topics.js";
import green from "./trails/green.js";
import blue from "./trails/blue.js";
import water from "./exhibits/water.js";
export const trails = { Green: green, Blue: blue };
export const exhibits = { water };
