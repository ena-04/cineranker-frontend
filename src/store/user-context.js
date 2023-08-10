import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// import jwt from "jsonwebtoken";

const UserContext = createContext({
  user: null,
  accessToken: "",
  loginHandler: (loginState) => {},
  isAuth: false,
  logoutHandler: () => {},
  hasError: false,
  error: "",
  setErrorHandler: (error) => {},
  handleErrorHandler: () => {},
});

export function UserContextProvider(props) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || ""
  );
  const [isAuth, setIsAuth] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const isValidToken = (token) => {
    const decodedJwt = parseJwt(token);

    if (decodedJwt.exp * 1000 < Date.now()) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (accessToken && isValidToken(accessToken)) {
      setIsAuth(true);
      console.log("authorized");
    } else setIsAuth(false);
    console.log("is auth? " + isAuth);
    console.log(accessToken);
  }, [accessToken]);

  function loginHandler(loginState) {
    fetch("https://cineranker-backend.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginState),
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Logging in failed!");
        }
        return res.json();
      })
      .then((data) => {
        console.log("data is");

        setUser(data.user);
        setAccessToken(data.accessToken);
        setIsAuth(true);
        console.log(data.user);

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", data.accessToken);
      })
      .catch((err) => {
        setHasError(true);
        setError(err.message);

        console.log(err.message);
      });
  }

  function logoutHandler() {
    console.log("in logouthandler");

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setIsAuth(false);

    // <Navigate replace to="/login" />;
  }

  const setErrorHandler = (err) => {
    setError(err);
    setHasError(true);
  };

  const handleErrorHandler = () => {
    setError("");
    setHasError(false);
  };

  const context = {
    user: user,
    accessToken: accessToken,
    loginHandler: loginHandler,
    isAuth: isAuth,
    logoutHandler: logoutHandler,
    hasError: hasError,
    error: error,
    setErrorHandler: setErrorHandler,
    handleErrorHandler: handleErrorHandler,
  };
  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
