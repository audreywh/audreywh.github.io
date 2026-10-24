# Audrey Horn — personal website

A static site with no build step: plain HTML, CSS, and a little JavaScript. It runs on GitHub Pages as is.

## Structure

```
index.html            Home page with the Bloch sphere
about.html            Bio, education, skills
experience.html       Experience list (generated from data.js)
projects.html         Project list (generated from data.js)
contact.html          Email, LinkedIn, GitHub
experience/*.html     One detail page per experience
projects/*.html       One detail page per project
entry-template.html   Starting point for new detail pages
404.html              Shown for broken links
assets/
  css/style.css       All styles (colors and fonts are at the top)
  js/data.js          ALL CONTENT: links, experience, projects, skills
  js/site.js          Navigation, footer, lists, and detail-page wiring
  js/bloch.js         The home-page Bloch sphere
  img/                Favicon and your photos
  Audrey-Horn-Resume.pdf
```

## Common edits

**Update your resume PDF:** replace `assets/Audrey-Horn-Resume.pdf` and keep the same filename. If you change the name, also update `resumePdf` in `assets/js/data.js`.

**Add your GitHub link:** set `github: "https://github.com/your-username"` in `assets/js/data.js`. GitHub links stay hidden everywhere until it's set.

**Add an experience or project:**
1. In `assets/js/data.js`, copy an existing entry in `experience` or `projects` and edit it. Give it a unique `slug`, such as `"new-lab"`.
2. Copy `entry-template.html` to `experience/new-lab.html` (or `projects/new-lab.html`).
3. In the new file, replace the `{{…}}` placeholders. Set `data-page` to `experience` or `projects` and `data-entry` to the slug.
4. Add the page to `sitemap.xml`.

The list pages, facts sidebar, highlights, and previous/next links update on their own.

**Add photos:** put images in `assets/img/` and follow the comments in each detail page, or in `about.html` for your portrait. Aim for JPGs under ~300 KB.

**Change the accent color or fonts:** edit the variables at the top of `assets/css/style.css`.

## Preview locally

From this folder, run:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy to GitHub Pages

1. Create a GitHub account if you don't have one.
2. Create a new **public** repository named exactly `audreywh.github.io`, using your GitHub username. This gives you the clean address `https://audreywh.github.io`.
3. Upload the contents of this folder to the repository root. The `index.html` file must sit at the top level, not inside a subfolder. Either:
   - On GitHub, click **Add file → Upload files**, drag everything in, and commit; or
   - Use git:
     ```bash
     git init
     git add .
     git commit -m "Initial site"
     git branch -M main
     git remote add origin https://github.com/audreywh/audreywh.github.io.git
     git push -u origin main
     ```
4. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then branch `main` and folder `/ (root)`, and save.
5. After a minute or two, the site is live at `https://audreywh.github.io`.
6. Replace `audreywh` in `sitemap.xml` and `robots.txt` with your username.

The empty `.nojekyll` file tells GitHub Pages to serve the files as they are, so keep it.

**Custom domain (optional):** buy a domain, add it under **Settings → Pages → Custom domain**, and follow GitHub's DNS instructions. Then update the URLs in `sitemap.xml` and `robots.txt`.

## Privacy note

The resume PDF includes your phone number. If you'd rather not publish it, upload a version without it.
