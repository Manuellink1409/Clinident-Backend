import jwt from "jsonwebtoken";

export const generateAccessToken = (email: string) => {
  if (!process.env.SECRET) {
    throw new Error("La variable de entorno SECRET no está definida");
  }

  return jwt.sign({ email }, process.env.SECRET, { expiresIn: "1800s" });
};
