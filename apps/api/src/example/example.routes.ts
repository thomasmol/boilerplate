import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { z } from '@hono/zod-openapi';
import { handleZodError, errorResponses } from '@lib/errors';
import { exampleSchema } from '@schemas/example';
import { getExample } from './example.service';

const app = new OpenAPIHono({
	defaultHook: handleZodError
});

const getExampleRoute = createRoute({
	method: 'get',
	path: '/:id',
	tags: ['Files'],
	description: 'Get a file by id',
	security: [{ Bearer: [] }],
	request: {
		params: z.object({
			id: z.string().openapi({ description: 'Example id' })
		})
	},
	responses: {
		200: {
			description: 'File details',
			content: {
				'application/json': {
					schema: exampleSchema
				}
			}
		},
		...errorResponses
	}
});

app.openapi(getExampleRoute, async (c) => {
	const { id } = c.req.valid('param');
	console.log(id);
	const example = await getExample();

	if (!example) {
		throw new HTTPException(404, { message: 'File not found' });
	}

	return c.json(example, 200);
});

export { app as exampleRoutes };
