"use server";
import { signIn, signOut } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema } from "@/utlis/schema/authSchema";
import * as z from "zod";
import { getUserByEmail } from "@/utlis/helper/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { error } from "console";

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/login" });
  revalidatePath("/");
};

export const signupWithCredentials = async (
  data: z.infer<typeof registerSchema>
) => {
  try {
    const valid = await registerSchema.safeParseAsync(data);
    if (!valid.success) {
      return {
        error: valid.error.message,
      };
    }
    const { email, password, name } = valid.data;
    const user = await getUserByEmail(email);
    if (user) {
      return {
        error: "Email already exists",
      };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "USER",
      },
    });
    revalidatePath("/");
    return { message: "Successfully registered" };
  } catch (error) {
    return { error: error, message: "Something went wrong" };
  }
};

export const signinWithCredentials = async (
  data: z.infer<typeof loginSchema>
) => {
  const valid = await loginSchema.safeParseAsync(data);
  if (!valid.success) {
    return {
      error: "Invalid credentials",
    };
  }

  const { email, password } = valid.data;
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    throw error; // If not throw error then redirect not happened
  }
};
