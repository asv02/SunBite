import { useState } from "react";
import restaurants from "../utils/restaurantList.js";

const restaurantData = restaurants;

const Cards = (props) => {
  //Props=> {resData = {}}
  console.log("props->", props);
  //optional chaining
  const { image, name, rating, cuisine } = props?.resData?.info; // object
  return (
    <div id="card-container">
      <div id="card-img">
        <img src={image.url} alt="Card-img" />
      </div>
      <div id="card-content">
        <h3>{name}</h3>
        <h3>{rating.aggregate_rating}</h3>
        <h3>{cuisine[0].name}</h3>
      </div>
    </div>
  );
};

const topratinghandler = null;

const Body = () => {
  let arr= useState(restaurantData);
  let restaurants = arr[0]
  let setRestaurants = arr[1]
  console.log("arr->",arr)
  return (
    <div className="body">
      <div id="body-search-bar">Search Bar</div>
      <button
        id="rating-btn"
        onClick={() => {
          const topRated = restaurants.filter((res) => {
            return res.info.rating.aggregate_rating >= 4;
          });
          console.log("restaurants->", topRated);
          setRestaurants(topRated);
          return topRated;
        }}
      >
        Top Rated Restaurants
      </button>
      <div id="restaurant-container">
        {restaurants.map((res, index) => (
          <Cards key={res.info.resId || index} resData={res} />
        ))}
        {/* <Cards resData= {restaurants[0]}></Cards>
        <Cards resData= {restaurants[0]}></Cards>
        <Cards resData= {restaurants[0]}></Cards> */}
      </div>
    </div>
  );
};

export default Body;
