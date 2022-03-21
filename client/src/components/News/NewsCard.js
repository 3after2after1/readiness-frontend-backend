import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { blue } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import { Card, CardContent, Typography, Box } from "@material-ui/core";
import moment from "moment";

const carouselProperties = {
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 425,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
  ],
};

const NewsCard = ({ data }) => {
  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
  const sliderRef = useRef(null);

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0 20px",
          }}
        >
          <Typography
            variant="h3"
            style={{
              fontFamily: "League Spartan",
              fontWeight: "bold",
              marginRight: "3rem",
            }}
          >
            News
          </Typography>
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
                borderRadius: 7,
                boxShadow: "0 2px 4px rgb(0 0 0 /10%)",
                cursor: "pointer",
              }}
              onClick={() => sliderRef.current.slickPrev()}
            >
              <ArrowBackIos />
            </div>
            <div
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
                borderRadius: 7,
                boxShadow: "0 2px 4px rgb(0 0 0 /10%)",
                cursor: "pointer",
              }}
              onClick={() => sliderRef.current.slickNext()}
            >
              <ArrowForwardIos />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Slider {...carouselProperties} ref={sliderRef}>
          {data.map((news, index) => (
            <div key={index}>
              <Card
                style={{
                  maxWidth: 400,
                  minHeight: 300,
                  maxHeight: 300,
                  margin: 5,
                  borderRadius: 15,
                  boxShadow:
                    "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                }}
              >
                <a
                  href={news.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      maxHeight: "500px",
                      // minHeight: "300px",
                    }}
                  >
                    <CardContent
                      style={{
                        backgroundColor: "#FFCE45",
                        color: "black",
                        minHeight: "130px",
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="h2"
                        minwidth="200"
                        style={{
                          fontWeight: "lighter",
                          fontFamily: "Bree Serif",
                          fontSize: "1.3rem",
                        }}
                      >
                        {news.name}
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardContent style={{ maxHeight: 70, overflow: "hidden" }} />
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: "0 15px",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Avatar
                        sx={{ bgcolor: blue[500] }}
                        aria-label="Logo"
                        src={news.newsProviderImage || demoImage}
                        alt=""
                      ></Avatar>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        // objectFit="cover"
                        margin="50"
                        style={{
                          marginLeft: "1rem",
                          paddingBottom: "0",
                          fontFamily: "Bree Serif",
                          paddingTop: "0.5rem",
                        }}
                      >
                        {news.newsProviderName}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{
                        fontFamily: "Bree Serif",
                        paddingTop: "0.5rem",
                      }}
                    >
                      {moment(news.datePublished).startOf("ss").fromNow()}
                    </Typography>
                  </Box>
                </a>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default NewsCard;
