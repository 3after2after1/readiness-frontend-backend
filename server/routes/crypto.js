let express = require("express");
require("dotenv").config();
const { TrendingCoins, CoinList } = require("../api/coingeckoApi");
const Redis = require("ioredis");
const axios = require("axios");
const hash = require("hash-it");
const onFinished = require("on-finished");
const cheerio = require("cheerio");
let router = express.Router();

router.get("/table", async (req, res) => {
  const storage = new Redis({
    host: "cache",
    PORT: 6379,
  });
  try {
    const cacheData = await storage.get("crypto-table");
    if (cacheData) {
      console.log("crypto table cache hit");
      const data = JSON.parse(cacheData);
      res.send(data);
    } else {
      console.log("crypto table cache miss");
      let { data } = await axios.get(CoinList());
      storage.set("crypto-table", JSON.stringify(data), "EX", 30);
      res.send(data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    storage.quit();
  }
});

router.get("/trending", async (req, res) => {
  const storage = new Redis({
    host: "cache",
    PORT: 6379,
  });
  try {
    const cacheData = await storage.get("crypto-trending");
    if (cacheData) {
      console.log("crypto trending cache hit");
      const data = JSON.parse(cacheData);
      res.send(data);
    } else {
      console.log("crypto trending cache miss");
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
      storage.set("crypto-trending", JSON.stringify(filteredData), "EX", 90);
      res.send(filteredData);
    }
  } catch (error) {
    console.log(error);
  } finally {
    storage.quit();
  }
});

// get crypto info
router.get("/info", async (req, res) => {
  const { name } = req.query;

  try {
    console.log("name of crypto", name);
    const site_url = `https://coinmarketcap.com/currencies/${name}/`;
    const { data } = await axios({
      method: "GET",
      url: site_url,
    });
    const $ = cheerio.load(data);
    const elemSelector1 =
      "#__next > div.bywovg-1.fUzJes > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div.sc-16r8icm-0.sc-19zk94m-1.gRSJaB > div.sc-16r8icm-0.dSXRna > div.sc-16r8icm-0.fwiaiu > div > div > div > div:nth-child(4) > div > div > p:nth-child(2)";
    let temp1 = $(elemSelector1).html();
    const elemSelector2 =
      "#__next > div.bywovg-1.fUzJes > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div.sc-16r8icm-0.sc-19zk94m-1.gRSJaB > div.sc-16r8icm-0.dSXRna > div.sc-16r8icm-0.fwiaiu > div > div > div > div:nth-child(4) > div > div > p:nth-child(3)";
    let temp2 = $(elemSelector2).html();
    res.send([temp1, temp2]);
  } catch (err) {
    return res.status(404).json({
      message: "Data not available",
    });
  }
});

router.get("/stats", async (req, res) => {
  const { symbol } = req.query;
  try {
    const site_url = `https://services.intotheblock.com/api/${symbol}/signals`;
    const { data } = await axios({
      method: "GET",
      url: site_url,
    });
    let signals = {};
    data.signals.forEach(
      ({ title, info, category, sentiment, value, score, thresholds }) => {
        if (category === "on_chain") {
          signals[title] = {
            info,
            sentiment,
            value,
            score,
            thresholds,
          };
        }
      }
    );
    res.send({ ...data, signals });
  } catch (error) {
    return res.status(404).json({
      message: "Data not available",
    });
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
              res.write("data: " + result + "\n\n");
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

        sub.quit();
        pub.quit();
        tickSub.quit();
        redis.quit();
      }
    });
  });
});

// get historical data on symbol
router.get("/historical", (req, res) => {
  const { symbol, interval, lastDate } = req.query;
  let reqId = hash(req.rawHeaders.toString() + Date.now().toString());
  const historicalDataQuery = {
    symbol,
    interval,
    id: reqId,
    lastDate: lastDate,
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
  sub.subscribe(
    "CRYPTO_HISTORICAL_OHLC",
    "CRYPTO_ERROR_MESSAGES",
    (err, count) => {
      if (err) {
        console.error("Failed to subscribe: %s", err.message);
      } else {
        console.log(`Subscribed successfully! Num of sub channels: ${count}`);
      }
    }
  );
  sub.on("message", (channel, message) => {
    message = JSON.parse(message);

    if (channel === "CRYPTO_HISTORICAL_OHLC" && message.id === reqId) {
      res.json({ data: message.data });
      return sub.quit();
    }

    if (channel === "CRYPTO_ERROR_MESSAGES" && message.id === reqId) {
      res.json({ symbol: symbol, error: message.error });
    }
  });
});

module.exports = router;
