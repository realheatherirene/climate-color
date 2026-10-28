/* Words shared by every trail and every exhibit: the places on the map,
   the first trail stop, the Pavilion, the way back, the Field Guide, the
   return to the Visitor Center,
   notes, and saving. The page fills in {trail}, {action}, {meaning},
   {words}, {exhibit}, {exhibitName}, and {lower}.
   Adult pack: grade 9 reading level or lower. */

const PEW = { title: "Pew Research Center, 2018", url: "https://www.pewresearch.org/politics/2018/04/26/10-political-engagement-knowledge-and-the-midterms/" };
const NCA5_OVERVIEW = { title: "Fifth National Climate Assessment, Ch. 1: Overview, 2023", url: "https://toolkit.climate.gov/NCA5_Ch1_Overview", web: "https://nca5.climate.us/", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch1_Overview" };
const NCA5_TRENDS = { title: "Fifth National Climate Assessment, Ch. 2: Climate Trends, 2023", url: "https://toolkit.climate.gov/NCA5_Ch2_Climate-Trends", web: "https://nca5.climate.us/chapter/2", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch2_Climate-Trends" };
const NCA5_MITIGATION = { title: "Fifth National Climate Assessment, Ch. 32: Mitigation, 2023", url: "https://toolkit.climate.gov/NCA5_Ch32_Mitigation", web: "https://nca5.climate.us/chapter/32", archive: "https://web.archive.org/web/2026/https://toolkit.climate.gov/NCA5_Ch32_Mitigation" };
const SUPRAN = { title: "Supran, Rahmstorf & Oreskes, \"Assessing ExxonMobil's global warming projections,\" Science, 2023", url: "https://www.science.org/doi/10.1126/science.abk0063", archive: "https://web.archive.org/web/2026/https://www.science.org/doi/10.1126/science.abk0063" };
const ROGERS = { title: "PBS, \"Helping Children with Scary News,\" 2013", url: "https://www.pbs.org/wnet/after-newtown/2013/02/26/helping-children-with-scary-news", archive: "https://web.archive.org/web/2026/https://www.pbs.org/wnet/after-newtown/2013/02/26/helping-children-with-scary-news" };
const SPARKMAN = { title: "Sparkman, Geiger & Weber, 2022", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9399177/", archive: "https://web.archive.org/web/2026/https://pmc.ncbi.nlm.nih.gov/articles/PMC9399177/" };

export default {
  /* The places on the map, in order: the one source for their names,
     icons, and signs. The progress bar, the park map and its route strip,
     each place's sign, and the return to the Visitor Center all read
     from here. */
  places: {
    /* The Visitor Center: where the loop starts and ends, as in a real
       park. The reader arrives here (trailhead, the first place on the
       page) and comes back here at the end (finish). */
    trailhead: { name: "Visitor Center", icon: "i-center", route: "Start and end here.",
      title: "Visitor Center", sub: "Welcome! Get your bearings, pick your trail, and head out. The trail loops back here at the end." },
    /* The sign where the trail leaves the Visitor Center's yard. On the
       map and its key only. */
    start: { name: "Trailhead", icon: "i-sign", route: "Where the trail begins, just outside." },
    trail: { name: "Stops 1–4", legendName: "Trail Stops", short: "Stops 1–4", icon: "i-trail", route: "Numbered 1 to 8. Open each one." },
    /* Stop 5: the far point of the loop, where the exhibits are. */
    lodge: { name: "Climate Pavilion", short: "Pavilion", stop: "Stop 5", icon: "i-pavilion", route: "Stop 5. Pick a topic exhibit.",
      title: "Climate Pavilion", sub: "Learn about the effects of climate change on nine environmental topics." },
    /* Stops 6 to 8: the way back, bringing it all close to home. */
    back: { name: "Stops 6–8", short: "Stops 6–8", icon: "i-trail",
      title: "Head Back", sub: "Three stops to bring what you learned close to home." },
    finish: { name: "Visitor Center", icon: "i-center",
      title: "Visitor Center", sub: "You've come full circle. Choose a first step, find what's happening near you, and take your Field Guide home." }
  },


  /* "Climate Change: Reality": at the Climate Pavilion door, before the
     exhibits. What's causing climate change, who's hit first, who knew,
     and how it gets fixed. Honest about policy and power; no parties,
     candidates, bills, or voting advice. */
  reality: {
    exhibit: "sign",
    title: "Climate Change: Reality",
    line: "What's causing it, who's hit first, and how we fix it.",
    blocks: [
      { p: "The short version, from the nation's own climate assessment." },
      { p: "Burning coal, oil, and gas for power, heat, and travel adds heat-trapping gases to the air. Scientists call the link between those gases and a warmer planet \"unequivocal.\" There's no real doubt left." },
      { p: "Since 1970, the lower 48 states have warmed by 2.5°F, and Alaska by 4.2°F." },
      { cite: [NCA5_TRENDS] },
      { p: "The United States has released more of these gases over time than any other country. Its emissions alone account for about 17 percent of the warming so far." },
      { cite: [NCA5_OVERVIEW] },
      { sub: "Who's hit first" },
      { p: "Climate change doesn't land evenly. Low-income communities, communities of color, and Tribes and Indigenous Peoples face high exposure to extreme weather, often with fewer resources to recover." },
      { cite: [NCA5_OVERVIEW] },
      { sub: "Who knew" },
      { p: "Some fossil fuel companies understood the risk early. From 1977 to 2003, ExxonMobil's own scientists projected the warming that has since happened, and their projections were accurate. From 2000 to 2013, the company's leaders publicly cast doubt on that same science." },
      { cite: [SUPRAN] },
      { sub: "We know how to fix it" },
      { p: "U.S. emissions fell 12 percent from 2005 to 2019, mostly as power plants moved away from coal. To reach net zero around 2050, they'd need to fall more than 6 percent a year. Many of the tools to get there, like saving energy, wind, solar, and electric cars, make economic sense now." },
      { p: "Every bit of warming we prevent means less harm. That's why choices made now, by people, towns, companies, and governments, matter." },
      { cite: [NCA5_MITIGATION, NCA5_OVERVIEW] },
      { sub: "Where policy comes in" },
      { p: "Many of the biggest cuts depend on rules and investments made by cities, states, and the country as a whole. That's one reason your Field Guide points you to local meetings and elections." }
    ],
    ahead: "Pick an exhibit below to learn how climate change shows up in one part of life."
  },

  /* The tag under the title and the footer. Climate Color is a project of
     Kinfeather (Kinfeather LLC), whose legal pages live on kinfeather.com.
     In `by`, {owner} becomes a link. */
  site: {
    owner: { name: "Kinfeather", url: "https://kinfeather.com" },
    /* The legal links and the owner line live in the footer every page
       shares: core/site-foot.js. */
    /* The small tag under the title, linking to Kinfeather. */
    by: "a {owner} project",
    /* While readers test it: a small tag beside that line, linking
       to one line in the footer that asks for feedback by email. */
    preview: { tag: "Preview", line: "The Trail is a preview. Tell us what works and what doesn't:", email: "trailmap@kinfeather.com", subject: "Climate Color Trail feedback" }
  },

  /* The park map at the Visitor Center: a picture of the places above, for
     getting your bearings. Screen readers skip it; the route strip under
     it says the same in words, and marks where you are. */
  map: { here: "You are here", lake: "Lake", north: "N", startHere: "Start here" },

  /* The progress bar at the top of the screen. For screen readers, the
     trail's dots are read as "2 of 4 stops opened." */
  progress: { stops: "{n} of {total} stops opened", topics: "{n} topics" },

  /* "Put your [action] to work": the last part of each exhibit, where the
     reader's trail meets the topic. Its words for each trail live in the
     exhibit's file, under work. */
  work: {
    line: "How {a} {archetype} can help with {lower}.",
    imagine: "Imagine this:",
    first: "One first step:",
    added: "Added to your Field Guide.",
    ahead: "Visit another exhibit, or head on to stop 6, on the way back."
  },

  /* The top of the trail, once a trail is picked: its name and what it's
     about. */
  trailTop: { title: "{trail} Trail", line: "Learn the ways of the {archetype}: {meaning}." },

  care: {
    exhibit: "sign",
    blocks: [
      { p: "If caring about the climate has ever felt lonely, that makes sense. Big problems can feel that way. And you have more company than you might think." },
      { find: {
        prompt: "Take a guess: out of every 10 Americans, how many support major climate policies?",
        button: "Reveal the answer",
        reveal: "Between 6 and 8 out of 10 (66 to 80 percent). Yet most people guess only about 4. In one study, 8 or 9 out of every 10 Americans guessed too low.",
        src: SPARKMAN
      } },
      { sub: "You're in the right place" },
      { p: "Climate action isn't only for scientists, activists, or experts. It's also neighbors checking on each other, groups sharing what they know, and people making their towns safer and healthier. If you care about people, you already have a place here." },
      { sub: "Your care already counts" },
      { p: "Community care is climate care. Climate care is community care. The ways you already show up for others are the ways you can show up for the climate." },
      { sub: "When nothing seems to change" },
      { p: "Climate action rarely pays you back right away. The results come slowly, spread out, and shared with millions of people. So it can feel pointless. That isn't a sign you're doing it wrong. It's the shape of the problem." },
      { sub: "When it feels like too much" },
      { p: "Grief, worry, and anger about climate change are common, and they make sense. You don't have to carry them alone." },
      { resources: [
        { verb: "Find", name: "a climate-aware therapist", url: "https://www.climatepsychology.us/practitioner-directory/", reach: "North America", desc: "From the Climate Psychology Alliance of North America: a directory of therapists and others who help with climate feelings. Each listing says whether the person is a licensed therapist, a coach, or a consultant. The Alliance doesn't check licenses, so confirm one before you book. Each person sets their own fees." }
      ] },
      { p: "If you're in crisis, call or text **988**, the Suicide & Crisis Lifeline." }
    ],
    ahead: "A rest stop to check whether {action} fits you."
  },

  /* The way back: stops 6 to 8. Stop 6 is the trail's own story (in its
     trail file); stops 7 and 8 are the same for everyone. Every part
     works for any topic, and for any number of exhibits visited. */
  back: {
    story: { line: "A true story from your trail.", ahead: "A rest stop to think about a place close to home." },
    place: {
      exhibit: "rest",
      line: "A rest stop for a place you care about.",
      blocks: [
        { p: "At the Pavilion, you learned how climate change touches one part of life. Now bring it closer to home." },
        { sub: "Pick one place" },
        { p: "Think of one place close to home that you care about: a creek, a park, a block, a school, a home." },
        { questions: [
          "What's changing there?",
          "Who feels it first?",
          "Where does it show up in my day?",
          "How could my {action} help?"
        ] }
      ],
      ahead: "The other helpers around you, and where you fit."
    },
    helpers: {
      exhibit: "sign",
      line: "All six ways of helping, side by side.",
      blocks: [
        { quote: { text: "Look for the helpers. You will always find people who are helping.", who: "Fred Rogers, sharing his mother's advice", src: ROGERS } },
        { p: "You're one of those helpers. And you're not the only one. Every way of helping has a part to play, and yours is marked." },
        { ways: true },
        { questions: [
          "Which other ways would I want beside me?",
          "Who do I know who helps in one of these ways?"
        ] }
      ],
      ahead: "Back at the Visitor Center: choose a first step and take your Field Guide home."
    }
  },

  /* The Pavilion: one for every trail, with an exhibit for each topic. */
  lodge: {
    /* One line under "Pick an exhibit": all a reader needs to start. */
    pickHint: "Visit as many as you like. Each one you visit adds its pages to your Field Guide.",
    /* How every topic is named, everywhere: "Water Exhibit." */
    exhibitName: "{exhibit} Exhibit",
    /* Each exhibit card says so once you've opened it, and the progress
       bar counts them: "Pavilion · 2 visited." */
    visited: "Visited",
    visitedCount: "{n} visited",
    /* Back at the Visitor Center: the reader picks which visited exhibits go
       in the Field Guide. */
    door: "Which topics go in your Field Guide?"
  },

  /* The Field Guide: the keepsake the reader takes home from the
     Visitor Center. It gathers what they did on the trail; it asks
     nothing new. Printed, saved as a PDF, or downloaded as one web page
     file, notes included. The page fills in the reader's trail and
     topics. */
  guide: {
    title: "Your Field Guide",
    /* The cover: the brand, the title, and the reader's trail. */
    brand: "Climate Color Trail",
    by: "a Kinfeather project",
    trailLine: "{trail} Trail · {action}",
    safety: "Put your own safety first. In an emergency, follow official alerts and call 911.",
    yours: "Your trail",
    way: "Your way of helping",
    you: "You're {a} {archetype}.",
    step: "Your first step",
    steps: "Your first steps",
    own: "Your own first step",
    plan: "Your plan",
    tryIt: "Try it now",
    story: "Meet someone like you",
    notes: "Your notes",
    noNotes: "No notes yet. Add some at the rest stops, and they'll show up here.",
    /* Blank lines to write on, after the notes. */
    moreNotes: "More notes",
    /* Each note, named by where it was written. */
    noteFrom: { fit: "Stop 3: Rest and reflect", place: "Stop 7: Think about your own place", life: "{exhibit}: Find it in your own life" },
    forTopic: "For {exhibit}",
    work: "Put your {action} to work",
    imagine: "Imagine this:",
    nearby: "Find ways to help close to home",
    localTitle: "Close to home, for every topic",
    helpers: "All six ways of helping",
    back: { label: "Back to the Climate Pavilion", hint: "Visit more exhibits. Each one you visit adds its pages to your Field Guide." },
    /* The last lines of the Field Guide. */
    comeBack: "Come back to your trail anytime:",
    footBrand: "Climate Color is a project of Kinfeather. Free and open to everyone.",
    /* At the foot of every printed page. */
    pageFoot: "Your Field Guide · Climate Color Trail",
    /* The downloaded file's name. */
    file: "climate-color-field-guide.html",
    /* In every "Find ways to help close to home" part, after its first
       line. In the Field Guide and on the Bulletin Board, it comes once,
       for every topic. */
    local: [
      { p: "Few people go to local meetings, like city council, utility boards, and school boards. In one national survey, fewer than 3 in 10 Americans had gone to even one in five years. So one voice can carry far." },
      { cite: [PEW] },
      { p: "Many local boards are elected, and local elections decide who serves on them." },
      { resources: [
        { verb: "Find", name: "your elected officials", url: "https://www.usa.gov/elected-officials", reach: "United States only", desc: "Type in your address to find who represents you, from your city or county to Congress." },
        { verb: "Learn", name: "how voting works in your state", url: "https://vote.gov", reach: "United States only", desc: "Registration, deadlines, and ways to vote, from the U.S. government." }
      ] }
    ],
  },

  /* Back at the Visitor Center: the end of the loop. The trip just
     taken, then the Bulletin Board (a plan for a first step, help near
     you, and the trail's closing words), then the Field Guide to take
     home. Feedback sits below the trail, on its own. */
  bulletin: {
    /* After each trail's own closing words, on every trail. The first
       circles back to the guess on the Care stop. */
    close: [
      "Remember your guess on the trail? Between 6 and 8 out of 10 Americans support major climate policies. That's a lot of company, and plenty of it lives close to you.",
      "You may never get proof that the whole planet changed. Wins close to home are real, though: a cleaner creek, a neighbor's new heat pump, a rule your town passed. Count those wins, rest when you need to, and keep showing up."
    ],
    trail: { label: "Try another trail", hint: "Keep your exhibits and pick a different way of helping." },
    board: {
      trip: "Your loop",
      trailhead: "You started here and picked the {trail} Trail.",
      trailOpened: "You opened {n} of {total} stops.",
      trailAll: "{total} stops on your way of helping.",
      backOpened: "You opened {n} of {total} stops.",
      backAll: "{total} stops to bring it close to home.",
      lodge: "You visited the {exhibits}.",
      here: "You're back.",
      /* Before any exhibit is visited: the way to the Pavilion. */
      empty: "Visit at least one exhibit at the Climate Pavilion first. Each one adds a first step and its pages to your Field Guide.",
      emptyGo: "Go to the Climate Pavilion",
      /* The Bulletin Board: everything for the road home, as pinned
         notes. Every note speaks to the reader; none describes the page. */
      title: "Bulletin Board",
      /* The first note: the reader's trail and the exhibits they visited,
         as a swatch and icons, with names in plain text. */
      recap: { title: "Remember your trail" },
      /* "Plan your first step": a short walk-through, one small question at
         a time. Every answer is optional, stays on this device, and goes in
         the Field Guide as "Your plan." */
      plan: {
        title: "Plan your first step",
        steps: [
          { q: "Choose it.", hint: "Pick one from the exhibits you visited, or write your own." },
          { key: "small", q: "Make it small.", hint: "What's the very first thing you'll do? Keep it small enough to finish in 10 minutes, like finding a phone number or sending one text." },
          { key: "day", q: "Pick a day.", hint: "When will you do it? Choose a day this week or next." },
          { key: "who", q: "Bring someone along.", hint: "Who could join you, or who could you tell? One name is enough." },
          { key: "sign", q: "Know it's working.", hint: "What small change would tell you it's helping?" }
        ],
        startHere: "Start here",
        start: "Your start",
        own: "Or write your own:",
        ownPlaceholder: "My first step is...",
        saved: "Your answers stay on this device, and they go in your Field Guide."
      },
      /* One note for each exhibit visited: every place to find help close
         to home for that topic. Directories come first; events last. */
      near: { title: "Find ways to help close to home", coming: "Coming up" },
      leaders: { title: "Reach your local leaders" },
      other: { title: "Try another trail", text: "Keep your exhibits and take a different way of helping." },
      /* The Field Guide, on its own below the board. */
      take: {
        title: "Take your Field Guide home",
        text: "Everything from your trail, ready to keep: your way of helping, your first step and plan, your notes, and ways to help near you.",
        door: "Which topics go in it?",
        print: "Print it",
        download: "Download it",
        email: "Email me a link",
        copy: "Copy link",
        note: "Printing also lets you save it as a PDF. Downloading saves one file, with your notes, that opens in any web browser."
      },
      pass: {
        title: "Pass it on",
        text: "Know someone who wants to help but isn't sure where to start? Send them the trail.",
        message: "I took the {trail} Trail on Climate Color and found my way of helping with climate change. Find yours: {url}",
        subject: "Try the Climate Color Trail",
        email: "Email it"
      },
      feedback: {
        title: "Help make the trail better",
        text: "The trail is new, and your answers help decide what comes next. Answer any that you like.",
        to: "trailmap@kinfeather.com",
        subject: "Climate Color Trail feedback",
        questions: [
          { key: "fit", ask: "Did you find a way of helping that fits you?", options: ["Yes", "Partly", "Not yet"] },
          { key: "step", ask: "Do you plan to try a first step?", options: ["Yes, soon", "Maybe later", "Not sure yet"] },
          { key: "length", ask: "How did the length feel?", options: ["Too short", "About right", "Too long"] }
        ],
        comment: "Anything you loved, or anything that got in the way?",
        includes: "Your email will also name your trail and the exhibits you visited. Your notes stay private.",
        send: "Write the email",
        copy: "Copy it",
        privacy: "**Nothing is sent until you send it.** The button opens your own email app. If it doesn't, copy your answers and email them to {to}.",
        /* The email itself. Lines with no answer are left out. */
        mail: { intro: "Climate Color Trail feedback", trail: "Trail", exhibits: "Exhibits", comment: "Comments" }
      },
      words: "Carry these words home",
      /* The end of the line: the Trailhead sign, where the trail began. */
      end: { sign: "Trailhead", home: "Back to the start" }
    }
  },

  /* Beside each source: its saved copy on the Wayback Machine, in case
     the source goes offline. */
  sources: { archived: "archived copy", web: "on Climate.us", official: "official PDF" },

  /* Read aloud by screen readers after every outside link. */
  newTab: "(opens in a new tab)",

  /* A lead-in above the words to say, in every finder. */
  say: "Try saying:",

  /* Notes at rest stops and in the Field Guide. Kept with the browser's
     own storage, on this device only, and never sent anywhere. */
  notes: {
    label: "Your notes",
    placeholder: "Write your thoughts here, if you'd like.",
    help: "**Nothing is saved online.** Your notes stay in this browser on this device, and nowhere else. Keep in mind that anyone who uses this device and browser could open them, so clear your notes when you're done.",
    clear: "Clear my notes",
    cleared: "Cleared",
    off: "This browser can't keep notes. Print or copy them before you leave."
  },

  /* Coming back later. Only the trail and exhibit are kept, and only in
     the link itself: nothing is saved online. */
  save: {
    pace: "Want to finish later?",
    paceButton: "Save for later",
    title: "Come back to this spot anytime",
    text: "This link brings you back to your trail and the exhibits you've visited. Save it however you like.",
    /* Share opens the device's own share menu, where it has one. Email
       opens the reader's own email app; nothing goes through Climate
       Color. */
    share: "Share",
    email: "Email it to me",
    emailSubject: "My spot on the Climate Color Trail",
    emailBody: "Pick up where I left off on the Climate Color Trail:",
    copy: "Copy link",
    copied: "Copied",
    privacy: "**Nothing is saved online.** Your notes stay in this browser on this device, and nowhere else. The link holds only your trail and the exhibits you've visited."
  }
};
