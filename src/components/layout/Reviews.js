import React, { useState, useContext } from "react";
import UserContext from "../../store/user-context";
import SingleReview from "./SingleReview";
import ReviewContext from "../../store/reviews-context";

function Reviews(props) {
  const UserCxt = useContext(UserContext);
  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");

  const ReviewCxt = useContext(ReviewContext);

  const handleContentChange = (e) => {
    // setReview(e.currentTarget.value);
    setReview(e.target.value);
  };
  const handleTitleChange = (e) => {
    // setReview(e.currentTarget.value);
    setTitle(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (UserCxt.isAuth) {
      const comment = {
        movie: props.movie,
        poster: props.poster,
        title: title,
        content: review,
        user: UserCxt.user._id,
        movieId: props.movieId,
      };
      setReview("");
      setTitle("");
      ReviewCxt.addReview(comment);
      props.refreshFunc(comment);

      // fetch("http://localhost:8080/movie/reviews", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     authorization: "Bearer " + UserCxt.accessToken,
      //   },

      //   body: JSON.stringify(comment),
      // })
      //   .then((res) => {
      //     if (res.status !== 200) {
      //       throw new Error("Failed to add reviews");
      //     }
      //     return res.json();
      //   })
      //   .then((data) => {
      //     setReview("");
      //     setTitle("");
      //     props.refreshFunc(data.review);
      //   });
    }
  };

  return (
    <div>
      {/* Root Comment Form */}
      {/* <form onSubmit={onSubmit}>
        <br />
        <div>
          <textarea
            className="border-2 w-full p-2 m-2"
            cols="30"
            rows="10"
            onChange={handleChange}
            value={review}
            placeholder="write some comments"
          ></textarea>

          <button
            onClick={onSubmit}
            className="mx-auto mb-10 flex items-center justify-center rounded-md border border-transparent bg-btn-purple px-8 py-3 text-base font-medium text-white hover:bg-btn-purple2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form> */}{" "}
      {UserCxt.isAuth && (
        <div>
          <h1 className="pl-10 text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Write a Review!
          </h1>
          <section className="">
            <div className="mx-auto max-w-screen-xl px-4 pt-6 pb-16 sm:px-6 lg:px-8 items-center">
              <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                  <form action="" className="space-y-4">
                    <div>
                      <label className="sr-only" htmlFor="name">
                        Name
                      </label>
                      <input
                        className="w-full rounded-lg border-2 border-gray-200 p-3 text-sm"
                        placeholder="Review title"
                        type="text"
                        id="name"
                        value={title}
                        onChange={handleTitleChange}
                      />
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="message">
                        Message
                      </label>

                      <textarea
                        className="w-full rounded-lg border-2 border-gray-200 p-3 text-sm"
                        cols="30"
                        rows="10"
                        onChange={handleContentChange}
                        value={review}
                        placeholder="Write a review ..."
                      ></textarea>
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={onSubmit}
                        className="mx-auto mb-10 flex items-center justify-center rounded-md border border-transparent bg-btn-purple px-8 py-3 text-base font-medium text-white hover:bg-btn-purple2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {/* Comment Lists  */}
      {console.log("reviews list is: ")}
      {console.log(props.reviewList)}
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Reviews {"(" + props.reviewList.length + ")"}
      </h1>
      <hr />
      <br />
      <div className=" bg-white items-center justify-center">
        {props.reviewList.map((review, index) => {
          return (
            <SingleReview
              title={review.title}
              username={review.user.name}
              content={review.content}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Reviews;
