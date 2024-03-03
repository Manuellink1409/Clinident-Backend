import app from "./app";
import { Request } from "express";
import { AnyZodObject, z } from "zod";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export async function zParse<T extends AnyZodObject>(
  schema: T,
  req: Request
): Promise<z.infer<T>> {
  try {
    return schema.parseAsync(req);
  } catch (error) {
    throw error;
  }
}
