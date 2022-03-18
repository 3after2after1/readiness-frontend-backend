import React from "react";
import Card from "@mui/material/Card";
import { Box, Button, Typography } from "@mui/material";
import CardFav from "../../components/Favourite/CardFav";
import { WatchListState } from "../../contexts/WatchListContext";
import { useNavigate } from "react-router-dom";
import "./Favourite.css";

function Favourite() {
  const navigate = useNavigate();
  const { watchList } = WatchListState();
  return (
    <>
      <Box
        id="watchlist-page"
        style={{
          backgroundColor: "#f9f7f7",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "25px",
        }}
      >
        <Box style={{ textAlign: "center", paddingTop: "20px" }}>
          <Typography
            id="watchlistTitle"
            variant="h5"
            // component="div"
            sx={{
              fontFamily: "League Spartan",
              color: "black",
              fontWeight: "bold",
            }}
          >
            My Watchlist
          </Typography>
        </Box>
        <Box
          id="watchlistForexBox"
          style={{
            textAlign: "start",
            paddingTop: "20px",
          }}
        >
          <Typography
            id="watchlistForexTitle"
            variant="h4"
            // component="div"
            sx={{
              fontFamily: "Bree Serif",
              color: "black",
              fontWeight: "",
            }}
          >
            Forex
          </Typography>
        </Box>
        <Box>
          <Box
            id="favourite-box"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "20px",
            }}
          >
            {/* empty card starts here */}
            {watchList.forex.length > 0 ? (
              watchList.forex.map((item) => {
                return <CardFav item={item} market="forex" />;
              })
            ) : (
              <Card
                id="w-empty-card-box"
                sx={{
                  width: 300,
                  margin: "10px 0 0 0 ",
                  height: 200,
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    height: "100px",
                    // alignItems: "center",
                    paddingTop: "30px",
                  }}
                >
                  <Typography
                    id=""
                    variant="h6"
                    // component="div"
                    sx={{
                      fontFamily: "Bree Serif",
                      color: "#999",
                      fontWeight: "",
                      width: 200,
                    }}
                  >
                    Browse and add a forex to your watchlist now.
                  </Typography>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50px",
                  }}
                >
                  <Button
                    id=""
                    variant="contained"
                    style={{
                      backgroundColor: "#FFCE45",
                      color: "#184D47",
                      fontSize: "1rem",
                      fontFamily: "Bree Serif",
                      fontWeight: "bold",
                      height: "30px",
                    }}
                    onClick={() => navigate("/forex")}
                  >
                    Go to Forex
                  </Button>
                </Box>
              </Card>
            )}
          </Box>
        </Box>
        <Box
          style={{
            textAlign: "start",
            paddingTop: "20px",
          }}
        >
          <Typography
            id="watchlistCryptoTitle"
            variant="h4"
            // component="div"
            sx={{
              fontFamily: "Bree Serif",
              color: "black",
              fontWeight: "",
            }}
          >
            Crypto
          </Typography>
        </Box>
        <Box
          id="favourite-box"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          {watchList.crypto.length > 0 ? (
            watchList.crypto.map((item) => {
              return <CardFav item={item} market="crypto" />;
            })
          ) : (
            <Card
              id="w-empty-card-box"
              sx={{
                width: 300,
                margin: "10px 0 0 0 ",
                height: 200,
              }}
            >
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  height: "100px",
                  // alignItems: "center",
                  paddingTop: "30px",
                }}
              >
                <Typography
                  id=""
                  variant="h6"
                  // component="div"
                  sx={{
                    fontFamily: "Bree Serif",
                    color: "#999",
                    fontWeight: "",
                    width: 200,
                  }}
                >
                  Browse and add a crypto to your watchlist now.
                </Typography>
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50px",
                }}
              >
                <Button
                  id=""
                  variant="contained"
                  style={{
                    backgroundColor: "#FFCE45",
                    color: "#184D47",
                    fontSize: "1rem",
                    fontFamily: "Bree Serif",
                    fontWeight: "bold",
                    height: "30px",
                  }}
                  onClick={() => navigate("/crypto")}
                >
                  Go to Crypto
                </Button>
              </Box>
            </Card>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Favourite;
