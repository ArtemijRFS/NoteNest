import z from "zod";

export const UserSchema = z.object({
    username: z.string().min(3, "Username should have at least 3 characters").max(10, "Username has exceeded 10 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(3, "Password should have at least 3 characters").max(10, "Password has exceeded 10 characters"),
    createdAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;