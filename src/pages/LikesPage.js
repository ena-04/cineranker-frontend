import { useContext } from "react";
import LikeContext from "../store/like-context";
import { Link } from "react-router-dom";

function LikesPage() {
  const LikeCxt = useContext(LikeContext);
  const renderBody = LikeCxt.likedMovies.map((movie, index) => {
    return (
      <div className=" bg-white rounded-lg flex items-center justify-between space-x-8 m-2">
        <div className=" justify-between items-center ">
          <Link to={`/movie/${movie.movieId}`}>
            <div className="xyz">
              {movie.poster ? (
                <div>
                  <img
                    className="  object-cover h-full w-full  object-center rounded-lg"
                    src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                    alt={`${movie.movieId} Poster`}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </Link>
        </div>
      </div>
    );
  });
  return (
    <div className="bg-gray-200 min-h-screen flex  justify-center px-16">
      <div className=" w-full max-w-3xl">
        <div className="m-8 items-center justify-between grid grid-cols-5">
          {renderBody}

          {/* <div className="p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
            <div className="flex-1 flex justify-between items-center">
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
              <div className="w-24 h-6 rounded-lg bg-purple-300"></div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default LikesPage;
