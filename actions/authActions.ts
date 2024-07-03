"use server";
import { signIn, signOut } from "@/auth";
import { SignupInputs } from "@/components/SignupForm";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema } from "@/utlis/schema/authSchema";
import { LoginInputs } from "@/components/LoginForm";

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/login" });
  revalidatePath("/");
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const signupWithCredentials = async (data: SignupInputs) => {
  try {
    const valid = await registerSchema.safeParseAsync(data);
    if (!valid.success) {
      return {
        error: valid.error.message,
      };
    }
    const { email, password, name } = data;
    const user = await getUserByEmail(email);
    if (user) {
      return {
        error: "Email already exists",
      };
    }
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
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

export const signinWithCredentials = async (data: LoginInputs) => {
  try {
    const valid = await loginSchema.safeParseAsync(data);
    if (!valid.success) {
      return {
        error: valid.error.message,
      };
    }
    const { email, password } = data;

    await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/",
    });
    revalidatePath("/");
    return { message: "Successfully logged in", status: 200 };
  } catch (error) {
    return { error: error, message: "Something went wrong" };
  }
};
