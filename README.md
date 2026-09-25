# Resume Studio

A polished, local-first React resume builder with an original monochrome A4 template called **Axis**.

## Run locally

```bash
cd app
npm install
npm run dev
```

## Build for GitHub Pages

The React/Vite source is kept in `app/`. The repository root is reserved for the static files served by GitHub Pages.

On Windows, double-click `build-github-pages.bat`. It installs dependencies in `app/node_modules` when needed, builds the app, and synchronizes the generated `index.html`, `assets/`, and `.nojekyll` files into the repository root. Commit those generated root files together with your `app/` changes before pushing.

To build only the Vite project without synchronizing the Pages files:

```bash
cd app
npm run build
```

## Deploy to GitHub Pages

This setup targets the free GitHub Pages branch publisher. On GitHub Free, keep the repository **public** before publishing. Before the first deployment, push this repository to GitHub and open **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose branch **main**, and select the **/(root)** folder. GitHub will publish the project site at:

```text
https://<github-owner>.github.io/<repository-name>/
```

Vite is configured with a relative public base (`./`), so built JavaScript, CSS, and other assets load correctly from a repository subpath as well as from a custom domain. No paid service, workflow, or `gh-pages` branch is required.

## PDF output

Use **Download PDF** to create the file directly. The export uses a dedicated PDF document renderer rather than canvas or screenshot tooling, so exported resumes preserve selectable/searchable text and vector layout while flowing naturally across multiple A4 pages.

## Architecture

- `src/types/` contains the template-independent resume data model.
- `src/hooks/useResume.ts` owns immutable resume state and local-storage persistence.
- `src/components/editor/` contains focused form editors.
- `src/components/resume/` contains the data-only Axis renderer and independent resume sections.
- `src/components/pdf/` and `src/utils/downloadPdf.tsx` create the vector/text PDF export.

The app starts with polished, source-grounded details from the resume supplied during development. Resume data is saved only in this browser's local storage and can be reset through the confirmation dialog. Existing browser-local edits are preserved; only the untouched legacy fictional starter is upgraded automatically.
