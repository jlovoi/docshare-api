const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.delete("/users/:id", (req, res) => {
    db.collection("users").deleteOne({ _id: ObjectID(req.params.id) }, err => {
      if (err) {
        return console.error("Error deleting user: ", err);
      }
      res.send({ data: `deleted document ${req.params.id}` });
    });
  });
};
