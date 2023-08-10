import React from "react";
import { useEffect, useState, useContext } from "react";
import WatchContext from "../../store/watch-context";

export const Watch = (props) => {
  const WatchCxt = useContext(WatchContext);

  const movieItem = {
    movieId: props.movie.id,
    poster: props.movie.poster_path,
    user: props.userId,
  };
  const isWatched = WatchCxt.isWatched(props.movie.id);

  const toggleWatchHandler = () => {
    console.log("in toggling " + isWatched);
    if (isWatched) {
      WatchCxt.removeFromWatch(props.movie.id);
      props.removeWatch();
    } else {
      console.log("movie is");
      console.log(movieItem);
      WatchCxt.addToWatch(movieItem);
      props.addWatch();
    }
  };
  return (
    <div
      className=" justify-center mx-4 cursor-pointer"
      onClick={toggleWatchHandler}
    >
      <div className="flex justify-center ">
        {isWatched ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path
              fillRule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        )}
      </div>
      <p> {isWatched ? "Watched" : "Watch"}</p>
    </div>
  );
};
