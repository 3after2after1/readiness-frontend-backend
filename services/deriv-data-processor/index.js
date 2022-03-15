const Redis = require("ioredis");
const {
  ws,
  subscribeTickStream,
  getHistoricalData,
  removeStream,
} = require("./config.js");
const {
  changeTickFormat,
  processHistoricalOHLC,
  processHistoricalTicks,
} = require("./utils.js");

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
  //store client count
});
storageSub.config("SET", "notify-keyspace-events", "KEA");

let isSocketOpen = false;
let connections = [];
const connectionItem = {
  symbol: "",
  stream_id: "",
};

ws.on("open", () => {
  console.log("connection is open :)");
  isSocketOpen = true;
});

// subscribe on channels
sub.subscribe("FOREX_IS_CONNECTION_ON", "GET_HISTORICAL_DATA", (err, count) => {
  //subscribe to multiple channel
  //numbe rof subcribed chnanel
  if (err) {
    console.error("Failed to subscribe: %s", err.message);
  } else {
    console.log(`Subscribed successfully! Num of sub channels: ${count}`);
  }
});

// listening to subscribed channels
sub.on("message", (channel, message) => {
  message = JSON.parse(message);

  if (channel === "FOREX_IS_CONNECTION_ON") {
    const { id, symbol } = message;
    // console.log("in ", id, symbol);
    let tickKey = `tick_${symbol}`;

    // sub to tick stream if connection to symbol does not exist
    if (!checkConnectionExistOnSymbol(symbol)) {
      redis.set(`${tickKey}_CLIENT_COUNT`, 1);
      subscribeTickStream(symbol);
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

    // send key name for client to get tick data
    pub.publish(
      "CONNECTION_CHANNEL",
      JSON.stringify({ id: id, channel: tickKey })
      //send this to endpoint so that they know which key to listen to
    );
  }

  if (channel === "GET_HISTORICAL_DATA") {
    console.log("receive msg in get hist data channel");
    const { symbol, style, interval, id } = message;
    getHistoricalData(symbol, style, interval, id);
  }
});

// listening to websocket
ws.onmessage = (msg) => {
  msg = JSON.parse(msg.data);

  if (msg.msg_type === "tick") {
    //msg_type coming from deriv
    // console.log("tick ", msg);
    if (msg.error === undefined) {
      console.log("tick");
      let symbol = msg.tick.symbol.replace("frx", "");
      connectionItem.stream_id = msg.subscription.id;
      connectionItem.symbol = symbol;
      let tickKey = `tick_${symbol}`;

      if (!checkConnectionExistOnSymbol(connectionItem.symbol)) {
        //client count
        connections.push(connectionItem);
        storageSub.subscribe(
          "__keyevent@0__:set",
          `${tickKey}_CLIENT_COUNT`,
          (err, count) => {
            if (err) console.log("err :", err);
            else console.log("connected to keyevent! ", count);
          }
        );
      }
      let processedTick = changeTickFormat(msg.tick);
      redis.set(tickKey, JSON.stringify(processedTick));
    }

    // check if data was saved in redis
    // redis.get(`tick_${msg.tick.symbol}`).then((result, err) => {
    //   console.log("result ", JSON.parse(result));
    // });
  }

  // get historical candle data
  if (msg.msg_type === "candles") {
    // process OHLC data
    let processedData = processHistoricalOHLC(msg.candles);
    console.log("processed ", processedData);
    let message = { data: processedData, id: msg.req_id };

    pub.publish("HISTORICAL_OHLC", JSON.stringify(message));
  }

  // get historical tick data
  if (msg.msg_type === "history") {
    // process tick data to ohlc
    let processedData = processHistoricalTicks(msg.history);
    let message = { data: processedData, id: msg.req_id };

    pub.publish("HISTORICAL_OHLC", JSON.stringify(message));
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
            return;
            //close connection
          }
        });
        console.log("final connections: ", connections);
      }
    });
  }
});

// check if tick stream exists
const checkConnectionExistOnSymbol = (symbol) => {
  let exist = false;
  connections.forEach((i) => {
    if (i.symbol === symbol) exist = true;
  });

  return exist;
};
