import * as React from "react";
import Box from "@mui/material/Box";
import "./card-details-stats.css";
import StatsForex from "../stats/stats-forex";

export default function DetailsStats({ dataStats, dataDescription }) {
  return (
    <Box id="top-container-stats" gap="20px">
      <Box
        id="stats-box"
        bgcolor={"white"}
        sx={{
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
        }}
      >
        <StatsForex statsData={dataStats} />
      </Box>
      <Box
        id="stats-contents-box"
        bgcolor={"white"}
        sx={{
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
        }}
      >
        <p>{dataDescription}</p>
      </Box>
    </Box>
  );
}
