import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { WatchlistContextProvider } from "./store/watchlist-context";
import { UserContextProvider } from "./store/user-context";
import { WatchContextProvider } from "./store/watch-context";
import { LikeContextProvider } from "./store/like-context";
import { ReviewContextProvider } from "./store/reviews-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <ReviewContextProvider>
      <WatchContextProvider>
        <LikeContextProvider>
          <WatchlistContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </WatchlistContextProvider>
        </LikeContextProvider>
      </WatchContextProvider>
    </ReviewContextProvider>
  </UserContextProvider>
);
