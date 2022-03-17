import React from "react";
import Carousel from "../../components/Crypto/Carousel";
import CoinTable from "../../components/Crypto/CoinTable";
import NewsComponent from "../../components/News/NewsComponent";
import { Container, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  bannerContent: {
    height: 250,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

const CryptoPage = () => {
  const classes = useStyles();
  return (
    <div style={{ overflowX: "hidden", backgroundColor: "#f9f7f7" }}>
      <Container
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          paddingLeft: "0",
          paddingRight: "0",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          style={{
            margin: 18,
            fontFamily: "League Spartan",
            fontWeight: "bold",
            color: "black",
            paddingBottom: "0",
          }}
        >
          Trending Coins
        </Typography>
        <Carousel />
      </Container>
      <CoinTable />

      <div>
        <NewsComponent market={"crypto"} />
      </div>
    </div>
  );
};

export default CryptoPage;
