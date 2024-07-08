import NextAuth, { type DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      role: "ADMIN" | "USER";
    } & DefaultSession["user"];
  }
}
