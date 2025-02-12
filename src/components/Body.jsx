import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ resdata }) => {
  const navigate = useNavigate();
  const { name, cuisines, avgRating, costForTwo, id } = resdata?.info;

  return (
    <div className="res-card" onClick={() => navigate(`/restaurant/${id}`)}>
      <img 
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${resdata.info.cloudinaryImageId}`} 
        className="res-logo" 
        alt={name} 
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4 className="rating">★ {avgRating}</h4>
      <h4>{costForTwo}</h4>
      <h4>{resdata.info.sla.deliveryTime} minutes</h4>
    </div>
  );
};

const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="shimmer-card"></div>
      ))}
    </div>
  );
};

function Body() {
  const [reslist, setReslist] = useState([]);
  const [filteredlist, setFilteredlist] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=11.8744775&lng=75.37036619999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await response.json();
      const restaurants = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      
      if (restaurants) {
        setReslist(restaurants);
        setFilteredlist(restaurants);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredlist(reslist);
    } else {
      const filtered = reslist.filter((res) =>
        res.info.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredlist(filtered);
    }
  };

  return reslist.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="search">
        <div className="input">
          <input
            type="text"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search restaurants..."
          />
          <button>Search</button>
        </div>
        <button
          className="top-btn"
          onClick={() => {
            const filtered = reslist.filter(
              (restaurant) => restaurant.info.avgRating >= 4.5
            );
            setFilteredlist(filtered);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      <div className="res-container">
        {filteredlist.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resdata={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default Body;    