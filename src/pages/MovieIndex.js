import { useState, useEffect } from "react";
import Resultcard from "../components/layout/ResultCard";
import { Row } from "antd";

function MovieIndexPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [index, setIndex] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    // console.log("fetching index");
    fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) setIndex(data.results);
        else setIndex([]);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading index...</div>;
  else
    return (
      <div className="add-page">
        <div className="border-2 w-a mx-16 mt-6 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 my-auto ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          <input
            type="text"
            className="w-full px-6 py-1"
            placeholder="Search for a movie"
            value={query}
            onChange={searchHandler}
          />
        </div>

        <div className="searchresults-area">
          {results.length > 0 && (
            <>
              <p className="mt-8 font-bold text-center text-2xl">
                Search Results
              </p>

              <ul className="results grid grid-cols-5 mx-auto px-6 py-10">
                {results.map((movie) => (
                  <li key={movie.id}>
                    <Resultcard movie={movie} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="trending-area">
          <p className="mt-8 font-bold text-center text-2xl">Trending Movies</p>
          <ul className="trending grid grid-cols-5 px-6 py-10">
            {index.map((movie) => (
              <li className="" key={movie.id}>
                <Resultcard movie={movie} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}

export default MovieIndexPage;
