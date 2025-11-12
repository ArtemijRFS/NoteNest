import express from 'express';
import { validate } from '../../middleware/validate';
import { UserSchema, type User } from '../../models/User.model';
import { UserModel } from '../../models/User.mongo';
import { generateSalt, hashPassword } from '../../utils/hash';
import { generateToken } from '../../utils/jwt';

const router = express.Router();
router.post("/", validate(UserSchema), async (req, res, next) => {
    try {
        const data = req.body as User;

        const salt = await generateSalt();
        const hashedPassword = await hashPassword(data.authentication.password, salt);

        const newUser = await UserModel.create({
            ...data,
            authentication: {
                password: hashedPassword,
                salt,
                sessionToken: generateToken("temporarily")
            }
        });
        res.status(201).json({ message: "User Created successfully", User: newUser });
    } catch (error) {
        next(error);
    }
});

export default router;