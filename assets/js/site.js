/*
  Shared page behavior: navigation, footer, contact links, and the
  lists and detail pages that are generated from data.js.
  You shouldn't need to edit this file to change content.
*/
(function () {
  const S = window.SITE;
  const body = document.body;
  const root = body.dataset.root || "";
  const page = body.dataset.page || "";
  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const when = e => e.dates !== undefined ? e.dates : `${e.start} – ${e.end}`;

  /* ---------- navigation + footer ---------- */
  // The Resume tab opens the PDF in a new tab instead of a page.
  const NAV = [["about", "About"], ["experience", "Experience"], ["projects", "Projects"], ["resume", "Resume"], ["contact", "Contact"]];
  const navLink = (k, l) => k === "resume"
    ? `<a href="${root}${S.resumePdf}" target="_blank" rel="noopener">${l} ↗</a>`
    : `<a href="${root}${k}.html"${k === page ? ' aria-current="page"' : ""}>${l}</a>`;
  const nav = $("#site-nav");
  if (nav) {
    nav.className = "site-nav";
    nav.innerHTML = `<div class="wrap">
      <a class="brand" href="${root}index.html">${esc(S.name)}</a>
      <button class="menu-btn" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <ul>${NAV.map(([k, l]) => `<li>${navLink(k, l)}</li>`).join("")}</ul>
    </div>`;
    const btn = $(".menu-btn", nav);
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
  }
  const foot = $("#site-footer");
  if (foot) {
    foot.className = "site-footer";
    foot.innerHTML = `<div class="wrap">
      <span>© ${new Date().getFullYear()} ${esc(S.name)} · Updated ${esc(S.updated)}</span>
      <span class="links"><a data-link="email">Email</a><a data-link="linkedin">LinkedIn</a><a data-link="github">GitHub</a><a data-link="resume">Resume</a></span>
    </div>`;
  }

  /* ---------- contact links (any element with data-link) ---------- */
  const LINKS = {
    email: S.email && "mailto:" + S.email,
    linkedin: S.linkedin,
    github: S.github,
    resume: S.resumePdf && root + S.resumePdf
  };
  document.querySelectorAll("[data-link]").forEach(a => {
    const href = LINKS[a.dataset.link];
    if (!href) { (a.closest("li") || a).remove(); return; }
    a.href = href;
    if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
  });
  document.querySelectorAll("[data-text]").forEach(el => {
    const k = el.dataset.text;
    el.textContent = k === "email" ? S.email : k === "linkedin" ? S.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : k === "github" ? (S.github || "").replace(/^https?:\/\//, "") : "";
  });

  /* ---------- index lists ---------- */
  const row = (e, folder) => `<li class="row"><a href="${root}${folder}/${e.slug}.html">
      <span class="when">${esc(when(e) || e.context)}</span>
      <span class="what"><b>${esc(e.role || e.title)}</b>${e.role ? `<span>${esc(e.title)}</span>` : ""}${e.summary ? `<small>${esc(e.summary)}</small>` : ""}
      ${folder === "projects" ? `<span class="tags">${e.tools.map(t => `<span>${esc(t)}</span>`).join("")}</span>` : ""}</span>
      <span class="arrow" aria-hidden="true">→</span></a></li>`;
  const startKey = e => { const d = Date.parse("1 " + e.start); return isNaN(d) ? 0 : d; };

  const expList = $("#experience-list");
  if (expList) {
    expList.innerHTML = S.categories.map(cat => {
      const items = S.experience.filter(e => e.category === cat).sort((a, b) => startKey(b) - startKey(a));
      return items.length ? `<h2 class="group-title">${esc(cat)}</h2><ul class="rows">${items.map(e => row(e, "experience")).join("")}</ul>` : "";
    }).join("");
  }
  const projList = $("#project-list");
  if (projList) {
    projList.innerHTML = `<ul class="rows" style="margin-top:36px">${[...S.projects].sort((a, b) => a.order - b.order).map(e => row(e, "projects")).join("")}</ul>`;
  }

  /* ---------- detail pages ---------- */
  const slug = body.dataset.entry;
  if (slug) {
    const isProj = page === "projects";
    const list = isProj ? [...S.projects].sort((a, b) => a.order - b.order) : [...S.experience].sort((a, b) => a.order - b.order);
    const i = list.findIndex(e => e.slug === slug), e = list[i];
    if (e) {
      document.title = `${e.title} · ${S.name}`;
      $("#entry-head").innerHTML = `<a class="crumb" href="${root}${isProj ? "projects" : "experience"}.html"><b>←</b> ${isProj ? "Projects" : "Experience / " + esc(e.category)}</a>
        <h1>${esc(e.title)}</h1><p class="entry-sub">${esc(e.role || e.context)}</p>`;
      const facts = [
        [isProj ? "Context" : "Role", isProj ? e.context : e.role],
        ["Dates", when(e)],
        [isProj ? "" : "Location", e.location],
        ["Tools", e.tools && e.tools.join(", ")],
        ["Result", e.result]
      ].filter(([k, v]) => k && v);
      $("#entry-facts").innerHTML = facts.map(([k, v]) => `<div><span>${k}</span>${esc(v)}</div>`).join("");
      const b = $("[data-bullets]");
      if (b) b.innerHTML = `<ul>${e.bullets.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
      const prev = list[(i - 1 + list.length) % list.length], next = list[(i + 1) % list.length];
      const pn = $("#entry-pn");
      if (pn && list.length > 1) pn.innerHTML = `<a href="${prev.slug}.html"><small>Previous</small>← ${esc(prev.title)}</a><a href="${next.slug}.html" style="text-align:right"><small>Next</small>${esc(next.title)} →</a>`;
    }
  }

  /* ---------- about page ---------- */
  const cw = $("#coursework");
  if (cw) cw.textContent = S.education.coursework.join(" · ");
  const sk = $("#skills");
  if (sk) sk.innerHTML = S.skills.map(s => `<div><dt>${esc(s.group)}</dt><dd>${esc(s.items)}</dd></div>`).join("");
})();
