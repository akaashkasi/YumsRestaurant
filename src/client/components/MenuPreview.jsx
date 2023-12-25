import { useEffect, useState, useRef, useCallback } from 'react';
import '../components/css/MenuPreview.css';
import ModalOverlay from './ModalOverlay';

function MenuPreview() {
  const [menus, setMenus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [order, setOrder] = useState([]);
  const [tipAmount, setTipAmount] = useState(0);
  const [isTipPopupOpen, setIsTipPopupOpen] = useState(false);
  const [temporaryTipAmount, setTemporaryTipAmount] = useState(0);
  const [selectedTipOption, setSelectedTipOption] = useState('none');
  const [tipError, setTipError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  const [selectedSub, setSelectedSub] = useState('');
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    fetch('/api/menus')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMenus(data);
        if (data.length > 0) {
          setSelectedCategory(data[0].categories[0].categoryName);
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setOrder(JSON.parse(savedCart));
    }
  }, []);

  const addToOrder = (item, size = null) => {
    // Include selected sub-option in item name if available
    const itemName = selectedSub ? `${item.name} (${selectedSub})` : item.name;

    const orderItem = {
      ...item,
      name: itemName, // Updated item name with selected sub-option
      selectedSize: size,
      additionalInstructions, // Add additional instructions to the item
    };
    const updatedOrder = [...order, orderItem];
    setOrder(updatedOrder);
    localStorage.setItem('cart', JSON.stringify(updatedOrder));
    console.log(`Added ${itemName}${size ? ` (${size})` : ''} to cart`);
  };

  const openModal = item => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmModal = () => {
    if (currentItem) {
      const newItem = {
        ...currentItem,
        selectedSub,
        additionalInstructions,
      };
      addToOrder(newItem);
      setIsModalOpen(false);
      setSelectedSub('');
      setAdditionalInstructions('');
    }
  };

  const renderSubSelection = useCallback(() => {
    // Define subOptions inside useCallback
    const subOptions = [
      'Steak and Cheese',
      'Fish',
      'Chicken',
      'Hoagie',
      'Turkey',
      'Ham and Cheese',
    ];
    // Check if the current item requires sub selection
    if (
      currentItem &&
      (currentItem.name === '6" Sub Lunch Special' ||
        currentItem.name === '12" Sub with Fries and Drink')
    ) {
      // Return the JSX for sub selection
      return (
        <div className="sub-selection">
          <label>Select a sub:</label>
          {subOptions.map((sub, index) => (
            <label key={index}>
              <input
                type="radio"
                name="subOption"
                value={sub}
                checked={selectedSub === sub}
                onChange={e => setSelectedSub(e.target.value)}
              />
              {sub}
            </label>
          ))}
        </div>
      );
    } else {
      return null;
    }
  }, [currentItem, selectedSub]); // Remove subOptions from the dependency array

  const removeFromOrder = index => {
    const updatedOrder = order.filter((_, itemIndex) => itemIndex !== index);
    setOrder(updatedOrder);
    localStorage.setItem('cart', JSON.stringify(updatedOrder));
    console.log(`Removed item from cart`);
  };
  const calculateTotal = () => {
    const subtotal = order.reduce((total, item) => {
      let itemPrice = item.price || 0;
      if (item.selectedSize && item.size[item.selectedSize]) {
        itemPrice = item.size[item.selectedSize];
      }
      return total + itemPrice;
    }, 0);

    const taxAmount = subtotal * 0.0975; // 9.75% tax
    return subtotal + taxAmount + tipAmount;
  };

  const calculateSubtotal = () => {
    return order.reduce((total, item) => {
      let itemPrice = item.price || 0;
      if (item.selectedSize && item.size[item.selectedSize]) {
        itemPrice = item.size[item.selectedSize];
      }
      return total + itemPrice;
    }, 0);
  };

  const openTipPopup = () => {
    setIsTipPopupOpen(true);
  };

  const closeTipPopup = () => {
    setIsTipPopupOpen(false);
  };
  const saveTipAmount = () => {
    const parsedTipAmount = parseFloat(temporaryTipAmount);
    if (!isNaN(parsedTipAmount)) {
      setTipAmount(parsedTipAmount);
      setTipError('');
      closeTipPopup();
    } else {
      setTipError('Please enter a valid tip amount');
    }
  };

  const customTipInputRef = useRef(null);

  const handleCustomTipChange = () => {
    if (customTipInputRef.current) {
      setTemporaryTipAmount(customTipInputRef.current.value);
    }
  };

  const handleTipSelection = option => {
    const subtotal = calculateSubtotal();
    setSelectedTipOption(option);
    if (option !== 'custom' && option !== 'none') {
      const percentageValue = parseFloat(option) / 100;
      const calculatedTip = subtotal * percentageValue;
      setTemporaryTipAmount(calculatedTip.toString());
    } else if (option === 'none') {
      setTemporaryTipAmount('0');
    }
  };

  const formatTipAmount = () => {
    const number = parseFloat(temporaryTipAmount);
    return isNaN(number) ? '0.00' : number.toFixed(2);
  };

  const TipPopup = () => (
    <div className="tip-popup">
      <div className="tip-options">
        {tipError && <div className="tip-error">{tipError}</div>}
        <button
          className={selectedTipOption === 'none' ? 'selected' : ''}
          onClick={() => handleTipSelection('none')}
        >
          No Tip
        </button>
        <button
          className={selectedTipOption === '10%' ? 'selected' : ''}
          onClick={() => handleTipSelection('10%')}
        >
          10%
        </button>
        <button
          className={selectedTipOption === '15%' ? 'selected' : ''}
          onClick={() => handleTipSelection('15%')}
        >
          15%
        </button>
        <button
          className={selectedTipOption === '20%' ? 'selected' : ''}
          onClick={() => handleTipSelection('20%')}
        >
          20%
        </button>
        <div>
          <input
            ref={customTipInputRef}
            type="number"
            placeholder="Custom Tip"
            defaultValue={temporaryTipAmount}
            onChange={handleCustomTipChange}
            min="0"
            step="0.01"
          />
          <div>Selected Tip: ${formatTipAmount()}</div>
          <button onClick={saveTipAmount}>Save</button>
        </div>
      </div>
    </div>
  );

  const subtotal = order.reduce((total, item) => {
    let itemPrice = item.price || 0;
    if (item.selectedSize && item.size[item.selectedSize]) {
      itemPrice = item.size[item.selectedSize];
    }
    return total + itemPrice;
  }, 0);

  const taxAmount = subtotal * 0.0975; // 9.75% tax
  return (
    <div className="menu-preview-container">
      <aside className="menu-categories">
        {menus.map((menu, menuIndex) => (
          <div key={menuIndex}>
            <h2>{menu.menuType}</h2>
            {menu.categories.map((category, categoryIndex) => (
              <button
                key={categoryIndex}
                onClick={() => setSelectedCategory(category.categoryName)}
                className={`category-button ${
                  selectedCategory === category.categoryName ? 'active' : ''
                }`}
              >
                {category.categoryName}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <section className="menu-items">
        {menus.map(menu =>
          menu.categories.map(category =>
            category.categoryName === selectedCategory
              ? category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="item">
                    <span>{item.name}</span>
                    <span className="item-price">
                      {item.size && typeof item.size === 'object' ? (
                        Object.entries(item.size).map(
                          ([sizeKey, sizePrice]) => (
                            <div key={sizeKey}>
                              {sizeKey}: ${sizePrice.toFixed(2)}
                              <button
                                className="add-to-cart-button"
                                onClick={() => openModal(item)}
                              >
                                Add {sizeKey.toUpperCase()} to Cart
                              </button>
                            </div>
                          )
                        )
                      ) : (
                        <>
                          {typeof item.price === 'number'
                            ? `$${item.price.toFixed(2)}`
                            : 'Price not available'}
                          <button
                            className="add-to-cart-button"
                            onClick={() => openModal(item)}
                          >
                            Add to Cart
                          </button>
                        </>
                      )}
                    </span>
                  </div>
                ))
              : null
          )
        )}
      </section>

      {isModalOpen && (
        <ModalOverlay
          currentItem={currentItem}
          selectedSub={selectedSub}
          additionalInstructions={additionalInstructions}
          setAdditionalInstructions={setAdditionalInstructions}
          confirmModal={confirmModal}
          closeModal={closeModal}
          renderSubSelection={renderSubSelection}
        />
      )}

      <aside className="order-summary">
        <h3>Your Order</h3>
        {order.map((item, index) => (
          <div key={index} className="order-item">
            <span>
              {item.name}
              {item.selectedSize ? ` (${item.selectedSize})` : ''}
              {item.additionalInstructions && (
                <div className="additional-instructions">
                  {item.additionalInstructions}
                </div>
              )}
            </span>
            <button
              className="remove-from-cart-button"
              onClick={() => removeFromOrder(index)}
            >
              Remove from Cart
            </button>
          </div>
        ))}
        <div className="order-total">Subtotal: ${subtotal.toFixed(2)}</div>
        <div className="tax-amount">Tax: ${taxAmount.toFixed(2)}</div>
        <button onClick={openTipPopup}>Choose Tip</button>
        <div className="total-amount">
          Total: ${calculateTotal().toFixed(2)}
        </div>
      </aside>
      {isTipPopupOpen && <TipPopup />}
    </div>
  );
}

export default MenuPreview;
