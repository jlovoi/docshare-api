const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.get("/chat/:id", (req, res) => {
    db.collection("chat").findOne(
      { _id: ObjectID(req.params.id) },
      (err, doc) => {
        if (err) {
          return console.error("Error getting chat: ", err);
        }
        res.send(doc);
      }
    );
  });
};
