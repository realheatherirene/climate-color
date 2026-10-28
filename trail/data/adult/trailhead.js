/* The Visitor Center, on arrival: what the map is, how it works, and
   the six trails.
   Adult pack: grade 9 reading level or lower. */

const MASS_AUDUBON = { title: "Mass Audubon, May 2024", url: "https://www.massaudubon.org/news/press-room/2024/mass-audubon-opens-all-persons-trail-at-brewster-s-woods-built-by-the-appalachian-mountain-club", archive: "https://web.archive.org/web/2026/https://www.massaudubon.org/news/press-room/2024/mass-audubon-opens-all-persons-trail-at-brewster-s-woods-built-by-the-appalachian-mountain-club" };
const IMLS = { title: "IMLS: Mass Audubon's Accessible Trails Project", url: "https://imls.gov/grant-spotlights/massachusetts-audubons-accessible-trails-project", archive: "https://web.archive.org/web/2026/https://imls.gov/grant-spotlights/massachusetts-audubons-accessible-trails-project" };

export default {
  title: "Climate Color Trail",
  lede: "Find your way into the climate movement!",
  intro: "The Climate Color Trail is a self-guided learning experience that helps you find your place in the climate movement. Pick your trail, learn your way of caring, visit the Climate Pavilion, bring it close to home, and leave with a Field Guide to climate action!",

  /* The Visitor Center's board, with the trail picker at the bottom. The key
     shows the places on the map (drawn from shared.js) and the two kinds
     of stop. */
  board: {
    open: "Learn about the trail: where you'll go, what you'll find, and how to save your progress. The trail is a loop. It leaves from the Trailhead, just outside, and brings you back here to the Visitor Center at the end. The trail takes about 20 minutes, and you can save your spot and come back anytime.",
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
    hint: "Each trail name suggests a unique and special way people show care. Choose the trail that seems the most like you. Not sure? Try the three quick questions just below, or pick the one that's closest. You can switch at the end.",

    /* "Find your trail": an optional helper above the six trails. It's a
       way to recognize what you already do well, not a test, so nothing
       is scored out loud and every answer is a good one. Every moment is
       a happy one, and concrete enough to answer without much thought.
       Answers stay free of details a reader might take literally and rule
       themselves out over: a day of the week, a food, a phone, a bus. Each answer is
       one color's everyday care, matched to one of its three words in
       core/climate-color.js. The six answers come in a different order for
       each question, so no color always sits in the same place.
       {list} becomes the action words of the colors checked most:
       "Connecting and Communicating." */
    finder: {
      open: "Not sure which trail fits? Try three quick questions.",
      intro: "This isn't a test, and there are no wrong answers. Check anything that's like you, or that you'd enjoy doing. Check as many as you like.",
      moments: [
        { ask: "When people plan a get-together, you might be the one who...", options: [
          ["Green", "invites everyone, including someone new"],
          ["Red", "picks a date and makes sure it really happens"],
          ["Blue", "makes sure everyone knows the plan"],
          ["Orange", "dreams up a fun theme or a new place to try"],
          ["Indigo", "figures out the best spot, and how everyone will get there"],
          ["Yellow", "gets everyone excited to come"]
        ] },
        { ask: "When a new neighbor moves in, you might be the one who...", options: [
          ["Yellow", "gives them a warm welcome and tells them what's great about the neighborhood"],
          ["Indigo", "helps them find their way around"],
          ["Red", "makes sure they know who to call if they ever need anything"],
          ["Green", "introduces them to the other neighbors"],
          ["Orange", "thinks up a fun way to welcome them"],
          ["Blue", "fills them in on what's going on around the neighborhood"]
        ] },
        { ask: "When a friend shares a big dream, like opening a bakery, you might be the one who...", options: [
          ["Orange", "tosses out fun ideas to make it even better"],
          ["Blue", "helps them describe it in a way that gets people interested"],
          ["Yellow", "cheers them on and tells them they can do it"],
          ["Indigo", "helps them sort out what matters most and what to do first"],
          ["Green", "puts them in touch with someone who could help"],
          ["Red", "promises to help, and keeps that promise"]
        ] }
      ],
      /* Shown once anything is checked, and updated as the reader goes. */
      lead: "Every box you checked shows how much you already care.",
      result: "Your answers lean toward {list}.",
      praise: "Communities run on care like that.",
      /* Always shown, whether one trail comes up or all six. */
      start: "Start wherever feels right today.",
      go: "Start this trail",
      after: "Most people do a little of all six. You can switch trails at the end."
    }
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

  footnote: "Climate change is global. This trail focuses on the United States, where its sources and resources come from."
};
