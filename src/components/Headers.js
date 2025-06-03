import { useState } from "react";
import { LOGO_ADDRESS } from "../utils/constant";

const Header = () => {
  const [authState, updateAuthState] = useState("Login");
  return (
    <div id="header">
      <div id="idLogo">
        <img src={LOGO_ADDRESS} alt="Logo" />
      </div>
      <div id="nav-items">
        <ul>
          <li>Home</li>
          <li>Contact</li>
          <li>About</li>
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
  );
};

export default Header;
