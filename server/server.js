require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");

export const uri = process.env.MONGO_URI;
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
const news = require("./routes/news");
const forexhome = require("./routes/forexhome");

app.use("/watchlist", watchlist);
app.use("/forex", forex);
app.use("/crypto", crypto);
app.use("/news", news);
app.use("/forexhome", forexhome);

app.get("/test", (req, res) => {
  res.send({ Status: "Success" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
