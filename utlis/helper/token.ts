import { db } from "@/db";
import { v4 as uuidv4 } from "uuid";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const token = await db.verificationToken.findFirst({
      where: { email },
    });
    return token;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const tokenData = await db.verificationToken.findFirst({
      where: {
        token,
      },
    });
    return tokenData;
  } catch (error) {
    return null;
  }
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  // This code generate expire time of one hour
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);

  // Below code delete any previously exist verification code
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  // Finally new verification token created inside the database.
  //The modalitis of send token and verification have to be written in Controllers
  const verificationToken = await db.verificationToken.create({
    data: { email, token, expires },
  });
  return verificationToken;
};
