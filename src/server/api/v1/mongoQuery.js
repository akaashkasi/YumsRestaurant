import express from 'express';
import Menu from './menuModel.js'; // ensure this path is correct
import connectDB from './mongodb.js';

connectDB();
const router = express.Router();

// Route to get menu by type (Chinese or American)
router.get('/api/menu/:menuType', async (req, res) => {
  try {
    const menuType = req.params.menuType;
    const menu = await Menu.findOne({ menuType });
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.json(menu);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ message: 'Error fetching menu' });
  }
});

export default router;
