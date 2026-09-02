document.addEventListener("DOMContentLoaded", () => {
  initLang();

  // Navbar visual state on scroll
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("mobile-open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.matches("a")) {
      navLinks.classList.remove("mobile-open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  const langToggle = document.getElementById("langToggle");
  const langMenu = document.getElementById("langMenu");

  langToggle.addEventListener("click", () => {
    const isOpen = langMenu.classList.toggle("open");
    langToggle.setAttribute("aria-expanded", String(isOpen));
  });

  langMenu.addEventListener("click", (e) => {
    const item = e.target.closest("[data-lang]");
    if (!item) return;
    loadLang(item.getAttribute("data-lang"));
    langMenu.classList.remove("open");
    langToggle.setAttribute("aria-expanded", "false");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("#langSelect")) {
      langMenu.classList.remove("open");
    }
  });

  document.getElementById("avatarBtn").addEventListener("click", () => {
    window.location.reload();
  });

  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
});
