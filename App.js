import React from "react";
import ReactDOM from "react-dom/client";

const Header = () => {
  return <h1> Header</h1>;
};

const Body = () => {
  return <h1> Body</h1>;
};

const Footer = () => {
  return <h1> Footer</h1>;
};

const Appcontainer = () => {
  <div id="container">
    <Header></Header>
    <Body></Body>
    <Footer></Footer>
  </div>;
};

root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Appcontainer/>);
