import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://opart-mocha.vercel.app/",
});
