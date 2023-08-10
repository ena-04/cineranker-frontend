import Header from "../components/auth/Header";
import Login from "../components/auth/Login2";
import UserContext from "../store/user-context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const UserCxt = useContext(UserContext);

  if (UserCxt.isAuth) return <Navigate replace to="/" />;
  else
    return (
      <>
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <Header
              heading="Login to your account"
              paragraph="Don't have an account yet? "
              linkName="Signup"
              linkUrl="/signup"
            />
            <Login />
          </div>
        </div>
      </>
    );
}
