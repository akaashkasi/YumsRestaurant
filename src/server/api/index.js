// index.js
import express from 'express';
import cors from 'cors';
import emailHandler from './v1/emailHandler.js';
import process from 'process';
import queryMenus from './v1/mongoQuery.js';
import menuHandler from './v1/menuHandler.js';

const app = express();
app.use(cors());
app.use(express.json());

emailHandler(app); // Register email handler routes
menuHandler(app); // Register menu handler routes

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

queryMenus();
