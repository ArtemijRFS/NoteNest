import express from "express";
import { NoteModel } from "../../models/Note.mongo";
import { NoteSchema } from "../../models/Note.model";
import { requireAuth } from "../../middleware/authentication";

const router = express.Router();

// Create Note
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const parsed = NoteSchema.safeParse(req.body);
    if (!parsed.success || !parsed.data.project) {
      return res.status(400).json({ success: false, message: "Invalid note data" });
    }

    const note = await NoteModel.create({
      ...parsed.data,
      userId: (req as any).user.userID,
    });

    res.status(201).json({ success: true, message: "Note created successfully", note });
  } catch (error) {
    next(error);
  }
});

// Get Notes
router.get("/", requireAuth, async (req, res, next) => {
  try {
    const notes = await NoteModel.find({ userId: (req as any).user.userID });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    next(error);
  }
});

// Update Note
router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;

    const parsed = NoteSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: "Invalid note data" });
    }

    const note = await NoteModel.findOneAndUpdate(
      { _id: id, userId: (req as any).user.userID },
      parsed.data,
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found or not yours" });
    }

    res.status(200).json({ success: true, message: "Note updated successfully", note });
  } catch (error) {
    next(error);
  }
});

// Delete Note
router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await NoteModel.findOneAndDelete({
      _id: id,
      userId: (req as any).user.userID,
    });

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found or not yours" });
    }

    res.status(200).json({ success: true, message: "Note deleted" });
  } catch (error) {
    next(error);
  }
});

export default router;
