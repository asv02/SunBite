import React, { useState } from "react";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import ResCategory from "./ResCategory";

const RestaurantMenu = () => {
  const [resMenu, SetResMenu] = useState([]);
  const [resCat, SetResCat] = useState([]);
  const [show,setShow] = useState(false);
  const [showIndex,setShowIndex] = useState(null);

  const parmas = useParams();
  const id = parmas.resId;
  console.log("id->", id);

  const handleshow = () => setShow((prev) => !prev);

  const fetchMenu = async (id) => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.4384489&lng=77.0407101&restaurantId=" +
        id +
        "&catalog_qa=undefined&submitAction=ENTER"
    );
    const restaurantMenu = await data.json();
    console.log(
      "restaurantMenu names->",
      restaurantMenu.data.cards[4].groupedCard.cardGroupMap.REGULAR
    );

    const category =
      restaurantMenu.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards.filter(
        (res) => {
          return (
            res.card.card["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
          );
        }
      );
    console.log("Category->", category);
    SetResCat(category);
    return restaurantMenu.data.cards[4].groupedCard.cardGroupMap.REGULAR
      .cards[1].card.card.carousel;
  };

  useEffect(() => {
    (async () => {
      const menu = await fetchMenu(id);
      console.log("menu->", menu);
      SetResMenu(menu);
      console.log("resMenu after api->", resMenu);
    })();
  }, []);

  if (resMenu.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="bg-amber-200">
      <h2>Menu</h2>
      {resCat.map((res, index) => {
        const title = res?.card?.card?.title;
        const itemCards = res?.card?.card?.itemCards;
        return <ResCategory key={index} title={title} itemCards={itemCards} show={index==showIndex && show} setShow={()=>{handleshow()}} showIndex={()=>{setShowIndex(index)}}/>;
      })}
      {/* <ul>
        {resMenu.map((res) => {
          return <li key={res?.dish?.info?.id}>{res?.dish?.info?.name}</li>;
        })}
      </ul> */}
    </div>
  );
};

export default RestaurantMenu;
