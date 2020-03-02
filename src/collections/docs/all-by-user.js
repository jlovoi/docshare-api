const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.get("/docs/user/:id", (req, res) => {
    const userId = req.params.id;
    db.collection("docs")
      .find({ users: { $in: [ObjectID(userId)] } })
      .toArray((err, docs) => {
        if (err) {
          return console.error("Error getting all docs: ", err);
        }
        res.send(docs);
      });
  });
};
