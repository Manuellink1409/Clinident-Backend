import prisma from "../db/prisma";
import { User } from "@prisma/client";
import { comparePassword, hashPassword } from "../utils/bcrypt-utils";
import { generateAccessToken } from "../utils/jwt-utils";

type AuthBody = Pick<User, "name" | "email" | "password" | "role">;
type loginBody = Pick<User, "email" | "password">;

export const createUser = async (userInput: AuthBody) => {
  try {
    const hashedPassword = await hashPassword(userInput.password);
    const user = await prisma.user.create({
      data: {
        ...userInput,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
export const loginUser = async (userInput: loginBody) => {
  try {
    const { email, password } = userInput;
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
    let isValid = await comparePassword(password, user.password);
    console.log("miaaaaaaaaaaaaau" + password);
    if (!isValid) throw Error("INVALID CREDENTIALS");
    return generateAccessToken(email);
  } catch (error) {
    throw error;
  }
};
