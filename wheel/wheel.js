/* ==========================================================================
   THE WHEEL PAGE: fills in the words and draws the wheel
   ==========================================================================
   Everything on this page lives in core/, so it matches every other page
   that shows the wheel:

     data-wheel-text="short"     -> a line from WHEEL_TEXT in
                                    core/climate-color.js ("how.title"
                                    reaches one level in)
     id="wheel"                  -> the brand wheel from core/wheel.js; a
                                    tap on a color shows its card in
                                    id="wheelCard", with a button to the
                                    color's page
     id="wheelPage"              -> gets the class has-card while a card
                                    is open, so wheel.css can set "How to
                                    read it" and "Why a wheel?" aside
   ========================================================================== */

import { WHEEL_TEXT, pathwayUrl } from "../core/climate-color.js";
import { renderWheel } from "../core/wheel.js";

document.querySelectorAll("[data-wheel-text]").forEach(el => {
  const text = el.dataset.wheelText.split(".").reduce((o, k) => o?.[k], WHEEL_TEXT);
  if (typeof text === "string") el.textContent = text;
});

const page = document.getElementById("wheelPage");

renderWheel(document.getElementById("wheel"), {
  variant: "brand",
  links: pathwayUrl,
  panel: document.getElementById("wheelCard"),
  onSelect: key => page.classList.toggle("has-card", !!key),
  label: "The Stewardship Wheel: six colors around the Earth, each with its archetype and three words for how it helps. Tap a color to learn about it."
});
