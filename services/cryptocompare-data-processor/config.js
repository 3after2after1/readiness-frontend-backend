const { WebSocket } = require("ws");
const axios = require("axios");
const { OHLCIntervals } = require("./constants.js");

// crypto-compare site api key
// const CC_API_KEY =
//   "ff5a594decd73691c1c1603361f178507b88ff9c63e849d4f4db59eb0614092c";

// second API key
const CC_API_KEY =
  "aac38ae67f79c821bcaf374c5ffdefa4a1ef0c010fa1cfca07d6cdc5e6861a42";
const ws = new WebSocket(
  "wss://streamer.cryptocompare.com/v2?api_key=" + CC_API_KEY
);

// close crypto stream
const removeStream = (subs) => {
  ws.send(
    JSON.stringify({
      action: "SubRemove",
      subs: [subs],
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

const getHistoricalData = (
  symbol,
  interval,
  limit = 200,
  lastDate = null,
  toSymbol = "USD"
) => {
  let toTs = lastDate ? `&toTs=${lastDate}` : "";
  let url =
    `https://min-api.cryptocompare.com/data/v2/histo${OHLCIntervals[interval].unit}?fsym=${symbol}&tsym=${toSymbol}&limit=${limit}&aggregate=${OHLCIntervals[interval].value}&e=CCCAGG` +
    toTs +
    `&api_key=` +
    CC_API_KEY;

  const promiseHistorical = axios
    .get(url)
    .then((response) => response.data.Data.Data);
  return promiseHistorical;
};

module.exports = {
  ws,
  subscribeTickStream,
  removeStream,
  getHistoricalData,
};
