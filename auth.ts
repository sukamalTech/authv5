import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import { getUserByEmail, getUserById } from "./utlis/helper/user";
import authConfig from "@/auth.config";
import { Role } from "@prisma/client";
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  events: {
    // @ts-ignore
    async linkAccount({ user, account }) {
      if (account?.provider !== "credentials") {
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            emailVerified: new Date(),
          },
        });
      }
      return true;
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserById(user.id);
      if (existingUser?.emailVerified === null) return false;
      return true;
    },
    async session({ token, user, session }) {
      if (token.role && token.sub && session.user) {
        session.user.role = token.role as Role;
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  ...authConfig,
});
