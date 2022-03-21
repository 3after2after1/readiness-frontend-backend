import React from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./AboutUs.css";

const AboutUs = () => {
  let location = useLocation();
  console.log(location.pathname);
  return (
    <Box
      id="aboutusmainsection"
      style={{
        width: "100%",
        height: "83vh",
        display: "flex",
        justifyContent: "unset",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#184D47",
      }}
    >
      <Box
        id="aboutustitlebox"
        style={{
          padding: "3em 0 1em 0",
        }}
      >
        <Typography
          style={{
            fontSize: "28px",
            fontFamily: "Bree Serif",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          ABOUT US
        </Typography>
        <Typography
          id="textabtus"
          style={{
            fontSize: "16px",
            fontFamily: "League Spartan",
            color: "white",
            textAlign: "justify",
            width: "280px",
          }}
        >
          We strive to make the process simpler and more transparent. TREX
          focuses on making the platform easy to use and eliminate the need for
          people to use multiple platforms.
        </Typography>
      </Box>

      <Box
        id="aboutustitlebox-2"
        style={{
          padding: "0 0 1em 0",
        }}
      >
        <Typography
          style={{
            fontSize: "18px",
            fontFamily: "Bree Serif",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          CONSTANTLY INNOVATE
        </Typography>
        <Typography
          id="textabtus-2"
          style={{
            fontSize: "16px",
            fontFamily: "League Spartan",
            color: "white",
            textAlign: "justify",
            width: "280px",
          }}
        >
          TREX is consistently driven to develop & innovate relentlessly. TREX
          aims to enhance the way people invest and bring together a community
          where users can discover and connect.
        </Typography>
      </Box>

      <Box
        id="aboutustitlebox-3"
        style={{
          padding: "0 0 1em 0",
        }}
      >
        <Typography
          style={{
            fontSize: "18px",
            fontFamily: "Bree Serif",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          USER ORIENTED
        </Typography>
        <Typography
          id="textabtus-3"
          style={{
            fontSize: "16px",
            fontFamily: "League Spartan",
            color: "white",
            textAlign: "justify",
            width: "280px",
          }}
        >
          We value your experience more than anything here in TREX.
        </Typography>
      </Box>

      <Box
        id="aboutustitlebox-4"
        style={{
          padding: "0em 0 1em 0",
        }}
      >
        <Typography
          style={{
            fontSize: "18px",
            fontFamily: "Bree Serif",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          MEET OUR TEAM
        </Typography>
        <Box
          id="iconabtus"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "280px",
            justifyContent: "space-evenly",
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box>
              <img
                id="icon-d"
                alt=""
                src={process.env.PUBLIC_URL + "/swim.png"}
                style={{ width: "80px", height: "75px" }}
              />
            </Box>
            <Box style={{ textAlign: "center" }}>
              <Typography
                id="c-box-title"
                sx={{
                  fontFamily: "League Spartan",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Ricky
              </Typography>
            </Box>
          </Box>

          <Box
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box>
              <img
                id="icon-d"
                alt=""
                src={process.env.PUBLIC_URL + "/scientist.png"}
                style={{ width: "80px", height: "75px" }}
              />
            </Box>
            <Box style={{ textAlign: "center" }}>
              <Typography
                id="c-box-title"
                // component="div"
                sx={{
                  fontFamily: "League Spartan",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Ken
              </Typography>
            </Box>
          </Box>

          <Box
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box>
              <img
                id="icon-d"
                alt=""
                src={process.env.PUBLIC_URL + "/kiss.png"}
                style={{ width: "80px", height: "75px" }}
              />
            </Box>
            <Box style={{ textAlign: "center" }}>
              <Typography
                id="c-box-title"
                sx={{
                  fontFamily: "League Spartan",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Liyana
              </Typography>
            </Box>
          </Box>

          <Box
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box>
              <img
                id="icon-d"
                alt=""
                src={process.env.PUBLIC_URL + "/drunk.png"}
                style={{ width: "80px", height: "75px" }}
              />
            </Box>
            <Box style={{ textAlign: "center" }}>
              <Typography
                id="c-box-title"
                sx={{
                  fontFamily: "League Spartan",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Victor
              </Typography>
            </Box>
          </Box>

          <Box
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box>
              <img
                id="icon-d"
                alt=""
                src={process.env.PUBLIC_URL + "/cool.png"}
                style={{ width: "80px", height: "75px" }}
              />
            </Box>
            <Box style={{ textAlign: "center" }}>
              <Typography
                id="c-box-title"
                sx={{
                  fontFamily: "League Spartan",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Bala
              </Typography>
            </Box>
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box>
              <img
                id="icon-d"
                alt=""
                src={process.env.PUBLIC_URL + "/angry.png"}
                style={{ width: "80px", height: "75px" }}
              />
            </Box>
            <Box style={{ textAlign: "center" }}>
              <Typography
                id="c-box-title"
                // component="div"
                sx={{
                  fontFamily: "League Spartan",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Adla
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUs;
