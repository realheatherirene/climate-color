/* ==========================================================================
   CLIMATE COLOR CARDS: builds the deck from the Trail's own data
   ==========================================================================
   Nothing here is written twice. Each card reads from the same files the
   Trail does:
     action cards  core/climate-color.js (color, archetype) and each
                   trail's "Three typical actions" (word, phrase, example)
     topic cards   trail/data/adult/topics.js (name, icon, teaser, source)
     pair answers  each exhibit's "work" lines, one per trail and action
   So a change in the Trail reaches the cards on the next page load.
   ========================================================================== */

import { COLOR_KEYS, getColor } from "climate-color/climate-color.js";
import { renderSiteFoot } from "climate-color/site-foot.js";
import { topics, trails, exhibits } from "../trail/data/adult/index.js";

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ---------- The cards' content ---------- */

/* The 18 actions, in deck order: by color (Red first), then the
   trail's own order. `n` is the action's place in its color, 0 to 2. */
const ACTIONS = COLOR_KEYS.flatMap(key => {
  const block = trails[key].know.blocks.find(b => b.actions);
  return block.actions.map((a, n) => ({ ...a, color: key, n }));
});

const TOPICS = topics.topics;

/* "Ch. 14" or "Chs. 7 and 8", from the teaser's source titles. */
function chapters(src) {
  const n = [].concat(src).map(s => s.title.match(/Ch\. (\d+)/)[1]);
  return n.length > 1 ? `Chs. ${n.slice(0, -1).join(", ")} and ${n.at(-1)}` : `Ch. ${n[0]}`;
}

/* ---------- Drawing one card ----------
   Each returns the inside of a card. `tag` is the element the card's
   name sits in: a heading in the deck lists, a plain paragraph in the
   print sheet and the draw. */

function actionCard(a, tag = "p") {
  const c = getColor(a.color);
  const dots = [0, 1, 2].map(i => `<span class="dot${i === a.n ? " on" : ""}"></span>`).join("");
  return `<div class="card action color-${a.color.toLowerCase()}">
  <div class="card-head label-${c.label}"><p>${esc(a.color)} · ${esc(c.archetype)}</p><span class="dots" aria-hidden="true">${dots}</span></div>
  <div class="card-body">
    <${tag} class="card-name">${esc(a.word)}</${tag}>
    <p class="card-line">${esc(a.phrase)}</p>
    <div class="card-box"><p class="box-label">For example</p><p>${esc(a.example)}</p></div>
    <p class="card-foot">Climate Color</p>
  </div>
</div>`;
}

function topicCard(t, tag = "p") {
  const icon = size => `<svg class="${size}" aria-hidden="true"><use href="#${t.icon}"/></svg>`;
  return `<div class="card topic">
  <div class="card-head"><p>Climate Pavilion · Topic</p>${icon("head-icon")}</div>
  <div class="card-body">
    ${icon("topic-icon")}
    <${tag} class="card-name">${esc(t.name)}</${tag}>
    <div class="card-box"><p class="box-label">What's changing</p><p>${esc(t.teaser)}</p></div>
    <p class="card-foot">Source: Fifth National Climate Assessment, ${chapters(t.src)}, 2023</p>
  </div>
</div>`;
}

const BARS = `<span class="bars" aria-hidden="true">${COLOR_KEYS.map(k => `<span class="bar bar-${k.toLowerCase()}"></span>`).join("")}</span>`;

function backCard() {
  return `<div class="card back">
  <p class="back-name">Climate Color</p>
  ${BARS}
  <p class="back-line">Community care is climate care.</p>
  <p class="back-url">climatetrailway.com/trail</p>
</div>`;
}

/* ---------- The deck lists ---------- */

$("actionDeck").innerHTML = ACTIONS.map(a => `<li>${actionCard(a, "h3")}</li>`).join("");
$("topicDeck").innerHTML = TOPICS.map(t => `<li>${topicCard(t, "h3")}</li>`).join("");
$("backDeck").innerHTML = backCard();

/* ---------- Draw a pair ----------
   Two cards start face down. Each draw turns them over to a new action
   and topic, never the same pair twice in a row, then shows the
   Trail's own idea for that pair and a link to it in the Trail. The
   backs are decoration, so screen readers skip them and get only the
   cards drawn. */

const still = matchMedia("(prefers-reduced-motion: reduce)");
const TURN = 450;   /* ms; matches .flip-inner's transition in cards.css */

function setUpFlip(el) {
  el.innerHTML = `<div class="flip-inner"><div class="face face-back" aria-hidden="true">${backCard()}</div><div class="face face-front" aria-hidden="true"></div></div>`;
}
setUpFlip($("flipAction"));
setUpFlip($("flipTopic"));

const pick = list => list[Math.floor(Math.random() * list.length)];
let last = "";
let busy = false;

function turn(up) {
  for (const id of ["flipAction", "flipTopic"]) {
    const el = $(id);
    el.classList.toggle("up", up);
    el.querySelector(".face-front").setAttribute("aria-hidden", up ? "false" : "true");
  }
}

function draw() {
  if (busy) return;
  let a, t;
  do { a = pick(ACTIONS); t = pick(TOPICS); } while (`${a.word}+${t.key}` === last);
  last = `${a.word}+${t.key}`;

  const show = () => {
    $("flipAction").querySelector(".face-front").innerHTML = actionCard(a);
    $("flipTopic").querySelector(".face-front").innerHTML = topicCard(t);
    turn(true);
    const idea = exhibits[t.key].work[a.color][a.word];
    const link = `/trail/#${a.color.toLowerCase()}-${t.key}`;
    $("idea").innerHTML = `<p class="idea-ask">You drew <strong>${esc(a.word)}</strong> and <strong>${esc(t.name)}</strong>. How could you put ${esc(a.word)} to work for ${esc(t.name)}, close to home?</p>
<p class="idea-label">One answer, from the Trail</p>
<p class="idea-text">${esc(idea)}</p>
<p><a href="${link}">Open the ${esc(a.color)} Trail at the ${esc(t.name)} exhibit</a></p>`;
    $("drawBtn").textContent = "Draw again";
    busy = false;
  };

  busy = true;
  const wasUp = $("flipAction").classList.contains("up");
  if (wasUp && !still.matches) { turn(false); setTimeout(show, TURN); }
  else show();
}

$("drawBtn").addEventListener("click", draw);

/* ---------- The print sheet ----------
   Nine cards to a page: the action cards fill two pages, the topic
   cards one. With backs on, a page of nine backs follows each page of
   cards, so a two-sided print puts a back behind every card. Every back
   is the same, so the pages line up on either flip edge. */

const FRONTS = [...ACTIONS.map(a => actionCard(a)), ...TOPICS.map(t => topicCard(t))];

function buildSheet() {
  const pages = [];
  const backs = `<div class="sheet-page">${Array(9).fill(backCard()).join("")}</div>`;
  for (let i = 0; i < FRONTS.length; i += 9) {
    pages.push(`<div class="sheet-page">${FRONTS.slice(i, i + 9).join("")}</div>`);
    if ($("withBacks").checked) pages.push(backs);
  }
  $("sheet").innerHTML = pages.join("");
}

buildSheet();
$("withBacks").addEventListener("change", buildSheet);
$("printBtn").addEventListener("click", () => window.print());

renderSiteFoot($("siteFoot"));
