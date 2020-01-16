const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.get("/docs/:id", (req, res) => {
    db.collection("docs").findOne(
      { _id: ObjectID(req.params.id) },
      (err, doc) => {
        if (err) {
          return console.log("Error getting doc: ", err);
        }
        res.send(doc);
      }
    );
  });
};
