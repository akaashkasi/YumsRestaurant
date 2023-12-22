import '../components/css/MenuPreview.css';
import React, { useState, useEffect } from 'react';

function Menu( {setIsLoading }) {
  const [currentMenu, setCurrentMenu] = useState('Chinese'); // default to Chinese
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/menu/${currentMenu}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, [currentMenu]);

  return (
    <section className="menu">
      <div className="menu-tabs">
        <button onClick={() => setCurrentMenu('Chinese')} className={currentMenu === 'Chinese' ? 'active' : ''}>Chinese Food Menu</button>
        <button onClick={() => setCurrentMenu('American')} className={currentMenu === 'American' ? 'active' : ''}>American Food Menu</button>
      </div>
      <div className="menu-categories">
        {menuData && menuData.categories.map((category) => (
          <div key={category.categoryName} className="category">
            <h3>{category.categoryName}</h3>
            {/* You can add more details here if needed */}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Menu;
