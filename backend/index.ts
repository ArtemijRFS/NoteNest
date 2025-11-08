import Express = require('express');
import mongoose = require('mongoose');
import dotenv = require('dotenv');

dotenv.config();

const app = Express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';

app.use(Express.json());

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB!');
        app.listen(PORT, () => {
            console.log(`Server running on https://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.get('/', (_req, res) => {
    res.send('Backend is running!');
});
