/* The Green Trail: Connecting.
   Color names, archetypes, and action words come from core/climate-color.js;
   this file holds only the words written for this trail: its four markers,
   plus its story and its "Try it now" for the Field Guide.
   Adult pack: grade 9 reading level or lower. */

const FEMA = { title: "FEMA PrepTalks: Daniel Aldrich, Social Capital in Disaster Mitigation and Recovery", url: "https://fema.gov/sites/default/files/documents/fema_preptalks_aldrich_discussion-guide.pdf", archive: "https://web.archive.org/web/2026/https://fema.gov/sites/default/files/documents/fema_preptalks_aldrich_discussion-guide.pdf" };
const PROSPECT = { title: "Casey Sanchez, \"Gulf Coast Notebook,\" The American Prospect, February 2009", url: "https://prospect.org/2009/02/17/gulf-coast-notebook/" };

export default {
  key: "Green",

  know: {
    exhibit: "sign",
    blocks: [
      { p: "Connecting is a way of helping. It means bringing people together, linking them to help, and making sure everyone belongs. Anyone can take this trail." },
      { sub: "Three typical actions" },
      { p: "Acts of connecting show up in many different ways, but these three are quite common." },
      { actions: [
        { word: "Unite", phrase: "Bringing people who care about the same thing together", example: "Starting the group chat or the contact list. Inviting a neighbor to come along." },
        { word: "Network", phrase: "Linking people to the help and resources they need", example: "Knowing who to call. Passing along a flyer, a lead, or a name." },
        { word: "Include", phrase: "Making sure everyone belongs", example: "Learning names. Asking who's missing. Making room at the edge of the circle." }
      ] },
      { sub: "Benefits of being a Connector" },
      { p: "Groups hold together. People know who to ask, newcomers find a place, and help reaches those who need it." },
      { sub: "Challenges of being a Connector" },
      { p: "Being the link can wear you out. You don't have to include everyone or tie every thread. Connecting works best when it's shared." }
    ],
    ahead: "Why your care matters, and why you're in good company."
  },

  fit: {
    exhibit: "rest",
    blocks: [
      { sub: "Does Connecting fit you?" },
      { questions: [
        "When have I brought people together?",
        "When have I linked someone to help?",
        "When have I made sure no one was left out?",
        "What helps me rest when being the link wears me out?"
      ] },
      { p: "**If Connecting fits you, keep going.** If it doesn't, pick another way of helping:" },
      { trails: true },
      { p: "Or finish this trail first. You can switch trails back at the Visitor Center, at the end." }
    ],
    ahead: "What Connectors bring to a whole community, beyond the people you know."
  },

  community: {
    exhibit: "sign",
    blocks: [
      { quote: { text: "Social ties are the critical aspect of resilience.", who: "Daniel Aldrich, disaster researcher", src: { title: "FEMA PrepTalks", url: FEMA.url, archive: FEMA.archive } } },
      { p: "Connecting isn't only about the people you already know. In a community, Connectors build the ties that help everyone get through hard times." },
      { sub: "Three kinds of ties" },
      { p: "Aldrich describes three kinds of social ties:" },
      { defs: [
        { term: "Bonding", def: "ties among people who are close, like family and friends." },
        { term: "Bridging", def: "ties among people from different backgrounds." },
        { term: "Linking", def: "ties between neighbors and the people in power." }
      ] },
      { p: "In his research, close ties help people survive a disaster, stay or return home, and recover their mental health. Ties to people in power are the best predictor of how well a whole community recovers." },
      { cite: [FEMA] },
      { sub: "Where Connecting fits" },
      { p: "Unite builds close ties. Include builds bridges across differences. Network links people to help. This match is ours, not Aldrich's, but it shows how everyday Connecting adds up to a stronger community." },
      { sub: "Where Connectors show up" },
      { p: "Block clubs and tenant groups. Mutual aid networks. Faith communities and schools. Group chats and contact lists. Anywhere people need to find each other." }
    ],
    ahead: "The Climate Pavilion, where you pick an exhibit on a topic you care about."
  },

  /* For the Field Guide: a true story of someone on this trail. Every
     fact here is on the one linked page. */
  story: {
    exhibit: "sign",
    blocks: [
      { p: "When Hurricane Katrina flooded New Orleans in 2005, the members of Mary Queen of Vietnam, a Catholic parish in New Orleans East, were scattered far from home. Their pastor, Father Vien Nguyen, and others from the parish kept them linked to each other." },
      { quote: { text: "Wherever we'd go, we'd take pictures of one location and show it to the other.", who: "Father Vien Nguyen", src: PROSPECT } },
      { p: "In October 2005, as the city began to reopen, more than 300 people came back for Sunday Mass. The parish sent the city 500 petition signatures asking for quick action, and the neighborhood became one of the first to get its power back. The article reports that 95 percent of members came back." },
      { p: "That's Connecting at work: keeping people linked, even when they're far apart." },
      { cite: [PROSPECT] }
    ]
  },

  /* For the Field Guide: a short activity for this trail, for any topic. */
  tryIt: {
    exhibit: "sign",
    blocks: [
      { stretch: {
        title: "Your circle of three",
        steps: [
          "Think of three people you could reach quickly if important news needed to spread on your street.",
          "Who would you tell first?",
          "Who might not get the news any other way?"
        ],
        note: "Do this in your head or on paper."
      } }
    ]
  },

  /* Words to carry home from the Visitor Center. {topic} becomes the
     exhibit's name. */
  farewell: [
    "You're not alone in your desire to help care for the people and places you love. As a Connector, you don't need to bring everyone together by yourself.",
    "When we do this together and do it close to home, rest becomes part of the journey."
  ]
};
