const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.put("/docs/:id", (req, res) => {
    let body = req.body;
    delete body._id;
    db.collection("docs").findOneAndUpdate(
      { _id: ObjectID(req.params.id) },
      { $set: body },
      { upsert: true },
      (err, result) => {
        if (err) {
          return console.error("Error patching doc: ", err);
        }
        res.send(result);
      }
    );
  });
};
