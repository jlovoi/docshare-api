const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.put("/users", (req, res) => {
    const id = ObjectID(req.body._id);
    let body = req.body;
    delete body._id;
    db.collection("users").findOneAndUpdate(
      { _id: id },
      { $set: body },
      { upsert: true },
      (err, result) => {
        if (err) {
          return console.log("Error patching user: ", err);
        }
        res.send(result);
      }
    );
  });
};
