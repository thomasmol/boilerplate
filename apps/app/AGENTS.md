# Frontend

SvelteKit frontend with Tailwind CSS and a Bun server.

## Structure

- `src/routes`: pages, layouts, and route styles
- `src/lib`: shared frontend code and assets
- `static`: public files
- `vite.config.ts`: SvelteKit, adapter, and Tailwind configuration

## Rules

- Use Svelte 5 runes for new components.
- Use `$derived` for computed values. Reserve effects for external side effects.
- Use the Svelte MCP documentation and autofixer for Svelte component changes when available.
- Use `#lib` imports, declared in this app's `package.json`.
- Keep private environment variables, authentication configuration, and database imports in server-only modules.
- Do not put mutable state shared between users in server module globals.
- Reuse Tailwind and existing route styles. Keep component styles local when they are specific to one component.

## Commands

From the repository root, use `bun run app:dev` for development, `bun run app:build` for builds, and `bun run app:start` to start the built Bun server. `bun run check` includes Svelte checks.

The build output is `build`. Set `PORT` for the production server; its default is 3000.
