import React from "react";
import { Grid } from "@mui/material";
import "./stats-forex.css";

function DataTablet({ name, value, strength = null }) {
  return (
    <div className={`tablet ${getBgColor(strength)}`}>
      <Grid container>
        <Grid item xs={4}>
          {name}
        </Grid>
        <Grid item xs={8}>
          {value}
        </Grid>
      </Grid>
    </div>
  );
}
const strengths = ["weak", "moderate", "strong"];
function StrengthIndicatorTablet({ strength }) {
  return (
    <div className="strength-indicator-item">
      <Grid container>
        <Grid item xs={12} lg={1}>
          <div className={`strength-indicator ${getBgColor(strength)}`}></div>
        </Grid>
        <Grid item xs={12} lg={11}>
          <div>{strength}</div>
        </Grid>
      </Grid>
    </div>
  );
}

const getBgColor = (strength) => {
  let colorClass = "tablet-default";

  switch (strength) {
    case "weak":
      colorClass = "tablet-weak";
      break;
    case "moderate":
      colorClass = "tablet-moderate";
      break;
    case "strong":
      colorClass = "tablet-strong";
      break;
    default:
      colorClass = "tablet-default";
  }
  return colorClass;
};

export default function StatsForex({ statsData }) {
  if (
    (statsData.support.length === 0 || statsData.resist.length === 0) &&
    statsData.pivot.length === 0
  ) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Sorry! Data is currently unavailable!
      </div>
    );
  } else
    return (
      <Grid container spacing={2}>
        {statsData.support.length !== 0 && statsData.resist.length !== 0 && (
          <Grid className="" item xs={12} lg={7}>
            <div className="stats-group">
              <div>
                <h3>Support and Resistance</h3>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {statsData ? (
                    statsData.support.map((item, index) => {
                      return (
                        <DataTablet
                          name={item.s}
                          value={item.value}
                          strength={item.strength}
                          key={item.s + index.toString()}
                        />
                      );
                    })
                  ) : (
                    <p>loading...</p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  {statsData ? (
                    statsData.resist.map((item, index) => {
                      return (
                        <DataTablet
                          name={item.r}
                          value={item.value}
                          strength={item.strength}
                          key={item.r + index.toString()}
                        />
                      );
                    })
                  ) : (
                    <p>loading...</p>
                  )}
                </Grid>
              </Grid>
              <div className="strength-indicators-group">
                <Grid container justifyContent="center" spacing={2}>
                  {strengths.map((strength, index) => {
                    return (
                      <Grid item xs={4} key={strength + index.toString()}>
                        <StrengthIndicatorTablet strength={strength} />
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            </div>
          </Grid>
        )}

        <Grid item xs={12} lg={5}>
          {statsData.pivot.length !== 0 && (
            <div className="stats-group">
              <div>
                <h3>Pivot Points</h3>
              </div>
              <Grid container spacing={0} key="grid-0">
                <Grid item xs={4}>
                  {statsData ? (
                    statsData.pivot.map((item, index) => {
                      if (item.pivot.toLowerCase() === "p") {
                        return (
                          <DataTablet
                            name={item.pivot}
                            value={item.point}
                            key={item.pivot + index.toString()}
                          />
                        );
                      } else return null;
                    })
                  ) : (
                    <p>loading...</p>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={0} key="grid-1">
                {statsData ? (
                  statsData.pivot.map((item, index) => {
                    if (item.pivot.toLowerCase().includes("s")) {
                      return (
                        <Grid item xs={4} key={item.pivot + index.toString()}>
                          <DataTablet name={item.pivot} value={item.point} />
                        </Grid>
                      );
                    } else return null;
                  })
                ) : (
                  <p>loading...</p>
                )}
              </Grid>
              <Grid container spacing={0} key="grid-2">
                {statsData ? (
                  statsData.pivot.map((item, index) => {
                    if (item.pivot.toLowerCase().includes("r")) {
                      return (
                        <Grid item xs={4} key={item.pivot + index.toString()}>
                          <DataTablet name={item.pivot} value={item.point} />
                        </Grid>
                      );
                    } else return null;
                  })
                ) : (
                  <p>loading...</p>
                )}
              </Grid>
            </div>
          )}
        </Grid>
      </Grid>
    );
}
