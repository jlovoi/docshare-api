module.exports = (app, db) => {
  app.post("/users", (req, res) => {
    db.collection("users").save(req.body, (err, result) => {
      if (err) {
        return console.log("Error posting user: ", err);
      }

      console.log("saved to database");
      res.redirect("/");
    });
  });
};
