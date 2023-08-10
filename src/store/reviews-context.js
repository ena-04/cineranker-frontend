import { createContext, useEffect, useState, useContext } from "react";
import UserContext from "./user-context";

const ReviewContext = createContext({
  reviewedMovies: [],
  reviewsCount: 0,
  addReview: (comment) => {},
});

export function ReviewContextProvider(props) {
  const UserCxt = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    console.log("printing user");
    console.log(UserCxt.user);
    if (UserCxt.isAuth) {
      console.log("now auth in LikeCxt");
      fetch("https://cineranker-backend.onrender.com/reviews", {
        headers: {
          authorization: "Bearer " + UserCxt.accessToken,
        },
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("Failed to fetch reviews");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data.reviews);
          setReviews(data.reviews);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [UserCxt]);

  function addReviewHandler(comment) {
    console.log("before adding");
    console.log(reviews);

    if (UserCxt.isAuth) {
      setReviews((prevReviews) => {
        return prevReviews.concat(comment);
      });
      console.log("added");
      console.log(reviews);

      fetch("https://cineranker-backend.onrender.com/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + UserCxt.accessToken,
        },

        body: JSON.stringify(comment),
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

  const context = {
    reviewedMovies: reviews,
    reviewsCount: reviews.length,
    addReview: addReviewHandler,
  };

  if (isLoading) return <div>Loading reviewcontext</div>;
  else
    return (
      <ReviewContext.Provider value={context}>
        {props.children}
      </ReviewContext.Provider>
    );
}

export default ReviewContext;
