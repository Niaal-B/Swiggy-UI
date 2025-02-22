import { Slice } from "lucide-react";
import React from "react";
import { useSelector, useDispatch } from "react-redux"; // Added useDispatch
import { clearCart } from "./utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart?.items || []); 
  const dispatch = useDispatch(); 

  const formatPrice = (price) => `$${(price / 100).toFixed(2)}`; 

  // Function to handle adding item to cart
  const handleAddItem = (item) => {
    dispatch({ type: "cart/addItem", payload: item });
  };
  
  const handleclearCart = () =>{
    dispatch(clearCart())
  }

  return (
    <ul>
          <button onClick={handleclearCart}>Clear Cart</button>

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
