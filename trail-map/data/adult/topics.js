/* The nine topics, one exhibit each, in the order the Lodge shows them.
   The exhibit picker shows each name and its four-item description; the
   teaser and its source open the exhibit. Teasers teach about the topic;
   they never ask "would you do this?" Sources: the Fifth National Climate
   Assessment, 2023.
   Adult pack: grade 9 reading level or lower. */

const nca = (n, name) => ({ title: `Fifth National Climate Assessment, Ch. ${n}: ${name}`, url: `https://doi.org/10.7930/NCA5.2023.CH${n}` });

export default {
  topics: [
    { key: "food", name: "Food", icon: "i-food", about: "farms, gardens, kitchens, and meals",
      teaser: "Climate change is shifting growing seasons and bringing more extreme weather to farms. That can make food harder to find and harder to afford, and not everyone feels it equally.",
      src: nca(11, "Agriculture, Food Systems, and Rural Communities") },
    { key: "water", name: "Water", icon: "i-water", about: "rivers, lakes, oceans, and drinking water",
      teaser: "Heavier rains are bringing more flood damage, and droughts are doing more harm. Every community will feel these changes, and some will feel them first.",
      src: nca(4, "Water") },
    { key: "land", name: "Land", icon: "i-land", about: "soil, forests, plants, and open spaces",
      teaser: "Climate change is making some threats to forests more frequent, larger, and more severe. Forests give us clean air and water, shade, and places to rest.",
      src: nca(7, "Forests") },
    { key: "wildlife", name: "Wildlife", icon: "i-wildlife", about: "animals, birds, insects, and fish",
      teaser: "Climate change, along with other pressures, is changing where plants and animals can live. The loss of species is speeding up.",
      src: nca(8, "Ecosystems, Ecosystem Services, and Biodiversity") },
    { key: "energy", name: "Energy", icon: "i-energy", about: "power, fuel, heat, and light",
      teaser: "Climate change puts the ways we make and deliver energy at risk, and it's changing how much energy people need. Communities across the country are working to make power more reliable.",
      src: nca(5, "Energy Supply, Delivery, and Demand") },
    { key: "transportation", name: "Transportation", icon: "i-transportation", about: "roads, rails, buses, and bikes",
      teaser: "Getting around is the largest source of heat-trapping gases in the United States. Cleaner ways to travel can also mean better health for the people nearby.",
      src: nca(13, "Transportation") },
    { key: "waste", name: "Waste", icon: "i-waste", about: "trash, recycling, compost, and repair",
      teaser: "More than a third of all food in the United States goes to waste. Landfills give off methane, a heat-trapping gas, so wasting less helps the climate.",
      src: nca(32, "Mitigation") },
    { key: "health", name: "Health", icon: "i-health", about: "physical health, mental health, clinics, and care",
      teaser: "Climate change is already harming people's physical and mental health, through extreme weather, disease, and less safe food and water.",
      src: nca(15, "Human Health") },
    { key: "shelter", name: "Shelter", icon: "i-shelter", about: "homes, apartments, schools, and public buildings",
      teaser: "How we build cities and homes can make heat and flooding worse, or better. Cities across the country are working to adapt.",
      src: nca(12, "Built Environment, Urban Systems, and Cities") }
  ]
};
