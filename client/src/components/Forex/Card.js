import Card from "@mui/material/Card";
import React from "react";
import StaticChart from "./StaticChart";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../views/ForexPage/ForexHome.css";
const data = require("./majorPair.json");

const formatPrice = (price, num) => {
  return `${price.toFixed(num)}`;
};

const formatPercentageChange = (change) => {
  return `${change > 0 ? "+ " : " "}${change.toFixed(4)} %`;
};

const emoji = {
  neutral: "",
  up: "🚀",
  down: "🔻",
};

const CardHolder = ({ id, change, price, direction, range }) => {
  let image = `https://etoro-cdn.etorostatic.com/market-avatars/${data[id]
    .toLowerCase()
    .replace("/", "-")}/70x70.png`;
  let navigate = useNavigate();
  return (
    <Card
      id="forex-card-box-new"
      style={{ cursor: "pointer" }}
      onClick={(e) => {
        let link =
          id.length > 6
            ? id.replace("=X", "")
            : "USD".concat(id.replace("=X", ""));
        navigate(`/details/forex/${link}`, {
          state: { image: image },
        });
      }}
      sx={{
        width: 300,
        height: 400,
        margin: "10px 0 10px 0 ",
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
      }}
    >
      <Box
        style={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "10px",
          paddingLeft: "10px",
          paddingRight: "10px",
          backgroundColor: "#023020",
        }}
      >
        <Box style={{ paddingRight: "20px" }}>
          <img src={image} />
        </Box>
        <Typography
          id="test"
          variant="h5"
          // component="div"
          sx={{
            fontFamily: "Bree Serif",
            color: "white",
            fontWeight: "",
          }}
        >
          {data[id]}
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#023020",
          padding: "20px 10px 20px 10px",
        }}
      >
        {/* {console.log(direction)} */}
        <Typography
          id="test"
          variant="h5"
          // component="div"
          className={direction}
          sx={{
            fontFamily: "Bree Serif",
            fontWeight: "",
            textAlign: "center",
          }}
        >
          {`$${formatPrice(price, 4)} `}
          &nbsp;
          {formatPercentageChange(change)}
          &nbsp;
          {` ${emoji[direction]}`}
        </Typography>
      </Box>
      <StaticChart id={data[id]} range={range} direction={direction} />
    </Card>
  );
};

export default CardHolder;
