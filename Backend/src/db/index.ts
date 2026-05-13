import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';
import "dotenv/config"; // This loads the variables from your .env file

// 1. Create the HTTP connection to Neon
const sql = neon(process.env.DATABASE_URL!);

// 2. Wrap the connection in Drizzle, and pass it our schema
export const db = drizzle(sql, { schema });