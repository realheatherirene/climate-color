/* The nine topics, one exhibit each, in the order the Pavilion shows them.
   The exhibit picker shows each name and its four everyday examples; the
   teaser and its source open the exhibit. Examples are lowercase words,
   shown with dots between them. Teasers teach about the topic; they never
   ask "would you do this?" Sources: the Fifth National Climate
   Assessment, 2023.
   Adult pack: grade 9 reading level or lower. */

/* Every link is written out in full, so each one can be checked as is.
   The assessment's own website was taken offline in 2025; these copies
   are hosted by NOAA's U.S. Climate Resilience Toolkit. A teaser's src
   can be one source or a list. */

export default {
  topics: [
    { key: "food", name: "Food", icon: "i-food", about: ["farms", "gardens", "kitchens", "meals"],
      teaser: "Climate change is shifting growing seasons and bringing more extreme weather to farms. That can make food harder to find and harder to afford, and not everyone feels it equally.",
      src: { title: "Fifth National Climate Assessment, Ch. 11: Agriculture, Food Systems, and Rural Communities", url: "https://toolkit.climate.gov/NCA5_Ch11_Agriculture", web: "https://nca5.climate.us/chapter/11", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch11_Agriculture" } },
    { key: "water", name: "Water", icon: "i-water", about: ["rivers", "lakes", "oceans", "drinking water"],
      teaser: "Heavier rains are bringing more flood damage, and droughts are doing more harm. Every community will feel these changes, and some will feel them first.",
      src: { title: "Fifth National Climate Assessment, Ch. 4: Water", url: "https://toolkit.climate.gov/NCA5_Ch4_Water", web: "https://nca5.climate.us/chapter/4", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch4_Water" } },
    { key: "air", name: "Air", icon: "i-air", about: ["heat", "cold", "pollen", "pollution"],
      teaser: "Climate change is bringing more heat, smoke, and pollen to the air around us. When pollution is cut, the air nearby gets cleaner almost right away.",
      src: { title: "Fifth National Climate Assessment, Ch. 14: Air Quality", url: "https://toolkit.climate.gov/NCA5_Ch14_Air-Quality", web: "https://nca5.climate.us/chapter/14", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch14_Air-Quality" } },
    { key: "energy", name: "Energy", icon: "i-energy", about: ["power", "fuel", "heating", "cooling"],
      teaser: "Climate change puts the ways we make and deliver energy at risk, and it's changing how much energy people need. Communities across the country are working to make power more reliable.",
      src: { title: "Fifth National Climate Assessment, Ch. 5: Energy Supply, Delivery, and Demand", url: "https://toolkit.climate.gov/NCA5_Ch5_Energy", web: "https://nca5.climate.us/chapter/5", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch5_Energy" } },
    { key: "transportation", name: "Transport", icon: "i-transportation", about: ["roads", "rails", "buses", "bikes"],
      teaser: "Getting around is the largest source of heat-trapping gases in the United States. Cleaner ways to travel can also mean better health for the people nearby.",
      src: { title: "Fifth National Climate Assessment, Ch. 13: Transportation", url: "https://toolkit.climate.gov/NCA5_Ch13_Transportation", web: "https://nca5.climate.us/chapter/13", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch13_Transportation" } },
    { key: "housing", name: "Housing", icon: "i-housing", about: ["homes", "neighborhoods", "shelter", "rent"],
      teaser: "How we build cities and homes can make heat and flooding worse, or better. Cities across the country are working to adapt.",
      src: { title: "Fifth National Climate Assessment, Ch. 12: Built Environment, Urban Systems, and Cities", url: "https://toolkit.climate.gov/NCA5_Ch12_Built-Environment", web: "https://nca5.climate.us/chapter/12", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch12_Built-Environment" } },
    { key: "goods", name: "Goods", icon: "i-goods", about: ["stores", "shipping", "repair", "waste"],
      teaser: "Making, shipping, and throwing away the things we buy gives off heat-trapping gases. Fixing, sharing, and reusing them helps the climate.",
      src: { title: "Fifth National Climate Assessment, Ch. 32: Mitigation", url: "https://toolkit.climate.gov/NCA5_Ch32_Mitigation", web: "https://nca5.climate.us/chapter/32", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch32_Mitigation" } },
    { key: "land", name: "Land", icon: "i-land", about: ["forests", "parks", "soil", "wildlife"],
      teaser: "Climate change is making threats to forests more frequent and severe, and changing where plants and animals can live. Forests and wild places give us clean air and water, shade, and places to rest.",
      src: [
        { title: "Fifth National Climate Assessment, Ch. 7: Forests", url: "https://toolkit.climate.gov/NCA5_Ch7_Forests", web: "https://nca5.climate.us/chapter/7", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch7_Forests" },
        { title: "Fifth National Climate Assessment, Ch. 8: Ecosystems, Ecosystem Services, and Biodiversity", url: "https://toolkit.climate.gov/NCA5_Ch8_Ecosystems", web: "https://nca5.climate.us/chapter/8", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch8_Ecosystems" }
      ] },
    { key: "health", name: "Health", icon: "i-health", about: ["bodies", "minds", "clinics", "care"],
      teaser: "Climate change is already harming people's physical and mental health, through extreme weather, disease, and less safe food and water.",
      src: { title: "Fifth National Climate Assessment, Ch. 15: Human Health", url: "https://toolkit.climate.gov/NCA5_Ch15_Human-Health", web: "https://nca5.climate.us/chapter/15", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch15_Human-Health" } }
  ]
};
