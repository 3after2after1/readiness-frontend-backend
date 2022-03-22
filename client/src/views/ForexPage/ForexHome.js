import React, { useEffect, useState } from "react";
import CardFilter from "../../components/Forex/CardFilter";
import ForexSearchBar from "../../components/Forex/ForexSearchBar";
import Card from "../../components/Forex/Card";
import { Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import NewsComponent from "../../components/News/NewsComponent";
import "./ForexHome.css";
import { GeneralState } from "../../contexts/GeneralContext";
import { BACKEND_DOMAIN } from "../../api/backend";
import { LinearProgress, CircularProgress } from "@material-ui/core";
const data = require("./majorPair.json");

function ForexHome() {
  const [stonks, setStonks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("day");
  const location = useLocation();
  const { generateSnackbar } = GeneralState();

  let param = Object.keys(data);

  let navigate = useNavigate();
  useEffect(() => {
    if (location.state) {
      let from = location.state.from.pathname;
      let error = location.state.error;

      if (error) {
        generateSnackbar({
          newShow: true,
          newMessage: `Symbol is invalid`,
          newType: "error",
        });
      }
    }

    let sse = new EventSource(`${BACKEND_DOMAIN}/forexhome/tick`);
    sse.onmessage = (event) => {
      let next = JSON.parse(JSON.parse(event.data));

      console.log("event stream:", next);
      setStonks((current) => {
        let stonk = current.find((stonk) => stonk.id === next.id);
        if (stonk) {
          return current.map((stonk) => {
            if (stonk.id === next.id) {
              return {
                ...next,
                direction:
                  stonk.change > 0
                    ? "up"
                    : stonk.change < 0
                    ? "down"
                    : stonk.direction,
              };
            }
            return stonk;
          });
        } else {
          return [
            ...current,
            {
              ...next,
              direction: "neutral",
            },
          ];
        }
      });
      setLoading(false);
    };
    return () => {
      console.log("connection closed");
      sse.close();
      // setStonks([]);
    };
  }, []);

  return (
    <Box id="main-container-forexHome" style={{ backgroundColor: "#f9f7f7" }}>
      <Box
        id="searchandfilterForex"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            id="searchForexHome"
            style={{
              padding: "20px 10px 20px 10px",
              width: "300px",
            }}
          >
            <ForexSearchBar />
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            id="filterForexHome"
            style={{
              padding: "0px 10px 20px 10px",
              display: "flex",
              justifyContent: "end",
              width: "300px",
            }}
          >
            <CardFilter range={range} setRange={setRange} />
          </Box>
        </Box>
      </Box>

      <Box id="contentForexHome">
        <Box
          id="forex-content"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          {/* <p>Loading....</p> */}
          {loading ? (
            <CircularProgress style={{ color: "black" }} size="100px" />
          ) : (
            <>
              {stonks.map((stonk) => (
                <Card {...stonk} range={range} />
              ))}
            </>
          )}
          <div style={{ height: "400px" }}></div>
        </Box>
      </Box>
      <div>
        <NewsComponent market={"forex"} />
      </div>
    </Box>
    // </div>
  );
}

export default ForexHome;
