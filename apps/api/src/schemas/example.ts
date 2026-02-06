import { z } from '@hono/zod-openapi';

export const exampleSchema = z
	.object({
		id: z.string(),
		name: z.string().min(2).max(100),
		description: z.string()
	})
	.openapi('Example');
