import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./utlis/helper/user";
import bcrypt from "bcryptjs";
import { log } from "console";
import { loginSchema } from "./utlis/schema/authSchema";
// Notice this is only an object, not a full Auth.js instance
export default {
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
        const validatedCredentials = loginSchema.safeParse(credentials);
        if (validatedCredentials.success) {
          const { email, password } = validatedCredentials.data;
          let user = await getUserByEmail(credentials.email as string);
          if (!user || !user.password) {
            return null;
          }
          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );
          if (!isPasswordCorrect) {
            return null;
          }
          return user; // Anything that is returned will be saved in the session except null
          // So if we return any massage that also create session. In this function if anything
          //not matched always return null.
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
