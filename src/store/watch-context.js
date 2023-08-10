import { createContext, useEffect, useState, useContext } from "react";
import UserContext from "./user-context";

const WatchContext = createContext({
  watchedMovies: [],
  watchesCount: 0,
  addToWatch: (movie) => {},
  removeFromWatch: (movieId) => {},
  isWatched: (movieId) => {},
});

export function WatchContextProvider(props) {
  const UserCxt = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [watches, setWatches] = useState([]);

  useEffect(() => {
    console.log("printing user in watches");
    console.log(UserCxt.user);
    if (UserCxt.isAuth) {
      console.log("now auth in WatchCxt");
      fetch("https://cineranker-backend.onrender.com/watches", {
        headers: {
          authorization: "Bearer " + UserCxt.accessToken,
        },
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("Failed to fetch watched movies");
          }
          return res.json();
        })
        .then((data) => {
          console.log("watched movies are");
          console.log(data.movies);
          setWatches(data.movies);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [UserCxt]);

  function addWatchHandler(movie) {
    console.log("before adding");
    console.log(watches);

    if (UserCxt.isAuth) {
      setWatches((prevWatches) => {
        return prevWatches.concat(movie);
      });
      console.log("added");
      console.log(watches);

      fetch("https://cineranker-backend.onrender.com/watches", {
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

  function removeWatchHandler(movieId) {
    console.log("removing watch");
    if (UserCxt.isAuth) {
      setWatches((prevWatches) => {
        return prevWatches.filter((movie) => movie.movieId != movieId);
      });
      console.log(watches);
      fetch(`https://cineranker-backend.onrender.com/watches/${movieId}`, {
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

  function isWatchedHandler(movieId) {
    if (UserCxt.isAuth) {
      console.log("showing isWatch " + movieId);
      console.log(watches);
      console.log(watches.some((movie) => movie.movieId == movieId));
      return watches.some((movie) => movie.movieId == movieId);
    }

    return false;
  }

  const context = {
    watchedMovies: watches,
    watchesCount: watches.length,
    addToWatch: addWatchHandler,
    removeFromWatch: removeWatchHandler,
    isWatched: isWatchedHandler,
  };

  if (isLoading) return <div>Loading watchlistcontext</div>;
  else
    return (
      <WatchContext.Provider value={context}>
        {props.children}
      </WatchContext.Provider>
    );
}

export default WatchContext;
