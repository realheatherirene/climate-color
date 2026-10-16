/* The Land exhibit. Everything here is written once and shared by every
   trail: the exhibit itself, plus a situation and a finder for the Field
   Guide. Titles come from titles.js, so none appear here.
   Adult pack: grade 9 reading level or lower. */

const NCA5_LAND = { title: "Fifth National Climate Assessment, Ch. 7: Forests, 2023", url: "https://toolkit.climate.gov/NCA5_Ch7_Forests", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch7_Forests" };

export default {
  key: "land",

  /* One line under the exhibit's sign: what the reader will get here. */
  promise: "In this exhibit, you'll find out how climate change is changing land, who feels it first, and where land shows up in your own life.",

  /* The exhibit's parts, in the order set by titles.js. Each has a short
     line under its title, so a closed part still says what's inside. */
  parts: {
    why: {
      exhibit: "sign",
      line: "A quick guess, then why land matters.",
      blocks: [
        { find: {
          prompt: "Make a guess first: from 2014 to 2017, how many trees died in California's forests?",
          button: "Reveal the answer",
          reveal: "More than 100 million. Scientists link about 30 percent of those deaths to warming, which sped up the life cycle of a tree-killing beetle.",
          src: NCA5_LAND
        } },
        { teaser: true }
      ],
      ahead: "What's changing for land, across the country."
    },

    changing: {
      exhibit: "sign",
      line: "Wildfire, homes, and insects.",
      blocks: [
        { p: "The United States has 766 million acres of forest land. Climate change is making some threats to forests more frequent, larger, and more severe." },
        { list: [
          "**Wildfire.** Three of the five worst wildfire years have happened since 2015. In the West, the area burned by severe fire has grown about eightfold since 1985.",
          "**Homes.** Homes lost to wildfire were five times higher in the 2010s than the average from 1990 to 2010.",
          "**Insects.** In Alaska, a spruce beetle outbreak has spread across more than 1.6 million acres since 2016.",
          "**Help from forests.** Each year, U.S. forests take in carbon equal to more than 13 percent of the country's carbon dioxide emissions. Caring for forests ahead of time helps keep them healthy."
        ] },
        { cite: [NCA5_LAND] }
      ],
      ahead: "Who feels these changes first."
    },

    who: {
      exhibit: "sign",
      line: "The communities hit hardest.",
      blocks: [
        { p: "Indigenous and Tribal Peoples' food, ways of life, and cultural practices depend on forests that are changing. Half of Diné (Navajo) households heat their homes mainly with wood. Black landowners in the South have a long history of unequal access to help managing their forests." },
        { p: "People who live where homes meet wildland are losing more homes to wildfire. Wildfire smoke is linked to more hospital visits for breathing and heart problems." },
        { cite: [NCA5_LAND] }
      ],
      ahead: "A rest stop to think about land where you live."
    },

    life: {
      exhibit: "rest",
      line: "Where land shows up in your day.",
      blocks: [
        { sub: "Land where you live" },
        { questions: [
          "Where do trees, parks, and open spaces show up in my day?",
          "Has wildfire smoke, a storm, or drought touched my community?",
          "Who near me depends on forests or land for their work or way of life?"
        ] }
      ],
      ahead: "The Bulletin Board, where you choose what comes next."
    }
  },

  /* For the Field Guide's "Think it through." The reader writes how
     their own way of helping fits. */
  situation: "Wildfire smoke drifts into your town for the third summer in a row. The air quality alert is posted online, and the senior center has no air filters.",

  /* Added to the shared questions in the Field Guide's first step. */
  first: {
    questions: ["Which land work near me could use my way of helping?"],
    friend: ["Where do trees and open spaces bring our community together?"]
  },

  /* For the Field Guide: where land work turns up close to home. */
  finder: {
    exhibit: "tip",
    line: "Where land work turns up near you.",
    blocks: [
      { p: "Opportunities are local, and they change. Tree plantings, park cleanups, and trail workdays are where people who care about land find each other." },
      { tips: [
        { verb: "Check", text: "bulletin boards at the library, park office, or nature center for tree plantings and cleanups." },
        { verb: "Ask", text: "at a park office, nature center, or the county extension office how you can help." },
        { verb: "Sign up for", text: "your parks department's news or a local land trust's newsletter." },
        { verb: "Search for", text: "\"tree planting [your town],\" \"park cleanup [your city],\" or \"land trust [your county].\"" }
      ] },
      { find: {
        prompt: "There's a federal website that lists volunteer work on public lands.",
        button: "Reveal the find",
        reveal: "It's Volunteer.gov, with openings at national parks and other public lands. The National Park Service's volunteer page links to its list of opportunities.",
        link: { name: "Volunteer with the National Park Service", url: "https://nps.gov/volunteer", reach: "United States only" }
      } },
      { resources: [
        { verb: "Find", name: "a land trust near you", url: "https://landtrustalliance.org/land-trusts/explore", reach: "United States only", desc: "From the Land Trust Alliance. Browse by state, or narrow the list to land trusts with trails, public access, or volunteer opportunities." }
      ], label: false },
      { say: [
        { where: "At a nature center", words: "Do you need volunteers for plantings or cleanups?" },
        { where: "At town hall", words: "Who takes care of the trees in our parks and along our streets?" },
        { where: "To a neighbor", words: "There's a tree planting at the park on Saturday. Want to come?" }
      ] },
      { more: [ { sub: "Then grow it", items: [
        { verb: "Pass", text: "one idea along to a neighbor.", reach: "Close to home" },
        { verb: "Bring", text: "a friend to a planting day.", reach: "A little further" },
        { verb: "Introduce", text: "a land trust to your block club, or welcome newcomers to your group.", reach: "Further still" }
      ] } ], label: false }
    ]
  }
};
