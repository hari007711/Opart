import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "opart-mocha.vercel.app",
});
