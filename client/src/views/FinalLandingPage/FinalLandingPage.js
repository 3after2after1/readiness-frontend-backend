import React, { useState, useEffect } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import "./FinalLandingPage.css";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import TypeWriterEffect from "react-typewriter-effect";

const FinalLandingPage = () => {
  let navigate = useNavigate();

  return (
    <Box id="landingPageContent" style={{}}>
      <Box
        id="firstsection"
        style={{
          backgroundColor: "#184D47",
          width: "100%",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          id="signUpContent"
          style={{
            padding: "20px 20px 0 20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box id="typographyBox1">
            <Box
              id="typewrite"
              style={{ paddingTop: "20px", paddingBottom: "10px" }}
            >
              <Typewriter
                options={{
                  strings: ["Simple", "Informative"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </Box>
            <Typography
              id="sentence2"
              variant="h4"
              sx={{
                fontFamily: "League Spartan !important",
                color: "white",
                fontWeight: "bold !important",
                paddingBottom: "5px",
              }}
            >
              That's TREX.
            </Typography>
            <Typography
              id="sentence4"
              variant="h5"
              sx={{
                width: "190px",
                fontFamily: "League Spartan !important",
                color: "white",
                paddingBottom: "5px",
                fontWeight: "bold !important",
                lineHeight: "1.1 !important",
              }}
            >
              Forex or Crypto, it's all here
            </Typography>
            <Typography
              id="sentence3"
              variant="h6"
              sx={{
                width: "250px",
                fontFamily: "Bree Serif !important",
                font: "caption",
                color: "white",
                fontSize: "1rem !important",
                lineHeight: "unset !important",
              }}
            >
              The all in one seamless platform to help support your investment
              decisions.
            </Typography>
            <Box
              id="signUpBox"
              style={{
                paddingTop: "20px",
              }}
            >
              <Button
                id="signUpButton1"
                onClick={() => navigate("/signuppage")}
                variant="contained"
                style={{
                  backgroundColor: "#FFCE45",
                  color: "#184D47",
                  fontSize: "1.3rem",
                  fontFamily: "Bree Serif",
                  fontWeight: "bold",
                  width: "275px",
                }}
              >
                Start Now
              </Button>
            </Box>
          </Box>
          <Box
            id="pictureBox1"
            style={{
              paddingTop: "20px",
            }}
          >
            <Box
              id="smartmockup"
              style={{
                width: "275px",
                height: "200px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                id=""
                alt=""
                // src={process.env.PUBLIC_URL + "/smartmockups3.png"}
                // style={{ width: "600px", height: "300px" }}
              />
            </Box>
            <Box
              style={{
                paddingTop: "20px",
              }}
            >
              <Button
                id="signUpButton2"
                variant="contained"
                onClick={() => navigate("/signuppage")}
                style={{
                  backgroundColor: "#FFCE45",
                  color: "#184D47",
                  fontSize: "1.3rem",
                  fontFamily: "Bree Serif",
                  fontWeight: "bold",
                  width: "275px",
                }}
              >
                Start Now
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box id="section23">
        <Box
          id="secondsection"
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "2320px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box>
            <Divider
              id="divider1"
              style={{
                color: "#999",
                padding: "20px",
                fontFamily: "Bree Serif",
                fontSize: "2rem",
              }}
            >
              What We Offer
            </Divider>
          </Box>
          <Box
            id="forexAndDashboard"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              id="dashPic1"
              style={{
                width: "275px",
                height: "200px",
                backgroundColor: "white",
              }}
            />
            <Box id="forexBox">
              <Typography
                id="forexTitle"
                variant="h3"
                style={{
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  paddingBottom: "0px",
                  fontFamily: "League Spartan",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Forex Tracking.
              </Typography>
              <Box id="forexTrackingDesc">
                <Typography
                  id="forexExplanation"
                  variant="h6"
                  // component="div"
                  sx={{
                    width: "250px",
                    fontFamily: "Bree Serif !important",
                    font: "caption",
                    color: "black",
                    paddingRight: "20px",
                    paddingLeft: "20px",
                    fontSize: "1.1rem !important",
                    lineHeight: "unset !important",
                  }}
                >
                  With us, you will always be up to date with the forever active
                  foreign exchange market.
                </Typography>
              </Box>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <Box
                  id="forexContentBox"
                  style={{
                    paddingTop: "15px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    id=""
                    variant="h4"
                    style={{
                      paddingRight: "20px",
                      paddingLeft: "20px",
                      paddingBottom: "20px",
                      fontFamily: "Bree Serif",
                      color: "#999",
                      fontSize: "2rem",
                    }}
                  >
                    Main Features
                  </Typography>
                  <Box id="mainfeaturesbox">
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        id="forexFeature1"
                        style={{
                          boxShadow:
                            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                          width: "200px",
                          height: "100px",
                          backgroundColor: "#CFF4D2",
                          borderRadius: "5px",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "League Spartan",
                          fontSize: "1.8rem",
                          fontWeight: "bold",
                        }}
                      >
                        <Box style={{ width: "180px" }}>
                          Real Time & Historical Price Charts
                        </Box>
                      </Box>
                      <Typography
                        id="forexFeatureExplanation1"
                        variant="h6"
                        // component="div"
                        sx={{
                          width: "220px",
                          fontFamily: "Bree Serif !important",
                          font: "caption",
                          color: "#696969",
                          textAlign: "justify",
                          paddingTop: "10px",
                          paddingBottom: "20px",
                          fontSize: "1.1rem !important",
                          lineHeight: "unset !important",
                        }}
                      >
                        Your investment of tomorrow made easy, analyse the past
                        and present price charts of the exchange markets.
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        id="forexFeature1"
                        style={{
                          boxShadow:
                            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                          borderRadius: "5px",
                          width: "200px",
                          height: "100px",
                          backgroundColor: "#CFF4D2",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "League Spartan",
                          fontSize: "1.8rem",
                          fontWeight: "bold",
                        }}
                      >
                        <Box style={{ width: "180px" }}>
                          Community Live Chat
                        </Box>
                      </Box>
                      <Typography
                        id="forexFeatureExplanation1"
                        variant="h6"
                        // component="div"
                        sx={{
                          width: "220px",
                          fontFamily: "Bree Serif !important",
                          font: "caption",
                          color: "#696969",
                          textAlign: "justify",
                          paddingTop: "10px",
                          fontSize: "1.1rem !important",
                          lineHeight: "unset !important",
                        }}
                      >
                        Not sure what to invest on? You can now chat with other
                        experienced traders to gain insightful tips on the next
                        possible market movement.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box id="dashPic5box">
                <Box
                  id="dashPic5"
                  style={{
                    width: "375px",
                    height: "300px",
                  }}
                />
              </Box>
              <Box id="forexButton3Box">
                <Button
                  id="forexButton3"
                  variant="contained"
                  style={{
                    backgroundColor: "#FFCE45",
                    color: "#184D47",
                    fontSize: "1.3rem",
                    fontFamily: "Bree Serif",
                    fontWeight: "bold",
                  }}
                  onClick={() => navigate("/forex")}
                >
                  Go to Forex
                </Button>
              </Box>
              <Box
                style={{
                  paddingTop: "20px",
                }}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "20px",
              }}
            >
              <Box
                id="dashPic2"
                style={{
                  width: "275px",
                  height: "200px",
                }}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                id="forexButton2"
                variant="contained"
                style={{
                  backgroundColor: "#FFCE45",
                  color: "#184D47",
                  fontSize: "1.3rem",
                  fontFamily: "Bree Serif",
                  fontWeight: "bold",
                  width: "275px",
                }}
                onClick={() => navigate("/forex")}
              >
                Go to Forex
              </Button>
            </Box>
          </Box>
          <Box
            id="cryptoAndDashboard"
            style={{
              paddingTop: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box id="cryptoBox">
              <Typography
                id="cryptoTitle"
                variant="h3"
                style={{
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  paddingBottom: "0px",
                  fontFamily: "League Spartan",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Crypto Tracking.
              </Typography>
              <Box id="cryptoTrackingDesc">
                <Typography
                  id="cryptoExplanation"
                  variant="h6"
                  sx={{
                    width: "250px",
                    fontFamily: "Bree Serif !important",
                    font: "caption",
                    color: "black",
                    paddingRight: "20px",
                    paddingLeft: "20px",
                    fontSize: "1.1rem !important",
                    lineHeight: "unset !important",
                  }}
                >
                  With us, you will not miss the next flight to the moon.
                </Typography>
              </Box>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <Box
                  id="cryptoContentBox"
                  style={{
                    paddingTop: "15px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    id=""
                    variant="h4"
                    style={{
                      paddingRight: "20px",
                      paddingLeft: "20px",
                      paddingBottom: "20px",
                      fontFamily: "Bree Serif",
                      color: "#999",
                      fontSize: "2rem",
                    }}
                  >
                    Main Features
                  </Typography>
                  <Box id="mainfeaturesbox">
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        style={{
                          boxShadow:
                            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                          borderRadius: "5px",
                          width: "200px",
                          height: "100px",
                          backgroundColor: "#CFF4D2",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "League Spartan",
                          fontSize: "1.8rem",
                          fontWeight: "bold",
                        }}
                      >
                        <Box style={{ width: "150px" }}>Trending Coins</Box>
                      </Box>
                      <Typography
                        id="cryptoFeatureExplanation1"
                        variant="h6"
                        // component="div"
                        sx={{
                          width: "220px",
                          fontFamily: "Bree Serif !important",
                          font: "caption",
                          color: "#696969",
                          textAlign: "justify",
                          paddingTop: "10px",
                          paddingBottom: "20px",
                          fontSize: "1.1rem !important",
                          lineHeight: "unset !important",
                        }}
                      >
                        There are so many new coins emerging on the market
                        daily, we identify and display the coins that are
                        trending in the market. All this just for you.
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        style={{
                          boxShadow:
                            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                          borderRadius: "5px",
                          width: "200px",
                          height: "100px",
                          backgroundColor: "#CFF4D2",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "League Spartan",
                          fontSize: "1.8rem",
                          fontWeight: "bold",
                          lineHeight: "1.8rem",
                        }}
                      >
                        {" "}
                        <Box style={{ width: "150px" }}>
                          Top Gainers & Losers
                        </Box>
                      </Box>
                      <Typography
                        id="cryptoFeatureExplanation1"
                        variant="h6"
                        sx={{
                          width: "220px",
                          fontFamily: "Bree Serif !important",
                          font: "caption",
                          color: "#696969",
                          textAlign: "justify",
                          paddingTop: "10px",
                          fontSize: "1.1rem !important",
                          lineHeight: "unset !important",
                        }}
                      >
                        Want to know the next Bitcoin? Our top 5 ranking table
                        for the biggest gainers and losers will help you with
                        exactly that.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box id="dashPic6box">
                <Box
                  id="dashPic6"
                  style={{
                    width: "375px",
                    height: "300px",
                    backgroundColor: "white",
                  }}
                />
              </Box>
              <Box id="cryptoButton3Box">
                <Button
                  id="cryptoButton3"
                  variant="contained"
                  style={{
                    backgroundColor: "#FFCE45",
                    color: "#184D47",
                    fontSize: "1.3rem",
                    fontFamily: "Bree Serif",
                    fontWeight: "bold",
                  }}
                  onClick={() => navigate("/crypto")}
                >
                  Go to Crypto
                </Button>
              </Box>
              <Box
                style={{
                  paddingTop: "20px",
                }}
              >
                <Box
                  style={{
                    paddingLeft: "25px",
                  }}
                >
                  <Button
                    id="cryptoButton1"
                    variant="contained"
                    style={{
                      backgroundColor: "#FFCE45",
                      color: "#184D47",
                      fontSize: "1.3rem",
                      fontFamily: "Bree Serif",
                      fontWeight: "bold",
                    }}
                    onClick={() => navigate("/crypto")}
                  >
                    Go to Crypto
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              id="dashBoxPic4"
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "20px",
              }}
            >
              <Box
                id="dashPic4"
                style={{
                  width: "275px",
                  height: "200px",
                }}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                id="cryptoButton2"
                variant="contained"
                style={{
                  backgroundColor: "#FFCE45",
                  color: "#184D47",
                  fontSize: "1.3rem",
                  fontFamily: "Bree Serif",
                  fontWeight: "bold",
                  width: "275px",
                }}
                onClick={() => navigate("/crypto")}
              >
                Go to Crypto
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        id="fourthsection"
        style={{
          width: "100%",
          height: "400px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <Divider
            id=""
            style={{
              color: "white",
              padding: "20px",
              fontFamily: "Bree Serif",
              fontSize: "2rem",
            }}
          >
            <Box>Why Choose Us?</Box>
          </Divider>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box style={{ paddingBottom: "20px" }}>
            <Box>
              <Typography
                id="friendlyUI"
                variant="h5"
                style={{
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  paddingBottom: "0px",
                  fontFamily: "League Spartan",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                1) Friendly UI
              </Typography>
            </Box>
            <Box>
              <Typography
                id="friendlyUIDesc"
                variant="h6"
                sx={{
                  width: "280px",
                  fontFamily: "Bree Serif !important",
                  font: "caption",
                  color: "white",
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  fontSize: "1.1rem !important",
                }}
              >
                An interactable UI that is designed for a simple and
                straightforward user experience, just for the users.
              </Typography>
            </Box>
          </Box>
          <Box style={{ paddingBottom: "20px" }}>
            <Typography
              id="allInOne"
              variant="h5"
              style={{
                paddingRight: "20px",
                paddingLeft: "20px",
                paddingBottom: "0px",
                fontFamily: "League Spartan",
                color: "white",
                fontWeight: "bold",
              }}
            >
              2) All In One Platform
            </Typography>
            <Typography
              id="allInOneDesc"
              variant="h6"
              sx={{
                width: "280px",
                fontFamily: "Bree Serif !important",
                font: "caption",
                color: "white",
                paddingRight: "20px",
                paddingLeft: "20px",
                fontSize: "1.1rem !important",
              }}
            >
              Discover variety of features provided such as the latest financial
              news, live chatroom, multiple chart variation and more!
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FinalLandingPage;
