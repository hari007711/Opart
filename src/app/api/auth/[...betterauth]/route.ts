import { auth } from "@/lib/auth";
import { betterAuthHandler } from "better-auth/next-js";

export const { GET, POST } = betterAuthHandler(auth);
