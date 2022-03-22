const Redis = require("ioredis");
const protobuf = require("protobufjs");
const { Buffer } = require("buffer/");
const { ws, subscribeTickStream, removeStream } = require("./config.js");

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
  //just to store client count
  host: "cache",
  PORT: 6379,
});
storageSub.config("SET", "notify-keyspace-events", "KEA");
//configure storageSub to listen to SET events

let isSocketOpen = false;
let connections = [];
//array will be used for connection count later
const connectionItem = {
  symbol: "",
  stream_id: "",
};
let globalKey = null;

const checkConnectionExistOnSymbol = (symbol) => {
  let exist = false;
  connections.forEach((i) => {
    if (i.symbol === symbol) exist = true;
  });

  return exist;
};

ws.on("open", () => {
  console.log("connection is open :)");
  isSocketOpen = true;
});

// this is where we subscribe to request channels sent from pub in server side
sub.subscribe("FOREX_HOME_IS_CONNECTION_ON", (err, count) => {
  //we can subscribe to multiple channel as seen above
  //count: number of subcribed channel
  if (err) {
    console.error("Failed to subscribe: %s", err.message);
  } else {
    console.log(`Subscribed successfully! Num of sub channels: ${count}`);
  }
});

// listening to subscribed channels
sub.on("message", (channel, message) => {
  message = JSON.parse(message);

  if (channel === "FOREX_HOME_IS_CONNECTION_ON") {
    const { id, symbol } = message;
    // console.log("in ", id, symbol);
    let tickKey = `tick_${symbol}`;
    globalKey = tickKey;
    console.log("globalKey", globalKey);

    // subscribe to tick stream if connection to symbol does not exist
    if (!checkConnectionExistOnSymbol(symbol)) {
      redis.set(`${tickKey}_CLIENT_COUNT`, 1);
      console.log("symbol", symbol);
      subscribeTickStream(symbol);
      //start requesting streams from websockets
    } else {
      // connection already exist
      // increment number of clients connected on channel by 1
      redis.get(`${tickKey}_CLIENT_COUNT`).then((result, err) => {
        console.log("result count", result);
        let count = 0;
        if (result) {
          count = Number(result);
        }
        redis.set(`${tickKey}_CLIENT_COUNT`, count + 1);
      });
    }

    //! send key name for to server side so that they know where to listen
    // in order to get data to get tick data
    pub.publish(
      "CONNECTION_CHANNEL",
      JSON.stringify({ id: id, channel: tickKey })
      //? this JSON will be parsed and stored in a variable called: message
      //send this to endpoint so that they know which key to listen to
    );
  }

  // if (channel === "GET_HISTORICAL_DATA") {
  //   const { symbol, style, interval, id } = message;
  //   console.log("received msg from get his chann: ", message);
  //   getHistoricalData(symbol, style, interval, id);
  // }
});

// listening to websocket
ws.onmessage = (msg) => {
  // msg = JSON.parse(msg.data);
  // console.log("reached websocket");
  if (msg.type === "message") {
    // console.log("tick ", msg);
    protobuf.load("./YPricingData.proto", (error, root) => {
      const Yaticker = root.lookupType("yaticker");
      const tick = Yaticker.decode(new Buffer(msg.data, "base64"));
      let tickKey = globalKey;
      connectionItem.symbol = globalKey;
      if (!checkConnectionExistOnSymbol(connectionItem.symbol)) {
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
      let processedTick = {
        id: tick.id,
        change: tick.change,
        price: tick.price,
      };
      // console.log("tick ", processedTick);
      redis.set(tickKey, JSON.stringify(processedTick));
    });
  }
};

// listening to redis connection client count storage set events
const clientCountRegex = /^(.)+_CLIENT_COUNT$/;
storageSub.on("message", (channel, key) => {
  if (key.match(clientCountRegex)) {
    let symbol = key.replace("tick_", "");
    symbol = symbol.replace("_CLIENT_COUNT", "");
    console.log("symbol extracted ", symbol);
    redis.get(key).then((result, err) => {
      console.log(`current num of client ${key}`, result);
      if (Number(result) === 0) {
        connections = connections.filter((item, index) => {
          if (item.symbol !== symbol) {
            return item;
          } else {
            // removeStream(item.stream_id);
            removeStream();
            return;
          }
        });
        console.log("final connections: ", connections);
      }
    });
  }
});

// check if tick stream exists
