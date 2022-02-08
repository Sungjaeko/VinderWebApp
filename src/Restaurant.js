import { addFavorites } from "./favoritesService";
import { addWishlists } from "./wishlistService";

export default function Restaurant({ restaurantData }) {
  return (
    <div className="restaurant">
      <text>{restaurantData.name}</text>
      <img
        src={restaurantData.image_url}
        className="resImage"
        alt="restaurant"
      />
      <text className="resElements">
        {restaurantData.categories.map(
          (category) => " | " + category.title + " | "
        )}
      </text>
      <text className="resElements">Price Range: {restaurantData.price}</text>
      <text className="resElements">Rating: {restaurantData.rating}</text>
      <p>
        <button
          className="mainButton"
          onClick={() =>
            addFavorites({
              yelpId: restaurantData.id,
              name: restaurantData.name,
            })
          }
        >
          {" "}
          Add to Favorites{" "}
        </button>
        <button
          className="mainButton"
          onClick={() =>
            addWishlists({
              yelpId: restaurantData.id,
              name: restaurantData.name,
            })
          }
        >
          {" "}
          Add to Wishlist{" "}
        </button>
      </p>
    </div>
  );
}
