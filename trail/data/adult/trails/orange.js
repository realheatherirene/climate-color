/* The Orange Trail: Creating.
   Color names, archetypes, and action words come from core/climate-color.js;
   this file holds only the words that are written for this trail: its stops,
   plus its story and its "Try it now" for the Field Guide.
   Adult pack: grade 9 reading level or lower. */

const BAIN = { title: "Bain and others, 2016, Nature Climate Change, via the University of Bath", url: "https://researchportal.bath.ac.uk/en/publications/co-benefits-of-addressing-climate-change-can-motivate-action-arou/", archive: "https://web.archive.org/web/2026/https://researchportal.bath.ac.uk/en/publications/co-benefits-of-addressing-climate-change-can-motivate-action-arou/" };
const FINLEY = { title: "Ron Finley, \"They Tried to Arrest Me for Planting Carrots,\" Fortune, February 25, 2015", url: "https://fortune.com/2015/02/25/they-tried-to-arrest-me-for-planting-carrots" };

export default {
  key: "Orange",

  know: {
    exhibit: "sign",
    blocks: [
      { p: "Creating is a way of helping. It means imagining what could be, trying new ways, and making room for everyone's ideas. Anyone can take this trail." },
      { sub: "Three typical actions" },
      { p: "Acts of creating show up in many different ways, but these three are quite common." },
      { actions: [
        { word: "Dream", phrase: "Imagining what could be", example: "Asking, \"What if our block had a garden?\" Sketching an idea on the back of an envelope." },
        { word: "Invent", phrase: "Trying new ways of doing things", example: "Fixing something with what you have on hand. Trying a new way when the old way stops working." },
        { word: "Invite", phrase: "Making room for everyone's ideas", example: "Asking the quiet person what they think. Building on someone's idea instead of replacing it." }
      ] },
      { sub: "Benefits of being a Creator" },
      { p: "Fresh ideas and hope. People can imagine a better future and try new ways to get there, and more people get a say in what happens." },
      { sub: "Challenges of being a Creator" },
      { p: "New ideas aren't always welcome, and not every try works. You don't have to come up with every idea or make every one succeed. Creating works best when ideas are shared." }
    ],
    ahead: "Why your care matters, and why you're in good company."
  },

  fit: {
    exhibit: "rest",
    blocks: [
      { sub: "Does Creating fit you?" },
      { questions: [
        "When have I imagined something that didn't exist yet?",
        "When have I found a new way to do something?",
        "When have I made room for someone else's idea?",
        "What helps me rest when a new idea doesn't take hold?"
      ] },
      { p: "**If Creating fits you, keep going.** If it doesn't, pick another way of helping:" },
      { trails: true },
      { p: "Or finish this trail first. You can switch trails back at the Visitor Center, at the end." }
    ],
    ahead: "What Creators bring to a whole community, beyond the people you know."
  },

  community: {
    exhibit: "sign",
    blocks: [
      { p: "Creating isn't only about the people you already know. In a community, Creators help everyone imagine a better future, and that can move people to act." },
      { sub: "A better future moves people" },
      { p: "Researchers surveyed more than 6,000 people in 24 countries about how climate action might change society. People who believed it would lead to a more caring society, or to more progress and development, were more willing to act. That pull was about as strong as believing climate change is important. It held even for people who weren't convinced climate change is real." },
      { cite: [BAIN] },
      { sub: "Where Creating fits" },
      { p: "Dream helps people imagine that better future. Invent finds new ways to get there. Invite lets everyone add their ideas. This match is ours, not the researchers', but it shows how everyday Creating adds up." },
      { sub: "Where Creators show up" },
      { p: "Community art and murals. Repair cafés and tool libraries. Planning meetings and design workshops. Gardens in unexpected places. Anywhere people need a new idea." }
    ],
    ahead: "The Climate Pavilion, where you pick an exhibit on a topic you care about."
  },

  /* For the Field Guide: a true story of someone on this trail. Every
     fact here is on the one linked page. */
  story: {
    exhibit: "sign",
    blocks: [
      { p: "Ron Finley grew up in South Central Los Angeles and raised his kids there. He writes that there was no healthy food in the neighborhood. In 2010, he planted sunflowers, kale, and pomegranates in the strip of dirt between the curb and the sidewalk in front of his house. That year he also started a group to help others grow food." },
      { p: "In 2011, the city cited him for \"overgrown vegetation,\" and the citation became a warrant for his arrest. A newspaper column and a petition followed, and in 2013 the Los Angeles City Council made it legal to grow food in those strips." },
      { quote: { text: "If food is not there, put it there!", who: "Ron Finley", src: FINLEY } },
      { quote: { text: "1,000 shovels can get work done much faster than one shovel.", who: "Ron Finley", src: FINLEY } },
      { p: "That's Creating at work: imagining what could be, then planting it, and inviting others to grow with you." },
      { cite: [FINLEY] }
    ]
  },

  /* For the Field Guide: a short activity for this trail, for any topic. */
  tryIt: {
    exhibit: "sign",
    blocks: [
      { stretch: {
        title: "Your one \"what if\"",
        steps: [
          "Think of a place near you that could be better, like a corner, an empty lot, or a meeting.",
          "Finish this sentence: \"What if this place had...\"",
          "Who could you invite to add an idea to yours?"
        ],
        note: "Do this in your head or on paper."
      } }
    ]
  },

  /* Words to carry home from the Visitor Center. {topic} becomes the
     exhibit's name. */
  farewell: [
    "You're not alone in your desire to help care for the people and places you love. As a Creator, you don't need to have every idea by yourself.",
    "When we do this together and do it close to home, rest becomes part of the journey."
  ]
};
