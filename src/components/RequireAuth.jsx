import React from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  const { isAuthenticated } = React.useContext(AuthContext);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated === true) {
    return <Outlet></Outlet>;
  }
  return <Navigate to={"/signin"} />;
}
