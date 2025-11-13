import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import SignupRouter from "./routes/signup/route.js";
import LoginRouter from "./routes/login/route.js";
import DashboardRouter from "./routes/dashboard/route.js";
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use("/signup", SignupRouter);
app.use("/login", LoginRouter);
app.use("/dashboard", DashboardRouter);

app.use(errorHandler);

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB!');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.get('/', (_req, res) => {
    res.send('NoteNest\'s Backend is running!');
});
