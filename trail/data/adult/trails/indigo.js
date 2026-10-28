/* The Indigo Trail: Navigating.
   Color names, archetypes, and action words come from core/climate-color.js;
   this file holds only the words that are written for this trail: its stops,
   plus its story and its "Try it now" for the Field Guide.
   Adult pack: grade 9 reading level or lower. */

const HESS = { title: "Hess and others, 2018, via Emory University", url: "https://open.library.emory.edu/concern/publications/82bff187-33e6-4db0-aa67-0d2af8bf6d6f", archive: "https://web.archive.org/web/2026/https://open.library.emory.edu/concern/publications/82bff187-33e6-4db0-aa67-0d2af8bf6d6f" };
const SEVENDAYS = { title: "Lauren Ober, Seven Days, September 9, 2011", url: "https://www.sevendaysvt.com/news/btv-lawyer-helps-flood-victims-and-proves-not-all-lawyers-are-jerks-2177020/", archive: "https://web.archive.org/web/2026/https://www.sevendaysvt.com/news/btv-lawyer-helps-flood-victims-and-proves-not-all-lawyers-are-jerks-2177020/" };

export default {
  key: "Indigo",

  know: {
    exhibit: "sign",
    blocks: [
      { p: "Navigating is a way of helping. It means sorting out what matters most, adjusting when things change, and helping people find their way. Anyone can take this trail." },
      { sub: "Three typical actions" },
      { p: "Acts of navigating show up in many different ways, but these three are quite common." },
      { actions: [
        { word: "Assess", phrase: "Sorting out what matters most right now", example: "Making a short list of what has to happen first. Asking, \"What's most urgent, and what can wait?\"" },
        { word: "Adapt", phrase: "Choosing the next step, and adjusting when things change", example: "Moving the event indoors when a storm rolls in. Trying plan B when plan A stalls." },
        { word: "Guide", phrase: "Helping people find their way", example: "Showing a newcomer how things work. Helping a neighbor fill out a confusing form." }
      ] },
      { sub: "Benefits of being a Navigator" },
      { p: "Direction. People know what to do next, even when things are confusing or changing fast." },
      { sub: "Challenges of being a Navigator" },
      { p: "Making the call can feel heavy, and plans don't always go as hoped. You don't have to know every answer or have the whole route mapped out. Navigating works best when people find the way together." }
    ],
    ahead: "Why your care matters, and why you're in good company."
  },

  fit: {
    exhibit: "rest",
    blocks: [
      { sub: "Does Navigating fit you?" },
      { questions: [
        "When have I helped sort out what mattered most?",
        "When have I changed plans when things didn't go as expected?",
        "When have I helped someone find their way through something confusing?",
        "What helps me rest when making decisions wears me out?"
      ] },
      { p: "**If Navigating fits you, keep going.** If it doesn't, pick another way of helping:" },
      { trails: true },
      { p: "Or finish this trail first. You can switch trails back at the Visitor Center, at the end." }
    ],
    ahead: "What Navigators bring to a whole community, beyond the people you know."
  },

  community: {
    exhibit: "sign",
    blocks: [
      { p: "Navigating isn't only about the people you already know. In a community, Navigators help everyone know what to do, especially when danger is coming." },
      { sub: "A plan for hot days saves lives" },
      { p: "After a heat wave in 2010, the city of Ahmedabad, India, made South Asia's first heat action plan, with warnings on dangerously hot days. Researchers compared deaths before the plan (2007 to 2010) with deaths after it (2014 and 2015). They estimated that the plan helped avoid about 1,190 deaths a year." },
      { cite: [HESS] },
      { sub: "Where Navigating fits" },
      { p: "Assess sorts out the biggest risks. Adapt changes plans as conditions change. Guide helps people know what to do. This match is ours, not the researchers', but it shows how everyday Navigating adds up." },
      { sub: "Where Navigators show up" },
      { p: "Emergency planning teams and warning systems. Help desks and hotlines. Mentors and peer guides. People who help others through forms and systems. Anywhere people need to find their way." }
    ],
    ahead: "Stop 5, the Climate Pavilion, where you pick an exhibit on a topic you care about."
  },

  /* For the Field Guide: a true story of someone on this trail. Every
     fact here is on the one linked page. */
  story: {
    exhibit: "sign",
    blocks: [
      { p: "When Tropical Storm Irene flooded Vermont in 2011, many people couldn't sign up for help from FEMA online. Geoff Hand, a lawyer in Burlington, set up a free mobile help station. He used four laptops from his office, a printer, a wireless card, and a table and chairs, all run from his old Subaru station wagon." },
      { p: "Over Labor Day weekend, he worked in Waterbury, Duxbury, and Moretown, and helped more than 30 families file their FEMA paperwork. Many people were too exhausted to type, so he filled in the forms for them. A colleague, Rebecca Boucher, went door to door to let people know he was there, and FEMA officials sent homeowners his way." },
      { quote: { text: "All these folks are still processing the grief of all that was lost.", who: "Geoff Hand", src: SEVENDAYS } },
      { p: "That's Navigating at work: sorting out what people need most, adjusting to what's possible, and guiding them through it." },
      { cite: [SEVENDAYS] }
    ]
  },

  /* For the Field Guide: a short activity for this trail, for any topic. */
  tryIt: {
    exhibit: "sign",
    blocks: [
      { stretch: {
        title: "Your next step",
        steps: [
          "Think of something on your mind that feels big or confusing.",
          "What matters most about it right now?",
          "What is one small next step you could take this week?"
        ],
        note: "Do this in your head or on paper."
      } }
    ]
  },

  /* Words to carry home from the Visitor Center. {topic} becomes the
     exhibit's name. */
  farewell: [
    "You're not alone in your desire to help care for the people and places you love. As a Navigator, you don't need to know the whole route by yourself.",
    "When we do this together and do it close to home, rest becomes part of the journey."
  ]
};
