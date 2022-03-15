import React from "react";
import CandleStickChart from "./chart-types/CandleStickChart";
import LineGraphChart from "./chart-types/LineGraphChart";
import {
  charts,
  chartIndicators,
  candleIntervals,
  processHistoricalOHLC,
  processHistoricalTicks,
  isCurrentTickTimeGroupSame,
  updateLastOHLC,
  createOHLC,
  markets,
} from "../../utils/utils";
import {
  ws,
  closeStream,
  getHistoricalData,
  subscribeTickStream,
} from "../../configs/derivApi";
import { createCryptoSubs } from "../../utils/utils-cryptocompare";
import {
  // ws_cc,
  getCryptoHistoricalData,
  closeCryptoStream,
  subscribeCryptoTickStream,
  CryptoSocketConnection,
} from "../../configs/cryptoCompareApi";

import { getForexOHLCHistorical } from "../../api/forex-endpoint";

import { Grid } from "@material-ui/core";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import { Select } from "@mui/material";
import { FormControl } from "@material-ui/core";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import { ForexTickConnection } from "../../utils/forexTickConnection";
//call the API endpoint

let tickConnection;

class ChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: candleIntervals.one_minute,
      chart: charts.candle_stick,
      indicators: [],
    };
  }
  // accepts props: symbol
  componentDidMount() {
    if (this.props.market === "forex") {
      // 58-68 (microservice) other all still client
      // getting historical forex data and starting a server sent event connection to get ticks - complete
      // getForexOHLCHistorical("usdjpy", "candles", "one_minute").then((data) => {
      //   console.log("data received: ", data);
      //   tickConnection = new ForexTickConnection("USDJPY");
      //   tickConnection.connection.onmessage = (msg) => {
      //     console.log("tick: ", JSON.parse(JSON.parse(msg.data)));
      //     //sse onmessage
      //   };
      // });
      //ignore
      ws.onmessage = (msg) => {
        let data = JSON.parse(msg.data);

        // console.log("inside ", data);

        // process candle data and subscribe to data stream
        if (data.msg_type === "candles") {
          // console.log("history candies in");
          let data_candles = data.candles;
          let data_processed = processHistoricalOHLC(
            data_candles,
            this.props.market
          );
          this.setState({ data: data_processed });
          if (this.stream_id !== null) subscribeTickStream(this.props.symbol);
        }

        // process historical tick data
        if (data.msg_type === "history") {
          let data_ticks = data.history;
          let processedData = processHistoricalTicks(data_ticks);
          this.setState({ data: processedData });
        }

        // get tick stream
        if (data.msg_type === "tick") {
          // set stream id
          if (data.error === undefined) {
            this.setState({ stream_id: data.subscription.id });
            let data_tick = data.tick;

            let lastCandle = this.state.data[this.state.data.length - 1];
            // let lastOHLC = this.state.data[this.state.data.length - 1];

            // standardise tick data
            data_tick.date = new Date(data_tick.epoch * 1000);
            data_tick.price = data_tick.quote;

            // send current price to parent component (details) to display
            this.props.getCurrentPrice(data_tick.price);

            // check if new tick belongs to the same time group of last OHLC
            let sameTimeGroup = isCurrentTickTimeGroupSame(
              this.state.interval,
              lastCandle,
              data_tick
            );

            // if time group of previous OHLC and current tick same, update the previous OHLC, else create new OHLC
            let newOHLC = null;
            if (sameTimeGroup) {
              updateLastOHLC(lastCandle, data_tick);
            } else {
              newOHLC = createOHLC(data_tick);
            }

            if (newOHLC) this.state.data.push(newOHLC);
          } else {
            console.log("error: ", msg.error);
          }
        }
      };

      // get historical data
      ws.onopen = function () {
        getHistoricalData(this.props.symbol, "candles", this.state.interval);
        console.log("done req");
      }.bind(this);
    } else {
      // process crypto data
      // get historical data
      const ws_crypto = new CryptoSocketConnection();

      // ws_cc.close();
      getCryptoHistoricalData(this.props.symbol, this.state.interval).then(
        (data) => {
          let processedData = processHistoricalOHLC(data, this.props.market);
          this.setState({ data: processedData });

          ws_crypto.connection.onopen = function () {
            subscribeCryptoTickStream(
              createCryptoSubs(this.props.symbol.toUpperCase()),
              ws_crypto.connection
            );
          }.bind(this);
        }
      );

      ws_crypto.connection.onmessage = (msg) => {
        console.log("msg ,", msg);
        this.setState({ stream_id: createCryptoSubs(this.props.symbol) });
        let data = JSON.parse(msg.data);

        if (data.TYPE === "5") {
          let lastCandle = this.state.data[this.state.data.length - 1];

          // response must contain date and price
          if (data.LASTUPDATE && data.PRICE) {
            // standardise tick data
            data.date = new Date(data.LASTUPDATE * 1000);
            data.price = data.PRICE;

            // send current price to parent component (details) to display
            this.props.getCurrentPrice(data.price);

            // check if new tick belongs to the same time group of last OHLC
            let sameTimeGroup = isCurrentTickTimeGroupSame(
              this.state.interval,
              lastCandle,
              data
            );

            // if time group of previous OHLC and current tick same, update the previous OHLC, else create new OHLC
            let newOHLC = null;
            if (sameTimeGroup) {
              updateLastOHLC(lastCandle, data);
            } else {
              newOHLC = createOHLC(data);
            }

            if (newOHLC) this.state.data.push(newOHLC);
          }
        }
      };
    }
  }

  componentWillUnmount = () => {
    if (this.props.market === "forex") {
      closeStream(this.state.stream_id);
      //closing sse connection here
    } else {
      // closeCryptoStream([this.state.subs], ws_crypto.connection);
    }

    // tickConnection.closeConnection();
    console.log("unmounting");
  };

  // change ohlc chart interval
  changeOHLCInterval = (e) => {
    let interval = candleIntervals[e.target.value];
    this.setState({ interval: interval });

    if (this.props.market === "forex") {
      if (interval.seconds === candleIntervals.one_tick.seconds)
        getHistoricalData(
          this.props.symbol,
          "ticks",
          candleIntervals.one_minute
        );
      else getHistoricalData(this.props.symbol, "candles", interval);
    } else {
      getCryptoHistoricalData(this.props.symbol, interval).then((data) => {
        let processedData = processHistoricalOHLC(data, this.props.market);
        this.setState({ data: processedData });
      });
    }
  };

  // change chart on display
  changeChart = (e) => {
    this.setState({ chart: e.target.value });
    if (e.target.value === charts.candle_stick) {
      if (
        this.state.interval.seconds === candleIntervals.one_tick.seconds &&
        this.props.market === "forex"
      ) {
        this.setState({ interval: candleIntervals.one_minute });
        getHistoricalData(
          this.props.symbol,
          "candles",
          candleIntervals.one_minute
        );
      }
    }
  };

  // enable and disable chart indicators
  enableDisableIndicator = (indicator) => {
    if (this.state.indicators.includes(indicator)) {
      let newIndicators = this.state.indicators.filter((i) => i !== indicator);
      this.setState({ indicators: newIndicators });
    } else {
      this.state.indicators.push(indicator);
    }
  };

  // enable and disable chart Indicators
  selectUnselectIndicator = (e) => {
    let indicator = e.target.value;

    this.setState({
      indicators:
        typeof indicator === "string" ? indicator.split(",") : indicator,
    });
  };

  render() {
    // change interval options depending on market and chart type
    let intervalOptions = { ...candleIntervals };
    if (
      !(this.props.market === "forex" && this.state.chart === charts.line_graph)
    ) {
      delete intervalOptions.one_tick;
    }

    if (!this.state.data) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        {this.state.chart === charts.candle_stick && (
          <CandleStickChart
            type="hybrid"
            data={this.state.data}
            indicators={this.state.indicators}
          />
        )}
        {this.state.chart === charts.line_graph && (
          <LineGraphChart
            type="hybrid"
            data={this.state.data}
            indicators={this.state.indicators}
          />
        )}
        <div>
          <button
            onClick={() => {
              this.props.market === "forex"
                ? closeStream(this.state.stream_id)
                : closeCryptoStream([this.state.stream_id]);
            }}
          >
            end connection
          </button>
        </div>
        <div>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="label-chart-type">Chart</InputLabel>
                <Select
                  labelId="label-chart-type"
                  id="select-chart-type"
                  label="Chart Type"
                  value={this.state.chart}
                  onChange={this.changeChart}
                >
                  {Object.keys(charts).map((chart) => {
                    return (
                      <MenuItem key={chart} value={charts[chart]}>
                        {chart}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="label-chart-interval">Interval</InputLabel>
                <Select
                  labelId="label-chart-interval"
                  id="select-chart-interval"
                  label="Chart Interval"
                  value={this.state.interval.name}
                  onChange={this.changeOHLCInterval}
                >
                  {Object.keys(intervalOptions).map((interval) => {
                    return (
                      <MenuItem key={interval} value={interval}>
                        {interval}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="multiple-chip-label">Indicators</InputLabel>
                <Select
                  labelId="multiple-chip-label"
                  id="multiple-chip"
                  multiple
                  value={this.state.indicators}
                  onChange={this.selectUnselectIndicator}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => {
                        return <Chip key={value} label={value} />;
                      })}
                    </Box>
                  )}
                >
                  {Object.values(chartIndicators).map((indicator) => (
                    <MenuItem key={indicator} value={indicator}>
                      {indicator}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default ChartComponent;
