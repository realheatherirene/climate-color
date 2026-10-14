/* Stops and lines shared by every trail and every lodge.
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
    ahead: "Get to know your way of helping, and the three actions that go with it."
  },

  /* Questions every lodge's last rest stop starts with. The lodge adds
     its own. */
  first: {
    title: "Your first step",
    questions: [
      "Which idea on this trail could I try first?",
      "When and where would I start?",
      "Who could come with me?"
    ],
    friend: [
      "What here fits you?",
      "Which first step could we take together?",
      "Which trail or lodge next?"
    ],
    ahead: "The Ranger Station, where you choose what comes next."
  },

  /* The lodge welcome board, shared by every lodge. {lodge} is the name,
     {lower} the name in a sentence, {action} the way of helping, {lodgeStop} the lodge picker's number. */
  lodgeBoard: {
    welcome: "Welcome to the {lodge} Lodge! This is where you go deep on one topic. Every exhibit here is about {lower}, and how your way of helping fits in.",
    why: "Why {lower}?",
    inside: "Exhibits inside",
    insideHint: "Open each one right here, in order or in any order you like.",
    stops: {
      changing: "The changes coming to {lower}, and who is hit hardest.",
      role: "{action} at work for {lower}, with something to try right now.",
      local: "A rest stop to think about your own community.",
      nearby: "Ways to find {lower} work near you, and what to say when you ask.",
      first: "Pick one thing to try, on your own or with a friend."
    },
    leave: "Want a different topic? Head back to stop {lodgeStop} anytime. When you're done here, follow the trail to the Ranger Station.",
    go: "Head to the lodge"
  },

  junction: {
    title: "Ranger Station",
    eyebrow: "End of the trail",
    sub: "Get your bearings, and choose where to go next.",
    lede: "Welcome to the Ranger Station! This is the end of this trail. Every way from here is open.",
    /* {trail}, {action}, {meaning}, {lodge}, {about} are filled in by the page. */
    recap: [
      "**Where you've been.** You took the {trail} Trail: you help by {action}, {meaning}. Then you visited the {lodge} Lodge: {about}.",
      "**How the map works.** Your trail is your way of helping, and a lodge is a topic you care about. You can change either one, anytime, and the other stays put."
    ],
    lodge: { dir: "Back to stop {lodgeStop}", label: "Visit another lodge", hint: "Stay on the {trail} Trail and go back to stop {lodgeStop}. Pick a new topic, and your trail stops stay the same." },
    trail: { dir: "Back to stop 1", label: "Try another trail", hint: "Stay with {lodge} and go back to stop 1. Pick a different way of helping, and your trail stops change to fit it." },
    keep: { dir: "Onward", label: "Take this with you", hint: "A few words to carry home, a link to come back to, and a way to print this page." }
  },

  /* Coming back later. Only the trail and lodge are kept, and only in the
     link itself: nothing is saved online. */
  /* Writing at rest stops. Notes are kept with the browser's own storage,
     on this device only, and never sent anywhere. */
  notes: {
    label: "Your notes",
    placeholder: "Write your thoughts here, if you'd like.",
    help: "Your notes stay on this device, in this browser. They're never sent anywhere, and nobody else can read them online. Anyone who uses this device and browser could open them, so clear them when you're done if you share it.",
    clear: "Clear my notes",
    cleared: "Cleared",
    off: "This browser can't keep notes. Print or copy them before you leave."
  },

  save: {
    title: "Need a break?",
    text: "Copy this link and save it anywhere, like a note or an email to yourself. It brings you back to your trail and lodge. Your rest stop notes stay on this device. Open stops and checkmarks start fresh.",
    copy: "Copy link",
    copied: "Copied",
    print: "Print this page",
    printHelp: "If the button doesn't work here, use your browser's Print command."
  }
};
