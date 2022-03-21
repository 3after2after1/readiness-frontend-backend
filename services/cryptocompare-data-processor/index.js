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
      redis.set(`${tickKey}_CLIENT_COUNT`, 1);
      storageSub.subscribe(
        "__keyevent@0__:set",
        `${tickKey}_CLIENT_COUNT`,
        (err, count) => {
          if (err) console.log("err :", err);
          else console.log("connected to keyevent! ", count);
        }
      );

      let stream_id = createCryptoSubs(symbol);
      subscribeTickStream(stream_id);
      connectionItem.stream_id = stream_id;
      connectionItem.symbol = symbol.toUpperCase();
      connections.push(connectionItem);
    } else {
      // add number of clients connected on channel
      redis.get(`${tickKey}_CLIENT_COUNT`).then((result, err) => {
        console.log("result count", result);
        let count = 0;
        if (result) {
          count = Number(result);
        }
        redis.set(`${tickKey}_CLIENT_COUNT`, count + 1);
      });
    }

    pub.publish(
      "CONNECTION_CHANNEL",
      JSON.stringify({ id: id, channel: tickKey })
    );
  }

  // get historical data reqs
  if (channel === "CRYPTO_GET_HISTORICAL_DATA") {
    const { symbol, interval, id, lastDate } = message;

    getHistoricalData(symbol, interval, lastDate).then((data) => {
      if (data.Response === "Error") {
        console.log("receives error symbol ", data);
        pub.publish(
          "CRYPTO_ERROR_MESSAGES",
          JSON.stringify({
            symbol: symbol,
            error: "MarketNoData",
            id: id,
          })
        );
      } else {
        data = data.Data.Data;
        let processedData = processHistoricalOHLC(data);
        let message = { data: processedData, id: id };
        pub.publish("CRYPTO_HISTORICAL_OHLC", JSON.stringify(message));
      }
    });
  }
});

// listening to websocket
ws.onmessage = (msg) => {
  msg = JSON.parse(msg.data);

  if (msg.TYPE === "5") {
    console.log("tick");
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

// listening to redis connection client count storage set events
const clientCountRegex = /^(.)+_CLIENT_COUNT$/;
storageSub.on("message", (channel, key) => {
  if (key.match(clientCountRegex)) {
    let symbol = key.replace("tick_", "");
    symbol = symbol.replace("_CLIENT_COUNT", "");

    redis.get(key).then((result, err) => {
      if (Number(result) === 0) {
        connections = connections.filter((item, index) => {
          if (item.symbol !== symbol) {
            return item;
          } else {
            removeStream(item.stream_id);

            // remove redis keys no longer in use
            redis.keys("*", (err, keys) => {
              console.log("b4", keys);

              console.log(`deleting ${key}`);
              redis.del(key);
              redis.del(`tick_${symbol}`);
              redis.keys("*", (err, keys) => {
                console.log(keys);
              });
            });
            return;
          }
        });
        console.log("final connections: ", connections);
      }
    });
  }
});

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
