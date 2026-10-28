/* The Health exhibit. Everything here is written once and shared by every
   trail: the exhibit itself, plus a situation and a finder for the Field
   Guide. Titles come from titles.js, so none appear here.
   Adult pack: grade 9 reading level or lower. */

const NCA5_HEALTH = { title: "Fifth National Climate Assessment, Ch. 15: Human Health, 2023", url: "https://toolkit.climate.gov/NCA5_Ch15_Human-Health", web: "https://nca5.climate.us/chapter/15", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch15_Human-Health" };
const NCA5_ECOSYSTEMS = { title: "Fifth National Climate Assessment, Ch. 8: Ecosystems, Ecosystem Services, and Biodiversity, 2023", url: "https://toolkit.climate.gov/NCA5_Ch8_Ecosystems", web: "https://nca5.climate.us/chapter/8", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch8_Ecosystems" };

export default {
  key: "health",

  /* One line under the exhibit's sign: what the reader will get here. */
  promise: "In this exhibit, you'll find out how climate change is affecting health, who feels it first, and where the effect shows up in your own life.",

  /* The exhibit's parts, in the order set by titles.js. Each has a short
     line under its title, so a closed part still says what's inside. */
  parts: {
    why: {
      exhibit: "sign",
      line: "A quick guess, then why health matters.",
      blocks: [
        { find: {
          prompt: "Take a guess: in a survey of 1,000 U.S. teens, about how many out of 10 said they feel anxious about climate change?",
          button: "Reveal the answer",
          reveal: "Nearly 6 out of 10. Almost half were very or extremely worried.",
          src: NCA5_HEALTH
        } },
        { teaser: true }
      ],
      ahead: "What's changing for health, across the country."
    },

    changing: {
      exhibit: "sign",
      line: "Minds, disease, heat illness, and care.",
      blocks: [
        { p: "Everyone depends on good health, and on the clinics, hospitals, and people who care for us. Climate change is already harming people's physical, mental, and community health." },
        { list: [
          "**Minds.** Disasters and extreme heat can harm mental health. After the Camp Fire in California, survivors faced post-traumatic stress, depression, and anxiety.",
          "**Disease.** Ticks cause about 80 percent of the reported U.S. diseases spread by ticks and insects, and tick-borne disease cases have risen steadily for 20 years. A warmer climate keeps ticks active longer. In one review of diseases that spread between animals and people, climate change made 58 percent of them worse.",
          "**Care.** Floods and storms can cut people off from care, and the harm can last for months. About 9 percent of U.S. hospitals, 10 percent of nursing homes, and 12 percent of pharmacies are at risk of flooding.",
          "**Heat illness.** Heat sends more people to the emergency room for heart disease, diabetes, and other conditions.",
          "**Hope in acting together.** Feeling able to take climate action can help protect people's mental health during disasters. Cutting heat-trapping gases and air pollution would save lives and ease the load on hospitals."
        ] },
        { cite: [NCA5_HEALTH, NCA5_ECOSYSTEMS] }
      ],
      ahead: "Who feels these changes first."
    },

    who: {
      exhibit: "sign",
      line: "The communities hit hardest.",
      blocks: [
        { p: "Low-income communities, communities of color, and Tribes and Indigenous Peoples carry a heavier share of climate's harm to health." },
        { p: "The harm can last for years. One in six low-income mothers still had post-traumatic stress symptoms 12 years after Hurricane Katrina. People who need regular care, like dialysis, are put at risk when storms cut off access." },
        { cite: [NCA5_HEALTH] }
      ],
      ahead: "A rest stop to think about health where you live."
    },

    life: {
      exhibit: "rest",
      line: "Where health shows up in your day.",
      blocks: [
        { sub: "Health where you live" },
        { questions: [
          "How does the weather affect how I feel, in body and mind?",
          "Where do people in my community go for care?",
          "Who near me would have a hard time getting care after a storm or flood?"
        ] }
      ],
      ahead: "How your way of helping fits this topic."
    }
  },

  /* For the Field Guide's "Think it through." The reader writes how
     their own way of helping fits. */
  situation: "A flood closes your town's only clinic for two weeks. Some neighbors need regular care, like insulin refills or dialysis, and aren't sure where to go. Others are still shaken from the flood and having trouble sleeping.",

  /* Added to the shared questions in the Field Guide's first step. */
  /* "Put your [action] to work": this topic, for each trail. One line
     for each of the trail's three actions, then one first step. */
  work: {
    Red: {
      Focus: "Help your block agree on the first goal: everyone who needs regular care can still get it.",
      Build: "Start a simple list of nearby clinics and pharmacies, their hours, and who needs a ride to reach them.",
      Secure: "Keep the list current until the clinic reopens, and be someone neighbors can call.",
      first: "Ask a community health center or your public health department how neighbors can help after a disaster."
    },
    Orange: {
      Dream: "Imagine your town after the next flood, with no one cut off from care. What would need to be in place?",
      Invent: "Try a new way to get medicine to neighbors who can't travel, like a shared ride or a pharmacy that delivers.",
      Invite: "Ask neighbors who were shaken by the flood what would help, and make room for their ideas.",
      first: "Ask a community health center how people can share ideas about what the town needs."
    },
    Yellow: {
      Inspire: "Share why caring for each other's health matters to you, in a conversation or your group chat.",
      Rally: "Send a friendly reminder with the open clinic's hours and the pharmacy's delivery number.",
      Encourage: "Thank the nurses, pharmacists, and neighbors who kept people cared for.",
      first: "Find a health fair or volunteer day at a health center near you, and invite a friend."
    },
    Green: {
      Unite: "Swap numbers with neighbors who need regular care, so no one has to sort it out alone.",
      Network: "Know where the nearest open clinic and pharmacy are, and the number for emotional support, and pass them along.",
      Include: "Check in with neighbors who live alone or read little English, and make sure the information reaches them.",
      first: "Ask a community health center or senior center how you can help neighbors get care."
    },
    Blue: {
      Clarify: "Explain in plain words where people can get care while the clinic is closed.",
      Inform: "Share the open clinic's hours and the pharmacy's delivery number in your group chats.",
      Influence: "Tell your city council or health department how the closure affected your neighbors, and ask about plans for the next flood.",
      first: "Sign up for your health department's news and emergency alerts."
    },
    Indigo: {
      Assess: "Sort out who needs care most urgently: medicine, dialysis, or someone to talk to.",
      Adapt: "If one clinic is full, help find another, or a pharmacy that delivers.",
      Guide: "Help a neighbor find the nearest open health center and set up a ride.",
      first: "Ask your public health department or a health center what help is needed most after a disaster."
    }
  },

  first: {
    questions: ["Which health projects near me could use my way of helping?"],
    friend: ["Where does our community care for each other's health?"]
  },

  /* For the Field Guide: where health projects turn up close to home. */
  finder: {
    exhibit: "tip",
    line: "Where health projects turn up near you.",
    blocks: [
      { p: "Opportunities are local, and they change. Clinics, health fairs, and senior centers are where people who care about health find each other." },
      { tips: [
        { verb: "Check", text: "bulletin boards at the library, clinic, or pharmacy for health fairs and volunteer calls." },
        { verb: "Ask", text: "at a community health center, senior center, or public health department how you can help." },
        { verb: "Sign up for", text: "your health department's news and emergency alerts." },
        { verb: "Search for", text: "\"community health worker [your county],\" \"health fair [your town],\" or \"mental health first aid [your city].\"" }
      ] },
      { find: {
        prompt: "There's a free number to call or text when you or someone you know needs emotional support.",
        button: "Find out",
        reveal: "It's the 988 Lifeline. Call, text, or chat with 988 any time, day or night. It's free and confidential, and it's offered in English and Spanish.",
        link: { name: "988 Lifeline", url: "https://988lifeline.org/", reach: "United States only" }
      } },
      { resources: [
        { verb: "Find", name: "a health center", url: "https://findahealthcenter.hrsa.gov/", reach: "United States only", desc: "Health centers offer checkups, care when you're sick, and care during pregnancy, even if you don't have insurance. You pay what you can afford, based on your income." }
      ] },
      { say: [
        { where: "At the library desk", words: "Are there groups here that help people get to health care?" },
        { where: "At a health center", words: "Do you need volunteers after storms or floods?" },
        { where: "To a neighbor", words: "If you need a ride to the clinic, can I help?" }
      ] },
      { more: [ { sub: "Then grow it", items: [
        { verb: "Pass", text: "one idea along to a neighbor.", reach: "Close to home" },
        { verb: "Bring", text: "a friend to a health fair.", reach: "A little further" },
        { verb: "Introduce", text: "a senior center to a community health center, or welcome newcomers to your group.", reach: "Further still" }
      ] } ] }
    ]
  }
};
