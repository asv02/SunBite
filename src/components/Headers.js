import { useContext, useState } from "react";
import { LOGO_ADDRESS } from "../utils/constant";
import { Outlet, Link } from "react-router";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const data = useContext(UserContext);
  console.log("data in context->", data);
  const [authState, updateAuthState] = useState("Login");

  const cartItems = useSelector((store)=>
    {
      return store.cart.items;
    })
   
    console.log("CartItems->",cartItems)

  return (
    <div id="head">
      <div id="header" className="flex justify-between bg-pink-300">
        <div id="idLogo">
          <img className="w-24" src={LOGO_ADDRESS} alt="Logo" />
        </div>
        <div id="nav-items" className="flex">
          <ul className="flex justify-between w-100 m-3">
            <li>
              <Link to="/">Home</Link>
            </li>
            <Link to="/contact">
              <li>Contact</li>
            </Link>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/grocery">Grocery</Link>
            </li>
            <li>Cart-{cartItems.length}</li>
          </ul>
        </div>
        <button
          className="border-black px-3"
          id="rating-btn"
          onClick={() => {
            if (authState == "Login") {
              updateAuthState("Logout");
            } else {
              updateAuthState("Login");
            }
          }}
        >
          {authState} {data.loggedInUser}
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
