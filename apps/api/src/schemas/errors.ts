import { z } from '@hono/zod-openapi';

export const badRequestSchema = z
	.object({
		requestId: z.uuid(),
		message: z.string(),
		errors: z.array(
			z.object({
				message: z.string(),
				field: z.string()
			})
		)
	})
	.openapi('BadRequest');

export const unauthorizedSchema = z
	.object({
		requestId: z.uuid(),
		message: z.string()
	})
	.openapi('Unauthorized');

export const paymentRequiredSchema = z
	.object({
		requestId: z.uuid(),
		message: z.string()
	})
	.openapi('PaymentRequired');

export const rateLimitedSchema = z
	.object({
		requestId: z.uuid(),
		message: z.string()
	})
	.openapi('RateLimited');

export const notFoundSchema = z
	.object({
		requestId: z.string(),
		message: z.string()
	})
	.openapi('NotFound');

export const internalServerErrorSchema = z
	.object({
		requestId: z.uuid(),
		message: z.string()
	})
	.openapi('InternalServerError');
