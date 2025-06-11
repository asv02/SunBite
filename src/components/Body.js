import { useState, useEffect, useContext } from "react";
// import restaurants from "../utils/restaurantList.js";
import Shimmer from "./Shimmer.js";
import OnlineStatus from "../utils/OnlineStatus.js";
import { Link } from "react-router";
import UserContext from "../utils/UserContext.js";
import { useDispatch } from "react-redux";
import { addItems } from "../utils/cartSlice.js";

// const restaurantData = restaurants;

const Cards = (props) => {
  //Props=> {resData = {}}
  // console.log("props->", props);
  //optional chaining
  const { cloudinaryImageId, name, avgRating, cuisines } = props?.resData?.info; // object
  return (
    <div id="card-container" className="w-[200px] bg-gray-200 m-2 p-1">
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

const withPromotedLabel = (Card) => {
  return () => {
    return (
      <div>
        <label>Promoted</label>
        <Card />
      </div>
    );
  };
};

const topratinghandler = null;

const Body = () => {
  // let arr = useState(restaurantData);
  let arr = useState([]);
  const restaurants = arr[0];
  const setRestaurants = arr[1];
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [search, setSearch] = useState("");

  const data = useContext(UserContext)

  const dispatch = useDispatch()

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
      dispatch(addItems("Samosha"))
      return res.info.name.toLowerCase().includes(search.toLowerCase());
    });
    console.log("filteredRes->", filteredRes);
    setRestaurants(filteredRes);
  };

  if (OnlineStatus() == false) {
    return (
      <h1>It seems you are offline...Please provide internet connection.</h1>
    );
  }

  if (restaurants.length === 0) {
    return <Shimmer></Shimmer>;
  }

  return (
    <div className="body">
      <div id="search" className=" flex">
        <div className="m-2">
          <input
            className="border-2 rounded-2xl m-1"
            type="text"
            id="search-bar"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              const filteredRes = allRestaurants.filter((res) => {
                console.log("Target Value in onChange->", e.target.value);
                return res.info.name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase());
              });
              console.log("filteredRes on change->", filteredRes);
              setRestaurants(filteredRes);
            }}
          ></input>
          <button
            id="search-btn"
            className="border-1 rounded-2xl bg-amber-200"
            onClick={searchRes}
          >
            Search
          </button>
        </div>
        <button
          className="border-2 rounded-3xl m-2"
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
        <input type="text" className="border border-amber-950" onChange={(e)=>
          {
            data.setUserName(e.target.value)
          }}></input>
      </div>
      <div id="restaurant-container" className="flex flex-wrap">
        {restaurants.map((res, index) => (
          <Link to={"/restaurantmenu/" + res.info.id} key={res.info.id || index}>
            <Cards resData={res}/>
          </Link>
        ))}
        {/* <Cards resData= {restaurants[0]}></Cards>
        <Cards resData= {restaurants[0]}></Cards>
        <Cards resData= {restaurants[0]}></Cards> */}
      </div>
    </div>
  );
};

export default Body;
