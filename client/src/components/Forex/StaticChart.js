import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ChartProperties } from "./ChartProperties";
import { etoroMapper } from "./etoroMapper";
import axios from "axios";

function StaticChart({ id, range }) {
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);
  const [close, setClose] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLatestPrice = () => {
      try {
        axios.get("http://localhost:5002/livepricefeed").then(({ data }) => {
          let filteredData = data[etoroMapper[id]][range]["prices"].map(
            (row) => {
              return [row.ToTime, row.Price];
            }
          );
          let close = data[etoroMapper[id]][range]["close"];
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
