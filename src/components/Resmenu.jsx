import "../App.css";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

function RestaurantMenu() {
  const [resMenu, setResMenu] = useState(null);
  const { Id } = useParams();

  useEffect(() => {
    fetchMenu();
  }, [Id]);

  const fetchMenu = async () => {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=11.8744775&lng=75.37036619999999&restaurantId=${Id}&catalog_qa=undefined&submitAction=ENTER`
      );
      const json = await response.json();
      console.log(json.data)
      setResMenu(json?.data || {});
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price / 100);
  };

  if (!resMenu || !resMenu.cards) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } = resMenu.cards[2]?.card?.card?.info || {};
  const menuItems = resMenu.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards || [];

  return (
    <div className="menu-container">
      <div className="restaurant-header">
        <h1 className="restaurant-name">{name}</h1>
        <p className="restaurant-cuisines">{cuisines?.join(", ")}</p>
        <p className="restaurant-cuisines">{costForTwoMessage}</p>
      </div>

      <h2 className="menu-title">Menu</h2>
      <ul className="menu-list">
        {menuItems.map((item) => {
          const { id, name, price, description, isVeg } = item.card.info;
          return (
            <li key={id} className="menu-item">
              <div className="item-details">
                <span className={`veg-indicator ${isVeg ? "veg" : "non-veg"}`}></span>
                <h3 className="item-name">{name}</h3>
                <p className="item-price">{formatPrice(price)}</p>
                {description && (
                  <p className="item-description">{description}</p>
                )}
              </div>
              <button className="add-btn">ADD</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RestaurantMenu;