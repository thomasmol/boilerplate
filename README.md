# Boilerplate monorepo

A starting point for developers building full-stack applications. It includes a web app, an API, and shared packages for authentication and database access.

Use it to start a new project with a reusable structure and shared tooling. Apps and packages stay separate while dependencies and development commands are managed in one repository.

## Setup

Requires Bun 1.4+ and Docker Compose.

For a new checkout, run from the repository root:

```sh
bun install
cp .env.example .env
```

Configure `.env` using the workspace instructions below.

## Commands

Run commands from the repository root:

- `bun run infra`: start local services
- `bun run infra:down`: stop local services
- `bun run check`: run workspace type checks
- `bun run lint`: lint source
- `bun run lint:fix`: apply lint fixes
- `bun run format`: format files
- `bun run format:check`: inspect formatting

## Workspaces

- [apps/app](apps/app/AGENTS.md)
- [apps/api](apps/api/AGENTS.md)
- [packages/auth](packages/auth/AGENTS.md)
- [packages/db](packages/db/AGENTS.md)
