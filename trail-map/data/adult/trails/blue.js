/* The Blue Trail: Communicating.
   Color names, archetypes, and action words come from core/climate-color.js;
   this file holds only the words that are written for this trail: its stops,
   plus its story and its "Try it now" for the Field Guide.
   Adult pack: grade 9 reading level or lower. */

const YALE = { title: "Goldberg, van der Linden, Maibach & Leiserowitz, 2019, via the Yale Program on Climate Change Communication", url: "https://climatecommunication.yale.edu/publications/discussing-global-warming-leads-to-greater-acceptance-of-climate-science/", archive: "https://web.archive.org/web/2026/https://climatecommunication.yale.edu/publications/discussing-global-warming-leads-to-greater-acceptance-of-climate-science/" };
const CNN = { title: "CNN, March 8, 2019", url: "https://edition.cnn.com/2019/03/08/us/climate-change-tv-weathercaster", archive: "https://web.archive.org/web/2026/https://edition.cnn.com/2019/03/08/us/climate-change-tv-weathercaster" };

export default {
  key: "Blue",

  know: {
    exhibit: "sign",
    blocks: [
      { p: "Communicating is a way of helping. It means finding the words, keeping everyone informed, and shaping how people talk about it. Anyone can take this trail." },
      { sub: "Three actions" },
      { p: "Communicating shows up in three actions. You may already do all three without calling them by name." },
      { actions: [
        { word: "Clarify", phrase: "Finding the words for why something matters", example: "Explaining a hard idea so your neighbor gets it. Saying the one sentence that makes it click." },
        { word: "Inform", phrase: "Making sure everyone knows what's going on", example: "Sharing the meeting time in the group chat. Posting the flyer. Filling in the person who missed it." },
        { word: "Influence", phrase: "Shaping how people think and talk about it", example: "Telling a story that changes someone's mind. Choosing words that bring people in instead of pushing them away." }
      ] },
      { sub: "What it gives a group" },
      { p: "People know what's happening and why it matters. Rumors lose their grip, and more people feel they belong in the conversation." },
      { sub: "What it can cost" },
      { p: "Being the voice can wear you out, and words don't always land. You don't have to have every answer or win every conversation. Communicating works best when it goes both ways." }
    ],
    ahead: "A rest stop to check whether Communicating fits you."
  },

  fit: {
    exhibit: "rest",
    blocks: [
      { sub: "Does Communicating fit you?" },
      { questions: [
        "When have I explained something so it finally made sense to someone?",
        "When have I made sure people knew what was going on?",
        "When have my words changed how someone thought about something?",
        "What helps me rest when talking feels like too much?"
      ] },
      { p: "**If Communicating fits you, keep going.** If it doesn't, try another way of helping now:" },
      { trails: true },
      { p: "Or finish this trail first. You can switch trails at the Bulletin Board, at the end." }
    ],
    ahead: "What Communicators bring to a whole community, beyond the people you know."
  },

  community: {
    exhibit: "sign",
    blocks: [
      { p: "Communicating isn't only about the people you already know. In a community, Communicators help everyone understand what's happening, and why it matters." },
      { sub: "Talking starts a cycle" },
      { p: "Researchers surveyed the same group of American adults twice, about seven months apart. People who talked about climate change with friends and family came to understand how much scientists agree about it. That made them more sure it's happening and more worried about it, and that led to more conversations." },
      { cite: [YALE] },
      { sub: "Where Communicating fits" },
      { p: "Clarify gives people words for why it matters. Inform makes sure everyone knows what's going on. Influence shapes how people think and talk about it. This match is ours, not the researchers', but it shows how everyday Communicating adds up." },
      { sub: "Where Communicators show up" },
      { p: "Newsletters and group chats. Community radio and local news. School and faith bulletins. Translating at a meeting. Anywhere people need to understand each other." }
    ],
    ahead: "The Lodge, where you pick an exhibit on a topic you care about."
  },

  /* For the Field Guide: a true story of someone on this trail. Every
     fact here is on the one linked page. */
  story: {
    exhibit: "sign",
    blocks: [
      { p: "Jim Gandy is a local TV meteorologist in South Carolina. He launched the pilot of Climate Matters, an initiative started in 2010 by the group Climate Central to help weathercasters explain climate change. He stays away from politics and sticks to the science, and he connects it to what viewers already know, like summer nights that don't cool off the way they used to." },
      { quote: { text: "In heat waves of the past, it may have been blazing hot in the daytime; at least you got a little bit of relief at night.", who: "Jim Gandy", src: CNN } },
      { p: "Ed Maibach, director of George Mason University's Center for Climate Change Communication, surveyed viewers of Gandy's station and of competing stations." },
      { quote: { text: "We found that the more viewers watched Jim's station, the more likely their views on climate change evolved.", who: "Ed Maibach", src: CNN } },
      { p: "That's Communicating at work: finding the words, and putting a big idea where people already live." },
      { cite: [CNN] }
    ]
  },

  /* For the Field Guide: a short activity for this trail, for any topic. */
  tryIt: {
    exhibit: "sign",
    blocks: [
      { stretch: {
        title: "Your one sentence",
        steps: [
          "Think of something you care about that people near you don't talk about much.",
          "Write one sentence about why it matters, in words a neighbor would use.",
          "Who is one person you could say it to this week?"
        ],
        note: "Do this in your head or on paper. No phone, internet, or moving around needed."
      } }
    ]
  },

  /* Words to carry home from the Bulletin Board. {topic} becomes the
     exhibit's name. */
  farewell: [
    "You don't need the perfect words or every answer. Conversations grow when many people keep them going, and rest is part of the trail. You simply help people understand.",
    "“We can start close to home. We can talk about our {topic} together.”"
  ]
};
