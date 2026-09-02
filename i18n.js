const SUPPORTED_LANGS = ["ar", "en", "tr", "es", "de"];
const RTL_LANGS = ["ar"];

let translations = {};
let currentLang = "ar";

async function loadLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = "ar";
  const res = await fetch(`${lang}.json`);
  translations = await res.json();
  currentLang = lang;
  applyTranslations();
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
  document.getElementById("langCurrentFlag").textContent = flagFor(lang);
  localStorage.setItem("idom_lang", lang);
}

function flagFor(lang) {
  const flags = { ar: "🇸🇦", en: "🇬🇧", tr: "🇹🇷", es: "🇪🇸", de: "🇩🇪" };
  return flags[lang] || "🌐";
}

function getPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = getPath(translations, key);
    if (value) el.textContent = value;
  });
}

function initLang() {
  const saved = localStorage.getItem("idom_lang");
  const browserLang = (navigator.language || "ar").slice(0, 2);
  const initial = saved || (SUPPORTED_LANGS.includes(browserLang) ? browserLang : "ar");
  loadLang(initial);
}
