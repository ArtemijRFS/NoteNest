import { z } from "zod";

export const ProjectSchema = z.object({
    _id: z.string().optional(),
    title: z.string(),
    description: z.string(),
    userId: z.string().optional(),
    createdAt: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;