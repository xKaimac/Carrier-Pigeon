import GoogleProvider from "@auth/core/providers/google";
import GithubProvider from "@auth/core/providers/github";
import { AuthConfig } from "@auth/core";
import { Request } from "express";

export const getAuthConfig = (_req: Request): AuthConfig => {
  return {
    providers: [
      GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_CLIENT!,
        clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      }),
      GithubProvider({
        clientSecret: process.env.AUTH_GITHUB_SECRET!,
        clientId: process.env.AUTH_GITHUB_CLIENT!,
      }),
    ],
    secret: process.env.AUTH_SECRET!,
    trustHost: true,
  };
};
