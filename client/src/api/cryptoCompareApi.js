// crypto-compare site api key
export const CC_API_KEY =
  "ff5a594decd73691c1c1603361f178507b88ff9c63e849d4f4db59eb0614092c";

export const ws_cc = new WebSocket(
  "wss://streamer.cryptocompare.com/v2?api_key=" + CC_API_KEY
);

// get historical data
export function getCryptoHistoricalData(
  symbol,
  interval,
  limit = 200,
  lastDate = null,
  toSymbol = "USD"
) {
  let toTs = lastDate ? `&toTs=${lastDate}` : "";
  let url =
    `https://min-api.cryptocompare.com/data/v2/histo${interval.unit}?fsym=${symbol}&tsym=${toSymbol}&limit=${limit}&aggregate=${interval.value}&e=CCCAGG` +
    toTs +
    `&api_key=` +
    CC_API_KEY;

  const promiseHistorical = fetch(url)
    .then((response) => response.json())
    .then((data) => data.Data.Data);

  return promiseHistorical;
}

// close crypto stream
export const closeCryptoStream = (subs) => {
  ws_cc.send(
    JSON.stringify({
      action: "SubRemove",
      subs: subs,
    })
  );
};

// subscribe to a stream
export const subscribeCryptoTickStream = (subs, connection) => {
  connection.send(
    JSON.stringify({
      action: "SubAdd",
      subs: [subs],
    })
  );
};

export class CryptoSocketConnection {
  constructor() {
    this.connection = new WebSocket(
      "wss://streamer.cryptocompare.com/v2?api_key=" + CC_API_KEY
    );
  }

  closeConnection() {
    this.connection.close();
  }
}
