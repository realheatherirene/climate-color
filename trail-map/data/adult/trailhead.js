/* The Trailhead: what the map is, how it works, and the six trails.
   Adult pack: grade 9 reading level or lower. */

const MASS_AUDUBON = { title: "Mass Audubon, May 2024", url: "https://www.massaudubon.org/news/press-room/2024/mass-audubon-opens-all-persons-trail-at-brewster-s-woods-built-by-the-appalachian-mountain-club" };
const IMLS = { title: "IMLS: Mass Audubon's Accessible Trails Project", url: "https://imls.gov/grant-spotlights/massachusetts-audubons-accessible-trails-project" };

export default {
  title: "The Trail Map",
  lede: "Find your way into the climate movement!",
  todoTitle: "Here's how it works:",
  intro: [
    "The Climate Trail Map will help you discover the skills and passions you bring to the climate movement.",
    "Start by reading the information at the Trailhead, then hop on a trail. You'll move through several activities that will help you understand how to use your unique gifts to support a healthy environment.",
    "At the end, you'll get a printable field guide that's yours to keep, and a chance to do it all over again, if you wish!"
  ],
  note: "Make your own choices and move at your own pace.",

  /* The Trailhead's board, with the trail picker at the bottom. The key
     shows the places on the map (drawn from shared.js) and the two kinds
     of stop. */
  board: {
    open: "**This trail is open to everyone.** You don't need any special knowledge or skills to start.",
    storyLabel: "Read a story about outdoor accessibility",
    blocks: [
      { p: "This page works like a trail at a nature center. Follow the trail markers from stop to stop, and do each activity as the stop asks. You may skip any activity, if you'd like." },
      { route: true },
      { legend: [
        { mark: "stop", term: "Action Stop", text: "Open to read. Close when you're done." },
        { mark: "rest", term: "Rest Stop", text: "Think things over. Jot down your thoughts." }
      ] }
    ],
    story: [
      { p: "Mass Audubon, a conservation group in Massachusetts, builds All Persons Trails so visitors of all abilities can enjoy nature. Its trails offer features like audio tours, Braille and tactile maps, rope guides, wider boardwalks, and benches. The trail at Brewster's Woods, opened in May 2024, has a wide, stable surface of crushed stone." },
      { quote: { text: "Nature provides a host of physical, mental, and emotional benefits that should be available to everyone.", who: "Renata Pomponi, Mass Audubon", src: MASS_AUDUBON } },
      { p: "That's the spirit of this trail, too." },
      { cite: [MASS_AUDUBON, IMLS] }
    ]
  },

  pick: {
    hint: "Each trail name suggests one stewardship style—the mental, emotional, and practical strengths people use to care for the world around them. Choose the way most like you."
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

  /* {ready} and {verb} are filled in from the trails that are built, so
     these lines never need editing when a trail is added. */
  notBuilt: "This trail is still being built. For now, {ready} {verb} ready.",
  tryReady: "Try the {name} Trail",
  testNote: "This map is still growing. For now, {trails} and {exhibits} are ready.",
  footnote: "How we choose resources: free, no account where possible, checked, and re-checked yearly. Climate Color isn't affiliated with these organizations. For now, the map lists resources in the United States only."
};
