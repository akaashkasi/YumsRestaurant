import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  size: mongoose.Schema.Types.Mixed,
});

const categorySchema = new mongoose.Schema({
  categoryName: String,
  items: [menuItemSchema],
});

const menuSchema = new mongoose.Schema(
  {
    menuType: String,
    categories: [categorySchema],
  },
  { collection: 'menu-items' }
);

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
