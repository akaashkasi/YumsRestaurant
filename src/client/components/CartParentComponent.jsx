import { useContext } from 'react';
import Cart from './Cart.jsx';
import MenuPreview from './MenuPreview.jsx';
import CartContext from '../context/CartContext.jsx';

function CartParentComponent() {
  //const [cartItems, setCartItems] = useState([]);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const handleCheckout = cartItems => {
    // Implement your checkout logic here
    console.log('Checkout', cartItems);
    // For example, redirect to a payment page or process the payment
  };

  return (
    <div>
      <Cart
        cartItems={cartItems}
        onRemoveFromCart={removeFromCart}
        onCheckout={handleCheckout}
      />
      <MenuPreview onAddToCart={addToCart} />
    </div>
  );
}

export default CartParentComponent;
