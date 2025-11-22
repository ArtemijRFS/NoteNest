import mongoose, { Schema, model } from "mongoose";

const NoteMongoSchema = new Schema({
    text: { type: String, required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
});

export const NoteModel = model("Note", NoteMongoSchema);