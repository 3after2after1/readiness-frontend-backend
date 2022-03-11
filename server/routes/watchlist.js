let express = require("express");
require("dotenv").config();
let router = express.Router();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

router.get("/test", (req, res) => {
  res.send({ status: "watchlist" });
});

router.put("/addsymbol", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, market, symbol } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const updatedUser =
      market == "forex"
        ? await users.updateOne(
            { user_id: userId },
            { $push: { "watchlist.forex": symbol } }
          )
        : await users.updateOne(
            { user_id: userId },
            { $push: { "watchlist.crypto": symbol } }
          );

    res.send(updatedUser);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});

router.put("/removesymbol", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, market, symbol } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const updatedUser =
      market == "forex"
        ? await users.updateOne(
            { user_id: userId },
            { $pull: { "watchlist.forex": { name: `${symbol}` } } }
          )
        : await users.updateOne(
            { user_id: userId },
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
  //   const { id, symbol } = req.body;
  console.log("body", req.body);
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    users.insertOne(req.body);
    res.send(req.body);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});

module.exports = router;
