const app_id = 1089;

export const ws = new WebSocket(
  "wss://ws.binaryws.com/websockets/v3?app_id=" + app_id
);

// close data stream
export const closeStream = (stream_id) => {
  console.log("closing ", stream_id);
  ws.send(
    JSON.stringify({
      forget: stream_id,
    })
  );
};

// get historical data
export const getHistoricalData = (symbol, style, interval) => {
  ws.send(
    JSON.stringify({
      ticks_history: "frx" + symbol,
      // ticks_history: symbol,
      adjust_start_time: 1,
      count: 100,
      end: "latest",
      style: style,
      granularity: interval.seconds,
    })
  );
};

// get tick stream
export const subscribeTickStream = (symbol) => {
  ws.send(
    JSON.stringify({
      ticks: "frx" + symbol,
      subscribe: 1,
    })
  );
};
