import express from 'express';
import { requireAuth } from '../../middleware/authentication';

const router = express.Router();

router.get("/", requireAuth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to your dashboard",
    user: (req as any).user,
  });
});

export default router;