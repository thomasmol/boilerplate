import { z } from '@hono/zod-openapi';

export const paginationQuerySchema = z.object({
	limit: z.coerce.number().min(1).max(100).default(10).openapi({
		description: 'Number of items to return',
		example: 10
	}),
	cursor: z.string().optional().openapi({
		description: 'Cursor for pagination (file id)'
	})
});

export const paginationMetaSchema = z
	.object({
		hasMore: z.boolean(),
		nextCursor: z.string().nullable()
	})
	.openapi('Pagination');

export function createExpandSchema<T extends readonly string[]>(expandable: T) {
	return z
		.string()
		.optional()
		.transform(
			(s) =>
				(s ? s.split(',').filter((v): v is T[number] => expandable.includes(v)) : []) as T[number][]
		)
		.openapi({
			description: `Comma-separated list of relations to expand. Options: ${expandable.join(', ')}`,
			example: expandable[0]
		});
}

export function createListResponseSchema<T extends z.ZodTypeAny>(itemSchema: T, name: string) {
	return z
		.object({
			items: z.array(itemSchema),
			...paginationMetaSchema.shape
		})
		.openapi(name);
}
