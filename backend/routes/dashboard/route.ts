import express from 'express';
import { requireAuth } from '../../middleware/authentication';
import { ProjectModel } from "../../models/Project.mongo";
import { NoteModel } from "../../models/Note.mongo";

const router = express.Router();

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const userId = (req as any).user.userID;
    const projects = await ProjectModel.find({ userId });
    const notes = await NoteModel.find({ userId });

    res.json({
      success: true,
      user: (req as any).user,
      projects,
      notes,
    });
  } catch (error) {
    next(error);
  }
});

export default router;