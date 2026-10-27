/* The Trailhead: what the map is, how it works, and the six trails.
   Adult pack: grade 9 reading level or lower. */

const MASS_AUDUBON = { title: "Mass Audubon, May 2024", url: "https://www.massaudubon.org/news/press-room/2024/mass-audubon-opens-all-persons-trail-at-brewster-s-woods-built-by-the-appalachian-mountain-club", archive: "https://web.archive.org/web/2026/https://www.massaudubon.org/news/press-room/2024/mass-audubon-opens-all-persons-trail-at-brewster-s-woods-built-by-the-appalachian-mountain-club" };
const IMLS = { title: "IMLS: Mass Audubon's Accessible Trails Project", url: "https://imls.gov/grant-spotlights/massachusetts-audubons-accessible-trails-project", archive: "https://web.archive.org/web/2026/https://imls.gov/grant-spotlights/massachusetts-audubons-accessible-trails-project" };

export default {
  title: "Climate Color Trail",
  lede: "Find your way into the climate movement!",
  intro: "The Climate Color Trail is a self-guided learning experience that helps you find your place in the climate movement. Pick your trail, learn your way of caring, visit the Climate Lodge, choose your next steps, and leave with a Field Guide to climate action!",

  /* The Trailhead's board, with the trail picker at the bottom. The key
     shows the places on the map (drawn from shared.js) and the two kinds
     of stop. */
  board: {
    open: "Learn about the trail: where you'll go, what you'll find, and how to save your progress. The trail takes about 20 minutes, and you can save your spot and come back anytime.",
    storyLabel: "Read a story about outdoor accessibility",
    blocks: [
      { map: true },
      { route: true }
    ],
    /* A few words on accessibility, just above the story link. */
    storyIntro: "An accessible trail is one that people of all abilities can use. That can mean a smooth, wide path, benches for resting, or maps in Braille and audio. The Trail is open to everyone, and committed to reaching or exceeding Web Content Accessibility Guidelines wherever possible.",
    story: [
      { p: "Mass Audubon, a conservation group in Massachusetts, builds All Persons Trails so visitors of all abilities can enjoy nature. Its trails offer features like audio tours, Braille and tactile maps, rope guides, wider boardwalks, and benches. The trail at Brewster's Woods, opened in May 2024, has a wide, stable surface of crushed stone." },
      { quote: { text: "Nature provides a host of physical, mental, and emotional benefits that should be available to everyone.", who: "Renata Pomponi, Mass Audubon", src: MASS_AUDUBON } },
      { p: "That's the spirit of this trail, too." },
      { cite: [MASS_AUDUBON, IMLS] }
    ]
  },

  pick: {
    hint: "Each trail name suggests a unique and special way people show care. Choose the trail that seems the most like you. Not sure? Pick the one that's closest. You can switch at the end."
  },

  /* What each way of helping means, in plain words. Shown on the picker,
     repeated wherever the trail is named, and gathered in the Field
     Guide's "Learn other ways to help." */
  ways: {
    Red: "keeping a clear purpose, making a solid plan, and being someone others can count on",
    Orange: "imagining what could be, trying new ways, and making room for everyone's ideas",
    Yellow: "getting people excited, keeping things moving, and cheering others on",
    Green: "bringing people together, linking them to help, and making sure everyone belongs",
    Blue: "finding the words, keeping everyone informed, and shaping how people talk about it",
    Indigo: "sorting out what matters most, adjusting when things change, and helping people find their way"
  },

  footnote: "The Climate Color Trail is an open resource. No payment, login or download is needed. To the best of our knowledge, all external resources linked within are also free and open to access. Climate change is global. This trail focuses on the United States, where its sources and resources come from. Kinfeather is not affiliated with the organizations that host these resources and receives no financial or other incentive for sharing them."
};
