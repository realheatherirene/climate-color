/* The adult content pack. A youth pack (data/youth/index.js) exports the
   same names with youth wording; the renderer picks a pack and never
   changes. Adding a trail or lodge = one file + one line here. */
export { default as trailhead } from "./trailhead.js";
export { default as shared } from "./shared.js";
export { default as topics } from "./topics.js";
import green from "./trails/green.js";
import water from "./lodges/water.js";
export const trails = { Green: green };
export const lodges = { water };
