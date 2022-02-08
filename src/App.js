import "./App.css";
import { useState, useEffect } from "react";
import Restaurant from "./Restaurant";
import { SignIn, SignOut, useAuthentication } from "./authService";
import { fetchFavorites } from "./favoritesService";
import { fetchWishlists } from "./wishlistService";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [wishlists, setWishlists] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const user = useAuthentication();
  const [location, setLocation] = useState({
    name: "LMU",
    lat: 33.9702,
    long: -118.4166,
  }); // LMU by default

  function getRestaurantData() {
    // Uses a proxy server set up on Code Sandbox to secure API key and fix CORS
    // Server talks to Yelp API
    const url =
      "https://evening-escarpment-43670.herokuapp.com/restaurants?lat=" +
      location.lat +
      "&long=" +
      location.long;
    fetch(url)
      .then((response) => response.json())
      .then((response) => setRestaurants(response.businesses));
  }

  useEffect(() => {
    if (user) {
      fetchFavorites().then(setFavorites);
      fetchWishlists().then(setWishlists);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites().then(setFavorites);
    fetchWishlists().then(setWishlists);
  }, []);

  useEffect(getRestaurantData, [location]);

  useEffect(() => {
    setShowFavorites(false);
    setShowWishlist(false);
  }, [location]);

  useEffect(() => {
    setRestaurants([]);
  }, [showFavorites, showWishlist]);

  return (
    <div className="App">
      <h1 className="title">VINDER</h1>
      <div className="signInButton">{!user ? <SignIn /> : <SignOut />}</div>
      <div className="content">
        <p> What's cookin, good lookin? </p>
        <button
          className="mainButton"
          onClick={() =>
            setLocation({ name: "LMU", lat: 33.9702, long: -118.4166 })
          }
        >
          {" "}
          Los Angeles - LMU{" "}
        </button>
        <button
          className="mainButton"
          onClick={() =>
            setLocation({
              name: "Manhattan Beach",
              lat: 33.8847,
              long: -118.4166,
            })
          }
        >
          {" "}
          Los Angeles - Manhattan Beach{" "}
        </button>
        <button
          className="mainButton"
          onClick={() =>
            setLocation({ name: "Downtown", lat: 34.0488, long: -118.2518 })
          }
        >
          {" "}
          Los Angeles - Downtown{" "}
        </button>
        <button
          className="mainButton"
          onClick={() =>
            setLocation({ name: "Santa Monica", lat: 34.0195, long: -118.4912 })
          }
        >
          {" "}
          Los Angeles - Santa Monica{" "}
        </button>
        <button
          className="mainButton"
          onClick={() =>
            setLocation({ name: "Venice", lat: 33.985, long: -118.4695 })
          }
        >
          {" "}
          Los Angeles - Venice{" "}
        </button>
        <p>
          <button
            className="mainButton"
            onClick={() => {
              setShowFavorites(true);
              setShowWishlist(false);
            }}
          >
            View Favorites
          </button>
          <button
            className="mainButton"
            onClick={() => {
              setShowFavorites(false);
              setShowWishlist(true);
            }}
          >
            View Wishlist
          </button>
        </p>

        <p className="selectedText"> Selected: {location.name} </p>
        {showFavorites ? <p className="selectedText"> Favorites </p> : <></>}
        {showWishlist ? <p className="selectedText"> Wishlist </p> : <></>}

        {showFavorites && user
          ? favorites.map((favorite) => <p>{favorite.name}</p>)
          : restaurants.map((restaurant) => (
              <Restaurant restaurantData={restaurant} />
            ))}
        {showWishlist && user
          ? wishlists.map((wish) => <p>{wish.name}</p>)
          : restaurants.map((restaurant) => (
              <Restaurant restaurantData={restaurant} />
            ))}

        {/* {restaurants.map((restaurant) => (
          <Restaurant restaurantData={restaurant} />
        ))} */}
      </div>
    </div>
  );
}

export default App;
