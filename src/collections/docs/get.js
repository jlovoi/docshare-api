const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.get("/docs/:id", async (req, res) => {
    let doc = await db
      .collection("docs")
      .findOne({ _id: ObjectID(req.params.id) });
    let enhancedUsers = [];
    if (doc && doc.users) {
      await Promise.all(
        doc.users.map(userId =>
          db.collection("users").findOne({ _id: ObjectID(userId) })
        )
      ).then(response => {
        enhancedUsers = response;
      });
    }
    doc.users = enhancedUsers;
    console.log(doc);
    res.send(doc);
  });
};
