/* The Red Trail: Anchoring.
   Color names, archetypes, and action words come from core/climate-trailway.js;
   this file holds only the words that are written for this trail: its stops,
   plus its story and its "Try it now" for the Field Guide.
   Adult pack: grade 9 reading level or lower. */

const NOBEL = { title: "The Nobel Prize, press release, October 12, 2009", url: "https://www.nobelprize.org/prizes/economic-sciences/2009/press-release/", archive: "https://web.archive.org/web/2026/https://www.nobelprize.org/prizes/economic-sciences/2009/press-release/" };
const LCN = { title: "The Lincoln County News, October 31, 2012", url: "https://lcnme.com/currentnews/national-weather-service-recognizes-newcastle-volunteer/", archive: "https://web.archive.org/web/2026/https://lcnme.com/currentnews/national-weather-service-recognizes-newcastle-volunteer/" };

export default {
  key: "Red",

  know: {
    exhibit: "sign",
    blocks: [
      { p: "Anchoring is a way of helping. It means keeping a clear purpose, making a solid plan, and being someone others can count on. Anyone can take this trail." },
      { sub: "Three typical actions" },
      { p: "Acts of anchoring show up in many different ways, but these three are quite common." },
      { actions: [
        { word: "Focus", phrase: "Keeping everyone clear on what the group is for", example: "Bringing a meeting back to its goal when it drifts. Saying, \"Let's do one thing well.\"" },
        { word: "Build", phrase: "Setting up the roles, plans, and habits a group runs on", example: "Making the sign-up sheet. Writing down who does what, and by when." },
        { word: "Secure", phrase: "Being steady, so others can count on you", example: "Showing up when you said you would. Keeping the keys, the list, or the records safe." }
      ] },
      { sub: "Benefits of being an Anchor" },
      { p: "People know what the group is for and who's doing what. Work gets done, promises get kept, and the group lasts." },
      { sub: "Challenges of being an Anchor" },
      { p: "Being the steady one can wear you out, and plans can feel too strict to others. You don't have to carry every task or keep every promise alone. Anchoring works best when the load is shared." }
    ],
    ahead: "Why your care matters, and why you're in good company."
  },

  fit: {
    exhibit: "rest",
    blocks: [
      { sub: "Does Anchoring fit you?" },
      { questions: [
        "When have I kept a group focused on what it set out to do?",
        "When have I made a plan or set up a system that others used?",
        "When have people counted on me to show up?",
        "What helps me rest when being the steady one wears me out?"
      ] },
      { p: "**If Anchoring fits you, keep going.** If it doesn't, pick another way of helping:" },
      { trails: true },
      { p: "Or finish this trail first. You can switch trails back at the Visitor Center, at the end." }
    ],
    ahead: "What Anchors bring to a whole community, beyond the people you know."
  },

  community: {
    exhibit: "sign",
    blocks: [
      { p: "Anchoring isn't only about the people you already know. In a community, Anchors set up the rules and habits that help people care for what they share." },
      { sub: "Communities can care for what they share" },
      { p: "Elinor Ostrom won the 2009 Nobel Prize in economics. Many experts believed that shared resources, like fishing grounds, pastures, forests, lakes, and groundwater, would be used up unless the government took charge or they were split into private property. Ostrom studied groups of people who managed these resources themselves. She found that they often did better than experts expected. The groups made their own ways to decide things and to enforce their rules, and she described the kinds of rules that led to success." },
      { cite: [NOBEL] },
      { sub: "Where Anchoring fits" },
      { p: "Focus keeps a group clear on what it's caring for. Build sets up the rules and roles. Secure gives people someone steady to count on, so the rules hold. This match is ours, not Ostrom's, but it shows how everyday Anchoring adds up." },
      { sub: "Where Anchors show up" },
      { p: "Committee chairs and treasurers. Volunteer schedules and sign-up sheets. Land trusts and co-ops. The person who keeps the records. Anywhere a group needs to last." }
    ],
    ahead: "The Climate Pavilion, where you pick an exhibit on a topic you care about."
  },

  /* For the Field Guide: a true story of someone on this trail. Every
     fact here is on the one linked page. */
  story: {
    exhibit: "sign",
    blocks: [
      { p: "Arlene Cole is a volunteer weather observer in Newcastle, Maine. She took on the job in the 1960s. Every day at 5 p.m., she measures the rain and logs the temperature, and once a month she reports to the National Weather Service. When she leaves town, she arranges for someone to fill in. Her records support climate research, and fisheries officials and insurance companies ask for them." },
      { p: "In 2012, at age 82, she received the Thomas Jefferson Award, the service's top honor for volunteers. It goes to only five of its roughly 11,000 volunteer observers each year." },
      { quote: { text: "I don't do it for the awards. It's a habit. I just think of it, that's all.", who: "Arlene Cole", src: LCN } },
      { quote: { text: "Sometimes, around 5 o'clock at night, when it's snowing, I go out and I say, 'What am I doing this for?'", who: "Arlene Cole", src: LCN } },
      { p: "That's Anchoring at work: showing up, day after day, so others have something steady to count on." },
      { cite: [LCN] }
    ]
  },

  /* For the Field Guide: a short activity for this trail, for any topic. */
  tryIt: {
    exhibit: "sign",
    blocks: [
      { stretch: {
        title: "Your one promise",
        steps: [
          "Think of a group you belong to, at home, at work, or in your community.",
          "What is one small job that group needs done the same way every time?",
          "What would it take for you to be the person others can count on for it?"
        ],
        note: "Do this in your head or on paper."
      } }
    ]
  },

  /* Words to carry home from the Visitor Center. {topic} becomes the
     exhibit's name. */
  farewell: [
    "You're not alone in your desire to help care for the people and places you love. As an Anchor, you don't need to hold everything together by yourself.",
    "When we do this together and do it close to home, rest becomes part of the journey."
  ]
};
