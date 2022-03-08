let express = require("express");
require("dotenv").config();
let router = express.Router();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
console.log(uri);

router.get("/:id", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

router.post("/add", async (req, res) => {
  //   const { id, symbol } = req.body;
  console.log("body", req.body);
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("app-data");
    const favourites = database.collection("favourites");
    favourites.insertOne(req.body);
  } catch (error) {
    console.log(error);
  }
  res.send(req.body);
});

router.post("/remove", (req, res) => {
  //   const { id, symbol } = req.body;
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;
