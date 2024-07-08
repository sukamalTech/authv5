"use server";
import { getVerificationTokenByToken } from "@/utlis/helper/token";
import { db } from "@/db";
import { getUserByEmail } from "@/utlis/helper/user";

export const verificationNewToken = async (
  token: string | undefined | null
) => {
  if (!token) {
    return {
      error: "No token provided",
    };
  }
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Invalid token provided",
    };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return {
      error: "Token has expired",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: "No user found",
    };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });
  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });
  return {
    success: true,
  };
};
