import { z } from "zod";

const loginEmailSchema = z.string({
  description: "Email",
  invalid_type_error: "El email debe ser un string",
  required_error: "El email es obligatorio",
});

const loginPasswordSchema = z
  .string({
    description: "Contraseña",
    invalid_type_error: "La contraseña debe ser un string",
    required_error: "La contraseña es obligatoria",
  })
  .min(8, "La contraseña debe tener al menos 8 caracteres");

export const loginBody = z.object({
  email: loginEmailSchema,
  password: loginPasswordSchema,
});

export const loginSchema = z.object({
  body: loginBody,
});
