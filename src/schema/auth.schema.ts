import { z } from "zod";

const authNameSchema = z.string({
  description: "Nombre",
  invalid_type_error: "El nombre debe ser un string",
  required_error: "El nombre es obligatorio",
});

const authEmailSchema = z.string({
  description: "Email",
  invalid_type_error: "El email debe ser un string",
  required_error: "El email es obligatorio",
});

const authRoleSchema = z.enum(["ADMIN", "USER", "SECRETARY"], {
  description: "Rol",
  invalid_type_error: "El rol debe ser un string",
  required_error: "El rol es obligatorio",
});

const authPasswordSchema = z
  .string({
    description: "Contraseña",
    invalid_type_error: "La contraseña debe ser un string",
    required_error: "La contraseña es obligatoria",
  })
  .min(8, "La contraseña debe tener al menos 8 caracteres");

export const authBody = z.object({
  name: authNameSchema,
  email: authEmailSchema,
  password: authPasswordSchema,
  role: authRoleSchema,
});

export const authSchema = z.object({
  body: authBody,
});
