/* The Energy exhibit. Everything here is written once and shared by every
   trail: the exhibit itself, plus a situation and a finder for the Field
   Guide. Titles come from titles.js, so none appear here.
   Adult pack: grade 9 reading level or lower. */

const NCA5_ENERGY = { title: "Fifth National Climate Assessment, Ch. 5: Energy Supply, Delivery, and Demand, 2023", url: "https://toolkit.climate.gov/NCA5_Ch5_Energy", web: "https://nca5.climate.us/chapter/5", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch5_Energy" };

export default {
  key: "energy",

  /* One line under the exhibit's sign: what the reader will get here. */
  promise: "In this exhibit, you'll find out how climate change is affecting energy, who feels it first, and where the effect shows up in your own life.",

  /* The exhibit's parts, in the order set by titles.js. Each has a short
     line under its title, so a closed part still says what's inside. */
  parts: {
    why: {
      exhibit: "sign",
      line: "A quick guess, then why energy matters.",
      blocks: [
        { find: {
          prompt: "Take a guess: a major power outage cuts power to more than 50,000 customers. How much more common were major outages from 2011 to 2021 than from 2000 to 2010?",
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
          "**Hope in clean power.** Over the last decade, wind costs dropped 70 percent and solar costs dropped 90 percent. Some Tribal governments, like the Blue Lake Rancheria in California, have built solar microgrids: small, local power systems."
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
      ahead: "The Bulletin Board, where you choose what comes next."
    }
  },

  /* For the Field Guide's "Think it through." The reader writes how
     their own way of helping fits. */
  situation: "A summer storm knocks out power on your street during a heat wave, and it could be days before it comes back. The older couple next door depends on a fan, and on medicine that has to stay cold.",

  /* Added to the shared questions in the Field Guide's first step. */
  /* "Put your [action] to work": this topic, for each trail. One line
     for each of the trail's three actions, then one first step. */
  work: {
    Red: {
      Focus: "Help your block agree on what matters most during an outage: checking in on neighbors who depend on power.",
      Build: "With each neighbor's okay, start a contact list for your street, and add the utility's outage line and the nearest cooling center.",
      Secure: "Be a steady contact: keep the list current, and send it out when a storm is on the way.",
      first: "Sign up for your utility's outage alerts, and ask the couple next door if they'd like to be on your street's list."
    },
    Orange: {
      Dream: "Imagine what would make the next outage easier for your street, and share your best idea with a few neighbors.",
      Invent: "Make do with what you have at home, like freezing jugs of water before a storm to keep your own cooler cold.",
      Invite: "Ask the couple next door what would help them most during an outage, and find out what neighbors could offer.",
      first: "Ask your utility or community action agency about energy-saving programs, and pass along what you learn."
    },
    Yellow: {
      Inspire: "Share how being ready for an outage helps your whole street, and why it matters to you.",
      Rally: "Before storm season, send a friendly reminder to neighbors to sign up for outage alerts.",
      Encourage: "Thank the neighbors who checked on each other during the last outage.",
      first: "Sign up for your utility's outage alerts, and remind two neighbors to sign up too."
    },
    Green: {
      Unite: "Swap phone numbers with neighbors on your street before the next storm, so you can check in by text.",
      Network: "Know the utility's outage line and your nearest cooling center, and share both with neighbors.",
      Include: "Make sure the couple next door has your number. Ask the neighbors you know who else on your street might want a check-in text.",
      first: "Sign up for your utility's outage alerts and your city's emergency alerts, and help a neighbor sign up too."
    },
    Blue: {
      Clarify: "Explain the utility's outage updates in plain words for neighbors who find them confusing.",
      Inform: "Share the utility's outage line and the nearest cooling center's hours in your group chats.",
      Influence: "Share your street's story with your utility or city council, and ask what they're doing to keep power on during heat waves.",
      first: "Sign up for your utility's outage alerts, and share the sign-up link with neighbors."
    },
    Indigo: {
      Assess: "Before the next storm, sort out which neighbors depend on power most, with their okay.",
      Adapt: "If the outage lasts longer than expected, help neighbors find a plan B, like the nearest cooling center.",
      Guide: "Help a neighbor sign up for outage alerts, or find the community action agency's number.",
      first: "Ask your community action agency about energy assistance programs, and share what you learn with neighbors."
    }
  },

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
        button: "Find out",
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
