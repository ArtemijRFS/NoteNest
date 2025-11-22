import { z } from "zod";

export const NoteSchema = z.object({
  _id: z.string().optional(),
  text: z.string(),
  project: z.string().optional(),
  userId: z.string().optional(),
  createdAt: z.string().optional(),
});

export type Note = z.infer<typeof NoteSchema>;