import { useState, useEffect, useContext } from "react";
import WatchlistContext from "../store/watchlist-context";
import Wishlist from "../components/layout/Wishlist";
import UserContext from "../store/user-context";

function WishlistPage() {
  // const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const UserCxt = useContext(UserContext);

  const WatchlistCxt = useContext(WatchlistContext);

  const renderTableBody = WatchlistCxt.favouriteMovies.map((movie, index) => {
    return (
      <tr className="border-b dark:border-neutral-500">
        <td className="whitespace-nowrap  px-6 py-4 font-medium">
          {index + 1}
        </td>
        <td className="whitespace-nowrap  px-6 py-4">{movie.title}</td>
        <td className="whitespace-nowrap  px-6 py-4">{movie.runtime}</td>
        <td className="whitespace-nowrap  px-6 py-4 flex items-center justify-center">
          <Wishlist movie={movie} userId={UserCxt.user._id} />
        </td>
      </tr>
    );
  });

  // if (isLoading) return <div>Loading...</div>;
  // else
  if (!UserCxt.isAuth) return <div>Start adding to watchlist!</div>;
  else
    return (
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className=" text-center text-sm font-light min-w-full">
                <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                  <tr>
                    <th scope="col" className=" px-6 py-4">
                      #
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Movie
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Runtime
                    </th>
                    <th scope="col" className=" px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>{renderTableBody}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
}

export default WishlistPage;
