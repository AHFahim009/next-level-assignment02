import { z } from 'zod';

const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

const fullNameSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const orderSchemaZod = z.object({
  productName: z.string().min(1),
  price: z.number(),
  quantity: z.number(),
});

const userSchemaZod = z
  .object({
    userId: z.number(),
    username: z.string().min(1),
    password: z.string().min(1),
    fullName: fullNameSchema,
    age: z.number(),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()).default([]),
    address: addressSchema,
    orders: z.array(orderSchemaZod).optional(),
  })

  .refine((data) => {
    const expectedKeys = [
      'userId',
      'username',
      'password',
      'fullName',
      'age',
      'email',
      'isActive',
      'hobbies',
      'address',
      'orders',
    ];
    const missingKeys = expectedKeys.filter(
      (key) => !expectedKeys.includes(key)
    );

    if (missingKeys.length > 0) {
      throw new Error(`Missing expected properties: ${missingKeys.join(', ')}`);
    }

    return true;
  });

export default userSchemaZod;
