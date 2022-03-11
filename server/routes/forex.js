let express = require("express");
let router = express.Router();
const Redis = require("ioredis");
const hash = require("hash-it");

// get forex tick
router.get("/tick", (req, res) => {
  console.log("getting ticks");
  let reqId = hash(req.rawHeaders.toString() + Date.now().toString());
  const { symbol } = req.query;
  res.setHeader("Content-Type", "text/event-stream");

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
    host: "cache",
    PORT: 6379,
  });
  const redis = new Redis({
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
  sub.subscribe("CONNECTION_CHANNEL", (err, count) => {
    if (err) {
      console.error("Failed to subscribe: %s", err.message);
    } else {
      console.log(`Subscribed successfully! Num of sub channels: ${count}`);
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
          if (err) console.log("err :", err);
          else console.log("connected to keyevent! ", count);
        });

        // get notification on set event on redis key
        tickSub.on("message", (channel, key) => {
          // console.log(`from ${channel} message: ${key}`);

          if (key === tick_channel) {
            redis.get(key).then((result, err) => {
              console.log("result ", "result");
              res.write("data: " + JSON.stringify(result) + "\n\n");
            });
          }
        });
      }
    }
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
  const { symbol, style, interval } = req.query;
  let reqId = hash(req.rawHeaders.toString() + Date.now().toString());
  const historicalDataQuery = {
    symbol,
    style,
    interval,
    id: reqId,
  };

  if (!symbol || !style || !interval) {
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

  sub.subscribe("HISTORICAL_OHLC", (err, count) => {
    if (err) {
      console.error("Failed to subscribe: %s", err.message);
    } else {
      console.log(`Subscribed successfully! Num of sub channels: ${count}`);
    }
  });
  sub.on("message", (channel, message) => {
    message = JSON.parse(message);

    if (channel === "HISTORICAL_OHLC" && message.id === reqId) {
      res.json({ data: message.data });
      return sub.quit();
    }
  });
});

module.exports = router;
