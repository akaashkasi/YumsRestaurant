import Menu from './menuModel.js'; // Adjust the path

const queryMenus = async () => {
  try {
    const allMenus = await Menu.find();
    console.log('Menus retrieved:', allMenus);
    return allMenus;
  } catch (error) {
    console.error('Error:', error);
  }
};

export default queryMenus;
