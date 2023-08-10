import { useEffect, useState, useContext } from "react";
import WatchlistContext from "../../store/watchlist-context";

function Wishlist(props) {
  // const [isLoading, setIsLoading] = useState(true);
  // const [found, setFound] = useState(true);

  const WatchlistCxt = useContext(WatchlistContext);

  const movieItem = {
    id: props.movie.id,
    title: props.movie.title,
    imageUrl: props.movie.poster_path,
    runtime: props.movie.runtime,
    user: props.userId,
  };

  // useEffect(() => {

  // }, []);

  const isFavourite = WatchlistCxt.isFavourite(props.movie.id);

  const toggleWishlistHandler = () => {
    console.log("in toggling " + isFavourite);
    if (isFavourite) {
      WatchlistCxt.removeFromFavourite(props.movie.id);
    } else {
      console.log("movie is");
      console.log(movieItem);
      WatchlistCxt.addToFavourite(movieItem);
    }
  };

  //   if (isLoading) return <div>Loading</div>;
  //   else
  return (
    <button
      type="submit"
      onClick={toggleWishlistHandler}
      className=" flex items-center justify-center rounded-md border border-transparent bg-btn-purple px-8 py-3 text-base font-medium text-white hover:bg-btn-purple2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {/* <Link to={`/movie/${props.movie.id}`}>  */}
      {isFavourite ? "Remove from Watchlist" : "Add to Watchlist"}
      {/* </Link> */}
    </button>
  );
}

export default Wishlist;
