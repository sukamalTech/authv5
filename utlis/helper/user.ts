import { db } from "@/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
export const getUserById = async (id?: string) => {
  if (!id) return null;
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
