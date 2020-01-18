const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.put("/users/:id", (req, res) => {
    let body = req.body;
    delete body._id;
    db.collection("users").findOneAndUpdate(
      { _id: ObjectID(req.params.id) },
      { $set: body },
      { upsert: true },
      (err, result) => {
        if (err) {
          return console.error("Error patching user: ", err);
        }
        res.send(result);
      }
    );
  });
};
