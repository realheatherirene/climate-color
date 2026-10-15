/* Words shared by every trail and every exhibit: the first trail stop,
   the Lodge, the Field Guide, the Bulletin Board, notes, and saving.
   The page fills in {trail}, {action}, {meaning}, {words}, {exhibit},
   {lower}, and {about}.
   Adult pack: grade 9 reading level or lower. */

const SPARKMAN = { title: "Sparkman, Geiger & Weber, 2022", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9399177/" };

export default {
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
    eyebrow: "Every trail leads here",
    title: "The Lodge",
    sub: "Exhibits on nine community action topics",
    line: "You help by {action}. Now pick a topic you care about.",
    welcome: "Welcome to the Lodge! Inside are exhibits on nine topics, the parts of life that climate change touches. You may care about all of them. Pick one to start, and come back for the others anytime.",
    why: "Why {lower}?",
    notBuilt: "This exhibit is still being built. For now, the Water exhibit is ready.",
    tryReady: "Try the Water exhibit"
  },

  /* The Field Guide: the same for everyone. The page fills in the
     reader's trail and exhibit; the reader writes the rest. */
  guide: {
    eyebrow: "Yours to keep",
    title: "Field Guide",
    sub: "For the trail beyond the park",
    line: "You help by {action}. You care about {lower}.",
    intro: "The park is where you learn. The field is your own community. This guide is the same for everyone: your trail and topic are filled in, and you write the rest.",
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
    ahead: {
      story: "Something to think through.",
      think: "Something to try right where you are.",
      tryIt: "Other ways to help, beside yours.",
      others: "Your first step.",
      first: "The Bulletin Board, where you choose what comes next."
    },
    print: "Print your Field Guide",
    printHelp: "Prints this guide only, with your notes. If the button doesn't work here, use your browser's Print command."
  },

  /* The Bulletin Board: the end of the trail. */
  bulletin: {
    eyebrow: "End of the trail",
    title: "Bulletin Board",
    sub: "What's next, close to home and on the map",
    lede: "Welcome to the Bulletin Board! This is the end of this trail. Here's what's posted: real places to start close to home, and where to go next.",
    recap: "**Where you've been.** You took the {trail} Trail: you help by {action}, {meaning}. In the Lodge, you visited the {exhibit} exhibit: {about}.",
    exhibit: { dir: "Back to the Lodge", label: "Visit another exhibit", hint: "Stay on the {trail} Trail and pick a new topic. Your trail stops stay the same." },
    trail: { dir: "Back to the Trailhead", label: "Try another trail", hint: "Stay with {exhibit} and pick a different way of helping. Your trail stops change to fit it." },
    keep: { dir: "Onward", label: "Take this with you", hint: "A few words to carry home, a link to come back to, and your Field Guide to print." }
  },

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
    opener: "Need a break? Save your spot",
    title: "Save your spot",
    text: "Copy this link and save it anywhere, like a note or an email to yourself. It brings you back to your trail and exhibit. Your notes stay on this device. Open stops and checkmarks start fresh.",
    copy: "Copy link",
    copied: "Copied"
  }
};
