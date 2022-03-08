require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");

const uri = process.env.MONGO_URI;
const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var watchlist = require("./routes/watchlist");

app.use("/watchlist", watchlist);

app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    console.log(client);
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } finally {
    console.log(client);
    await client.close();
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
