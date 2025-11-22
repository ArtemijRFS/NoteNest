import express from "express";
import { ProjectModel } from "../../models/Project.mongo";
import { ProjectSchema } from "../../models/Project.model";
import { requireAuth } from "../../middleware/authentication";

const router = express.Router();

// Create Project (only for logged-in user)
router.post("/", requireAuth, async (req, res, next) => {
    try {
        const parsed = ProjectSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ success: false, message: "Invalid project data" });
        }

        const project = await ProjectModel.create({
            ...parsed.data,
            userId: (req as any).user.userID,
        });

        res.status(201).json({ success: true, message: "Project created successfully", project });
    } catch (error) {
        next(error);
    }
});

// Get Projects (only for logged-in user)
router.get("/", requireAuth, async (req, res, next) => {
    try {
        const projects = await ProjectModel.find({ userId: (req as any).user.userID });
        res.status(200).json({ success: true, projects });
    } catch (error) {
        next(error);
    }
});

// Update Projects (only for logged-in user)
router.put("/:id", requireAuth, async (req, res, next) => {
    try {
        const { id } = req.params;

        const parsed = ProjectSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ success: false, message: "Invalid project data" });
        }

        const project = await ProjectModel.findOneAndUpdate(
            { _id: id, userId: (req as any).user.userID },
            parsed.data,
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found or not yours" });
        }

        res.status(200).json({ success: true, message: "Project updated successfully", project });
    } catch (error) {
        next(error);
    }
});

// Delete Project (only if owned by logged-in user)
router.delete("/:id", requireAuth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await ProjectModel.findOneAndDelete({
            _id: id,
            userId: (req as any).user.userID,
        });

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found or not yours" });
        }

        res.status(200).json({ success: true, message: "Project deleted" });
    } catch (error) {
        next(error);
    }
});

export default router;