import {LOGO_ADDRESS} from '../utils/constant'

const Header = () => {
  return (
    <div id="header">
      <div id="idLogo">
        <img
          src={LOGO_ADDRESS}
          alt="Logo"
        />
      </div>
      <div id="nav-items">
        <ul>
          <li>Home</li>
          <li>Contact</li>
          <li>About</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Header