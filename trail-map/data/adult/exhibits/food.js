/* The Food exhibit. Everything here is written once and shared by every
   trail: the exhibit itself, plus a situation and a finder for the Field
   Guide. Titles come from titles.js, so none appear here.
   Adult pack: grade 9 reading level or lower. */

const NCA5_FOOD = { title: "Fifth National Climate Assessment, Ch. 11: Agriculture, Food Systems, and Rural Communities, 2023", url: "https://toolkit.climate.gov/NCA5_Ch11_Agriculture", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch11_Agriculture" };

export default {
  key: "food",

  /* One line under the exhibit's sign: what the reader will get here. */
  promise: "In this exhibit, you'll find out how climate change is changing food, who feels it first, and where food shows up in your own life.",

  /* The exhibit's parts, in the order set by titles.js. Each has a short
     line under its title, so a closed part still says what's inside. */
  parts: {
    why: {
      exhibit: "sign",
      line: "A quick guess, then why food matters.",
      blocks: [
        { find: {
          prompt: "Make a guess first: farmers buy insurance to cover crops they lose. From 1991 to 2017, how much of what that insurance paid out was caused by rising temperatures?",
          button: "Reveal the answer",
          reveal: "About 19 percent, nearly 1 dollar in every 5.",
          src: NCA5_FOOD
        } },
        { teaser: true }
      ],
      ahead: "What's changing for food, across the country."
    },

    changing: {
      exhibit: "sign",
      line: "Growing seasons, prices, and healthy food.",
      blocks: [
        { p: "Everyone depends on food, from the farm to the grocery store to the kitchen table. Climate change is changing when and where food can grow, and what it costs." },
        { list: [
          "**Growing seasons.** Climate change is disrupting growing zones and growing days, which depend on rain, temperature, and soil moisture.",
          "**Prices.** By 2050, climate change is expected to raise some crop prices. Corn and wheat could each cost about 26 percent more.",
          "**Healthy food.** Climate change is expected to make nutritious food harder to find and harder to afford.",
          "**Hope on the farm.** Some farmers and ranchers are using practices that protect the land, cut heat-trapping gases, and help their farms handle climate change."
        ] },
        { cite: [NCA5_FOOD] }
      ],
      ahead: "Who feels these changes first."
    },

    who: {
      exhibit: "sign",
      line: "The communities hit hardest.",
      blocks: [
        { p: "Climate change won't affect everyone's food the same way. Many risks are greater in some Black, Indigenous, Latino, and lower-income communities." },
        { p: "Farmworkers face more heat-related illness and death than other U.S. workers, and the number of unsafe working days is expected to double by midcentury. Farmworkers are also more likely to face food insecurity: not always having enough food. People who hunt, fish, and forage for their food may find it harder to get." },
        { cite: [NCA5_FOOD] }
      ],
      ahead: "A rest stop to think about food where you live."
    },

    life: {
      exhibit: "rest",
      line: "Where food shows up in your day.",
      blocks: [
        { sub: "Food where you live" },
        { questions: [
          "Where does my food come from: a store, a garden, a farm stand, a food pantry?",
          "How have food prices changed for my family?",
          "Who in my community has a hard time getting enough food?"
        ] }
      ],
      ahead: "The Bulletin Board, where you choose what comes next."
    }
  },

  /* For the Field Guide's "Think it through." The reader writes how
     their own way of helping fits. */
  situation: "A late frost wipes out the spring crop at the farm stand where your neighbors shop. The food pantry down the street is running low, and more families are coming in each week.",

  /* Added to the shared questions in the Field Guide's first step. */
  first: {
    questions: ["Which food work near me could use my way of helping?"],
    friend: ["Where does food bring our community together?"]
  },

  /* For the Field Guide: where food work turns up close to home. */
  finder: {
    exhibit: "tip",
    line: "Where food work turns up near you.",
    blocks: [
      { p: "Opportunities are local, and they change. Food pantries, community gardens, and farmers markets are where people who care about food find each other." },
      { tips: [
        { verb: "Check", text: "bulletin boards at the library, grocery store, or place of worship for food drives and garden sign-ups." },
        { verb: "Ask", text: "at a food pantry, community garden, or farmers market how you can help." },
        { verb: "Call", text: "your county extension office and ask about gardening classes or volunteer programs." },
        { verb: "Search for", text: "\"food pantry [your town],\" \"community garden [your city],\" or \"farmers market [your county].\"" }
      ] },
      { find: {
        prompt: "There's a free tool that finds the food bank serving your area.",
        button: "Reveal the find",
        reveal: "It's Feeding America's food bank finder. Type in your ZIP code to find nearby food banks and their hours, locations, and services.",
        link: { name: "Find Your Local Food Bank", url: "https://www.feedingamerica.org/find-your-local-foodbank", reach: "United States only" }
      } },
      { resources: [
        { verb: "Explore", name: "USDA's National Farmers Market Directory", url: "https://www.ams.usda.gov/local-food-directories/farmersmarkets", reach: "United States only", desc: "It lists markets with two or more farm vendors, with their locations, hours, products, and the kinds of payment they take." }
      ], label: false },
      { say: [
        { where: "At the library desk", words: "Do any groups here run a community garden or a food drive?" },
        { where: "At a food pantry", words: "What do you need most right now?" },
        { where: "To a neighbor", words: "I'm helping at the food pantry on Saturday. Want to come?" }
      ] },
      { more: [ { sub: "Then grow it", items: [
        { verb: "Pass", text: "one idea along to a neighbor.", reach: "Close to home" },
        { verb: "Bring", text: "a friend to a garden workday.", reach: "A little further" },
        { verb: "Introduce", text: "a farm stand to the food pantry, or welcome newcomers to your group.", reach: "Further still" }
      ] } ], label: false }
    ]
  }
};
