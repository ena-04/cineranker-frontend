import React, { useState, useContext } from "react";
import UserContext from "../../store/user-context";

export const Rating = (props) => {
  const [rating, setRating] = useState(props.currentRating);
  const [hover, setHover] = useState(null);
  const UserCxt = useContext(UserContext);

  //   () => setRating(rate)
  const setRatingHandler = (e) => {
    const ratingItem = {
      movieId: props.movie.id,
      value: e.target.value,
      user: props.userId,
    };
    if (UserCxt.isAuth) {
      setRating(e.target.value);
      // RateCxt.addRating(rating);
      props.addRating(ratingItem);
    }
  };
  return (
    <div className="flex items-center justify-center mb-10">
      {[...Array(5)].map((star, index) => {
        const rate = index + 1;
        return (
          <label>
            <input
              type="radio"
              className="hidden"
              name="rating"
              value={rate}
              onClick={setRatingHandler}
            />
            {/* <StarIcon
              className=" h-5 w-5 flex-shrink-0"
              color={rate <= rating ? "" : "text-gray-900"}
              aria-hidden="true"
            /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              //   {rate<=rating? (fill="none"
              //   strokeWidth={1.5}
              //   stroke="currentColor"):(fill='currentColor')}

              fill={rate <= (hover || rating) ? "currentColor" : "none"}
              stroke={rate <= (hover || rating) ? "" : "currentColor"}
              //   strokeWidth={1.5}
              //   fill="none"
              className="w-6 h-6 "
              onMouseEnter={() => {
                setHover(rate);
              }}
              onMouseLeave={() => {
                setHover(null);
              }}
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        );
      })}
    </div>
  );
};
