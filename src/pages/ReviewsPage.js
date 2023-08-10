import { useContext } from "react";
import LikeContext from "../store/like-context";
import { Link } from "react-router-dom";
import ReviewContext from "../store/reviews-context";

function ReviewsPage() {
  const ReviewCxt = useContext(ReviewContext);
  const renderBody = ReviewCxt.reviewedMovies.map((review, index) => {
    return (
      //   <div className="rounded-sm w-1/2 grid grid-cols-10 bg-white shadow p-3 gap-2 items-center  ">

      <div className="rounded-sm w-1/2   bg-white shadow p-2 gap-2 items-center  ">
        <Link to={`/movie/${review.movieId}`} className="flex">
          {/* <div className="col-span-10 md:col-span-1"> */}
          <div className="xyz">
            {review.poster ? (
              <div className="h-24 w-16">
                <img
                  className="  object-cover h-full w-full  object-center "
                  src={`https://image.tmdb.org/t/p/w200${review.poster}`}
                  alt={`${review.movieId} Poster`}
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
          {/* </div> */}
          <div className="ml-2">
            {/* <div className="col-span-10 xl:-ml-5"> */}

            <div>
              <p className="text-blue-600 font-semibold">{review.title}</p>
            </div>
            {/* </div> */}

            <div className="">
              <p className="text-sm text-gray-800 font-light">
                {review.content}
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div className="bg-gray-200 flex flex-col gap-4 h-screen items-center justify-center">
      {renderBody}
    </div>
  );
}

export default ReviewsPage;
