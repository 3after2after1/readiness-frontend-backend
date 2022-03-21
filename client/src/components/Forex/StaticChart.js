import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ChartProperties } from "./ChartProperties";
import { etoroMapper } from "./etoroMapper";
import axios from "axios";
import { BACKEND_DOMAIN } from "../../api/backend";

function StaticChart({ id, range, direction }) {
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);
  const [close, setClose] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLatestPrice = () => {
      console.log("getting forex static chart");
      try {
        axios
          .get(`${BACKEND_DOMAIN}/forexhome/historicaldata`)
          .then(({ data }) => {
            let filteredData = data[etoroMapper[id]][range]["prices"].map(
              (row) => {
                return [row.ToTime, row.Price];
              }
            );
            // let constant = direction === "up" ? -0.001 : 0.001;s
            let close = data[etoroMapper[id]][range]["close"];
            // setClose((close + constant).toFixed(5));
            setClose(close);
            setSeries([
              {
                data: filteredData,
              },
            ]);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getLatestPrice();
  }, [range]);

  return (
    <div className="static">
      <Typography
        id="test"
        variant="h6"
        sx={{
          fontFamily: "Bree Serif",
          color: "black",
          fontWeight: "",
          backgroundColor: "#FFCE45",
          textAlign: "center",
        }}
      >
        Previous Close: ${close}
      </Typography>
      <Box style={{ backgroundColor: "white" }}>
        <Chart
          options={ChartProperties.options}
          series={series}
          type="area"
          width={302}
          height={220}
        />
      </Box>
    </div>
  );
}

export default StaticChart;
