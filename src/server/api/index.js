// index.js
import express from 'express';
import cors from 'cors';
import emailHandler from './v1/emailHandler.js';
import process from 'process';
import connectDB from './mongodb.js';

const app = express();
app.use(cors());
app.use(express.json());

emailHandler(app); // Register email handler routes

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

connectDB();
