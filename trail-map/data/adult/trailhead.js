/* The trailhead: what the map is, how it works, and the six trails.
   Adult pack: grade 9 reading level or lower. */

const MASS_AUDUBON = { title: "Mass Audubon, May 2024", url: "https://www.massaudubon.org/news/press-room/2024/mass-audubon-opens-all-persons-trail-at-brewster-s-woods-built-by-the-appalachian-mountain-club" };
const IMLS = { title: "IMLS: Mass Audubon's Accessible Trails Project", url: "https://imls.gov/grant-spotlights/massachusetts-audubons-accessible-trails-project" };

export default {
  title: "The Trail Map",
  lede: "The Climate Trail Map is an interactive tool that can be used to find your way into climate action.",
  todoTitle: "Here's how it works:",
  todo: [
    "**Pick a trail. Each trail name suggests one stewardship style—the mental, emotional, and practical strengths people use to care for the world around them.** (Stop 1)",
    "**Travel down your trail and take part in the activities to learn more about that stewardship style.** (Stops 2 to 5)",
    "**Pick a lodge. Each lodge name suggests one community action topic—the personal, social, and environmental domains affected by climate change.** (Stop 6)",
    "**Enter the lodge and take part in the activities to learn more about that community action topic.** (Stop 7)",
    "**Enter the Ranger Station. From the ranger station, you can either visit another lodge, try another trail, save your notes, or leave the trail.** (Stop 8)"
  ],
  note: "Make your own choices and move at your own pace. If you need a break, use the 'Save your spot' link to pause.",

  /* The trailhead board: shown above stop 1, not a numbered stop. */
  board: {
    start: "Start at stop 1, just below.",
    open: "**This trail is open to everyone.** You don't need any special knowledge or skills to start.",
    storyLabel: "Read the story behind it",
    blocks: [
      { p: "This page works like a trail at a nature center. Follow the trail markers from stop to stop, and do each activity as the stop asks. You may skip any activity, if you'd like." },
      { legend: [
        { mark: "stop", term: "Action Stop", text: "Open to read. Close when you're done." },
        { mark: "rest", term: "Rest Stop", text: "Think things over. Jot down your thoughts." },
        { mark: "lodge", icon: "i-pin", term: "Lodge", text: "Explore information about a community action topic." },
        { mark: "station", icon: "i-station", term: "Ranger Station", text: "Choose what to do next." }
      ] },
    ],
    story: [
      { p: "Mass Audubon, a conservation group in Massachusetts, builds All Persons Trails so visitors of all abilities can enjoy nature. Its trails offer features like audio tours, Braille and tactile maps, rope guides, wider boardwalks, and benches. The trail at Brewster's Woods, opened in May 2024, has a wide, stable surface of crushed stone." },
      { quote: { text: "Nature provides a host of physical, mental, and emotional benefits that should be available to everyone.", who: "Renata Pomponi, Mass Audubon", src: MASS_AUDUBON } },
      { p: "That's the spirit of this trail, too." },
      { cite: [MASS_AUDUBON, IMLS] }
    ]
  },

  pick: {
    hint: "People show they care in different ways, like creating something, motivating others, or helping people find their way. Choose the way most like you."
  },

  /* What each way of helping means, in plain words. Shown on the picker
     and repeated wherever the trail is named. */
  ways: {
    Red: "keeping a clear purpose, making a solid plan, and being someone others can count on",
    Orange: "imagining what could be, trying new ways, and making room for everyone's ideas",
    Yellow: "getting people excited, keeping things moving, and cheering others on",
    Green: "bringing people together, linking them to help, and making sure everyone belongs",
    Blue: "finding the words, keeping everyone informed, and shaping how people talk about it",
    Indigo: "sorting out what matters most, adjusting when things change, and helping people find their way"
  },

  notBuilt: "This trail is still being built. For now, the Green Trail is ready.",
  footnote: "How we choose resources: free, no account where possible, checked, and re-checked yearly. Climate Color isn't affiliated with these organizations. For now, the map lists resources in the United States only."
};
