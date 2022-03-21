const express = require("express");
const Redis = require("ioredis");
const hash = require("hash-it");
const onFinished = require("on-finished");
const axios = require("axios");
const data = require("./mapper.json");

let keys = Object.keys(data);

let router = express.Router();
// get forex tick
router.get("/tick", (req, res) => {
  let reqId = hash(req.rawHeaders.toString() + Date.now().toString());
  const { symbol } = req.query;
  console.log(symbol);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");

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
    //listens to setEvent in redis key
    //subscribe executed first before tickSub
    //so we had no choice but to create a new connection just to listen to set events
    //tickSub uses config command to make it listen to redis key set events
  });
  const redis = new Redis({
    //just to get and set value in Redis datastore
    //no listening at all
    host: "cache",
    PORT: 6379,
  });

  // inform service to turn on web socket connection to symbol if close, and get channel to connect to
  pub.publish(
    "FOREX_HOME_IS_CONNECTION_ON",
    JSON.stringify({ id: reqId, symbol: symbol })
  );

  // get specific redis key so that we can subscribe to  that key
  // then, we subscribe specifically to set events on that key, which will allow us to get data (tick streams)
  // from that key
  sub.subscribe("CONNECTION_CHANNEL", (err, count) => {
    if (err) {
      console.error("Failed to subscribe: %s", err.message);
    } else {
      console.log(`Subscribed successfully! Num of sub channels: ${count}`);
    }
  });
  sub.on("message", (channel, message) => {
    //this is where we get the data from set events
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
              res.write("data: " + JSON.stringify(result) + "\n\n");
            });
          }
        });
      }
    }
  });
  onFinished(req, function (err, req) {
    console.log("request is finished");
    redis.get(`tick_${symbol}_CLIENT_COUNT`).then((result, err) => {
      if (result) {
        let count = Number(result);
        console.log("current count: ", count);
        redis.set(`tick_${symbol}_CLIENT_COUNT`, count - 1);
        sub.quit();
        pub.quit();
        redis.quit();
        tickSub.quit();
      }
    });
  });
});

// get forex tick
router.get("/historicaldata", async (req, res) => {
  const storage = new Redis({
    host: "cache",
    PORT: 6379,
  });

  try {
    const cacheData = await storage.get("forex-static-data");
    if (cacheData) {
      console.log("forex static data cache hit");
      const data = JSON.parse(cacheData);
      res.send(data);
    } else {
      let [daily, weekly, closing] = await axios
        .all([
          axios.get(
            `https://api.etorostatic.com/sapi/candles/quickcharts.json/RollingToday/24?instruments=[${keys}]`
          ),
          axios.get(
            `https://api.etorostatic.com/sapi/candles/quickcharts.json/RollingThisWeek/24?instruments=[${keys}]`
          ),
          axios.get(
            `https://api.etorostatic.com/sapi/candles/closingprices.json?instruments=[${keys}]`
          ),
        ])
        .then(
          axios.spread((obj1, obj2, obj3) => {
            return [obj1.data, obj2.data, obj3.data];
          })
        );
      let Obj = {};

      //console.log(daily);
      daily.forEach(({ InstrumentId, Prices }, index) => {
        Obj[InstrumentId] = {
          day: {
            prices: Prices,
            close: closing[index]["ClosingPrices"]["Daily"]["Price"],
          },
          week: {
            prices: weekly[index]["Prices"],
            close: closing[index]["ClosingPrices"]["Weekly"]["Price"],
          },
        };
      });
      storage.set("forex-static-data", JSON.stringify(Obj), "EX", 1000);
      res.send(Obj);
    }
  } catch (error) {
    console.log("error");
  } finally {
    storage.quit();
  }
});

module.exports = router;
