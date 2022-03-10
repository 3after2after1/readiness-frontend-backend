import * as React from "react";
import Card from "@mui/material/Card";
import StatsForex from "../stats/stats-forex";

export default function DetailsStatsContent({ statsData }) {
  return (
    <Card sx={{ minWidth: 200 }}>
      <StatsForex statsData={statsData} />
    </Card>
  );
}
