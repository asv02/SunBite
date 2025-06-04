import { useState, useEffect } from "react";
// import restaurants from "../utils/restaurantList.js";
import Shimmer from "./Shimmer.js";

// const restaurantData = restaurants;

const Cards = (props) => {
  //Props=> {resData = {}}
  // console.log("props->", props);
  //optional chaining
  const { cloudinaryImageId, name, avgRating, cuisines } = props?.resData?.info; // object
  return (
    <div id="card-container">
      <div id="card-img">
        <img
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
            cloudinaryImageId
          }
          alt="Card-img"
        />
      </div>
      <div id="card-content">
        <h3>{name}</h3>
        <h3>{avgRating}</h3>
        <h3>{cuisines[0]}</h3>
      </div>
    </div>
  );
};

const topratinghandler = null;

const Body = () => {
  // let arr = useState(restaurantData);
  let arr = useState([]);
  const restaurants = arr[0];
  const setRestaurants = arr[1];
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4384489&lng=77.0407101&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      console.log(
        "Restaurants list->",
        json?.data?.cards[4].card.card.gridElements.infoWithStyle.restaurants
      );
      setRestaurants(
        json?.data?.cards[4].card.card.gridElements.infoWithStyle.restaurants
      );
      setAllRestaurants(
        json?.data?.cards[4].card.card.gridElements.infoWithStyle.restaurants
      );
    })();
  }, []);

  const searchRes = () => {
    const filteredRes = allRestaurants.filter((res) => {
      console.log("name->", res.info.name);
      console.log("name->", search, " ");

      return res.info.name.toLowerCase().includes(search.toLowerCase());
    });
    console.log("filteredRes->", filteredRes);
    setRestaurants(filteredRes);
  };

  if (restaurants.length === 0) {
    return <Shimmer></Shimmer>;
  }

  return (
    <div className="body">
      <div id="search">
        <input
          type="text"
          id="search-bar"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            const filteredRes = allRestaurants.filter((res) => {
              console.log("Target Value in onChange->",e.target.value)
              return res.info.name.toLowerCase().includes(e.target.value.toLowerCase());
            });
            console.log("filteredRes on change->", filteredRes);
            setRestaurants(filteredRes);
          }}
        ></input>
        <button id="search-btn" onClick={searchRes}>
          Search
        </button>
        <button
          id="rating-btn"
          onClick={() => {
            const topRated = restaurants.filter((res) => {
              return res.info.avgRating >= 4.4;
            });
            console.log("restaurants->", topRated);
            setRestaurants(topRated);
            return topRated;
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div id="restaurant-container">
        {restaurants.map((res, index) => (
          <Cards key={res.info.id || index} resData={res} />
        ))}
        {/* <Cards resData= {restaurants[0]}></Cards>
        <Cards resData= {restaurants[0]}></Cards>
        <Cards resData= {restaurants[0]}></Cards> */}
      </div>
    </div>
  );
};

export default Body;
