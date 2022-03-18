import React from "react";
import { useNavigate, useLocation, Outlet, Navigate } from "react-router-dom";
import { UserState } from "../contexts/UserContext";

const RequireAuth = () => {
  let location = useLocation();
  let navigate = useNavigate;
  const { user } = UserState();

  if (user === null) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login

    return <Navigate to="/LoginPage" state={{ from: location, flag: true }} />;
    // return navigate("/loginpage", { state: { from: location } });
  }

  return <Outlet />;
};

export default RequireAuth;
