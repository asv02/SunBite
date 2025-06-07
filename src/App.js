import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Headers";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import { createBrowserRouter, RouterProvider } from "react-router";
import RestaurantMenu from "./components/RestaurantMenu";
import Shimmer from "./components/Shimmer";
// import Grocery from "./components/Grocery";

const Grocery = lazy(() => {
  return import("./components/Grocery");
});

const Appcontainer = () => {
  return (
    <div id="container">
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
};

const Approute = createBrowserRouter([
  {
    path: "/",
    Component: Header,
    // errorElement: <Error />,
    children: [
      {
        path: "/",
        Component: Body,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<Shimmer/>}><Grocery/></Suspense>
        ),
      },
      {
        path: "/about",
        element: <About number={8090178921} />,
      },
      {
        path: "/restaurantmenu/:resId",
        Component: RestaurantMenu,
      },
      {
        path: "/contact",
        element: <Contact number={8090178921}></Contact>,
      },
    ],
  },
]);

console.log(Appcontainer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={Approute} />);
