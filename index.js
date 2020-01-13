const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const users = require("./src/collections/users/index");

const app = express();
app.use(bodyParser());

const url =
  "mongodb+srv://jlovoi:josephwlovoi@cluster0-8tj9s.gcp.mongodb.net/test?retryWrites=true&w=majority";

var db;

MongoClient.connect(url, (err, client) => {
  if (err) return console.log("Error connecting to db", err);
  db = client.db("docshare"); // whatever your database name is
  users(app, db);
  app.listen(3000, () => {
    console.log("listening on 3000");
  });
});
