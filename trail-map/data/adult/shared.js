/* Words shared by every trail and every exhibit: the places on the map,
   the first trail stop, the Lodge, the Field Guide, the Bulletin Board,
   notes, and saving. The page fills in {trail}, {action}, {meaning},
   {words}, {exhibit}, {exhibitName}, {lower}, and {about}.
   Adult pack: grade 9 reading level or lower. */

const SPARKMAN = { title: "Sparkman, Geiger & Weber, 2022", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9399177/", archive: "https://web.archive.org/web/2026/https://pmc.ncbi.nlm.nih.gov/articles/PMC9399177/" };

export default {
  /* The places on the map, in order: the one source for their names,
     icons, and signs. The route strip at the top of the page, each
     place's sign, and the Bulletin Board all read from here. */
  places: {
    trailhead: { name: "Trailhead", icon: "i-sign", route: "Pick your trail.",
      eyebrow: "Begin here", title: "Trailhead" },
    trail: { name: "Trail", icon: "i-trail", route: "Four stops about your way of helping." },
    lodge: { name: "Lodge", icon: "i-lodge", route: "Pick an exhibit on a topic you care about.",
      eyebrow: "You made it!", title: "The Lodge", sub: "Exhibits on nine community action topics" },
    guide: { name: "Field Guide", icon: "i-guide", route: "Yours to keep.",
      eyebrow: "Yours to keep", title: "Field Guide" },
    bulletin: { name: "Bulletin Board", icon: "i-board", route: "Choose what's next.",
      eyebrow: "End of the trail", title: "Bulletin Board", sub: "Where to go from here" }
  },

  care: {
    exhibit: "sign",
    blocks: [
      { p: "If caring about the climate has ever felt lonely, that makes sense. Big problems can feel that way. And you have more company than you might think." },
      { find: {
        prompt: "Make a guess first: out of every 10 Americans, how many support major climate policies?",
        button: "Reveal the answer",
        reveal: "Between 6 and 8 out of 10 (66 to 80 percent). Yet most people guess only about 4. In one study, 8 or 9 out of every 10 Americans guessed too low.",
        src: SPARKMAN
      } },
      { sub: "You're in the right place" },
      { p: "Climate action isn't only for scientists, activists, or experts. It's also neighbors checking on each other, groups sharing what they know, and people making their towns safer and healthier. If you care about people, you already have a place here." },
      { sub: "Your care already counts" },
      { p: "Community care is climate care. Climate care is community care. The ways you already show up for others are the ways you can show up for the climate." }
    ],
    ahead: "Meet your way of helping, and the three actions that go with it."
  },

  /* The Lodge: one for every trail, with an exhibit for each topic. */
  lodge: {
    welcome: "You made it to the end of the {trail} Trail. Welcome to the Lodge! Each exhibit here shows how climate change touches one part of life, and what that means close to home. When you leave, you'll take a Field Guide made for your trail and your topic.",
    pickHint: "Each exhibit name suggests one community action topic—the personal, social, and environmental domains affected by climate change. You may care about all of them. Start with one, and come back for the others anytime.",
    /* How every topic is named, everywhere: "Water Exhibit." */
    exhibitName: "{exhibit} Exhibit",
    /* {ready}, {verb}, and {name} are filled in from the exhibits that are
       built. */
    notBuilt: "This exhibit is still being built. For now, {ready} {verb} ready.",
    tryReady: "Try the {name}"
  },

  /* The Field Guide: the same for everyone. The page fills in the
     reader's trail and exhibit; the reader writes the rest. */
  guide: {
    cover: "Take what you learned home: open each part, jot your notes, then print it.",
    think: {
      lead: "Imagine this:",
      questions: [
        "How could {action} help here?",
        "Which of your three actions fits best: {words}?",
        "Where does {action} already touch {lower} in your life?"
      ]
    },
    others: {
      lead: "Every way of helping has a part to play with {lower}. Here are all six. Yours is marked.",
      ask: "Which other ways would you want beside you?"
    },
    first: {
      questions: [
        "Which idea in this guide could I try first?",
        "When and where would I start?",
        "Who could come with me?"
      ],
      friend: [
        "What here fits you?",
        "Which first step could we take together?",
        "Which trail or exhibit next?"
      ]
    },
    yours: "Your trail",
    /* A short line under each part's title, so a closed part still says
       what's inside. */
    lines: {
      story: "A true story from your trail.",
      think: "A situation, and how you'd help.",
      tryIt: "Something small to do right now.",
      others: "All six ways of helping, side by side.",
      first: "Pick one thing to try."
      /* "Find work close to home" brings its own line from the exhibit. */
    },
    ahead: {
      story: "Something to think through.",
      think: "Something to try right where you are.",
      tryIt: "Other ways to help, beside yours.",
      others: "Where to find work close to home.",
      nearby: "Your first step.",
      first: "The Bulletin Board, where you choose what comes next."
    },
    print: "Print your Field Guide",
    printHelp: "Prints this guide only, with your notes. If the button doesn't work here, use your browser's Print command."
  },

  /* The Bulletin Board: the end of the trail. */
  bulletin: {
    lede: "Welcome to the Bulletin Board! This is the end of this trail. Here's what's posted: where you've been, and where to go next.",
    recapTitle: "Where you've been",
    recap: "You took the {trail} Trail: you help by {action}, {meaning}. In the Lodge, you visited the {exhibitName}: {about}.",
    exhibit: { dir: "Back to the Lodge", label: "Visit another exhibit", hint: "Stay on the {trail} Trail and pick a new topic. Your trail stops stay the same." },
    trail: { dir: "Back to the Trailhead", label: "Try another trail", hint: "Stay with the {exhibitName} and pick a different way of helping. Your trail stops change to fit it." },
    keep: { dir: "Onward", label: "Take this with you", hint: "A few words to carry home, a link to come back to, and your Field Guide to print." }
  },

  /* Beside each source: its saved copy on the Wayback Machine, in case
     the source goes offline. */
  sources: { archived: "archived copy" },

  /* Notes at rest stops and in the Field Guide. Kept with the browser's
     own storage, on this device only, and never sent anywhere. */
  notes: {
    label: "Your notes",
    placeholder: "Write your thoughts here, if you'd like.",
    help: "Your notes stay on this device, in this browser. They're never sent anywhere, and nobody else can read them online. Anyone who uses this device and browser could open them, so clear them when you're done if you share it.",
    clear: "Clear my notes",
    cleared: "Cleared",
    off: "This browser can't keep notes. Print or copy them before you leave."
  },

  /* Coming back later. Only the trail and exhibit are kept, and only in
     the link itself: nothing is saved online. */
  save: {
    pace: "Need a break? Save your spot, and come back anytime.",
    paceButton: "Copy a link to your spot",
    title: "Save your spot",
    text: "Copy this link and save it anywhere, like a note or an email to yourself. It brings you back to your trail and exhibit. Your notes stay on this device. Open stops and checkmarks start fresh.",
    copy: "Copy link",
    copied: "Copied"
  }
};
