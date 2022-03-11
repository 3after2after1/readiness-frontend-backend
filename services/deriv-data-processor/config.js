const { WebSocket } = require("ws");

const app_id = 1089;
const ws = new WebSocket(
  "wss://ws.binaryws.com/websockets/v3?app_id=" + app_id
);

// get tick stream
const subscribeTickStream = (symbol) => {
  console.log("subs ing ");
  ws.send(
    JSON.stringify({
      ticks: symbol,
      subscribe: 1,
    })
  );
};

// get historical data
const getHistoricalData = (symbol, style, interval) => {
  ws.send(
    JSON.stringify({
      ticks_history: symbol,
      adjust_start_time: 1,
      count: 100,
      end: "latest",
      style: style,
      granularity: interval.seconds,
    })
  );
};

module.exports = {
  ws,
  subscribeTickStream,
  getHistoricalData,
};
