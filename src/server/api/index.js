import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import emailHandler from './v1/emailHandler.js';
import process from 'process';
import menuHandler from './v1/menuHandler.js';
import connectDB from './v1/mongodb.js';

// Define __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

connectDB()
  .then(() => {
    console.log('MongoDB connected');
    emailHandler(app); // Register email handler routes
    menuHandler(app); // Register menu handler routes

    // Serve static files from the React build directory
    app.use(express.static(path.join(__dirname, '../../../dist')));

    // Catch-all route handler to serve index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../../dist', 'index.html'));
    });

    const PORT = process.env.PORT || 5174;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
