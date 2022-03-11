require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");

const uri = process.env.MONGO_URI;
console.log(uri);
const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var forex = require("./routes/forex");
const watchlist = require("./routes/watchlist");
const crypto = require("./routes/crypto");

app.use("/watchlist", watchlist);
app.use("/forex", forex);
// app.use("/crypto", crypto);

app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } catch (error) {
    res.send(error);
  } finally {
    console.log(client);
    await client.close();
  }
});

app.get("/test", (req, res) => {
  res.send({ Status: "Success" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
