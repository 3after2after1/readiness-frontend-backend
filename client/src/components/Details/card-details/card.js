import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function ForexCard() {
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="Logo">
            L
          </Avatar>
        }
        action={
          <IconButton aria-label="add to watchlist">
            <AddBoxIcon />
          </IconButton>
        }
        title="What forex"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Insert chart"
      />
    </Card>
  );
}
