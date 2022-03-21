import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import "./CardFav.css";
import React from "react";
import { blue } from "@mui/material/colors";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import CardDetailsAdd from "../Details/card-details/card-details-add";
import { useNavigate } from "react-router-dom";

const CardFav = ({ item, market }) => {
  let navigate = useNavigate();
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
      <CardHeader
        className="cardfavtitle"
        sx={{
          fontFamily: "Bree Serif !important",
          color: "white",
          backgroundColor: "black",
          fontWeight: "2rem !important",
        }}
        style={{
          textAlign: "center",
          fontFamily: "Bree Serif",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
        title={item?.symbol.toUpperCase()}
        onClick={() => navigate(`/details/${market}/${item.symbol}`)}
      />

      <CardDetailsAdd watchListData={watchListData} />
    </Card>
  );
};

export default CardFav;
