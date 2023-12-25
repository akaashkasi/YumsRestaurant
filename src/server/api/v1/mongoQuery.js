import dotenv from 'dotenv';
import connectDB from './mongodb.js'; // Adjust the path
import Menu from './menuModel.js'; // Adjust the path

dotenv.config();

const queryMenus = async () => {
  try {
    await connectDB(); // Connect to the database
    const allMenus = await Menu.find();
    console.log('Menus retrieved:', allMenus);
    return allMenus;
  } catch (error) {
    console.error('Error:', error);
  }
};

export default queryMenus;
