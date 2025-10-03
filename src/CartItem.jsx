import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, incrementQuantity, decrementQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, onQuantityZero, onQuantityNonZero }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
     let total = 0;

    cart.forEach(item => {
        // Step 1: Extract the cost string (e.g., "$15")
        const costString = item.cost;
        
        // Step 2: Remove the '$' and convert to a decimal number
        // We use slice(1) to get the string starting from the second character
        const price = parseFloat(costString.slice(1));
        
        // Step 3: Multiply the price by the quantity and add to the total
        total += price * item.quantity;
    });

        // Return the final total formatted to two decimal places (e.g., 15.00)
        return total.toFixed(2); 
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckout = () => {
    alert("Coming Soon");
};

  const handleIncrement = (item) => {
    dispatch(incrementQuantity(item.name)); // Dispatch increment action
    onQuantityNonZero(item.name); // Notify when quantity is incremented
  };

  const handleDecrement = (item) => {
    if (item.quantity > 0) {
        dispatch(decrementQuantity(item.name));
        if (item.quantity === 1) {
            // Notify ProductList when quantity reaches 0
            onQuantityZero(item.name);
        }
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
    // Notify ProductList when item is removed
    onQuantityZero(item.name);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const costString = item.cost;
    const price = parseFloat(costString.slice(1));
    return (price * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckout}>
    Checkout
</button>
      </div>
    </div>
  );
};

export default CartItem;