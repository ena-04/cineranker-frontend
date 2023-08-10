import { Link } from "react-router-dom";
import WatchlistContext from "../../store/watchlist-context";
import UserContext from "../../store/user-context";
import WatchContext from "../../store/watch-context";
import { useContext, useState } from "react";
import Resultcard from "./ResultCard";
import LikeContext from "../../store/like-context";
import ReviewContext from "../../store/reviews-context";

function Navbar() {
  const WatchlistCxt = useContext(WatchlistContext);
  const UserCxt = useContext(UserContext);
  const LikeCxt = useContext(LikeContext);
  const WatchCxt = useContext(WatchContext);
  const ReviewCxt = useContext(ReviewContext);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchHandler = (e) => {
    e.preventDefault();
    setQuery(e.target.value);

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) setResults(data.results);
        else setResults([]);
      });
  };

  //   if (UserCxt.isAuth) {
  //   }

  return (
    <div className=" bg-white">
      <nav className="flex px-4 border-b md:shadow-lg items-center relative">
        <div className="text-lg font-bold md:py-0 py-4">CineRanker</div>
        <div className="md:px-2 mx-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0  ">
          <ul className="flex items-center">
            <Link to="/">
              <li className="flex md:inline-flex p-4 items-center hover:text-purple-600">
                Home
              </li>
            </Link>
            {UserCxt.isAuth && (
              <Link to="/wishlist">
                <li className="flex md:inline-flex p-4 items-center hover:text-purple-600">
                  {"Watchlist (" + WatchlistCxt.favouritesCount + ")"}
                </li>
              </Link>
            )}
            {UserCxt.isAuth && (
              <li className="relative parent flex justify-between md:inline-flex p-4 items-center hover:text-purple-600 space-x-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg"
                  alt=""
                />
                <span>{UserCxt.user.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 fill-current pt-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
                </svg>

                <ul className="child transition duration-300 md:absolute top-full right-0 md:w-48 bg-white md:shadow-lg md:rounded-b ">
                  <Link to="/likes">
                    <li className="flex px-4 py-3 hover:text-purple-600">
                      {"Likes (" + LikeCxt.likesCount + ")"}
                    </li>
                  </Link>
                  <Link to="/watches">
                    <li className="flex px-4 py-3 hover:text-purple-600">
                      {"Watched (" + WatchCxt.watchesCount + ")"}
                    </li>
                  </Link>
                  <Link to="/reviews">
                    <li className="flex px-4 py-3 hover:text-purple-600">
                      {"Reviews (" + ReviewCxt.reviewsCount + ")"}
                    </li>
                  </Link>
                </ul>
              </li>
            )}

            {/* <div className="max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded-md  flex items-center md:inline-flex p-2">
              <input
                className=" border-gray-300 bg-transparent font-semibold text-sm pl-4"
                type="text"
                // placeholder="I'm searching for ..."

                placeholder="Search for a movie ..."
                value={query}
                onChange={searchHandler}
              />
              
            </div> */}
            {/* <div className="">
              {results.length > 0 && (
                <ul className="results grid grid-cols-5 mx-auto px-6 py-10">
                  {results.map((movie) => (
                    <li key={movie.id}>
                      <Resultcard movie={movie} />
                    </li>
                  ))}
                </ul>
              )}
            </div> */}
          </ul>
        </div>

        <div className="flex justify-between items-center ">
          {!UserCxt.isAuth ? (
            <Link
              className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
              to="/login"
            >
              Login
            </Link>
          ) : (
            <></>
          )}

          {!UserCxt.isAuth ? (
            <Link
              className="text-gray-800 text-sm font-semibold border px-4 py-1 rounded-lg hover:text-purple-600 hover:border-purple-600"
              to="/signup"
            >
              Sign Up
            </Link>
          ) : (
            <></>
          )}

          {UserCxt.isAuth ? (
            <Link
              className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
              to="/logout"
            >
              Logout
            </Link>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
