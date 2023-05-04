import * as z from 'zod';
export const UserSchema = z.object({
    id: z.string(),
    email: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const createUserSchema = z.object({
    email: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
});

export type CreateUser = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
    email: z.string().optional(),
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
});

export type UpdateUser = z.infer<typeof updateUserSchema>;
