import React, { lazy, Suspense, useEffect, useState } from "react";
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
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";


const Grocery = lazy(() => {
  return import("./components/Grocery");
});

const Appcontainer = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName("Akash");
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div id="container">
          <Header></Header>
          <Body></Body>
          <Footer></Footer>
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const Approute = createBrowserRouter([
  {
    path: "/",
    Component: Appcontainer,
    children: [
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Grocery />
          </Suspense>
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
