/* The Goods exhibit. Everything here is written once and shared by every
   trail: the exhibit itself, plus a situation and a finder for the Field
   Guide. Titles come from titles.js, so none appear here.
   Adult pack: grade 9 reading level or lower. */

/* The assessment says little about everyday goods, so this exhibit also
   cites three EPA pages, each under the part it supports. */
const NCA5_MITIGATION = { title: "Fifth National Climate Assessment, Ch. 32: Mitigation, 2023", url: "https://toolkit.climate.gov/NCA5_Ch32_Mitigation", web: "https://nca5.climate.us/chapter/32", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch32_Mitigation" };
const NCA5_HEALTH = { title: "Fifth National Climate Assessment, Ch. 15: Human Health, 2023", url: "https://toolkit.climate.gov/NCA5_Ch15_Human-Health", web: "https://nca5.climate.us/chapter/15", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch15_Human-Health" };
const EPA_TRASH = { title: "EPA: National Overview: Facts and Figures on Materials, Wastes and Recycling", url: "https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/national-overview-facts-and-figures-materials", archive: "https://web.archive.org/web/2026/https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/national-overview-facts-and-figures-materials" };
const EPA_PACKAGING = { title: "EPA: Containers and Packaging: Product-Specific Data", url: "https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/containers-and-packaging-product-specific", archive: "https://web.archive.org/web/2026/https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/containers-and-packaging-product-specific" };
const EPA_LANDFILL = { title: "EPA: Basic Information about Landfill Gas", url: "https://www.epa.gov/lmop/basic-information-about-landfill-gas", archive: "https://web.archive.org/web/2026/https://www.epa.gov/lmop/basic-information-about-landfill-gas" };

export default {
  key: "goods",

  /* One line under the exhibit's sign: what the reader will get here. */
  promise: "In this exhibit, you'll find out how goods affect the climate, who feels it first, and where goods show up in your own life.",

  /* The exhibit's parts, in the order set by titles.js. Each has a short
     line under its title, so a closed part still says what's inside. */
  parts: {
    why: {
      exhibit: "sign",
      line: "A quick guess, then why goods matter.",
      blocks: [
        { find: {
          prompt: "Take a guess: how many pounds of trash does each person in the U.S. throw away each day?",
          button: "Reveal the answer",
          reveal: "About 4.9 pounds, in 2018.",
          src: EPA_TRASH
        } },
        { teaser: true }
      ],
      ahead: "What's changing with goods, across the country."
    },

    changing: {
      exhibit: "sign",
      line: "Making, packages, trash, and landfills.",
      blocks: [
        { p: "Everything we buy is made, shipped, used, and thrown away, and each step can give off heat-trapping gases." },
        { list: [
          "**Making things.** Making materials like steel and cement gives off heat-trapping gases that are some of the hardest to cut.",
          "**Trash.** In 2018, each person in the U.S. threw away about 4.9 pounds of trash a day. About a third was recycled or composted, and about half went to landfills.",
          "**Packages.** Containers and packaging made up about 28 percent of U.S. trash in 2018. Cardboard boxes were the biggest single item, at 33 million tons. Grouping orders into fewer deliveries, and reusing boxes, means less to throw away.",
          "**Landfills.** Landfills are the third-largest human-caused source of methane in the U.S., about 14.4 percent in 2022. Methane traps at least 28 times more heat than carbon dioxide over 100 years.",
          "**Hope in fixing and sharing.** Recycling and composting handled about 94 million tons in 2018, and every repair, swap, or reuse keeps one more thing out of the trash."
        ] },
        { cite: [NCA5_MITIGATION, EPA_TRASH, EPA_PACKAGING, EPA_LANDFILL] }
      ],
      ahead: "Who feels these changes first."
    },

    who: {
      exhibit: "sign",
      line: "The communities hit hardest.",
      blocks: [
        { p: "About 70 percent of Superfund sites, places polluted by hazardous waste, are within one mile of federally assisted housing. Communities redlined in the 1930s face more air pollution today." },
        { cite: [NCA5_HEALTH, NCA5_MITIGATION] }
      ],
      ahead: "A rest stop to think about goods where you live."
    },

    life: {
      exhibit: "rest",
      line: "Where goods show up in your day.",
      blocks: [
        { sub: "Goods where you live" },
        { questions: [
          "What do I throw away most in a week?",
          "Where does my trash go after it leaves my curb?",
          "Who in my community could use the things others throw away?"
        ] }
      ],
      ahead: "How your way of helping fits this topic."
    }
  },

  /* For the Field Guide's "Think it through." The reader writes how
     their own way of helping fits. */
  situation: "Your town cuts recycling pickup to once a month. Bins overflow, and some neighbors start putting everything in the trash.",

  /* Added to the shared questions in the Field Guide's first step. */
  /* "Put your [action] to work": this topic, for each trail. One line
     for each of the trail's three actions, then one first step. */
  work: {
    Red: {
      Focus: "Help your building or block pick one goal: keep recycling out of the trash until pickup returns to normal.",
      Build: "Set up a drop-off schedule with a few neighbors, taking turns each week.",
      Secure: "Keep the schedule posted, and show up for your turn every time.",
      first: "Ask your city's trash and recycling office where the nearest drop-off site is and when it's open."
    },
    Orange: {
      Dream: "Imagine your block wasting less, not just recycling more. What could neighbors swap, share, or fix?",
      Invent: "Start something small, like a tool-lending list with neighbors you know.",
      Invite: "Ask neighbors what they'd like to swap or get fixed, and build the plan from their ideas.",
      first: "Search for a repair café near you, and bring something to fix."
    },
    Yellow: {
      Inspire: "Share a small win, like a month when your household threw away less, to show others it can be done.",
      Rally: "Set a simple goal with neighbors, like one month of keeping recycling out of the trash, and celebrate when you reach it.",
      Encourage: "Thank the neighbors who keep recycling, even when it's harder.",
      first: "Search for a repair café or swap event near you, and invite a friend to come along."
    },
    Green: {
      Unite: "Team up with a neighbor to take your recycling to the drop-off site between pickups.",
      Network: "Share the city's new pickup schedule and drop-off sites, and pass along news of a nearby repair café or swap group.",
      Include: "Ask your building manager or a neighborhood group who might not know about the change, and help get the schedule to them.",
      first: "Search for a repair café, community compost program, or food rescue group near you."
    },
    Blue: {
      Clarify: "Explain the new pickup schedule in plain words, and what goes in which bin.",
      Inform: "Share the schedule and drop-off sites in your building's group chat or newsletter.",
      Influence: "Tell your city council member how the change is affecting your block, in a short, friendly email.",
      first: "Sign up for your city's recycling and compost news."
    },
    Indigo: {
      Assess: "Sort out what your household throws away most, and which of it could be recycled or reused.",
      Adapt: "When pickup changes, help neighbors adjust, like finding the nearest drop-off site.",
      Guide: "Help a neighbor figure out which bin is which, or find the city's recycling guide.",
      first: "Ask your city's trash and recycling office for its recycling guide, and share it with a neighbor."
    }
  },

  first: {
    questions: ["Which goods projects near me could use my way of helping?"],
    friend: ["Where could our community waste less together?"]
  },

  /* For the Field Guide: where goods projects turn up close to home. */
  finder: {
    exhibit: "tip",
    line: "Where goods projects turn up near you.",
    blocks: [
      { p: "Opportunities are local, and they change. Repair events, swaps, and thrift stores are where people who care about goods find each other." },
      { tips: [
        { verb: "Check", text: "bulletin boards at the library, grocery store, or community center for swaps, repair events, and cleanup days." },
        { verb: "Ask", text: "your city's trash and recycling office or a food pantry how you can help." },
        { verb: "Sign up for", text: "your city's recycling and compost news." },
        { verb: "Search for", text: "\"repair café [your town],\" \"Buy Nothing group [your city],\" or \"recycling drop-off [your county].\"" }
      ] },
      { find: {
        prompt: "There's a tool that tells you where to recycle almost anything near you.",
        button: "Find out",
        reveal: "It's Earth911's recycling search. Type in what you want to recycle and your ZIP code to find recycling centers and services near you.",
        link: { name: "Earth911 Recycling Search", url: "https://search.earth911.com/", reach: "United States only" }
      } },
      /* Open worldwide, not U.S. only: approved as an exception. */
      { resources: [
        { verb: "Find", name: "a Repair Café near you", url: "https://www.repaircafe.org/en/visit/", reach: "open worldwide", desc: "From the Repair Café Foundation. Volunteers help people fix broken things for free, on set days and times. Its map lists Repair Cafés by town." }
      ] },
      { say: [
        { where: "At the library desk", words: "Are there any repair events or swaps around here?" },
        { where: "At a thrift store", words: "Do you know of any repair events or swaps around here?" },
        { where: "To a neighbor", words: "I'm starting a compost bin. Want to share it?" }
      ] },
      { more: [ { sub: "Then grow it", items: [
        { verb: "Pass", text: "one idea along to a neighbor.", reach: "Close to home" },
        { verb: "Bring", text: "a friend to a repair event.", reach: "A little further" },
        { verb: "Introduce", text: "a repair café to your library or school, or welcome newcomers to your group.", reach: "Further still" }
      ] } ] }
    ]
  }
};
