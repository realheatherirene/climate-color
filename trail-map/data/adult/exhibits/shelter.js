/* The Shelter exhibit. Everything here is written once and shared by every
   trail: the exhibit itself, plus a situation and a finder for the Field
   Guide. Titles come from titles.js, so none appear here.
   Adult pack: grade 9 reading level or lower. */

const NCA5_SHELTER = { title: "Fifth National Climate Assessment, Ch. 12: Built Environment, Urban Systems, and Cities, 2023", url: "https://toolkit.climate.gov/NCA5_Ch12_Built-Environment", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch12_Built-Environment" };

export default {
  key: "shelter",

  /* One line under the exhibit's sign: what the reader will get here. */
  promise: "In this exhibit, you'll find out how climate change is changing shelter, who feels it first, and where shelter shows up in your own life.",

  /* The exhibit's parts, in the order set by titles.js. Each has a short
     line under its title, so a closed part still says what's inside. */
  parts: {
    why: {
      exhibit: "sign",
      line: "A quick guess, then why shelter matters.",
      blocks: [
        { find: {
          prompt: "Make a guess first: about how many people live in U.S. coastal counties?",
          button: "Reveal the answer",
          reveal: "About 123 million, around 40 percent of everyone in the country.",
          src: NCA5_SHELTER
        } },
        { teaser: true }
      ],
      ahead: "What's changing for shelter, across the country."
    },

    changing: {
      exhibit: "sign",
      line: "Heat, flooding, and costs.",
      blocks: [
        { p: "Everyone needs safe shelter, at home, at school, and in public buildings. How we build cities and homes can make heat and flooding worse, or better." },
        { list: [
          "**Heat.** Cities can trap heat, and nights in many cities are expected to get hotter. In Las Vegas, heavy-industry areas run about 3.6°F hotter during the day than high-rise areas.",
          "**Flooding.** Flood risk is expected to rise faster in neighborhoods with more Black and Hispanic residents. Flooding can also bring mold and bacteria into homes.",
          "**Costs.** Extreme heat and cold make buildings use more energy. Home values and mortgage lending are starting to shift with climate risk.",
          "**Hope in design.** Mature shade trees, green roofs, cool roofs, and reflective pavement can cool neighborhoods. Green roofs can also hold back stormwater."
        ] },
        { cite: [NCA5_SHELTER] }
      ],
      ahead: "Who feels these changes first."
    },

    who: {
      exhibit: "sign",
      line: "The communities hit hardest.",
      blocks: [
        { p: "Climate changes fall hardest on low-wealth communities. Because of practices like redlining, some neighborhoods have fewer trees and green spaces to cool them." },
        { p: "Some fixes can cause harm, too. New parks and flood barriers can raise property values and push longtime residents out." },
        { cite: [NCA5_SHELTER] }
      ],
      ahead: "A rest stop to think about shelter where you live."
    },

    life: {
      exhibit: "rest",
      line: "Where shelter shows up in your day.",
      blocks: [
        { sub: "Shelter where you live" },
        { questions: [
          "How does my home handle heat, cold, and heavy rain?",
          "Which buildings in my community keep people safe in a storm or heat wave?",
          "Who near me lives in housing that's hard to keep cool or dry?"
        ] }
      ],
      ahead: "Your Field Guide, to take into your own community."
    }
  },

  /* For the Field Guide's "Think it through." The reader writes how
     their own way of helping fits. */
  situation: "Heavy rain floods basements on your block for the second time this year. Some renters have mold in their apartments and aren't sure who to call.",

  /* Added to the shared questions in the Field Guide's first step. */
  first: {
    questions: ["Which shelter work near me could use my way of helping?"],
    friend: ["Where does our community gather for safety in a storm?"]
  },

  /* For the Field Guide: where shelter work turns up close to home. */
  finder: {
    exhibit: "tip",
    line: "Where shelter work turns up near you.",
    blocks: [
      { p: "Opportunities are local, and they change. Home repair groups, tenant groups, and tree plantings are where people who care about shelter find each other." },
      { tips: [
        { verb: "Check", text: "bulletin boards at the library, hardware store, or community center for home repair days and tenant meetings." },
        { verb: "Ask", text: "at town hall or a housing nonprofit about home repair and weatherization programs." },
        { verb: "Sign up for", text: "your city's emergency alerts and housing news." },
        { verb: "Search for", text: "\"home repair volunteers [your town],\" \"tenant union [your city],\" or \"tree planting [your county].\"" }
      ] },
      { find: {
        prompt: "There's a tool that gives the official flood map for any address.",
        button: "Reveal the find",
        reveal: "It's FEMA's Flood Map Service Center. Type in an address or place to find its official flood map.",
        link: { name: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/search", reach: "United States only" }
      } },
      { resources: [
        { verb: "Find", name: "your local Habitat for Humanity", url: "https://habitat.org/volunteer/near-you/find-your-local-habitat", reach: "United States only", desc: "Search by ZIP code or state. Local Habitats offer homeownership, ReStore, and volunteer opportunities." }
      ], label: false },
      { say: [
        { where: "At the library desk", words: "Are there groups here that help with home repairs or renters' rights?" },
        { where: "At town hall", words: "Where should people go to stay cool or safe during a storm?" },
        { where: "To a neighbor", words: "Habitat is building a house on Saturday. Want to come help?" }
      ] },
      { more: [ { sub: "Then grow it", items: [
        { verb: "Pass", text: "one idea along to a neighbor.", reach: "Close to home" },
        { verb: "Bring", text: "a friend to a home repair day.", reach: "A little further" },
        { verb: "Introduce", text: "a tenant group to a home repair group, or welcome newcomers to your group.", reach: "Further still" }
      ] } ], label: false }
    ]
  }
};
