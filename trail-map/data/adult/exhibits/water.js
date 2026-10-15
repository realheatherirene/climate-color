/* The Water exhibit. Everything here is written once and shared by every
   trail: the exhibit itself, a situation for the Field Guide, and the
   finder for the Bulletin Board. Titles come from titles.js, so none
   appear here.
   Adult pack: grade 9 reading level or lower. */

const NCA4 = { title: "Fifth National Climate Assessment, Ch. 4: Water, 2023", url: "https://doi.org/10.7930/NCA5.2023.CH4" };

export default {
  key: "water",

  parts: {
    changing: {
      exhibit: "sign",
      blocks: [
        { p: "Everyone depends on water, from the tap at home to the creek down the street. Climate change is changing how much water falls, when it comes, and how clean it stays." },
        { sub: "What's changing" },
        { list: [
          "**Heavier rain.** Heavy rainstorms are expected to increase across the country, and flood damage is already growing.",
          "**Drought.** The harm from droughts is growing too.",
          "**Water quality.** Floods and droughts can both make water less safe to drink, fish, and swim in."
        ] },
        { sub: "Who is hit hardest" },
        { p: "Every community will feel these changes. Communities on the front lines of climate change, including Tribal and Indigenous communities, face the most risk, often with the fewest resources to prepare." },
        { cite: [NCA4] }
      ],
      ahead: "A rest stop to think about water where you live."
    },

    daily: {
      exhibit: "rest",
      blocks: [
        { sub: "Water where you live" },
        { questions: [
          "Where does water show up in my day?",
          "Which water changes has my community lived through?",
          "Who helped, and who needed help?"
        ] }
      ],
      ahead: "Your Field Guide, to take into your own community."
    }
  },

  /* For the Field Guide's "Think it through." The reader writes how
     their own way of helping fits. */
  situation: "A boil-water advisory goes out in your town on a Friday evening. It's posted on the city's website and social media pages. Some of your neighbors don't go online, and some don't read English.",

  /* Added to the shared questions in the Field Guide's first step. */
  first: {
    questions: ["Which water work near me could use my way of helping?"],
    friend: ["Where does water show up in our community?"]
  },

  /* For the Bulletin Board: where water work turns up close to home. */
  finder: {
    exhibit: "tip",
    blocks: [
      { p: "Opportunities are local, and they change. Calls for volunteers, meetings, and sign-ups are where people who care about water find each other." },
      { tips: [
        { verb: "Check", text: "bulletin boards at the library, grocery store, or laundromat." },
        { verb: "Check", text: "the notes in your water bill and in school or faith newsletters." },
        { verb: "Sign up for", text: "city or county water updates, or a community education catalog." },
        { verb: "Ask", text: "at the library desk, town hall, the water department, or the county extension office." },
        { verb: "Search for", text: "\"creek cleanup [your town],\" \"watershed group [your county],\" or \"adopt a storm drain [your city].\"" }
      ] },
      { find: {
        prompt: "There's a free map of the waters near you, from the U.S. Environmental Protection Agency.",
        button: "Reveal the find",
        reveal: "It's called How's My Waterway. Type in your address to find the condition of rivers, lakes, and streams near you, and restoration work happening nearby. No account is needed.",
        link: { name: "How's My Waterway", url: "https://www.epa.gov/waterdata/hows-my-waterway", reach: "United States only" }
      } },
      { resources: [
        { verb: "Join", name: "Fix a Leak Week", url: "https://www.epa.gov/watersense/fix-leak-week", reach: "United States only", desc: "A yearly week each March to find and fix water leaks at home. Free tips explain a toilet dye test and a water meter test, with a printable checklist." }
      ], label: false },
      { say: [
        { where: "At the library desk", words: "Do any groups meet here about creeks, rivers, or water?" },
        { where: "At town hall", words: "Are there volunteer programs for keeping our water clean?" },
        { where: "To a neighbor", words: "I found a creek cleanup. Want to come with me?" }
      ] },
      { more: [ { sub: "Then grow it", items: [
        { verb: "Pass", text: "one idea along to a neighbor.", reach: "Close to home" },
        { verb: "Bring", text: "a friend to a meeting.", reach: "A little further" },
        { verb: "Introduce", text: "two groups, or welcome newcomers to yours.", reach: "Further still" }
      ] } ], label: false }
    ]
  }
};
