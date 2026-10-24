/* The Land exhibit. Everything here is written once and shared by every
   trail: the exhibit itself, plus a situation and a finder for the Field
   Guide. Titles come from titles.js, so none appear here.
   Adult pack: grade 9 reading level or lower. */

const NCA5_LAND = { title: "Fifth National Climate Assessment, Ch. 7: Forests, 2023", url: "https://toolkit.climate.gov/NCA5_Ch7_Forests", web: "https://nca5.climate.us/chapter/7", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch7_Forests" };

export default {
  key: "land",

  /* One line under the exhibit's sign: what the reader will get here. */
  promise: "In this exhibit, you'll find out how climate change is affecting land, who feels it first, and where the effect shows up in your own life.",

  /* The exhibit's parts, in the order set by titles.js. Each has a short
     line under its title, so a closed part still says what's inside. */
  parts: {
    why: {
      exhibit: "sign",
      line: "A quick guess, then why land matters.",
      blocks: [
        { find: {
          prompt: "Take a guess: from 2014 to 2017, how many trees died in California's forests?",
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
  /* "Put your [action] to work": this topic, for each trail. One line
     for each of the trail's three actions, then one first step. */
  work: {
    Red: {
      Focus: "Ask the senior center's staff what would help most on smoky days, and focus your help there.",
      Build: "Set up a simple plan with neighbors to collect what the center asks for, like donated fans.",
      Secure: "Be someone the center can count on: check in with its staff each smoke season to ask what's needed.",
      first: "Ask a park office or land trust about a regular volunteer role, like a monthly tree care day."
    },
    Orange: {
      Dream: "Imagine the senior center as a clean-air spot on smoky days, and share the idea with the center's staff.",
      Invent: "Think up a new way to get the word out about smoke alerts, like a sign at the center's front desk, and offer it to the staff.",
      Invite: "Ask the center's staff what members say would make smoky days easier, and offer ideas that build on theirs.",
      first: "Ask at a park office or nature center about a tree planting or native plant workday."
    },
    Yellow: {
      Inspire: "Share why clean air matters to you and the people you love, and invite friends to join a tree planting.",
      Rally: "Gather a few friends to sign up together for the next park or tree planting workday, and celebrate afterward.",
      Encourage: "Thank the senior center's staff for keeping members safe on smoky days.",
      first: "Ask at a park office or nature center about the next tree planting, and invite a friend."
    },
    Green: {
      Unite: "Ask the senior center's staff what they need on smoky days, like donated fans, and gather a few neighbors to help collect it.",
      Network: "Pass the air quality alert to people you know who don't follow it online.",
      Include: "Ask a teacher or a neighborhood group who spends the most time outdoors on smoky days, and share the alert with them.",
      first: "Ask at a park office or nature center about tree plantings and cleanups."
    },
    Blue: {
      Clarify: "Explain the air quality alert in plain words, and point people to the health department's tips.",
      Inform: "Share the alert with people you know who don't follow it online.",
      Influence: "Tell your city council or parks department about your town's smoke summers, and ask about plans for cleaner air.",
      first: "Sign up for your parks department's news or a local land trust's newsletter, and share what you learn."
    },
    Indigo: {
      Assess: "Ask the senior center's staff what matters most to them on smoky days.",
      Adapt: "If smoke comes earlier than usual, help shift plans, like moving an outdoor event indoors.",
      Guide: "Help a neighbor find the air quality alerts and the health department's tips.",
      first: "Ask at a park office or nature center which volunteer roles they need filled most."
    }
  },

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
        button: "Find out",
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
