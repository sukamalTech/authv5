import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { getUserByEmail } from "./actions/authActions";

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
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      return true;
    },
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

  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      // @ts-ignore
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const { email, password } = credentials;
        let user = await getUserByEmail(email as string);
        if (!user) {
          return {
            error: "Invalid email or password",
          };
        }
        if (!user.password) {
          return {
            error: "Invalid email or password",
          };
        }
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password as string, salt);
        const isPasswordCorrect = await bcrypt.compare(
          hashedPassword,
          user.password
        );

        return user;
      },
    }),
  ],
});
