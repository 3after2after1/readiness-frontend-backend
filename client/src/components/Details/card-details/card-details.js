import * as React from "react";
import Chart from "../Chart";
import DetailsComment from "./card-details-comment";
import Box from "@mui/material/Box";
import "./card-details.css";

export default function DetailsPage() {
  return (
    <Box id="top-container-details" gap="20px">
      <div
        id="graph-box"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "0",
        }}
      >
        <Box
          id="box-1"
          bgcolor={"white"}
          sx={{
            width: 320,
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            border: "1px solid",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
            borderRadius: 2,
          }}
        >
          <Chart symbol="R_50" market="forex" />
        </Box>

        <Box
          id="comment-box"
          bgcolor={"white"}
          sx={{
            marginTop: "1em",
            height: 560,
            padding: "0.6em",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            border: "1px solid",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
            borderRadius: 2,
          }}
        >
          <DetailsComment />
        </Box>
      </div>
    </Box>
  );
}