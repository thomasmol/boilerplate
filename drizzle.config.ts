import type { Config } from 'drizzle-kit';

export default {
  schema: './packages/db/schema.ts',
  out: './packages/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // Optionally, if you want to organize migrations by feature
  verbose: true,
  strict: true,
} satisfies Config; 