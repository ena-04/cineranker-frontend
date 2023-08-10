import { Navigate } from "react-router-dom";
import UserContext from "../store/user-context";
import { useContext } from "react";

export default function LogoutPage() {
  const UserCxt = useContext(UserContext);
  UserCxt.logoutHandler();

  return <Navigate replace to="/login" />;

  //   console.log("still here");

  //   return;
}
