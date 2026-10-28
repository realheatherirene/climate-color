/* The Transportation exhibit. Everything here is written once and shared by every
   trail: the exhibit itself, plus a situation and a finder for the Field
   Guide. Titles come from titles.js, so none appear here.
   Adult pack: grade 9 reading level or lower. */

const NCA5_TRANSPORTATION = { title: "Fifth National Climate Assessment, Ch. 13: Transportation, 2023", url: "https://toolkit.climate.gov/NCA5_Ch13_Transportation", web: "https://nca5.climate.us/chapter/13", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch13_Transportation" };

export default {
  key: "transportation",

  /* One line under the exhibit's sign: what the reader will get here. */
  promise: "In this exhibit, you'll find out how climate change is affecting transportation, who feels it first, and where the effect shows up in your own life.",

  /* The exhibit's parts, in the order set by titles.js. Each has a short
     line under its title, so a closed part still says what's inside. */
  parts: {
    why: {
      exhibit: "sign",
      line: "A quick guess, then why transportation matters.",
      blocks: [
        { find: {
          prompt: "Take a guess: what share of U.S. heat-trapping gas emissions came from transportation in 2021?",
          button: "Reveal the answer",
          reveal: "About 28.5 percent, more than any other part of the economy.",
          src: NCA5_TRANSPORTATION
        } },
        { teaser: true }
      ],
      ahead: "What's changing for transportation, across the country."
    },

    changing: {
      exhibit: "sign",
      line: "Heat, flooding, and health.",
      blocks: [
        { p: "Everyone depends on getting around, to work, school, the store, and the doctor. Climate change puts roads and rails at risk, and how we travel affects the climate." },
        { list: [
          "**Heat and flooding.** Heat can crack and buckle roads and rails. Flooding and storm surge threaten roads too. Around Houston and Galveston, 13 percent of freeway miles are highly vulnerable.",
          "**Rising emissions.** Heat-trapping gases from transportation rose about 19 percent from 1990 to 2021.",
          "**Health.** Traffic pollution is linked to early death, heart disease, breathing problems, and lung cancer, and it isn't spread equally across U.S. cities.",
          "**Hope on the road.** Biking instead of driving improves fitness and health. More transit, more biking, and cleaner vehicles can cut emissions and pollution together."
        ] },
        { cite: [NCA5_TRANSPORTATION] }
      ],
      ahead: "Who feels these changes first."
    },

    who: {
      exhibit: "sign",
      line: "The communities hit hardest.",
      blocks: [
        { p: "Climate impacts on transportation often fall hardest on people who are already vulnerable, including communities without reliable, affordable ways to get around. People living near freight hubs can face more traffic and pollution. Small truck owner-operators may not be able to afford cleaner vehicles." },
        { cite: [NCA5_TRANSPORTATION] }
      ],
      ahead: "A rest stop to think about transportation where you live."
    },

    life: {
      exhibit: "rest",
      line: "Where transportation shows up in your day.",
      blocks: [
        { sub: "Transportation where you live" },
        { questions: [
          "How do I get where I need to go each day?",
          "Have heat, floods, or storms ever closed a road or route I use?",
          "Who in my community has a hard time getting around?"
        ] }
      ],
      ahead: "How your way of helping fits this topic."
    }
  },

  /* For the Field Guide's "Think it through." The reader writes how
     their own way of helping fits. */
  situation: "A flood closes the main road into town for a week. The bus route is cut, and some neighbors can't get to work, school, or the pharmacy.",

  /* Added to the shared questions in the Field Guide's first step. */
  /* "Put your [action] to work": this topic, for each trail. One line
     for each of the trail's three actions, then one first step. */
  work: {
    Red: {
      Focus: "Help neighbors sort out what they need most during the closure, like pharmacy refills or groceries.",
      Build: "Start a shared list where neighbors can post errands and offers, like \"I'm going to the pharmacy Tuesday.\"",
      Secure: "Keep the list going all week, and post the transit agency's updates as they come.",
      first: "Sign up for transit service alerts, and ask your city's transportation office when its next public meeting is."
    },
    Orange: {
      Dream: "Imagine how your neighbors could get around if the road closed again, and jot down every idea, even the wild ones.",
      Invent: "Try a new way to share errands, like a sign-up sheet where neighbors post when they're heading to the store.",
      Invite: "Ask neighbors who don't drive what would help them most, and bring their ideas to your city's next transportation meeting.",
      first: "Search for a bike group or transit riders' group near you, and bring one idea to their next meeting."
    },
    Yellow: {
      Inspire: "Share why safe, reliable ways to get around matter to you and your neighbors.",
      Rally: "Invite a few neighbors to go together to your city's next transportation meeting.",
      Encourage: "Thank the bus drivers, crossing guards, and neighbors who helped people get around during the closure.",
      first: "Find out when your city's next transportation meeting is, and invite a neighbor to come with you."
    },
    Green: {
      Unite: "Start a group text where neighbors can post when they're making a grocery or pharmacy run, in case others need something picked up.",
      Network: "Pass along the transit agency's detour updates, and share which pharmacies near you deliver.",
      Include: "Ask your neighbors, your kids' school, or your workplace who's stuck, and make sure the detour updates reach them.",
      first: "Sign up for transit service alerts, and find out when your city's next transportation meeting is."
    },
    Blue: {
      Clarify: "Explain the detours and the new bus schedule in plain words for neighbors who find them confusing.",
      Inform: "Share the transit agency's updates in your group chats as they come.",
      Influence: "Share how the closure affected your neighbors at your city's next transportation meeting, or in a short email to the city.",
      first: "Sign up for transit service alerts and your city's street project updates."
    },
    Indigo: {
      Assess: "Sort out which trips matter most during the closure: work, school, and the pharmacy.",
      Adapt: "When the bus route changes, help neighbors find the new route or a delivery option.",
      Guide: "Help a neighbor understand the new bus schedule, or set up a pharmacy delivery.",
      first: "Sign up for transit service alerts, and help a neighbor sign up too."
    }
  },

  first: {
    questions: ["Which transportation projects near me could use my way of helping?"],
    friend: ["How do people get around in our community?"]
  },

  /* For the Field Guide: where transportation projects turn up close to home. */
  finder: {
    exhibit: "tip",
    line: "Where transportation projects turn up near you.",
    blocks: [
      { p: "Opportunities are local, and they change. Bike rides, transit meetings, and street safety groups are where people who care about getting around find each other." },
      { tips: [
        { verb: "Check", text: "bulletin boards at the library, bike shop, or transit station for rides and meetings." },
        { verb: "Ask", text: "your transit agency or city transportation office about public meetings." },
        { verb: "Sign up for", text: "transit service alerts and your city's street project updates." },
        { verb: "Search for", text: "\"bike group [your town],\" \"transit riders [your city],\" or \"safe routes to school [your county].\"" }
      ] },
      { find: {
        prompt: "Every May, there's a month to celebrate biking, with events in many towns.",
        button: "Find out",
        reveal: "It's National Bike Month, from the League of American Bicyclists. It includes National Ride a Bike Day and Bike to Work Day, and the League's Bike Month page has a map of events near you.",
        link: { name: "National Bike Month", when: "event", url: "https://bikeleague.org/events/bike-month/", reach: "United States only" }
      } },
      { resources: [
        { verb: "Find", name: "the Alternative Fueling Station Locator", url: "https://afdc.energy.gov/stations", reach: "United States and Canada", desc: "From the U.S. Department of Energy. Search by location, or along a driving route, for public electric vehicle charging and other cleaner fuels." },
        { verb: "Find", name: "bike groups near you", url: "https://bikeleague.org/map/", reach: "United States only", desc: "From the League of American Bicyclists. Search by ZIP code, city, or state for bike clubs, advocacy groups, classes, and shops. It lists only groups that belong to the League, so search for others near you too." }
      ] },
      { say: [
        { where: "At the library desk", words: "Are there groups here working on buses, bikes, or safer streets?" },
        { where: "At a transit meeting", words: "How can riders share ideas for better service?" },
        { where: "To a neighbor", words: "There's a community bike ride coming up. Want to come?" }
      ] },
      { more: [ { sub: "Then grow it", items: [
        { verb: "Pass", text: "one idea along to a neighbor.", reach: "Close to home" },
        { verb: "Bring", text: "a friend to a transit meeting.", reach: "A little further" },
        { verb: "Introduce", text: "a bike group to your school or block club, or welcome newcomers to your group.", reach: "Further still" }
      ] } ] }
    ]
  }
};
