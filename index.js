require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiRoute = require("./router/person.route");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL).then(
  () => {
    console.log("connect DB ok");
  },
  (err) => {
    console.log(`Connect error: ${err}`);
  }
);
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api", apiRoute);

app.listen(port, () => console.log(`Server run on port= ${port}`));
