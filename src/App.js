import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MovieIndexPage from "./pages/MovieIndex";
import MoviePage from "./pages/MoviePage";
import WishlistPage from "./pages/WishlistPage";
import Navbar from "./components/layout/Navbar";
import AuthVerify from "./store/verify-auth";
import UserContext from "./store/user-context";
import LogoutPage from "./pages/LogoutPage";
import LikesPage from "./pages/LikesPage";
import WatchedPage from "./pages/WatchedPage";
import ReviewsPage from "./pages/ReviewsPage";
import { useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "./pages/ErrorPage";

function App() {
  const UserCxt = useContext(UserContext);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieIndexPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/movie/:movieId" element={<MoviePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/likes" element={<LikesPage />} />
        <Route path="/watches" element={<WatchedPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
      </Routes>
      <AuthVerify logOut={UserCxt.logoutHandler} />
    </div>
  );
}

export default App;
