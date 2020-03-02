const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.post("/docs/:docId/approve/:userId", (req, res) => {
    db.collection("docs").findOneAndUpdate(
      { _id: ObjectID(req.params.docId) },
      { $set: { latestApproval: ObjectID(req.params.userId) } },
      { upsert: false },
      (err, result) => {
        if (err) {
          res.status(400);
          return console.error("Error approving doc: ", err);
        }
        res.send(result);
      }
    );
  });
};
