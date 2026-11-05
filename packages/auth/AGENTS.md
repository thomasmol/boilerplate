# Authentication

Shared Better Auth server configuration backed by Drizzle and PostgreSQL.

## Structure

- `index.ts`: auth instance, database adapter, and organization plugin
- `../db/schema.ts`: authentication tables

## Rules

- Keep shared authentication configuration in this package.
- Reuse the database instance from `@boilerplate/db`.
- Keep enabled plugins and the database schema consistent.
- Treat this package as server-only. Do not import its auth instance into browser code.
- Apps own HTTP handlers and session enforcement. Do not add app-specific route handling here.

## Commands

Generate `BETTER_AUTH_SECRET` and copy the output into `.env`:

```sh
openssl rand -base64 32
```

`bun run check` from the repository root includes this package.
