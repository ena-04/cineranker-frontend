import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import Resultcard from "../components/layout/ResultCard";
import Wishlist from "../components/layout/Wishlist";
import UserContext from "../store/user-context";
import Reviews from "../components/layout/Reviews";
import { Like } from "../components/layout/Like";
import { Watch } from "../components/layout/Watch";
import { Rating } from "../components/layout/Rating";

function MoviePage() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const UserCxt = useContext(UserContext);
  const [reviewList, setReviewList] = useState([]);
  const [isWatched, setIsWatched] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [watchCount, setWatchCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [currentRating, setCurrentRating] = useState(null);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  console.log("just in movie page");

  useEffect(() => {
    console.log("movie page useeffect");

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_KEY}&append_to_response=credits&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);

        console.log(data);
        setCast(data.credits.cast);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`https://cineranker-backend.onrender.com/movie/reviews/${movieId}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to get reviews");
        }
        return res.json();
      })
      .then((data) => {
        // setIsLoading(false);
        console.log(data.reviews);
        setReviewList(data.reviews);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`https://cineranker-backend.onrender.com/movie/likes/${movieId}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to get movie likes");
        }
        return res.json();
      })
      .then((data) => {
        // setIsLoading(false);
        setLikesCount(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`https://cineranker-backend.onrender.com/movie/watches/${movieId}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to get movie watches");
        }
        return res.json();
      })
      .then((data) => {
        // setIsLoading(false);
        setWatchCount(data.watches);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(
      `https://cineranker-backend.onrender.com/movie/ratings/${movieId}`,
      {}
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to get movie watches");
        }
        return res.json();
      })
      .then((data) => {
        if (!UserCxt.isAuth) setIsLoading(false);

        setRating(data.value);
        setUserCount(data.count);
        console.log("printing rating");
        console.log(rating);
        // setCurrentRating(data.currentRating);
      })
      .catch((err) => {
        console.log(err);
      });
    if (UserCxt.isAuth) {
      fetch(
        `https://cineranker-backend.onrender.com/movie/ratings/user/${movieId}`,
        {
          headers: {
            authorization: "Bearer " + UserCxt.accessToken,
          },
        }
      )
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("Failed to get user's ratings");
          }
          return res.json();
        })
        .then((data) => {
          setIsLoading(false);

          setCurrentRating(data.currentRating);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [UserCxt]);

  const addReview = (review) => {
    setReviewList(
      reviewList.concat({
        title: review.title,
        content: review.content,
        user: { name: UserCxt.user.name },
      })
    );
  };
  const addLike = () => {
    if (UserCxt.isAuth) {
      setLikesCount(likesCount + 1);
    }
  };

  const removeLike = () => {
    if (UserCxt.isAuth) {
      setLikesCount(likesCount - 1);
    }
  };

  const addWatch = () => {
    if (UserCxt.isAuth) {
      setWatchCount(watchCount + 1);
    }
  };

  const removeWatch = () => {
    if (UserCxt.isAuth) {
      setWatchCount(watchCount - 1);
    }
  };

  const addRating = (thisrating) => {
    if (UserCxt.isAuth) {
      fetch("https://cineranker-backend.onrender.com/movie/ratings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + UserCxt.accessToken,
        },

        body: JSON.stringify(thisrating),
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("Failed to get movie ratings");
          }
          return res.json();
        })
        .then((data) => {
          if (!currentRating) {
            setRating((prevRating) => {
              const newrating =
                (prevRating * userCount + data.rating.value) / (userCount + 1);
              console.log(newrating);
              return newrating;
              // Math.round(newrating * 10) / 10;
            });
            console.log("new rating is " + rating);
            setUserCount(userCount + 1);
            setCurrentRating(data.rating.value);
          } else {
            setRating((prevRating) => {
              console.log(prevRating);
              console.log(userCount);
              console.log(currentRating);
              console.log(data.rating.value);

              const newrating =
                (prevRating * userCount - currentRating + data.rating.value) /
                userCount;
              console.log(newrating);
              return newrating;
            });
            setCurrentRating(data.rating.value);
          }

          setIsLoading(false);
        });
    }
  };
  // throw new Error("Checking error boundary");
  //   return <div>Movie details of {movieId}.</div>;
  if (isLoading) return <div>Loading movie page...</div>;
  else
    return (
      <div className="bg-gray-50">
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-xl sm:px-6 lg:grid lg:max-w-7xl lg:gap-x-8 lg:px-8">
            <div className="mx-auto mt-6 max-w-xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className=" h-96 w-64 rounded-lg lg:block">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                  className="  object-cover h-full w-full  object-center rounded-lg"
                />
                <div className="flex px-2 py-2 justify-center">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 mx-1"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                    <p>{likesCount}</p>
                  </div>
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 mx-1"
                    >
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                      <path
                        fillRule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>{watchCount}</p>
                  </div>
                  {/* <div>ratings</div> */}
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>{Math.round(rating * 10) / 10}</p>
                  </div>
                </div>
              </div>
              <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="lg:col-span-2 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {movie.title}
                  </h1>
                  <h4>
                    {movie.release_date
                      ? movie.release_date.substring(0, 4)
                      : "-"}
                  </h4>
                  {/* <h4>Dir. by {}</h4> */}
                </div>

                {UserCxt.isAuth ? (
                  <div className="mt-4 lg:row-span-3 lg:mt-0">
                    {/* Reviews */}
                    <div className="mt-6">
                      <h3 className="sr-only">Reviews</h3>
                      {/* <Rating /> */}
                      {UserCxt.user ? (
                        <Rating
                          movie={movie}
                          userId={UserCxt.user._id}
                          rating={rating}
                          addRating={addRating}
                          currentRating={currentRating}
                        />
                      ) : (
                        <Rating movie={movie} addRating={addRating} />
                      )}
                    </div>
                    {UserCxt.user ? (
                      <Wishlist movie={movie} userId={UserCxt.user._id} />
                    ) : (
                      <Wishlist movie={movie} />
                    )}

                    <div className="mt-6 flex justify-center">
                      {UserCxt.user ? (
                        <Like
                          movie={movie}
                          userId={UserCxt.user._id}
                          addLike={addLike}
                          removeLike={removeLike}
                        />
                      ) : (
                        <Like
                          movie={movie}
                          addLike={addLike}
                          removeLike={removeLike}
                        />
                      )}
                      {UserCxt.user ? (
                        <Watch
                          movie={movie}
                          userId={UserCxt.user._id}
                          addWatch={addWatch}
                          removeWatch={removeWatch}
                        />
                      ) : (
                        <Watch
                          movie={movie}
                          addWatch={addWatch}
                          removeWatch={removeWatch}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="m-auto p-2 text-center rounded-sm bg-purple-200">
                    Sign in to log, rate or review
                  </div>
                )}

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="space-y-6">
                      <p className="text-base text-gray-900">{movie.tagline}</p>
                    </div>
                  </div>

                  <div className="mt-10">
                    {/* <h2 className="text-sm font-medium text-gray-900">Details</h2> */}

                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-gray-600">{movie.overview}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={toggleHandler}
                className="mx-auto mb-10 flex items-center justify-center rounded-md border border-transparent bg-btn-purple px-8 py-3 text-base font-medium text-white hover:bg-btn-purple2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {toggle ? "Hide Cast" : "Show Cast"}
              </button>
              {toggle && (
                <div>
                  <ul className="grid grid-cols-5 px-6 py-10">
                    {cast.map((cast, index) => (
                      <li key={cast.id}>
                        <Resultcard cast={cast} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                {/* <Reviews /> */}
                {UserCxt.user ? (
                  <Reviews
                    movie={movie.title}
                    poster={movie.poster_path}
                    reviewList={reviewList}
                    movieId={movie.id}
                    refreshFunc={addReview}
                    userId={UserCxt.user._id}
                  />
                ) : (
                  <Reviews
                    reviewList={reviewList}
                    movieId={movie.id}
                    refreshFunc={addReview}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto mt-6 max-w-xl sm:px-6 lg:grid lg:max-w-7xl lg:px-8">
            {/* <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Reviews
            </h1> */}
          </div>
        </div>
      </div>
    );
}

export default MoviePage;
