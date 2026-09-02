const VIEWS_KEY = "idom-dev-portfolio-site-views";

async function loadViews() {
  const el = document.getElementById("viewsCount");
  try {
    const res = await fetch(`https://countapi.mileshilliard.com/api/v1/hit/${VIEWS_KEY}`);
    const data = await res.json();
    el.textContent = data.value;
  } catch (err) {
    el.textContent = "N/A";
  }
}

document.addEventListener("DOMContentLoaded", loadViews);
