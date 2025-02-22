import { Slice } from "lucide-react";
import React from "react";
import { useSelector, useDispatch } from "react-redux"; // Added useDispatch

const Cart = () => {
  const cartItems = useSelector((store) => store.cart?.items || []); // Use optional chaining
  const dispatch = useDispatch(); // Get dispatch function

  // Function to format price (define it properly based on your currency format)
  const formatPrice = (price) => `$${(price / 100).toFixed(2)}`; // Assuming price is in cents

  // Function to handle adding item to cart
  const handleAddItem = (item) => {
    dispatch({ type: "cart/addItem", payload: item }); // Assuming Redux action type
  };

  return (
    <ul>
      {cartItems.length > 0 ? (
        cartItems.map((item) => {
          const { id, name, price, description, isVeg } = item.card.info;
          return (
            <li key={id} className="menu-item">
              <div className="item-details">
                <span
                  className={`veg-indicator ${isVeg ? "veg" : "non-veg"}`}
                ></span>
                <h3 className="item-name">{name}</h3>
                <p className="item-price">{formatPrice(price)}</p>
                {description && <p className="item-description">{description}</p>}
              </div>
              <button className="add-btn" onClick={() => handleAddItem(item)}>
                ADD
              </button>
            </li>
          );
        })
      ) : (
        <p>Your cart is empty.</p>
      )}
    </ul>
  );
};

export default Cart;
