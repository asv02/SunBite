import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Headers";
import Body from "./components/Body";
import Footer from "./components/Footer";


const Appcontainer = () => {
  return (
    <div id="container">
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
};

console.log(Appcontainer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Appcontainer />);
