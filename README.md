# Boilerplate Mono repo

This is a monorepo for a full-stack project. This repo should serve as a starting point for you next project. It should be able to handle any type of project, web, mobile, desktop, etc, because services are separated into packages and apps.

## Apps

`apps/app` is a SvelteKit app that is used to serve the frontend for your webapp.


`apps/api` is a Hono based server for a public API for your users.

## Packages

`packages/api` is an better-auth package to create an auth config.

`packages/db` is a package that is used to interact with your database. It is based on Drizzle ORM. It handles schema definitions, migrations, and connections to your database.

Add any other packages that you need for your project.
