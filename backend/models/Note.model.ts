import z from "zod";

export const NoteSchema = z.object({
    text: z.string().min(3, "Note should have at least 3 characters").max(60, "Note has exceeded 60 characters"),
    project: z.string().min(1, "Project name is required"),
    createdAt: z.date(),
});

export type Note = z.infer<typeof NoteSchema>;