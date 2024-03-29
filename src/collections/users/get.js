const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.get("/users/:id", (req, res) => {
    db.collection("users").findOne(
      { _id: ObjectID(req.params.id) },
      (err, doc) => {
        if (err) {
          return console.error("Error getting user: ", err);
        }
        const response = { ...doc };
        delete response.password;
        res.send(response);
      }
    );
  });
};
