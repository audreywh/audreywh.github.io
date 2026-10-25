# Audrey Horn — portfolio

A static site in plain HTML, CSS, and JavaScript, with no build step. It runs on GitHub Pages as is.

## Layout

- **Sidebar** (every page): the dotted grand-piano emblem, name, program, status line, section links, icons (email, LinkedIn, GitHub, resume), and email address.
- **Home:** intro, Experience and Projects lists (each row opens a detail page), and the Chladni plate panel.
- **Detail pages:** the same sidebar, plus the write-up for one experience or project.

## Files

```
index.html            Home page
experience/*.html     One detail page per experience
projects/*.html       One detail page per project
entry-template.html   Starting point for a new detail page
404.html              Shown for broken links
assets/
  css/style.css       All styles
  js/data.js          ALL LIST CONTENT: titles, roles, dates, summaries, tools, highlights
  js/site.js          Builds the lists and fills in detail pages from data.js
  js/emblem.js        The dotted piano in the sidebar
  js/chladni.js       The Chladni plate simulation
  img/                Figures for detail pages
  Audrey-Horn-Resume.pdf
```

## Common edits

- **Intro or "Other interests":** edit `index.html` (the `lede` and `interests` paragraphs).
- **Status line, links, or email in the sidebar:** the sidebar block is between `<!-- SIDEBAR -->` and `<!-- /SIDEBAR -->`. It's repeated in every page, so change it in `index.html` and in each detail page. A find-and-replace across the folder works well.
- **Experience and projects:** edit `assets/js/data.js`. The home lists and detail pages update automatically.
- **A detail page's overview or figures:** edit that page's HTML in `experience/` or `projects/`.
- **New entry:** add a block to `data.js`, copy `entry-template.html` to `projects/<slug>.html` or `experience/<slug>.html`, and follow the note at its top. Then add the page to `sitemap.xml`.
- **Resume:** replace `assets/Audrey-Horn-Resume.pdf`, keeping the same filename.

## Accessibility

- A skip link, landmarks (aside, nav, main, footer), and one `h1` per page.
- Text meets WCAG AA contrast. Focus outlines are visible, and touch targets are comfortably sized.
- Icon links have text labels and say when they open a new tab.
- The emblem is decorative and only moves in response to the cursor.
- The Chladni plate has labeled note buttons, announces the current note and mode, describes its pattern in text, and has a Pause button. It stops animating while scrolled out of view.
- With "reduce motion" turned on, the plate jumps straight to each settled pattern instead of animating, and the emblem stays still.
- On phones, the sidebar becomes a compact header above the content.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Upload the **contents** of this folder to the root of the `audreywh.github.io` repository, replacing the old site's files. Delete files from the old site that aren't here anymore (`about.html`, `contact.html`, `experience.html`, `projects.html`, and `assets/js/bloch.js`). Pages redeploys automatically.
