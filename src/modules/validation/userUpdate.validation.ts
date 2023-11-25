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

const orderSchemaZod = z.object({
  productName: z.string().min(1).optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
});

const userUpdateSchemaZod = z
  .object({
    userId: z.number().optional(),
    username: z.string().min(1).optional(),
    password: z.string().min(1).optional(),
    fullName: fullNameSchema.optional(),
    age: z.number().optional(),
    email: z.string().email().optional(),
    isActive: z.boolean().optional(),
    hobbies: z.array(z.string()).default([]).optional(),
    address: addressSchema.optional(),
    orders: z.array(orderSchemaZod).optional().optional(),
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

    const providedKeys = Object.keys(data);
    // const missingKeys = expectedKeys.filter(
    //   (key) => !providedKeys.includes(key)
    // );

    if (!expectedKeys.some((key) => providedKeys.includes(key))) {
      throw new Error(
        `Missing expected properties: ${expectedKeys.join(', ')}`
      );
    }

    return true;
  });

export default userUpdateSchemaZod;
