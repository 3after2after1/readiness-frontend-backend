import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [trending, setTrending] = useState([]);

  const fetchTrendingCoins = async () => {
    const coins = await axios.get("http://localhost:5000/crypto/trending");
    console.log(coins);
    setTrending(coins.data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "30%",
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "black",
      textDecoration: "none",
      backgroundColor: "white",
      paddingTop: "0.4rem",
      boxShadow:
        "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
      margin: "1rem",
      borderRadius: "5px",
      paddingBottom: "0.4rem",
    },
  }));
  const classes = useStyles();
  const items =
    trending &&
    trending.map((item) => {
      return (
        <Link className={classes.carouselItem} to={`/crypto/${item.symbol}`}>
          <img
            src={item?.large}
            alt={item.name}
            height="80"
            style={{ marginBottom: 10, marginTop: 0 }}
          />

          <span>
            &nbsp;
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                fontFamily: "Bree Serif",
              }}
            >
              {item.name}
            </span>
            &nbsp;
            <br />
          </span>
        </Link>
      );
    });

  const responsive = {
    0: {
      items: 1,
    },
    390: {
      items: 2,
    },
    730: {
      items: 3,
    },
    1024: {
      items: 4,
    },
  };
  return (
    <div className={classes.carousel}>
      {trending.length > 0 && (
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          items={items}
          autoPlay
        />
      )}
    </div>
  );
};

export default Carousel;
