import mongoose, { Schema, model } from "mongoose";

const ProjectMongoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
});

export const ProjectModel = model("Project", ProjectMongoSchema);