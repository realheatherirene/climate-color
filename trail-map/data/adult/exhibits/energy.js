/* The Energy exhibit. Everything here is written once and shared by every
   trail: the exhibit itself, plus a situation and a finder for the Field
   Guide. Titles come from titles.js, so none appear here.
   Adult pack: grade 9 reading level or lower. */

const NCA5_ENERGY = { title: "Fifth National Climate Assessment, Ch. 5: Energy Supply, Delivery, and Demand, 2023", url: "https://doi.org/10.7930/NCA5.2023.CH5" };

export default {
  key: "energy",

  /* One line under the exhibit's sign: what the reader will get here. */
  promise: "In this exhibit, you'll find out how climate change is changing energy, who feels it first, and where energy shows up in your own life.",

  /* The exhibit's parts, in the order set by titles.js. Each has a short
     line under its title, so a closed part still says what's inside. */
  parts: {
    why: {
      exhibit: "sign",
      line: "A quick guess, then why energy matters.",
      blocks: [
        { find: {
          prompt: "Make a guess first: a major power outage cuts power to more than 50,000 customers. How much more common were major outages from 2011 to 2021 than from 2000 to 2010?",
          button: "Reveal the answer",
          reveal: "About 64 percent more common.",
          src: NCA5_ENERGY
        } },
        { teaser: true }
      ],
      ahead: "What's changing for energy, across the country."
    },

    changing: {
      exhibit: "sign",
      line: "Heat, energy bills, and extreme cold.",
      blocks: [
        { p: "Everyone depends on energy, to keep homes warm or cool, to keep food cold, and to get to work and school. Climate change is putting the ways we make and deliver energy at risk." },
        { list: [
          "**Heat.** Hotter summers mean more cooling. In Sacramento, Los Angeles, and New York City, summer cooling makes up 30 to 50 percent of daily electricity use.",
          "**Energy bills.** Low-income households in rural areas spend a median of 9 percent of their income on energy, and up to 15 percent in some regions. Rural middle- and high-income households spend 3 percent.",
          "**Extreme cold.** At least 210 people died during the 2021 power outages and cold weather in Texas.",
          "**Hope in clean power.** Over the last decade, wind costs dropped 70 percent and solar costs dropped 90 percent. Some communities, like the Blue Lake Rancheria Tribe, have built solar microgrids: small, local power systems."
        ] },
        { cite: [NCA5_ENERGY] }
      ],
      ahead: "Who feels these changes first."
    },

    who: {
      exhibit: "sign",
      line: "The communities hit hardest.",
      blocks: [
        { p: "Risks to energy fall hardest on overburdened communities, low-income households, and rural areas. After Hurricane Ida, areas with more Black residents waited longer to get their power back." },
        { p: "As energy changes, Appalachia, the Gulf Coast, and the intermountain West may lose the most jobs and tax money." },
        { cite: [NCA5_ENERGY] }
      ],
      ahead: "A rest stop to think about energy where you live."
    },

    life: {
      exhibit: "rest",
      line: "Where energy shows up in your day.",
      blocks: [
        { sub: "Energy where you live" },
        { questions: [
          "Where does energy show up in my day?",
          "Has a power outage or a high energy bill touched my family or neighbors?",
          "Who near me would have a hard time in a long outage?"
        ] }
      ],
      ahead: "Your Field Guide, to take into your own community."
    }
  },

  /* For the Field Guide's "Think it through." The reader writes how
     their own way of helping fits. */
  situation: "A summer storm knocks out power on your street during a heat wave, and it could be days before it comes back. The older couple next door depends on a fan, and on medicine that has to stay cold.",

  /* Added to the shared questions in the Field Guide's first step. */
  first: {
    questions: ["Which energy work near me could use my way of helping?"],
    friend: ["Where does energy show up in our community?"]
  },

  /* For the Field Guide: where energy work turns up close to home. */
  finder: {
    exhibit: "tip",
    line: "Where energy work turns up near you.",
    blocks: [
      { p: "Opportunities are local, and they change. Energy fairs, weatherization drives, and community solar meetings are where people who care about energy find each other." },
      { tips: [
        { verb: "Check", text: "the notes in your energy bill and bulletin boards at the library or town hall." },
        { verb: "Ask", text: "your utility, town hall, or community action agency about energy-saving programs." },
        { verb: "Sign up for", text: "your utility's outage alerts and your city's emergency alerts." },
        { verb: "Search for", text: "\"energy assistance [your county],\" \"community solar [your state],\" or \"home energy audit [your city].\"" }
      ] },
      { find: {
        prompt: "There's a hotline that helps people find help paying their energy bills.",
        button: "Reveal the find",
        reveal: "It's the National Energy Assistance Referral hotline, 1-866-674-6327, for the federal Low Income Home Energy Assistance Program. The program helps with heating and cooling bills, shutoffs, and small energy repairs, and it never charges a fee.",
        link: { name: "Low Income Home Energy Assistance Program", url: "https://acf.gov/ocs/programs/liheap", reach: "United States only" }
      } },
      { resources: [
        { verb: "Explore", name: "the Weatherization Assistance Program", url: "https://www.energy.gov/scep/wap/how-apply-weatherization-assistance", reach: "United States only", desc: "It's run by state and local agencies. This page lists the steps: check if you qualify, find your local provider, and apply." }
      ], label: false },
      { say: [
        { where: "At the library desk", words: "Are there any energy-saving workshops or programs around here?" },
        { where: "At town hall", words: "Does our town have a plan to help people during long power outages?" },
        { where: "To a neighbor", words: "If the power goes out this summer, can we check on each other?" }
      ] },
      { more: [ { sub: "Then grow it", items: [
        { verb: "Pass", text: "one idea along to a neighbor.", reach: "Close to home" },
        { verb: "Bring", text: "a friend to an energy fair.", reach: "A little further" },
        { verb: "Introduce", text: "a neighbor to the energy assistance hotline, or welcome newcomers to your group.", reach: "Further still" }
      ] } ], label: false }
    ]
  }
};
