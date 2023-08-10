import { createContext, useEffect, useState, useContext } from "react";
import UserContext from "./user-context";
import { useErrorBoundary } from "react-error-boundary";

const WatchlistContext = createContext({
  favouriteMovies: [],
  favouritesCount: 0,
  addToFavourite: (movie) => {},
  removeFromFavourite: (movieId) => {},
  isFavourite: (movieId) => {},
});

export function WatchlistContextProvider(props) {
  const UserCxt = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  // const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    console.log("printing user");
    console.log(UserCxt.user);
    if (UserCxt.isAuth) {
      console.log("now auth in WatchlistCxt");
      fetch("https://cineranker-backend.onrender.com/watchlist", {
        headers: {
          authorization: "Bearer " + UserCxt.accessToken,
        },
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("Failed to fetch movies");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data.movies);
          setFavourites(data.movies);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsLoading(false);
    }
  }, [UserCxt]);
  const [favourites, setFavourites] = useState([]);

  function addFavouriteHandler(movie) {
    console.log("before adding");
    console.log(favourites);

    if (UserCxt.isAuth) {
      setFavourites((prevFavourites) => {
        return prevFavourites.concat(movie);
      });
      console.log("added");
      console.log(favourites);

      fetch("https://cineranker-backend.onrender.com/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + UserCxt.accessToken,
        },

        body: JSON.stringify(movie),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  function removeFavouriteHandler(movieId) {
    console.log("removing");
    if (UserCxt.isAuth) {
      setFavourites((prevFavourites) => {
        return prevFavourites.filter((movie) => movie.id != movieId);
      });
      console.log(favourites);
      fetch(`https://cineranker-backend.onrender.com/watchlist/${movieId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  function isFavouriteHandler(movieId) {
    if (UserCxt.isAuth) {
      console.log("showing isFav " + movieId);
      console.log(favourites);
      console.log(favourites.some((movie) => movie.id == movieId));
      return favourites.some((movie) => movie.id == movieId);
    }

    return false;
  }

  const context = {
    favouriteMovies: favourites,
    favouritesCount: favourites.length,
    addToFavourite: addFavouriteHandler,
    removeFromFavourite: removeFavouriteHandler,
    isFavourite: isFavouriteHandler,
  };

  if (isLoading) return <div>Loading watchlistcontext</div>;
  else
    return (
      <WatchlistContext.Provider value={context}>
        {props.children}
      </WatchlistContext.Provider>
    );
}

export default WatchlistContext;
