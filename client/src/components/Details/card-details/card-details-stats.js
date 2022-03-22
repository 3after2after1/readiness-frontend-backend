import * as React from "react";
import Box from "@mui/material/Box";
import "./card-details-stats.css";
import StatsForex from "../stats/stats-forex";
import DOMPurify from "dompurify";
import GaugeMeter from "../../Crypto/Stats/GaugeMeter";

export default function DetailsStats({ dataStats, dataDescription, market }) {
  return (
    <Box id="top-container-stats" gap="20px">
      <div
        id="stat-box"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "0",
          alignItems: "center",
          marginBottom: "1em",
        }}
      >
        <Box
          id="stats-box-top"
          bgcolor={"white"}
          sx={{
            marginTop: "0.9em",
            padding: "0.6em",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            border: "1px solid",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
            borderRadius: 2,
          }}
        >
          {/* <StatsForex statsData={dataStats} /> */}
          {/* forex stats using dataStats from ricky line 21 */}
          {market === "crypto" ? (
            dataStats ? (
              <GaugeMeter data={dataStats} />
            ) : (
              <p>No data available at the moment</p>
            )
          ) : (
            <StatsForex statsData={dataStats} />
          )}
        </Box>
        <Box
          id="stats-contents-box"
          bgcolor={"white"}
          sx={{
            marginTop: "0.5em",
            padding: "0.5em",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            border: "1px solid",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
            borderRadius: 2,
          }}
        >
          {market === "crypto" ? (
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  dataDescription
                    ? dataDescription
                    : "No data available at the moment"
                ),
              }}
              style={{
                fontFamily: "Bree Serif",
                fontSize: "0.9rem",
                margin: "0",
                textAlign: "justify",
              }}
            ></p>
          ) : (
            <p
              style={{
                fontFamily: "Bree Serif",
                fontSize: "0.9rem",
                margin: "0",
                padding: "0.5rem",
                textAlign: "justify",
              }}
            >
              {dataDescription}
            </p>
          )}

          {/* line 36 : dataDescription is desc for the symbol */}
        </Box>
      </div>
    </Box>
  );
}
