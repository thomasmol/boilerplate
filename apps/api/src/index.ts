import { OpenAPIHono } from '@hono/zod-openapi';
import { csrf } from 'hono/csrf';
import { logger } from 'hono/logger';
import { db } from '@boilerplate/db';
import { sql } from 'drizzle-orm';
import { prettyJSON } from 'hono/pretty-json';
import { requestId } from 'hono/request-id';
import { handleZodError } from '@lib/errors';
import { Scalar } from '@scalar/hono-api-reference';
import { exampleRoutes } from './example/example.routes';

const app = new OpenAPIHono({
	defaultHook: handleZodError
});

app.use(requestId());
app.use(logger());
app.use(prettyJSON());

app.use(csrf());

// Healthcheck
app.get('/healthcheck', async (c) => {
	try {
		await db.execute(sql`SELECT 1`);
		return c.json({
			status: 'ok'
		});
	} catch (error) {
		console.error('Healthcheck failed:', error);
		return c.json(
			{
				status: 'error'
			},
			{
				status: 500
			}
		);
	}
});

app.openAPIRegistry.registerComponent('securitySchemes', 'Bearer', {
	type: 'http',
	scheme: 'bearer'
});

app.doc('/openapi.json', (c) => ({
	openapi: '3.0.0',
	info: {
		version: '1.0.0',
		title: 'Boilerplate API'
	},
	servers: [
		{
			url: new URL(c.req.url).origin,
			description: 'Boilerplate API server'
		}
	]
}));

app.get('/reference', Scalar({ url: '/openapi.json', showDeveloperTools: 'never' }));

app.route('/examples', exampleRoutes);

export default {
	port: process.env.PORT || 3001,
	fetch: app.fetch
};
