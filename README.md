# Resume Studio

A polished, local-first React resume builder with an original monochrome A4 template called **Axis**.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Deploy to GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`. It builds the Vite app and deploys the generated `dist/` artifact whenever a commit reaches `main`; it can also be run manually from the **Actions** tab.

On Windows, double-click `build-github-pages.bat` to create the same production-ready `dist/` folder locally. It installs dependencies automatically when `node_modules` is missing, then runs the production build.

This setup is compatible with the free GitHub Pages tier. On GitHub Free, keep the repository **public** before publishing. Before the first deployment, push this repository to GitHub and open **Settings → Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**. GitHub will publish the project site at:

```text
https://<github-owner>.github.io/<repository-name>/
```

Vite is configured with a relative public base (`./`), so built JavaScript, CSS, and other assets load correctly from a repository subpath as well as from a custom domain. No paid service, `gh-pages` branch, or committed build output is required.

## PDF output

Use **Download PDF** to create the file directly. The export uses a dedicated PDF document renderer rather than canvas or screenshot tooling, so exported resumes preserve selectable/searchable text and vector layout while flowing naturally across multiple A4 pages.

## Architecture

- `src/types/` contains the template-independent resume data model.
- `src/hooks/useResume.ts` owns immutable resume state and local-storage persistence.
- `src/components/editor/` contains focused form editors.
- `src/components/resume/` contains the data-only Axis renderer and independent resume sections.
- `src/components/pdf/` and `src/utils/downloadPdf.tsx` create the vector/text PDF export.

The app starts with polished, source-grounded details from the resume supplied during development. Resume data is saved only in this browser's local storage and can be reset through the confirmation dialog. Existing browser-local edits are preserved; only the untouched legacy fictional starter is upgraded automatically.
