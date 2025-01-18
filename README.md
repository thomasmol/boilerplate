# boilerplate (not ready for production yet)

This is a monorepo for a full-stack project. It is not ready for production yet. This repo should serve as a starting point for you next project. It should be able to handle any type of project, web, mobile, desktop, etc, because services are separated into packages and apps.

## Apps

`apps/app` is a SvelteKit app that is used to serve the frontend for your webapp.

`apps/auth` is an OpenAuth.js.org based server that is used to authenticate users. Very customizable but in beta. It simply exposes an OAuth2 server that you can use to authenticate users from any type of client, like browser, mobile, desktop, terminal, etc.

`apps/www` is a SvelteKit app, similar to `app`, but it is used to serve the frontend for your marketing/landing page website. Of course you can combine it with `app` if you want to serve the same frontend for your webapp and marketing/landing page website.

## Packages

`packages/api` is a Hono server that is used to serve the backend for your webapp. It should be used as an internal API for your webapp and not exposed to the public web. If you want to expose an API for users, you should create a new app in e.g. `apps/api`.

`packages/db` is a package that is used to interact with your database. It is based on Drizzle ORM. It handles schema definitions, migrations, and connections to your database.

Add any other packages that you need for your project.

