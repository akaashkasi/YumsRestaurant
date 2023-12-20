import '../components/css/MenuPreview.css';
import dishImage1 from '../assets/images/kung_pao_chicken.jpg'; // Replace with your actual image paths
import dishImage2 from '../assets/images/mapo_tofu.jpg';
import dishImage3 from '../assets/images/szechuan_beef.jpg';

function MenuPreview() {
  // You could potentially fetch these from an API or define them here
  const dishes = [
    { id: 1, title: 'Kung Pao Chicken', image: dishImage1 },
    { id: 2, title: 'Mapo Tofu', image: dishImage2 },
    { id: 3, title: 'Szechuan Beef', image: dishImage3 },
    // ...more dishes
  ];

  return (
    <section className="menu-preview">
      <h2>Our Menu</h2>
      <div className="dishes-grid">
        {dishes.map((dish) => (
          <div key={dish.id} className="dish">
            <img src={dish.image} alt={dish.title} />
            <h3>{dish.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MenuPreview;
