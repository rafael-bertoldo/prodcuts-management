import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string().max(120).min(2),
  registerNumber: z.number().int().positive(),
  password: z.string().max(255).min(8),
  createdAt: z.date(),
  active: z.boolean().default(true),
});

export const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  active: true,
});

export const userReadSchema = userSchema.omit({ password: true });
export const userReadAllSchema = userReadSchema.array();
export const userUpdateSchema = userCreateSchema.partial();
export const loginSchema = userSchema.pick({
  registerNumber: true,
  password: true
})
