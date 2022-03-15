const Redis = require("ioredis");
const {
  ws,
  subscribeTickStream,
  removeStream,
  getHistoricalData,
} = require("./config.js");
const { changeTickFormat, processHistoricalOHLC } = require("./utils.js");

const redis = new Redis({
  host: "cache",
  PORT: 6379,
});
const sub = new Redis({
  host: "cache",
  PORT: 6379,
});
const pub = new Redis({
  host: "cache",
  PORT: 6379,
});
const storageSub = new Redis({
  host: "cache",
  PORT: 6379,
});
storageSub.config("SET", "notify-keyspace-events", "KEA");

let connections = [];
const connectionItem = {
  symbol: "",
  stream_id: "",
};

ws.on("open", () => {
  console.log("crypto connection is open :)");
});

// subscribe on channels
sub.subscribe(
  "CRYPTO_IS_CONNECTION_ON",
  "CRYPTO_GET_HISTORICAL_DATA",
  (err, count) => {
    if (err) {
      console.error("Failed to subscribe: %s", err.message);
    } else {
      console.log(
        `[crypto] Subscribed successfully! Num of sub channels: ${count}`
      );
    }
  }
);

// listening on subscribed channels
sub.on("message", (channel, message) => {
  message = JSON.parse(message);

  if (channel === "CRYPTO_IS_CONNECTION_ON") {
    const { id, symbol } = message;
    let tickKey = `tick_${symbol.toUpperCase()}`;

    // sub to tick stream if connection to symbol does not exist
    if (!checkConnectionExistOnSymbol(symbol)) {
      // TODO: set client count

      let stream_id = createCryptoSubs(symbol);
      subscribeTickStream(stream_id);
      connectionItem.stream_id = stream_id;
      connectionItem.symbol = symbol.toUpperCase();
      connections.push(connectionItem);
    } else {
      // TODO: incremenet client count
    }

    pub.publish(
      "CONNECTION_CHANNEL",
      JSON.stringify({ id: id, channel: tickKey })
    );
  }

  // get historical data reqs
  if (channel === "CRYPTO_GET_HISTORICAL_DATA") {
    const { symbol, interval, id } = message;

    getHistoricalData(symbol, interval).then((data) => {
      let processedData = processHistoricalOHLC(data);
      let message = { data: processedData, id: id };
      pub.publish("CRYPTO_HISTORICAL_OHLC", JSON.stringify(message));
    });
  }
});

// listening to websocket
ws.onmessage = (msg) => {
  msg = JSON.parse(msg.data);

  if (msg.TYPE === "5") {
    // process tick data to ohlc
    if (msg.LASTUPDATE && msg.PRICE) {
      let tickKey = `tick_${msg.FROMSYMBOL}`;
      let processedTick = changeTickFormat(msg);
      redis.set(tickKey, JSON.stringify(processedTick));
    }
  } else {
    console.log("other msg from websocket ", msg);
  }
};

// create crypto subscription string
const createCryptoSubs = (symbol) => {
  return `5~CCCAGG~${symbol.toUpperCase()}~USD`;
};

// check if tick stream exists
const checkConnectionExistOnSymbol = (symbol) => {
  let exist = false;
  connections.forEach((i) => {
    if (i.symbol.toUpperCase() === symbol.toUpperCase()) exist = true;
  });

  return exist;
};
