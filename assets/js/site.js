/*
  Builds the experience and project lists and fills in detail pages
  from data.js. Edit data.js to change content, not this file.
*/
(function () {
  const S = window.SITE;
  const root = document.body.dataset.root || "";
  const $ = sel => document.querySelector(sel);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const dates = e => e.start ? `${e.start} – ${e.end}` : (e.dates || e.year || "");
  const yearSpan = e => e.start ? `${e.start.slice(-4)} – ${e.end === "Present" ? "now" : e.end.slice(-4)}` : (e.year || "");
  const startKey = e => { const d = Date.parse("1 " + e.start); return isNaN(d) ? 0 : d; };
  const projects = [...S.projects].sort((a, b) => a.order - b.order);
  const experience = [...S.experience].sort((a, b) => startKey(b) - startKey(a));

  const yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- home lists ---------- */
  const row = (href, year, title, sub, summary) => `<li><a class="it" href="${href}">
      <span class="y">${esc(year)}</span><span class="t">${esc(title)}${sub ? `, <span>${esc(sub)}</span>` : ""}</span><span class="s">${esc(summary)}</span></a></li>`;
  const el = $("#experience-list");
  if (el) el.innerHTML = experience.map(e => row(`${root}experience/${e.slug}.html`, yearSpan(e), e.role, e.title, e.summary)).join("");
  const pl = $("#projects-list");
  if (pl) pl.innerHTML = projects.map(p => row(`${root}projects/${p.slug}.html`, yearSpan(p), p.title, p.context, p.summary)).join("");

  /* ---------- detail pages ---------- */
  const slug = document.body.dataset.entry, kind = document.body.dataset.kind;
  if (!slug) return;
  const list = kind === "projects" ? projects : experience;
  const i = list.findIndex(e => e.slug === slug), e = list[i];
  if (!e) return;
  document.title = `${e.title} · ${S.name}`;
  $("#entry-title").textContent = e.title;
  $("#entry-role").textContent = kind === "projects" ? e.context : e.role;
  const facts = [
    ["Dates", dates(e)],
    ["Location", e.location],
    ["Tools", (e.tools || []).join(", ")],
    ["Result", e.result]
  ].filter(([, v]) => v);
  $("#entry-facts").innerHTML = facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("");
  $("#entry-bullets").innerHTML = e.bullets.map(b => `<li>${esc(b)}</li>`).join("");
  const prev = list[(i - 1 + list.length) % list.length], next = list[(i + 1) % list.length];
  if (list.length > 1) $("#entry-pn").innerHTML =
    `<a href="${prev.slug}.html"><small>Previous</small>← ${esc(prev.title)}</a>` +
    `<a href="${next.slug}.html" style="text-align:right"><small>Next</small>${esc(next.title)} →</a>`;
})();
