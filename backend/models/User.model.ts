import z from "zod";

export const UserSchema = z.object({
    username: z.string(),
    email: z.email(),
    authentication: z.object({
        password: z.string(),
        salt: z.string(),
        sessionToken: z.string(),
    }),
    createdAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;