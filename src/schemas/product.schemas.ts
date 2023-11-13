import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  codebar: z.string(),
  quantity: z.number().int().positive(),
  description: z.string().optional(),
  unityPrice: z.number(),
  dueDate: z.date(),
  batch: z.string()
})

export const productCreateSchema = productSchema.omit({
  id: true
})

export const productReadAllSchema = productSchema.array()
export const productUpdateSchema = productCreateSchema.partial()