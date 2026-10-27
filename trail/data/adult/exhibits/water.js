/* The Water exhibit. Everything here is written once and shared by every
   trail: the exhibit itself, plus a situation and a finder for the Field
   Guide. Titles come from titles.js, so none appear here.
   Adult pack: grade 9 reading level or lower. */

const NCA5_WATER = { title: "Fifth National Climate Assessment, Ch. 4: Water, 2023", url: "https://toolkit.climate.gov/NCA5_Ch4_Water", web: "https://nca5.climate.us/chapter/4", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch4_Water" };
const NCA5_COASTS = { title: "Fifth National Climate Assessment, Ch. 9: Coastal Effects, 2023", url: "https://toolkit.climate.gov/NCA5_Ch9_Coasts", web: "https://nca5.climate.us/chapter/9", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch9_Coasts" };
const NCA5_ECOSYSTEMS = { title: "Fifth National Climate Assessment, Ch. 8: Ecosystems, Ecosystem Services, and Biodiversity, 2023", url: "https://toolkit.climate.gov/NCA5_Ch8_Ecosystems", web: "https://nca5.climate.us/chapter/8", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch8_Ecosystems" };

export default {
  key: "water",

  /* One line under the exhibit's sign: what the reader will get here. */
  promise: "In this exhibit, you'll find out how climate change is affecting water, who feels it first, and where the effect shows up in your own life.",

  /* The exhibit's parts, in the order set by titles.js. Each has a short
     line under its title, so a closed part still says what's inside. */
  parts: {
    why: {
      exhibit: "sign",
      line: "A quick guess, then why water matters.",
      blocks: [
        { find: {
          prompt: "Take a guess: when Hurricane Harvey flooded the Houston area, how much heavier was its rain because of human-caused warming?",
          button: "Reveal the answer",
          reveal: "About 15 to 20 percent heavier, by scientists' estimates. That made the flooded area 14 percent larger, and 32 percent more homes flooded.",
          src: NCA5_WATER
        } },
        { teaser: true }
      ],
      ahead: "What's changing for water, across the country."
    },

    changing: {
      exhibit: "sign",
      line: "Rain, drought, the coast, and the ocean.",
      blocks: [
        { p: "Everyone depends on water, from the tap at home to the creek down the street to the ocean. Climate change is changing how much water falls, when it comes, how clean it stays, and how high the seas rise." },
        { list: [
          "**Heavier rain.** Heavy rainstorms are expected to increase across the country, and flood damage is already growing.",
          "**Drought.** The harm from droughts is growing too.",
          "**Water quality.** Floods and droughts can both make water less safe to drink, fish, and swim in.",
          "**Rising seas.** Along most U.S. coasts, sea level is expected to rise about 11 inches by 2050. Without action, damaging floods could come as often as today's disruptive high-tide flooding.",
          "**Ocean life.** Ocean species are moving more, and faster, than species on land. U.S. coral reefs help protect coasts, a benefit worth more than $1.8 billion a year. Warming, more acidic oceans, and ocean heat waves threaten them.",
          "**Hope at the coast.** Restoring coastal wetlands stores carbon and reduces flooding and erosion, often at low cost. Protected ocean areas can help sea life recover after heat waves."
        ] },
        { cite: [NCA5_WATER, NCA5_COASTS, NCA5_ECOSYSTEMS] }
      ],
      ahead: "Who feels these changes first."
    },

    who: {
      exhibit: "sign",
      line: "The communities hit hardest.",
      blocks: [
        { p: "Every community will feel these changes. Communities on the front lines of climate change, including Tribes and Indigenous Peoples, rural communities, and low-income communities, face the most risk, often with the fewest resources to prepare." },
        { p: "Many Tribes depend on fish that are changing. Chinook salmon, important to Pacific Northwest Tribes, are expected to decline sharply. People who fish or work in tourism are losing income as coral disease spreads." },
        { cite: [NCA5_WATER, NCA5_COASTS, NCA5_ECOSYSTEMS] }
      ],
      ahead: "A rest stop to think about water where you live."
    },

    life: {
      exhibit: "rest",
      line: "Where water shows up in your day.",
      blocks: [
        { sub: "Water where you live" },
        { questions: [
          "Where does water show up in my day?",
          "Which water changes has my community lived through?",
          "Who helped, and who needed help?"
        ] }
      ],
      ahead: "The Bulletin Board, where you choose what comes next."
    }
  },

  /* For the Field Guide's "Think it through." The reader writes how
     their own way of helping fits. */
  situation: "A boil-water advisory goes out in your town on a Friday evening. It's posted on the city's website and social media pages. Some of your neighbors don't go online, and some don't read English.",

  /* Added to the shared questions in the Field Guide's first step. */
  /* "Put your [action] to work": this topic, for each trail. One line
     for each of the trail's three actions, then one first step. */
  work: {
    Red: {
      Focus: "Help your building focus on one simple job during the advisory: making sure everyone has gotten the city's message.",
      Build: "Start a contact list for your building or the neighbors you know, so the next alert spreads the same way.",
      Secure: "Keep a printed copy of the city's water updates and emergency numbers handy, and update it when things change.",
      first: "Sign up for your city or county's water updates, and add the numbers to your contact list."
    },
    Orange: {
      Dream: "Imagine your block never missing an alert again. What would that take? Jot down ideas with a neighbor.",
      Invent: "Turn the city's advisory into a simple flyer in plain words, and post it where your building allows, like the lobby or laundry room.",
      Invite: "Ask a neighbor who speaks another language to help word the flyer, so it makes sense to more people.",
      first: "Sign up for your city or county's water updates, so you have the facts for your next flyer."
    },
    Yellow: {
      Inspire: "When the advisory ends, share how neighbors helped each other, so people feel ready for next time.",
      Rally: "While the advisory lasts, send a friendly reminder in your building's group chat, with a link to the city's updates.",
      Encourage: "Thank the neighbors who helped spread the word.",
      first: "Sign up for your city or county's water updates, and invite a neighbor to sign up with you."
    },
    Green: {
      Unite: "Start or join a group text for your building or block, so water news reaches people fast.",
      Network: "Share the city's updates where people already gather, like your building's group chat or a faith group's newsletter.",
      Include: "Ask a few neighbors, or your building manager, who might miss the alert, and offer them a printed copy of the advisory.",
      first: "Sign up for your city or county's water updates, and help a neighbor sign up too."
    },
    Blue: {
      Clarify: "Rewrite the city's advisory in plain words, so it's easy to understand.",
      Inform: "Share the advisory in your building's group chat, and post a printed copy where your building allows.",
      Influence: "Afterward, send your city council member a short email about what helped and what didn't.",
      first: "Sign up for your city or county's water updates, so you can share accurate news."
    },
    Indigo: {
      Assess: "Figure out what neighbors need first: the city's message, and where to get safe water if they need it.",
      Adapt: "If the advisory lasts longer than expected, check the city's updates each day and adjust your plans.",
      Guide: "Help a neighbor find the city's updates online, or sign up for alerts.",
      first: "Sign up for your city or county's water updates, and help a neighbor sign up too."
    }
  },

  first: {
    questions: ["Which water projects near me could use my way of helping?"],
    friend: ["Where does water show up in our community?"]
  },

  /* For the Field Guide: where water projects turn up close to home. */
  finder: {
    exhibit: "tip",
    line: "Where water projects turn up near you.",
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
        button: "Find out",
        reveal: "It's called How's My Waterway. Type in your address to find the condition of rivers, lakes, and streams near you, and restoration work happening nearby. No account is needed.",
        link: { name: "How's My Waterway", url: "https://www.epa.gov/waterdata/hows-my-waterway", reach: "United States only" }
      } },
      /* The cleanup is open worldwide, not U.S. only: approved as an exception. */
      { resources: [
        { verb: "Join", name: "Fix a Leak Week", url: "https://www.epa.gov/watersense/fix-leak-week", reach: "United States only", desc: "A yearly week each March to find and fix water leaks at home. Free tips explain a toilet dye test and a water meter test, with a printable checklist." },
        { verb: "Join", name: "the International Coastal Cleanup", url: "https://oceanconservancy.org/work/plastics/cleanups-icc/", reach: "open worldwide", desc: "From Ocean Conservancy: volunteers clean up beaches and waterways near them. Its map lists cleanups in your area, or you can start your own. Each cleanup is run by a local host; check their page for details." }
      ] },
      { say: [
        { where: "At the library desk", words: "Do any groups meet here about creeks, rivers, or water?" },
        { where: "At town hall", words: "Are there volunteer programs for keeping our water clean?" },
        { where: "To a neighbor", words: "I found a creek cleanup. Want to come with me?" }
      ] },
      { more: [ { sub: "Then grow it", items: [
        { verb: "Pass", text: "one idea along to a neighbor.", reach: "Close to home" },
        { verb: "Bring", text: "a friend to a meeting.", reach: "A little further" },
        { verb: "Introduce", text: "two groups, or welcome newcomers to yours.", reach: "Further still" }
      ] } ] }
    ]
  }
};
