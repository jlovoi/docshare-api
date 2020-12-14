const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.get("/users/organization/:id", (req, res) => {
    db.collection("users")
      .find(
        { organization: ObjectID(req.params.id) },
        { projection: { password: 0, organization: 0, username: 0 } }
      )
      .toArray((err, docs) => {
        if (err) {
          return console.error("Error getting all users: ", err);
        }
        res.send(docs);
      });
  });
};
