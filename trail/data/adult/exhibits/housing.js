/* The Housing exhibit. Everything here is written once and shared by every
   trail: the exhibit itself, plus a situation and a finder for the Field
   Guide. Titles come from titles.js, so none appear here.
   Adult pack: grade 9 reading level or lower. */

const NCA5_BUILT = { title: "Fifth National Climate Assessment, Ch. 12: Built Environment, Urban Systems, and Cities, 2023", url: "https://toolkit.climate.gov/NCA5_Ch12_Built-Environment", web: "https://nca5.climate.us/chapter/12", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch12_Built-Environment" };
const NCA5_HEALTH = { title: "Fifth National Climate Assessment, Ch. 15: Human Health, 2023", url: "https://toolkit.climate.gov/NCA5_Ch15_Human-Health", web: "https://nca5.climate.us/chapter/15", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch15_Human-Health" };

export default {
  key: "housing",

  /* One line under the exhibit's sign: what the reader will get here. */
  promise: "In this exhibit, you'll find out how climate change is affecting housing, who feels it first, and where the effect shows up in your own life.",

  /* The exhibit's parts, in the order set by titles.js. Each has a short
     line under its title, so a closed part still says what's inside. */
  parts: {
    why: {
      exhibit: "sign",
      line: "A quick guess, then why housing matters.",
      blocks: [
        { find: {
          prompt: "Take a guess: about how many people live in U.S. coastal counties?",
          button: "Reveal the answer",
          reveal: "About 123 million, around 40 percent of everyone in the country.",
          src: NCA5_BUILT
        } },
        { teaser: true }
      ],
      ahead: "What's changing for housing, across the country."
    },

    changing: {
      exhibit: "sign",
      line: "Heat, flooding, and costs.",
      blocks: [
        { p: "Everyone needs a safe, affordable place to live. Where and how homes are built can make heat and flooding worse, or better." },
        { list: [
          "**Hotter neighborhoods.** Cities can trap heat, and nights in many cities are expected to get hotter. In Las Vegas, heavy-industry areas run about 3.6°F hotter during the day than high-rise areas.",
          "**Flooding.** Flood risk is expected to rise faster in neighborhoods with more Black and Hispanic residents. Flooding can also bring mold and bacteria into homes.",
          "**Costs.** Extreme heat and cold make buildings use more energy. Home values and mortgage lending are starting to shift with climate risk.",
          "**Hope in design.** Mature shade trees, green roofs, cool roofs, and reflective pavement can cool neighborhoods. Green roofs can also hold back stormwater."
        ] },
        { cite: [NCA5_BUILT] }
      ],
      ahead: "Who feels these changes first."
    },

    who: {
      exhibit: "sign",
      line: "The communities hit hardest.",
      blocks: [
        { p: "Climate changes fall hardest on low-income communities. Because of practices like redlining, some neighborhoods have fewer trees and green spaces to cool them." },
        { p: "Some fixes can cause harm, too. New parks and flood barriers can raise property values and push longtime residents out." },
        { p: "People experiencing homelessness are among those most at risk from extreme heat. Air conditioning is hard to reach for people without housing and for low-income households. Health experts call for fair access to cooling centers." },
        { cite: [NCA5_BUILT, NCA5_HEALTH] }
      ],
      ahead: "A rest stop to think about housing where you live."
    },

    life: {
      exhibit: "rest",
      line: "Where housing shows up in your day.",
      blocks: [
        { sub: "Housing where you live" },
        { questions: [
          "How does my home handle heat, cold, and heavy rain?",
          "Which buildings in my community keep people safe in a storm or heat wave?",
          "Who near me lives in housing that's hard to keep cool or dry?"
        ] }
      ],
      ahead: "The Bulletin Board, where you choose what comes next."
    }
  },

  /* For the Field Guide's "Think it through." The reader writes how
     their own way of helping fits. */
  situation: "Heavy rain floods basements on your block for the second time this year. Some renters have mold in their apartments and aren't sure who to call.",

  /* Added to the shared questions in the Field Guide's first step. */
  /* "Put your [action] to work": this topic, for each trail. One line
     for each of the trail's three actions, then one first step. */
  work: {
    Red: {
      Focus: "Help the renters you know agree on one clear question for the landlord, like when the drainage will be fixed.",
      Build: "Start a shared record: the date of each flood, photos of the damage, and each call or letter to the landlord.",
      Secure: "Keep those records safe and in order, so the renters have them if they need them.",
      first: "Ask a tenant group or housing nonprofit how to put a repair request in writing."
    },
    Orange: {
      Dream: "Imagine your block after the next heavy rain, with dry basements. With neighbors, list what would need to change.",
      Invent: "Try a small fix for your own home, like keeping the drain outside your door clear of leaves.",
      Invite: "Ask the renters you know what they've tried, and share the ideas that worked.",
      first: "Ask a housing nonprofit or tenant group whether they hold workshops on mold, repairs, or tenant rights."
    },
    Yellow: {
      Inspire: "Share what you've learned about tenant rights or flood safety, so other renters feel less alone.",
      Rally: "Invite the renters you know to a tenant group's next meeting or workshop, and go together.",
      Encourage: "Cheer on renters who speak up, and thank anyone who helped.",
      first: "Ask a tenant group or housing nonprofit about their next meeting, and invite a neighbor."
    },
    Green: {
      Unite: "Talk with other renters on your block about what's been happening, so no one feels alone with the problem.",
      Network: "Know who to call: the city's housing or code office, a tenant group, or a housing nonprofit. Share those numbers with the renters you know.",
      Include: "Ask the renters you know whether anyone else is dealing with mold but hasn't spoken up, and pass the numbers along to them too.",
      first: "Ask at town hall or a housing nonprofit about home repair and tenant programs."
    },
    Blue: {
      Clarify: "Explain in plain words who renters can call about mold and repairs, using information from a tenant group or the city.",
      Inform: "Share those numbers with the renters you know.",
      Influence: "Share your block's flooding story with your city council member, and ask about plans to fix the drainage.",
      first: "Sign up for your city's emergency alerts and housing news."
    },
    Indigo: {
      Assess: "Help the renters you know sort out what's most urgent: mold, safety, or repairs.",
      Adapt: "If the first call doesn't get results, help find the next one, like a tenant group or housing nonprofit.",
      Guide: "Help a renter find the city's housing office or a tenant rights guide.",
      first: "Ask a housing nonprofit or tenant group for a tenant rights guide, and share it with renters you know."
    }
  },

  first: {
    questions: ["Which housing projects near me could use my way of helping?"],
    friend: ["Where does our community gather for safety in a storm?"]
  },

  /* For the Field Guide: where housing projects turn up close to home. */
  finder: {
    exhibit: "tip",
    line: "Where housing projects turn up near you.",
    blocks: [
      { p: "Opportunities are local, and they change. Home repair groups, tenant groups, and tree plantings are where people who care about housing find each other." },
      { tips: [
        { verb: "Check", text: "bulletin boards at the library, hardware store, or community center for home repair days and tenant meetings." },
        { verb: "Ask", text: "at town hall or a housing nonprofit about home repair and weatherization programs." },
        { verb: "Sign up for", text: "your city's emergency alerts and housing news." },
        { verb: "Search for", text: "\"home repair volunteers [your town],\" \"tenant union [your city],\" or \"tree planting [your county].\"" },
        { verb: "Search for", text: "\"cooling center [your city]\" or \"warming center [your county],\" or dial 211 and ask where the nearest one is open." }
      ] },
      { find: {
        prompt: "There's a tool that gives the official flood map for any address.",
        button: "Find out",
        reveal: "It's FEMA's Flood Map Service Center. Type in an address or place to find its official flood map.",
        link: { name: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/search", reach: "United States only" }
      } },
      { resources: [
        { verb: "Find", name: "your local Habitat for Humanity", url: "https://habitat.org/volunteer/near-you/find-your-local-habitat", reach: "United States only", desc: "Search by ZIP code or state. Local Habitats offer homeownership, ReStore, and volunteer opportunities." }
      ] },
      { say: [
        { where: "At the library desk", words: "Are there groups here that help with home repairs or renters' rights?" },
        { where: "At town hall", words: "Where should people go to stay cool or safe during a storm?" },
        { where: "To a neighbor", words: "Habitat is building a house on Saturday. Want to come help?" }
      ] },
      { more: [ { sub: "Then grow it", items: [
        { verb: "Pass", text: "one idea along to a neighbor.", reach: "Close to home" },
        { verb: "Bring", text: "a friend to a home repair day.", reach: "A little further" },
        { verb: "Introduce", text: "a tenant group to a home repair group, or welcome newcomers to your group.", reach: "Further still" }
      ] } ] }
    ]
  }
};
