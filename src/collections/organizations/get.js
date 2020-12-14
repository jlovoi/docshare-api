const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.get("/organizations/:id", (req, res) => {
    db.collection("organizations").findOne(
      { _id: ObjectID(req.params.id) },
      (err, response) => {
        if (err) {
          return console.error("Error getting organization: ", err);
        }
        res.send(response);
      }
    );
  });
};
