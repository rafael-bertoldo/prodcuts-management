import { z } from 'zod';
import {
  productCreateSchema,
  productReadAllSchema,
  productSchema,
  productUpdateSchema,
} from '../schemas/product.schemas';

export type Product = z.infer<typeof productSchema>;
export type ProductCreate = z.infer<typeof productCreateSchema>;
export type ProductReturnAll = z.infer<typeof productReadAllSchema>;
export type ProductUpdate = z.infer<typeof productUpdateSchema>;
