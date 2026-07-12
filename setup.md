A hand-built, single-page portfolio for a UBC Computer Engineering student
(hardware / FPGA / ASIC / VLSI / computer architecture / embedded focus).
No frameworks, no build step, no npm install — it's just HTML, CSS, and a
small vanilla JS file, so it deploys to GitHub Pages as-is.

```
.
├── index.html                 ← the whole site (all sections)
├── 404.html                   ← themed not-found page
├── _config.yml                ← Jekyll site metadata (see note below)
├── assets/
│   ├── css/style.css          ← all styles + design tokens
│   ├── js/main.js             ← mobile nav, back-to-top, copy-email
│   ├── favicon.svg
│   └── resume/                ← put your resume.pdf here
└── README.md
```

## 1. Publish it (GitHub Pages)

1. Create a new GitHub repo.
   - If you want it at `https://<username>.github.io` directly, name the
     repo exactly `<username>.github.io`.
   - Any other repo name also works — it'll just publish at
     `https://<username>.github.io/<repo-name>/` instead (see the
     `baseurl` note in `_config.yml` if you go this route).
2. Push these files to the repo's default branch (`main`):
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source** →
   select **Deploy from a branch**, branch **main**, folder **/ (root)**
   → **Save**.
4. Wait about a minute, then visit the URL GitHub shows on that same page.

That's it — no build step required. GitHub Pages runs everything through
Jekyll by default, but `index.html` has no front matter, so Jekyll just
publishes it untouched. `_config.yml` is there only to set the site title/
description and isn't selecting a Jekyll theme — the entire look is custom
CSS in `assets/css/style.css`, which gives far more control than any of
the stock GitHub Pages themes.

## 2. Customize it

Everything below is a placeholder. Search the files for these and replace:

- [ ] **Name** — swap every `Your Name` in `index.html` (title tag, hero,
      footer) and the `[YN]` initials in the nav brand mark.
- [ ] **Contact links** — `your.email@ubc.ca`, the GitHub URL, and the
      LinkedIn URL appear in the hero, contact section, and footer.
- [ ] **Résumé** — export a PDF and save it as `assets/resume/resume.pdf`
      (see `assets/resume/ADD_YOUR_RESUME_HERE.txt` for details). The nav
      button, hero button, and the embedded preview all point here already.
- [ ] **About** — rewrite the three paragraphs in the About section with
      your real focus areas, interests, and current year/grad date.
- [ ] **Skills** — edit the tag lists per category to match your actual
      toolset.
- [ ] **Projects** — replace the six example project cards with your own
      (title, one-line description, tags, and the GitHub link on each
      card's `<a href="#">`).
- [ ] **Experience** — edit or remove timeline entries; add your real
      dates, employers, and bullet points.
- [ ] **Education** — update expected graduation date and course list.
- [ ] **Meta tags** — update `<title>`, the `description` meta tag, and
      the `og:url` in `index.html`'s `<head>`, plus `url` in `_config.yml`.
- [ ] **Favicon** — the current one is a generic chip icon
      (`assets/favicon.svg`) and works fine as-is if you'd rather not
      touch it.

## 3. Preview locally before you push

Opening `index.html` directly in a browser mostly works, but the résumé
preview check in `main.js` uses `fetch()`, which some browsers block on
`file://` URLs. Serve it locally instead:

```bash
# from the project folder
python3 -m http.server 8000
# then open http://localhost:8000
```

(Or use the VS Code "Live Server" extension — same effect.)

## 4. Optional: custom domain

If you buy a domain later, add a file named `CNAME` at the repo root
containing just the domain (e.g. `yourname.dev`), and point your DNS at
GitHub Pages per
[GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Design notes

- **Type:** IBM Plex Mono (structure/labels/numerals) + IBM Plex Sans
  (body) — loaded from Google Fonts in `index.html`.
- **Color:** near-black background, one interactive accent (amber, styled
  as a "status LED"), and a muted blue used only inside the hero graphic
  and as quiet secondary highlights. All defined as CSS variables at the
  top of `style.css` if you want to retheme.
- **The one animation:** the hero background is an SVG of orthogonal PCB
  traces with small pulses traveling along them (pure CSS, no JS, no
  canvas). It respects `prefers-reduced-motion` and fades out toward the
  bottom of the hero so it never fights with the text.
