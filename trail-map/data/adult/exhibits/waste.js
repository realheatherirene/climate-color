/* The Waste exhibit. Everything here is written once and shared by every
   trail: the exhibit itself, plus a situation and a finder for the Field
   Guide. Titles come from titles.js, so none appear here.
   Adult pack: grade 9 reading level or lower. */

/* The assessment says little about waste, so this exhibit also cites two
   EPA pages and the assessment's health chapter, each under the part it
   supports. */
const NCA5_MITIGATION = { title: "Fifth National Climate Assessment, Ch. 32: Mitigation, 2023", url: "https://toolkit.climate.gov/NCA5_Ch32_Mitigation", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch32_Mitigation" };
const NCA5_HEALTH = { title: "Fifth National Climate Assessment, Ch. 15: Human Health, 2023", url: "https://toolkit.climate.gov/NCA5_Ch15_Human-Health", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch15_Human-Health" };
const EPA_FOOD = { title: "EPA: Reducing Wasted Food at Home", url: "https://www.epa.gov/recycle/reducing-wasted-food-home", archive: "https://web.archive.org/web/2026/https://www.epa.gov/recycle/reducing-wasted-food-home" };
const EPA_LANDFILL = { title: "EPA: Basic Information about Landfill Gas", url: "https://www.epa.gov/lmop/basic-information-about-landfill-gas", archive: "https://web.archive.org/web/2026/https://www.epa.gov/lmop/basic-information-about-landfill-gas" };

export default {
  key: "waste",

  /* One line under the exhibit's sign: what the reader will get here. */
  promise: "In this exhibit, you'll find out how waste affects the climate, who feels it first, and where waste shows up in your own life.",

  /* The exhibit's parts, in the order set by titles.js. Each has a short
     line under its title, so a closed part still says what's inside. */
  parts: {
    why: {
      exhibit: "sign",
      line: "A quick guess, then why waste matters.",
      blocks: [
        { find: {
          prompt: "Make a guess first: how much does the average family of four spend each year on food that never gets eaten?",
          button: "Reveal the answer",
          reveal: "Almost $3,000.",
          src: EPA_FOOD
        } },
        { teaser: true }
      ],
      ahead: "What's changing with waste, across the country."
    },

    changing: {
      exhibit: "sign",
      line: "Food, landfills, and methane.",
      blocks: [
        { p: "Everything we use ends up somewhere. When food and other once-living material break down in landfills, they give off methane, a heat-trapping gas." },
        { list: [
          "**Food.** More than a third of all food in the U.S. goes to waste. More than 40 percent of that is thrown out by stores and households.",
          "**Landfills.** Landfills are the third-largest human-caused source of methane in the U.S., about 14.4 percent in 2022. Methane traps at least 28 times more heat than carbon dioxide over 100 years.",
          "**Where food goes.** In 2019, about 96 percent of the food households wasted was sent to landfills or burned, not composted.",
          "**Hope in wasting less.** Campaigns in five other wealthy countries cut food waste per person by 8 to 29 percent."
        ] },
        { cite: [NCA5_MITIGATION, EPA_LANDFILL, EPA_FOOD] }
      ],
      ahead: "Who feels these changes first."
    },

    who: {
      exhibit: "sign",
      line: "The communities hit hardest.",
      blocks: [
        { p: "About 70 percent of Superfund sites, places polluted by hazardous waste, are within one mile of federally assisted housing. And while food goes to waste, 10.5 percent of U.S. households didn't always have enough food in 2020." },
        { cite: [NCA5_HEALTH] }
      ],
      ahead: "A rest stop to think about waste where you live."
    },

    life: {
      exhibit: "rest",
      line: "Where waste shows up in your day.",
      blocks: [
        { sub: "Waste where you live" },
        { questions: [
          "What do I throw away most in a week?",
          "Where does my trash go after it leaves my curb?",
          "Who in my community could use food or things others throw away?"
        ] }
      ],
      ahead: "The Bulletin Board, where you choose what comes next."
    }
  },

  /* For the Field Guide's "Think it through." The reader writes how
     their own way of helping fits. */
  situation: "Your town cuts recycling pickup to once a month. Bins overflow, and some neighbors start putting everything in the trash.",

  /* Added to the shared questions in the Field Guide's first step. */
  first: {
    questions: ["Which waste work near me could use my way of helping?"],
    friend: ["Where could our community waste less together?"]
  },

  /* For the Field Guide: where waste work turns up close to home. */
  finder: {
    exhibit: "tip",
    line: "Where waste work turns up near you.",
    blocks: [
      { p: "Opportunities are local, and they change. Repair events, compost programs, and food rescue groups are where people who care about waste find each other." },
      { tips: [
        { verb: "Check", text: "bulletin boards at the library, grocery store, or community center for swaps, repair events, and cleanup days." },
        { verb: "Ask", text: "your city's trash and recycling office or a food pantry how you can help." },
        { verb: "Sign up for", text: "your city's recycling and compost news." },
        { verb: "Search for", text: "\"repair café [your town],\" \"community compost [your city],\" or \"food rescue [your county].\"" }
      ] },
      { find: {
        prompt: "There's a tool that tells you where to recycle almost anything near you.",
        button: "Reveal the find",
        reveal: "It's Earth911's recycling search. Type in what you want to recycle and your ZIP code to find recycling centers and services near you.",
        link: { name: "Earth911 Recycling Search", url: "https://search.earth911.com/", reach: "United States only" }
      } },
      { resources: [
        { verb: "Explore", name: "EPA: Reducing Wasted Food at Home", url: "https://www.epa.gov/recycle/reducing-wasted-food-home", reach: "United States only", desc: "Tips for planning, storing, and cooking food so less goes to waste, with printable guides and a toolkit for households and community groups." }
      ], label: false },
      { say: [
        { where: "At the library desk", words: "Are there any repair events or swaps around here?" },
        { where: "At a food pantry", words: "Do you take extra food from gardens or grocery stores?" },
        { where: "To a neighbor", words: "I'm starting a compost bin. Want to share it?" }
      ] },
      { more: [ { sub: "Then grow it", items: [
        { verb: "Pass", text: "one idea along to a neighbor.", reach: "Close to home" },
        { verb: "Bring", text: "a friend to a repair event.", reach: "A little further" },
        { verb: "Introduce", text: "a grocery store to a food pantry, or welcome newcomers to your group.", reach: "Further still" }
      ] } ], label: false }
    ]
  }
};
