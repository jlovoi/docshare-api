module.exports = (app, db) => {
  app.get("/users", (req, res) => {
    db.collection("users")
      .find({}, { firstName: 1, lastName: 1, username: 1, email: 1, title: 1 })
      .toArray((err, docs) => {
        if (err) {
          return console.error("Error getting all users: ", err);
        }
        res.send(docs);
      });
  });
};
