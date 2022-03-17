import { Avatar, Card, CardHeader, CardMedia, IconButton } from "@mui/material";
import "./CardFav.css";
import React from "react";
import { blue } from "@mui/material/colors";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import CardDetailsAdd from "../Details/card-details/card-details-add";

const CardFav = ({ item, market }) => {
  let watchListData = {
    image: item?.image,
    name: item.name,
    symbol: item.symbol,
    market,
  };

  return (
    <Card
      id="favourite-card-box"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      sx={{
        width: 300,
        margin: "10px 0 0 0 ",
        height: 200,
      }}
    >
      <img
        src={item?.image}
        alt={item?.symbol}
        height="50"
        width="50"
        style={{ display: "flex", alignSelf: "center", marginBottom: 10 }}
      />
      <CardHeader style={{ textAlign: "center" }} title={item?.symbol} />
      <CardDetailsAdd watchListData={watchListData} />
    </Card>
  );
};

export default CardFav;
