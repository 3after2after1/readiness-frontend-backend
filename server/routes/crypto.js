let express = require("express");
require("dotenv").config();
let router = express.Router();
const { MongoClient } = require("mongodb");
const { TrendingCoins, CoinList } = require("../api/coingeckoApi");
const axios = require("axios");

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

module.exports = router;
