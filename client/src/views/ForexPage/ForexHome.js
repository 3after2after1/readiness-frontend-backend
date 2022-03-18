import React, { useEffect, useState } from "react";
import CardFilter from "../../components/Forex/CardFilter";
import ForexSearchBar from "../../components/Forex/ForexSearchBar";
import Card from "../../components/Forex/Card";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NewsComponent from "../../components/News/NewsComponent";
import "./ForexHome.css";
import { BACKEND_DOMAIN } from "../../api/backend";
const data = require("./majorPair.json");

function ForexHome() {
  const [stonks, setStonks] = useState([]);
  const [range, setRange] = useState("day");
  let param = Object.keys(data);

  let navigate = useNavigate();
  useEffect(() => {
    let sse = new EventSource(`${BACKEND_DOMAIN}/forexhome/tick`);
    sse.onmessage = (event) => {
      let next = JSON.parse(JSON.parse(event.data));
      // console.log("event stream:", next);
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
    };
    return () => {
      console.log("connection closed");
      sse.close();
      setStonks([]);
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
          {stonks.map((stonk) => (
            <Card {...stonk} range={range} />
          ))}

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
