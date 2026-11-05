# API

Hono OpenAPI service running on Bun. Uses Zod, Scalar, and the shared authentication and database packages.

## Structure

- `src/index.ts`: server, shared middleware, health endpoint, and API documentation
- `src/hc.ts`: typed Hono client exported as `@boilerplate/api/hc`
- `src/example`: example route and service
- `src/schemas`: request, response, and error schemas
- `src/lib/errors.ts`: shared validation and HTTP errors

## Rules

- Define API operations with `OpenAPIHono` and `createRoute`.
- Keep request and response handling in route files and business operations in service files.
- Validate input with route schemas and read it with `c.req.valid(...)`.
- Reuse `handleZodError`, shared error responses, `HTTPException`, and request IDs.
- Import shared authentication and database code from their workspace packages.
- Add authentication middleware to protected routes.
- Preserve route types by exporting the result of route registration. Keep server imports in the client module type-only.

## Commands

Use `bun run api:dev` from the repository root. `bun run check` includes this app.

The server uses port 3001 unless `PORT` overrides it. Endpoints include `/healthcheck`, `/openapi.json`, and `/reference`.
