const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.delete("/chat/:id", (req, res) => {
    db.collection("chat").deleteOne({ _id: ObjectID(req.params.id) }, err => {
      if (err) {
        return console.log("Error deleting chat: ", err);
      }
      res.send({ data: `deleted document ${req.params.id}` });
    });
  });
};
