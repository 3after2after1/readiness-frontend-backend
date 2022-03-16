import { Avatar, Card, CardHeader, CardMedia, IconButton } from "@mui/material";
import "./CardFav.css";
import React from "react";
import { blue } from "@mui/material/colors";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";

const CardFav = () => {
  return (
    <Card
      id="favourite-card-box"
      sx={{
        width: 300,
        margin: "10px 0 0 0 ",
        height: 200,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="Logo">
            L
          </Avatar>
        }
        action={
          <IconButton aria-label="add to watchlist">
            <PlaylistRemoveIcon />
          </IconButton>
        }
        title="What forex"
      />
    </Card>
  );
};

export default CardFav;
