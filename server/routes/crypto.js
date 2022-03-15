let express = require("express");
require("dotenv").config();
let router = express.Router();
const { MongoClient } = require("mongodb");
const { TrendingCoins, CoinList } = require("../api/coingeckoApi");
const Redis = require("ioredis");
const axios = require("axios");
const hash = require("hash-it");
const onFinished = require("on-finished");

const uri = process.env.MONGO_URI;
console.log(uri);

router.get("/table", async (req, res) => {
  try {
    const { data } = await axios.get(CoinList());
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/trending", async (req, res) => {
  try {
    const {
      data: { coins },
    } = await axios.get(TrendingCoins());
    const filteredData = coins.map(({ item }) => {
      return {
        large: item.large,
        symbol: item.symbol,
        name: item.name,
      };
    });
    console.log(filteredData);
    res.send(filteredData);
  } catch (error) {
    console.log(error);
  }
});

// get crypto tick
router.get("/tick", (req, res) => {
  let reqId = hash(req.rawHeaders.toString() + Date.now().toString());
  let { symbol } = req.query;
  symbol = symbol.toUpperCase();
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
    "CRYPTO_IS_CONNECTION_ON",
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
        let tick_channel = message.channel;
        tickSub.config("SET", "notify-keyspace-events", "KEA");
        //TO-DO: unsub any existing subbed tick_ channel
        tickSub.subscribe("__keyevent@0__:set", tick_channel, (err, count) => {
          if (err) console.log("err :", err);
          else console.log("connected to key set event sub! ", count);
        });

        // get notification on set event on redis key
        tickSub.on("message", (channel, key) => {
          // console.log(`from ${channel} message: ${key}`);

          if (key === tick_channel) {
            redis.get(key).then((result, err) => {
              res.write("data: " + JSON.stringify(result) + "\n\n");
            });
          }
        });
      }
    }
  });

  // subtract num of clients connected to specified connection
  onFinished(req, function (err, req) {
    console.log("request is finished");
    redis.get(`tick_${symbol}_CLIENT_COUNT`).then((result, err) => {
      if (result) {
        let count = Number(result);
        redis.set(`tick_${symbol}_CLIENT_COUNT`, count - 1);
      }
    });
  });
});

// get historical data on symbol
router.get("/historical", (req, res) => {
  const { symbol, interval } = req.query;
  let reqId = hash(req.rawHeaders.toString() + Date.now().toString());
  const historicalDataQuery = {
    symbol,
    interval,
    id: reqId,
  };

  if (!symbol) {
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

  pub.publish(
    "CRYPTO_GET_HISTORICAL_DATA",
    JSON.stringify(historicalDataQuery)
  );
  sub.subscribe("CRYPTO_HISTORICAL_OHLC", (err, count) => {
    if (err) {
      console.error("Failed to subscribe: %s", err.message);
    } else {
      console.log(`Subscribed successfully! Num of sub channels: ${count}`);
    }
  });
  sub.on("message", (channel, message) => {
    message = JSON.parse(message);

    if (channel === "CRYPTO_HISTORICAL_OHLC" && message.id === reqId) {
      res.json({ data: message.data });
      return sub.quit();
    }
  });
});

module.exports = router;
