const { WebSocket } = require("ws");

const app_id = 1089;
const ws = new WebSocket(
  "wss://ws.binaryws.com/websockets/v3?app_id=" + app_id
);

// get tick stream
const subscribeTickStream = (symbol) => {
  console.log("subs ing ");
  ws.onopen(() => {
    ws.send(
      JSON.stringify({
        ticks: symbol,
        subscribe: 1,
      })
    );
  });
};

module.exports = {
  ws,
  subscribeTickStream,
};
