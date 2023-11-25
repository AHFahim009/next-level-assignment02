import { z } from 'zod';

const addressSchema = z.object({
  street: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
});

const fullNameSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
});

// const orderSchemaZod = z.object({
//   productName: z.string().min(1).optional(),
//   price: z.number().optional(),
//   quantity: z.number().optional(),
// });

const userUpdateSchemaZod = z.object({
  userId: z.number().optional(),
  username: z.string().min(13).optional(),
  password: z.string().min(1).optional(),
  fullName: fullNameSchema.optional(),
  age: z.number().optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).default([]).optional(),
  address: addressSchema.optional(),
});

export default userUpdateSchemaZod;
