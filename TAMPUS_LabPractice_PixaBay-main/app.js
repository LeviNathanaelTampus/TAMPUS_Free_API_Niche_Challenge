const API_URL = "https://dummyjson.com/quotes?limit=0";

const MOODS = [
  {
    code: "LQD-FTN",
    key: "FTN",
    label: "Fortnight",
    keywords: ["love", "heart", "romance", "beloved", "together", "forever", "kiss"],
  },
  {
    code: "LQD-DNB",
    key: "DNB",
    label: "Down Bad",
    keywords: ["need", "want", "miss", "desire", "crave", "longing", "please"],
  },
  {
    code: "LQD-TBD",
    key: "TBD",
    label: "The Black Dog",
    keywords: ["sad", "dark", "grief", "alone", "death", "pain", "sorrow", "misery"],
  },
  {
    code: "LQD-WAL",
    key: "WAL",
    label: "Who's Afraid",
    keywords: ["fear", "afraid", "fight", "brave", "courage", "enemy", "war"],
  },
  {
    code: "LQD-ICD",
    key: "ICD",
    label: "Broken Heart",
    keywords: ["smile", "try", "fail", "failure", "persist", "endure"],
  },
  {
    code: "LQD-ALC",
    key: "ALC",
    label: "The Alchemy",
    keywords: ["change", "hope", "become", "dream", "future", "transform"],
  },
  {
    code: "LQD-GSC",
    key: "GSC",
    label: "Guilty as Sin",
    keywords: ["secret", "guilt", "sin", "confess", "lie", "lies", "tempt"],
  },
  {
    code: "LQD-MSS",
    key: "MSS",
    label: "The Manuscript",
    keywords: ["write", "writer", "poet", "poem", "wisdom", "manuscript"],
  },
];

const form = document.getElementById("search-form");
const queryInput = document.getElementById("query");
const moodRow = document.getElementById("mood-row");
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");

let catalog = [];
let activeMood = null;

function normalize(text) {
  return String(text || "").toLowerCase();
}

function scoreMood(text, mood) {
  const haystack = normalize(text);
  return mood.keywords.reduce((score, word) => {
    const pattern = new RegExp(`\\b${word}\\b`, "i");
    return pattern.test(haystack) ? score + 1 : score;
  }, 0);
}

function classifyQuote(quote, query) {
  const blob = `${quote.quote} ${quote.author} ${query || ""}`;
  let best = MOODS[MOODS.length - 1];
  let bestScore = -1;

  for (const mood of MOODS) {
    const score = scoreMood(blob, mood);
    if (score > bestScore) {
      best = mood;
      bestScore = score;
    }
  }

  if (activeMood && bestScore <= 0) {
    return activeMood;
  }

  return best;
}

function textMatches(quote, query) {
  const haystack = normalize(`${quote.quote} ${quote.author}`);
  const words = normalize(query).trim().split(/\s+/).filter(Boolean);
  if (!words.length) return false;
  return words.every((word) => haystack.includes(word));
}

function moodMatches(quote, mood) {
  return scoreMood(`${quote.quote} ${quote.author}`, mood) > 0;
}

function matchesSearch(quote, query, mood) {
  const hasQuery = Boolean(normalize(query).trim());
  if (hasQuery && !textMatches(quote, query)) return false;
  if (mood && !moodMatches(quote, mood)) return false;
  if (!hasQuery && !mood) return false;
  return true;
}

function renderMoods() {
  moodRow.innerHTML = MOODS.map(
    (mood) =>
      `<button type="button" class="mood-chip${
        activeMood?.code === mood.code ? " active" : ""
      }" data-code="${mood.code}">${mood.code} · ${mood.label}</button>`
  ).join("");
}

function renderResults(quotes, query) {
  if (!quotes.length) {
    resultsEl.innerHTML = `
      <div class="empty">
        Nothing in the drawer for that request.
        <span class="cursor"></span>
      </div>`;
    return;
  }

  resultsEl.innerHTML = quotes
    .map((quote) => {
      const mood = classifyQuote(quote, query);
      return `
        <article class="card code-${mood.key}">
          <div class="card-top">
            <p class="chapter">${mood.label}</p>
            <span class="stamp">${mood.code}</span>
          </div>
          <p class="quote">“${quote.quote}”</p>
          <p class="author">— ${quote.author}</p>
          <button type="button" class="copy-btn" data-copy="${encodeURIComponent(
            `${mood.code} · ${mood.label}\n“${quote.quote}”\n— ${quote.author}`
          )}">Copy department card</button>
        </article>`;
    })
    .join("");
}

function search() {
  const query = queryInput.value;
  let hits = catalog.filter((quote) => matchesSearch(quote, query, activeMood));
  let usedFallback = false;

  if (!hits.length && query.trim() && activeMood) {
    hits = catalog.filter((quote) => matchesSearch(quote, query, null));
    usedFallback = hits.length > 0;
  }

  const moodNote = activeMood ? ` · code ${activeMood.code}` : "";
  const fallbackNote = usedFallback ? " · mood drawer was empty, showing text matches" : "";
  statusEl.textContent = catalog.length
    ? `${hits.length} filed page${hits.length === 1 ? "" : "s"}${moodNote}${fallbackNote}`
    : "The archive could not be reached.";
  renderResults(hits.slice(0, 18), query);
}

async function loadCatalog() {
  statusEl.textContent = "Opening the DummyJSON catalog…";
  resultsEl.innerHTML = `<div class="empty">Indexing the desk<span class="cursor"></span></div>`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Bad response");
    const data = await response.json();
    catalog = Array.isArray(data.quotes) ? data.quotes : [];
    statusEl.textContent = `${catalog.length} quotes in the drawer. Search or press a mood code.`;
    renderResults([], "");
    resultsEl.innerHTML = `<div class="empty">The page is blank until you file a search.<span class="cursor"></span></div>`;
  } catch (error) {
    catalog = [];
    statusEl.textContent = "DummyJSON did not answer. Check the network, then reload.";
    resultsEl.innerHTML = `<div class="empty">The archives are locked.</div>`;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  search();
});

moodRow.addEventListener("click", (event) => {
  const chip = event.target.closest(".mood-chip");
  if (!chip) return;

  const mood = MOODS.find((item) => item.code === chip.dataset.code);
  activeMood = activeMood?.code === mood.code ? null : mood;
  renderMoods();
  search();
});

resultsEl.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy]");
  if (!button) return;
  const text = decodeURIComponent(button.dataset.copy);
  let copied = false;
  try {
    await navigator.clipboard.writeText(text);
    copied = true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    copied = document.execCommand("copy");
    area.remove();
  }
  button.textContent = copied ? "Stamped to clipboard" : "Copy failed";
  setTimeout(() => {
    button.textContent = "Copy department card";
  }, 1400);
});

renderMoods();
loadCatalog();
