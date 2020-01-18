module.exports = (app, db) => {
  app.get("/users", (req, res) => {
    db.collection("users")
      .find({})
      .toArray((err, docs) => {
        if (err) {
          return console.error("Error getting all users: ", err);
        }
        res.send(docs);
      });
  });
};
