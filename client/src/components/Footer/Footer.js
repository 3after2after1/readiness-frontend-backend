import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Footer.css";
let status = true;

const basicRoutes = [
  "/authroute",
  "/loginpage",
  "/signuppage",
  "/forgotpswd",
  "/checkemail",
  "/resetpswd",
  "/about",
  "/successfulpasswordchange",
  "/",
];

const Footer = () => {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState(true);

  let location = useLocation().pathname;
  React.useEffect(() => {
    //rerender different navbar based on routes
    if (basicRoutes.includes(location)) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [location]);
  return (
    <Box
      id="footer"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
        backgroundColor: status === true ? "#F9F7F7" : "#184D47",
        width: "100%",
        height: "170px",
      }}
    >
      <Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "5px",
          }}
        >
          <Typography
            variant="h6"
            // component="div"
            style={{
              paddingLeft: "10px",
              fontFamily: "Bree Serif",
              color: status === true ? "black" : "white",
              fontSize: "1.0rem",
            }}
          >
            TREX
          </Typography>
          <img
            id=""
            alt=""
            src={process.env.PUBLIC_URL + "/borderlesslogo.png"}
            style={{ width: "30px", height: "20px" }}
          />
        </Box>
        <Box
          id="footerContent"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            color="inherit"
            style={{
              color: status === true ? "black" : "white",
              fontSize: "1rem",
              fontFamily: "Bree Serif",
            }}
            onClick={() => navigate("/forex")}
          >
            Forex
          </Button>

          <Button
            color="inherit"
            style={{
              color: status === true ? "black" : "white",
              fontSize: "1rem",
              fontFamily: "Bree Serif",
            }}
            onClick={() => navigate("/crypto")}
          >
            Crypto
          </Button>

          <Button
            color="inherit"
            style={{
              color: status === true ? "black" : "white",
              fontSize: "1rem",
              fontFamily: "Bree Serif",
            }}
            onClick={() => navigate("/about")}
          >
            About Us
          </Button>
        </Box>
        <Typography
          variant="h6"
          // component="div"
          style={{
            paddingLeft: "10px",
            fontFamily: "Bree Serif",
            color: status === true ? "black" : "white",
            fontSize: "0.8rem",
            fontWeight: "bold",
          }}
        >
          © Copyright 2022 TREX
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
