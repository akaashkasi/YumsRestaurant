import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./mongodb.js"; // Adjust the path
import Menu from "./menuModel.js"; // Adjust the path

dotenv.config();

const queryMenus = async () => {
  try {
    await connectDB(); // Connect to the database

    const allMenus = await Menu.find();
    console.log("All menus:", allMenus);

    // Query for the Chinese menu
    const chineseMenu = await Menu.findOne({ menuType: "Chinese" });
    // console.log("Chinese Menu:", JSON.stringify(chineseMenu, null, 2));

    // Query for the American menu
    const americanMenu = await Menu.findOne({ menuType: "American" });
    // console.log("American Menu:", JSON.stringify(americanMenu, null, 2));
    return allMenus;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.disconnect();
  }
};

export default queryMenus;
