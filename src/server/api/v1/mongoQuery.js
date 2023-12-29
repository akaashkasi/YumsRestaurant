import Menu from '../../models/menuModel.js'; // Adjust the path

const queryMenus = async () => {
  try {
    const allMenus = await Menu.find();
    return allMenus;
  } catch (error) {
    console.error('Error:', error);
  }
};

export default queryMenus;
