import React from "react";
import { Box, Typography } from "@mui/material";
import "./AboutUs.css";
import { Link, useLocation } from "react-router-dom";

const AboutUs = () => {
  let location = useLocation();
  console.log(location.pathname);
  return (
    <Box style={{ minWidth: "300px" }}>
      <Box
        id="aboutussection"
        style={{
          // backgroundImage: `url(${
          //   process.env.PUBLIC_URL + "/wickedbackground1.png"
          // })`,
          backgroundColor: "#184D47",
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          id="aboutustitlebox"
          style={{
            paddingTop: "100px",
            paddingBottom: "20px",
          }}
        >
          <Typography
            id="aboutustitle"
            variant="h3"
            // component="div"
            sx={{
              fontFamily: "League Spartan",
              color: "white",
              fontWeight: "bold",
            }}
          >
            About Us
          </Typography>
        </Box>
        <Box
          id="aboutuscontentbox"
          sx={{
            width: "280px",
          }}
        >
          <Typography
            id="aboutuscontent"
            variant="h6"
            // component="div"
            sx={{
              fontFamily: "Bree Serif !important",
              color: "white",
              textAlign: "justify",
              fontSize: "1.1rem",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit
            amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUs;
