const { WebSocket } = require("ws");
const ws = new WebSocket("wss://streamer.finance.yahoo.com");

// get tick stream
const subscribeTickStream = (symbol) => {
  console.log("subscribing multiple symbols ", symbol);
  ws.send(
    JSON.stringify({
      subscribe: [
        "AUDJPY=X",
        "AUDUSD=X",
        "EURAUD=X",
        "EURCAD=X",
        "EURCHF=X",
        "EURGBP=X",
        "EURJPY=X",
        "EURUSD=X",
        "GBPAUD=X",
        "GBPJPY=X",
        "AUDCAD=X",
        "GBPUSD=X",
        "CAD=X",
        "CHF=X",
        "JPY=X",
      ],
      // subscribe: ["USDCAD=X", "USDCHF=X", "USDJPY=X"],
    })
  );
};

const removeStream = () => {
  console.log("removing stream");
  ws.close();
};

module.exports = {
  ws,
  subscribeTickStream,
  removeStream,
};
