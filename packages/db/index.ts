import { drizzle } from 'drizzle-orm/bun-sql';
import * as schema from './schema';
import { relations } from './relations';
export * from './schema';
export * as schema from './schema';
export * as relations from './relations';
export * from 'drizzle-orm';

export const db = drizzle({
	connection: {
		url: Bun.env.PRIVATE_DATABASE_URL!
	},
	schema,
	relations
});
