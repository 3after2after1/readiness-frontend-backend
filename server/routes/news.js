let express = require("express");
require("dotenv").config();
let router = express.Router();
const cors = require("cors");
const axios = require("axios");
const Redis = require("ioredis");
router.use(cors());

router.get("/trending", async (req, res) => {
  const storage = new Redis({
    host: "cache",
    PORT: 6379,
  });
  const { market } = req.query;
  let options = {
    method: "GET",
    url: "https://bing-news-search1.p.rapidapi.com/news/search",
    params: {
      q: market,
      freshness: "Day",
      count: 10,
      textFormat: "Raw",
      safeSearch: "Off",
    },
    headers: {
      "x-bingapis-sdk": "true",
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
      "x-rapidapi-key": "c973464e7amsh814b0a79e23e2d5p119bbcjsn74d82b82bb04",
    },
  };
  try {
    const cacheData = await storage.get(`news-${market}`);
    if (cacheData) {
      console.log(`${market} news cache hit`);
      const data = JSON.parse(cacheData);
      res.send(data);
    } else {
      console.log(market);
      console.log(`${market} news cache miss`);
      const response = await axios.request(options);
      const filteredData = response.data.value.map((item) => {
        return {
          name: item.name,
          url: item.url,
          datePublished: item.datePublished,
          newsProviderName: item.provider[0]?.name,
          newsProviderImage: item.provider[0]?.image?.thumbnail?.contentUrl,
        };
      });
      storage.set(`news-${market}`, JSON.stringify(filteredData), "EX", 3600);
      res.send(filteredData);
    }
  } catch (error) {
    console.log(error);
  }
  storage.quit();
});

module.exports = router;
