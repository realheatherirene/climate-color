/* The Land exhibit. Everything here is written once and shared by every
   trail: the exhibit itself, plus a situation and a finder for the Field
   Guide. Titles come from titles.js, so none appear here.
   Adult pack: grade 9 reading level or lower. */

const NCA5_FORESTS = { title: "Fifth National Climate Assessment, Ch. 7: Forests, 2023", url: "https://toolkit.climate.gov/NCA5_Ch7_Forests", web: "https://nca5.climate.us/chapter/7", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch7_Forests" };
const NCA5_ECOSYSTEMS = { title: "Fifth National Climate Assessment, Ch. 8: Ecosystems, Ecosystem Services, and Biodiversity, 2023", url: "https://toolkit.climate.gov/NCA5_Ch8_Ecosystems", web: "https://nca5.climate.us/chapter/8", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch8_Ecosystems" };

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
          prompt: "Take a guess: many U.S. crops need pollinators, like bees, to grow. About what share of those crops have too few pollinators?",
          button: "Reveal the answer",
          reveal: "Nearly 40 percent.",
          src: NCA5_ECOSYSTEMS
        } },
        { teaser: true }
      ],
      ahead: "What's changing for land, across the country."
    },

    changing: {
      exhibit: "sign",
      line: "Wildfire, insects, and moving species.",
      blocks: [
        { p: "The United States has 766 million acres of forest land, and its plants and animals depend on each other, and on us. Climate change is making some threats to forests more frequent, larger, and more severe, and it's changing where plants and animals can live." },
        { list: [
          "**Wildfire.** Three of the five worst wildfire years have happened since 2015. In the West, the area burned by severe fire has grown about eightfold since 1985. Homes lost to wildfire were five times higher in the 2010s than the average from 1990 to 2010.",
          "**Insects.** In Alaska, a spruce beetle outbreak has spread across more than 1.6 million acres since 2016.",
          "**Moving species.** Plants and animals are shifting where they live.",
          "**Help from forests.** Each year, U.S. forests take in carbon equal to more than 13 percent of the country's carbon dioxide emissions. Caring for forests ahead of time helps keep them healthy."
        ] },
        { cite: [NCA5_FORESTS, NCA5_ECOSYSTEMS] }
      ],
      ahead: "Who feels these changes first."
    },

    who: {
      exhibit: "sign",
      line: "The communities hit hardest.",
      blocks: [
        { p: "The food, ways of life, and cultural practices of Tribes and Indigenous Peoples depend on forests and animals that are changing. Half of Diné (Navajo) households heat their homes mainly with wood. A parasite called brainworm is shrinking moose herds, which affects some Tribes' hunting for food. Black landowners in the South have a long history of unequal access to help managing their forests." },
        { p: "People who live where homes meet wildland are losing more homes to wildfire. Communities of color often have less access to green space." },
        { cite: [NCA5_FORESTS, NCA5_ECOSYSTEMS] }
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
          "Which plants or animals in my area seem to be changing?",
          "Who near me depends on forests or land for their work or way of life?"
        ] }
      ],
      ahead: "How your way of helping fits this topic."
    }
  },

  /* For the Field Guide's "Think it through." The reader writes how
     their own way of helping fits. */
  situation: "The creek behind the school used to be full of frogs every spring. This year there are hardly any, and nobody knows why.",

  /* Added to the shared questions in the Field Guide's first step. */
  /* "Put your [action] to work": this topic, for each trail. One line
     for each of the trail's three actions, then one first step. */
  work: {
    Red: {
      Focus: "Help your neighbors start with one clear question, like \"When did the frogs start to disappear?\", before trying to fix everything.",
      Build: "Set up a shared notes page where neighbors can write down what they know about the creek, and when.",
      Secure: "Keep those notes safe from year to year, so you can share them with a nature center or the school.",
      first: "Ask a nature center or your state wildlife agency about joining a regular count, like a yearly bird count."
    },
    Orange: {
      Dream: "Imagine the creek full of frogs again. Make a list of what frogs might need, and share it with a teacher or nature center.",
      Invent: "Try a new way to keep track, like a shared online page where neighbors can post what they know about the creek.",
      Invite: "Ask longtime neighbors and families for their ideas about what changed at the creek.",
      first: "Ask a nature center about native plant sales or habitat workdays."
    },
    Yellow: {
      Inspire: "Share a favorite memory of the creek to spark your neighbors' interest.",
      Rally: "Invite a few friends to a habitat workday together, and celebrate what you get done.",
      Encourage: "Cheer on the teachers and students who care for the creek. Tell them their work matters.",
      first: "Ask a nature center or Audubon chapter about the next bird count or habitat workday, and bring a friend."
    },
    Green: {
      Unite: "Bring together a few neighbors who care about the creek, and share what each of you knows about it.",
      Network: "Pass along the name of a nature center or local Audubon chapter to a teacher at the school. They may be able to help find out what's going on.",
      Include: "Invite longtime neighbors to share what the creek was like years ago.",
      first: "Ask a nature center or Audubon chapter about bird counts or habitat workdays."
    },
    Blue: {
      Clarify: "Ask a nature center why frogs matter to a creek, and share what you learn in plain words.",
      Inform: "Share what you learn in your neighborhood group chat or the school newsletter.",
      Influence: "Tell the creek's story in a way that brings people in, like a short post with an old photo.",
      first: "Sign up for news from your state wildlife agency or a local nature center."
    },
    Indigo: {
      Assess: "Sort out what's known about the creek and what's still a mystery, before deciding what to do.",
      Adapt: "If a first idea doesn't work out, try another, like asking a different nature group.",
      Guide: "Help a teacher or neighbor find the right group to contact, like a nature center or your state wildlife agency.",
      first: "Ask a nature center or your state wildlife agency what kind of help would matter most for the creek."
    }
  },

  first: {
    questions: ["Which land projects near me could use my way of helping?"],
    friend: ["Where do trees and open spaces bring our community together?"]
  },

  /* For the Field Guide: where land projects turn up close to home. */
  finder: {
    exhibit: "tip",
    line: "Where land projects turn up near you.",
    blocks: [
      { p: "Opportunities are local, and they change. Tree plantings, bird counts, and habitat workdays are where people who care about land find each other." },
      { tips: [
        { verb: "Check", text: "bulletin boards at the library, park office, nature center, or garden center for tree plantings, bird counts, and habitat workdays." },
        { verb: "Ask", text: "at a park office, nature center, or local Audubon chapter how you can help." },
        { verb: "Sign up for", text: "your parks department's news, a land trust's newsletter, or your state wildlife agency's news." },
        { verb: "Search for", text: "\"tree planting [your town],\" \"land trust [your county],\" or \"bird count [your city].\"" }
      ] },
      { find: {
        prompt: "There's a tool that tells you which native plants help the birds where you live.",
        button: "Find out",
        reveal: "It's Audubon's Native Plants Database. Type in your ZIP code to get a list of native plants that help local birds, plus nearby nurseries and Audubon groups.",
        link: { name: "Audubon Native Plants Database", url: "https://www.audubon.org/native-plants", reach: "United States only" }
      } },
      /* The bird count is open worldwide, not U.S. only: approved as an
         exception. */
      { resources: [
        { verb: "Find", name: "a land trust near you", url: "https://landtrustalliance.org/land-trusts/explore", reach: "United States only", desc: "From the Land Trust Alliance. Browse by state, or narrow the list to land trusts with trails, public access, or volunteer opportunities." },
        { verb: "Volunteer", name: "with the National Park Service", url: "https://nps.gov/volunteer", reach: "United States only", desc: "Its volunteer page links to Volunteer.gov, with openings at national parks and other public lands." },
        { verb: "Join", name: "the Great Backyard Bird Count", url: "https://www.birdcount.org/", reach: "open worldwide", desc: "Each February, people count birds for as little as 15 minutes and share what they find. It's run by the Cornell Lab of Ornithology, the National Audubon Society, and Birds Canada." }
      ] },
      { say: [
        { where: "At a nature center", words: "Do you need volunteers for plantings, cleanups, or bird counts?" },
        { where: "At a garden center", words: "Which native plants help birds and bees here?" },
        { where: "To a neighbor", words: "There's a tree planting at the park on Saturday. Want to come?" }
      ] },
      { more: [ { sub: "Then grow it", items: [
        { verb: "Pass", text: "one idea along to a neighbor.", reach: "Close to home" },
        { verb: "Bring", text: "a friend to a planting day.", reach: "A little further" },
        { verb: "Introduce", text: "a land trust or nature center to your school or block club, or welcome newcomers to your group.", reach: "Further still" }
      ] } ] }
    ]
  }
};
