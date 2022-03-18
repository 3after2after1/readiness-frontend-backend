import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <Box
        id="errorbox"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          backgroundColor: "#184D47",
        }}
      >
        <Box
          id="errorbox2"
          style={{
            width: "300px",
            backgroundColor: "#CFF4D2",
            paddingTop: "50px",
            paddingBottom: "50px",
            borderRadius: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            id="errorbox4"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box style={{ paddingTop: "20px" }}>
              <Typography
                id="errorcode"
                variant="h1"
                // component="div"
                sx={{
                  fontFamily: " League Spartan",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "8rem",
                  letterSpacing: "1rem",
                  opacity: "60%",
                }}
              >
                404
              </Typography>
            </Box>
            <Box id="errorbox3" style={{ width: "300px" }}>
              <Typography
                id="errormessage"
                variant="h3"
                // component="div"
                sx={{
                  fontFamily: " League Spartan",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "4rem",
                }}
              >
                Oops!
              </Typography>
              <Typography
                id="errormessage"
                variant="h3"
                // component="div"
                sx={{
                  fontFamily: " League Spartan",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "4rem",
                }}
              >
                Page not found.
              </Typography>
            </Box>
            <Box style={{ paddingTop: "20px" }}>
              <Button
                id="errorbutton"
                variant="contained"
                style={{
                  backgroundColor: "#FFCE45",
                  color: "#184D47",
                  fontSize: "1.3rem",
                  fontFamily: "Bree Serif",
                  fontWeight: "bold",
                }}
              >
                Return to Home
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ErrorPage;
