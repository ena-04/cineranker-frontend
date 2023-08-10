import { createContext, useEffect, useState, useContext } from "react";
import UserContext from "./user-context";

const LikeContext = createContext({
  likedMovies: [],
  likesCount: 0,
  addToLike: (movie) => {},
  removeFromLike: (movieId) => {},
  isLiked: (movieId) => {},
});

export function LikeContextProvider(props) {
  const UserCxt = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    console.log("printing user");
    console.log(UserCxt.user);
    if (UserCxt.isAuth) {
      console.log("now auth in LikeCxt");
      fetch("https://cineranker-backend.onrender.com/likes", {
        headers: {
          authorization: "Bearer " + UserCxt.accessToken,
        },
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("Failed to fetch liked movies");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data.movies);
          setLikes(data.movies);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [UserCxt]);

  function addLikeHandler(movie) {
    console.log("before adding");
    console.log(likes);

    if (UserCxt.isAuth) {
      setLikes((prevLikes) => {
        return prevLikes.concat(movie);
      });
      console.log("added");
      console.log(likes);

      fetch("https://cineranker-backend.onrender.com/likes", {
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

  function removeLikeHandler(movieId) {
    console.log("removing");
    if (UserCxt.isAuth) {
      setLikes((prevLikes) => {
        return prevLikes.filter((movie) => movie.movieId != movieId);
      });
      console.log(likes);
      fetch(`https://cineranker-backend.onrender.com/likes/${movieId}`, {
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

  function isLikedHandler(movieId) {
    if (UserCxt.isAuth) {
      console.log("showing isLiked " + movieId);
      console.log(likes);
      console.log(likes.some((movie) => movie.movieId == movieId));
      return likes.some((movie) => movie.movieId == movieId);
    }

    return false;
  }

  const context = {
    likedMovies: likes,
    likesCount: likes.length,
    addToLike: addLikeHandler,
    removeFromLike: removeLikeHandler,
    isLiked: isLikedHandler,
  };

  if (isLoading) return <div>Loading watchlistcontext</div>;
  else
    return (
      <LikeContext.Provider value={context}>
        {props.children}
      </LikeContext.Provider>
    );
}

export default LikeContext;
