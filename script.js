/* =========================================================
   SALINI J — PORTFOLIO SCRIPT
   Handles: mobile nav, theme toggle + persistence, scroll
   reveal, scroll-to-top button, and the contact form submit.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Mobile navigation ---------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  const closeMenu = () => {
    hamburger.classList.remove("is-open");
    navLinks.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open menu");
  };

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    hamburger.classList.toggle("is-open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  /* ---------- Theme toggle (persisted, respects system pref initially) ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const STORAGE_KEY = "portfolio-theme";

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      themeToggle.setAttribute("aria-pressed", "true");
      themeToggle.setAttribute("aria-label", "Switch to light theme");
    } else {
      root.removeAttribute("data-theme");
      themeToggle.setAttribute("aria-pressed", "false");
      themeToggle.setAttribute("aria-label", "Switch to dark theme");
    }
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    applyTheme(stored);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  themeToggle.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Scroll-to-top button ---------- */
  const toTop = document.getElementById("toTop");
  window.addEventListener("scroll", () => {
    toTop.classList.toggle("is-visible", window.scrollY > 480);
  });
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Contact form ---------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");
  const endpointField = document.getElementById("formEndpoint");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const endpoint = endpointField.value.trim();
    if (!endpoint || endpoint.includes("YOUR_FORM_ENDPOINT")) {
      status.dataset.state = "error";
      status.textContent =
        "Contact form isn't configured yet — add your Formspree endpoint in index.html (see README.md).";
      return;
    }

    status.dataset.state = "sending";
    status.textContent = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        status.dataset.state = "success";
        status.textContent = "Message sent — thank you! I'll get back to you soon.";
        form.reset();
      } else {
        const data = await response.json().catch(() => null);
        const detail = data && data.errors ? data.errors.map((x) => x.message).join(", ") : "";
        status.dataset.state = "error";
        status.textContent = detail
          ? `Something went wrong: ${detail}`
          : "Something went wrong sending your message. Please try emailing me directly.";
      }
    } catch (err) {
      status.dataset.state = "error";
      status.textContent =
        "Network error — please check your connection or email me directly instead.";
    } finally {
      submitBtn.disabled = false;
    }
  });
});
