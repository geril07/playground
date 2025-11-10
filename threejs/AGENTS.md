# AGENTS.md

Purpose
- This folder is a Three.js playground within the larger `playground` repo.
- We use Vite + TypeScript; scope is strictly this directory.

Project Structure
- `src/`: All TypeScript source files live here.
- `index.html`: App entry; loads `src/main.ts` via Vite.
- `public/`: Static assets, if needed.

Working Guidelines
- Keep examples small and focused; clarity over cleverness.
- Prefer one feature per file/module (e.g., `spinning-cube-gallery.ts`).
- Prefer local npm packages over remote ESM URLs.
- If you add dependencies, note any run instructions in a brief header comment.

Conventions
- Name example modules descriptively (e.g., `model-viewer.ts`, `particle-fountain.ts`).
- Keep any example-specific assets near the module or under `public/`.
- Add brief inline comments when behavior isn’t obvious.

Notes for Agents
- Do not modify files outside this directory.
- Use TypeScript in `src/`; HTML can be minimal.
- If importing external ESM URLs, add a lightweight `// @ts-ignore` or a `declare module` for types.
