import { z } from 'zod';
import {
	badRequestSchema,
	internalServerErrorSchema,
	notFoundSchema,
	paymentRequiredSchema,
	rateLimitedSchema,
	unauthorizedSchema
} from '@schemas/errors';
import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

export const errorResponses = {
	400: {
		description: 'Validation failed',
		content: {
			'application/json': {
				schema: badRequestSchema
			}
		}
	},
	401: {
		description: 'Unauthorized',
		content: {
			'application/json': {
				schema: unauthorizedSchema
			}
		}
	},
	402: {
		description: 'Payment required',
		content: {
			'application/json': {
				schema: paymentRequiredSchema
			}
		}
	},
	404: {
		description: 'Not found',
		content: {
			'application/json': {
				schema: notFoundSchema
			}
		}
	},
	422: {
		description: 'Validation failed',
		content: {
			'application/json': {
				schema: badRequestSchema
			}
		}
	},
	429: {
		description: 'Rate limited',
		content: {
			'application/json': {
				schema: rateLimitedSchema
			}
		}
	},
	500: {
		description: 'Internal server error',
		content: {
			'application/json': {
				schema: internalServerErrorSchema
			}
		}
	}
};

export function handleError(err: Error, c: Context): Response {
	const requestId = c.get('requestId');
	// Handle HTTP Exceptions
	if (err instanceof HTTPException) {
		return c.json(
			{
				requestId,
				message: err.message
			},
			err.status
		);
	}

	// Handle Zod validation errors
	if (err instanceof z.ZodError) {
		return c.json(
			{
				requestId,
				message: 'Validation failed',
				errors: err.issues.map((err) => ({
					message: err.message,
					field: err.path.join('.')
				}))
			},
			400
		);
	}

	// Log unexpected errors
	console.error(requestId, 'Unexpected error:', err);

	// Handle unknown errors
	return c.json(
		{
			requestId,
			message: 'Internal server error'
		},
		500
	);
}

export const handleZodError = (
	result:
		| {
				success: true;
				data: unknown;
		  }
		| {
				success: false;
				error: z.ZodError;
		  },
	c: Context
) => {
	if (!result.success) {
		return c.json(
			{
				requestId: c.get('requestId'),
				message: 'Validation failed',
				errors: result.error.issues.map((err) => ({
					message: err.message,
					field: err.path.join('.')
				}))
			},
			400
		);
	}
};
