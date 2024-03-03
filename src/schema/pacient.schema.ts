import { z } from "zod";

const nameSchema = z.string({
  description: "Nombre del paciente",
  invalid_type_error: "El nombre debe ser un string",
  required_error: "El nombre es obligatorio",
});

const emailSchema = z.string({
  description: "Correo electronico del paciente",
  invalid_type_error: "El correo debe ser un string",
  required_error: "El correo es obligatorio",
});

const phoneSchema = z
  .string({
    description: "Telefono del paciente",
    invalid_type_error: "El telefono debe ser un string",
    required_error: "El telefono es obligatorio",
  })
  .max(10, "El telefono debe tener 10 caracteres")
  .min(10, "El telefono debe tener 10 caracteres");

const idSchema = z.object({
  id: z.preprocess(
    (id) => parseInt(id as string, 10),
    z
      .number({
        description: "id",
        invalid_type_error: "id debe ser un numero",
        required_error: "id es obligatorio",
      })
      .positive()
  ),
});

export const createPacientSchema = z.object({
  body: z.object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
  }),
});

export const getPacientSchema = z.object({
  params: idSchema,
});

export const deletePacientSchema = getPacientSchema;

export const updatePacientSchema = z.object({
  body: z.object({
    name: nameSchema.optional(),
    email: emailSchema.optional(),
    phone: phoneSchema.optional(),
  }),
  params: idSchema,
});
