/* The Food exhibit. Everything here is written once and shared by every
   trail: the exhibit itself, plus a situation and a finder for the Field
   Guide. Titles come from titles.js, so none appear here.
   Adult pack: grade 9 reading level or lower. */

const NCA5_FOOD = { title: "Fifth National Climate Assessment, Ch. 11: Agriculture, Food Systems, and Rural Communities, 2023", url: "https://toolkit.climate.gov/NCA5_Ch11_Agriculture", web: "https://nca5.climate.us/chapter/11", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch11_Agriculture" };

/* Wasted food draws on the assessment's mitigation and health chapters and
   two EPA pages, each cited under the part it supports. */
const NCA5_MITIGATION = { title: "Fifth National Climate Assessment, Ch. 32: Mitigation, 2023", url: "https://toolkit.climate.gov/NCA5_Ch32_Mitigation", web: "https://nca5.climate.us/chapter/32", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch32_Mitigation" };
const NCA5_HEALTH = { title: "Fifth National Climate Assessment, Ch. 15: Human Health, 2023", url: "https://toolkit.climate.gov/NCA5_Ch15_Human-Health", web: "https://nca5.climate.us/chapter/15", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch15_Human-Health" };
const EPA_FOOD = { title: "EPA: Reducing Wasted Food at Home", url: "https://www.epa.gov/recycle/reducing-wasted-food-home", archive: "https://web.archive.org/web/2026/https://www.epa.gov/recycle/reducing-wasted-food-home" };
const EPA_LANDFILL = { title: "EPA: Basic Information about Landfill Gas", url: "https://www.epa.gov/lmop/basic-information-about-landfill-gas", archive: "https://web.archive.org/web/2026/https://www.epa.gov/lmop/basic-information-about-landfill-gas" };

export default {
  key: "food",

  /* One line under the exhibit's sign: what the reader will get here. */
  promise: "In this exhibit, you'll find out how climate change is affecting food, who feels it first, and where the effect shows up in your own life.",

  /* The exhibit's parts, in the order set by titles.js. Each has a short
     line under its title, so a closed part still says what's inside. */
  parts: {
    why: {
      exhibit: "sign",
      line: "A quick guess, then why food matters.",
      blocks: [
        { find: {
          prompt: "Take a guess: how much does the average family of four spend each year on food that never gets eaten?",
          button: "Reveal the answer",
          reveal: "Almost $3,000.",
          src: EPA_FOOD
        } },
        { teaser: true }
      ],
      ahead: "What's changing for food, across the country."
    },

    changing: {
      exhibit: "sign",
      line: "Growing seasons, prices, healthy food, and wasted food.",
      blocks: [
        { p: "Everyone depends on food, from the farm to the grocery store to the kitchen table. Climate change is changing when and where food can grow, and what it costs." },
        { list: [
          "**Growing seasons.** Climate change is disrupting growing zones and growing days, which depend on rain, temperature, and soil moisture.",
          "**Prices.** By 2050, climate change is expected to raise some crop prices. Corn and wheat could each cost about 26 percent more.",
          "**Healthy food.** Climate change is expected to make nutritious food harder to find and harder to afford.",
          "**Wasted food.** More than a third of all food in the U.S. goes to waste, and more than 40 percent of that is thrown out by stores and households. In 2019, about 96 percent of the food households wasted was sent to landfills or burned, not composted. In landfills, it gives off methane, a heat-trapping gas.",
          "**Hope on the farm.** Some farmers and ranchers are using practices that protect the land, cut heat-trapping gases, and help their farms handle climate change. Campaigns in five other wealthy countries cut food waste per person by 8 to 29 percent."
        ] },
        { cite: [NCA5_FOOD, NCA5_MITIGATION, EPA_LANDFILL, EPA_FOOD] }
      ],
      ahead: "Who feels these changes first."
    },

    who: {
      exhibit: "sign",
      line: "The communities hit hardest.",
      blocks: [
        { p: "Climate change won't affect everyone's food the same way. Many risks are greater in some Black, Indigenous, Latino, and low-income communities. And while food goes to waste, 10.5 percent of U.S. households didn't always have enough food in 2020." },
        { p: "Farmworkers face more heat-related illness and death than other U.S. workers, and the number of unsafe working days is expected to double by midcentury. Farmworkers are also more likely to face food insecurity: not always having enough food. People who hunt, fish, and forage for their food may find it harder to get." },
        { cite: [NCA5_FOOD, NCA5_HEALTH] }
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
  /* "Put your [action] to work": this topic, for each trail. One line
     for each of the trail's three actions, then one first step. */
  work: {
    Red: {
      Focus: "Ask the pantry's staff which items they need most, and focus your donations on just those.",
      Build: "Set up a sign-up sheet with friends or coworkers to collect those items once a month.",
      Secure: "Be the person who drops off the donations on time, every time.",
      first: "Ask a food pantry near you whether they have a regular volunteer shift."
    },
    Orange: {
      Dream: "Imagine a shared garden plot or a seed swap that could grow some of what the farm stand lost, and share the idea with a few neighbors.",
      Invent: "Try a new way to share, like trading extra garden vegetables or favorite recipes with neighbors.",
      Invite: "Ask the pantry's staff what families request most, and invite neighbors to suggest easy ways to help.",
      first: "Ask a community garden near you about a plot, a workday, or a seed swap."
    },
    Yellow: {
      Inspire: "Share why the pantry matters to you, in a post or a conversation, and invite others to help.",
      Rally: "Set a small goal with friends or coworkers, like filling one box with the pantry's most-needed items, and celebrate when you get there.",
      Encourage: "Thank the pantry's volunteers by name, and tell them their work makes a difference.",
      first: "Ask a food pantry near you about an upcoming food drive you could help promote."
    },
    Green: {
      Unite: "Start a group text with a few neighbors who shop at the farm stand, so you can share news about other places to buy fresh food.",
      Network: "Pass along the pantry's hours and its list of most-needed items to friends, coworkers, or your faith group.",
      Include: "Ask the pantry's volunteers where families who don't know about the pantry might be found, like the laundromat or a school, and help spread the word there.",
      first: "Ask a food pantry or community garden near you how you can help."
    },
    Blue: {
      Clarify: "Explain in a sentence or two why the frost hurts both the farm stand and the pantry, so friends understand the need.",
      Inform: "Share the pantry's hours and its most-needed items in your group chats or a newsletter.",
      Influence: "Tell the story of how one frost affected your neighbors, to help people understand the link between weather and food.",
      first: "Ask a food pantry near you whether they'd like help sharing their needs online or in a newsletter."
    },
    Indigo: {
      Assess: "Sort out what matters most right now: the pantry's most-needed items, and where else neighbors can buy fresh food.",
      Adapt: "If the farm stand is out, find out about other markets or food programs nearby, and change your plans to match.",
      Guide: "Help a neighbor find the pantry's hours, or sign up for a food program.",
      first: "Ask a food pantry or community garden near you what kind of help they need most right now."
    }
  },

  first: {
    questions: ["Which food projects near me could use my way of helping?"],
    friend: ["Where does food bring our community together?"]
  },

  /* For the Field Guide: where food projects turn up close to home. */
  finder: {
    exhibit: "tip",
    line: "Where food projects turn up near you.",
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
        button: "Find out",
        reveal: "It's Feeding America's food bank finder. Type in your ZIP code to find nearby food banks and their hours, locations, and services.",
        link: { name: "Find Your Local Food Bank", url: "https://www.feedingamerica.org/find-your-local-foodbank", reach: "United States only" }
      } },
      { resources: [
        { verb: "Explore", name: "USDA's National Farmers Market Directory", url: "https://www.ams.usda.gov/local-food-directories/farmersmarkets", reach: "United States only", desc: "It lists markets with two or more farm vendors, with their locations, hours, products, and the kinds of payment they take." },
        { verb: "Explore", name: "EPA: Reducing Wasted Food at Home", url: "https://www.epa.gov/recycle/reducing-wasted-food-home", reach: "United States only", desc: "Tips for planning, storing, and cooking food so less goes to waste, with printable guides and a toolkit for households and community groups." }
      ] },
      { say: [
        { where: "At the library desk", words: "Do any groups here run a community garden or a food drive?" },
        { where: "At a food pantry", words: "What do you need most right now?" },
        { where: "To a neighbor", words: "I'm helping at the food pantry on Saturday. Want to come?" }
      ] },
      { more: [ { sub: "Then grow it", items: [
        { verb: "Pass", text: "one idea along to a neighbor.", reach: "Close to home" },
        { verb: "Bring", text: "a friend to a garden workday.", reach: "A little further" },
        { verb: "Introduce", text: "a farm stand to the food pantry, or welcome newcomers to your group.", reach: "Further still" }
      ] } ] }
    ]
  }
};
