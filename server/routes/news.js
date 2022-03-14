let express = require("express");
require("dotenv").config();
let router = express.Router();
const cors = require("cors");
const axios = require("axios");
router.use(cors());

router.get("/trending", async (req, res) => {
  const { market } = req.query;
  console.log(market);
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
    // console.log(filteredData);
    res.send(filteredData);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
