const VIEWS_KEY = "idom-dev-portfolio-site-views";
const VISITED_FLAG = "idom_has_visited";
const VIEWS_OFFSET = 9;

async function loadViews() {
  const el = document.getElementById("viewsCount");
  const alreadyVisited = localStorage.getItem(VISITED_FLAG);

  try {
    const endpoint = alreadyVisited
      ? `https://countapi.mileshilliard.com/api/v1/get/${VIEWS_KEY}`
      : `https://countapi.mileshilliard.com/api/v1/hit/${VIEWS_KEY}`;

    const res = await fetch(endpoint);
    const data = await res.json();
    const rawCount = Number(data.value) || 0;
    el.textContent = rawCount + VIEWS_OFFSET;

    if (!alreadyVisited) {
      localStorage.setItem(VISITED_FLAG, "1");
    }
  } catch (err) {
    el.textContent = "N/A";
  }
}

document.addEventListener("DOMContentLoaded", loadViews);
