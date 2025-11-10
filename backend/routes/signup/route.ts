import express from 'express';
import { validate } from '../../middleware/validate';
import { UserSchema, type User } from '../../models/User.model';

const router = express.Router();
router.get("/", validate(UserSchema), async (req, res) => {
    const data = req.body as User;
    res.status(201).json({ message: "User Created successfully", User: data });
});

export default router;