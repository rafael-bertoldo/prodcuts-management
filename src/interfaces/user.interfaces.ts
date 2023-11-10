import { z } from 'zod';
import {
  loginSchema,
  userCreateSchema,
  userReadAllSchema,
  userReadSchema,
  userSchema,
  userUpdateSchema,
} from '../schemas/user.schemas';

export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserReturn = z.infer<typeof userReadSchema>;
export type UserReturnAll = z.infer<typeof userReadAllSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type Login = z.infer<typeof loginSchema>
export type LoginReturn = { token: string }
