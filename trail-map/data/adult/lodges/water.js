/* The Water lodge. Shared stops are written once; each trail adds its
   own slot in byTrail. Titles come from titles.js, so none appear here.
   Adult pack: grade 9 reading level or lower. */

const NCA4 = { title: "Fifth National Climate Assessment, Ch. 4: Water, 2023", url: "https://doi.org/10.7930/NCA5.2023.CH4" };

export default {
  key: "water",
  name: "Water",
  icon: "i-water",
  about: "rivers, lakes, oceans, and drinking water",

  stops: {
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
      ahead: "What your way of helping can do for water."
    },

    local: {
      exhibit: "rest",
      blocks: [
        { sub: "Water where you live" },
        { questions: [
          "Where does water show up in my day?",
          "Which water changes has my community lived through?",
          "Who helped, and who needed help?",
          "Whose water story would I like to record or share?"
        ] }
      ],
      ahead: "Real places to start, close to home."
    },

    nearby: {
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
      ],
      ahead: "A last rest stop, to choose your first step."
    },

    /* Added to the shared questions in data/adult/shared.js. */
    first: {
      questions: ["Which water work near me could use my way of helping?"],
      friend: ["Where does water show up in our community?"]
    }
  },

  byTrail: {
    Green: {
      role: {
        exhibit: "sign",
        blocks: [
          { p: "When water turns dangerous, people need each other. Close ties help people get through a flood or a water emergency, and ties to people in power help whole neighborhoods recover." },
          { sub: "Connecting in action" },
          { list: [
            "When a boil-water advisory goes out, a Connector makes sure every neighbor knows, including people who don't read English or don't go online.",
            "When a street floods, a Connector starts the phone tree and checks on older neighbors.",
            "When a creek group needs hands, a Connector knows who to ask.",
            "When a family needs help after a flood, a Connector knows which office or group to call."
          ] },
          { stretch: {
            title: "Try this now: your water phone tree",
            steps: [
              "Think of three people you could reach quickly if a boil-water advisory went out.",
              "Who would you reach first?",
              "Who might not get the word any other way?"
            ],
            note: "Do this in your head or on paper. No phone, internet, or moving around needed."
          } },
          { tips: [ { verb: "Ask", text: "an older neighbor or relative how water in your town has changed in their lifetime." } ] },
          { resources: [
            { verb: "Try", name: "Young Voices for the Planet Films", url: "https://celfeducation.org/yvfp/", reach: "Worldwide", desc: "Thirteen short films about kids and teens who led climate and nature projects in their schools and towns, from cutting plastic straws to planting trees." },
            { verb: "Record", before: "a story with the", name: "StoryCorps App", url: "https://storycorps.org/participate/storycorps-app/", reach: "United States only", desc: "Record a conversation with someone you care about using a free phone app, and save it to the StoryCorps Archive and the Library of Congress." }
          ], label: false }
        ],
        ahead: "A rest stop to reflect on water where you live."
      },
      questions: {
        local: [
          "Where does Connecting already touch water in my life?",
          "Who in my community might not get the word in a water emergency?"
        ]
      }
    }
  }
};
