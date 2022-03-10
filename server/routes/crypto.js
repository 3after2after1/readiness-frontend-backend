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
