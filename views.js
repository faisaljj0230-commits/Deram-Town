// Simple public visit counter using CountAPI (no login, no personal data).
// Every page load counts as one new view.
const VIEWS_NAMESPACE = "idom-portfolio";
const VIEWS_KEY = "site-views";

async function loadViews() {
  const el = document.getElementById("viewsCount");
  try {
    const res = await fetch(`https://api.countapi.xyz/hit/${VIEWS_NAMESPACE}/${VIEWS_KEY}`);
    const data = await res.json();
    el.textContent = data.value;
  } catch (err) {
    el.textContent = "N/A";
  }
}

document.addEventListener("DOMContentLoaded", loadViews);
