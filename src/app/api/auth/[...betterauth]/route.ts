// app/api/auth/[...betterauth]/route.ts
import { auth } from "@/lib/auth";
import { betterAuthHandler } from "better-auth/next";

export const { GET, POST } = betterAuthHandler(auth);
