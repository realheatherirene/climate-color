/* The adult content pack. A youth pack (data/youth/index.js) exports the
   same names with youth wording; the renderer picks a pack and never
   changes. Adding a trail or an exhibit = one file, plus its import and
   its entry below. */
export { default as trailhead } from "./trailhead.js";
export { default as shared } from "./shared.js";
export { default as topics } from "./topics.js";
import red from "./trails/red.js";
import orange from "./trails/orange.js";
import yellow from "./trails/yellow.js";
import green from "./trails/green.js";
import blue from "./trails/blue.js";
import indigo from "./trails/indigo.js";
import food from "./exhibits/food.js";
import water from "./exhibits/water.js";
import air from "./exhibits/air.js";
import energy from "./exhibits/energy.js";
import transportation from "./exhibits/transportation.js";
import housing from "./exhibits/housing.js";
import goods from "./exhibits/goods.js";
import land from "./exhibits/land.js";
import health from "./exhibits/health.js";
export const trails = { Red: red, Orange: orange, Yellow: yellow, Green: green, Blue: blue, Indigo: indigo };
export const exhibits = { food, water, air, energy, transportation, housing, goods, land, health };
