/* The Wildlife exhibit. Everything here is written once and shared by every
   trail: the exhibit itself, plus a situation and a finder for the Field
   Guide. Titles come from titles.js, so none appear here.
   Adult pack: grade 9 reading level or lower. */

const NCA5_WILDLIFE = { title: "Fifth National Climate Assessment, Ch. 8: Ecosystems, Ecosystem Services, and Biodiversity, 2023", url: "https://toolkit.climate.gov/NCA5_Ch8_Ecosystems", web: "https://nca5.climate.us/chapter/8", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch8_Ecosystems" };

export default {
  key: "wildlife",

  /* One line under the exhibit's sign: what the reader will get here. */
  promise: "In this exhibit, you'll find out how climate change is affecting wildlife, who feels it first, and where the effect shows up in your own life.",

  /* The exhibit's parts, in the order set by titles.js. Each has a short
     line under its title, so a closed part still says what's inside. */
  parts: {
    why: {
      exhibit: "sign",
      line: "A quick guess, then why wildlife matters.",
      blocks: [
        { find: {
          prompt: "Take a guess: many U.S. crops need pollinators, like bees, to grow. About what share of those crops have too few pollinators?",
          button: "Reveal the answer",
          reveal: "Nearly 40 percent.",
          src: NCA5_WILDLIFE
        } },
        { teaser: true }
      ],
      ahead: "What's changing for wildlife, across the country."
    },

    changing: {
      exhibit: "sign",
      line: "Moving species, disease, and coral reefs.",
      blocks: [
        { p: "Plants and animals depend on each other, and we depend on them for food, clean water, and more. Climate change, along with other pressures, is changing where they can live." },
        { list: [
          "**Moving species.** Plants and animals are shifting where they live. Ocean species are moving more, and faster, than species on land.",
          "**Disease.** In one review of diseases that spread between animals and people, climate change made 58 percent of them worse.",
          "**Coral reefs.** U.S. coral reefs help protect coasts, a benefit worth more than $1.8 billion a year. Warming, more acidic oceans, and ocean heat waves threaten them.",
          "**Hope in nature.** Restoring coastal wetlands stores carbon and reduces flooding and erosion, often at low cost. Protected ocean areas can help sea life recover after heat waves."
        ] },
        { cite: [NCA5_WILDLIFE] }
      ],
      ahead: "Who feels these changes first."
    },

    who: {
      exhibit: "sign",
      line: "The communities hit hardest.",
      blocks: [
        { p: "Many Tribal and Indigenous communities depend on species that are changing. Chinook salmon, important to Pacific Northwest Tribes, are expected to decline sharply. A parasite called brainworm is shrinking moose herds, which affects some Tribes' hunting for food." },
        { p: "People who fish or work in tourism are losing income as coral disease spreads. Communities of color often have less access to green space." },
        { cite: [NCA5_WILDLIFE] }
      ],
      ahead: "A rest stop to think about wildlife where you live."
    },

    life: {
      exhibit: "rest",
      line: "Where wildlife shows up in your day.",
      blocks: [
        { sub: "Wildlife where you live" },
        { questions: [
          "What plants and animals share my neighborhood?",
          "Which plants or animals in my area seem to be changing?",
          "Who in my community fishes, hunts, or works outdoors?"
        ] }
      ],
      ahead: "The Bulletin Board, where you choose what comes next."
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
    questions: ["Which wildlife work near me could use my way of helping?"],
    friend: ["Where do plants and animals bring our community together?"]
  },

  /* For the Field Guide: where wildlife work turns up close to home. */
  finder: {
    exhibit: "tip",
    line: "Where wildlife work turns up near you.",
    blocks: [
      { p: "Opportunities are local, and they change. Nature centers, bird counts, and habitat workdays are where people who care about wildlife find each other." },
      { tips: [
        { verb: "Check", text: "bulletin boards at the library, nature center, or garden center for bird counts and habitat workdays." },
        { verb: "Ask", text: "at a nature center, state park, or local Audubon chapter how you can help." },
        { verb: "Sign up for", text: "news from your state wildlife agency or a local nature center." },
        { verb: "Search for", text: "\"habitat restoration [your county],\" \"native plant sale [your town],\" or \"bird count [your city].\"" }
      ] },
      { find: {
        prompt: "There's a tool that tells you which native plants help the birds where you live.",
        button: "Find out",
        reveal: "It's Audubon's Native Plants Database. Type in your ZIP code to get a list of native plants that help local birds, plus nearby nurseries and Audubon groups.",
        link: { name: "Audubon Native Plants Database", url: "https://www.audubon.org/native-plants", reach: "United States only" }
      } },
      /* Open worldwide, not U.S. only: approved as an exception. */
      { resources: [
        { verb: "Join", name: "the Great Backyard Bird Count", url: "https://www.birdcount.org/", reach: "open worldwide", desc: "Each February, people count birds for as little as 15 minutes and share what they find. It's run by the Cornell Lab of Ornithology, the National Audubon Society, and Birds Canada." }
      ], label: false },
      { say: [
        { where: "At a nature center", words: "Do you need volunteers for habitat workdays or bird counts?" },
        { where: "At a garden center", words: "Which native plants help birds and bees here?" },
        { where: "To a neighbor", words: "I'm counting birds this weekend for a science project. Want to join me?" }
      ] },
      { more: [ { sub: "Then grow it", items: [
        { verb: "Pass", text: "one idea along to a neighbor.", reach: "Close to home" },
        { verb: "Bring", text: "a friend to a habitat workday.", reach: "A little further" },
        { verb: "Introduce", text: "a nature center to your school or block club, or welcome newcomers to your group.", reach: "Further still" }
      ] } ], label: false }
    ]
  }
};
