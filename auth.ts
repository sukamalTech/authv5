import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { getUserByEmail } from "./utlis/helper/user";
import authConfig from "@/auth.config";
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
  callbacks: {
    // async signIn({ user, account }) {
    //   if (account?.provider !== "credentials") return true;
    //   return true;
    // },
    // async session({ token, user, session }) {
    //   return session;
    // },
    // async jwt({ token }) {
    //   if (!token.email) return token;
    //   const existingUser = await getUserByEmail(token.email);
    //   if (!existingUser) return token;
    //   token.role = existingUser.role;
    //   return token;
    // },
  },
  ...authConfig,
});
