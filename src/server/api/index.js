import express from 'express';
import cors from 'cors';
import emailHandler from './v1/emailHandler.js';
import process from 'process';
import menuHandler from './v1/menuHandler.js';
import connectDB from './v1/mongodb.js';

const app = express();
app.use(cors());
app.use(express.json());

connectDB()
  .then(() => {
    console.log('MongoDB connected');
    emailHandler(app); // Register email handler routes
    menuHandler(app); // Register menu handler routes

    const PORT = process.env.PORT || 5174;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
