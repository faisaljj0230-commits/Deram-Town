/* ===== Dream Town — Language Engine ===== */
(function () {
  var STORAGE_KEY = 'dt-lang';
  var VALID = ['en', 'ar'];

  function getLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    return VALID.indexOf(saved) !== -1 ? saved : 'en'; // default = English
  }

  function setLang(lang) {
    if (VALID.indexOf(lang) === -1) lang = 'en';
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
  }

  function applyLang(lang) {
    var html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // plain text swap
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var val = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (val !== null) el.textContent = val;
    });

    // inner-HTML swap (for text containing links, bold, etc.)
    document.querySelectorAll('[data-en-html]').forEach(function (el) {
      var val = lang === 'ar' ? el.getAttribute('data-ar-html') : el.getAttribute('data-en-html');
      if (val !== null) el.innerHTML = val;
    });

    // placeholder swap (inputs)
    document.querySelectorAll('[data-en-placeholder]').forEach(function (el) {
      var val = lang === 'ar' ? el.getAttribute('data-ar-placeholder') : el.getAttribute('data-en-placeholder');
      if (val !== null) el.setAttribute('placeholder', val);
    });

    // page <title>
    if (html.hasAttribute('data-title-en')) {
      document.title = lang === 'ar' ? html.getAttribute('data-title-ar') : html.getAttribute('data-title-en');
    }

    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.setAttribute('data-current-lang', lang);
      btn.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    });
  }

  // Apply immediately (before DOMContentLoaded) to avoid a flash of the wrong language/direction.
  applyLang(getLang());

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(getLang()); // re-apply once the full DOM (incl. late elements) exists

    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        setLang(getLang() === 'ar' ? 'en' : 'ar');
      });
    });
  });
})();
