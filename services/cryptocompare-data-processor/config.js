const { WebSocket } = require("ws");

// crypto-compare site api key
const CC_API_KEY =
  "ff5a594decd73691c1c1603361f178507b88ff9c63e849d4f4db59eb0614092c";

const ws = new WebSocket(
  "wss://streamer.cryptocompare.com/v2?api_key=" + CC_API_KEY
);

// close crypto stream
const removeStream = (subs) => {
  ws.send(
    JSON.stringify({
      action: "SubRemove",
      subs: subs,
    })
  );
};

// subscribe to a stream
const subscribeTickStream = (subs) => {
  ws.send(
    JSON.stringify({
      action: "SubAdd",
      subs: [subs],
    })
  );
};

module.exports = {
  ws,
  subscribeTickStream,
  removeStream,
};
