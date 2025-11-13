import express from "express";
import { UserModel } from "../../models/User.mongo";
import { generateSalt, hashPassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";
import { validate } from "../../middleware/validate";
import { UserSchema } from "../../models/User.model";

const router = express.Router();

router.post("/", validate(UserSchema), async (req, res, next) => {
    try {
        const { email, username, password } = req.body;

        const salt = await generateSalt();
        const hashedPassword = await hashPassword(password, salt);

        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const existingUsername = await UserModel.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ success: false, message: "Username already taken" });
        }

        const newUser = await UserModel.create({
            email,
            username,
            password: hashedPassword,
            salt,
            sessionToken: generateToken("temporarily"),
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username,
            },
        });
    } catch (error) {
        next(error);
    }
});

export default router;