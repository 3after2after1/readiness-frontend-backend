const { WebSocket } = require("ws");
const { OHLCIntervals } = require("./constants.js");

const app_id = 1089;
const ws = new WebSocket(
  "wss://ws.binaryws.com/websockets/v3?app_id=" + app_id
);

// get tick stream
const subscribeTickStream = (symbol) => {
  //starting point to get websocket stream
  console.log("subs ing ", symbol);
  ws.send(
    JSON.stringify({
      ticks: "frx" + symbol,
      subscribe: 1,
    })
  );
};

// get historical data
const getHistoricalData = (symbol, style, interval, id) => {
  ws.send(
    JSON.stringify({
      ticks_history: "frx" + symbol.toUpperCase(),
      adjust_start_time: 1,
      count: 100,
      end: "latest",
      style: style,
      granularity:
        style === "candles"
          ? OHLCIntervals[interval].seconds
          : OHLCIntervals.one_minute.seconds,
      req_id: id,
    })
  );
};

// remove specific tick stream
const removeStream = (stream_id) => {
  console.log("removing stream");
  ws.send(
    JSON.stringify({
      forget: stream_id,
    })
  );
};

module.exports = {
  ws,
  subscribeTickStream,
  getHistoricalData,
  removeStream,
};
