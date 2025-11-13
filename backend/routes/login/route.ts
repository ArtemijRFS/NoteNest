import express from 'express';
import { UserModel } from '../../models/User.mongo';
import { comparePassword } from '../../utils/hash';
import { generateToken } from '../../utils/jwt';

const router = express.Router();
router.post("/", async (req, res, next) => {
    try {    
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email }).select("+password +salt +sessionToken");
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email" });
        }

        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const sessionToken = generateToken(user._id.toString());
        user.sessionToken = sessionToken;
        await user.save();
        res.status(200).json({ 
            success: true,
            message: "Login successful",
            token: sessionToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }, 
        });
    } catch (error) {
        next(error);
    }
});

export default router;