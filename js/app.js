(() => {
  "use strict";

  const DATA = window.WORKS_DATA;
  if (!DATA) {
    console.error("WORKS_DATA 未加载");
    return;
  }

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.documentElement.classList.add("js");

  const revealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.05, rootMargin: "0px 0px -30px 0px" })
    : null;

  function observeReveals(root = document) {
    const nodes = root.querySelectorAll("[data-reveal]:not(.is-visible)");
    if (!revealObserver) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    nodes.forEach((node) => revealObserver.observe(node));
  }

  const ESC_MAP = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (ch) => ESC_MAP[ch]);

  const ACCENTS = {
    ink: "var(--ink)",
    coral: "var(--accent)",
    sage: "var(--sage)",
    blue: "var(--blue)",
    mustard: "var(--mustard)",
  };

  function siteHTML(site, index) {
    return `
      <a class="site-card" href="${esc(site.url)}" target="_blank" rel="noopener"
        data-reveal style="--i:${index}; --card-accent:${ACCENTS[site.accent] || ACCENTS.ink}">
        <span class="site-card__top">
          <span class="site-card__no">${esc(site.no)}</span>
          <span class="site-card__tag">${esc(site.tag)}</span>
        </span>
        <h3>${esc(site.name)}</h3>
        <p class="site-card__en">${esc(site.en)}</p>
        <p class="site-card__desc">${esc(site.desc)}</p>
        <span class="site-card__open">打开</span>
      </a>`;
  }

  function projectHTML(project, index) {
    return `
      <a class="project-row" href="${esc(project.url)}" target="_blank" rel="noopener"
        data-reveal style="--i:${index}">
        <span class="project-row__no">${String(index + 1).padStart(2, "0")}</span>
        <span class="project-row__name"><strong>${esc(project.name)}</strong><span>${esc(project.desc)}</span></span>
        <span class="project-row__lang">${esc(project.lang)}</span>
        <span class="project-row__arrow" aria-hidden="true">↗</span>
      </a>`;
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function contribHTML(days) {
    if (!days.length) return "";
    const first = new Date(days[0].d + "T00:00:00Z");
    const leading = first.getUTCDay(); // Sunday = 0
    const cells = Array.from({ length: leading }, () => null).concat(days);
    while (cells.length % 7 !== 0) cells.push(null);

    const weeks = [];
    for (let index = 0; index < cells.length; index += 7) weeks.push(cells.slice(index, index + 7));

    return weeks.map((week) => `
      <div class="contrib__week">
        ${week.map((day) => {
          if (!day) return `<span class="contrib__cell is-empty"></span>`;
          const label = `${day.d} · ${day.c} contributions`;
          const level = Math.max(0, Math.min(4, Number(day.l) || 0));
          return `<span class="contrib__cell lvl-${level}" title="${esc(label)}" aria-label="${esc(label)}"></span>`;
        }).join("")}
      </div>`).join("");
  }

  function formatMonth(dateText) {
    const date = new Date(dateText + "T00:00:00Z");
    return `${date.getUTCFullYear()}.${pad(date.getUTCMonth() + 1)}`;
  }

  function initProfile() {
    $$("[data-github]").forEach((element) => {
      const value = DATA.profile[element.dataset.github];
      if (value !== undefined) element.textContent = value;
    });

    const grid = $("#contrib-grid");
    if (grid) {
      grid.innerHTML = contribHTML(DATA.calendar.days);
      const range = $("#contrib-range");
      if (range) range.textContent = `${formatMonth(DATA.calendar.start)} — ${formatMonth(DATA.calendar.end)}`;
    }
  }

  function initLists() {
    const sites = $("#site-list");
    const projects = $("#project-list");
    if (sites) sites.innerHTML = DATA.sites.map(siteHTML).join("");
    if (projects) projects.innerHTML = DATA.projects.map(projectHTML).join("");
    observeReveals(sites || document);
    observeReveals(projects || document);
  }

  function initTop() {
    const top = $("#to-top");
    if (!top) return;
    window.addEventListener("scroll", () => {
      top.classList.toggle("is-visible", window.scrollY > 700);
    }, { passive: true });
    top.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
    });
  }

  initProfile();
  initLists();
  observeReveals(document);
  initTop();

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
