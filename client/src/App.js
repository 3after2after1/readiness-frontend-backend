import "./App.css";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import AuthRoute from "./views/Authentication/AuthRoute";
import LoginPage from "./views/Authentication/LoginPage";
import SignUpPage from "./views/Authentication/SignUpPage";
import ForgotPassword from "./views/Authentication/ForgotPassword";
import CheckEmailPage from "./views/Authentication/CheckEmailPage";
import SetNewPassword from "./views/Authentication/SetNewPassword";
import FinalLandingPage from "./views/FinalLandingPage/FinalLandingPage";
import PasswordChangeSuccessPage from "./views/Authentication/PasswordChangeSuccessPage";
import EmailVerify from "./views/Authentication/EmailVerify";
import CryptoPage from "./views/CryptoPage/CryptoPage";
import Details from "./views/Details/Details";
import Footer from "./components/Footer/Footer";
import AboutUs from "./views/AboutUs/AboutUs";
import SnackBarNotify from "./components/SnackBarNotify";
import Favourite from "./views/Favourite/Favourite";
import ErrorPage from "./views/ErrorPage/ErrorPage";
import ForexHome from "./views/ForexPage/ForexHome";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Box
        style={{
          minWidth: "300px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar style={{ flex: "1" }} />
        {/* <Box style={{ height: "82vh" }}></Box> */}
        {/* style={{ height: "100%" }} */}
        <Box style={{ flex: "5" }}>
          <Routes>
            <Route path="/authroute" element={<AuthRoute />}></Route>
            <Route path="/" element={<FinalLandingPage />}></Route>
            <Route path="/loginpage" element={<LoginPage />}></Route>
            <Route path="/signuppage" element={<SignUpPage />}></Route>
            <Route path="/forgotpswd" element={<ForgotPassword />}></Route>
            <Route path="/checkemail" element={<CheckEmailPage />}></Route>
            <Route path="/resetpswd" element={<SetNewPassword />}></Route>
            <Route path="/about" element={<AboutUs />}></Route>
            <Route
              path="/successfulpasswordchange"
              element={<PasswordChangeSuccessPage />}
            ></Route>
            <Route path="/emailverify" element={<EmailVerify />}></Route>
            <Route path="/crypto" element={<CryptoPage />} />
            <Route path="/forex" element={<ForexHome />} />
            <Route path="/details/:market/:symbol" element={<Details />} />
            <Route path="/favourite" element={<Favourite />}></Route>
            <Route
              path="/details"
              element={<Details market="forex" symbol="EURUSD" />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Box>
        <SnackBarNotify />
        <Footer style={{ flex: "1" }} />
      </Box>
    </BrowserRouter>
  );
};

export default App;
