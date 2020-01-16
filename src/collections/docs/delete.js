const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.delete("/docs/:id", (req, res) => {
    db.collection("docs").deleteOne({ _id: ObjectID(req.params.id) }, err => {
      if (err) {
        return console.log("Error deleting doc: ", err);
      }
      res.send({ data: `deleted document ${req.params.id}` });
    });
  });
};
