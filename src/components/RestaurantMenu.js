import React, { useState } from "react";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";

const fetchMenu = async () => {
  const data = await fetch(
    "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.4384489&lng=77.0407101&restaurantId=594820&catalog_qa=undefined&submitAction=ENTER"
  );
  const restaurantMenu = await data.json();
  console.log(
    "restaurantMenu names->",
    restaurantMenu.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[1].card
      .card.carousel
    // .carousel[0].dish.info
  );
  return restaurantMenu.data;
};

const RestaurantMenu = () => {
  const [resMenu, SetResMenu] = useState([]);
  const parmas = useParams()
  const id = parmas.resId
  console.log("id->",id)
  useEffect(() => {
    (async () => {
      const menu = await fetchMenu();
      console.log("menu->", menu);
      SetResMenu(menu);
    })();
  }, []);

  if (resMenu.length === 0) {
    return <Shimmer />;
  }
  const { dishes } =
    resMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
      ?.carousel;

  return (
    <div>
      <h1>{resMenu.cards[0].card.card.text}</h1>
      <h2>Menu</h2>
      <ul>
        {dishes.map((res) => {
          return <li key={res?.dish?.info?.id}>{res?.dish?.info?.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
