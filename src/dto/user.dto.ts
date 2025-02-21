import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email"),
});

export const updateUserSchema = createUserSchema.partial();

export const createUserResponseSchema = {
  201: z
    .object({
      message: z.string(),
    })
    .describe("User created successfully in server side!"),
  400: z
    .object({
      message: z.string(),
    })
    .describe("Bad request"),
};

export const updateUserResponseSchema = {
  200: z
    .object({
      message: z.string(),
    })
    .describe("User updated successfully in server side!"),
  400: z
    .object({
      message: z.string(),
    })
    .describe("Bad request"),
};

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
