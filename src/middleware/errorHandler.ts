import { Prisma } from "@prisma/client";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  if (err instanceof ZodError) {
    const errorMessage = err.errors.map((error) => error.message).join(",");
    return res.status(400).json({ error: errorMessage });
  }
  if (err.name === "NotFoundError")
    return res.status(404).json({ error: "item not found" }); //prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002")
      return res.status(409).json({ error: "already exists" });
    if (err.code === "P2025")
      return res.status(409).json({ error: "not found" });
  }
  if (err.type === "entity.parse.failed")
    return res.status(400).json({ error: "wrong formatted JSON" });
  console.error(err);
  return res.status(500).json({ error: "internal server error" });
};
export default errorHandler;
