import "../App.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



function App() {
  
  const [btnreact,setbtnreact] = useState("Login")
  const cartItems = useSelector((store)=>store.cart.items)
  console.log(cartItems);
  
  return (
    <>
        <div className="header">
            <div className="logo-container">
                <img className="logo" src="https://tophawks.com/wp-content/uploads/2023/09/Swiggy-Logo-1170x658.png" alt="" />
                
            </div>
            <div className="nav-items">
              <ul>
                <li> <Link to="">Home</Link></li>
                <li>  <Link to="/about">About</Link></li>
                <li> <Link to="/contact">Contact Us</Link></li>
                <li> <Link to="/cart">Cart ({cartItems.length} items)</Link></li>

                <li><button className="btnreact" onClick={
                  () => {
                  btnreact=="Login" ? setbtnreact("Logout"): setbtnreact("Login")
                  }
                }>{btnreact}</button></li>

              </ul>
            </div>
        </div>
      
    </>
  );
}

export default App;
