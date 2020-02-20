const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const cors = require("cors");

const users = require("./src/collections/users");
const chat = require("./src/collections/chat");
const docs = require("./src/collections/docs");

const app = express();
app.use(
  bodyParser({
    json: { limit: "50mb", extended: true },
    urlencoded: { limit: "50mb", extended: true }
  })
);

app.use(bodyParser.raw({ type: "application/octet-stream" }));

app.use(cors());

const url =
  "mongodb+srv://jlovoi:josephwlovoi@cluster0-8tj9s.gcp.mongodb.net/test?retryWrites=true&w=majority";

var db;

MongoClient.connect(url, (err, client) => {
  if (err) return console.error("Error connecting to db", err);
  db = client.db("docshare");
  users(app, db);
  chat(app, db);
  docs(app, db);
  app.listen(3000, () => {
    console.log("listening on 3000");
  });
});
