import { Schema, model } from "mongoose";

const UserMongoSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    },
    createdAt: { type: Date, default: Date.now },
});

export const UserModel = model("User", UserMongoSchema);