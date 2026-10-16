/* The Yellow Trail: Motivating.
   Color names, archetypes, and action words come from core/climate-color.js;
   this file holds only the words that are written for this trail: its stops,
   plus its story and its "Try it now" for the Field Guide.
   Adult pack: grade 9 reading level or lower. */

const YALE_SOLAR = { title: "Yale School of the Environment, October 24, 2018", url: "https://environment.yale.edu/news/article/want-to-nudge-others-to-install-solar-actions-speak-louder-than-words", archive: "https://web.archive.org/web/2026/https://environment.yale.edu/news/article/want-to-nudge-others-to-install-solar-actions-speak-louder-than-words" };
const ROUTE50 = { title: "Daniel C. Vock, Route Fifty, September 29, 2022", url: "https://www.route-fifty.com/infrastructure/2022/09/how-schools-bike-buses-won-over-students-and-charmed-internet/377863/", archive: "https://web.archive.org/web/2026/https://www.route-fifty.com/infrastructure/2022/09/how-schools-bike-buses-won-over-students-and-charmed-internet/377863/" };

export default {
  key: "Yellow",

  know: {
    exhibit: "sign",
    blocks: [
      { p: "Motivating is a way of helping. It means getting people excited, keeping things moving, and cheering others on. Anyone can take this trail." },
      { sub: "Three actions" },
      { p: "Motivating shows up in three actions. You may already do all three without calling them by name." },
      { actions: [
        { word: "Inspire", phrase: "Getting people excited about why it matters now", example: "Sharing what you did and why you're glad you did it. Saying, \"We can do this, and here's how.\"" },
        { word: "Rally", phrase: "Keeping things moving", example: "Sending the reminder the day before. Setting a goal the group can reach, and celebrating when you get there." },
        { word: "Encourage", phrase: "Cheering others on", example: "Thanking someone by name. Telling a tired volunteer, \"You made a difference today.\"" }
      ] },
      { sub: "What it gives a group" },
      { p: "Energy and momentum. People feel hopeful, keep showing up, and want to bring others along." },
      { sub: "What it can cost" },
      { p: "Keeping everyone's spirits up can wear you out, and not everyone will share your excitement. You don't have to be upbeat all the time or carry the group's energy alone. Motivating works best when everyone cheers each other on." }
    ],
    ahead: "A rest stop to check whether Motivating fits you."
  },

  fit: {
    exhibit: "rest",
    blocks: [
      { sub: "Does Motivating fit you?" },
      { questions: [
        "When have I gotten someone excited to join in?",
        "When have I kept a project going when it started to slow down?",
        "When have I cheered someone on?",
        "What helps me rest when my own energy runs low?"
      ] },
      { p: "**If Motivating fits you, keep going.** If it doesn't, try another way of helping now:" },
      { trails: true },
      { p: "Or finish this trail first. You can switch trails at the Bulletin Board, at the end." }
    ],
    ahead: "What Motivators bring to a whole community, beyond the people you know."
  },

  community: {
    exhibit: "sign",
    blocks: [
      { p: "Motivating isn't only about the people you already know. In a community, Motivators get people moving, and their example can spread." },
      { sub: "Doing it yourself inspires others" },
      { p: "In 58 Connecticut towns, volunteer ambassadors helped neighbors put solar panels on their homes. Ambassadors who had installed solar panels on their own homes recruited 62.8 percent more residents to go solar than ambassadors who hadn't. That held whether they went solar to help the environment or to save money." },
      { cite: [YALE_SOLAR] },
      { sub: "Where Motivating fits" },
      { p: "Inspire shows people why it matters now, often by example. Rally keeps the effort moving. Encourage keeps people going once they start. This match is ours, not the researchers', but it shows how everyday Motivating adds up." },
      { sub: "Where Motivators show up" },
      { p: "Kickoff events and celebrations. Rides, races, and cleanup days. Team captains and volunteer coordinators. Posts that cheer people on. Anywhere a group needs energy." }
    ],
    ahead: "The Lodge, where you pick an exhibit on a topic you care about."
  },

  /* For the Field Guide: a true story of someone on this trail. Every
     fact here is on the one linked page. The quote is his own words. */
  story: {
    exhibit: "sign",
    blocks: [
      { p: "Sam Balto is a physical education teacher at Alameda Elementary School in Portland, Oregon. In April 2022, for Earth Day, he led the school's first \"bike bus\": a group of kids riding to school together, with adults along to keep them safe. Every Wednesday morning, he plays upbeat music and cheers the riders on, and more kids join along the route." },
      { p: "About 75 kids rode each week that spring. By that fall, about 170 did. His videos drew thousands of supporters across the country. He says the rides help kids' health, build community, and help the environment." },
      { quote: { text: "Once people see it, they see the joy of the children, and it snaps something in us.", who: "Sam Balto", src: ROUTE50 } },
      { p: "That's Motivating at work: making it joyful, keeping it moving, and cheering everyone on." },
      { cite: [ROUTE50] }
    ]
  },

  /* For the Field Guide: a short activity for this trail, for any topic. */
  tryIt: {
    exhibit: "sign",
    blocks: [
      { stretch: {
        title: "Your one cheer",
        steps: [
          "Think of someone who is working hard on something that matters to them.",
          "What is one thing they've done well?",
          "How could you tell them, in one or two sentences?"
        ],
        note: "Do this in your head or on paper. No phone, internet, or moving around needed."
      } }
    ]
  },

  /* Words to carry home from the Bulletin Board. {topic} becomes the
     exhibit's name. */
  farewell: [
    "You don't need to carry everyone's energy alone. Momentum grows when many people cheer each other on, and rest is part of the trail. You simply help people keep going.",
    "“We can start close to home. We can rally for our {topic} together.”"
  ]
};
