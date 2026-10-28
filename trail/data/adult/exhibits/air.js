/* The Air exhibit. Everything here is written once and shared by every
   trail: the exhibit itself, plus a situation and a finder for the Field
   Guide. Titles come from titles.js, so none appear here.
   Adult pack: grade 9 reading level or lower. */

const NCA5_AIR = { title: "Fifth National Climate Assessment, Ch. 14: Air Quality, 2023", url: "https://toolkit.climate.gov/NCA5_Ch14_Air-Quality", web: "https://nca5.climate.us/chapter/14", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch14_Air-Quality" };
const NCA5_HEALTH = { title: "Fifth National Climate Assessment, Ch. 15: Human Health, 2023", url: "https://toolkit.climate.gov/NCA5_Ch15_Human-Health", web: "https://nca5.climate.us/chapter/15", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch15_Human-Health" };

export default {
  key: "air",

  /* One line under the exhibit's sign: what the reader will get here. */
  promise: "In this exhibit, you'll find out how climate change is affecting the air, who feels it first, and where the effect shows up in your own life.",

  /* The exhibit's parts, in the order set by titles.js. Each has a short
     line under its title, so a closed part still says what's inside. */
  parts: {
    why: {
      exhibit: "sign",
      line: "A quick guess, then why air matters.",
      blocks: [
        { find: {
          prompt: "Take a guess: from 2011 to 2019, about how many heat-related injuries did U.S. workers report each year?",
          button: "Reveal the answer",
          reveal: "About 3,500 a year, and 38 deaths a year.",
          src: NCA5_HEALTH
        } },
        { teaser: true }
      ],
      ahead: "What's changing for air, across the country."
    },

    changing: {
      exhibit: "sign",
      line: "Heat, cold, smoke, pollen, and pollution.",
      blocks: [
        { p: "Everyone depends on the air around us, indoors and out. Climate change is making it hotter, smokier, and in many places, fuller of pollen." },
        { list: [
          "**Heat.** Heat sends more people to the emergency room for heart disease, diabetes, and other conditions, and heat waves can bring high levels of air pollution.",
          "**Cold.** Cold can be dangerous too. Cold spells, like the one in Texas in February 2021, have caused deaths from cold and power failures. Whether cold spells will become more or less common is still uncertain.",
          "**Smoke.** Large wildfires have become more frequent in the western U.S., and their smoke can spread across much of North America. Wildfire smoke is linked to more emergency room visits, hospital stays, and deaths.",
          "**Pollen.** Many U.S. regions have longer, more intense pollen seasons that start earlier. Ragweed season has grown longer since the 1990s.",
          "**Pollution.** Ozone, a main part of smog, is higher on warm, sunny days, so heat can make the air harder on people's health.",
          "**Hope in cleaner air.** When pollution is cut, the air nearby gets cleaner almost right away. Heat warnings, green spaces, and fair access to cooling centers help protect people from heat."
        ] },
        { cite: [NCA5_AIR, NCA5_HEALTH] }
      ],
      ahead: "Who feels these changes first."
    },

    who: {
      exhibit: "sign",
      line: "The communities hit hardest.",
      blocks: [
        { p: "Heat harms children, adults over 65, people with disabilities, pregnant people, people without cooling, and outdoor workers the most. Latino people are 43 percent more likely than other groups to live where heat cuts work hours the most." },
        { p: "Communities of color and low-income communities carry more of the burden of poor air quality. Low-income households may have a harder time filtering the air at home during smoke." },
        { cite: [NCA5_HEALTH, NCA5_AIR] }
      ],
      ahead: "A rest stop to think about air where you live."
    },

    life: {
      exhibit: "rest",
      line: "Where air shows up in your day.",
      blocks: [
        { sub: "Air where you live" },
        { questions: [
          "How do heat, cold, smoke, or pollen affect my days?",
          "Who near me is most at risk on a very hot day?",
          "Where can people in my community go when it's dangerously hot, cold, or smoky outside?"
        ] }
      ],
      ahead: "The Bulletin Board, where you choose what comes next."
    }
  },

  /* For the Field Guide's "Think it through." The reader writes how
     their own way of helping fits. */
  situation: "A heat wave hits your town in June. The cooling center opens at the library, but many older neighbors don't know about it, and some can't get there.",

  /* Added to the shared questions in the Field Guide's first step. */
  /* "Put your [action] to work": this topic, for each trail. One line
     for each of the trail's three actions, then one first step. */
  work: {
    Red: {
      Focus: "Help your block put the people most at risk first on hot days: older adults, babies, and people who are sick.",
      Build: "Make a simple heat plan with neighbors: a contact list, the cooling center's hours, and a time each day to send a check-in text.",
      Secure: "Be the one who sends the check-in texts every hot day, and keep the list current.",
      first: "Ask your public health department or senior center whether they need volunteers for heat check-in calls."
    },
    Orange: {
      Dream: "Imagine a block where no one faces a heat wave alone. What would that take?",
      Invent: "Try a new way to share the cooling center's hours, like a post in your building's group chat or a note on the lobby board.",
      Invite: "Ask older neighbors you know what would make hot days easier, and build on their ideas.",
      first: "Ask your senior center or public health department how you can help share heat alerts."
    },
    Yellow: {
      Inspire: "Share why caring for each other in the heat matters to you, in your building's group chat or a conversation.",
      Rally: "On hot days, send a friendly reminder with the cooling center's hours.",
      Encourage: "Thank the library staff and volunteers who run the cooling center.",
      first: "Sign up for heat alerts from your health department, and pass them on to your group chats."
    },
    Green: {
      Unite: "Swap numbers with older neighbors you know, and send a quick check-in text on hot days.",
      Network: "Know where the cooling center is and when it's open, and share that with neighbors and your group chats.",
      Include: "Ask the neighbors you check in with whether they can get to the cooling center. If they need a ride, help them find the city's or senior center's ride line.",
      first: "Sign up for heat alerts from your health department, and share them with your neighbors."
    },
    Blue: {
      Clarify: "Explain heat safety in plain words, using the health department's tips.",
      Inform: "Share the cooling center's location and hours in your group chats and your building.",
      Influence: "Share your block's story with the library or the city, and ask whether more cooling centers could open next summer.",
      first: "Sign up for heat alerts from your health department, and share them with your group chats."
    },
    Indigo: {
      Assess: "Among the neighbors you know, sort out who is most at risk in the heat.",
      Adapt: "If the cooling center is hard to reach, help find another cool place, like a library branch.",
      Guide: "Help a neighbor find heat alerts and the cooling center's hours.",
      first: "Ask your senior center or public health department how you can help neighbors get ready for heat waves."
    }
  },

  first: {
    questions: ["Which clean-air or heat-safety projects near me could use my way of helping?"],
    friend: ["Where does our community go to stay cool, warm, or out of the smoke?"]
  },

  /* For the Field Guide: where air projects turn up close to home. */
  finder: {
    exhibit: "tip",
    line: "Where air projects turn up near you.",
    blocks: [
      { p: "Opportunities are local, and they change. Heat check-ins, senior centers, and clean-air groups are where people who care about air find each other." },
      { tips: [
        { verb: "Check", text: "bulletin boards at the library, senior center, or clinic for heat check-in and volunteer calls." },
        { verb: "Ask", text: "your public health department or senior center how you can help on hot, cold, or smoky days." },
        { verb: "Sign up for", text: "heat and air quality alerts from your health department or the weather service." },
        { verb: "Search for", text: "\"heat check-in volunteers [your city],\" \"clean air group [your county],\" or \"air quality alerts [your state].\"" }
      ] },
      { find: {
        prompt: "There's a map from the National Weather Service that tells you how risky the heat will be this week.",
        button: "Find out",
        reveal: "It's NWS HeatRisk. Its map covers the next seven days, with five levels from green, little to no risk, to magenta, rare or long-lasting extreme heat.",
        link: { name: "NWS HeatRisk", url: "https://www.wpc.ncep.noaa.gov/heatrisk", reach: "United States only" }
      } },
      { resources: [
        { verb: "Check", name: "AirNow", url: "https://www.airnow.gov/", reach: "United States only", desc: "From the EPA. Type in a U.S. location for the latest local air quality, including wildfire smoke on its Fire and Smoke Map." },
        { verb: "Find", name: "the Eldercare Locator", url: "https://eldercare.acl.gov/", reach: "United States only", desc: "A public service of the U.S. Administration for Community Living. Type in a location, or call 1-800-677-1116, to find help for older adults in your community. Then ask how neighbors can help older adults on hot or smoky days." }
      ] },
      { say: [
        { where: "At the library desk", words: "Does anyone here help people find cooling centers or sign up for heat alerts?" },
        { where: "At a senior center", words: "Do you need volunteers to check on members during heat waves?" },
        { where: "To a neighbor", words: "If it gets really hot this week, can I check on you?" }
      ] },
      { more: [ { sub: "Then grow it", items: [
        { verb: "Pass", text: "one idea along to a neighbor.", reach: "Close to home" },
        { verb: "Bring", text: "a friend to a heat check-in day.", reach: "A little further" },
        { verb: "Introduce", text: "a senior center to the cooling center, or welcome newcomers to your group.", reach: "Further still" }
      ] } ] }
    ]
  }
};
