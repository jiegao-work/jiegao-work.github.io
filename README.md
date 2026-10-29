# Jie Gao · Academic Homepage

Live website: https://jiegao-work.github.io/

A bilingual academic website with research areas, publications, projects, education, honors, academic service, and a printable CV.

## Editing

- `index.html`: homepage, biography, metadata, and bilingual static text
- `docs/profile.js`: publications, education, projects, awards, software, and presentations
- `docs/style.css`: responsive and print layout
- `docs/app.js`: language switching, paper filters, search, and browser interactions
- `docs/assets/`: optimized portrait and favicon

The existing GitHub Pages configuration publishes the root of `main`. `.nojekyll` serves the files directly without a build step. Changes on `main` publish automatically after the Pages build succeeds.

The academic CV is available at `?view=cv`. The website uses relative local assets and system fonts; it requires no ChatGPT account or external JavaScript libraries.
