import z from "zod";

export const UserSchema = z.object({
    username: z.string("Invalid Username"),
    email: z.email("Invalid Email"),
    authentication: z.object({
        password: z.string("Invalid Password"),
        salt: z.string().optional(),
        sessionToken: z.string().optional(),
    }),
    createdAt: z.coerce.date().optional(),
});

export type User = z.infer<typeof UserSchema>;