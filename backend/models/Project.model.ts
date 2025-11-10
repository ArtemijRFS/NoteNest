import z from "zod";

export const ProjectSchema = z.object({
    name: z.string().min(3, "Project's name should have at least 3 characters").max(20, "Project's name has exceeded 20 characters"),
    description: z.string().min(3, "Description should have at least 3 characters").max(60, "Description has exceeded 60 characters"),
    createdAt: z.date(),
});

export type Project = z.infer<typeof ProjectSchema>;