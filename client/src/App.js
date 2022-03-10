import "./App.css";
import { Box, Button, Divider, Typography } from "@mui/material";
import Navbar from "./components/Navbar/Navbar2";
import AuthRoute from "./views/Authentication/AuthRoute";
import LoginPage from "./views/Authentication/LoginPage";
import SignUpPage from "./views/Authentication/SignUpPage";
import ForgotPassword from "./views/Authentication/ForgotPassword";
import CheckEmailPage from "./views/Authentication/CheckEmailPage";
import SetNewPassword from "./views/Authentication/SetNewPassword";
import FinalLandingPage from "./views/FinalLandingPage/FinalLandingPage";
import PasswordChangeSuccessPage from "./views/Authentication/PasswordChangeSuccessPage";
import EmailVerify from "./views/Authentication/EmailVerify";
import CryptoPage from "./views/CryptoPage";
import Details from "./views/Details/Details";
import Footer from "./components/Footer/Footer";
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
        <Navbar />
        {/* <Box style={{ height: "82vh" }}></Box> */}
        {/* style={{ height: "100%" }} */}
        <Box>
          <Routes>
            <Route path="/authroute" element={<AuthRoute />}></Route>
            <Route path="/" element={<FinalLandingPage />}></Route>
            <Route path="/loginpage" element={<LoginPage />}></Route>
            <Route path="/signuppage" element={<SignUpPage />}></Route>
            <Route path="/forgotpswd" element={<ForgotPassword />}></Route>
            <Route path="/checkemail" element={<CheckEmailPage />}></Route>
            <Route path="/resetpswd" element={<SetNewPassword />}></Route>
            <Route
              path="/successfulpasswordchange"
              element={<PasswordChangeSuccessPage />}
            ></Route>
            <Route path="/emailverify" element={<EmailVerify />}></Route>
            <Route path="/crypto" element={<CryptoPage />} />
            <Route path="/details" element={<Details />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
};

export default App;
