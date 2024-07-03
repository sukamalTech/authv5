import bcrypt from "bcryptjs";

export const getHashedPassword = async (password: string) => {
  if (!password) {
    return null;
  }
  const salt = await bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
