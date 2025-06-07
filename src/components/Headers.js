import { useState } from "react";
import { LOGO_ADDRESS } from "../utils/constant";
import { Outlet, Link } from "react-router";

const Header = () => {
  const [authState, updateAuthState] = useState("Login");
  return (
    <div id="head">
      <div id="header">
        <div id="idLogo">
          <img src={LOGO_ADDRESS} alt="Logo" />
        </div>
        <div id="nav-items">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <Link to='/contact'><li>Contact</li></Link>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/grocery">Grocery</Link>
            </li>
            <li>Cart</li>
          </ul>
        </div>
        <button
          id="rating-btn"
          onClick={() => {
            if (authState == "Login") {
              updateAuthState("Logout");
            } else {
              updateAuthState("Login");
            }
          }}
        >
          {authState}
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
