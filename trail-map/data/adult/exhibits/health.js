/* The Health exhibit. Everything here is written once and shared by every
   trail: the exhibit itself, plus a situation and a finder for the Field
   Guide. Titles come from titles.js, so none appear here.
   Adult pack: grade 9 reading level or lower. */

const NCA5_HEALTH = { title: "Fifth National Climate Assessment, Ch. 15: Human Health, 2023", url: "https://toolkit.climate.gov/NCA5_Ch15_Human-Health" };

export default {
  key: "health",

  /* One line under the exhibit's sign: what the reader will get here. */
  promise: "In this exhibit, you'll find out how climate change is changing health, who feels it first, and where health shows up in your own life.",

  /* The exhibit's parts, in the order set by titles.js. Each has a short
     line under its title, so a closed part still says what's inside. */
  parts: {
    why: {
      exhibit: "sign",
      line: "A quick guess, then why health matters.",
      blocks: [
        { find: {
          prompt: "Make a guess first: in a survey of 1,000 U.S. teens, about how many out of 10 said they feel anxious about climate change?",
          button: "Reveal the answer",
          reveal: "Nearly 6 out of 10. Almost half were very or extremely worried.",
          src: NCA5_HEALTH
        } },
        { teaser: true }
      ],
      ahead: "What's changing for health, across the country."
    },

    changing: {
      exhibit: "sign",
      line: "Heat, ticks, and smoke.",
      blocks: [
        { p: "Everyone depends on good health, and on the clinics, hospitals, and people who care for us. Climate change is already harming people's physical, mental, and community health." },
        { list: [
          "**Heat.** Heat sends more people to the emergency room for heart disease, diabetes, and other conditions. From 2011 to 2019, U.S. workers reported an average of 3,500 heat-related injuries and 38 deaths a year.",
          "**Ticks.** Ticks cause about 80 percent of the reported U.S. diseases spread by ticks and insects.",
          "**Smoke.** Wildfire smoke is linked to more emergency room visits, hospital stays, and deaths.",
          "**Hope in care.** Heat warnings, green spaces, and fair access to cooling centers help protect people. Limiting warming could greatly reduce heat deaths, especially in cities."
        ] },
        { cite: [NCA5_HEALTH] }
      ],
      ahead: "Who feels these changes first."
    },

    who: {
      exhibit: "sign",
      line: "The communities hit hardest.",
      blocks: [
        { p: "Heat harms children, adults over 65, people with disabilities, pregnant people, people without cooling, and outdoor workers the most. Latinx people are 43 percent more likely than other groups to live where heat cuts work hours the most." },
        { p: "Low-income communities, communities of color, and Tribal and Indigenous Peoples carry a heavier share of climate's harm to health." },
        { cite: [NCA5_HEALTH] }
      ],
      ahead: "A rest stop to think about health where you live."
    },

    life: {
      exhibit: "rest",
      line: "Where health shows up in your day.",
      blocks: [
        { sub: "Health where you live" },
        { questions: [
          "How does the weather affect how I feel, in body and mind?",
          "Where do people in my community go for care?",
          "Who near me is most at risk on a very hot day?"
        ] }
      ],
      ahead: "Your Field Guide, to take into your own community."
    }
  },

  /* For the Field Guide's "Think it through." The reader writes how
     their own way of helping fits. */
  situation: "A heat wave hits your town in June. The cooling center opens at the library, but many older neighbors don't know about it, and some can't get there.",

  /* Added to the shared questions in the Field Guide's first step. */
  first: {
    questions: ["Which health work near me could use my way of helping?"],
    friend: ["Where does our community care for each other's health?"]
  },

  /* For the Field Guide: where health work turns up close to home. */
  finder: {
    exhibit: "tip",
    line: "Where health work turns up near you.",
    blocks: [
      { p: "Opportunities are local, and they change. Clinics, health fairs, and senior centers are where people who care about health find each other." },
      { tips: [
        { verb: "Check", text: "bulletin boards at the library, clinic, or pharmacy for health fairs and volunteer calls." },
        { verb: "Ask", text: "at a community health center, senior center, or public health department how you can help." },
        { verb: "Sign up for", text: "heat and air quality alerts from your health department or the weather service." },
        { verb: "Search for", text: "\"community health worker [your county],\" \"cooling center [your city],\" or \"health fair [your town].\"" }
      ] },
      { find: {
        prompt: "There's a map from the National Weather Service that tells you how risky the heat will be this week.",
        button: "Reveal the find",
        reveal: "It's NWS HeatRisk. Its map covers the next seven days, with five levels from green, little to no risk, to magenta, rare or long-lasting extreme heat.",
        link: { name: "NWS HeatRisk", url: "https://www.wpc.ncep.noaa.gov/heatrisk", reach: "United States only" }
      } },
      { resources: [
        { verb: "Find", name: "a health center", url: "https://findahealthcenter.hrsa.gov/", reach: "United States only", desc: "Health centers offer checkups, care when you're sick, and care during pregnancy, even if you don't have insurance. You pay what you can afford, based on your income." }
      ], label: false },
      { say: [
        { where: "At the library desk", words: "Does anyone here help people find cooling centers or sign up for heat alerts?" },
        { where: "At a senior center", words: "Do you need volunteers to check on members during heat waves?" },
        { where: "To a neighbor", words: "If it gets really hot this week, can I check on you?" }
      ] },
      { more: [ { sub: "Then grow it", items: [
        { verb: "Pass", text: "one idea along to a neighbor.", reach: "Close to home" },
        { verb: "Bring", text: "a friend to a health fair.", reach: "A little further" },
        { verb: "Introduce", text: "a senior center to the cooling center, or welcome newcomers to your group.", reach: "Further still" }
      ] } ], label: false }
    ]
  }
};
