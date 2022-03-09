import { Box, Button, Typography } from "@mui/material";
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <Box
      id="footer"
      style={{
        backgroundColor: "#F9F7F7",
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
            sx={{
              paddingLeft: "10px",
              fontFamily: "Bree Serif",
              color: "black",
              fontSize: "1rem",
            }}
          >
            TREX
          </Typography>
          <img
            id="borderlesslogo"
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
              color: "black",
              fontSize: "0.7rem",
              fontFamily: "Bree Serif",
            }}
          >
            Forex
          </Button>

          <Button
            color="inherit"
            style={{
              color: "black",
              fontSize: "0.7rem",
              fontFamily: "Bree Serif",
            }}
          >
            Crypto
          </Button>

          <Button
            color="inherit"
            style={{
              color: "black",
              fontSize: "0.7rem",
              fontFamily: "Bree Serif",
            }}
          >
            About Us
          </Button>
        </Box>
        <Typography
          variant="h6"
          // component="div"
          sx={{
            paddingLeft: "10px",
            fontFamily: "Bree Serif",
            color: "black",
            fontSize: "0.6rem",
          }}
        >
          © Copyright 2022 TREX
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
