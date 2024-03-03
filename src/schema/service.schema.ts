import { z } from "zod";

const nameSchema = z
  .string({
    description: "Nombre del servicio",
    invalid_type_error: "El servicio debe ser una cadena de texto",
    required_error: "El servicio es obligatorio",
  })
  .max(32, "El servicio debe tener menos de 32 caracteres");

const priceSchema = z.string({
  description: "Precio del servicio",
  invalid_type_error: "El precio debe ser un número",
  required_error: "El precio es obligatorio",
});

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

export const createServiceSchema = z.object({
  body: z.object({
    name: nameSchema,
    price: priceSchema,
  }),
});

export const getServiceSchema = z.object({
  params: idSchema,
});

export const deleteServiceSchema = getServiceSchema;

export const updateServiceSchema = z.object({
  body: z.object({
    name: nameSchema.optional(),
    price: priceSchema.optional(),
  }),
  params: idSchema,
});
