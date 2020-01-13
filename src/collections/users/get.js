module.exports = (app, db) => {
  app.get("/users/:id", (req, res) => {
    db.collection("users")
      .find({ _id: req.body._id })
      .toArray(req.body, (err, result) => {
        if (err) {
          return console.log("Error posting user: ", err);
        }

        console.log("saved to database");
        res.redirect("/");
      });
  });
};
