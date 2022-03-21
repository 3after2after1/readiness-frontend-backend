import React from "react";
import { useNavigate, useLocation, Outlet, Navigate } from "react-router-dom";
import { UserState } from "../contexts/UserContext";
import { WatchListState } from "../contexts/WatchListContext";
import { LinearProgress } from "@material-ui/core";

const RequireAuth = () => {
  // const { watchListInitializer } = WatchListState();
  let location = useLocation();
  let navigate = useNavigate;
  const { watchlist, userStatus } = UserState();

  const detectStatus = (userStatus) => {
    if (userStatus !== "unknown" && userStatus === false) {
      return (
        <Navigate to="/LoginPage" state={{ from: location, flag: true }} />
      );
    } else if (userStatus !== "unknown" && userStatus === true) {
      // dispatch({ type: "INITIALISE" });
      // console.log("spamming!!!");

      return <Outlet />;
    } else {
      return <LinearProgress style={{ background: "gold", height: "20vh" }} />;
    }
  };
  return <>{detectStatus(userStatus)}</>;

  // if (user === null) {
  //   console.log("reached user null");
  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login

  //   return <Navigate to="/LoginPage" state={{ from: location, flag: true }} />;
  // return navigate("/loginpage", { state: { from: location } });
  // } else {
  //   console.log("reached user not null");
  //   dispatch({ type: "INITIALISE" });
  //   return <Outlet />;
  // }
};

export default RequireAuth;
