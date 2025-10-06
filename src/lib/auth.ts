import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  }),
  emailAndPassword: {
    enabled: true,
  },
  cors: {
    origin: ["http://localhost:3000", "https://opart-mocha.vercel.app"],
    credentials: true,
  },
});
