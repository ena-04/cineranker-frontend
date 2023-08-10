import { Link } from "react-router-dom";
import classes from "./ResultCard.module.css";

function Resultcard(props) {
  const movie = props.movie;
  const cast = props.cast;
  if (cast)
    return (
      <div
        // className="w-full lg:mb-0 mb-12 px-4"
        className="w-full mb-6 shadow-xl"
      >
        <div>
          {cast.profile_path ? (
            <img
              className="mx-auto"
              src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
              alt={`${cast.name} Poster`}
            />
          ) : (
            <div></div>
          )}
        </div>

        <div className="text-center">
          <h3>{cast.name}</h3>
        </div>
      </div>
    );

  return (
    <div className="w-full mb-6 shadow-xl">
      <Link to={`/movie/${movie.id}`}>
        <div className="">
          {movie.poster_path ? (
            <img
              className="mx-auto"
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={`${movie.title} Poster`}
            />
          ) : (
            <div></div>
          )}
        </div>
      </Link>

      <div className="text-center">
        <h3>{movie.title}</h3>
        <h4>{movie.release_date ? movie.release_date.substring(0, 4) : "-"}</h4>
      </div>
    </div>
  );
}

export default Resultcard;
