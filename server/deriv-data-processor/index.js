const { WebSocket } = require("ws");
const Redis = require("ioredis");

const app_id = 1089;
const ws = new WebSocket(
  "wss://ws.binaryws.com/websockets/v3?app_id=" + app_id
);

const redis = new Redis({
  host: "redis-server",
  PORT: 6379,
});
const sub = new Redis({
  host: "redis-server",
  PORT: 6379,
});
const pub = new Redis({
  host: "redis-server",
  PORT: 6379,
});

let isSocketOpen = false;
const connections = [];
const connectionItem = {
  symbol: "",
  stream_id: "",
};

ws.on("open", () => {
  console.log("connection is open :)");
  isSocketOpen = true;
});

// subscribe on channels
sub.subscribe("FOREX_IS_CONNECTION_ON", (err, count) => {
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
    console.log(message);
    const { id, symbol } = message;
    console.log("in ", id, symbol);

    // sub to tick stream if connection to symbol does not exist
    if (!checkConnectionExistOnSymbol(symbol)) subscribeTickStream(symbol);

    // send key name for client to get tick data
    pub.publish(
      "CONNECTION_CHANNEL",
      JSON.stringify({ id: id, channel: `tick_${symbol}` })
    );
  }
});

// listening to websocket
ws.onmessage = (msg) => {
  msg = JSON.parse(msg.data);

  if (msg.msg_type === "tick") {
    console.log("tick ", msg);
    connectionItem.stream_id = msg.subscription.id;
    connectionItem.symbol = msg.tick.symbol;

    if (!checkConnectionExistOnSymbol(connectionItem.symbol))
      connections.push(connectionItem);
    redis.set(`tick_${msg.tick.symbol}`, JSON.stringify(msg.tick));

    // check if data was saved in redis
    // redis.get(`tick_${msg.tick.symbol}`).then((result, err) => {
    //   console.log("result ", JSON.parse(result));
    // });
  }
};

// get tick stream
const subscribeTickStream = (symbol) => {
  ws.send(
    JSON.stringify({
      ticks: symbol,
      subscribe: 1,
    })
  );
};

const checkConnectionExistOnSymbol = (symbol) => {
  let exist = false;
  connections.forEach((i) => {
    if (i.symbol === symbol) exist = true;
  });

  return exist;
};
