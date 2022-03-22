let express = require("express");
let router = express.Router();
const Redis = require("ioredis");
const hash = require("hash-it");
const onFinished = require("on-finished");
const { ms } = require("date-fns/locale");

// get forex tick
router.get("/tick", (req, res) => {
  let reqId = hash(req.rawHeaders.toString() + Date.now().toString());
  const { symbol } = req.query;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log("receive tick req");
  // initialize redis connections
  const sub = new Redis({
    host: "cache",
    PORT: 6379,
  });
  const pub = new Redis({
    host: "cache",
    PORT: 6379,
  });
  const tickSub = new Redis({
    //listens to setEvent in redis key
    //sub executed before tickSub
    //tickSub uses config command to make it listen to redis key set events
    host: "cache",
    PORT: 6379,
  });
  const redis = new Redis({
    //just to get and set value in Redis
    //no listening at all
    host: "cache",
    PORT: 6379,
  });

  // inform service to turn on web socket connection to symbol if close, and get channel to connect to
  pub.publish(
    "FOREX_IS_CONNECTION_ON",
    JSON.stringify({ id: reqId, symbol: symbol })
  );

  // get redis key to subscribe to listen to ticks
  // then, sub to a redis key on set event
  sub.subscribe("CONNECTION_CHANNEL", "FOREX_ERROR_MESSAGES", (err, count) => {
    if (err) {
      console.error("Failed to subscribe: %s", err.message);
    } else {
      console.log(
        `[tick] Subscribed successfully! Num of sub channels: ${count}`
      );
    }
  });
  sub.on("message", (channel, message) => {
    message = JSON.parse(message);

    if (channel === "CONNECTION_CHANNEL") {
      // console.log("current id: ", reqId);

      // get only messages for the current ID
      if (message.id === reqId) {
        console.log("msg on channel: ", message.id, reqId);
        let tick_channel = message.channel;
        tickSub.config("SET", "notify-keyspace-events", "KEA");
        //TO-DO: unsub any existing subbed tick_ channel
        tickSub.subscribe("__keyevent@0__:set", tick_channel, (err, count) => {
          //listen to set events[tick_channel:keyname in redis]
          if (err) console.log("err :", err);
          else console.log("connected to keyevent! ", count);
        });

        // get notification on set event on redis key
        tickSub.on("message", (channel, key) => {
          // console.log(
          //   `from ${channel} message: ${key}, current given tick channel ${tick_channel}`
          // );

          if (key === tick_channel) {
            //tick_channel is key_name
            redis.get(key).then((result, err) => {
              console.log("result ", "result");
              res.write("data: " + result + "\n\n");
            });
          }
        });
      }
    }

    if (channel === "FOREX_ERROR_MESSAGES") {
      if (symbol.toLowerCase() === message.symbol.toLowerCase()) {
        res.write(
          "data: " +
            JSON.stringify({ symbol: message.symbol, error: message.error }) +
            "\n\n"
        );
      }
    }
  });

  // subtract num of clients connected to specified connection
  onFinished(req, function (err, req) {
    console.log("request is finished");

    redis.get(`tick_${symbol}_CLIENT_COUNT`).then((result, err) => {
      if (result) {
        let count = Number(result);
        console.log("current count: ", count);
        redis.set(`tick_${symbol}_CLIENT_COUNT`, count - 1);

        sub.quit();
        pub.quit();
        tickSub.quit();
        redis.quit();
      }
    });
  });
});

// get forex info
router.get("/info", (req, res) => {
  const { symbol } = req.query;
  let reqId = hash(req.rawHeaders.toString() + Date.now().toString());

  if (!symbol) {
    return res.status(404).json({
      message: "symbol missing",
    });
  }

  // create redis connections
  const sub = new Redis({
    host: "cache",
    PORT: 6379,
  });
  const pub = new Redis({
    host: "cache",
    PORT: 6379,
  });

  console.log("symbol ", symbol);
  // send forex symbol to web scraping service
  pub.publish("GET_FOREX_INFO", JSON.stringify({ id: reqId, symbol: symbol }));

  // listen for result of forex info and return response
  sub.subscribe("RESPONSE_FOREX_INFO", (err, count) => {
    if (err) {
      console.error("Failed to subscribe: %s", err.message);
    } else {
      console.log(`Subscribed successfully! Num of sub channels: ${count}`);
    }
  });
  sub.on("message", (channel, message) => {
    message = JSON.parse(message);
    if (channel === "RESPONSE_FOREX_INFO" && message.id === reqId) {
      res.json({ data: message.data });
      return sub.quit();
    }
  });
});

// get historical data on symbol
router.get("/historical", (req, res) => {
  const { symbol, style, interval, end } = req.query;
  console.log("historical data req");
  let reqId = hash(req.rawHeaders.toString() + Date.now().toString());
  const historicalDataQuery = {
    symbol,
    style,
    interval,
    id: reqId,
    end: end,
  };

  if (!symbol || !style) {
    return res.status(404).json({
      message: "parameters missing",
    });
  }

  // create redis connections
  const sub = new Redis({
    host: "cache",
    PORT: 6379,
  });
  const pub = new Redis({
    host: "cache",
    PORT: 6379,
  });

  pub.publish("GET_HISTORICAL_DATA", JSON.stringify(historicalDataQuery));

  sub.subscribe("HISTORICAL_OHLC", "FOREX_ERROR_MESSAGES", (err, count) => {
    if (err) {
      console.error("Failed to subscribe: %s", err.message);
    } else {
      console.log(`Subscribed successfully! Num of sub channels: ${count}`);
    }
  });
  sub.on("message", (channel, message) => {
    message = JSON.parse(message);

    if (channel === "HISTORICAL_OHLC" && message.id === reqId) {
      // console.log("historic response yes ", message.data);

      res.json({ data: message.data });
      return sub.quit();
    }

    if (channel === "FOREX_ERROR_MESSAGES" && message.id === reqId) {
      res.json({ symbol: symbol, error: message.error });
    }
  });
});

module.exports = router;
