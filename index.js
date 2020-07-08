require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
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
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://root:<password>@cluster0-kzjpf.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api", apiRoute);

app.listen(port, () => console.log(`Server run on port= ${port}`));
