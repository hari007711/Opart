// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL: "https://opart-mocha.vercel.app/",
// });

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "https://opart-mocha.vercel.app"),
});
