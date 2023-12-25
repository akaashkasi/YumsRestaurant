import queryMenus from './mongoQuery.js';

const menuHandler = app => {
  app.get('/api/menus', async (req, res) => {
    try {
      const menus = await queryMenus();
      res.json(menus);
    } catch (error) {
      console.error('Error fetching menus:', error);
      res.status(500).send('Error fetching menus');
    }
  });
};

export default menuHandler;
