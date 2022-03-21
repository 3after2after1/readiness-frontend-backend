let express = require("express");
require("dotenv").config();
let router = express.Router();
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;

router.get("/test", (req, res) => {
  res.send({ status: "watchlist" });
});

router.post("/addsymbol", async (req, res) => {
  //add new symbol into watchlist based on market and userId
  const client = new MongoClient(uri);
  const {
    userId,
    market,
    item: { symbol },
  } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    console.log("multiple times called API add symbol");
    const updatedUser =
      market == "forex"
        ? await users.updateOne(
            { user: userId },
            { $push: { "watchlist.forex": symbol } }
          )
        : await users.updateOne(
            { user: userId },
            { $push: { "watchlist.crypto": symbol } }
          );
    console.log("adding success", updatedUser);
    res.send(updatedUser);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});

router.post("/removesymbol", async (req, res) => {
  //remove existing symbol from watchlist based on market and userId
  const client = new MongoClient(uri);
  const {
    userId,
    market,
    item: { symbol },
  } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const updatedUser =
      market == "forex"
        ? await users.updateOne(
            { user: userId },
            { $pull: { "watchlist.forex": { name: `${symbol}` } } }
          )
        : await users.updateOne(
            { user: userId },
            { $pull: { "watchlist.crypto": { name: `${symbol}` } } }
          );

    res.send(updatedUser);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});

router.get("/getall", async (req, res) => {
  //get All user Data
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});

router.get("/getwatchlist", async (req, res) => {
  //get WatchList for that particular userId
  const client = new MongoClient(uri);
  const { userId } = req.body;
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const query = { user_id: userId };
    const result = await users.findOne(query);
    res.send(result["watchlist"]);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});

router.post("/adduser", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const insertedUser = await users.insertOne(req.body);
    res.send(insertedUser);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});

module.exports = router;
