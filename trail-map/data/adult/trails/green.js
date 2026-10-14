/* The Green Trail: Connecting.
   Color names, archetypes, and action words come from core/climate-color.js;
   this file holds only the words that are written for this trail.
   Adult pack: grade 9 reading level or lower. */

const FEMA = { title: "FEMA PrepTalks: Daniel Aldrich, Social Capital in Disaster Mitigation and Recovery", url: "https://fema.gov/sites/default/files/documents/fema_preptalks_aldrich_discussion-guide.pdf" };

export default {
  key: "Green",

  know: {
    exhibit: "sign",
    blocks: [
      { p: "Connecting is a way of helping. It means bringing people together, linking them to help, and making sure everyone belongs. Anyone can take this trail." },
      { sub: "Three actions" },
      { p: "Connecting shows up in three actions. You may already do all three without calling them by name." },
      { actions: [
        { word: "Unite", phrase: "Bringing people who care about the same thing together", example: "Starting the group chat or the phone tree. Inviting a neighbor to come along." },
        { word: "Network", phrase: "Linking people to the help and resources they need", example: "Knowing who to call. Passing along a flyer, a lead, or a name." },
        { word: "Include", phrase: "Making sure everyone belongs", example: "Learning names. Asking who's missing. Making room at the edge of the circle." }
      ] },
      { sub: "What it gives a group" },
      { p: "Groups hold together. People know who to ask, newcomers find a place, and help reaches those who need it." },
      { sub: "What it can cost" },
      { p: "Being the link can wear you out. You don't have to include everyone or tie every thread. Connecting works best when it's shared." }
    ],
    ahead: "A rest stop to check whether Connecting fits you."
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
      { p: "**If Connecting fits you, keep going.** If it doesn't, try another way of helping now:" },
      { trails: true },
      { p: "Or finish this trail first. You can switch trails at the junction, at the end." }
    ],
    ahead: "What Connectors bring to a whole community, beyond the people you know."
  },

  community: {
    exhibit: "sign",
    blocks: [
      { quote: { text: "Social ties are the critical aspect of resilience.", who: "Daniel Aldrich, disaster researcher", src: { title: "FEMA PrepTalks", url: FEMA.url } } },
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
      { p: "Block clubs and tenant groups. Mutual aid networks. Faith communities and schools. Phone trees and group chats. Anywhere people need to find each other." }
    ],
    ahead: "Pick your lodge: the topic you'd like to explore with your way of helping."
  },

  /* Words to carry home from the junction. {topic} becomes the lodge name. */
  farewell: [
    "You don't need to bring everyone together alone. Connection grows when many tend it, and rest is part of the trail. You simply help people find each other.",
    "“We can start close to home. We can care for our {topic} together.”"
  ]
};
