const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.put("/chat/:id", (req, res) => {
    let body = req.body;
    delete body._id;
    db.collection("chat").findOneAndUpdate(
      { _id: ObjectID(req.params.id) },
      { $set: body },
      { upsert: true },
      (err, result) => {
        if (err) {
          return console.error("Error patching chat: ", err);
        }
        res.send(result);
      }
    );
  });
};
